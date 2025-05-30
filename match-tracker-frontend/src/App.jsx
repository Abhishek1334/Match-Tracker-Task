import Home from "./pages/Home"
import ThemeToggle from "./components/ThemeToggle"


function App() {
	// testing dark mode and ligjt mode theme
	return (
		<div className="p-3 container-fluid">
			<ThemeToggle />
			<Home />
		</div>
	)
}

export default App
