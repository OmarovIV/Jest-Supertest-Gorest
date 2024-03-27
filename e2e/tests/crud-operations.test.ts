import { ApiRequest } from "../utils/apiRequest";
import { TestConfig } from "../utils/model";
import { TestBricks } from "../utils/testBricks";
import { generateRandomEmail, generateRandomName } from "../utils/testUtils";

const config = require("../../setEnvVars") as TestConfig;
const apiRequest = new ApiRequest(`https://${config.url}`);
const testBricks = new TestBricks(apiRequest);

describe("CRUD tests for gorest", () => {
  it("Admin creates a new user with valid gender and status and unique email address", async () => {
    const accessToken = config.accessToken;
    // Generate random name and email
    const randomName = generateRandomName();
    const randomEmail = generateRandomEmail();
    const gender = "male";
    const status = "active";

    const createUserResponse = await testBricks.crudActions.createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );
    expect(createUserResponse.status).toEqual(201);
    expect(createUserResponse.body.id).toBeTruthy();
    expect(createUserResponse.body.name).toEqual(randomName);
    expect(createUserResponse.body.email).toEqual(randomEmail);
    expect(createUserResponse.body.gender).toEqual(gender);
    expect(createUserResponse.body.status).toEqual(status);
  });
});
