//<syntaxhighlight lang="JavaScript">
/* written and maintained by wikia. if you have suggestions, please leave a note on the talk page. -MtaÄ */
/* ------------ cookie ------------- */
function setCookie() {
    document.cookie = "LWN=closed; expires=0; path=/";
}

function setCookiePermanent(cookieName, cookieValue, nDays) {
    var today = new Date();
    var expire = new Date();
    var nDays = 365;
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    var cookieName = "LWN-feedback";
    var cookieValue = "given";
    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
    
    setTimeout(function() {
        $("#LanguageNotificationClosed").delay(5000).fadeOut().delay(1000);
        $("#LanguageNotification").delay(5000).fadeOut().delay(1000);
    }, 2000);

}
/* ------------ cookie end --------- */
/* ------------ close -------------- */

function closeBubble() {
        setTimeout(function() {

            $("#LanguageNotificationClosed").remove().delay(100);

        }, 2000);
    }
/* ------------ close end ---------- */
/* data */

var suggested_url = 'not defined';
if (mw.config.get('wgUserName') === null) {
    userOrAnon = "Anon"
} else {
    userOrAnon = "User"
}
$(document).ready(function() {
    setTimeout(function() {

        if (suggested_url == "not defined" || "undefined") {
            suggested_url = $("#suggested_url").attr("href");
        }
    }, 500);
});
/* data end */

var browser_lang = (window.navigator.userLanguage || window.navigator.language).toLowerCase() || 'undef';
if (browser_lang !== "undef" && /^.{2}-/.test(browser_lang)) {
    browser_lang = browser_lang.match(/^(.{2})-/, "$1")[1];
}
var browser_lang_stored = browser_lang;
var interfaceLang = $('html').attr('lang').toLowerCase();

if ($(".WikiaArticleInterlang").length > 0) {
    var hasInterlangArticle = "yes";
} else {
    var hasInterlangArticle = "no";
}

