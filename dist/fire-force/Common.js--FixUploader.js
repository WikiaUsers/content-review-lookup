/**
 * 17:15, July 2, 2017 (UTC)
 * Source: http://naruto.fandom.com/wiki/MediaWiki:Common.js/FairUseUpload.js
 * UCP patch from: https://naruto.fandom.com/fr/wiki/MediaWiki:Common.js/FairUseUpload.js
 * Builds a form for easy uploading of images
 * and to ensure proper rationale and licensing
 * @author: UltimateSupreme (https://naruto.fandom.com/wiki/User:UltimateSupreme)
 * @author: Celdrøn (https://naruto.fandom.com/fr/wiki/User:Celdrøn)
 * @License: CC-BY-SA - https://creativecommons.org/licenses/by-sa/3.0/
 */

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
window.setCookie = function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
window.getCookie = function(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
};

if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
	jQuery(function ($) {
		'use strict';
		var $desc = $('#wpUploadDescription');
		if ($desc.val()) return; // If not empty then don't do anything (i.e. error message confirm page)
		$desc.val('{\{File Information\n'
                + '|Description         = \n'
                + '|Source              = \n'
                + '|Purpose             = \n'
                + '|Replaceability      = \n'
                + '|Resolution          = \n'
                + '|Other Information   = \n'
                + '}}'
        );
    });
}

/**
 * Start upload form customisations
 */
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    // Check if cookie has been set for form style. Overrides URL parameter if set.
    var formstyle = getCookie("uploadform");
    $("#uploadBasicLinkJS").show();
    $("#uploadTemplateNoJS").hide();

    mw.loader.using('mediawiki.util').then(function() {

        if (!mw.util.getParamValue('wpForReUpload')) {


            if (formstyle == "guided" || (formstyle === "" && window.location.search.indexOf('basic=true') == -1)) { // Add link to basic form
                $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://fire-force.fandom.com/index.php?title=Special:Upload&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Switch to basic form</a></div>'); // Stretch table to full width            
	            
                jQuery(function ($) {
                    'use strict';
                    var $description = $('#wpUploadDescription'),
                        customRows = '',
                        $customRows;

                    if ($description.val()) {
                        return; // error message confirm page
                    }
	     
                    function fromTemplate(name, id, required, title, elem) {
                        elem = elem || '<textarea style="resize:none; overflow:auto;" rows="2" cols="80" id="' + id + (required ? '" required="required' : '') + (title ? '" title="' + title : '') + '"></textarea>';
                        return '<tr>\n'
                            + '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + '&nbsp;:</label></td>\n'
                            + '<td class="mw-input">' + elem + '</td>\n'
                            + '</tr>\n';
                    }
                    customRows += fromTemplate('Description', 'descriptionBox', true, '[REQUIRED] Describe what is happening and why it\'s important.');
                    customRows += fromTemplate('Source', 'sourceBox', true, '[REQUIRED] What media is this from?');
                    customRows += fromTemplate('Purpose', 'purposeBox', false, '[OPTIONAL] Purpose of this image.');
                    customRows += fromTemplate('Replaceable?', 'replaceBox', false, '[OPTIONAL] Is the image replaceable?');
                    customRows += fromTemplate('Resolution', 'resolutionBox', false, '[OPTIONAL] Resolution of the image. Will be detected automatically otherwise.');
                    customRows += fromTemplate('Other Information', 'otherinfoBox', false, '[OPTIONAL] Any other information about the image.');

                    // To real DOM
                    $customRows = $(customRows);
                    $description.closest('tr').hide().after($customRows);
                    $customRows.find("textarea").tooltip({trigger: 'focus'});

                    function verifySummary() {
                        if (!$('#wpLicense').val()) {
                            $.showModal('Licensing Incomplete', 'Choose a proper license from the dropdown.');
                            return false;
                        }

                        if (!$.trim($customRows.find('#descriptionBox').val())) {
                            $.showModal('Description Incomplete', 'Please enter a proper description for your image. Describe what is happening and why is it important.');
                            return false;
                        }

                        if (!$.trim($customRows.find('#sourceBox').val())) {
                            window.alert('Please enter the source of your image (exact episode or chapter it was taken from).');
                            return false;
                        } else if (/google/i.test($customRows.find('#sourceBox').val())) {
                            $.showModal('Improper Source', 'Google is not a valid source for images. Please enter the exact episode or chapter for which the image was taken.');
                            $customRows.find('#sourceBox').val('');
                            return false;
                        }

                        var template = '',
                            resolution = $.trim($customRows.find('#resolutionBox').val()) || $('.fileinfo').text().split(',')[0];
                        if (/1080/i.test(resolution)) {
                            template = '{\{1080p upload}}\n';
                        } else if (/720/i.test(resolution)) {
                            template = '{\{720p upload}}\n';
                        }

                        var strBuilder = template;
                        strBuilder += '{\{File Information\n';
                        strBuilder += '|Description         = ' + $.trim($customRows.find('#descriptionBox').val()) + '\n';
                        strBuilder += '|Source              = ' + $.trim($customRows.find('#sourceBox').val()) + '\n';
                        strBuilder += '|Purpose             = ' + $.trim($customRows.find('#purposeBox').val()) + '\n';
                        strBuilder += '|Resolution          = ' + resolution + '\n';
                        strBuilder += '|Replaceability      = ' + $.trim($customRows.find('#replaceBox').val()) + '\n'; 
                        strBuilder += '|Other Information   = ' + $.trim($customRows.find('#otherinfoBox').val()) + '\n';
                        strBuilder += '}}';
                        $description.val(strBuilder);
                        return true;
                    }

                    // Bind submit to verify function
                    $description.closest('form').submit(verifySummary);

                    // Autocomplete links
                    $.getScript(mw.util.wikiScript('load') + 
                        '?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AMediaWiki%3AColors%2Fcode.js%7Cu%3Adev%3AMediaWiki%3AMiniComplete%2Fcode.js&only=scripts', function () {
                        dev.minicomplete.load(
                            $customRows.find('#descriptionBox'), $customRows.find('#sourceBox'),$customRows.find('#characterBox'), $customRows.find('#jutsuBox')
                        );
                    });
                });
            } else { // Old style form just needs Information template in the summary box
                $('#wpUploadDescription').val('{\{File Information\n'
                                            + '|Description         = \n'
                                            + '|Source              = \n'
                                            + '|Purpose             = \n'
                                            + '|Replaceability      = \n'
                                            + '|Resolution          = \n'
                                            + '|Other Information   = \n'
                                            + '}}'
                ); // Add link to guided form
                $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://fire-force.fandom.com/index.php?title=Special:Upload" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Switch to the advanced form</a></div>');
            }
        }
    });
}