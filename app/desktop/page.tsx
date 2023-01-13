'use server';

import HeadlessPage from '#/components/HeadlessPage';
import '#/styles/globals.scss';
import { downloadData } from '#/components/utils';
import { headers } from 'next/headers';

import { deviceDetect } from 'react-device-detect';
import React from 'react';
import { cache } from 'react';

export const revalidate = 3600; // revalidate every minute? sec?

export default async function Page() {
  // const headersList = headers();
  // const referer = headersList.get('referer');
  // const userAgent = headersList.get('user-agent');
  // const device = deviceDetect(userAgent as undefined | string);
  // const isMobile = device.isMobile;
  const isMobile = false;

  console.log('isMobile', isMobile);

  const props = await fetchDataCached();

  const data = isMobile ? props.mobileData : props.desktopData;

  console.log("Rendering",
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
      viewType={isMobile ? 'mobile' : 'desktop'}
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
    desktopData: await downloadData(hostConfig, 'desktop'),
    mobileData: await downloadData(hostConfig, 'mobile'),
    isAuthorVersion: false,
    customHost: 'https://publish-p81252-e700817.adobeaemcloud.com/',
    fetchError: null,
  };

  return props;
}
