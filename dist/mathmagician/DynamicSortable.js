// JavaScript code for the [[DynamicSortable]] page
(function () {
	var clicked = false;
	var button = document.createElement("button");
	button.textContent = "Add rows";
	button.onclick = function () {
		if (!clicked) {
			clicked = true;
			var table = document.getElementsByClassName("sortable")[0];
			var tr, td;
			
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.textContent = "Jim";
			tr.appendChild(td);
			td = document.createElement("td");
			td.textContent = "100";
			tr.appendChild(td);
			td = document.createElement("td");
			td.textContent = "\"100\"";
			tr.appendChild(td);
			table.firstElementChild.nextSibling.appendChild(tr);
			
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.textContent = "Zack";
			tr.appendChild(td);
			td = document.createElement("td");
			td.textContent = "25";
			tr.appendChild(td);
			td = document.createElement("td");
			td.textContent = "\"25\"";
			tr.appendChild(td);
			table.firstElementChild.nextSibling.appendChild(tr);
			
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.textContent = "Alice";
			tr.appendChild(td);
			td = document.createElement("td");
			td.textContent = "1";
			tr.appendChild(td);
			td = document.createElement("td");
			td.textContent = "\"1\"";
			tr.appendChild(td);
			table.firstElementChild.nextSibling.appendChild(tr);
		}
	}
	document.getElementById("buttonContainer").appendChild(button);
}());