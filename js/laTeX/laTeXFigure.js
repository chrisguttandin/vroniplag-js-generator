/*global
   LaTeXContainer,
   Processor
 */
var LaTeXFigure = (function ($, p) {

    var i = 0;

    'use strict';

    return function (src, caption) {

        var laTeXFigure = Object.create(new LaTeXContainer()),
            request,
            response;

        // can be replaced with this https://gist.github.com/jonleighton/958841 for better performance
        function toBase64 (buffer) {
            var binary = ''
            var bytes = new Uint8Array( buffer );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] )
            }
            return window.btoa( binary );
        }

        laTeXFigure.toLaTeXBody = function () {
            var l = [],
                file = src.slice(src.lastIndexOf('/') + 1);

            l.push('\\begin{figure}[H]');
            l.push('\\includegraphics[width=\\textwidth]{' + file + '}');
            l.push('\\caption[' + caption + ']');
            l.push('\\newline');
            l.push('\\centerline{' + caption + '}');
            l.push('\\end{figure}');

            return l.join('\n') + '\n';
        };

        laTeXFigure.toLaTeXHeader = function () {
            var l = [],
                file = src.slice(src.lastIndexOf('/') + 1);

            l.push('\\usepackage{float}');
            l.push('\\usepackage{graphicx}');
            l.push('\\begin{filecontents}{' + file.slice(0, -4) + '.txt}');
            l.push(toBase64(response));
            l.push('\\end{filecontents}');
            l.push('\\immediate\\write18{tail -n+5 ' + file.slice(0, -4) + '.txt | base64 -D -o ' + file + '}');

            return l.join('\n') + '\n';
        };

        request = new XMLHttpRequest();
        request.open("GET", 'http://dev.access-allowing-adapter.com/?url=' + encodeURIComponent(src));
        request.responseType = "arraybuffer";
        request.onload = function (e) {
            response = request.response;
        }
        request.send();

        return Object.freeze(laTeXFigure);

    };

}(jQuery, Processor));