$(document).ready(function($, mw) {

    // for debugging
    var browser_lang_actual = window.navigator.userLanguage || window.navigator.language || 'undef';
    console.log("Interface lang: " + interfaceLang + "\nBrowser lang: " + browser_lang + "\nActual browser lang: " + browser_lang_actual);

    // if browser_lang is different from interfacelang, use browser_lang, since that might be more accurate. if browser_lang is not defined, use interfacelang								}
    if (browser_lang !== interfaceLang) {
        interfaceLang = browser_lang;
        console.log('interface lang !== browser lang');
    }
    // Refusing displaying of the notif if user browses a wiki in native language
    if (interfaceLang !== mw.config.get('wgContentLanguage')) {
        var messages = {
            "ca": 'Sabies que també està disponible una comunitat sobre el mateix tema en <a id="suggested_url" href="$1">català</a>?',
            "cs": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">Czech?</a>',
            "de": 'Es gibt ein Wiki zum gleichen Thema in <a id="suggested_url" href="$1">deutsch</a>! Schau doch mal vorbei!',
            "en": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">English</a>?',
            "el": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">Greek?</a>',
            "es": '¿Sabías que también está disponible una comunidad sobre el mismo tema en <a id="suggested_url" href="$1">español</a>?',
            "fi": 'Tiesitkö, että tämä wikia on saatavilla myös <a id="suggested_url" href="$1">suomeksi</a>?',
            "fr": 'Saviez-vous que ce wiki existe aussi en <a id="suggested_url" href="$1">français</a> ?',
            "gl": 'Sabías que tamén está dispoñible unha comunidade sobre o mesmo tema en <a id="suggested_url" href="$1">galego</a>?',
            "id": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">Indonesian?</a>',
            "it": 'Sapevi che questa wiki esiste anche in <a id="suggested_url" href="$1">italiano</a>?',
            "ja": '<a id="suggested_url" href="$1">日本語版</a>のウィキもどうぞ',
            "ko": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">Korean?</a>',
            "nl": 'Wist je dat deze wiki ook beschikbaar is in het <a id="suggested_url" href="$1">Nederlands</a>?',
            "pl": 'Czy wiesz, że ta wiki ma także odpowiednik w języku <a id="suggested_url" href="$1">polskim</a>?',
            "pt": 'Sabias que também está disponível uma comunidade sobre o mesmo tema em <a id="suggested_url" href="$1">português</a>?',
            "pt-br": 'Sabias que também está disponível uma comunidade sobre o mesmo tema em <a id="suggested_url" href="$1">português</a>?',
            "ro": 'Ai ştiut că, de asemenea, este disponibilă o comunitate de aceeaşi temă în <a id="suggested_url" href="$1">limba română</a>?',
            "ru": 'Знаете ли вы, что эта вики также есть на <a id="suggested_url" href="$1">русском языке?</a>',
            "sr": 'Знаш ли да је овај вики могуће читати и на <a id="suggested_url" href="$1">српском</a> језику?',
            "sv": 'Visste du att denna wikia är tillgänglig också på <a id="suggested_url" href="$1">svenska</a>?',
            "tr": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">Turkish?</a>',
            "vi": 'Bạn có biết: wiki này cũng có phiên bản <a id="suggested_url" href="$1">tiếng Việt</a>?',
            "zh": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">Chinese?</a>',
            "undef": 'Did you know that this wiki is also available in <a id="suggested_url" href="$1">your language?</a>' //does it makes any sense?
        }
        var messageClosed = '<li><div id="LanguageNotificationClosed" style="font-size: 12px; max-width: 800px"><form action="https://docs.google.com/forms/d/1eZf1Aoxp-w1zIUNSVpBxKoIXqOV5lRgC7WBE55Fmk3I/formResponse" method="POST" id="ss-form" target="_blank" onsubmit=""><ol role="list" class="ss-question-list" style="padding-left: 0; margin-left: 0;"><span class="ss-form-question errorbox-good" role="listitem"><span dir="ltr" class="ss-item ss-item-required ss-radio"><span class="ss-form-entry"><label class="ss-q-item-label" for="entry_1816475874"><span class="ss-q-title">Why did you close this notification? Please specify a reason below.<label for="itemView.getDomIdToLabel()" aria-label=""></label><span class="ss-required-asterisk"></span></span><span class="ss-q-help ss-secondary-text" dir="ltr"></span></label><ul class="ss-choices" role="radiogroup" aria-label="Why did you close this notification?  " style="margin-left: 0; border-bottom: 1px solid #eee; margin-bottom: 5px;padding-bottom: 5px;"><li style="display: inline-block  width: 20%; vertical-align: top;" class="ss-choice-item"><label><span class="ss-choice-item-control goog-inline-block"><input name="entry.2051066248" value="I don&#39;t speak the language you specified." id="group_2051066248_1" role="radio" class="ss-q-radio" aria-label="I don&#39;t speak the language you specified." required="" aria-required="true" type="radio"></span><span class="ss-choice-label">I don&#39;t speak the language you specified initially (' + interfaceLang + ')<br><small>(<span style="cursor: help; border-bottom: 1px dotted white;" title="The survey is in English - we would like to know if the first part of the notice was missing a translation">Translation missing?</span> Use "Other" to let us know!</small>).</span></label></li> <li style="display: inline-block  width: 20%; vertical-align: top;" class="ss-choice-item"><label><span class="ss-choice-item-control goog-inline-block"><input name="entry.2051066248" value="I don&#39;t want to view information in my first language." id="group_2051066248_2" role="radio" class="ss-q-radio" aria-label="I don&#39;t want to view information in my first language." required="" aria-required="true" type="radio"></span><span class="ss-choice-label">I don&#39;t want to view information in my first language.</span></label></li> <li style="display: inline-block  width: 20%; vertical-align: top;" class="ss-choice-item"><label><span class="ss-choice-item-control goog-inline-block"><input name="entry.2051066248" value="I just closed it because I don&#39;t like notifications." id="group_2051066248_3" role="radio" class="ss-q-radio" aria-label="I just closed it because I don&#39;t like notifications." required="" aria-required="true" type="radio"></span><span class="ss-choice-label">I just closed it because I don&#39;t like notifications.</span></label></li> <li style="display: inline-block  width: 20%; vertical-align: top;" class="ss-choice-item"><label><span class="ss-choice-item-control goog-inline-block"><input name="entry.2051066248" value="I believe that only the English wiki is up to date." id="group_2051066248_4" role="radio" class="ss-q-radio" aria-label="I believe that only the English wiki is up to date." required="" aria-required="true" type="radio"></span><span class="ss-choice-label">I believe that only the English wiki is up to date.</span></label></li> <li style="display: inline-block  width: 20%; vertical-align: top;" class="ss-choice-item"><label><span class="ss-choice-item-control goog-inline-block"><input name="entry.2051066248" value="__other_option__" id="group_2051066248_5" role="radio" class="ss-q-radio ss-q-other-toggle" required="" aria-required="true" type="radio"></span><span class="ss-choice-label">Other (please specify):&nbsp;</span></label><span class="ss-q-other-container goog-inline-block"><input name="entry.2051066248.other_option_response" value="" class="ss-q-other" id="entry_2051066248_other_option_response" dir="auto" aria-label="Sonstiges" type="text"></span></li></ul><span style="break: all;"></span><span class="error-message" id="1816475874_errorMessage"></span></span></span></span> <span class="ss-form-question errorbox-good" role="listitem"><span dir="ltr" class="ss-item  ss-text"><span class="ss-form-entry"><label style="width: 180px; display: inline-block;" class="ss-q-item-label" for="entry_564046202"><span class="ss-q-title">Your native language</span><span class="ss-q-help ss-secondary-text" dir="ltr">&nbsp;(optional)</span><br></label><input name="entry.564046202" value="" class="ss-q-short" id="entry_564046202" dir="auto" aria-label="Your native language (Optional) " title="" type="text"><span class="error-message" id="817274171_errorMessage"></span></span></span></span> <span style="display: none;" class="ss-form-question errorbox-good" role="listitem"><span dir="ltr" class="ss-item  ss-text"><span class="ss-form-entry"><label class="ss-q-item-label" for="entry_747264626"><span class="ss-q-title">The URL you have seen the notification</span><span class="ss-q-help ss-secondary-text" dir="ltr">Optional</span></label><input name="entry.747264626" value="" class="ss-q-short" id="entry_747264626" dir="auto" aria-label="The URL you have seen the notification Optional " title="" type="text"><span class="error-message" id="1782885489_errorMessage"></span></span></span></span> <span style="display: none;" class="ss-form-question errorbox-good" role="listitem"><span dir="ltr" class="ss-item  ss-text"><span class="ss-form-entry"><label class="ss-q-item-label" for="entry_914946379"><span class="ss-q-title">The URL you have been suggested to visit</span><span class="ss-q-help ss-secondary-text" dir="ltr">Optional</span></label><input name="entry.914946379" value="" class="ss-q-short" id="entry_914946379" dir="auto" aria-label="The URL you have been suggested to visit Optional " title="" type="text"><span class="error-message" id="1318944785_errorMessage"></span></span></span></span> <span class="ss-form-question errorbox-good" role="listitem"><span dir="ltr" class="ss-item  ss-text"><span class="ss-form-entry"><br><label style="width: 180px; display: inline-block;" class="ss-q-item-label" for="entry_1900023028"><span class="ss-q-title" title="If you&#39;d like to provide more feedback, let us know your username." style="border-bottom: 1px dotted white;">Your user name (optional)&nbsp;</span><span class="ss-q-help ss-secondary-text" dir="ltr"></span></label><input name="entry.1900023028" value="" class="ss-q-short" id="entry_1900023028" dir="auto" aria-label=" " title="" type="text"><span class="error-message" id="435054837_errorMessage"></span></span></span></span> <span style="display: none;"><input name="entry.976277236" value="" class="ss-q-short" id="entry_976277236" " title="" type="text"><input name="entry.923182137" value="" class="ss-q-short" id="entry_923182137" dir="auto" title="" type="text"><input name="entry.78557456" value="" class="ss-q-short" id="entry_78557456" dir="auto" title="" type="text"><input name="entry.1485251766" value="" class="ss-q-short" id="entry_1485251766" dir="auto" aria-label= title="" type="text"><input name="entry.129155343" value="" class="ss-q-short valid" id="entry_129155343" dir="auto"  title="" type="text"><input name="entry.760617973" value="" class="ss-q-short valid" id="entry_760617973" dir="auto" aria-label="auto: current article  " title="" type="text"><input name="entry.1964326657" value="" class="ss-q-short" id="entry_1964326657" dir="auto" title="" type="text"></span><br><input style="box-shadow: 0 0 2px 0px rgba(255,255,225,0.5); margin-top: 10px;" name="submit" value="Submit answer and close notification" id="ss-submit" type="submit" onclick="setCookiePermanent()"></ol></form></div></li>';


        var submitted = false;
        if (submitted == "true") {
            $('#LanguageNotificationClosed').css('display', 'none');
        } else {
            $(".WikiaBarWrapper.hidden").css("z-index", "10");
        }

        var NotifClosedForm = messageClosed;

        setTimeout(function() {

            $("#participatedYes").fadeIn(1000);

        }, 10000);

        var curURL = document.URL;

        var interlanguageApiUrl = mw.config.get('wgServer') + '/api.php?action=query&meta=siteinfo&siprop=interwikimap&format=json';

        //parsing interwikimap JSON string
        $(function() {

            var wiki, link, exists, language, message;
            $.getJSON(interlanguageApiUrl, function(data) {
                var interlanguageWikis = [],
                    map = data.query.interwikimap;

                //we browse the map gotten from the JSON string and only grab the element which have language prefix similar to interfaceLang
                for (var i = 0, len = map.length; i < len; i++) {
                    if (map[i].prefix !== null && map[i].prefix === interfaceLang) {
                        language = map[i].prefix || 'undef';
                        exists = true;

                        link = map[i].url.substring(map[i].url.indexOf('http://') + 7);
                        link = link.substring(0, link.indexOf('/'));
                        link = 'http://' + link + '/?ref=LWN&refwiki=' + mw.config.get('wgDBname') + '&refpage=' + mw.config.get('wgPageName');
                        break;
                    } else {
                        // display bubble if language exists
                        exists = false;
                    }
                }

                function getCookie(name) {
                    var re = new RegExp(name + "=([^;]+)");
                    var value = re.exec(document.cookie);
                    return (value != null) ? unescape(value[1]) : null;
                }

                var LWNnotClosed = getCookie("LWN") !== "closed";

                if (exists && LWNnotClosed) {

                    if (messages[interfaceLang]) {
                        message = messages[interfaceLang];
                    } else {
                        message = messages['undef'];
                    }
                    message = message.replace('$1', link);

                    if (messageClosed[interfaceLang]) {
                        message2 = messageClosed[interfaceLang];
                    } else {
                        message2 = messageClosed['undef'];
                    }

                    if ($('.WikiaNotifications').length > 0) {
                        $('<li><div id="LanguageNotification" style="z-index: 1000;"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');

                        var lwnInitiated = 'initiated';

                    } else {
                        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="z-index: 1000;" id="LanguageNotification"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
                    }
                    $('#LanguageNotification a.close-notification').click(function(close) {
                        $("div#LanguageNotification").css("display", "none");
                        $("div#LanguageNotification").after(NotifClosedForm);
                        $('#LanguageNotificationClosed ol ul li').css('display', 'block');

                        $(document).ready(function() {
                            setTimeout(function() {
                                checkPagename = $("#entry_760617973").val();

                                if (checkPagename === "") {
                                    $("#entry_976277236").val(suggested_url);
                                    $("#entry_923182137").val(browser_lang_stored);
                                    $("#entry_78557456").val(interfaceLang);
                                    $("#entry_1485251766").val(mw.config.get('wgDBname'));
                                    $("#entry_760617973").val(mw.config.get('wgPageName'));
                                    $("#entry_129155343").val(userOrAnon);
                                    $("#entry_1964326657").val(mw.config.get('skin'));
                                }
                            }, 500);
                        });


                    });
                }

            });
        });
    }
}(jQuery, mediaWiki));
//</syntaxhighlight>