/*global
    LaTeXContainer
 */
var HtmlTableParser = (function ($) {

    'use strict';

    var htmlTableParser = Object.create({

            parse: function (text, callback) {
                // TODO use callback as in other parsers
                
                var $text,
                    container = new LaTeXContainer(),
                    containsTable,
                    containsTopLevelTable = false;

                try {
                    $text = $(text);
                } catch (e) { // jQuery parse error
                    return text;
                }

                // TODO SUPER SPECIAL CASE

                if ($text.find('figure').length > 0) {
                    container.addChild(new LaTeXNewLine());
                    $text.find('figure').each(function () {
                        container.addChild(new LaTeXMiniPage(this.outerHTML, (Math.round((1 / $text.find('figure').length) * 100) / 100) + '\\textwidth'));
                    });
                    return container;
                }

                containsTable = $text.find('table').length > 0;

                // check ob ein TABLE element in der obersten Ebene ist, die von find() ignoriert wird
                $text.each(function () {
                    if (this.tagName === 'TABLE') {
                        containsTopLevelTable = true;
                    }
                });

                if (!containsTopLevelTable && !containsTable) {
                    return text;
                }

                if (containsTopLevelTable) {
                    $text.each(function () {
                        if (this.tagName === 'TABLE') { // DL
                            var table = new LaTeXTabular();
                            if ($(this).find('caption').length > 0) {
                                table.caption = true;
                                table.addChild($(this).find('caption').html());
                            }
                            table.format = $(this).find('tr').eq(0).find('td, th').map(function () {
                                var textAlign = $(this).css('text-align');

                                table.addChild($(this).html());

                                if (textAlign === 'center') {
                                    return 'c';
                                }
                                if (textAlign === 'right') {
                                    return 'r';
                                }
                                return 'l'; // default
                            }).get();
                            $(this).find('tr').not(':eq(0)').find('td, th').each(function () {
                                table.addChild($(this).html());
                            });
                            container.addChild(table);
                        } else {
                            container.addChild($(this).html());
                        }
                    });
                }
                return container;
            }

        });

    return Object.freeze(htmlTableParser);

}(jQuery));