function renderWishlist() {
    const wishlistIds = getWishlist();
    const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));
    const container = document.getElementById("wishlistContainer");
    
    if (!container) return;
    
    if (wishlistProducts.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><i class="fas fa-heart-broken fa-4x text-muted mb-3"></i><h4>Wishlist is empty</h4><a href="shop.html" class="btn btn-primary">Shop Now</a></div>`;
        return;
    }
    
    container.innerHTML = wishlistProducts.map(p => `
        <div class="col-md-6 col-lg-4"><div class="card product-card h-100"><img src="${p.image}" class="card-img-top"><div class="card-body"><h5>${p.name}</h5><p class="text-primary fw-bold">₹${p.price.toLocaleString()}</p><div class="d-flex gap-2"><a href="product.html?id=${p.id}" class="btn btn-outline-primary btn-sm flex-grow-1">View Details</a><button class="btn btn-danger btn-sm remove-wishlist" data-id="${p.id}"><i class="fas fa-trash"></i></button></div></div></div></div>
    `).join('');
    
    document.querySelectorAll(".remove-wishlist").forEach(btn => {
        btn.addEventListener("click", () => {
            let wishlist = getWishlist().filter(id => id !== parseInt(btn.dataset.id));
            saveWishlist(wishlist);
            renderWishlist();
            showToast("Removed from wishlist");
        });
    });
}

document.addEventListener("DOMContentLoaded", renderWishlist);