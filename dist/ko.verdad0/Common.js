/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/*레퍼런스 팝업 (dev wiki)*/
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };
/*Welcome Module (Sia Wiki)*/
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:NewUser',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('rail-module')
                    .attr('id', 'welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('has-icon')
                            .text('This is the INFINITY WORLD')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('wds-button-group')
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancel')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('#welcome-module .anons').show();
            }
            $('#welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('#welcome-module').fadeOut('slow');
            });
            $('#welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('#welcome-module').fadeOut('slow');
            });
        });
    }
});
mw.hook('wikipage.content').add(function($content) {
  const links = {
    'card-a': 'https://verdad0.fandom.com/ko/wiki/%EC%95%8C%ED%8E%98%EC%9D%B4%EC%98%A4%EC%8A%A4',
    'card-b': 'https://verdad0.fandom.com/ko/wiki/%EC%95%84%EC%A6%88%EB%9D%BC%EC%97%98',
    'card-c': 'https://verdad0.fandom.com/ko/wiki/%EB%94%94%EB%AF%B8%ED%8A%B8%EB%A6%AC',
    'card-d': 'https://verdad0.fandom.com/ko/wiki/%EC%B9%B4%ED%97%A4%ED%85%94',
    'card-e': 'https://verdad0.fandom.com/ko/wiki/%ED%97%A4%EB%A5%B4%ED%82%A4%EB%82%98'
  };

  Object.entries(links).forEach(([cls, url]) => {
    const el = $content[0].querySelector(`.${cls}`);
    if (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        window.location.href = url;
      });
    }
  });
});
$(document).ready(function() {
    // 문서 이름이 "문서_A"일 때만 실행
    if (mw.config.get('wgPageName') === 'Sia') {
        var audio = $('<audio autoplay style="display:none;"> <source src="https://static.wikia.nocookie.net/verdad0/images/7/71/Fast.ogg/revision/latest?cb=20250130043855&path-prefix=ko" type="audio/ogg"> Your browser does not support the audio element. </audio>');
        $('body').append(audio);

        // 볼륨을 30%로 설정
        audio[0].volume = 0.3;
    }
});