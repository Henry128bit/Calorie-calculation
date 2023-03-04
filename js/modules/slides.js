function slides({container, slide, prevtArrow, nextArrow, totalCounter, currentCounter}) {
    // Slides
    const slider = document.querySelector(container),
          slides = document.querySelectorAll(slide),
          prev = document.querySelector(prevtArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter);
    
    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent =`0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent =`0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex +=n);
    }

    // Dots
    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('slides-indicators');
    slider.append(indicators);

    let dots = [];

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function activDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
        activDot();
    });
    next.addEventListener('click', () => {
        plusSlides(1);
        activDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            slideIndex = 0;
            plusSlides.bind(this, Number(e.target.getAttribute('data-slide-to')))();
            activDot();
        });
    });
}

export default slides;