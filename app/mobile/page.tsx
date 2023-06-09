'use server';

import HeadlessPage from '#/components/HeadlessPage';
import '#/styles/globals.scss';
import { downloadData } from '#/components/utils';

import React from 'react';
import { cache } from 'react';

export const revalidate = 3600; // revalidate every minute? sec?

export default async function Page() {
  // const headersList = headers();
  // const referer = headersList.get('referer');
  // const userAgent = headersList.get('user-agent');
  // const device = deviceDetect(userAgent as undefined | string);
  // const isMobile = device.isMobile;
  const isMobile = true;

  console.log('isMobile', isMobile);

  const props = await fetchDataCached();

  const data = props.mobileData;

  console.log("Rendering mobile",
    new Date(),
  );

  // console.log(
  //   'Sparkle root page rendered in mode mobile=' +
  //     isMobile +
  //     ' for browser=' +
  //     device.ua +
  //     ' at ',
  //   new Date(),
  // );

  return (
    <HeadlessPage
      data={data}
      isAuthorVersion={props.isAuthorVersion}
      host={props.customHost}
    />
  );
}

const fetchDataCached = cache(async () => {
  const data = await fetchData();
  return data;
});

async function fetchData() {
  console.log('getServerSideProps');

  const hostConfig = {
    authorHost: 'https://author-p81252-e700817.adobeaemcloud.com',
    publishHost: 'https://publish-p81252-e700817.adobeaemcloud.com/',
    endpoint: 'sample-wknd-app/homepage',
  };

  let props = {
    // desktopData: await downloadData(hostConfig, 'noanimation'),
    mobileData: await downloadData(hostConfig, 'mobile'),
    isAuthorVersion: false,
    customHost: 'https://publish-p81252-e700817.adobeaemcloud.com/',
    fetchError: null,
  };

  return props;
}
