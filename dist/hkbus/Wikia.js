// 配置未選擇授權協議警告
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'bot'
    ]
};

// 準備自定義未選擇授權協議警告消息
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};

// 添加使用自定義内容而非使用默認消息
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = '你需要添加授權協議上傳檔案，否則有機被刪除';
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = '你必須添加授權協議以上傳檔案';