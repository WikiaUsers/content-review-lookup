// 貢献度に応じた重み付き referral codes
// weightは表示頻度の倍数 (weight=3なら3倍)
// weight = 0 の場合は表示されない（非表示）
// 2025/09/07 変更
window.referralCodes = [
  { code: "STAR-C9RN-26M7", weight: 2 }, // Panasony, 1倍
  { code: "STAR-JWK2-3XKJ", weight: 1 }, // Verkhasel, 1倍
  { code: "STAR-VMLZ-SKXK", weight: 0 }, // Eno42? 一時的に非表示
  { code: "STAR-HW3P-FXB3", weight: 0 }, // Who? 一時的に非表示
];

// 準備完了を通知
mw.hook('referralCodes.ready').fire(window.referralCodes);