/*global
   LaTeXContainer
 */
var LaTeXItem = (function ($) {

    'use strict';

    return function (childOrChildren) {

        var laTeXItem = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXItem.toLaTeXBody;

        laTeXItem.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\item{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return laTeX;
        };

        return Object.freeze(laTeXItem);

    };

}(jQuery));