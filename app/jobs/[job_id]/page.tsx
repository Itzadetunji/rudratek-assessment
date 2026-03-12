"use client";

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/lib/utils/axios";

type JobDetails = {
	id: string;
	title: string;
	department: string;
	location: string;
	role_type: string;
	posted_date: string;
};

type JobResponse = {
	success: boolean;
	message: string;
	data: JobDetails;
};

type ErrorResponse = {
	success: false;
	message: string;
	error: string[];
};

export default function JobDetailsPage() {
	const router = useRouter();
	const params = useParams<{ job_id?: string }>();
	const jobId = params?.job_id?.trim() ?? "";

	const query = useQuery({
		queryKey: ["job", jobId],
		queryFn: async () => {
			const response = await api.get<JobResponse>(`jobs/${jobId}`);
			return response.data;
		},
		enabled: jobId.length > 0,
	});

	useEffect(() => {
		if (jobId.length > 0) {
			return;
		}

		toast.error("A job id was not provided.");
		router.replace("/jobs");
	}, [jobId, router]);

	useEffect(() => {
		if (!query.isError) {
			return;
		}

		const axiosError = query.error as AxiosError<ErrorResponse>;
		const errorMessage =
			axiosError.response?.data?.error?.[0] ??
			axiosError.response?.data?.message ??
			"Unable to fetch information";

		toast.error(errorMessage);
		router.replace("/jobs");
	}, [query.error, query.isError, router]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />
			<main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
				<Card className="bg-card/65">
					<CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-col gap-1">
							<CardTitle>Job Details</CardTitle>
							<CardDescription>
								View detailed information for the selected role.
							</CardDescription>
						</div>
						<Link
							href="/jobs"
							className={cn(
								buttonVariants({ variant: "outline", size: "default" }),
							)}
						>
							Back to Jobs
						</Link>
					</CardHeader>
					<CardContent>
						{query.isLoading ? (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Skeleton className="h-16 w-full" />
								<Skeleton className="h-16 w-full" />
								<Skeleton className="h-16 w-full" />
								<Skeleton className="h-16 w-full" />
							</div>
						) : null}

						{query.data && !query.isLoading ? (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Card className="bg-background/70 p-4">
									<CardHeader className="p-0">
										<CardDescription>Job ID</CardDescription>
										<CardTitle className="text-base">
											{query.data.data.id}
										</CardTitle>
									</CardHeader>
								</Card>

								<Card className="bg-background/70 p-4">
									<CardHeader className="p-0">
										<CardDescription>Role Type</CardDescription>
										<div>
											<Badge
												variant="outline"
												className="capitalize"
											>
												{query.data.data.role_type.split("_").join(" ")}
											</Badge>
										</div>
									</CardHeader>
								</Card>

								<Card className="bg-background/70 p-4">
									<CardHeader className="p-0">
										<CardDescription>Posted Date</CardDescription>
										<CardTitle className="text-base">
											{new Date(query.data.data.posted_date).toLocaleDateString(
												undefined,
												{
													year: "numeric",
													month: "long",
													day: "numeric",
												},
											)}
										</CardTitle>
									</CardHeader>
								</Card>

								<Card className="bg-background/70 sm:col-span-2 p-4">
									<CardHeader className="p-0">
										<CardDescription>Title</CardDescription>
										<CardTitle className="text-base">
											{query.data.data.title}
										</CardTitle>
									</CardHeader>
								</Card>

								<Card className="bg-background/70 p-4">
									<CardHeader className="p-0">
										<CardDescription>Department</CardDescription>
										<CardTitle className="text-base">
											{query.data.data.department}
										</CardTitle>
									</CardHeader>
								</Card>

								<Card className="bg-background/70 p-4">
									<CardHeader className="p-0">
										<CardDescription>Location</CardDescription>
										<CardTitle className="text-base">
											{query.data.data.location}
										</CardTitle>
									</CardHeader>
								</Card>
							</div>
						) : null}
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
