$( function () {
	$('span.mw-rollback-link').click(function(e) {
		e.preventDefault();
		var $rblink = $(this);
		var href = this.getElementsByTagName('a')[0].href;
		this.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Loading.gif" style="vertical-align: baseline;" height="15" width="15" border="0" alt="Rollingback..." />';
		$.ajax({
			url: href,
			success: function() {
				$rblink.text(function (i, val) {return val + '[reverted]';});
			},
			error: function() {
				$rblink.text(function (i, val) {return val + '<span style="color: red">[rollback failed]</span>';});
			}
		});
	});
});