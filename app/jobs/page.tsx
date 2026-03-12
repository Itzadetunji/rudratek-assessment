"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { api } from "@/lib/utils/axios";

type JobListItem = {
	id: string;
	title: string;
	department: string;
	location: string;
	role_type: string;
	posted_date: string;
};

type JobsResponse = {
	success: boolean;
	message: string;
	data: {
		jobs: JobListItem[];
		pagination: {
			total: number;
			per_page: number;
			current_page: number;
			total_pages: number;
		};
	};
};

const PER_PAGE = 10;
const SKELETON_ROWS = 6;

type SortBy = "title" | "department" | "location" | "role_type" | "posted_date";
type SortOrder = "asc" | "desc";

function SortIcons({
	column,
	sortBy,
	sortOrder,
	onSort,
}: {
	column: SortBy;
	sortBy: SortBy;
	sortOrder: SortOrder;
	onSort: (col: SortBy, order: SortOrder) => void;
}) {
	const isActive = sortBy === column;
	return (
		<div className="flex -space-x-1">
			<button
				type="button"
				aria-label={`Sort ${column} ascending`}
				onClick={() => onSort(column, "asc")}
				className="p-0.5 hover:bg-muted/60 rounded cursor-pointer"
			>
				<ArrowUpIcon
					size={16}
					weight={isActive && sortOrder === "asc" ? "bold" : "regular"}
					color="currentColor"
				/>
			</button>
			<button
				type="button"
				aria-label={`Sort ${column} descending`}
				onClick={() => onSort(column, "desc")}
				className="p-0.5 hover:bg-muted/60 rounded cursor-pointer"
			>
				<ArrowDownIcon
					size={16}
					weight={isActive && sortOrder === "desc" ? "bold" : "regular"}
					color="currentColor"
				/>
			</button>
		</div>
	);
}

const useDebouncedValue = (value: string, delay = 350) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [delay, value]);

	return debouncedValue;
};

