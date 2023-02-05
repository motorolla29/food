'use strict';

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // tabs

    const tab = document.querySelectorAll(tabsSelector),
          tabs = document.querySelector(tabsParentSelector),
          content = document.querySelectorAll(tabsContentSelector);

    function HideContent() {
    content.forEach(item => {
        item.classList.remove('show', 'fade');
        item.classList.add('hide');
    });

    tab.forEach(item => {
        item.classList.remove(activeClass);
    });
    }

    function ShowContent(i = 0) {
    content[i].classList.add('show', 'fade');
    content[i].classList.remove('hide');

    tab[i].classList.add(activeClass);
    }

    HideContent();

    ShowContent();

    tabs.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tab.forEach((item, i) => {
                if (target == tab[i]) {
                    HideContent();
                    ShowContent(i);
                }
            });
        }
    });
}

export default tabs;