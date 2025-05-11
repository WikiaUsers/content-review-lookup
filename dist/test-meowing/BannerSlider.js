// MediaWiki:BannerSlider.js
$(function() {
    // Create the slider container
    const sliderHTML = `
    <div class="multi-banner-slider">
        <div class="slider-viewport">
            <div class="slider-track"></div>
        </div>
        <button class="slider-nav prev">&lt;</button>
        <button class="slider-nav next">&gt;</button>
        <div class="slider-pagination"></div>
    </div>
    `;
    
    // Append to desired location (change selector as needed)
    $('#WikiaMainContentContainer').prepend(sliderHTML);
    
    // Banner data - replace with your wiki pages
    const banners = [
        { id: 1, page: 'Banner1', alt: 'Banner 1', placeholder: 'Banner 1' },
        { id: 2, page: 'Banner2', alt: 'Banner 2', placeholder: 'Banner 2' },
        { id: 3, page: 'Banner3', alt: 'Banner 3', placeholder: 'Banner 3' },
        { id: 4, page: 'Banner4', alt: 'Banner 4', placeholder: 'Banner 4' },
        { id: 5, page: 'Banner5', alt: 'Banner 5', placeholder: 'Banner 5' },
        { id: 6, page: 'Banner6', alt: 'Banner 6', placeholder: 'Banner 6' }
    ];
    
    // Slider configuration
    const VISIBLE_BANNERS = 3;
    const BANNER_WIDTH = 212;
    let currentIndex = 0;
    let autoPlayInterval;
    const track = document.querySelector('.slider-track');
    const pagination = document.querySelector('.slider-pagination');
    
    // Initialize slider
    function initSlider() {
        // Create extended banners for looping
        const extendedBanners = [...banners, ...banners, ...banners];
        track.style.width = `${extendedBanners.length * BANNER_WIDTH}px`;
        
        // Add banners to track
        extendedBanners.forEach((banner, index) => {
            const slide = document.createElement('div');
            slide.className = `banner-slide ${index < VISIBLE_BANNERS ? 'visible' : ''}`;
            slide.style.width = '192px';
            slide.style.marginRight = '20px';
            slide.innerHTML = `
                <a href="/wiki/${banner.page}" class="banner-link">
                    <div class="banner-image">${banner.placeholder}</div>
                </a>
            `;
            track.appendChild(slide);
        });
        
        // Create pagination dots
        banners.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `pagination-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            pagination.appendChild(dot);
        });
        
        // Add navigation events
        document.querySelector('.slider-nav.prev').addEventListener('click', prevSlide);
        document.querySelector('.slider-nav.next').addEventListener('click', nextSlide);
        
        // Start autoplay
        startAutoPlay();
    }
    
    // Slider functions
    function goToSlide(index) {
        currentIndex = index % banners.length;
        updateSlider();
        resetAutoPlay();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % banners.length;
        updateSlider();
        resetAutoPlay();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + banners.length) % banners.length;
        updateSlider();
        resetAutoPlay();
    }
    
    function updateSlider() {
        const offset = -currentIndex * BANNER_WIDTH;
        track.style.transform = `translateX(${offset}px)`;
        
        // Update pagination
        document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update visible slides
        document.querySelectorAll('.banner-slide').forEach((slide, index) => {
            slide.classList.toggle('visible', 
                index >= currentIndex && index < currentIndex + VISIBLE_BANNERS
            );
        });
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        setTimeout(startAutoPlay, 5000);
    }
    
    // Initialize the slider
    initSlider();
});