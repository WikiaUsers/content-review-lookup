/* <pre class="flTruncateStart"></pre> */
$('pre.flTruncateStart').each(function() {
	var lenRemaining = this.dataset.truncateLen;
	if (lenRemaining) {
		if (typeof lenRemaining === 'string')
			lenRemaining = parseInt(lenRemaining);
	}
	else
		lenRemaining = 100;
	
	var removeLater = [];
	
	function isAlphabetic(ch) {
		return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
	}
	
	function truncateElement() {
		if (this.nodeType == 3) {
			// Text node
			if (lenRemaining <= 0)
				this.nodeValue = ''; //clear text
			else {
				var text = this.nodeValue;
				while (lenRemaining < text.length && isAlphabetic(text[lenRemaining]))
					lenRemaining++;

				if (text.trim().length > lenRemaining) {
					// Truncate this piece of text
					this.nodeValue = text.substring(0, lenRemaining) + "...";
					lenRemaining = 0;
				}
				else
					lenRemaining -= text.trim().length;
			}
		}
		else if (lenRemaining > 0) {
			// Truncate each child element
			$(this).contents().each(truncateElement);
		}
		else {
			// Remove this and any child elements
			removeLater.push(this);
		}
	}
	
	var n = this;
	while (!(n = $(n).next()).is('pre.flTruncateEnd'))
		n.each(truncateElement);
	
	for (var i = 0; i < removeLater.length; i++)
		$(removeLater[i]).remove();
});

/* <pre class="flTruncateEnd"></pre> */