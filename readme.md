# React 18 & Next.js 13 App directory enabled for WKND

This is a React 18 [SSC](https://nextjs.org/docs/advanced-features/react-18/server-components) port of [WKND](https://app.wknd.site) app.

# Desktop fragment, GSAP disabled (no animation), pure SSR

[Vercel](https://ssc-sparkle.vercel.app/noanimation) | 
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/noanimation)

The only client side components are [MobileHeader.jsx](./components/MobileHeader.jsx) and next/Image.

[PageSpeed Insights on Vercel = 99](https://pagespeed.web.dev/report?url=https%3A%2F%2Fssc-sparkle.vercel.app%2Fnoanimation)

[PageSpeed Insights on Azure = 95](https://pagespeed.web.dev/report?url=https%3A%2F%2Fgreen-tree-0385ee80f.2.azurestaticapps.net%2Fnoanimation)

# Desktop fragment, GSAP enabled (animation), instant animation

[Vercel](https://ssc-sparkle.vercel.app/?debugAnim=instant) | 
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/?debugAnim=instant)

[Vercel](https://ssc-sparkle.vercel.app/instantanimation) | 
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/instantanimation)

This variant shows the impact of loading GSAP on the initial page load and its instant run to generate the final rendering as the page. GSPA is loaded and innitiliased by using a Client Side React Component [PanelAnimationWrapper.jsx](./components/PanelAnimationWrapper.jsx). One component instance is created for each Panel that has animations -- in total 7 instances.

[PageSpeed Insights on Vercel ~= 86](https://pagespeed.web.dev/report?url=https%3A%2F%2Fssc-sparkle.vercel.app%2F%3FdebugAnim%3Dinstant)

[PageSpeed Insights on Azure ~= 70](https://pagespeed.web.dev/report?url=https%3A%2F%2Fgreen-tree-0385ee80f.2.azurestaticapps.net%2F%3FdebugAnim%3Dinstant)

# Desktop fragment, GSAP enabled (animation)

[Vercel](https://ssc-sparkle.vercel.app/) | 
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/)

This variant shows the impact of loading GSAP plus the time to play the animation as directed by the fragment.
Largest CWV as the LCP end is the moment the animation is done. Actively playing the animation also has a negative impact on
Total Blocking Time on non-potato devices.

[PageSpeed Insights on Vercel ~= 88](https://pagespeed.web.dev/report?url=https%3A%2F%2Fssc-sparkle.vercel.app%2F)

[PageSpeed Insights on Azure ~= 89](https://pagespeed.web.dev/report?url=https%3A%2F%2Fgreen-tree-0385ee80f.2.azurestaticapps.net%2F)

# WKND adventures (desktop + mobile), SSR with cache

[Vercel](https://ssc-sparkle.vercel.app/adventures) | 
[Azure](https://green-tree-0385ee80f.2.azurestaticapps.net/adventures)


[PageSpeed Insights on Vercel ~= 100](https://pagespeed.web.dev/report?url=https%3A%2F%2Fssc-sparkle.vercel.app%2Fadventures)

[PageSpeed Insights on Azure ~= 100](https://pagespeed.web.dev/report?url=https%3A%2F%2Fgreen-tree-0385ee80f.2.azurestaticapps.net%2Fadventures)


# Compiling and running

Use the following env vars:
    
```bash
NEXT_PUBLIC_AEM_HOST=https://publish-p64257-e147834-cmstg.adobeaemcloud.com
NEXT_GRAPHQL_ENDPOINT=/content/_cq_graphql/aem-demo-assets/endpoint.json
NEXT_PUBLIC_URL=https://green-tree-0385ee80f.2.azurestaticapps.net
```
