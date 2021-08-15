/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

/**
 * Add thick borders and radius around article-table and wikitable.
 */
function articleTableBorders(t) {
	// Get number of rows and columns
	var rows = t.rows, nCols = 0, nRows = rows.length;
	if (nRows > 0) {
		var cells = rows[0].cells;
		for (var i = 0, len = cells.length; i < len; ++i) {
			nCols += cells[i].colSpan;
		}
	}
	// Give a set of index to each table cell
	// xspan = [xpos_start xpos_end] yspan = [ypos_start ypos_end]
	var m = [];
	for(var y = 0, row; row = rows[y]; y++) {
		for(var x = 0, cell; cell = row.cells[x]; x++) {
			var xx = x, tx, ty, xspan = [], yspan = [];
			for(; m[y] && m[y][xx]; ++xx) {};
			xspan.push(xx);
			yspan.push(y);
			for(tx = xx; tx < xx + cell.colSpan; ++tx) {
				for(ty = y; ty < y + cell.rowSpan; ++ty) {
					if( !m[ty] ) {
						m[ty] = [];
					}
					m[ty][tx] = true;
				}
			}
			xspan.push(tx);
			yspan.push(ty);
			// Add style
			var borderColor = "var(--td-border-color)";
			if(cell.tagName == "TH") {
				borderColor = "var(--th-border-color)";
			}
			if(xspan.includes(0)) {
				cell.style.cssText += "border-left:var(--ext-border-width) solid " + borderColor;
			}
			if(xspan.includes(nCols)) {
				cell.style.cssText += "border-right:var(--ext-border-width) solid " + borderColor;
			}
			if(yspan.includes(0)) {
				cell.style.cssText += "border-top:var(--ext-border-width) solid " + borderColor;
				if(xspan.includes(0)) {
					cell.style.borderTopLeftRadius = "var(--table-border-radius)";
				}
				if(xspan.includes(nCols)) {
					cell.style.borderTopRightRadius = "var(--table-border-radius)";
				}
			}
			if(yspan.includes(nRows)) {
				cell.style.cssText += "border-bottom:var(--ext-border-width) solid " + borderColor;
				if(xspan.includes(0)) {
					cell.style.borderBottomLeftRadius = "var(--table-border-radius)";
				}
				if(xspan.includes(nCols)) {
					cell.style.borderBottomRightRadius = "var(--table-border-radius)";
				}
			}
		}
	}
}
$('.article-table, .wikitable').each(function(i, t) {
	articleTableBorders(t);
});