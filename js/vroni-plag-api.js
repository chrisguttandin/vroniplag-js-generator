var VroniPlagAPI = (function ($) {

    'use strict';

    return function (options) {

        options = options || {};

        var values = {},
            vroniPlagAPI = Object.create({}, {

                apiURL: {
                    get: function () {
                        return 'http://de.vroniplag.wikia.com/api.php';
                    }
                },

                key: {
                    get: function () {
                        return '5e1860cd42b1459fa33ab971d7ce7dfc2923d898';
                    }
                },

                url: {
                    get: function () {
                        if (typeof values.url === 'undefined') {
                            values.url = (window.location.host === 'localhost') ?
                                    'http://dev.access-allowing-adapter.com/' :
                                    'https://access-allowing-adapter.herokuapp.com/';
                        }
                        return values.url;
                    }
                },

                wikiaUrlPrefix: {
                    get: function () {
                        return 'http://de.vroniplag.wikia.com/wiki/';
                    }
                }

            });

        /*
         *  gets the content of a page by it's id
         */
        vroniPlagAPI.getPageContent = function (pageId, callback) {
            $.ajax({
                data: {
                    action: 'query',
                    prop: 'info|revisions|categories',
                    rvprop: 'content',
                    cllimit: 'max',
                    key: this.key,
                    format: 'json',
                    pageids: pageId,
                    url: this.apiURL
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                success: function (data, textStatus, jqXHR) {
                    var content,
                        page,
                        pages;

                    if (typeof data === 'string') {
                        data = JSON.parse(data);
                    }

                    if (typeof data.query !== 'undefined' && typeof data.query.pages !== 'undefined') {
                        pages = data.query.pages;

                        for (page in pages) {
                            if (typeof pages[page].revisions !== 'undefined') {
                                content = pages[page].revisions[0]['*'];
                            }
                        }
                    }
                    callback(content);
                },
                url: this.url
            });
        };

        /*
         *  gets the html of a page by it's title
         */
        vroniPlagAPI.getPageHtmlByTitle = function (title, callback) {
            $.ajax({
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                success: function (data, textStatus, jqXHR) {
                    callback(data);
                },
                url: this.url + '?url=' + encodeURIComponent(this.wikiaUrlPrefix + title)
            });
        };

        /*
         *  gets the id of a page by it's title
         */
        vroniPlagAPI.getPageIdByTitle = function (title, callback) {
            $.ajax({
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                success: function (data, textStatus, jqXHR) {
                    var page,
                        pageId,
                        pages;

                    if (typeof data === 'string') {
                        data = JSON.parse(data);
                    }

                    if (typeof data.query !== 'undefined' && typeof data.query.pages !== 'undefined') {
                        pages = data.query.pages;

                        for (page in pages) {
                            if (typeof pages[page].pageid !== 'undefined') {
                                pageId = pages[page].pageid;
                            }
                        }
                    }
                    callback(pageId);
                },
                url: this.url + '?action=query&format=json&key=' + this.key + '&titles=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(this.apiURL)
            });
        };

        /*
         *  gets the ids of all pages with a certain prefix
         */
        vroniPlagAPI.getPageIdsByPrefix = function (prefix, callback) {
            $.ajax({
                data: {
                    action: 'query',
                    format: 'json',
                    gaplimit: 500,
                    gapprefix: prefix,
                    generator: 'allpages',
                    key: this.key,
                    url: this.apiURL
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                success: function (data, textStatus, jqXHR) {
                    var page,
                        pageIds = [],
                        pages;

                    if (typeof data === 'string') {
                        data = JSON.parse(data);
                    }

                    if (typeof data.query !== 'undefined' && typeof data.query.pages !== 'undefined') {
                        pages = data.query.pages;

                        for (page in pages) {
                            if (typeof pages[page].pageid !== 'undefined') {
                                pageIds.push(pages[page].pageid);
                            }
                        }
                    }
                    callback(pageIds);
                },
                url: this.url
            });
        };

        return Object.freeze(vroniPlagAPI);

    };

}(jQuery));
