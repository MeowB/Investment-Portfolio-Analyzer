
## **Live Demo**

You can access the deployed version of the **Investment Portfolio Analyzer** here:

[**Live Demo Link**](https://investment-portfolio-analyzer.vercel.app/)

---

# **Investment Portfolio Analyzer**

## **Project Description**
The **Investment Portfolio Analyzer** is a web application that allows users to manage and analyze their stock portfolios. The app fetches real-time stock data from the **Finnhub Stock API** and enables users to input their stock holdings, view the current value of their portfolios, calculate profits and losses, and visualize the data through interactive charts.

### **Features:**
- **User Input:** Add stocks to your portfolio by entering stock tickers, quantities, purchase dates, and purchase prices.
- **Real-Time Stock Data:** Fetches live stock prices from Finnhub to update portfolio values.
- **Profit/Loss Calculation:** Displays profit/loss for each stock and the entire portfolio based on the historical price on the purchase date compared to the current price.
- **Interactive Visualizations:** Visualize portfolio data with pie charts and historical stock performance using Plotly.

## **Tech Stack**
- **Backend:**
  - **Flask:** Python framework used to build the backend API that handles stock data, calculations, and database interactions.
  - **Finnhub API:** Provides real-time stock price data and historical information.
  - **SQLite:** Lightweight database used to store user portfolio data.
  - **python-dotenv:** For managing environment variables, like API keys, securely.

- **Frontend:**
  - **Vite:** Fast build tool and development server for React, providing an optimal development experience.
  - **React:** JavaScript library for building the user interface, focusing on a responsive, dynamic experience.
  - **Axios:** Used for making HTTP requests to the Flask backend.
  - **React Router DOM:** For client-side routing and navigation.

- **Visualization:**
  - **Plotly:** Interactive graphing library used to display charts like portfolio distribution and stock price history.

## **Profit/Loss Calculation Method**
- **User Input:** 
  - **Stock Ticker** (e.g., AAPL for Apple)
  - **Quantity of Shares**
  - **Purchase Date** (the exact date they bought the stock)
  
- **Historical Price:**
  - The **purchase price** is fetched using the **historical closing price** of the stock from the **Finnhub API** on the specific **purchase date** provided by the user.

- **Real-Time Price:**
  - The **current price** is fetched from the **Finnhub API** in real-time.

- **Profit/Loss Calculation:**
  - The profit/loss for each stock is calculated as:
    ```plaintext
    Profit/Loss = (Current Price - Purchase Price) * Quantity
    ```
  - **Purchase Price** is the **historical closing price** from the purchase date.
  - **Current Price** is the real-time price fetched from the Finnhub API.
  - The final profit/loss is summed for all stocks in the portfolio to calculate the total.

### **Example:**
For a user who bought **10 shares of Apple (AAPL)** on **2023-01-15** at a **purchase price of $150** and the **current price** is **$170**, the profit/loss would be:
```plaintext
Profit/Loss = ($170 - $150) * 10 = $200 profit
```
If the current price is **$130**, the loss would be:
```plaintext
Profit/Loss = ($130 - $150) * 10 = $200 loss
```


## **Future Enhancements**
- Add user authentication for personalized portfolio management.
- Implement historical stock data tracking and comparison.

---
