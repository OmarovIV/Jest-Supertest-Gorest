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
}
