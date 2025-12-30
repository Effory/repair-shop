const animatedElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animatedElements.forEach(el => observer.observe(el));
 