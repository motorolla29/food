'use strict';

function slider({container,  slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider 

    const nextSlideButton = document.querySelector(nextArrow),  
          prevSlideButton = document.querySelector(prevArrow),
          slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          currentSlide = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    

    let slideIndex = 1;

    let offset = 0;

    currentSlide.textContent = getZero(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if( i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }


    nextSlideButton.addEventListener('click', (e) => {

        if (offset == getDigitsOf(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getDigitsOf(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlide.textContent = getZero(slideIndex);

        dots.forEach(dot => dot.style.opacity = '.5');

        dots[slideIndex - 1].style.opacity = 1;
    });

    prevSlideButton.addEventListener('click', (e) => {

        if (offset == 0) {
            offset = getDigitsOf(width) * (slides.length - 1);
        } else {
            offset -= getDigitsOf(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex <= 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlide.textContent = getZero(slideIndex);

        setActiveDot();

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = getDigitsOf(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlide.textContent = getZero(slideIndex);

            setActiveDot();
        });
    });

    function setActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5');

        dots[slideIndex - 1].style.opacity = 1;
    }

    function getDigitsOf(str) {
        return +str.replace(/\D/g, '');
    }

    function getZero(num) {
        if (num >= 0 && num <10) {
            return `0${num}`;
        } else {
            return num;
        }
     }

    // total.textContent = getZero(slides.length);
    
    // hideSlides();

    // showSlide();

    // currentSlide.textContent = getZero(slideIndex);

    // nextSlideButton.addEventListener('click', (e) => {
    //    showSlides();

    //    plusSlides(1);

    //    currentSlide.textContent = getZero(slideIndex);
    // });

    // prevSlideButton.addEventListener('click', (e) => {
    //     showSlides();

    //     plusSlides(-1);
        
    //     currentSlide.textContent = getZero(slideIndex);

    // });

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     hideSlides();

    //     showSlide();
    // }
          

    // function hideSlides() {
    //     slides.forEach(slide => {
    //     slide.classList.add('hide');
    //     slide.classList.remove('show');
    //     });
    // }

    // function showSlide() {
    //     slides[slideIndex - 1].classList.remove('hide');
    //     slides[slideIndex - 1].classList.add('show');
    // }
   
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }


}

export default slider;