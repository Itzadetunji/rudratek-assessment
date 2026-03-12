import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { jobs } from "@/lib/jobs/data";
import { apiErrorResponse } from "@/lib/utils/api-error";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await Promise.resolve(context.params);
    const job = jobs.find((item) => item.id === id);

    if (!job) {
      return apiErrorResponse({
        status: StatusCodes.NOT_FOUND,
        error: ["Job not found"],
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Job successfully fetched",
        data: job,
      },
      { status: StatusCodes.OK },
    );
  } catch {
    return apiErrorResponse();
  }
}
