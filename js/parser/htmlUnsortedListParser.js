/*global
    LaTeXContainer
 */
var HtmlUnsortedListParser = (function ($) {

    'use strict';

    var mapCallback = function () {
            if ($(this).children('ul').length > 0) {
                return new LaTeXContainer([
                    new LaTeXItem($(this).clone().children('ul').remove().end().html()),
                    new LaTeXItemize($(this).children('ul').children('li').map(mapCallback).get())
                ]);
            } else {
                return new LaTeXItem($(this).html());
            }
        },
        htmlUnsortedListParser = Object.create({

            parse: function (text, callback) {
                // TODO use callback as in other parsers
                // TODO was passiert bei mehr als einem geschachtelten UL tag?
                
                var $text,
                    container = new LaTeXContainer(),
                    containsUL,
                    containsULTopLevelUL = false;

                try {
                    $text = $(text);
                } catch (e) { // jQuery parse error
                    return text;
                }

                containsUL = $text.find('ul').length > 0;

                // check ob ein UL element in der obersten Ebene ist, die von find() ignoriert wird
                $text.each(function () {
                    if (this.tagName === 'UL') {
                        containsULTopLevelUL = true;
                    }
                });

                if (!containsULTopLevelUL && !containsUL) {
                    return text;
                }

                if (containsULTopLevelUL) {
                    $text.each(function () {
                        if (this.tagName === 'UL') {
                            container.addChild(new LaTeXItemize($(this).children('li').map(mapCallback).get()));
                        } else {
                            container.addChild($(this).html());
                        }
                    });
                }
                return container;
            }

        });

    return Object.freeze(htmlUnsortedListParser);

}(jQuery));