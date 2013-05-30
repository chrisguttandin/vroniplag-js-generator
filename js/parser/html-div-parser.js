/*global
    GenericParser,
    LaTeXContainer
 */
var HtmlDivParser = (function () {

    'use strict';

    var htmlDivParser = Object.create({

            parse: function (text, callback) {
                var laTeXContainer = new LaTeXContainer();

                GenericParser.parseClosable('div', text, function (result) {
                    laTeXContainer.addChild(callback(result));
                }, function (text) {
                    laTeXContainer.addChild(text);
                });

                return (laTeXContainer.children.length > 1) ? laTeXContainer : laTeXContainer.children[0];
            }

        });

    return htmlDivParser;

}());