/* script.js */
function initCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let index = 0;
  let interval;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width + 32; // inclui margem
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  function startAutoSlide() {
    interval = setInterval(() => {
      index = (index + 1) % slides.length;
      updateCarousel();
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);
  window.addEventListener('resize', updateCarousel);

  startAutoSlide();
  updateCarousel();
}

// Inicializa todos os carrosséis da página
initCarousel('dev-carousel');
initCarousel('douglas-carousel');
initCarousel('teo-carousel');