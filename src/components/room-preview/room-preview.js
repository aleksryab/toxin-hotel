$(function() {

  const	carousels = document.querySelectorAll('.js-carousel');

  carousels.forEach(carousel => {

    const slides = carousel.querySelectorAll('.room-preview__slide'),
          prev = carousel.querySelector('.room-preview__prev'),
          next = carousel.querySelector('.room-preview__next');

    let dotsBox, dots = [];
    let  slideIndex = 1;

    renderDots();
    showSlides(slideIndex);

    next.addEventListener('click', (event) => {
      event.preventDefault();
      slideIndex++;
      showSlides(slideIndex);
    });

    prev.addEventListener('click', (event) => {
      event.preventDefault();
      slideIndex--;
      showSlides(slideIndex);
    });

    dotsBox.addEventListener('click', (event) => {
      let target = event.target;
      if (target && target.classList.contains('room-preview__dot')) {
        for (let i = 0; i < dots.length; i++) {
          if (target == dots[i]) {
            currentSlide(i);
            break;
          }
        }
      }
    });

    function renderDots() {
      dotsBox = document.createElement('div');
      dotsBox.className = 'room-preview__dots';
      carousel.append(dotsBox);

      for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('span');
        dot.className = 'room-preview__dot';
        dotsBox.append(dot);
        dots.push(dot);
      }
    }

    function showSlides(index) {
      slideIndex = index > slides.length ? 1 : index < 1 ? slides.length : slideIndex;
      slides.forEach(item => item.style.display = 'none');
      dots.forEach(item => item.classList.remove('room-preview__dot_active'));
      slides[slideIndex-1].style.display = 'block';
      dots[slideIndex-1].classList.add('room-preview__dot_active');
    }

    function currentSlide(index) {
      showSlides(slideIndex = index+1);
    }
  });
});