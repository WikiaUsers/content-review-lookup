mw.hook('wikipage.content').add(function () {
    const $audio = $('.mw-parser-output audio');
    if (!$audio.length || $('.audio-toggler').length) return;
    $audio.each(function () { this.pause(); });
    $('.page-header__meta').append($('<a>', { class: 'audio-toggler', text: '播放/暂停所有音频' }));
});