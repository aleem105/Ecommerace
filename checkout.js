document.addEventListener("DOMContentLoaded", function() {
    const cart = getCart();
    const summaryDiv = document.getElementById("checkoutSummary");
    const totalDiv = document.getElementById("checkoutTotal");
    
    if (cart.length === 0) {
        window.location.href = "cart.html";
        return;
    }
    
    let total = 0;
    summaryDiv.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `<div class="summary-item"><span>${item.name} x ${item.quantity} (${item.selectedColor}, ${item.selectedSize})</span><span>₹${itemTotal.toLocaleString()}</span></div>`;
    }).join('');
    totalDiv.innerHTML = `<strong>Total: ₹${total.toLocaleString()}</strong>`;
    
    document.getElementById("checkoutForm").addEventListener("submit", (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value;
        
        if (!fullName || !email || !phone || !address || !city) {
            alert("❌ Please fill all fields");
            return;
        }
        
        const orderNumber = "ORD" + Date.now().toString().slice(-8);
        saveOrder({ orderNumber, date: new Date().toLocaleString(), customerName: fullName, email, phone, address, city, items: cart, totalAmount: total, status: "Confirmed" });
        
        localStorage.removeItem(CART_KEY);
        updateCartBadge();
        
        document.getElementById("orderSummary").style.display = "none";
        document.getElementById("checkoutForm").style.display = "none";
        document.getElementById("orderConfirmation").innerHTML = `<div class="text-center"><i class="fas fa-check-circle fa-4x text-success mb-3"></i><h3>Order Placed!</h3><p>Order #${orderNumber}<br>Total: ₹${total.toLocaleString()}<br>Confirmation sent to ${email}</p><a href="orders.html" class="btn btn-primary">View Orders</a><a href="index.html" class="btn btn-secondary">Continue Shopping</a></div>`;
    });
});