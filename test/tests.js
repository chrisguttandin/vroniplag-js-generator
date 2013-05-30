(function() {
    var currentWindowOnload = window.onload,
        htmlReporter = new jasmine.HtmlReporter(),
        jasmineEnv = jasmine.getEnv();

    function execJasmine() {
        jasmineEnv.execute();
    }
    
    jasmineEnv.updateInterval = 1000;
    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    window.onload = function() {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        execJasmine();
    };

})();
