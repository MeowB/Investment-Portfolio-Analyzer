import { Link } from "react-router-dom"
import '../styles/Header.css'

const Header = () => {
	return (
		<header>
			<nav>
				<h1 className="nav-logo"><Link to='/'>Investment Portfolio Analyzer</Link></h1>
				<ul>
					<li className="nav-item">
						<Link to="\">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="\create">
							Create Portfolio
						</Link>
					</li>
					<li className="nav-item">
						<Link to="\portfolios">
							View Portfolio
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
