export default function Head() {
  const title = "Partenariat créateur : accès Pro à vie | BeassistLink";
  const description =
    "Vous avez 1 000+ abonnés ? Rejoignez le programme partenariat BeassistLink et obtenez un accès Pro à vie.";
  const canonical = "https://www.beassist-link.com/partenariat";

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
