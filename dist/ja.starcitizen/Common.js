// referralCodesランダム表示スクリプト 使用する場合は <span class="randomReferralCode"></span>
importScript('MediaWiki:ReferralCodes.js');

(function () {
  function sanitizeWeight(w) {
    w = Number(w);
    if (isNaN(w) || w < 0) return 1;
    if (w === 0) return 0;
    return w;
  }

  function getWeightedRandom(arr) {
    const filtered = arr.filter(item => sanitizeWeight(item.weight) > 0);
    if (filtered.length === 0) return null;

    const totalWeight = filtered.reduce((sum, item) => sum + sanitizeWeight(item.weight), 0);
    let rand = Math.random() * totalWeight;

    for (const item of filtered) {
      const w = sanitizeWeight(item.weight);
      if (rand < w) return item.code;
      rand -= w;
    }
  }

  function processContent($content) {
    // Referral Code の置換
    $content.find('.randomReferralCode').each(function () {
      const code = getWeightedRandom(window.referralCodes);
      if (code) {
        $(this).text(code);
      } else {
        $(this).hide();
      }
    });

    // 紹介コードクリックでコピー機能
    $(document).off('click.referral').on('click.referral', '.referral-code-box', function () {
      const text = $(this).text().trim();
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        const $box = $(this);
        $box.addClass('copied');
        setTimeout(() => $box.removeClass('copied'), 1500);
      }).catch(err => {
        console.error('コピーに失敗しました:', err);
      });
    });

    // 折りたたみ初期化（MediaWiki標準）
    $content.find('.mw-collapsible').makeCollapsible();

    // ▶ 回転用：クリックで.activeを付け外し
    $content.find('.wikia-menu-button').off('click.toggleIcon').on('click.toggleIcon', function () {
      $(this).toggleClass('active');
    });
  }

  // makeCollapsible 読み込み後に referralCodes.ready を待つ
  mw.loader.using('jquery.makeCollapsible').then(function () {
    mw.hook('referralCodes.ready').add(function () {
      // 初回ロード
      processContent($(document));

      // AJAX差し替え時
      mw.hook('wikipage.content').add(processContent);
    });
  });

})();