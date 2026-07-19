/* Any JavaScript here will be loaded for all users on every page load. */

// Configuration for dev:PreloadFileDescription.js. See MediaWiki:ImportJS
PFD_templates = [
    {
        label:   'Game Template',
        desc:    '{{File Information | Description = <description of the file>\n| Source = Ninjala by GungHo Online Entertainment, Inc\n| Portion = Screen Capture of Game\n| Purpose = To illustrate Articles\n| Resolution = <Pixels or Low, Medium, High>\n| Replaceability = Only by an file of higher quality with the same licensing\n| Other Information = }}',
        license: 'Fairuse'
    },
    {
    	label:   'Anime Template',
    	desc:    '{{File Information | Description = <description of the file>\n| Source = Ninjala (TV) produced by TV Tokyo, animated by OLM, owned by GungHo Online Entertainment, Inc.\n| Portion = <episode it was taken from>\n| Purpose = To illustrate Articles\n| Resolution = <Pixels or Low, Medium, High>\n| Replaceability = Only by an file of higher quality with the same licensing\n| Other Information = }}',
    	license: 'Fairuse'
    }
];
PFD_license = 'Fairuse';
PFD_requireLicense = true;
PFD_discourageEditorFileUpload = true;