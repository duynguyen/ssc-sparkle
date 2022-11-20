import Image from 'next/image';
import { useContext } from 'react';
import { WindowSizeProvider } from './ResizeProvider';

function aboveFold({ backgroundProps, panelNr, host }) {
  const { backgroundContent, isVideo, altText, color, zIndex, type } =
    backgroundProps;

  return (
    altText === 'sky' &&
    !backgroundContent?._path.includes('uptothesky') &&
    (backgroundContent?._path.includes('sky.jpg') ||
      backgroundContent?._path.includes('sky_m.jpg'))
  );
}

function isMobileData({ backgroundProps, panelNr, host }) {
  const { backgroundContent, isVideo, altText, color, zIndex, type } =
    backgroundProps;

  return backgroundContent?._path.includes('sky_m.jpg');
}

export default function Background(props) {
  const { backgroundProps, panelNr, host } = props;
  const { backgroundContent, isVideo, altText, color, zIndex, type } =
    backgroundProps;

  const source = host + backgroundContent?._path;

  const windowSize = useContext(WindowSizeProvider);
  const mobileMode = windowSize.width <= 840;

  return (
    <div
      className={`backgroundWrapper ${isVideo ? 'isVideo' : ''}`}
      style={{ backgroundColor: color, zIndex }}
    >
      {backgroundContent?.type === 'image' && (
        <Image
          src={source}
          alt={altText ? altText : 'background image'}
          width={backgroundContent.width}
          height={backgroundContent.height}
          className="backgroundImage"
          priority={aboveFold(props) && mobileMode === isMobileData(props)}
          loading={
            aboveFold(props) && mobileMode === isMobileData(props)
              ? 'eager'
              : 'lazy'
          }
          sizes="70vw"
          quality="90"
        />
      )}
      {backgroundContent?.format?.includes('video/') && (
        <video className="videoWrapper" autoPlay loop muted>
          <source src={source} />
        </video>
      )}
    </div>
  );
}
