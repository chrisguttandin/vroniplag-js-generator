/*global
   LaTeXContainer,
   Processor
 */
var LaTeXParagraph = (function ($, p) {

    'use strict';

    return function (childOrChildren) {

        var laTeXParagraph = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXParagraph.toLaTeXBody;

        laTeXParagraph.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\paragraph{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return p.addLineBreak(laTeX);
        };

        return Object.freeze(laTeXParagraph);

    };

}(jQuery, Processor));