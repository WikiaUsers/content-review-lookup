/*DivEditor by Mopsgamer*/
/*Version 1.3.0*/
 
$(function () {

var $setcss = function(prop) {
    if(($('#ViewSettings [prop=' + prop + ']').val()!=="") && ($('#ViewSettings [prop=' + prop + ']').val()!=="none")){$('#EditorViewArea>div').css(prop, $('#ViewSettings [prop=' + prop + ']').val());}
}
var $setattr = function(attrib) {
    if(($('#ViewSettings [prop=' + attrib + ']').val()!=="") && ($('#ViewSettings [prop=' + attrib + ']').val()!=="none")){$('#EditorViewArea>div').attr(attrib, $('#ViewSettings [prop=' + attrib + ']').val());}
}
var $setinpt = function(inpt, a, b) {
    $('#ViewSettings input'+inpt).val(a);
    $('#ViewSettings input'+inpt).attr("placeholder", b);
}
var toRad = function(deg) {
  var pi = Math.PI;
  return deg * (pi/180);
}
var $setmtx = function() {
    if($('#ViewSettings [func="rotate"]').val()==""){mtx$rot = 0;}else
    {mtx$rot = toRad($('#ViewSettings [func="rotate"]').val());};
    if($('#ViewSettings [func="scaleX"]').val()==""){mtx$a = 1;}else
    {mtx$a = parseInt($('#ViewSettings [func="scaleX"]').val())+Math.cos(mtx$rot);};
    if($('#ViewSettings [func="skewX"]').val()==""){mtx$b = 0;}else
    {mtx$b = parseInt($('#ViewSettings [func="skewX"]').val())+Math.sin(mtx$rot);};
    if($('#ViewSettings [func="skewY"]').val()==""){mtx$c = 0;}else
    {mtx$c = parseInt($('#ViewSettings [func="skewY"]').val())-Math.sin(mtx$rot);};
    if($('#ViewSettings [func="scaleY"]').val()==""){mtx$d = 1;}else
    {mtx$d = parseInt($('#ViewSettings [func="scaleY"]').val())+Math.cos(mtx$rot);};
    if($('#ViewSettings [func="translateX"]').val()==""){mtx$tx = 0;}else
    {mtx$tx = $('#ViewSettings [func="translateX"]').val();};
    if($('#ViewSettings [func="translateY"]').val()==""){mtx$ty = 0;}else
    {mtx$ty = $('#ViewSettings [func="translateY"]').val();};
    if( "matrix("+mtx$a+", "+mtx$b+", "+mtx$c+", "+mtx$d+", "+mtx$tx+", "+mtx$ty+")" !== "matrix(1, 0, 0, 1, 0, 0)" ){
    $('#EditorViewArea>div').css("transform", "matrix("+mtx$a+", "+mtx$b+", "+mtx$c+", "+mtx$d+", "+mtx$tx+", "+mtx$ty+")").css("transform-origin", $('#ViewSettings [func="originX"]').val()+" "+$('#ViewSettings [func="originY"]').val());}
}

DivEditor = {
AddInside: "#Editor",
FontSize: 14
}
 
Div = {
TextValue: "",
Color: "",
FontFamily: "",
FontSize: "",
Width: "",
Height: "",
Margin: "",
Padding: "",
Background: "",
BorderWidth: "",
BorderColor: "",
BorderRadius: "",
BoxShadow: "",
TextShadow: "",
Opacity: "",
Rotate: "",
ScaleX: "",
ScaleY: "",
SkewX: "",
SkewY: "",
TranslateX: "",
TranslateY: "",
OriginX: "",
OriginY: "",
Class: "",
Id: ""
}
 
DivEditorPlhl = {
SettingTextValue: "",
SettingColor: "",
SettingFontFamily: "",
SettingFontSize: "",
SettingWidth: "",
SettingHeight: "",
SettingMargin: "",
SettingPadding: "",
SettingBackground: "",
SettingBorderWidth: "",
SettingBorderColor: "",
SettingBorderRadius: "",
SettingBoxShadow: "",
SettingTextShadow: "",
SettingOpacity: "",
SettingTransformRotate: "",
SettingTransformScale: "",
SettingTransformSkew: "",
SettingTransformTranslate: "",
SettingTransformOrigin: "",
SettingClasses: "",
SettingId: ""
}
 
    if (window.wgUserLanguage == "ru") {
DivEditorLang = {
ButtonTextOpen: "Открыть",
ButtonTextChange: "Сменить редактор",
ButtonTextClear: "Очистить",
ButtonTextCopy: "Копировать",
ButtonTextSetCSS: "Применить",
TextFontSize: "Размер текста",
TextAreaTitle: "Код",
ViewAreaTitle: "Вид",
SettingStyles: "Стили",
SettingText: "Текст",
SettingTextValue: "Значение",
SettingColor: "Цвет",
SettingFontFamily: "Шрифт",
SettingFontSize: "Размер",
SettingFontStyle: "Стиль",
SettingFontWeight: "Жирность",
SettingTextTransform: "Регистр",
SettingTextDecoration: "Оформление",
SettingTextAlign: "Положение",
SettingWidth: "Ширина",
SettingHeight: "Высота",
SettingMargin: "Отступ снаружи",
SettingPadding: "Отступ внутри",
SettingBackground: "Фон",
SettingPosition: "Позиция",
SettingBorders: "Рамки",
SettingBorderWidth: "Ширина",
SettingBorderStyle: "Стиль",
SettingBorderColor: "Цвет",
SettingBorderRadius: "Радиус",
SettingBoxShadow: "Тень",
SettingTextShadow: "Тень текста",
SettingOpacity: "Прозрачность",
SettingTransform: "Трансформация",
SettingTransformRotate: "Поворот",
SettingTransformScale: "Размер",
SettingTransformSkew: "Перекос",
SettingTransformTranslate: "Смещение",
SettingTransformOrigin: "Центр",
SettingOverflow: "Переполнение",
SettingAttributes: "Атрибуты",
SettingClasses: "Классы",
SettingId: "ID"
}} else if (window.wgUserLanguage == "uk") {
DivEditorLang = {
ButtonTextOpen: "Відкрити",
ButtonTextChange: "Змінити редактор",
ButtonTextClear: "Очистити",
ButtonTextCopy: "Копіювати",
ButtonTextSetCSS: "Застосувати",
TextFontSize: "Розмір тексту",
TextAreaTitle: "Код",
ViewAreaTitle: "Вид",
SettingStyles: "Стилі",
SettingText: "Текст",
SettingTextValue: "Значення",
SettingColor: "Колір",
SettingFontFamily: "Шрифт",
SettingFontSize: "Розмір",
SettingFontStyle: "Стиль",
SettingFontWeight: "Жирність",
SettingTextTransform: "Регістр",
SettingTextDecoration: "Оформлення",
SettingTextAlign: "Положення",
SettingWidth: "Ширина",
SettingHeight: "Висота",
SettingMargin: "Відступ зовні",
SettingPadding: "Відступ всередині",
SettingBackground: "Фон",
SettingPosition: "Позиція",
SettingBorders: "Рамки",
SettingBorderWidth: "Ширина",
SettingBorderStyle: "Стиль",
SettingBorderColor: "Колір",
SettingBorderRadius: "Радіус",
SettingBoxShadow: "Тінь",
SettingTextShadow: "Тінь тексту",
SettingOpacity: "Прозорість",
SettingTransform: "Трансформація",
SettingTransformRotate: "Поворот",
SettingTransformScale: "Розмір",
SettingTransformSkew: "Перекіс",
SettingTransformTranslate: "Зміщення",
SettingTransformOrigin: "Центр",
SettingOverflow: "Переповнення",
SettingAttributes: "Атрибути",
SettingClasses: "Класи",
SettingId: "ID"
}} else {
DivEditorLang = {
ButtonTextOpen: "Open",
ButtonTextChange: "Change editor",
ButtonTextClear: "Clear",
ButtonTextCopy: "Copy",
ButtonTextSetCSS: "Apply",
TextFontSize: "Font size",
TextAreaTitle: "Code",
ViewAreaTitle: "View",
SettingStyles: "Styles",
SettingText: "Text",
SettingTextValue: "Value",
SettingColor: "Color",
SettingFontFamily: "Font",
SettingFontSize: "Size",
SettingFontStyle: "Style",
SettingFontWeight: "Weight",
SettingTextTransform: "Case",
SettingTextDecoration: "Decor",
SettingTextAlign: "Align",
SettingWidth: "Width",
SettingHeight: "Height",
SettingMargin: "Margin",
SettingPadding: "Padding",
SettingBackground: "Background",
SettingPosition: "Position",
SettingBorders: "Borders",
SettingBorderWidth: "Width",
SettingBorderStyle: "Style",
SettingBorderColor: "Color",
SettingBorderRadius: "Radius",
SettingBoxShadow: "Shadow",
SettingTextShadow: "Text shadow",
SettingOpacity: "Opacity",
SettingTransform: "Transform",
SettingTransformRotate: "Rotate",
SettingTransformScale: "Scale",
SettingTransformSkew: "Skew",
SettingTransformTranslate: "Translate",
SettingTransformOrigin: "Origin",
SettingOverflow: "Overflow",
SettingAttributes: "Attributes",
SettingClasses: "Classes",
SettingId: "ID"
}}

Area = "EditorTextArea";
AreaTitle = DivEditorLang.TextAreaTitle;

$(DivEditor.AddInside).css("margin", "10px 0").html('');
$(DivEditor.AddInside).append('<div id="DivEditor" class="modal wds-dialog__wrapper" style="display: inline;"></div>');
$('#DivEditor').append('<header id="EditorHeader" style="padding:8px" class="wds-dialog__title"></header><section id="EditorAreas" class="wds-dialog__content" style="overflow:hidden; box-sizing:border-box;"></section>');
$('#EditorAreas').append('<div id="EditorTextArea" style="font-family: monospace; background:#fff; position: relative; float: left; margin-right: 10px; padding: 7px 10px; width: 580px; height: 401px; border: 1px solid #90afcc; border-radius: 1px;"></div>');
$('#EditorAreas').append('<div id="EditorViewArea" style="width: 600px; height: 415px; background: #0002; margin-right: 10px; border: 1px solid #90afcc; position: relative; float: left; overflow: auto"><div></div></div>');
$('#EditorAreas').append('<div id="EditorRightArea" style="float: right; text-align: center; width: 260px; height: 405px; border: 1px solid #90afcc; background: #0002; padding: 0 10px 10px; overflow: hidden auto;"></div>');
$('#EditorRightArea').append('<div id="EditorRightAreaText"><div id="ChangeFontSize"><span id="TextFontSize"></span> <span id="FontSize"></span> <button id="FontSizeIncrease" style="margin:15px 0 0; width:20px; height:20px;">+</button> <button id="FontSizeDefault" style="margin:15px 0 0; width:20px; height:20px;">↺</button> <button id="FontSizeDecrease" style="margin:15px 0 0; width:20px; height:20px;">-</button></div><br><button id="Copy"></button></div>');
$('#EditorRightArea').append('<div id="EditorRightAreaView"><div class="Buttons" style="position:sticky; top:0; padding-bottom:5px;"><button id="Clear" style="margin:15px 2px 0;"></button><button id="SetCSS" style="margin:15px 2px 0;"></button></div><ul id="ViewSettings" style="font-size: 12px; text-align: left; margin: 5px 0 0 0;"></ul></div>');
$('#EditorHeader').append('<button id="ChangeEditor"></button><span id="EditorAreaTitle" style="margin-left: 40px;"></span><button id="Close" style="margin-left: 10px; float: right; width: 28px;font-size: 50px;line-height: 0;padding: 0;background: no-repeat;border: none;">×</button>');
$('#ViewSettings').append('<li style="list-style-type: none;text-align: center;font-weight: bold;border-bottom: 1px solid #94a6b8;margin-bottom: 5px;"><span id="SettingStyles"></span></li><li><span id="SettingText"></span><ul><li><span id="SettingTextValue"></span>: <input type="text" prop="text-value"></li><li><span id="SettingColor"></span>: <input type="text" prop="color"></li><li><span id="SettingFontFamily"></span>: <input type="text" prop="font-family"></li><li><span id="SettingFontSize"></span>: <input type="text" prop="font-size"></li><li><span id="SettingFontStyle"></span>: <select prop="font-style"><option val="inherit">inherit</option><option val="initial">initial</option><option val="none" selected>none</option><option val="italic">italic</option><option val="normal">normal</option><option val="oblique">oblique</option></select></li><li><span id="SettingFontWeight"></span>: <select prop="font-weight"><option val="none" selected>none</option><option val="initial">initial</option><option val="1">1</option><option val="2">2</option><option val="3">3</option><option val="4">4</option><option val="5">5</option><option val="6">6</option><option val="7">7</option><option val="8">8</option><option val="9">9</option></select></li><li><span id="SettingTextTransform"></span>: <select prop="text-transform"><option val="capitalize">capitalize</option><option val="initial">initial</option><option val="lowercase">lowercase</option><option val="uppercase">uppercase</option><option val="none" selected>none</option></select></li><li><span id="SettingTextDecoration"></span>: <select prop="text-decoration"><option val="overline">overline</option><option val="line-through">line-through</option><option val="underline">underline</option><option val="none" selected>none</option></select></li><li><span id="SettingTextAlign"></span>: <select prop="text-align"><option val="justify">justify</option><option val="left" selected>left</option><option val="center">center</option><option val="right">right</option></select></li></ul></li><li><span id="SettingWidth"></span>: <input type="text" prop="width"></li><li><span id="SettingHeight"></span>: <input type="text" prop="height"></li><li><span id="SettingMargin"></span>: <input type="text" prop="margin"></li><li><span id="SettingPadding"></span>: <input type="text" prop="padding"></li><li><span id="SettingBackground"></span>: <input type="text" prop="background"></li><li><span id="SettingPosition"></span>: <select prop="position"><option val="none">none</option><option val="absolute">absolute</option><option val="fixed">fixed</option><option val="initial">initial</option><option val="relative">relative</option><option val="static">static</option><option val="sticky">sticky</option></select></li><li><span id="SettingBorders"></span><ul><li><span id="SettingBorderWidth"></span>: <input type="text" prop="border-width"></li><li><span id="SettingBorderStyle"></span>: <select prop="border-style"><option val="none" selected>none</option><option val="dashed">dashed</option><option val="dotted">dotted</option><option val="double">double</option><option val="groove">groove</option><option val="hidden">hidden</option><option val="initial">initial</option><option val="inset">inset</option><option val="outset">outset</option><option val="revert">revert</option><option val="ridge">ridge</option><option val="solid">solid</option></select></li><li><span id="SettingBorderColor"></span>: <input type="text" prop="border-color"></li><li><span id="SettingBorderRadius"></span>: <input type="text" prop="border-radius"></li></ul></li><li><span id="SettingBoxShadow"></span>: <input type="text" prop="box-shadow"></li><li><span id="SettingTextShadow"></span>: <input type="text" prop="text-shadow"></li><li><span id="SettingOpacity"></span>: <input type="number" prop="opacity"></li><li><span id="SettingTransform"></span><ul><li><span id="SettingTransformRotate"></span>: <input type="number" func="rotate"></li><li><span class="SettingTransformScale"></span>-X: <input type="number" func="scaleX"></li><li><span class="SettingTransformScale"></span>-Y: <input type="number" func="scaleY"></li><li><span class="SettingTransformSkew"></span>-X: <input type="number" func="skewX"></li><li><span class="SettingTransformSkew"></span>-Y: <input type="number" func="skewY"></li><li><span class="SettingTransformTranslate"></span>-X: <input type="number" func="translateX"></li><li><span class="SettingTransformTranslate"></span>-Y: <input type="number" func="translateY"></li><li><span class="SettingTransformOrigin"></span>-X: <input type="text" func="originX"></li><li><span class="SettingTransformOrigin"></span>-Y: <input type="text" func="originY"></li></ul></li><li><span id="SettingOverflow"></span>: <select prop="overflow"><option val="auto">auto</option><option val="hidden">hidden</option><option val="initial">initial</option><option val="overlay">overlay</option><option val="scroll">scroll</option><option val="visible" selected>visible</option></select></li><li style="list-style-type: none;text-align: center;font-weight: bold;border-bottom: 1px solid #94a6b8;margin-bottom: 5px;"><span id="SettingAttributes"></span></li><li><span id="SettingClasses"></span>: <input type="text" prop="class"></li><li><span id="SettingId"></span>: <input type="text" prop="id"></li>');
 
$('#ChangeEditor').text(DivEditorLang.ButtonTextOpen);
$('#Clear').text(DivEditorLang.ButtonTextClear);
$('#Copy').text(DivEditorLang.ButtonTextCopy);
$('#SetCSS').text(DivEditorLang.ButtonTextSetCSS);
$('#TextFontSize').text(DivEditorLang.TextFontSize+":");
$('#FontSize').text(DivEditor.FontSize+"px");
$('#EditorAreaTitle').text("Div Editor");
$('#SettingStyles').text(DivEditorLang.SettingStyles);
$('#SettingText').text(DivEditorLang.SettingText);
$('#SettingTextValue').text(DivEditorLang.SettingTextValue);
$('#SettingColor').text(DivEditorLang.SettingColor);
$('#SettingFontFamily').text(DivEditorLang.SettingFontFamily);
$('#SettingFontSize').text(DivEditorLang.SettingFontSize);
$('#SettingFontStyle').text(DivEditorLang.SettingFontStyle);
$('#SettingFontWeight').text(DivEditorLang.SettingFontWeight);
$('#SettingTextTransform').text(DivEditorLang.SettingTextTransform);
$('#SettingTextDecoration').text(DivEditorLang.SettingTextDecoration);
$('#SettingTextAlign').text(DivEditorLang.SettingTextAlign);
$('#SettingWidth').text(DivEditorLang.SettingWidth);
$('#SettingHeight').text(DivEditorLang.SettingHeight);
$('#SettingMargin').text(DivEditorLang.SettingMargin);
$('#SettingPadding').text(DivEditorLang.SettingPadding);
$('#SettingBackground').text(DivEditorLang.SettingBackground);
$('#SettingPosition').text(DivEditorLang.SettingPosition);
$('#SettingBorders').text(DivEditorLang.SettingBorders);
$('#SettingBorderWidth').text(DivEditorLang.SettingBorderWidth);
$('#SettingBorderStyle').text(DivEditorLang.SettingBorderStyle);
$('#SettingBorderColor').text(DivEditorLang.SettingBorderColor);
$('#SettingBorderRadius').text(DivEditorLang.SettingBorderRadius);
$('#SettingBoxShadow').text(DivEditorLang.SettingBoxShadow);
$('#SettingTextShadow').text(DivEditorLang.SettingTextShadow);
$('#SettingOpacity').text(DivEditorLang.SettingOpacity);
$('#SettingTransform').text(DivEditorLang.SettingTransform);
$('#SettingTransformRotate').text(DivEditorLang.SettingTransformRotate);
$('.SettingTransformScale').text(DivEditorLang.SettingTransformScale);
$('.SettingTransformSkew').text(DivEditorLang.SettingTransformSkew);
$('.SettingTransformTranslate').text(DivEditorLang.SettingTransformTranslate);
$('.SettingTransformOrigin').text(DivEditorLang.SettingTransformOrigin);
$('#SettingOverflow').text(DivEditorLang.SettingOverflow);
$('#SettingAttributes').text(DivEditorLang.SettingAttributes);
$('#SettingClasses').text(DivEditorLang.SettingClasses);
$('#SettingId').text(DivEditorLang.SettingId);
 
$('#EditorRightAreaText').hide();
$('#EditorAreas').hide();
$('#Close').hide();
 
$('#EditorRightAreaView button').css("width", "auto");
$('#ViewSettings li').css("list-style-type", "none");
$('#ViewSettings input').css("width", "110px");
$('#ViewSettings select').css("width", "118px");
$('#ViewSettings input, #ViewSettings select').css("float", "right")
$('#EditorTextArea').css("font-size", DivEditor.FontSize+"px");
$('#ViewSettings li ul').parent().wrapInner('<details>');
$('#ViewSettings li ul').prev().wrap('<summary>');
 
    $setinpt('[prop="text-value"]', Div.TextValue, DivEditorPlhl.SettingTextValue);
    $setinpt('[prop="color"]', Div.Color, DivEditorPlhl.SettingColor);
    $setinpt('[prop="font-family"]', Div.FontFamily, DivEditorPlhl.SettingFontFamily);
    $setinpt('[prop="font-size"]', Div.FontSize, DivEditorPlhl.SettingFontSize);
    $setinpt('[prop="width"]', Div.Width, DivEditorPlhl.SettingWidth);
    $setinpt('[prop="height"]', Div.Height, DivEditorPlhl.SettingHeight);
    $setinpt('[prop="margin"]', Div.Margin, DivEditorPlhl.SettingMargin);
    $setinpt('[prop="padding"]', Div.Padding, DivEditorPlhl.SettingPadding);
    $setinpt('[prop="background"]', Div.Background, DivEditorPlhl.SettingBackground);
    $setinpt('[prop="border-width"]', Div.BorderWidth, DivEditorPlhl.SettingBorderWidth);
    $setinpt('[prop="border-color"]', Div.BorderColor, DivEditorPlhl.SettingBorderColor);
    $setinpt('[prop="border-radius"]', Div.BorderRadius, DivEditorPlhl.SettingBorderRadius);
    $setinpt('[prop="box-shadow"]', Div.BoxShadow, DivEditorPlhl.SettingBoxShadow);
    $setinpt('[prop="text-shadow"]', Div.TextShadow, DivEditorPlhl.SettingTextShadow);
    $setinpt('[prop="opacity"]', Div.Opacity, DivEditorPlhl.SettingOpacity);
    $setinpt('[func="scaleX"]', Div.ScaleX, DivEditorPlhl.SettingTransformScale);
    $setinpt('[func="scaleY"]', Div.ScaleY, DivEditorPlhl.SettingTransformScale);
    $setinpt('[func="skewX"]', Div.SkewX, DivEditorPlhl.SettingTransformSkew);
    $setinpt('[func="skewY"]', Div.SkewY, DivEditorPlhl.SettingTransformSkew);
    $setinpt('[func="translateX"]', Div.TranslateX, DivEditorPlhl.SettingTransformTranslate);
    $setinpt('[func="translateY"]', Div.TranslateY, DivEditorPlhl.SettingTransformTranslate);
    $setinpt('[func="originX"]', Div.OriginX, DivEditorPlhl.SettingTransformOrigin);
    $setinpt('[func="originY"]', Div.OriginY, DivEditorPlhl.SettingTransformOrigin);
    $setinpt('[func="rotate"]', Div.Rotate, DivEditorPlhl.SettingTransformRotate);
    $setinpt('[prop="class"]', Div.Class, DivEditorPlhl.SettingClasses);
    $setinpt('[prop="id"]', Div.Id, DivEditorPlhl.SettingId);
 
$("#SetCSS").click(function(){
    $('#EditorViewArea>div').text($('#ViewSettings input[prop="text-value"]').val());
    $setcss("color");
    $setcss("font-family");
    $setcss("font-size");
    $setcss("font-style");
    $setcss("font-weight");
    $setcss("text-transform");
    $setcss("text-decoration");
    $setcss("text-align");
    $setcss("width");
    $setcss("height");
    $setcss("margin");
    $setcss("padding");
    $setcss("background");
    $setcss("position");
    $setcss("border-width");
    $setcss("border-style");
    $setcss("border-color");
    $setcss("border-radius");
    $setcss("box-shadow");
    $setcss("text-shadow");
    $setcss("opacity");
    $setmtx();
    $setcss("overflow");
    $setattr("class");
    $setattr("id");
})
 
$('#Clear').click(function(){
$('#EditorViewArea>div').attr("style", "").attr("class", "").attr("id", "").text("");
$('[prop="color"]').val("");
$('[prop="font-family"]').val("");
$('[prop="font-size"]').val("");
$('[prop="width"]').val("");
$('[prop="height"]').val("");
$('[prop="margin"]').val("");
$('[prop="padding"]').val("");
$('[prop="background"]').val("");
$('[prop="border-width"]').val("");
$('[prop="border-color"]').val("");
$('[prop="border-radius"]').val("");
$('[prop="box-shadow"]').val("");
$('[prop="box-shadow"]').val("");
$('[prop="opacity"]').val("");
$('[prop="transform"]').val("");
$('[func="scaleX"]').val("");
$('[func="scaleY"]').val("");
$('[func="skewX"]').val("");
$('[func="skewY"]').val("");
$('[func="translateX"]').val("");
$('[func="translateY"]').val("");
$('[func="rotate"]').val("");
})
 
jQuery.fn.selectText = function() {
  var range, selection;
  return this.each(function() {
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(this);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(this);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
};
 
$('#Copy').click(function() {
  $('#EditorTextArea').attr("contenteditable", "true");
  $('#EditorTextArea').selectText();
  document.execCommand("Copy");
  document.getSelection().collapseToEnd();
  $('#EditorTextArea').attr("contenteditable", "false");
});
 
$('#FontSizeIncrease').click(function(){
if (DivEditor.FontSize < 30) {++DivEditor.FontSize;
$('#EditorTextArea').css("font-size", DivEditor.FontSize+"px");
$('#FontSize').text(DivEditor.FontSize+"px");}
})
 
$('#FontSizeDecrease').click(function(){
if (DivEditor.FontSize > 1) {--DivEditor.FontSize;
$('#EditorTextArea').css("font-size", DivEditor.FontSize+"px");
$('#FontSize').text(DivEditor.FontSize+"px");}
})

$('#FontSizeDefault').click(function(){
DivEditor.FontSize = 14;
$('#EditorTextArea').css("font-size", DivEditor.FontSize+"px");
$('#FontSize').text(DivEditor.FontSize+"px");
})

var close = function(){
$('#ChangeEditor').text(DivEditorLang.ButtonTextOpen).css("float", "unset");
$('#EditorAreas').hide();
$('#EditorAreaTitle').text("Div Editor");
$('#Close').hide();
$('#DivEditor').css("height", "unset").css("width", "unset").css("transition", "0.5s").css("margin", "0").unwrap();
$('#HideFront').remove();
}

$('#Close').click(function(){close()})
 
 Area = "EditorTextArea";
 AreaTitle = DivEditorLang.ViewAreaTitle;
 $('#EditorViewArea').show();
 $('#EditorTextArea').hide();
 
$('#ChangeEditor').click(function(){
$('#DivEditor').css("height", "470px").css("width", "fit-content").css("transition", "0");
$('#EditorHeader button').css("height", "28px")
$('#Close').show();
$('#EditorAreas').show();
$('#EditorAreaTitle').show();
    if($(this).text() == DivEditorLang.ButtonTextOpen) {
        $('#DivEditor').css("margin", "auto").css("max-width", "none").wrap('<div class="wds-dialog__curtain user-tools-modal div-editor" style="z-index: 401;"></div>')
        $('#EditorAreas').css("padding", "0 8px").css("width", "100%")
        $('#EditorAreaTitle').text(AreaTitle);
        $(this).css("float", "left");
        $('head').append('<style id="HideFront">.avatars, .refpopups-configure-page{z-index: 0} .wds-community-header{z-index: 3}</style>')
}
 
	if( $(this).text() == DivEditorLang.ButtonTextChange ){
	switch (Area) {
	case "EditorViewArea":
	Area = "EditorTextArea";
	AreaTitle = DivEditorLang.ViewAreaTitle;
	$('#EditorTextArea').hide();
	$('#EditorViewArea').show();
	$('#EditorRightAreaView').show();
	$('#EditorRightAreaText').hide();
 	$('#EditorTextArea').text($('#EditorViewArea').val());
 	break;
 	case "EditorTextArea":
 	Area = "EditorViewArea";
 	AreaTitle = DivEditorLang.TextAreaTitle;
 	$('#EditorTextArea').show();
	$('#EditorViewArea').hide();
	$('#EditorRightAreaView').hide();
	$('#EditorRightAreaText').show();
 	$('#EditorTextArea').text($('#EditorViewArea').html());
 	}}
$('#EditorAreaTitle').text(AreaTitle);
$(this).text(DivEditorLang.ButtonTextChange);
});
});