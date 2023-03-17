export default function Head() {
  return (
    <>
      <title>Sparkle Adventures in SSR land</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      {/*<link*/}
      {/*  fetchpriority='high'*/}
      {/*  rel='preload'*/}
      {/*  as='image'*/}
      {/*  href='/_next/image?url=https%3A%2F%2Fpublish-p81252-e700817.adobeaemcloud.com%2F%2Fcontent%2Fdam%2Fsample-wknd-app%2Fen%2Fimage-files%2Fbiker.png&w=640&q=90' />*/}

      <meta name='renderedAt' content={new Date().toLocaleString()} />
      <meta name='urn:auecon:aemconnection' content={`aem:${process.env.NEXT_PUBLIC_AEM_HOST}`}/>

      <link rel='icon' href='/favicon.ico' />
    </>
  );
}