export default function JobsPage() {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState<SortBy>("posted_date");
	const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
	const debouncedSearch = useDebouncedValue(search);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["jobs", page, PER_PAGE, debouncedSearch, sortBy, sortOrder],
		queryFn: async () => {
			const response = await api.get<JobsResponse>("jobs", {
				params: {
					page,
					per_page: PER_PAGE,
					search: debouncedSearch,
					sort_by: sortBy,
					sort_order: sortOrder,
				},
			});

			return response.data;
		},
		placeholderData: (previousData) => previousData,
	});

	const handleSort = (col: SortBy, order: SortOrder) => {
		setSortBy(col);
		setSortOrder(order);
		setPage(1);
	};

	const jobs = data?.data.jobs ?? [];
	const pagination = data?.data.pagination;
	const totalPages = pagination?.total_pages ?? 1;

	const pageNumbers = useMemo(() => {
		const spread = 2;
		const start = Math.max(1, page - spread);
		const end = Math.min(totalPages, page + spread);
		return Array.from({ length: end - start + 1 }, (_, index) => start + index);
	}, [page, totalPages]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />
			<main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
				<Card className="bg-card/65">
					<CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div className="flex flex-col gap-1">
							<CardTitle>Jobs</CardTitle>
							<CardDescription>
								Search and browse all available opportunities.
							</CardDescription>
						</div>
						<div className="w-full md:max-w-sm">
							<Input
								value={search}
								placeholder="Search title, department, location or role type"
								onChange={(event) => {
									setSearch(event.target.value);
									setPage(1);
								}}
							/>
						</div>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="rounded-lg border border-border/60 bg-background/60 backdrop-blur-md">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											<div className="text-primary font-bold flex items-center gap-2">
												<span>Title</span>
												<SortIcons
													column="title"
													sortBy={sortBy}
													sortOrder={sortOrder}
													onSort={handleSort}
												/>
											</div>
										</TableHead>
										<TableHead>
											<div className="text-primary font-bold flex items-center gap-2">
												<span>Department</span>
												<SortIcons
													column="department"
													sortBy={sortBy}
													sortOrder={sortOrder}
													onSort={handleSort}
												/>
											</div>
										</TableHead>
										<TableHead>
											<div className="text-primary font-bold flex items-center gap-2">
												<span>Location</span>
												<SortIcons
													column="location"
													sortBy={sortBy}
													sortOrder={sortOrder}
													onSort={handleSort}
												/>
											</div>
										</TableHead>
										<TableHead>
											<div className="text-primary font-bold flex items-center gap-2">
												<span>Role Type</span>
												<SortIcons
													column="role_type"
													sortBy={sortBy}
													sortOrder={sortOrder}
													onSort={handleSort}
												/>
											</div>
										</TableHead>
										<TableHead>
											<div className="text-primary font-bold flex items-center gap-2">
												<span>Posted</span>
												<SortIcons
													column="posted_date"
													sortBy={sortBy}
													sortOrder={sortOrder}
													onSort={handleSort}
												/>
											</div>
										</TableHead>
										<TableHead className="text-right">Action</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{isLoading
										? Array.from({ length: SKELETON_ROWS }).map((_, index) => (
												<TableRow key={`skeleton-${index + 1}`}>
													<TableCell>
														<Skeleton className="h-4 w-44" />
													</TableCell>
													<TableCell>
														<Skeleton className="h-4 w-24" />
													</TableCell>
													<TableCell>
														<Skeleton className="h-4 w-28" />
													</TableCell>
													<TableCell>
														<Skeleton className="h-5 w-20" />
													</TableCell>
													<TableCell>
														<Skeleton className="h-4 w-24" />
													</TableCell>
													<TableCell className="text-right">
														<Skeleton className="ml-auto h-8 w-20" />
													</TableCell>
												</TableRow>
											))
										: null}

									{!isLoading && jobs.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={6}
												className="py-10 text-center text-muted-foreground"
											>
												No jobs found for this search.
											</TableCell>
										</TableRow>
									) : null}

									{!isLoading
										? jobs.map((job) => (
												<TableRow key={job.id}>
													<TableCell className="font-medium">
														{job.title}
													</TableCell>
													<TableCell>{job.department}</TableCell>
													<TableCell>{job.location}</TableCell>
													<TableCell>
														<Badge
															variant="outline"
															className="capitalize"
														>
															{job.role_type.split("_").join(" ")}
														</Badge>
													</TableCell>
													<TableCell>
														{new Date(job.posted_date).toLocaleDateString(
															undefined,
															{
																year: "numeric",
																month: "short",
																day: "numeric",
															},
														)}
													</TableCell>
													<TableCell className="text-right">
														<Link
															href={`/jobs/${job.id}`}
															className={cn(
																buttonVariants({
																	size: "sm",
																	variant: "outline",
																}),
															)}
														>
															View
														</Link>
													</TableCell>
												</TableRow>
											))
										: null}
								</TableBody>
							</Table>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-sm text-muted-foreground">
								{pagination
									? `Showing page ${pagination.current_page} of ${pagination.total_pages} (${pagination.total} jobs)`
									: "Loading..."}
							</p>

							<Pagination className="mx-0 w-auto justify-start sm:justify-end">
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											disabled={page <= 1 || isLoading}
											onClick={() =>
												setPage((previous) => Math.max(1, previous - 1))
											}
										/>
									</PaginationItem>

									{pageNumbers.map((value) => (
										<PaginationItem key={value}>
											<PaginationLink
												isActive={value === page}
												disabled={isLoading}
												onClick={() => setPage(value)}
											>
												{value}
											</PaginationLink>
										</PaginationItem>
									))}

									<PaginationItem>
										<PaginationNext
											disabled={page >= totalPages || isLoading}
											onClick={() =>
												setPage((previous) =>
													Math.min(totalPages, previous + 1),
												)
											}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>

						{isFetching && !isLoading ? (
							<p className="text-xs text-muted-foreground">
								Updating job list...
							</p>
						) : null}
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
