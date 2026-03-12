import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

type ErrorResponseArgs = {
  message?: string;
  error?: string[];
  status?: number;
};

export const apiErrorResponse = ({
  message = "Unable to fetch information",
  error = ["An unexpected error occurred"],
  status = StatusCodes.INTERNAL_SERVER_ERROR,
}: ErrorResponseArgs = {}) =>
  NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status },
  );
