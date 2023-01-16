'use server';

import MobileHeader from './MobileHeader';
import Panel from './Panel';
import PanelAnimationWrapper from '#/components/PanelAnimationWrapper';

export default function HeadlessPage({
                                       data,
                                       isAuthorVersion,
                                       host,
                                       animation = true,
                                     }) {

  return (
    data && (
      <div
        className='page desktop'>
        <MobileHeader
          isAuthorVersion={isAuthorVersion}
          host={host}
          mobileNavObj={data?.mobileNavMenu}
          debugAnim={false}
          maxWidth={840}
        />
        {data?.panels?.map &&
          data.panels.map((panel, index) => {
            const staticPanel = (
              <Panel
                panel={panel}
                panelNr={index}
                key={index}
                runOnEnd={null}
                isAuthorVersion={isAuthorVersion}
                host={host}
                hash={null}
                ignoreHash={true}
              />
            );


            return (
              <>
              {animation && <PanelAnimationWrapper key={index} animations={panel.animations}>
                {staticPanel}
              </PanelAnimationWrapper>}

              {!animation && staticPanel}
            </>
            );
          })}
      </div>
    )
  );
}
