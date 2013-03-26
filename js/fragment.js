var Fragment = (function () {

    'use strict';

    return function (options) {

        options = options || {};

        var values = {},
            fragment = Object.create({}, {

                acronym: {
                    get: function () {
                        return values.acronym;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('acronym must be a string');
                        }
                        values.acronym = value;
                    }
                },

                notes: {
                    get: function () {
                        return values.notes;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('notes must be a string');
                        }
                        values.notes = value;
                    }
                },

                original: {
                    get: function () {
                        return values.original;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('original must be a string');
                        }
                        values.original = value;
                    }
                },

                originalColumns: {
                    get: function () {
                        return values.originalColumns;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('originalColumns must be a string');
                        }
                        values.originalColumns = value;
                    }
                },

                originalPage: {
                    get: function () {
                        return values.originalPage;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('originalPage must be a string');
                        }
                        values.originalPage = value;
                    }
                },

                originalSource: {
                    get: function () {
                        return values.originalSource;
                    },
                    set: function (value) {
                        if (typeof value !== 'object') {
                            throw new TypeError('originalSource must be an object');
                        }
                        values.originalSource = value;
                    }
                },

                originalSourceName: {
                    get: function () {
                        return values.originalSourceName;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('originalSourceName must be a string');
                        }
                        values.originalSourceName = value;
                    }
                },

                plagiarism: {
                    get: function () {
                        return values.plagiarism;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('plagiarism must be a string');
                        }
                        values.plagiarism = value;
                    }
                },

                plagiarismColumns: {
                    get: function () {
                        return values.plagiarismColumns;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('plagiarismColumns must be a string');
                        }
                        values.plagiarismColumns = value;
                    }
                },

                plagiarismPage: {
                    get: function () {
                        return values.plagiarismPage;
                    },
                    set: function (value) {
                        if (typeof value !== 'string') {
                            throw new TypeError('plagiarismPage must be a string');
                        }
                        values.plagiarismPage = value;
                    }
                }

            });

        if (typeof options.acronym !== 'undefined') {
            fragment.acronym = options.acronym;
        }

        if (typeof options.notes !== 'undefined') {
            fragment.notes = options.notes;
        }

        if (typeof options.original !== 'undefined') {
            fragment.original = options.original;
        }

        if (typeof options.originalColumns !== 'undefined') {
            fragment.originalColumns = options.originalColumns;
        }

        if (typeof options.originalPage !== 'undefined') {
            fragment.originalPage = options.originalPage;
        }

        if (typeof options.originalSource !== 'undefined') {
            fragment.originalSource = options.originalSource;
        }

        if (typeof options.originalSourceName !== 'undefined') {
            fragment.originalSourceName = options.originalSourceName;
        }

        if (typeof options.plagiarism !== 'undefined') {
            fragment.plagiarism = options.plagiarism;
        }

        if (typeof options.plagiarismColumns !== 'undefined') {
            fragment.plagiarismColumns = options.plagiarismColumns;
        }

        if (typeof options.plagiarismPage !== 'undefined') {
            fragment.plagiarismPage = plagiarismPage.sourcePage;
        }

        return Object.freeze(fragment);

    };

}());
