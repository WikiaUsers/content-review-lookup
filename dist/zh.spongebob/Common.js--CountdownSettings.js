/* Any JavaScript here will be loaded for all users on every page load. */
$("#DateCountdown").TimeCircles({
	"animation": "ticks",
	"bg_width": 1,
	"fg_width": 0.13333333333333333,
	"circle_bg_color": "#60686F",
	"time": {
		"天": {
			"text": "天",
			"color": "#FFCC66",
			"show": true
		},
		"時": {
			"text": "時",
			"color": "#99CCFF",
			"show": true
		},
		"分": {
			"text": "分",
			"color": "#BBFFBB",
			"show": true
		},
		"秒": {
			"text": "秒",
			"color": "#FF9999",
			"show": true
		}
	}
});