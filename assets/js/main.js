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

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
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

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
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

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

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
