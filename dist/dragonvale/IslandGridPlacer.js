;(function() {
    var grid = document.querySelector("table#island-grid.placeable");
    var maxBoxSize = 9;
    var boxSelector = document.createElement("div");
    boxSelector.id = "island-grid-box-selector";
    boxSelector.classList.add("island-grid-box-selector");

    for (var size = 1; size <= maxBoxSize; ++size) {
        var box = document.createElement("div");
        box.classList.add("island-grid-box");
        box.dataset.size = size + "x" + size;
        box.textContent = size + "x" + size;
        boxSelector.appendChild(box);
    }

    grid.parentNode.insertBefore(boxSelector, grid.nextSibling);

    var draggedElement = null;
    var selectedSize = null;
    var startCell = null;
    var originalColors = new Map();
    var currentColors = new Map();
    var lastValidPosition = null;
    var isMovingExisting = false;
    var objects = new Map();
    var clickOffset = { row: 0, col: 0 };

    boxSelector.addEventListener("mousedown", function (e) {
        if (e.target.classList.contains("island-grid-box")) {
            draggedElement = e.target;
            selectedSize = e.target.dataset.size.split("x").map(Number);
            isMovingExisting = false;
            clickOffset.row = 0;
            clickOffset.col = 0;
        }
    });

    grid.addEventListener("mousemove", function (e) {
        if (!draggedElement) return;

        clearHoverClasses();

        var cell = e.target;
        if (cell.tagName === "TD") {
            var startRow = cell.parentNode.rowIndex;
            var startCol = cell.cellIndex;

            if (isMovingExisting) {
                startRow -= clickOffset.row;
                startCol -= clickOffset.col;
            }

            var canPlace = checkCanPlace(startRow, startCol, selectedSize[0], selectedSize[1]);

            applyHoverClasses(startRow, startCol, selectedSize[0], selectedSize[1], canPlace);
        }
    });
    
    grid.addEventListener("mouseup", function (e) {
        if (!draggedElement) return;

        var cell = e.target;
        if (cell.tagName === "TD") {
            var startRow = cell.parentNode.rowIndex;
            var startCol = cell.cellIndex;

            if (isMovingExisting) {
                startRow -= clickOffset.row;
                startCol -= clickOffset.col;
            }

            var canPlace = checkCanPlace(startRow, startCol, selectedSize[0], selectedSize[1]);

            if (canPlace) {
                if (isMovingExisting && startCell) {
                    removeObject(startCell.row, startCell.col);
                }
                placeObject(startRow, startCol, selectedSize[0], selectedSize[1]);
                lastValidPosition = { row: startRow, col: startCol };
            } else if (isMovingExisting && lastValidPosition) {
                placeObject(lastValidPosition.row, lastValidPosition.col, selectedSize[0], selectedSize[1]);
            }
        }

        clearHoverClasses();
        draggedElement = null;
        selectedSize = null;
        isMovingExisting = false;
    });

    grid.addEventListener("mousedown", function (e) {
        var cell = e.target.closest("td");
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation();
            var startRow = cell.parentNode.rowIndex;
            var startCol = cell.cellIndex;
            removeObject(startRow, startCol);
            return;
        }

        if (cell && cell.classList.contains("occupied")) {
            var objectId = cell.dataset.objectId;
            if (objectId) {
                var object = objects.get(objectId);
                if (object) {
                    var clickedRow = cell.parentNode.rowIndex;
                    var clickedCol = cell.cellIndex;
                    clickOffset.row = clickedRow - object.startRow;
                    clickOffset.col = clickedCol - object.startCol;
                    selectedSize = [object.width, object.height];
                    draggedElement = cell;
                    startCell = { row: object.startRow, col: object.startCol };
                    lastValidPosition = { row: object.startRow, col: object.startCol };
                    removeObject(object.startRow, object.startCol);
                    isMovingExisting = true;
                }
            }
        }
    });

    grid.addEventListener("mouseover", function (e) {
        var cell = e.target.closest("td");
        if (e.target.classList.contains("delete-btn")) {
            e.target.style.cursor = "pointer";
        } else if (cell && cell.classList.contains("occupied")) {
            cell.style.cursor = "move";
        } else if (cell) {
            cell.style.cursor = "default";
        }
    });


    function checkCanPlace(startRow, startCol, width, height) {
        for (var r = startRow; r < startRow + height; r++) {
            for (var c = startCol; c < startCol + width; c++) {
                if (
                    r >= grid.rows.length ||
                    c >= grid.rows[0].cells.length ||
                    !grid.rows[r].cells[c].classList.contains("land") ||
                    grid.rows[r].cells[c].classList.contains("occupied")
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    function applyHoverClasses(startRow, startCol, width, height, canPlace) {
        var color = canPlace ? "lightgreen" : "lightcoral";
        for (var r = startRow; r < startRow + height; r++) {
            for (var c = startCol; c < startCol + width; c++) {
                if (r < grid.rows.length && c < grid.rows[0].cells.length) {
                    var cell = grid.rows[r].cells[c];
                    if (!originalColors.has(cell)) {
                        originalColors.set(cell, cell.style.backgroundColor);
                    }
                    currentColors.set(cell, color);
                    cell.style.backgroundColor = color;
                }
            }
        }
    }

    function clearHoverClasses() {
        currentColors.forEach(function (color, cell) {
            if (!cell.classList.contains("occupied")) {
                cell.style.backgroundColor = originalColors.get(cell);
            } else {
                cell.style.backgroundColor = "gray";
            }
        });
        currentColors.clear();
    }

    function placeObject(startRow, startCol, width, height) {
        var objectId = generateObjectId();
        for (var r = startRow; r < startRow + height; r++) {
            for (var c = startCol; c < startCol + width; c++) {
                var cell = grid.rows[r].cells[c];
                cell.classList.add("occupied");
                cell.style.backgroundColor = "gray";
                cell.dataset.objectId = objectId;
                currentColors.set(cell, "gray");
                cell.style.border = getBorderStyle(r, c, startRow, startCol, width, height);
            }
        }

        var deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            removeObject(startRow, startCol);
        });

        grid.rows[startRow].cells[startCol].appendChild(deleteBtn);

        objects.set(objectId, { startRow, startCol, width, height });
    }

    function removeObject(startRow, startCol) {
        var objectId = grid.rows[startRow].cells[startCol].dataset.objectId;
        if (objectId && objects.has(objectId)) {
            var object = objects.get(objectId);
            for (var r = object.startRow; r < object.startRow + object.height; r++) {
                for (var c = object.startCol; c < object.startCol + object.width; c++) {
                    var cell = grid.rows[r].cells[c];
                    cell.classList.remove("occupied");
                    cell.style.border = "";
                    var deleteBtn = cell.querySelector(".delete-btn");
                    if (deleteBtn) {
                        cell.removeChild(deleteBtn);
                    }
                    var originalColor = originalColors.get(cell);
                    if (originalColor) {
                        cell.style.backgroundColor = originalColor;
                        currentColors.set(cell, originalColor);
                    }
                    delete cell.dataset.objectId;
                }
            }
            objects.delete(objectId);
        }
    }

    function generateObjectId() {
        return 'object-' + Math.random().toString(36).substr(2, 9);
    }

    function getBorderStyle(r, c, startRow, startCol, width, height) {
        var borderStyle = "";
        if (r === startRow) borderStyle += "2px solid black "; // top
        else borderStyle += "0px none ";
        if (c === startCol + width - 1) borderStyle += "2px solid black "; // right
        else borderStyle += "0px none ";
        if (r === startRow + height - 1) borderStyle += "2px solid black "; // bottom
        else borderStyle += "0px none ";
        if (c === startCol) borderStyle += "2px solid black"; // left
        else borderStyle += "0px none";
        return borderStyle;
    }
})();