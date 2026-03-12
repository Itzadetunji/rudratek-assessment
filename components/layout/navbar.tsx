"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReadCvLogoIcon } from "@phosphor-icons/react";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/jobs", label: "Jobs" },
];

const THEME_KEY = "preferred-theme";

const applyTheme = (isDark: boolean) => {
	if (isDark) {
		document.documentElement.classList.add("dark");
		return;
	}

	document.documentElement.classList.remove("dark");
};

export function Navbar() {
	const pathname = usePathname();
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const savedTheme = window.localStorage.getItem(THEME_KEY);
		if (savedTheme) {
			const dark = savedTheme === "dark";
			setIsDark(dark);
			applyTheme(dark);
			setMounted(true);
			return;
		}

		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		setIsDark(prefersDark);
		applyTheme(prefersDark);
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		const nextTheme = !isDark;
		setIsDark(nextTheme);
		applyTheme(nextTheme);
		window.localStorage.setItem(THEME_KEY, nextTheme ? "dark" : "light");
	};

	const themeLabel = useMemo(() => (isDark ? "Light" : "Dark"), [isDark]);

	return (
		<nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="flex items-center space-x-2"
				>
					<ReadCvLogoIcon
						size={20}
						weight="bold"
						color="currentColor"
					/>
					<span className="text-xl font-bold">Check Jobs</span>
				</Link>

				<div className="hidden items-center gap-2 md:flex">
					{navItems.map((item) => {
						const isActive =
							item.href === "/"
								? pathname === "/"
								: pathname.startsWith(item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									buttonVariants({
										variant: isActive ? "default" : "ghost",
										size: "default",
									}),
								)}
							>
								{item.label}
							</Link>
						);
					})}

					<Button
						variant="outline"
						onClick={toggleTheme}
					>
						{mounted ? `${themeLabel} mode` : "Theme"}
					</Button>
				</div>

				<div className="flex items-center gap-2 md:hidden">
					<Button
						variant="outline"
						size="sm"
						onClick={toggleTheme}
					>
						{mounted ? themeLabel : "Theme"}
					</Button>
					<Button
						variant="ghost"
						size="icon-sm"
						aria-label="Toggle navigation menu"
						onClick={() => setMobileOpen((previous) => !previous)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-6 w-6"
							aria-hidden="true"
						>
							<path d="M4 5h16" />
							<path d="M4 12h16" />
							<path d="M4 19h16" />
						</svg>
					</Button>
				</div>
			</div>

			{mobileOpen ? (
				<div className="border-t border-border/60 bg-background/90 px-4 py-3 backdrop-blur-xl md:hidden">
					<div className="flex flex-col gap-2">
						{navItems.map((item) => {
							const isActive =
								item.href === "/"
									? pathname === "/"
									: pathname.startsWith(item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										buttonVariants({
											variant: isActive ? "default" : "ghost",
											size: "default",
										}),
										"justify-start",
									)}
									onClick={() => setMobileOpen(false)}
								>
									{item.label}
								</Link>
							);
						})}
					</div>
				</div>
			) : null}
		</nav>
	);
}
