;(function() {
    var grid = document.querySelector("table#island-grid.placeable");
    if (grid === null) return;
    
    var boxSelector = document.createElement("div");
    boxSelector.id = "island-grid-box-selector";
    boxSelector.classList.add("island-grid-box-selector");

    var boxSizes = [
        "1x1", "2x2", "3x3", "4x4", "5x5", "6x6", "7x7", "8x8", "9x9", "15x15"
    ];

    boxSizes.forEach(function (size) {
		var box = document.createElement("div");
		box.classList.add("island-grid-box");
		box.dataset.size = size;
		box.textContent = size;
		boxSelector.appendChild(box);
	});

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
    var isDragging = false;
    
    var objectColor = 'lightblue';
    var placeableColor = 'lightgreen';
    var collisionColor = 'lightcoral';

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
        isDragging = true;
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
            
            if(!canPlace)
                e.target.style.cursor = "no-drop";

            applyHoverClasses(startRow, startCol, selectedSize[0], selectedSize[1], canPlace);
        }
    });
    
    grid.addEventListener("mouseup", function (e) {
        if (!draggedElement) return;
        isDragging = false;
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

    grid.addEventListener("click", function (e) {
        var cell = e.target.closest("td");
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation();
            var startRow = cell.parentNode.rowIndex;
            var startCol = cell.cellIndex;
            removeObject(startRow, startCol);
            return;
        }
        isDragging = false;
    });

    grid.addEventListener("mousedown", function (e) {
        var cell = e.target.closest("td");
        
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation();
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
        } else if (isDragging) {
            cell.style.cursor = "move";
        } else {
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
        var color = canPlace ? placeableColor : collisionColor;
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
                cell.style.backgroundColor = objectColor;
            }
        });
        currentColors.clear();
    }

    function placeObject(startRow, startCol, width, height) {
        var objectId = generateObjectId();
        var objectCells = [];
        
        for (var r = startRow; r < startRow + height; r++) {
            for (var c = startCol; c < startCol + width; c++) {
                var cell = grid.rows[r].cells[c];
                cell.classList.add("occupied");
                cell.style.backgroundColor = objectColor;
                cell.dataset.objectId = objectId;
                currentColors.set(cell, objectColor);
                objectCells.push(cell);
            }
        }
        
        applyBorders(objectCells, startRow, startCol, width, height);

        var deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            removeObject(startRow, startCol);
        });

        grid.rows[startRow].cells[startCol].appendChild(deleteBtn);

        objects.set(objectId, {
		  startRow: startRow,
		  startCol: startCol,
		  width: width,
		  height: height
		});
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
    
    function applyBorders(objectCells, startRow, startCol, width, height) {
        for (var cellidx in objectCells) {
            var cell = objectCells[cellidx];
            var r = cell.parentNode.rowIndex;
            var c = cell.cellIndex;

            // Reset borders first
            cell.style.border = "none";

            // Apply top border
            if (r === startRow) {
                cell.style.borderTop = "2px solid black";
            }
            // Apply bottom border
            if (r === startRow + height - 1) {
                cell.style.borderBottom = "2px solid black";
            }
            // Apply left border
            if (c === startCol) {
                cell.style.borderLeft = "2px solid black";
            }
            // Apply right border
            if (c === startCol + width - 1) {
                cell.style.borderRight = "2px solid black";
            }
        }
    }
})();