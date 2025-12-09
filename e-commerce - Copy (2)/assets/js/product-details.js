document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        loadProductDetails(productId);
    } else {
        // Redirect to home if no product ID
        window.location.href = 'index.html';
    }
    
    setupTabs();
    setupEventListeners();
});

function loadProductDetails(productId) {
    const product = window.products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update breadcrumb
    document.getElementById('breadcrumb-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('breadcrumb-category').href = `javascript:filterProductsByCategory('${product.category}')`;
    document.getElementById('breadcrumb-product').textContent = product.name;
    
    // Update category
    document.getElementById('product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    
    // Update title
    document.getElementById('product-title').textContent = product.name;
    
    // Update price
    document.getElementById('current-price').textContent = `$${product.price.toFixed(2)}`;
    if (product.oldPrice) {
        document.getElementById('old-price').textContent = `$${product.oldPrice.toFixed(2)}`;
    } else {
        document.getElementById('old-price').style.display = 'none';
    }
    
    // Update rating
    document.getElementById('product-stars').innerHTML = generateRatingStars(product.rating);
    document.getElementById('rating-count').textContent = `(${product.reviews} reviews)`;
    
    // Update stock status
    const stockStatus = document.getElementById('stock-status');
    if (product.stock > 10) {
        stockStatus.textContent = `In Stock (${product.stock} available)`;
        stockStatus.classList.remove('out-of-stock');
    } else if (product.stock > 0) {
        stockStatus.textContent = `Low Stock (${product.stock} left)`;
        stockStatus.classList.remove('out-of-stock');
    } else {
        stockStatus.textContent = 'Out of Stock';
        stockStatus.classList.add('out-of-stock');
    }
    
    // Update description
    document.getElementById('product-description').textContent = product.description;
    
    // Update main image
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.image;
    mainImage.alt = product.name;
    
    // Update thumbnails
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${product.name} - View ${index + 1}`;
        thumbnail.className = 'product-thumbnail';
        thumbnail.loading = 'lazy';
        
        if (index === 0) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.addEventListener('click', function() {
            document.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src;
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Update wishlist button
    const wishlistBtn = document.getElementById('btn-wishlist-details');
    const isInWishlist = window.wishlist ? window.wishlist.includes(product.id) : false;
    if (isInWishlist) {
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        wishlistBtn.classList.add('active');
    } else {
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.classList.remove('active');
    }
    
    // Update description tab
    document.getElementById('full-description').textContent = product.description;
    
    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update specifications tab
    const specsTable = document.getElementById('specs-table');
    specsTable.innerHTML = '';
    
    for (const [key, value] of Object.entries(product.specifications)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${key}</td>
            <td>${value}</td>
        `;
        specsTable.appendChild(row);
    }
    
    // Update reviews tab
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    
    if (product.reviewsList && product.reviewsList.length > 0) {
        product.reviewsList.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <div class="review-header">
                    <div class="review-author">
                        <div class="review-author-avatar">${review.author.charAt(0)}</div>
                        <div>${review.author}</div>
                    </div>
                    <div class="review-date">
                        <i class="far fa-calendar"></i> ${review.date}
                    </div>
                </div>
                <div class="review-rating">
                    ${generateRatingStars(review.rating)}
                </div>
                <div class="review-text">${review.text}</div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    } else {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to review this product!</p>';
    }
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
}

function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function setupTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab header
            tabHeaders.forEach(h => h.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

function setupEventListeners() {
    // Add to cart button
    const addToCartBtn = document.getElementById('btn-add-to-cart-details');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));
            
            if (productId && window.addToCart) {
                window.addToCart(productId);
            }
        });
    }
    
    // Wishlist button
    const wishlistBtn = document.getElementById('btn-wishlist-details');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));
            
            if (productId && window.toggleWishlist) {
                const isInWishlist = window.toggleWishlist(productId);
                if (isInWishlist) {
                    this.innerHTML = '<i class="fas fa-heart"></i>';
                    this.classList.add('active');
                    window.showToast('Added to wishlist!');
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i>';
                    this.classList.remove('active');
                    window.showToast('Removed from wishlist!');
                }
            }
        });
    }
}

function loadRelatedProducts(category, currentProductId) {
    const relatedProductsContainer = document.getElementById('related-products');
    if (!relatedProductsContainer) return;
    
    const relatedProducts = window.products.filter(p => 
        p.category === category && p.id !== currentProductId
    ).slice(0, 4); // Show max 4 related products
    
    if (relatedProducts.length === 0) {
        relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }
    
    relatedProductsContainer.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        const isInWishlist = window.wishlist ? window.wishlist.includes(product.id) : false;
        const stars = generateRatingStars(product.rating);
        const badge = product.badge ? `<div class="product-badge ${product.badge}">${product.badge === 'sale' ? 'Sale' : 'New'}</div>` : '';
        const oldPrice = product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';
        
        productCard.innerHTML = `
            ${badge}
            <div class="product-actions">
                <button class="product-action wishlist-btn" data-id="${product.id}" aria-label="Add to wishlist">
                    <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button class="product-action view-btn" data-id="${product.id}" aria-label="View product details">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            <img src="${product.image}" alt="${product.name}" class="product-img" width="500" height="400" loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating" aria-label="Rating: ${product.rating} out of 5 stars">
                    ${stars}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${oldPrice}
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        productCard.addEventListener('click', function(e) {
            if (!e.target.closest('.product-actions') && !e.target.closest('.add-to-cart')) {
                window.location.href = `product-details.html?id=${product.id}`;
            }
        });
        
        relatedProductsContainer.appendChild(productCard);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            if (window.addToCart) {
                window.addToCart(productId);
            }
        });
    });
    
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            if (window.toggleWishlist) {
                const isInWishlist = window.toggleWishlist(productId);
                const icon = this.querySelector('i');
                if (icon) {
                    icon.className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
                }
            }
        });
    });
    
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            window.location.href = `product-details.html?id=${productId}`;
        });
    });
}