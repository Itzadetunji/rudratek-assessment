import { faker } from "@faker-js/faker";
import { Department, type Job, RoleType } from "@/lib/jobs/types";

const TOTAL_JOBS = 40;
const departments = Object.values(Department);
const roleTypes = Object.values(RoleType);

faker.seed(2026);

export const jobs: Job[] = Array.from({ length: TOTAL_JOBS }, (_, index) => ({
  id: String(index + 1),
  title: faker.person.jobTitle(),
  department: faker.helpers.arrayElement(departments),
  location: `${faker.location.city()}, ${faker.location.countryCode()}`,
  role_type: faker.helpers.arrayElement(roleTypes),
  posted_date: faker.date.recent({ days: 90 }).toISOString().slice(0, 10),
}));
