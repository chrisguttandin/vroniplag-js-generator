/*global
   LaTeXContainer
 */
var LaTeXParagraph = (function ($) {

    'use strict';

    return function (childOrChildren) {

        var laTeXParagraph = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXParagraph.toLaTeXBody;

        laTeXParagraph.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\paragraph{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return laTeX;
        };

        return Object.freeze(laTeXParagraph);

    };

}(jQuery));