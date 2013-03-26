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
var FragmentDocumentBuilder = (function ($) {

    'use strict';

    var Color = net.brehaut.Color;

    return function (options) {

        options = options || {};

        var values = {},
            fragmentDocumentBuilder = Object.create({}, {

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

                fragmentParser: {
                    get: function () {
                        return values.fragmentParser;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('fragmentParser must be an object');
                        }
                        values.fragmentParser = value;
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

                sourceParser: {
                    get: function () {
                        return values.sourceParser;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('sourceParser must be an object');
                        }
                        values.sourceParser = value;
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

        fragmentDocumentBuilder.buildByPrefix = function (prefix) {
            this.vroniPlagAPI.getPageIdsByPrefix(prefix, function (pageIds) {
                var callback,
                    context = {
                        executed: 0,
                        fragments: [],
                        length: pageIds.length
                    },
                    i;

                callback = function (context, content) {
                    var fragment;

                    fragment = this.parseContent(content);
                    if (fragment !== null) {
                        this.vroniPlagAPI.getPageIdByTitle('Quelle:' + fragment.acronym + '/' + fragment.originalSourceName, function (context, pageId) {
                            this.vroniPlagAPI.getPageContent(pageId, function (context, content) {
                                var dataURI,
                                    fileName,
                                    laTeXDocument,
                                    source;

                                source = this.parseSource(content);
                                if (source !== null) {
                                    source.name = fragment.originalSourceName;
                                    fragment.originalSource = source;
                                }

                                context.fragments.push(fragment);
                                context.executed += 1;

                                if (context.executed === context.length) {
                                    console.log('content loaded');
                                    console.log('content parsed');
                                    laTeXDocument = this.createLaTeXDocument(decodeURI(prefix), context.fragments);
                                    console.log('document created');
                                    dataURI = this.getDataURI(laTeXDocument);
                                    fileName = this.generateFileName();
                                    this.dataURIDownloader.download(dataURI, fileName);
                                    console.log('document downloaded');
                                    this.logger.success(dataURI, fileName);
                                }
                            }.bind(this, context));
                        }.bind(this, context));
                    } else {
                        context.executed += 1;
                    }
                }.bind(this, context);

                for (i = 0; i < context.length; i += 1) {
                    this.vroniPlagAPI.getPageContent(pageIds[i], callback);
                }
            }.bind(this));
        };

        fragmentDocumentBuilder.buildByTitle = function (title) {
            this.vroniPlagAPI.getPageIdByTitle(title, function (pageId) {
                this.vroniPlagAPI.getPageContent(pageId, function (content) {
                    var fragment;

                    //console.log(content);
                    console.log('content loaded');
                    fragment = this.parseContent(content);
                    this.vroniPlagAPI.getPageIdByTitle('Quelle:' + fragment.acronym + '/' + fragment.originalSourceName, function (pageId) {
                        this.vroniPlagAPI.getPageContent(pageId, function (content) {
                            var dataURI,
                                fileName,
                                laTeXDocument,
                                source;

                            source = this.parseSource(content);
                            if (source !== null) {
                                source.name = fragment.originalSourceName;
                                fragment.originalSource = source;
                            }

                            //console.log(content);
                            console.log('content parsed');
                            laTeXDocument = this.createLaTeXDocument(decodeURI(title), [fragment]);
                            console.log('document created');
                            dataURI = this.getDataURI(laTeXDocument);
                            fileName = this.generateFileName();
                            this.dataURIDownloader.download(dataURI, fileName);
                            console.log('document downloaded');
                            this.logger.success(dataURI, fileName);
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        };

        fragmentDocumentBuilder.createLaTeXDocument = function (title, fragments) {
            var body,
                doc = new LaTeXDocument(),
                fragment,
                i,
                length = fragments.length,
                originalSource,
                p = Processor, // TODO
                parallelBody,
                parallelHeader;

            doc.utf8 = true;

            doc.documentClass = 'scrartcl';

            doc.addDocumentClassOption('paper', 'a4');
            doc.addDocumentClassOption('final');
            doc.addDocumentClassOption('fontsize', '12pt');

            doc.addChild(p.addLineBreak('\\title{' + title + '}'));
            doc.addChild(p.addLineBreak('\\maketitle'));

            for (i = 0; i < length; i += 1) {
                fragment = fragments[i];
                if (typeof fragment.originalSource === 'undefined') {
                    originalSource = fragment.originalSourceName;
                } else {
                    originalSource = fragment.originalSourceName + ' \\cite{' + fragment.originalSourceName.replace(/\s/g, '').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss') + '}';
                    doc.addSource(fragment.originalSource);
                }

                parallelHeader = new LaTeXParallel({
                    leftColumn: '\\noindent \\textbf{Untersuchte Arbeit: \\newline Seite: ' + fragment.plagiarismPage + ', Zeilen: ' + fragment.plagiarismColumns + '}',
                    rightColumn: '\\noindent \\textbf{Quelle: ' + originalSource + '\\newline Seite: ' + fragment.originalPage + ', Zeilen: ' + fragment.originalColumns + '}'
                });

                doc.addChild(parallelHeader);

                doc.addChild(p.addLineBreak('~\\newline'));

                body = marcusb_fragcolors_modified($('<div>' + fragment.original + '</div>'), $('<div>' + fragment.plagiarism + '</div>'));

                parallelBody = new LaTeXParallel({
                    leftColumn: '\\noindent ' + p.process(body.plagiarism, [
                        p.removeLineBreaks,
                        p.removeMultipleWhiteSpaces,
                        p.removeWhiteSpacesInbetweenTags
                    ]),
                    rightColumn: '\\noindent ' + p.process(body.original, [
                        p.removeLineBreaks,
                        p.removeMultipleWhiteSpaces,
                        p.removeWhiteSpacesInbetweenTags
                    ])
                });

                parallelBody.parse([
                    [HtmlSpanParser, this.htmlSpanParserCallback],
                    [LineBreakParser, this.lineBreakParserCallback]
                ]);

                doc.addChild(parallelBody);

                doc.addChild(p.addLineBreak('~\\newline'));

                doc.addChild(p.addLineBreak('\\noindent \\textbf{Anmerkungen:} ' + fragment.notes));

                doc.addChild(p.addLineBreak('~\\newline'));
            }

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
                p.removeHtmlTags
            ]);

            return doc;
        };

        fragmentDocumentBuilder.generateFileName = function () {
            return 'fragment-' + new Date().getTime() + '.tex';
        };

        fragmentDocumentBuilder.getDataURI = function (laTeXDocument) {
            return 'data:application/latex;base64,' + Base64.encode(laTeXDocument.toLaTeX());
        };

        fragmentDocumentBuilder.htmlSpanParserCallback = function (result) {
            var color,
                colorAsHSL,
                colorName,
                colorResult,
                $span = $(result[1]);
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

        fragmentDocumentBuilder.lineBreakParserCallback = function (result) {
            return '\\newline';
        };

        fragmentDocumentBuilder.parseContent = function (content) {
            if (this.fragmentParser.isFragment(content)) {
                return this.fragmentParser.parse(content);
            }
            return null;
        };

        fragmentDocumentBuilder.parseSource = function (content) {
            if (this.sourceParser.isSource(content)) {
                return this.sourceParser.parse(content);
            }
            return null;
        };

        if (typeof options.dataURIDownloader !== 'undefined') {
            fragmentDocumentBuilder.dataURIDownloader = options.dataURIDownloader;
        }

        if (typeof options.fragmentParser !== 'undefined') {
            fragmentDocumentBuilder.fragmentParser = options.fragmentParser;
        }

        if (typeof options.logger !== 'undefined') {
            fragmentDocumentBuilder.logger = options.logger;
        }

        if (typeof options.sourceParser !== 'undefined') {
            fragmentDocumentBuilder.sourceParser = options.sourceParser;
        }

        if (typeof options.vroniPlagAPI !== 'undefined') {
            fragmentDocumentBuilder.vroniPlagAPI = options.vroniPlagAPI;
        }

        return Object.freeze(fragmentDocumentBuilder);

    };

}(jQuery));
