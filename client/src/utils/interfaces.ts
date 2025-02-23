
export interface StockValue {
	current_price: number;
	high: number;
	low: number;
	open: number;
	previous_close: number;
}

export interface Stocks {
	purchase_price: number,
	quantity: number,
	stock_symbols: string
}