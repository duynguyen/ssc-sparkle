import '#/styles/globals.css';

import { AdventureClient } from '#/lib/adventures';
import { PageClient } from '#/lib/pages';
import AdventureCard from '#/components/AdventureCard';
import { cache } from 'react';

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
const NEXT_PUBLIC_AEM_ROOT = process.env.NEXT_PUBLIC_AEM_ROOT;

// if backend is an author, revalidate immediately
// otherwise, revalidate every 60 seconds
export const revalidate = (NEXT_PUBLIC_AEM_HOST.includes('author') ? 0 : 60);

const getAdventures = cache(async () => {
  const client = AdventureClient.fromEnv();
  const res = await client.getAllAdventures();
  const adventures = res?.data?.adventureList?.items;
  return adventures;
});

export default async function Page() {

  const adventures = await getAdventures();
  const pageClient = PageClient.fromEnv();
  const itemPath = pageClient.getPath('/content/expdevdemoaddon/us/en', '/root/container/title');
  const title = await pageClient.getItem(itemPath);
  console.log(`title = ${JSON.stringify(title)}`)

  return (<section className="">
    <script src="universal-editor-embedded.js" async></script>
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          <div itemid={`urn:aemconnection:${itemPath}`} itemProp="jcr:title" itemType="text">{title.text}</div>
        </h2>
        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {adventures.map(
            ({ _path, title, price, tripLength, primaryImage }) => {
              const pathItems = _path.split('/');
              const cfPath = pathItems.slice(Math.max(pathItems.length - 2, 0)).join('/');
              const href = `/adventures/${cfPath}`;
              return (
                <AdventureCard
                  key={_path}
                  href={href}
                  title={title}
                  price={price}
                  duration={tripLength}
                  imageSrc={`${NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  </section>)
}
