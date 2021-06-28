$(document).ready(
    function () {
    	mw.util.addCSS('canvas#EnterTheMatrix { position: fixed; z-index: -1; width: 100%; height: 100%; }');
        $('body').prepend('<canvas id="EnterTheMatrix"></canvas>');
    }).ready(
    function () {
        const C = document.querySelector("canvas#EnterTheMatrix"),
            $ = C.getContext("2d"),
            W = (C.width = window.innerWidth),
            H = (C.height = window.innerHeight);

        const str = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я",
            matrix = str.split("");

        var font = 11,
            col = W / font,
            arr = [];

        for (var i = 0; i < col; i++) arr[i] = 1;

        function draw() {
            $.fillStyle = "rgba(0,0,0,.1)";
            $.fillRect(0, 0, W, H);
            $.fillStyle = "#0f0";
            $.font = font + "px system-ui";
            for (var i = 0; i < arr.length; i++) {
                var txt = matrix[Math.floor(Math.random() * matrix.length)];
                $.fillText(txt, i * font, arr[i] * font);
                if (arr[i] * font > H && Math.random() > 0.975) arr[i] = 0;
                arr[i]++;
            }
        }

        setInterval(draw, 50);
    }
);