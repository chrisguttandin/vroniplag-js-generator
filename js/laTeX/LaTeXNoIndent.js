/*global
   LaTeXContainer
 */
var LaTeXNoIndent = (function ($) {

    'use strict';

    return function () {

        var laTeXNoIndent = Object.create(new LaTeXContainer([]));

        laTeXNoIndent.addChild = function () {
            throw 'laTeXNoIndent cannot have any children';
        };

        laTeXNoIndent.toLaTeXBody = function () {
            return '\\noindent ';
        };

        return Object.freeze(laTeXNoIndent);

    };

}(jQuery));