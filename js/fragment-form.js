var FragmentForm = (function ($) {

    'use strict';

    return function (options) {

        options = options || {};

        var values = {},
            fragmentForm = Object.create({}, {

                fragmentDocumentBuilder: {
                    get: function () {
                        return values.fragmentDocumentBuilder;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('fragmentDocumentBuilder must be an object');
                        }
                        values.fragmentDocumentBuilder = value;
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

                reportBuilder: {
                    get: function () {
                        return values.reportBuilder;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('reportBuilder must be an object');
                        }
                        values.reportBuilder = value;
                    }
                }

            });

        fragmentForm.submit = (function (that) {
            return function (event) {
                var prefix = '',
                    result,
                    val = $(this).find('input').val(),
                    url;

                event.preventDefault();

                url = $.trim(val);
                localStorage.setItem('url', val);

                $(this).find('input').attr('disabled', 'disabled');
                $(this).find('button').hide();

                if (url !== '') {
                    if (url.match(/^[a-z]+\/Fragment[_0-9]+$/i)) {
                        // a single fragment
                        that.logger.progress('http://de.vroniplag.wikia.com/wiki/' + url);
                        window.setTimeout(function () {
                            that.fragmentDocumentBuilder.buildByTitle(url);
                        }, 0);
                        return;

                    } else if (url.match(/^[a-z]+\/[0-9]+$/i)) {
                        // a collection of fragments with the same prefix
                        result = /^([a-z]+)\/([0-9]+)$/i.exec(url);
                        prefix = encodeURI(result[1] + '/Fragment_' + result[2]);
                    } else if (url.match(/^[a-z]+\/?$/i)) {
                        // all fragments
                        result = /^([a-z]+)\/?$/i.exec(url);
                        prefix = encodeURI(result[1] + '/');
                    } else if (url.match(/^Benutzer:WiseWoman\/Berichte\/[a-z]+$/i)) {
                        // a report
                        that.logger.progress('http://de.vroniplag.wikia.com/wiki/' + url);
                        window.setTimeout(function () {
                            that.reportBuilder.buildByTitle(url);
                        }, 0);
                        return;
                    } else {
                        that.logger.error();
                        return;
                    }
                    that.logger.progress('http://de.vroniplag.wikia.com/wiki/' + url);
                    window.setTimeout(function () {
                        that.fragmentDocumentBuilder.buildByPrefix(prefix);
                    }, 0);
                    return;
                }
                that.logger.error();
            };
        }(fragmentForm));

        if (typeof options.logger !== 'undefined') {
            fragmentForm.logger = options.logger;
        }

        if (typeof options.fragmentDocumentBuilder !== 'undefined') {
            fragmentForm.fragmentDocumentBuilder = options.fragmentDocumentBuilder;
        }

        if (typeof options.reportBuilder !== 'undefined') {
            fragmentForm.reportBuilder = options.reportBuilder;
        }

        return Object.freeze(fragmentForm);

    };

}(jQuery));
