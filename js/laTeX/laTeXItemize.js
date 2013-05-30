/*global
   LaTeXContainer,
   Processor
 */
var LaTeXItemize = (function ($, p) {

    'use strict';

    return function (childOrChildren) {

        var laTeXItemize = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXItemize.toLaTeXBody;

        laTeXItemize.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\begin{itemize}';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '\\end{itemize}';

            return p.addLineBreak(laTeX);
        };

        return Object.freeze(laTeXItemize);

    };

}(jQuery, Processor));