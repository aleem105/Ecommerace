function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cartItemsList");
    const totalContainer = document.getElementById("cartTotal");
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-5"><i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i><h4>Your cart is empty</h4><a href="shop.html" class="btn btn-primary mt-2">Continue Shopping</a></div>`;
        if (totalContainer) totalContainer.innerHTML = "";
        return;
    }
    
    let cartTotal = 0;
    container.innerHTML = cart.map((item, idx) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;
        return `<div class="cart-item-card card mb-3 p-3"><div class="row align-items-center"><div class="col-3 col-md-2"><img src="${item.image}" class="cart-item-img w-100"></div><div class="col-5 col-md-4"><h6 class="mb-0">${item.name}</h6><small class="text-muted">${item.selectedColor} | ${item.selectedSize}</small></div><div class="col-2 col-md-2"><span class="fw-bold">₹${item.price}</span></div><div class="col-2 col-md-2"><input type="number" class="form-control qty-input" data-index="${idx}" value="${item.quantity}" min="1" style="width:70px"></div><div class="col-3 col-md-1"><span class="fw-bold text-primary">₹${itemTotal}</span></div><div class="col-2 col-md-1 text-end"><button class="btn btn-sm btn-danger remove-item" data-index="${idx}"><i class="fas fa-trash"></i></button></div></div></div>`;
    }).join('');
    
    if (totalContainer) {
        totalContainer.innerHTML = `<div class="bg-light p-3 rounded"><div class="d-flex justify-content-between mb-2"><span>Subtotal:</span><span>₹${cartTotal.toLocaleString()}</span></div><div class="d-flex justify-content-between mb-2"><span>Shipping:</span><span class="text-success">Free</span></div><hr><div class="d-flex justify-content-between fs-4"><strong>Total:</strong><strong class="text-primary">₹${cartTotal.toLocaleString()}</strong></div></div>`;
    }
    
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => { removeFromCart(parseInt(btn.dataset.index)); renderCart(); });
    });
    document.querySelectorAll(".qty-input").forEach(input => {
        input.addEventListener("change", () => { updateCartQuantity(parseInt(input.dataset.index), parseInt(input.value)); renderCart(); });
    });
}

document.addEventListener("DOMContentLoaded", renderCart);