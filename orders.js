document.addEventListener("DOMContentLoaded", function() {
    const orders = getOrders();
    const container = document.getElementById("ordersContainer");
    
    if (orders.length === 0) {
        container.innerHTML = `<div class="text-center py-5"><i class="fas fa-box-open fa-4x text-muted mb-3"></i><h4>No orders yet</h4><a href="shop.html" class="btn btn-primary">Start Shopping</a></div>`;
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="card mb-3"><div class="card-header bg-primary text-white d-flex justify-content-between"><span><i class="fas fa-receipt"></i> Order #${order.orderNumber}</span><span><i class="fas fa-calendar"></i> ${order.date}</span><span class="badge bg-success">${order.status}</span></div><div class="card-body"><p><strong>${order.customerName}</strong> | ${order.address}, ${order.city}</p><div class="bg-light p-2 rounded">${order.items.map(i => `<div class="d-flex justify-content-between"><span>${i.name} x ${i.quantity} (${i.selectedColor}, ${i.selectedSize})</span><span>₹${(i.price * i.quantity).toLocaleString()}</span></div>`).join('')}</div><hr><div class="text-end fw-bold fs-5">Total: ₹${order.totalAmount.toLocaleString()}</div></div></div>
    `).join('');
});