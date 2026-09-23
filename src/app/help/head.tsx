export default function Head() {
  const title = "FAQ lien en bio et support | BeassistLink";
  const description =
    "Consulte la FAQ BeassistLink: création de page bio, liens raccourcis, QR codes, facturation et support.";
  const canonical = "https://www.beassist-link.com/help";

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
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
