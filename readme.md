# React 18 & Next.js 13 App directory enabled WKND

This is a React 18 [SSC](https://nextjs.org/docs/advanced-features/react-18/server-components) port of [WKND](https://app.wknd.site/) app.

# Desktop fragment, GSAP disabled (no animation), pure SSR

[Vercel](https://ssc-sparkle.vercel.app/noanimation)
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/noanimation)

The only client side components are [MobileHeader.jsx](./components/MobileHeader.jsx) and next/Image.

[PageSpeed Insights = 100](https://pagespeed.web.dev/report?url=https%3A%2F%2Fssc-sparkle.vercel.app%2Fnoanimation)

# Desktop fragment, GSAP enabled (animation), instant animation

[Vercel](https://ssc-sparkle.vercel.app/?debugAnim=instant)
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/?debugAnim=instant)

This variant shows the impact of loading GSAP on the initial page load and its instant run to generate the final rendering as the page.

[PageSpeed Insights ~= 86](https://pagespeed.web.dev/report?url=https%3A%2F%2Fssc-sparkle.vercel.app%2F%3FdebugAnim%3Dinstant)

# Desktop fragment, GSAP enabled (animation)

[Vercel](https://ssc-sparkle.vercel.app/)
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/)

This variant shows the impact of loading GSAP plus the time to play the animation as directed by the fragment.
Largest CWV as the LCP end is the moment the animation is done. Actively playing the animation also has a negative impact on
Total Blocking Time on non-potato devices.

[PageSpeed Insights ~= 88](https://pagespeed.web.dev/report?url=https%3A%2F%2Fssc-sparkle.vercel.app%2F)
