/*global
    Fragment
 */
var FragmentParser = (function ($) {

    'use strict';

    return function (options) {

        options = options || {};

        var values = {},
            fragmentParser = Object.create({});

        fragmentParser.isFragment = function (content) {
            return content.match(/SMWFragment/);
        };

        fragmentParser.parse = function (content) {
            var fragment,
                result,
                results;

            if (this.isFragment(content)) {
                fragment = new Fragment();

                results = content.match(/\|Kuerzel=((.|\n)*?(?=\||\}\}))/g);
                result = results[0];
                fragment.acronym = $.trim(result.slice(9));

                results = content.match(/\|Anmerkungen=((.|\n)*?(?=\||\}\}))/g);
                result = results[0];
                fragment.notes = $.trim(result.slice(13));

                results = content.match(/\|TextQuelle=((.|\n)*?(?=\|Anmerkungen=))/g);
                result = results[0];
                fragment.original = result.slice(12);

                results = content.match(/\|SeiteQuelle=((.|\n)*?(?=\|))/g);
                result = results[0];
                fragment.originalPage = $.trim(result.slice(13));

                results = content.match(/\|ZeileQuelle=((.|\n)*?(?=\|))/g);
                result = results[0];
                fragment.originalColumns = $.trim(result.slice(13));

                results = content.match(/\|Quelle=((.|\n)*?(?=\|))/g);
                result = results[0];
                fragment.originalSourceName = $.trim(result.slice(8));

                results = content.match(/\|TextArbeit=((.|\n)*?(?=\|TextQuelle=))/g);
                result = results[0];
                fragment.plagiarism = result.slice(12);

                results = content.match(/\|SeiteArbeit=((.|\n)*?(?=\|))/g);
                result = results[0];
                fragment.plagiarismPage = $.trim(result.slice(13));

                results = content.match(/\|ZeileArbeit=((.|\n)*?(?=\|))/g);
                result = results[0];
                fragment.plagiarismColumns = $.trim(result.slice(13));

                return fragment;
            }
        };

        return Object.freeze(fragmentParser);

    };

}(jQuery));
