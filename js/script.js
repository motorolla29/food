'use strict';

window.addEventListener('DOMContentLoaded',() => {
     
    // tabs

     const tab = document.querySelectorAll('.tabheader__item'),
           tabs = document.querySelector('.tabheader__items'),
           content = document.querySelectorAll('.tabcontent');

     function HideContent() {
        content.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tab.forEach(item => {
            item.classList.remove('tabheader__item_active');
     });
     }

     function ShowContent(i = 0) {
        content[i].classList.add('show', 'fade');
        content[i].classList.remove('hide');

        tab[i].classList.add('tabheader__item_active');
     }

     HideContent();

     ShowContent();

     tabs.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tab.forEach((item, i) => {
                if (target == tab[i]) {
                    HideContent();
                    ShowContent(i);
                }
            });
        }
     });

     // timer

     const deadline = '2023-06-01';

     function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t/ (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60 ) % 60),
        seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
     }

function getZero(num) {
    if (num >= 0 && num <10) {
        return `0${num}`;
    } else {
        return num;
    }
}

     function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
     }

     setClock('.timer', deadline);

     // modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
           modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
        showModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 50000);


    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
                documentElement.scrollHeight) {
                    showModal();
                    window.removeEventListener('scroll', showModalByScroll);
            }
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    // Card class

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        
        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

        this.parent.append(element);
        }
    }  

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    
    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    }); 

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success); 
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');  
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // Slider 

    const nextSlideButton = document.querySelector('.offer__slider-next'),
          prevSlideButton = document.querySelector('.offer__slider-prev'),
          slides = document.querySelectorAll('.offer__slide'),
          currentSlide = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
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

    nextSlideButton.addEventListener('click', (e) => {

        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlide.textContent = getZero(slideIndex);
    });

    prevSlideButton.addEventListener('click', (e) => {

        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex <= 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlide.textContent = getZero(slideIndex);
    });
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



});