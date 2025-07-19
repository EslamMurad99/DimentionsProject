(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector('#header');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const navLinks = document.querySelectorAll('.navmenu a');
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const faqItems = document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle');
  const dropdownToggles = document.querySelectorAll('.navmenu .toggle-dropdown');
  const skillsAnimations = document.querySelectorAll('.skills-animation');
  const isotopeLayouts = document.querySelectorAll('.isotope-layout');


window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  
  // Only show splash screen on home page
  const isHomePage = window.location.pathname === '/' || 
                    window.location.pathname === '/index.html' || 
                    window.location.pathname.endsWith('index.html');
  
  const intro = document.querySelector('.intro');
  const logo = document.querySelector('.intro .logo');

  console.log('intro:', intro);
  console.log('logo:', logo);
  console.log('isHomePage:', isHomePage);
  console.log('Current pathname:', window.location.pathname);

  // If not home page or elements don't exist, hide splash screen immediately
  if (!isHomePage || !intro || !logo) {
    if (intro) {
      intro.style.display = 'none';
    }
    console.log('Splash screen hidden - not home page or elements not found');
    return;
  }

  // Check if this is an external visit (not from internal navigation)
  const isExternalVisit = !sessionStorage.getItem('internal-navigation');
  const referrer = document.referrer;
  const isFromSameDomain = referrer && (referrer.includes(window.location.hostname) || referrer.includes('localhost'));
  
  console.log('Navigation info:', {
    isExternalVisit,
    referrer,
    isFromSameDomain,
    sessionStorage: sessionStorage.getItem('internal-navigation')
  });

  // Don't show splash screen if navigating internally
  if (!isExternalVisit || isFromSameDomain) {
    console.log('Internal navigation detected, hiding splash screen');
    intro.style.display = 'none';
    return;
  }

  console.log('External visit detected, showing splash screen...');

  // Ensure the intro is visible and properly positioned
  intro.style.display = 'flex';
  intro.style.top = '0';
  intro.style.zIndex = '9999';
  
  // Ensure logo starts in correct state
  logo.style.opacity = '0';
  logo.style.transform = 'translateY(20px)';
  logo.classList.remove('logo-active', 'logo-fade');

  console.log('Initial logo state:', {
    opacity: logo.style.opacity,
    transform: logo.style.transform,
    classes: logo.className
  });

  // Start the animation sequence
  setTimeout(() => {
    console.log('Adding logo-active class...');
    logo.classList.add('logo-active');
    console.log('Logo classes after adding:', logo.className);
    console.log('Logo computed styles:', {
      opacity: getComputedStyle(logo).opacity,
      transform: getComputedStyle(logo).transform
    });
    
    // Fallback: If CSS transition doesn't work, use JavaScript animation
    setTimeout(() => {
      const computedOpacity = getComputedStyle(logo).opacity;
      if (computedOpacity === '0') {
        console.log('CSS transition failed, using JavaScript fallback');
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
      }
    }, 200);
  }, 100);

  // Fade out the logo
  setTimeout(() => {
    console.log('Adding logo-fade class...');
    logo.classList.remove('logo-active');
    logo.classList.add('logo-fade');
    console.log('Logo classes after fade:', logo.className);
    
    // Fallback: If CSS transition doesn't work, use JavaScript animation
    setTimeout(() => {
      const computedOpacity = getComputedStyle(logo).opacity;
      if (computedOpacity === '1') {
        console.log('CSS fade transition failed, using JavaScript fallback');
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
      }
    }, 200);
  }, 3000);

  // Hide the splash screen
  setTimeout(() => {
    console.log('Moving intro up...');
    intro.style.top = '-100vh';
    
    // Remove the intro element after animation completes
    setTimeout(() => {
      intro.style.display = 'none';
      console.log('Splash screen completely hidden');
    }, 1000);
  }, 3500);
});

// Track internal navigation
document.addEventListener('DOMContentLoaded', () => {
  // Mark internal navigation for all navigation links
  const navLinks = document.querySelectorAll('a[href], .navmenu a, .mobile-nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only mark as internal if it's a link to the same site
      if (href && (href.startsWith('#') || 
                   href.startsWith('./') || 
                   href.startsWith('/') || 
                   href.includes(window.location.hostname) ||
                   href.endsWith('.html'))) {
        console.log('Internal navigation detected:', href);
        sessionStorage.setItem('internal-navigation', 'true');
      }
    });
  });
});

