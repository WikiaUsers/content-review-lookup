/**
 * Script: WarningUnsavedComment
 * Author: Marisa1980
 * Description: Trigger warning when users have not saved comment or message
				in Article Comment, Blog and Message Wall
 * Other: This script can not run on mobile site
**/

(function() {
	// STATE VARIABLE
	var isDirty = false;
	var dirtyEditors = [];
	var currentIndex = 0;
	
	if (typeof window.mw === 'undefined' || typeof window.jQuery === 'undefined') return;
	
    // DO NOT RUN IF IT IS IN UPLOAD FORM, VISUAL OR SOURCE EDITOR
	function isInsideExcludedContainer($element) {
		return $element.closest('#editform, #mw-htmlform-description, .wikiEditor-ui, .ve-init-mw-desktopArticleTarget').length > 0;
	}
	
	// UTILIZE CSS
	mw.util.addCSS(`
		.warning-unsaved-comment__container {
			display: none;
			opacity: 0;
			position: fixed;
			bottom: 50px;
			right: 10px;
		}
	`);
	
	// WARNING BOX
	var $warning = $(`
		<div id="warning-unsaved-comment" class="warning-unsaved-comment__container wds-banner-notification wds-warning">
			<div class="wds-banner-notification__icon">  
				<svg class="wds-icon wds-icon-small">  
					<use xlink:href="#wds-icons-alert-small"></use>
				</svg>
			</div>
			<span class="wds-banner-notification__text">You have unsaved comment! (click to jump)</span>
			<span class="wds-banner-notification__close">
				<svg class="wds-icon wds-icon-tiny">
					<use xlink:href="#wds-icons-close-tiny"></use>
				</svg>
			</span>
		</div>
	`);
	$('body').append($warning);
	
	// CHECK IF A TRACKED ELEMENT IS TRULY DIRTY
	function checkElementIsDirty(item) {
		var $el = $(item.el);
		
		if (!document.body.contains(item.el)) return false; 
		
		var txt = '';
		if ($el.is('textarea')) {
			txt = ($el.val() || '').trim();
		} else {
			txt = (typeof $el.text === 'function') ? ($el.text() || '').trim() : '';
		}
		
		return txt.length > 0;
	}
	
	// REMOVE VANISH OR EMPTY INPUT BOX
	function cleanDirtyEditors() {
		dirtyEditors = dirtyEditors.filter(checkElementIsDirty);
		
		isDirty = dirtyEditors.length > 0;
		if (currentIndex >= dirtyEditors.length) currentIndex = 0;
		return isDirty;
	}
	
	// UPDATE WARNING TEXT / SHOW/HIDE
	function updateWarningState(show) {
		var stillDirty = cleanDirtyEditors();
		
		if (show && stillDirty) {
			updateWarningText();
			if ($warning.css('display') === 'none') {
				$warning.css({ display: 'flex', opacity: 0 });
				requestAnimationFrame(function() { $warning.css('opacity', 1); });
			} else {
				$warning.css('opacity', 1);
			}
		} else {
			$warning.css('opacity', 0);
			$warning.one('transitionend', function() {
				if ($warning.css('opacity') === '0') {
					$warning.css('display', 'none');
				}
			});
		}
	}
    
    function toggleWarning(show) {
        updateWarningState(show);
    }
	
	function updateWarningText() {
		var $text = $warning.find('.wds-banner-notification__text');
		var commentCount = dirtyEditors.filter(function(item) { return item.type === "comment"; }).length;
		var messageCount = dirtyEditors.filter(function(item) { return item.type === "message"; }).length;
		
		var parts = [];
		if (commentCount > 0) {
			parts.push(`${commentCount} unsaved comment${commentCount > 1 ? "s" : ""}`);
		}
		if (messageCount > 0) {
			parts.push(`${messageCount} unsaved message${messageCount > 1 ? "s" : ""}`);
		}
		
		if (parts.length > 0) {
			$text.text(`You have ${parts.join(" and ")}! (click to jump)`);
		} else {
			$text.text("");
		}
	}
	
	// DETERMINE INPUT BOX TYPE
	function detectEditorType($prose) {
		if ($prose.closest('.MessageWall, .message-wall, #MessageWall, [data-messagewall]').length) {
			return 'message';
		}
		var $form = $prose.closest('.EditorForm, .EditorModal__content');
		if ($form.length && $form.find('input[data-test="editor-title-input"], input.EditorTitle_editor-title__iuwPi, input[placeholder*="title"]').length) {
			return 'message';
		}
		return 'comment';
	}
	
	// ProseMirror EDITOR FOR INPUT
	var inputTimer = null;
	$(document).on('input', '.ProseMirror, textarea', function() {
		var $this = $(this);
		
        if (isInsideExcludedContainer($this)) {
            return;
        }
		
		var text = $this.is('textarea') ? $this.val().trim() : $this.text().trim();
		var type = detectEditorType($this);
		var el = $this[0];
		
		var foundIndex = -1;
		for (var i = 0; i < dirtyEditors.length; i++) {
			if (dirtyEditors[i].el === el) { foundIndex = i; break; }
		}
		
		if (text.length > 0) {
			if (foundIndex === -1) {
				dirtyEditors.push({ el: el, type: type });
			} else {
				dirtyEditors[foundIndex].type = type;
			}
		} else {
			if (foundIndex !== -1) dirtyEditors.splice(foundIndex, 1);
		}
		
		isDirty = dirtyEditors.length > 0;
		if (currentIndex >= dirtyEditors.length) currentIndex = 0;
		
		if (inputTimer) clearTimeout(inputTimer);
		inputTimer = setTimeout(function() {
			toggleWarning(isDirty);
		}, 1000);
	});
	
	// MUTATION OBSERVER TO HANDLE DOM REMOVAL (Save/Cancel)
	var observer = new MutationObserver(function(mutations) {
		var editorsRemoved = false;
        
		mutations.forEach(function(mutation) {
			if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
				
				$(mutation.removedNodes).find('.ProseMirror, textarea').addBack('.ProseMirror, textarea').each(function() {
					var removedEl = this;
					var foundIndex = -1;
					for (var i = 0; i < dirtyEditors.length; i++) {
						if (dirtyEditors[i].el === removedEl) {
							foundIndex = i;
							break;
						}
					}
					
					if (foundIndex !== -1) {
						dirtyEditors.splice(foundIndex, 1);
						editorsRemoved = true; 
					}
				});
			}
		});
		
		if (editorsRemoved) {
			toggleWarning(cleanDirtyEditors());
		}
	});
	
	observer.observe(document.body, { childList: true, subtree: true });
	
	// CLICK HANDLER
	$(document).on('click', '.EditorForm__actions .wds-button, .Modal_content__95AHF .wds-button', function() {
		var $btn = $(this);
		var btnText = $btn.text().trim().toLowerCase();
		
		var isActionableButton = (btnText === 'post' || btnText === 'save' || btnText === 'cancel');
		
		if (isActionableButton) {
			setTimeout(function() {
				toggleWarning(cleanDirtyEditors());
			}, 400); 
		}
	});
	
	// CLICK THE WARNING AND CYCLE THROUGH THE INPUT BOX
	$warning.on('click', function(event) {
        if ($(event.target).closest('.wds-banner-notification__close').length) return;
        
		cleanDirtyEditors();
		
		if (dirtyEditors.length > 0) {
			var $target = $(dirtyEditors[currentIndex].el);
			$('html, body').animate({
				scrollTop: $target.offset().top - 100
			}, 400);
			$target.focus();
			
			currentIndex = (currentIndex + 1) % dirtyEditors.length;
			updateWarningText();
		}
	});
	
	// CLOSE THE WARNING
	$warning.on('click', '.wds-banner-notification__close', function(e) {
		e.stopPropagation();
		toggleWarning(false);
	});
	
	// NATIVE UNLOAD WARNING
	window.addEventListener("beforeunload", function(e) {
		cleanDirtyEditors(); 
		if (isDirty) {
			e.preventDefault();
			e.returnValue = "";
			return "";
		}
	});
})();