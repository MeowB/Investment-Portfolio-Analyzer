
## **Live Demo**

You can access the deployed version of the **Investment Portfolio Analyzer** here:

[**Live Demo Link**](https://investment-portfolio-analyzer.vercel.app/)

## **Project Reflection: My Full-Stack Development Journey**

Read about my journey building the investment portfolio analyzer here:

[**Full Article**](https://medium.com/@meolearn/one-week-to-get-hired-4716a634295f)



---

# Investment Portfolio Analyzer

An intuitive web application that allows users to track their investments, view real-time portfolio values, profit/loss calculations, and stay updated with the latest market news. Built with a Python Flask backend, React frontend, and Finnhub Stock API for real-time stock data.

## Features

- **Track Your Portfolio:**  
  Add and manage stock holdings in your portfolio, with real-time updates on each stock's price and performance.

- **Real-Time Portfolio Analytics:**  
  View your portfolio's overall value and performance, including profits and losses based on stock prices fetched from Finnhub.

- **News Feed:**  
  Stay informed with the latest market news and financial updates. Powered by Finnhub API, this section shows relevant news articles with summaries and links.

- **Interactive Visualizations:**  
  Dynamic charts display stock performance in your portfolio and allow you to visualize your stock holdings in pie chart format.

- **Responsive Design:**  
  The website is optimized for both desktop and mobile devices, ensuring a seamless user experience.

## Technologies Used

- **Backend:**  
  - **Python**  
  - **Flask**  
  - **SQLite**  
  - **Finnhub API** for stock data and news feed

- **Frontend:**  
  - **React**  
  - **TypeScript**  
  - **SASS** for styling

- **Libraries & Tools:**  
  - **React Chart.js 2** for data visualization  
  - **Axios** for API requests  
  - **Flask-CORS** for handling cross-origin requests  
  - **React Router** for page navigation

## Setup Instructions

### Prerequisites

- **Node.js** (for frontend)
- **Python 3.7+** (for backend)
- **Finnhub API Key** (sign up on [Finnhub](https://finnhub.io/) for a free API key)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MeowB/investment-portfolio-analyzer.git
   cd investment-portfolio-analyzer/backend
   ```

2. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your **Finnhub API key** as an environment variable.

4. Run the Flask backend:
   ```bash
   flask fill-db
   flask run
   ```

   The backend will now be running at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Install required Node packages:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

   The frontend will now be running at `http://localhost:5173`.

### Configuration

- Ensure that both the backend and frontend are running concurrently.  
- The frontend will make API requests to the backend for stock data and news.

## Usage

1. **Create a Portfolio:**  
   Register or log in to create a personalized portfolio and begin adding stock holdings.

2. **View Portfolio Analytics:**  
   The homepage displays your portfolio's total value and daily changes, along with news updates and stock performance charts.

3. **Stay Updated with Market News:**  
   Access the latest financial news and articles, updated in real-time.

## Future Features

- **User Authentication:**  
  Implement authentication to allow users to save multiple portfolios and access them later.platforms.


## License

This project is licensed under the MIT License - see the [LICENSE](./copyright.txt) OpenSource website for details.

---

Let me know if you want to tweak or add any details!
