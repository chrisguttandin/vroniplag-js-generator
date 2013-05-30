/*global
    Base64,
    HtmlSpanParser,
    LaTeXColorText,
    LaTeXDocument,
    LaTeXParallel,
    LineBreakParser,
    marcusb_fragcolors_modified,
    net,
    Processor
 */
var ReportBuilder = (function ($) {

    'use strict';

    var Color = net.brehaut.Color;

    return function (options) {

        options = options || {};

        var values = {},
            reportBuilder = Object.create({}, {

                dataURIDownloader: {
                    get: function () {
                        return values.dataURIDownloader;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('dataURIDownloader must be an object');
                        }
                        values.dataURIDownloader = value;
                    }
                },

                logger: {
                    get: function () {
                        return values.logger;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('logger must be an object');
                        }
                        values.logger = value;
                    }
                },

                vroniPlagAPI: {
                    get: function () {
                        return values.vroniPlagAPI;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('vroniPlagAPI must be an object');
                        }
                        values.vroniPlagAPI = value;
                    }
                }

            });

        reportBuilder.buildByTitle = function (title) {
            this.vroniPlagAPI.getPageHtmlByTitle(title, function (html) {
                var dataURI,
                    doc = new LaTeXDocument(),
                    fileName,
                    p = Processor, // TODO
                    $content = $(html).find('#mw-content-text').children();
                doc.utf8 = true;

                $content.find('dl').each(function() {
                    var cnt = $(this).contents();
                    $(this).replaceWith(cnt);
                });

                $content.find('dd').each(function() {
                    var cnt = $(this).contents();
                    $(this).replaceWith(cnt);
                });

                $content.find('dt').each(function() {
                    var cnt = $(this).contents();
                    $(this).replaceWith(cnt);
                });

                doc.documentClass = 'scrartcl';

                doc.addDocumentClassOption('paper', 'a4');
                doc.addDocumentClassOption('final');
                doc.addDocumentClassOption('fontsize', '12pt');

                $content.find('span.editsection').remove();

                // TODO create a Object LaTeXTitle
                if ($content.eq(0).find('tr').length > 0) { // http://de.vroniplag.wikia.com/wiki/Benutzer:WiseWoman/Berichte/Dd
                    doc.addChild(new LaTeXTitle($content.eq(0).find('tr').eq(0).html()));
                    var sub = new LaTeXSubtitle($content.eq(0).find('tr').eq(1).html());
                    sub.parse([
                        [HtmlParagraphParser, function (result) {
                            return result[2];
                        }]
                    ]);
                    doc.addChild(sub);
                    $content.eq(0).remove();
                } else if ($content.eq(0)[0].tagName === 'H2') {
                    doc.addChild(new LaTeXTitle($content.eq(0).text()));
                    doc.addChild(new LaTeXSubtitle($content.eq(1).text()));
                    $content = $content.slice(2);
                } else {
                    console.log('unhandled headline');
                }

                doc.addChild(new LaTeXSetcounter({
                    secnumdepth: 0
                }));

                doc.addChild(new LaTeXTableofcontents());

                $content.each(function () {
                    if ($(this).hasClass('infobox') // remove navigation elements (headline, infobox, toc)
                            || $(this).hasClass('toc')) {
                        return;
                    }
                    if (this.tagName === 'BR' // ignore line breaks
                            || this.tagName === 'NOSCRIPT') { // ignore noscript tags)
                        return;
                    }

                    if (this.tagName === 'H2') {
                        doc.addChild(new LaTeXSection($.trim($(this).text())));
                    } else if (this.tagName === 'H3') {
                        doc.addChild(new LaTeXSubsection($.trim($(this).text())));
                    } else if (this.tagName === 'A'
                            || this.tagName === 'B'
                            || this.tagName === 'DIV'
                            || this.tagName === 'DL'
                            || this.tagName === 'P'
                            || this.tagName === 'TABLE'
                            || this.tagName === 'UL') {
                        if ($.trim($(this).text()).length !== 0) { // avoid empty paragraphs
                            //console.log(this.outerHTML);
                            doc.addChild(this.outerHTML);
                        }
                    } else {
                        console.log('unhandled tag: ' + this.tagName);
                        //console.log(this.outerHTML);
                    }
                });

                // Reihenfolge der Parse ergibt sich aus den HTML Regeln
                // <a><ul>...</ul></a> ist nicht erlaubt und kommt hoffentlich nicht vor
                doc.parse([
                    [HtmlNoscriptParser, function (result) {
                        return new LaTeXContainer();
                    }],
                    [HtmlDlParser, function (result) {
                        if (!!$.trim(result[2]).match(/^</)) {
                            return new LaTeXContainer(result[2]);
                        } else {
                            return new LaTeXParagraph(result[2]);
                        }
                    }],
                    [HtmlDivParser, function (result) {
                        var body,
                            $fragment = $(result[0]),
                            laTeXContainer = new LaTeXContainer(),
                            laTeXParallel,
                            laTeXParallelBody,
                            $table;

                        if ($fragment.children('div').eq(0).hasClass('fragment')) {

                            laTeXContainer.addChild(new LaTeXNewLine());
                            laTeXContainer.addChild(new LaTeXVerticalSpace('2mm'));
                            laTeXContainer.addChild(new LaTeXVerticalBox([
                                new LaTeXLarge(),
                                new LaTeXNoIndent(),
                                $fragment.find('table td').eq(0).html()
                            ]));

                            laTeXContainer.addChild($fragment.find('.fragment table th').eq(0).html());

                            $table = $fragment.find('.fragment table').eq(1);
                            laTeXParallel = new LaTeXParallel({
                                leftColumn: new LaTeXContainer([
                                    new LaTeXNoIndent(),
                                    new LaTeXBoldFont($table.find('th').eq(0).html())
                                ]),
                                rightColumn: new LaTeXContainer([
                                    new LaTeXNoIndent(),
                                    new LaTeXBoldFont($table.find('th').eq(1).html())
                                ])
                            });

                            laTeXParallel.parse([
                                [HtmlBreakParser, function (result) {
                                    return new LaTeXNewLine();
                                }]
                            ]);

                            laTeXContainer.addChild(laTeXParallel);
                            laTeXContainer.addChild(new LaTeXNewLine());
                            
                            body = marcusb_fragcolors_modified(
                                $('<div>' + $table.find('td').eq(1).html() + '</div>'),
                                $('<div>' + $table.find('td').eq(0).html() + '</div>')
                            );

                            laTeXParallelBody = new LaTeXParallel({
                                leftColumn: new LaTeXContainer([
                                    new LaTeXNoIndent(),
                                    p.process(body.plagiarism, [
                                        p.removeLineBreaks,
                                        p.removeMultipleWhiteSpaces,
                                        p.removeWhiteSpacesInbetweenTags
                                    ])
                                ]),
                                rightColumn: new LaTeXContainer([
                                    new LaTeXNoIndent(),
                                    p.process(body.original, [
                                        p.removeLineBreaks,
                                        p.removeMultipleWhiteSpaces,
                                        p.removeWhiteSpacesInbetweenTags
                                    ])
                                ])
                            });

                            laTeXParallelBody.parse([
                                [HtmlSpanParser, reportBuilder.htmlSpanParserCallback],
                                [LineBreakParser, function (result) {
                                    return new LaTeXNewLine();
                                }]
                            ]); 

                            laTeXContainer.addChild(laTeXParallelBody);
                            laTeXContainer.addChild(new LaTeXNewLine());

                            laTeXContainer.addChild(new LaTeXContainer([
                                new LaTeXNoIndent(),
                                $fragment.find('.fragment table').eq(2).html()
                            ]));

                            laTeXContainer.addChild(new LaTeXNewLine());

                            return laTeXContainer;
                        }

                        laTeXContainer.addChild(result[0]);
                        return laTeXContainer;
                    }],
                    [HtmlParagraphParser, function (result) {
                        return new LaTeXParagraph(result[2]);
                    }],
                    [HtmlUnsortedListParser, function (result) {
                        // unsupported right now
                    }],
                    [HtmlTableParser, function (result) {
                        // unsupported right now
                    }],
                    [HtmlFigureParser, function (result) {
                        var caption = result[2].match(/<figcaption[^>]*>(.*?)<div/),
                            src = result[2].match(/data\-src="(.*?)"/)

                        if (caption) {
                            caption = caption[1];
                        }
                        if (src !== null) {
                            src = src[1];
                        } else {
                            src = result[2].match(/src="(.*?)"/)[1];
                        }
                        return new LaTeXFigure(src, caption);
                    }],
                    /*[HtmlImgParser, function (result) {
                        var caption = result[1].match(/alt="(.*?)"/),
                            src = result[1].match(/data\-src="(.*?)"/)[1];

                        if (caption) {
                            caption = caption[1];
                        }
                        return new LaTeXFigure(src, caption);
                    }],*/
                    [HtmlAnchorParser, function (result) {
                        var href = result[1].match(/href=('|")(.*?)('|")/gi)[0].slice(6, -1),
                            text = result[2];

                        // reltative links müssen in absolute gewandelt werden
                        if (href[0] === '/') {
                            href = 'http://de.vroniplag.wikia.com' + href;
                        }

                        // wenn die URL auch die als Darstellung benutzt wird,
                        // dann braucht keine Fußnote erzeugt zu werden
                        if (href === text) {
                            return new LaTeXUrl(href);
                        }
                        // unterscheidet sich der Text jedoch von der URL, wird eine Fußnote erzeugt
                        return new LaTeXContainer([
                            text,
                            new LaTeXFootnote(
                                new LaTeXUrl(href)
                            )
                        ]);
                    }]
                    /*[HtmlBreakParser, function (result) {
                        return new LaTeXNewLine();
                    }] */
                ]);

                doc.process([
                    p.escapeLaTexCharacters,
                    p.convertWikiaSyntax,
                    p.convertBrackets,
                    p.convertDots,
                    p.convertHtmlDashes,
                    p.convertHtmlEntities,
                    p.convertHtmlTags,
                    p.convertHtmlQuotes,
                    p.convertQuotes,
                    p.convertUnderscores,
                    p.removeHtmlTags,
                    p.removeLineBreaks,
                    p.removeSpecialCharacters
                ]);

                window.setTimeout(function () {
                    dataURI = this.getDataURI(doc);
                    fileName = this.generateFileName();
                    this.dataURIDownloader.download(dataURI, fileName);
                    this.logger.success(dataURI, fileName);
                }.bind(this), 10000);

            }.bind(this));
        };

        // TODO same function in FragmentDocumentBuilder
        reportBuilder.generateFileName = function () {
            return 'fragment-' + new Date().getTime() + '.tex';
        };

        // TODO same function in FragmentDocumentBuilder
        reportBuilder.getDataURI = function (laTeXDocument) {
            return 'data:application/latex;base64,' + Base64.encode(laTeXDocument.toLaTeX());
        };

        reportBuilder.htmlSpanParserCallback = function (result) {
            var color,
                colorAsHSL,
                colorName,
                colorResult,
                $span = $(result[1]);



            if (result[2].match(/\*/)) {

                                console.log(' todo somewhere * gets parsed');
                                console.log(result[2]);
                                console.log('');
                                result[2] = '_*';
                            }

            $span.css('display', 'none').appendTo('body');
            color = $span.css('background-Color');
            if (color === 'transparent') { // return if Color is transparent
                return result[2];
            }
            if (/^rgb\([0-9]+, [0-9]+, [0-9]+\)/.test(color)) {
                colorResult = /^rgb\(([0-9]+), ([0-9]+), ([0-9]+)\)/.exec(color);
                color = colorResult.slice(1);
            }
            if (/^rgba\([0-9]+, [0-9]+, [0-9]+, [0-9]+\)/.test(color)) {
                colorResult = /^rgba\(([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)\)/.exec(color);
                // return if opacity is 100%
                if (parseInt(colorResult[4], 10) === 0) {
                    return result[2];
                }
                color = colorResult.slice(1, -1);
            }
            // use Color.js to modify colors
            color = new Color("rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
            color = color.setSaturation(1);
            color = color.lightenByRatio(-0.5);
            color = [
                Math.round(color.getRed() * 255),
                Math.round(color.getGreen() * 255),
                Math.round(color.getBlue() * 255)
            ];
            colorName = $span.attr('class');
            $span.remove();
            return new LaTeXColorText({
                color: color,
                colorName: colorName,
                child: result[2]
            });
        };

        if (typeof options.dataURIDownloader !== 'undefined') {
            reportBuilder.dataURIDownloader = options.dataURIDownloader;
        }

        if (typeof options.logger !== 'undefined') {
            reportBuilder.logger = options.logger;
        }

        if (typeof options.vroniPlagAPI !== 'undefined') {
            reportBuilder.vroniPlagAPI = options.vroniPlagAPI;
        }

        return Object.freeze(reportBuilder);

    };

}(jQuery));
