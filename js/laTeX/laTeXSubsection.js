/*global
   LaTeXContainer,
   Processor
 */
var LaTeXSubsection = (function ($, p) {

    'use strict';

    return function (childOrChildren) {

        var laTeXSubsection = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXSubsection.toLaTeXBody;

        laTeXSubsection.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\subsection{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return p.addLineBreak(laTeX);
        };

        return Object.freeze(laTeXSubsection);

    };

}(jQuery, Processor));