// Common functionality shared across all pages
window.products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        oldPrice: 159.99,
        image: "assets/image/pic_2.jpg",
        rating: 4.5,
        reviews: 128,
        badge: "sale",
        category: "electronics",
        description: "Experience premium sound quality with our latest wireless headphones. Featuring noise cancellation technology, 30-hour battery life, and comfortable over-ear design for extended listening sessions.",
        stock: 25,
        tags: ["wireless", "noise-cancelling", "bluetooth"],
        colors: ["black", "white", "blue"],
        sizes: ["standard", "large"],
        images: [
            "assets/image/pic_2.jpg",
            "assets/image/pic_2.jpg",
            "assets/image/pic_2.jpg",
            "assets/image/pic_2.jpg"
        ],
        specifications: {
            "Driver Size": "40mm",
            "Frequency Response": "20Hz - 20kHz",
            "Battery Life": "30 hours",
            "Charging Time": "2 hours",
            "Bluetooth Version": "5.0",
            "Weight": "265g",
            "Warranty": "2 years",
            "Noise Cancellation": "Active",
            "Microphone": "Built-in with noise reduction",
            "Connectivity": "Bluetooth 5.0, 3.5mm audio jack"
        },
        reviewsList: [
            {
                author: "Michael Johnson",
                date: "October 15, 2023",
                rating: 5,
                text: "These headphones are amazing! The sound quality is exceptional and the noise cancellation works perfectly. I use them daily for work calls and music, and the battery lasts all week."
            },
            {
                author: "Sarah Williams",
                date: "September 28, 2023",
                rating: 4.5,
                text: "Very comfortable even after hours of use. The sound is crisp and clear. My only minor complaint is that the case could be a bit more protective for travel."
            },
            {
                author: "David Chen",
                date: "November 5, 2023",
                rating: 4,
                text: "Great value for the price. The battery life is as advertised and they connect quickly to all my devices."
            }
        ],
        features: [
            "Advanced noise cancellation for immersive listening",
            "30-hour battery life with quick charge capability",
            "Premium comfort with memory foam ear cushions",
            "Bluetooth 5.0 with stable connection",
            "Built-in microphone for hands-free calls",
            "Foldable design for easy storage and portability"
        ]
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 249.99,
        oldPrice: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.7,
        reviews: 256,
        badge: "new",
        category: "electronics",
        description: "Stay connected with this advanced smartwatch featuring health monitoring, GPS, and long battery life.",
        stock: 15,
        tags: ["smartwatch", "fitness", "wearable"],
        colors: ["black", "silver", "gold"],
        sizes: ["small", "medium", "large"],
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ],
        specifications: {
            "Display": "1.78\" AMOLED",
            "Battery Life": "7 days",
            "Water Resistance": "5 ATM",
            "GPS": "Built-in",
            "Heart Rate Monitor": "Yes",
            "Sleep Tracking": "Yes",
            "Notifications": "Call, text, app alerts",
            "Compatibility": "iOS & Android",
            "Connectivity": "Bluetooth 5.2",
            "Storage": "8GB"
        },
        reviewsList: [
            {
                author: "Alex Thompson",
                date: "December 10, 2023",
                rating: 5,
                text: "Excellent smartwatch! The health tracking features are accurate and the battery lasts a full week."
            },
            {
                author: "Emma Wilson",
                date: "November 22, 2023",
                rating: 4.5,
                text: "Love the design and features. The screen is bright and clear even in sunlight."
            },
            {
                author: "Robert Kim",
                date: "January 5, 2024",
                rating: 4,
                text: "Great for fitness tracking. The GPS is accurate for my runs and hikes."
            }
        ],
        features: [
            "24/7 heart rate monitoring",
            "Sleep tracking and analysis",
            "Built-in GPS for outdoor activities",
            "Water resistant for swimming",
            "Customizable watch faces",
            "Music storage and playback"
        ]
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 89.99,
        oldPrice: 119.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.2,
        reviews: 89,
        badge: "sale",
        category: "fashion",
        description: "Lightweight running shoes with superior cushioning and support for long-distance running.",
        stock: 30,
        tags: ["running", "sports", "shoes"],
        colors: ["black", "blue", "red"],
        sizes: ["8", "9", "10", "11"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ],
        specifications: {
            "Type": "Running Shoes",
            "Material": "Breathable mesh upper",
            "Closure": "Lace-up",
            "Cushioning": "Advanced foam midsole",
            "Weight": "285g (size 9)",
            "Drop": "8mm",
            "Suitable For": "Road running, training",
            "Warranty": "6 months",
            "Gender": "Unisex"
        },
        reviewsList: [
            {
                author: "James Rodriguez",
                date: "October 30, 2023",
                rating: 4,
                text: "Comfortable and lightweight. Perfect for my daily 5k runs."
            },
            {
                author: "Lisa Park",
                date: "September 15, 2023",
                rating: 4.5,
                text: "Great cushioning! My knees don't hurt after long runs anymore."
            },
            {
                author: "Tom Wilson",
                date: "November 12, 2023",
                rating: 4,
                text: "Good traction on wet surfaces. Durable construction."
            }
        ],
        features: [
            "Lightweight design for speed",
            "Responsive cushioning technology",
            "Breathable mesh upper",
            "Durable rubber outsole",
            "Arch support for comfort",
            "Reflective details for night safety"
        ]
    },
    {
        id: 4,
        name: "Blender",
        price: 79.99,
        oldPrice: 99.99,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.3,
        reviews: 67,
        badge: "sale",
        category: "home",
        description: "High-powered blender for smoothies, soups, and more. Easy to clean and durable.",
        stock: 40,
        tags: ["kitchen", "appliance", "blender"],
        colors: ["black", "white"],
        sizes: ["standard"],
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ],
        specifications: {
            "Power": "1200W",
            "Capacity": "1.8L",
            "Speed Settings": "5",
            "Material": "BPA-free plastic",
            "Blades": "Stainless steel 6-blade",
            "Warranty": "2 years",
            "Dimensions": "45 x 20 x 20 cm",
            "Weight": "3.2 kg",
            "Voltage": "110-240V"
        },
        reviewsList: [
            {
                author: "Maria Garcia",
                date: "December 3, 2023",
                rating: 5,
                text: "Powerful blender that crushes ice easily. Makes perfect smoothies every time!"
            },
            {
                author: "John Miller",
                date: "November 18, 2023",
                rating: 4,
                text: "Great for making soups and sauces. Easy to clean with the removable blade assembly."
            },
            {
                author: "Sophia Lee",
                date: "October 25, 2023",
                rating: 4.5,
                text: "Quiet operation compared to other blenders. Love the pulse function for control."
            }
        ],
        features: [
            "Powerful 1200W motor for tough ingredients",
            "Large 1.8L capacity for family-sized portions",
            "6-speed settings with pulse function",
            "Stainless steel blades for durability",
            "BPA-free materials for safety",
            "Easy-to-clean design with dishwasher safe parts"
        ]
    },
    {
        id: 5,
        name: "Perfume",
        price: 59.99,
        oldPrice: 79.99,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.4,
        reviews: 142,
        badge: "sale",
        category: "beauty",
        description: "Luxurious fragrance with notes of jasmine, rose, and sandalwood.",
        stock: 50,
        tags: ["fragrance", "perfume", "beauty"],
        colors: ["gold", "pink"],
        sizes: ["50ml", "100ml"],
        images: [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ],
        specifications: {
            "Fragrance Type": "Eau de Parfum",
            "Main Notes": "Jasmine, Rose, Sandalwood",
            "Volume": "50ml / 100ml",
            "Alcohol Content": "78%",
            "Gender": "Women",
            "Season": "All year",
            "Occasion": "Evening, Special events",
            "Longevity": "6-8 hours",
            "Sillage": "Moderate",
            "Made In": "France"
        },
        reviewsList: [
            {
                author: "Olivia Brown",
                date: "January 8, 2024",
                rating: 5,
                text: "Beautiful fragrance! Lasts all day and gets me so many compliments."
            },
            {
                author: "Daniel White",
                date: "December 20, 2023",
                rating: 4.5,
                text: "Perfect gift for my wife. The scent is elegant and sophisticated."
            },
            {
                author: "Emily Davis",
                date: "November 30, 2023",
                rating: 4,
                text: "Love the floral notes. Not too overpowering, just right for daily wear."
            }
        ],
        features: [
            "Luxurious floral fragrance with modern twist",
            "Long-lasting formula (6-8 hours)",
            "Elegant bottle design",
            "Perfect for special occasions",
            "High-quality ingredients",
            "Signature scent that stands out"
        ]
    },
    {
        id: 6,
        name: "Laptop",
        price: 899.99,
        oldPrice: 1099.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.8,
        reviews: 312,
        badge: "new",
        category: "electronics",
        description: "Powerful laptop with high-performance processor and long battery life.",
        stock: 12,
        tags: ["laptop", "computer", "tech"],
        colors: ["silver", "space gray"],
        sizes: ["13-inch", "15-inch"],
        images: [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ],
        specifications: {
            "Processor": "Intel Core i7-1260P",
            "RAM": "16GB DDR5",
            "Storage": "512GB NVMe SSD",
            "Display": "13.3\" IPS, 2560x1600",
            "Graphics": "Intel Iris Xe",
            "Battery": "58Wh, up to 12 hours",
            "OS": "Windows 11 Pro",
            "Weight": "1.25 kg",
            "Ports": "2x Thunderbolt 4, USB-A, HDMI",
            "Connectivity": "WiFi 6E, Bluetooth 5.2"
        },
        reviewsList: [
            {
                author: "Michael Chang",
                date: "December 28, 2023",
                rating: 5,
                text: "Incredible performance for work and creative tasks. The battery life is amazing!"
            },
            {
                author: "Jennifer Taylor",
                date: "December 15, 2023",
                rating: 4.5,
                text: "Lightweight and powerful. Perfect for business travel and presentations."
            },
            {
                author: "Brian Wilson",
                date: "November 25, 2023",
                rating: 5,
                text: "Fast, reliable, and beautifully designed. Best laptop I've owned in years."
            }
        ],
        features: [
            "Powerful 12th Gen Intel processor",
            "Crisp high-resolution display",
            "Lightweight and portable design",
            "All-day battery life",
            "Fast SSD storage for quick boot times",
            "Premium build quality with aluminum chassis"
        ]
    },
    {
        id: 7,
        name: "Dress",
        price: 49.99,
        oldPrice: 69.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.1,
        reviews: 78,
        badge: "sale",
        category: "fashion",
        description: "Elegant evening dress perfect for special occasions.",
        stock: 35,
        tags: ["dress", "evening", "fashion"],
        colors: ["red", "black", "blue"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ],
        specifications: {
            "Material": "95% Polyester, 5% Spandex",
            "Care": "Machine wash cold, tumble dry low",
            "Length": "Midi (below knee)",
            "Neckline": "V-neck",
            "Sleeves": "Long",
            "Closure": "Back zipper",
            "Season": "All year",
            "Occasion": "Evening, Wedding, Party",
            "Pattern": "Solid color",
            "Made In": "Italy"
        },
        reviewsList: [
            {
                author: "Jessica Moore",
                date: "December 12, 2023",
                rating: 4.5,
                text: "Stunning dress! Perfect fit and very comfortable. Received many compliments at the gala."
            },
            {
                author: "Amanda Clark",
                date: "November 30, 2023",
                rating: 4,
                text: "Beautiful fabric that drapes nicely. True to size and elegant design."
            },
            {
                author: "Rachel Adams",
                date: "November 5, 2023",
                rating: 4,
                text: "Great value for the quality. Wore it to a wedding and felt absolutely beautiful."
            }
        ],
        features: [
            "Elegant V-neck design",
            "Flowing fabric with beautiful drape",
            "Comfortable stretch material",
            "Back zipper for easy wear",
            "Versatile for various occasions",
            "Available in multiple colors"
        ]
    },
    {
        id: 8,
        name: "Coffee Maker",
        price: 129.99,
        oldPrice: 149.99,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.6,
        reviews: 204,
        badge: "new",
        category: "home",
        description: "Programmable coffee maker with thermal carafe and built-in grinder.",
        stock: 22,
        tags: ["coffee", "kitchen", "appliance"],
        colors: ["black", "stainless"],
        sizes: ["10-cup", "12-cup"],
        images: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ],
        specifications: {
            "Capacity": "12 cups (1.8L)",
            "Grinder": "Built-in conical burr",
            "Programmable": "24-hour advance brew",
            "Carafe": "Double-wall thermal",
            "Brew Time": "Approx. 6 minutes",
            "Dimensions": "33 x 21 x 38 cm",
            "Weight": "4.5 kg",
            "Warranty": "3 years",
            "Display": "LCD with touch controls",
            "Water Filter": "Removable charcoal filter"
        },
        reviewsList: [
            {
                author: "David Miller",
                date: "January 10, 2024",
                rating: 5,
                text: "Best coffee maker I've owned! Freshly ground beans make all the difference."
            },
            {
                author: "Sarah Johnson",
                date: "December 22, 2023",
                rating: 4.5,
                text: "Love the programmable feature. Wakes up to fresh coffee every morning."
            },
            {
                author: "Thomas Brown",
                date: "December 5, 2023",
                rating: 4,
                text: "Thermal carafe keeps coffee hot for hours without burning. Great investment!"
            }
        ],
        features: [
            "Built-in burr grinder for fresh coffee",
            "Thermal carafe keeps coffee hot for hours",
            "Programmable brewing for convenience",
            "Adjustable brew strength settings",
            "Charcoal water filter for better taste",
            "Sleek stainless steel design"
        ]
    }
];

