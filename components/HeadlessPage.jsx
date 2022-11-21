'use server';

// import Head from "next/head";
import MobileHeader from './MobileHeader';
import Panel from './Panel';

export default function HeadlessPage({
  viewType, // 'mobile' or 'desktop'
  data,
  isAuthorVersion,
  host,
}) {
  console.log('HeadlessPage for ' + viewType + ' rendered at ', new Date());

  return (
    data && (
      <div
        className={'page' + (viewType === 'mobile' ? ' mobile' : ' desktop')}
        // style={
        //   viewType === 'mobile' ? { maxWidth: 840, margin: '0 auto' } : null
        // }
      >
        {/* <Head>
          <title>{data?.title || "Sparkle SSR Demo"}</title>
          <meta name="description" content={data?.description?.plaintext} />
        </Head> */}
        {viewType === 'mobile' && (
          <MobileHeader
            isAuthorVersion={isAuthorVersion}
            host={host}
            mobileNavObj={data?.mobileNavMenu}
            debugAnim={debugAnim}
            maxWidth={840}
          />
        )}
        {data?.panels?.map &&
          data.panels.map((panel, index) => {
            // if (viewType === 'desktop' && index > 0 && !loadRest) {
            //   document.body.style.overflowY = 'scroll';
            //   return null;
            // }
            return (
              <Panel
                panel={panel}
                panelNr={index}
                settings={{ viewType }}
                key={index}
                runOnEnd={null}
                isAuthorVersion={isAuthorVersion}
                host={host}
                hash={null}
                ignoreHash={true}
              />
            );
          })}
      </div>
    )
  );
}
