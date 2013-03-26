var Logger = (function ($) {

    'use strict';

    return function (options) {

        options = options || {};

        var values = {},
            logger = Object.create({}, {

                fragmentForm: {
                    get: function () {
                        return values.fragmentForm;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('form must be an object');
                        }
                        values.fragmentForm = value;
                    }
                }

            });

        logger.error = function () {
            var $input,
                url;

            $('#template-container .error').clone().appendTo($('#actions'));
            $input = $('#template-container .search').clone().appendTo($('#actions'))
                .find('form').submit(this.fragmentForm.submit)
                .find('input').focus().select();

            url = localStorage.getItem('url');
            if (url !== null) {
                $input.val(url).select();
            }
        };

        logger.progress = function (url) {
            $('#template-container .progress').clone()
                .find('a')
                .attr('href', url)
                .html(url)
                .end().appendTo($('#actions'));
        };

        logger.success = function (dataURI, fileName) {
            var $input,
                url;

            $('#template-container .success').clone(false)
                .find('a')
                .attr('download', fileName)
                .attr('href', dataURI)
                .end().appendTo($('#actions'));
            $input = $('#template-container .search').clone(false).appendTo($('#actions'))
                .find('form').submit(this.fragmentForm.submit)
                .find('input').focus().select();

            url = localStorage.getItem('url');
            if (url !== null) {
                $input.val(url).select();
            }
        };

        if (typeof options.fragmentForm !== 'undefined') {
            logger.fragmentForm = options.fragmentForm;
        }

        return Object.freeze(logger);

    };

}(jQuery));
