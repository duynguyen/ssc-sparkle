'use server';

import HeadlessPage from '#/components/HeadlessPage';
import '#/style2/globals.scss';
import { TimelineAnimationWrapper } from '#/components/TimelineWrapper';
import ResizeProvider from '#/components/ResizeProvider';
import { downloadData } from '#/components/utils';

export default async function Page() {
  const props = await getData();

  console.log('props', props);

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

export async function getData() {
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
