window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          modal = require('./modules/modal'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          slides = require('./modules/slides'),
          calc = require('./modules/calc');
    
    tabs();
    timer();
    modal();
    cards();
    forms();
    slides();
    calc();
});