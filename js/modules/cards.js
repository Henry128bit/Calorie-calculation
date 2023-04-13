// import {getResource} from '../services/services';

const dataBase = [ // чтобы работало без сервера
    {
        img: "img/tabs/vegy.jpg",
        altimg: "vegy",
        title: "Меню 'Фитнес'",
        descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        price: 330
    },
    {
        img: "img/tabs/post.jpg",
        altimg: "post",
        title: "Меню 'Постное'",
        descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        price: 270
    },
    {
        img: "img/tabs/elite.jpg",
        altimg: "elite",
        title: "Меню 'Премиум'",
        descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        price: 479
    }
];

function cards() {
    // Class
    class MenuCard {
        constructor(src, alt, title, descr, price) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 32;
            this.changeToGEL();
        }

        changeToGEL() {
            this.price = this.price / this.transfer;
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
                        <div class="menu__item-total"><span>${Math.round(this.price)}</span> лари/день</div>
                    </div>
                </div>
            `;
            container.append(element);
        }
    }

    // getResource('/json/db.json')
    //     .then((data) => {
    //         data.menu.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    // });

    dataBase.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
}

export default cards;