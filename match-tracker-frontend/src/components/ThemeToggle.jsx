import { useState, useEffect } from "react";

// Theme Context Hook
const useTheme = () => {
	const [isDark, setIsDark] = useState(false);

	// Initialize theme from localStorage or system preference
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			const isDarkMode = savedTheme === "dark";
			setIsDark(isDarkMode);
			updateTheme(isDarkMode);
		} else {
			// Check system preference
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			setIsDark(prefersDark);
			updateTheme(prefersDark);
		}
	}, []);

	const updateTheme = (dark) => {
		if (dark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		updateTheme(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");
	};

	return { isDark, toggleTheme };
};

// Animated Theme Toggle Button Component
const ThemeToggle = ({ className = "" }) => {
	const { isDark, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`
        relative inline-flex h-10 w-10 items-center justify-center
        rounded-lg bg-background border border-border
        hover:bg-accent hover:text-accent-foreground
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-ring
        ${className}
      `}
			aria-label="Toggle theme"
		>
			{/* Sun Icon */}
			<svg
				className={`absolute h-5 w-5 transition-all duration-300 ${
					isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
				}`}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<circle cx="12" cy="12" r="5" />
				<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
			</svg>

			{/* Moon Icon */}
			<svg
				className={`absolute h-5 w-5 transition-all duration-300 ${
					isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
				}`}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			</svg>
		</button>
	);
};

export default ThemeToggle;