import { request, APIRequestContext } from "@playwright/test";

export class ApiClient {
  private static instance: APIRequestContext | null = null;

  static async getInstance(baseURL: string): Promise<APIRequestContext> {
    if (!this.instance) {
      this.instance = await request.newContext({
        baseURL,
        extraHTTPHeaders: {
          Accept: "application/json",
        },
      });
    }
    return this.instance;
  }

  static async dispose() {
    if (this.instance) {
      await this.instance.dispose();
      this.instance = null;
    }
  }
}
