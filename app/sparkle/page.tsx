'use server';

import HeadlessPage from '#/components/HeadlessPage';
import '#/styles/globals.scss';
import { TimelineAnimationWrapper } from '#/components/TimelineWrapper';
import ResizeProvider from '#/components/ResizeProvider';
import { downloadData } from '#/components/utils';

//export const revalidate = 1; // revalidate every minute? sec?

export default async function Page() {
  const props = await fetchData();

  console.log('Sparkle root page rendered at ', new Date());

  return (
    <ResizeProvider>
      <TimelineAnimationWrapper>
        <HeadlessPage
          desktopData={props.desktopData}
          mobileData={props.mobileData}
          isAuthorVersion={props.isAuthorVersion}
          host={props.customHost}
        />
      </TimelineAnimationWrapper>
    </ResizeProvider>
  );
}

async function fetchData() {
  console.log('getServerSideProps');

  const hostConfig = {
    authorHost: 'https://author-p81252-e700817.adobeaemcloud.com',
    publishHost: 'https://publish-p81252-e700817.adobeaemcloud.com/',
    endpoint: 'sample-wknd-app/homepage',
  };

  let props = {
    desktopData: await downloadData(hostConfig, 'desktop'),
    mobileData: await downloadData(hostConfig, 'mobile'),
    isAuthorVersion: false,
    customHost: 'https://publish-p81252-e700817.adobeaemcloud.com/',
    fetchError: null,
  };

  return props;
}
