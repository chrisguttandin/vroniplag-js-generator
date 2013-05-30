/*global
   LaTeXContainer
 */
var LaTeXUrl = (function ($) {

    'use strict';

    var urldef = 'a';

    return function (url) {

        var values = {},
            laTeXUrl = Object.create(new LaTeXContainer(), {

                url: {
                    writable: true
                },

                urldef: {
                    get: function() {
                        if (typeof values.urldef === 'undefined') {
                            values.urldef = urldef;
                            urldef += 'a';
                        }
                        return values.urldef;
                    }
                }

            }),
            toLaTeXBody = laTeXUrl.toLaTeXBody;

        laTeXUrl.toLaTeXBody = function () {
            if (this.url.indexOf('%') > -1
                    || this.url.indexOf('#') > -1) {
                return '\\' + this.urldef;
            }
            //return '';
            //return '\\url{www.g.de}';
            return '\\url{' + this.url + '}';
        };

        laTeXUrl.toLaTeXHeader = function () {
            var laTeXHeader = '';
            //return '';

            // convert urls into clickable links
            //laTeXHeader += '\\usepackage[pdftex]{hyperref}\n';
            //laTeXHeader += '\\usepackage{hyperref}\n';
            // allow hyphens in urls (normally hyphens must be escaped in LaTeX)
            //laTeXHeader += '\\usepackage[hyphens]{url}\n';
            //laTeXHeader += '\\usepackage[hyphens]{url}\n';
            laTeXHeader += '\\PassOptionsToPackage{hyphens}{url}\\usepackage{hyperref}\n';
            if (this.url.indexOf('%') > -1
                    || this.url.indexOf('#') > -1) {
                //laTeXHeader += '\\urldef\\' + this.urldef + '\\url{www.g.de}\n';
                laTeXHeader += '\\urldef\\' + this.urldef + '\\url{' + this.url + '}\n';
            }

            return laTeXHeader;
        };

        laTeXUrl.url = url;

        return Object.freeze(laTeXUrl);

    };

}(jQuery));