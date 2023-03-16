export class PageClient {
  static fromEnv(env = process.env) {
    if (!this.__envClient) {
      const { NEXT_PUBLIC_AEM_HOST, NEXT_AEM_AUTH } = env;
      this.__envClient = new PageClient({
        serviceURL: NEXT_PUBLIC_AEM_HOST,
        auth: NEXT_AEM_AUTH,
      });
    }
    return this.__envClient;
  }
  constructor({ serviceURL, auth }) {
    this.serviceURL = serviceURL;
    this.auth = auth;
  }

  getPath(page, item) {
    return `${page.charAt(0) === '/' ? '' : '/'}${page}/jcr:content${item.charAt(0) === '/' ? '' : '/'}${item}`
  }

  async getItem(path) {
    const options = {};
    if (this.auth) {
      options.headers = {
        Authorization: `Bearer ${this.auth}`
      };
    }
    const resp = await fetch(`${this.serviceURL}${path}.model.json`, options);
    const itemContent = await resp.json()
    return itemContent;
  }
}