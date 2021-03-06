/*global
    DataURIDownloader,
    FragmentDocumentBuilder,
    FragmentForm,
    FragmentParser,
    Logger,
    Processor,
    ReportBuilder,
    SourceParser,
    VroniPlagAPI
 */

// http://www.wikia.com/api.php
// http://de.vroniplag.wikia.com/api.php?action=query&format=json&titles=Lm%2FFragment%20001%2005
// http://de.vroniplag.wikia.com/api.php?action=query&prop=info%7Crevisions%7Ccategories&rvprop=content&cllimit=max&format=json&pageids=14383 

(function ($, p) {

    'use strict';

    $(function () {

        var dataURIDownloader = new DataURIDownloader(),
            fragmentDocumentBuilder = new FragmentDocumentBuilder(),
            fragmentForm = new FragmentForm(),
            fragmentParser = new FragmentParser(),
            logger = new Logger(),
            reportBuilder = new ReportBuilder(),
            $input,
            sourceParser = new SourceParser(),
            url,
            vroniPlagAPI = new VroniPlagAPI();

        fragmentDocumentBuilder.dataURIDownloader = dataURIDownloader;
        fragmentDocumentBuilder.fragmentParser = fragmentParser;
        fragmentDocumentBuilder.logger = logger;
        fragmentDocumentBuilder.sourceParser = sourceParser;
        fragmentDocumentBuilder.vroniPlagAPI = vroniPlagAPI;

        fragmentForm.fragmentDocumentBuilder = fragmentDocumentBuilder;
        fragmentForm.logger = logger;
        fragmentForm.reportBuilder = reportBuilder;

        logger.fragmentForm = fragmentForm;

        reportBuilder.dataURIDownloader = dataURIDownloader;
        reportBuilder.logger = logger;
        reportBuilder.vroniPlagAPI = vroniPlagAPI;

        $('#actions .search').clone().appendTo($('#template-container'));
        $input = $('form').submit(fragmentForm.submit).find('input').focus().select();
        url = localStorage.getItem('url');
        if (url !== null) {
            $input.val(url).select();
        }

    });

}(jQuery, Processor));
