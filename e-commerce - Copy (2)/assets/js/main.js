document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded');
    initBannerSlider();
    renderProducts();
    setupEventListeners();
    initModals();
    setupMegaMenu();
    setupMobileSearch();
    setupBackToTop();
    updateCurrentYear();
    setupMobileMenuCloseOnResize();
});

function setupMegaMenu() {
    console.log('Setting up mega menu...');
    
    // Desktop hover functionality
    const megaMenuContainers = document.querySelectorAll('.mega-menu-container');
    
    megaMenuContainers.forEach((container) => {
        const trigger = container.querySelector('.mega-menu-trigger');
        const megaMenu = container.querySelector('.mega-menu');
        
        if (!trigger || !megaMenu) return;
        
        // Desktop: Show on hover
        container.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                // Close all other mega menus
                megaMenuContainers.forEach(otherContainer => {
                    if (otherContainer !== container) {
                        const otherMenu = otherContainer.querySelector('.mega-menu');
                        if (otherMenu) otherMenu.classList.remove('active');
                    }
                });
                
                // Show this mega menu
                megaMenu.classList.add('active');
            }
        });
        
        // Desktop: Hide on leave
        container.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                megaMenu.classList.remove('active');
            }
        });
        
        // Mobile: Toggle on click
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = megaMenu.classList.contains('active');
                
                // Close all other mega menus
                megaMenuContainers.forEach(otherContainer => {
                    if (otherContainer !== container) {
                        const otherMenu = otherContainer.querySelector('.mega-menu');
                        if (otherMenu) otherMenu.classList.remove('active');
                    }
                });
                
                // Toggle this mega menu
                if (isActive) {
                    megaMenu.classList.remove('active');
                } else {
                    megaMenu.classList.add('active');
                }
            }
        });
    });
    
    // Close mega menus when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.mega-menu-container')) {
                megaMenuContainers.forEach(container => {
                    const megaMenu = container.querySelector('.mega-menu');
                    if (megaMenu) megaMenu.classList.remove('active');
                });
            }
        }
    });
    
    // Handle mega menu item clicks
    const megaMenuItems = document.querySelectorAll('.mega-menu-item');
    megaMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mega menu item clicked');
            
            // Close all mega menus on mobile
            if (window.innerWidth <= 768) {
                megaMenuContainers.forEach(container => {
                    const megaMenu = container.querySelector('.mega-menu');
                    if (megaMenu) megaMenu.classList.remove('active');
                });
            }
        });
    });
    
    // Mobile mega menu functionality
    const mobileMegaMenuTriggers = document.querySelectorAll('.mobile-mega-menu-trigger');
    
    mobileMegaMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const menuItem = this.closest('.mobile-mega-menu-item');
                const megaMenu = menuItem.querySelector('.mobile-mega-menu');
                
                if (!megaMenu) return;
                
                const isActive = megaMenu.classList.contains('active');
                
                // Close all other mobile mega menus
                mobileMegaMenuTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        const otherMenuItem = otherTrigger.closest('.mobile-mega-menu-item');
                        const otherMegaMenu = otherMenuItem?.querySelector('.mobile-mega-menu');
                        if (otherMegaMenu) {
                            otherMegaMenu.classList.remove('active');
                            otherMenuItem.classList.remove('active');
                        }
                    }
                });
                
                // Toggle this mega menu
                if (isActive) {
                    megaMenu.classList.remove('active');
                    menuItem.classList.remove('active');
                } else {
                    megaMenu.classList.add('active');
                    menuItem.classList.add('active');
                }
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close all mega menus when switching to desktop
        if (window.innerWidth > 768) {
            megaMenuContainers.forEach(container => {
                const megaMenu = container.querySelector('.mega-menu');
                if (megaMenu) megaMenu.classList.remove('active');
            });
        }
    });
}

function setupMobileSearch() {
    const searchBar = document.querySelector('.search-bar');
    const headerActions = document.querySelector('.header-actions');
    
    if (window.innerWidth <= 768 && searchBar && headerActions) {
        // Create mobile search toggle
        const searchToggle = document.createElement('button');
        searchToggle.className = 'mobile-search-toggle';
        searchToggle.innerHTML = '<i class="fas fa-search"></i>';
        searchToggle.setAttribute('aria-label', 'Toggle search');
        searchToggle.title = 'Search';
        
        // Insert before header actions
        headerActions.parentNode.insertBefore(searchToggle, headerActions);
        
        searchToggle.addEventListener('click', function() {
            searchBar.classList.toggle('mobile-visible');
            if (searchBar.classList.contains('mobile-visible')) {
                const searchInput = searchBar.querySelector('input');
                if (searchInput) searchInput.focus();
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchBar.contains(e.target) && !searchToggle.contains(e.target) && searchBar.classList.contains('mobile-visible')) {
                searchBar.classList.remove('mobile-visible');
            }
        });
    }
}

function initBannerSlider() {
    console.log('Initializing banner slider');
    
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!sliderTrack || slides.length === 0) {
        console.log('No slider elements found');
        return;
    }
    
    let currentSlide = 0;
    let autoplayInterval;
    
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        const translateValue = -(index * 100);
        sliderTrack.style.transform = `translateX(${translateValue}%)`;
        
        currentSlide = index;
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoplay();
        });
    });
    
    // Pause autoplay on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }
    
    goToSlide(0);
    startAutoplay();
}

