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


export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: string;
    title: string;
    url: string;
    urlToImage: string;
	category: string
}
