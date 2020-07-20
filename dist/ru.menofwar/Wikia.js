/*** Article info box *******************************************************
 * Creates and displays article info box for sidebar
 * Functions stored here, icon inputs handled in Common
 ****************************************************************************/
function createArticleInfoBox() {
  var id = "ArticleInformationBox";
  var box = document.getElementById(id);
  if (box) return box;
  newSidebarSection(id, "Article information", "");
  var box = document.getElementById(id);
  moveLangBox(box);
  return box;
}
 
function newArticleInfoIcon(id, page, hover, bgImg, className, text) {
  var elem = document.getElementById(id);
  if (!elem) {
    return "";
  }
  createArticleInfoBox();
  var output = "<a";
  if (page !== "") {
    output += ' href="' + wikilinkUrl(page) + '"';
  }
  if (hover !== "") {
    output += ' title="' + hover + '"';
  }
  output += ' class="page-info-icon';
  if (className !== "") {
    output += ' ' + className + 'a';
  }
  output += '"';
  if (bgImg !== "") {
    output += ' style="background-image:url(' + bgImg + ');"';
  }
  output += '><span class="text-container">';
  if (text !== "") output += text;
  output += '</span></a>';
  return output;
}