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

export class PageClient {
  static fromEnv() {
    if (!this.__envClient) {
      this.__envClient = new PageClient({
        serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
        auth: process.env.NEXT_PUBLIC_AEM_AUTH,
      });
    }
    return this.__envClient;
  }
  constructor({ serviceURL, auth }) {
    this.serviceURL = serviceURL;
    this.auth = auth;
  }

  getPath(page, item) {
    return `${page.charAt(0) === '/' ? '' : '/'}${page}/jcr:content${item.charAt(0) === '/' ? '' : '/'}${item}`;
  }

  async getItem(path) {
    const options = {};
    if (this.auth) {
      options.headers = {
        Authorization: `Bearer ${this.auth}`
      };
    }
    const resp = await fetch(`${this.serviceURL}${path}.model.json`, options);
    const itemContent = await resp.json();
    return itemContent;
  }
}