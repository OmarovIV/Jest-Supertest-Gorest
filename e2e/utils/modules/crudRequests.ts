import { ApiRequest } from "../apiRequest";

export class CrudActions {
  constructor(private apiRequest: ApiRequest) {}

  async createUser(
    accessToken: string,
    name: string,
    gender: string,
    email: string,
    status: string
  ) {
    return this.apiRequest.post(
      "/public/v2/users",
      { name, gender, email, status },
      { Authorization: `Bearer ${accessToken}` }
    );
  }

  async getUser(accessToken: string, userId: string) {
    return this.apiRequest.get(`/public/v2/users/${userId}`, accessToken);
  }

  async updateUserDetails(
    accessToken: string,
    userId: string,
    name?: string,
    gender?: string,
    email?: string,
    status?: string
  ) {
    return this.apiRequest.patch(
      `/public/v2/users/${userId}`,
      { name, gender, email, status },
      { Authorization: `Bearer ${accessToken}` }
    );
  }

  async deleteUser(accessToken: string, userId: string) {
    return this.apiRequest.delete(`/public/v2/users/${userId}`, accessToken);
  }
}
