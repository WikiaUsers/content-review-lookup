/* All JavaScript here will be loaded for users of the mobile site */
/* ##################################################################################### */
/* ### Auto-hide empty weapon mod table columns                                      ### */
/* ### ----------------------------------------------------------------------------  ### */
/* ### Description: Hides empty columns in Fallout 4 & 76 weapon mod tables          ### */
/* ### Credit:   Scratchy1024                                                        ### */
/* ##################################################################################### */
(function hideEmptyModTableColumns() {
  var tableArray = document.getElementsByClassName("weaponmod-fallout76"); //get all tables with the weaponmod-fallout76 class
  for (var ta = 0, tableFo76; tableFo76 = tableArray[ta]; ta++ ){ //for each mod table
	  for (var ia = 0; ia < tableFo76.rows[2].cells.length; ia++) { //for each column
	    var isHiddenA = true; //Assume there's no data in the column
	    for (var ja = 3; ja < tableFo76.rows.length; ja++) { //iterate down the rows (skip first 3 rows, mod slot, headers, and a hidden <td>)
	      if (tableFo76.rows[ja].cells[ia].innerText != "–") { //Once we hit data, i.e. a non "-" value, don't hide the column
	        isHiddenA = false; //we found data in the column, don't hide
	      }
	    }
	    if (isHiddenA) {
	      for (var ka = 2; ka < tableFo76.rows.length; ka++) { //iterate down the current column (start at 2 to hide headers)
	        tableFo76.rows[ka].cells[ia].style.display = 'none'; //hide it
	      }
	    }
	  }
  }
  tableArray = document.getElementsByClassName("weaponmod-fallout4"); //get all tables with the weaponmod-fallout4 class
  for (var tb = 0, tableFo4; tableFo4 = tableArray[tb]; tb++ ){
	  for (var ib = 0; ib < tableFo4.rows[2].cells.length; ib++) {
	    var isHiddenB = true;
	    for (var jb = 1; jb < tableFo4.rows.length; jb++) { //iterate down the rows (skip first row, headers)
	      if (tableFo4.rows[jb].cells[ib].innerText != "–") {
	        isHiddenB = false;
	      }
	    }
	    if (isHiddenB) {
	      for (var kb = 0; kb < tableFo4.rows.length; kb++) {
	        tableFo4.rows[kb].cells[ib].style.display = 'none';
	      }
	    }
	  }
  }
})