'use client';

import { useContext, useEffect, useLayoutEffect } from 'react';
import LayerImage from '../components/LayerImage';
import TextLayer from '../components/TextLayer';
import PointTextMap from './PointTextMap';
import { TimelineProvider } from './TimelineWrapper';
import { scrollToId } from '../components/utils';
import Header from './Header';
import Background from './Background';
import Panel from './Panel';

export default function PanelAnimationWrapper({ children, animations, runOnEnd, key}) {
  const createTimeline = useContext(TimelineProvider);

  useEffect(() => {
    if (!createTimeline || !animations) {
      return;
    }

    createTimeline(
      animations?.timelineAnimations,
      animations?.timelineAnimationSettings,
      null,
    );
  }, []);

  return (
    <>{children}</>
  );
}