// Initialize cart and wishlist from localStorage
window.cart = JSON.parse(localStorage.getItem('shopeasy_cart')) || [];
window.wishlist = JSON.parse(localStorage.getItem('shopeasy_wishlist')) || [];

function saveCart() {
    localStorage.setItem('shopeasy_cart', JSON.stringify(window.cart));
}

function saveWishlist() {
    localStorage.setItem('shopeasy_wishlist', JSON.stringify(window.wishlist));
}

// Toast notification system
function showToast(message, type = 'success') {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    const product = window.products.find(p => p.id === productId);
    const existingItem = window.cart.find(item => item.id === productId);
    
    if (!product) {
        showToast('Product not found!', 'error');
        return;
    }
    
    // Check stock
    const totalInCart = window.cart.reduce((total, item) => {
        return item.id === productId ? total + item.quantity : total;
    }, 0);
    
    if (totalInCart >= product.stock) {
        showToast(`Sorry, only ${product.stock} items available in stock!`, 'error');
        return;
    }
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        window.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            category: product.category
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    showToast(`${product.name} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    const totalItems = window.cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Update wishlist display
function updateWishlistDisplay() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = window.wishlist.length;
    }
}

// Toggle wishlist function
function toggleWishlist(productId) {
    const index = window.wishlist.indexOf(productId);
    if (index === -1) {
        window.wishlist.push(productId);
    } else {
        window.wishlist.splice(index, 1);
    }
    saveWishlist();
    updateWishlistDisplay();
    return window.wishlist.includes(productId);
}

// Wishlist modal update
function updateWishlistModal() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    if (!wishlistItemsContainer) return;
    
    wishlistItemsContainer.innerHTML = '';
    
    if (window.wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `
            <div class="wishlist-empty">
                <i class="fas fa-heart fa-3x"></i>
                <p>Your wishlist is empty</p>
                <p>Add some products to your wishlist!</p>
            </div>
        `;
        return;
    }
    
    window.wishlist.forEach(productId => {
        const product = window.products.find(p => p.id === productId);
        if (!product) return;
        
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="80" height="80">
            <div class="wishlist-item-details">
                <div class="wishlist-item-title">${product.name}</div>
                <div class="wishlist-item-price">$${product.price.toFixed(2)}</div>
            </div>
            <div class="wishlist-item-actions">
                <button class="add-to-cart-from-wishlist" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="remove-item" onclick="toggleWishlist(${product.id})" aria-label="Remove from wishlist">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        wishlistItemsContainer.appendChild(wishlistItem);
    });
}

// Cart modal update
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (window.cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart fa-3x"></i>
                <p>Your cart is empty</p>
                <p>Add some products to your cart!</p>
            </div>
        `;
        document.getElementById('cart-total-price').textContent = '0.00';
        return;
    }
    
    let total = 0;
    window.cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="80" height="80">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${index}, 0, this.value)">
                    <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeCartItem(${index})" aria-label="Remove item">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    document.getElementById('cart-total-price').textContent = total.toFixed(2);
}

function updateCartItemQuantity(index, change, newValue) {
    if (newValue !== undefined) {
        window.cart[index].quantity = parseInt(newValue) || 1;
    } else {
        window.cart[index].quantity += change;
    }
    
    if (window.cart[index].quantity < 1) {
        window.cart[index].quantity = 1;
    }
    
    saveCart();
    updateCartDisplay();
    updateCartModal();
}

function removeCartItem(index) {
    window.cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateCartModal();
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update cart and wishlist counts
    updateCartDisplay();
    updateWishlistDisplay();
    
    // Set current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    if (mobileMenuToggle && mobileMenuContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuContainer.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenuContainer.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function() {
                mobileMenuContainer.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
});

// Attach functions to window for global access
window.addToCart = addToCart;
window.updateCartDisplay = updateCartDisplay;
window.updateWishlistDisplay = updateWishlistDisplay;
window.showToast = showToast;
window.toggleWishlist = toggleWishlist;
window.updateWishlistModal = updateWishlistModal;
window.updateCartModal = updateCartModal;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeCartItem = removeCartItem;