// no parrots were harmed while making this script
$(document).ready(function() {
var data = {},
	fn = {};
console.log(JSON.parse(JSON.stringify(ChatView.prototype.emoticonMapping._settings)));
/* ========================== *\
	# function
\* ========================== */

// create modal
fn.createModal = function() {
	data.modal = $(
		`<nav id="emoticon-selection-wrapper">
			<img src="https://images.wikia.nocookie.net/clubpenguin/images/d/d2/Laugh.png" id="emoticon-selection-heh" />
			<nav id="emoticon-selection">
				<h3>Emoticon selection</h3>
				<div id="emoticon-selection-list">
				</div>
			</nav>
		</nav>`
	);
	var h3 = $(data.modal).find("h3"),
		f5 = $('<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/View-refresh.svg/20px-View-refresh.svg.png" />').click(function() {
			fn.updateEmoticonList();
		}).appendTo(h3);
	$("body").append(data.modal);
	console.log(data.modal[0].cloneNode(true));
	fn.updateEmoticonList();
	console.log(data.modal[0].cloneNode(true));
}

// add css
fn.addCSS = function() {
	data.css = `
		#emoticon-selection-wrapper {
			position: fixed;
			bottom: 59px;
			right: 193px;
			z-index: 100;
		}
		#emoticon-selection {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 240px;
			height: 320px;
			margin: 0;
			padding: 0;
			visibility: hidden;
			background: #fafafa;
			border: 1px solid #ccc;
		}
		#emoticon-selection-heh:hover + #emoticon-selection, #emoticon-selection:hover {
			visibility: visible;
		}
		#emoticon-selection h3 {
			border-bottom: 1px solid #333;
			font-size: 20px;
		}
		#emoticon-selection h3 img {
			cursor: pointer;
		}
		#emoticon-selection-list {
			height: 296px;
			overflow-y: scroll;
		}
		#emoticon-selection-list span {
			display: inline-flex;
			width: 32px;
			height: 32px;
			align-items: center;
			justify-content: center;
			background: linear-gradient(to bottom, #daefff, #bcddff);
			border: 1px solid #bcddfc;
			border-radius: 4px;
			vertical-align: middle;
			cursor: pointer;
		}
		#emoticon-selection-list img {
			max-width: 28px;
			max-height: 28px;
			opacity: 0.85;
		}
		#emoticon-selection-list img:hover {
			opacity: 1;
		}
	`;
	mw.util.addCSS(data.css);
}
fn.updateEmoticonList = function() {
    console.log("updateEmoticonList -- start");
    console.log(JSON.parse(JSON.stringify(ChatView.prototype.emoticonMapping._settings)));
	var list = $(data.modal).find("#emoticon-selection-list"),
		a = ChatView.prototype.emoticonMapping._settings,
		b, // url (a[b] = {...})
		c; // emoticon
	$(list).html("");
	for (b in a) {
		c = $('<span><img /></span>');
		$(c).click(function() {
			$('[name="message"]').val($('[name="message"]').val() + " " + $(this).attr("data-trigger"));
		}).attr({
			"data-trigger": a[b][0]
		}).find("img").attr({
			"src": b
		});
		$(list).append(c);
	}
    console.log("updateEmoticonList -- end");
}


/* ========================== *\
	# function
\* ========================== */

fn.addCSS();
fn.createModal();


});