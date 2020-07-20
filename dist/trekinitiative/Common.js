/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

/* Fan Census contact form */
if(wgPageName == 'Special:Contact/general') {
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	var fanCensusParam = getParameterByName('fancensus');
	if(fanCensusParam == 1) {
		$('#SpecialContactIntroForm').html('<p>Standup, be counted and record your Fan Census video! Look directly into your camera (no need to get fancy – a simple webcam will do) and state your name, where you\'re from (city & state –or– city & country), why you\'re a Trek fan, and your favorite Trek memory. Videos should be NO MORE THAN two-and-a-half minutes in length. Next, fill out the form below and upload your video. It’s that simple.</p><p>The supported video file types are .3gp, .avi, .flv, .mov, .mp4, .mpg, .qt, .ts and .wmv and the maximum file size is 20MB. If you\'re having issues uploading your video please let us know at <a href="mailto:fancensus@wikia-inc.com">fancensus@wikia-inc.com.</a></p>');

		$('input[name="wpContactSubject"]').css('display','none');
		$('input[name="wpContactSubject"]').prev().css('display','none');

		$('input[name="wpContactSubject"]').after('<p class="contactformcaption">Your full name</p><input required="required" type="text" size="60" value="" name="wpContactName"><p class="contactformcaption">Language of the video</p><input required="required" type="text" size="60" value="" name="wpVideoLanguage"><p class="contactformcaption">Your country/state and city</p><input required="required" style="margin-bottom: 15px;" type="text" size="60" value="" name="wpLocation">');

		$('textarea[name="wpContactDesc"]').css('display','none');
		$('textarea[name="wpContactDesc"]').prev().css('display','none');
		$('textarea[name="wpContactDesc"]').after('<br /><label for="wpAgreed"><input required="required" type="checkbox" value="1" name="wpAgreed">I have read and agree to the release terms outlined <a href="http://trekinitiative.wikia.com/wiki/Fan_Census/release_terms" title="Release Terms">here.</a></label><div style="margin-left: 15px;" class="wpAgeCheck"><label for="wpAge"><input required="required" type="radio" name="wpAge" value="Over18">I certify that I am over the age of 18.</label><br /><label for="wpAge"><input required="required" type="radio" name="wpAge" value="Guardian">I certify that I am the legal guardian of the undersigned.</label></div>');

		$('input[name="wpScreenshot[]"]').removeAttr('multiple');
		$('label[for="wpScreenshot1"]').text('Upload your video here. Remember, the file must be smaller than 20MB.');

		$('input[value="Send to Wikia"]').addClass('submitvideo');
		$('.submitvideo').val('Submit Video');
		$('.submitvideo').attr('disabled','disabled');
		
		$('#wpScreenshot1').attr('accept','video/*');
		$('.additionalScreenShot').remove();

		$('input[name="wpAgreed"]').change(function() {
			checkDisable();
		});

		$('input[name="wpAge"]').change(function() {
			if ($(this).val() === 'Guardian' && $('input[name="myGuardian"]').length <= 0) {
				$('.wpAgeCheck').after('<div class="guardiancheck"><p class="contactformcaption">Your guardian\'s full name</p><input required="required" type="text" size="60" name="wpGuardian"></div>');					
			}
			else if ($(this).val() === 'Over18') {
				$('.guardiancheck').remove();					
			}
			checkDisable();
		});
		
		$('input[name="wpScreenshot[]"]').change(function() {
			checkFile(1);
			checkDisable();
		});
		
		function checkDisable() {
			if ($('input[name="wpAgreed"]').is(':checked') && $('input[name="wpAge"]').is(':checked') && !checkFile()) {
				$('.submitvideo').removeAttr('disabled');
			} 
			else {
				$('.submitvideo').attr('disabled','disabled');
			}		
		}
		
		function checkFile(message) {
			var maxsize = 20000000 // 20MB, in bytes
			if(typeof message != "undefined") {
				$('.output-size').remove();
			}
			var element = $('input[name="wpScreenshot[]"]');
			var file = element[0].files[0]; 
			if(typeof file != "undefined") {
				var size = file.size;
				if(size > maxsize) {
					if(typeof message != "undefined") {
						$(element).after('<div class="output-size" style="color: red;">The selected file is too large. Submissions can not be larger than 20MB.</div>');
					}
					return 1
				}
				return 0
			}
			return 1
		}

		$("#contactform").submit(function(event) {
			$('.output').remove();		
			var name = $('input[name="wpContactName"]').val();
			var language = $('input[name="wpVideoLanguage"]').val();
			var location = $('input[name="wpLocation"]').val();
			var agreed = $('input[name="wpAgreed"]').val();
			var age = $('input[name="wpAge"]:checked').val();
			var file = checkFile();
			
			if(name == '' || language == '' || location == '' || agreed == '') {
				$('.submitvideo').after('<div class="output" style="color: red;">Please fill out the entire form.</div>');
				return false;
			}
			else if(age == 'Guardian' && $('input[name="wpGuardian"]').val() == '') {
				$('.submitvideo').after('<div class="output" style="color: red;">Please fill out your guardian\'s full name.</div>');	
				return false;
			}
			else if(checkFile()) {
				$('.submitvideo').after('<div class="output" style="color: red;">Please ensure you have selected a video, and the video is smaller than 20MB.</div>');	
				return false;
			}
			else {
				var submitText = 'Fan Census video submission\nFull name: '+name+'\nVideo language: '+language+'\nLocation: '+location+'\nAgreed: '+agreed+'\nAge: '+age;
				if(age == 'Guardian') {
					var guardian = $('input[name="wpGuardian"]').val();
					submitText += '\nGuardian\'s full name: '+guardian;
				}
				$('input[name="wpContactSubject"]').val('Fan Census Submission from '+name);
				$('textarea[name="wpContactDesc"]').val(submitText);
				$('#contactform').submit();
			}
		});
	}
}