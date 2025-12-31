const hero = document.querySelector('.hero');
const heroImg = document.querySelector('.hero-img');

if (hero && heroImg) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroImg.style.transform = `
      translate(${x * 10}px, ${y * 10}px)
    `;
  });

  hero.addEventListener('mouseleave', () => {
    heroImg.style.transform = 'translate(0,0)';
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prev = document.querySelector(".prev-btn");
  const next = document.querySelector(".next-btn");

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
});
/* ================================
   EXPECT SLIDER JS
================================ */
const track = document.querySelector('.expect-track');
const slides = document.querySelectorAll('.expect-slide');
const prevBtn = document.querySelector('.expect-btn.prev');
const nextBtn = document.querySelector('.expect-btn.next');

let index = 0;
const total = slides.length;

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % total;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + total) % total;
  updateSlider();
});

setInterval(() => {
  index = (index + 1) % total;
  updateSlider();
}, 6000);
