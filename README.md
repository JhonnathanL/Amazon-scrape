# Amazon Product Scraper

This project is a web scraper designed to fetch search results from the Amazon website based on a user-provided keyword. It utilizes a Node.js server with Express on the server side, and HTML, JavaScript, and CSS on the client side.

## How to Use

### Prerequisites

- Node.js installed
- NPM (Node Package Manager) installed

### Getting Started

1. Navigate to the project directory:

    ```bash
    cd node-scrape
    ```

2. Install the dependencies:

    ```
    npm install
    ```

3. Execution

   Start the server:

    ```
    node index.js
    ```

   The server will be available at http://localhost:3000.

4. Open the `index.html` in public file in a web browser.

5. Enter a keyword in the search box and click the "Search on Amazon" button.

6. Wait for the results to be displayed in the results section.

### Notes

- Ensure you have an internet connection as the web scraper relies on making requests to the Amazon website.
- The project includes a `styles.css` file in the `css` directory to style the user interface. Feel free to customize as needed.
