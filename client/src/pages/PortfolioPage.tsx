import { useEffect, useState } from "react";
import { fetchPortfolio, deletePortfolio } from "../services/db_calls";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PortfolioPage.css";
import { FaPenSquare, FaTrash } from "react-icons/fa";
import SymbolList from "../components/SymbolList";
import CreatePortfolioForm from "../components/CreatePortfolioForm";
import CustomActiveShapePieChart from "../components/CustomActiveShapePieChart";
import { Stocks, StockValue } from '../utils/interfaces'

const PortfolioPage = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [portfolio, setPortfolio] = useState<any>(null);
    const [editPortfolio, setEditPortfolio] = useState<boolean>(false);
	const [chartData, setChartData] = useState<any[]>([]);
	const [totalValue, setTotalValue] = useState<number>(0);
	const [totalProfitLoss, setTotalProfitLoss] = useState<number>(0);

    if (typeof(id) !== 'string') {
        console.error('Invalid ID: The provided ID must be a string.');
        return <p>Error: Invalid portfolio ID.</p>;
    }
	

	const chartDataCallback = (stocks: Stocks[], stocksValue: { [key: string]: StockValue }) => {
		let totalValue = 0;
		let totalProfitLoss = 0;

		const data = stocks.map(stock => {
			const currentValue = stocksValue[stock.stock_symbols]?.current_price * stock.quantity || 0;
			const profitLoss = (stocksValue[stock.stock_symbols]?.current_price - stock.purchase_price) * stock.quantity || 0;

			totalValue += currentValue;
			totalProfitLoss += profitLoss;

			return {
				name: stock.stock_symbols,
				value: currentValue,
			};
		});

		setChartData(data);
		setTotalValue(totalValue);
		setTotalProfitLoss(totalProfitLoss);
	};

    const fetchData = async () => {
        try {
            let response = await fetchPortfolio(id);
            setPortfolio(response);
        } catch (error) {
            console.error("Error fetching portfolio:", error);
        }
    };

    const handleEdit = () => {
        setEditPortfolio(!editPortfolio);
        console.log("Edit portfolio:", id);
    };

    const handleDelete = async () => {
        let alert = window.confirm(`Are you sure you want to delete the Portfolio "${portfolio.name}"`);
        if (alert === true) {
            await deletePortfolio(id);
            navigate('/portfolios');
            console.log("Delete portfolio:", id);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div>
            {portfolio ? (
                <div className="single-portfolio">
                    <div className="portfolio-actions">
                        <FaPenSquare onClick={handleEdit} />
                        <FaTrash onClick={handleDelete} />
                    </div>
                    {editPortfolio
                        ? (
                            <CreatePortfolioForm
                                portfolioName={portfolio.name}
                                portfolioDescription={portfolio.description}
                                edit={true}
                                id={id}
                                setEditPortfolio={setEditPortfolio}
                                setPortfolio={setPortfolio}
                            />
                        )
                        : (
                            <div className="portfolio-detaile">
                                <h1>{portfolio.name}</h1>
                                <p>{portfolio.description}</p>
                            </div>
                        )}
                    <p>Created on: {new Date(portfolio.timestamp).toLocaleString()}</p>
                    <div className="chart-container">
                        <CustomActiveShapePieChart data={chartData} />
						<div className="chart-data">
							<span>Total Value: ${totalValue.toFixed(2)}</span>
							{totalProfitLoss > 0 
							?<p className="profit">Total Profit/Loss: <span className="profit">${totalProfitLoss.toFixed(2)}</span></p>
							:<p>Total Profit/Loss: <span className="loss">${totalProfitLoss.toFixed(2)}</span></p>}
							
						</div>
                    </div>
                    <SymbolList portfolioId={id} chartDataCallback={chartDataCallback} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PortfolioPage;
