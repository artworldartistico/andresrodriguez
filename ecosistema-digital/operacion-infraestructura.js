/* ==========================================================================
   OPERACIÓN E INFRAESTRUCTURA INTELIGENTE — interacciones
   100% JavaScript Vanilla. Sin librerías, sin jQuery.
   ========================================================================== */

   (function () {
    "use strict";
  
    var section = document.getElementById("operacion-infraestructura");
    if (!section) return;
  
    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  
    /* ----------------------------------------------------------------
       1) Revelado en scroll: los elementos aparecen uno por uno
          usando Intersection Observer + un pequeño desfase (delay).
          Las tarjetas de planes reciben un desfase en cascada.
    ---------------------------------------------------------------- */
    var animatedItems = section.querySelectorAll("[data-animate]");
    var cards = section.querySelectorAll(".ops-card");
  
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
  
            var el = entry.target;
  
            if (el.classList.contains("ops-card")) {
              var index = Array.prototype.indexOf.call(cards, el);
              var columns = getColumnCount();
              var delay = (index % columns) * 0.1 + Math.floor(index / columns) * 0.08;
              el.style.setProperty("--delay", delay.toFixed(2) + "s");
            }
  
            el.classList.add("ops-visible");
            observer.unobserve(el);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
  
      animatedItems.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      animatedItems.forEach(function (el) {
        el.classList.add("ops-visible");
      });
    }
  
    function getColumnCount() {
      var width = window.innerWidth;
      if (width <= 600) return 1;
      if (width <= 992) return 2;
      return 4;
    }
  
    /* ----------------------------------------------------------------
       2) Glow que sigue el cursor dentro de cada tarjeta (spotlight).
    ---------------------------------------------------------------- */
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });
  
    /* ----------------------------------------------------------------
       3) Mouse parallax muy sutil sobre los halos de fondo.
          Nada exagerado: desplazamiento máximo de unos pocos píxeles.
    ---------------------------------------------------------------- */
    if (!prefersReducedMotion) {
      var glowA = section.querySelector(".ops-glow--a");
      var glowB = section.querySelector(".ops-glow--b");
      var ticking = false;
      var targetX = 0;
      var targetY = 0;
  
      section.addEventListener("mousemove", function (e) {
        var rect = section.getBoundingClientRect();
        var relX = (e.clientX - rect.left) / rect.width - 0.5;
        var relY = (e.clientY - rect.top) / rect.height - 0.5;
  
        targetX = relX;
        targetY = relY;
  
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      });
  
      function updateParallax() {
        var maxOffset = 14;
  
        if (glowA) {
          glowA.style.transform =
            "translate3d(" +
            (targetX * maxOffset).toFixed(1) +
            "px," +
            (targetY * maxOffset).toFixed(1) +
            "px,0)";
        }
        if (glowB) {
          glowB.style.transform =
            "translate3d(" +
            (targetX * -maxOffset).toFixed(1) +
            "px," +
            (targetY * -maxOffset).toFixed(1) +
            "px,0)";
        }
        ticking = false;
      }
    }
  })();



  // FAQ Accordion
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });

        item.classList.toggle("active");
      });
    });
  }

  initFAQ();

  // Scroll del arrow down del header
  document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth'
    });
  });

  // SLIDER SUAVE Y ESTABLE PARA LOS HITOS
  const slides = document.querySelectorAll('.milestone-slide');
  const prevBtn = document.querySelector('.milestone-nav.prev');
  const nextBtn = document.querySelector('.milestone-nav.next');
  const dotsContainer = document.querySelector('.milestone-dots');

  let current = 0;
  let autoPlayInterval;
  let autoPlayDelay = 6000;
  let resumeTimeout;
  const resumeDelay = 10000; // 10 segundos

  /* Crear dots */
  slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
          goToSlide(i);
          pauseAutoplay();
      });
      dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.milestone-dots span');

  function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[index].classList.add('active');
      dots[index].classList.add('active');

      resetProgressBar(); // 🔥 reinicia barra cada vez que cambia
  }

  function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
  }

  function prevSlide() {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
  }

  function goToSlide(index) {
      current = index;
      showSlide(current);
  }

  /* Autoplay */
  function startAutoplay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function pauseAutoplay() {
      clearInterval(autoPlayInterval);
      clearTimeout(resumeTimeout);

      resumeTimeout = setTimeout(() => {
          startAutoplay();
      }, resumeDelay);
  }

  /* Eventos */
  nextBtn.addEventListener('click', () => {
      nextSlide();
      pauseAutoplay();
  });

  prevBtn.addEventListener('click', () => {
      prevSlide();
      pauseAutoplay();
  });