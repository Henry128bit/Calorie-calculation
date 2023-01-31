window.addEventListener('DOMContentLoaded', () => {
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
         tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
         });

         tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
         });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();

    // Timer

    const deadline = '2023-06-01';

    function getTimeRemaining (endtime) {
        let days, hours, minutes, seconds;
        const total = Date.parse(endtime) - new Date();

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor((total / (1000 * 60 * 60) % 24));
            minutes = Math.floor((total / 1000 / 60) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }

        return {total, days, hours, minutes, seconds};
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
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

    // Modal

    const openModalBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          closeModalBtn = document.querySelector('[data-close]'),
          modalTimerId = setTimeout(openModal, 5000);

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    openModalBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    // Class
    const ServerArr = [
        {
            src: 'img/tabs/vegy.jpg',
            alt: 'vegy',
            title: 'Меню "Фитнес"',
            descr: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
                    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и 
                    высоким качеством!`,
            price: 9
        },

        {
            src: 'img/tabs/elite.jpg',
            alt: 'elite',
            title: 'Меню “Премиум”',
            descr: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное 
                    исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода 
                    в ресторан!`,
            price: 15
        },

        {
            src: 'img/tabs/post.jpg',
            alt: 'post',
            title: 'Меню "Постное"',
            descr: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного 
                    происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за 
                    счет тофу и импортных вегетарианских стейков.`,
            price: 11
        },
    ];

    class MenuCard {
        constructor(src, alt, title, descr, price) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const container = document.querySelector('.menu_container');
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            container.append(element);
        }
    }

    ServerArr.forEach((item) => {
        let src = item.src;
        let alt = item.alt;
        let title = item.title;
        let descr = item.descr;
        let price = item.price;

        new MenuCard(src, alt, title, descr, price).render();
    });
});