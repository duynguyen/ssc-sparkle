'use client';

import { useContext, useEffect, useLayoutEffect } from 'react';
import { TimelineProvider } from './TimelineWrapper';

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
