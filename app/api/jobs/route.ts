import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { jobs } from "@/lib/jobs/data";
import { apiErrorResponse } from "@/lib/utils/api-error";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
const MAX_PER_PAGE = 100;

const parsePositiveInt = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
    const current_page = parsePositiveInt(
      searchParams.get("page"),
      DEFAULT_PAGE,
    );
    const requestedPerPage = parsePositiveInt(
      searchParams.get("per_page"),
      DEFAULT_PER_PAGE,
    );
    const per_page = Math.min(requestedPerPage, MAX_PER_PAGE);

    const filteredJobs = jobs.filter((job) => {
      if (!search) {
        return true;
      }

      return [job.title, job.department, job.location, job.role_type]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });

    const total = filteredJobs.length;
    const total_pages = Math.max(1, Math.ceil(total / per_page));
    const startIndex = (current_page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginatedJobs = filteredJobs
      .slice(startIndex, endIndex)
      .map((job) => ({
        id: job.id,
        title: job.title,
        department: job.department,
        location: job.location,
        role_type: job.role_type,
      }));

    return NextResponse.json(
      {
        success: true,
        message: "All jobs successfully fetched",
        data: {
          jobs: paginatedJobs,
          pagination: {
            total,
            per_page,
            current_page,
            total_pages,
          },
        },
      },
      { status: StatusCodes.OK },
    );
  } catch {
    return apiErrorResponse();
  }
}
