// Thiết lập
self.avimSettings = {
    headerText: "Gõ tiếng Việt",
    helpArticle: "Wikipedia:Gõ tiếng Việt",
    helpText: "Trợ giúp",
    helpServer: "//vi.wikipedia.org",
    methodArticleServer: "//vi.wikipedia.org",
    methods: [
        {value: 0, id: "auto", name: "Tự động", key: "F9"},
        {value: 1, id: "telex", name: "Telex", article: "Telex#Quy ước telex"},
        {value: 2, id: "vni", name: "VNI", article: "VNI#Quy ước"},
        {value: 3, id: "viqr", name: "VIQR", article: "VIQR"},
        {value: 4, id: "viqr2", name: "VIQR*"},
        {value: -1, id: "off", name: "Tắt", key: "F12"},
    ],
    options: [
        {id: "daucu", name: "Bỏ dấu kiểu cũ", command: "setDauCu", key: "F7"},
        {id: "ckspell", name: "Đúng chính tả", command: "setSpell", key: "F8"},
    ],
};
 
$(function () {
 
/**
 * Cho ra URL tương đối giao thức đến trang wiki với tên được chỉ định.
 */
function articleURLFromTitle(title, server) {
    var components = title.match("^([^#]+)(?:#(.+))?");
    if (!components || !components[1]) return "";
    var lastComponent = components[1];
    if (components[2]) {
        lastComponent += "#";
        lastComponent += encodeURIComponent(components[2]).replace(/%20/g, "_")
                                                          .replace(/%/g, ".");
    }
    return server + mw.config.get("wgArticlePath").replace("$1", lastComponent);
}
 
/**
 * Tạo một liên kết đến trang được chỉ định và cho ra đối tượng bọc của jQuery.
 */
function linkFromArticle(title, server, text) {
    return $("<a target='_blank' href='" + articleURLFromTitle(title, server) + "' title='" +
             title + "'>" + text + "</a>");
}
 
var head_link = linkFromArticle(self.avimSettings.helpArticle,
                                self.avimSettings.helpServer,
                                self.avimSettings.headerText);
var content = $("<ul></ul>");
 
$.each(self.avimSettings.methods, function (i, method) {
    if (!method) return;
 
    var item = $("<li></li>");
 
    // Nút radio
    var radio = $("<input id='avim_" + method.id +
                  "' name='viet_method' type='radio' />");
    radio.click(function (evt) {
        AVIMObj.setMethod(method.value);
    });
    item.append(radio);
 
    // Nhãn
    var label = $("<label class='radio' for='avim_" + method.id + "'>" +
                  method.name + "</label>");
    item.append("&nbsp;");
    item.append(label);
 
    // Thông tin phụ
    if (method.article) {
        item.append("&nbsp;");
        item.append("<a target='_blank' href='" +
                       articleURLFromTitle(method.article,
                                           self.avimSettings.methodArticleServer) +
                       "' title='" + method.article + "'>(?)</a>");
    }
    if (method.key) {
        item.append("&nbsp;");
        item.append("<small>[" + method.key + "]</small>");
    }
 
    content.append(item);
});
content.append("<li><hr /></li>");
$.each(self.avimSettings.options, function (i, option) {
    if (!option) return;
 
    var item = $("<li></li>");
 
    // Hộp kiểm
    var checkbox = $("<input id='avim_" + option.id +
                     "' name='viet_method' type='checkbox' />");
    checkbox.click(function (evt) {
        AVIMObj[option.command](this);
    });
    item.append(checkbox);
 
    // Nhãn
    var label = $("<label class='radio' for='avim_" + option.id + "'>" +
                  option.name + "</label>")
    item.append("&nbsp;");
    item.append(label);
 
    // Thông tin phụ
    if (option.key) {
        item.append("&nbsp;");
        item.append("<small>[" + option.key + "]</small>");
    }
 
    content.append(item);
});
 
content = $("<div class='pBody'></div>").append(content);
 
switch (mw.config.get("skin")) {
    case "standard":    // Cổ điển
        $("#quickbar").append("<hr class='sep' />");
        var portlet = $("<div id='p-avim'></div>");
        portlet.append(head_link)
               .append(content);
        $("#quickbar").append(portlet);
        break;
    case "cologneblue": // Xanh Cologne
        var portlet = $("<div id='p-avim'></div>");
        portlet.append($("<h6></h6>").append(head_link))
               .append(content);
        $("#quickbar").append(portlet);
        break;
    case "nostalgia":   // Vọng cổ
//        content.remove("br");
//        content.find("hr").replaceWith(" | ");
        var portlet = $("<div id='p-avim'></div>");
        portlet.append($("<h5></h5>").append(head_link))
               .append(content);
        $("#footer").append(portlet);
        break;
    case "vector":  // Vectơ
        // Đặt liên kết vào (?) vì đề mục của hộp thu gọn không nên chuyển nguời
        // dùng ra khỏi trang.
        content.addClass("body");
        head_link.text(self.avimSettings.helpText);
        var portlet = $("<div id='p-avim' class='portal collapsed' role='navigation'></div>");
        portlet.append($("<h3></h3>").text(self.avimSettings.headerText))
               .append(content.prepend(head_link));
        $("#p-tb").before(portlet);
        break;
    case "oasis":  // Oasis
        var portlet = $("<div id='p-avim'></div>");
        portlet.append($("<h3></h3>").append(head_link))
               .append(content);
        $(".WikiaSiteWrapper").append(portlet);
        break;
    default:    // Cá nhân, Chick, Đơn giản, Hiện đại
        var portlet = $("<div id='p-avim' class='portlet'></div>");
        portlet.append($("<h5></h5>").append(head_link))
               .append(content);
        $("#p-tb").before(portlet);
        break;
}
 
// Khi bấm F12, AVIMObj.keyDownHandler() cố ẩn phân tử #AVIMControl, cho nên nó
// cần phải tồn tại.
$(document.body).append("<div id='AVIMControl'></div>");
 
// Chắc chắn khởi tạo AVIM nếu trường hợp [[MediaWiki:Gadget-AVIM.js]] đã được
// chạy.
if (self.AVIMObj) {
    AVIMObj.setMethod(AVIMGlobalConfig.onOff ? AVIMGlobalConfig.method : -1);
    AVIMObj.setSpell(AVIMGlobalConfig.ckSpell);
    AVIMObj.setDauCu(AVIMGlobalConfig.oldAccent);
}
 
});