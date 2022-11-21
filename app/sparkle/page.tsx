'use server';

import HeadlessPage from '#/components/HeadlessPage';
import '#/styles/globals.scss';
import { downloadData } from '#/components/utils';

import { isMobile } from 'react-device-detect';

//export const revalidate = 1; // revalidate every minute? sec?

export default async function Page() {
  const props = await fetchData();

  const data = isMobile ? props.mobileData : props.desktopData;

  console.log(
    'Sparkle root page rendered in model mobile=' + isMobile + 'at ',
    new Date(),
  );

  return (
    <HeadlessPage
      viewType={isMobile ? 'mobile' : 'desktop'}
      data={data}
      isAuthorVersion={props.isAuthorVersion}
      host={props.customHost}
    />
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
