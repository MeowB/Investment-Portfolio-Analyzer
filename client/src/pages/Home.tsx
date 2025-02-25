import "../styles/Home.css";

const Home = () => {
  const articles = [
    {
      title: "Market Trends in 2023",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      source: "Financial Times",
      image: "https://via.placeholder.com/150",
      category: "Market Trends"
    },
    {
      title: "Top 10 Stocks to Watch",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      source: "Bloomberg",
      image: "https://via.placeholder.com/150",
      category: "Stocks"
    },
    {
      title: "How to Diversify Your Portfolio",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      source: "Investopedia",
      image: "https://via.placeholder.com/150",
      category: "Investment"
    },
    {
      title: "Understanding Market Volatility",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      source: "Wall Street Journal",
      image: "https://via.placeholder.com/150",
      category: "Market Analysis"
    },
    {
      title: "Investment Strategies for Beginners",
      content: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
      source: "Forbes",
      image: "https://via.placeholder.com/150",
      category: "Investment"
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Investment Portfolio Analyzer</h1>
        <p>Your one-stop solution for managing and analyzing your investment portfolio.</p>
      </section>
      <section className="news-feed">
        <h2>Latest News</h2>
        <div className="articles">
          {articles.map((article, index) => (
            <div key={index} className="article">
              <img src={article.image} alt={article.title} className="article-image" />
              <div className="article-content">
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <p className="article-source">Source: {article.source}</p>
                <p className="article-category">Category: {article.category}</p>
                <button className="read-more-button">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="cta-section">
        <h2>Get Started Today</h2>
        <p>Simplify your portfolio management today.</p>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
};

export default Home;
