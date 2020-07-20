//////////////////////////////////////////////////
// Translatable strings
//////////////////////////////////////////////////
//
// See instructions at
// http://en.wikipedia.org/wiki/Wikipedia:Tools/Navigation_popups/Translation
 
popupStrings = {
  /////////////////////////////////////
  // summary data, searching etc.
  /////////////////////////////////////
  'article': '문서',
  'category': '분류',
  'categories': 'categories',
  'image': '그림',
  'images': 'images',
  'stub': '토막글',
  'section stub': '부분 토막글',
  'Empty page': '빈 문서',
  'kB': 'kB',
  'bytes': '바이트',
  'day': '일',
  'days': '일',
  'hour': '시간',
  'hours': '시간',
  'minute': '분',
  'minutes': '분',
  'second': '초',
  'seconds': '초',
  'week': '주',
  'weeks': '주',
  'search': '검색',
  'SearchHint': '영어 위키백과에서 %s를 포함한 문서 검색',
  'web': '웹',
  'global': 'global',
  'globalSearchHint': '여러 언어판 위키백과에서 %s 검색',
  'googleSearchHint': '구글에서 %s 검색',
  'more...': 'more...',
  /////////////////////////////////////
  // article-related actions and info
  // (some actions also apply to user pages)
  /////////////////////////////////////
  'actions': 'actions',         ///// view articles and view talk
  'popupsMenu': '팝업',
  'disable previews': '미리보기 해제',
  'togglePreviewsHint': 'Toggle preview generation in popups on this page',
  'toggle previews': 'toggle previews',
  'reset': '초기화',
  'disable': '팝업 해제',
  'disablePopupsHint': '이 문서에서 팝업 해제. 다시 나오게 하려면 새로고침하면 됨.',
  'purgePopupsHint': '팝업 초기화. 팝업에 사용된 캐시도 함께 지웁니다.',
  'PopupsHint': '팝업 초기화. 팝업에 사용된 캐시도 함께 지웁니다.',
  'spacebar': 'space',
  'view': '보기',
  'view article': '문서 보기',
  'viewHint': '%s로 이동',
  'talk': '토론',
  'talk page': '토론 문서',
  'this revision': 'this revision',
  'revision %s of %s': 'revision %s of %s',
  'Revision %s of %s': 'Revision %s of %s',
  'the revision prior to revision %s of %s': 'the revision prior to revision %s of %s',
  'Toggle image size': '클릭하면 크기 변경',
  'del': 'del',                 ///// delete, protect, move
  'delete': '삭제',
  'deleteHint': '%s 문서를 삭제',
  'undeleteShort': '취소',
  'UndeleteHint': '%s의 삭제 기록 보기',
  'protect': '보호',
  'protectHint': '%s 문서의 편집 권한을 변경',
  'unprotectShort': '보호해제',
  'unprotectHint': '%s 문서의 편집 권한을 모두로 변경',
  'move': '이동',
  'move page': '문서 이동',
  'MovepageHint': '%s의 제목을 변경',
  'edit': '편집',               ///// edit articles and talk
  'edit article': '문서 편집',
  'editHint': '%s의 내용을 변경',
  'edit talk': '토론 편집',
  'new': '새주제',
  'new topic': '새 주제',
  'newSectionHint': '%s 문서에서 새 주제 편집',
  'null edit': '빈 편집',
  'nullEditHint': '%s 문서를 아무 편집도 하지 않고 저장',
  'hist': '史',               ///// history, diffs, editors, related
  'history': '역사',
  'historyHint': '%s의 변경 내역',
  'last': '최종',
  'lastEdit': '최종 편집',
  'show last edit': '가장 마지막 편집 보기',
  'Show the last edit': 'Show the effects of the most recent change',
  'lastContrib': '최종기여',
  'last set of edits': 'latest edits',
  'lastContribHint': '가장 마지막 편집자의 연속된 기여 묶어 보기',
  'cur': 'cur',
  'diffCur': 'diffCur',
  'Show changes since revision %s': '%s판부터의 차이 보기',
  '%s old': '%s 전', // as in 4 weeks old
  'oldEdit': 'oldEdit',
  'purge': 'purge',
  'purgeHint': 'Demand a fresh copy of %s',
  'raw': 'source',
  'rawHint': 'Download the source of %s',
  'render': 'simple',
  'renderHint': 'Show a plain HTML version of %s',
  'Show the edit made to get revision': 'Show the edit made to get revision',
  'sinceMe': '내이후',
  'changes since mine': 'diff my edit',
  'sinceMeHint': '내 마지막 편집부터 현재까지의 차이 보기',
  'Couldn\'t find an edit by %s\nin the last %s edits to\n%s': 'Couldn\'t find an edit by %s\nin the last %s edits to\n%s',
  'eds': 'eds',
  'editors': 'editors',
  'editorListHint': '%s 문서를 편집한 사용자 목록',
  'related': 'related',
  'relatedChanges': 'RC',
  'related changes': '가리키는 글',
  'RecentchangeslinkedHint': '%s를 가리키는 문서들의 최근 바뀜',
  'editOld': 'editOld',          ///// edit old version, or revert
  'rv': 'rv',
  'revert': '되돌리기',
  'revertHint': '%s로 되돌리기',
  'undo': '취소',
  'undoHint': '이 편집을 취소',
  'defaultpopupRedlinkSummary': '[[백:팝업|NavPop]]으로 없는 문서 [[%s]]로 연결된 바로가기 제거',
  'defaultpopupFixDabsSummary': 'Disambiguate [[%s]] to [[%s]] using [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupFixRedirsSummary': '[[백:팝업|NavPop]]으로 [[%s]]에서 [[%s]]로 넘겨주기 정리',
  'defaultpopupExtendedRevertSummary': 'Revert to revision dated %s by %s, oldid %s using [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupRevertToPreviousSummary': 'Revert to the revision prior to revision %s using [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupRevertSummary': '[[백:팝업|NavPop]]으로 %s판으로 되돌림',
  'defaultpopupQueriedRevertToPreviousSummary': 'Revert to the revision prior to revision $1 dated $2 by $3 using [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupQueriedRevertSummary': '[[백:팝업|NavPop]]으로 $3이 편집한 $1판($2)으로 되돌림',
  'defaultpopupRmDabLinkSummary': 'Remove link to dab page [[%s]] using [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'Redirects': '넘겨주기:', // as in Redirects to ...
  ' to ': '',           // as in Redirects to ...
  'Bypass redirect': '이중 넘겨주기 수정',
  'Fix this redirect': '이 넘겨주기 정비',
  'disambig': 'disambig',          ///// add or remove dab etc.
  'disambigHint': 'Disambiguate this link to [[%s]]',
  'Click to disambiguate this link to:': 'Click to disambiguate this link to:',
  'remove this link': '이 바로가기 제거',
  'remove all links to this page from this article': '문서에서 이 바로가기 모두 제거',
  'remove all links to this disambig page from this article': '문서에서 이 동음이의 바로가기 모두 제거',
  'mainlink': 'mainlink',          ///// links, watch, unwatch
  'wikiLink': 'wikiLink',
  'wikiLinks': 'wikiLinks',
  'links here': 'links here',
  'whatLinksHere': 'whatLinksHere',
  'what links here': 'what links here',
  'WhatlinkshereHint': '%s를 가리키는 문서 목록',
  'unwatchShort': '해제',
  'watchThingy': '주시',  // called watchThingy because {}.watch is a function
  'watchHint': '%s 문서를 내 주시문서 목록에 추가',
  'unwatchHint': '%s 문서를 내 주시문서 목록에서 제거',
  'Only found one editor: %s made %s edits': '편집자가 한 명 뿐입니다. %s씨가 %s번 편집했습니다.',
  '%s seems to be the last editor to the page %s': '%s seems to be the last editor to the page %s',
  'rss': 'rss',
  /////////////////////////////////////
  // diff previews
  /////////////////////////////////////
  'Diff truncated for performance reasons': 'Diff truncated for performance reasons',
  'Old revision': '이전 판',
  'New revision': '새 판',
  'Something went wrong :-(': 'Something went wrong :-(',
  'Empty revision, maybe non-existent': 'Empty revision, maybe non-existent',
  'Unknown date': '알 수 없는 날짜',
  /////////////////////////////////////
  // other special previews
  /////////////////////////////////////
  'Empty category': '빈 분류',
  'Category members (%s shown)': 'Category members (%s shown)',
  'No image links found': 'No image links found',
  'File links': 'File links',
  'not commons': '위키미디어 공용에는 이 이름의 파일이 없습니다.',
  'commons only': '이 파일은 위키미디어 공용에 있습니다.',
  'No image found': 'No image found',
  'commons dupe': '같은 파일이 위키미디어 공용에 있는 것 같습니다.',
  'commons conflict': '위키미디어 공용과 파일이 충돌합니다. 같은 이름의 다른 파일이 공용에 있습니다.',
  /////////////////////////////////////
  // user-related actions and info
  /////////////////////////////////////
  'user': '사용자',               ///// user page, talk, email, space
  'user page': '사용자 문서',
  'user talk': '사용자토론',
  'edit user talk': '사용자토론 편집',
  'leave comment': '메시지 남기기',
  'email': '이메일',
  'email user': '이메일 보내기',
  'EmailuserHint': '%s에게 이메일 보내기',
  'space': 'space', // short form for userSpace link
  'PrefixindexHint': 'Show pages in the userspace of %s',
  'count': '통계',             ///// contributions, tree, log
  'edit counter': '편집 내역',
  'katelinkHint': '%s의 기여 통계 보기',
  'contribs': '기여',
  'contributions': '사용자 기여',
  'ContributionsHint': '%s의 사용자 기여 보기',
  'tree': '트리',
  'contribsTreeHint': '%s의 기여를 이름공간과 문서에 따라 보기',
  'log': '로그',
  'user log': '사용자 로그',
  'userLogHint': '%s에 관련된 로그 보기',
  'arin': 'ARIN',             ///// ARIN lookup, block user or IP
  'Look up %s in ARIN whois database': '%s를 ARIN whois 데이터베이스로 검색',
  'unblockShort': '해제',
  'block': '차단',
  'block user': '사용자를 차단',
  'IpblocklistHint': '%s의 차단을 해제',
  'BlockipHint': '%s의 편집 권한을 박탈',
  'block log': '차단 로그',
  'blockLogHint': '%s의 차단 로그 보기',
  'protectLogHint': '%s의 보호 로그 보기',
  'pageLogHint': '%s의 문서 로그 보기',
  'deleteLogHint': '%s의 삭제 로그 보기',
  'Invalid %s %s': '옵션 %s를 실행할 수 없습니다. %s',
  /////////////////////////////////////
  // Autoediting
  /////////////////////////////////////
  'Enter a non-empty edit summary or press cancel to abort': '편집 요약을 입력하거나 취소를 눌러 중지하십시오.',
  'Failed to get revision information, please edit manually.\n\n': '판 정보 입수 실패. 수동으로 편집해 주십시오. \n\n',
  'The %s button has been automatically clicked. Please wait for the next page to load.': '%s 버튼이 자동으로 클릭되었습니다. 다음 페이지가 로딩될 때까지 기다려 주십시오.',
  'Could not find button %s. Please check the settings in your javascript file.': '%s 버튼을 찾지 못했습니다. 자바스크립트 파일의 설정을 확인해 주세요.',
  /////////////////////////////////////
  // Popups setup
  /////////////////////////////////////
  'Open full-size image': 'Open full-size image',
  'zxy': 'zxy'
};
//