/*!
 * 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다.
 * Any JavaScript here will be loaded for all users on every page load.
 */

/* 변수 | Variables */

var cfg = mw.config.get([
    'wgAction',
    'wgIsMainPage',
    'wgNamespaceNumber',
    'wgUserGroups'
]);

var userIsAdmin =  cfg.wgUserGroups.indexOf('sysop') !== -1;

/* 모듈 | Modules */

importArticles({
    type: 'script',
    articles: [
        // 'MediaWiki:Common.js/elementClass.js',
        'MediaWiki:GoogleAnalytics.js'
    ]
});

/* 추가 기능 | Custom functions */

(function($) {
    var $contentBase = $('#mw-content-text');
    
    // 관리자에게 `.admin-only` 클래스를 가진 숨겨진 요소들을 보이게 함
    showAdminOnly(); 
    
    // 설문조사 양식에서 라디오 버튼 대신 텍스트로 클릭 가능하도록 교정
    fixAjaxPollLabel(); 
    
    // When using <poll /> component,
    // 1. users cannot click option texts to select them
    // 2. radio buttons' appearance is not customizable.
    // The code below does these 2 things.
    function fixAjaxPollLabel() {
        // skip on pages w/o any poll
        if ( !$contentBase.find('.ajax-poll').length ) {
            return;
        }
        // force labels to toggle relevant radio buttons
        $(document).on('click', '.pollAnswerName label', function(event) {
            // skip if user clicked the radio button inside the label
            if (event.target.tagName.toUpperCase() === 'INPUT') {
                return;
            }
            var $label = $(this);
            var $input = $label.find('input');
            var isChecked = $input.is(':checked');
            // toggle the radio button's check state
            $input.prop('checked', !isChecked);
            // toggle CSS class to allow styling
            $label.closest('form').find('label').removeClass('is-checked');
            $label.addClass('is-checked');
        });
    }

    // Show admin-only buttons to users w/ admin rights
    function showAdminOnly() {
        if (!userIsAdmin) {
            return;
        }
        $('.admin-only').addClass('is-visible');
    }
})(jQuery);