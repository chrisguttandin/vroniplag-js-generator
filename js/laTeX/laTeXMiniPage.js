/*global
   LaTeXContainer
 */
var LaTeXMiniPage = (function () {

    'use strict';

    return function (childOrChildren, width) {

        var laTeXMiniPage = Object.create(new LaTeXContainer(childOrChildren)),
            toLaTeXBody = laTeXMiniPage.toLaTeXBody;

        laTeXMiniPage.toLaTeXBody = function () {
            var l = [];

            // TOOD adjusment (t) sollte einstellbar sein
            l.push('\\begin{minipage}[t]{' + width + '}');
            l.push(toLaTeXBody.apply(this));
            l.push('\\end{minipage}');

            return l.join('\n') + '\n';
        };

        return laTeXMiniPage;

    };

}());