/*global
    GenericParser,
    LaTeXContainer
 */
var HtmlDlParser = (function () {

    'use strict';

    var htmlDlParser = Object.create({

            parse: function (text, callback) {
                var laTeXContainer = new LaTeXContainer();

                GenericParser.parseClosable('dl', text, function (result) {
                    laTeXContainer.addChild(callback(result));
                }, function (text) {
                    laTeXContainer.addChild(text);
                });

                return (laTeXContainer.children.length > 1) ? laTeXContainer : laTeXContainer.children[0];
            }

        });

    return htmlDlParser;

}());