/* Remove the add options on Top 10 Lists */
function removeTop10ListAdd() {
	if(wgCanonicalNamespace == "Top_10_list") {
		$("#toplists-list-body li:last-child").remove();
		$(".create-new-list").remove();
		$(".NewItemForm").remove();
	}
}
addOnloadHook(removeTop10ListAdd);