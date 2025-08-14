// Welcome page JavaScript - Handles the slideshow functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideshow
    initSlideshow();
    
    // Handle color orbs animation
    initColorOrbs();
});

// Function to initialize the automatic slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds between slides
    
    // Function to change slide
    function changeSlide(n) {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Set up automatic slideshow
    setInterval(() => {
        changeSlide(currentSlide + 1);
    }, slideInterval);
}

// Function to initialize the floating color orbs
function initColorOrbs() {
    const colorOrbs = document.querySelectorAll('.color-orb');
    
    colorOrbs.forEach((orb, index) => {
        // Add random movement duration
        orb.style.animationDuration = `${15 + (index * 2)}s`;
    });
}