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