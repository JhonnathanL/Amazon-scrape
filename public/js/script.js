// Function to retrieve Amazon data based on the user input
function getAmazonData() {
  const keyword = document.getElementById('keyword').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`, true);

  // Handle the response of the AJAX request
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const resultDiv = document.getElementById('results');
        renderProducts(JSON.parse(xhr.responseText), resultDiv);

        // Hide the element with ID 'search' after obtaining the results
        const searchElement = document.getElementById('search');
        searchElement.style.display = 'none';
      } else {
        console.error('Error fetching Amazon search results:', xhr.status, xhr.statusText);
      }
    }
  };
  xhr.send();
}
// Function to render product data in the specified container
function renderProducts(data, container) {

  container.innerHTML = '';
  for (let i = 1; i < data.results.length; i++) {
    const product = data.results[i];

    // Create elements for product details
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('product-title');
    titleDiv.textContent = product.title;

    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('product-rating');
    ratingDiv.textContent = `Rating: ${product.rating}`;

    const reviewsDiv = document.createElement('div');
    reviewsDiv.classList.add('product-reviews');
    reviewsDiv.textContent = `Reviews: ${product.reviews}`;

    const imageDiv = document.createElement('div');
    const image = document.createElement('img');
    image.src = product.imageURL;
    imageDiv.appendChild(image);

    // Append product details to the main product container
    
    productDiv.appendChild(titleDiv);
    productDiv.appendChild(ratingDiv);
    productDiv.appendChild(reviewsDiv);
    productDiv.appendChild(imageDiv);

    container.appendChild(productDiv);
  }
}
