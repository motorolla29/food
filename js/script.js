'use strict';

window.addEventListener('DOMContentLoaded',() => {

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
});