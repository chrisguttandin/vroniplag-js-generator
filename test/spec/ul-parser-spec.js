/*global
    beforeEach,
    describe,
    expect,
    HtmlUnsortedListParser,
    it
 */
describe('UL Parser', function () {

    'use strict';

    var ulParser = HtmlUnsortedListParser;

    beforeEach(function () {
        // 
    });

    it('should return a string when no <ul> is inside the text', function () {
        var parsed = HtmlUnsortedListParser.parse('<p>ein paragraph sollte dir egal sein</p>');
        expect(typeof parsed).toEqual('string');
    });

    it('should return an object when a <ul> is inside the text', function () {
        var parsed = HtmlUnsortedListParser.parse('<p><ul><li>ein Listenpunkt</li></ul></p>');
        expect(typeof parsed).toEqual('object');
    });

});
