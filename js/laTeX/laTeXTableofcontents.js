/*global
   LaTeXContainer
 */
var LaTeXTableofcontents = (function () {

    // TODO overwrite addChild or create super class LaTeXCommand ...

    'use strict';

    return function () {

        var values = {},
            laTeXTableofcontents = Object.create(new LaTeXContainer());

        laTeXTableofcontents.toLaTeXBody = function () {
            return '\\tableofcontents\n\\newpage\n';
        };

        return Object.freeze(laTeXTableofcontents);

    };

}());
