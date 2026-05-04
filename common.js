// ========================================
// COMMON FUNCTIONS - CART, WISHLIST, TOAST, ORDERS
// ========================================

const CART_KEY = "eye_vision_cart";
const WISHLIST_KEY = "eye_vision_wishlist";
const ORDERS_KEY = "eye_vision_orders";

// ========== CART FUNCTIONS ==========
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(product, quantity = 1, color = "Default", size = "Default") {
    let cart = getCart();
    
    const existingIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
    );
    
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
        showToast(`✅ ${product.name} quantity updated! (${color}, ${size})`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            selectedColor: color,
            selectedSize: size
        });
        showToast(`✅ ${product.name} (${color}, ${size}) added to cart!`);
    }
    
    saveCart(cart);
    return cart;
}

function removeFromCart(index) {
    let cart = getCart();
    const removed = cart[index];
    cart.splice(index, 1);
    saveCart(cart);
    showToast(`🗑️ ${removed.name} removed from cart`);
    return cart;
}

function updateCartQuantity(index, newQty) {
    let cart = getCart();
    if (newQty <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity = newQty;
    }
    saveCart(cart);
    return cart;
}

function updateCartBadge() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("#cartCount").forEach(badge => {
        if (badge) badge.innerText = total;
    });
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ========== WISHLIST FUNCTIONS ==========
function getWishlist() {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    document.querySelectorAll("#wishlistCount").forEach(badge => {
        if (badge) badge.innerText = wishlist.length;
    });
}

function toggleWishlist(productId) {
    let wishlist = getWishlist();
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast("❤️ Removed from wishlist");
    } else {
        wishlist.push(productId);
        showToast("✨ Added to wishlist");
    }
    saveWishlist(wishlist);
}

function isInWishlist(productId) {
    return getWishlist().includes(productId);
}

// ========== ORDERS FUNCTIONS ==========
function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    orders.unshift(orderData);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

// ========== UI HELPERS ==========
function showToast(message, type = "success") {
    const existing = document.querySelector(".toast-notify");
    if (existing) existing.remove();
    
    const toast = document.createElement("div");
    toast.className = "toast-notify";
    toast.innerHTML = `<i class="fas fa-${type === "error" ? "exclamation-circle" : "check-circle"} me-2"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast) toast.remove();
    }, 2800);
}

function renderStars(rating) {
    let stars = "";
    for (let i = 0; i < Math.floor(rating); i++) stars += '<i class="fas fa-star"></i>';
    if (rating % 1 >= 0.5) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = Math.ceil(rating); i < 5; i++) stars += '<i class="far fa-star"></i>';
    return `<span class="rating">${stars} (${rating})</span>`;
}

// ========== DARK MODE ==========
function initDarkMode() {
    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;
    
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });
}

// ========== SEARCH FUNCTION ==========
function searchProducts(searchTerm) {
    if (!searchTerm) return products;
    return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

// ========== FILTER FUNCTIONS ==========
function filterByCategory(products, category) {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
}

function filterBySubCategory(products, subCategory) {
    if (subCategory === "all") return products;
    return products.filter(p => p.subCategory === subCategory);
}

function sortByPrice(products, order) {
    if (order === "low-high") {
        return [...products].sort((a, b) => a.price - b.price);
    } else if (order === "high-low") {
        return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
}

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    updateCartBadge();
    saveWishlist(getWishlist());
    console.log("Common.js initialized");
});