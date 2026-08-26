export default function Head() {
  const title = "Produit lien en bio : page bio, liens courts, QR codes | BeassistLink";
  const description =
    "Découvrez le produit BeassistLink : page de lien en bio, liens raccourcis, QR codes et analytics pour créateurs et entreprises.";
  const canonical = "https://www.beassist-link.com/product";

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
