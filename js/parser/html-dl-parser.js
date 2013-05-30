/*global
    GenericParser,
    LaTeXContainer
 */
var HtmlNoscriptParser = (function () {

    'use strict';

    var htmlNoscriptParser = Object.create({

            parse: function (text, callback) {
                var laTeXContainer = new LaTeXContainer();

                GenericParser.parseClosable('noscript', text, function (result) {
                    laTeXContainer.addChild(callback(result));
                }, function (text) {
                    laTeXContainer.addChild(text);
                });

                return (laTeXContainer.children.length > 1) ? laTeXContainer : laTeXContainer.children[0];
            }

        });

    return htmlNoscriptParser;

}());