import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Header from '../components/Header'
import Footer from '../components/Footer'


const layout = ({ children }: any) => {
	return (
		<div>
			<Header />
				<main>
					{children}
				</main>
			<Footer />
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	)
}

export default layout
