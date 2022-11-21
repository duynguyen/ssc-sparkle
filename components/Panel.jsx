'use server';

//import dynamic from 'next/dynamic';
import { useContext } from 'react';
import LayerImage from '../components/LayerImage';
import TextLayer from '../components/TextLayer';
import PointTextMap from './PointTextMap';
import { scrollToId } from '../components/utils';
import Header from './Header';
import Background from './Background';

export default function Panel({
  panel,
  panelNr,
  settings,
  runOnEnd,
  isAuthorVersion,
  host,
  hash,
  ignoreHash,
}) {
  const lookupObject = {
    image: LayerImage,
    'Image Layer': LayerImage,
    text: TextLayer,
    'Text Layer': TextLayer,
    'Shoppable Moment Layer': PointTextMap,
  };

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
