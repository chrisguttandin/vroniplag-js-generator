/*global
   LaTeXContainer,
   Processor
 */
var LaTeXVerticalSpace = (function ($, p) {

    'use strict';

    return function (childOrChildren) {

        var laTeXVerticalSpace = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXVerticalSpace.toLaTeXBody;

        laTeXVerticalSpace.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\vspace{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return p.addLineBreak(laTeX);
        };

        return Object.freeze(laTeXVerticalSpace);

    };

}(jQuery, Processor));