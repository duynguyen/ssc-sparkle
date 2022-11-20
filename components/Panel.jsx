'use client';

//import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import LayerImage from '../components/LayerImage';
import TextLayer from '../components/TextLayer';
import PointTextMap from './PointTextMap';
import { TimelineProvider } from './TimelineWrapper';
import { scrollToId } from '../components/utils';
import Header from './Header';
import Background from './Background';

// const Background = dynamic(() => import('../components/Background'));
// const Header = dynamic(() => import('../components/Header'));
// const LayerImage = dynamic(() => import('./LayerImage'));
// const TextLayer = dynamic(() => import('./TextLayer'));
// const PointTextMap = dynamic(() => import('./PointTextMap'));

export default function Panel({
  panel,
  panelNr,
  settings,
  runOnEnd,
  isAuthorVersion,
  host,
  hash,
  ignoreHash,
  setIgnoreHash,
}) {
  const createTimeline = useContext(TimelineProvider);

  const lookupObject = {
    image: LayerImage,
    'Image Layer': LayerImage,
    text: TextLayer,
    'Text Layer': TextLayer,
    'Shoppable Moment Layer': PointTextMap,
  };

  useEffect(() => {
    if (!createTimeline) {
      return;
    }
    createTimeline(
      panel?.animations?.timelineAnimations,
      panel?.animations?.timelineAnimationSettings,
      runOnEnd,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createTimeline,
    panel?.animations?.timelineAnimationSettings,
    panel?.animations?.timelineAnimations,
  ]); // adding runOnEnd makes into animations re-run on end

  useEffect(() => {
    // if hash matches id, scroll this panel
    if (hash === '#' + panel.id && !ignoreHash) {
      scrollToId(hash);
      // stops page from scrolling to hash every time viewport is resized
      setIgnoreHash(true);
    }
  }, [hash, ignoreHash, panel.id, setIgnoreHash]);

  return (
    <div className={`panel ${panel?.dark ? 'darkPanel' : ''} `} id={panel.id}>
      {settings?.viewType === 'mobile' ? null : (
        <Header isAuthorVersion={isAuthorVersion} host={host} />
      )}
      {panel?.background && (
        <Background
          backgroundProps={panel.background}
          lazy={panelNr > 0 ? true : false}
          host={host}
        />
      )}
      {Array.isArray(panel?.layers) &&
        panel?.layers?.length &&
        panel.layers.map((layer, index) => {
          const Component = lookupObject[layer.type || layer?._model?.title];
          if (!Component) {
            return null;
          }
          return (
            <Component
              host={host}
              activeMenuItem={panel.activeMenuItem}
              data={layer}
              panelNr={panelNr}
              key={index}
            />
          );
        })}
    </div>
  );
}
