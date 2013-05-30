/*global
   LaTeXContainer
 */
var LaTeXFootnote = (function ($) {

    'use strict';

    return function (childOrChildren) {

        var laTeXFootnote = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXFootnote.toLaTeXBody,
            toLaTeXHeader = laTeXFootnote.toLaTeXHeader;

        laTeXFootnote.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\footnote{';
            laTeX += toLaTeXBody.apply(this);
            laTeX += '}';

            return laTeX;
        };

        laTeXFootnote.toLaTeXHeader = function () {
            var l = toLaTeXHeader.apply(this);
            return l + '\n\\usepackage[stable]{footmisc}\n';
        };

        return Object.freeze(laTeXFootnote);

    };

}(jQuery));