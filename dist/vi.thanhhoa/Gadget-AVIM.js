/* <source lang="JavaScript"> */
/**********************************************************************
*  Tên tập tin: [[MediaWiki:ImportAVIM.js]]
*  Chức năng  : Đoạn mã JavaScript để tích hợp bộ gõ A.V.I.M vào
*               trang mã cá nhân của những thành viên muốn sử dụng
*               tiếng Việt ở những dự án Wikimedia khác, hỗ trợ
*               cho việc dịch thuật giao diện tiếng Việt dễ dàng, 
*               và cũng được dùng tại Common.js của Wikipedia tiếng
*                Việt 
*  Lịch sử     : Tháng 9 năm 2005, sau khi Á Lý Sa cho
*                thấy có thể dùng HIM (nay là AVIM)
*                trên Wikipedia, Trần Thế Trung viết
*                script này cho skin Monobook để giúp
*                người dùng Wikipedia tiếng Việt sử
*                dụng HIM thuận tiện hơn. Script này
*                sau đó tiếp tục được Nguyễn Xuân
*                Minh, Á Lý Sa chỉnh sửa.
*                2008-01-20, Trần Vĩnh Tân chép từ
*                [[MediaWiki:Monobook.js]] vào đây để dùng cho
*                nhiều site sử dụng MediaWiki khác
*  Ghi công   :  Hieu Tran Dang <lt2hieu2004 (at) users (dot) 
*                sf (dot) net là tác giả của AVIM / HIM 
*                ([[MediaWiki:Him.js]])
**/
// Không import script nếu bên trong Wikipedia tiếng Việt
// để tương thích với hướng dẫn nhập AVIM từ bên ngoài
if (wgServer != "http://vi.wikipedia.org") {
        document.write('<script type="text/javascript" src="'
                + 'http://vi.thanhhoa.wikia.com/w/index.php?title=MediaWiki:Him.js'
                + '&action=raw&ctype=text/javascript"></' + 'script>');
}
function HIM()
{
        var elCC;
        var HIMHTML;
        HIMHTML = '<input id="him_auto" name="viet_method" type="radio" onclick="setMethod(0);"' + (method == 0 && on_off==1?'CHECKED':'') + '/>&nbsp;<label class="radio" for="him_auto">Tự động</label> <small>[F9]</small><br />';
        HIMHTML += '<input id="him_telex" name="viet_method" type="radio" onclick="setMethod(1);"' + (method == 1 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_telex">Telex</label> <a href="http://vi.wikipedia.org/wiki/Telex#Quy_.C6.B0.E1.BB.9Bc_telex" title="Telex#Quy ước telex" style="font-size: smaller">(?)</a><br />';
        HIMHTML += '<input id="him_vni" name="viet_method" type="radio" onclick="setMethod(2);"' + (method == 2 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_vni">VNI</label> <a href="http://vi.wikipedia.org/wiki/VNI#Quy_.C6.B0.E1.BB.9Bc" title="VNI#Quy ước" style="font-size: smaller">(?)</a><br />';
        HIMHTML += '<input id="him_viqr" name="viet_method" type="radio" onclick="setMethod(3);"' + (method == 3 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_viqr">VIQR</label> <a href="http://vi.wikipedia.org/wiki/VIQR" title="VIQR" style="font-size: smaller">(?)</a><br />';
        HIMHTML += '<input id="him_viqr2" name="viet_method" type="radio" onclick="setMethod(4);"' + (method == 4 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_viqr2">VIQR*</label><br />';
        HIMHTML += '<input id="him_off" name="viet_method" type="radio" onclick="setMethod(-1);"' + (on_off==0?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_off">Tắt</label> <small>[F12]</small><hr />';
        HIMHTML += '<input id="him_daucu" name="viet_method" type="checkbox" onclick="setDauCu(this);"' + (dauCu == 1?'CHECKED':'') + ' />&nbsp;<label  class="radio" for="him_daucu">Bỏ dấu kiểu cũ</label> <small>[F7]</small><br />';
        HIMHTML += '<input id="him_ckspell" name="viet_method" type="checkbox" onclick="setSpell(this);"' + (dockspell == 1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_ckspell">Đúng chính tả</label> <small>[F8]</small>';

        switch (skin){
            case 'cologneblue':
                    elCC = document.getElementById('quickbar');
                    HIMHTML = '<h6><a href="http://vi.wikipedia.org/wiki/Wikipedia:Gõ_tiếng_Việt" title="Wikipedia:Gõ tiếng Việt">Gõ tiếng Việt</a></h6><div class="pBody">' + HIMHTML + '</div>';
                    elCC.innerHTML = elCC.innerHTML + HIMHTML;
                    break;
            case 'standard':
                    elCC = document.getElementById('quickbar');
                    HIMHTML = '<hr class="sep" /><a href="http://vi.wikipedia.org/wiki/Wikipedia:Gõ_tiếng_Việt" title="Wikipedia:Gõ tiếng Việt">Gõ tiếng Việt</a><div class="pBody">' + HIMHTML + '</div>';
                    elCC.innerHTML = elCC.innerHTML + HIMHTML;
                   break;
            case 'nostalgia':
                    elCC = document.getElementById('footer');
                    HIMHTML = '<h5><a href="http://vi.wikipedia.org/wiki/Wikipedia:Gõ_tiếng_Việt" title="Wikipedia:Gõ tiếng Việt">Gõ tiếng Việt</a></h5><div class="pBody">';
                    HIMHTML += '<input id="him_auto" name="viet_method" type="radio" onclick="setMethod(0);"' + (method == 0 && on_off==1?'CHECKED':'') + '/>&nbsp;<label class="radio" for="him_auto">Tự động</label> <small>[F9]</small>';
                    HIMHTML += '<input id="him_telex" name="viet_method" type="radio" onclick="setMethod(1);"' + (method == 1 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_telex">Telex</label> <a href="http://vi.wikipedia.org/wiki/Telex#Quy_.C6.B0.E1.BB.9Bc_telex" title="Telex#Quy ước telex" style="font-size: smaller">(?)</a>';
                    HIMHTML += '<input id="him_vni" name="viet_method" type="radio" onclick="setMethod(2);"' + (method == 2 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_vni">VNI</label> <a href="http://vi.wikipedia.org/wiki/VNI#Quy_.C6.B0.E1.BB.9Bc" title="VNI#Quy ước" style="font-size: smaller">(?)</a>';
                    HIMHTML += '<input id="him_viqr" name="viet_method" type="radio" onclick="setMethod(3);"' + (method == 3 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_viqr">VIQR</label> <a href="http://vi.wikipedia.org/wiki/VIQR" title="VIQR" style="font-size: smaller">(?)</a>';
                    HIMHTML += '<input id="him_viqr2" name="viet_method" type="radio" onclick="setMethod(4);"' + (method == 4 && on_off==1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_viqr2">VIQR*</label>';
                    HIMHTML += '<input id="him_off" name="viet_method" type="radio" onclick="setMethod(-1);"' + (on_off==0?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_off">Tắt</label> <small>[F12]</small> |';
                    HIMHTML += '<input id="him_daucu" name="viet_method" type="checkbox" onclick="setDauCu(this);"' + (dauCu == 1?'CHECKED':'') + ' />&nbsp;<label  class="radio" for="him_daucu">Bỏ dấu kiểu cũ</label> <small>[F7]</small>';
                    HIMHTML += '<input id="him_ckspell" name="viet_method" type="checkbox" onclick="setSpell(this);"' + (dockspell == 1?'CHECKED':'') + ' />&nbsp;<label class="radio" for="him_ckspell">Đúng chính tả</label> <small>[F8]</small></div>';
                    elCC.innerHTML = elCC.innerHTML + HIMHTML;
                    break;
            case 'vector':
                    var avimElement = $j(document.createElement('div'));
                    avimElement.attr("id", "p-avim");
                    avimElement.addClass("portal");
                    avimElement.html('<h5 lang="vi" xml:lang="vi">Gõ tiếng Việt <a href="http://vi.wikipedia.org/wiki/Wikipedia:Gõ_tiếng_Việt" title="Wikipedia:Gõ tiếng Việt">(?)</a></h5><div class="body">' + HIMHTML + '</div>');
                    $j('#p-tb').before(avimElement);
                    break;
            case 'modern':
                    elCC = document.getElementById('mw_portlets');
                    var tbPanel = document.getElementById('p-tb');
                    var avimElement = document.createElement('div');
                    avimElement.className = "portlet";                    
                    avimElement.id = "p-avim";
                    avimElement.innerHTML = '<h5><a href="http://vi.wikipedia.org/wiki/Wikipedia:Gõ_tiếng_Việt" title="Wikipedia:Gõ tiếng Việt">Gõ tiếng Việt</a></h5><div class="pBody">' + HIMHTML + '</div>';                    
                    elCC.insertBefore(avimElement, tbPanel);
                    break;
            default:
                    elCC = document.getElementById('column-one');
                    var tbPanel = document.getElementById('p-tb');
                    var avimElement = document.createElement('div');
                    avimElement.id = "p-avim";
                    avimElement.className = "portlet";
                    avimElement.innerHTML = '<h5 lang="vi" xml:lang="vi"><a href="http://vi.wikipedia.org/wiki/Wikipedia:Gõ_tiếng_Việt" title="Wikipedia:Gõ tiếng Việt">Gõ tiếng Việt</a></h5><div class="pBody">' + HIMHTML + '</div>';                    
                    elCC.insertBefore(avimElement, tbPanel);
                    break;
        }

        if(useCookie==1) { setCookie=doSetCookie; getCookie=doGetCookie }
        else { setCookie=noCookie; getCookie=noCookie }
        setCookie();
        if(support) statusMessage();
}

addOnloadHook(HIM);

/* </source> */