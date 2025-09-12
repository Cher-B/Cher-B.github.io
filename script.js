// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    
    this.init();
  }
  
  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);
    
    // Add event listener for theme toggle
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    });
  }
  
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  getStoredTheme() {
    return localStorage.getItem('theme');
  }
  
  setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.setStoredTheme(theme);
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    
    // Add a subtle animation effect
    this.themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.themeToggle.style.transform = 'scale(1)';
    }, 150);
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.scrollIndicator = document.querySelector('.scroll-indicator');
    this.aboutSection = document.querySelector('.about');
    
    this.init();
  }
  
  init() {
    if (this.scrollIndicator && this.aboutSection) {
      this.scrollIndicator.addEventListener('click', () => {
        this.aboutSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  }
}

// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.observerOptions
    );
    
    this.init();
  }
  
  init() {
    const elementsToAnimate = document.querySelectorAll('.skill-tag, .about-text p');
    elementsToAnimate.forEach(el => {
      this.observer.observe(el);
    });
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }
}

// Parallax Effect for Floating Elements
class ParallaxEffect {
  constructor() {
    this.floatingCards = document.querySelectorAll('.floating-card');
    this.init();
  }
  
  init() {
    if (this.floatingCards.length > 0) {
      window.addEventListener('scroll', this.handleScroll.bind(this));
      this.handleScroll(); // Initial call
    }
  }
  
  handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    this.floatingCards.forEach((card, index) => {
      const speed = 0.3 + (index * 0.1);
      card.style.transform = `translateY(${rate * speed}px)`;
    });
  }
}

// Typing Effect for Hero Title
class TypingEffect {
  constructor() {
    this.nameElement = document.querySelector('.name');
    this.originalText = this.nameElement?.textContent || 'Cherry!';
    this.init();
  }
  
  init() {
    if (this.nameElement) {
      this.nameElement.textContent = '';
      this.typeText();
    }
  }
  
  typeText() {
    let i = 0;
    const timer = setInterval(() => {
      if (i < this.originalText.length) {
        this.nameElement.textContent += this.originalText.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);
  }
}

// Performance Optimized Scroll Handler
class ScrollPerformance {
  constructor() {
    this.ticking = false;
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  
  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(this.updateScroll.bind(this));
      this.ticking = true;
    }
  }
  
  updateScroll() {
    // Header background opacity based on scroll
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    const opacity = Math.min(scrolled / 100, 1);
    
    if (header) {
      header.style.backgroundColor = `rgba(255, 255, 255, ${0.8 * opacity})`;
    }
    
    this.ticking = false;
  }
}

// Contact Tooltip Manager
class ContactTooltip {
  constructor() {
    this.contactLink = document.getElementById('contact-link');
    this.tooltip = document.getElementById('contact-tooltip');
    this.email = 'cherry.bhatt@example.com'; // Replace with your actual email
    
    this.init();
  }
  
  init() {
    if (this.contactLink && this.tooltip) {
      this.contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTooltip();
      });
      
      this.contactLink.addEventListener('mouseenter', () => {
        this.showTooltip();
      });
      
      this.contactLink.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!this.tooltip.matches(':hover')) {
            this.hideTooltip();
          }
        }, 100);
      });
      
      this.tooltip.addEventListener('mouseenter', () => {
        this.showTooltip();
      });
      
      this.tooltip.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
      
      this.tooltip.addEventListener('click', () => {
        this.copyEmail();
      });
    }
  }
  
  showTooltip() {
    this.tooltip.classList.add('show');
  }
  
  hideTooltip() {
    this.tooltip.classList.remove('show');
  }
  
  toggleTooltip() {
    this.tooltip.classList.toggle('show');
    if (this.tooltip.classList.contains('show')) {
      setTimeout(() => {
        this.copyEmail();
      }, 100);
    }
  }
  
  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      const copyText = this.tooltip.querySelector('.contact-copy');
      const originalText = copyText.textContent;
      copyText.textContent = 'Copied!';
      copyText.style.color = 'var(--accent-primary)';
      
      setTimeout(() => {
        copyText.textContent = originalText;
        copyText.style.color = '';
      }, 2000);
    }).catch(() => {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = this.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      const copyText = this.tooltip.querySelector('.contact-copy');
      const originalText = copyText.textContent;
      copyText.textContent = 'Copied!';
      copyText.style.color = 'var(--accent-primary)';
      
      setTimeout(() => {
        copyText.textContent = originalText;
        copyText.style.color = '';
      }, 2000);
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  new ThemeManager();
  new SmoothScroll();
  new AnimationObserver();
  new ParallaxEffect();
  new TypingEffect();
  new ScrollPerformance();
  new ContactTooltip();
  
  // Add loading animation completion
  document.body.classList.add('loaded');
  
  // Preload critical images (if any)
  this.preloadImages();
});

// Image preloading function
function preloadImages() {
  const images = [
    // Add any image URLs here if needed
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Utility function for smooth animations
function animateElement(element, animation, duration = 300) {
  element.style.animation = `${animation} ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    SmoothScroll,
    AnimationObserver,
    ParallaxEffect,
    TypingEffect,
    ScrollPerformance
  };
}
