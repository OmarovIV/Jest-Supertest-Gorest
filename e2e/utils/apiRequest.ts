import request from "supertest";

export class ApiRequest {
  constructor(private _baseUrl: string) {}

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

  private createRequest(method: string, url: string) {
    return request(this._baseUrl)[method.toLowerCase()](url); // Method can be "GET", "POST", "PUT", etc.
  }

  private addAuthHeader(req: request.Test, accessToken?: string) {
    if (accessToken) {
      return req.set("Authorization", `Bearer ${accessToken}`);
    }
    return req;
  }

  private addHeaders(req: request.Test, headers?: Record<string, string>) {
    if (headers) {
      req.set(headers);
    }
  }

  private sendData(req: request.Test, data?: any) {
    if (data) {
      req.send(data);
    }
  }

  async post(
    url: string,
    data?: any,
    accessToken?: string,
    headers?: Record<string, string>
  ) {
    let req = this.createRequest("POST", url);
    req = this.addAuthHeader(req, accessToken);
    this.addHeaders(req, headers);
    this.sendData(req, data);
    return await this.sendRequest(req);
  }

  async get(
    url: string,
    accessToken?: string,
    query?: Record<string, string>,
    headers?: Record<string, string>
  ) {
    let req = this.createRequest("GET", url);
    req = this.addAuthHeader(req, accessToken);
    this.addHeaders(req, headers);
    if (query) {
      req = req.query(query);
    }
    return await this.sendRequest(req);
  }

  async put(
    url: string,
    data?: any,
    accessToken?: string,
    headers?: Record<string, string>
  ) {
    let req = this.createRequest("PUT", url);
    req = this.addAuthHeader(req, accessToken);
    this.addHeaders(req, headers);
    this.sendData(req, data);
    return await this.sendRequest(req);
  }

  async patch(
    url: string,
    data?: any,
    accessToken?: string,
    headers?: Record<string, string>
  ) {
    let req = this.createRequest("PATCH", url);
    req = this.addAuthHeader(req, accessToken);
    this.addHeaders(req, headers);
    this.sendData(req, data);
    return await this.sendRequest(req);
  }

  async delete(
    url: string,
    accessToken?: string,
    query?: Record<string, string>,
    headers?: Record<string, string>
  ) {
    let req = this.createRequest("DELETE", url);
    req = this.addAuthHeader(req, accessToken);
    this.addHeaders(req, headers);
    if (query) {
      req = req.query(query);
    }
    return await this.sendRequest(req);
  }
}
