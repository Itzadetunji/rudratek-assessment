import { describe, expect, test } from "bun:test";
import { GET } from "./route";

const baseUrl = "http://localhost:3000/api/jobs";

describe("GET /api/jobs", () => {
  test("returns success with default pagination", async () => {
    const res = await GET(new Request(baseUrl));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("All jobs successfully fetched");
    expect(Array.isArray(data.data.jobs)).toBe(true);
    expect(data.data.jobs.length).toBeLessThanOrEqual(10);
    expect(data.data.pagination).toEqual({
      total: expect.any(Number),
      per_page: 10,
      current_page: 1,
      total_pages: expect.any(Number),
    });
  });

  test("filters by search", async () => {
    const res = await GET(new Request(`${baseUrl}?search=engineering`));
    const data = await res.json();

    expect(res.status).toBe(200);
    for (const job of data.data.jobs) {
      const match =
        job.title.toLowerCase().includes("engineering") ||
        job.department.toLowerCase().includes("engineering") ||
        job.location.toLowerCase().includes("engineering") ||
        job.role_type.toLowerCase().includes("engineering");
      expect(match).toBe(true);
    }
  });
});
