/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adds a pop up modal form for adoptions
@ License: CC-BY-NC-SA
@ License Jurisdiction: International
*/
 
// Variables for later on
// Keep these in an object for organization
var _kt = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};
 
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    msg = messages = {
        get: function(name) {
    return (messages[_kt.language.toUpperCase()]||messages['VI'])[name];
        },
        languages: {
            VI: 'vi - Tiếng Việt',
            AR: 'ar - العربية',
            CS: 'cs - Česky',
            DA: 'da - Dansk',
            FA: 'fa - فارسی',
            HU: 'hu - Magyar',
            ID: 'id - Bahasa Indonesia',
            KO: 'ko - 한국어',
            MS: 'ms - Malay',
            NN: 'nn - ‪Norsk (nynorsk)‬',
            NO: 'no - Norsk (bokmål)‬',
            SV: 'sv - Svenska',
            TR: 'tr - Türkçe',
            XX: 'Khác'
        },
    };
 
// Tiếng Việt / default
messages['VI'] = {
    "button": "Tạo yêu cầu nhận wiki",
}
 
// Add buttons depending on user language
if(_kt.pagename === 'Kittens' || _kt.pagename === "Trung_tâm_Cộng_đồng:Yêu_cầu_nhận_wiki") {
$("head").append("<style>#adoption input { margin-bottom: 15px; }</style>");

    var buttonappend = '<a class="wikia-button" id="adoption-submit" onclick="openFormAdoption()">' + msg.get('button') + '</a>';
    document.getElementById("lang-VI").innerHTML = buttonappend;
    window.dropdown = '<select name="language" id="language" value="'+mw.config.get('wgUserLanguage').toUpperCase()+'">';
    dropdown += '<option value="" selected disabled>' + msg.get('form-language-choose') + '</option>';
    for (var i in msg.languages) {
        dropdown += '<option value="'+i+'">'+msg.languages[i]+'</option>';
    }
    dropdown += '</select>';
}
 
// This opens the form for the users to fill out
 
function openFormAdoption() {
    $.showCustomModal('Biểu mẫu gửi Yêu cầu nhận wiki (xin điền đầy đủ các thông tin)', '<form class="WikiaForm" method="" name="" id="adoption"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Tên thành viên của bạn</span><br><input id="username" type="text" placeholder="Bạn điền đúng tên tài khoản của bạn vào đây, còn gọi là tên thành viên" style="width: 100%;"/><br><span id="br2" /><span style="font-weight:bold">Tên wiki mà bạn muốn nhận</span><br><input id="wikiname" type="text" placeholder="Bạn điền đúng tên đầy đủ của wikia, ví dụ Wikia Phineas and Ferb tiếng Việt" style="width: 100%;"/><br><span id="br2" /><span style="font-weight:bold">Địa chỉ URL của wiki đó</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="vi.phineasandferb" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span id="br2" /><span style="font-weight:bold">Bạn đã tạo ra được bao nhiêu sửa đổi tại đó?</span><br><input id="editcount" type="text" placeholder="Bạn điền số sửa đổi của bạn vào đây." style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Bạn đã tham gia sửa đổi wiki đó được bao lâu rồi?</span><br><input id="jointime" type="text" placeholder="Bạn điền khoảng thời gian bạn đã tham gia, ví dụ 9 tháng" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Vào trang đặc biệt → Đặc biệt:Danh sách bảo quản viên và xem thử bảo quản viên đã tạo ra sửa đổi cuối cùng vào thời gian nào, và bảo quản viên đó là ai?</span><br><input id="localadmin" type="text" placeholder="Bạn trả lời rõ câu hỏi đã yêu cầu" style="width: 100%; min-height: 50px;"/><br><span id="br2" /><span style="font-weight:bold">Chữ ký</span><br><input id="signatureplace" type="text" value="' + _kt.signature + '"style="width:400px"/></span><br><span id="br2" /><br><b>Hãy nói cho chúng tôi biết tại sao wiki này nên được nhận bởi bạn và cho chúng tôi biết những thông tin thêm cần thiết:</b><br><span id="br2" /><div style="clear: both;"></div><textarea style="width: 100%; min-height: 100px;" id="tell_us_why" name="tell_us_why" placeholder="Bạn viết lý do trình bày của mình vào đây!"></textarea></fieldset></form>', {
        id: "requestWindow",
        width: 800,
        buttons: [{
            id: "cancel",
            message: "Hủy bỏ",
            handler: function () {
                cancelformAdoption();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Gửi yêu cầu",
            handler: function () {
                submitformAdoption();
            }
        }]
    });
}
 
// Closes the form
 
function cancelformAdoption() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformAdoption() {
console.log('Đang gửi...');
    var $form = $('#adoption'),
        username = $form.find('#username').val(),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
        editcount = $form.find('#editcount').val(),
        jointime = $form.find('#jointime').val(),
        localadmin = $form.find('#localadmin').val(),
        reason = $form.find('#tell_us_why').val(),
        signatureplace = $form.find('#signatureplace').val(),
        page = '{{Đề mục nhận wikia}}\n{{Mở}}\n\n'
        + '\'\'\'Tên thành viên của bạn:\'\'\'\n[[User:'
        + username
        + '|'
        + username
        + ']]\n\n'
        + '\'\'\'Tên wiki mà bạn muốn nhận:\'\'\'\n[[w:c:'
        + url
        + '|'
        + wikiname
        + ']]\n\n'
        + '\'\'\'Địa chỉ URL wiki đó:\'\'\'\n[[w:c:'
        + url
        + '|'
        + url
        + '.wikia.com]]\n\n'
        + '\'\'\'Bạn đã tạo ra được bao nhiêu sửa đổi tại đó?:\'\'\'\n'
        + editcount
        + '\n\n'
        + '\'\'\'Bạn đã tham gia sửa đổi wiki đó được bao lâu rồi?:\'\'\'\n'
        + jointime
        + '\n\n'
        + '\'\'\'Vào trang đặc biệt → Đặc biệt:Danh sách bảo quản viên và xem thử bảo quản viên đã tạo ra sửa đổi cuối cùng vào thời gian nào, và bảo quản viên đó là ai?:\'\'\'\n'
        + localadmin
        + '\n\n'
        + '\'\'\'Hãy nói cho chúng tôi biết tại sao wiki này nên được nhận bởi bạn và cho chúng tôi biết những thông tin thêm cần thiết:\'\'\'\n'
        + reason
        + '\n\n* ' + signatureplace + '\n';
    // If language or header is blank, return alerts
    if (!username) {
        alert('Xin hãy điền tên thành viên của bạn!');
        return;
    }
    if (!url) {
        alert('Xin hãy điền địa chỉ URL của wiki!');
        return;
    }
    if (!wikiname) {
        alert('Xin hãy điền tên wiki!');
        return;
    }
console.log('Đang kiểm tra...');
 
    // Ajax URL
    var url = _kt.server + '/api.php?action=edit&title=Nhận_wiki:' + encodeURIComponent(wikiname) + '&text=' + encodeURIComponent(page) + '&summary=Yêu+cầu+nhận+wiki+mới&token=' + encodeURIComponent(_kt.edittoken) + '&createonly=1';
console.log('Đang kiểm tra URL: ',url);
 
    $.post(url, function (r) {
console.log('Xong ngay thôi:',r);
    cancelformAdoption();
window.location = _kt.server + '/wiki/' + 'Nhận_wiki:' + encodeURIComponent(wikiname);
    });
console.log('Đã gửi yêu cầu...');
}