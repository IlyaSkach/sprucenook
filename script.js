// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const closeBtn = document.querySelector(".close-btn");
  const body = document.body;

  // Function to close mobile menu
  function closeMobileMenu() {
    mobileMenuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    body.classList.remove("menu-open");
    console.log("Mobile menu closed"); // Debug log
  }

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Mobile menu button clicked"); // Debug log

    mobileMenuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Close button click handler
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Close button clicked"); // Debug log
      closeMobileMenu();
    });
  }

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      console.log("Closing mobile menu - clicked outside"); // Debug log
      closeMobileMenu();
    }
  });

  // Close mobile menu when pressing Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      console.log("Closing mobile menu - Escape key"); // Debug log
      closeMobileMenu();
    }
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Video loading fallback and speed control
  const video = document.querySelector(".video-background video");
  if (video) {
    // Slow down video to half speed
    video.playbackRate = 0.5;

    video.addEventListener("error", function () {
      console.log("Video failed to load, using fallback background");
      this.style.display = "none";
      const fallback = document.querySelector(".video-fallback");
      if (fallback) {
        fallback.style.display = "block";
      }
    });

    // Ensure video plays on mobile
    video.addEventListener("canplay", function () {
      this.playbackRate = 0.5; // Set slow speed
      this.play().catch((e) => {
        console.log("Autoplay prevented:", e);
      });
    });

    // Ensure slow speed is maintained
    video.addEventListener("play", function () {
      this.playbackRate = 0.5;
    });

    // Additional check for mobile devices
    video.addEventListener("loadedmetadata", function () {
      this.playbackRate = 0.5;
    });

    // Fallback for browsers that don't support playbackRate
    if (typeof video.playbackRate === "undefined") {
      console.log("playbackRate not supported, using CSS animation");
      video.style.animation = "slowVideo 2s linear infinite";
    }
  }

  // WhatsApp button click tracking (optional)
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
      // You can add analytics tracking here
      console.log("WhatsApp button clicked");
    });
  }

  // Contact icons hover effects
  const contactIcons = document.querySelectorAll(
    ".contact-icon, .mobile-contact-icon"
  );
  contactIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.1)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Parallax effect for hero content (subtle)
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector(".hero-content");
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Preload critical images
  const logoImg = document.querySelector(".logo-img");
  if (logoImg) {
    const img = new Image();
    img.src = logoImg.src;
  }

  // Advantages Slider
  const advantagesSlider = document.querySelector(".advantages-slider");
  const advantageTrail = document.querySelector(".advantage-trail");

  if (advantagesSlider && advantageTrail) {
    const trailItems = advantageTrail.querySelectorAll("div");
    let value = 0;
    let trailValue = 0;
    let interval = 10000;

    // Function to slide forward
    const slide = (condition) => {
      clearInterval(start);
      condition === "increase" ? initiateINC() : initiateDEC();
      move(value, trailValue);
      start = setInterval(() => slide("increase"), interval);
    };

    // Function for increase (forward, next) configuration
    const initiateINC = () => {
      trailItems.forEach((cur) => cur.classList.remove("active"));

      // Проверяем, скрыты ли 4 и 5 преимущества
      const box4Hidden = document
        .querySelector(".advantage-box4.advantage-box")
        .classList.contains("hidden-advantage");
      const box5Hidden = document
        .querySelector(".advantage-box5.advantage-box")
        .classList.contains("hidden-advantage");

      // Если мы на 3-м слайде и 4-й скрыт, перейти к 1-му
      if (value === 40 && box4Hidden) {
        value = 0;
      } else if (value === 80) {
        value = 0;
      } else {
        value += 20;
      }

      trailUpdate();
    };

    // Function for decrease (backward, previous) configuration
    const initiateDEC = () => {
      trailItems.forEach((cur) => cur.classList.remove("active"));

      // Проверяем, скрыты ли 4 и 5 преимущества
      const box4Hidden = document
        .querySelector(".advantage-box4.advantage-box")
        .classList.contains("hidden-advantage");
      const box5Hidden = document
        .querySelector(".advantage-box5.advantage-box")
        .classList.contains("hidden-advantage");

      // Если мы на 1-м слайде, перейти к последнему доступному
      if (value === 0) {
        value = box4Hidden ? 40 : 80;
      } else {
        value -= 20;
      }

      trailUpdate();
    };

    // Function to transform slide
    const move = (S, T) => {
      advantagesSlider.style.transform = `translateX(-${S}%)`;
      trailItems[T].classList.add("active");
    };

    // Function to update trailValue based on slide value
    const trailUpdate = () => {
      if (value === 0) {
        trailValue = 0;
      } else if (value === 20) {
        trailValue = 1;
      } else if (value === 40) {
        trailValue = 2;
      } else if (value === 60) {
        trailValue = 3;
      } else {
        trailValue = 4;
      }
    };

    // Start interval for slides
    let start = setInterval(() => slide("increase"), interval);

    // Next and Previous button function
    document
      .querySelectorAll(".advantage-prev, .advantage-next")
      .forEach((cur) => {
        cur.addEventListener("click", () =>
          cur.classList.contains("advantage-next")
            ? slide("increase")
            : slide("decrease")
        );
      });

    // Function to slide when trail is clicked
    const clickCheck = (e) => {
      clearInterval(start);
      trailItems.forEach((cur) => cur.classList.remove("active"));
      const check = e.target;
      check.classList.add("active");

      if (check.classList.contains("advantage-box1")) {
        value = 0;
      } else if (check.classList.contains("advantage-box2")) {
        value = 20;
      } else if (check.classList.contains("advantage-box3")) {
        value = 40;
      } else if (check.classList.contains("advantage-box4")) {
        value = 60;
      } else {
        value = 80;
      }

      trailUpdate();
      move(value, trailValue);
      start = setInterval(() => slide("increase"), interval);
    };

    // Add function to all trails
    trailItems.forEach((cur) =>
      cur.addEventListener("click", (ev) => clickCheck(ev))
    );

    // Mobile touch Slide Section
    const touchSlide = (() => {
      let start, move, change, sliderWidth;

      advantagesSlider.addEventListener("touchstart", (e) => {
        start = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        sliderWidth = advantagesSlider.clientWidth / trailItems.length;
      });

      advantagesSlider.addEventListener("touchmove", (e) => {
        // Убираем preventDefault() чтобы разрешить вертикальный скролл
        // Проверяем, является ли движение больше горизонтальным, чем вертикальным
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        if (!this.touchStartY) {
          this.touchStartY = touchY;
        }

        const xDiff = Math.abs(touchX - start);
        const yDiff = Math.abs(touchY - this.touchStartY);

        // Если движение больше горизонтальное, чем вертикальное, предотвращаем скролл страницы
        if (xDiff > yDiff) {
          e.preventDefault();
        }

        move = touchX;
        change = start - move;
      });

      const mobile = (e) => {
        // Сбрасываем touchStartY
        this.touchStartY = null;

        if (change > sliderWidth / 4) {
          // Проверяем, скрыты ли 4 и 5 преимущества
          const box4Hidden = document
            .querySelector(".advantage-box4.advantage-box")
            .classList.contains("hidden-advantage");
          const box5Hidden = document
            .querySelector(".advantage-box5.advantage-box")
            .classList.contains("hidden-advantage");

          // Не листаем дальше 3-го, если 4-5 скрыты
          if ((box4Hidden || box5Hidden) && value >= 40) {
            // ничего не делаем
          } else {
            slide("increase");
          }
        }

        change * -1 > sliderWidth / 4 ? slide("decrease") : null;
        [start, move, change, sliderWidth] = [0, 0, 0, 0];
      };

      advantagesSlider.addEventListener("touchend", mobile);
    })();
  }

  // Advantages More Button - показать скрытые преимущества
  const advantagesMoreBtn = document.getElementById("advantages-more-btn");
  if (advantagesMoreBtn) {
    advantagesMoreBtn.addEventListener("click", function () {
      // Показать скрытые преимущества
      const hiddenBoxes = document.querySelectorAll(
        ".advantage-box.hidden-advantage"
      );
      hiddenBoxes.forEach((box) => {
        box.classList.remove("hidden-advantage");
      });

      // Показать точки навигации
      const hiddenDots = document.querySelectorAll(
        ".advantage-trail .hidden-dot"
      );
      hiddenDots.forEach((dot) => {
        dot.classList.remove("hidden-dot");
      });

      // Скрыть кнопку
      advantagesMoreBtn.style.display = "none";
    });
  }

  // Gallery Slider
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const galleryContainer = document.querySelector(".gallery-container");

  if (gallerySlides.length > 0) {
    let currentSlide = 0;
    let isMobile = window.innerWidth <= 768;

    // Desktop click functionality
    for (const slide of gallerySlides) {
      slide.addEventListener("click", () => {
        if (!isMobile) {
          cleanActiveClass();
          slide.classList.add("active");
        }
      });
    }

    function cleanActiveClass() {
      gallerySlides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }

    // Mobile swipe functionality
    if (isMobile && galleryContainer) {
      let startX = 0;
      let currentX = 0;
      let isDragging = false;

      galleryContainer.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });

      galleryContainer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        e.preventDefault();
      });

      galleryContainer.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
          if (diffX > 0 && currentSlide < gallerySlides.length - 1) {
            // Swipe left - next slide
            currentSlide++;
          } else if (diffX < 0 && currentSlide > 0) {
            // Swipe right - previous slide
            currentSlide--;
          }

          scrollToSlide(currentSlide);
        }
      });

      function scrollToSlide(index) {
        const slideWidth = galleryContainer.clientWidth * 0.875; // 87.5% of container width
        galleryContainer.scrollTo({
          left: index * slideWidth,
          behavior: "smooth",
        });
      }

      // Update active slide based on scroll position
      galleryContainer.addEventListener("scroll", () => {
        const slideWidth = galleryContainer.clientWidth * 0.875; // 87.5% of container width
        const scrollLeft = galleryContainer.scrollLeft;
        const newSlide = Math.round(scrollLeft / slideWidth);

        if (newSlide !== currentSlide) {
          currentSlide = newSlide;
          cleanActiveClass();
          if (gallerySlides[currentSlide]) {
            gallerySlides[currentSlide].classList.add("active");
          }
        }
      });
    }

    // Handle window resize
    window.addEventListener("resize", () => {
      isMobile = window.innerWidth <= 768;
    });

    // Floating Social Icons
    const floatingSocial = document.getElementById("floating-social");
    const contactsSection = document.getElementById("contacts");

    function toggleFloatingSocial() {
      if (!floatingSocial || !contactsSection) return;

      const header = document.querySelector("header");
      const headerBottom = header ? header.offsetTop + header.offsetHeight : 0;
      const contactsTop = contactsSection.offsetTop;
      const scrollY = window.scrollY;

      // Show floating social when header is out of view and before contacts section
      if (scrollY > headerBottom && scrollY < contactsTop - 100) {
        floatingSocial.classList.add("show");
      } else {
        floatingSocial.classList.remove("show");
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", toggleFloatingSocial);

    // Initial check
    toggleFloatingSocial();
  }
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Resize handler
window.addEventListener(
  "resize",
  debounce(function () {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      const mobileMenu = document.querySelector(".mobile-menu");
      const body = document.body;

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
      }
    }
  }, 250)
);

