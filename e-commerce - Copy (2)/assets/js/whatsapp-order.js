class WhatsAppOrder {
    constructor() {
        // Change this to YOUR WhatsApp number (without + or 00)
        // Example: "923279550600" for Pakistan
        // Example: "15551234567" for US
        this.phone = "923279550600";
        console.log('🚀 WhatsAppOrder initialized for phone:', this.phone);
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupForm());
        } else {
            this.setupForm();
        }
    }

    setupForm() {
        const form = document.getElementById('checkout-form');
        if (!form) {
            console.error('❌ Form not found!');
            return;
        }

        console.log('✅ Form found, setting up handler...');

        // Remove any existing event listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        // Attach new event listener
        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('📝 Form submitted, sending to WhatsApp...');
            this.sendOrder();
        });

        // Update summary
        this.updateSummary();
        console.log('✅ Handler attached & summary updated');
    }

    sendOrder() {
        console.log('🔄 Starting sendOrder...');

        // 1. Validate required fields
        const required = ['first-name', 'last-name', 'phone', 'address', 'city'];
        let isValid = true;
        
        for (let id of required) {
            const field = document.getElementById(id);
            if (!field || !field.value.trim()) {
                console.error('❌ Missing field:', id);
                field.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields (marked in red)');
            return;
        }
        
        console.log('✅ Validation passed');

        // 2. Get cart
        const cartStr = localStorage.getItem('shopeasy_cart');
        console.log('🛒 Cart from localStorage:', cartStr);
        const cart = cartStr ? JSON.parse(cartStr) : [];
        
        if (cart.length === 0) {
            alert('Cart is empty! Please add products to cart first.');
            return;
        }
        
        console.log('✅ Cart loaded:', cart);

        // 3. Build message
        let msg = '*NEW ORDER - ShopEasy*\n\n';
        
        // Customer info
        msg += '*Customer Information:*\n';
        msg += '👤 ' + document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value + '\n';
        msg += '📞 ' + document.getElementById('phone').value + '\n';
        
        const email = document.getElementById('email').value.trim();
        if (email) msg += '📧 ' + email + '\n';
        
        msg += '📍 ' + document.getElementById('address').value + ', ';
        msg += document.getElementById('city').value + ', ';
        const state = document.getElementById('state').value.trim();
        const zip = document.getElementById('zip').value.trim();
        if (state) msg += state + ' ';
        if (zip) msg += zip + ' ';
        const country = document.getElementById('country').value;
        if (country) msg += '(' + this.getCountryName(country) + ')\n';
        
        msg += '\n*Order Items:*\n';
        let subtotal = 0;
        cart.forEach((item, i) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            msg += `${i+1}. ${item.name} × ${item.quantity} = $${itemTotal.toFixed(2)}\n`;
        });

        // Shipping
        const shippingMethod = document.getElementById('shipping-method').value;
        let shipping = 5.99;
        let shippingText = 'Standard (5-7 days)';
        
        if (shippingMethod === 'express') {
            shipping = 12.99;
            shippingText = 'Express (2-3 days)';
        } else if (shippingMethod === 'overnight') {
            shipping = 24.99;
            shippingText = 'Overnight';
        }

        // Tax calculation (8%)
        const taxRate = 0.08;
        const taxableAmount = subtotal + shipping;
        const tax = taxableAmount * taxRate;
        const total = subtotal + shipping + tax;

        msg += '\n*Order Summary:*\n';
        msg += `Subtotal: $${subtotal.toFixed(2)}\n`;
        msg += `Shipping (${shippingText}): $${shipping.toFixed(2)}\n`;
        msg += `Tax (8%): $${tax.toFixed(2)}\n`;
        msg += `*TOTAL: $${total.toFixed(2)}*\n`;

        // Payment method
        const paymentType = document.getElementById('payment-type').value;
        let paymentText = '';
        switch(paymentType) {
            case 'cod': paymentText = 'Cash on Delivery'; break;
            case 'card': paymentText = 'Credit/Debit Card'; break;
            case 'paypal': paymentText = 'PayPal'; break;
            case 'bank': paymentText = 'Bank Transfer'; break;
            case 'pickup': paymentText = 'Pay on Pickup'; break;
            default: paymentText = paymentType;
        }
        msg += `\n*Payment Method:* ${paymentText}\n`;

        // Comments
        const comments = document.getElementById('comments').value.trim();
        if (comments) msg += `\n*Special Instructions:*\n${comments}\n`;

        // Order info
        const orderId = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        msg += '\n---\n';
        msg += `*Order ID:* ${orderId}\n`;
        msg += `*Date:* ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}\n`;
        msg += `*Time:* ${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })}\n`;

        console.log('📝 Full message:', msg);

        // 4. Encode message for URL
        const encodedMsg = encodeURIComponent(msg);
        
        // 5. Create WhatsApp URL
        const url = `https://wa.me/${this.phone}?text=${encodedMsg}`;
        console.log('🔗 WhatsApp URL:', url);

        // 6. Open WhatsApp
        const newWindow = window.open(url, '_blank');
        
        if (!newWindow || newWindow.closed) {
            // Popup blocked - show manual instructions
            alert('Popup blocked! Please:\n\n1. Copy this URL: ' + url + '\n\n2. Open WhatsApp manually\n3. Paste and send the message');
        } else {
            // Success
            console.log('✅ WhatsApp opened successfully');
            
            // Clear cart
            localStorage.removeItem('shopeasy_cart');
            if (window.cart) window.cart = [];
            if (window.updateCartDisplay) window.updateCartDisplay();
            
            // Show success message
            setTimeout(() => {
                alert('✅ Order sent to WhatsApp!\n\nPlease check your WhatsApp and press SEND to confirm your order.\n\nYou will be redirected to homepage in 5 seconds.');
                
                // Redirect to home after 5 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 5000);
            }, 1000);
        }

        // Update summary
        this.updateSummary();
    }

    getCountryName(code) {
        const countries = {
            'us': 'United States',
            'ca': 'Canada',
            'uk': 'United Kingdom',
            'au': 'Australia',
            'in': 'India',
            'pk': 'Pakistan'
        };
        return countries[code] || code;
    }

    updateSummary() {
        const cartStr = localStorage.getItem('shopeasy_cart');
        const cart = cartStr ? JSON.parse(cartStr) : [];
        const container = document.getElementById('checkout-items');
        
        if (!container) return;

        console.log('📊 Updating summary with cart:', cart);

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

        // Calculate shipping
        const shippingSelect = document.getElementById('shipping-method');
        let shipping = 5.99;
        if (shippingSelect) {
            if (shippingSelect.value === 'express') shipping = 12.99;
            if (shippingSelect.value === 'overnight') shipping = 24.99;
        }
        
        // Calculate tax (8%)
        const taxRate = 0.08;
        const taxableAmount = subtotal + shipping;
        const tax = taxableAmount * taxRate;
        const total = subtotal + shipping + tax;
        
        // Update totals display
        if (document.getElementById('checkout-subtotal')) {
            document.getElementById('checkout-subtotal').textContent = '$' + subtotal.toFixed(2);
            document.getElementById('checkout-shipping').textContent = '$' + shipping.toFixed(2);
            document.getElementById('checkout-tax').textContent = '$' + tax.toFixed(2);
            document.getElementById('checkout-total').textContent = '$' + total.toFixed(2);
        }

        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppOrder;
} else {
    window.WhatsAppOrder = WhatsAppOrder;
}