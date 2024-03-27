import { ApiRequest } from "./apiRequest";
import { CrudActions } from "./modules/crudRequests";

export class TestBricks {
  constructor(private apiRequest: ApiRequest) {}

  get crudActions() {
    return new CrudActions(this.apiRequest);
  }
}
