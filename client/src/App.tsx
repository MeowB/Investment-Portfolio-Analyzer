import './styles/helpers/reset.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout'
import CreatePortfolio from './pages/CreatePortfolioPage';
import Home from './pages/Home';
import PortfoliosListPage from './pages/PortfoliosListPage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
	return (
		<>
			<Router>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path="/create" element={<CreatePortfolio />} />
						<Route path="/portfolios" element={<PortfoliosListPage />} />
						<Route path="/portfolios/:id" element={<PortfolioPage />} />
					</Routes>
				</Layout>
			</Router>
		</>
	)
}

export default App
