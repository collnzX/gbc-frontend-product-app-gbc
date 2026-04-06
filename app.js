const productGrid = document.getElementById("productGrid");
const statusMessage = document.getElementById("statusMessage");
const refreshBtn = document.getElementById("refreshBtn");

// Replace this with your real Function URL
const apiUrl = "beckend-functionapp-gbc-cyhadbheeyazgben.canadacentral-01.azurewebsites.net";

async function loadProducts() {
    productGrid.innerHTML = "";
    statusMessage.textContent = "Loading products from Azure Function...";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const products = await response.json();

        if (!Array.isArray(products) || products.length === 0) {
            statusMessage.textContent = "No products found in the database.";
            return;
        }

        statusMessage.textContent = "Products loaded successfully.";

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            const id = product.id ?? product.Id ?? "N/A";
            const name = product.name ?? product.Name ?? "Unnamed";
            const price = product.price ?? product.Price ?? "N/A";

            card.innerHTML = `
                <h3>${name}</h3>
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Price:</strong> $${price}</p>
            `;

            productGrid.appendChild(card);
        });
    } catch (error) {
        statusMessage.innerHTML = `<span class="error">Failed to load products: ${error.message}</span>`;
        console.error("Fetch error:", error);
    }
}

refreshBtn.addEventListener("click", loadProducts);

loadProducts();