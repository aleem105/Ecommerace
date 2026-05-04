document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("productsContainer");
    if (!container) return;
    
    const featured = products.filter(p => p.featured === true);
    
    if (featured.length === 0) {
        container.innerHTML = `<div class="col-12 text-center"><h4>No featured products</h4></div>`;
        return;
    }
    
    container.innerHTML = featured.map(p => `
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
});