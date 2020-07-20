// Emoticons JS - (Cita de origen: Club Penguin Wiki ingles)

$(function() {
var data = {},
	fn = {};

// Creando una ventana
fn.createModal = function() {
	data.modal = $(
		`<nav id="emoticon-selection-wrapper">
		  <span style="font-size: 30px;" class="fa fa-smile-o" id="emoticon-selection-heh"></span>
			<nav id="emoticon-selection">
				<h3>Lista de Emoticones </h3>
				<div id="emoticon-selection-list">
				</div>
			</nav>
		</nav>`
	);
	var h3 = $(data.modal).find("h3"),
		f5 = $('<i class="fa fa-refresh" style="cursor: pointer;"></i>').click(function() {
			fn.updateEmoticonList();
		}).appendTo(h3);
	$("body").append(data.modal);
	fn.updateEmoticonList();
}

// Importando CSS
fn.addCSS = function() {
	data.css = `
	body.ChatWindow #emoticon-selection-wrapper {
        position: absolute !important;
        bottom: 63px !important;
        right: 164px !important;
        background: #444 !important;
        border-radius: 0px 0px 0px 10px;
        width: 25px !important;
        height: 25px !important;
        padding: 1px 5px 7px 5px !important;
        z-index: 100 !important;
    }

    #emoticon-selection {
		position: absolute;
		bottom: 42px;
		right: -9px;
		width: 240px;
		height: 320px;
		margin: 0;
        visibility: hidden;
		padding: 5px;
		background: #444;
        border-radius: 5px;
		border: 2px solid #666;
	}

    #emoticon-selection:after {
		border-color: #666 transparent transparent transparent ;
        border-style: solid;
        border-width: 16px;
        content: "";
        position: absolute;
        right: 9px;
        bottom: -33px;
	}

	#emoticon-selection-heh:hover + #emoticon-selection, #emoticon-selection:hover {
		visibility: visible;
	}
	
	#emoticon-selection h3 {
		border-bottom: 2px solid #555;
		font-size: 20px;
        margin: 0px -5px 10px -5px;
        padding: 0px 0px 3px 5px;
	}
	
	#emoticon-selection h3 img {
		cursor: pointer;
	}
	
	#emoticon-selection-list {
		height: 280px;
		overflow-y: scroll;
	}

    #emoticon-selection-list::-webkit-scrollbar-track {
		background-color: #333 !important;
        border-radius: 50px !important;
    }

    #emoticon-selection-list::-webkit-scrollbar {
		width: 6px !important;
        border-radius: 50px !important;
    }

    #emoticon-selection-list::-webkit-scrollbar-thumb {
		border-radius: 50px !important;
		background-color: #222 !important;
    }

	#emoticon-selection-list span {
		display: inline-flex;
		width: 32px;
		height: 32px;
		align-items: center;
		justify-content: center;
		background: #333;
		border: 2px solid #444;
		border-radius: 0px;
		vertical-align: middle;
		cursor: pointer;
	}
	
	#emoticon-selection-list img {
		max-width: 28px;
		max-height: 28px;
		opacity: 0.75;
	}
	
	#emoticon-selection-list img:hover {
		opacity: 1;
	}
	
	`;
	mw.util.addCSS(data.css);
}
fn.updateEmoticonList = function() {
	var list = $(data.modal).find("#emoticon-selection-list"),
		a = ChatView.prototype.emoticonMapping._settings,
		b, // url (a[b] = {...})
		c; // Emoticones
	$(list).html("");
	for (b in a) {
		c = $('<span><img /></span>');
		$(c).click(function() {
			$('.form-block [name="message"]').val($('.form-block [name="message"]').val() + " " + $(this).attr("data-trigger"));
		}).attr({
			"data-trigger": a[b][0]
		}).find("img").attr({
			"src": b
		});
		$(list).append(c);
	}
}

fn.addCSS();
fn.createModal();
});