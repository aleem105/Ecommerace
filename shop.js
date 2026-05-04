document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("shopProductsContainer");
    const categoryFilter = document.getElementById("categoryFilter");
    const subCategoryFilter = document.getElementById("subCategoryFilter");
    const sortSelect = document.getElementById("sortSelect");
    const searchInput = document.getElementById("shopSearch");
    const resetBtn = document.getElementById("resetFilters");
    
    function filterAndRender() {
        let filtered = [...products];
        
        // Search
        const searchTerm = searchInput?.value.toLowerCase().trim() || "";
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
        }
        
        // Category filter
        const category = categoryFilter?.value || "all";
        if (category !== "all") {
            filtered = filtered.filter(p => p.category === category);
        }
        
        // Sub-category filter
        const subCategory = subCategoryFilter?.value || "all";
        if (subCategory !== "all") {
            filtered = filtered.filter(p => p.subCategory === subCategory);
        }
        
        // Sorting
        const sortValue = sortSelect?.value || "default";
        if (sortValue === "low-high") filtered.sort((a, b) => a.price - b.price);
        if (sortValue === "high-low") filtered.sort((a, b) => b.price - a.price);
        
        renderProducts(filtered);
    }
    
    function renderProducts(prods) {
        if (prods.length === 0) {
            container.innerHTML = `<div class="col-12 text-center py-5"><i class="fas fa-search fa-3x text-muted mb-3"></i><h4>No products found</h4><p>Try adjusting your filters</p></div>`;
            return;
        }
        
        container.innerHTML = prods.map(p => `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card product-card h-100">
                    <img src="${p.image}" class="card-img-top" alt="${p.name}">
                    <div class="card-body">
                        <span class="badge bg-secondary mb-2">${p.category}</span>
                        <h6 class="product-title">${p.name}</h6>
                        <p class="product-price">₹${p.price.toLocaleString()}</p>
                        <div class="mb-2">${renderStars(p.rating)}</div>
                        <div class="d-flex justify-content-between">
                            <a href="product.html?id=${p.id}" class="btn btn-sm btn-outline-primary">View Details</a>
                            <i class="fas fa-heart wishlist-heart ${isInWishlist(p.id) ? 'active' : ''}" data-id="${p.id}"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.wishlist-heart').forEach(heart => {
            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(heart.dataset.id);
                toggleWishlist(id);
                heart.classList.toggle('active');
            });
        });
    }
    
    searchInput?.addEventListener("input", filterAndRender);
    categoryFilter?.addEventListener("change", filterAndRender);
    subCategoryFilter?.addEventListener("change", filterAndRender);
    sortSelect?.addEventListener("change", filterAndRender);
    resetBtn?.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        if (categoryFilter) categoryFilter.value = "all";
        if (subCategoryFilter) subCategoryFilter.value = "all";
        if (sortSelect) sortSelect.value = "default";
        filterAndRender();
    });
    
    filterAndRender();
});