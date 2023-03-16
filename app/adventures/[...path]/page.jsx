import '#/styles/globals.css';

import Image from 'next/image';
import { AdventureClient } from '#/lib/adventures';
import { cache } from 'react';

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;

// if backend is an author, revalidate immediately
// otherwise, revalidate every 60 seconds
export const revalidate = (NEXT_PUBLIC_AEM_HOST.includes('author') ? 0 : 60);

const getAdventureByPath = cache(async (path) => {
  const client = AdventureClient.fromEnv();
  const res = await client.getAdventureByPath(path);
  const adventure = res?.data?.adventureByPath?.item;
  return adventure;
});

export default async function Page({ params }) {
  const cfPath = `/content/dam/aem-demo-assets/en/adventures/${params.path.join('/')}`;
  const adventure = await getAdventureByPath(cfPath);
  if(!adventure) return(<>Adventure not found</>);

  const {
    title,
    activity,
    adventureType,
    price,
    tripLength,
    groupSize,
    difficulty,
    primaryImage,
    description,
    itinerary,
  } = adventure;
  return (<article>
    <div className="bg-white">
      <div className="pt-6">
        
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-80 lg:aspect-none">
          <Image
            src={`${NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
            alt={title}
            width={1680}
            height={320}
            loading='eager'
            sizes="50vw"
            unoptimized={NEXT_PUBLIC_AEM_HOST.includes('author')}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 mb-10">{price}</p>
            <dl>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Activity</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{activity}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{adventureType}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Trip Length</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tripLength}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Group Size</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{groupSize}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{difficulty}</dd>
              </div>
            </dl>

          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and Itinerary */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <div className="text-base text-gray-900" dangerouslySetInnerHTML={{
                  __html: description.html,
                }}></div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-base font-bold text-gray-900">Itinerary</h2>

              <div className="mt-4 space-y-6">
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{
                  __html: itinerary.html,
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
  </article>)
}