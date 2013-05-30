/*global
   LaTeXContainer
 */
var LaTeXTitle = (function ($) {

    'use strict';

    return function (childOrChildren) {

        var laTeXTitle = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXTitle.toLaTeXBody;

        laTeXTitle.toLaTeXBody = function () {
            var laTeX = '';

            laTeX += '\\maketitle\n';
            laTeX += '\\newpage\n';

            return laTeX;
        };

        laTeXTitle.toLaTeXHeader = function () {
            var laTeXHeader = '';

            // TODO do not use toLaTeXBody
            laTeXHeader += '\\title{';
            laTeXHeader += toLaTeXBody.apply(this);
            laTeXHeader += '}\n';

            return laTeXHeader;
        };

        return Object.freeze(laTeXTitle);

    };

}(jQuery));