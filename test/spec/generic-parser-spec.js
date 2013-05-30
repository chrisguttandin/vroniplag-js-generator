/*global
    describe,
    expect,
    GenericParser,
    it
 */
describe('Generic Parser', function () {

    'use strict';

    describe('should find a single <tag>', function () {
        it('with text', function () {
            var called = 0;
            GenericParser.parseClosable('tag', '<tag>lorem</tag>', function (result) {
                expect(result[0]).toEqual('<tag>lorem</tag>');
                called += 1;
                if (called > 1) {
                    throw 'hit should only be called once';
                }
            }, function () {
                throw 'miss should never be called';
            });
        });
        it('with no content', function () {
            var called = 0;
            GenericParser.parseClosable('tag', '<tag></tag>', function (result) {
                expect(result[0]).toEqual('<tag></tag>');
                called += 1;
                if (called > 1) {
                    throw 'hit should only be called once';
                }
            }, function () {
                throw 'miss should never be called';
            });
        });
        it('with whitespace inside', function () {
            var called = 0;
            GenericParser.parseClosable('tag', '<tag> </tag>', function (result) {
                expect(result[0]).toEqual('<tag> </tag>');
                called += 1;
                if (called > 1) {
                    throw 'hit should only be called once';
                }
            }, function () {
                throw 'miss should never be called';
            });
        });
        it('with attributes', function () {
            var called = 0;
            GenericParser.parseClosable('tag', '<tag attr="value"></tag>', function (result) {
                expect(result[0]).toEqual('<tag attr="value"></tag>');
                called += 1;
                if (called > 1) {
                    throw 'hit should only be called once';
                }
            }, function () {
                throw 'miss should never be called';
            });
        });
        it('with line breaks', function () {
            var called = 0;
            GenericParser.parseClosable('tag', '<tag>\r\n</tag>', function (result) {
                expect(result[0]).toEqual('<tag>\r\n</tag>');
                called += 1;
                if (called > 1) {
                    throw 'hit should only be called once';
                }
            }, function () {
                throw 'miss should never be called';
            });
        });
    });

    describe('should find a <tag> with nested <tag>s inside', function () {
        it('without siblings', function () {
            var called = 0;
            GenericParser.parseClosable('tag', '<tag><tag></tag></tag>', function (result) {
                expect(result[0]).toEqual('<tag><tag></tag></tag>');
                called += 1;
                if (called > 1) {
                    throw 'hit should only be called once';
                }
            }, function () {
                throw 'miss should never be called';
            });
        });
        it('with siblings', function () {
            var called = 0;
            GenericParser.parseClosable('tag', '<tag><tag></tag><tag></tag></tag>', function (result) {
                expect(result[0]).toEqual('<tag><tag></tag><tag></tag></tag>');
                called += 1;
                if (called > 1) {
                    throw 'hit should only be called once';
                }
            }, function () {
                throw 'miss should never be called';
            });
        });
        it('with text in between', function () {
            var hitCalled = 0,
                missCalled = 0;
            GenericParser.parseClosable('tag', 'lorem<tag> lorem <tag> lorem </tag> lorem <tag> lorem </tag> lorem </tag>lorem', function (result) {
                expect(result[0]).toEqual('<tag> lorem <tag> lorem </tag> lorem <tag> lorem </tag> lorem </tag>');
                hitCalled += 1;
                if (hitCalled > 1) {
                    throw 'hit should only be called once';
                }
            }, function (text) {
                expect(text).toEqual('lorem');
                missCalled += 1;
                if (missCalled > 2) {
                    throw 'miss should only be called twice';
                }
            });
        });
    });

    describe('real life examples', function () {
        it('<dl> from Benutzer:WiseWoman/Berichte/Df', function () {
            var hitCalled = 0,
                missCalled = 0;
            GenericParser.parseClosable('dl', '<dl> <a href="http://images3.wikia.nocookie.net/__cb20130510091825/vroniplag/de/images/3/36/MAS.png" class="image"><img alt="MAS" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="594" height="182" data-image-name="MAS.png" data-image-key="MAS.png" data-src="http://images3.wikia.nocookie.net/__cb20130510091825/vroniplag/de/images/3/36/MAS.png" class="lzy lzyPlcHld" onload="if(typeof ImgLzy==&quot;object&quot;){ImgLzy.load(this)}"><noscript>&lt;img alt="MAS" src="http://images3.wikia.nocookie.net/__cb20130510091825/vroniplag/de/images/3/36/MAS.png" width="594" height="182" data-image-name="MAS.png" data-image-key="MAS.png" /&gt;</noscript></a>\n\n</dl> ', function (result) {
                expect(result[0]).toEqual('<dl> <a href="http://images3.wikia.nocookie.net/__cb20130510091825/vroniplag/de/images/3/36/MAS.png" class="image"><img alt="MAS" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="594" height="182" data-image-name="MAS.png" data-image-key="MAS.png" data-src="http://images3.wikia.nocookie.net/__cb20130510091825/vroniplag/de/images/3/36/MAS.png" class="lzy lzyPlcHld" onload="if(typeof ImgLzy==&quot;object&quot;){ImgLzy.load(this)}"><noscript>&lt;img alt="MAS" src="http://images3.wikia.nocookie.net/__cb20130510091825/vroniplag/de/images/3/36/MAS.png" width="594" height="182" data-image-name="MAS.png" data-image-key="MAS.png" /&gt;</noscript></a>\n\n</dl>');
                hitCalled += 1;
                if (hitCalled > 1) {
                    throw 'hit should only be called once';
                }
            }, function (text) {
                expect(text).toEqual(' ');
                missCalled += 1;
                if (missCalled > 1) {
                    throw 'miss should only be called once';
                }
            });
        });
    });

});
