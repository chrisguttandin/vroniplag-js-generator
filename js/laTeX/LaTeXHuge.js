/*global
   LaTeXContainer
 */
var LaTeXHuge = (function ($) {

    'use strict';

    return function () {

        var laTeXHuge = Object.create(new LaTeXContainer([]));

        laTeXHuge.addChild = function () {
            throw 'laTeXHuge cannot have any children';
        };

        laTeXHuge.toLaTeXBody = function () {
            return '\\huge ';
        };

        return Object.freeze(laTeXHuge);

    };

}(jQuery));