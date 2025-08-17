/**
 * Script: AutoRefreshActivity
 * Author: Marisa1980
 * Description: Automatically refresh activity without clicking Live Update manually
 * Other: This script can not run on mobile site
**/

(function() {
	// Add the CSS for the custom checkbox
	mw.util.addCSS(`
		.autoRefreshActivity-container {
			margin-right: auto;
			padding-left: 8px;
			font-size: 0.9em;
			display: inline-flex;
			align-items: center;
		}
		
		.autoRefreshActivity-text {
			text-decoration: underline dotted;
			cursor: help;
		}
		
		.autoRefreshActivity-checkbox {
			display: inline-block;
			width: 14px;
			height: 14px;
			border: 1px solid #999;
			background-color: #fff;
			cursor: pointer;
			vertical-align: middle;
			margin-right: 5px;
			position: relative;
			border-radius: 2px;
		}

		.autoRefreshActivity-checkbox.checked {
			background-color: #0075ff;
			border-color: #0075ff;
		}

		.autoRefreshActivity-checkbox.checked:hover {
			background-color: #005cc8;
			border-color: #005cc8;
		}

		.autoRefreshActivity-checkbox.checked::after {
			content: "";
			position: absolute;
			top: 0px;
			left: 4px;
			width: 5px;
			height: 10px;
			border: solid #fff;
			border-width: 0 3px 3px 0;
			transform: rotate(36deg);
		}
		
		.autoRefreshActivity-spinner {
			margin: auto 3px;
		}
		
		.theme-fandomdesktop-dark .mw-spinner {
			filter: invert(1);
		}
	`);
	
	// startSpinnerCycle and stopSpinnerCycle function
	var spinnerInterval = null; // Variable to hold the interval ID to be able to clear it later
	var spinnerTimeout = null; // Variable to hold the timeout ID for the initial delay
	
	function startSpinnerCycle($spinnerElement, $checkboxElement) {
		// Function to handle one cycle of showing and hiding spinner
		function runOneCycle() {
			$spinnerElement.css("display", "inline-block");
			setTimeout(function() {
				$spinnerElement.css("display", "none");
			}, 3000);
		}
		
		// Clear any existing interval to prevent duplicates
		if (spinnerInterval) {
			clearInterval(spinnerInterval);
		}
		
		// Clear any existing timeout to prevent unexpected starts
		if (spinnerTimeout) {
			clearTimeout(spinnerTimeout);
		}
		
		// Wait before the very first spinner cycle
		spinnerTimeout = setTimeout(function() {
			runOneCycle();
			spinnerInterval = setInterval(runOneCycle, 18000);
		}, 15000);
	}
	
	function stopSpinnerCycle($spinnerElement) {
		// Clear both the interval and the timeout
		if (spinnerInterval) {
			clearInterval(spinnerInterval);
			spinnerInterval = null;
		}
		if (spinnerTimeout) {
			clearTimeout(spinnerTimeout);
			spinnerTimeout = null;
		}
		$spinnerElement.css('display', 'none');
	}
	
	// Recent Changes function
	function addAutoRefreshRecentChanges($spinner) {
		var $container = $('.mw-rcfilters-ui-liveUpdateButtonWidget');
		var $liveUpdate = $container.find('.oo-ui-buttonElement-button');
		var checkboxId = 'autoRefreshToggleRC';
		
		if (!$liveUpdate.length || $('#' + checkboxId).length) {
			return false;
		}
		
		// Create Auto-refresh container and its children
		var $autoRefresh = $('<span class="autoRefreshActivity-container">')
		.append('<span id="' + checkboxId + '" class="autoRefreshActivity-checkbox checked"></span>')
		.append(
			$('<span class="autoRefreshActivity-text">')
				.text('Auto-refresh')
				.attr('title', 'Tick the checkbox to stop or start refreshing automatically.')
		);
		
		// Append the element after the container
		$autoRefresh.append($spinner);
		$container.after($autoRefresh);
		var $checkbox = $('#' + checkboxId);
		startSpinnerCycle($spinner, $checkbox);
		
		// Handle the click on the custom checkbox
		$checkbox.on('click', function() {
			$(this).toggleClass('checked');
			$liveUpdate.trigger('click');
			
			if ($(this).hasClass('checked')) {
				startSpinnerCycle($spinner, $checkbox);
			} else {
				stopSpinnerCycle($spinner);
			}
		});
		
		// Sync the custom checkbox when the Live Update button is clicked
		$liveUpdate.on('click', function() {
			setTimeout(function() {
				var pressed = $liveUpdate.attr('aria-pressed') === 'true';
				var isActiveClass = $liveUpdate.hasClass('oo-ui-buttonElement-active');
				var isChecked = pressed || isActiveClass;

				$checkbox.toggleClass('checked', isChecked);
				
				if (isChecked) {
					startSpinnerCycle($spinner, $checkbox);
				} else {
					stopSpinnerCycle($spinner);
				}
			}, 0);
		});
		
		// If Live Update is not already active, turn it on
		setTimeout(function() {
			var pressed = $liveUpdate.attr('aria-pressed') === 'true';
			var isActiveClass = $liveUpdate.hasClass('oo-ui-buttonElement-active');
			if (!pressed && !isActiveClass) {
				$liveUpdate.trigger('click');
			}
		}, 50);
		
		return true;
	}
	
	// Social Activity function
	function addAutoRefreshSocialActivity($spinner) {
		var $container = $('.social-activity-filters__live-update-button');
		var $liveUpdate = $container;
		var checkboxId = 'autoRefreshToggleSA';
		
		if (!$liveUpdate.length || $('#' + checkboxId).length) {
			return false;
		}
		
		// Create Auto-refresh container and its children
		var $autoRefresh = $('<span class="autoRefreshActivity-container">')
		.append('<span id="' + checkboxId + '" class="autoRefreshActivity-checkbox checked"></span>')
		.append(
			$('<span class="autoRefreshActivity-text">')
				.text('Auto-refresh')
				.attr('title', 'Tick the checkbox to stop or start refreshing automatically.')
		);
		
		// Append the element after the container
		$autoRefresh.append($spinner);
		$container.after($autoRefresh);
		var $checkbox = $('#' + checkboxId);
		startSpinnerCycle($spinner, $checkbox);
		
		// Handle the click on the custom checkbox
		$checkbox.on('click', function() {
			$(this).toggleClass('checked');
			$liveUpdate.trigger('click');
			
			if ($(this).hasClass('checked')) {
				startSpinnerCycle($spinner, $checkbox);
			} else {
				stopSpinnerCycle($spinner);
			}
		});
		
		// Sync the custom checkbox when the Live Update button is clicked
		$liveUpdate.on('click', function() {
			setTimeout(function() {
				var isActiveClass = $liveUpdate.hasClass('social-activity-filters__live-update-button--active');
				var isChecked = isActiveClass;

				$checkbox.toggleClass('checked', isChecked);
				
				if (isChecked) {
					startSpinnerCycle($spinner, $checkbox);
				} else {
					stopSpinnerCycle($spinner);
				}
			}, 0);
		});
		
		// If Live Update is not already active, turn it on
		setTimeout(function() {
			var isActiveClass = $liveUpdate.hasClass('social-activity-filters__live-update-button--active');
			if (!isActiveClass) {
				$liveUpdate.trigger('click');
			}
		}, 50);
		
		return true;
	}
	
	// Wait for a while if Live Update button has not shown yet
	$(function() {
		mw.loader.using('jquery.spinner').then(function() {
			// Load jquery.spinner resource to provide default MediaWiki spinner
			// Create the spinner element
			var $spinner = $.createSpinner().addClass('autoRefreshActivity-spinner').hide();
			
			// Run addAutoRefreshSocialActivity first
			addAutoRefreshSocialActivity($spinner);
			
			// Run addAutoRefreshRecentChanges later
			var attempts = 0;
			var maxAttempts = 200;
			var rcAdded = false;
			
			var checkExist = setInterval(function() {
				if (!rcAdded) {
					rcAdded = addAutoRefreshRecentChanges($spinner);
				}
				
				if (rcAdded || ++attempts >= maxAttempts) {
					clearInterval(checkExist);
				}
			}, 100);
		});
	});
})();