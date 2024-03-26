import request from "supertest";

export class ApiRequest {
  constructor(private baseUrl: string) {}

  private logError(error: any): void {
    console.error("[API Request] Error:", error);
  }

  private async sendRequest(req: request.Test): Promise<request.Response> {
    try {
      const response = await req;
      return response;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  private createRequest(url: string) {
    return request(this.baseUrl).get(url); // Default to GET request
  }

  private addAuthHeader(req: request.Test, accessToken: string) {
    return req.set("Authorization", `Bearer ${accessToken}`);
  }

  async post(url: string, data: any, headers?: Record<string, string>) {
    const req = request(this.baseUrl).post(url);

    if (headers) {
      req.set(headers);
    }

    if (data) {
      req.send(data);
    }

    return await this.sendRequest(req);
  }

  async get(url: string, accessToken: string, query?: Record<string, string>) {
    let req = this.createRequest(url);

    req = this.addAuthHeader(req, accessToken);

    if (query) {
      req = req.query(query);
    }

    return await this.sendRequest(req);
  }

  async put(url: string, data: any, headers?: Record<string, string>) {
    const req = request(this.baseUrl).put(url);

    if (headers) {
      req.set(headers);
    }

    if (data) {
      req.send(data);
    }

    return await this.sendRequest(req);
  }

  async patch(url: string, data: any, headers?: Record<string, string>) {
    const req = request(this.baseUrl).patch(url);

    if (headers) {
      req.set(headers);
    }

    if (data) {
      req.send(data);
    }

    return await this.sendRequest(req);
  }

  async delete(
    url: string,
    accessToken: string,
    query?: Record<string, string>
  ) {
    let req = request(this.baseUrl)
      .delete(url)
      .set("Authorization", `Bearer ${accessToken}`);

    if (query) {
      req = req.query(query);
    }

    return await req;
  }
}
