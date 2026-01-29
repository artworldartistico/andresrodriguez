document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".tech-item");

  const animateSkill = (item) => {
    const target = parseInt(item.dataset.percent, 10);
    const bar = item.querySelector(".tech-progress");
    const number = item.querySelector(".tech-percent");

    if (!bar || !number) return;

    const duration = 1200;
    let start = null;

    const animate = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const value = Math.floor(progress * target);

      bar.style.width = value + "%";
      number.textContent = value + "%";

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        bar.style.width = target + "%";
        number.textContent = target + "%";
      }
    };

    requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        animateSkill(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  items.forEach(item => observer.observe(item));
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

/* Iniciar auto */
startAutoplay();

/* ===============================
   CONTADOR DE ESTADÍSTICAS
=============================== */

const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        const suffix = counter.dataset.suffix || '';
        let current = 0;

        const duration = 1800; // ms
        const stepTime = 16;
        const increment = target / (duration / stepTime);

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };

        updateCounter();
    });
}

/* Dispara animación cuando entra en pantalla */
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
        }
    });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);