function renderProducts() {
    console.log('Rendering products');
    
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) {
        console.error('Products container not found');
        return;
    }
    
    productsContainer.innerHTML = '';
    
    if (!window.products || window.products.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: var(--gray); margin-bottom: 20px;"></i>
                <h3 style="color: var(--dark-gray); margin-bottom: 10px;">No products available</h3>
                <p style="color: var(--gray);">Please check back later.</p>
            </div>
        `;
        return;
    }
    
    window.products.forEach(product => {
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
        
        productsContainer.appendChild(productCard);
    });
    
    attachProductEventListeners();
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

function attachProductEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            console.log('Adding to cart:', productId);
            if (window.addToCart) {
                window.addToCart(productId);
            }
        });
    });
    
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            console.log('Toggling wishlist:', productId);
            if (window.toggleWishlist) {
                const isInWishlist = window.toggleWishlist(productId);
                const icon = this.querySelector('i');
                if (icon) {
                    icon.className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
                }
                // Show toast notification
                if (window.showToast) {
                    window.showToast(isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist');
                }
            }
        });
    });
    
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            console.log('Viewing product:', productId);
            window.location.href = `product-details.html?id=${productId}`;
        });
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.product-actions') && !e.target.closest('.add-to-cart')) {
                const productId = parseInt(this.dataset.id);
                window.location.href = `product-details.html?id=${productId}`;
            }
        });
    });
}

function initModals() {
    console.log('Initializing modals');
    
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartClose = cartModal?.querySelector('.close-modal');
    
    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.updateCartModal) {
                window.updateCartModal();
            }
            cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        if (cartClose) {
            cartClose.addEventListener('click', function() {
                cartModal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        cartModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    const wishlistBtn = document.getElementById('wishlist-btn');
    const wishlistModal = document.getElementById('wishlist-modal');
    const wishlistClose = wishlistModal?.querySelector('.close-modal');
    
    if (wishlistBtn && wishlistModal) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.updateWishlistModal) {
                window.updateWishlistModal();
            }
            wishlistModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        if (wishlistClose) {
            wishlistClose.addEventListener('click', function() {
                wishlistModal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        wishlistModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
}

function setupEventListeners() {
    console.log('Setting up event listeners');
    
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProductsByCategory(category);
        });
    });
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            
            if (!email) {
                if (window.showToast) {
                    window.showToast('Please enter your email address', 'error');
                }
                return;
            }
            
            if (!validateEmail(email)) {
                if (window.showToast) {
                    window.showToast('Please enter a valid email address', 'error');
                }
                return;
            }
            
            if (window.showToast) {
                window.showToast(`Thank you for subscribing with ${email}!`);
            }
            this.reset();
        });
    }
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const cartStr = localStorage.getItem('shopeasy_cart');
            const cart = cartStr ? JSON.parse(cartStr) : [];
            
            if (cart.length === 0) {
                if (window.showToast) {
                    window.showToast('Your cart is empty. Add some products first!', 'error');
                }
                return;
            }
            
            window.location.href = 'checkout.html';
        });
    }
    
    // Add mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            mobileMenuContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            this.classList.remove('active');
            if (mobileMenuContainer) {
                mobileMenuContainer.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    }
    
    // Setup tab functionality for product details
    setupProductTabs();
}

function setupProductTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all headers and contents
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked header and corresponding content
            this.classList.add('active');
            const tabContent = document.getElementById(`${tabId}-tab`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        renderProducts();
        return;
    }
    
    const filteredProducts = window.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderFilteredProducts(filteredProducts, searchTerm);
}

function renderFilteredProducts(filteredProducts, searchTerm) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search fa-3x" style="color: var(--gray); margin-bottom: 20px;"></i>
                <h3 style="color: var(--dark-gray); margin-bottom: 10px;">No products found for "${searchTerm}"</h3>
                <p style="color: var(--gray);">Try adjusting your search terms</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
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
        
        productsContainer.appendChild(productCard);
    });
    
    attachProductEventListeners();
    if (window.showToast) {
        window.showToast(`Found ${filteredProducts.length} product(s) matching "${searchTerm}"`);
    }
}

function filterProductsByCategory(category) {
    const filteredProducts = window.products.filter(product => 
        product.category === category
    );
    
    renderFilteredProducts(filteredProducts, category);
    if (window.showToast) {
        window.showToast(`Showing ${filteredProducts.length} product(s) in ${category}`);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function handleShopNow() {
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.title = 'Back to top';
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        if (el) el.textContent = currentYear;
    });
}

function setupMobileMenuCloseOnResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                const mobileMenuContainer = document.querySelector('.mobile-menu-container');
                const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
                
                if (mobileMenuContainer && mobileMenuOverlay) {
                    mobileMenuContainer.classList.remove('active');
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Hide mobile search
                const searchBar = document.querySelector('.search-bar');
                if (searchBar) {
                    searchBar.classList.remove('mobile-visible');
                }
            }
        }, 250);
    });
}

window.filterProductsByCategory = filterProductsByCategory;
window.handleSearch = handleSearch;
window.validateEmail = validateEmail;
window.handleShopNow = handleShopNow;