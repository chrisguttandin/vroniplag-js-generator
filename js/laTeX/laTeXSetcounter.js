/*global
   LaTeXContainer,
   Processor
 */
var LaTeXSetcounter = (function ($, p) {

    // TODO overwrite addChild or create super class LaTeXCommand ...

    'use strict';

    return function (options) {

        options = $.extend({}, options);

        var values = {},
            laTeXSetcounter = Object.create(new LaTeXContainer(), {

                secnumdepth: {
                    get: function () {
                        return values.secnumdepth;
                    },
                    set: function (value) {
                        if (typeof value !== 'number') {
                            throw new TypeError('secnumdepth must be a number');
                        }
                        values.secnumdepth = value;
                    }
                }

            });

        laTeXSetcounter.toLaTeXBody = function () {
            return p.addLineBreak('\\setcounter{secnumdepth}{' + this.secnumdepth + '}');
        };

        if (typeof options.secnumdepth !== 'undefined') {
            laTeXSetcounter.secnumdepth = options.secnumdepth;
        }

        return Object.freeze(laTeXSetcounter);

    };

}(jQuery, Processor));
