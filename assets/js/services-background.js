/**
 * Services Page Dynamic Background
 * Cycles through project images as backgrounds for different sections
 */

class ServicesBackground {
  constructor() {
    this.projectImages = [
      'assets/img/projects/IMG-20250717-WA0053_image_repair_1752928851354.jpg',
      'assets/img/projects/IMG-20250717-WA0054_image_repair_1752928741684.jpg',
      'assets/img/projects/IMG-20250717-WA0055_image_repair_1752928896029.jpg',
      'assets/img/projects/IMG-20250717-WA0056_image_repair_1752928931064.jpg',
      'assets/img/projects/IMG-20250717-WA0057_image_repair_1752928966241.jpg',
      'assets/img/projects/IMG-20250717-WA0058_image_repair_1752928998433.jpg',
      'assets/img/projects/snapedit_1752931408497.jpeg',
      'assets/img/projects/WhatsApp Image 2025-07-19 at 3.24.19 PM.png'
    ];
    
    this.currentImageIndex = 0;
    this.sections = [
      '.concept-one',
      '.concept-two', 
      '.concept-three',
      '.concept-four',
      '.concept-five',
      '.concept-six',
      '.concept-seven',
      '.concept-eight'
    ];
    
    this.init();
  }

  init() {
    // Preload images
    this.preloadImages();
    
    // Set initial backgrounds
    this.setInitialBackgrounds();
    
    // Start cycling
    this.startCycling();
    
    // Add intersection observer for better performance
    this.setupIntersectionObserver();
  }

  preloadImages() {
    this.projectImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  setInitialBackgrounds() {
    this.sections.forEach((section, index) => {
      const element = document.querySelector(section);
      if (element) {
        const imageIndex = index % this.projectImages.length;
        element.style.backgroundImage = `url('${this.projectImages[imageIndex]}')`;
      }
    });
  }

  startCycling() {
    setInterval(() => {
      this.cycleBackgrounds();
    }, 8000); // Change every 8 seconds
  }

  cycleBackgrounds() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.projectImages.length;
    
    this.sections.forEach((section, index) => {
      const element = document.querySelector(section);
      if (element && this.isElementVisible(element)) {
        const imageIndex = (this.currentImageIndex + index) % this.projectImages.length;
        element.style.backgroundImage = `url('${this.projectImages[imageIndex]}')`;
      }
    });
  }

  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    return rect.top < windowHeight && rect.bottom > 0;
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible, ensure it has a fresh background
          const section = entry.target;
          const sectionIndex = this.sections.findIndex(selector => 
            section.matches(selector)
          );
          
          if (sectionIndex !== -1) {
            const imageIndex = (this.currentImageIndex + sectionIndex) % this.projectImages.length;
            section.style.backgroundImage = `url('${this.projectImages[imageIndex]}')`;
          }
        }
      });
    }, options);

    // Observe all concept sections
    this.sections.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        observer.observe(element);
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ServicesBackground();
}); 