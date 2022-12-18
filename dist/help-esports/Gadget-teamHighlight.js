mw.hook('wikipage.content').add( function () {
	
	var $teamhighlight = $('.teamhighlight');
	var $teamhighlighter = $('.teamhighlighter');
	var currentTeamClicked = false;
	window.teamHighlightIsDisabled = false;
	
	function highlight(team) {
		if (currentTeamClicked || (window.teamHighlightIsDisabled)) return;
		$('.teamhighlight[data-teamhighlight="' + team + '"]').each(function() {
			$(this).addClass('team-highlighted');
		});
	}
	
	function unhighlight() {
		if (currentTeamClicked || (window.teamHighlightIsDisabled)) return;
		$teamhighlight.each(function() {
			$(this).removeClass('team-highlighted','');
		});
	}
	
	$teamhighlighter.each(function() {
		$(this).hover(function() {
			highlight($(this).attr('data-teamhighlight'))
		},
		unhighlight);
		
		$(this).click(function() {
			if (window.teamHighlightIsDisabled) return;
			if (currentTeamClicked) {
				currentTeamClicked = false;
				unhighlight();
				highlight($(this).attr('data-teamhighlight'));
			}
			else {
				currentTeamClicked = $(this).attr('data-teamhighlight');
			}
		});
	});
	
	$('.group-highlighter').each(function() {
		// we might be firing a 2nd time because of something lazily loaded
		$(this).off('click');
		$(this).click(function(e) {
			e.stopPropagation();
			if ($(this).hasClass('group-highlighter-active')) {
				window.teamHighlightIsDisabled = false;
				$(this).removeClass('group-highlighter-active');
				$('.team-highlighted').removeClass('team-highlighted');
				return;
			}
			$('.group-highlighter-active').removeClass('group-highlighter-active');
			$(this).addClass('group-highlighter-active');
			window.teamHighlightIsDisabled = true;
			currentTeamClicked = false;
			$('.team-highlighted').removeClass('team-highlighted');
			$('[data-group="' + $(this).attr('data-group-highlighter') + '"]' ).addClass('team-highlighted');
		});
	});
	
});

// highlighting for opponents in crossboxes
// highligting for rows is taken care of by the general team highlighter
$(function() {
	var $crossboxCells = $('.crossbox-cell')
	
	function highlight(team) {
		$('[data-crossbox-highlight-vs="' + team + '"]').addClass('team-vs-highlighted');
	}
	
	function unhighlight() {
		$crossboxCells.removeClass('team-vs-highlighted','');
	}
	
	$crossboxCells.hover(function() {
		highlight($(this).attr('data-crossbox-highlight-vs'));
	},
	unhighlight);

});

$(function() {
	
	function unhighlight() {
		$('tr.multirow-highlighter td.highlighted').removeClass('highlighted','');
	}
	$('tr.multirow-highlighter').hover(function() {
		$(this).closest('table').find($('[data-highlight-row="' + $(this).attr('data-highlight-row') + '"] td')).each(function() {
			$(this).addClass('highlighted');
		});
	},
	unhighlight);
});