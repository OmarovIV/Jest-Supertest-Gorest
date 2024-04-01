export function generateRandomName(): string {
  const firstNames = ["John", "Emma", "Michael", "Sophia", "William"];
  const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson"];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

export function generateRandomEmail(): string {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];

  const randomString = Math.random().toString(36).substr(2, 5);
  return `${randomString}@${randomDomain}`;
}
