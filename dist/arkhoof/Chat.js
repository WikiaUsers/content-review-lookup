@import "../../../../skins/oasis/css/mixins/border-radius";
@import "../../../../skins/oasis/css/mixins/gradient";
@import "../../../../skins/oasis/css/mixins/box-shadow";
@import "../../../../skins/oasis/css/core/reset";
@import "../../../../skins/oasis/css/core/color";
@import "../../../../skins/oasis/css/core/buttons";
@import "../../../../skins/oasis/css/core/typography";
@import "UserStatsMenu.scss";
 
$color-chat-gray: mix($color-text, $color-page);
$color-chat-you: mix($color-text, $color-page, 5);
 
$color-rail-headline-top: mix($color-text, $color-page, 5);
$color-rail-headline-bottom: mix($color-text, $color-page, 20);
$color-rail-headline-border: mix($color-text, $color-page, 35);
 
._avatar {
	border: 1px solid $color-page-border;
}
 
body {
	background: $color-body;
	color: $color-text;
	font-family: Helvetica, Arial, sans-serif;
	font-size: 13px;
	margin: 0;
}
 
textarea {
	font: inherit;
	font-family: Helvetica, Arial, sans-serif;
	line-height: normal;
}
 
// A visual indication that we are forcing the page to connect to the prod node server.
body.on-prod {
	background-color: yellow;
	&:before {
		content: "==NOTE: CONNECTED TO PROD NODE SERVER ==";
	}
}
 
a {
	color: $color-links;
	&:hover {
		text-decoration: underline;
	}
}
 
 
.wordmark {
	color: $color-links;
	font-size: 20px;
	line-height: 40px;
	margin-right: 150px;
	overflow: hidden;
	padding-left: 5px;
	text-overflow: ellipsis;
	white-space: nowrap;
	img {
		margin-top: 5px;
	}
	a:hover {
		text-decoration: none;
	}
}
 
.ChatHeader {
	@include border-radius-ne(5px);
	@include border-radius-nw(5px);
	background-color: $color-page;
	border: 1px solid $color-page-border;
	height: 40px;
	margin: 10px;
	position: relative;
	.User {
		border-left: 1px solid $color-page-border;
		height: 26px;
		padding-bottom: 2px;
		padding-top: 2px;
		position: absolute;
		right: 0;
		top: 5px;
		width: 113px;
		img {
			vertical-align: middle;
		}
		.username {
			font-weight: bold;
		}
		&.chat-mod, &.staff {
			.username:after {
				top: 1px;
			}
		}
	}
	.private {
		font-size: 16px;
		font-weight: bold;
		line-height: 45px;
		padding: 0 5px;
	}
}
 
