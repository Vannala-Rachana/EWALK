"use strict";

/**
 * PRELOAD
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  if (preloader) {
    preloader.classList.add("loaded");
  }
  document.body.classList.add("loaded");
});

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    if (elements[i]) {
      elements[i].addEventListener(eventType, callback);
    }
  }
};

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const closeBtn = document.querySelector(".close-btn");
const navOpenBtn = document.querySelector(".nav-open-btn");

const openNavbar = function () {
  if (navbar) navbar.classList.add("active");
  if (overlay) overlay.classList.add("active");
  document.body.classList.add("nav-active");
};

const closeNavbar = function () {
  if (navbar) navbar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
};

if (navOpenBtn) navOpenBtn.addEventListener("click", openNavbar);
if (closeBtn) closeBtn.addEventListener("click", closeNavbar);
if (overlay) overlay.addEventListener("click", closeNavbar);

// Close navbar when any nav link is clicked (sub-items and main items)
const navSubLinks = document.querySelectorAll(".navbar-subitem .navbar-link");
addEventOnElements(navSubLinks, "click", closeNavbar);

const navMainLinks = document.querySelectorAll(".navbar-item:not(.navbar-subitem) > .navbar-link");
addEventOnElements(navMainLinks, "click", closeNavbar);

/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (header) {
    if (isScrollBottom) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
  }
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (backTopBtn) {
    if (window.scrollY >= 50) {
      backTopBtn.classList.add("active");
    } else {
      backTopBtn.classList.remove("active");
    }
  }
});

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

if (heroSlider && heroSliderItems.length) {
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];

  const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  };

  const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
    updateSliderPos();
  };

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }
    updateSliderPos();
  };

  if (heroSliderNextBtn) heroSliderNextBtn.addEventListener("click", slideNext);
  if (heroSliderPrevBtn) heroSliderPrevBtn.addEventListener("click", slidePrev);

  let autoSlideInterval;

  const autoSlide = function () {
    autoSlideInterval = setInterval(slideNext, 7000);
  };

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseover",
    function () { clearInterval(autoSlideInterval); }
  );

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseout",
    autoSlide
  );

  window.addEventListener("load", autoSlide);
}

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

if (parallaxItems.length) {
  let x, y;

  window.addEventListener("mousemove", function (event) {
    x = (event.clientX / window.innerWidth) * 10 - 5;
    y = (event.clientY / window.innerHeight) * 10 - 5;

    x = x - x * 2;
    y = y - y * 2;

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
      x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
      y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
      parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
  });
}
