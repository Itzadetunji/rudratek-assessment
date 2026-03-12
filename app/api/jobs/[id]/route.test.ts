import { describe, expect, test } from "bun:test";
import { GET } from "./route";

describe("GET /api/jobs/[id]", () => {
  test("returns job for valid id", async () => {
    const res = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "1" }),
    });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("Job successfully fetched");
    expect(data.data.id).toBe("1");
    expect(data.data).toHaveProperty("title");
    expect(data.data).toHaveProperty("department");
    expect(data.data).toHaveProperty("location");
    expect(data.data).toHaveProperty("role_type");
    expect(data.data).toHaveProperty("posted_date");
  });

  test("returns 404 for invalid id", async () => {
    const res = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "99999" }),
    });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Unable to fetch information");
    expect(data.error).toContain("Job not found");
  });

  test("returns 404 for non-existent id", async () => {
    const res = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "invalid" }),
    });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.success).toBe(false);
    expect(Array.isArray(data.error)).toBe(true);
  });
});
