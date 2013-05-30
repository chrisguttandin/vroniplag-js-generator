/*global
   LaTeXContainer
 */
var LaTeXSubtitle = (function ($) {

    'use strict';

    return function (childOrChildren) {

        var laTeXSubtitle = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXSubtitle.toLaTeXBody;

        laTeXSubtitle.toLaTeXBody = function () {
            return '';
        };

        laTeXSubtitle.toLaTeXHeader = function () {
            var laTeXHeader = '';

            // TODO do not use toLaTeXBody
            laTeXHeader += '\\subtitle{';
            laTeXHeader += toLaTeXBody.apply(this);
            laTeXHeader += '}\n';

            return laTeXHeader;
        };

        return Object.freeze(laTeXSubtitle);

    };

}(jQuery));