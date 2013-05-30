/*global
    LaTeXContainer
 */
var HtmlFigureParser = (function ($) {

    'use strict';

    var htmlFigureParser = Object.create({

            parse: function (text, callback) {
                var lastIndex = 0,
                    laTeXContainer = new LaTeXContainer(),
                    regex = /(<figure[^>]*>)(.*?)<\/figure>/gi,
                    result = regex.exec(text);

                while (result) {
                    if (result.index > lastIndex) {
                        laTeXContainer.addChild(text.slice(lastIndex, result.index));
                    }
                    laTeXContainer.addChild(callback(result));
                    lastIndex = regex.lastIndex;
                    result = regex.exec(text);
                }
                laTeXContainer.addChild(text.slice(lastIndex));

                return (laTeXContainer.children.length > 1) ? laTeXContainer : laTeXContainer.children[0];
            }

        });

    return Object.freeze(htmlFigureParser);

}(jQuery));