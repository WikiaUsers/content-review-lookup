/* 此處的JavaScript將在所有用戶載入每個頁面時使用。 */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});
/*Globle Edits*/
$("#iframeKLNCitymap").replaceWith('<iframe src="https://www.google.com/maps/d/embed?mid=1eGms7lY_gdEedx_R_tBKGlagpel4tj_z" width=100% height="320"></iframe>');
/*iframe*/

function replaceRSS() {
    var str = document.getElementById("RSS").innerHTML; 
    var res = str.replace(" ******************** 運輸署現已推出《香港出行易》及《交通快訊》流動應用程式發布最新的交通消息。如遇重要事故，將同步透過《香港政府通知你》發出通知。請前往Google Play或App Store下載。", "");
    document.getElementById("RSS").innerHTML = res;
}


/*UserTag ImportJS*/
    /* Ref: https://dev.wikia.com/wiki/UserTags/zh */
window.UserTagsJS = {
	modules: {},
	tags: {
        'FloorPlanMaker' :{u: '製圖者' , link:'Project:人名標籤/製圖者'},
        'bot' :{u:'全能機械人' , link:'Project:人名標籤'},
        'PreTemplateMaker':{u: '準模板編輯者'},
        'TemplateMaker':{u:'模板編輯者'},
        'S-Destroyer':{u:'間接破壞者'},
        'Destroyer':{u:'破壞者'},
        'inactiveBOTadmin':{u:'機械人冷卻中'},
        'lazyAdmin':{u:'偷懶的管理員'},
        'semiAdmin':{u:'半管理員'},
        'warned':{u:'已被警告'},
        'BestDeveloper':{u: '最佳編輯者', link:'Project:人名標籤/最佳編輯者'}
        },
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
    'David287x12':['BestDeveloper'],
    'ycohui':['FloorPlanMaker' ,'5dayWorker'],
    'KMB32H':['warned'],
    'BOTycohui':['inactive','bot']
};
UserTagsJS.modules.implode = {
	'inactiveBOTadmin': ['inactive','bot', 'sysop', 'bureaucrat'],
	//'lazy admin': ['sysop', 'inactive'],
	'semiAdmin': ['chatmoderator', 'patroller', 'rollback']
};
/*
UserTagsJS.modules.userfilter = {
	'Pakhin04': ['sysop']
};
*/
UserTagsJS.modules.metafilter = {
	'inactive': ['bureaucrat'], 
	'sysop': ['bureaucrat','bot'],
	'bureaucrat': ['bot']
};
/*RailWAM*/
window.railWAM = {
    logPage:"Project:WAM Log"
};
/*Standard Edit Summary*/
// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 

window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'Template:Stdsummaries'
};
 
// The options need to be set before the import! Otherwise they may not work.
 
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

// Sandbox
function SNGFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("SNGInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("SNGTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}