// Test function to reset splash screen (for development/testing)
window.resetSplashScreen = function() {
  sessionStorage.removeItem('internal-navigation');
  console.log('Splash screen reset. Refresh the page to see it again.');
};


  function toggleScrolled() {
    if (!header.classList.contains('scroll-up-sticky') &&
        !header.classList.contains('sticky-top') &&
        !header.classList.contains('fixed-top')) return;
    body.classList.toggle('scrolled', window.scrollY > 100);
  }

  function toggleScrollTop() {
    if (scrollTopBtn)
      scrollTopBtn.classList.toggle('active', window.scrollY > 100);
  }

  // Mobile navigation is now handled by mobile-nav.js
  function mobileNavToggle() {
    // This function is kept for compatibility but mobile navigation is handled separately
    console.log('Mobile navigation toggle - handled by mobile-nav.js');
  }

  function navmenuScrollspy() {
    const scrollY = window.scrollY + 200;
    navLinks.forEach(link => {
      const hash = link.hash;
      if (!hash || !document.querySelector(hash)) return;
      const section = document.querySelector(hash);
      const inView = scrollY >= section.offsetTop && scrollY <= section.offsetTop + section.offsetHeight;
      link.classList.toggle('active', inView);
    });
  }

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const configText = swiperElement.querySelector(".swiper-config")?.innerHTML.trim();
      if (!configText) return;
      const config = JSON.parse(configText);
      swiperElement.classList.contains("swiper-tab")
        ? initSwiperWithCustomPagination(swiperElement, config)
        : new Swiper(swiperElement, config);
    });
  }

  function initClientsSwiper() {
    const clientsSwiperElement = document.querySelector('.init-swiper');
    if (!clientsSwiperElement) return;

    // Destroy existing Swiper instance if it exists
    if (clientsSwiperElement.swiper) {
      clientsSwiperElement.swiper.destroy(true, true);
    }

    // Initialize new Swiper with navigation
    const clientsSwiper = new Swiper(clientsSwiperElement, {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.clients-next',
        prevEl: '.clients-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 60
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 80
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 120
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 120
        }
      }
    });

    // Store the Swiper instance for debugging
    window.clientsSwiper = clientsSwiper;
  }

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  function initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      document.documentElement.style.setProperty('--scroll-offset', scrolled);
    });
  }

  /* أحداث الصفحة */
  document.addEventListener('scroll', () => {
    toggleScrolled();
    toggleScrollTop();
    navmenuScrollspy();
  });

  window.addEventListener('load', () => {
    toggleScrolled();
    toggleScrollTop();
    navmenuScrollspy();
    aosInit();
    initSwiper();
    initClientsSwiper();
    initParallax();
    if (document.querySelector('#preloader')) {
      document.querySelector('#preloader').remove();
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile navigation events are now handled by mobile-nav.js
  // if (mobileNavToggleBtn) {
  //   mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  // }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      toggle.parentNode.classList.toggle('active');
      toggle.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  faqItems.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.parentNode.classList.toggle('faq-active');
    });
  });

  skillsAnimations.forEach(item => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: () => {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  isotopeLayouts.forEach(isotopeItem => {
    const container = isotopeItem.querySelector('.isotope-container');
    const filters = isotopeItem.querySelectorAll('.isotope-filters li');
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    imagesLoaded(container, () => {
      initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    filters.forEach(f => {
      f.addEventListener('click', function () {
        isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        aosInit();
      });
    });
  });

  if (window.location.hash && document.querySelector(window.location.hash)) {
    setTimeout(() => {
      const section = document.querySelector(window.location.hash);
      const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop);
      window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
    }, 100);
  }

})();

document.addEventListener('DOMContentLoaded', function() {
  // Initialize clients swiper with navigation
  const clientsSwiper = new Swiper('.init-swiper', {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.clients-next',
      prevEl: '.clients-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 120
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });
});


const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
  console.log(entry)
  if (entry.isIntersecting){
    entry.target.classList.add('show');
  }
  else{
    entry.target.classList.remove('show')
  }
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));

}
);
