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
           modal = document.querySelector('.modal'),
           modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
        showModal();
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 5000);


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

});