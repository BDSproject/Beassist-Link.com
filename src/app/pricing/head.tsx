export default function Head() {
  const title = "Tarifs lien en bio FREE, STARTER, PRO | BeassistLink";
  const description =
    "Comparez les plans BeassistLink FREE, STARTER et PRO pour développer votre lien en bio avec analytics avancées et personnalisation.";
  const canonical = "https://www.beassist-link.com/pricing";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content="https://www.beassist-link.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.beassist-link.com/og-image.png" />
    </>
  );
}
