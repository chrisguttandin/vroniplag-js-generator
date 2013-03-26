var DataURIDownloader = (function ($) {

    'use strict';

    return function (options) {

        options = options || {};

        var values = {},
            dataURIDownloader = Object.create({});

        dataURIDownloader.download = function (dataURI, filename) {
            var $form = $('<form method="post" action="https://download-data-uri.appspot.com/"></form>');

            $form.append('<input type="hidden" name="filename" value="' + filename + '">');
            $form.append('<input type="hidden" name="data" value="' + dataURI + '">');
            $('body').append($form);
            $form.submit().remove();
        };

        return Object.freeze(dataURIDownloader);

    };

}(jQuery));
