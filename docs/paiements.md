# Encaissement des paiements

BeassistLink permet à un créateur d'encaisser un paiement ou un pourboire
directement depuis sa page bio, en mobile money (XOF, XAF) comme en devises
occidentales.

## Le choix d'architecture, et pourquoi

Chaque créateur connecte **son propre compte marchand**. L'argent du payeur va
directement sur le compte du créateur chez le prestataire ; BeassistLink
n'achemine jamais les fonds et ne détient aucun solde pour autrui.

Ce n'est pas un détail d'implémentation, c'est ce qui évite d'avoir à demander
un agrément d'établissement de paiement (ACPR en France, BCEAO en UEMOA). La
conséquence à assumer : BeassistLink ne peut pas prélever de commission sur les
transactions, la monétisation reste l'abonnement.

La recherche préalable (`docs/recherche-paiement-mobile-money.md`) a montré
qu'aucun des cinq prestataires étudiés n'ouvre de compte marchand XOF/XAF à une
société française. Les créateurs, eux, sont sur place et peuvent le faire.
C'est cette contrainte qui rend l'architecture « apportez votre propre compte »
non pas préférable, mais obligatoire.

## Flux d'un paiement

1. Le payeur clique sur un lien `payment` ou `tip` de la page bio.
2. `POST /api/pay/[linkId]` relit **le montant, la devise et le compte marchand
   en base** — jamais depuis la requête — puis crée une ligne `Payment` en
   `PENDING`.
3. Le serveur appelle le prestataire et redirige le payeur vers sa page de
   paiement.
4. Le payeur paie (ou annule).
5. Le prestataire notifie `/api/payments/callback/[provider]` **et** renvoie le
   payeur vers `/paiement/retour`.
6. Dans les deux cas, le serveur appelle `confirm` chez le prestataire, qui est
   la seule source de vérité, puis met à jour le statut.

Si le créateur n'a connecté aucun compte, le lien redevient un simple lien vers
son Wave, Orange Money ou Lydia. Aucune régression pour les utilisateurs
existants.

## Règle de sécurité centrale : ne jamais croire la notification

PayDunya documente un champ `hash` dans ses notifications, mais aucun SDK
officiel n'en implémente la vérification et la construction exacte du hash n'est
pas publiée. La notification ne peut donc pas être authentifiée de façon fiable.

Conséquence assumée dans le code : **le contenu de la notification est ignoré**.
Il sert uniquement à identifier la transaction, puis le serveur réinterroge
`GET /checkout-invoice/confirm/{token}`.

C'est vérifié par un test : une notification annonçant `status: "failed"` avec
un hash inventé sur un paiement réellement abouti laisse bien le paiement en
`COMPLETED`.

## Identifiants marchands

Les clés PayDunya (Master Key, Private Key, Token) sont chiffrées en
**AES-256-GCM** avant d'être stockées (`src/lib/payments/crypto.ts`). Le tag
d'authentification garantit qu'une ligne modifiée en base ne peut pas être
déchiffrée. Elles ne sont jamais renvoyées par l'API : le tableau de bord
n'affiche qu'un masque (`abcd••••wxyz`).

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `PAYMENT_ENCRYPTION_KEY` | Clé de 32 octets (64 caractères hex) pour chiffrer les identifiants marchands. Si absente, une clé est dérivée de `NEXTAUTH_SECRET`. |
| `PAYMENT_SIMULATION` | `true` active le prestataire de simulation. **À ne jamais définir en production.** |

Pour générer la clé de chiffrement :

```bash
openssl rand -hex 32
```

La définir dans Vercel permet de faire tourner la clé indépendamment de
`NEXTAUTH_SECRET`, sans invalider les sessions des utilisateurs.

## Mode simulation

PayDunya exige un compte Business validé même pour le mode test, ce qui rend le
parcours impossible à valider sans compte réel. Le prestataire `SIMULATION`
comble ce trou : il crée une fausse page de paiement (`/paiement/simulation`)
qui rejoue un succès, un échec ou une annulation.

Il n'est enregistré dans le registre que si `PAYMENT_SIMULATION === "true"`, et
la page renvoie un 404 sinon. En production, la variable n'étant pas définie,
le prestataire et la page n'existent pas.

Limite connue : l'état des transactions simulées vit en mémoire, donc il n'est
pas partagé entre instances serverless. Suffisant en développement.

## Ajouter un prestataire

1. Implémenter l'interface `PaymentProvider` (`src/lib/payments/types.ts`) dans
   `src/lib/payments/providers/`.
2. L'enregistrer dans `src/lib/payments/index.ts`.
3. Ajouter sa valeur à l'énum `PaymentProviderKind` dans le schéma Prisma.

Le reste (parcours de paiement, webhook, tableau de bord) est générique et
n'a pas besoin d'être modifié.

## Point ouvert avant la mise en production

Le compte marchand appartient au créateur : c'est ce qui nous sort du périmètre
réglementaire. Encore faut-il que le créateur puisse **encaisser et retirer**
l'argent. PayDunya exige pour le retrait une pièce d'identité, un registre de
commerce et un NINEA, donc une entité locale dans un pays UEMOA.

Autrement dit : l'intégration est complète, mais tant qu'un créateur réel n'a pas
de compte marchand validé, aucun euro ni franc CFA ne peut effectivement être
encaissé. C'est la première chose à tester avec un vrai créateur au Sénégal ou
en Côte d'Ivoire avant d'annoncer la fonctionnalité.

## Tarification

L'encaissement est disponible sur **toutes les offres, y compris FREE**. Choix
délibéré : c'est le différenciant du produit, le brider derrière un abonnement
de 7 $ tuerait l'adoption dans un marché où l'on ne paie pas pour un outil avant
d'avoir encaissé le premier franc. L'abonnement se justifie ensuite par les
statistiques, les QR codes et le domaine personnalisé.

Ce choix se change en une ligne si tu préfères le réserver aux offres payantes.
