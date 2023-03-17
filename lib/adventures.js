/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import AEMHeadless from '@adobe/aem-headless-client-js';

export class AdventureClient {
  static fromEnv() {
    console.log(`NEXT_PUBLIC_AEM_HOST = ${process.env.NEXT_PUBLIC_AEM_HOST}`)
    console.log(`NEXT_PUBLIC_GRAPHQL_ENDPOINT = ${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`)
    console.log(`NEXT_PUBLIC_AEM_AUTH = ${process.env.NEXT_PUBLIC_AEM_AUTH}`)
    console.log(`NEXT_PUBLIC_URL = ${process.env.NEXT_PUBLIC_URL}`)
    if (!this.__envClient) {
      this.__envClient = new AdventureClient({
        serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
        endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        auth: process.env.NEXT_PUBLIC_AEM_AUTH,
      });
    }
    return this.__envClient;
  }
  constructor({ serviceURL, endpoint, auth }) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL,
      endpoint,
      auth,
      fetch
    });
  }

  async getAllAdventures() {
    const queryAdventuresAll = 'aem-demo-assets/adventures-all';
    const res = await this.aemHeadlessClient.runPersistedQuery(queryAdventuresAll, { invalidate: 1 });
    return res;
  }

  async getAdventurePaths() {
    const res = await this.getAllAdventures();
    const adventures = res?.data?.adventureList?.items || [];
    const paths = adventures.map((item) => ({
      params: {
        path: [item.slug],
      }
    }));
    return paths;
  }

  async getAdventureByPath(path) {
    const query = `{
      adventureByPath (_path: "${path}") {
        item {
          _path
            title
            activity
            adventureType
            price
            tripLength
            groupSize
            difficulty
            primaryImage {
              ... on ImageRef {
                _path
                mimeType
                width
                height
              }
            }
            description {
              html
            }
            itinerary {
              html
            }
        }
      }
    }
    `;
    const res = await this.aemHeadlessClient.runQuery(query);
    return res;
  }
}
