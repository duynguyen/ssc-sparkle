import Image from 'next/image';
import { useContext } from 'react';
import { WindowSizeProvider } from './ResizeProvider';

function aboveFold({ data, panelNr, host }) {
  const {
    image,
    altText,
    layerId,
    id,
    overflow,
    basePosition,
    debug,
    fit,
    forceLoad,
  } = data;

  return ['biker-layer', 'layer-rocks1', 'layer-rocks2', 'rocks3'].includes(
    layerId,
  );
}

function isMobileData({ data, panelNr, host }) {
  const {
    image,
    altText,
    layerId,
    id,
    overflow,
    basePosition,
    debug,
    fit,
    forceLoad,
  } = data;

  return image._path.includes('_m.');
}

export default function LayerImage(props) {
  const { data, panelNr, host } = props;
  const {
    image,
    altText,
    layerId,
    id,
    overflow,
    basePosition,
    debug,
    fit,
    forceLoad,
  } = data;

  const source = host + image?._path;

  const windowSize = useContext(WindowSizeProvider);
  const mobileMode = windowSize.width <= 840;

  return (
    <div
      className={`overflowImageWrapper  ${
        overflow ? 'showOverflow' : 'hideOverflow'
      }`}
    >
      <div
        id={layerId}
        className={`layerImage ${fit || ''} ${
          basePosition || 'center-center'
        } ${debug ? 'debug' : ''} ${
          overflow ? 'showOverflow' : 'hideOverflow'
        }`}
      >
        <Image
          id={id}
          src={source}
          className="image"
          alt={altText?.plaintext}
          width={image.width}
          height={image.height}
          priority={aboveFold(props) && mobileMode === isMobileData(props)}
          loading={
            aboveFold(props) && mobileMode === isMobileData(props)
              ? 'eager'
              : 'lazy'
          }
          sizes="50vw"
          //fetchpriority={layerId === 'biker-layer' ? 'high' : ''}
          //priority={false}
          //   priority={
          //     (panelNr === 0 && !source.includes('_m.') && !source.includes('sky0.'))
          //   || layerId === 'biker-layer' ||   layerId === 'layer-rocks1' ||   layerId === 'layer-rocks2'
          // }
          quality="90"
          // loading={layerId === 'biker-layer' ? 'eager' : 'lazy'}
          // sizes={
          //   layerId === 'biker-layer' ? "(max-width: 840px) 50vw, 40vw" :
          //   layerId === 'layer-rocks1' ? "(max-width: 840px) 50vw, 70vw" :
          //   layerId === 'layer-rocks2' ? "(max-width: 840px) 50vw, 90vw" :
          //   layerId === 'rocks3' ? "(max-width: 840px) 50vw, 75vw" :
          //   layerId === 'female-hiker-layer' ? "(max-width: 840px) 100vw, 30vw" :
          //   "100vw"
          // }
          // loading={panelNr === 0 || forceLoad ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
}
