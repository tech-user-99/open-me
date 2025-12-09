document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Checkout.js loaded');
    
    // Initialize WhatsAppOrder if available
    if (window.WhatsAppOrder) {
        console.log('✅ WhatsAppOrder found, initializing...');
        const wa = new WhatsAppOrder();
        wa.init();
        
        // Override the default form handler to use WhatsApp
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            console.log('✅ Form found, overriding submit handler');
            
            // Remove any existing submit handlers
            checkoutForm.removeEventListener('submit', handleFormSubmit);
            
            // Add WhatsApp handler
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('📝 Form submitted, delegating to WhatsAppOrder');
                wa.sendOrder();
            });
        }
    } else {
        console.log('⚠️ WhatsAppOrder not found, using default checkout');
        setupDefaultCheckout();
    }
    
    // Update shipping method listener
    const shippingSelect = document.getElementById('shipping-method');
    if (shippingSelect) {
        shippingSelect.addEventListener('change', function() {
            console.log('🚚 Shipping method changed:', this.value);
            if (window.WhatsAppOrder) {
                const wa = new WhatsAppOrder();
                wa.updateSummary();
            } else {
                updateOrderSummary();
            }
        });
    }
});

function setupDefaultCheckout() {
    // Only use this if WhatsAppOrder is not available
    console.log('🔄 Setting up default checkout');
    
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initial summary update
    updateOrderSummary();
}

function handleFormSubmit(e) {
    e.preventDefault();
    console.log('📦 Processing order (default method)');
    
    // Validate form
    const requiredFields = [
        'first-name', 'last-name', 'email', 'phone', 'address',
        'city', 'state', 'zip', 'country', 'shipping-method', 'payment-type'
    ];
    
    let isValid = true;
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        if (window.showToast) {
            window.showToast('Please fill in all required fields', 'error');
        } else {
            alert('Please fill in all required fields');
        }
        return;
    }
    
    // Check cart
    const cart = JSON.parse(localStorage.getItem('shopeasy_cart')) || [];
    if (cart.length === 0) {
        if (window.showToast) {
            window.showToast('Your cart is empty', 'error');
        } else {
            alert('Your cart is empty');
        }
        return;
    }
    
    // Process order
    const orderId = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    console.log('✅ Order placed:', orderId);
    
    if (window.showToast) {
        window.showToast('Order placed successfully! Order ID: ' + orderId);
    } else {
        alert('Order placed successfully! Order ID: ' + orderId);
    }
    
    // Clear cart
    localStorage.removeItem('shopeasy_cart');
    if (window.cart) window.cart = [];
    if (window.updateCartDisplay) window.updateCartDisplay();
    
    // Redirect to home
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('shopeasy_cart')) || [];
    const container = document.getElementById('checkout-items');
    
    if (!container) return;
    
    let html = '';
    let subtotal = 0;
    
    if (cart.length === 0) {
        html = `
            <div class="cart-empty" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-shopping-cart fa-4x" style="color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Your cart is empty</h3>
                <p style="color: #999; margin-bottom: 20px;">Add some products to checkout!</p>
                <a href="index.html" class="btn" style="display: inline-block;">
                    <i class="fas fa-arrow-left"></i> Continue Shopping
                </a>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const total = item.price * item.quantity;
            subtotal += total;
            html += `
                <div class="checkout-item" style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #eee;">
                    <img src="${item.image}" alt="${item.name}" width="60" height="60" 
                         style="object-fit: cover; border-radius: 8px; margin-right: 15px;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; margin-bottom: 5px;">${item.name}</div>
                        <div style="color: #666; font-size: 14px;">
                            $${item.price.toFixed(2)} × ${item.quantity}
                        </div>
                    </div>
                    <div style="font-weight: 700; color: var(--primary-color);">
                        $${total.toFixed(2)}
                    </div>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
    
    // Calculate totals
    const shippingSelect = document.getElementById('shipping-method');
    let shipping = 0;
    if (shippingSelect) {
        const value = shippingSelect.value;
        if (value === 'standard') shipping = 5.99;
        else if (value === 'express') shipping = 12.99;
        else if (value === 'overnight') shipping = 24.99;
    }
    
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    // Update display
    if (document.getElementById('checkout-subtotal')) {
        document.getElementById('checkout-subtotal').textContent = '$' + subtotal.toFixed(2);
        document.getElementById('checkout-shipping').textContent = '$' + shipping.toFixed(2);
        document.getElementById('checkout-tax').textContent = '$' + tax.toFixed(2);
        document.getElementById('checkout-total').textContent = '$' + total.toFixed(2);
    }
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}