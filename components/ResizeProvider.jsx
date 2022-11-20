'use client';

import { createContext, useEffect, useState } from 'react';

export const WindowSizeProvider = createContext(null);

export default function ResizeListener({ children }) {
  //TODO: SSR sensible defaults
  const [size, setSize] = useState({ width: 360, height: 640 });

  // runs passed function if timeout has gone by without being called again.
  function debounce(func, wait) {
    let timeout;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(func, wait);
    };
  }

  const handleResize = debounce(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setSize({ width: window.innerWidth, height: window.innerHeight });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // adding handleResize causes endless re-renders

  return (
    <WindowSizeProvider.Provider value={size}>
      {children}
    </WindowSizeProvider.Provider>
  );
}
