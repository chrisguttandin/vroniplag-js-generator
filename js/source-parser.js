/*global
    Source
 */
var SourceParser = (function ($) {

    'use strict';

    return function (options) {

        options = options || {};

        var sourceParser = Object.create({});

        sourceParser.isSource = function (content) {
            return content.match(/SMWQuelle/);
        };

        sourceParser.parse = function (content) {
            var results,
                source;

            if (this.isSource(content)) {
                source = new Source();

                results = /\|Autor\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    source.author = $.trim(results[1]);
                }

                results = /\|Ort\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    source.location = $.trim(results[1]);
                }

                results = /\|ISBN\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    source.isbn = $.trim(results[1]);
                }

                results = /\|Verlag\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    source.publisher = $.trim(results[1]);
                }

                results = /\|Titel\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    source.title = $.trim(results[1]);
                }

                results = /\|Jahr\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    source.year = $.trim(results[1]);
                }

                // TODO könnte auch so aussehen:
                // {"query":{"pages":{"15294":{"pageid":15294,"ns":114,"title":"Quelle:Lm\/D\u00f6rner 1988","touched":"2013-03-24T11:06:02Z","lastrevid":75540,"counter":"","length":402,"new":"","revisions":[{"*":"{{SMWQuelle\n|Autor       = Heinrich D\u00f6rner\n|Titel       = Qualifikation im IPR \u2014 ein Buch mit sieben Siegeln?\n|Zeitschrift = Das Standesamt\n|Jahrgang    = 41\n|Nummer      = \n|Jahr        = 1988\n|Monat       = \n|Tag         = \n|Seiten      = 345-352\n|Verlag      = Verlag f\u00fcr Standesamtswesen\n|ISSN        = 0341-3977\n|URL         = \n|InLit       = ja\n|InFN        = ja\n|Anmerkung   = \n|Kuerzel=Lm}}"}],"categories":[{"ns":14,"title":"Kategorie:D\u00f6rner 1988"},{"ns":14,"title":"Kategorie:Lm"},{"ns":14,"title":"Kategorie:Quelle"},{"ns":14,"title":"Kategorie:Schutzlevel"}]}}},"limits":{"categories":500}}

                return source;
            }
        };

        return Object.freeze(sourceParser);

    };

}(jQuery));
