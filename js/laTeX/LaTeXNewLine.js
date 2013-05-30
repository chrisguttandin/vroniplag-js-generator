/*global
   LaTeXContainer,
   Processor
 */
var LaTeXNewLine = (function ($, p) {

    'use strict';

    return function () {

        var laTeXNewLine = Object.create(new LaTeXContainer([]));

        laTeXNewLine.addChild = function () {
            throw 'laTeXNewLine cannot have any children';
        };

        laTeXNewLine.toLaTeXBody = function () {
            return p.addLineBreak('~\\newline');
        };

        return Object.freeze(laTeXNewLine);

    };

}(jQuery, Processor));