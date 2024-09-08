/* Cuenta regresiva animada */
// developed by Wim Barelds
// credits in http://git.wimbarelds.nl/TimeCircles/about.html

$("#DateCountdown").TimeCircles({
    "animation": "smooth",
    "bg_width": 1.2,
    "fg_width": 0.1,
    "circle_bg_color": "#60686F",
    "time": {
        "Days": {
            "text": "Días",
            "color": "#FFCC66",
            "show": true
        },
        "Hours": {
            "text": "Horas",
            "color": "#99CCFF",
            "show": true
        },
        "Minutes": {
            "text": "Minutos",
            "color": "#BBFFBB",
            "show": true
        },
        "Seconds": {
            "text": "Segundos",
            "color": "#FF9999",
            "show": true
        }
    }
});