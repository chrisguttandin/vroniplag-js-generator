/*global
   LaTeXContainer
 */
var LaTeXLarge = (function ($) {

    'use strict';

    return function () {

        var laTeXLarge = Object.create(new LaTeXContainer([]));

        laTeXLarge.addChild = function () {
            throw 'laTeXLarge cannot have any children';
        };

        laTeXLarge.toLaTeXBody = function () {
            return '\\large ';
        };

        return Object.freeze(laTeXLarge);

    };

}(jQuery));