// Add CSS for scrolled navbar state
const style = document.createElement("style");
style.textContent = `
    .navbar.scrolled {
        background: rgba(248, 248, 255, 0.98);
        box-shadow: 0 2px 20px rgba(139, 69, 19, 0.1);
    }
    
    .navbar {
        transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .contact-icon, .mobile-contact-icon {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

// Expanded Gallery Functionality
const galleryMoreBtn = document.getElementById("gallery-more-btn");
const galleryExpanded = document.getElementById("gallery-expanded");
const galleryExpandedContainer = document.querySelector(
  ".gallery-expanded-container"
);
const galleryPrevBtn = document.getElementById("gallery-prev-btn");
const galleryNextBtn = document.getElementById("gallery-next-btn");
const galleryCloseBtn = document.getElementById("gallery-close-btn");
const galleryCurrent = document.getElementById("gallery-current");
const galleryTotal = document.getElementById("gallery-total");

// Gallery data with 23 slides
const galleryData = [
  { image: "assets/slider_1.jpg", title: "Современная сауна" },
  { image: "assets/slider_2.jpg", title: "Классическая парная" },
  { image: "assets/slider_3.jpg", title: "Премиум отделка" },
  { image: "assets/slider_4.jpg", title: "Эксклюзивный дизайн" },
  { image: "assets/slider_5.jpg", title: "Роскошная сауна" },
  { image: "assets/slider_6.jpg", title: "Деревянная отделка" },
  { image: "assets/slider_7.jpg", title: "Стеклянные элементы" },
  { image: "assets/slider_8.jpg", title: "Современное освещение" },
  { image: "assets/slider_9.jpg", title: "Экологичные материалы" },
  { image: "assets/slider_10.jpg", title: "Индивидуальный проект" },
  { image: "assets/slider_11.jpg", title: "Традиционная баня" },
  { image: "assets/slider_12.jpg", title: "Финская сауна" },
  { image: "assets/slider_13.jpg", title: "Инфракрасная сауна" },
  { image: "assets/slider_14.jpg", title: "Комбинированная сауна" },
  { image: "assets/slider_15.jpg", title: "Сауна с бассейном" },
  { image: "assets/slider_16.jpg", title: "Минималистичный дизайн" },
  { image: "assets/slider_17.jpg", title: "Скандинавский стиль" },
  { image: "assets/slider_18.jpg", title: "Русская баня" },
  { image: "assets/slider_19.jpg", title: "Турецкий хамам" },
  { image: "assets/slider_20.jpg", title: "Японская офуро" },
  { image: "assets/slider_21.jpg", title: "Семейная сауна" },
  { image: "assets/slider_22.jpg", title: "Корпоративная сауна" },
  { image: "assets/slider_23.jpg", title: "Эксклюзивный проект" },
];

let currentExpandedSlide = 0;

// Create expanded gallery slides
function createExpandedSlides() {
  galleryExpandedContainer.innerHTML = "";

  galleryData.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "gallery-expanded-slide";
    slide.style.backgroundImage = `url('${item.image}')`;
    slide.innerHTML = `<h3>${item.title}</h3>`;

    if (index === 0) {
      slide.classList.add("active");
    }

    galleryExpandedContainer.appendChild(slide);
  });

  galleryTotal.textContent = galleryData.length;
}

// Show expanded gallery
function showExpandedGallery() {
  createExpandedSlides();
  galleryExpanded.style.display = "flex";
  document.body.style.overflow = "hidden";
  // Добавляем класс для touch-action
  galleryExpandedContainer.style.touchAction = "pan-y";
  currentExpandedSlide = 0;
  updateExpandedGallery();
}

// Hide expanded gallery
function hideExpandedGallery() {
  galleryExpanded.style.display = "none";
  document.body.style.overflow = "auto";
  // Удаляем класс touch-action
  galleryExpandedContainer.style.touchAction = "";
}

// Update expanded gallery display
function updateExpandedGallery() {
  const slides = document.querySelectorAll(".gallery-expanded-slide");

  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentExpandedSlide) {
      slide.classList.add("active");
    }
  });

  galleryCurrent.textContent = currentExpandedSlide + 1;

  // Update button states
  galleryPrevBtn.disabled = currentExpandedSlide === 0;
  galleryNextBtn.disabled = currentExpandedSlide === galleryData.length - 1;
}

// Navigate to previous slide
function prevExpandedSlide() {
  if (currentExpandedSlide > 0) {
    currentExpandedSlide--;
    updateExpandedGallery();
  }
}

// Navigate to next slide
function nextExpandedSlide() {
  if (currentExpandedSlide < galleryData.length - 1) {
    currentExpandedSlide++;
    updateExpandedGallery();
  }
}

// Event listeners for expanded gallery
if (galleryMoreBtn) {
  galleryMoreBtn.addEventListener("click", showExpandedGallery);
}

if (galleryCloseBtn) {
  galleryCloseBtn.addEventListener("click", hideExpandedGallery);
}

if (galleryPrevBtn) {
  galleryPrevBtn.addEventListener("click", prevExpandedSlide);
}

if (galleryNextBtn) {
  galleryNextBtn.addEventListener("click", nextExpandedSlide);
}

// Keyboard navigation for expanded gallery
document.addEventListener("keydown", (e) => {
  if (galleryExpanded && galleryExpanded.style.display === "flex") {
    switch (e.key) {
      case "Escape":
        hideExpandedGallery();
        break;
      case "ArrowLeft":
        prevExpandedSlide();
        break;
      case "ArrowRight":
        nextExpandedSlide();
        break;
    }
  }
});

// Close expanded gallery when clicking outside
if (galleryExpanded) {
  galleryExpanded.addEventListener("click", (e) => {
    if (e.target === galleryExpanded) {
      hideExpandedGallery();
    }
  });
}
