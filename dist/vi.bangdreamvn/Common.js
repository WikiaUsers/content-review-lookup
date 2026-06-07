/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* to convert a date/time in one timezone to user's local time, code copied from u:valkyriecrusade:MediaWiki:Common.js */
function jstzConvertAll() {
    var l = document.querySelectorAll("[data-jstz]");
    for (var i=0; i<l.length;i++) {
        var date = new Date(l[i].dataset.jstz);
        var format = l[i].dataset.jstzformat ? l[i].dataset.jstzformat : "d/m/Y G:i:s";
        var utc = l[i].dataset.jstzutc;
        utc = utc && utc.toLowerCase() === "true";
        if(format && (date instanceof Date)) {
            l[i].innerHTML=jstzFormatDate(date, format, utc);
        }
    }
}
// this function formats the date similarly to the wikis #time function
// see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#.23time
// not all options are supported
function jstzFormatDate(date, format, utc) {
    var MMMM = ["\x00", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    //var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    var ddd = ["\x03", "CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }
    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])Y+/g, "$1" + y);
    format = format.replace(/(^|[^\\])y/g, "$1" + y.toString().substr(2, 2));
    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])F+/g, "$1" + MMMM[0]);
    //format = format.replace(/(^|[^\\])M/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])m/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])n/g, "$1" + M);
    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])l+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])D/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])d/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])j/g, "$1" + d);
    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])H+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])G/g, "$1" + H);
    var h = H > 12 ? H - 12 : H === 0 ? 12 : H;
    format = format.replace(/(^|[^\\])h+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])g/g, "$1" + h);
    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])i+/g, "$1" + ii(m));
    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])s+/g, "$1" + ii(s));
    var tz = -date.getTimezoneOffset();
    var P = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    var O = P;
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        P += ii(tzHrs) + ":" + ii(tzMin);
        O += ii(tzHrs) + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])P/g, "$1" + P);
    format = format.replace(/(^|[^\\])O/g, "$1" + O);
    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])A+/g, "$1" + T);
    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])a+/g, "$1" + t);
    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "G"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "G"), ddd[day]);
    format = format.replace(new RegExp(MMMM[0], "G"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "G"), MMM[M]);
    format = format.replace(/\\(.)/g, "$1");
    return format;
}
$(jstzConvertAll);

/* AddRailModule on top */
window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true},
    {page: 'Template:Events', prepend: true}
];

/* Discord Banner */
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'RYt9JwWbfq',
    prependToRail: false
};

/* For card icon hovers*/
window.tooltips_list = [
    {
        classname: 'card-images',
        parse: '{{CardImages|<#cardname#>}}'
    }, {
        classname: 'card-details',
        parse: '{{CardHoverDetails|<#name#>}}'
    }
];
window.tooltips_config = {
    offsetX: 10,
    offsetY: 10
};

/*for load a filter element*/
$(function(){
	var $btns = $('.btn').click(function(){
		if (this.id == 'all') {
			$('#parent > div').fadeIn(450);
		} else {
			var $el = $('.' + this.id).fadeIn(450);
			$('#parent > div').not($el).hide();
		}
		$btns.removeClass('active');
		$(this).addClass('active');
	});
});


/**
 * ====================================================================
 * BanG Dream! Girls Band Party! - HỆ THỐNG TỰ ĐỘNG NẠP VÀ LỌC THẺ DẠNG ICON QUA API
 * Sử dụng cho trang: "BanG Dream! Girls Band Party!/Thẻ icon"
 * Tích hợp nối thêm mượt mà vào cuối tệp MediaWiki:Common.js
 * ====================================================================
 */
