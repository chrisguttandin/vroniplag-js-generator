var Source = (function () {

    'use strict';

    return function (options) {

        options = options || {};

        var values = {},
            source = Object.create({}, {

                author: {
                    get: function () {
                        return values.author;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('author must be a string');
                        }
                        values.author = value;
                    }
                },

                isbn: {
                    get: function () {
                        return values.isbn;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('isbn must be a string');
                        }
                        values.isbn = value;
                    }
                },

                location: {
                    get: function () {
                        return values.location;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('location must be a string');
                        }
                        values.location = value;
                    }
                },

                name: {
                    get: function () {
                        return values.name;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('name must be a string');
                        }
                        values.name = value;
                    }
                },

                publisher: {
                    get: function () {
                        return values.publisher;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('publisher must be a string');
                        }
                        values.publisher = value;
                    }
                },

                title: {
                    get: function () {
                        return values.title;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('title must be a string');
                        }
                        values.title = value;
                    }
                },

                year: {
                    get: function () {
                        return values.year;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('year must be a string');
                        }
                        values.year = value;
                    }
                }

            });

        if (typeof options.author !== 'undefined') {
            source.author = options.author;
        }

        if (typeof options.isbn !== 'undefined') {
            source.isbn = options.isbn;
        }

        if (typeof options.location !== 'undefined') {
            source.location = options.location;
        }

        if (typeof options.name !== 'undefined') {
            source.name = options.name;
        }

        if (typeof options.publisher !== 'undefined') {
            source.publisher = options.publisher;
        }

        if (typeof options.title !== 'undefined') {
            source.title = options.title;
        }

        if (typeof options.year !== 'undefined') {
            source.year = options.year;
        }

        return Object.freeze(source);

    };

}());
