function esEditSummary() {
  if (wgAction == 'edit' || wgAction == 'submit' || wgAction == 'editredlink') {
    var wpSummary = document.getElementById('wpSummary')
    if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
    wpSummaryButtons = document.createElement('span')
    wpSummaryButtons.id = 'esSummaryButtons'
    wpSummary.parentNode.insertBefore(wpSummaryButtons, wpSummary.nextSibling)
    esAddingButton()
  }
}
 
function esAddButton(name, text, title) {
  var btn = document.createElement('esSummaryButton')
  btn.appendChild(document.createTextNode(name))
  btn.title = title
  btn.onclick = function() { esInsertSummary(text) }
  wpSummaryButtons.appendChild(btn)
}
 
function esInsertSummary(text) {
  var wpSummary = document.getElementById('wpSummary')
  if (wpSummary.value.indexOf(text) != -1) return 
  if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ','
  if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' '
  wpSummary.value += text
}
 
addOnloadHook(esEditSummary)