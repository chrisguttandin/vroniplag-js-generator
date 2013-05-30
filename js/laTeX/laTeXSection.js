/*global
   LaTeXContainer,
   Processor
 */
var LaTeXSection = (function ($, p) {

    'use strict';

    return function (childOrChildren) {

        var laTeXSection = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXSection.toLaTeXBody;

        laTeXSection.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\section{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return p.addLineBreak(laTeX);
        };

        return Object.freeze(laTeXSection);

    };

}(jQuery, Processor));