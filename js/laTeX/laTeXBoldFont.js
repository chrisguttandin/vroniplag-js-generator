/*global
   LaTeXContainer
 */
var LaTeXBoldFont = (function ($) {

    'use strict';

    return function (childOrChildren) {

        var laTeXBoldFont = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXBoldFont.toLaTeXBody;

        laTeXBoldFont.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\textbf{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return laTeX;
        };

        return Object.freeze(laTeXBoldFont);

    };

}(jQuery));