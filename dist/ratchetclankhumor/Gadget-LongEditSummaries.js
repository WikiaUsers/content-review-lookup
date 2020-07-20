// LIMIT EDIT SUMMARIES TO EXACTLY 250 UTF-8 BYTES
// see EditPage::importFormData() in MediaWiki source for the source of the limit
// created by Ilmari Karonen and Remember_the_dot

addOnloadHook(function() {
    var wpSummary = document.getElementById("wpSummary")
    if (wpSummary) {
        var adjustMaxLength = function () {
            // subtract the number of UTF-8 continuation bytes (0x80-0xBF) from the maxlength
            var maxLength = 250 - encodeURI(wpSummary.value).split(/%[89AB]/i).length + 1
            wpSummary.maxLength = maxLength
            
            // the last character or group might've pushed us over; if so, inform the user
            var errorMessage = document.getElementById("editSummaryTooLong")
            if (wpSummary.value.length > maxLength) {
                if (!errorMessage) {
                    wpSummary.style.border = "3px solid red"
                    document.getElementById("wpSave").disabled = true
                    var editSummaryTooLong = document.createElement("div")
                    editSummaryTooLong.id = "editSummaryTooLong"
                    editSummaryTooLong.style.color = "red"
                    editSummaryTooLong.style.fontWeight = "bold"
                    editSummaryTooLong.appendChild(document.createTextNode("Your edit summary is too long."))
                    var wpMinoredit = document.getElementById("wpMinoredit")
                    wpMinoredit.parentNode.insertBefore(editSummaryTooLong, wpMinoredit)
                }
            } else {
                if (errorMessage) {
                    wpSummary.style.border = ""
                    document.getElementById("wpSave").disabled = false
                    errorMessage.parentNode.removeChild(errorMessage)
                }
            }
            oldValue = wpSummary.value
        }
        addHandler(wpSummary, "keyup", adjustMaxLength)
        addHandler(wpSummary, "change", adjustMaxLength)
        adjustMaxLength()
    }
})