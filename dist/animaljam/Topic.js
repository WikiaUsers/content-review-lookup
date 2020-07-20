// Copied from rinzler135.wikia.com/wiki/Mediawiki:Topic.js
// Created by Xytl
// Expanded by Mooziq

if (mw.config.get("wgCanonicalNamespace") == "Thread") {
    tags = [];
    var title = $(".msg-title a").text().replace(/\[(.+?)\]/g, function($0, $1) { tags.push($1) });
    var ptag = tags[0];
    switch (ptag) {
        case "Discussion":
            addNotification("This is a discussion thread", "You are free to debate ideas and ask questions, but please keep on topic.");
            break;
        case "Vote":
            addNotification("This is a voting thread", "Please only leave one reply indicating whether you support, oppose, or are neutral to the proposal, and a reason why. Questions should be directed to the creator of the thread privately.");
            break;
        case "PSA":
            addNotification("This is an announcement", "This thread is to alert wiki users to a particular situation. This is not a vote or a discussion, but you may wish to leave requests for clarification.");
            break;
        case "On Hold":
            addNotification("This thread is on hold", "This thread is currently locked. Please consult the initial post for the reason why.");
            break;
        case "Game":
            addNotification("This is a game thread", "Please follow the rules defined in the original post if you want to participate.");
            break;
        case "Commission":
            addNotification("This is a commission request", "Please carefully review what type of work the author is requesting and what they will reward for participation. If you do not trust the author of this thread for some reason, you should not participate. If this request involves submitting artwork, <b>it is HIGHLY RECOMMENDED that you add a significant watermark on your artwork to protect it from theft.</b>");
            break;
        case "Contest":
            addNotification("This is a contest thread", "Please carefully review the instructions for participation in the original post. If you do not trust the author of this thread for some reason, you should not participate. If this contest involves submitting artwork, <b>it is HIGHLY RECOMMENDED that you add a significant watermark on your artwork to protect it from theft.</b>");
            break;
        case "Giveaway":
            addNotification("This is a giveaway thread", "Please follow the rules defined in the original post if you want to participate. If you believe that the rules of the giveaway are unreasonable or unfair, please contact an active administrator.");
            break;
        default:
            break;
    }
}
 
function addNotification(title, text) {
    $('.replies').prepend('<li class="SpeechBubble message message-2" id="2" data-id="2225" data-is-reply="1" style="display: list-item;"> \
	<div class="speech-bubble-message"> \
		<div class="MiniEditorWrapper" data-min-height="100" data-max-height="400"> \
			<div class="editarea" data-space-type="editarea"> \
				<div class="msg-body" id="WallMessage_2225"> \
					<p><b>'+title+'</b><br/>'+text+'</p> \
				</div> \
			</div> \
		</div> \
	</div> \
</li>');
}