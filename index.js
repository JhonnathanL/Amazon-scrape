// Import necessary packages
const express = require('express'); 
const axios = require('axios');     
const cheerio = require('cheerio');  
const cors = require('cors');       
const app = express();           
const port = 3000;                   

// Enable CORS for all routes
app.use(cors());

// Define a route for scraping Amazon search results
app.get('/api/scrape', async (req, res) => {
  const { keyword } = req.query;

  // Check if the 'keyword' parameter is missing
  if (!keyword) {
    return res.status(400).json({ error: 'Missing keyword parameter' });
  }

  try {
    // Construct the Amazon search URL with the provided keyword
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Make an HTTP GET request to the Amazon search URL
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.amazon.com/',
      },
    });

    // Use Cheerio to load the HTML response and extract information from the page
    const $ = cheerio.load(response.data);
    const results = [];

    // Iterate over each search result item and extract relevant details
    $('div.s-result-item').each(async (index, element) => {
      const title = $(element).find('span.a-text-normal').text().trim();
      const imageURL = $(element).find('img.s-image').attr('src');
      const reviews = $(element).find('span.a-size-base.s-underline-text').text().trim();
      const rating = $(element).find('span.a-icon-alt').text().trim();

      // Create an object with product details and push it to the results array
      const productDetails = {
        title,
        rating,
        reviews,
        imageURL, 
      };

      results.push(productDetails);

      // Introduce a delay of 1000 milliseconds between each iteration
      await delay(10000);
    });
    
    // Send the scraped data as a JSON response
    res.json({ keyword, results });

  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error('Error fetching Amazon search results:', error.message);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Define a function to introduce a delay using Promises
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
