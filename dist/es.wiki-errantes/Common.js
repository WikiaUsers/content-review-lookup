<script>
(function() {
    function actualizar() {
        var ahora = new Date().getTime();
        var destino = new Date("2026-03-03T00:00:00Z").getTime();
        var dif = destino - ahora;

        if (dif <= 0) {
            document.getElementById("reloj-midnight").innerHTML = "¡YA DISPONIBLE!";
            return;
        }

        var d = Math.floor(dif / (1000 * 60 * 60 * 24));
        var h = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((dif % (1000 * 60)) / 1000);

        document.getElementById("reloj-midnight").innerHTML = d + "d " + h + "h " + m + "m " + s + "s";
    }
    actualizar();
    setInterval(actualizar, 1000);
})();
</script>