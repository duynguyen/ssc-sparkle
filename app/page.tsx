'use server';

import HeadlessPage from '#/components/HeadlessPage';
import '#/styles/globals.scss';
import { downloadData } from '#/components/utils';

import React from 'react';
import { cache } from 'react';
import TimelineAnimationWrapper from '#/components/TimelineWrapper';

export const revalidate = 3600; // revalidate every minute? sec?

export default async function Page() {

  const props = await fetchDataCached();

  const data = props.desktopData;

  console.log("Rendering page at",
    new Date(),
  );

  return (
    <TimelineAnimationWrapper>
      <HeadlessPage
        data={data}
        isAuthorVersion={props.isAuthorVersion}
        host={props.customHost}
      />
    </TimelineAnimationWrapper>

  );
}

const fetchDataCached = cache(async () => {
  const data = await fetchData();
  return data;
});

async function fetchData() {
  console.log('fetchData()');

  const hostConfig = {
    authorHost: 'https://author-p81252-e700817.adobeaemcloud.com',
    publishHost: 'https://publish-p81252-e700817.adobeaemcloud.com/',
    endpoint: 'sample-wknd-app/homepage',
  };

  let props = {
    desktopData: await downloadData(hostConfig, 'desktop'),
    // mobileData: await downloadData(hostConfig, 'mobile'),
    isAuthorVersion: false,
    customHost: 'https://publish-p81252-e700817.adobeaemcloud.com/',
    fetchError: null,
  };

  return props;
}
