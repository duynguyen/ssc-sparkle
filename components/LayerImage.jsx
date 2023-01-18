'use server';

import Image from 'next/image';

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
          alt={altText?.plaintext ? altText.plaintext : 'missingAltText'}
          width={image.width}
          height={image.height}
          priority={aboveFold(props)}
          loading={aboveFold(props) ? 'eager' : 'lazy'}
          // sizes="50vw"
          quality="90"
          sizes="(max-width: 840px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}
