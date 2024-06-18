const root = document.getElementById('root');
const searchBar = document.getElementById('search-bar');

let products = [];

// Fetch products from the API
const fetchProducts = (searchTerm = '') => {
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            products = data.products;
            renderUI(products);
        })
        .catch(error => {
            alert(error);
        });
};

// Initial fetch to get all products
fetchProducts();

const renderUI = (products) => {
    root.innerHTML = ''; 
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-image" />
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
        `;
        root.appendChild(card);
    });
};

const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    fetchProducts(searchTerm);
};

// Add event listener to the search bar
searchBar.addEventListener('input', handleSearch);
