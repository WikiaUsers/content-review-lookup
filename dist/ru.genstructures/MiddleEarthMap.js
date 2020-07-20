var map = document.getElementById("worldmap");
if (map) {
    map.offX = -500;
    map.offY = -500;
    map.dragX = 0;
    map.dragY = 0;
    map.newX = 0;
    map.newY = 0;
    map.zoom = 1.0;
    var dragStart = function(e) {
        e.preventDefault();
        map.dragX = e.clientX;
        map.dragY = e.clientY;
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", update);
        return false;
    }
    var dragEnd = function(e) {
        e.preventDefault();
        if (map.dragX == e.clientX && map.dragY == e.clientY) {
            var x = Math.floor(e.clientX * map.zoom - map.offX);
            var y = Math.floor(e.clientY * map.zoom - map.offY);
            alert("Single click at position "+x+"|"+y);
            document.removeEventListener("mousemove", update);
            document.removeEventListener("mouseup", dragEnd);
            return false;
        }
        map.offX = map.newX;
        map.offY = map.newY;
        document.removeEventListener("mousemove", update);
        document.removeEventListener("mouseup", dragEnd);
        return false;
    }
    var update = function(e) {
        map.newX = map.offX + e.clientX - map.dragX;
        map.newY = map.offY + e.clientY - map.dragY;
        var newpos = map.newX.toString() + "px " + map.newY.toString() + "px";
        map.style.backgroundPosition = newpos;
    }
    var zoom = function(e) {
        e.preventDefault();
        var delta = e.deltaY / 3;
        var old_zoom = map.zoom;
        map.zoom -= delta * (map.zoom / 15);
        if (map.zoom < map.clientWidth / 3200 * 2) {
            map.zoom = map.clientWidth / 3200 * 2;
            return false;
        }
        if (map.zoom < map.clientHeight / 4000 * 2) {
            map.zoom = map.clientHeight / 4000 * 2;
            return false;
        }
        if (map.zoom > 3.0) {
            map.zoom = 3.0;
            return false;
        }
        var sizeX = 3200 * map.zoom;
        var sizeY = 4000 * map.zoom;
        var newsize = "" + sizeX + "px " + sizeY + "px";
        map.style.backgroundSize = newsize;
        map.offX *= map.zoom / old_zoom;
        map.offY *= map.zoom / old_zoom;
        map.offX += 0.1 * map.zoom * delta * (e.clientX - (map.clientWidth / 2));
        map.offY += 0.1 * map.zoom * delta * (e.clientY - (map.clientHeight / 2));
        var newpos = "" + map.offX + "px " + map.offY + "px";
        map.style.backgroundPosition = newpos;
        return false;
    }
    map.addEventListener("mousedown", dragStart);
    map.addEventListener("wheel", zoom);
}