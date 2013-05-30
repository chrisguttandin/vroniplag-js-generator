/*global
    Fragment
 */
var FragmentParser = (function ($) {

    'use strict';

    return function (options) {

        options = options || {};

        var fragmentParser = Object.create({});

        fragmentParser.isFragment = function (content) {
            return content.match(/SMWFragment/);
        };

        fragmentParser.parse = function (content) {
            var fragment,
                results;

            if (this.isFragment(content)) {
                fragment = new Fragment();

                results = /\|Kuerzel\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.acronym = $.trim(results[1]);
                }

                results = /\|Anmerkungen\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.notes = $.trim(results[1]);
                }

                results = /\|TextQuelle\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.original = $.trim(results[1]);
                }

                results = /\|SeiteQuelle\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.originalPage = $.trim(results[1]);
                }

                results = /\|ZeileQuelle\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.originalColumns = $.trim(results[1]);
                }

                results = /\|Quelle\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.originalSourceName = $.trim(results[1]);
                }

                results = /\|TextArbeit\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.plagiarism = $.trim(results[1]);
                }

                results = /\|SeiteArbeit\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.plagiarismPage = $.trim(results[1]);
                }

                results = /\|ZeileArbeit\s*=((.|\n)*?(?=\||\}\}))/g.exec(content);
                if (results !== null && results.length > 1) {
                    fragment.plagiarismColumns = $.trim(results[1]);
                }

                return fragment;
            }
        };

        return Object.freeze(fragmentParser);

    };

}(jQuery));
