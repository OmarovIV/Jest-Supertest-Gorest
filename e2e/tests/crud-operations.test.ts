import { ApiRequest } from "../utils/apiRequest";
import { TestConfig } from "../utils/model";
import { TestBricks } from "../utils/testBricks";
import { generateRandomEmail, generateRandomName } from "../utils/testUtils";

const config = require("../../setEnvVars") as TestConfig;
const apiRequest = new ApiRequest(`https://${config.url}`);
const testBricks = new TestBricks(apiRequest);

describe("CRUD tests for gorest", () => {
  let accessToken: string;

  beforeEach(() => {
    accessToken = config.accessToken;
  });

  it("Admin creates a new user with male gender and active status and unique email address", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const gender = "male";
    const status = "active";

    const createUserResponse = await createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );

    assertUserCreationSuccess(
      createUserResponse,
      randomName,
      randomEmail,
      gender,
      status
    );
  });

  it("Admin creates a new user with female gender and active status and unique email address", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const gender = "female";
    const status = "active";

    const createUserResponse = await createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );

    assertUserCreationSuccess(
      createUserResponse,
      randomName,
      randomEmail,
      gender,
      status
    );
  });

  it("Admin creates a new user with male gender and inactive status and unique email address", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const gender = "male";
    const status = "inactive";

    const createUserResponse = await createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );

    assertUserCreationSuccess(
      createUserResponse,
      randomName,
      randomEmail,
      gender,
      status
    );
  });

  it("Admin creates a new user with invalid gender and valid status and unique email address", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const gender = "test";
    const status = "active";

    const createUserResponse = await createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );

    expect(createUserResponse.status).toEqual(422);
    expect(
      createUserResponse.body.some(
        (err: any) =>
          err.field === "gender" &&
          err.message === "can't be blank, can be male of female"
      )
    ).toBeTruthy();
  });

  it("Admin creates a new user with valid gender and invalid status and unique email address", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const gender = "male";
    const status = "test";

    const createUserResponse = await createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );

    expect(createUserResponse.status).toEqual(422);
    expect(
      createUserResponse.body.some(
        (err: any) => err.field === "status" && err.message === "can't be blank"
      )
    ).toBeTruthy();
  });

  it("Admin creates a new user with valid gender and status and already used email address", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const gender = "male";
    const status = "active";

    const createUserResponse = await createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );

    assertUserCreationSuccess(
      createUserResponse,
      randomName,
      randomEmail,
      gender,
      status
    );

    const repeatCreateUserResponse = await createUser(
      accessToken,
      randomName,
      gender,
      randomEmail,
      status
    );

    expect(repeatCreateUserResponse.status).toEqual(422);
    expect(
      repeatCreateUserResponse.body.some(
        (err: any) =>
          err.field === "email" && err.message === "has already been taken"
      )
    ).toBeTruthy();
  });

  it("Admin creates a user and retrieves a user by ID", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const response = await createUser(
      accessToken,
      randomName,
      "male",
      randomEmail,
      "active"
    );

    expect(response.status).toEqual(201);
    expect(response.body.id).toBeTruthy();

    const userId = response.body.id;

    const getUserResponse = await testBricks.crudActions.getUser(
      accessToken,
      userId
    );

    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body.id).toEqual(userId);
    expect(getUserResponse.body.name).toEqual(randomName);
    expect(getUserResponse.body.email).toEqual(randomEmail);
    expect(getUserResponse.body.gender).toEqual("male");
    expect(getUserResponse.body.status).toEqual("active");
  });

  it("Admin tries to retrieve user by non-existing ID", async () => {
    const userId = "0000000";

    const response = await testBricks.crudActions.getUser(accessToken, userId);

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Resource not found");
  });

  it("Admin creates a user and updates user details", async () => {
    const { randomName, randomEmail } = generateRandomUserData();
    const createUserResponse = await createUser(
      accessToken,
      randomName,
      "male",
      randomEmail,
      "active"
    );
    expect(createUserResponse.status).toEqual(201);
    expect(createUserResponse.body.id).toBeTruthy();

    const userId = createUserResponse.body.id;
    const { randomNameUpdated, randomEmailUpdated } =
      generateRandomUpdatedUserData();
    const updateUserResponse = await testBricks.crudActions.updateUserDetails(
      accessToken,
      userId,
      randomNameUpdated,
      "female",
      randomEmailUpdated,
      "inactive"
    );
    expect(updateUserResponse.status).toEqual(200);
    expect(updateUserResponse.body.id).toBeTruthy();
    expect(updateUserResponse.body.name).toEqual(randomNameUpdated);
    expect(updateUserResponse.body.email).toEqual(randomEmailUpdated);
    expect(updateUserResponse.body.gender).toEqual("female");
    expect(updateUserResponse.body.status).toEqual("inactive");

    const getUserResponse = await testBricks.crudActions.getUser(
      accessToken,
      userId
    );
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body.id).toEqual(userId);
    expect(getUserResponse.body.name).toEqual(randomNameUpdated);
    expect(getUserResponse.body.email).toEqual(randomEmailUpdated);
    expect(getUserResponse.body.gender).toEqual("female");
    expect(getUserResponse.body.status).toEqual("inactive");
  });
});

function generateRandomUserData() {
  const randomName = generateRandomName();
  const randomEmail = generateRandomEmail();
  return { randomName, randomEmail };
}

function generateRandomUpdatedUserData() {
  const randomNameUpdated = generateRandomName();
  const randomEmailUpdated = generateRandomEmail();
  return { randomNameUpdated, randomEmailUpdated };
}

async function createUser(
  accessToken: string,
  name: string,
  gender: string,
  email: string,
  status: string
) {
  return testBricks.crudActions.createUser(
    accessToken,
    name,
    gender,
    email,
    status
  );
}

function assertUserCreationSuccess(
  response: any,
  name: string,
  email: string,
  gender: string,
  status: string
) {
  expect(response.status).toEqual(201);
  expect(response.body.id).toBeTruthy();
  expect(response.body.name).toEqual(name);
  expect(response.body.email).toEqual(email);
  expect(response.body.gender).toEqual(gender);
  expect(response.body.status).toEqual(status);
}
