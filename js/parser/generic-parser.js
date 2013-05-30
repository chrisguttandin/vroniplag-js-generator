
var GenericParser = (function () {

    'use strict';

    var genericParser = Object.create({

            /**
             * Parse the text for <tag>...</tag> occurrences.
             * Nested tags of the same type are ignored.
             * @param  {String} text    The text to be parsed.
             * @param  {Function} hit   The callback called on a hit.
             * @param  {Function} miss  The callback called on a miss.
             * @return {Array|String}   The parsed result as Array (if more than one) or as String.
             */
            parseClosable: function (tag, text, hit, miss) {
                var closingTagRegex = '<\/' + tag.toLowerCase() + '>',
                    i,
                    nestedResultForClosingTags,
                    nestedRegexForClosingTags,
                    nestedResultForOpeningTags,
                    nestedRegexForOpeningTags,
                    nestedTags,
                    openingTagRegex = '<' + tag.toLowerCase() + '[^>]*>',
                    /**
                     * This variable will hold various RegExp objects during execution.
                     */
                    regex,
                    /**
                     * This variable will hold various RegExp results during execution.
                     */
                    result;

                regex = new RegExp('(' + openingTagRegex + ')((.|\n|\r)*?)' + closingTagRegex, 'gi');
                result = regex.exec(text);

                nestedRegexForClosingTags = new RegExp(closingTagRegex, 'gi');
                nestedRegexForOpeningTags = new RegExp(openingTagRegex, 'gi');

                while (result) {
                    nestedResultForOpeningTags = result[2].match(nestedRegexForOpeningTags);
                    while (nestedResultForOpeningTags) {

                        nestedTags = [];
                        for (i = 0; i < nestedResultForOpeningTags.length; i += 1) {
                            nestedTags[i] = closingTagRegex;
                        }
                        regex = new RegExp('(' + openingTagRegex + ')((.|\n|\r)*?' + nestedTags.join('(.|\n|\r)*?') + '(.|\n|\r)*?)' + closingTagRegex, 'gi');
                        result = regex.exec(text);

                        nestedResultForOpeningTags = result[2].match(nestedRegexForOpeningTags);
                        nestedResultForClosingTags = result[2].match(nestedRegexForClosingTags);
                        if (nestedResultForOpeningTags.length <= nestedResultForClosingTags.length) {
                            break;
                        }
                    }

                    if (result.index > 0) {
                        miss(text.slice(0, result.index));
                    }
                    hit(result);

                    text = text.slice(result.index + result[0].length);
                    result = new RegExp('(' + openingTagRegex + ')(.*?)' + closingTagRegex, 'gi').exec(text);

                }

                if (text.length > 0) {
                    miss(text);
                }

            }

        });

    return genericParser;

}());