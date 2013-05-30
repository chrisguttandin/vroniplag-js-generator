/*global
   LaTeXContainer,
   Processor
 */
var LaTeXTabular = (function ($, p) { // TODO rename super tabular

    'use strict';

    return function (options) {

        options = $.extend({}, options);

        var values = {
                format: []
            },
            laTexTabular = Object.create(new LaTeXContainer(), {

                caption: {
                    get: function () {
                        return values.caption;
                    },
                    set: function (value) {
                        if (typeof value !== 'boolean') {
                            throw new TypeError('caption must be a boolean');
                        }
                        values.caption = value;
                    }
                },

                format: {
                    get: function () {
                        return values.format;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('format must be an object');
                        }
                        values.format = value;
                    }
                }

            });

        laTexTabular.toLaTeXBody = function () {
            var child,
                children = this.children.slice(),
                columnIndex,
                laTeX = '',
                length = this.format.length,
                row;

            if (children.length === 0) {
                console.log('empty');
                return laTeX;
            }

            /* console.log(this.format);
            if (this.caption) {
                console.log(children.length - 1 + ' % ' + length);
                console.log((children.length - 1) % length);
            } else {
                console.log(children.length + ' % ' + length);
                console.log(children.length % length);
            }
            return '';  */

            laTeX += p.addLineBreak('~\\newline');

            // tablecaption
            if (typeof this.caption !== 'undefined') {
                child = children.shift();
                if (typeof child === 'string') {
                    laTeX += p.addLineBreak('\\tablecaption{' + child + '}');
                } else {
                    laTeX += p.addLineBreak('\\tablecaption{' + child.toLaTeXBody() + '}');
                }
            }

            // tablehaid
            if (children.length > length) {
                laTeX += p.addLineBreak('\\tablehead{ \\hline');
                row = [];
                for (columnIndex = 0; columnIndex < length; columnIndex += 1) {
                    child = children.shift();
                    if (typeof child === 'string') {
                        row.push(child);
                    } else {
                        row.push(child.toLaTeXBody());
                    }
                }
                laTeX += p.addLineBreak(row.join(' & ') + ' \\\\ \\hline }');


                laTeX += p.addLineBreak('\\tabletail{ \\hline');
                row = [];
                for (columnIndex = 0; columnIndex < length; columnIndex += 1) {
                    child = children.pop();
                    if (typeof child === 'string') {
                        row.unshift(child);
                    } else {
                        row.unshift(child.toLaTeXBody());
                    }
                }
                laTeX += p.addLineBreak(row.join(' & ') + ' \\\\ \\hline }');
            }

            // tablebody
            laTeX += p.addLineBreak('\\begin{supertabular}{| ' + this.format.join(' | ') + ' |}');
            laTeX += p.addLineBreak('\\hline');

            while (children.length > 0) {
                row = [];
                for (columnIndex = 0; columnIndex < length; columnIndex += 1) {
                    child = children.shift();
                    if (typeof child === 'string') {
                        row.push(child);
                    } else {
                        row.push(child.toLaTeXBody());
                    }
                }
                laTeX += p.addLineBreak(row.join(' & ') + ' \\\\ \\hline');
            }

            laTeX += p.addLineBreak('\\end{supertabular}');

            return laTeX;
        };

        return Object.freeze(laTexTabular);

    };

}(jQuery, Processor));