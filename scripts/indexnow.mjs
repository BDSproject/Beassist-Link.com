// Soumet l'ensemble du sitemap à IndexNow, le protocole d'indexation instantanée
// de Bing (et de Yandex, Seznam, Naver).
//
// Usage :
//   node scripts/indexnow.mjs
//   node scripts/indexnow.mjs https://www.beassist-link.com/sitemap.xml
//
// À lancer APRÈS un déploiement, quand le fichier de clé et le sitemap sont en
// ligne. La clé IndexNow n'est pas un secret : c'est le fichier hébergé à la
// racine qui prouve la propriété du domaine.

const HOST = "www.beassist-link.com";
const KEY = "5aa2efbccdcb22e27b781bb9f155d0be83501b6eb58f963667aab852aa0d5280";
const SITEMAP = process.argv[2] || `https://${HOST}/sitemap.xml`;

function extractUrls(xml) {
  // Extraction simple des <loc> : suffisante pour un sitemap généré par Next.
  const urls = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1]);
  return urls;
}

async function main() {
  console.log(`Lecture du sitemap : ${SITEMAP}`);
  const res = await fetch(SITEMAP, { headers: { "User-Agent": "BeassistLink/1.0" } });
  if (!res.ok) {
    console.error(`Échec du téléchargement du sitemap (HTTP ${res.status})`);
    process.exit(1);
  }
  const xml = await res.text();
  const urls = extractUrls(xml);

  if (urls.length === 0) {
    console.error("Aucune URL trouvée dans le sitemap.");
    process.exit(1);
  }
  console.log(`${urls.length} URL(s) à soumettre.`);

  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  });

  const submit = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });

  console.log(`IndexNow a répondu : HTTP ${submit.status}`);
  if (!submit.ok) {
    const text = await submit.text();
    console.error("Réponse :", text.slice(0, 500));
    process.exit(1);
  }
  console.log("Soumission acceptée. Bing traitera les URLs sous 24 à 48 h.");
}

main().catch((err) => {
  console.error("Erreur :", err.message);
  process.exit(1);
});
