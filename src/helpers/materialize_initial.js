import jQuery from 'jquery';
import {
    Velocity
} from './velocity.js';



var $ = jQuery,
    Materialize = {},
    Waves = {},
    $$ = document.querySelectorAll.bind(document);




var guidfn = (function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
});
// Unique ID
Materialize.guid = guidfn();
