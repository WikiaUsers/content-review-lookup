/* == Tabs == */
/* by User:ShermanTheMythran */

$('.tabBox').append('<style type="text/css">.tabTitle{display:inline-block;background:rgba(192,192,192,.1) !important;background:gray;padding:5px 5px 0;margin:-5px 5px 0;border-radius:100% 100% 0 0/10px 10px 0 0;-webkit-border-radius: 100% 100% 0 0/10px 10px 0 0;cursor:pointer;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;-o-transition:background .5s}.tabTitle.active{background:rgba(192,192,192,.3) !important;font-weight:bold}.tabTitle:hover{background:rgba(192,192,192,.5) !important}</style>');
$('.tabTitle').click(function(){$('.tabTitle').removeClass('active');$(this).addClass('active');});
$('#tab-1').click(function(){$('.tabContent').hide();$('#tab-1-content').show();});
$('#tab-2').click(function(){$('.tabContent').hide();$('#tab-2-content').show();});
$('#tab-3').click(function(){$('.tabContent').hide();$('#tab-3-content').show();});
$('#tab-4').click(function(){$('.tabContent').hide();$('#tab-4-content').show();});
$('#tab-5').click(function(){$('.tabContent').hide();$('#tab-5-content').show();});
$('#tab-6').click(function(){$('.tabContent').hide();$('#tab-6-content').show();});
$('#tab-7').click(function(){$('.tabContent').hide();$('#tab-7-content').show();});
$('#tab-8').click(function(){$('.tabContent').hide();$('#tab-8-content').show();});
$('#tab-9').click(function(){$('.tabContent').hide();$('#tab-9-content').show();});
$('#tab-10').click(function(){$('.tabContent').hide();$('#tab-10-content').show();});