(function() {
    function initCardFilterAPI() {
        var wrapper = document.querySelector('.card-filter-wrapper');
        if (!wrapper) return;

        console.log("BanG Dream! CardIconList API Dynamic Loader & JSON Caching Activated!");

        // Danh sách 40 nhân vật chuẩn trên Wiki (Họ Tên kiểu Nhật) để đối chiếu
        var charList = [
            "Toyama Kasumi", "Hanazono Tae", "Ushigome Rimi", "Yamabuki Saaya", "Ichigaya Arisa",
            "Maruyama Aya", "Hina Hikawa", "Chisato Shirasagi", "Yamato Maya", "Wakamiya Eve",
            "Minato Yukina", "Hikawa Sayo", "Imai Lisa", "Udagawa Ako", "Shirokane Rinko",
            "Mitake Ran", "Aoba Moca", "Uehara Himari", "Udagawa Tomoe", "Hazawa Tsugumi",
            "Tsurumaki Kokoro", "Seta Kaoru", "Kitazawa Hagumi", "Matsubara Kanon", "Okusawa Misaki",
            "Wakana Rei", "Asahi Rokka", "Satou Masuki", "Nyubara Reona", "Tamade Chiyu",
            "Kurata Mashiro", "Kirigaya Touko", "Hiromachi Nanami", "Futaba Tsukushi", "Yashio Rui",
            "Takamatsu Tomori", "Chihaya Anon", "Kaname Raana", "Nagasaki Soyo", "Shiina Taki"
        ];

        // Khởi tạo trạng thái lọc ban đầu (bao gồm Server khả dụng)
        var activeFilters = {
            char: 'all',
            rarity: 'all',
            attr: 'all',
            server: 'all'
        };

        var cards = []; // Chứa danh sách thẻ tải về từ API hoặc nạp từ Cache
        var rows = wrapper.querySelectorAll('.filter-row');
        var countLabel = wrapper.querySelector('.filter-results-count');
        var grid = wrapper.querySelector('.card-grid');

        // --- XỬ LÝ ĐÓNG/MỞ BỘ LỌC (COLLAPSIBLE BOX) ---
        var filterHeader = wrapper.querySelector('#filterHeader');
        var toggleBtn = wrapper.querySelector('#filterToggleBtn');
        if (filterHeader && toggleBtn) {
            filterHeader.addEventListener('click', function(e) {
                wrapper.classList.toggle('collapsed');
                if (wrapper.classList.contains('collapsed')) {
                    toggleBtn.textContent = 'Mở rộng ▼';
                } else {
                    toggleBtn.textContent = 'Thu gọn ▲';
                }
            });
        }

        // Các biến cấu hình Caching Engine (Nâng cấp lên v5 lưu JSON nhẹ chứa cả server và timestamp)
        var cacheKey = 'bangdream_cards_cache_v10';
        var isLoadedFromCache = false;
        var cachedData = null;

        // --- BƯỚC 1: OPTIMISTIC LOADING (Nạp sẵn mảng cards từ bộ nhớ đệm nếu có) ---
        try {
            var rawCache = localStorage.getItem(cacheKey);
            if (rawCache) {
                cachedData = JSON.parse(rawCache);
                if (cachedData && Array.isArray(cachedData.cards)) {
                    cards = cachedData.cards;
                    isLoadedFromCache = true;
                    console.log("Cache Hit: Đã tải danh sách thẻ từ bộ nhớ đệm trình duyệt (" + cards.length + " thẻ)!");
                }
            }
        } catch (cacheReadErr) {
            console.warn("Không thể nạp dữ liệu cache từ localStorage:", cacheReadErr);
        }

        // Hàm chuẩn hóa tên nhân vật về tên viết tắt chuẩn để so khớp
        function normalizeChar(name) {
            if (!name) return 'all';
            var n = name.trim();
            
            var charMap = {
                // Poppin'Party
                "Toyama Kasumi": "Kasumi", "Kasumi Toyama": "Kasumi", "Kasumi": "Kasumi",
                "Hanazono Tae": "Tae", "Tae Hanazono": "Tae", "Tae": "Tae",
                "Ushigome Rimi": "Rimi", "Rimi Usigome": "Rimi", "Rimi": "Rimi",
                "Yamabuki Saaya": "Saaya", "Saaya Yamabuki": "Saaya", "Saaya": "Saaya",
                "Ichigaya Arisa": "Arisa", "Arisa Ichigaya": "Arisa", "Arisa": "Arisa",
                
                // Pastel*Palettes
                "Maruyama Aya": "Aya", "Aya Maruyama": "Aya", "Aya": "Aya",
                "Hina Hikawa": "Hina", "Hikawa Hina": "Hina", "Hina": "Hina",
                "Chisato Shirasagi": "Chisato", "Shirasagi Chisato": "Chisato", "Chisato": "Chisato",
                "Yamato Maya": "Maya", "Maya Yamato": "Maya", "Maya": "Maya",
                "Wakamiya Eve": "Eve", "Eve Wakamiya": "Eve", "Eve": "Eve",
                
                // Roselia
                "Minato Yukina": "Yukina", "Yukina Minato": "Yukina", "Yukina": "Yukina",
                "Hikawa Sayo": "Sayo", "Sayo Hikawa": "Sayo", "Sayo": "Sayo",
                "Imai Lisa": "Lisa", "Lisa Imai": "Lisa", "Lisa": "Lisa",
                "Udagawa Ako": "Ako", "Ako Udagawa": "Ako", "Ako": "Ako",
                "Shirokane Rinko": "Rinko", "Rinko Shirokane": "Rinko", "Rinko": "Rinko",
                
                // Afterglow
                "Mitake Ran": "Ran", "Ran Mitake": "Ran", "Ran": "Ran",
                "Aoba Moca": "Moca", "Moca Aoba": "Moca", "Moca": "Moca",
                "Uehara Himari": "Himari", "Himari Uehara": "Himari", "Himari": "Himari",
                "Udagawa Tomoe": "Tomoe", "Tomoe Udagawa": "Tomoe", "Tomoe": "Tomoe",
                "Hazawa Tsugumi": "Tsugumi", "Tsugumi Hazawa": "Tsugumi", "Tsugumi": "Tsugumi",
                
                // Hello, Happy World!
                "Tsurumaki Kokoro": "Kokoro", "Kokoro Tsurumaki": "Kokoro", "Kokoro": "Kokoro",
                "Seta Kaoru": "Kaoru", "Kaoru Seta": "Kaoru", "Kaoru": "Kaoru",
                "Kitazawa Hagumi": "Hagumi", "Hagumi Kitazawa": "Hagumi", "Hagumi": "Hagumi",
                "Matsubara Kanon": "Kanon", "Kanon Matsubara": "Kanon", "Kanon": "Kanon",
                "Okusawa Misaki": "Misaki", "Misaki Okusawa": "Misaki", "Misaki": "Misaki",
                
                // RAISE A SUILEN
                "Wakana Rei": "LAYER", "Rei Wakana": "LAYER", "LAYER": "LAYER", "Rei": "LAYER",
                "Asahi Rokka": "LOCK", "Rokka Asahi": "LOCK", "LOCK": "LOCK", "Rokka": "LOCK",
                "Satou Masuki": "MASKING", "Masuki Sato": "MASKING", "MASKING": "MASKING", "Masuki": "MASKING",
                "Nyubara Reona": "PAREO", "Reona Nyubara": "PAREO", "PAREO": "PAREO", "Reona": "PAREO",
                "Tamade Chiyu": "CHUCHU", "Chiyu Tamade": "CHUCHU", "CHUCHU": "CHUCHU", "CHU2": "CHUCHU", "CHU²": "CHUCHU", "Chiyu": "CHUCHU",
                
                // Morfonica
                "Kurata Mashiro": "Mashiro", "Mashiro Kurata": "Mashiro", "Mashiro": "Mashiro",
                "Kirigaya Touko": "Touko", "Touko Kirigaya": "Touko", "Touko": "Touko",
                "Hiromachi Nanami": "Nanami", "Nanami Hiromachi": "Nanami", "Nanami": "Nanami",
                "Futaba Tsukushi": "Tsukushi", "Tsukushi Futaba": "Tsukushi", "Tsukushi": "Tsukushi",
                "Yashio Rui": "Rui", "Rui Yashio": "Rui", "Rui": "Rui",
                
                // MyGO!!!!!
                "Takamatsu Tomori": "Tomori", "Tomori Takamatsu": "Tomori", "Tomori": "Tomori",
                "Chihaya Anon": "Anon", "Anon Chihaya": "Anon", "Anon": "Anon",
                "Kaname Raana": "Raana", "Raana Kaname": "Raana", "Raana": "Raana",
                "Nagasaki Soyo": "Soyo", "Soyo Nagasaki": "Soyo", "Soyo": "Soyo",
                "Shiina Taki": "Taki", "Taki Shiina": "Taki", "Taki": "Taki",
                
                // Ave Mujica
                "Togawa Sakiko": "Sakiko", "Sakiko Togawa": "Sakiko", "Sakiko": "Sakiko", "Oblivionis": "Sakiko",
                "Wakaba Mutsumi": "Mutsumi", "Mutsumi Wakaba": "Mutsumi", "Mutsumi": "Mutsumi", "Mortis": "Mutsumi",
                "Yahiro Umiri": "Umiri", "Umiri Yahiro": "Umiri", "Umiri": "Umiri", "Tympanis": "Umiri",
                "Misumi Uika": "Uika", "Uika Misumi": "Uika", "Uika": "Uika", "Doloris": "Uika",
                "Utenji Nyamu": "Nyamu", "Nyamu Utenji": "Nyamu", "Nyamu": "Nyamu", "Amoris": "Nyamu"
            };
            
            return charMap[n] || n;
        }

        // Hàm chuẩn hóa thuộc tính về chữ thường chuẩn để so khớp
        function normalizeAttr(attr) {
            if (!attr) return 'all';
            var a = attr.toLowerCase().trim();
            if (a === "power" || a === "powerful") return "powerful";
            return a;
        }

        // Thực thi lọc AND logic (Tích hợp Nhân vật, Rarity, Hệ, và Server khả dụng)
        function applyFilters() {
            var cardItems = grid.querySelectorAll('.card-item');
            var visibleCount = 0;
            var targetChar = normalizeChar(activeFilters.char);
            var targetRarity = activeFilters.rarity;
            var targetAttr = normalizeAttr(activeFilters.attr);
            var targetServer = activeFilters.server.toUpperCase();

            cardItems.forEach(function(item) {
                var itemChar = normalizeChar(item.getAttribute('data-char'));
                var itemRarity = item.getAttribute('data-rarity').trim();
                var itemAttr = normalizeAttr(item.getAttribute('data-attr'));
                
                var itemServersAttr = item.getAttribute('data-servers') || '';
                var itemServers = itemServersAttr ? itemServersAttr.split(',') : [];

                var matchChar = (targetChar === 'all' || itemChar === targetChar);
                var matchRarity = (targetRarity === 'all' || itemRarity === targetRarity);
                var matchAttr = (targetAttr === 'all' || itemAttr === targetAttr);
                var matchServer = (targetServer === 'ALL' || itemServers.indexOf(targetServer) !== -1);

                if (matchChar && matchRarity && matchAttr && matchServer) {
                    item.style.display = 'inline-block';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 20);
                    visibleCount++;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(function() {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                        }
                    }, 200);
                }
            });

            if (countLabel) {
                countLabel.textContent = visibleCount + ' / ' + cardItems.length;
            }
            var headerCountBadge = wrapper.querySelector('#filterHeaderCount');
            if (headerCountBadge) {
                headerCountBadge.textContent = '(Đang hiện: ' + visibleCount + '/' + cardItems.length + ')';
            }
        }

        // Tạo sự kiện click cho các nút lọc
        rows.forEach(function(row) {
            var filterType = row.getAttribute('data-filter-type');
            var options = row.querySelectorAll('.filter-option');

            options.forEach(function(option) {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    options.forEach(function(opt) { opt.classList.remove('active'); });
                    option.classList.add('active');
                    activeFilters[filterType] = option.getAttribute('data-value');
                    applyFilters();
                });
            });
        });

        // BẮT ĐẦU GỌI API MEDIAWIKI ĐỂ TẢI THẺ
        mw.loader.using('mediawiki.api').then(function() {
            var api = new mw.Api();
            var categoriesToTry = [
                'Category:Thẻ'
            ];
            var cardsMap = {}; // Dùng để loại bỏ trùng lặp thẻ
            var orderedTitles = []; // Mảng phụ bảo toàn thứ tự chèn chronologically từ API
            
            var shortCharList = [
                "Kasumi", "Tae", "Rimi", "Saaya", "Arisa",
                "Aya", "Hina", "Chisato", "Maya", "Eve",
                "Yukina", "Sayo", "Lisa", "Ako", "Rinko",
                "Ran", "Moca", "Himari", "Tomoe", "Tsugumi",
                "Kokoro", "Kaoru", "Hagumi", "Kanon", "Misaki",
                "LAYER", "LOCK", "MASKING", "PAREO", "CHUCHU",
                "Mashiro", "Touko", "Nanami", "Tsukushi", "Rui",
                "Tomori", "Anon", "Raana", "Soyo", "Taki",
                "Sakiko", "Mutsumi", "Umiri", "Uika", "Nyamu",
                "Ritsu", "Yuno", "Arale", "Miyako", "Nonoka", "Nagi", 
                "Mahoro", "Hotaru", "Houka", "Natsume", "Yomogi", "Chieri", 
                "Raika", "Shizuku", "Miku"
            ];

            // Thể loại chính dùng để kiểm tra cập nhật thẻ
            var checkTitles = 'Category:Cards|Category:Thẻ|Thể loại:Cards|Thể loại:Thẻ';

            // --- BƯỚC 2: XÁC THỰC CACHE NGẦM QUA 1 API REQUEST SIÊU NHẸ ---
            api.get({
                action: 'query',
                prop: 'categoryinfo',
                titles: checkTitles,
                format: 'json'
            }).done(function(infoData) {
                var totalPages = 0;
                if (infoData && infoData.query && infoData.query.pages) {
                    for (var id in infoData.query.pages) {
                        var p = infoData.query.pages[id];
                        if (p.categoryinfo) {
                            totalPages += p.categoryinfo.pages || 0;
                        }
                    }
                }
                console.log("Xác thực ngầm: Tổng số trang thẻ thực tế trên Wiki là " + totalPages);

                // Nếu cache khớp hoàn hảo số lượng thẻ -> CACHE HIT!
                if (isLoadedFromCache && cachedData && cachedData.totalPages === totalPages) {
                    console.log("Cache Hit! Số lượng thẻ trùng khớp hoàn toàn (" + totalPages + "). Bắt đầu parse lưới thẻ từ bộ nhớ đệm...");
                    renderCardsInChunks(totalPages);
                    return; // Dừng tại đây, không tải API nữa!
                }

                // Nếu có cache nhưng lệch số lượng -> Có thẻ mới hoặc sửa đổi -> Cập nhật ngầm ở background
                if (isLoadedFromCache) {
                    console.log("Cache Outdated! Số thẻ thực tế trên Wiki (" + totalPages + ") khác cache (" + (cachedData ? cachedData.totalPages : 0) + "). Đang chạy cập nhật ngầm...");
                    if (countLabel) {
                        countLabel.innerHTML = '<span style="color:#ffcc00;font-size:12px;font-weight:bold;">Đang tải cập nhật thẻ mới...</span>';
                    }
                } else {
                    console.log("Không có cache hợp lệ. Bắt đầu tải danh sách thẻ đầy đủ từ API...");
                }

                // Bắt đầu quy trình tải mới đầy đủ
                fetchAllCategories(totalPages);
            }).fail(function(err) {
                console.error("Lỗi xác thực categoryinfo ngầm:", err);
                // Nếu lỗi API kiểm tra nhưng đã có cache thì sử dụng cache sẵn có
                if (isLoadedFromCache) {
                    console.log("Dự phòng: Lỗi API check nhưng sử dụng cache sẵn có.");
                    renderCardsInChunks(0);
                    return;
                }
                // Nếu chưa có cache, tải trực tiếp luôn
                fetchAllCategories(0);
            });

            function fetchAllCategories(totalPages) {
                var currentIdx = 0;

                function fetchNext() {
                    if (currentIdx >= categoriesToTry.length) {
                        // Chuyển map thành mảng cards, lọc bỏ các thẻ vẫn thiếu thuộc tính
                        var finalCardsList = [];
                        orderedTitles.forEach(function(title) {
                            var card = cardsMap[title];
                            if (card) {
                                // Loại trừ các thẻ thuộc ban nhạc Ave Mujica (vì sẽ hiển thị riêng ở Our Notes)
                                var aveMujicaChars = ["Sakiko", "Mutsumi", "Umiri", "Uika", "Nyamu"];
                                if (aveMujicaChars.indexOf(card.char) === -1) {
                                    finalCardsList.push(card);
                                }
                            }
                        });

                        // Sắp xếp các thẻ theo thời gian tạo trang giảm dần (MỚI NHẤT lên đầu - hoàn toàn khớp với ordermethod=categoryadd của DPL)
                        finalCardsList.sort(function(a, b) {
                            var timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
                            var timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
                            if (timeA !== timeB) {
                                return timeB - timeA; // Mới nhất lên đầu
                            }
                            // Nếu trùng timestamp, giữ nguyên thứ tự chèn ban đầu từ API
                            return orderedTitles.indexOf(a.title) - orderedTitles.indexOf(b.title);
                        });

                        console.log("Tổng số thẻ duy nhất hợp lệ tải về và sắp xếp: " + finalCardsList.length);
                        if (finalCardsList.length > 0) {
                            cards = finalCardsList; // Gán vào biến cards chung
                            renderCardsInChunks(totalPages);
                        } else {
                            grid.innerHTML = '<div style="color:rgba(255,255,255,0.6);text-align:center;padding:30px;grid-column:1/-1;">Không tìm thấy thẻ nào trên hệ thống.</div>';
                            if (countLabel) countLabel.textContent = "0 / 0";
                        }
                        return;
                    }

                    var category = categoriesToTry[currentIdx];
                    fetchCategory(category, null, function() {
                        currentIdx++;
                        fetchNext(); // Chỉ tải danh mục tiếp theo sau khi danh mục hiện tại đã hoàn tất
                    });
                }

                fetchNext();
            }

            function fetchCategory(category, continueParams, callback) {
                console.log("Đang tải danh sách thẻ từ danh mục: " + category);

                var params = {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: category,
                    cmlimit: 50, // Nâng từ 20 lên 50 để tải nhanh gấp 2.5 lần!
                    cmsort: 'timestamp', // Sắp xếp theo thời gian thêm danh mục để có thứ tự gần đúng
                    cmdir: 'desc',       // Mới nhất lên đầu
                    cmprop: 'title|ids|timestamp', // Thu thập title, pageid và timestamp thêm vào danh mục
                    format: 'json'
                };
                if (continueParams) {
                    $.extend(params, continueParams);
                }

                api.get(params).done(function(data) {
                    if (data && data.query && data.query.categorymembers) {
                        var members = data.query.categorymembers;
                        if (members.length === 0) {
                            if (data.continue) {
                                fetchCategory(category, data.continue, callback);
                            } else {
                                callback();
                            }
                            return;
                        }

                        var pageIds = [];
                        var tempCards = {};

                        members.forEach(function(m) {
                            // Bỏ qua các trang ngoài không gian chính (ns !== 0) hoặc trang có dấu hai chấm (meta)
                            if (m.ns !== 0) return;
                            if (m.title.indexOf(':') !== -1) {
                                console.log("Bỏ qua trang meta/không hợp lệ:", m.title);
                                return;
                            }

                            pageIds.push(m.pageid);
                            
                            // Trích xuất hoặc lấy thẻ hiện tại từ bản đồ để cập nhật thêm thuộc tính
                            var card = cardsMap[m.title];
                            var isNew = !card;
                            if (isNew) {
                                card = {
                                    title: m.title,
                                    char: 'Unknown',
                                    rarity: '0',
                                    attr: 'Unknown',
                                    servers: [],
                                    timestamp: m.timestamp || ''
                                };
                                orderedTitles.push(m.title);
                            } else if (m.timestamp && !card.timestamp) {
                                card.timestamp = m.timestamp;
                            }
                            
                            cardsMap[m.title] = card;
                            tempCards[m.pageid] = card;
                        });

                        if (pageIds.length === 0) {
                            if (data.continue) {
                                fetchCategory(category, data.continue, callback);
                            } else {
                                callback();
                            }
                            return;
                        }

                        // Bước 2: Tải các thể loại (categories) của nhóm page IDs này
                        api.get({
                            action: 'query',
                            pageids: pageIds.join('|'),
                            prop: 'categories',
                            cllimit: 500,
                            format: 'json'
                        }).done(function(catData) {
                            if (catData && catData.query && catData.query.pages) {
                                var pages = catData.query.pages;
                                for (var pid in pages) {
                                    var p = pages[pid];
                                    var card = tempCards[p.pageid];
                                    if (card && p.categories) {
                                        for (var c = 0; c < p.categories.length; c++) {
                                            var cat = p.categories[c];
                                            var catTitle = cat.title.replace(/^Thể loại:/, '').replace(/^Category:/, '').trim();

                                            var normChar = normalizeChar(catTitle);
                                            if (shortCharList.indexOf(normChar) !== -1) {
                                                card.char = normChar;
                                            }
                                            else if (catTitle.indexOf('✰') !== -1 || catTitle.indexOf('*') !== -1 || catTitle.indexOf('★') !== -1) {
                                                var parsedRarity = catTitle.replace(/[✰\*★]/g, '').trim();
                                                // CHỈ gán làm độ hiếm nếu kết quả thực sự là một con số hợp lệ (Tránh nhầm lẫn với ban nhạc Pastel*Palettes chứa dấu *)
                                                if (!isNaN(parsedRarity) && parsedRarity !== "") {
                                                    card.rarity = parsedRarity;
                                                }
                                            }
                                            else if (normalizeAttr(catTitle) === "powerful" || normalizeAttr(catTitle) === "cool" || normalizeAttr(catTitle) === "pure" || normalizeAttr(catTitle) === "happy") {
                                                card.attr = catTitle;
                                            }
                                            // Trích xuất Server khả dụng từ danh mục Server Availability:JP/EN/TW/CN
                                            else if (catTitle.indexOf('Server Availability:') === 0) {
                                                var srv = catTitle.replace('Server Availability:', '').trim().toUpperCase();
                                                if (['JP', 'EN', 'TW', 'CN'].indexOf(srv) !== -1) {
                                                    if (card.servers.indexOf(srv) === -1) {
                                                        card.servers.push(srv);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            // Gọi callback hoặc đợt tải tiếp tục của MediaWiki API
                            if (data.continue) {
                                fetchCategory(category, data.continue, callback);
                            } else {
                                callback();
                            }
                        }).fail(function(catErr) {
                            console.error("Lỗi tải categories cho pageids:", pageIds, catErr);
                            if (data.continue) {
                                fetchCategory(category, data.continue, callback);
                            } else {
                                callback();
                            }
                        });
                    } else {
                        if (data && data.continue) {
                            fetchCategory(category, data.continue, callback);
                        } else {
                            callback();
                        }
                    }
                }).fail(function(err) {
                    console.error("Lỗi tải danh mục " + category + ":", err);
                    callback();
                });
            }

            // Phân giải lưới thẻ theo từng cụm 30 thẻ (tránh Expensive Parser Limits và hỗ trợ Cache HTML + Tải song song)
            function renderCardsInChunks(totalPages) {
                grid.innerHTML = '';
                var uncachedPlaceholders = [];

                // Bước 1: Duyệt qua tất cả các thẻ và hiển thị ngay lập tức các thẻ đã có sẵn HTML trong Cache
                cards.forEach(function(card, idx) {
                    var cardItem = document.createElement('div');
                    cardItem.className = 'card-item';
                    cardItem.setAttribute('data-char', card.char);
                    cardItem.setAttribute('data-rarity', card.rarity);
                    cardItem.setAttribute('data-attr', card.attr);
                    cardItem.setAttribute('data-servers', (card.servers || []).join(','));

                    if (card.html) {
                        cardItem.innerHTML = card.html;
                        grid.appendChild(cardItem);
                    } else {
                        // Tạo placeholder tải tại chỗ để tránh dịch chuyển bố cục (layout shift)
                        cardItem.classList.add('card-placeholder-loading');
                        cardItem.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:rgba(255,255,255,0.05);border:1px dashed rgba(255,255,255,0.2);border-radius:6px;"><div class="spinner" style="width:20px;height:20px;border:2px solid rgba(255,0,85,0.1);border-top:2px solid #ff0055;border-radius:50%;animation:filter-spin 1s linear infinite;"></div></div>';
                        grid.appendChild(cardItem);

                        uncachedPlaceholders.push({
                            card: card,
                            element: cardItem
                        });
                    }
                });

                // Nếu không có thẻ nào cần dịch mới (Cache Hit 100%), áp dụng lọc và kích hoạt tooltips ngay
                if (uncachedPlaceholders.length === 0) {
                    applyFilters();
                    if (window.mw && window.jQuery) {
                        mw.hook('wikipage.content').fire(jQuery(grid));
                    }
                    return;
                }

                // Bước 2: Chia nhỏ các thẻ chưa có HTML thành các cụm 30 thẻ (an toàn cho Expensive Parser Limit)
                var chunks = [];
                var chunkSize = 30;
                for (var cIdx = 0; cIdx < uncachedPlaceholders.length; cIdx += chunkSize) {
                    chunks.push(uncachedPlaceholders.slice(cIdx, cIdx + chunkSize));
                }

                var deferreds = [];
                var completedParsedCount = 0;

                if (countLabel) {
                    countLabel.textContent = "Đang kết xuất: " + (cards.length - uncachedPlaceholders.length) + " / " + cards.length + " thẻ...";
                }

                // Gửi song song toàn bộ các yêu cầu dịch (Tải song song tận dụng tối đa băng thông trình duyệt)
                chunks.forEach(function(chunk, chunkIdx) {
                    var wikitext = '';
                    chunk.forEach(function(item, idx) {
                        wikitext += '<div class="card-item-parsed" data-temp-id="' + idx + '">{{CardIcon|1=' + item.card.title + '|3=90px}}</div>';
                    });

                    var deferred = api.post({
                        action: 'parse',
                        text: wikitext,
                        disablelimitreport: true,
                        disabletidy: true,
                        prop: 'text',
                        format: 'json'
                    }).done(function(data) {
                        if (data && data.parse && data.parse.text) {
                            var parsedHtml = data.parse.text['*'];
                            var tempDiv = document.createElement('div');
                            tempDiv.innerHTML = parsedHtml;

                            var parsedItems = tempDiv.querySelectorAll('.card-item-parsed');
                            for (var pIdx = 0; pIdx < parsedItems.length; pIdx++) {
                                var parsedItem = parsedItems[pIdx];
                                var tempId = parseInt(parsedItem.getAttribute('data-temp-id'), 10);
                                var placeholderObj = chunk[tempId];
                                if (placeholderObj) {
                                    // Lưu lại mã HTML dịch được vào thuộc tính card.html
                                    placeholderObj.card.html = parsedItem.innerHTML;
                                    // Thay thế vòng xoay loading bằng HTML thật của thẻ
                                    placeholderObj.element.innerHTML = placeholderObj.card.html;
                                }
                            }
                        }
                        completedParsedCount += chunk.length;
                        if (countLabel) {
                            countLabel.textContent = "Đang kết xuất: " + (cards.length - uncachedPlaceholders.length + completedParsedCount) + " / " + cards.length + " thẻ...";
                        }
                    }).fail(function(err) {
                        console.error("Lỗi biên dịch cụm thẻ " + chunkIdx, err);
                    });

                    deferreds.push(deferred);
                });

                // Bước 3: Chờ tất cả các luồng tải song song hoàn thành để áp dụng các bộ lọc, tooltips và cập nhật cache
                $.when.apply($, deferreds).always(function() {
                    applyFilters();

                    // Kích hoạt tooltips Fandom
                    if (window.mw && window.jQuery) {
                        console.log("Kích hoạt lại Tooltips của Fandom cho lưới thẻ!");
                        mw.hook('wikipage.content').fire(jQuery(grid));
                    }

                    // Lưu cache JSON v8 mới (chứa cả HTML đã biên dịch của các thẻ)
                    try {
                        var newCache = {
                            totalPages: totalPages || cards.length,
                            cards: cards,
                            timestamp: Date.now()
                        };
                        localStorage.setItem(cacheKey, JSON.stringify(newCache));
                        console.log("Đã cập nhật lưu cache JSON v8 thành công! Số lượng: " + cards.length + " thẻ.");
                    } catch (cacheWriteErr) {
                        console.warn("Không thể ghi cache:", cacheWriteErr);
                    }
                });
            }
        }).catch(function(err) {
            console.error("Lỗi nạp thư viện mediawiki.api:", err);
            grid.innerHTML = '<div style="color:red;font-weight:bold;padding:20px;grid-column:1/-1;">Lỗi tải hệ thống MediaWiki API! Vui lòng tải lại trang.</div>';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardFilterAPI);
    } else {
        initCardFilterAPI();
    }
})();