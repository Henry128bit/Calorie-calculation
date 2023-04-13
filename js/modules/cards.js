import {getResource} from '../services/services';

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

    getResource('../db.json')
        .then((data) => {
            data.menu.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;