.User {
	font-size: 11px;
	padding: 7px 5px 7px 32px;
	position: relative;
	img {
		@extend ._avatar;
		height: 22px;
		position: absolute;
		left: 5px;
		vertical-align: middle;
		width: 22px;
	}
	.username {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.details {
		font-size: 11px;
	}
	.status {
		display: none;
	}
	&.chat-mod .username {
		margin-right: 15px;
		&:after {
			content: url(http://images4.wikia.nocookie.net/friendshipislikeaboss/images/0/07/Chatmod_Logo.png);
			position: absolute;
			right: 5px;
			top: 5px;
		}
	}
	&.staff .username {
		margin-right: 15px;
		&:after {
			content: url(http://community.wikia.com/extensions/wikia/Chat/images/icon-staff.png);
			position: absolute;
			right: 5px;
			top: 5px;
		}
	}
	&.away {
		color: $color-chat-gray;
		.status {
			display: inline;
		}
	}
	.UserStatsMenu {
		display: none;	
	}
}	
 
 
.WikiaPage {
	@include border-radius-se(5px);
	@include border-radius-sw(5px);
	background-color: $color-page;
	border: 1px solid $color-page-border;
	bottom: 10px;
	color: $color-text;
	left: 10px;
	position: absolute;
	right: 10px;
	top: 55px;
}
 
.Chat {
	border-right: 1px solid $color-page-border;
	border-bottom: 1px solid $color-page-border;
	bottom: 50px;
	left: 0;
	line-height: 1.4em;
	overflow: auto;
	position: absolute;
	right: 150px;
	top: 0;
	line-height: 1.4em;
	ul {
		bottom: 0;
	}
	li {
		min-height: 32px; //28px image, 1px padding, 1px border
		padding: 18px 15px 16px 55px;
		position: relative;
	}
	.continued {
		margin-bottom: -15px;
		min-height: 0;
		padding-top: 0;
		top: -15px;
		.avatar {
			display: none;
		}
		.username {
			display: none;
		}
		.time {
			display: none;
		}
	}
	.avatar {
		@extend ._avatar;
		left: 15px;
		position: absolute;
		top: 20px;
	}
	.username {
		display: block;
		font-weight: bold;
		&:after {
			content: ":";
		}
	}
	.time {
		color: $color-chat-gray;
		float: right;
		font-size: 12px;
	}
	.message {
		white-space: pre-line;
	}
	.inline-alert {
		color: $color-chat-gray;
		font-weight: bold;
		min-height: 0;
		padding-bottom: 10px;
		padding-top: 10px;
		text-align: center;
		&:before {
			content: "~ ";
		}
		&:after {
			content: " ~";
		}
	}	
	.you {
		background: $color-chat-you;
	}
}
 
.Write {
	bottom: 0;
	height: 45px;
	left: 0;
	line-height: 30px;
	padding-left: 55px;
	position: absolute;
	right: 150px;
	img {
		@extend ._avatar;
		left: 7px;
		position: absolute;
	}
	[name="message"] {
		border: 1px solid $color-page-border;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		height: 3.3em;
		line-height: 1.4em;
		margin: 0;
		padding: 2px;
		resize: none;
		width: 100%;
	}
	input[type="submit"] {
		display: none;
	}
	&.blocked {
	   opacity: 0.3;
	}
}
 
.Rail {
	bottom: 0;
	overflow-y: auto;
	position: absolute;
	right: 0;
	top: 0;
	width: 150px;
	.User {
		padding-left: 47px;
		min-height: 22px;
		&:hover {
			background: $color-menu-highlight;
			cursor: pointer;
		}
		img {
			left: 20px;
		}
	}
	h1 {
		margin: 5px 0;
	}
	.public {
		height: 30px;
		line-height: 30px;
		padding: 3px 0 3px 13px;
		text-overflow: ellipsis;
		.chevron {
			border-width: 5px;
			border-color: black transparent transparent;
			border-style: solid;
			cursor: pointer;
			display: none;
			height: 0;
			left: 3px;
			margin: 0;
			position: absolute;
			top: 20px;
			width: 0;
			vertical-align: middle;
			&.closed {
				border-color: transparent transparent transparent black;
				left: 6px;
				top: 17px;				
			}
		}
		.wordmark {
			margin: 0;
			vertical-align: middle;
		}
	}
	.private {
		@include linear-gradient($color-rail-headline-bottom, top, $color-rail-headline-top, 0, $color-rail-headline-bottom, 100%);
		border-top: 1px solid $color-rail-headline-border;
		border-bottom: 1px solid $color-rail-headline-border;
		font-size: 11px;
		padding: 3px 2px 2px;
		display:none;
	}
	.selected {
		@include box-shadow(0, 0, 7px, darken($color-menu-highlight, 50%), true);
		background: $color-menu-highlight;
		.splotch {
			display:none;
		}	
	}
 
	.unread {
		.splotch {
			display: block;
		}
		.username:after {
			display: none;
		}
	}
 
	.blocked {
	    opacity: 0.3;
	}
 
	.splotch {
		@include border-radius(10px);
		@include linear-gradient(#dc0d0e, top, #e63031, 0, #dc0d0e, 50%, #e63031, 100%);
		background-clip: padding-box;
		border: 1px solid white;
		color: white;
		display: none;
		font-size: 9px;
		height: 12px;
		line-height: 13px;
		padding: 0 2px;
		position: absolute;
		right: 3px;
		text-align: center;
		top: 16px;
		min-width: 8px;
	}
}
.PrivateChatList {
	.splotch {
		top: 6px;
	}
}