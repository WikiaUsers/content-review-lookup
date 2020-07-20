if (mw.config.get("wgCanonicalNamespace") == "Thread") {
    tags = [];
    var title = $(".msg-title a").text().replace(/\[(.+?)\]/g, function($0, $1) { tags.push($1) });
    var ptag = tags[0];
    switch (ptag) {
        case "Discussion":
            addNotification("<b>This is a discussion thread</b><br/>You are free to debate ideas and ask questions, but please keep on topic.");
            break;
        case "Vote":
            addNotification("<b>This is a voting thread</b><br/>Please only leave one reply indicating whether you support, oppose, or are neutral to the proposal, and a reason why. Questions should be directed to the creator of the thread privately.");
            break;
        default:
            break;
    }
}

function addNotification(text) {
    $('.replies').prepend('<li class="SpeechBubble message message-2" id="2" data-id="2225" data-is-reply="1" style="display: list-item;"> \
	<div class="speech-bubble-message"> \
		<div class="MiniEditorWrapper" data-min-height="100" data-max-height="400"> \
			<div class="editarea" data-space-type="editarea"> \
				<div class="msg-body" id="WallMessage_2225"> \
					<p>'+text+'</p> \
				</div> \
			</div> \
		</div> \
	</div> \
</li>');
}