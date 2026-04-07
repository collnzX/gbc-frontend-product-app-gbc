const productGrid = document.getElementById("productGrid");
const statusMessage = document.getElementById("statusMessage");
const refreshBtn = document.getElementById("refreshBtn");
const searchInput = document.getElementById("searchInput");
const productCount = document.getElementById("productCount");

const apiUrl = "YOUR_REAL_FUNCTION_URL_HERE";

let allProducts = [];

function renderProducts(products) {
  productGrid.innerHTML = "";
  productCount.textContent = products.length;

  if (!products.length) {
    productGrid.innerHTML = `<div class="product-card"><p>No matching products found.</p></div>`;
    return;
  }

  products.forEach((product) => {
    const id = product.id ?? product.Id ?? "N/A";
    const name = product.name ?? product.Name ?? "Unnamed";
    const price = product.price ?? product.Price ?? "N/A";

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${name}</h3>
      <p><strong>ID:</strong> ${id}</p>
      <p><strong>Price:</strong> $${price}</p>
    `;
    productGrid.appendChild(card);
  });
}

async function loadProducts() {
  statusMessage.textContent = "Loading products from Azure Function...";
  productGrid.innerHTML = "";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const products = await response.json();
    allProducts = Array.isArray(products) ? products : [];

    statusMessage.textContent = "Products loaded successfully.";
    renderProducts(allProducts);
  } catch (error) {
    statusMessage.innerHTML = `<span class="error">Failed to load products: ${error.message}</span>`;
    console.error("Fetch error:", error);
  }
}

function filterProducts() {
  const term = searchInput.value.trim().toLowerCase();

  const filtered = allProducts.filter((product) => {
    const name = String(product.name ?? product.Name ?? "").toLowerCase();
    return name.includes(term);
  });

  renderProducts(filtered);
}

refreshBtn.addEventListener("click", loadProducts);
searchInput.addEventListener("input", filterProducts);

loadProducts();