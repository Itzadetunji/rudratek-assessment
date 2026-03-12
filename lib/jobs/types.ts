export enum Department {
  Engineering = "Engineering",
  Product = "Product",
  Design = "Design",
  Marketing = "Marketing",
  Sales = "Sales",
  HR = "HR",
  Finance = "Finance",
  Operations = "Operations",
}

export enum RoleType {
  FullTime = "full_time",
  PartTime = "part_time",
  Contract = "contract",
  Internship = "internship",
}

export type Job = {
  id: string;
  title: string;
  department: Department;
  location: string;
  role_type: RoleType;
  posted_date: string;
};
