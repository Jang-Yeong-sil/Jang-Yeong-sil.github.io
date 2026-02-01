/**
 * Jang-Yeong-sil GitHub Pages - Main JavaScript
 */

(function () {
  'use strict';

  // ========================================
  // Intersection Observer - Scroll Animations
  // ========================================
  function initScrollAnimations() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Observe all elements with .animate class (except hero section which auto-plays)
    document.querySelectorAll('.section .animate').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ========================================
  // Navigation - Scroll Effect
  // ========================================
  function initNavScroll() {
    var header = document.getElementById('header');
    var scrollThreshold = 50;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================
  // Navigation - Active Link Highlight
  // ========================================
  function initActiveNav() {
    var sections = document.querySelectorAll('.section');
    var navLinks = document.querySelectorAll('.nav-links a');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-' + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72) + 'px 0px -40% 0px',
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ========================================
  // Mobile Menu Toggle
  // ========================================
  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      var isActive = hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ========================================
  // Smooth Scroll for anchor links
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initScrollAnimations();
    initNavScroll();
    initActiveNav();
    initMobileMenu();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
