/*global
   LaTeXContainer,
   Processor
 */
var LaTeXVerticalBox = (function ($, p) {

    'use strict';

    return function (childOrChildren) {

        var laTeXVerticalBox = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXVerticalBox.toLaTeXBody;

        laTeXVerticalBox.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\vbox{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return p.addLineBreak(laTeX);
        };

        return Object.freeze(laTeXVerticalBox);

    };

}(jQuery, Processor));