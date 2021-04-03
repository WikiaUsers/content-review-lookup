;value101
;gameid A Dream of Summer
;　-------------------------------------------
;
;　縦書きノベル形式システム　Ver1.00　猫廼
;　（NScripter　Ver2.49以降対応）
;
;　システム最終更新日　2005 06/06
;
;　-------------------------------------------

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　サブルーチン開始
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　メニュー処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
*rclk
dwavestop 0
if %29 = 1 dwave 1,"dat\music\se\se02.wav":gosub *windowoff:goto *check_reset
if %133 == 0 dwave 1,"dat\music\se\se02.wav":gosub *winhide:return

*callmenu
dwave 1,"dat\music\se\se02.wav";　＜ＳＥ　メニュー呼び出し音＞
if %29 = 1 gosub *windowoff:goto *check_reset
saveoff

gosub *windowoff

if %130 == 3 goto *menu_save
if %130 == 2 goto *menu_load
if %130 == 1 goto *menu_op

if %116 == 3 goto *menu_save
if %116 == 2 goto *menu_load
if %116 == 1 goto *menu_op

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　セーブ処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*menu_save
btndef ""
gosub *sp151off
mov %116,3

	vsp 143,1
	vsp 144,1
	vsp 145,1

	vsp 146,1
	amsp 146,32,20,180

	lsp 102,":s/20,20,0;#FFFFFF`　Save　",80,38
	lsp 103,":s/20,20,0;#8888aa#FFFF66`　Load　",240,38
	lsp 104,":s/20,20,0;#8888aa#FFFF66`　Options",400,38

	gosub *sl_page
	gosub *s_samu

	spbtn 53,53
	spbtn 54,54
	spbtn 55,55
	spbtn 56,56
	spbtn 57,57
	spbtn 58,58
	spbtn 59,59

	spbtn 103,103
	spbtn 104,104

	spbtn 143,143
	spbtn 144,144
	spbtn 145,145

	exbtn_d "C106C107C108C109C111C112C113C114C115C116C117C118C119C120C121C122"
	exbtn 131,111,"C106C107C108C109P111C112C113C114C115C116C117C118C119C120C121C122"
	exbtn 132,112,"C106C107C108C109C111P112C113C114C115C116C117C118C119C120C121C122"
	exbtn 133,113,"C106C107C108C109C111C112P113C114C115C116C117C118C119C120C121C122"
	exbtn 134,114,"C106C107C108C109C111C112C113P114C115C116C117C118C119C120C121C122"
	exbtn 135,115,"C106C107C108C109C111C112C113C114P115C116C117C118C119C120C121C122"
	exbtn 136,116,"C106C107C108C109C111C112C113C114C115P116C117C118C119C120C121C122"
	exbtn 137,117,"C106C107C108C109C111C112C113C114C115C116P117C118C119C120C121C122"
	exbtn 138,118,"C106C107C108C109C111C112C113C114C115C116C117P118C119C120C121C122"
	exbtn 139,119,"P106C107C108C109C111C112C113C114C115C116C117C118P119C120C121C122"
	exbtn 140,120,"C106P107C108C109C111C112C113C114C115C116C117C118C119P120C121C122"
	exbtn 141,121,"C106C107P108C109C111C112C113C114C115C116C117C118C119C120P121C122"
	exbtn 142,122,"C106C107C108P109C111C112C113C114C115C116C117C118C119C120C121P122"

	print %109

*menu_saveloop
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
btnwait %0

	if %0 == 53 dwave 1,"dat\music\se\se01.wav":sub %115,1:goto *menu_save
	if %0 == 54 dwave 1,"dat\music\se\se01.wav":mov %115,1:goto *menu_save
	if %0 == 55 dwave 1,"dat\music\se\se01.wav":mov %115,2:goto *menu_save
	if %0 == 56 dwave 1,"dat\music\se\se01.wav":mov %115,3:goto *menu_save
	if %0 == 57 dwave 1,"dat\music\se\se01.wav":mov %115,4:goto *menu_save
	if %0 == 58 dwave 1,"dat\music\se\se01.wav":mov %115,5:goto *menu_save
	if %0 == 59 dwave 1,"dat\music\se\se01.wav":add %115,1:goto *menu_save


	if %0 == 0 goto *menu_saveloop
	if %0 == -1 goto *menuend
	if %0 == 103 dwave 1,"dat\music\se\se01.wav":vsp 146,0:goto *menu_load
	if %0 == 104 dwave 1,"dat\music\se\se01.wav":vsp 146,0:goto *menu_op

if %0>=123 & %0<=110 goto *notsave
mov %7,%0
sub %7,110 

if %0 >= 119 add %7,32:goto *qsaveskip
if %115 = 2 add %7,8
if %115 = 3 add %7,16
if %115 = 4 add %7,24
if %115 = 5 add %7,32

*qsaveskip

savefileexist %8,%7

*savecheck_end

if %8 == 1 dwave 1,"dat\music\se\se01.wav":gosub *check_save
gosub *sp111_122del
print 1
if %7 == -1 goto *notsave

if %115 = 1 goto *savepage_01
if %115 = 2 goto *savepage_02
if %115 = 3 goto *savepage_03
if %115 = 4 goto *savepage_04
if %115 = 5 goto *savepage_05

*savepage_01

	if %0 == 111 dwave 4,"dat\music\se\se04.wav":savegame 1:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save01.bmp":csp 131
	if %0 == 112 dwave 4,"dat\music\se\se04.wav":savegame 2:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save02.bmp":csp 132
	if %0 == 113 dwave 4,"dat\music\se\se04.wav":savegame 3:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save03.bmp":csp 133
	if %0 == 114 dwave 4,"dat\music\se\se04.wav":savegame 4:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save04.bmp":csp 134
	if %0 == 115 dwave 4,"dat\music\se\se04.wav":savegame 5:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save05.bmp":csp 135
	if %0 == 116 dwave 4,"dat\music\se\se04.wav":savegame 6:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save06.bmp":csp 136
	if %0 == 117 dwave 4,"dat\music\se\se04.wav":savegame 7:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save07.bmp":csp 137
	if %0 == 118 dwave 4,"dat\music\se\se04.wav":savegame 8:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save08.bmp":csp 138

goto *savepage_end

*savepage_02

	if %0 == 111 dwave 4,"dat\music\se\se04.wav":savegame 9:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save09.bmp":csp 131
	if %0 == 112 dwave 4,"dat\music\se\se04.wav":savegame 10:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save10.bmp":csp 132
	if %0 == 113 dwave 4,"dat\music\se\se04.wav":savegame 11:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save11.bmp":csp 133
	if %0 == 114 dwave 4,"dat\music\se\se04.wav":savegame 12:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save12.bmp":csp 134
	if %0 == 115 dwave 4,"dat\music\se\se04.wav":savegame 13:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save13.bmp":csp 135
	if %0 == 116 dwave 4,"dat\music\se\se04.wav":savegame 14:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save14.bmp":csp 136
	if %0 == 117 dwave 4,"dat\music\se\se04.wav":savegame 15:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save15.bmp":csp 137
	if %0 == 118 dwave 4,"dat\music\se\se04.wav":savegame 16:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save16.bmp":csp 138

goto *savepage_end

*savepage_03

	if %0 == 111 dwave 4,"dat\music\se\se04.wav":savegame 17:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save17.bmp":csp 131
	if %0 == 112 dwave 4,"dat\music\se\se04.wav":savegame 18:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save18.bmp":csp 132
	if %0 == 113 dwave 4,"dat\music\se\se04.wav":savegame 19:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save19.bmp":csp 133
	if %0 == 114 dwave 4,"dat\music\se\se04.wav":savegame 20:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save20.bmp":csp 134
	if %0 == 115 dwave 4,"dat\music\se\se04.wav":savegame 21:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save21.bmp":csp 135
	if %0 == 116 dwave 4,"dat\music\se\se04.wav":savegame 22:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save22.bmp":csp 136
	if %0 == 117 dwave 4,"dat\music\se\se04.wav":savegame 23:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save23.bmp":csp 137
	if %0 == 118 dwave 4,"dat\music\se\se04.wav":savegame 24:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save24.bmp":csp 138

goto *savepage_end

*savepage_04

	if %0 == 111 dwave 4,"dat\music\se\se04.wav":savegame 25:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save25.bmp":csp 131
	if %0 == 112 dwave 4,"dat\music\se\se04.wav":savegame 26:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save26.bmp":csp 132
	if %0 == 113 dwave 4,"dat\music\se\se04.wav":savegame 27:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save27.bmp":csp 133
	if %0 == 114 dwave 4,"dat\music\se\se04.wav":savegame 28:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save28.bmp":csp 134
	if %0 == 115 dwave 4,"dat\music\se\se04.wav":savegame 29:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save29.bmp":csp 135
	if %0 == 116 dwave 4,"dat\music\se\se04.wav":savegame 30:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save30.bmp":csp 136
	if %0 == 117 dwave 4,"dat\music\se\se04.wav":savegame 31:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save31.bmp":csp 137
	if %0 == 118 dwave 4,"dat\music\se\se04.wav":savegame 32:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save32.bmp":csp 138

goto *savepage_end

*savepage_05

	if %0 == 111 dwave 4,"dat\music\se\se04.wav":savegame 33:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save33.bmp":csp 131
	if %0 == 112 dwave 4,"dat\music\se\se04.wav":savegame 34:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save34.bmp":csp 132
	if %0 == 113 dwave 4,"dat\music\se\se04.wav":savegame 35:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save35.bmp":csp 133
	if %0 == 114 dwave 4,"dat\music\se\se04.wav":savegame 36:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save36.bmp":csp 134
	if %0 == 115 dwave 4,"dat\music\se\se04.wav":savegame 37:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save37.bmp":csp 135
	if %0 == 116 dwave 4,"dat\music\se\se04.wav":savegame 38:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save38.bmp":csp 136
	if %0 == 117 dwave 4,"dat\music\se\se04.wav":savegame 39:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save39.bmp":csp 137
	if %0 == 118 dwave 4,"dat\music\se\se04.wav":savegame 40:vsp 146,0:gosub *save_ss_100:vsp 146,1:print 1:savescreenshot "savedata\save40.bmp":csp 138

goto *savepage_end

*savepage_end

	if %0 == 119 dwave 4,"dat\music\se\se04.wav":savegame 41:vsp 146,0:gosub *save_ss_64:vsp 146,1:print 1:savescreenshot "savedata\qsave01.bmp":csp 139
	if %0 == 120 dwave 4,"dat\music\se\se04.wav":savegame 42:vsp 146,0:gosub *save_ss_64:vsp 146,1:print 1:savescreenshot "savedata\qsave02.bmp":csp 140
	if %0 == 121 dwave 4,"dat\music\se\se04.wav":savegame 43:vsp 146,0:gosub *save_ss_64:vsp 146,1:print 1:savescreenshot "savedata\qsave03.bmp":csp 141
	if %0 == 122 dwave 4,"dat\music\se\se04.wav":savegame 44:vsp 146,0:gosub *save_ss_64:vsp 146,1:print 1:savescreenshot "savedata\qsave04.bmp":csp 142

*notsave

	if %0 == 143 dwave 1,"dat\music\se\se01.wav":goto *menuend
	if %0 == 144 dwave 1,"dat\music\se\se01.wav":gosub *check_reset:lsp 144,":a/2,0,3;dat\system\menu02.jpg",230,400:print 1
	if %0 == 145 dwave 1,"dat\music\se\se01.wav":gosub *check_end:lsp 145,":a/2,0,3;dat\system\menu03.jpg",427,400:print 1

	if %0 == 116 dwave 1,"dat\music\se\se01.wav":gosub *qsave:lsp 111,":s/12,12,0;#8888aa#FFFF66Ｑ．ＳＡＶＥ",220,450:print 1:gosub *sysbtn:goto *text_lb
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":gosub *qload:lsp 112,":s/12,12,0;#8888aa#FFFF66Ｑ．ＬＯＡＤ",304,450:print 1:goto *text_lb
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":gosub *callmenu:goto *text_lb

	if %0 == 124 dwave 1,"dat\music\se\se01.wav":gosub *keyhelp


	if %0 == -10 dwave 1,"dat\music\se\se01.wav":gosub *check_reset	;Esc
	if %0 == -11 dwave 1,"dat\music\se\se01.wav":goto *menuend	;スペース

	if %0 == -20 dwave 1,"dat\music\se\se01.wav":minimizewindow	;tab

	if %0 == -25 dwave 1,"dat\music\se\se01.wav":loadgame 41
	if %0 == -26 dwave 1,"dat\music\se\se01.wav":loadgame 42
	if %0 == -27 dwave 1,"dat\music\se\se01.wav":loadgame 43
	if %0 == -28 dwave 1,"dat\music\se\se01.wav":loadgame 44

	if %0 == -32 dwave 1,"dat\music\se\se01.wav":gosub *keyhelp

	if %0 == -50 dwave 1,"dat\music\se\se01.wav":gosub *fuls

	wait 150

goto *menu_save

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　ページ・カーソル表示処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sl_page

if %115 <= 0 mov %115,5
if %115 >= 6 mov %115,1

itoa $1,%115:add $1,"/5 Page"
mov $0,":s/25,20,0;#FFFFFF"
add $0,$1

	lsp 51,$0,50,90
	lsp 52,":s/25,20,0;#CCCCCC　　　　・　・　・　・",200,90

	lsp 53,":s/25,20,0;#CCCCCC#FFFFFF＜＜",200,90
	lsp 54,":s/25,20,0;#CCCCCC#FFFFFF１",275,90
	lsp 55,":s/25,20,0;#CCCCCC#FFFFFF２",325,90
	lsp 56,":s/25,20,0;#CCCCCC#FFFFFF３",375,90
	lsp 57,":s/25,20,0;#CCCCCC#FFFFFF４",425,90
	lsp 58,":s/25,20,0;#CCCCCC#FFFFFF５",475,90
	lsp 59,":s/25,20,0;#CCCCCC#FFFFFF＞＞",525,90

	mov %10,41:gosub *savedata:lsph 106,$0,52,377
	mov %10,42:gosub *savedata:lsph 107,$0,192,377
	mov %10,43:gosub *savedata:lsph 108,$0,332,377
	mov %10,44:gosub *savedata:lsph 109,$0,472,377

	lsph 111,":a;dat\system\cursor01.jpg",59,124
	lsph 112,":a;dat\system\cursor01.jpg",199,124
	lsph 113,":a;dat\system\cursor01.jpg",339,124
	lsph 114,":a;dat\system\cursor01.jpg",479,124
	lsph 115,":a;dat\system\cursor01.jpg",59,229
	lsph 116,":a;dat\system\cursor01.jpg",199,229
	lsph 117,":a;dat\system\cursor01.jpg",339,229
	lsph 118,":a;dat\system\cursor01.jpg",479,229

    lsph 119,":a;dat\system\cursor02.jpg",50,335
	lsph 120,":a;dat\system\cursor02.jpg",190,335
	lsph 121,":a;dat\system\cursor02.jpg",330,335
	lsph 122,":a;dat\system\cursor02.jpg",470,335

if %115 = 1 goto *datapage_01
if %115 = 2 goto *datapage_02
if %115 = 3 goto *datapage_03
if %115 = 4 goto *datapage_04
if %115 = 5 goto *datapage_05

mov %115,1

*datapage_01

	mov %10,1:gosub *savedata:lsp 123,$0,52,206
	mov %10,2:gosub *savedata:lsp 124,$0,192,206
	mov %10,3:gosub *savedata:lsp 125,$0,332,206
	mov %10,4:gosub *savedata:lsp 126,$0,472,206
	mov %10,5:gosub *savedata:lsp 127,$0,52,310
	mov %10,6:gosub *savedata:lsp 128,$0,192,310
	mov %10,7:gosub *savedata:lsp 129,$0,332,310
	mov %10,8:gosub *savedata:lsp 130,$0,472,310

goto *datapage_end

*datapage_02

	mov %10,9:gosub *savedata:lsp 123,$0,52,206
	mov %10,10:gosub *savedata:lsp 124,$0,192,206
	mov %10,11:gosub *savedata:lsp 125,$0,332,206
	mov %10,12:gosub *savedata:lsp 126,$0,472,206
	mov %10,13:gosub *savedata:lsp 127,$0,52,310
	mov %10,14:gosub *savedata:lsp 128,$0,192,310
	mov %10,15:gosub *savedata:lsp 129,$0,332,310
	mov %10,16:gosub *savedata:lsp 130,$0,472,310

goto *datapage_end

*datapage_03

	mov %10,17:gosub *savedata:lsp 123,$0,52,206
	mov %10,18:gosub *savedata:lsp 124,$0,192,206
	mov %10,19:gosub *savedata:lsp 125,$0,332,206
	mov %10,20:gosub *savedata:lsp 126,$0,472,206
	mov %10,21:gosub *savedata:lsp 127,$0,52,310
	mov %10,22:gosub *savedata:lsp 128,$0,192,310
	mov %10,23:gosub *savedata:lsp 129,$0,332,310
	mov %10,24:gosub *savedata:lsp 130,$0,472,310

goto *datapage_end

*datapage_04

	mov %10,25:gosub *savedata:lsp 123,$0,52,206
	mov %10,26:gosub *savedata:lsp 124,$0,192,206
	mov %10,27:gosub *savedata:lsp 125,$0,332,206
	mov %10,28:gosub *savedata:lsp 126,$0,472,206
	mov %10,29:gosub *savedata:lsp 127,$0,52,310
	mov %10,30:gosub *savedata:lsp 128,$0,192,310
	mov %10,31:gosub *savedata:lsp 129,$0,332,310
	mov %10,32:gosub *savedata:lsp 130,$0,472,310

goto *datapage_end

*datapage_05

	mov %10,33:gosub *savedata:lsp 123,$0,52,206
	mov %10,34:gosub *savedata:lsp 124,$0,192,206
	mov %10,35:gosub *savedata:lsp 125,$0,332,206
	mov %10,36:gosub *savedata:lsp 126,$0,472,206
	mov %10,37:gosub *savedata:lsp 127,$0,52,310
	mov %10,38:gosub *savedata:lsp 128,$0,192,310
	mov %10,39:gosub *savedata:lsp 129,$0,332,310
	mov %10,40:gosub *savedata:lsp 130,$0,472,310

goto *datapage_end

*datapage_end

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　セーブサムネイル取得処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*s_samu

if %115 = 1 goto *spage_01
if %115 = 2 goto *spage_02
if %115 = 3 goto *spage_03
if %115 = 4 goto *spage_04
if %115 = 5 goto *spage_05

*spage_01

	fileexist %6,"savedata\save01.bmp"
	if %6 == 1 lsp 131,":c;savedata\save01.bmp",59,124
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save02.bmp"
	if %6 == 1 lsp 132,":c;savedata\save02.bmp",199,124
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save03.bmp"
	if %6 == 1 lsp 133,":c;savedata\save03.bmp",339,124
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save04.bmp"
	if %6 == 1 lsp 134,":c;savedata\save04.bmp",479,124
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save05.bmp"
	if %6 == 1 lsp 135,":c;savedata\save05.bmp",59,229
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save06.bmp"
	if %6 == 1 lsp 136,":c;savedata\save06.bmp",199,229
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save07.bmp"
	if %6 == 1 lsp 137,":c;savedata\save07.bmp",339,229
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save08.bmp"
	if %6 == 1 lsp 138,":c;savedata\save08.bmp",479,229
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *spage_end

*spage_02

	fileexist %6,"savedata\save09.bmp"
	if %6 == 1 lsp 131,":c;savedata\save09.bmp",59,124
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save10.bmp"
	if %6 == 1 lsp 132,":c;savedata\save10.bmp",199,124
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save11.bmp"
	if %6 == 1 lsp 133,":c;savedata\save11.bmp",339,124
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save12.bmp"
	if %6 == 1 lsp 134,":c;savedata\save12.bmp",479,124
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save13.bmp"
	if %6 == 1 lsp 135,":c;savedata\save13.bmp",59,229
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save14.bmp"
	if %6 == 1 lsp 136,":c;savedata\save14.bmp",199,229
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save15.bmp"
	if %6 == 1 lsp 137,":c;savedata\save15.bmp",339,229
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save16.bmp"
	if %6 == 1 lsp 138,":c;savedata\save16.bmp",479,229
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *spage_end

*spage_03

	fileexist %6,"savedata\save17.bmp"
	if %6 == 1 lsp 131,":c;savedata\save17.bmp",59,124
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save18.bmp"
	if %6 == 1 lsp 132,":c;savedata\save18.bmp",199,124
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save19.bmp"
	if %6 == 1 lsp 133,":c;savedata\save19.bmp",339,124
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save20.bmp"
	if %6 == 1 lsp 134,":c;savedata\save20.bmp",479,124
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save21.bmp"
	if %6 == 1 lsp 135,":c;savedata\save21.bmp",59,229
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save22.bmp"
	if %6 == 1 lsp 136,":c;savedata\save22.bmp",199,229
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save23.bmp"
	if %6 == 1 lsp 137,":c;savedata\save23.bmp",339,229
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save24.bmp"
	if %6 == 1 lsp 138,":c;savedata\save24.bmp",479,229
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *spage_end

*spage_04

	fileexist %6,"savedata\save25.bmp"
	if %6 == 1 lsp 131,":c;savedata\save25.bmp",59,124
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save26.bmp"
	if %6 == 1 lsp 132,":c;savedata\save26.bmp",199,124
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save27.bmp"
	if %6 == 1 lsp 133,":c;savedata\save27.bmp",339,124
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save28.bmp"
	if %6 == 1 lsp 134,":c;savedata\save28.bmp",479,124
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save29.bmp"
	if %6 == 1 lsp 135,":c;savedata\save29.bmp",59,229
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save30.bmp"
	if %6 == 1 lsp 136,":c;savedata\save30.bmp",199,229
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save31.bmp"
	if %6 == 1 lsp 137,":c;savedata\save31.bmp",339,229
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save32.bmp"
	if %6 == 1 lsp 138,":c;savedata\save32.bmp",479,229
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *spage_end

*spage_05

	fileexist %6,"savedata\save33.bmp"
	if %6 == 1 lsp 131,":c;savedata\save33.bmp",59,124
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save34.bmp"
	if %6 == 1 lsp 132,":c;savedata\save34.bmp",199,124
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save35.bmp"
	if %6 == 1 lsp 133,":c;savedata\save35.bmp",339,124
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save36.bmp"
	if %6 == 1 lsp 134,":c;savedata\save36.bmp",479,124
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save37.bmp"
	if %6 == 1 lsp 135,":c;savedata\save37.bmp",59,229
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save38.bmp"
	if %6 == 1 lsp 136,":c;savedata\save38.bmp",199,229
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save39.bmp"
	if %6 == 1 lsp 137,":c;savedata\save39.bmp",339,229
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save40.bmp"
	if %6 == 1 lsp 138,":c;savedata\save40.bmp",479,229
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *spage_end


*spage_end

	fileexist %6,"savedata\qsave01.bmp"
	if %6 == 1 lsp 139,":c;savedata\qsave01.bmp",50,335
	if %6 == 0 lsp 139,":c;dat\system\d_qsave.bmp",50,335

	fileexist %6,"savedata\qsave02.bmp"
	if %6 == 1 lsp 140,":c;savedata\qsave02.bmp",190,335
	if %6 == 0 lsp 140,":c;dat\system\d_qsave.bmp",190,335

	fileexist %6,"savedata\qsave03.bmp"
	if %6 == 1 lsp 141,":c;savedata\qsave03.bmp",330,335
	if %6 == 0 lsp 141,":c;dat\system\d_qsave.bmp",330,335

	fileexist %6,"savedata\qsave04.bmp"
	if %6 == 1 lsp 142,":c;savedata\qsave04.bmp",470,335
	if %6 == 0 lsp 142,":c;dat\system\d_qsave.bmp",470,335

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　ロードサムネイル取得処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*l_samu

if %115 = 1 goto *lpage_01
if %115 = 2 goto *lpage_02
if %115 = 3 goto *lpage_03
if %115 = 4 goto *lpage_04
if %115 = 5 goto *lpage_05

*lpage_01

	fileexist %6,"savedata\save01.bmp"
	if %6 == 1 lsp 131,":c;savedata\save01.bmp",59,124:exbtn 131,111,"C106C107C108C109P111C112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save02.bmp"
	if %6 == 1 lsp 132,":c;savedata\save02.bmp",199,124:exbtn 132,112,"C106C107C108C109C111P112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save03.bmp"
	if %6 == 1 lsp 133,":c;savedata\save03.bmp",339,124:exbtn 133,113,"C106C107C108C109C111C112P113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save04.bmp"
	if %6 == 1 lsp 134,":c;savedata\save04.bmp",479,124:exbtn 134,114,"C106C107C108C109C111C112C113P114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save05.bmp"
	if %6 == 1 lsp 135,":c;savedata\save05.bmp",59,229:exbtn 135,115,"C106C107C108C109C111C112C113C114P115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save06.bmp"
	if %6 == 1 lsp 136,":c;savedata\save06.bmp",199,229:exbtn 136,116,"C106C107C108C109C111C112C113C114C115P116C117C118C119C120C121C122"
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save07.bmp"
	if %6 == 1 lsp 137,":c;savedata\save07.bmp",339,229:exbtn 137,117,"C106C107C108C109C111C112C113C114C115C116P117C118C119C120C121C122"
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save08.bmp"
	if %6 == 1 lsp 138,":c;savedata\save08.bmp",479,229:exbtn 138,118,"C106C107C108C109C111C112C113C114C115C116C117P118C119C120C121C122"
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *lpage_end


*lpage_02

	fileexist %6,"savedata\save09.bmp"
	if %6 == 1 lsp 131,":c;savedata\save09.bmp",59,124:exbtn 131,111,"C106C107C108C109P111C112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save10.bmp"
	if %6 == 1 lsp 132,":c;savedata\save10.bmp",199,124:exbtn 132,112,"C106C107C108C109C111P112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save11.bmp"
	if %6 == 1 lsp 133,":c;savedata\save11.bmp",339,124:exbtn 133,113,"C106C107C108C109C111C112P113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save12.bmp"
	if %6 == 1 lsp 134,":c;savedata\save12.bmp",479,124:exbtn 134,114,"C106C107C108C109C111C112C113P114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save13.bmp"
	if %6 == 1 lsp 135,":c;savedata\save13.bmp",59,229:exbtn 135,115,"C106C107C108C109C111C112C113C114P115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save14.bmp"
	if %6 == 1 lsp 136,":c;savedata\save14.bmp",199,229:exbtn 136,116,"C106C107C108C109C111C112C113C114C115P116C117C118C119C120C121C122"
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save15.bmp"
	if %6 == 1 lsp 137,":c;savedata\save15.bmp",339,229:exbtn 137,117,"C106C107C108C109C111C112C113C114C115C116P117C118C119C120C121C122"
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save16.bmp"
	if %6 == 1 lsp 138,":c;savedata\save16.bmp",479,229:exbtn 138,118,"C106C107C108C109C111C112C113C114C115C116C117P118C119C120C121C122"
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *lpage_end


*lpage_03

	fileexist %6,"savedata\save17.bmp"
	if %6 == 1 lsp 131,":c;savedata\save17.bmp",59,124:exbtn 131,111,"C106C107C108C109P111C112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save18.bmp"
	if %6 == 1 lsp 132,":c;savedata\save18.bmp",199,124:exbtn 132,112,"C106C107C108C109C111P112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save19.bmp"
	if %6 == 1 lsp 133,":c;savedata\save19.bmp",339,124:exbtn 133,113,"C106C107C108C109C111C112P113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save20.bmp"
	if %6 == 1 lsp 134,":c;savedata\save20.bmp",479,124:exbtn 134,114,"C106C107C108C109C111C112C113P114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save21.bmp"
	if %6 == 1 lsp 135,":c;savedata\save21.bmp",59,229:exbtn 135,115,"C106C107C108C109C111C112C113C114P115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save22.bmp"
	if %6 == 1 lsp 136,":c;savedata\save22.bmp",199,229:exbtn 136,116,"C106C107C108C109C111C112C113C114C115P116C117C118C119C120C121C122"
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save23.bmp"
	if %6 == 1 lsp 137,":c;savedata\save23.bmp",339,229:exbtn 137,117,"C106C107C108C109C111C112C113C114C115C116P117C118C119C120C121C122"
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save24.bmp"
	if %6 == 1 lsp 138,":c;savedata\save24.bmp",479,229:exbtn 138,118,"C106C107C108C109C111C112C113C114C115C116C117P118C119C120C121C122"
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *lpage_end


*lpage_04

	fileexist %6,"savedata\save25.bmp"
	if %6 == 1 lsp 131,":c;savedata\save25.bmp",59,124:exbtn 131,111,"C106C107C108C109P111C112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save26.bmp"
	if %6 == 1 lsp 132,":c;savedata\save26.bmp",199,124:exbtn 132,112,"C106C107C108C109C111P112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save27.bmp"
	if %6 == 1 lsp 133,":c;savedata\save27.bmp",339,124:exbtn 133,113,"C106C107C108C109C111C112P113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save28.bmp"
	if %6 == 1 lsp 134,":c;savedata\save28.bmp",479,124:exbtn 134,114,"C106C107C108C109C111C112C113P114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save29.bmp"
	if %6 == 1 lsp 135,":c;savedata\save29.bmp",59,229:exbtn 135,115,"C106C107C108C109C111C112C113C114P115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save30.bmp"
	if %6 == 1 lsp 136,":c;savedata\save30.bmp",199,229:exbtn 136,116,"C106C107C108C109C111C112C113C114C115P116C117C118C119C120C121C122"
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save31.bmp"
	if %6 == 1 lsp 137,":c;savedata\save31.bmp",339,229:exbtn 137,117,"C106C107C108C109C111C112C113C114C115C116P117C118C119C120C121C122"
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save32.bmp"
	if %6 == 1 lsp 138,":c;savedata\save32.bmp",479,229:exbtn 138,118,"C106C107C108C109C111C112C113C114C115C116C117P118C119C120C121C122"
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *lpage_end


*lpage_05

	fileexist %6,"savedata\save33.bmp"
	if %6 == 1 lsp 131,":c;savedata\save33.bmp",59,124:exbtn 131,111,"C106C107C108C109P111C112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 131,":c;dat\system\d_save.bmp",59,124

	fileexist %6,"savedata\save34.bmp"
	if %6 == 1 lsp 132,":c;savedata\save34.bmp",199,124:exbtn 132,112,"C106C107C108C109C111P112C113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 132,":c;dat\system\d_save.bmp",199,124

	fileexist %6,"savedata\save35.bmp"
	if %6 == 1 lsp 133,":c;savedata\save35.bmp",339,124:exbtn 133,113,"C106C107C108C109C111C112P113C114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 133,":c;dat\system\d_save.bmp",339,124

	fileexist %6,"savedata\save36.bmp"
	if %6 == 1 lsp 134,":c;savedata\save36.bmp",479,124:exbtn 134,114,"C106C107C108C109C111C112C113P114C115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 134,":c;dat\system\d_save.bmp",479,124

	fileexist %6,"savedata\save37.bmp"
	if %6 == 1 lsp 135,":c;savedata\save37.bmp",59,229:exbtn 135,115,"C106C107C108C109C111C112C113C114P115C116C117C118C119C120C121C122"
	if %6 == 0 lsp 135,":c;dat\system\d_save.bmp",59,229

	fileexist %6,"savedata\save38.bmp"
	if %6 == 1 lsp 136,":c;savedata\save38.bmp",199,229:exbtn 136,116,"C106C107C108C109C111C112C113C114C115P116C117C118C119C120C121C122"
	if %6 == 0 lsp 136,":c;dat\system\d_save.bmp",199,229

	fileexist %6,"savedata\save39.bmp"
	if %6 == 1 lsp 137,":c;savedata\save39.bmp",339,229:exbtn 137,117,"C106C107C108C109C111C112C113C114C115C116P117C118C119C120C121C122"
	if %6 == 0 lsp 137,":c;dat\system\d_save.bmp",339,229

	fileexist %6,"savedata\save40.bmp"
	if %6 == 1 lsp 138,":c;savedata\save40.bmp",479,229:exbtn 138,118,"C106C107C108C109C111C112C113C114C115C116C117P118C119C120C121C122"
	if %6 == 0 lsp 138,":c;dat\system\d_save.bmp",479,229

goto *lpage_end

*lpage_end

	fileexist %6,"savedata\qsave01.bmp"
	if %6 == 1 lsp 139,":c;savedata\qsave01.bmp",50,335:exbtn 139,119,"P106C107C108C109C111C112C113C114C115C116C117C118P119C120C121C122"
	if %6 == 0 lsp 139,":c;dat\system\d_qsave.bmp",50,335

	fileexist %6,"savedata\qsave02.bmp"
	if %6 == 1 lsp 140,":c;savedata\qsave02.bmp",190,335:exbtn 140,120,"C106P107C108C109C111C112C113C114C115C116C117C118C119P120C121C122"
	if %6 == 0 lsp 140,":c;dat\system\d_qsave.bmp",190,335

	fileexist %6,"savedata\qsave03.bmp"
	if %6 == 1 lsp 141,":c;savedata\qsave03.bmp",330,335:exbtn 141,121,"C106C107P108C109C111C112C113C114C115C116C117C118C119C120P121C122"
	if %6 == 0 lsp 141,":c;dat\system\d_qsave.bmp",330,335

	fileexist %6,"savedata\qsave04.bmp"
	if %6 == 1 lsp 142,":c;savedata\qsave04.bmp",470,335:exbtn 142,122,"C106C107C108P109C111C112C113C114C115C116C117C118C119C120C121P122"
	if %6 == 0 lsp 142,":c;dat\system\d_qsave.bmp",470,335

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　セーブ日付取得処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*savedata
mov $0,":s/11,14,0;#FFFFFF"
itoa $1,%10
len %0,$1
if %0 = 1 add $0,"0"
add $0,$1
add $0,": "

savetime %10,%0,%1,%2,%3
itoa $1,%0:itoa $2,%1:itoa $3,%2:itoa $4,%3
len %5,$1:if %5 = 1 mov $10,$1:mov $1,"0":add $1,$10
len %5,$2:if %5 = 1 mov $10,$2:mov $2,"0":add $2,$10
len %5,$3:if %5 = 1 mov $10,$3:mov $3,"0":add $3,$10
;len %5,$4:if %5 = 1 mov $10,$4:mov $4,"0":add $4,$10
if %0=0 goto *savedatano

   add $0,$1:add $0,"/":add $0,$2:add $0," ":add $0,$3:add $0,":":add $0,$4
;	add $0,$1:add $0,"/":add $0,$2:add $0,"/":add $0,$3
	goto *end_savedata

*savedatano

	add $0,"--/-- --:--"
;	add $0,"--/--/--"

*end_savedata

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　ロード処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*menu_load

btndef ""
gosub *sp151off
mov %116,2

	vsp 143,1
	vsp 144,1
	vsp 145,1

	vsp 147,1
	amsp 147,32,20,180

	lsp 102,":s/20,20,0;#8888aa#FFFF66`　Save　",80,38
	lsp 103,":s/20,20,0;#FFFFFF`　Load　",240,38
	lsp 104,":s/20,20,0;#8888aa#FFFF66`　Options",400,38

	gosub *sl_page
	gosub *l_samu

	spbtn 53,53
	spbtn 54,54
	spbtn 55,55
	spbtn 56,56
	spbtn 57,57
	spbtn 58,58
	spbtn 59,59

	spbtn 102,102
	spbtn 104,104

	spbtn 143,143
	spbtn 144,144
	spbtn 145,145

	exbtn_d "C106C107C108C109C111C112C113C114C115C116C117C118C119C120C121C122"

	print %109

*menu_loadloop
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
	btnwait %0

	if %0 == 53 dwave 1,"dat\music\se\se01.wav":sub %115,1:goto *menu_load
	if %0 == 54 dwave 1,"dat\music\se\se01.wav":mov %115,1:goto *menu_load
	if %0 == 55 dwave 1,"dat\music\se\se01.wav":mov %115,2:goto *menu_load
	if %0 == 56 dwave 1,"dat\music\se\se01.wav":mov %115,3:goto *menu_load
	if %0 == 57 dwave 1,"dat\music\se\se01.wav":mov %115,4:goto *menu_load
	if %0 == 58 dwave 1,"dat\music\se\se01.wav":mov %115,5:goto *menu_load
	if %0 == 59 dwave 1,"dat\music\se\se01.wav":add %115,1:goto *menu_load

	if %0 == 0 goto *menu_loadloop

	if %0 == -1 goto *menuend


	if %0 == 102 dwave 1,"dat\music\se\se01.wav":vsp 147,0:goto *menu_save
	if %0 == 104 dwave 1,"dat\music\se\se01.wav":vsp 147,0:goto *menu_op

if %0>=123 & %0<=110 goto *notload

mov %7,%0
sub %7,110

savefileexist %8,%7

if %8 == 1 dwave 1,"dat\music\se\se01.wav":gosub *check_load
gosub *sp111_122del
print 1
if %7 == -1 goto *notload

if %115 = 1 goto *loadpage_01
if %115 = 2 goto *loadpage_02
if %115 = 3 goto *loadpage_03
if %115 = 4 goto *loadpage_04
if %115 = 5 goto *loadpage_05

*loadpage_01

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 1
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 2
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 3
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 4
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 5
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 6
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 7
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 8

goto *loadpage_end

*loadpage_02

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 9
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 10
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 11
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 12
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 13
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 14
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 15
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 16

goto *loadpage_end

*loadpage_03

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 17
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 18
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 19
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 20
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 21
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 22
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 23
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 24

goto *loadpage_end

*loadpage_04

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 25
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 26
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 27
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 28
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 29
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 30
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 31
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 32

goto *loadpage_end

*loadpage_05

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 33
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 34
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 35
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 36
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 37
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 38
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 39
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 40

goto *loadpage_end

*loadpage_end

	if %0 == 119 dwave 1,"dat\music\se\se01.wav":loadgame 41
	if %0 == 120 dwave 1,"dat\music\se\se01.wav":loadgame 42
	if %0 == 121 dwave 1,"dat\music\se\se01.wav":loadgame 43
	if %0 == 122 dwave 1,"dat\music\se\se01.wav":loadgame 44

*notload
gosub *sp111_122del
print 1

	if %0 == 143 dwave 1,"dat\music\se\se01.wav":goto *menuend
	if %0 == 144 dwave 1,"dat\music\se\se01.wav":gosub *check_reset:lsp 144,":a/2,0,3;dat\system\menu02.jpg",230,400:print 1
	if %0 == 145 dwave 1,"dat\music\se\se01.wav":gosub *check_end:lsp 145,":a/2,0,3;dat\system\menu03.jpg",427,400:print 1

	if %0 == -10 dwave 1,"dat\music\se\se01.wav":gosub *check_reset
	if %0 == -11 dwave 1,"dat\music\se\se01.wav":goto *menuend	;スペース

	if %0 == -20 dwave 1,"dat\music\se\se01.wav":minimizewindow	;tab

	if %0 == -25 dwave 1,"dat\music\se\se01.wav":loadgame 41
	if %0 == -26 dwave 1,"dat\music\se\se01.wav":loadgame 42
	if %0 == -27 dwave 1,"dat\music\se\se01.wav":loadgame 43
	if %0 == -28 dwave 1,"dat\music\se\se01.wav":loadgame 44

	if %0 == -32 dwave 1,"dat\music\se\se01.wav":gosub *keyhelp

	if %0 == -50 dwave 1,"dat\music\se\se01.wav":gosub *fuls

	wait 150


goto *menu_load

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;ロード処理２(スタートメニュー)
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*menu_load2

btndef ""
gosub *sp151off

	gosub *sl_page
	gosub *l_samu

	lsp 103,":s/20,20,0;#FFFFFF`　Load　",240,38

	vsp 144,1
	vsp 145,1

	lsp 146,":l;dat\system\menu_l2.bmp",32,20,180

	spbtn 53,53
	spbtn 54,54
	spbtn 55,55
	spbtn 56,56
	spbtn 57,57
	spbtn 58,58
	spbtn 59,59

	spbtn 144,144
	spbtn 145,145

	exbtn_d "C106C107C108C109C111C112C113C114C115C116C117C118C119C120C121C122"

	print %109

*menu_loadloop2
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
	btnwait %0

	if %0 == 53 dwave 1,"dat\music\se\se01.wav":sub %115,1:goto *menu_load2
	if %0 == 54 dwave 1,"dat\music\se\se01.wav":mov %115,1:goto *menu_load2
	if %0 == 55 dwave 1,"dat\music\se\se01.wav":mov %115,2:goto *menu_load2
	if %0 == 56 dwave 1,"dat\music\se\se01.wav":mov %115,3:goto *menu_load2
	if %0 == 57 dwave 1,"dat\music\se\se01.wav":mov %115,4:goto *menu_load2
	if %0 == 58 dwave 1,"dat\music\se\se01.wav":mov %115,5:goto *menu_load2
	if %0 == 59 dwave 1,"dat\music\se\se01.wav":add %115,1:goto *menu_load2

	if %0 == 0 goto *menu_loadloop2

;	if %0 == -1 allsphide:bg black,0:print %110:wait 500:RESET
	if %0 == -1 gosub *windowoff:textoff:csp -1:mp3fadeout 1000:bg black,0:print %110:wait 500:reset

if %115 = 1 goto *loadpage2_01
if %115 = 2 goto *loadpage2_02
if %115 = 3 goto *loadpage2_03
if %115 = 4 goto *loadpage2_04
if %115 = 5 goto *loadpage2_05

*loadpage2_01

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 1
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 2
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 3
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 4
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 5
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 6
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 7
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 8

goto *loadpage2_end

*loadpage2_02

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 9
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 10
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 11
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 12
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 13
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 14
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 15
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 16

goto *loadpage2_end

*loadpage2_03

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 17
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 18
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 19
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 20
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 21
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 22
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 23
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 24

goto *loadpage2_end

*loadpage2_04

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 25
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 26
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 27
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 28
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 29
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 30
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 31
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 32

goto *loadpage2_end

*loadpage2_05

	if %0 == 111 dwave 1,"dat\music\se\se01.wav":loadgame 33
	if %0 == 112 dwave 1,"dat\music\se\se01.wav":loadgame 34
	if %0 == 113 dwave 1,"dat\music\se\se01.wav":loadgame 35
	if %0 == 114 dwave 1,"dat\music\se\se01.wav":loadgame 36
	if %0 == 115 dwave 1,"dat\music\se\se01.wav":loadgame 37
	if %0 == 116 dwave 1,"dat\music\se\se01.wav":loadgame 38
	if %0 == 117 dwave 1,"dat\music\se\se01.wav":loadgame 39
	if %0 == 118 dwave 1,"dat\music\se\se01.wav":loadgame 40

goto *loadpage2_end

*loadpage2_end

	if %0 == 119 dwave 1,"dat\music\se\se01.wav":loadgame 41
	if %0 == 120 dwave 1,"dat\music\se\se01.wav":loadgame 42
	if %0 == 121 dwave 1,"dat\music\se\se01.wav":loadgame 43
	if %0 == 122 dwave 1,"dat\music\se\se01.wav":loadgame 44

gosub *sp111_122del
print 1

	if %0 == 144 dwave 1,"dat\music\se\se01.wav":gosub *check_reset:lsp 144,":a/2,0,3;dat\system\menu02.jpg",230,400:print 1
	if %0 == 145 dwave 1,"dat\music\se\se01.wav":gosub *check_end:lsp 145,":a/2,0,3;dat\system\menu03.jpg",427,400:print 1

	if %0 == -10 dwave 1,"dat\music\se\se01.wav":gosub *check_reset
;	if %0 == -11 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET	;スペース
	if %0 == -11 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:csp -1:mp3fadeout 1000:bg black,0:print %110:wait 500:reset

	if %0 == -20 dwave 1,"dat\music\se\se01.wav":minimizewindow	;tab

	if %0 == -25 dwave 1,"dat\music\se\se01.wav":loadgame 41
	if %0 == -26 dwave 1,"dat\music\se\se01.wav":loadgame 42
	if %0 == -27 dwave 1,"dat\music\se\se01.wav":loadgame 43
	if %0 == -28 dwave 1,"dat\music\se\se01.wav":loadgame 44

	if %0 == -32 dwave 1,"dat\music\se\se01.wav":gosub *keyhelp

	if %0 == -50 dwave 1,"dat\music\se\se01.wav":gosub *fuls

	wait 150


goto *menu_load2

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　オプション処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*menu_op
btndef ""
gosub *sp151off
mov %116,1

	vsp 143,1
	vsp 144,1
	vsp 145,1

	vsp 148,1
	amsp 148,32,20,180
	csp 75
	lsp 6,":a;dat\system\menuop00.jpg",45,320

gosub *menu_00

	print %109

*menu_oploop
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
	btnwait %0

	if %0 == 0 goto *menu_oploop
	if %0 == -1 goto *menuend

	if %0 == 102 dwave 1,"dat\music\se\se01.wav":vsp 148,0:gosub *sp100off:goto *menu_save
	if %0 == 103 dwave 1,"dat\music\se\se01.wav":vsp 148,0:gosub *sp100off:goto *menu_load

	if %0 == 32 dwave 1,"dat\music\se\se01.wav":gosub *sp100off:goto *menu_voice

	if %0 == 43 dwave 1,"dat\music\se\se01.wav":mp3vol 100:mov %121,5:lsp 43,":s/13,18,0;#FFFFFF#FF5555`Max",128,88:lsp 44,":s/13,18,0;#CCCCCC#FF5555■",162,88:lsp 45,":s/13,18,0;#CCCCCC#FF5555■",183,88:lsp 46,":s/13,18,0;#CCCCCC#FF5555■",204,88:lsp 47,":s/13,18,0;#CCCCCC#FF5555■",225,88:lsp 48,":s/13,18,0;#CCCCCC#FF5555`Min",246,88
	if %0 == 44 dwave 1,"dat\music\se\se01.wav":mp3vol 80:mov %121,4:lsp 43,":s/13,18,0;#CCCCCC#FF5555`Max",128,88:lsp 44,":s/13,18,0;#FFFFFF#FF5555■",162,88:lsp 45,":s/13,18,0;#CCCCCC#FF5555■",183,88:lsp 46,":s/13,18,0;#CCCCCC#FF5555■",204,88:lsp 47,":s/13,18,0;#CCCCCC#FF5555■",225,88:lsp 48,":s/13,18,0;#CCCCCC#FF5555`Min",246,88
	if %0 == 45 dwave 1,"dat\music\se\se01.wav":mp3vol 60:mov %121,3:lsp 43,":s/13,18,0;#CCCCCC#FF5555`Max",128,88:lsp 44,":s/13,18,0;#CCCCCC#FF5555■",162,88:lsp 45,":s/13,18,0;#FFFFFF#FF5555■",183,88:lsp 46,":s/13,18,0;#CCCCCC#FF5555■",204,88:lsp 47,":s/13,18,0;#CCCCCC#FF5555■",225,88:lsp 48,":s/13,18,0;#CCCCCC#FF5555`Min",246,88
	if %0 == 46 dwave 1,"dat\music\se\se01.wav":mp3vol 40:mov %121,2:lsp 43,":s/13,18,0;#CCCCCC#FF5555`Max",128,88:lsp 44,":s/13,18,0;#CCCCCC#FF5555■",162,88:lsp 45,":s/13,18,0;#CCCCCC#FF5555■",183,88:lsp 46,":s/13,18,0;#FFFFFF#FF5555■",204,88:lsp 47,":s/13,18,0;#CCCCCC#FF5555■",225,88:lsp 48,":s/13,18,0;#CCCCCC#FF5555`Min",246,88
	if %0 == 47 dwave 1,"dat\music\se\se01.wav":mp3vol 20:mov %121,1:lsp 43,":s/13,18,0;#CCCCCC#FF5555`Max",128,88:lsp 44,":s/13,18,0;#CCCCCC#FF5555■",162,88:lsp 45,":s/13,18,0;#CCCCCC#FF5555■",183,88:lsp 46,":s/13,18,0;#CCCCCC#FF5555■",204,88:lsp 47,":s/13,18,0;#FFFFFF#FF5555■",225,88:lsp 48,":s/13,18,0;#CCCCCC#FF5555`Min",246,88
	if %0 == 48 dwave 1,"dat\music\se\se01.wav":mp3vol 0:mov %121,0:lsp 43,":s/13,18,0;#CCCCCC#FF5555`Max",128,88:lsp 44,":s/13,18,0;#CCCCCC#FF5555■",162,88:lsp 45,":s/13,18,0;#CCCCCC#FF5555■",183,88:lsp 46,":s/13,18,0;#CCCCCC#FF5555■",204,88:lsp 47,":s/13,18,0;#CCCCCC#FF5555■",225,88:lsp 48,":s/13,18,0;#FFFFFF#FF5555`Min",246,88

	if %0 == 49 dwave 1,"dat\music\se\se01.wav":sevol 100:mov %122,5:lsp 49,":s/13,18,0;#FFFFFF#FF5555`Max",128,111:lsp 50,":s/13,18,0;#CCCCCC#FF5555■",162,111:lsp 51,":s/13,18,0;#CCCCCC#FF5555■",183,111:lsp 52,":s/13,18,0;#CCCCCC#FF5555■",204,111:lsp 53,":s/13,18,0;#CCCCCC#FF5555■",225,111:lsp 54,":s/13,18,0;#CCCCCC#FF5555`Min",246,111
	if %0 == 50 dwave 1,"dat\music\se\se01.wav":sevol 80:mov %122,4:lsp 49,":s/13,18,0;#CCCCCC#FF5555`Max",128,111:lsp 50,":s/13,18,0;#FFFFFF#FF5555■",162,111:lsp 51,":s/13,18,0;#CCCCCC#FF5555■",183,111:lsp 52,":s/13,18,0;#CCCCCC#FF5555■",204,111:lsp 53,":s/13,18,0;#CCCCCC#FF5555■",225,111:lsp 54,":s/13,18,0;#CCCCCC#FF5555`Min",246,111
	if %0 == 51 dwave 1,"dat\music\se\se01.wav":sevol 60:mov %122,3:lsp 49,":s/13,18,0;#CCCCCC#FF5555`Max",128,111:lsp 50,":s/13,18,0;#CCCCCC#FF5555■",162,111:lsp 51,":s/13,18,0;#FFFFFF#FF5555■",183,111:lsp 52,":s/13,18,0;#CCCCCC#FF5555■",204,111:lsp 53,":s/13,18,0;#CCCCCC#FF5555■",225,111:lsp 54,":s/13,18,0;#CCCCCC#FF5555`Min",246,111
	if %0 == 52 dwave 1,"dat\music\se\se01.wav":sevol 40:mov %122,2:lsp 49,":s/13,18,0;#CCCCCC#FF5555`Max",128,111:lsp 50,":s/13,18,0;#CCCCCC#FF5555■",162,111:lsp 51,":s/13,18,0;#CCCCCC#FF5555■",183,111:lsp 52,":s/13,18,0;#FFFFFF#FF5555■",204,111:lsp 53,":s/13,18,0;#CCCCCC#FF5555■",225,111:lsp 54,":s/13,18,0;#CCCCCC#FF5555`Min",246,111
	if %0 == 53 dwave 1,"dat\music\se\se01.wav":sevol 20:mov %122,1:lsp 49,":s/13,18,0;#CCCCCC#FF5555`Max",128,111:lsp 50,":s/13,18,0;#CCCCCC#FF5555■",162,111:lsp 51,":s/13,18,0;#CCCCCC#FF5555■",183,111:lsp 52,":s/13,18,0;#CCCCCC#FF5555■",204,111:lsp 53,":s/13,18,0;#FFFFFF#FF5555■",225,111:lsp 54,":s/13,18,0;#CCCCCC#FF5555`Min",246,111
	if %0 == 54 dwave 1,"dat\music\se\se01.wav":sevol 0:mov %122,0:lsp 49,":s/13,18,0;#CCCCCC#FF5555`Max",128,111:lsp 50,":s/13,18,0;#CCCCCC#FF5555■",162,111:lsp 51,":s/13,18,0;#CCCCCC#FF5555■",183,111:lsp 52,":s/13,18,0;#CCCCCC#FF5555■",204,111:lsp 53,":s/13,18,0;#CCCCCC#FF5555■",225,111:lsp 54,":s/13,18,0;#FFFFFF#FF5555`Min",246,111

	if %0 == 55 dwave 1,"dat\music\se\se01.wav":mov %123,12:lsp 55,":s/13,18,0;#FFFFFF#FF5555`Norm",466,88:lsp 56,":s/13,18,0;#CCCCCC#FF5555`Max",500,88:lsp 57,":s/13,18,0;#CCCCCC#FF5555`Min",534,88
	if %0 == 56 dwave 1,"dat\music\se\se01.wav":mov %123,11:lsp 55,":s/13,18,0;#CCCCCC#FF5555`Norm",466,88:lsp 56,":s/13,18,0;#FFFFFF#FF5555`Max",500,88:lsp 57,":s/13,18,0;#CCCCCC#FF5555`Min",534,88
	if %0 == 57 dwave 1,"dat\music\se\se01.wav":mov %123,1:lsp 55,":s/13,18,0;#CCCCCC#FF5555`Norm",466,88:lsp 56,":s/13,18,0;#CCCCCC#FF5555`Max",500,88:lsp 57,":s/13,18,0;#FFFFFF#FF5555`Min",534,88

	if %0 == 58 dwave 1,"dat\music\se\se01.wav":mov %124,22:mov %109,32:mov %110,27:lsp 58,":s/13,18,0;#FFFFFF#FF5555`Norm",466,111:lsp 59,":s/13,18,0;#CCCCCC#FF5555`Max",500,111:lsp 60,":s/13,18,0;#CCCCCC#FF5555`Min",534,111
	if %0 == 59 dwave 1,"dat\music\se\se01.wav":mov %124,21:mov %109,31:mov %110,26:lsp 58,":s/13,18,0;#CCCCCC#FF5555`Norm",466,111:lsp 59,":s/13,18,0;#FFFFFF#FF5555`Max",500,111:lsp 60,":s/13,18,0;#CCCCCC#FF5555`Min",534,111
	if %0 == 60 dwave 1,"dat\music\se\se01.wav":mov %124,1:mov %109,1:mov %110,1:lsp 58,":s/13,18,0;#CCCCCC#FF5555`Norm",466,111:lsp 59,":s/13,18,0;#CCCCCC#FF5555`Max",500,111:lsp 60,":s/13,18,0;#FFFFFF#FF5555`Min",534,111

	if %0 == 61 dwave 1,"dat\music\se\se01.wav":textspeed 0:mov %125,0:lsp 61,":s/13,18,0;#FFFFFF#FF5555`Fast",154,134:lsp 62,":s/13,18,0;#CCCCCC#FF5555■",188,134:lsp 63,":s/13,18,0;#CCCCCC#FF5555■",209,134:lsp 64,":s/13,18,0;#CCCCCC#FF5555■",230,134:lsp 65,":s/13,18,0;#CCCCCC#FF5555■",251,134:lsp 66,":s/13,18,0;#CCCCCC#FF5555`Slow",272,134
	if %0 == 62 dwave 1,"dat\music\se\se01.wav":textspeed 10:mov %125,10:lsp 61,":s/13,18,0;#CCCCCC#FF5555`Fast",154,134:lsp 62,":s/13,18,0;#FFFFFF#FF5555■",188,134:lsp 63,":s/13,18,0;#CCCCCC#FF5555■",209,134:lsp 64,":s/13,18,0;#CCCCCC#FF5555■",230,134:lsp 65,":s/13,18,0;#CCCCCC#FF5555■",251,134:lsp 66,":s/13,18,0;#CCCCCC#FF5555`Slow",272,134
	if %0 == 63 dwave 1,"dat\music\se\se01.wav":textspeed 25:mov %125,25:lsp 61,":s/13,18,0;#CCCCCC#FF5555`Fast",154,134:lsp 62,":s/13,18,0;#CCCCCC#FF5555■",188,134:lsp 63,":s/13,18,0;#FFFFFF#FF5555■",209,134:lsp 64,":s/13,18,0;#CCCCCC#FF5555■",230,134:lsp 65,":s/13,18,0;#CCCCCC#FF5555■",251,134:lsp 66,":s/13,18,0;#CCCCCC#FF5555`Slow",272,134
	if %0 == 64 dwave 1,"dat\music\se\se01.wav":textspeed 50:mov %125,50:lsp 61,":s/13,18,0;#CCCCCC#FF5555`Fast",154,134:lsp 62,":s/13,18,0;#CCCCCC#FF5555■",188,134:lsp 63,":s/13,18,0;#CCCCCC#FF5555■",209,134:lsp 64,":s/13,18,0;#FFFFFF#FF5555■",230,134:lsp 65,":s/13,18,0;#CCCCCC#FF5555■",251,134:lsp 66,":s/13,18,0;#CCCCCC#FF5555`Slow",272,134
	if %0 == 65 dwave 1,"dat\music\se\se01.wav":textspeed 80:mov %125,80:lsp 61,":s/13,18,0;#CCCCCC#FF5555`Fast",154,134:lsp 62,":s/13,18,0;#CCCCCC#FF5555■",188,134:lsp 63,":s/13,18,0;#CCCCCC#FF5555■",209,134:lsp 64,":s/13,18,0;#CCCCCC#FF5555■",230,134:lsp 65,":s/13,18,0;#FFFFFF#FF5555■",251,134:lsp 66,":s/13,18,0;#CCCCCC#FF5555`Slow",272,134
	if %0 == 66 dwave 1,"dat\music\se\se01.wav":textspeed 120:mov %125,120:lsp 61,":s/13,18,0;#CCCCCC#FF5555`Fast",154,134:lsp 62,":s/13,18,0;#CCCCCC#FF5555■",188,134:lsp 63,":s/13,18,0;#CCCCCC#FF5555■",209,134:lsp 64,":s/13,18,0;#CCCCCC#FF5555■",230,134:lsp 65,":s/13,18,0;#CCCCCC#FF5555■",251,134:lsp 66,":s/13,18,0;#FFFFFF#FF5555`Slow",272,134

	if %0 == 67 dwave 1,"dat\music\se\se01.wav":mov %126,250:lsp 67,":s/13,18,0;#FFFFFF#FF5555`Fast",440,134:lsp 68,":s/13,18,0;#CCCCCC#FF5555■",474,134:lsp 69,":s/13,18,0;#CCCCCC#FF5555■",495,134:lsp 70,":s/13,18,0;#CCCCCC#FF5555■",516,134:lsp 71,":s/13,18,0;#CCCCCC#FF5555■",537,134:lsp 72,":s/13,18,0;#CCCCCC#FF5555`Slow",558,134
	if %0 == 68 dwave 1,"dat\music\se\se01.wav":mov %126,500:lsp 67,":s/13,18,0;#CCCCCC#FF5555`Fast",440,134:lsp 68,":s/13,18,0;#FFFFFF#FF5555■",474,134:lsp 69,":s/13,18,0;#CCCCCC#FF5555■",495,134:lsp 70,":s/13,18,0;#CCCCCC#FF5555■",516,134:lsp 71,":s/13,18,0;#CCCCCC#FF5555■",537,134:lsp 72,":s/13,18,0;#CCCCCC#FF5555`Slow",558,134
	if %0 == 69 dwave 1,"dat\music\se\se01.wav":mov %126,1000:lsp 67,":s/13,18,0;#CCCCCC#FF5555`Fast,440,134:lsp 68,":s/13,18,0;#CCCCCC#FF5555■",474,134:lsp 69,":s/13,18,0;#FFFFFF#FF5555■",495,134:lsp 70,":s/13,18,0;#CCCCCC#FF5555■",516,134:lsp 71,":s/13,18,0;#CCCCCC#FF5555■",537,134:lsp 72,":s/13,18,0;#CCCCCC#FF5555`Slow",558,134
	if %0 == 70 dwave 1,"dat\music\se\se01.wav":mov %126,1500:lsp 67,":s/13,18,0;#CCCCCC#FF5555`Fast",440,134:lsp 68,":s/13,18,0;#CCCCCC#FF5555■",474,134:lsp 69,":s/13,18,0;#CCCCCC#FF5555■",495,134:lsp 70,":s/13,18,0;#FFFFFF#FF5555■",516,134:lsp 71,":s/13,18,0;#CCCCCC#FF5555■",537,134:lsp 72,":s/13,18,0;#CCCCCC#FF5555`Slow",558,134
	if %0 == 71 dwave 1,"dat\music\se\se01.wav":mov %126,2000:lsp 67,":s/13,18,0;#CCCCCC#FF5555`Fast",440,134:lsp 68,":s/13,18,0;#CCCCCC#FF5555■",474,134:lsp 69,":s/13,18,0;#CCCCCC#FF5555■",495,134:lsp 70,":s/13,18,0;#CCCCCC#FF5555■",516,134:lsp 71,":s/13,18,0;#FFFFFF#FF5555■",537,134:lsp 72,":s/13,18,0;#CCCCCC#FF5555`Slow",558,134
	if %0 == 72 dwave 1,"dat\music\se\se01.wav":mov %126,2500:lsp 67,":s/13,18,0;#CCCCCC#FF5555`Fast,440,134:lsp 68,":s/13,18,0;#CCCCCC#FF5555■",474,134:lsp 69,":s/13,18,0;#CCCCCC#FF5555■",495,134:lsp 70,":s/13,18,0;#CCCCCC#FF5555■",516,134:lsp 71,":s/13,18,0;#CCCCCC#FF5555■",537,134:lsp 72,":s/13,18,0;#FFFFFF#FF5555`Slow",558,134

	if %0 == 73 dwave 1,"dat\music\se\se01.wav":mov %127,2:lsp 73,":s/13,18,0;#FFFFFF#FF5555`Read",193,157:lsp 74,":s/13,18,0;#CCCCCC#FF5555`All",258,157:
	if %0 == 74 dwave 1,"dat\music\se\se01.wav":mov %127,1:lsp 73,":s/13,18,0;#CCCCCC#FF5555`Read",193,157:lsp 74,":s/13,18,0;#FFFFFF#FF5555`All",258,157
;	if %0 == 75 dwave 1,"dat\music\se\se01.wav":mov %127,0:lsp 73,":s/13,18,0;#CCCCCC#FF5555`Read",193,157:lsp 74,":s/13,18,0;#CCCCCC#FF5555`All",258,157

	if %0 == 76 dwave 1,"dat\music\se\se01.wav":mov %128,1:lsp 76,":s/13,18,0;#FFFFFF#FF5555`Yes",193,180:lsp 77,":s/13,18,0;#CCCCCC#FF5555`No",232,180
	if %0 == 77 dwave 1,"dat\music\se\se01.wav":mov %128,0:lsp 76,":s/13,18,0;#CCCCCC#FF5555`Yes",193,180:lsp 77,":s/13,18,0;#FFFFFF#FF5555`No",232,180

	if %0 == 78 dwave 1,"dat\music\se\se01.wav":menu_window:lsp 78,":s/13,18,0;#FFFFFF#FF5555`Window",193,203:lsp 79,":s/13,18,0;#CCCCCC#FF5555`Fullscreen",270,203
	if %0 == 79 dwave 1,"dat\music\se\se01.wav":menu_full:lsp 78,":s/13,18,0;#CCCCCC#FF5555`Window",193,203:lsp 79,":s/13,18,0;#FFFFFF#FF5555`Fullscreen",270,203

	if %0 == 80 dwave 1,"dat\music\se\se01.wav":mov %130,3:lsp 80,":s/13,18,0;#FFFFFF#FF5555`Save",193,226:lsp 81,":s/13,18,0;#CCCCCC#FF5555`Load",245,226:lsp 82,":s/13,18,0;#CCCCCC#FF5555`　Options",297,226:lsp 83,":s/13,18,0;#CCCCCC#FF5555`Previous",375,226
	if %0 == 81 dwave 1,"dat\music\se\se01.wav":mov %130,2:lsp 80,":s/13,18,0;#CCCCCC#FF5555`Save",193,226:lsp 81,":s/13,18,0;#FFFFFF#FF5555`Load",245,226:lsp 82,":s/13,18,0;#CCCCCC#FF5555`　Options",297,226:lsp 83,":s/13,18,0;#CCCCCC#FF5555`Previous",375,226
	if %0 == 82 dwave 1,"dat\music\se\se01.wav":mov %130,1:lsp 80,":s/13,18,0;#CCCCCC#FF5555`Save",193,226:lsp 81,":s/13,18,0;#CCCCCC#FF5555`Load",245,226:lsp 82,":s/13,18,0;#FFFFFF#FF5555`　Options",297,226:lsp 83,":s/13,18,0;#CCCCCC#FF5555`Previous",375,226
	if %0 == 83 dwave 1,"dat\music\se\se01.wav":mov %130,0:lsp 80,":s/13,18,0;#CCCCCC#FF5555`Save",193,226:lsp 81,":s/13,18,0;#CCCCCC#FF5555`Load",245,226:lsp 82,":s/13,18,0;#CCCCCC#FF5555`　Options",297,226:lsp 83,":s/13,18,0;#FFFFFF#FF5555`Previous",375,226

	if %0 == 84 dwave 1,"dat\music\se\se01.wav":mov %131,1:lsp 84,":s/13,18,0;#FFFFFF#FF5555`Multi-Save",193,249:lsp 85,":s/13,18,0;#CCCCCC#FF5555`One-Click",268,249
	if %0 == 85 dwave 1,"dat\music\se\se01.wav":mov %131,0:lsp 84,":s/13,18,0;#CCCCCC#FF5555`Multi-Save",193,249:lsp 85,":s/13,18,0;#FFFFFF#FF5555`One-Click",268,249

	if %0 == 86 dwave 1,"dat\music\se\se01.wav":mov %132,1:lsp 86,":s/13,18,0;#FFFFFF#FF5555`On",193,272:lsp 87,":s/13,18,0;#CCCCCC#FF5555`Off",230,272
	if %0 == 87 dwave 1,"dat\music\se\se01.wav":mov %132,0:lsp 86,":s/13,18,0;#CCCCCC#FF5555`On",193,272:lsp 87,":s/13,18,0;#FFFFFF#FF5555`Off",230,272

	if %0 == 88 dwave 1,"dat\music\se\se01.wav":mov %133,1:lsp 88,":s/13,18,0;#FFFFFF#FF5555Show Menu",193,295:lsp 89,":s/13,18,0;#CCCCCC#FF5555`Hide Text",287,295
	if %0 == 89 dwave 1,"dat\music\se\se01.wav":mov %133,0:lsp 88,":s/13,18,0;#CCCCCC#FF5555Show Menu",193,295:lsp 89,":s/13,18,0;#FFFFFF#FF5555`Hide Text",287,295

	if %0 == 90 dwave 1,"dat\music\se\se01.wav":mov %120,240:lsp 90,":s/13,18,0;#FFFFFF#FF5555`Solid",440,157:lsp 91,":s/13,18,0;#CCCCCC#FF5555■",474,157:lsp 92,":s/13,18,0;#CCCCCC#FF5555■",495,157:lsp 93,":s/13,18,0;#CCCCCC#FF5555■",516,157:lsp 94,":s/13,18,0;#CCCCCC#FF5555■",537,157:lsp 95,":s/13,18,0;#CCCCCC#FF5555`Clear",558,157
	if %0 == 91 dwave 1,"dat\music\se\se01.wav":mov %120,210:lsp 90,":s/13,18,0;#CCCCCC#FF5555`Solid",440,157:lsp 91,":s/13,18,0;#FFFFFF#FF5555■",474,157:lsp 92,":s/13,18,0;#CCCCCC#FF5555■",495,157:lsp 93,":s/13,18,0;#CCCCCC#FF5555■",516,157:lsp 94,":s/13,18,0;#CCCCCC#FF5555■",537,157:lsp 95,":s/13,18,0;#CCCCCC#FF5555`Clear",558,157
	if %0 == 92 dwave 1,"dat\music\se\se01.wav":mov %120,180:lsp 90,":s/13,18,0;#CCCCCC#FF5555`Solid",440,157:lsp 91,":s/13,18,0;#CCCCCC#FF5555■",474,157:lsp 92,":s/13,18,0;#FFFFFF#FF5555■",495,157:lsp 93,":s/13,18,0;#CCCCCC#FF5555■",516,157:lsp 94,":s/13,18,0;#CCCCCC#FF5555■",537,157:lsp 95,":s/13,18,0;#CCCCCC#FF5555`Clear",558,157
	if %0 == 93 dwave 1,"dat\music\se\se01.wav":mov %120,150:lsp 90,":s/13,18,0;#CSCCCCC#FF5555`Solid",440,157:lsp 91,":s/13,18,0;#CCCCCC#FF5555■",474,157:lsp 92,":s/13,18,0;#CCCCCC#FF5555■",495,157:lsp 93,":s/13,18,0;#FFFFFF#FF5555■",516,157:lsp 94,":s/13,18,0;#CCCCCC#FF5555■",537,157:lsp 95,":s/13,18,0;#CCCCCC#FF5555`Clear",558,157
	if %0 == 94 dwave 1,"dat\music\se\se01.wav":mov %120,120:lsp 90,":s/13,18,0;#CCCCCC#FF5555`Solid",440,157:lsp 91,":s/13,18,0;#CCCCCC#FF5555■",474,157:lsp 92,":s/13,18,0;#CCCCCC#FF5555■",495,157:lsp 93,":s/13,18,0;#CCCCCC#FF5555■",516,157:lsp 94,":s/13,18,0;#FFFFFF#FF5555■",537,157:lsp 95,":s/13,18,0;#CCCCCC#FF5555`Clear",558,157
	if %0 == 95 dwave 1,"dat\music\se\se01.wav":mov %120,90:lsp 90,":s/13,18,0;#CCCCCC#FF5555`Solid",440,157:lsp 91,":s/13,18,0;#CCCCCC#FF5555■",474,157:lsp 92,":s/13,18,0;#CCCCCC#FF5555■",495,157:lsp 93,":s/13,18,0;#CCCCCC#FF5555■",516,157:lsp 94,":s/13,18,0;#CCCCCC#FF5555■",537,157:lsp 95,":s/13,18,0;#FFFFFF#FF5555`Clear",558,157

	if %0 == 96 dwave 1,"dat\music\se\se01.wav":mov %139,1:lsp 96,":s/13,18,0;#FFFFFF#FF5555`Dissolve",440,180:lsp 97,":s/13,18,0;#CCCCCC#FF5555`Normal",520,180
	if %0 == 97 dwave 1,"dat\music\se\se01.wav":mov %139,0:lsp 96,":s/13,18,0;#CCCCCC#FF5555`Dissolve",440,180:lsp 97,":s/13,18,0;#FFFFFF#FF5555`Normal",520,180

	if %0 == 143 dwave 1,"dat\music\se\se01.wav":goto *menuend
	if %0 == 144 dwave 1,"dat\music\se\se01.wav":gosub *check_reset:lsp 144,":a/2,0,3;dat\system\menu02.jpg",230,400:print 1
	if %0 == 145 dwave 1,"dat\music\se\se01.wav":gosub *check_end:lsp 145,":a/2,0,3;dat\system\menu03.jpg",427,400:print 1

	if %0 == -10 dwave 1,"dat\music\se\se01.wav":gosub *check_reset
	if %0 == -11 dwave 1,"dat\music\se\se01.wav":goto *menuend	;スペース

	if %0 == -20 dwave 1,"dat\music\se\se01.wav":minimizewindow	;tab

	if %0 == -25 dwave 1,"dat\music\se\se01.wav":loadgame 41
	if %0 == -26 dwave 1,"dat\music\se\se01.wav":loadgame 42
	if %0 == -27 dwave 1,"dat\music\se\se01.wav":loadgame 43
	if %0 == -28 dwave 1,"dat\music\se\se01.wav":loadgame 44

	if %0 == -32 dwave 1,"dat\music\se\se01.wav":gosub *keyhelp2

	if %0 == -50 dwave 1,"dat\music\se\se01.wav":gosub *fuls

	wait 150





btndef ""

	lsph 6,":a;dat\system\menuop00.jpg",45,320

gosub *menubtn
lsp 6,":a;dat\system\menuop00.jpg",45,320
	print 1

goto *menu_oploop

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　メニューボタン設定処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*menu_00

gosub *sp100on

	lsp 98,":s/13,16,0;#FFFF00`BGM Volume",50,88
	lsp 99,":s/13,16,0;#FFFF00`Character Animation",320,88
	lsp 100,":s/13,16,0;#FFFF00`SE Volume",50,111
	lsp 101,":s/13,16,0;#FFFF00`Screen Animation",320,111

	lsp 105,":s/13,16,0;#FFFF00`Text Speed",50,134
	lsp 33,":s/13,16,0;#FFFF00`Auto Mode Speed",320,134
	lsp 34,":s/13,16,0;#FFFF00`Text Skipping",50,157
	lsp 35,":s/13,16,0;#FFFF00`Next Line",320,157
	lsp 36,":s/13,16,0;#FFFF00`Post-Choice Skipping",50,180
	lsp 37,":s/13,16,0;#FFFF00`Window Behavior",320,180
	lsp 38,":s/13,16,0;#FFFF00`Screen Mode",50,203

	lsp 39,":s/13,16,0;#FFFF00`Menu Display",50,226

	lsp 40,":s/13,16,0;#FFFF00`QSave & QLoad",50,249
	lsp 41,":s/13,16,0;#FFFF00`Auto Save",50,272

	lsp 42,":s/13,16,0;#FFFF00`Right Click",50,295
	
	lsp 43,":s/13,18,0;#CCCCCC#FF5555`Max",132,88
	lsp 44,":s/13,18,0;#CCCCCC#FF5555■",162,88
	lsp 45,":s/13,18,0;#CCCCCC#FF5555■",183,88
	lsp 46,":s/13,18,0;#CCCCCC#FF5555■",204,88
	lsp 47,":s/13,18,0;#CCCCCC#FF5555■",225,88
	lsp 48,":s/13,18,0;#CCCCCC#FF5555`Min",246,88

	lsp 49,":s/13,18,0;#CCCCCC#FF5555`Max",132,111
	lsp 50,":s/13,18,0;#CCCCCC#FF5555■",162,111
	lsp 51,":s/13,18,0;#CCCCCC#FF5555■",183,111
	lsp 52,":s/13,18,0;#CCCCCC#FF5555■",204,111
	lsp 53,":s/13,18,0;#CCCCCC#FF5555■",225,111
	lsp 54,":s/13,18,0;#CCCCCC#FF5555`Min",246,111

	lsp 55,":s/13,18,0;#CCCCCC#FF5555`Norm",466,88
	lsp 56,":s/13,18,0;#CCCCCC#FF5555`Max",500,88
	lsp 57,":s/13,18,0;#CCCCCC#FF5555`Min",534,88

	lsp 58,":s/13,18,0;#CCCCCC#FF5555`Norm",466,111
	lsp 59,":s/13,18,0;#CCCCCC#FF5555`Max",500,111
	lsp 60,":s/13,18,0;#CCCCCC#FF5555`Min",534,111

	lsp 61,":s/13,18,0;#CCCCCC#FF5555`Fast",154,134
	lsp 62,":s/13,18,0;#CCCCCC#FF5555■",188,134
	lsp 63,":s/13,18,0;#CCCCCC#FF5555■",209,134
	lsp 64,":s/13,18,0;#CCCCCC#FF5555■",230,134
	lsp 65,":s/13,18,0;#CCCCCC#FF5555■",251,134
	lsp 66,":s/13,18,0;#CCCCCC#FF5555`Slow",272,134

	lsp 67,":s/13,18,0;#CCCCCC#FF5555`Fast",440,134
	lsp 68,":s/13,18,0;#CCCCCC#FF5555■",474,134
	lsp 69,":s/13,18,0;#CCCCCC#FF5555■",495,134
	lsp 70,":s/13,18,0;#CCCCCC#FF5555■",516,134
	lsp 71,":s/13,18,0;#CCCCCC#FF5555■",537,134
	lsp 72,":s/13,18,0;#CCCCCC#FF5555`Slow",558,134

	lsp 73,":s/13,18,0;#CCCCCC#FF5555`Read",193,157
	lsp 74,":s/13,18,0;#CCCCCC#FF5555`All",245,157

	lsp 90,":s/13,18,0;#CCCCCC#FF5555`Solid",440,157
	lsp 91,":s/13,18,0;#CCCCCC#FF5555■",474,157
	lsp 92,":s/13,18,0;#CCCCCC#FF5555■",495,157
	lsp 93,":s/13,18,0;#CCCCCC#FF5555■",516,157
	lsp 94,":s/13,18,0;#CCCCCC#FF5555■",537,157
	lsp 95,":s/13,18,0;#CCCCCC#FF5555`Clear",558,157

	lsp 96,":s/13,18,0;#CCCCCC#FF5555`Dissolve",440,180
	lsp 97,":s/13,18,0;#CCCCCC#FF5555`Normal",520,180

	lsp 76,":s/13,18,0;#CCCCCC#FF5555`Yes",193,180
	lsp 77,":s/13,18,0;#CCCCCC#FF5555`No",232,180

	lsp 78,":s/13,18,0;#CCCCCC#FF5555`Window",193,203
	lsp 79,":s/13,18,0;#CCCCCC#FF5555`Fullscreen",263,203

	lsp 80,":s/13,18,0;#CCCCCC#FF5555`Save",193,226
	lsp 81,":s/13,18,0;#CCCCCC#FF5555`Load",245,226
	lsp 82,":s/13,18,0;#CCCCCC#FF5555`Options",297,226
	lsp 83,":s/13,18,0;#CCCCCC#FF5555`Previous",375,226

	lsp 84,":s/13,18,0;#CCCCCC#FF5555`Multi-Save",193,249
	lsp 85,":s/13,18,0;#CCCCCC#FF5555`One-Click",268,249

	lsp 86,":s/13,18,0;#CCCCCC#FF5555`On",193,272
	lsp 87,":s/13,18,0;#CCCCCC#FF5555`Off",227,272

	lsp 88,":s/13,18,0;#CCCCCC#FF5555`Show Menu",193,295
	lsp 89,":s/13,18,0;#CCCCCC#FF5555`Hide Text",284,295

	if %121 == 5 lsp 43,":s/13,18,0;#FFFFFF#FF5555`Max",132,88
	if %121 == 4 lsp 44,":s/13,18,0;#FFFFFF#FF5555■",162,88
	if %121 == 3 lsp 45,":s/13,18,0;#FFFFFF#FF5555■",183,88
	if %121 == 2 lsp 46,":s/13,18,0;#FFFFFF#FF5555■",204,88
	if %121 == 1 lsp 47,":s/13,18,0;#FFFFFF#FF5555■",225,88
	if %121 == 0 lsp 48,":s/13,18,0;#FFFFFF#FF5555`Min",246,88

	if %122 == 5 lsp 49,":s/13,18,0;#FFFFFF#FF5555`Max",132,111
	if %122 == 4 lsp 50,":s/13,18,0;#FFFFFF#FF5555■",162,111
	if %122 == 3 lsp 51,":s/13,18,0;#FFFFFF#FF5555■",183,111
	if %122 == 2 lsp 52,":s/13,18,0;#FFFFFF#FF5555■",204,111
	if %122 == 1 lsp 53,":s/13,18,0;#FFFFFF#FF5555■",225,111
	if %122 == 0 lsp 54,":s/13,18,0;#FFFFFF#FF5555`Min",246,111

	if %123 == 12 lsp 55,":s/13,18,0;#FFFFFF#FF5555`Norm",466,88
	if %123 == 11 lsp 56,":s/13,18,0;#FFFFFF#FF5555`Max",500,88
	if %123 == 1 lsp 57,":s/13,18,0;#FFFFFF#FF5555`Min",534,88

	if %124 == 22 lsp 58,":s/13,18,0;#FFFFFF#FF5555`Norm",466,111
	if %124 == 21 lsp 59,":s/13,18,0;#FFFFFF#FF5555`Max",500,111
	if %124 == 1 lsp 60,":s/13,18,0;#FFFFFF#FF5555`Min",534,111

	if %125 == 0 lsp 61,":s/13,18,0;#FFFFFF#FF5555`Fast",154,134
	if %125 == 10 lsp 62,":s/13,18,0;#FFFFFF#FF5555■",188,134
	if %125 == 25 lsp 63,":s/13,18,0;#FFFFFF#FF5555■",209,134
	if %125 == 50 lsp 64,":s/13,18,0;#FFFFFF#FF5555■",230,134
	if %125 == 80 lsp 65,":s/13,18,0;#FFFFFF#FF5555■",251,134
	if %125 == 120 lsp 66,":s/13,18,0;#FFFFFF#FF5555`Slow",272,134

	if %126 == 250 lsp 67,":s/13,18,0;#FFFFFF#FF5555`Fast",440,134
	if %126 == 500 lsp 68,":s/13,18,0;#FFFFFF#FF5555■",474,134
	if %126 == 1000 lsp 69,":s/13,18,0;#FFFFFF#FF5555■",495,134
	if %126 == 1500 lsp 70,":s/13,18,0;#FFFFFF#FF5555■",516,134
	if %126 == 2000 lsp 71,":s/13,18,0;#FFFFFF#FF5555■",537,134
	if %126 == 2500 lsp 72,":s/13,18,0;#FFFFFF#FF5555`Slow",558,134

	if %127 == 2 lsp 73,":s/13,18,0;#FFFFFF#FF5555`Read",193,157
	if %127 == 1 lsp 74,":s/13,18,0;#FFFFFF#FF5555`All",245,157

	if %120 == 240 lsp 90,":s/13,18,0;#FFFFFF#FF5555`Solid",440,157
	if %120 == 210 lsp 91,":s/13,18,0;#FFFFFF#FF5555■",474,157
	if %120 == 180 lsp 92,":s/13,18,0;#FFFFFF#FF5555■",495,157
	if %120 == 150 lsp 93,":s/13,18,0;#FFFFFF#FF5555■",516,157
	if %120 == 120 lsp 94,":s/13,18,0;#FFFFFF#FF5555■",537,157
	if %120 == 90 lsp 95,":s/13,18,0;#FFFFFF#FF5555`Clear",558,157

	if %139 == 1 lsp 96,":s/13,18,0;#FFFFFF#FF5555`Dissolve",440,180
	if %139 == 0 lsp 97,":s/13,18,0;#FFFFFF#FF5555`Normal",520,180

	if %128 == 1 lsp 76,":s/13,18,0;#FFFFFF#FF5555`Yes",193,180
	if %128 == 0 lsp 77,":s/13,18,0;#FFFFFF#FF5555`Cancel",232,180

isfull %129

	if %129 == 0 lsp 78,":s/13,18,0;#FFFFFF#FF5555`Window",193,203
	if %129 == 1 lsp 79,":s/13,18,0;#FFFFFF#FF5555`Fullscreen",263,203

	if %130 == 3 lsp 80,":s/13,18,0;#FFFFFF#FF5555`Save",193,226
	if %130 == 2 lsp 81,":s/13,18,0;#FFFFFF#FF5555`Load",245,226
	if %130 == 1 lsp 82,":s/13,18,0;#FFFFFF#FF5555`Options",297,226
	if %130 == 0 lsp 83,":s/13,18,0;#FFFFFF#FF5555`Resume,375,226

	if %131 == 1 lsp 84,":s/13,18,0;#FFFFFF#FF5555`Multi-Save",193,249
	if %131 == 0 lsp 85,":s/13,18,0;#FFFFFF#FF5555`One-Click",268,249

	if %132 == 1 lsp 86,":s/13,18,0;#FFFFFF#FF5555`On",193,272
	if %132 == 0 lsp 87,":s/13,18,0;#FFFFFF#FF5555`Off",227,272

	if %133 == 1 lsp 88,":s/13,18,0;#FFFFFF#FF5555`Show Menu",193,295
	if %133 == 0 lsp 89,":s/13,18,0;#FFFFFF#FF5555`Hide Text",284,295

	lsp 32,":a;dat\menu\menu_3chra.jpg",480,200
	fileexist %1,"dat\voice\2_0001.ogg":if %1=1 lsp 32,":a/2,0,3;dat\menu\menu_3chra1.jpg",480,200

	lsp 102,":s/20,20,0;#8888aa#FFFF66`　Save　",80,38
	lsp 103,":s/20,20,0;#8888aa#FFFF66`　Load　",240,38
	lsp 104,":s/20,20,0;#FFFFFF`　Options",400,38

*menubtn
btndef clear

	fileexist %1,"dat\voice\2_0001.ogg":if %1=1 spbtn 32,32

	spbtn 102,102
	spbtn 103,103

	spbtn 143,143
	spbtn 144,144
	spbtn 145,145

	exbtn_d "P6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	
;	exbtn 33,33,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
;	exbtn 34,34,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
;	exbtn 35,35,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
;	exbtn 36,36,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
;	exbtn 37,37,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
;	exbtn 38,38,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 43,43,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 44,44,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 45,45,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 46,46,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 47,47,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 48,48,"C6P7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 49,49,"C6C7P8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 50,50,"C6C7P8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 51,51,"C6C7P8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 52,52,"C6C7P8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 53,53,"C6C7P8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 54,54,"C6C7P8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"


	exbtn 55,55,"C6C7C8P9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 56,56,"C6C7C8P9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 57,57,"C6C7C8P9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 58,58,"C6C7C8C9P10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 59,59,"C6C7C8C9P10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 60,60,"C6C7C8C9P10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 61,61,"C6C7C8C9C10P11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 62,62,"C6C7C8C9C10P11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 63,63,"C6C7C8C9C10P11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 64,64,"C6C7C8C9C10P11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 65,65,"C6C7C8C9C10P11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 66,66,"C6C7C8C9C10P11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 67,67,"C6C7C8C9C10C11P12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 68,68,"C6C7C8C9C10C11P12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 69,69,"C6C7C8C9C10C11P12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 70,70,"C6C7C8C9C10C11P12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 71,71,"C6C7C8C9C10C11P12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 72,72,"C6C7C8C9C10C11P12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 73,73,"C6C7C8C9C10C11C12P13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 74,74,"C6C7C8C9C10C11C12C13P14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
;	exbtn 75,75,"C6C7C8C9C10C11C12C13C14P15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 76,76,"C6C7C8C9C10C11C12C13C14C15P16C17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 77,77,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28P29C30C31"
	exbtn 78,78,"C6C7C8C9C10C11C12C13C14C15C16P17C18C19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 79,79,"C6C7C8C9C10C11C12C13C14C15C16C17P18C19C20C21C22C23C24C25C26C27C28C29C30C31"

	exbtn 80,80,"C6C7C8C9C10C11C12C13C14C15C16C17C18P19C20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 81,81,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19P20C21C22C23C24C25C26C27C28C29C30C31"
	exbtn 82,82,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20P21C22C23C24C25C26C27C28C29C30C31"
	exbtn 83,83,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21P22C23C24C25C26C27C28C29C30C31"

	exbtn 84,84,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22P23C24C25C26C27C28C29C30C31"
	exbtn 85,85,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23P24C25C26C27C28C29C30C31"

	exbtn 86,86,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24P25C26C27C28C29C30C31"
	exbtn 87,87,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25P26C27C28C29C30C31"

	exbtn 88,88,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26P27C28C29C30C31"
	exbtn 89,89,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27P28C29C30C31"

	exbtn 90,90,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29P30C31"
	exbtn 91,91,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29P30C31"
	exbtn 92,92,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29P30C31"
	exbtn 93,93,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29P30C31"
	exbtn 94,94,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29P30C31"
	exbtn 95,95,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29P30C31"

	exbtn 96,96,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30P31"
	exbtn 97,97,"C6C7C8C9C10C11C12C13C14C15C16C17C18C19C20C21C22C23C24C25C26C27C28C29C30P31"

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　ボイスオプション処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*menu_voice
btndef ""
gosub *sp151off
;mov %116,1
	vsp 143,1
	vsp 144,1
	vsp 145,1
;	vsp 148,1

	lsp 6,":a;dat\system\menuop00.jpg",45,320
	lsp 32,":a/2,0,3;dat\menu\menu_3chra2.jpg",480,200
	lsph 92,":a;dat\system\menuop21.jpg",45,320
	lsph 93,":a;dat\system\menuop22.jpg",45,320
	lsph 94,":a;dat\system\menuop23.jpg",45,320

	lsp 32,":a/2,0,3;dat\menu\menu_3chra2.jpg",480,200	;三頭身キャラ

	lsp 102,":s/20,20,0;#8888aa#FFFF66`　Save　",80,38
	lsp 103,":s/20,20,0;#8888aa#FFFF66`　Load　",240,38
	lsp 104,":s/20,20,0;#FFFFFF`　Options",400,38

	lsp 43,":s/13,16,0;#FFFF00`■ Character Volume Control",50,88
	lsp 44,":s/13,16,0;#FFFF00`Sugai Toshiki",70,111
	lsp 45,":s/13,16,0;#FFFF00`Hazuki Mizuna",70,134
	lsp 46,":s/13,16,0;#FFFF00`Shinoi Rin",70,157
	lsp 47,":s/13,16,0;#FFFF00`Kagawa Mami",70,180
	lsp 48,":s/13,16,0;#FFFF00`Nishihara Reiji",70,203
	lsp 49,":s/13,16,0;#FFFF00`Others",70,226

	lsp 50,":s/13,16,0;#FFFF00`Voices",50,259
	lsp 51,":s/13,16,0;#FFFF00`Sound Playback BGM Volume",50,282

	lsp 52,":s/13,16,0;#CCCCCC#FF5555`Off",185,111
	lsp 53,":s/13,16,0;#CCCCCC#FF5555■",215,111
	lsp 54,":s/13,16,0;#CCCCCC#FF5555■",236,111
	lsp 55,":s/13,16,0;#CCCCCC#FF5555■",257,111
	lsp 56,":s/13,16,0;#CCCCCC#FF5555■",278,111
	lsp 57,":s/13,16,0;#CCCCCC#FF5555``Max",299,111

	lsp 58,":s/13,16,0;#CCCCCC#FF5555`Off",185,134
	lsp 59,":s/13,16,0;#CCCCCC#FF5555■",215,134
	lsp 60,":s/13,16,0;#CCCCCC#FF5555■",236,134
	lsp 61,":s/13,16,0;#CCCCCC#FF5555■",257,134
	lsp 62,":s/13,16,0;#CCCCCC#FF5555■",278,134
	lsp 63,":s/13,16,0;#CCCCCC#FF5555``Max",299,134

	lsp 64,":s/13,16,0;#CCCCCC#FF5555`Off",185,157
	lsp 65,":s/13,16,0;#CCCCCC#FF5555■",215,157
	lsp 66,":s/13,16,0;#CCCCCC#FF5555■",236,157
	lsp 67,":s/13,16,0;#CCCCCC#FF5555■",257,157
	lsp 68,":s/13,16,0;#CCCCCC#FF5555■",278,157
	lsp 69,":s/13,16,0;#CCCCCC#FF5555`Max",299,157

	lsp 70,":s/13,16,0;#CCCCCC#FF5555`Off",185,180
	lsp 71,":s/13,16,0;#CCCCCC#FF5555■",215,180
	lsp 72,":s/13,16,0;#CCCCCC#FF5555■",236,180
	lsp 73,":s/13,16,0;#CCCCCC#FF5555■",257,180
	lsp 74,":s/13,16,0;#CCCCCC#FF5555■",278,180
	lsp 75,":s/13,16,0;#CCCCCC#FF5555``Max",299,180

	lsp 76,":s/13,16,0;#CCCCCC#FF5555`Off",185,203
	lsp 77,":s/13,16,0;#CCCCCC#FF5555■",215,203
	lsp 78,":s/13,16,0;#CCCCCC#FF5555■",236,203
	lsp 79,":s/13,16,0;#CCCCCC#FF5555■",257,203
	lsp 80,":s/13,16,0;#CCCCCC#FF5555■",278,203
	lsp 81,":s/13,16,0;#CCCCCC#FF5555``Max",299,203

	lsp 82,":s/13,16,0;#CCCCCC#FF5555`Off",185,226
	lsp 83,":s/13,16,0;#CCCCCC#FF5555■",215,226
	lsp 84,":s/13,16,0;#CCCCCC#FF5555■",236,226
	lsp 85,":s/13,16,0;#CCCCCC#FF5555■",257,226
	lsp 86,":s/13,16,0;#CCCCCC#FF5555■",278,226
	lsp 87,":s/13,16,0;#CCCCCC#FF5555``Max",299,226

	lsp 88,":s/13,16,0;#CCCCCC#FF5555`On",232,259
	lsp 89,":s/13,16,0;#CCCCCC#FF5555`Off",271,259
	lsp 90,":s/13,16,0;#CCCCCC#FF5555`Normal",232,282
	lsp 91,":s/13,16,0;#CCCCCC#FF5555`Lower",280,282


	if %151 = 0 lsp 52,":s/13,16,0;#FFFFFF#FF5555`Off",185,111
	if %151 = 20 lsp 53,":s/13,16,0;#FFFFFF#FF5555■",215,111
	if %151 = 40 lsp 54,":s/13,16,0;#FFFFFF#FF5555■",236,111
	if %151 = 60 lsp 55,":s/13,16,0;#FFFFFF#FF5555■",257,111
	if %151 = 80 lsp 56,":s/13,16,0;#FFFFFF#FF5555■",278,111
	if %151 = 100 lsp 57,":s/13,16,0;#FFFFFF#FF5555``Max",299,111

	if %152 = 0 lsp 58,":s/13,16,0;#FFFFFF#FF5555`Off",185,134
	if %152 = 20 lsp 59,":s/13,16,0;#FFFFFF#FF5555■",215,134
	if %152 = 40 lsp 60,":s/13,16,0;#FFFFFF#FF5555■",236,134
	if %152 = 60 lsp 61,":s/13,16,0;#FFFFFF#FF5555■",257,134
	if %152 = 80 lsp 62,":s/13,16,0;#FFFFFF#FF5555■",278,134
	if %152 = 100 lsp 63,":s/13,16,0;#FFFFFF#FF5555``Max",299,134

	if %153 = 0 lsp 64,":s/13,16,0;#FFFFFF#FF5555`Off",185,157
	if %153 = 20 lsp 65,":s/13,16,0;#FFFFFF#FF5555■",215,157
	if %153 = 40 lsp 66,":s/13,16,0;#FFFFFF#FF5555■",236,157
	if %153 = 60 lsp 67,":s/13,16,0;#FFFFFF#FF5555■",257,157
	if %153 = 80 lsp 68,":s/13,16,0;#FFFFFF#FF5555■",278,157
	if %153 = 100 lsp 69,":s/13,16,0;#FFFFFF#FF5555``Max",299,157

	if %154 = 0 lsp 70,":s/13,16,0;#FFFFFF#FF5555`Off",185,180
	if %154 = 20 lsp 71,":s/13,16,0;#FFFFFF#FF5555■",215,180
	if %154 = 40 lsp 72,":s/13,16,0;#FFFFFF#FF5555■",236,180
	if %154 = 60 lsp 73,":s/13,16,0;#FFFFFF#FF5555■",257,180
	if %154 = 80 lsp 74,":s/13,16,0;#FFFFFF#FF5555■",278,180
	if %154 = 100 lsp 75,":s/13,16,0;#FFFFFF#FF5555``Max",299,180

	if %155 = 0 lsp 76,":s/13,16,0;#FFFFFF#FF5555`Off",185,203
	if %155 = 20 lsp 77,":s/13,16,0;#FFFFFF#FF5555■",215,203
	if %155 = 40 lsp 78,":s/13,16,0;#FFFFFF#FF5555■",236,203
	if %155 = 60 lsp 79,":s/13,16,0;#FFFFFF#FF5555■",257,203
	if %155 = 80 lsp 80,":s/13,16,0;#FFFFFF#FF5555■",278,203
	if %155 = 100 lsp 81,":s/13,16,0;#FFFFFF#FF5555`Max",299,203

	if %156 = 0 lsp 82,":s/13,16,0;#FFFFFF#FF5555`Off",185,226
	if %156 = 20 lsp 83,":s/13,16,0;#FFFFFF#FF5555■",215,226
	if %156 = 40 lsp 84,":s/13,16,0;#FFFFFF#FF5555■",236,226
	if %156 = 60 lsp 85,":s/13,16,0;#FFFFFF#FF5555■",257,226
	if %156 = 80 lsp 86,":s/13,16,0;#FFFFFF#FF5555■",278,226
	if %156 = 100 lsp 87,":s/13,16,0;#FFFFFF#FF5555`Max",299,226

	if %157 = 0 lsp 88,":s/13,16,0;#FFFFFF#FF5555`On",232,259
	if %157 = 1 lsp 89,":s/13,16,0;#FFFFFF#FF5555`Off",271,259
	if %158 = 0 lsp 90,":s/13,16,0;#FFFFFF#FF5555`Normal",232,282
	if %158 = 1 lsp 91,":s/13,16,0;#FFFFFF#FF5555`Lower",280,282



gosub *voicebtn

	print %109

*menu_voiceloop
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
	btnwait %0

	if %0 == 0 goto *menu_voiceloop
	if %0 == -1 goto *menuend

	if %0 == 32 dwave 1,"dat\music\se\se01.wav":gosub *sp100off:goto *menu_op

	if %0 == 52 dwave 1,"dat\music\se\se01.wav":mov %151,0:goto *menu_voice
	if %0 == 53 dwave 1,"dat\music\se\se01.wav":mov %151,20:goto *menu_voice
	if %0 == 54 dwave 1,"dat\music\se\se01.wav":mov %151,40:goto *menu_voice
	if %0 == 55 dwave 1,"dat\music\se\se01.wav":mov %151,60:goto *menu_voice
	if %0 == 56 dwave 1,"dat\music\se\se01.wav":mov %151,80:goto *menu_voice
	if %0 == 57 dwave 1,"dat\music\se\se01.wav":mov %151,100:goto *menu_voice

	if %0 == 58 dwave 1,"dat\music\se\se01.wav":mov %152,0:goto *menu_voice
	if %0 == 59 dwave 1,"dat\music\se\se01.wav":mov %152,20:goto *menu_voice
	if %0 == 60 dwave 1,"dat\music\se\se01.wav":mov %152,40:goto *menu_voice
	if %0 == 61 dwave 1,"dat\music\se\se01.wav":mov %152,60:goto *menu_voice
	if %0 == 62 dwave 1,"dat\music\se\se01.wav":mov %152,80:goto *menu_voice
	if %0 == 63 dwave 1,"dat\music\se\se01.wav":mov %152,100:goto *menu_voice

	if %0 == 64 dwave 1,"dat\music\se\se01.wav":mov %153,0:goto *menu_voice
	if %0 == 65 dwave 1,"dat\music\se\se01.wav":mov %153,20:goto *menu_voice
	if %0 == 66 dwave 1,"dat\music\se\se01.wav":mov %153,40:goto *menu_voice
	if %0 == 67 dwave 1,"dat\music\se\se01.wav":mov %153,60:goto *menu_voice
	if %0 == 68 dwave 1,"dat\music\se\se01.wav":mov %153,80:goto *menu_voice
	if %0 == 69 dwave 1,"dat\music\se\se01.wav":mov %153,100:goto *menu_voice

	if %0 == 70 dwave 1,"dat\music\se\se01.wav":mov %154,0:goto *menu_voice
	if %0 == 71 dwave 1,"dat\music\se\se01.wav":mov %154,20:goto *menu_voice
	if %0 == 72 dwave 1,"dat\music\se\se01.wav":mov %154,40:goto *menu_voice
	if %0 == 73 dwave 1,"dat\music\se\se01.wav":mov %154,60:goto *menu_voice
	if %0 == 74 dwave 1,"dat\music\se\se01.wav":mov %154,80:goto *menu_voice
	if %0 == 75 dwave 1,"dat\music\se\se01.wav":mov %154,100:goto *menu_voice

	if %0 == 76 dwave 1,"dat\music\se\se01.wav":mov %155,0:goto *menu_voice
	if %0 == 77 dwave 1,"dat\music\se\se01.wav":mov %155,20:goto *menu_voice
	if %0 == 78 dwave 1,"dat\music\se\se01.wav":mov %155,40:goto *menu_voice
	if %0 == 79 dwave 1,"dat\music\se\se01.wav":mov %155,60:goto *menu_voice
	if %0 == 80 dwave 1,"dat\music\se\se01.wav":mov %155,80:goto *menu_voice
	if %0 == 81 dwave 1,"dat\music\se\se01.wav":mov %155,100:goto *menu_voice

	if %0 == 82 dwave 1,"dat\music\se\se01.wav":mov %156,0:goto *menu_voice
	if %0 == 83 dwave 1,"dat\music\se\se01.wav":mov %156,20:goto *menu_voice
	if %0 == 84 dwave 1,"dat\music\se\se01.wav":mov %156,40:goto *menu_voice
	if %0 == 85 dwave 1,"dat\music\se\se01.wav":mov %156,60:goto *menu_voice
	if %0 == 86 dwave 1,"dat\music\se\se01.wav":mov %156,80:goto *menu_voice
	if %0 == 87 dwave 1,"dat\music\se\se01.wav":mov %156,100:goto *menu_voice

	if %0 == 88 dwave 1,"dat\music\se\se01.wav":mov %157,0:goto *menu_voice
	if %0 == 89 dwave 1,"dat\music\se\se01.wav":mov %157,1:goto *menu_voice

	if %0 == 90 dwave 1,"dat\music\se\se01.wav":mov %158,0:bgmdownmode 0:goto *menu_voice
	if %0 == 91 dwave 1,"dat\music\se\se01.wav":mov %158,1:bgmdownmode 1:goto *menu_voice


	if %0 == 102 dwave 1,"dat\music\se\se01.wav":vsp 148,0:gosub *sp100off:goto *menu_save
	if %0 == 103 dwave 1,"dat\music\se\se01.wav":vsp 148,0:gosub *sp100off:goto *menu_load

	if %0 == 143 dwave 1,"dat\music\se\se01.wav":goto *menuend
	if %0 == 144 dwave 1,"dat\music\se\se01.wav":gosub *check_reset:lsp 144,":a/2,0,3;dat\system\menu02.jpg",230,400:print 1
	if %0 == 145 dwave 1,"dat\music\se\se01.wav":gosub *check_end:lsp 145,":a/2,0,3;dat\system\menu03.jpg",427,400:print 1

	if %0 == -10 dwave 1,"dat\music\se\se01.wav":gosub *check_reset
	if %0 == -11 dwave 1,"dat\music\se\se01.wav":goto *menuend	;スペース

	if %0 == -20 dwave 1,"dat\music\se\se01.wav":minimizewindow	;tab

	if %0 == -25 dwave 1,"dat\music\se\se01.wav":loadgame 41
	if %0 == -26 dwave 1,"dat\music\se\se01.wav":loadgame 42
	if %0 == -27 dwave 1,"dat\music\se\se01.wav":loadgame 43
	if %0 == -28 dwave 1,"dat\music\se\se01.wav":loadgame 44

	if %0 == -32 dwave 1,"dat\music\se\se01.wav":gosub *keyhelp2

	if %0 == -50 dwave 1,"dat\music\se\se01.wav":gosub *fuls

	wait 150


btndef ""

	lsph 6,":a;dat\system\menuop00.jpg",45,320

gosub *voicebtn
lsp 6,":a;dat\system\menuop00.jpg",45,320
	print 1

goto *menu_voiceloop

*voicebtn
btndef clear

	spbtn 32,32

	exbtn_d "P6C92C93C94"

	exbtn 52,52,"C6P92C93C94"
	exbtn 53,53,"C6P92C93C94"
	exbtn 54,54,"C6P92C93C94"
	exbtn 55,55,"C6P92C93C94"
	exbtn 56,56,"C6P92C93C94"
	exbtn 57,57,"C6P92C93C94"
	exbtn 58,58,"C6P92C93C94"
	exbtn 59,59,"C6P92C93C94"
	exbtn 60,60,"C6P92C93C94"
	exbtn 61,61,"C6P92C93C94"
	exbtn 62,62,"C6P92C93C94"
	exbtn 63,63,"C6P92C93C94"
	exbtn 64,64,"C6P92C93C94"
	exbtn 65,65,"C6P92C93C94"
	exbtn 66,66,"C6P92C93C94"
	exbtn 67,67,"C6P92C93C94"
	exbtn 68,68,"C6P92C93C94"
	exbtn 69,69,"C6P92C93C94"
	exbtn 70,70,"C6P92C93C94"
	exbtn 71,71,"C6P92C93C94"
	exbtn 72,72,"C6P92C93C94"
	exbtn 73,73,"C6P92C93C94"
	exbtn 74,74,"C6P92C93C94"
	exbtn 75,75,"C6P92C93C94"
	exbtn 76,76,"C6P92C93C94"
	exbtn 77,77,"C6P92C93C94"
	exbtn 78,78,"C6P92C93C94"
	exbtn 79,79,"C6P92C93C94"
	exbtn 80,80,"C6P92C93C94"
	exbtn 81,81,"C6P92C93C94"
	exbtn 82,82,"C6P92C93C94"
	exbtn 83,83,"C6P92C93C94"
	exbtn 84,84,"C6P92C93C94"
	exbtn 85,85,"C6P92C93C94"
	exbtn 86,86,"C6P92C93C94"
	exbtn 87,87,"C6P92C93C94"

	exbtn 88,88,"C6C92P93C94"
	exbtn 89,89,"C6C92P93C94"
	exbtn 90,90,"C6C92C93P94"
	exbtn 91,91,"C6C92C93P94"

	spbtn 102,102
	spbtn 103,103

	spbtn 143,143
	spbtn 144,144
	spbtn 145,145

return
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　メニュー終了処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*menuend
vsp 143,0
vsp 144,0
vsp 145,0
vsp 146,0
vsp 147,0
vsp 148,0
	gosub *sp100off
	gosub *sp151del
	print %109
	gosub *windowon
if %20 == 0 saveon
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　セーブサムネイル保存処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*save_ss_100
gosub *sp51_59off
gosub *sp151off
;vsp 155,0
print 1
getscreenshot 100,75
gosub *sp51_59on
gosub *spnot111_122on
;vsp 155,1
;print 1

return

*save_ss_64
;gosub *sp51_59off
;gosub *sp151off
;vsp 155,0
;print 1
getscreenshot 64,48
;gosub *sp51_59on
;gosub *spnot111_122on
;vsp 155,1
;print 1
return

*winsave_ss_64
gosub *sp151off
;vsp 155,0
print 1
getscreenshot 64,48
;gosub *spnot111_122on
;vsp 155,1
;print 1
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　スクリーンショット撮影処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*ss

	getscreenshot 640,480
	mov $20,"ss\ss_"
	date %20,%21,%22

	itoa $21,%20
	add $20,$21

	itoa $21,%21
	add $20,$21

	itoa $21,%22
	add $20,$21

	time %20,%21,%22

	itoa $21,%20
	add $20,$21

	itoa $21,%21
	add $20,$21

	itoa $21,%22
	add $20,$21
	add $20,".bmp"

	savescreenshot $20
	mesbox "Screenshot taken!","OK"

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　ウインドウメニュー
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sysbtn



	lsp 111,":s/12,12,0;#8888aa#FFFF66Ｑ．ＳＡＶＥ",220,450
	lsp 112,":s/12,12,0;#8888aa#FFFF66Ｑ．ＬＯＡＤ",304,450
	lsp 113,":s/12,12,0;#8888aa#FFFF66ＭＥＮＵ",388,450

	lsp 121,":s/12,12,0;#8888aa#FFFF66＜",448,450
	lsp 122,":s/12,12,0;#8888aa#FFFF66■",472,450
	lsp 123,":s/12,12,0;#8888aa#FFFF66＞",496,450

if %107 = 0 lsp 125,":s/12,12,0;#8888aa#FFFF66ＡＵＴＯ",520,450
if %107 = 1 lsp 125,":s/12,12,0;#88FFFF#FF6666ＡＵＴＯ",520,450

	lsp 124,":s/12,12,0;#8888aa#FFFF66？",580,450

	spbtn 111,116	;Qセーブ
	spbtn 112,117	;Qロード
	spbtn 113,118	;メニュー

	spbtn 121,121	;回想
	spbtn 122,122	;メッセージウインドウ消去
	spbtn 123,123	;スキップ
	spbtn 124,124	;キーヘルプ
	spbtn 125,125	;オート


return



;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　テキスト割り込み
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*text_lb
if %31 > 0 wait %31:texec:return		;EDクリック無効
saveoff
isskip %0:if %0=1 goto *textbtnloop		;スキップ動作軽減
textspeed %125
btndef clear
gosub *sysbtn

*textbtnloop

ispage %0
getcursorpos %1,%2
sub %1,20
if %0=1 amsp 150,%1,%2:vsp 150,1:vsp 149,0
if %0=0 amsp 149,%1,%2:vsp 149,1:vsp 150,0
;if %107 = 0 lsp 125,":s/12,12,0;#8888aa#FFFF66ＡＵＴＯ",520,450
;if %107 = 1 lsp 125,":s/12,12,0;#88FFFF#FF6666ＡＵＴＯ",520,450

print 1

gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
textbtnwait %0

vsp 149,0
vsp 150,0
print 1

	if %0 == 116 gosub *qsave:lsp 111,":s/12,12,0;#8888aa#FFFF66Ｑ．ＳＡＶＥ",220,450:print 1:gosub *sysbtn:goto *text_lb
	if %0 == 117 gosub *qload:lsp 112,":s/12,12,0;#8888aa#FFFF66Ｑ．ＬＯＡＤ",304,450:print 1:goto *text_lb
	if %0 == 118 gosub *callmenu:goto *text_lb

	if %0 == 121 setwindow2 #888888:gosub *windowoff:systemcall lookback:setwindow2 #FFFFFF:gosub *windowon
	if %0 == 122 gosub *winhide
	if %0 == 123 gosub *autoc
	if %0 == 124 gosub *keyhelp
	if %0 == 125 gosub *auto


	if %0=0 goto *end_textbtn	;テキストクリック処理
	if %0=-1 gosub *rclk:goto *text_lb	;右クリック時

	if %0 == -2 setwindow2 #888888:gosub *windowoff:systemcall lookback:setwindow2 #FFFFFF:gosub *windowon	;ホイール上
	if %0 == -3 goto *end_textbtn		;ホイール下

	if %0 == -10 gosub *check_reset	;Esc
	if %0 == -11 gosub *callmenu:goto *text_lb	;スペース

	if %0 == -12 setwindow2 #888888:gosub *windowoff:systemcall lookback:setwindow2 #FFFFFF:gosub *windowon	;ホイール上
	if %0 == -13 goto *end_textbtn		;ホイール下

	if %0 == -19 goto *end_textbtn	;リターン
	if %0 == -20 minimizewindow	;tab

	if %0 == -21 savegame 41:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave01.bmp"
	if %0 == -22 savegame 42:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave02.bmp"
	if %0 == -23 savegame 43:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave03.bmp"
	if %0 == -24 savegame 44:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave04.bmp"

	if %0 == -25 loadgame 41
	if %0 == -26 loadgame 42
	if %0 == -27 loadgame 43
	if %0 == -28 loadgame 44

	if %0 == -29 gosub *autoc

	if %0 == -31 gosub *winhide
	if %0 == -32 gosub *windowoff:gosub *keyhelp:gosub *windowon

	if %0 == -50 gosub *fuls

	if %0 == -52 gosub *ss
	if %0 == -53 gosub *windowoff:gosub *ss:gosub *windowon

	wait 150

goto *textbtnloop

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　テキスト割り込み終了処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*end_textbtn
texec
if %157=0 dwavestop 0
saveon

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　キーヘルプ表示処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*keyhelp
btndef ""

gosub *windowoff
lsp 0,":a;dat\system\keyhelp.jpg",0,0
print %109:
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
btnwait %1
csp 0
print %109
gosub *sysbtn
gosub *windowon

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　キーヘルプ表示処理２
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*keyhelp2
btndef ""

gosub *windowoff
lsp 0,":a;dat\system\keyhelp.jpg",0,0
print %109:
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
btnwait %1
csp 0
print %109
gosub *windowon

return


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　ウインドウ消去処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*winhide
gosub *windowoff
gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
btnwait %1
gosub *windowon

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　フルスクリーン処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*fuls
isfull %5
if %5 == 1 menu_window
if %5 == 0 menu_full
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　スキップ処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*autoc

dwave 3,"dat\music\se\se01.wav"

if %127 == 1 kidokumode 0
if %127 == 2 kidokumode 1

systemcall skip

return


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　スキップ処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*auto

dwave 3,"dat\music\se\se01.wav"

;if %107 == 0 goto *autoon
;
;	autoclick 0
;	mov %107,0
;	lsp 125,":s/12,12,0;#8888aa#FFFF66ＡＵＴＯ",520,450
;
;	goto *auclend
;
;*autoon

automode_time %126
systemcall automode

;	autoclick %126
;	mov %107,1
;	lsp 125,":s/12,12,0;#88FFFF#FF6666ＡＵＴＯ",520,450

*auclend

return



;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　Ｑセーブ処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*qsave
btndef ""

	dwave 3,"dat\music\se\se01.wav"
textoff
	if %131 == 0 savegame 41:gosub *windowoff:gosub *winsave_ss_64:gosub *windowon:savescreenshot "savedata\qsave01.bmp":goto *qsave_end

	lsp 116,":s/16,18,0;#FFFFFF#FF7777１",218,424
	lsp 117,":s/16,18,0;#FFFFFF#FF7777２",238,424
	lsp 118,":s/16,18,0;#FFFFFF#FF7777３",258,424
	lsp 119,":s/16,18,0;#FFFFFF#FF7777４",278,424
	lsp 120,":s/170,60,0;#555566■",171,391

	mov %10,41:gosub *savedata:lsph 106,$0,200,404
	mov %10,42:gosub *savedata:lsph 107,$0,200,404
	mov %10,43:gosub *savedata:lsph 108,$0,200,404
	mov %10,44:gosub *savedata:lsph 109,$0,200,404

	exbtn_d "C106C107C108C109"
	exbtn 116,116,"P106C107C108C109"
	exbtn 117,117,"C106P107C108C109"
	exbtn 118,118,"C106C107P108C109"
	exbtn 119,119,"C106C107C108P109"

	print 11

	btnwait %0

	if %0 == 116 dwave 4,"dat\music\se\se04.wav":savegame 41:gosub *windowoff:gosub *winsave_ss_64:gosub *windowon:savescreenshot "savedata\qsave01.bmp":goto *qsave_end
	if %0 == 117 dwave 4,"dat\music\se\se04.wav":savegame 42:gosub *windowoff:gosub *winsave_ss_64:gosub *windowon:savescreenshot "savedata\qsave02.bmp":goto *qsave_end
	if %0 == 118 dwave 4,"dat\music\se\se04.wav":savegame 43:gosub *windowoff:gosub *winsave_ss_64:gosub *windowon:savescreenshot "savedata\qsave03.bmp":goto *qsave_end
	if %0 == 119 dwave 4,"dat\music\se\se04.wav":savegame 44:gosub *windowoff:gosub *winsave_ss_64:gosub *windowon:savescreenshot "savedata\qsave04.bmp":goto *qsave_end

dwave 1,"dat\music\se\se01.wav"

*qsave_end
csp 106
csp 107
csp 108
csp 109
csp 116
csp 117
csp 118
csp 119
csp 120
print 11
texton

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　Ｑロード処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*qload

btndef ""

	dwave 1,"dat\music\se\se01.wav"
textoff
	if %131 == 0 loadgame 41:goto *qload_end

	lsp 116,":s/16,18,0;#FFFFFF#FF7777１",301,424
	lsp 117,":s/16,18,0;#FFFFFF#FF7777２",321,424
	lsp 118,":s/16,18,0;#FFFFFF#FF7777３",341,424
	lsp 119,":s/16,18,0;#FFFFFF#FF7777４",361,424
	lsp 120,":s/170,60,0;#555566■",254,391

	mov %10,41:gosub *savedata:lsph 106,$0,284,404
	mov %10,42:gosub *savedata:lsph 107,$0,284,404
	mov %10,43:gosub *savedata:lsph 108,$0,284,404
	mov %10,44:gosub *savedata:lsph 109,$0,284,404

	exbtn_d "C106C107C108C109"
	exbtn 116,116,"P106C107C108C109"
	exbtn 117,117,"C106P107C108C109"
	exbtn 118,118,"C106C107P108C109"
	exbtn 119,119,"C106C107C108P109"

	print 11

	btnwait %0

	dwave 1,"dat\music\se\se01.wav"

	if %0 == 116 loadgame 41
	if %0 == 117 loadgame 42
	if %0 == 118 loadgame 43
	if %0 == 119 loadgame 44

*qload_end

csp 106
csp 107
csp 108
csp 109
csp 116
csp 117
csp 118
csp 119
csp 120
print 11
texton
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　メッセージウインドウ表示
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*windowon
gosub *sysbtn
gosub *window_set2
vsp 155,1
print 1
texton
mov %26,1
return


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　メッセージウインドウ消去
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆


*windowoff
isskip %11
btndef ""
gosub *sp151off
vsp 155,0
textoff
mov %26,0
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　ウインドウ表示時スキップ判定
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*winon_skip

if %127 == 0 goto *winauto

if %127 == 1 kidokumode 0
if %127 == 2 kidokumode 1

systemcall skip

return

*winauto
automode_time %126
systemcall automode

;if %107 == 0 goto *winautoon
;
;	autoclick 0
;	mov %107,0
;
;	goto *winauclend
;
;*winautoon
;
;	autoclick %126
;	mov %107,1

*winauclend

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP101-145消去
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp151del
	for %0=101 to 142 step 1
		csp %0
	next
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
; SP111-122消去（セーブカーソル）
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp111_122del
	for %9=111 to 122 step 1
		csp %9
	next
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP0-100隠す
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp100off
	for %0=0 to 100 step 1
		vsp %0,0
	next
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP0-100表示
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp100on
	for %0=32 to 100 step 1
		vsp %0,1
	next
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP51-59隠す(セーブページ)
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp51_59off
	for %0=51 to 59 step 1
		vsp %0,0
	next
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP51-59表示
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp51_59on
	for %0=51 to 59 step 1
		vsp %0,1
	next
return


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP0-145隠す
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp151off
	for %0=101 to 145 step 1
		vsp %0,0
	next
	vsp 155,0
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP0-145表示
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sp151on
	for %0=101 to 145 step 1
		vsp %0,1
	next
	vsp 155,1
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　SP111-122表示　3-110 123-145
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*spnot111_122on
	for %0=101 to 105 step 1
		vsp %0,1
	next
	
	for %0=123 to 145 step 1
		vsp %0,1
	next
return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　セーブ上書き確認処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*check_save
btndef clear

	lsp 3,":s/20,25,3;#CCCCCC#FFFFFF`Yes",200,226
	lsp 4,":s/20,25,3;#CCCCCC#FFFFFF`No",350,226
	lsp 5,":a;dat\system\check3.jpg",0,0

	print %109


	spbtn 3,3
	spbtn 4,4

	btnwait %7

	if %7 == 3 csp 3:csp 4:csp 5:print 0:return
	if %7 == 4 mov %7,-1:csp 3:csp 4:csp 5:print 0:mov %0,0:return

goto *check_save


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　ロード確認処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*check_load
btndef clear

	lsp 3,":s/20,25,3;#CCCCCC#FFFFFF`Yes",200,226
	lsp 4,":s/20,25,3;#CCCCCC#FFFFFF`No",350,226
	lsp 5,":a;dat\system\check4.jpg",0,0

	print %109


	spbtn 3,3
	spbtn 4,4

	btnwait %7

	if %7 == 3 csp 3:csp 4:csp 5:print 0:return
	if %7 == 4 mov %7,-1:csp 3:csp 4:csp 5:print 0:return

	goto *check_load

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　終了確認処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*check_end
btndef clear

	lsp 3,":s/20,25,3;#CCCCCC#FFFFFF`Yes",200,226
	lsp 4,":s/20,25,3;#CCCCCC#FFFFFF`No",350,226
	lsp 5,":a;dat\system\check.jpg",0,0

	print %109


	spbtn 3,3
	spbtn 4,4

	btnwait %2

	if %0 == 0 goto *check_end

;	if %2 == 3 allsphide:bg black,0:print %110:wait 1000:end
	if %2 == 3 gosub *windowoff:textoff:csp -1:mp3fadeout 1000:bg black,0:print %110:wait 500:end
	if %2 == 4 csp 3:csp 4:csp 5:print %109:return

goto *check_end


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　リセット確認処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*check_reset
btndef clear

	lsp 3,":s/20,25,3;#CCCCCC#FFFFFF`Yes",200,226
	lsp 4,":s/20,25,3;#CCCCCC#FFFFFF`No",350,226
	lsp 5,":a;dat\system\check2.jpg",0,0

	print %109


	spbtn 3,3
	spbtn 4,4

	btnwait %2

	if %0 == 0 goto *check_reset

	if %2 == 4 && %29 == 1 csp 3:csp 4:csp 5:print %109:gosub *windowon:return
;	if %2 == 3 allsphide:bg black,0:print %110:wait 1000:RESET
	if %2 == 3 gosub *windowoff:textoff:csp -1:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
	if %2 == 4 csp 3:csp 4:csp 5:print %109:return

goto *check_reset

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　選択肢処理（３つまで）
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
*customsel

skipoff
mov %20,1
	if %132 == 1 savegame 44:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave04.bmp"

*csel_loop
btndef clear
gosub *sysbtn

getcselnum %0

cselbtn 0,150,34,40
cselbtn 1,151,34,64
if %0>2 cselbtn 2,152,34,88
if %0>3 cselbtn 3,153,34,112

gettab
getfunction
getcursor
getenter
getzxc				;z=-51 x=-52 c=-53
getpage				;PageUp=-12 PageDown=-13
getinsert			;insert=-50
selectbtnwait %0

	if %0 == 116 gosub *qsave:lsp 111,":s/12,12,0;#8888aa#FFFF66Ｑ．ＳＡＶＥ",220,450:print 1:goto *csel_loop
	if %0 == 117 gosub *qload:lsp 112,":s/12,12,0;#8888aa#FFFF66Ｑ．ＬＯＡＤ",304,450:print 1:goto *csel_loop
	if %0 == 118 gosub *callmenu:goto *csel_loop

	if %0 == 121 setwindow2 #888888:gosub *windowoff:systemcall lookback:setwindow2 #FFFFFF:gosub *windowon:goto *csel_loop
	if %0 == 122 gosub *winhide:goto *csel_loop
	if %0 == 123 gosub *autoc:goto *csel_loop
	if %0 == 124 gosub *keyhelp:goto *csel_loop

	if %0=-1 gosub *rclk:goto *csel_loop	;右クリック

	if %0 == -2 setwindow2 #888888:gosub *windowoff:systemcall lookback:setwindow2 #FFFFFF:gosub *windowon:goto *csel_loop	;ホイール上

	if %0 == -10 gosub *check_reset:goto *csel_loop	;Esc
	if %0 == -11 gosub *callmenu:goto *csel_loop	;スペース

	if %0 == -12 setwindow2 #888888:gosub *windowoff:systemcall lookback:setwindow2 #FFFFFF:gosub *windowon:goto *csel_loop	;ホイール上

	if %0 == -20 minimizewindow:goto *csel_loop	;tab

	if %0 == -21 savegame 41:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave01.bmp":goto *csel_loop
	if %0 == -22 savegame 42:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave02.bmp":goto *csel_loop
	if %0 == -23 savegame 43:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave03.bmp":goto *csel_loop
	if %0 == -24 savegame 44:gosub *windowoff:gosub *save_ss_64:gosub *windowon:savescreenshot "savedata\qsave04.bmp":goto *csel_loop

	if %0 == -25 loadgame 41:goto *csel_loop
	if %0 == -26 loadgame 42:goto *csel_loop
	if %0 == -27 loadgame 43:goto *csel_loop
	if %0 == -28 loadgame 44:goto *csel_loop

	if %0 == -31 gosub *winhide:goto *csel_loop
	if %0 == -32 gosub *windowoff:gosub *keyhelp:gosub *windowon:goto *csel_loop

	if %0 == -50 gosub *fuls:goto *csel_loop

	if %0 == -52 gosub *ss:goto *csel_loop
	if %0 == -53 gosub *windowoff:gosub *ss:gosub *windowon:goto *csel_loop

if %117 = 1 && %128 = 1 systemcall skip
if %117 = 2 && %128 = 1 systemcall automode
if %0>=150 & %0<=154 saveon:mov %20,0:sub %0,150:cselgoto %0

	wait 150

goto *csel_loop

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　メッセージウインドウ設定
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*window_set

	windoweffect 10,100	;テキストウィンドウ表示/消去エフェクト

	lsph 155,"dat\system\window.bmp",19,19,%120

	textspeed %125

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　メッセージウインドウ透過設定
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*window_set2

	lsph 155,"dat\system\window.bmp",19,19,%120

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　背景切替開始
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*change_b	;背景変更命令

getparam $24
if %139 = 1 && %26 = 1 gosub *windowoff:mov %26,1

if $24 = "教室昼" bg "dat\bg\bg01_1.jpg",%110:goto *cbgend
if $24 = "教室夕" bg "dat\bg\bg01_2.jpg",%110:goto *cbgend
if $24 = "教室夜" bg "dat\bg\bg01_3.jpg",%110:goto *cbgend
if $24 = "学園祭教室昼" bg "dat\bg\bg01a_1.jpg",%110:goto *cbgend
if $24 = "学園祭教室夕" bg "dat\bg\bg01a_2.jpg",%110:goto *cbgend
if $24 = "学園祭教室夜" bg "dat\bg\bg01a_3.jpg",%110:goto *cbgend
if $24 = "廊下昼" bg "dat\bg\bg02_1.jpg",%110:goto *cbgend
if $24 = "廊下夕" bg "dat\bg\bg02_2.jpg",%110:goto *cbgend
if $24 = "廊下夜" bg "dat\bg\bg02_3.jpg",%110:goto *cbgend
if $24 = "学園祭廊下昼" bg "dat\bg\bg02a_1.jpg",%110:goto *cbgend
if $24 = "学園祭廊下夕" bg "dat\bg\bg02a_2.jpg",%110:goto *cbgend
if $24 = "学園祭廊下夜" bg "dat\bg\bg02a_3.jpg",%110:goto *cbgend
if $24 = "自販機前昼" bg "dat\bg\bg02b_1.jpg",%110:goto *cbgend
if $24 = "自販機前夕" bg "dat\bg\bg02b_2.jpg",%110:goto *cbgend
if $24 = "自販機前夜" bg "dat\bg\bg02b_3.jpg",%110:goto *cbgend
if $24 = "階段昼" bg "dat\bg\bg03_1.jpg",%110:goto *cbgend
if $24 = "階段夕" bg "dat\bg\bg03_2.jpg",%110:goto *cbgend
if $24 = "階段夜" bg "dat\bg\bg03_3.jpg",%110:goto *cbgend
if $24 = "屋上昼" bg "dat\bg\bg04_1.jpg",%110:goto *cbgend
if $24 = "屋上夕" bg "dat\bg\bg04_2.jpg",%110:goto *cbgend
if $24 = "屋上夜" bg "dat\bg\bg04_3.jpg",%110:goto *cbgend
if $24 = "屋上昼過去" bg "dat\bg\bg04a_1.jpg",%110:goto *cbgend
if $24 = "屋上夕過去" bg "dat\bg\bg04a_2.jpg",%110:goto *cbgend
if $24 = "屋上夕テープ無し" bg "dat\bg\bg04b_2.jpg",%110:goto *cbgend
if $24 = "屋上夜テープ無し" bg "dat\bg\bg04b_3.jpg",%110:goto *cbgend
if $24 = "自室朝" bg "dat\bg\bg05_1.jpg",%110:goto *cbgend
if $24 = "自室夜" bg "dat\bg\bg05_2.jpg",%110:goto *cbgend
if $24 = "玄関朝" bg "dat\bg\bg06_1.jpg",%110:goto *cbgend
if $24 = "玄関夜" bg "dat\bg\bg06_2.jpg",%110:goto *cbgend
if $24 = "通学路昼" bg "dat\bg\bg07_1.jpg",%110:goto *cbgend
if $24 = "通学路夕" bg "dat\bg\bg07_2.jpg",%110:goto *cbgend
if $24 = "通学路夜" bg "dat\bg\bg07_3.jpg",%110:goto *cbgend
if $24 = "校門昼" bg "dat\bg\bg08_1.jpg",%110:goto *cbgend
if $24 = "校門夕" bg "dat\bg\bg08_2.jpg",%110:goto *cbgend
if $24 = "校門夜" bg "dat\bg\bg08_3.jpg",%110:goto *cbgend
if $24 = "校門通常時昼" bg "dat\bg\bg08a.jpg",%110:goto *cbgend
if $24 = "体育館昼" bg "dat\bg\bg09_1.jpg",%110:goto *cbgend
if $24 = "体育館夕" bg "dat\bg\bg09_2.jpg",%110:goto *cbgend
if $24 = "体育館夜" bg "dat\bg\bg09_3.jpg",%110:goto *cbgend
if $24 = "体育館ミラーボール" bg "dat\bg\bg09a.jpg",%110:goto *cbgend
if $24 = "体育館スポットライト" bg "dat\bg\bg09b.jpg",%110:goto *cbgend
if $24 = "グラウンド昼" bg "dat\bg\bg10.jpg",%110:goto *cbgend
if $24 = "キャンプファイヤー" bg "dat\bg\bg10a.jpg",%110:goto *cbgend
if $24 = "保健室昼" bg "dat\bg\bg11_1.jpg",%110:goto *cbgend
if $24 = "保健室夜" bg "dat\bg\bg11_2.jpg",%110:goto *cbgend
if $24 = "ＣＧ０１＿１" bg "dat\cg\cg01_1.jpg",%124:mov %201,1:goto *cbgend
if $24 = "ＣＧ０１＿２" bg "dat\cg\cg01_2.jpg",%124:mov %202,1:goto *cbgend
if $24 = "ＣＧ０２＿１" bg "dat\cg\cg02_1.jpg",%124:mov %203,1:goto *cbgend
if $24 = "ＣＧ０２＿２" bg "dat\cg\cg02_2.jpg",%124:mov %204,1:goto *cbgend
if $24 = "ＣＧ０２＿３" bg "dat\cg\cg02_3.jpg",%124:mov %205,1:goto *cbgend
if $24 = "ＣＧ０２＿４" bg "dat\cg\cg02_4.jpg",%124:mov %206,1:goto *cbgend
if $24 = "ＣＧ０２＿５" bg "dat\cg\cg02_5.jpg",%124:mov %207,1:goto *cbgend
if $24 = "ＣＧ０２＿６" bg "dat\cg\cg02_6.jpg",%124:mov %227,1:goto *cbgend
if $24 = "ＣＧ０３＿１" bg "dat\cg\cg03_1.jpg",%124:mov %208,1:goto *cbgend
if $24 = "ＣＧ０４＿１" bg "dat\cg\cg04_1.jpg",%124:mov %209,1:goto *cbgend
if $24 = "ＣＧ０４＿２" bg "dat\cg\cg04_2.jpg",%124:mov %210,1:goto *cbgend
if $24 = "ＣＧ０４＿３" bg "dat\cg\cg04_3.jpg",%124:mov %211,1:goto *cbgend
if $24 = "ＣＧ０４＿４" bg "dat\cg\cg04_4.jpg",%124:mov %212,1:goto *cbgend
if $24 = "ＣＧ０４＿５" bg "dat\cg\cg04_5.jpg",%124:mov %213,1:goto *cbgend
if $24 = "ＣＧ０５＿１" bg "dat\cg\cg05_1.jpg",%124:mov %214,1:goto *cbgend
if $24 = "ＣＧ０５＿２" bg "dat\cg\cg05_2.jpg",%124:mov %215,1:goto *cbgend
if $24 = "ＣＧ１１＿１" bg "dat\cg\cg11_1.jpg",%124:mov %216,1:goto *cbgend
if $24 = "ＣＧ１２＿１" bg "dat\cg\cg12_1.jpg",%124:mov %217,1:goto *cbgend
if $24 = "ＣＧ１３＿１" bg "dat\cg\cg13_1.jpg",%124:mov %218,1:goto *cbgend
if $24 = "ＣＧ１４＿１" bg "dat\cg\cg14_1.jpg",%124:mov %219,1:goto *cbgend
if $24 = "ＣＧ１５＿１" bg "dat\cg\cg15_1.jpg",%124:mov %220,1:goto *cbgend
if $24 = "ＣＧ１５＿２" bg "dat\cg\cg15_2.jpg",%124:mov %221,1:goto *cbgend
if $24 = "ＣＧ１５＿３" bg "dat\cg\cg15_3.jpg",%124:mov %222,1:goto *cbgend
if $24 = "ＣＧ１５＿４" bg "dat\cg\cg15_4.jpg",%124:mov %223,1:goto *cbgend
if $24 = "ＣＧ９１＿１" bg "dat\cg\cg91_1.jpg",%124:mov %224,1:goto *cbgend
if $24 = "ＣＧ９２＿１" bg "dat\cg\cg92_1.jpg",%124:mov %225,1:goto *cbgend
if $24 = "ＣＧ９２＿２" bg "dat\cg\cg92_2.jpg",13,4800:goto *cbgend
if $24 = "ＣＧ９３＿１" bg "dat\cg\cg93_1.jpg",10,3000:mov %226,1:goto *cbgend


*cbgend

if %139 = 1 && %26 = 1 gosub *windowon


return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　キャラ切替開始
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*change_cc	;中央キャラ変更命令

getparam $25
if %139 = 1 && %26 = 1 gosub *windowoff:mov %26,1

if $25 = "おさげ111通常" ld c,":a;dat\chra\osage111.jpg",%123:goto *cbgend
if $25 = "おさげ112笑顔" ld c,":a;dat\chra\osage112.jpg",%123:goto *cbgend
if $25 = "おさげ113ふふーん" ld c,":a;dat\chra\osage113.jpg",%123:goto *cbgend
if $25 = "おさげ114わ" ld c,":a;dat\chra\osage114.jpg",%123:goto *cbgend
if $25 = "おさげ115泣き" ld c,":a;dat\chra\osage115.jpg",%123:goto *cbgend
if $25 = "おさげ116照れ" ld c,":a;dat\chra\osage116.jpg",%123:goto *cbgend
if $25 = "おさげ121もー" ld c,":a;dat\chra\osage121.jpg",%123:goto *cbgend
if $25 = "おさげ122なんですかー" ld c,":a;dat\chra\osage122.jpg",%123:goto *cbgend
if $25 = "おさげ131あさって" ld c,":a;dat\chra\osage131.jpg",%123:goto *cbgend
if $25 = "おさげ132気付く" ld c,":a;dat\chra\osage132.jpg",%123:goto *cbgend
if $25 = "おさげ141通常" ld c,":a;dat\chra\osage141.jpg",%123:goto *cbgend
if $25 = "おさげ142笑顔" ld c,":a;dat\chra\osage142.jpg",%123:goto *cbgend
if $25 = "おさげ143ええー" ld c,":a;dat\chra\osage143.jpg",%123:goto *cbgend
if $25 = "おさげ144うつむき" ld c,":a;dat\chra\osage144.jpg",%123:goto *cbgend
if $25 = "おさげ145うつむき泣き" ld c,":a;dat\chra\osage145.jpg",%123:goto *cbgend
if $25 = "おさげ146泣き" ld c,":a;dat\chra\osage146.jpg",%123:goto *cbgend

if $25 = "しのりん211メ通常" ld c,":a;dat\chra\sinorin211.jpg",%123:goto *cbgend
if $25 = "しのりん212メあうう" ld c,":a;dat\chra\sinorin212.jpg",%123:goto *cbgend
if $25 = "しのりん213メ笑顔" ld c,":a;dat\chra\sinorin213.jpg",%123:goto *cbgend
if $25 = "しのりん214メ目閉じ" ld c,":a;dat\chra\sinorin214.jpg",%123:goto *cbgend
if $25 = "しのりん215メ驚き" ld c,":a;dat\chra\sinorin215.jpg",%123:goto *cbgend
if $25 = "しのりん221メ通常" ld c,":a;dat\chra\sinorin221.jpg",%123:goto *cbgend
if $25 = "しのりん222メ俯き" ld c,":a;dat\chra\sinorin222.jpg",%123:goto *cbgend
if $25 = "しのりん223メうわわ" ld c,":a;dat\chra\sinorin223.jpg",%123:goto *cbgend
if $25 = "しのりん224メ照れ" ld c,":a;dat\chra\sinorin224.jpg",%123:goto *cbgend
if $25 = "しのりん231通常" ld c,":a;dat\chra\sinorin231.jpg",%123:goto *cbgend
if $25 = "しのりん232あうう" ld c,":a;dat\chra\sinorin232.jpg",%123:goto *cbgend
if $25 = "しのりん233笑顔" ld c,":a;dat\chra\sinorin233.jpg",%123:goto *cbgend
if $25 = "しのりん234目閉じ" ld c,":a;dat\chra\sinorin234.jpg",%123:goto *cbgend
if $25 = "しのりん235驚き" ld c,":a;dat\chra\sinorin235.jpg",%123:goto *cbgend
if $25 = "しのりん241通常" ld c,":a;dat\chra\sinorin241.jpg",%123:goto *cbgend
if $25 = "しのりん242俯き" ld c,":a;dat\chra\sinorin242.jpg",%123:goto *cbgend
if $25 = "しのりん243うわわ" ld c,":a;dat\chra\sinorin243.jpg",%123:goto *cbgend
if $25 = "しのりん244照れ" ld c,":a;dat\chra\sinorin244.jpg",%123:goto *cbgend

if $25 = "まみたん311通常" ld c,":a;dat\chra\mamitan311.jpg",%123:goto *cbgend
if $25 = "まみたん312笑顔" ld c,":a;dat\chra\mamitan312.jpg",%123:goto *cbgend
if $25 = "まみたん313はあー" ld c,":a;dat\chra\mamitan313.jpg",%123:goto *cbgend

if $25 = "うに411通常" ld c,":a;dat\chra\uni411.jpg",%123:goto *cbgend
if $25 = "うに412にしし" ld c,":a;dat\chra\uni412.jpg",%123:goto *cbgend
if $25 = "うに413真面目" ld c,":a;dat\chra\uni413.jpg",%123:goto *cbgend

if %139 = 1 && %26 = 1 gosub *windowon

return

*change_cl	;左キャラ変更命令

getparam $25
if %139 = 1 && %26 = 1 gosub *windowoff:mov %26,1

if $25 = "おさげ111通常" ld l,":a;dat\chra\osage111.jpg",%123:goto *cbgend
if $25 = "おさげ112笑顔" ld l,":a;dat\chra\osage112.jpg",%123:goto *cbgend
if $25 = "おさげ113ふふーん" ld l,":a;dat\chra\osage113.jpg",%123:goto *cbgend
if $25 = "おさげ114わ" ld l,":a;dat\chra\osage114.jpg",%123:goto *cbgend
if $25 = "おさげ115泣き" ld l,":a;dat\chra\osage115.jpg",%123:goto *cbgend
if $25 = "おさげ116照れ" ld l,":a;dat\chra\osage116.jpg",%123:goto *cbgend
if $25 = "おさげ121もー" ld l,":a;dat\chra\osage121.jpg",%123:goto *cbgend
if $25 = "おさげ122なんですかー" ld l,":a;dat\chra\osage122.jpg",%123:goto *cbgend
if $25 = "おさげ131あさって" ld l,":a;dat\chra\osage131.jpg",%123:goto *cbgend
if $25 = "おさげ132気付く" ld l,":a;dat\chra\osage132.jpg",%123:goto *cbgend
if $25 = "おさげ141通常" ld l,":a;dat\chra\osage141.jpg",%123:goto *cbgend
if $25 = "おさげ142笑顔" ld l,":a;dat\chra\osage142.jpg",%123:goto *cbgend
if $25 = "おさげ143ええー" ld l,":a;dat\chra\osage143.jpg",%123:goto *cbgend
if $25 = "おさげ144うつむき" ld l,":a;dat\chra\osage144.jpg",%123:goto *cbgend
if $25 = "おさげ145うつむき泣き" ld l,":a;dat\chra\osage145.jpg",%123:goto *cbgend
if $25 = "おさげ146泣き" ld l,":a;dat\chra\osage146.jpg",%123:goto *cbgend

if $25 = "しのりん211メ通常" ld l,":a;dat\chra\sinorin211.jpg",%123:goto *cbgend
if $25 = "しのりん212メあうう" ld l,":a;dat\chra\sinorin212.jpg",%123:goto *cbgend
if $25 = "しのりん213メ笑顔" ld l,":a;dat\chra\sinorin213.jpg",%123:goto *cbgend
if $25 = "しのりん214メ目閉じ" ld l,":a;dat\chra\sinorin214.jpg",%123:goto *cbgend
if $25 = "しのりん215メ驚き" ld l,":a;dat\chra\sinorin215.jpg",%123:goto *cbgend
if $25 = "しのりん221メ通常" ld l,":a;dat\chra\sinorin221.jpg",%123:goto *cbgend
if $25 = "しのりん222メ俯き" ld l,":a;dat\chra\sinorin222.jpg",%123:goto *cbgend
if $25 = "しのりん223メうわわ" ld l,":a;dat\chra\sinorin223.jpg",%123:goto *cbgend
if $25 = "しのりん224メ照れ" ld l,":a;dat\chra\sinorin224.jpg",%123:goto *cbgend
if $25 = "しのりん231通常" ld l,":a;dat\chra\sinorin231.jpg",%123:goto *cbgend
if $25 = "しのりん232あうう" ld l,":a;dat\chra\sinorin232.jpg",%123:goto *cbgend
if $25 = "しのりん233笑顔" ld l,":a;dat\chra\sinorin233.jpg",%123:goto *cbgend
if $25 = "しのりん234目閉じ" ld l,":a;dat\chra\sinorin234.jpg",%123:goto *cbgend
if $25 = "しのりん235驚き" ld l,":a;dat\chra\sinorin235.jpg",%123:goto *cbgend
if $25 = "しのりん241通常" ld l,":a;dat\chra\sinorin241.jpg",%123:goto *cbgend
if $25 = "しのりん242俯き" ld l,":a;dat\chra\sinorin242.jpg",%123:goto *cbgend
if $25 = "しのりん243うわわ" ld l,":a;dat\chra\sinorin243.jpg",%123:goto *cbgend
if $25 = "しのりん244照れ" ld l,":a;dat\chra\sinorin244.jpg",%123:goto *cbgend

if $25 = "まみたん311通常" ld l,":a;dat\chra\mamitan311.jpg",%123:goto *cbgend
if $25 = "まみたん312笑顔" ld l,":a;dat\chra\mamitan312.jpg",%123:goto *cbgend
if $25 = "まみたん313はあー" ld l,":a;dat\chra\mamitan313.jpg",%123:goto *cbgend

if $25 = "うに411通常" ld l,":a;dat\chra\uni411.jpg",%123:goto *cbgend
if $25 = "うに412にしし" ld l,":a;dat\chra\uni412.jpg",%123:goto *cbgend
if $25 = "うに413真面目" ld l,":a;dat\chra\uni413.jpg",%123:goto *cbgend

if %139 = 1 && %26 = 1 gosub *windowon

return

*change_cr	;右キャラ変更命令

getparam $25
if %139 = 1 && %26 = 1 gosub *windowoff:mov %26,1

if $25 = "おさげ111通常" ld r,":a;dat\chra\osage111.jpg",%123:goto *cbgend
if $25 = "おさげ112笑顔" ld r,":a;dat\chra\osage112.jpg",%123:goto *cbgend
if $25 = "おさげ113ふふーん" ld r,":a;dat\chra\osage113.jpg",%123:goto *cbgend
if $25 = "おさげ114わ" ld r,":a;dat\chra\osage114.jpg",%123:goto *cbgend
if $25 = "おさげ115泣き" ld r,":a;dat\chra\osage115.jpg",%123:goto *cbgend
if $25 = "おさげ116照れ" ld r,":a;dat\chra\osage116.jpg",%123:goto *cbgend
if $25 = "おさげ121もー" ld r,":a;dat\chra\osage121.jpg",%123:goto *cbgend
if $25 = "おさげ122なんですかー" ld r,":a;dat\chra\osage122.jpg",%123:goto *cbgend
if $25 = "おさげ131あさって" ld r,":a;dat\chra\osage131.jpg",%123:goto *cbgend
if $25 = "おさげ132気付く" ld r,":a;dat\chra\osage132.jpg",%123:goto *cbgend
if $25 = "おさげ141通常" ld r,":a;dat\chra\osage141.jpg",%123:goto *cbgend
if $25 = "おさげ142笑顔" ld r,":a;dat\chra\osage142.jpg",%123:goto *cbgend
if $25 = "おさげ143ええー" ld r,":a;dat\chra\osage143.jpg",%123:goto *cbgend
if $25 = "おさげ144うつむき" ld r,":a;dat\chra\osage144.jpg",%123:goto *cbgend
if $25 = "おさげ145うつむき泣き" ld r,":a;dat\chra\osage145.jpg",%123:goto *cbgend
if $25 = "おさげ146泣き" ld r,":a;dat\chra\osage146.jpg",%123:goto *cbgend

if $25 = "しのりん211メ通常" ld r,":a;dat\chra\sinorin211.jpg",%123:goto *cbgend
if $25 = "しのりん212メあうう" ld r,":a;dat\chra\sinorin212.jpg",%123:goto *cbgend
if $25 = "しのりん213メ笑顔" ld r,":a;dat\chra\sinorin213.jpg",%123:goto *cbgend
if $25 = "しのりん214メ目閉じ" ld r,":a;dat\chra\sinorin214.jpg",%123:goto *cbgend
if $25 = "しのりん215メ驚き" ld r,":a;dat\chra\sinorin215.jpg",%123:goto *cbgend
if $25 = "しのりん221メ通常" ld r,":a;dat\chra\sinorin221.jpg",%123:goto *cbgend
if $25 = "しのりん222メ俯き" ld r,":a;dat\chra\sinorin222.jpg",%123:goto *cbgend
if $25 = "しのりん223メうわわ" ld r,":a;dat\chra\sinorin223.jpg",%123:goto *cbgend
if $25 = "しのりん224メ照れ" ld r,":a;dat\chra\sinorin224.jpg",%123:goto *cbgend
if $25 = "しのりん231通常" ld r,":a;dat\chra\sinorin231.jpg",%123:goto *cbgend
if $25 = "しのりん232あうう" ld r,":a;dat\chra\sinorin232.jpg",%123:goto *cbgend
if $25 = "しのりん233笑顔" ld r,":a;dat\chra\sinorin233.jpg",%123:goto *cbgend
if $25 = "しのりん234目閉じ" ld r,":a;dat\chra\sinorin234.jpg",%123:goto *cbgend
if $25 = "しのりん235驚き" ld r,":a;dat\chra\sinorin235.jpg",%123:goto *cbgend
if $25 = "しのりん241通常" ld r,":a;dat\chra\sinorin241.jpg",%123:goto *cbgend
if $25 = "しのりん242俯き" ld r,":a;dat\chra\sinorin242.jpg",%123:goto *cbgend
if $25 = "しのりん243うわわ" ld r,":a;dat\chra\sinorin243.jpg",%123:goto *cbgend
if $25 = "しのりん244照れ" ld r,":a;dat\chra\sinorin244.jpg",%123:goto *cbgend

if $25 = "まみたん311通常" ld r,":a;dat\chra\mamitan311.jpg",%123:goto *cbgend
if $25 = "まみたん312笑顔" ld r,":a;dat\chra\mamitan312.jpg",%123:goto *cbgend
if $25 = "まみたん313はあー" ld r,":a;dat\chra\mamitan313.jpg",%123:goto *cbgend

if $25 = "うに411通常" ld r,":a;dat\chra\uni411.jpg",%123:goto *cbgend
if $25 = "うに412にしし" ld r,":a;dat\chra\uni412.jpg",%123:goto *cbgend
if $25 = "うに413真面目" ld r,":a;dat\chra\uni413.jpg",%123:goto *cbgend

if %139 = 1 && %26 = 1 gosub *windowon

return


*change_d	;キャラ消去

getparam $25
if %139 = 1 && %26 = 1 gosub *windowoff:mov %26,1
if $25 = "中消去" cl c,%123:goto *cbgend
if $25 = "左消去" cl l,%123:goto *cbgend
if $25 = "右消去" cl r,%123:goto *cbgend
if $25 = "全消去" cl a,%123:goto *cbgend

if %139 = 1 && %26 = 1 gosub *windowon

return


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　日付切替開始
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*change_day		;日付アイキャッチ
getparam $25
if $25 = "十六日" bg "dat\bg\16.jpg",17,500:wait 500:click:bg #FFFFFF,18,3000,"dat\ef\effect04.bmp":bg #000000,10,1000:wait 1000:return
if $25 = "十七日" bg "dat\bg\17.jpg",17,500:wait 500:click:bg #FFFFFF,18,3000,"dat\ef\effect04.bmp":bg #000000,10,1000:wait 1000:return
if $25 = "十八日" bg "dat\bg\18.jpg",17,500:wait 500:click:bg #FFFFFF,18,3000,"dat\ef\effect04.bmp":bg #000000,10,1000:wait 1000:return
if $25 = "十九日" bg "dat\bg\19.jpg",17,500:wait 500:click:bg #FFFFFF,18,3000,"dat\ef\effect04.bmp":bg #000000,10,1000:wait 1000:return

return


;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　　ロード後処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*loadlb

if %22 = 11 dwaveloop 11,"dat\music\se\se11.wav":mov %22,11
if %22 = 12 dwaveloop 12,"dat\music\se\se12.wav":mov %22,12
if %22 = 15 dwave 1,"dat\music\se\se15.wav":mov %22,15

;gosub *window_set2
textspeed %125

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　音声再生処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*voice_lb

gettag %0,$0
if %0=0 return
voicevol %0
mov $1,"dat\voice\":add $1,$0:add $1,".ogg"

fileexist %1,$1
if %1=1 dwave 0,$1

return

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　サブルーチン終了
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　定義ブロック
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*define
gosub *sys_define

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　メニュー定義
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

resetmenu

insertmenu "Close",sub
	insertmenu "End Game",end,1
	insertmenu "Return to Title",RESET,1

insertmenu "Version",version,0

insertmenu "Skip",skip,0

insertmenu "Create Scenario",sub

;	insertmenu "ページ送り",SUB,1
;		insertmenu "１ページ",CLICKPAGE,2
;		insertmenu "通常",CLICKDEF,2

;	insertmenu "Font",font,1

	insertmenu "Photo Mode",sub,1
		insertmenu "Fullscreen",full,2
		insertmenu "Window",window,2

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　　エフェクト定義
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆


effect 2,10,200			;フェードアウト０.２秒
effect 3,8,1000
effect 4,10,2000		;フェードアウト２秒
effect 5,10,5000		;フェードアウト５秒
effect 6,10,1000		;フェードアウト１秒

effect 11,10,250		;キャラ切り替え高速
effect 12,10,500		;キャラり替え通常

effect 21,18,500,"dat\ef\effect01.bmp"			;場面/CG切り替え高速
effect 22,18,1000,"dat\ef\effect01.bmp"			;場面/CG切り替え通常

effect 26,18,500,"dat\ef\effect02.bmp"			;場面/CG切り替え高速２
effect 27,18,1000,"dat\ef\effect02.bmp"			;場面/CG切り替え通常２

effect 31,10,150			;メニュー切り替え高速
effect 32,10,300			;メニュー切り替え通常

effect 15,1			;瞬間切り替え(画面フェードアウト用)

game

*start
;setfont "ＭＳ ゴシック"
saveoff
erasetextwindow 0	;テキストウィンドウ常時表示

	lsph 7,":a;dat\system\menuop01.jpg",45,320
	lsph 8,":a;dat\system\menuop02.jpg",45,320
	lsph 9,":a;dat\system\menuop03.jpg",45,320
	lsph 10,":a;dat\system\menuop04.jpg",45,320
	lsph 11,":a;dat\system\menuop05.jpg",45,320
	lsph 12,":a;dat\system\menuop06.jpg",45,320
	lsph 13,":a;dat\system\menuop07_1.jpg",45,320
	lsph 14,":a;dat\system\menuop07_2.jpg",45,320
	lsph 15,":a;dat\system\menuop07_3.jpg",45,320
	lsph 16,":a;dat\system\menuop08_1.jpg",45,320
	lsph 17,":a;dat\system\menuop09_1.jpg",45,320
	lsph 18,":a;dat\system\menuop09_2.jpg",45,320
	lsph 19,":a;dat\system\menuop10_1.jpg",45,320
	lsph 20,":a;dat\system\menuop10_2.jpg",45,320
	lsph 21,":a;dat\system\menuop10_3.jpg",45,320
	lsph 22,":a;dat\system\menuop10_4.jpg",45,320
	lsph 23,":a;dat\system\menuop11_1.jpg",45,320
	lsph 24,":a;dat\system\menuop11_2.jpg",45,320
	lsph 25,":a;dat\system\menuop12_1.jpg",45,320
	lsph 26,":a;dat\system\menuop12_2.jpg",45,320
	lsph 27,":a;dat\system\menuop13_1.jpg",45,320
	lsph 28,":a;dat\system\menuop13_2.jpg",45,320
	lsph 29,":a;dat\system\menuop08_2.jpg",45,320
	lsph 30,":a;dat\system\menuop14.jpg",45,320
	lsph 31,":a;dat\system\menuop15.jpg",45,320

;	lsph 32,":a/2,0,3;dat\menu\menu_3chra.jpg",480,200	;三頭身キャラ

	lsph 143,":a/2,0,3;dat\system\menu01.jpg",32,400
	lsph 144,":a/2,0,3;dat\system\menu02.jpg",230,400
	lsph 145,":a/2,0,3;dat\system\menu03.jpg",427,400

	lsph 146,":l;dat\system\menu_s.bmp",32,20,180
	lsph 147,":l;dat\system\menu_l.bmp",32,20,180
	lsph 148,":l;dat\system\menu_o.bmp",32,20,180

;	lsph 149,":s/21,22,0;#CCCCFF`▽",0,0
;	lsph 150,":s/21,22,0;#CCCCFF`▼",0,0
	
	lsph 149,":a;dat\system\cursor01.bmp",0,0
	lsph 150,":a;dat\system\cursor02.bmp",0,0

	lsph 155,"dat\system\window.bmp",19,19,%120

	setwindow 35,35,30,5,18,18,0,4,0,1,1,#FFFFFF,19,19,639,469

	autoclick 0:mov %107,0	;オートモード初期化

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　　変数初期処理
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

if %111 == 1 goto *syoki_end

mov %120,150	;テキスト濃度

mov %121,2		;BGMボリューム
mp3vol 40

mov %122,3		;ＳＥボリューム
sevol 60

mov %151,100	;俊樹ボリューム
mov %152,100	;瑞菜ボリューム
mov %153,100	;凛ボリューム
mov %154,100	;加川ボリューム
mov %155,100	;礼治ボリューム
mov %156,100	;その他ボリューム
mov %157,0		;音声カットフラグ
mov %158,0		;音声再生時ボリュームフラグ

mov %123,12		;キャラエフェクト

mov %124,22		;背景エフェクト
mov %109,32		;メニューエフェクト
mov %110,27		;場面エフェクト

mov %125,10		;メッセージスピード

mov %126,1000	;オートモード速度
automode_time %126

mov %127,2		;スキップモード設定
kidokumode 1

mov %128,1		;スキップモード継続

mov %130,3		;メニュー初期表示

mov %131,1		;ウインドウメニューＱセーブ処理

mov %132,0		;オートセーブ機能　初期値OFF

mov %133,1		;右クリック処理

mov %111,1		;初期処理フラグON

mov %115,1		;セーブ初期ページ

mov %139,1		;テキストウインドウ表示処理

*syoki_end

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　スタートメニュー
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　1.txtへ
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

goto *game_start

;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　キャラ表示定義
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆



;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
;　　　　システム定義
;☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

*sys_define
nsa
globalon
versionstr "A Dream of Summer　Ver 1.03　","milk cat　　http://milkcat.jp/　"
caption "A Dream of Summer"
lookbackbutton "dat\system\lb01.bmp","dat\system\lb02.bmp","dat\system\lb03.bmp","dat\system\lb04.bmp"
;spfont "ＭＳ ゴシック",10,10,10,10,0,1
shadedistance 2,2	;テキスト影位置
usewheel		;マウスホイール有効
useescspc		;スペース・Esc有効
rubyon 10,10	;ルビモード
clickstr "。」？！",2
;linepage		;文末に"\"を自動補完
loadgosub *loadlb	;ロード後処理
defsub change_b		;背景変更命令
defsub change_cc	;中央キャラ変更命令
defsub change_cl	;左キャラ変更命令
defsub change_cr	;右キャラ変更命令
defsub change_d		;キャラ消去命令
defsub change_day	;日付アイキャッチ
effectcut			;スキップ時エフェクト省略
;windowback
humanz 300
textgosub *text_lb
kidokuskip
pretextgosub *voice_lb
numalias vol_tosiki,151
numalias vol_mizuna,152
numalias vol_rin   ,153
numalias vol_mami  ,154
numalias vol_reiji ,155
numalias vol_sonota,156
return

*game_start
dwavestop 0
;tateyoko 1
gosub *window_set
if %101 < 1 lsp 50,":c;dat\bg\bg04_1.jpg",-240,0
if %101 = 1 lsp 50,":c;dat\bg\bg04_2.jpg",-240,0
if %101 = 2 lsp 50,":c;dat\bg\bg04_2.jpg",-240,0
if %101 > 2 lsp 50,":c;dat\bg\bg04_3.jpg",-240,0
print 10,2000

lsp 44,":a;dat\menu\title.jpg",15,70


*menu00

lsp 49,":a/2,0,3;dat\menu\hajime.jpg",410,80
lsp 48,":a/2,0,3;dat\menu\tuduki.jpg",410,160
if %104 = 1 lsp 47,":a/2,0,3;dat\menu\omake.jpg",410,240
if %101 > 0 lsp 47,":a/2,0,3;dat\menu\omake.jpg",410,240
lsp 46,":a/2,0,3;dat\menu\syuuryou.jpg",410,320

print 18,2000,"dat\ef\effect02.bmp"

*menuloop

btndef ""

spbtn 49,49
spbtn 48,48
spbtn 47,47
spbtn 46,46

btnwait %0

if %0 = 49 csp 50:csp 49:csp 48:csp 47:csp 46:csp 44:print 10,1000:goto *hitonatu
if %0 = 48 csp 50:csp 49:csp 48:csp 47:csp 46:csp 44:print 10,1000:gosub *menu_load2
if %0 = 47 csp 49:csp 48:csp 47:csp 46:print 10,1000goto *omake
if %0 = 46 csp -1:print 10,2000:end


goto *menuloop

*omake

lsp 49,":a/2,0,3;dat\menu\omake1.jpg",410,60
lsp 48,":a/2,0,3;dat\menu\omake2.jpg",410,140
if %102 > 0 lsp 47,":a/2,0,3;dat\menu\omake3.jpg",410,220
if %101 = 3 lsp 46,":a/2,0,3;dat\menu\omake4.jpg",410,300
lsp 45,":a/2,0,3;dat\menu\modoru.jpg",410,380
print 18,2000,"dat\ef\effect02.bmp"
btndef ""

spbtn 49,49
spbtn 48,48
spbtn 47,47
spbtn 46,46
spbtn 45,45

btnwait %0

if %0 = 49 csp 50:csp 49:csp 48:csp 47:csp 46:csp 45:csp 44:print 10,1000:goto *cmode
if %0 = 48 csp 50:csp 49:csp 48:csp 47:csp 46:csp 45:csp 44:print 10,1000:goto *smode
if %0 = 47 csp 50:csp 49:csp 48:csp 47:csp 46:csp 45:csp 44:print 10,1000:bg "dat\bg\bg04_1.jpg",0:mov %284:mov %286,1:bgm "dat\music\bgm\bgm04.mp3":ld c,":a;dat\chra\osage111.jpg",0:mov %29,1:goto *nage102
if %0 = 46 csp 50:csp 49:csp 48:csp 47:csp 46:csp 45:csp 44:print 10,1000:goto *atogaki
if %0 = 45 csp 49:csp 48:csp 47:csp 46:csp 45:print 10,1000:goto *menu00
if %0 = -1 csp 49:csp 48:csp 47:csp 46:csp 45:print 10,1000:goto *menu00

goto *omake


;----------------------------------
;　本編開始
;----------------------------------


*hitonatu
saveon


;----------------------------------
;　一日目
;----------------------------------
*honpen
gosub *windowoff
wait 2000
mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ
bg "dat\bg\bg01_1.jpg",%110

gosub *windowon

dwave 0,"dat\voice\2_0001.ogg"`　"Cuối cùng cũng xong!"\
`　Những bông hoa giấy đủ màu xếp thẳng tắp trên mặt bàn.@
br
`　Gần đến lễ hội trường rồi. Mấy việc như trang trí hẳn là điều hiển nhiên.\

`　Trước khi chuẩn bị ra về, tôi cất từng bông hoa giấy vào trong hộp các-tông. Cầm chìa khóa hình người tuyết trong tay, tôi chạy vội ra khỏi lớp.\

`　Khi mặt trời sắp lặn, ánh chiều tà trải rộng khắp bầu trời, phản chiếu dọc hành lang lớp học.\

change_b "階段夕"

`　Chạy băng qua cửa chính, rồi xuống hành lang ngang qua một máy bán hàng tự động, tôi bắt gặp một con mèo lông trắng tinh.@
br
dwave 0,"dat\voice\2_0002.ogg" `　"Milk, mình cùng tới chỗ hằng ngày nào,"@
` Vừa nói tôi vừa xoa con mèo đang nằm trong lòng, rồi đi vội lên cầu thang.\

gosub *windowoff
bg #FFFFFF,10,2000
bg "dat\bg\bg04a_2.jpg",18,5000,"dat\ef\effect03.bmp"	;夕日の差込
dwave 1,"dat\music\se\se15.wav":mov %22,15
wait 2000
gosub *windowon

`　Vừa lúc tôi chạy lên tầng cao nhất, ngay trước kia, cánh cửa như bừng mở ra để ánh tà dương lòa mờ mắt. Và rồi, cả một thế giới tuyệt đẹp và diệu kì trải rộng trước mặt tôi.\

`　Cả bầu trời và mặt biển hòa vào nhau trong sắc đỏ thẫm. Mặt trời chầm chậm chìm xuống phía chân trời.@
br
`　Tôi đặt con mèo xuống đất và bước đi.@
br
dwave 0,"dat\voice\2_0003.ogg" `　"Thật đẹp quá..."\
gosub *windowoff
wait 1000

saveoff
bg #FFFFFF,10,3000
wait 1000
bg #000000,0
lsp 44,":a;dat\menu\title.jpg",142,199
print 99,5000
repaint
wait 1000
csp 44
print 99,3000
mp3fadeout 3000
stop
dwavestop 15:mov %22,0
mp3fadeout 0
saveon

wait 2000
change_day "十六日"

mov %283
mov %286,1:bgm "dat\music\bgm\bgm03.mp3";	さわやか
bg "dat\bg\bg05_1.jpg",%110
gosub *windowon
`　―Bíp bíp bíp bíp―!@
br
dwave 0,"dat\voice\1_0001.ogg" `　"Hử?"@
br
`　Bị tiếng đồng hồ ồn ã đánh thức, tôi ngồi dậy một lát, rồi ráng vươn tay ra tắt nó đi.\

`　Tối qua, trước khi đi ngủ, tôi đã dọn dẹp ngăn nắp phòng mình. Dù vẫn chưa tỉnh hẳn, nhưng...\

`　Dựng cái cơ thể nặng nề này dậy, tôi choàng khỏi tấm chăn. Dù tuần thứ ba của tháng Bảy sắp tới, mặt trời vẫn tỏa nắng rực rỡ mỗi sáng sớm. Cơn buồn ngủ cũng đỡ hơn đôi chút.\

change_b "玄関朝"

`　Thay xong bộ đồ, tôi xuống cầu thang. Trông mẹ có vẻ ngạc nhiên khi nhìn thấy tôi.\
dwave 0,"dat\voice\9_1001.ogg"`　"Chào buổi sáng, Toshiki. @
dwave 0,"dat\voice\9_1002.ogg"`Sao sáng thứ Bảy mà con dậy sớm thế, lại còn mặc đồng phục nữa chứ? @
dwave 0,"dat\voice\9_1003.ogg"`Trông con còn ngái ngủ kìa!"@ 
br
dwave 0,"dat\voice\1_0002.ogg"`　"Tại hôm nay con phải chuẩn bị cho lễ hội trường! @
br
dwave 0,"dat\voice\1_0003.ogg"`Thằng Reiji coi bộ háo hức dữ dội lắm cơ."@
br
dwave 0,"dat\voice\9_1004.ogg"`　"Ôi trời, ôi trời! @
dwave 0,"dat\voice\9_1005.ogg"`Con ăn sáng chưa?"@
br
`　Tôi đi vào nhà vệ sinh và xua tay.@
br
dwave 0,"dat\voice\1_0004.ogg"`　"Thôi, con không ăn đâu! @
dwave 0,"dat\voice\1_0005.ogg"`Chắc thằng Reiji đã chuẩn bị sẵn nhiều yakisoba ở trường rồi."\
`　Vừa rửa ráy vừa trò chuyện với mẹ như thế, tôi rời khỏi nhà để đến trường.@
br
dwave 0,"dat\voice\1_0006.ogg"`　"Con đi đây ạ!"\

change_b "通学路昼"
dwave 1,"dat\music\se\se11.wav"
dwave 1,"dat\music\se\se15.wav":mov %22,15
`　Sáng thứ Bảy: ngày mà tất cả học sinh thường chia nhau ra đến hoạt động ở các câu lạc bộ. Nhưng hôm nay thì khác, tôi vừa đi vừa nghĩ: mọi người đều chuẩn bị cho lễ hội trường.\
`　Từng cơn gió thoảng hương biển phả nhẹ vào mũi, tôi thơ thẩn tiến bước về phía ngôi trường.\

change_b "校門昼"
`　Trường Cao trung Uminari Koutou, nơi chúng tôi học (nói thêm, từ mặt sau trường có thể nhìn ra cảnh biển tuyệt đẹp), đang chuẩn bị cho lễ hội sắp sửa diễn ra trong hai ngày nữa.\
`　Cổng trường trang trí đầy sắc màu càng tăng thêm sự háo hức.\
`　Thật ra, bản thân lễ hội trường cũng đủ khuấy động rồi. Ngày mai chúng tôi được nghỉ, nhưng có hội diễn vào ban đêm, nên học sinh cũng lũ lượt tới trường cho mà xem.\
`　Lễ hội trường diễn ra cũng trùng với Ngày Đại dương, chúng tôi hy vọng sẽ có nhiều học sinh ngoài trường và quan khách tới góp vui.\
`　Và cuối cùng, kết thúc lễ hội sẽ là màn lửa trại đầy ấn tượng. Tôi vẫn nghĩ sao lại có nhiều người tham gia mấy hoạt động quen thuộc đến vậy nhỉ.\
`　Tôi thật sự không thích những sự kiện như thế cho lắm. Không phải là ghét bỏ gì, chỉ là tôi không ưa đám đông.\

change_cc "うに411通常"

dwave 0,"dat\voice\5_0001.ogg"`　"Yo, @
dwave 0,"dat\voice\5_0002.ogg"`Toshiki!"@
br
`　Khi vừa tới cổng trường, một giọng nói vang lên gọi tên tôi.@
br
dwave 0,"dat\voice\1_0007.ogg"`　"Ồ! Chào buổi sá― mà mấy thứ đó là gì thế?"@
br
`　Trước mắt tôi, là cậu học sinh mang cả đống đồ như thể sắp đi tị nạn vậy.@
br
dwave 0,"dat\voice\5_0003.ogg"`　"Gì? Thì là chảo, bếp ga tiện lợi, và nguyên liệu làm yakisoba thôi mà."\
`　Gã ngốc còn không biết chính xác mình đang ôm thứ gì, là Nishihara Reiji. Mái đầu phớt đỏ và tóc chia chỉa ra trông giông giống con nhím biển. Nó cao ngang tôi, tầm 1m8, nhưng nhờ kiểu tóc ấy nên trông nó cao hơn tôi khoảng 5cm.\
`　Khỏi nói cũng biết, mỗi lần nó bị gọi lên phòng giám thị là y như rằng vừa mới vi phạm nội qui gì đó.@
br
`　Dù vậy, nó vẫn là đứa nhiệt tình nhất lớp trong lễ hội lần này.@
br
`　Nó khác hẳn tôi, chẳng biết là do uy tín hay khả năng chỉ huy tốt nữa. Và trong mấy sự kiện như lễ hội trường, nó trông y như một nhà lãnh đạo bẩm sinh.\
gosub *windowoff
change_b "廊下昼"
dwavestop 15:mov %22,0
change_cc "うに411通常"
gosub *windowon
dwave 0,"dat\voice\5_0004.ogg"`　"Tưởng ông từ chối lời mời của tôi hôm qua, mà sao giờ vẫn tới?"@
br
dwave 0,"dat\voice\1_0008.ogg"`　"Chà, nếu tôi mà không tới, thể nào ông cũng tới nhà tìm mọi cách lôi cổ tôi đi chứ gì?"@
br
dwave 0,"dat\voice\5_0005.ogg"`　"Đúng là tôi định thế thật. @
dwave 0,"dat\voice\5_0006.ogg"`Ông hiểu vấn đề nhanh đấy."@
br
dwave 0,"dat\voice\1_0009.ogg"`　"Hai thằng quen nhau từ hồi cấp 2 rồi còn gì. Nghe thì trái khuấy, nhưng tôi đủ biết ông đang nghĩ gì trong đầu."\

change_cc "うに412にしし"

dwave 0,"dat\voice\5_0007.ogg"`　"À há. @
dwave 0,"dat\voice\5_0008.ogg"`Ông yêu @
dwave 0,"dat\voice\5_0009.ogg"`TÔI rồi, nhể?"@
br
dwave 0,"dat\voice\1_0010.ogg"`　"Đừng nói mấy câu nghe tởm thế."\

change_b "教室昼"

`　Nhưng nó không bỏ đi. Tôi và Reiji cùng bước vào lớp. Mấy bạn khác cũng đang vội vã bắt tay vào trang trí lớp học.\

change_cc "うに411通常"

dwave 0,"dat\voice\5_0010.ogg"`　"Vẫn còn sớm, cơ mà... @
dwave 0,"dat\voice\5_0011.ogg"`ông đói không?"@
br
dwave 0,"dat\voice\1_0011.ogg"`　"Ờ. @
dwave 0,"dat\voice\1_0012.ogg"`Nhắc mới nhớ, tôi còn chưa ăn sáng."@
br
`　Reiji đặt đống đồ đang ôm trên người xuống đất rồi nhanh tay xếp bếp ga và thức ăn lên bàn.\
dwave 0,"dat\voice\5_0012.ogg"`　"Được rồi. @
dwave 0,"dat\voice\5_0013.ogg"`Tôi sẽ làm một món yakisoba tuyệt cú mèo cho mà xem!"@
br
`　Nói xong, nó hừng hực khí thế bắt tay vào thái cà rốt, hành, ớt xanh và bắp cải.\
dwave 0,"dat\voice\1_0013.ogg"`　"Này. Này! @
dwave 0,"dat\voice\1_0014.ogg"`Làm lâu không thế?"@
br
dwave 0,"dat\voice\5_0014.ogg"`　"Tầm mười phút là xong, sao thế?"@
br
dwave 0,"dat\voice\1_0015.ogg"`　"À, tôi định đi mua nước uống hay gì đó thôi."@
br
dwave 0,"dat\voice\5_0015.ogg"`　"Ồ, thế hả? @
dwave 0,"dat\voice\5_0016.ogg"`Thế mua giùm tôi luôn đi. Hồi nữa trả tiền lại cho ông."@
br
dwave 0,"dat\voice\1_0016.ogg"`　"Ông uống gì nào?"@
br
dwave 0,"dat\voice\5_0017.ogg"`　"Hừm... Nước ép Sợi đay đỏ 100% nhá."@
br
dwave 0,"dat\voice\1_0017.ogg"`　"Chắc chả ai bán thứ nước đó đâu..."@
br
dwave 0,"dat\voice\5_0018.ogg"`　"Cảm ơn trước nhé!"\

change_b "廊下昼"

`　Mồ hôi bắt đầu vã khi tôi bước ra ngoài hành lang. Sau ngày hội trường, đến lượt lễ bế mạc, và rồi nghỉ hè. Tôi muốn mau chóng kết thúc lễ hội cuối cùng của quãng đời cao trung và được nghỉ hè.\
change_b "自販機前昼"
`　Miên man với suy nghĩ ấy, tôi đi đến chỗ máy bán hàng tự động. Trước tiên, tôi tìm cái thứ Nước ép Sợi đay đỏ 100% cho Reiji.@
br
dwave 0,"dat\voice\1_0018.ogg"`　"Gì chứ... có thật đây này?!"@
br
`　Vậy là nó THẬT SỰ tồn tại.\
`　"Nước ép Sợi đay đỏ 100%" ghi đậm bằng màu xanh lá, trùng màu với lon nước. Dưới đó, dòng chữ "Vị vua của các loại rau vàng xanh" được in đỏ như mấy thứ nhãn cảnh báo có độc. Nếu nhìn kĩ hơn, còn thấy cả dòng chữ đen khả nghi "Uống Vào Hết Sẩy" nữa.\
dwave 0,"dat\voice\1_0019.ogg"`　"Tên này uống nổi cái thứ nước này ư?"@
br
`　Mà nhìn kiểu nào cũng thấy lon nước chẳng giống loại "uống vào hết sẩy" giữa mùa hè thế này.@
br
`　Nghĩ một hồi, tôi lấy cả thứ nước độc hại kia cùng lon coca an toàn cho riêng mình rồi đi về lớp.\

stop

dwave 0,"dat\voice\1_0020.ogg"`　"Hửm?"@
br
`　Lúc mang hai lon nước quay về, chợt tôi thoáng thấy có thứ gì dọc dãy hành lang gần cầu thang, nhưng hình như chẳng có ai đứng đó.@
br
dwave 0,"dat\voice\1_0021.ogg"`　"Chắc tại mình tưởng tượng thôi."\

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
change_b "教室昼"

`　Vừa bước vào lớp, tôi đã thấy Reiji ngồi đó, đang trộn chảo rán.@
br

change_cc "うに411通常"

dwave 0,"dat\voice\5_0019.ogg"`　"Gần xong rồi đấy, @
dwave 0,"dat\voice\5_0020.ogg"`Toshiki!"@
br
`　Khâu cuối cùng, Reiji rưới ít dầu vừng vào chảo rồi trộn tiếp, hương thơm lan tỏa khắp phòng học.\
`　Sau đó, nó nhẹ nhàng bày yakisoba lên đĩa, cẩn thận xếp thêm vài lát cá ngừ, rong biển xanh và gừng đỏ dầm.\

change_cc "うに412にしし"

dwave 0,"dat\voice\5_0021.ogg"`　"Rồi, xong rồi đó! @
dwave 0,"dat\voice\5_0022.ogg"`Đây, bữa sáng cho Toshiki đấy."@
br
dwave 0,"dat\voice\1_0022.ogg"`　"Trông bộ dạng thế kia chứ ông cũng giỏi khoản nấu ăn thật đấy."@
br

change_cc "うに411通常"

dwave 0,"dat\voice\5_0023.ogg"`　"Bộ dạng thế kia? Nói nghe phũ quá. @
dwave 0,"dat\voice\5_0024.ogg"`Mà có muốn khen gì, thì mời thưởng thức đi đã."@
br
dwave 0,"dat\voice\1_0023.ogg"`　"Ờ. @
dwave 0,"dat\voice\1_0024.ogg"`Itadakimasu."@
br
dwave 0,"dat\voice\5_0025.ogg"`　"Còn ai muốn ăn nữa thì giơ tay nhé, tớ sẽ làm cho ngay!"@
br
`　Sau tiếng rao lớn ấy, ai hóng hớt nãy giờ đều đồng loạt giơ tay.\
`　Tôi tách đũa, gắp miếng cá hồi nóng hổi kèm yakisoba cho vào miệng.@
br
dwave 0,"dat\voice\1_0025.ogg"`　"...ngon thật."@
br

change_cc "うに412にしし"

dwave 0,"dat\voice\5_0026.ogg"`　"Lại chả? @
dwave 0,"dat\voice\5_0027.ogg"`Ngon quá đi chứ?"@
br
`　Có vẻ tên Reiji nghe thấy câu thầm thì của tôi.@
br
dwave 0,"dat\voice\5_0028.ogg"`　"Giờ tớ sẽ làm phần cho mọi người nhé!"\

wait 1000


dwave 0,"dat\voice\1_0026.ogg"`　"À, phải rồi. @
dwave 0,"dat\voice\1_0027.ogg"`Đây, nước của ông."@
br

change_cc "うに411通常"

dwave 0,"dat\voice\5_0029.ogg"`　"Ồ, cảm ơn, cảm ơn nhá. @
dwave 0,"dat\voice\5_0030.ogg"`Đúng lúc đang khát."@
br
`　Nó cầm lấy một trong hai lon nước tôi đặt lên bàn ban nãy.@
br
dwave 0,"dat\voice\1_0028.ogg"`　"Ớ, khoan! @
dwave 0,"dat\voice\1_0029.ogg"`Lon coca của tôi..."@
br

change_cc "うに412にしし"

dwave 0,"dat\voice\5_0031.ogg"`　"Oaa! @
dwave 0,"dat\voice\5_0032.ogg"`Trời hè uống nước có ga mới đã! @
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0033.ogg"`Ớ chết. Thôi, bù cho ông nước của tôi đấy."\

change_d "中消去"
`　Và thế là, tôi được bù cho cái lon xanh lá kia.@
br
`　"..."\

`　Nên tôi đành uống thứ nước đó... Đã ngờ ngợ từ trước, giờ khi phải uống nó, tôi bật nắp và nhìn vào trong.\

dwave 0,"dat\voice\1_0030.ogg"`　"Ông thật sự uống nổi... @
dwave 0,"dat\voice\1_0031.ogg"`thứ này ư?"@
br
`　Kẻ duy nhất biết đến sự tồn tại của thứ nước này đang bận tối mắt tối mũi làm yakisoba. Khó mà chờ được đến lúc nó trả lời.\
`　Ực.@
br
`　Tôi hớp thử một ngụm nhỏ. Biết nói thế nào đây nhỉ...? 100% có thật là nhiều ý nghĩa.@
br
dwave 0,"dat\voice\1_0032.ogg"`　"Chả thấy uống vào hết sẩy tẹo nào."\

wait 2000

`　Ăn xong yakisoba, tôi cần có nước uống. Thứ nước quái quỷ này trong tay, thay vì làm đã cơn khát thì lại khiến cho cổ họng tôi tồi tệ thêm. Nên cuối cùng, tôi đành lết tới máy bán hàng tự động lần nữa.\

change_b "廊下昼"

dwave 0,"dat\voice\4_0001.ogg"`　"Nè, nè, Shinorin. @
dwave 0,"dat\voice\4_0002.ogg"`Hình như tớ đã thấy nó đó."@
br
dwave 0,"dat\voice\3_0001.ogg"`　"Dù có thấy thì..."@
br
dwave 0,"dat\voice\4_0003.ogg"`　"Ưm- @
dwave 0,"dat\voice\4_0004.ogg"`một con mèo lông trắng sáng phóng lên cầu thang! @
dwave 0,"dat\voice\4_0005.ogg"`A, Toshiki! @
dwave 0,"dat\voice\4_0006.ogg"`Lại đây chút nào!"\
gosub *windowoff
change_cl "まみたん311通常"
change_cr "しのりん212メあうう"
gosub *windowon
`　Một nữ sinh với mái tóc cột ngắn ngang vai vẫy tay gọi tôi.@
br
`　Nấp sau là một cô gái thấp người, đôi mắt ướt át.\

dwave 0,"dat\voice\1_0033.ogg"`　"Ô, Kagawa. @
dwave 0,"dat\voice\1_0034.ogg"`Cậu cũng tới chuẩn bị cho lễ hội à?"@
br
dwave 0,"dat\voice\4_0007.ogg"`　"Ưm. @
dwave 0,"dat\voice\4_0008.ogg"`Cho buổi đại nhạc hội ngày mai."@
br
dwave 0,"dat\voice\1_0035.ogg"`　"Đại nhạc hội?"@
br
dwave 0,"dat\voice\4_0009.ogg"`　"Nó đó. @
dwave 0,"dat\voice\4_0010.ogg"`Đại nhạc hội live vào buổi tối ngày hội trường."@
br
dwave 0,"dat\voice\1_0036.ogg"`　"À, Reiji cũng háo hức chờ đêm hội lắm."@
br
dwave 0,"dat\voice\4_0011.ogg"`　"Lễ hội sẽ rất tuyệt đấy, cậu cũng tới xem, nhé?"@
br
dwave 0,"dat\voice\1_0037.ogg"`　"Cậu không nói thì tôi cũng sẵn sàng đi mà. @
dwave 0,"dat\voice\1_0038.ogg"`Tôi cũng mong chờ lắm đấy."@
br

change_cl "まみたん312笑顔"

dwave 0,"dat\voice\4_0012.ogg"`　"Cảm ơn cậu!"\

`　Ánh sáng từ ngoài cửa sổ chiếu ngang qua mái tóc nâu, hơi óng ánh vàng của cô ấy, và càng làm mái tóc thêm rực rỡ.\

dwave 0,"dat\voice\1_0039.ogg"`　"Lại tẩy màu đấy à? @
dwave 0,"dat\voice\1_0040.ogg"`Màu tóc phai hết rồi kìa."@
br
dwave 0,"dat\voice\4_0013.ogg"`　"Cảm ơn cậu đã nhắc nhé."\

`　Cô ấy cười khúc khích, rồi đưa tay phải lên nghịch mớ tóc của mình.@
br

dwave 0,"dat\voice\1_0041.ogg"`　"Mà nè, nhìn kĩ hơn mới thấy, hình như cậu thay cột tóc nữa nhỉ?"@
br
dwave 0,"dat\voice\4_0014.ogg"`　"Dễ thương lắm mà?"@
br
dwave 0,"dat\voice\1_0042.ogg"`　"Rồi cậu lại bị gọi lên phòng giám thị nữa cho mà xem."@
br

change_cl "まみたん311通常"

dwave 0,"dat\voice\4_0015.ogg"`　"Quen rồi, quen rồi. @
dwave 0,"dat\voice\4_0016.ogg"`Mấy chuyện vặt thế này @
dwave 0,"dat\voice\4_0017.ogg"`chắc chẳng sao đâu."\


`　Cô nàng phá cách này là Kagawa Mami. Cô ấy chung ban nhạc BROY với Reiji.\

`　Còn cô bé đang run rẩy, đôi mắt ngấn lệ cùng mái tóc ngắn đứng sau kia đánh đàn trong ban nhạc BROY, Shinoi Rin.\

`　Em ấy kìa... mặc bộ đồng phục của trường chúng tôi... trông thế thôi chứ thật ra em ấy cũng là học sinh cao trung rồi.\

`　Kagawa học năm ba, giống tôi, còn Shinoi ở lớp dưới. Kagawa tính tình chẳng bao giờ nể nang rụt rè gì ai, còn Shinoi thì trái ngược hẳn. Tuy hai người họ khác nhau từ bề ngoài đến tính cách, nhưng họ vẫn là đôi bạn rất thân thiết.\

`　Cơ mà, BROY có vẻ nên đọc là "bo-i"...\

dwave 0,"dat\voice\1_0043.ogg"`　"Mà này, BROY nghĩa là gì thế?"@
br
change_cl "まみたん312笑顔"
dwave 0,"dat\voice\4_0018.ogg"`　"Viết tắt của "Between Red Or Yellow" đó. @
dwave 0,"dat\voice\4_0019.ogg"`Lấy mấy chữ cái đầu sẽ ra BROY. @
dwave 0,"dat\voice\4_0020.ogg"`Ý tưởng của bọn tôi là mọi người cần để mắt nhìn những tài năng âm nhạc bọn tôi như thể đang thấy tín hiệu đèn nguy hiểm đỏ-vàng vậy."@
br
dwave 0,"dat\voice\1_0044.ogg"`　"Nghe như muốn hù dọa người ta thì đúng hơn..."@
br
change_cl "まみたん311通常"
dwave 0,"dat\voice\4_0021.ogg"`　"Hể... thế thì có liên quan gì tới cậu cơ chứ?!"\

dwave 0,"dat\voice\1_0045.ogg"`　"Nhưng dù có nói là tài năng âm nhạc đi nữa, thì chẳng phải cậu vẫn hát lại bài của người khác sao? @
dwave 0,"dat\voice\1_0046.ogg"`Người đó tên gì nhỉ? @
dwave 0,"dat\voice\1_0047.ogg"`Cái cô ca sĩ ấy..."@
br
dwave 0,"dat\voice\4_0022.ogg"`　"Red Ai."@
br
dwave 0,"dat\voice\1_0048.ogg"`　"Đúng đúng. @
dwave 0,"dat\voice\1_0049.ogg"`Cô ấy chẳng mấy tiếng tăm cho đến khi đạt hit một triệu bản năm ngoái, đúng chứ?"\

dwave 0,"dat\voice\4_0023.ogg"`　"Không phải thế đâu. @
dwave 0,"dat\voice\4_0024.ogg"`Đúng là ca khúc 'Giấc mơ mùa hạ' năm ngoái là đỉnh nhất, nhưng mấy bài khác ra sau đó cũng rất hay. @
dwave 0,"dat\voice\4_0025.ogg"`Nhìn xem, đĩa vừa ra gần đây vẫn còn đang bán chạy mà. @
dwave 0,"dat\voice\4_0026.ogg"`Ca khúc mà Red Ai thể hiện trong album đầu tay cũng được đưa vào đĩa lần này đấy. @
dwave 0,"dat\voice\4_0027.ogg"`Nó rất được các fan ủng hộ đó. @
dwave 0,"dat\voice\4_0028.ogg"`Một ca khúc nổi tiếng vẫn luôn nổi tiếng, dù bao nhiêu năm trôi qua đi nữa. @
change_cl "まみたん312笑顔"
dwave 0,"dat\voice\4_0029.ogg"`Mà thôi, người như cậu làm sao hiểu được Red Ai vĩ đại cỡ nào cơ chứ, hen?"\

dwave 0,"dat\voice\1_0050.ogg"`　"Cạnh khóe gì đấy?"@
br
change_cr "しのりん211メ通常"
dwave 0,"dat\voice\3_0002.ogg"`　"Ưm, nè... Mami-chan?"@
br
`　Chúng tôi hướng nhìn Shinoi, người vừa lên tiếng sau một hồi hai đứa mải mê tung hứng buôn chuyện.@
br
change_cl "まみたん311通常"
dwave 0,"dat\voice\4_0030.ogg"`　"...Mà quên, bọn tôi đâu định gọi cậu lại để nói chuyện đó. @
dwave 0,"dat\voice\4_0031.ogg"`Cậu có nghe nói đến lời đồn rằng có thứ gì đó nhảy lên cầu thang gần máy bán hàng tự động không?"@
br
dwave 0,"dat\voice\1_0051.ogg"`　"Hử? @
dwave 0,"dat\voice\1_0052.ogg"`Thứ gì à?"\

dwave 0,"dat\voice\4_0032.ogg"`　"Ma đó! @
dwave 0,"dat\voice\4_0033.ogg"`MỘT-CON-MA đó!"@
br
dwave 0,"dat\voice\1_0053.ogg"`　"À, mà tôi đâu có tin vào ma quỷ gì."@
br
dwave 0,"dat\voice\4_0034.ogg"`　"Nhưng tôi vừa trông thấy mà. @
dwave 0,"dat\voice\4_0035.ogg"`Có thứ gì đó màu trắng nhảy lên cầu thang."\

dwave 0,"dat\voice\1_0054.ogg"`　"Bị ảo giác à? @
dwave 0,"dat\voice\1_0055.ogg"`Chắc là đầu óc cậu tưởng tượng ra thôi, ai biểu cậu cứ tin vào mấy lời đồn kì quái đó làm chi."@
br
dwave 0,"dat\voice\4_0036.ogg"`　"Tôi nói thật mà! @
dwave 0,"dat\voice\4_0037.ogg"`Hơn nữa, có một học sinh chết do ngã từ tầng thượng vào ngày hội trường năm ngoái, nhớ chứ? @
dwave 0,"dat\voice\4_0038.ogg"`Nên dạo gần đây, có lời đồn về một người giống y chang thế lảng vảng quanh trường."@
br
dwave 0,"dat\voice\1_0056.ogg"`　"Vâng, vâng. @
dwave 0,"dat\voice\1_0057.ogg"`Đúng là vừa nãy tôi có cảm thấy là lạ sau khi dùng máy bán hàng tự động."\
change_cl "まみたん313はあー"
dwave 0,"dat\voice\4_0039.ogg"`　"Đã thế cậu vẫn chưa chịu tin à?"@
br
dwave 0,"dat\voice\1_0058.ogg"`　"Tin gì nổi? @
dwave 0,"dat\voice\1_0059.ogg"`Chẳng có gì để chứng minh cả."@
br
dwave 0,"dat\voice\4_0040.ogg"`　"Cậu thực dụng quá đấy."@
br
dwave 0,"dat\voice\1_0060.ogg"`　"Thực tế là tốt nhất. @
dwave 0,"dat\voice\1_0061.ogg"`Mà thôi nhé, tôi rất trông đợi buổi biểu diễn đấy!"\

change_d "全消去"

`　Cuối cùng, vì khát khô cả họng rồi, nên tôi ngừng cuộc nói chuyện và tới máy bán hàng tự động lần nữa.\

change_b "自販機前昼"

`　Tôi lấy ra ít tiền lẻ và nhìn vào các lựa chọn trên máy, có hơi rắc rối.@
br
`　Thứ nước đầu tiên tôi bỏ qua là cái lon màu xanh lá khi nãy, nhưng tôi cũng không muốn uống coca nữa. Nên tôi bỏ qua luôn mấy loại nước có ga cũng bởi lý do đó. Sau cơn ác mộng ban nãy, tôi chẳng dám uống nước ép 100% nào nữa. Giờ chỉ việc chọn giữa cà phê và nước tăng lực.\

*sentaku100

if %36 = 0 isskip %117:csel "`Cà phê",*sentaku101,"`Nước tăng lực",*sentaku102
if %36 > 1 isskip %117:csel "`Cà phê",*sentaku101,"`Nước tăng lực",*sentaku102,"`Nước ép Sợi đay đỏ 100%",*sentaku103,"`Coca",*sentaku104
if %36 > 0 isskip %117:csel "`Cà phê",*sentaku101,"`Nước tăng lực",*sentaku102,"`Nước ép Sợi đay đỏ 100%",*sentaku103


*sentaku101

if %37 = 1 goto *sentaku101_2

dwave 0,"dat\voice\1_0062.ogg"`　"Chắc mình nên chọn... cà phê nhỉ?"\

`　Tiếng rột rạc vang lên và lon nước rơi ra.@
br
dwave 0,"dat\voice\1_0063.ogg"`　"Gì vậy trời...?"@
br
`　Rõ ràng là tôi đã chọn cà phê, nhưng chẳng hiểu sao, thứ rơi xuống lại là "Nước ép Sợi đay đỏ 100%".\

dwave 0,"dat\voice\1_0064.ogg"`　"Quái hơn nữa, lon nguội ngắt! TẠI SAO?"@
br
`　Chắc cái máy bán hàng tự động này bị ám hay gì rồi.\

add %36,1
mov %37,1

goto *sentaku100

 *sentaku101_2

dwave 0,"dat\voice\1_0065.ogg"`　"Chắc chắn cái nút này... @
dwave 0,"dat\voice\1_0066.ogg"`bị ma ám rồi."\

goto *sentaku100


*sentaku102

if %38 = 1 goto *sentaku102_2

`　Ừ. Lần này tôi sẽ chọn nước tăng lực.\

`　Sau khi bấm chọn nước tăng lực, tôi mới chợt nhận ra.@
br
dwave 0,"dat\voice\1_0067.ogg"`　"Haha... @
dwave 0,"dat\voice\1_0068.ogg"`không thể nào."@
br
`　Có một nhãn "Ấm" màu đỏ nằm ngay cạnh nước tăng lực.@
br
dwave 0,"dat\voice\1_0069.ogg"`　"Ai đời nước tăng lực lại uống ấm cơ chứ..."\

`　Việc tự bản thân cái máy bán nước nóng giữa mùa hè thế này đã rất hiếm rồi. Chắc hẳn nó đã bị người ta bỏ quên, đúng như tôi nghĩ, tôi nhặt lấy lon nước trong nỗi tuyệt vọng.@
br
dwave 0,"dat\voice\1_0070.ogg"`　"Ấm thật này... không, nóng quá!"@
br
`　Lon nước tăng lực còn nóng hơn tôi tưởng tượng nữa.@
br
dwave 0,"dat\voice\1_0071.ogg"`　"Chết tiệt! @
dwave 0,"dat\voice\1_0072.ogg"`Ai mà uống nổi cái của này cơ chứ!"@
br
`　Móc tiền trong túi ra, tôi lại nhìn vào mớ lựa chọn lần nữa.\

add %36,1
mov %38,1

goto *sentaku100

*sentaku102_2

dwave 0,"dat\voice\1_0073.ogg"`　"Uống nước tăng lực ấm thì có hiệu quả quái gì cơ chứ?"\

goto *sentaku100


*sentaku103

`　Gượm đã... đầu óc mình có bình thường không vậy?@
br
`　Tôi nhìn chằm chặp vào lon nước màu sắc đầy nguy hiểm kia như đang cố tra vấn nó.\

`　Không đâu, nếu nhìn kĩ lại, chẳng phải vỏ lon rất có tác dụng đấy sao? Cái tên là lí do khiến tôi tưởng lầm và ghét thứ nước đó thôi. Nếu tôi uống nó trước khi có thành kiến, có lẽ món giải khát này hẳn sẽ rất ngon đây.@
br
`　Vậy nên, tin tưởng vào ý nghĩ đang trỗi dậy mãnh liệt, tôi mở lon nước ấy lần nữa.\

`　Nắp lon bật ra tức khắc.@
br
`　...ực.@
br
`　Tôi nuốt một cách nặng nhọc.@
br
dwave 0,"dat\voice\1_0074.ogg"`　"Tất nhiên rồi... nó không tệ, không tệ mà..."@
br
`　Giờ thì cả miệng tôi cũng cảm thấy khó chịu.\


*sentaku104

dwave 0,"dat\voice\1_0075.ogg"`　"Thôi, vậy đủ rồi. @ 
dwave 0,"dat\voice\1_0076.ogg"`Mình sẽ chỉ mua coca như ban nãy là được..."@
br
`　*lách cách*@
br
dwave 0,"dat\voice\1_0077.ogg"`　"A."@
br
`　Lúc lấy tiền trong ví ra, đồng 100 yên rơi xuống. Nó cứ lăn xa, xa khỏi tầm với của tôi.@
br
dwave 0,"dat\voice\1_0078.ogg"`　"Trời ạ, cái ngày gì mà đen đủi thế."@
br
`　Tôi bước đi, bám theo đồng xu cho đến khi nó dừng lăn. Vừa kịp, nó lăn chậm lại rồi lật úp mặt xuống.\

change_b "階段昼"
stop

`　Tôi nhanh chóng nhặt lên, rồi chợt nhận ra mình đang đứng ngay dưới chân cầu thang.\

dwave 0,"dat\voice\1_0079.ogg"`　"Hồn ma, à?"@
br
`　Vì tôi chưa từng gặp ma quỷ hay gì đó, nên có tin hay không, dường như nói kiểu nào cũng được. Nhưng chợt nhớ ra chuyện ở máy bán hàng tự động khi nãy, tôi CÓ cảm giác kì lạ rằng một cái gì đó vừa đi lên cầu thang...\

dwave 0,"dat\voice\1_0080.ogg"`　"Lố bịch thật."@
br
`　Tôi nhìn lên cầu thang, rồi vừa định quay gót bỏ đi thì có thứ gì vụt ngang qua chân.@
br
dwave 0,"dat\voice\1_0081.ogg"`　"Oaa! @
dwave 0,"dat\voice\1_0082.ogg"`...cái gì thế? @
dwave 0,"dat\voice\1_0083.ogg"`Mèo à?"\

`　Một con mèo trắng nhảy lên cầu thang đến chiếu nghỉ kế đó, rồi dừng lại đủ lâu để nhìn tôi đầy ngạc nhiên. Trong miệng nó có thứ gì đó cũng trăng trắng tựa màu lông. Nhưng trước khi tôi kịp nhận ra cái gì, thì con mèo đã chạy biến đi như chưa hề xuất hiện vậy.\

`　Bực thật, tôi nhận ra mình trông chẳng khác gì một thằng đần. Hạ quyết tâm một chút, tôi lết chân lên cầu thang đuổi theo con mèo trắng.\

`　Hình như con mèo sống ở đây trước cả khi tôi bắt đầu học ở trường này. Mấy thầy cô cố gắng đuổi nó đi, nhưng đã chịu thua và chẳng đả động tới nữa. Thậm chí bây giờ cả giáo viên lẫn học sinh còn chia thức ăn cho con mèo nữa. Cái bóng trắng mà Kagawa trông thấy hẳn là nó rồi? Vậy lời đồn về bóng ma chắc cũng từ chuyện này mà ra.\

`　Con mèo trắng nhảy lên từng bậc thang dễ dàng tới mức tôi không tài nào đuổi theo kịp, và giờ tôi đã đứng trên tầng thượng. Cánh cửa tầng thượng, một nơi mà tôi không thường đặt chân tới, chỉ mở vừa đủ lớn để con mèo có thể lách người qua.\

`　Vì chạy lên cầu thang mà cả người tôi nhễ nhại mồ hôi. Vừa mở cửa, những suy nghĩ kiểu "Giá như ít ra mình đem theo nước ép" hay "Đáng lẽ ngay từ đầu mình chẳng cần đuổi theo con mèo làm gì" vừa lảng vảng trong đầu tôi.\
gosub *windowoff
bg white,10,3000
bg "dat\bg\bg04_1.jpg",10,3000
mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ
wait 1000
dwave 1,"dat\music\se\se15.wav"
gosub *windowon
`　Ngay khi cửa mở, những tia nắng chiếu xuyên qua và tôi bắt gặp một khung cảnh êm đềm với từng cơn gió biển thổi nhè nhẹ. Bầu trời trong vắt, không một gợn mây, như trải dài vô tận đến vĩnh cửu. Và đối mặt trực diện với nó, không thấy một ranh giới nào, lại một sắc xanh trải dài, cũng thật huy hoàng như bầu trời kia. Nếu không nhìn kĩ, hẳn bạn không thể nào nhận ra đó là đường chân trời.\

dwave 0,"dat\voice\1_0084.ogg"`　"Đẹp thật..."\

`　Mặc dù từ nhỏ đến lớn đã ngắm biển chán chê, nhưng khung cảnh này lại khiến tôi xao động.@
br
`　Tôi bước lại gần rào chắn để ngắm rõ hơn.\

dwave 0,"dat\voice\2_0004.ogg"`　"Anh lại gần sẽ gặp nguy hiểm đấy."\

change_cc "おさげ111通常"

`　Tôi quay nhìn về giọng nói đột nhiên vang lên sau lưng.@
br
dwave 0,"dat\voice\2_0005.ogg"`　"Nhìn nè, nhìn nè. @
dwave 0,"dat\voice\2_0006.ogg"`Hàng rào bị gãy mất rồi."@
br
`　Đúng vậy thật, một đoạn rào chắn đã biến mất và thay vào đó là đoạn dây nhựa.@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_1001.ogg"`　"Mà nữa, hàng rào hơi thấp, nên nguy hiểm lắm."@
br
`　Miệng thì nói vậy, nhưng cô gái ấy lại đặt tay lên rào chắn.\

`　Rào chắn quả thực khá thấp. Nó còn thấp hơn ngực cô gái ấy, và cô ấy xem chừng thấp hơn tôi tầm 30cm.@
br
dwave 0,"dat\voice\1_0085.ogg"`　"Nhưng chính bạn cũng đứng đó còn gì. @
dwave 0,"dat\voice\1_0086.ogg"`Chẳng phải nguy hiểm lắm sao?"@
br
change_cc "おさげ113ふふーん"
dwave 0,"dat\voice\2_0007.ogg"`　"Em đã ở đây từ lâu rồi, nên không sao đâu."\

change_cc "おさげ131あさって"
`　Bím tóc kiểu này bây giờ thật sự rất hiếm gặp. Cô bé ấy có ánh nhìn thơ ngây, đôi mắt to, và hơi thấp người.@
br
dwave 0,"dat\voice\1_0087.ogg"`　"Em nhỏ tuổi hơn tôi kể cũng lạ thật."@
br
change_cc "おさげ132気付く"
`　"?"@
br
`　...thật thế, ngực em ấy căng tròn... nhưng nếu mà nói thẳng ra, thể nào cũng bị gọi là kẻ quấy rối cho mà xem. Cố tỏ ra lịch thiệp, tôi giấu đi những ý nghĩ ấy.\

dwave 0,"dat\voice\1_0088.ogg"`　"Không phải phần trên quá to sao, nhưng nếu ở dưới thon lại, thì lý tưởng thật đấy."@
br
dwave 0,"dat\voice\2_0008.ogg"`　"Anh đang nói gì vậy?"@
br
dwave 0,"dat\voice\1_0089.ogg"`　"À không, không có gì. @
dwave 0,"dat\voice\1_0090.ogg"`Chỉ là tôi thích thế thôi."\
change_cc "おさげ131あさって"
`　Dù vậy, tôi vẫn tự hỏi tại sao. Đôi mắt em ấy như hướng về nơi nằm giữa mặt biển và bầu trời, nhưng chẳng hiểu sao, dường như có nét thoáng buồn trong ấy.\

dwave 0,"dat\voice\2_0009.ogg"`　"Thật đẹp, phải không? @
dwave 0,"dat\voice\2_0010.ogg"`Ý em, là nơi này ấy."@
br
dwave 0,"dat\voice\1_0091.ogg"`　"Sao cơ?"@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_1002.ogg"`　"Biển cả và bầu trời hòa lại làm một. Khi trước mắt nhìn giống đến như thế, anh có thể hoàn toàn tin vào điều ấy."@
br
dwave 0,"dat\voice\1_0092.ogg"`　"Có ngốc mới tin vào thứ ấy."@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0011.ogg"`　"...ái chà... hay là anh... là người thực dụng sao?"@
br
dwave 0,"dat\voice\1_0093.ogg"`　"Chắc vậy rồi."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0012.ogg"`　"Thảo nào."@
br
`　Em ấy cười, bím tóc phất phơ theo làn gió biển.\

dwave 0,"dat\voice\1_0094.ogg"`　"Cơ mà, em là ai thế?"@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0013.ogg"`　"Ý anh là sao, "cơ mà" là sao?"@
br
dwave 0,"dat\voice\1_0095.ogg"`　"Vậy thì, tiện thể."@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0014.ogg"`　"Từ đó cũng lạ nữa."@
br
dwave 0,"dat\voice\1_0096.ogg"`　"Được rồi, mọi lúc mọi nơi."@
br
dwave 0,"dat\voice\2_0015.ogg"`　"Có phải tên loại game mới không thế?"@
br
dwave 0,"dat\voice\1_0097.ogg"`　"Dào ôi, soi mói ghê quá. @
dwave 0,"dat\voice\1_0098.ogg"`Em là ai, mọi lúc mọi nơi?"\

change_cc "おさげ143ええー"

dwave 0,"dat\voice\2_0016.ogg"`　"Hà... @
dwave 0,"dat\voice\2_0017.ogg"`Em gặp phải người kì quái rồi."@
br
dwave 0,"dat\voice\1_0099.ogg"`　"Gì chứ?"@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0018.ogg"`　"Hazuki Mizuna."@
br
dwave 0,"dat\voice\1_0100.ogg"`　"Hazuki Mizuna?"@
br
dwave 0,"dat\voice\2_0019.ogg"`　"Ưm. @
dwave 0,"dat\voice\2_0020.ogg"`Lớp 2-C, Hazuki Mizuna."\

`　...Hazuki... Mizuna? Hình như trước đây tôi có nghe cái tên này ở đâu rồi...\

change_cc "おさげ112笑顔"

dwave 0,"dat\voice\2_0021.ogg"`　"Phiền thật đó! @
dwave 0,"dat\voice\2_0022.ogg"`Còn anh?"@
br
`　Như thể cầu thủ ném quả bóng đi, em ấy nhìn thẳng vào tôi.@
br
dwave 0,"dat\voice\1_0101.ogg"`　"Cái gì đấy? @
dwave 0,"dat\voice\1_0102.ogg"`Tên loại game mới à?"@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0023.ogg"`　"Anh xấu tính nên mới không nói em biết, đúng không?"@
br
dwave 0,"dat\voice\1_0103.ogg"`　"Chắc thế."@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0024.ogg"`　"Thảo nào ha."\

change_cc "おさげ131あさって"

`　Cô bé lại hướng mắt nhìn qua rào chắn. Chắc chắn có nét gì đó gợn buồn trong đôi mắt em.\

dwave 0,"dat\voice\1_0104.ogg"`　"Sugai Toshiki. @
dwave 0,"dat\voice\1_0105.ogg"`Lớp 3-A."@
br
change_cc "おさげ132気付く"
`　"..."@
br
dwave 0,"dat\voice\1_0106.ogg"`　"Sao thế?"@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0025.ogg"`　"A... không. Không có gì đâu. @
dwave 0,"dat\voice\2_0026.ogg"`Chỉ là tên anh bình thường quá mức thôi."@
br
dwave 0,"dat\voice\1_0107.ogg"`　"Nói nghe phũ phàng quá đấy."\

dwave 0,"dat\voice\2_0027.ogg"`　"Sao anh lại lên đây, Toshiki-senpai?"@
br
dwave 0,"dat\voice\1_0108.ogg"`　"À, em nhắc mới nhớ, tôi cũng đang tự hỏi đây."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0028.ogg"`　"Anh trốn không đi chuẩn bị cho lễ hội trường chứ gì?"@
br
dwave 0,"dat\voice\1_0109.ogg"`　"Không hẳn thế... à, phải phải. @
dwave 0,"dat\voice\1_0110.ogg"`Tôi đuổi theo một con mèo trắng lên đây."\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0029.ogg"`　"Con mèo trắng? @
dwave 0,"dat\voice\2_0030.ogg"`Ý anh là Milk hả?"@
br
dwave 0,"dat\voice\1_0111.ogg"`　"Milk?"@
br
dwave 0,"dat\voice\2_0031.ogg"`　"Nghe nè, con mèo í sống ở trường này mà. @
dwave 0,"dat\voice\2_0032.ogg"`Đó là tên của nó."@
br
dwave 0,"dat\voice\1_0112.ogg"`　"Milk là tên... @
dwave 0,"dat\voice\1_0113.ogg"`con mèo đó à?"\

change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0033.ogg"`　"Vâng ạ. @
dwave 0,"dat\voice\2_0034.ogg"`Milk đã ở đây lâu rồi. Em hay chơi với nó lắm. @
dwave 0,"dat\voice\2_0035.ogg"`A, là do em sống ở gần trường. @
dwave 0,"dat\voice\2_0036.ogg"`Nên mỗi khi ghé qua, em lại cho Milk ăn. @
dwave 0,"dat\voice\2_0037.ogg"`Dù có lúc làm mấy thầy mấy cô bực mình."@
br
`　Em ấy khẽ lấy tay che miệng, rồi cười.\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0038.ogg"`　"Em cũng đang tìm nó đây... mà không biết nó đi đâu mất rồi?"@
br
dwave 0,"dat\voice\1_0114.ogg"`　"Ưm, nhưng tôi chắc chắn là đã đuổi theo nó lên tận đây."@
br
change_cc "おさげ131あさって"
dwave 0,"dat\voice\2_0039.ogg"`　"Con mèo ấy khó tìm lắm."@
br
`　"..."@
br
`　Em ấy trả lời bằng giọng hào hứng, nhưng ánh mắt sao mà cô đơn.@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0040.ogg"`　"Vâng? @
dwave 0,"dat\voice\2_0041.ogg"`Em vừa nói điều gì kì cục à?"@
br
dwave 0,"dat\voice\1_0115.ogg"`　"Không, không đâu."\

change_cc "おさげ131あさって"

`　Trong giây lát, hình như em ấy thoáng mơ màng, thật khó mà biết được em đang nghĩ gì. Như thể em không hề tập trung nghĩ đến chuyện gì cả, nhưng giống như trước, dường như có một thứ nặng nề đè nén trong tâm khảm cô bé.\

dwave 0,"dat\voice\1_0116.ogg"`　"À còn chuyện này, em có nghe gì về một hồn ma xuất hiện quanh mấy tầng này không?"@
br
change_cc "おさげ132気付く"
dwave 0,"dat\voice\2_0042.ogg"`　"Ể...?"@
br
`　Cô bé đơ ra. Hay là em ấy sợ mấy chuyện này nhỉ?@
br
dwave 0,"dat\voice\1_0117.ogg"`　"Có một học sinh đã rơi xuống từ tầng thượng hồi lễ hội năm ngoái, phải không? @
dwave 0,"dat\voice\1_0118.ogg"`Thế nên bây giờ, mọi người bảo có một hồn ma xuất hiện trong trường trước ngày hội."@
br
`　Tôi tự chỉnh lại những lời nghe được ban nãy và nói với cô bé.\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0043.ogg"`　"A ha. @
dwave 0,"dat\voice\2_0044.ogg"`Coi nào, trường nào lại chẳng có cả tá mấy câu chuyện như thế. @
dwave 0,"dat\voice\2_0045.ogg"`Mấy thứ như thế chắc chắn không tồn tại đâu. @
dwave 0,"dat\voice\2_0046.ogg"`Ưm."@
br
dwave 0,"dat\voice\1_0119.ogg"`　"Đúng thật, nhưng có thể bạn học sinh ấy rơi xuống từ chỗ hàng rào gãy kia, nhỉ?"@
br
change_cc "おさげ143ええー"
`　"..."@
br
`　Chuyện này có vẻ liên quan, vì có thể thật sự là vậy, thật sự CÓ cảm giác rằng trước đây đã có ai đó rơi xuống từ chỗ rào chắn bị gãy kia.\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0047.ogg"`　"A, chà, lớp của Toshiki-senpai sẽ làm gì thế?"@
br
`　Chắc đề tài này làm cô bé sợ, trông sắc mặt em hơi tái đi và vội vã chuyển sang chuyện khác. Hẳn là sẽ vui đó nếu cứ tiếp tục, nhưng tôi quyết định bỏ qua.@
br
dwave 0,"dat\voice\1_0120.ogg"`　"Lớp tôi sẽ bán yakisoba."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0048.ogg"`　"Aa~ giá như lớp em cũng bán đồ ăn ha."\

dwave 0,"dat\voice\1_0121.ogg"`　"Thế lớp em làm gì, Tóc bím?"@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0049.ogg"`　"Anh gọi ai là Tóc bím đấy hở?"@
br
dwave 0,"dat\voice\1_0122.ogg"`　"Ở đây còn ai khác ngoài em?"@
br
dwave 0,"dat\voice\2_0050.ogg"`　"Em là Mizuna!"@
br
dwave 0,"dat\voice\1_0123.ogg"`　"Tóc bím dễ gọi và dễ nhớ hơn nhiều."@
br
dwave 0,"dat\voice\2_0051.ogg"`　"Cứ cho là thế đi nữa, em cũng không thích."\

dwave 0,"dat\voice\1_0124.ogg"`　"Mọi lúc mọi nơi, lớp em làm gì hở Tóc bím?"@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0052.ogg"`　"Thôi kệ, sao cũng được... @
dwave 0,"dat\voice\2_0053.ogg"`Mọi lúc mọi nơi, em sẽ là Tóc bím."@
br
dwave 0,"dat\voice\1_0412.ogg"`　"Thấy tôi nói đúng chứ?"@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0054.ogg"`　"Chắc vậy. @
dwave 0,"dat\voice\2_0055.ogg"`Chắc là thế ha."@
br
`　Trông em có vẻ không được chắc chắn lắm.\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0056.ogg"`　"Xem nào, lớp bọn em sẽ làm nhà ma."@
br
dwave 0,"dat\voice\1_0125.ogg"`　"Hể... @
dwave 0,"dat\voice\1_0126.ogg"`Sao thấy năm nào cũng có ít nhất một lớp làm nhà ma vậy ta?"@
br
dwave 0,"dat\voice\2_0057.ogg"`　"Cũng đúng ha."@
br
dwave 0,"dat\voice\1_0127.ogg"`　"Mà hầu như chẳng lớp nào làm cho ra hồn. @
dwave 0,"dat\voice\1_0128.ogg"`Chả thấy sợ gì hết."\

change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0058.ogg"`　"Hừm. @
dwave 0,"dat\voice\2_0059.ogg"`Trừ lớp em ra."@
br
dwave 0,"dat\voice\1_0129.ogg"`　"Rồi, cứ chờ xem."@
br
dwave 0,"dat\voice\2_0060.ogg"`　"Aaa, em không tin nổi anh đâu! @
dwave 0,"dat\voice\2_0061.ogg"`Nếu lớp em làm sợ thật, thì anh phải tới đấy nhé!"@
br
dwave 0,"dat\voice\1_0130.ogg"`　"Aa, được được. @
dwave 0,"dat\voice\1_0131.ogg"`Tôi sẽ nhớ tới mà."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0062.ogg"`　"Vâng! @
dwave 0,"dat\voice\2_0063.ogg"`Anh sẽ bất ngờ cho mà xem!"\

`　Mặt trời đã lên cao hơn, và chắc hẳn nắng hơn hồi sáng. Vì không có mái che, nên mọi vật như nóng dần lên.\

change_cc "おさげ131あさって"

`　Trông cô bé khá sôi nổi đấy chứ, nhưng rồi làn da ấy lại trở về sắc thái mà khi nãy chúng tôi nói về chuyện hồn ma.\

dwave 0,"dat\voice\1_0132.ogg"`　"Chúng ta nên quay về lớp thôi nhỉ?"@
br
dwave 0,"dat\voice\2_0064.ogg"`　"Em thì không sao. @
dwave 0,"dat\voice\2_0065.ogg"`Em muốn ở lại thêm một chút."@
br
dwave 0,"dat\voice\1_0133.ogg"`　"Chẳng phải ở đây hơi nóng quá sao? @
dwave 0,"dat\voice\1_0134.ogg"`Chúng ta xuống thôi nào."@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0066.ogg"`　"Em thích như thế này, nên không sao đâu. @
dwave 0,"dat\voice\2_0067.ogg"`Trong mắt anh, em yếu đuối đến vậy à?"\

dwave 0,"dat\voice\1_0135.ogg"`　"Em khỏe như móng tay ấy: dù có đánh bao nhiêu lần nó cũng không bị cong."@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0068.ogg"`　"Nếu anh làm thế, em sẽ bị cong như thường thôi."@
br
dwave 0,"dat\voice\1_0136.ogg"`　"Mà tôi đùa thôi, nhưng cứ thế này em sẽ cảm nắng mất."@
br
change_cc "おさげ131あさって"
dwave 0,"dat\voice\2_0069.ogg"`　"Chỉ là em muốn ở lại thêm một chút thôi."\

`　Tại sao?@
br
`　Khi em nói những lời đó, dường như có một nỗi buồn sâu thăm thẳm trong đôi mắt kia.\

dwave 0,"dat\voice\1_0137.ogg"`　"Tôi hiểu rồi. @
dwave 0,"dat\voice\1_0138.ogg"`Vậy tôi sẽ mua nước cho em nhé. @
dwave 0,"dat\voice\1_0139.ogg"`Em thích uống gì nào?"@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0070.ogg"`　"Hể? @
dwave 0,"dat\voice\2_0071.ogg"`Thôi, được rồi mà. @
dwave 0,"dat\voice\2_0072.ogg"`Hôm nay em không mang theo tiền."@
br
dwave 0,"dat\voice\1_0140.ogg"`　"Tôi đãi em mà."@
br
dwave 0,"dat\voice\2_0073.ogg"`　"Cảm ơn anh."@
br
dwave 0,"dat\voice\1_0141.ogg"`　"Giờ tôi đi mua đây."@
br
dwave 0,"dat\voice\2_0074.ogg"`　"Ưmm, cái nào cũng được anh, miễn là không có ga."@
br
dwave 0,"dat\voice\1_0142.ogg"`　"Không có ga? @
dwave 0,"dat\voice\1_0143.ogg"`Được rồi, tôi sẽ quay lại ngay."\

change_b "階段昼"

`　Bước trở vào trong, bầu không khí mát mẻ dễ chịu hơn hẳn ngoài kia dưới ánh mặt trời. Cảnh trời biển thì đẹp thật đấy, nhưng nếu cứ đứng ngắm mãi như thế, cơ thể khéo không chịu nổi mất.\

`　Đúng là một cô bé kì lạ.@
br
`　Em ấy cứ mãi nhìn mông lung, nhưng có điều gì đó...\

`　Nỗi buồn bất chợt ẩn trong đôi mắt em ấy là gì? Và phản ứng của em khi nói về rào chắn bị gãy... dường như hai chuyện có liên quan với nhau.\

`　Còn cái tên Hazuki Mizuna... tôi có cảm giác trước kia đã nghe qua, nhưng không tài nào nhớ nổi là ở đâu và khi nào.\

change_b "自販機前昼"

`　Lần thứ ba trong ngày, tôi lại đứng trước máy bán hàng tự động. Cô bé chẳng nói gì thêm ngoài "thứ gì không có ga là được", vậy nên...\

change_b "階段昼"

`　Tôi dứt khoát bấm cái nút ở tít bên phải, rồi lấy một lon coca cho mình. Cầm hai lon nước trong tay, tôi trở lên tầng thượng.\

change_b "屋上昼"

dwave 0,"dat\voice\1_0144.ogg"`　"Này! @
dwave 0,"dat\voice\1_0145.ogg"`Tôi mang nước đến rồi này."\

`　Tôi nhẹ nhàng mở cánh cửa to bản kia rồi bước vào làn nắng mặt trời sáng chói.@
br
dwave 0,"dat\voice\1_0146.ogg"`　"Ủa?"\

stop

`　Cô bé đâu mất rồi, mới nãy còn đứng đây mà. Hay là do mặt trời chiếu chói quá nên em ấy về lớp rồi chăng, nhưng vấn đề chính là tôi phải làm gì với lon nước dư trong tay này đây?\

dwave 0,"dat\voice\1_0147.ogg"`　"...thế quái nào mình lại uống cái thứ nguy hiểm này lần nữa chứ?"@
br
`　Cái nhãn xanh lá nguy hiểm "Nước ép Sợi đay đỏ 100%" lấp lánh dưới ánh mặt trời.@
br
dwave 0,"dat\voice\1_0148.ogg"`　"Chắc mình cũng nên về lớp thôi..."\

bg black,%110

`　Vì không thể quẳng đi được nên cuối cùng tôi đành nốc cạn nó, uống luôn cùng với lon coca cho qua cái thử thách này. Cảm giác như tôi vừa hấp thụ lượng rau xanh cho cả năm trời.\

gosub *windowoff
wait 2000
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
bg "dat\bg\bg01_1.jpg",%110
change_cc "うに413真面目"
gosub *windowon

dwave 0,"dat\voice\5_0034.ogg"`　"Ông trốn ở xó xỉnh nào nãy giờ thế?!"@
br
`　Trở về lớp, tôi bị Reiji cầm chảo chỉ thẳng vào mặt, nó la làng.@
br
dwave 0,"dat\voice\1_0149.ogg"`　"G-gì chứ?"\

dwave 0,"dat\voice\5_0035.ogg"`　"Ông quên mình tới trường là để làm gì rồi à?"@
br
dwave 0,"dat\voice\1_0150.ogg"`　"Thì chuẩn bị cho lễ hội chứ sao?"@
br
dwave 0,"dat\voice\5_0036.ogg"`　"Gần đúng đấy, nhưng chưa đủ. @
dwave 0,"dat\voice\5_0037.ogg"`Ông sẽ phải làm thuần thục món yakisoba phong cách Nishihara trong một ngày!"@
br
dwave 0,"dat\voice\1_0151.ogg"`　"Hả?"@
br
dwave 0,"dat\voice\5_0038.ogg"`　"Cấm than vãn và cầm lấy cái chảo đi!"\

change_cc "うに411通常"

`　Và thế là, nó bắt đầu giảng bài nấu yakisoba.@
br
dwave 0,"dat\voice\5_0039.ogg"`　"Trước tiên, ta đinh mì lên."@
br
dwave 0,"dat\voice\1_0152.ogg"`　"Đinh? @
dwave 0,"dat\voice\1_0153.ogg"`Ý ông là dùng lò vi sóng hả?"@
br
dwave 0,"dat\voice\5_0040.ogg"`　"Đúng. @
dwave 0,"dat\voice\5_0041.ogg"`Làm nóng mì chỉ cần khoảng một phút với lò vi sóng gia đình, và hơi nước sẽ giúp sợi mì dễ tách đôi ra hơn."@
br
dwave 0,"dat\voice\1_0154.ogg"`　"Hể..."\

dwave 0,"dat\voice\5_0042.ogg"`　"Tranh thủ lúc mì đang trong lò vi sóng, ông làm nóng chảo và cho dầu vào."@
br
dwave 0,"dat\voice\1_0155.ogg"`　"Ô, ờ. @
dwave 0,"dat\voice\1_0156.ogg"`...cái này không nặng lắm, nhưng sao lại dùng chảo??"@
br
dwave 0,"dat\voice\5_0043.ogg"`　"Để dễ dùng bếp ga điện và cũng dễ rửa nữa."@
br
dwave 0,"dat\voice\1_0157.ogg"`　"Hừmm."\

dwave 0,"dat\voice\5_0044.ogg"`　"Sẵn đó để tôi thái rau luôn. @
dwave 0,"dat\voice\5_0045.ogg"`Khi chảo vừa đủ nóng, ông cho bốn, năm miếng thịt vào và rán với lửa to. @
dwave 0,"dat\voice\5_0046.ogg"`Tới lúc nó vừa cháy xém ở rìa, thì chuẩn rồi đấy. @
dwave 0,"dat\voice\5_0047.ogg"`Vấn đề là cần cẩn thận sao cho chảo không bị nóng quá. Nếu không sẽ có chỗ này chưa chín, còn chỗ kia thì cháy khét lẹt. @
dwave 0,"dat\voice\5_0048.ogg"`Còn ngược lại, nếu chảo không đủ nóng, ông sẽ phải rán thật lâu, và thế là miếng thịt dở ẹc cho coi."@
br
dwave 0,"dat\voice\1_0158.ogg"`　"Ra thế."\

`　Vừa nghe nó giảng, tôi vừa cho vào vài miếng thịt lợn. Miếng thịt kêu xèo xèo trong khi rán.@
br
dwave 0,"dat\voice\5_0049.ogg"`　"Kế đó cho rau vào. @
dwave 0,"dat\voice\5_0050.ogg"`...hở?"@
br
`　BÙM! một cái trong lò vi sóng. Tôi quay nhìn về hướng phát ra tiếng nổ.\

dwave 0,"dat\voice\5_0051.ogg"`　"Toshiki, ông lấy mì ra khỏi gói trước khi cho vào lò rồi đấy chứ?"@
br
dwave 0,"dat\voice\1_0159.ogg"`　"Đâu, tôi cho cả gói vào luôn."@
br
dwave 0,"dat\voice\5_0052.ogg"`　"Đó là hậu quả khi ông không lấy mì ra đấy. @
dwave 0,"dat\voice\5_0053.ogg"`Cẩn thận giùm đi!"@
br
dwave 0,"dat\voice\1_0160.ogg"`　"Rồi, rồi."\

dwave 0,"dat\voice\5_0054.ogg"`　"Mà, chỉ bị hư cái gói thôi, còn mì vẫn ăn được. @
dwave 0,"dat\voice\5_0055.ogg"`Rồi, giờ đến rau. @
dwave 0,"dat\voice\5_0056.ogg"`Sau khi trộn bắp cải, cà rốt và hành, vốc khoảng một nắm tay cho vào xào trong chảo."@
br
dwave 0,"dat\voice\1_0161.ogg"`　"Yes-sir."\

dwave 0,"dat\voice\5_0057.ogg"`　"Xào sơ một hồi, ông cho sake nấu vào và tiếp tục xào cho đến khi bắp cải chuyển sang màu vàng nâu."@
br
dwave 0,"dat\voice\1_0162.ogg"`　"Vậy chúng ta dùng sake nấu chứ không chế nước à?"@
br
dwave 0,"dat\voice\5_0058.ogg"`　"Ừ. @
dwave 0,"dat\voice\5_0059.ogg"`Sau đó ông cho nửa gói tương gia vị vào. @
dwave 0,"dat\voice\5_0060.ogg"`Nửa còn lại thì cho vào mì. @
dwave 0,"dat\voice\5_0061.ogg"`Khi làm thế, tương sẽ không bị dính vào nhau, mà thấm đều vào các nguyên liệu khác."@
br
dwave 0,"dat\voice\1_0163.ogg"`　"Hê..."\

dwave 0,"dat\voice\5_0062.ogg"`　"Đó, ông trút mì vào đi. @
dwave 0,"dat\voice\5_0063.ogg"`Rồi cho phần tương còn lại vào và xào qua xào lại trong chảo cho thật đều. @
dwave 0,"dat\voice\5_0064.ogg"`Tốt rồi, có vẻ món tương làm ổn đấy. @
dwave 0,"dat\voice\5_0065.ogg"`Cuối cùng, ông cho dầu vừng vào, xào sơ, rồi tắt bếp."\

`　Dầu được thêm vào, hương thơm lan tỏa khắp phòng. Sau khi trộn nhẹ chảo, tôi tắt bếp.@
br
dwave 0,"dat\voice\5_0066.ogg"`　"Tốt, giờ bày ra đĩa rồi cho lên vài lát cá ngừ và rong biển xanh. @
dwave 0,"dat\voice\5_0067.ogg"`Cuối cùng ông rải thêm gừng đỏ để hoàn thành món ăn."@
br
dwave 0,"dat\voice\1_0164.ogg"`　"Rồi, xong rồi đấy!"\

dwave 0,"dat\voice\5_0068.ogg"`　"Ừm. @
dwave 0,"dat\voice\5_0069.ogg"`Không tệ, với lần đầu tiên nấu. @
dwave 0,"dat\voice\5_0070.ogg"`Đúng như mong đợi từ ông. @
dwave 0,"dat\voice\5_0071.ogg"`Nhưng vẫn chưa xong đâu. @
dwave 0,"dat\voice\5_0072.ogg"`Giờ đến lần tiếp theo!"@
br
dwave 0,"dat\voice\1_0165.ogg"`　"Cái g... giờ phải làm lại sao?"@
br
dwave 0,"dat\voice\5_0073.ogg"`　"Tất nhiên. @
dwave 0,"dat\voice\5_0074.ogg"`Tôi vẫn chưa dạy ông làm theo phong cách Nishihara mà! @
dwave 0,"dat\voice\5_0075.ogg"`Mới bấy nhiêu thôi thì đừng có mà tự kiêu."@
br
dwave 0,"dat\voice\1_0166.ogg"`　"Rồi, rồi."\

change_d "中消去"

`　Thế là, Reiji bắt tôi xào rán cho đến khi cả cánh tay đau nhức luôn. Thậm chí mọi người trong lớp túm tụm lại ăn cũng dần chán và phớt lờ tôi để tiếp tục công việc trang trí lớp học mà bọn họ quên mất nãy giờ.\

change_cc "うに411通常"

dwave 0,"dat\voice\5_0076.ogg"`　"Tốt, lần này được đó."@
br
dwave 0,"dat\voice\1_0167.ogg"`　"Ồ, cuối cùng ông cũng chịu trả tự do cho tôi rồi à?"@
br
dwave 0,"dat\voice\5_0077.ogg"`　"Ờ. @
dwave 0,"dat\voice\5_0078.ogg"`Tôi phải qua chỗ Kagawa và mấy bạn khác để chuẩn bị cho đại hội ngày mai."@
br
dwave 0,"dat\voice\1_0168.ogg"`　"Buổi hòa nhạc trong đêm hội trường nhỉ?"@
br
dwave 0,"dat\voice\5_0079.ogg"`　"Bọn tôi dợt ở phòng thể chất, ông có thể qua xem nếu rảnh."@
br
dwave 0,"dat\voice\1_0169.ogg"`　"Ừ. @
dwave 0,"dat\voice\1_0170.ogg"`Tôi sẽ ghé qua nếu thấy hứng."\

change_b "廊下昼"

`　Tôi chào tạm biệt Reiji rồi bước ra hành lang.@
br
`　Trước khi tôi kịp nhận ra, đồng hồ đã chỉ điểm chính ngọ. Bình thường giờ này tôi ăn bữa trưa nhanh rồi, nhưng hôm nay vì chén nhiều yakisoba quá nên no căng cả bụng.\

`　Giờ này mặt trời vẫn đang nung nóng mọi thứ.@
br
dwave 0,"dat\voice\1_0171.ogg"`　"Có nói với Reiji là sẽ ghé qua, nhưng... chắc về nhà thôi. Giờ đi đâu cũng thấy nóng."\

`　Vừa mới tiến đến cánh cửa, con mèo trắng hợm hĩnh ấy vụt ngang qua chân tôi lần nữa. Láo thật! Tôi gườm gườm nhìn nó, dọa đuổi nó. Như cảm thấy máu sôi trong người tôi, con mèo bỏ chạy mất.@
br
dwave 0,"dat\voice\1_0172.ogg"`　"Chết! @
dwave 0,"dat\voice\1_0173.ogg"`Chờ đã!"\

change_b "階段昼"

`　Như muốn lấy tôi làm trò hề, con mèo chạy theo đường zíc-zắc dọc hành lang, và chẳng mấy chốc, nó đã tót lên cầu thang. Quá đủ rồi, tôi thề rằng, dù có chuyện gì đi nữa cũng phải tóm được nó.@
br
dwave 0,"dat\voice\1_0174.ogg"`　"Haa haa... chết tiệt. @
dwave 0,"dat\voice\1_0175.ogg"`Ngày mai cả người sẽ ê ẩm mất."@
br
`　Toàn thân ướt đẫm mồ hôi, tôi vừa tiếp tục leo cầu thang vừa thở dốc. Trước khi kịp nhận ra, tôi đã đứng trước cánh cửa trên tầng thượng. Tất nhiên, có một cái khe vừa đủ rộng để con mèo lách qua.\

dwave 0,"dat\voice\1_0176.ogg"`　"Cái con này-! @
dwave 0,"dat\voice\1_0177.ogg"`Lần này tao sẽ bắt được mày!"@
br
`　Tôi nhào lên xô cửa và phi thẳng ra ngoài.\

change_b "屋上昼"

dwave 0,"dat\voice\1_0178.ogg"`　"Mày đâu rồi?! @
dwave 0,"dat\voice\1_0179.ogg"`Con mèo trắng kia!"@
br
change_cc "おさげ132気付く"
dwave 0,"dat\voice\2_0075.ogg"`　"Myu~?"@
br
`　Cô bé nhìn tôi, giật mình khi nghe tiếng hét đột ngột của tôi.\

mov %281
mov %286,1:bgm "dat\music\bgm\bgm01.mp3";	おさげ
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0076.ogg"`　"A, Toshiki-senpai."@
br
dwave 0,"dat\voice\1_0180.ogg"`　"Gì đây? @
dwave 0,"dat\voice\1_0181.ogg"`Lại là Tóc bím à?"@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0077.ogg"`　"Anh không muốn gặp em sao?"@
br
`　Em ấy vẫn đứng quay lưng, chỉ nghiêng mặt hướng về tôi. Em tỏ ra hờn dỗi, như một đứa trẻ vậy.\

dwave 0,"dat\voice\1_0182.ogg"`　"Trừ mấy đường cong trên người em thôi."@
br
change_cc "おさげ111通常"
`　"?"@
br
dwave 0,"dat\voice\1_0183.ogg"`　"Thôi quên đi. Mà em có thấy con mèo trắng chạy lên đây không?"@
br
dwave 0,"dat\voice\2_0078.ogg"`　"Ý anh là Milk í hả? @
dwave 0,"dat\voice\2_0079.ogg"`Milk ngay đây nè."\

change_cc "おさげ142笑顔"
`　Em quay người về phía tôi, và trên tay nép chặt vào ngực con mèo trắng ấy.@
br
dwave 0,"dat\voice\1_0184.ogg"`　"Tên khốn. @
dwave 0,"dat\voice\1_0185.ogg"`Chỗ mày nằm đáng ghen tị thật đấy."@
br
change_cc "おさげ141通常"
`　"?"@
br
dwave 0,"dat\voice\1_0186.ogg"`　"Không có gì đâu. @
dwave 0,"dat\voice\1_0187.ogg"`Anh chỉ nói một mình thôi. @
dwave 0,"dat\voice\1_0188.ogg"`Cơ mà, em giữ đừng cho nó chạy nhé."@
br
dwave 0,"dat\voice\2_0080.ogg"`　"Sao vậy anh?"@
br
dwave 0,"dat\voice\1_0189.ogg"`　"Không có gì đâu."\

`　Đây là cơ hội để tôi tóm cổ con mèo. Tôi chầm chậm tiến lại chỗ Tóc bím. Tôi dang hai tay ra khi con mèo đã vào tầm, nhưng đột nhiên, nó nhảy ra khỏi cánh tay cô bé và phóng vào mặt tôi.@
br
dwave 0,"dat\voice\1_0190.ogg"`　"Đau quááááá!!"@
br
`　Tiếng hét của tôi vang dội khắp tầng thượng.\

change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0081.ogg"`　"Ui cha. @
dwave 0,"dat\voice\2_0082.ogg"`Milk chạy rồi."@
br
dwave 0,"dat\voice\1_0191.ogg"`　"Khốn thật! @
dwave 0,"dat\voice\1_0192.ogg"`Xém tí nữa là..."@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0083.ogg"`　"Bắt nạt động vật là tuyệt-đối-cấm."@
br
`　Em nghiêm mắt nhìn tôi.@
br
dwave 0,"dat\voice\1_0193.ogg"`　"Làm gì có, nó còn chơi khăm anh hơn ấy chứ."\

change_cc "おさげ131あさって"
`　Cô bé đưa mắt về hướng con mèo vừa chạy đi.@
br
dwave 0,"dat\voice\2_0084.ogg"`　"Em với Milk thân nhau từ lâu rồi."@
br
dwave 0,"dat\voice\1_0194.ogg"`　"Chắc ngoài mấy con thú ra thì em không có nhiều bạn đâu nhỉ?"@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0085.ogg"`　"Aaa, xấu tính ghê! @
dwave 0,"dat\voice\2_0086.ogg"`Không phải mà."@
br
`　Em bước lại cạnh rào chắn và hướng ánh nhìn về một nơi xa xăm.\

change_cc "おさげ131あさって"
dwave 0,"dat\voice\1_0195.ogg"`　"À đúng rồi, hồi nãy lúc anh mua nước về thì em đi đâu thế?"@
br
dwave 0,"dat\voice\2_0087.ogg"`　"A... tại nắng quá nên em trở xuống lớp."@
br
`　Em thè lưỡi ra một tí, khẽ cười.\

dwave 0,"dat\voice\1_0196.ogg"`　"Nhưng em vẫn quay lại còn gì? Chưa chịu sợ nắng à."@
br
dwave 0,"dat\voice\2_0088.ogg"`　"Mấy bạn em còn chẳng thể tìm ra em trên này nữa cơ."@
br
dwave 0,"dat\voice\1_0197.ogg"`　"Để cho bạn bè làm hết thiệt không tốt đâu đấy."@
br
dwave 0,"dat\voice\2_0089.ogg"`　"Chuẩn bị gần xong hết rồi, nên không có em cũng chẳng sao đâu."\
gosub *windowoff
wait 2000
change_b "ＣＧ０１＿１"
mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ
gosub *windowon
`　Hai người chúng tôi đắm chìm trong sự tĩnh lặng. Tôi tựa mình vào rào chắn, ngắm nhìn cô bé đứng bên cạnh.@
br
br
`　―Đôi mắt mới buồn làm sao.@
br
br
`　Cứ nói là thích nơi này, nhưng sao đôi mắt em lại như vậy?\

`　Ánh mặt trời thiêu đốt khiến mặt đất như mờ mờ ảo ảo.@
br
`　Thật bình yên, thời gian cứ thế trôi qua.\

`　Lẽ nào người ngã từ tầng thượng là bạn của cô bé?@
br
`　Biết đâu được, nên mới khiến cho mắt em giờ đây đượm buồn thế kia.\

`　Chỉ là suy đoán thôi, nhưng giờ tôi cũng chẳng biết nên mở lời gì với em.\

change_b "ＣＧ０１＿２"
dwave 0,"dat\voice\2_0090.ogg"`　"...? @
dwave 0,"dat\voice\2_0091.ogg"`Gì thế anh?"@
br
`　Em nhận ra ánh mắt của tôi và quay nhìn lại. Mắt chúng tôi tình cờ chạm nhau và tôi vội quay đi.@
br
dwave 0,"dat\voice\1_0198.ogg"`　"Không, không có gì."\

dwave 0,"dat\voice\2_0092.ogg"`　"Aaa! @
dwave 0,"dat\voice\2_0093.ogg"`Anh đừng có mà thích em hay gì gì đó nghe?"@
br
dwave 0,"dat\voice\1_0199.ogg"`　"Không đời nào."@
br
dwave 0,"dat\voice\2_0094.ogg"`　"...em chỉ đùa thôi mà. Nhưng anh thẳng thừng thế! Em buồn đấy."@
br
`　Em nhìn thẳng về phía nhà thể chất rồi gượng cười.\

change_b "ＣＧ０１＿１"

dwave 0,"dat\voice\2_0095.ogg"`　"Hình như em nghe thấy âm thanh gì đó..."@
br
`　Đôi môi cô bé khẽ rung.@
br
dwave 0,"dat\voice\2_0096.ogg"`　"Nhạc này... là bài hát của Red Ai..."\

change_b "屋上昼"

dwave 0,"dat\voice\1_0200.ogg"`　"À, chắc bọn Reiji bắt đầu dợt rồi. @
dwave 0,"dat\voice\1_0201.ogg"`Ban nhạc đó tên BROY- bắt chước Red Ai, có bạn anh là thành viên trong ấy. @
dwave 0,"dat\voice\1_0202.ogg"`Họ sẽ biểu diễn vào đêm hội trường ngày mai."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0097.ogg"`　"Em cũng thích nhạc của Red Ai nữa. @
dwave 0,"dat\voice\2_0098.ogg"`'Giấc mơ mùa hạ' là tuyệt nhất!"\

dwave 0,"dat\voice\1_0203.ogg"`　"Kagawa cũng nói y chang em đấy."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0099.ogg"`　"Kagawa?"@
br
dwave 0,"dat\voice\1_0204.ogg"`　"Ừ. @
dwave 0,"dat\voice\1_0205.ogg"`Ca sĩ của BROY. @
dwave 0,"dat\voice\1_0206.ogg"`Em có muốn xem họ hát ở nhà thể chất không? @
dwave 0,"dat\voice\1_0207.ogg"`Họ đang tập, nên chắc em sẽ nghe được bài 'Giấc mơ mùa hạ' đấy."@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0100.ogg"`　"Oaa! @
dwave 0,"dat\voice\2_0101.ogg"`Em muốn xem!"\

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
change_b "体育館昼"

`　Khi chúng tôi vừa tới nhà thể chất, họ cũng vừa nghỉ giải lao một tiếng.\

change_cl "うに411通常"
dwave 0,"dat\voice\1_0208.ogg"`　"Yo, Reiji! @
dwave 0,"dat\voice\1_0209.ogg"`Siêng ghê chưa?"@
br
dwave 0,"dat\voice\5_0080.ogg"`　"Ô, Toshiki. @
dwave 0,"dat\voice\5_0081.ogg"`Ủa? @
dwave 0,"dat\voice\5_0082.ogg"`Ai kia?"@
br
dwave 0,"dat\voice\1_0210.ogg"`　"À, là Tóc bím đấy."@
br
change_cr "おさげ122なんですかー"
dwave 0,"dat\voice\2_0102.ogg"`　"Tên em KHÔNG phải Tóc bím mà!"\

dwave 0,"dat\voice\1_0211.ogg"`　"Đây là Reiji. @
dwave 0,"dat\voice\1_0212.ogg"`Tay bass của BROY."@
br
change_cr "おさげ111通常"
`　BROY gồm bốn thành viên: Kagawa, ca sĩ chính; Reiji, chơi bass; Shinoi, đánh piano; và một người nữa chơi ghi-ta. @
br
`　Thật ra tôi chẳng quen biết tay ghi-ta, nên không rõ tên. Tôi cũng chưa từng nói chuyện với Shinoi, cô bé luôn cặp kè bên Kagawa.@
br
`　Hiện giờ, cô bé đang đứng trên sân khấu, dán chặt mắt vào cây đàn và bảng tổng phổ. Đôi lúc Shinoi lại tạo nên vài giai điệu ngắn.\

dwave 0,"dat\voice\5_0083.ogg"`　"Hân hạnh được gặp em."@
br
dwave 0,"dat\voice\2_0103.ogg"`　"Rất vui khi gặp anh. @
dwave 0,"dat\voice\2_0104.ogg"`Em là Hazuki Mizuna."@
br
dwave 0,"dat\voice\5_0084.ogg"`　"Đến cả ÔNG cũng kiếm ra được một cô bạn gái trước lễ hội trường á? Giỏi dữ ta~"@
br
dwave 0,"dat\voice\1_0213.ogg"`　"Bạn gái?!"@
br
change_cr "おさげ114わ"
dwave 0,"dat\voice\2_0105.ogg"`　"H-hông phải vậy đâu!"@
br
`　Mặt cô bé đỏ bừng lên và vội vã phủ nhận. Thấy sao mà tội...\

dwave 0,"dat\voice\1_0214.ogg"`　"Ủa? @
dwave 0,"dat\voice\1_0215.ogg"`Kagawa đi đâu rồi?"@
br
dwave 0,"dat\voice\5_0085.ogg"`　"Oài, lúc nào chả thế. Nhỏ ấy bảo mọi người luyện tập, nhưng như bây giờ nè, tự nhiên nhớ ra có chuyện gấp nên bỏ về rồi. @
dwave 0,"dat\voice\5_0086.ogg"`Trời ạ, không biết bận cái quái gì nữa? Chuyện ngày mai mới đáng để tâm chứ."\

change_cr "おさげ111通常"
dwave 0,"dat\voice\2_0106.ogg"`　"Hể?! @
dwave 0,"dat\voice\2_0107.ogg"`Em đang muốn nghe 'Giấc mơ mùa hạ' mà. @
dwave 0,"dat\voice\2_0108.ogg"`Tiếc quá..."@
br
dwave 0,"dat\voice\5_0087.ogg"`　"Ô? @
dwave 0,"dat\voice\5_0088.ogg"`Mizuna-chan cũng thích Red Ai à?"\

change_cr "おさげ142笑顔"
dwave 0,"dat\voice\2_0109.ogg"`　"Vâng, @
dwave 0,"dat\voice\2_0110.ogg"`Em hâm mộ lắm."@
br
dwave 0,"dat\voice\5_0089.ogg"`　"Nếu đã thích 'Giấc mơ mùa hạ', chắc là em cũng biết hát chứ?"@
br
dwave 0,"dat\voice\2_0111.ogg"`　"Tất nhiên ạ! @
dwave 0,"dat\voice\2_0112.ogg"`Em thuộc lòng từng câu ca luôn. @
dwave 0,"dat\voice\2_0113.ogg"`Chỉ là giọng em hơi cao quá thôi."@
br
change_cl "うに412にしし"
dwave 0,"dat\voice\5_0090.ogg"`　"Chà, vậy hôm nay em có muốn hát thử không?"@
br
change_cr "おさげ143ええー"
dwave 0,"dat\voice\2_0114.ogg"`　"Ể?"@
br
dwave 0,"dat\voice\5_0091.ogg"`　"Nhạc để bọn anh lo, em chỉ việc hát thôi."@
br
dwave 0,"dat\voice\2_0115.ogg"`　"Hể? @
dwave 0,"dat\voice\2_0116.ogg"`Hể-ể-ể?!"\

change_d "全消去"
`　Reiji ấn mạnh cái micro vào tay cô bé rồi kéo em lên sân khấu.@
br
dwave 0,"dat\voice\2_0117.ogg"`　"Toshiki-senpai! @
dwave 0,"dat\voice\2_0118.ogg"`Cứu em với...!"@
br
`　Em ấy la lối đầy đau khổ qua cái micro.@
br
dwave 0,"dat\voice\1_0216.ogg"`　"Giờ em đứng chỗ này, hát nào."@
br
dwave 0,"dat\voice\2_0119.ogg"`　"Ngại quá đi!"\
gosub *windowoff
stop
wait 2000
mov %285
mov %286,1:bgm "dat\music\bgm\bgm05.mp3";	いんすと
wait 2000
gosub *windowon
`　Giai điệu vang lên, sự lúng túng trên nét mặt của Tóc bím vẫn còn nguyên. Bằng tiếng piano độc tấu của Shinoi và nhịp phách chầm chậm, dạo đầu buồn bắt đầu. Chuẩn bị tinh thần, cô bé khép lại bờ mi và nâng micro lên kề môi.\

`　Khi em cất lên tiếng hát, mọi người đều bất ngờ. Nó trong vắt tựa bầu trời tôi đã ngắm nhìn trên tầng thượng hôm nay, giọng của em vang vọng khắp nhà thể chất. Như quên mất nơi mình đang đứng, tôi đã bị giọng ca ấy hớp hồn.\

`　Chỉ là... trái ngược với tuyên bố yêu thích ca khúc này, trông em lại buồn vô cùng khi ngân tiếng hát. Thật giống với đôi mắt buồn lúc em nói mình thích tầng thượng.\

`　Đúng là ca từ và nhan đề khá buồn. Thật đau đớn, nó khắc họa trừu tượng những ký ức của một cô gái trẻ vào mùa hè duy nhất cô ấy được ở cùng với người mình yêu. Bằng giai điệu đau buồn và lời ca xuôi chảy theo phiền muộn, nó như đánh cắp mất trái tim của các bạn trẻ, và đó là lí do ca khúc này trở thành hit lớn.\

`　Cô bé tiếp tục ngân nga với đôi mắt khẽ nhắm. Là do em tập trung nhớ lời bài hát, hay chăng do em đang cố không để mọi người thấy nỗi buồn của mình thêm nữa?\

`　Cũng như khi bắt đầu, ca khúc kết thúc bằng tiếng piano độc tấu. Tiếng đàn vang lên trong thoáng chốc, và khi mở mắt ra, cô bé hét lớn vào micro.

mp3fadeout 1000
stop
mp3fadeout 0
dwave 0,"dat\voice\2_0120.ogg"`　"...KHÔNGGG! @
dwave 0,"dat\voice\2_0121.ogg"`Thiệt ngại quá đi!!"\

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
wait 1000

`　...ấn tượng về âm vang ấy chẳng kéo dài lâu.\

gosub *windowoff
wait 2000
gosub *windowon

`　Và tâm trạng mọi người dần tan lắng vào những lời tán gẫu, ai nghĩ gì nói nấy.\

change_cr "おさげ112笑顔"
dwave 0,"dat\voice\2_0122.ogg"`　"Shino-chan, mình chơi thử piano được không?"@
br
change_cl "しのりん211メ通常"
`　Không đợi Shinoi kịp trả lời, Tóc bím đã đặt ngón tay lên phím đàn.\

dwave 0,"dat\voice\1_0217.ogg"`　"Gì đấy? @
dwave 0,"dat\voice\1_0218.ogg"`Đừng có vểnh mũi lên hay lúc lắc bím tóc kiểu như em đặc biệt lắm không bằng."@
br
change_cr "おさげ121もー"
dwave 0,"dat\voice\2_0123.ogg"`　"Anh làm như chúng ta đã thân thiết đến mức để anh nói ra được những lời lẽ đó hả?!"@
br
dwave 0,"dat\voice\1_0219.ogg"`　"Ô hay? @
dwave 0,"dat\voice\1_0220.ogg"`Anh không được phép sao? @
dwave 0,"dat\voice\1_0221.ogg"`Tệ thật đấy."@
br
change_cr "おさげ122なんですかー"
dwave 0,"dat\voice\2_0124.ogg"`　"Mà dù vậy thì..."\

change_cl "しのりん213メ笑顔"
dwave 0,"dat\voice\3_0003.ogg"`　*khúc khích*@
br
`　Tôi nhận ra Shinoi đang che miệng cười bên Tóc bím.@
br
change_cr "おさげ121もー"
dwave 0,"dat\voice\2_0125.ogg"`　"Aa! @
dwave 0,"dat\voice\2_0126.ogg"`Shino-chan cười kìa!"\

change_d "全消去"
`　Với sự chỉ dẫn tận tình của Shinoi, từng giai điệu vang lên trong nhà thể chất.\

gosub *windowoff
wait 2000
change_b "体育館夕"
wait 2000
gosub *windowon

`　Suốt cả buổi, bọn họ chơi piano, và cùng ca tụng Red Ai yêu quí của họ. Chẳng mấy chốc, nhà thể chất đã ngập tràn những tia nắng màu cam.\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0127.ogg"`　"Nhất định ngày mai em sẽ xem buổi biểu diễn! Mọi người cố gắng hết mình nhé!"@
br
`　Em ấy siết chặt tay vào ngực.@
br
change_cl "うに412にしし"
dwave 0,"dat\voice\5_0092.ogg"`　"Ừ. @
dwave 0,"dat\voice\5_0093.ogg"`Em hát tuyệt lắm, nhưng Kagawa cũng không thua kém đâu, nên nhớ đến xem nhá!"@
br
change_cc "おさげ116照れ"
dwave 0,"dat\voice\2_0128.ogg"`　"Đâu có, @
dwave 0,"dat\voice\2_0129.ogg"`Em hát có hay gì đâu!"\

`　Cô bé lắc đầu nguầy nguậy. Bím tóc cũng đung đưa theo, mà sao không thấy khớp gì cả.\

dwave 0,"dat\voice\1_0222.ogg"`　"Vậy giờ về thôi chứ? @
dwave 0,"dat\voice\1_0223.ogg"`Em nói em ở gần trường à? @
br
dwave 0,"dat\voice\1_0224.ogg"`Vậy để anh tiễn em trên đường anh về luôn nhé?"@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0130.ogg"`　"A, em muốn tạt qua chỗ này tí xíu. @
dwave 0,"dat\voice\2_0131.ogg"`Nên chắc phải tạm biệt anh ở đây thôi. @
dwave 0,"dat\voice\2_0132.ogg"`Shino-chan, chào bạn luôn nhé!"@
br
change_cr "しのりん213メ笑顔"
`　Shinoi khẽ vẫy tay.@
br
dwave 0,"dat\voice\1_0225.ogg"`　"Vậy thì, mai gặp em nhé."@
br
dwave 0,"dat\voice\2_0133.ogg"`　"Vâng! @
dwave 0,"dat\voice\2_0134.ogg"`Mai gặp lại anh."\

change_b "校門夕"

`　Tôi đi cùng Reiji ra tới cổng trường thì dừng lại.@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0094.ogg"`　"Gì đó?"@
br
dwave 0,"dat\voice\1_0226.ogg"`　"Tôi bỏ quên cái cặp trong lớp rồi."@
br
`　Thảo nào tôi thấy người nhẹ hơn bình thường.@
br
dwave 0,"dat\voice\1_0227.ogg"`　"Xin lỗi nhá. @
dwave 0,"dat\voice\1_0228.ogg"`Tôi phải trở vô lớp đây. @
dwave 0,"dat\voice\1_0229.ogg"`Hẹn mai gặp."@
br
dwave 0,"dat\voice\5_0095.ogg"`　"Ờ. @
dwave 0,"dat\voice\5_0096.ogg"`Nhớ ngủ đủ giấc cho ngày mai tràn đầy năng lượng nhé."@
br
`　Tôi mỉm cười chua chát khi nghe mấy lời đó, nói trắng ra, tôi thấy ghen tị khi nó có thể hăng hái đến như vậy cho mấy sự kiện kiểu này.\

change_b "教室夕"

`　Tôi quay về lớp, chộp lấy cái cặp để quên trên bàn, và trở ra hành lang.\

change_b "廊下夕"
dwave 1,"dat\music\se\se15.wav"
stop

dwave 0,"dat\voice\1_0230.ogg"`　"Hửm...?"@
br
`　Khi vừa quay ra cửa, tôi chợt nghe thấy tiếng đàn piano ở đâu đó.@
br
`　Tôi dừng bước và căng tai lắng nghe.\

`　...@
br
br
`　Từ mặt sau trường, tiếng hải âu kêu và sóng vỗ hòa vào nhau, nhưng tôi vẫn nghe thấy rõ ràng.\

`　Là tiếng piano. Giống những giai điệu lúc nãy trong nhà thể chất.\

isskip %117:csel "`Về nhà",*sentaku201,"`Đến nhà thể chất",*sentaku202

*sentaku202

add %41,1;	しのりんルートフラグ

`　Giai điệu như mời gọi, thế là tôi đến nhà thể chất.\

change_b "ＣＧ１１＿１"

`　Vừa mở cửa ra, tôi trông thấy dáng vóc Shinoi đang chơi đàn piano trên sân khấu ngập ánh chiều tà, giống như khi nãy.@
br
`　Em ấy có vẻ không phát hiện ra tôi, vẫn đắm mình vào giai điệu piano.\

`　Đứng từ đây, Shinoi trông thật bé nhỏ so với kích thước của cây đàn piano. Nếu không mặc đồng phục trường, hẳn giáo viên sẽ lầm em là con nhóc nào đó đang nghịch piano và đuổi ra khỏi phòng ngay.\

`　Trong lúc tôi mãi trầm ngâm, Shinoi đã hoàn thành bản nhạc và thở phào nhẹ nhõm.@
br
br
`　―Bộp, bộp, bộp...@
br
br
`　Tiếng vỗ tay của tôi làm Shinoi giật mình, em ấy ấn hơi mạnh vài phím đàn, khiến âm thanh dội khắp phòng.\

gosub *windowoff
mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん
change_b "体育館夕"
change_cc "しのりん221メ通常"
gosub *windowon
dwave 0,"dat\voice\3_0004.ogg"`　"A, ưm... Sugai-san... @
dwave 0,"dat\voice\3_0005.ogg"`Anh đứng ở đó từ khi nào thế?"@
br
dwave 0,"dat\voice\1_0231.ogg"`　"Mới nãy thôi. @
dwave 0,"dat\voice\1_0232.ogg"`Tôi không muốn cắt ngang em luyện tập... tôi cũng định đi rồi, nhưng cuối cùng lại đứng nghe đến hết bài luôn."\

dwave 0,"dat\voice\3_0006.ogg"`　"Sao thế ạ...? @
dwave 0,"dat\voice\3_0007.ogg"`Nghe em chơi đàn đâu có gì hay đâu."@
br
dwave 0,"dat\voice\1_0233.ogg"`　"Không đâu. @
dwave 0,"dat\voice\1_0234.ogg"`Tôi không biết nhiều về âm nhạc, nhưng để chơi được piano thì không hề đơn giản, đúng không?"@
br
change_cc "しのりん224メ照れ"
dwave 0,"dat\voice\3_0008.ogg"`　"Haaa..."@
br
`　Sau tiếng thở dài, khuôn mặt ấy đỏ bừng lên và em cúi gục đầu.\

`　...chết? Mình nói gì kì cục quá à?!@
br
`　Nghĩ tới đó, đáng lẽ tôi không nên bắt chuyện với em khi chỉ có hai người với nhau. Tôi có cảm giác rằng em ấy chỉ có thể nói từ phía sau Kagawa.@
br
`　Một cô bé trầm lặng. Còn tôi thì đang cố kiếm ra chuyện gì để nói.\

`　...bây giờ không khí sao lại kì kì thế này, hay chỉ có tôi kì nhỉ?\
`　...@
br
br
change_cc "しのりん222メ俯き"
dwave 0,"dat\voice\3_0009.ogg"`　"Là do... bàn tay em nhỏ."@
br
dwave 0,"dat\voice\1_0235.ogg"`　"Hể?"@
br
`　Em ấy hướng ánh mắt xuống đôi bàn tay.@
br
dwave 0,"dat\voice\3_0010.ogg"`　"Bàn tay em nhỏ quá. @
dwave 0,"dat\voice\3_0011.ogg"`Nên chơi piano không hợp."\

`　Em dang bàn tay ra cho tôi xem. Em đưa ra trước mặt tôi, và tôi thấy ngón tay em ấy chỉ ngang chừng tới đốt tay thứ hai của tôi.@
br
change_cc "しのりん224メ照れ"
dwave 0,"dat\voice\3_0012.ogg"`　"Haa..."@
br
`　Thở dài lần nữa, cô bé siết chặt hai tay vào nhau rồi lại đỏ mặt, lại nhìn xuống dưới.\

`　Tôi biết nói gì đây... thật khó để tìm được lời thích hợp...@
br
`　Quanh tôi chỉ toàn những người hoạt náo. Kiểu như Reiji, hay Kagawa, thậm chí là Tóc bím. Dù tôi không nói gì, họ cũng tự kiếm ra chuyện gì đó để nói. Người như tôi - một kẻ thấy việc giao tiếp sao mà phiền toái, họ cũng đã nhiều lần trò chuyện với tôi.\

`　Nhưng, bây giờ đây, một người còn kín miệng hơn đang đứng trước mặt tôi, và tôi cũng không biết nên nói gì.\

`　Tôi nghĩ mình sẽ mở lời trước, "Xin lỗi đã làm phiền em luyện tập. Chào em". Và có lẽ mọi chuyện sẽ kết thúc như vậy. Nhưng khi sự câm lặng cứ trải dài, những lời lẽ đó càng lúc càng khó bật ra.\

`　Thế là, chìm vào không gian tĩnh mịch hòa trong ánh dương vàng cam, chúng tôi chẳng làm gì cả.@
br
dwave 0,"dat\voice\1_0236.ogg"`　"À thì... sao em lại gia nhập BROY?"@
br
change_cc "しのりん221メ通常"
dwave 0,"dat\voice\3_0013.ogg"`　"...Em ở gần nhà Mami-chan, nên bọn em thân nhau từ lâu rồi. @
dwave 0,"dat\voice\3_0014.ogg"`Mami-chan biết em học chơi piano và mời em tham gia nhóm luôn."@
br
dwave 0,"dat\voice\1_0237.ogg"`　"Hể..."@
br
`　Tôi không biết chuyện hai người họ đã là bạn tốt của nhau từ lâu đến vậy.\

`　...nhưng tôi vẫn không nghĩ Shinoi lại là kiểu người thích đứng trên sân khấu.@
br
dwave 0,"dat\voice\1_0238.ogg"`　"Hay là tại Kagawa bắt ép lập thành nhóm đó?"@
br
`　Tôi châm đùa. Nhưng em vẫn chú ý lắng nghe và ngập ngừng trả lời, nét mặt đầy bối rối.@
br
dwave 0,"dat\voice\3_0015.ogg"`　"Là vì... em yêu thích piano."@
br
change_cc "しのりん224メ照れ"
`　Mặt lại đỏ lên nữa.@
br
dwave 0,"dat\voice\1_0239.ogg"`　"Em yêu thích piano, còn Kagawa thì không?"@
br
change_cc "しのりん212メあうう"
dwave 0,"dat\voice\3_0016.ogg"`　"K-không phải vậy đâu!"\

`　Cô bé không phải kiểu người để đùa rồi. Tôi chắc chắn đấy.@
br
`　Dần dà tôi nhận thấy việc em ấy cố trả lời thành thật có hơi buồn cười, và tôi cũng cười gượng. Chắc tôi mới là đứa có vấn đề.\

change_cc "しのりん213メ笑顔"
dwave 0,"dat\voice\3_0017.ogg"`　"Cả Mami-chan... lẫn nhạc của Red Ai, em đều yêu cả..."@
br
`　Nói xong, cô bé đóng nắp đàn lại rồi đứng dậy.@
br
`　...Tôi dõi mắt theo, thấy em ấy bước ra khỏi ghế.\

dwave 0,"dat\voice\1_0240.ogg"`　"A, xin lỗi vì đã cắt ngang bài tập dợt của em."@
br
dwave 0,"dat\voice\3_0018.ogg"`　"Không đâu... @
dwave 0,"dat\voice\3_0019.ogg"`Chỉ là em muốn cảm nhận không khí này một lát."@
br
dwave 0,"dat\voice\1_0241.ogg"`　"Không khí này?"@
br
dwave 0,"dat\voice\3_0020.ogg"`　"Nếu chỉ là tập dợt, thì em có thể làm ở nhà... @
br
dwave 0,"dat\voice\3_0021.ogg"`Chỉ là vì sẽ đứng trước bao nhiêu người ở đây, làm em cảm thấy hơi sợ."@
br
`　Hơi sợ? Tôi tưởng em ấy phải nói là sợ đến mức ngất xỉu luôn ấy chứ?\

change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0022.ogg"`　"...ngày mai, sẽ có nhiều người đến đây lắm, phải không ạ?"@
br
dwave 0,"dat\voice\1_0242.ogg"`　"Đúng ha. @
dwave 0,"dat\voice\1_0243.ogg"`Thậm chí cả học sinh ở mấy trường lân cận năm nào cũng đi xem biểu diễn mà."@
br
change_cc "しのりん212メあうう"
dwave 0,"dat\voice\3_0023.ogg"`　"Haa..."@
br
dwave 0,"dat\voice\1_0244.ogg"`　"Sẽ ổn thôi mà em. @
dwave 0,"dat\voice\1_0245.ogg"`Tiếng đàn piano của em... nói sao nhỉ? Kiểu như, âm thanh vang thấu đến tận tâm can ấy."@
br
`　"..."@
br
dwave 0,"dat\voice\1_0246.ogg"`　"Shinoi?"@
br
br
change_d "中消去"
`　――Rầm!\

`　Em ấy đỏ bừng mặt và ngã bổ ngửa.@
br
`　Chết... mình nói thẳng quá à?@
br
change_cc "しのりん223メうわわ"
dwave 0,"dat\voice\3_0024.ogg"`　"Ui da... đau quá."@
br
`　Em ngồi dậy, lấy tay ôm đầu. Tự nhiên tôi thấy lo lo cho hội diễn ngày mai.\

*sentaku201
gosub *windowoff
bg black,%110
stop
wait 1000
mov %283
mov %286,1:bgm "dat\music\bgm\bgm03.mp3";	さわやか
change_b "通学路夜"
gosub *windowon
`　Tôi về đến nhà thì trời cũng sẩm tối.\
change_b "玄関夜"
dwave 0,"dat\voice\1_0247.ogg"`　"Con về rồi."@
br
dwave 0,"dat\voice\9_1006.ogg"`　"Về rồi hả con? @
dwave 0,"dat\voice\9_1007.ogg"`Sao trễ thế? @
dwave 0,"dat\voice\9_1008.ogg"`Bữa tối chuẩn bị xong cả rồi."\

change_b "自室夜"


`　Xong bữa tối, tôi về phòng và mông lung hồi tưởng lại mấy chuyện xảy ra trong ngày, thật chẳng giống tôi chút nào.@
br
dwave 0,"dat\voice\1_0248.ogg"`　"Hazuki Mizuna... mình có cảm giác rõ ràng là đã nghe qua cái tên này rồi."@
br
`　Tưởng đã sắp nhớ ra, nhưng vẫn không tài nào ra được, nên tôi bực mình kệ luôn, cứ để dòng suy nghĩ trôi đi đâu thì trôi.\

gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000

;----------------------------------
;　二日目
;----------------------------------
change_day "十七日"

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
bg "dat\bg\bg01_1.jpg",%110

gosub *windowon

dwave 0,"dat\voice\5_0097.ogg"`　"Ê! @
dwave 0,"dat\voice\5_0098.ogg"`Toshiki, đưa tôi cái đó."@
br
`　Sát lễ hội rồi. Đang là những khâu chuẩn bị cuối cùng.\

change_b "廊下昼"

dwave 0,"dat\voice\1_0249.ogg"`　"Đưa cái gì? @
dwave 0,"dat\voice\1_0250.ogg"`Còn cái bảng hiệu tổ bố này là sao?"@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0099.ogg"`　"Trong một sự kiện như thế này thì tạo ấn tượng quan trọng lắm chứ."@
br
`　Hai tay Reiji bận giơ lên cao, nên tôi khiêng tới cho nó cái bảng hiệu gỗ to đùng.\

dwave 0,"dat\voice\1_0251.ogg"`　"Trời ạ, bự thế này thảo nào nặng kinh hồn! @
dwave 0,"dat\voice\1_0252.ogg"`Thế quái nào ông kéo nổi nó tới đây thế?!"@
br
dwave 0,"dat\voice\5_0100.ogg"`　"Chấp nhất ba cái tiểu tiết đó làm gì, @
dwave 0,"dat\voice\5_0101.ogg"`Toshiki."@
br
`　Với Reiji, nhiều lần tôi cũng chẳng hiểu nó thuộc thể loại nào nữa khi xem chuyện này là bình thường.\

dwave 0,"dat\voice\1_0253.ogg"`　"Lỡ nó rớt xuống là đi đời đấy nhé."\

change_d "中消去"
`　Cuối cùng, hai đứa tôi đành bó tay, phải gọi thêm ba, bốn người gần đó và xoay xở mãi mới treo được nó lên cửa ra vào lớp.@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0102.ogg"`　"Chắc phải lấy dây cột lại nhỉ?"@
br
`　Nói xong, nó rút ra một đoạn dây thừng và cột bảng hiệu thật chặt.\

change_b "教室昼"

dwave 0,"dat\voice\1_0254.ogg"`　"Vẫn nóng như lò thiu."@
br
`　Tôi đến trường buổi chiều, giờ mới tầm hai giờ. Vào lớp, tôi buột miệng than.@
br
`　Trong lớp mát mẻ dễ chịu hơn, như kiểu được chườm nước đá toàn thân sau công việc nặng nhọc tôi làm hồi nãy.\

change_cc "うに411通常"
dwave 0,"dat\voice\1_0255.ogg"`　"Tôi chả muốn ra khỏi cái phòng này nữa."@
br
dwave 0,"dat\voice\5_0103.ogg"`　"Hưm. @
dwave 0,"dat\voice\5_0104.ogg"`Giờ ta sơ chế cho ngày mai luôn."@
br
dwave 0,"dat\voice\1_0256.ogg"`　"Sơ chế?"@
br
dwave 0,"dat\voice\5_0105.ogg"`　"Ờ. @
dwave 0,"dat\voice\5_0106.ogg"`Thái hết mớ rau đó đi."@
br
dwave 0,"dat\voice\1_0257.ogg"`　"Thái hôm nay thì rau hư hết còn gì?"@
br
dwave 0,"dat\voice\5_0107.ogg"`　"Khỏi lo đi. @
dwave 0,"dat\voice\5_0108.ogg"`Ta có tủ lạnh mà, cứ bỏ rau đã sơ chế vào đấy thì đến mai vẫn tươi rói thôi."@
br
dwave 0,"dat\voice\1_0258.ogg"`　"Từ khi nào ông..."\

`　Trước khi tôi nhận ra, một phần ba phòng học đã biến thành gian bếp.@
br
dwave 0,"dat\voice\1_0259.ogg"`　"Này, sao trong lớp có cả vòi nước thế kia?"@
br
dwave 0,"dat\voice\5_0109.ogg"`　"Lúc nãy tôi chẳng bảo ông khỏi chú ý tiểu tiết rồi còn gì?"\

`　Giờ có hỏi cũng đã trễ. Tôi vặn nhẹ vòi và có nước chảy ra thật. Chỗ quái nào nó nối được với ống nước, và nước này chảy ra từ xó nào? Tôi chả dám tìm hiểu nữa.\

dwave 0,"dat\voice\5_0110.ogg"`　"Thế, nhờ ông gọt cà rốt, thái hành và bắp cải ở chỗ kia luôn nhé. @
dwave 0,"dat\voice\5_0111.ogg"`Tôi cắt mẫu sẵn rồi, ông chỉ cần làm theo thôi."@
br
dwave 0,"dat\voice\1_0260.ogg"`　"Cho bọn con gái làm chẳng phải dễ hơn sao?"@
br
change_cc "うに413真面目"
dwave 0,"dat\voice\5_0112.ogg"`　"Toshiki-kun, phân biệt giới tính là không tốt nhé."@
br
dwave 0,"dat\voice\1_0261.ogg"`　"Làm gì mà ăn nói đao to búa lớn thế?"\

change_cc "うに411通常"
dwave 0,"dat\voice\5_0113.ogg"`　"Cứ nghĩ đây là bài kiểm tra đi. @
dwave 0,"dat\voice\5_0114.ogg"`Tôi cần họp lần cuối với mấy người trong ban nhạc, nên chắc phải chạy qua nhà thể chất một tẹo. @
dwave 0,"dat\voice\5_0115.ogg"`Thái gọt xong hết rồi thì ông bỏ vô một hộp lớn và cho vào tủ lạnh nhé."@
br
change_d "中消去"
`　 Reiji vẫy vẫy tay rồi đi ra hành lang.\

`　Thế là, tôi phải xử lý mớ rau. Tôi thiết nghĩ nên nhờ bạn nữ nào đó giúp một tay, nhưng lại thôi. Rồi tôi nghĩ tới chuyện trốn việc, nhưng trốn thế nào được khi mục đích ngay từ đầu là tới để giúp.\

`　Nghĩ một hồi, tôi tống mấy miếng rau vừa thái vào trong tủ lạnh.\

change_b "廊下昼"

`　Từ giờ đến hội trường vẫn còn nhiều thời gian. Trước mắt là còn sáu tiếng nữa mới khai mạc. Rồi thầy hiệu trưởng sẽ bắt đầu bài nói ngắn-nhưng-nhức-não để bắt đầu lễ hội. Một trong những tiết mục là buổi hòa nhạc của BROY.\

`　Tờ rơi lễ hội dán đầy cửa ra vào, và mấy bảng chỉ hướng nhà thể chất đặt ở khắp nơi để học sinh tìm tới.\

`　Các tiết mục tối nay cũng được ghi trong tờ rơi.@
br
`　Đầu tiên là màn diễn hỗn hợp. Nửa phần đầu gồm tấu hài và ảo thuật. Nửa phần sau liệt kê các nhóm nhạc.\

dwave 0,"dat\voice\1_0262.ogg"`　"Ồ, ban nhạc của Reiji biểu diễn chót."@
br
`　Theo lịch trình, tất cả sẽ kết thúc lúc chín giờ. Do có đêm hội và lễ bế mạc ngày mai, học sinh được phép ra vào cho đến mười giờ tối. Và, tất nhiên, sẽ có ai đó bị lên phòng giám thị, vừa uống trà xơi nước vừa bị mắng té tát.\

`　―Cơ mà, giờ biết làm gì để giết thời gian đây?@
br
`　Cứ đi loanh quanh lẩn quẩn thế này chán chết. Tôi chẳng biết cần đi đâu nữa.\

`　Chợt tôi lại dừng chân trước lớp 2-C. Không ngoài dự đoán, tấm màn đen giăng lên che hết bên ngoài, và mấy con ma giấy được dán trước cửa. Chỉ trời biết có cái gì trong đó.\

`　Nhiều học sinh đi ra đi vào, nhưng tôi không tìm thấy Tóc bím. Chắc cô bé đang đứng sau tấm màn, nhưng tôi nghĩ hay là em đang ở trên tầng thượng, thế nên tôi quay gót bỏ đi.\

change_b "屋上昼"
dwave 1,"dat\music\se\se15.wav":mov %22,15

`　Đúng như tôi nghĩ, mặt trời chiều thả mình xuống tầng thượng ngập nắng, làm trên này còn nóng hơn ngoài hành lang.@
br
dwave 0,"dat\voice\1_0263.ogg"`　"Biết ngay là em ở trên đây mà."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0135.ogg"`　"A, Toshiki-senpai. @
dwave 0,"dat\voice\2_0136.ogg"`Sao thế anh?"@
br
dwave 0,"dat\voice\1_0264.ogg"`　"Anh rỗi rãi tí chút trước hội trường ấy mà."@
br
`　Nói chính xác hơn, đáng lẽ tôi nên đi sơ chế... nhưng lỡ có không đủ thức ăn thì ngày mai Reiji cũng sẽ chu đáo thái gọt mọi thứ bằng nguồn năng lượng dồi dào thôi mà.\

if %101 > 0 goto *Juice
*nage101

dwave 0,"dat\voice\1_0265.ogg"`　"Nào, chụp này."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0137.ogg"`　"Cha!"\

change_b "ＣＧ０２＿１"

`　Tôi ném lon nước cam ép vừa mua trước khi lên đây cho cô bé. Em cố rướn cả hai tay, nhưng nó nảy tung lên và như muốn rơi xuống. Em kêu lên "Óa óa óa!", và dáng điệu ấy làm váy hất tung đầy khiêu gợi. Dù chỉ trong tầm ba giây là cùng. Tôi tập trung hết nhãn quan và loáng thoáng thấy được vật linh thiêng màu trắng tinh khiết ấy.\

`　―Chết tiệt, tôi không có cơ hội ngắm nghía lâu. Tất cả thành quả mà lon nước ép mang lại cho tôi đấy.@
br
dwave 0,"dat\voice\1_0266.ogg"`　"Lần tới mình sẽ cố ném nó lệch hơn nữa."@
br
`　Tôi rút kinh nghiệm rồi.\

gosub *windowoff
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

*Juiceend
if %29 = 1 gosub *windowoff:bg black,%110:bg "dat\bg\bg04_1.jpg",0:mov %284,1:bgm "dat\music\bgm\bgm04.mp3":ld c,":a;dat\chra\osage111.jpg",0:goto *nage102
dwave 0,"dat\voice\2_0138.ogg"`　"Cái này là?"@
br
dwave 0,"dat\voice\1_0267.ogg"`　"Lúc nào em cũng ở đây. Không thấy nóng à?"@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0139.ogg"`　"Em có ở lâu đến thế đâu... nhưng cũng cảm ơn anh!"\

`　Tôi đã tính tới chuyện mang cho em ấy Nước ép Sợi đay đỏ 100%, nhưng lại thôi, sợ phải lặp lại ác mộng hôm qua.@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0140.ogg"`　"A, còn tiền..."@
br
dwave 0,"dat\voice\1_0268.ogg"`　"Đừng để ý. @
dwave 0,"dat\voice\1_0269.ogg"`Anh mua không báo trước mà. @
dwave 0,"dat\voice\1_0270.ogg"`Em cứ uống đi."@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0141.ogg"`　"Vâng! @
dwave 0,"dat\voice\2_0142.ogg"`Vậy thì, em xin phép uống ạ!"\

`　Em bật nắp lon và hớp khe khẽ.@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0143.ogg"`　"Haa... ngon quá."@
br
`　Ánh dương xuyên qua kẽ tóc lên vầng trán lấm tấm mồ hôi và làm rạng rỡ thêm nụ cười của em.\

`　Tôi tưởng cô bé sẽ uống hẳn một ngụm kia, cử chỉ nữ tính ấy làm tôi thoáng ngây người ra.@
br
`　"..."@
br
`　―Cốc.@
br
`　Tôi tự gõ vào đầu mình.@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0144.ogg"`　"Anh làm gì đấy ạ?"@
br
dwave 0,"dat\voice\1_0271.ogg"`　"Không, không có gì."@
br
`　Tôi cũng tự thấy sốc khi bị em làm cho xốn xang... từ hồi em còn đứng trên sân khấu hôm qua kia.\

mov %281
mov %286,1:bgm "dat\music\bgm\bgm01.mp3";	おさげ

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0145.ogg"`　"Toshiki-senpai nè, sao anh lại chọn học ở trường cao trung này thế?"@
br
dwave 0,"dat\voice\1_0272.ogg"`　"Vì lời hứa."@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0146.ogg"`　"Lời hứa?"@
br
dwave 0,"dat\voice\1_0273.ogg"`　"Ừ. @
dwave 0,"dat\voice\1_0274.ogg"`Anh đã hứa. @
dwave 0,"dat\voice\1_0275.ogg"`Từ lâu lắm rồi, với mối tình đầu của mình. @
br
dwave 0,"dat\voice\1_0276.ogg"`Chà, nói là tình đầu vậy thôi, chứ thật ra bọn anh chỉ chơi đùa cùng nhau trong một mùa hè. @
dwave 0,"dat\voice\1_0277.ogg"`Và anh đã hứa với cô ấy như vậy."\

dwave 0,"dat\voice\2_0147.ogg"`　"Vậy sau đó... anh có đi tìm chị ấy không?"@
br
dwave 0,"dat\voice\1_0278.ogg"`　"Hahaha. @
dwave 0,"dat\voice\1_0279.ogg"`Không, đến cái tên anh còn không nhớ, nói chi là hình dáng cô ấy. @
dwave 0,"dat\voice\1_0280.ogg"`Nên anh chẳng thể nào tìm ra cô ấy được."@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0148.ogg"`　"Tuy Toshiki-senpai là người thực dụng, nhưng có lúc anh cũng tình cảm thật đấy."\

dwave 0,"dat\voice\1_0281.ogg"`　"Mà, quá khứ vẫn là quá khứ, chắc cô ấy cũng quên anh luôn rồi."@
br
dwave 0,"dat\voice\2_0149.ogg"`　"Không có đâu. @
dwave 0,"dat\voice\2_0150.ogg"`Toshiki-senpai không nghĩ là thật khó để quên một người như anh sao?"@
br
dwave 0,"dat\voice\1_0282.ogg"`　"Đó là... @
dwave 0,"dat\voice\1_0283.ogg"`lời khen à?"@
br
dwave 0,"dat\voice\2_0151.ogg"`　"Vâng, là lời khen."\

dwave 0,"dat\voice\1_0284.ogg"`　"Bọn anh học ở hai nơi khác nhau. @
dwave 0,"dat\voice\1_0285.ogg"`Từng có thời gian bọn anh cùng nhau đi trên một con đường đến trường, nhưng cô ấy phải quay về sống ở nhà ông bà mà không có sự lựa chọn."\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0152.ogg"`　"Toshiki-senpai, đến bây giờ, anh vẫn còn thích chị ấy, phải không?"@
br
dwave 0,"dat\voice\1_0286.ogg"`　"Sao lại hỏi vậy?"@
br
dwave 0,"dat\voice\2_0153.ogg"`　"Em hỏi chơi thôi."@
br
dwave 0,"dat\voice\1_0287.ogg"`　"Mà, ai biết được. @
dwave 0,"dat\voice\1_0288.ogg"`Nếu cô gái ấy thật sự nhớ tới lời hứa và tự nhiên bọn anh được gặp lại nhau..."@
br
dwave 0,"dat\voice\2_0154.ogg"`　"Nếu tự nhiên hai anh chị gặp lại nhau?"\

dwave 0,"dat\voice\1_0289.ogg"`　"...ế, sao anh phải nói cho em chuyện này cơ chứ?!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0155.ogg"`　"Hể-ể?! @
dwave 0,"dat\voice\2_0156.ogg"`Là Toshiki-senpai khơi chuyện này ra trước cơ mà?!"@
br
dwave 0,"dat\voice\1_0290.ogg"`　"Thôi đi thôi đi. @
dwave 0,"dat\voice\1_0291.ogg"`Dừng ở đây được rồi."@
br
`　Tôi mở lon coca vừa mua và nốc cạn hết một nửa trong sự bối rối.\

dwave 0,"dat\voice\1_0292.ogg"`　"Dù vậy thì, thật tốt làm sao nếu giấc mơ mùa hạ ấy mãi tồn tại như một ký ức tuyệt đẹp."@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0157.ogg"`　"Ua... senpai, nghe hoa mỹ thật đấy. Chẳng giống anh gì cả."@
br
dwave 0,"dat\voice\1_0293.ogg"`　"Đó là... @
dwave 0,"dat\voice\1_0294.ogg"`lời khen à?"@
br
change_cc "おさげ113ふふーん"
dwave 0,"dat\voice\2_0158.ogg"`　"Vâng, là lời khen."\

dwave 0,"dat\voice\1_0295.ogg"`　"Rõ ràng em đang chọc anh còn gì?"@
br
`　Tôi lén luồn tay ra sau cô bé và giật hai bím tóc.@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0159.ogg"`　"Đa-đau quá! @
dwave 0,"dat\voice\2_0160.ogg"`Em xin lỗi mà!"\

`　Tôi thả ra và em ấy khuỵu gối xuống, ngước đôi mắt ngân ngấn lên nhìn tôi.@
br
dwave 0,"dat\voice\2_0161.ogg"`　"Ưưư~ @
dwave 0,"dat\voice\2_0162.ogg"`Toshiki-senpai, anh xấu tính quá đi!"@
br
`　Em đưa tay phải lên vuốt bím tóc của mình.\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0163.ogg"`　"Toshiki-senpai, ngày mai anh có dự định gì không?"@
br
dwave 0,"dat\voice\1_0296.ogg"`　"Dự định á?"@
br
`　Vừa ngồi dậy, em đưa miệng hớp thêm một ngụm nước cam ép. Trông giống em đang cố uống làm sao để không bị đổ ra ngoài.\

change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0164.ogg"`　"Vâng. @
dwave 0,"dat\voice\2_0165.ogg"`Nếu anh không phiền, anh có muốn đi chơi lễ hội với em không?"@
br
`　Cô bé đưa lon nước lên miệng lần nữa và vội uống tiếp một ngụm.@
br
dwave 0,"dat\voice\2_0166.ogg"`　"Hay là anh đã có kế hoạch gì khác rồi?"@
br
dwave 0,"dat\voice\1_0297.ogg"`　"Không, không có."\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0167.ogg"`　"Toshiki-senpai, anh không có cô gái nào hay ai đó để đi cùng ư?"@
br
dwave 0,"dat\voice\1_0298.ogg"`　"Ừ, không. @
dwave 0,"dat\voice\1_0299.ogg"`Thật ra anh vẫn muốn được đi cùng cô bạn đã nói ban nãy. @
dwave 0,"dat\voice\1_0300.ogg"`Nhưng chuyện đó sẽ chẳng xảy ra khi anh vẫn còn học cao trung."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0168.ogg"`　"Oaa, @
dwave 0,"dat\voice\2_0169.ogg"`anh trong sáng hơn vẻ bề ngoài đó."\

dwave 0,"dat\voice\1_0301.ogg"`　"Vẻ bề ngoài của anh được đánh giá cao phết nhỉ? @
dwave 0,"dat\voice\1_0302.ogg"`Mà nói thật, anh chưa từng có mối quan hệ với cô gái nào trước đây cả."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0170.ogg"`　"Cô đơn ghê hen."@
br
dwave 0,"dat\voice\1_0303.ogg"`　"Chứ em thì không chắc?"\

dwave 0,"dat\voice\2_0171.ogg"`　"Em í hả? @
dwave 0,"dat\voice\2_0172.ogg"`Em VỪA mời anh đi chơi hội với em ngày mai. Trông em giống kiểu người đó lắm hử?"@
br
dwave 0,"dat\voice\1_0304.ogg"`　"Không, anh có nghĩ thế đâu."@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0173.ogg"`　"Xấu tính quá!"@
br
`　Em ấy đưa tay lên huých vào ngực tôi.\

dwave 0,"dat\voice\1_0305.ogg"`　"Thôi nào, thôi nào, trời đã nóng lắm rồi."@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0174.ogg"`　"Ưư..."@
br
`　Tôi đặt bàn tay lên đầu em và chặn lại, không để em có cơ hội đánh tôi lần nữa.\

dwave 0,"dat\voice\1_0306.ogg"`　"Nguyên sáng mai anh phải làm yakisoba với Reiji rồi. @
dwave 0,"dat\voice\1_0307.ogg"`Nhưng tới chiều thì rảnh."@
br
`　Đúng là tôi chẳng có dự định gì đặc biệt. Và tôi nghĩ cũng thú vị khi đi dạo lễ hội với một cô gái như em.@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0175.ogg"`　"Thật ạ? @
dwave 0,"dat\voice\2_0176.ogg"`A, vậy tầm trưa mai em sẽ ghé qua lớp anh để ăn yakisoba nhé."\

dwave 0,"dat\voice\1_0308.ogg"`　"Thế thì để Reiji nấu cho em. @
dwave 0,"dat\voice\1_0309.ogg"`Cậu ấy làm yakisoba ngon lắm."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0177.ogg"`　"Ưnn. @
dwave 0,"dat\voice\2_0178.ogg"`Em sẽ chớp lấy cơ hội và ăn thử yakisoba của anh cơ."@
br
dwave 0,"dat\voice\1_0310.ogg"`　"Cơ hội á?"@
br
change_cc "おさげ113ふふーん"
dwave 0,"dat\voice\2_0179.ogg"`　"Lỡ mà bị gì, em sẽ đòi bồi thường đấy."@
br
dwave 0,"dat\voice\1_0311.ogg"`　"Ựa! @
dwave 0,"dat\voice\1_0312.ogg"`Khách hàng gì mà khó tính thế."\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0180.ogg"`　*khúc khích*  @
dwave 0,"dat\voice\2_0181.ogg"`"Em chỉ đùa thôi, nhưng Toshiki-senpai làm cho em ăn, nhé?"@
br
dwave 0,"dat\voice\1_0313.ogg"`　"Nếu anh rảnh tay."@
br
dwave 0,"dat\voice\2_0182.ogg"`　"Vâng! @
dwave 0,"dat\voice\2_0183.ogg"`Bây giờ em còn mong đợi một chuyện nữa."@
br
dwave 0,"dat\voice\1_0314.ogg"`　"Chuyện gì thế?"@
br
dwave 0,"dat\voice\2_0184.ogg"`　"Em rất mong đến đêm lửa trại bế mạc!"\

dwave 0,"dat\voice\1_0315.ogg"`　"Chẳng biết tại sao ai cũng háo hức chờ nó thế nhỉ?"@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0185.ogg"`　"Đúng vậy ha. @
dwave 0,"dat\voice\2_0186.ogg"`À... anh đi cả lửa trại với em nữa nhé?"\

dwave 0,"dat\voice\1_0316.ogg"`　"Ẹc. @
dwave 0,"dat\voice\1_0317.ogg"`Anh không thích trò đó cho lắm. @
dwave 0,"dat\voice\1_0318.ogg"`...kiểu như, mình sẽ nhảy cùng nhau, hoặc với cả trường ấy hả? @
dwave 0,"dat\voice\1_0319.ogg"`Thế thì em nhảy với mấy bạn của em cũng được vậy."@
br
dwave 0,"dat\voice\2_0187.ogg"`　"Hể-ể... @
dwave 0,"dat\voice\2_0188.ogg"`Anh đừng có nói thế chứ."@
br
dwave 0,"dat\voice\1_0320.ogg"`　"Ừmmm, @
dwave 0,"dat\voice\1_0321.ogg"`chỉ là anh cảm thấy vậy thôi."\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0189.ogg"`　"Vì hai đứa mình đều "độc thân", nên anh có muốn ngày mai chúng mình đóng như một cặp đôi không?"@
br
dwave 0,"dat\voice\1_0322.ogg"`　"Em đang nói cái gì thế?"@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0190.ogg"`　"Anh không thích ạ?"@
br
dwave 0,"dat\voice\1_0323.ogg"`　"Không hẳn, nhưng ý em là nắm tay hay gì gì đó hả? @
dwave 0,"dat\voice\1_0324.ogg"`Thế thì ngại chết."\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0191.ogg"`　"Chúng mình đâu cần phải nắm tay. Chỉ cần quàng tay vào nhau là được mà."@
br
dwave 0,"dat\voice\1_0325.ogg"`　"Thế còn tệ hơn."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0192.ogg"`　"Anh ích kỉ ghê đó."@
br
dwave 0,"dat\voice\1_0326.ogg"`　"Gì chứ?!"\

dwave 0,"dat\voice\2_0193.ogg"`　"Nhưng thế chẳng phải rất tuyệt sao? @
dwave 0,"dat\voice\2_0194.ogg"`Dù sao thì, đây LÀ lễ hội trường. Anh không muốn thấy vui sao?"@
br
dwave 0,"dat\voice\1_0327.ogg"`　"Không phải là anh không muốn."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0195.ogg"`　"Vậy quyết định thế nhé!"@
br
dwave 0,"dat\voice\1_0328.ogg"`　"Nhưng nếu đi với Tóc bím thì..."@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0196.ogg"`　"Em không đủ tốt sao, @
dwave 0,"dat\voice\2_0197.ogg"`Toshiki-senpai?"@
br
`　...bên dưới khuôn mặt đang mỉm cười đầy ẩn ý kia, chắc chắn tôi cảm thấy sát khí của em ấy.\

dwave 0,"dat\voice\1_0329.ogg"`　"Không phải. @
dwave 0,"dat\voice\1_0330.ogg"`Dành cả ngày hội trường làm bạn trai của em cứ như kiểu giấc mơ thành hiện thực ấy."@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0198.ogg"`　"Anh lại lờ đi câu em hỏi rồi."@
br
dwave 0,"dat\voice\1_0331.ogg"`　"Mà, chỉ là anh cảm thấy vậy thôi."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0199.ogg"`　"Vậy thì, đây là một lời hứa nhé."@
br
`　Cô bé mỉm cười, hai tay vẫn cầm lon nước cam ép. Nhìn em như vậy, tôi thiết nghĩ lời đề nghị ngốc xít của em cũng không tệ cho lắm.\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0200.ogg"`　"A, còn một tiếng nữa là lễ khai mạc bắt đầu rồi nhỉ?"@
br
`　Tôi nhìn vào đồng hồ bên tay trái, kiểm tra giờ. Mặt trời đã lặn xuống chân trời. Ánh dương nhuộm đất trời trong sắc đỏ thẫm, phản chiếu trên mặt biển tựa như tấm gương ánh sáng.@
br
dwave 0,"dat\voice\2_0201.ogg"`　"Ánh chiều tà nhìn từ đây đẹp thật ha."\

`　Hơi nghiêng người, em đưa mắt nhìn đường chân trời. Đôi mắt hay buồn của em dường như có chút tươi hơn.@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0202.ogg"`　"Hồi còn bé, em từng tin rằng khi mặt trời lặn xuống dưới biển, nó sẽ huýt gió một tiếng."@
br
dwave 0,"dat\voice\1_0332.ogg"`　"Này, này. Cái đó là thiên tai đấy."\

`　Suốt một hồi lâu, chúng tôi giết thời gian bằng cách nói những chuyện không đâu vào đâu. Bóng tối trải dần, và ngọn gió biển cũng có chút lạnh hơn.\

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
dwavestop 15:mov %22,0
change_b "学園祭教室昼"

`　Tôi bắt đầu lo không biết lớp mình làm ăn ra sao rồi, nên chúng tôi đi về hai hướng khác nhau.\

`　Công tác trang trí phòng cũng xong gần hết. Dự định là làm cửa tiệm yakisoba, nhưng chẳng hiểu sao lại thành ra nhà hàng gia đình. Bốn chiếc bàn học kê sát lại và được phủ lên tấm khăn trải bằng ren trắng.\

`　Trên đó đặt một bảng thực đơn nước giải khát. Khi khách hàng yêu cầu thức uống, sẽ có người đến máy bán hàng tự động mua lon nước, rồi đổ vào trong ly tiện lợi. Tôi rên ngán khi thấy Nước ép Sợi đay đỏ 100% cũng có mặt trên menu. Không những thế, chữ "Quản Lí Khuyên Dùng" được viết ngay sát đó.\

dwave 0,"dat\voice\1_0333.ogg"`　"...quản lí là ai vậy trời?"\

`　Khi tới gian bếp, tôi phát hiện ra chính xác là mình đã quên béng đi mất.\

change_cc "うに413真面目"
dwave 0,"dat\voice\5_0116.ogg"`　"Chờ ông nãy giờ đó,  @
dwave 0,"dat\voice\5_0117.ogg"`Toshiki!"@
br
dwave 0,"dat\voice\1_0334.ogg"`　"Ua!!"@
br
`　Reiji đột nhiên nhảy ra từ góc mù trong mắt tôi.\

dwave 0,"dat\voice\1_0335.ogg"`　"Ông chui ra từ chỗ quái nào thế?!"@
br
dwave 0,"dat\voice\5_0118.ogg"`　"Không quan trọng! @
dwave 0,"dat\voice\5_0119.ogg"`Còn ông trốn đi đâu, dám bỏ việc sơ chế thế hả?!"@
br
dwave 0,"dat\voice\1_0336.ogg"`　"À không, mà, ahaha..."\

dwave 0,"dat\voice\5_0120.ogg"`　"Chẳng có gì đáng cười cả! @
dwave 0,"dat\voice\5_0121.ogg"`Coi kìa, vẫn còn chút ít thời gian trước khi lễ hội bắt đầu, tranh thủ từng giây từng phút đi!"@
br
dwave 0,"dat\voice\1_0337.ogg"`　"Gì chứ?! @
dwave 0,"dat\voice\1_0338.ogg"`Đáng lẽ ông đã có thể thái được mớ rau đó thay vì trốn canh tôi!"@
br
dwave 0,"dat\voice\5_0122.ogg"`　"Chỉ là để kiểm tra xem ông có trụ nổi đến ngày mai không! @
br
dwave 0,"dat\voice\5_0123.ogg"`Xăng tay lên và làm việc ngay đi."@
br
dwave 0,"dat\voice\1_0339.ogg"`　"Dào ôi..."\

`　...nói vậy chứ cuối cùng, nó cũng cầm con dao lên và làm chung luôn.@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0124.ogg"`　"Nãy giờ ông ở chỗ Mizuna-chan ấy hả?"@
br
dwave 0,"dat\voice\1_0340.ogg"`　"Hửm? @
dwave 0,"dat\voice\1_0341.ogg"`Chắc thế."@
br
`　Reiji thái hành với tốc độ tên lửa. Sao nó làm được thế mà không bị chảy nước mắt nhỉ?\

change_cc "うに412にしし"
dwave 0,"dat\voice\5_0125.ogg"`　"Cô bé đó dễ thương phết. @
dwave 0,"dat\voice\5_0126.ogg"`Tính tình cũng tốt nữa. @
dwave 0,"dat\voice\5_0127.ogg"`Cơ mà, @
dwave 0,"dat\voice\5_0128.ogg"`chắc là có bạn trai rồi."@
br
dwave 0,"dat\voice\1_0342.ogg"`　"Khỏi lo đi. @
dwave 0,"dat\voice\1_0343.ogg"`Bạn trai em ấy chỉ giới hạn đến ngày mai thôi."@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0129.ogg"`　"Là sao? @
dwave 0,"dat\voice\5_0130.ogg"`Tôi không hiểu."\

gosub *windowoff
wait 1000
bg "dat\bg\bg09_2.jpg",%110
gosub *windowon

`　Chẳng hiểu sao tôi làm xong vừa kịp trước sáu giờ và đi đến nhà thể chất. Quả thật có rất nhiều người, nhưng không chật cứng đến nỗi tôi không qua được. Dòng người cứ đẩy và tiến lên phía trước.\

`　Thầy hiệu trưởng đã đứng sẵn trên sân khấu, đang đọc bài diễn thuyết về tầm quan trọng của lễ hội trường.@
br
`　Lát sau, bài nói khai mạc kết thúc, và các sự kiện lễ hội được bắt đầu.\

`　Các tiết mục diễn ra như kế hoạch. Tôi tưởng diễn viên hài có vẻ lạnh lùng, nhưng anh chàng ấy lại hài hước đến bất ngờ làm cả nhà thể chất rung chuyển trong tiếng cười. Màn ảo thuật thì quá đơn giản, nào là biến ra hoa, chim bồ câu, cún con, vân vân. Bọn họ cũng không quên màn biến-thỏ-từ-trong-mũ quen thuộc, và khán giả cũng cười hưởng ứng, mọi người đều chăm chú theo dõi.\

change_b "体育館夜"

`　Chẳng mấy chốc, các tiết mục sau lễ khai mạc đã qua phân nửa, một ban nhạc nổi tiếng hâm nóng khán phòng bằng những ca khúc bắt chước không-nổi-tiếng-lắm và vài bài khác.\

change_cc "うに411通常"
dwave 0,"dat\voice\5_0131.ogg"`　"Chà, tôi nghĩ phải đi chuẩn bị rồi."@
br
dwave 0,"dat\voice\1_0344.ogg"`　"Ờ, chúc ông may mắn nhé!"\
change_d "中消去"

`　Rồi Reiji đi mất, một ban nhạc khác tiếp quản sân khấu. Ban nhạc của Reiji sẽ diễn ngay sau đó. Vì còn chút thời gian, tôi đi vào nhà vệ sinh gần nhà thể chất, nhưng khá nhiều người đang đứng chờ ngoài đó. Có hơi bí bách, nên tôi đành bỏ sang nhà vệ sinh khác ở xa hơn.\

change_b "廊下夜"


`　Bầu trời bây giờ đã sụp tối hẳn. Khi muộn như thế này, bình thường tôi đã không ở đây, nhưng tôi lại rất thích hội diễn. Hành lang tối đen được chiếu sáng bởi những bóng đèn huỳnh quang. Một cảm giác lạ lẫm nổi lên trong tôi khi đặt chân đến nơi này.\

`　Sau một hồi trấn an bản thân, tôi đi ngược lại con đường vừa vào và phát hiện ra một cô gái để bím tóc đang bước đi như chẳng hề để tâm gì đến thế gian này.\

dwave 0,"dat\voice\1_0345.ogg"`　"Tóc bím!"@
br
`　Tôi không có ý hét to, nhưng giữa hành lang đêm tối vắng lặng này, giọng của tôi vang lại rõ mồn một.@
br
dwave 0,"dat\voice\2_0203.ogg"`　"A, Toshiki-senpai."\

mov %281
mov %286,1:bgm "dat\music\bgm\bgm01.mp3";	おさげ

`　Em quay người lại ngay. Bím tóc suýt chút nữa là vụt vào mặt, nhưng em ấy điều khiển chúng bằng động tác lắc cổ đầy nghệ thuật.@
br
dwave 0,"dat\voice\1_0346.ogg"`　"Em nên được đặt tên là "Sư phụ Tóc bím"!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0204.ogg"`　"Đây gọi là cuộc hội ngộ bất ngờ sao ta?"\

dwave 0,"dat\voice\1_0347.ogg"`　"Có phải sự thật là, mỗi bím tóc ấy đều có sức sống riêng. Chúng tự co giãn và đủ mạnh để xuyên thủng luôn kim loại, nhể?"@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0205.ogg"`　"Anh nghĩ em là ai thế?"@
br
dwave 0,"dat\voice\1_0348.ogg"`　"Thì nhân vật nhập vai trong game chiến đấu."@
br
dwave 0,"dat\voice\2_0206.ogg"`　"Thưa không ạ. @
dwave 0,"dat\voice\2_0207.ogg"`Đùa nhàm quá."\

dwave 0,"dat\voice\1_0349.ogg"`　"Vậy, em muốn là gì cơ?"@
br
change_cc "おさげ113ふふーん"
dwave 0,"dat\voice\2_0208.ogg"`　"Một cô gái bình thường với những mộng mơ."@
br
dwave 0,"dat\voice\1_0350.ogg"`　"Ngốc thật."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0209.ogg"`　"Thế thì sao? @
dwave 0,"dat\voice\2_0210.ogg"`Bình thường là điều khó trở thành nhất đấy."@
br
dwave 0,"dat\voice\1_0351.ogg"`　"Chắc vậy. @
dwave 0,"dat\voice\1_0352.ogg"`Đối với em hẳn là khó khăn lắm hả?"@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0211.ogg"`　"Em không nghĩ anh có quyền nói như thế về người khác đâu."@
br
dwave 0,"dat\voice\1_0353.ogg"`　"Đằng ấy là gì vậy nhỉ?"@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0212.ogg"`　"Cái gì cơ-ơ?"\

`　Trong lúc chúng tôi đang bàn cãi, bên nhà thể chất dần dần ồn lên. Có vẻ ban nhạc tiếp theo đã bắt đầu rồi. Em ấy cũng nhận ra.@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0213.ogg"`　"BROY sắp biểu diễn rồi anh ha?"@
br
dwave 0,"dat\voice\1_0354.ogg"`　"Phải rồi. @
dwave 0,"dat\voice\1_0355.ogg"`Reiji hào hứng lắm đấy. Chúng ta cũng qua xem cậu ta đi."@
br
dwave 0,"dat\voice\2_0214.ogg"`　"Vâng!"\

dwave 0,"dat\voice\1_0356.ogg"`　"Cơ mà... anh hỏi em cái này được chứ?"@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0215.ogg"`　"Gì vậy ạ?"@
br
dwave 0,"dat\voice\1_0357.ogg"`　"Em không có nhiều bạn, nhỉ?"@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0216.ogg"`　"S... sao anh lại hỏi thế chứ?"@
br
dwave 0,"dat\voice\1_0358.ogg"`　"Em lúc nào cũng có một mình, đúng không?"@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0217.ogg"`　"Toshiki-senpai, anh cũng toàn ở một mình đấy thôi!"\

dwave 0,"dat\voice\1_0359.ogg"`　"Chỉ là tình cờ thôi!"@
br
dwave 0,"dat\voice\2_0218.ogg"`　"Thế thì em cũng vậy! @
dwave 0,"dat\voice\2_0219.ogg"`Và em cũng ở gần trường nữa, em nói anh nghe rồi mà? @
dwave 0,"dat\voice\2_0220.ogg"`Bạn cũ của em cũng nhiều lắm đấy."@
br
dwave 0,"dat\voice\1_0360.ogg"`　"Vậy sao giờ em không đi cùng với họ?"@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0221.ogg"`　"Là vì... em thích đi một mình, vậy thôi."@
br
dwave 0,"dat\voice\1_0361.ogg"`　"Ui giời... u ám quá đi thôi."@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0222.ogg"`　"Anh cũng thế! Anh cũng không thích đi với mọi người chứ gì?"\

`　Em nhìn tôi và cười khẩy.@
br
change_cc "おさげ113ふふーん"
dwave 0,"dat\voice\2_0223.ogg"`　"Khi anh nói chuyện với Reiji-senpai, anh đâu có nói với mấy thành viên khác của BROY. Anh còn không thèm để mắt tới bọn họ nữa."\

`　"Thấy chưa?", giống như em ấy có ý nói như thế, chỉ tay vào mắt tôi. Tôi phải thừa nhận là em nói đúng-phân-nửa. Không phải là tôi ghét gì mọi người, chỉ là tôi không giao tiếp với họ trừ phi có chuyện gì cần thiết.\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0224.ogg"`　"Thế em đúng, hay sai nào?"@
br
dwave 0,"dat\voice\1_0362.ogg"`　"...ai biết."@
br
`　Nhận thấy tôi có chút bất ngờ khi trả lời, em nở nụ cười mãn nguyện.\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0225.ogg"`　"Hai đứa mình, giống nhau thật ha."@
br
dwave 0,"dat\voice\1_0363.ogg"`　"Dù sao, anh cũng không chết vì đeo bím tóc đâu."@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0226.ogg"`　"Bím tóc thì liên quan gì cơ chứ?!"@
br
dwave 0,"dat\voice\1_0364.ogg"`　"Yên lặng nào, Tóc bím."@
br
dwave 0,"dat\voice\2_0227.ogg"`　"Còn lâu."\

dwave 0,"dat\voice\1_0365.ogg"`　"Chibi."@
br
dwave 0,"dat\voice\2_0228.ogg"`　"Chibi không có nghĩa là em nhỏ bé đâu đó."@
br
dwave 0,"dat\voice\1_0366.ogg"`　"Mặt-búng-sữa."@
br
dwave 0,"dat\voice\2_0229.ogg"`　"Càng trẻ trung càng tuyệt còn gì?"@
br
dwave 0,"dat\voice\1_0367.ogg"`　"Đồ-bốn-mắt, mặt-tàn-nhang, mèo-cái."@
br
change_cc "おさげ122なんですかー"
dwave 0,"dat\voice\2_0230.ogg"`　"Chả đúng cái nào hết! @
dwave 0,"dat\voice\2_0231.ogg"`Mà mèo- gì cơ chứ?!"\

change_d "中消去"
`　Cãi nhau một hồi, chúng tôi cũng tới nhà thể chất. Điệu rock len lỏi qua cả bên cửa.\
gosub *windowoff
change_cl "うに413真面目"
change_cr "おさげ111通常"
gosub *windowon
dwave 0,"dat\voice\5_0132.ogg"`　"Toshiki! @
dwave 0,"dat\voice\5_0133.ogg"`Mizuna-chan đi với ông à? @
dwave 0,"dat\voice\5_0134.ogg"`Tạ ơn trời. @
dwave 0,"dat\voice\5_0135.ogg"`Anh đang tìm em đây..."@
br
`　Tự nhiên nó nhảy xổ ra từ phía sau, thở hồng hộc.@
br
dwave 0,"dat\voice\1_0368.ogg"`　"Reiji. @
dwave 0,"dat\voice\1_0369.ogg"`Chuyện gì thế? @
dwave 0,"dat\voice\1_0411.ogg"`Hội diễn thì sao?"@
br

stop

dwave 0,"dat\voice\5_0136.ogg"`　"Không còn thời gian đâu. @
dwave 0,"dat\voice\5_0137.ogg"`Kagawa xỉu rồi. Tôi vừa đưa nhỏ đến phòng y tế."@
br
dwave 0,"dat\voice\1_0370.ogg"`　"Cái gì chứ?!"\

dwave 0,"dat\voice\5_0138.ogg"`　"Hình như nhỏ bị cảm. @
dwave 0,"dat\voice\5_0139.ogg"`Nói mới nhớ, chắc hôm qua nhỏ về sớm do cảm thấy mệt, chứ không phải vì chuyện gì gấp."@
br
dwave 0,"dat\voice\1_0371.ogg"`　"Vậy buổi diễn tính sao đây? @
dwave 0,"dat\voice\1_0372.ogg"`Sắp đến giờ rồi."@
br
dwave 0,"dat\voice\5_0140.ogg"`　"Phải, đó là lý do anh khẩn thiết nhờ em chuyện này, Mizuna-chan. @
dwave 0,"dat\voice\5_0141.ogg"`Em hát cho bọn anh được không?"@
br
change_cr "おさげ114わ"
dwave 0,"dat\voice\2_0232.ogg"`　"Hể-ể?! @
dwave 0,"dat\voice\2_0233.ogg"`Em á?"\

dwave 0,"dat\voice\5_0142.ogg"`　"Hôm qua bọn anh đã nghe Mizuna-chan hát, em hát rất tuyệt trên nền nhạc của nhóm. @
dwave 0,"dat\voice\5_0143.ogg"`Chỉ một bài thôi, 'Giấc mơ mùa hạ'. @
dwave 0,"dat\voice\5_0144.ogg"`Nhờ cậy em hết!"@
br
dwave 0,"dat\voice\1_0373.ogg"`　"Nào, chờ tí đã. @
dwave 0,"dat\voice\1_0374.ogg"`Kagawa có đồng ý chưa?"\

dwave 0,"dat\voice\5_0145.ogg"`　"Rồi. @
dwave 0,"dat\voice\5_0146.ogg"`Nếu nhỏ không thể hát, tức là hủy tiết mục biểu diễn, nên đã nói cần chọn người thay thế rồi."@
br
dwave 0,"dat\voice\2_0234.ogg"`　"Nhưng mà... em không thể hát trước mặt bao nhiêu người như thế đâu."@
br
`　Khuôn mặt đầy bối rối, cô bé cắm mắt nhìn xuống. Có vẻ em đã mất hết cả dũng khí rồi.@
br
dwave 0,"dat\voice\2_1011.ogg"`　"Em sẽ cố hết sức, nhưng mà... em chẳng nhớ gì cả."@
br
dwave 0,"dat\voice\1_0375.ogg"`　"Ông có nhạc phổ hay gì không?"\

dwave 0,"dat\voice\5_0147.ogg"`　"Giờ bọn tôi chẳng còn cách nào để làm nữa, @
dwave 0,"dat\voice\5_0148.ogg"`nên chịu thôi. @
dwave 0,"dat\voice\5_0149.ogg"`Nhưng... đây là màn trình diễn cuối cùng của đêm nay. @
dwave 0,"dat\voice\5_0150.ogg"`Không những thế, đây còn là lễ hội trường cuối cùng bọn tôi được tham gia nữa, nên tôi không muốn bỏ lỡ. @
dwave 0,"dat\voice\5_0151.ogg"`Làm ơn, Mizuna-chan. @
dwave 0,"dat\voice\5_0152.ogg"`Xin em hãy lên sân khấu với bọn anh!"\

`　Mới nãy, nhà thể chất chìm vào im lặng trong thoáng chốc. Và ngay khi bản nhạc tiếp theo vang lên, em ấy khẽ nói.@
br
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ

change_cr "おさげ112笑顔"
dwave 0,"dat\voice\2_0235.ogg"`　"...được rồi ạ. @
dwave 0,"dat\voice\2_0236.ogg"`Em rất vui khi có khả năng giúp được các anh."@
br
dwave 0,"dat\voice\5_0153.ogg"`　"E-em nói thật chứ?! @
dwave 0,"dat\voice\5_0154.ogg"`Vậy nhanh chuẩn bị nào! Đi lối này!"@
br
change_cr "おさげ114わ"
dwave 0,"dat\voice\2_0237.ogg"`　"Áá~!"@
br
change_d "全消去"
`　Reiji đẩy và dẫn em đi vào nhà thể chất.@
br
dwave 0,"dat\voice\1_0376.ogg"`　"Tóc bím! @
dwave 0,"dat\voice\1_0377.ogg"`Reiji! @
dwave 0,"dat\voice\1_0378.ogg"`Cố lên nhé!"\

change_b "体育館スポットライト"

`　Tôi cũng vào trong và tìm một chỗ tốt để thưởng thức. Chen chúc trong đám đông giữa bóng tối mà chỉ có đèn sân khấu soi đường kể cũng khó. Lại thêm cái thứ nhiệt đầy bức bối trong khán phòng, khiến tôi thật sự nghi ngờ máy điều hòa có tác dụng tí gì hay không.\

`　Vừa lúc tôi kiếm ra được chỗ ngon ăn ngay trước mặt sân khấu, màn biểu diễn ca nhạc cũng vừa kết thúc. Tấm rèm kéo lại nhanh chóng và ánh đèn bật lên.\

`　...và tiếp theo, sân khấu sẽ thuộc về BROY.\

`　―Không biết Mizuna có hát bài đó ra trò không?\

`　―Không biết Reiji với mấy người trong nhóm có mắc lỗi gì không?\

`　Vừa nghĩ như thế lại vừa phải chờ đợi kiểu này khiến tôi phát cáu.\

dwave 0,"dat\voice\9_2001.ogg"`　"Xin lỗi vì đã để các bạn đợi lâu. @
dwave 0,"dat\voice\9_2002.ogg"`Màn diễn tiếp sau đây sẽ do nhóm BROY trình bày. @
dwave 0,"dat\voice\9_2003.ogg"`Họ dự định thể hiện ba ca khúc, nhưng vì một số lý do nên chỉ có thể phục vụ một bài. @
dwave 0,"dat\voice\9_2004.ogg"`Đây cũng sẽ là bài hát cuối cùng trong hội diễn năm nay của chúng ta. @
dwave 0,"dat\voice\9_2005.ogg"`Mọi người, hãy cùng thưởng thức nào."@
br
`　Màn giới thiệu kết thúc, cả nhà thể chất ngập trong bóng tối một lần nữa.\

gosub *windowoff
stop
wait 2000
gosub *windowon
`　Mọi người chìm vào im lặng, mọi sự chú ý đều đổ dồn lên sân khấu.@
br
br
`　―――…\

mov %285
mov %286,1:bgm "dat\music\bgm\bgm05.mp3";	いんすと

`　Thật chậm, một giai điệu piano buồn xướng lên, và tấm rèm từ từ kéo ra. Một số người nhận ra ca khúc nổi tiếng của Red Ai và bắt đầu cổ vũ. Bỗng chốc, mọi khán giả đều hào hứng, tỏ ra đầy hi vọng.\

change_b "ＣＧ０３＿１"

`　Một giọng hát trong vắt ngân lên đến cao độ. Chủ nhân của giọng hát ấy... mái tóc của cô gái ấy tung tăng như làn sóng nhỏ bé.@
br
`　Cô gái đang hát ca khúc buồn trên sâu khấu kia như hóa thân thành một con người khác.\

`　Cô gái ấy tiếp tục ngân nga với đôi mắt khép lại suốt bài hát. Trong khoảnh khắc dạt dào cảm xúc ấy, mọi người như chìm đắm vào giọng hát ưu buồn kia.\

`　Trước khi tôi nhận ra, ca khúc đã kết thúc mỹ mãn và mọi nỗi lo lắng của tôi vụt xóa nhòa. Nhưng tôi đã bị cô gái trên sâu khấu ấy hút hồn. Như thể chỉ cần tôi chớp mắt trong giây lát, cô gái ấy sẽ tan biến đi mất... tựa cảm giác lạc lối giữa những giấc mơ.@
br
`　Cô gái ấy thật kì diệu.\

gosub *windowoff
wait 1000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000
gosub *windowon
`　Màn trình diễn kết thúc, nhưng không một ai gây tiếng động hay di chuyển. Và rồi, cô gái ấy mở mắt lần đầu tiên và hạ thấp micro, nở một nụ cười.@
br
dwave 0,"dat\voice\2_0238.ogg"`　"Xin cảm ơn."@
br
`　Mặc dù cô gái ấy không nói vào micro, nhưng âm giọng nhỏ bé kia lạ thay vang khắp khán phòng.\

gosub *windowoff
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
wait 1000
change_b "体育館スポットライト"
gosub *windowon

`　―Rào, rào, rào...\

`　Một số người vỗ tay. Và sau đó, cả khán phòng vang dậy tiếng vỗ tay như sấm rền.@
br
`　Cô gái trên sân khấu mặt đỏ đến tận mang tai trong bầu không khí ấy. Thành viên ban nhạc trao nhau những cái đấm tay.\

`　Ngay sau đó, khán giả bên dưới liền hô hào nhóm hát tiếp.\

`　Rõ ràng cô gái ấy bối rối khi nhận yêu cầu ngoài dự kiến. Thấy vậy, Reiji chạy lại và nói gì đó. Rồi nó tập hợp các thành viên khác lại trao đổi đôi lời. Bằng cái gật đầu, bọn họ trở về vị trí cũ.\

`　Cô gái ấy cũng trở nên nghiêm túc, lấy lại tinh thần, quên đi nỗi sợ. Cô mỉm cười và nói, @
dwave 0,"dat\voice\2_0239.ogg"`"Để đáp lại yêu cầu của các bạn, mình sẽ hát thêm một bài nữa!"@
br
`　Đám đông cuồng nhiệt reo hò.\

`　Lần này, một giai điệu nhẹ nhàng ngân lên. Nhịp độ đã được tính trước lúc bàn luận. Tôi tự hỏi cô gái ấy có bất ngờ vì nhịp đã nhanh hơn không, nhưng thay vì bắt nhịp, cô ấy bắt đầu hát. Như thể khi nãy họ đã thỏa thuận với nhau.\

`　Đến giữa chừng, cô gái ấy quên lời ca trong chốc lát, thế nhưng, ca khúc kết thúc bằng niềm hân hoan cả từ ban nhạc lẫn khán giả.\

`　Và cứ thế, lễ khai mạc hội trường kết thúc tốt đẹp với tiếng reo hò náo nhiệt và tấm màn dần hạ xuống.\

gosub *windowoff
stop
wait 2000

mov %283
mov %286,1:bgm "dat\music\bgm\bgm03.mp3";	さわやか
bg "dat\bg\bg01a_3.jpg",%110
change_cr "おさげ112笑顔"
change_cl "うに411通常"
gosub *windowon

dwave 0,"dat\voice\2_0240.ogg"`　"Aaa, em đã cố gắng hết mình rồi đấy!" @
br
`　Cô bé mỉm cười và chỉnh lại bím tóc.\

`　Sau khi lễ khai mạc kết thúc, chúng tôi ghé qua phòng y tế thăm Kagawa và mời Tóc bím đến trò chuyện ở lớp.@
br
`　Các thành viên khác của BROY thì dẫn Kagawa về nhà.@
br
change_cr "おさげ111通常"
dwave 0,"dat\voice\2_0241.ogg"`　"Nhưng mà, em hát thay cho chị ấy có ổn không ạ?"\

change_cl "うに412にしし"
dwave 0,"dat\voice\5_0155.ogg"`　"Không phải lo đâu, Mizuna-chan. @
dwave 0,"dat\voice\5_0156.ogg"`Chị ấy đã cảm ơn em rồi mà? @
dwave 0,"dat\voice\5_0157.ogg"`Và đây đã phải là dấu chấm hết của BROY đâu? @
dwave 0,"dat\voice\5_0158.ogg"`Đúng thế, đây là hội diễn cuối cùng của bọn anh ở cao trung, nhưng ban nhạc bọn anh vẫn sẽ tiếp tục hoạt động. @
br
dwave 0,"dat\voice\5_0159.ogg"`Hơn nữa, em đã làm cho mọi người hứng khởi hẳn lên. @
dwave 0,"dat\voice\5_0160.ogg"`Đây là thành công vang dội đấy. @
dwave 0,"dat\voice\5_0161.ogg"`Tất cả thành viên đều cảm ơn Mizuna-chan nhiều lắm đó. @
dwave 0,"dat\voice\5_0162.ogg"`Và tất nhiên Kagawa cũng cảm thấy như thế."\

`　Reiji ngồi trên bàn, há miệng cười. Tôi không biết phải nói gì, nhưng thấy nó cứ thao thao bất tuyệt, cười khì suốt cả buổi. Tôi nghĩ điều đó đáng được gọi là thành công.@
br
dwave 0,"dat\voice\5_0163.ogg"`　"Nói thật, giọng hát của em còn dạt dào cảm xúc hơn cả Kagawa nữa đó."@
br
dwave 0,"dat\voice\2_0242.ogg"`　"Làm sao được. @
dwave 0,"dat\voice\2_0243.ogg"`Không thể đâu ạ. Nói thế chị Kagawa buồn đó."\

dwave 0,"dat\voice\1_0379.ogg"`　"Mà, đúng kiểu em thật, quên lời bài hát thứ hai luôn."@
br
change_cr "おさげ121もー"
dwave 0,"dat\voice\2_0244.ogg"`　"Biết làm sao được ạ. @
dwave 0,"dat\voice\2_0245.ogg"`Đó là ca khúc trong album đầu tay của Red Ai. @
dwave 0,"dat\voice\2_0246.ogg"`Đã lâu em không nghe nó, nên đừng trách em tại sao không nhớ!"\

change_cl "うに413真面目"
dwave 0,"dat\voice\5_0164.ogg"`　"Hể?"@
br
change_cr "おさげ111通常"
dwave 0,"dat\voice\2_0247.ogg"`　"Vâng? @
dwave 0,"dat\voice\2_0248.ogg"`Em nói gì lạ ạ?"@
br
dwave 0,"dat\voice\5_0165.ogg"`　"Mizuna-chan, bài đó nằm trong album mới ra tháng trước mà. @
br
dwave 0,"dat\voice\5_0166.ogg"`Nó vẫn còn trên bảng xếp hạng mà... anh tưởng em biết bài đó, nên mới chọn..."@
br
change_cr "おさげ143ええー"
`　"..."@
br
dwave 0,"dat\voice\1_0380.ogg"`　"Aa. @
dwave 0,"dat\voice\1_0381.ogg"`Vậy là ông VỪA nghe bài đó mới đây thôi."@
br
change_cl "うに411通常"
dwave 0,"dat\voice\5_0167.ogg"`　"Ờ, ÔNG cũng thế thôi."\

dwave 0,"dat\voice\1_0382.ogg"`　"Gì đấy? @
dwave 0,"dat\voice\1_0383.ogg"`Tôi đâu có hứng thú với Red Ai."@
br
dwave 0,"dat\voice\5_0168.ogg"`　"Ít ra ông cũng nên biết đã bán ra CD nào chứ."@
br
dwave 0,"dat\voice\2_0249.ogg"`　"A, ưm, dạo này em không mua CD nào cả. Cho nên..."@
br
dwave 0,"dat\voice\1_0384.ogg"`　"Nhưng có thể hát bài đó như thế... @
dwave 0,"dat\voice\1_0385.ogg"`Em tuyệt thật đó, Tóc bím à."\

`　Tôi giật nhẹ hai bím tóc em.@
br
change_cr "おさげ121もー"
dwave 0,"dat\voice\2_0250.ogg"`　"Đau quá đi! @
dwave 0,"dat\voice\2_0251.ogg"`Anh làm thế chi vậy hả?"@
br
`　Đã gần mười giờ. Mấy thầy cô bắt đầu đi kiểm tra, yêu cầu học sinh về nhà.\

change_cl "うに412にしし"
dwave 0,"dat\voice\5_0169.ogg"`　"Mà, hãy cố gắng hết mình trong ngày hội trường cuối cùng nhé- giống như chúng ta làm hôm nay vậy!"@
br
dwave 0,"dat\voice\1_0386.ogg"`　"Tóc bím vẫn còn một năm nữa cơ mà."@
br
change_cr "おさげ141通常"
dwave 0,"dat\voice\2_0252.ogg"`　"Ể... a, nhưng đây là lần cuối của các anh mà, senpai."@
br
dwave 0,"dat\voice\1_0387.ogg"`　"Không đâu, vậy là em chưa biết rồi. @
dwave 0,"dat\voice\1_0388.ogg"`Với tên Reiji này, cậu ta chắc phải đúp lớp thêm năm nữa đấy."@
br
dwave 0,"dat\voice\5_0170.ogg"`　"Ông nói cái quái gì thế? @
dwave 0,"dat\voice\5_0171.ogg"`Ông cũng chung tình cảnh với tôi thôi."@
br
dwave 0,"dat\voice\1_0389.ogg"`　"Nói gì đấy? @
dwave 0,"dat\voice\1_0390.ogg"`Ông chắc chắn phải tốn nửa kì nghỉ để đi vô trường học hè đấy!"@
br
change_cl "うに411通常"
dwave 0,"dat\voice\5_0172.ogg"`　"Đừng có nhắc lại chứ..."\

`　Reiji chùng người xuống trên bàn. Tóc bím nhìn chúng tôi trò chuyện và cứ mỉm cười mãi, nhưng tôi vẫn nhận thấy nỗi buồn trong đôi mắt em. Đôi mắt ấy cứ lẩn quẩn nhìn ra cửa rồi lại nhìn vào trong. Tôi cứ tưởng giáo viên tới nên quay lại nhìn, nhưng không, là con mèo trắng ở đó, nhìn thẳng vào chúng tôi. Và một lần nữa, nó lại ngặm thứ gì đó trong miệng.\

change_cr "おさげ114わ"
dwave 0,"dat\voice\2_0253.ogg"`　"A, Milk. @
dwave 0,"dat\voice\2_0254.ogg"`Chùm chìa khóa của chị!"@
br
`　Em ấy tiến lại gần con mèo.@
br
`　Thứ con mèo ngậm trong miệng là móc khóa hình người tuyết - đã lỗi thời.\

dwave 0,"dat\voice\1_0391.ogg"`　"Ơ kìa?"@
br
`　Đáng lẽ đây LÀ lần đầu tiên tôi thấy nó, nhưng sao tôi lại có cảm giác mơ hồ quen thuộc.@
br
`　Tóc bím với tay tới, nhưng con mèo nhảy ra khỏi tầm và chạy biến.\

change_cr "おさげ111通常"
dwave 0,"dat\voice\2_0255.ogg"`　"A, em xin lỗi. @
dwave 0,"dat\voice\2_0256.ogg"`Em định về nhà, nhưng chắc phải bắt con mèo kia trước đã."@
br
change_d "右消去"
`　Nói xong, em chạy về hướng con mèo vừa lẩn mất.\

dwave 0,"dat\voice\5_0173.ogg"`　"Mizuna-chan đúng là lạ thật, ông nhỉ?"@
br
dwave 0,"dat\voice\1_0392.ogg"`　"Ông mới nhận ra à?"@
br
dwave 0,"dat\voice\5_0174.ogg"`　"Kiểu như ánh mắt cô bé cô đơn sao ấy."\

dwave 0,"dat\voice\1_0393.ogg"`　"...Tôi nghĩ từ đầu em ấy đã như thế rồi. @
dwave 0,"dat\voice\1_0394.ogg"`Em ấy nói là thích được ở một mình."@
br
dwave 0,"dat\voice\5_0175.ogg"`　"Thế cơ? @
dwave 0,"dat\voice\5_0176.ogg"`Hai người có vẻ giống nhau đấy."@
br
dwave 0,"dat\voice\1_0395.ogg"`　"Gì hả? @
dwave 0,"dat\voice\1_0396.ogg"`Giống nhau à?"@
br
dwave 0,"dat\voice\5_0177.ogg"`　"Ông không thích giao tiếp với mọi người nếu không cần thiết, đúng không? @
dwave 0,"dat\voice\5_0178.ogg"`Ông không thích hòa nhập với mọi người, em ấy thì thích ở một mình. @
dwave 0,"dat\voice\5_0179.ogg"`Tôi nghĩ hai người hợp nhau quá đi ấy chứ."\

dwave 0,"dat\voice\1_0397.ogg"`　"Không thể tin là ông lại gán ghép bọn tôi kiểu đó."@
br
change_cl "うに412にしし"
dwave 0,"dat\voice\5_0180.ogg"`　"Thế hả? @
dwave 0,"dat\voice\5_0181.ogg"`Tôi nghĩ hai người hợp nhau phết đấy."@
br
dwave 0,"dat\voice\1_0398.ogg"`　"...thôi nào, bớt nói mấy thứ ngớ ngẩn đó rồi về nhà đi."@
br
dwave 0,"dat\voice\5_0182.ogg"`　"Ôi dào, ngại ngùng chi thế. @
dwave 0,"dat\voice\5_0183.ogg"`Tôi, Nishihara Reiji, @
dwave 0,"dat\voice\5_0184.ogg"`sẵn sàng giúp đỡ ông hết mình trên con đường tình duyên!"@
br
dwave 0,"dat\voice\1_0399.ogg"`　"Lo cho thân ông trước đi."\

change_cl "うに411通常"
dwave 0,"dat\voice\5_0185.ogg"`　"Tôi thì có làm sao. @
dwave 0,"dat\voice\5_0186.ogg"`Toshiki, ông nên thôi theo đuổi cái mối tình đầu đó đi. @
dwave 0,"dat\voice\5_0187.ogg"`Thậm chí ông còn chẳng nhớ tên cô gái đó còn gì? @
dwave 0,"dat\voice\5_0188.ogg"`Và chắc chắn cô ấy cũng thế thôi."@
br
`　"..."\

dwave 0,"dat\voice\5_0189.ogg"`　"Hiểu chưa? @
dwave 0,"dat\voice\5_0190.ogg"`Tôi không biết gì nhiều về mấy câu hẹn ước của hai người, nhưng thay vì trông chờ một cô gái chẳng biết còn ở đây hay không, thì theo đuổi Mizuna-chan coi bộ hợp với một tên thực dụng như ông hơn đấy chứ?"@
br
dwave 0,"dat\voice\1_0400.ogg"`　"Này này, đừng có nghĩ gì nói nấy chứ. @
dwave 0,"dat\voice\1_0401.ogg"`Sao tôi phải theo đuổi nhỏ tóc bím đó..."@
br
dwave 0,"dat\voice\5_0191.ogg"`　"Vậy thì sao một tên ghét-đám-đông như ông lại đi với em ấy chứ?"\

dwave 0,"dat\voice\1_0402.ogg"`　"Thôi nào, sao cũng được. @
dwave 0,"dat\voice\1_0403.ogg"`Về thôi."@
br
dwave 0,"dat\voice\5_0192.ogg"`　"Ô, gì kia? @
dwave 0,"dat\voice\5_0193.ogg"`Lúng túng à. @
dwave 0,"dat\voice\5_0194.ogg"`Tôi biết đây là cơ hội cho cả hai người mà."@
br

if %41 > 0 goto *sinorin01

dwave 0,"dat\voice\1_0404.ogg"`　"Không, làm gì có chứ."@
br
dwave 0,"dat\voice\5_0195.ogg"`　"Ối trời, đừng nói là ông ngại ngùng e thẹn đó, Toshiki-chan?"@
br
dwave 0,"dat\voice\1_0405.ogg"`　"Nói như gay ấy. @
dwave 0,"dat\voice\1_0406.ogg"`Tởm kinh."\

goto *sinorin00

*sinorin01

dwave 0,"dat\voice\1_0407.ogg"`　"Không đâu. Chẳng có chút cơ hội nào hết. @
dwave 0,"dat\voice\1_0408.ogg"`Với cả tôi..."@
br
dwave 0,"dat\voice\5_0196.ogg"`　"Tôi sao?"@
br
dwave 0,"dat\voice\1_0409.ogg"`　"...không có gì hết. @
dwave 0,"dat\voice\1_0410.ogg"`Thôi, đi về nào."\

*sinorin00
gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000

;----------------------------------
;　三日目
;----------------------------------
change_day "十八日"

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
bg "dat\bg\bg08_1.jpg",%110
gosub *windowon
`　Finally, the day of the festival. Fireworks shot from the school grounds at ten in the morning.\

gosub *windowoff
change_b "学園祭教室昼"
change_cc "うに411通常"
gosub *windowon

dwave 0,"dat\voice\5_0197.ogg"`　"Được lắm, nhóm buổi sáng đây rồi. @
dwave 0,"dat\voice\5_0198.ogg"`Theo kế hoạch, Toshiki và tớ sẽ đóng quân ở gian bếp. @
dwave 0,"dat\voice\5_0199.ogg"`Còn các bạn nữ bưng yakisoba ra, và phục vụ nước cho khách nữa. @
br
dwave 0,"dat\voice\5_0200.ogg"`Ta phải đứng chờ họ gọi trước khi đi lấy nước. @
dwave 0,"dat\voice\5_0201.ogg"`Mọi người, cố lên nhé!"\

gosub *windowoff
change_d "中消去"
wait 2000
gosub *windowon
`　Tầm trưa là ca chúng tôi bận nhất; có rất nhiều khách hàng.@
br
dwave 0,"dat\voice\1_0413.ogg"`　"Reiji! @
dwave 0,"dat\voice\1_0414.ogg"`Bên này năm suất nhé."@
br
dwave 0,"dat\voice\5_0202.ogg"`　"Rõ!"@
br
`　Đến phút chót, Reiji là người lo hết chuyện bếp núc, còn tôi giúp dọn thức ăn ra đĩa.\

gosub *windowoff
wait 2000
change_cc "うに413真面目"
gosub *windowon


dwave 0,"dat\voice\5_0203.ogg"`　"Phù. @
dwave 0,"dat\voice\5_0204.ogg"`Sắp giữa trưa rồi ha."@
br
`　Nó đưa tay quệt lông mày và nhìn đồng hồ.\
change_d "中消去"

`　Từ bếp trông ra lớp, tôi phát hiện một người cao tầm nửa người khác, có đeo kính đi vào.@
br
dwave 0,"dat\voice\1_0415.ogg"`　"Mời vào, @
dwave 0,"dat\voice\1_0416.ogg"`Shinoi."@
br
change_cc "しのりん213メ笑顔"
dwave 0,"dat\voice\3_0025.ogg"`　"Chào anh, Sugai-san. @
dwave 0,"dat\voice\3_0026.ogg"`Anh có bận lắm không ạ?"@
br
dwave 0,"dat\voice\1_0417.ogg"`　"Anh nghĩ chốc nữa còn bận hơn. @
dwave 0,"dat\voice\1_0418.ogg"`Nãy giờ thì khá thư thả."@
br
dwave 0,"dat\voice\3_0027.ogg"`　"Là vậy ạ?"@
br
`　Nhoẻn miệng cười, em ấy ngồi xuống chỗ ghế trống.\

dwave 0,"dat\voice\1_0419.ogg"`　"Em cứ tự nhiên đi."@
br
dwave 0,"dat\voice\3_0028.ogg"`　"Vâng."@
br
change_d "中消去"
`　Một bạn cùng lớp đến chờ em gọi món và tôi trở lại chỗ bếp.\

`　Gần đến giờ thay ca rồi.@
br
dwave 0,"dat\voice\1_0420.ogg"`　"Hửm? @
dwave 0,"dat\voice\1_0421.ogg"`Ngoài lớp có vẻ ồn ào nhỉ?"\

`　Nghía ra lớp, tôi nhìn thấy ít nhất mười gã to con lực lưỡng.@
br
dwave 0,"dat\voice\1_0422.ogg"`　"Gì kia?! @
dwave 0,"dat\voice\1_0423.ogg"`Đám đó ở đâu ra thế?!"@
br
change_cc "うに413真面目"
dwave 0,"dat\voice\5_0205.ogg"`　"Bên câu lạc bộ Judo đấy. @
dwave 0,"dat\voice\5_0206.ogg"`Có vẻ chúng ta sẽ gặp chướng ngại lớn trước khi được thay ca đây."@
br
dwave 0,"dat\voice\1_0424.ogg"`　"Ôi trời."@
br
change_d "中消去"
`　...và phiếu gọi món được chuyển qua bếp.\

dwave 0,"dat\voice\1_0425.ogg"`　"Này này. @
dwave 0,"dat\voice\1_0426.ogg"`Bộ giỡn hả?"@
br
`　Dễ có đến năm chục cái gạch đầu dòng trong phiếu là ít. Liếc mắt sang, tôi thấy Shinoi đi ra, nhưng rõ ràng chẳng có thì giờ đâu để mà gọi em ấy.\

change_cc "うに411通常"
dwave 0,"dat\voice\5_0207.ogg"`　"Làm gì đây... thôi được rồi. @
dwave 0,"dat\voice\5_0208.ogg"`Tôi sẽ xử một phát mười phần trước, làm xong, ông cho ra đĩa rồi rửa chảo nhé. @
dwave 0,"dat\voice\5_0209.ogg"`Ta có hai cái chảo, nên trong lúc ông đang dở tay thì tôi làm tiếp mười phần kia. @
dwave 0,"dat\voice\5_0210.ogg"`Cứ thế ta có thể giải quyết gọn chỗ đó."\

stop

`　Khi chúng tôi vừa định nấu, bỗng một tiếng rầm vang lên ngoài lớp và có ai đó thét lên.@
br
dwave 0,"dat\voice\5_0211.ogg"`　"Ngoài hành lang? @
dwave 0,"dat\voice\5_0212.ogg"`Toshiki, ông ra xem thử đi."@
br
dwave 0,"dat\voice\1_0427.ogg"`　"Ờ."\

change_b "学園祭廊下昼"

`　Bước ra tới ngoài, tôi không dám tin vào mắt mình nữa.@
br
`　Tấm bảng hiệu to đùng mà chúng tôi treo ở cửa ra vào đã rơi xuống, và đè bên dưới nó là một cô gái mà tôi có thể nhận ra ngay lập tức.@
br
dwave 0,"dat\voice\1_0428.ogg"`　"Shinoi!"\

`　Vài cậu to khỏe chạy ra. Thấy cảnh đó, họ nhanh chóng treo tấm bảng lớn về lại chỗ cũ một cách dễ dàng.\

dwave 0,"dat\voice\1_0429.ogg"`　"Shinoi, em có sao không?"@
br
dwave 0,"dat\voice\3_0029.ogg"`　"Đau quá..."@
br
change_b "ＣＧ１２＿１"
dwave 0,"dat\voice\4_0041.ogg"`　"Shinorin?!"@
br
`　Lách qua đám đông, Kagawa tức tốc chạy đến.@
br
dwave 0,"dat\voice\4_0042.ogg"`　"Này! @
dwave 0,"dat\voice\4_0043.ogg"`Thế này là sao?"@
br
dwave 0,"dat\voice\1_0430.ogg"`　"Hình như tấm bảng rơi trúng em ấy."@
br
dwave 0,"dat\voice\4_0044.ogg"`　"Shinorin, em không sao chứ?"@
br
dwave 0,"dat\voice\3_0030.ogg"`　"Vâng... @
dwave 0,"dat\voice\3_0031.ogg"`Nhưng... đau lắm..."@
br
dwave 0,"dat\voice\4_0045.ogg"`　"Đau? @
dwave 0,"dat\voice\4_0046.ogg"`Ở đâu?"@
br
dwave 0,"dat\voice\1_0431.ogg"`　"Đưa em ấy tới phòng y tế đi."@
br
dwave 0,"dat\voice\4_0047.ogg"`　"A, ưm. @
dwave 0,"dat\voice\4_0048.ogg"`Phải rồi."\

bg black,%110

`　Có vẻ Shinoi không thể tự đi được, nên tôi đã cõng em.@
br
`　Em nhẹ như vẻ bề ngoài... và tấm bảng to cỡ đó rơi trúng cơ thể mỏng manh thế kia. Đáng lẽ chúng tôi cần đưa em ấy tới bệnh viện thay vì phòng y tế chứ?\
gosub *windowoff
change_b "学園祭廊下昼"
change_cc "まみたん311通常"
gosub *windowon
dwave 0,"dat\voice\1_0432.ogg"`　"Kagawa, cậu đỡ hơn rồi chứ?"@
br
dwave 0,"dat\voice\4_0049.ogg"`　"Tôi khỏe lắm luôn. @
dwave 0,"dat\voice\4_0050.ogg"`Hết sốt hồi sáng rồi. @
dwave 0,"dat\voice\4_0051.ogg"`Mệt thiệt luôn. @
dwave 0,"dat\voice\4_0052.ogg"`Phải chi tôi bị sốt trước một ngày."\

`　Sao Shinoi có thể giữ được cặp kính sau khi bị đè như vậy nhỉ...? Tôi nhận ra trước giờ chưa thấy em bỏ kính ra bao giờ...@
br
dwave 0,"dat\voice\3_0032.ogg"`　"Đau quá..."@
br
`　Shinoi rên đau lần nữa.@
br
dwave 0,"dat\voice\1_0433.ogg"`　"Chỗ nào? @
dwave 0,"dat\voice\1_0434.ogg"`Em đau chỗ nào?"@
br
dwave 0,"dat\voice\3_0033.ogg"`　"Tay em... tay trái em..."@
br
dwave 0,"dat\voice\1_0435.ogg"`　"Tay em?"\

`　Tôi nhìn vào bàn tay trái của em và phát hiện ra có gì đó là lạ.@
br
dwave 0,"dat\voice\1_0436.ogg"`　"...!"\

`　Bàn tay nhỏ bé của Shinoi... ngón trỏ của em bị cong lại. Khớp tay không thể dãn ra được giống hồi em chơi piano. Đây chắc chắn là... bị gãy xương.\

change_b "保健室昼"

`　Chúng tôi đến phòng y tế và đặt cô bé xuống giường. Giáo viên quyết định phải đưa em tới bệnh viện càng sớm càng tốt, và chạy đi gọi taxi.@
br
change_cc "まみたん311通常"
dwave 0,"dat\voice\4_0053.ogg"`　"Toshiki, cậu đang bận mà, đúng không? @
dwave 0,"dat\voice\4_0054.ogg"`Tôi sẽ chăm sóc em ấy, còn cậu quay lại công việc đi, nhé?"\


isskip %117:csel "`Thôi được, nhờ cậu cả nhé.",*sentaku301,"`Không, tôi sẽ ở lại.",*sentaku302
goto *sentaku301

*sentaku302
add %41,1; しのりんルートフラグ
dwave 0,"dat\voice\1_0437.ogg"`　"Tôi sẽ ở lại. @
dwave 0,"dat\voice\1_0438.ogg"`Một mình Reiji cũng lo được."@
br
dwave 0,"dat\voice\4_0055.ogg"`　"Không ổn đâu. @
dwave 0,"dat\voice\4_0056.ogg"`Coi bộ lớp cậu đông lắm. @
dwave 0,"dat\voice\4_0057.ogg"`Cậu nên quay về đi."@
br
dwave 0,"dat\voice\3_0034.ogg"`　"Ưm... Sugai-san. @
dwave 0,"dat\voice\3_0035.ogg"`Em sẽ không sao đâu mà..."\

*sentaku301
gosub *windowoff
bg black,%110
wait 2000
change_b "学園祭教室昼"
gosub *windowon

`　Tôi lo cho Shinoi, nhưng còn nhiều chuyện khác xoay vòng trong đầu, như trong lớp đang bận tối mắt tối mũi chẳng hạn.\

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ

`　Đã quá trưa, rất nhiều người bụng trống rỗng dừng chân, và gọi món liên tục không ngớt.@
br
`　Tới ca chiều rồi, nhưng bọn họ vẫn phải nhờ cậy chúng tôi. Và khi chúng tôi được nghỉ tay thì cũng gần một giờ.\

dwave 0,"dat\voice\1_0439.ogg"`　"Reiji, rau hôm qua chúng ta làm sẵn sắp hết rồi."@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0213.ogg"`　"Khỏi lo. @
dwave 0,"dat\voice\5_0214.ogg"`Tôi có nhắn lại cho nhóm buổi chiều lúc họ đi mua thêm nguyên liệu rồi."@
br
dwave 0,"dat\voice\1_0440.ogg"`　"...hồi nào thế?"\
change_d "中消去"

`　Cuối cùng cũng đến giờ thay ca, nhưng tôi vẫn ngồi đợi nãy giờ trong lớp.@
br
`　Giữa dòng người xô đẩy, tôi nhìn xem em ấy có tới không, nhưng chẳng thấy hình bóng ai giống em cả.\

if %41 > 0 goto *sinorin02;	しのりんルート選択時

dwave 0,"dat\voice\9_2006.ogg"`　"Kính chào quý khách!"@
br
`　Có khách hàng vào lớp và tôi nghe thấy giọng của một cô gái.@
br
mov %281
mov %286,1:bgm "dat\music\bgm\bgm01.mp3";	おさげ
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0257.ogg"`　"A, Toshiki-senpai!"@
br
`　Em bước vào gọi lớn, vẫy tay và tiến về phía tôi. Ngượng chết đi được...\

dwave 0,"dat\voice\1_0441.ogg"`　"Em đến trễ đấy, biết không?"@
br
dwave 0,"dat\voice\2_0258.ogg"`　"Vâng. @
dwave 0,"dat\voice\2_0259.ogg"`Tại khó trốn đi quá..."@
br
`　Với nụ cười méo xệch, em ngồi xuống.\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0260.ogg"`　"Nhưng em muốn ăn yakisoba của anh, như hai đứa mình đã hứa."@
br
dwave 0,"dat\voice\1_0442.ogg"`　"Aa? @
dwave 0,"dat\voice\1_0443.ogg"`Mình đã hứa thế hả?"\

dwave 0,"dat\voice\9_2007.ogg"`　"Kính chào quý khách! @
dwave 0,"dat\voice\9_2008.ogg"`Ủa? @
dwave 0,"dat\voice\9_2009.ogg"`Bạn gái Toshiki-kun đó hả?"@
br
`　Một bạn nữ đeo tạp dề trên bộ đồng phục đến để nhận phiếu gọi món của em ấy.@
br
dwave 0,"dat\voice\1_0444.ogg"`　"Ờ. @
dwave 0,"dat\voice\1_0445.ogg"`Mà chỉ có hôm nay thôi."@
br
`　"?"\

change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0261.ogg"`　"Đừng có nói thế chứ! @
dwave 0,"dat\voice\2_0262.ogg"`Anh đã hứa rồi mà."@
br
dwave 0,"dat\voice\1_0446.ogg"`　"Một lời hứa nghe kì cục nữa, đúng nhỉ?"@
br
dwave 0,"dat\voice\2_1003.ogg"`　"Hừmm."\

change_cc "おさげ111通常"
`　Bạn nữ kia vừa lấy phiếu vừa nhìn chúng tôi, kẻ tung người hứng, bằng ánh mắt khó hiểu.@
br
`　Chuyện này càng lúc ngượng đây, nên tôi gọi bạn ấy lại để gọi vài món.@
br
dwave 0,"dat\voice\1_0447.ogg"`　"Mà kệ đi, em uống gì nào?"@
br
dwave 0,"dat\voice\2_0263.ogg"`　"A, ưm..."@
br
`　Em ấy nhìn vào thực đơn nước giải khát, bối rối không biết nên chọn gì.\

dwave 0,"dat\voice\2_0264.ogg"`　"Ưmmm. @
dwave 0,"dat\voice\2_0265.ogg"`Không biết nên chọn gì đây?"@
br
dwave 0,"dat\voice\1_0448.ogg"`　"Chà, anh cũng không biết em có thể uống gì nữa."@
br
dwave 0,"dat\voice\2_0266.ogg"`　"Nước ép Sợi đay đỏ 100%... @
dwave 0,"dat\voice\2_0267.ogg"`Cái này có đúng là nước uống không thế?"@
br
dwave 0,"dat\voice\1_0449.ogg"`　"Nếu phải miêu tả, chắc anh sẽ gọi nó là một tội ác tày trời của nhân gian."@
br
dwave 0,"dat\voice\2_0268.ogg"`　"...dù vậy, nó LÀM em thấy tò mò quá."\

`　Bằng cách nào đó, cô bé có thể vượt lên sự tò mò (chết người) và cuối cùng chọn nước cam ép.@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0269.ogg"`　"Còn anh uống gì, Toshiki-senpai?"@
br
dwave 0,"dat\voice\1_0450.ogg"`　"Xem nào... cho một nước nho ép nhé."@
br
dwave 0,"dat\voice\9_2010.ogg"`　"Có ngay đây!"@
br
dwave 0,"dat\voice\1_0451.ogg"`　"À, tôi sẽ làm món yakisoba, nên cứ để nước ép lại đó nhé."@
br
`　Nhóm phục vụ nước ra khỏi lớp, tới thẳng máy bán hàng tự động.\

`　Bạn nữ nhận món khi nãy đang nhìn chúng tôi, cười cười rồi thì thầm gì đó với cô bạn kế bên. Đúng như tôi nghĩ mà- làm một chuyện thế này trong lớp của mình thật là ngại quá đi mất.\

dwave 0,"dat\voice\1_0452.ogg"`　"Anh sẽ làm hai suất, nên em cứ chờ ở đây nhé."@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0270.ogg"`　"Vâng. @
dwave 0,"dat\voice\2_0271.ogg"`Em rất mong đó!"\
change_d "中消去"

`　Thay vì hỗn loạn như hồi nãy, mọi người trong bếp bây giờ chỉ vừa buôn chuyện vừa thái rau.@
br
`　Tôi tiến vào và bắt tay làm hai suất yakisoba, giống Reiji làm mẫu cho tôi hai ngày trước. Tôi biết chính xác cần làm gì sau khi quan sát cách nấu thục mạng của nó khi nãy, và cuối cùng cũng thực hiện được một cách hoàn hảo.\

dwave 0,"dat\voice\1_0453.ogg"`　"Xin lỗi đã để em chờ lâu."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0272.ogg"`　"Oaa! @
dwave 0,"dat\voice\2_0273.ogg"`Trông ngon ghê cơ!"@
br
`　Tôi đặt đĩa ngay trước mặt em, lát cá ngừ còn sôi dầu lách tách. Nước ép cũng đã để sẵn trên bàn. \
dwave 0,"dat\voice\1_0454.ogg"`　"Này, chờ chút đã."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0274.ogg"`　"Chuyện gì vậy anh?"@
br
dwave 0,"dat\voice\1_0455.ogg"`　"Sao lon nước nho ép lại có màu xanh lá chết người thế kia?"@
br
dwave 0,"dat\voice\2_0275.ogg"`　"Hả? @
dwave 0,"dat\voice\2_0276.ogg"`Em không biết."\

`　Ở góc phòng, nhóm phục vụ nước nhìn sang hướng tôi, cười toe toét.@
br
dwave 0,"dat\voice\1_0456.ogg"`　"Họ cố tình!"@
br
dwave 0,"dat\voice\2_0277.ogg"`　"Loại nước này tệ dữ vậy ạ?"@
br
dwave 0,"dat\voice\1_0457.ogg"`　"Kinh khủng là đằng khác."@
br
dwave 0,"dat\voice\2_0278.ogg"`　"Hừm... @
dwave 0,"dat\voice\2_0279.ogg"`Em chưa uống thử bao giờ... hay anh có muốn đổi không?"@
br
dwave 0,"dat\voice\1_0458.ogg"`　"Em chắc chứ?"@
br
dwave 0,"dat\voice\2_0280.ogg"`　"Vâng. @
dwave 0,"dat\voice\2_0281.ogg"`Em chỉ muốn nếm thử thôi."\

`　Từ sáng tới giờ tôi chưa ăn hay uống gì, nên thật sự rất khát. Tôi thậm chí không muốn NGHĨ tới cái thứ nước kinh khiếp đó.@
br
dwave 0,"dat\voice\1_0459.ogg"`　"...cảm ơn em. @
dwave 0,"dat\voice\1_0460.ogg"`Anh chấp nhận lời đề nghị này."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0282.ogg"`　"Vâng ạ. @
dwave 0,"dat\voice\2_0283.ogg"`Của anh đây."@
br
`　Chúng tôi đổi nước cho nhau. Cô bé kiểm tra kĩ lưỡng thứ nước đó một hồi, ngửi ngửi và nhận biết mùi của nó. Lát sau, với kết luận thứ nước này hoàn toàn vô hại, thế là em ấy hớp luôn một ngụm.\

change_cc "おさげ111通常"
`　"..."@
br
`　Tôi có thể nghe thấy tiếng ực từ đầu bàn bên này.@
br
dwave 0,"dat\voice\1_0461.ogg"`　"Thế nào?"@
br
dwave 0,"dat\voice\2_0284.ogg"`　"...ngon thiệt đó ha."@
br
dwave 0,"dat\voice\1_0462.ogg"`　"Vị giác tuổi mới lớn của em gặp vấn đề luôn rồi hả?"@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0285.ogg"`　"Dĩ nhiên là không rồi! @
dwave 0,"dat\voice\2_0286.ogg"`...mà anh dùng từ 'luôn' @
dwave 0,"dat\voice\2_0287.ogg"`là ý gì hả?!"\

change_cc "おさげ111通常"
`　Em uống thêm hai ba ngụm nữa... tôi cảm thấy ớn lạnh khi chứng kiến.@
br
dwave 0,"dat\voice\2_0288.ogg"`　"Được rồi, giờ mình ăn món yakisoba anh làm thôi."@
br
dwave 0,"dat\voice\1_0463.ogg"`　"Em sẽ thấy nó dở tệ vì vừa uống cái thứ nước đay đỏ đó."\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0289.ogg"`　"Itadakimasu!"@
br
`　Em nhanh nhẹn tách đôi đũa, trộn cùng lát cá ngừ, và gắp mì đưa lên miệng.@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0290.ogg"`　"Oa, ngon ghê!"@
br
dwave 0,"dat\voice\1_0464.ogg"`　"Chẳng biết anh có nên tin em hay không nữa, khi thấy em cảm nhận vị thứ nước đay đỏ đó như thế."@
br
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0291.ogg"`　"Em đang nói sự thật mà! @
dwave 0,"dat\voice\2_0292.ogg"`Mà có đúng là anh làm không thế?"@
br
dwave 0,"dat\voice\1_0465.ogg"`　"Ừ. @
dwave 0,"dat\voice\1_0466.ogg"`Dù có nhờ Reiji dạy anh nữa."\

dwave 0,"dat\voice\2_0293.ogg"`　"Hể... @
dwave 0,"dat\voice\2_0294.ogg"`Reiji-senpai đảm đang ghê, khác hẳn vẻ bề ngoài."@
br
dwave 0,"dat\voice\1_0467.ogg"`　"Đảm đang... @
dwave 0,"dat\voice\1_0468.ogg"`Từ ấy chẳng hợp với tên đó tí nào hết."\

`　Tôi ăn món yakisoba mình làm, tốc độ chậm ngang em ấy. Thỉnh thoảng, tôi để ý thấy lũ bạn trong lớp đang nhìn hai đứa tôi, nhưng tôi cứ thong thả tận hưởng bữa ăn.@
br
`　Khi đĩa của em đã hết, tôi để ý thấy thứ nước màu xanh lá kia cũng vơi đi nhiều.\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0295.ogg"`　"Giờ mình đi chơi luôn nha anh?"\

change_b "学園祭廊下昼"

`　Chúng tôi trả tiền rồi đi ra hành lang.@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0296.ogg"`　"Ngoài hành lang nóng ghê, anh ha?"@
br
dwave 0,"dat\voice\1_0469.ogg"`　"Chắc tại chúng ta mới ăn xong đó."@
br
dwave 0,"dat\voice\2_0297.ogg"`　"Toshiki-senpai, có nơi cụ thể nào anh muốn đến không?"@
br
dwave 0,"dat\voice\1_0470.ogg"`　"Chắc là không."@
br
dwave 0,"dat\voice\2_0298.ogg"`　"Vậy sao mình không đi quanh mấy lớp khác xem có gì nhỉ?"\

`　Em chìa tay ra.@
br
dwave 0,"dat\voice\1_0471.ogg"`　"Vụ gì đây?"@
br
dwave 0,"dat\voice\2_0299.ogg"`　"Sao thế, tất nhiên là nắm tay nhau rồi."@
br
dwave 0,"dat\voice\1_0472.ogg"`　"Anh chẳng muốn."@
br
dwave 0,"dat\voice\2_0300.ogg"`　"Aaa! @
dwave 0,"dat\voice\2_0301.ogg"`Xấu tính ghê!"@
br
dwave 0,"dat\voice\1_0473.ogg"`　"Sao anh phải làm cái chuyện đáng xấu hổ đó hả?!"@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0302.ogg"`　"Được mà, nha? @
dwave 0,"dat\voice\2_0303.ogg"`Hôm nay chúng ta là một cặp mà."@
br
`　Em cười với tôi, bím tóc khẽ đung đưa.\

dwave 0,"dat\voice\2_1004.ogg"`　"Một cặp thì nắm tay đâu có ngại đâu."@
br
dwave 0,"dat\voice\1_0474.ogg"`　"Không, vấn đề ở chỗ người anh nắm tay là EM @
dwave 0,"dat\voice\1_0475.ogg"`Thật là."@
br
`　Tôi nắm lấy tay em và bước đi vèo vèo.@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0304.ogg"`　"Aaa! @
dwave 0,"dat\voice\2_0305.ogg"`Toshiki-senpai, thế này thì bắt cặp chỗ nào chứ? Như kiểu em bị bắt lên đồn vì tội gì á!"\

change_d "中消去"
gosub *windowoff
wait 2000
gosub *windowon
`　Tôi không biết mấy đôi tình nhân bình thường cảm nhận ra sao, nhưng thời gian tôi dành bên em trôi qua sao thật nhanh. Có lúc chúng tôi trêu nhau, có lúc còn tung hứng kịch liệt nữa. Dù chưa tới mức thích, nhưng tôi không thấy vấn đề gì khi ở bên em.\
gosub *windowoff
change_cc "おさげ144うつむき"
gosub *windowon
dwave 0,"dat\voice\2_0306.ogg"`　"Toshiki-senpai..."@
br
`　Chợt em dừng bước bên cạnh tôi.@
br
dwave 0,"dat\voice\2_1005.ogg"`　"Mình ngồi lại đâu một chút được không ạ?"@
br
`　Trông em có vẻ xanh xao.@
br
dwave 0,"dat\voice\1_0476.ogg"`　"Này này, em có ổn không thế?"@
br
dwave 0,"dat\voice\2_0307.ogg"`　"Không sao đâu ạ. @
dwave 0,"dat\voice\2_0308.ogg"`Chỉ là thấy hơi nóng thôi."\
gosub *windowoff
change_b "自販機前昼"
change_cc "おさげ144うつむき"
gosub *windowon
`　Tôi nắm lấy bàn tay đang run rẩy của em, và chúng tôi bước đi dọc hành lang ngập nắng. Lát sau, tôi dìu em ngồi xuống băng ghế nơi chúng tôi có thể nhìn thấy máy bán hàng tự động.@
br
dwave 0,"dat\voice\1_0477.ogg"`　"Ơ kìa...?"@
br
`　Ngay lúc em ngồi xuống, chẳng hiểu sao tôi có cảm giác vừa nhìn xuyên thấu luôn băng ghế. Nói rõ hơn thì giống như kiểu bạn nhìn thấy một người trong suốt vậy.@
br
`　...chắc tôi cũng mệt mờ mắt rồi.\

dwave 0,"dat\voice\1_0478.ogg"`　"Em có muốn uống gì không?"@
br
dwave 0,"dat\voice\2_0309.ogg"`　"Dạ thôi, em chỉ cần nghỉ tí là được."@
br
`　Tôi ngồi xuống cạnh em. Người tới chỗ này mua nước khá thưa thớt, nhưng tôi nhận ra ngay gã vừa đi qua. Reiji cũng nhận thấy chúng tôi.@
br
gosub *windowoff
change_d "中消去"
change_cl "うに411通常"
change_cr "おさげ144うつむき"
gosub *windowon
dwave 0,"dat\voice\5_0215.ogg"`　"Yo, Toshiki. @
dwave 0,"dat\voice\5_0216.ogg"`...ơ kìa?"@
br
`　Reiji vừa lắc lon coca mới mua vừa gọi chúng tôi. Nhưng khi nhìn Tóc bím, trông nó có vẻ trầm ngâm lo lắng.\

dwave 0,"dat\voice\2_0310.ogg"`　"Trên mặt em có dính gì ạ?"@
br
dwave 0,"dat\voice\5_0217.ogg"`　"À không, Mizuna...chan? @
dwave 0,"dat\voice\5_0218.ogg"`Trông em xanh quá, có sao không vậy?"@
br
`　Nó gọi tên em ấy một cách kì lạ, và giọng nghe có vẻ lưỡng lự.\

dwave 0,"dat\voice\2_0311.ogg"`　"Em ổn mà. @
dwave 0,"dat\voice\2_0312.ogg"`Anh đừng lo cho em."@
br
dwave 0,"dat\voice\5_0219.ogg"`　"Thế à. @
dwave 0,"dat\voice\5_0220.ogg"`Nhưng đừng đi đâu một mình với Toshiki khi em thấy không khỏe nhé. @
dwave 0,"dat\voice\5_0221.ogg"`Kết cục rất đáng sợ đó."@
br
`　Nó liếc tôi, cười hiểm.@
br
change_cr "おさげ142笑顔"
dwave 0,"dat\voice\2_0313.ogg"`　"Dạ được. @
dwave 0,"dat\voice\2_0314.ogg"`Em hiểu mà."@
br
dwave 0,"dat\voice\5_0222.ogg"`　"Ừa, @
dwave 0,"dat\voice\5_0223.ogg"`em phải cẩn thận khi đi chung với nó nhé."\

dwave 0,"dat\voice\1_0479.ogg"`　"Hai người, thôi đi được rồi đấy, từ đầu tới giờ cứ nói xấu tôi là sao?!"@
br
`　Reiji đưa chân đá tôi một cái.@
br
change_cl "うに412にしし"
dwave 0,"dat\voice\5_0224.ogg"`　"Ối chết, lỡ chân."@
br
`　Tôi né ngay lập tức.\

change_cl "うに411通常"
dwave 0,"dat\voice\5_0225.ogg"`　"Dù gì thì cũng mong em mau khỏe nhé. @
dwave 0,"dat\voice\5_0226.ogg"`...ừm."@
br
`　Một lần nữa, nó ngập ngừng khi nhìn vào em ấy. Chắc nó đang nghĩ đến việc gọi cô bé bằng tên riêng.@
br
dwave 0,"dat\voice\1_0480.ogg"`　"Ông còn chẳng nhớ nổi tên em ấy nữa, tệ chưa," @
`Tôi nói, mục đích là để trả đũa nó chuyện hồi nãy.@
br
dwave 0,"dat\voice\5_0227.ogg"`　"K-không phải thế! @
dwave 0,"dat\voice\5_0228.ogg"`Mi... Mizuna-chan, giữ gìn sức khỏe nhé?"@
br
dwave 0,"dat\voice\2_0315.ogg"`　"A, vâng."@
br
`　Reiji bỏ đi, như thể nó muốn nhanh chuồn đi ấy.\
gosub *windowoff
change_d "全消去"
change_cc "おさげ111通常"
gosub *windowon
dwave 0,"dat\voice\2_0316.ogg"`　"Toshiki-senpai, @
dwave 0,"dat\voice\2_0317.ogg"`mình cũng đi thôi nào."@
br
dwave 0,"dat\voice\1_0481.ogg"`　"Em ổn chưa? @
dwave 0,"dat\voice\1_0482.ogg"`Nhìn em vẫn còn mệt mỏi đấy."@
br
dwave 0,"dat\voice\2_0318.ogg"`　"Em ổn mà. @
dwave 0,"dat\voice\2_0319.ogg"`Nếu mình không nhanh đi sang những lớp chưa ghé, ngày hôm nay sẽ trôi đi mất đó."\

dwave 0,"dat\voice\1_0483.ogg"`　"Nhắc mới nhớ, hình như chưa ghé qua lớp của em nhỉ?"@
br
`　Nếu tôi nhớ không lầm, cô bé nói lớp mình sẽ làm nhà ma.@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0320.ogg"`　"Hể? @
dwave 0,"dat\voice\2_0321.ogg"`Phải đi sao?"@
br
dwave 0,"dat\voice\1_0484.ogg"`　"Gì chứ? Em không thích à?"\

dwave 0,"dat\voice\2_0322.ogg"`　"Ưmm. @
dwave 0,"dat\voice\2_0323.ogg"`Lớp em làm nhà ma còn gì. @
dwave 0,"dat\voice\2_0324.ogg"`Em đã biết trước thứ gì sẽ nhảy ra và nằm ở đâu. @
dwave 0,"dat\voice\2_0325.ogg"`Hơn nữa, nếu anh vào lớp em, thì ngại lắm."@
br
dwave 0,"dat\voice\1_0485.ogg"`　"Ngại á? Em nói thế mà hồi nãy em vào lớp anh hào hứng cỡ nào?!"\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0326.ogg"`　"Ơ kìa? @
dwave 0,"dat\voice\2_0327.ogg"`Toshiki-senpai còn để bụng chuyện đó à?"@
br
dwave 0,"dat\voice\1_0486.ogg"`　"Làm gì mà bất ngờ dữ vậy?"@
br
dwave 0,"dat\voice\2_0328.ogg"`　"Nhưng mà... à thôi. @
dwave 0,"dat\voice\2_0329.ogg"`Kiểu gì anh cũng không thấy sợ, thì đâu còn vui nữa."\

dwave 0,"dat\voice\1_0487.ogg"`　"Cũng đúng. Chưa nhìn cũng đoán ra rồi."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0330.ogg"`　"Biết ngay mà!"@
br
dwave 0,"dat\voice\1_0488.ogg"`　"Hở? @
dwave 0,"dat\voice\1_0489.ogg"`Nhưng hôm nọ em rất tự tin nói nhà ma lớp mình sẽ sợ dữ lắm mà?"@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0331.ogg"`　"Em chỉ nói chơi vậy thôi."\

dwave 0,"dat\voice\1_0490.ogg"`　"Nhưng chắc chắn là ở lớp em sẽ mát hơn, đúng không? @
dwave 0,"dat\voice\1_0491.ogg"`Mình lại đó hạ nhiệt luôn nào."@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0332.ogg"`　"Nếu thế, thì lớp nào cũng mát hết mà?"@
br
dwave 0,"dat\voice\1_0492.ogg"`　"Rồi rồi, giờ cứ đi thôi."@
br
dwave 0,"dat\voice\2_0333.ogg"`　"Ôi..."\

`　Tôi kéo cô bé đang rên rỉ than vãn đi theo mình.@
br

change_b "学園祭廊下昼"
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ

`　Bên ngoài lớp 2-C, nước đá khô (hay cái gì giống thế) rải trắng xóa hành lang, làm khu vực xung quanh cảm thấy mát mẻ hẳn lên.\

if %139 = 1 gosub *windowoff
bg black,%110
if %139 = 1 gosub *windowon

`　Khi hai đứa vào trong, tôi nhận thấy rõ ràng nhiệt độ còn thấp hơn bên ngoài nữa.\

change_cc "おさげ111通常"
dwave 0,"dat\voice\1_0493.ogg"`　"Này, này. @
dwave 0,"dat\voice\1_0494.ogg"`Thế này có bật nhiều máy điều hòa quá không thế?"@
br
dwave 0,"dat\voice\2_0334.ogg"`　"À, vâng. @
dwave 0,"dat\voice\2_0335.ogg"`Nhiệt độ để tầm 12°C gì đấy..."@
br
dwave 0,"dat\voice\1_0495.ogg"`　"Thấp quá."@
br
dwave 0,"dat\voice\2_0336.ogg"`　"Vâng... thế nên không tốt cho sức khỏe mình đâu."\

dwave 0,"dat\voice\1_0496.ogg"`　"Coi kìa, thậm chí con ma trốn ở kia cũng đóng băng luôn."@
br
dwave 0,"dat\voice\2_0337.ogg"`　"Chắc chắn là do con ma không có dịp đi lại loanh quanh ấy mà."@
br
dwave 0,"dat\voice\1_0497.ogg"`　"Sáng nay em có đóng làm ma không?"@
br
dwave 0,"dat\voice\2_0338.ogg"`　"Tất nhiên là có, nhưng em trốn."\

dwave 0,"dat\voice\1_0498.ogg"`　"Nhưng ban nãy em nói khó trốn đi lắm mà."@
br
dwave 0,"dat\voice\2_0339.ogg"`　"Em có nói sao? @
dwave 0,"dat\voice\2_0340.ogg"`Chắc là anh tưởng tượng ra thôi."@
br
dwave 0,"dat\voice\1_0499.ogg"`　"Mọi người có ghét em không?"@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0341.ogg"`　"Không có chuyện đó đâu!"\

dwave 0,"dat\voice\1_0500.ogg"`　"Nhưng thậm chí em vào lớp mình, mà vẫn chẳng thấy ai gọi em cả."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0342.ogg"`　"Chỉ là tình cờ thôi. @
dwave 0,"dat\voice\2_0343.ogg"`Trùng hợp thôi."@
br
dwave 0,"dat\voice\1_0501.ogg"`　"Tại em nói em thích ở một mình đấy."\

dwave 0,"dat\voice\2_0344.ogg"`　"Em nói rồi, chỉ là trùng hợp thôi! @
dwave 0,"dat\voice\2_0345.ogg"`Lúc này mấy người em chơi thân không có ở đây. @
dwave 0,"dat\voice\2_0346.ogg"`...hơn nữa, anh cũng đâu có nhiều bạn đâu! Sao anh có thể nói những điều như vậy được chứ?"@
br
dwave 0,"dat\voice\1_0502.ogg"`　"Trùng hợp thôi. @
dwave 0,"dat\voice\1_0503.ogg"`Chỉ là trùng hợp nên không có bạn thôi."@
br
dwave 0,"dat\voice\2_0347.ogg"`　"Nói thế nghĩa là anh không có bạn còn gì?"\

dwave 0,"dat\voice\1_0504.ogg"`　"Hự, tức thật. @
dwave 0,"dat\voice\1_0505.ogg"`...đến lối ra rồi kìa."@
br
dwave 0,"dat\voice\2_0348.ogg"`　"Ơ kìa? @
dwave 0,"dat\voice\2_0349.ogg"`Đi hết trong lúc đang nói luôn à?"@
br
dwave 0,"dat\voice\1_0506.ogg"`　"Chà, chắc mình lơ hết mấy thứ nhảy ra và cứ thế đi luôn."@
br
dwave 0,"dat\voice\2_0350.ogg"`　"Em biết, nhưng mà tội quá."@
br
dwave 0,"dat\voice\1_0507.ogg"`　"Thế nên em mới không có bạn đấy."@
br
dwave 0,"dat\voice\2_0351.ogg"`　"Không liên quan tới anh."\



gosub *windowoff
wait 2000
mov %281
mov %286,1:bgm "dat\music\bgm\bgm01.mp3"
bg "dat\bg\bg02a_2.jpg",%110
gosub *windowon

`　―Khi chúng tôi đã ghé qua tất cả các lớp, hàng chùm tia nắng cũng bắt đầu ùa vào hành lang từ phía Tây.\

goto *honpen01

*sinorin02

dwave 0,"dat\voice\1_0508.ogg"`　"Này, @
dwave 0,"dat\voice\1_0509.ogg"`Reiji? @
dwave 0,"dat\voice\1_0510.ogg"`Có phải hồi nãy Tóc bím đã tới khi tôi ra ngoài không?"@
br
dwave 0,"dat\voice\5_0229.ogg"`　"Ờ. @
dwave 0,"dat\voice\5_0230.ogg"`Em ấy bảo sẽ quay lại, vì không thấy ông ở đây. @
dwave 0,"dat\voice\5_0231.ogg"`Em ấy vừa đi ra lúc ông về. Chắc hai người không gặp nhau rồi."@
br
dwave 0,"dat\voice\1_0511.ogg"`　"Chắc như vậy thật rồi."\

gosub *windowoff
wait 2000
gosub *windowon

dwave 0,"dat\voice\5_0232.ogg"`　"Rồi, tới lúc thay ca."@
br
dwave 0,"dat\voice\1_0512.ogg"`　"Ờ."@
br
`　Tóc bím vẫn chưa quay lại, dù đã thay ca.@
br
dwave 0,"dat\voice\5_0233.ogg"`　"Mizuna-chan chắc cũng đang bận gì đó. @
dwave 0,"dat\voice\5_0234.ogg"`Đừng thất vọng thế chứ."@
br
dwave 0,"dat\voice\1_0513.ogg"`　"Ai thất vọng cơ?"@
br
dwave 0,"dat\voice\5_0235.ogg"`　"Tất nhiên là ông rồi."@
br
dwave 0,"dat\voice\1_0514.ogg"`　"Đâu, tôi làm gì có."\

`　Sau khi chuyển mấy món đồ nghề, tôi nán lại chờ và nhìn ra ngoài lớp một hồi lâu, nhưng cuối cùng, Tóc bím vẫn không tới.@
br
dwave 0,"dat\voice\1_0515.ogg"`　"...ĐANG làm gì vậy nhỉ? @
dwave 0,"dat\voice\1_0516.ogg"`Con bé này..."\

change_b "学園祭廊下昼"

`　Ngồi chờ thế này thật vô ích, nên tôi ra khỏi lớp và quyết định tìm cách khác.@
br
`　Tôi muốn đi tìm em, nhưng sau hồi nghĩ lại, tôi nhận ra mình còn chẳng nhớ lớp em ở đâu nữa.\

`　Nói trắng ra, thật lòng tôi chẳng biết gì về em ấy cả.@
br
`　Thâm chí bây giờ, tôi cũng chẳng có cách nào để liên lạc với em, và cũng chẳng biết em ở đâu.\

change_b "屋上昼"
mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ

dwave 0,"dat\voice\1_0517.ogg"`　"...cũng không có trên này à?"@
br
`　Đây thường là nơi mà tôi có thể tìm thấy cô bé.@
br
`　Tôi tưởng em đang nghỉ trưa với con mèo dưới bóng mát trên tầng thượng, nhưng có vẻ là không rồi.@
br
`　Và đúng thật là chỉ cần cái nắng giữa hạ chết tiệt kia cũng đủ tra tấn tôi rồi.\

dwave 0,"dat\voice\1_0518.ogg"`　"Nóng kinh quá."@
br
`　Tôi lẩm nhẩm một mình.@
br
`　Đặt tay lên rào chắn, tôi đưa mắt nhìn ra phía chân trời.@
br
dwave 1,"dat\music\se\se15.wav"
`　Một cánh chim hải âu nhẹ nhàng lướt bay trên khoảng không nơi khung trời xanh hòa với sắc biếc của biển cả.@
br
`　Tôi dõi theo cánh chim hải âu và nhắm mắt lại khi nó vẽ thành bóng dưới mặt trời. Và khi mở mắt ra, tôi đã mất dấu cánh chim ấy.\

`　――Cọt kẹt...@
br
br
`　Tiếng kéo cửa vang lên sau lưng, và lát sau, từng bước chân âm thầm tiến lại gần tôi.@
br
`　Không ngoái đầu lại, tôi nói mà vẫn đưa mắt nhìn về chân trời.\

dwave 0,"dat\voice\1_0519.ogg"`　"Trễ quá rồi nhỉ? @
dwave 0,"dat\voice\1_0520.ogg"`Lễ hội sắp kết thúc rồi đó."@
br
`　"..."@
br
dwave 0,"dat\voice\1_0521.ogg"`　"Em vẫn chưa ăn trưa, đúng không? @
dwave 0,"dat\voice\1_0522.ogg"`Anh sẽ làm yakisoba như đã hứa, nên mình đi thôi."@
br
dwave 0,"dat\voice\3_0036.ogg"`　"...Yakisoba... hồi nãy em có ăn rồi."@
br
dwave 0,"dat\voice\1_0523.ogg"`　"...hả?" @
br
dwave 0,"dat\voice\3_0037.ogg"`　"Em đã ăn một ít rồi."\

mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん
change_cc "しのりん211メ通常"
`　Tôi quay lại nhìn thì thấy không phải Tóc bím, mà là Shinoi đang đứng đó với ngón tay đã được băng lại.@
br
dwave 0,"dat\voice\3_0038.ogg"`　"Em có ăn ở lớp anh hồi trưa mà, đúng không ạ?"@
br
dwave 0,"dat\voice\1_0524.ogg"`　"À, ừ nhỉ."@
br
dwave 0,"dat\voice\3_0039.ogg"`　"Anh đang chờ ai ở đây ạ?"@
br
dwave 0,"dat\voice\1_0525.ogg"`　"...à, cũng không hẳn."\

dwave 0,"dat\voice\3_0040.ogg"`　"...anh có hay tới đây không?"@
br
dwave 0,"dat\voice\1_0526.ogg"`　"Ừm... anh chỉ mới lên đây dạo này thôi. @
dwave 0,"dat\voice\1_0527.ogg"`Sao em lại lên đây, Shinoi?"@
br
change_cc "しのりん213メ笑顔"
dwave 0,"dat\voice\3_0041.ogg"`　"Bé mèo."@
br
dwave 0,"dat\voice\1_0528.ogg"`　"Hể?"@
br
dwave 0,"dat\voice\3_0042.ogg"`　"Em đuổi theo bé mèo lên tận đây."\

dwave 0,"dat\voice\1_0529.ogg"`　"Vậy, nó đâu rồi?"@
br
dwave 0,"dat\voice\3_0043.ogg"`　"Em mất dấu nó rồi. @
dwave 0,"dat\voice\3_0044.ogg"`Nhưng mà..."@
br
dwave 0,"dat\voice\1_0530.ogg"`　"Nhưng mà?"@
br
dwave 0,"dat\voice\3_0045.ogg"`　"Thay vì nó, em lại tìm thấy anh."@
br
dwave 0,"dat\voice\1_0531.ogg"`　"Hay quá ha."@
br
dwave 0,"dat\voice\3_0046.ogg"`　"Vâng. @
dwave 0,"dat\voice\3_0047.ogg"`Em muốn cảm ơn anh chuyện khi nãy..."@
br
dwave 0,"dat\voice\1_0532.ogg"`　"...em ổn thật rồi chứ?"\

`　Ngón trỏ bên tay trái của em ấy bị quấn cả lớp băng. Nhìn kiểu gì cũng thấy là không ổn.@
br
change_cc "しのりん214メ目閉じ"
dwave 0,"dat\voice\3_0048.ogg"`　"Ổn hơn rồi mà, tay em không sao rồi."@
br
dwave 0,"dat\voice\1_0533.ogg"`　"...em có thể chơi piano chứ?"@
br
change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0049.ogg"`　"Vâng. @
dwave 0,"dat\voice\3_0050.ogg"`Piano... em không thể nào chơi được nữa."\

`　Em ấy hạ quyết tâm và trả lời một cách chóng vánh.@
br
dwave 0,"dat\voice\1_0534.ogg"`　"Em buồn lắm không?"@
br
dwave 0,"dat\voice\3_0051.ogg"`　"Vâng?"@
br
dwave 0,"dat\voice\1_0535.ogg"`　"Em có buồn vì không thể chơi piano nữa không?"@
br
`　Không đắn đo, tôi hỏi thẳng.@
br
change_cc "しのりん214メ目閉じ"
dwave 0,"dat\voice\3_0052.ogg"`　"...em sẽ không phải làm phiền mọi người nữa..."@
br
`　Nở nụ cười buồn bã, cô bé tiếp lời.\

dwave 0,"dat\voice\3_0053.ogg"`　"Dù cho em không thể chơi piano nữa, cũng chẳng ai quan tâm đâu."@
br
dwave 0,"dat\voice\1_0536.ogg"`　"Không có chuyện đó. @
dwave 0,"dat\voice\1_0537.ogg"`Rồi BROY sẽ ra sao?"@
br
change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0054.ogg"`　"Với BROY thì, em đã nói sẽ rời nhóm sau buổi biểu diễn cuối cùng. @
dwave 0,"dat\voice\3_0055.ogg"`Mẹ em, anh biết đó... tiếng đàn của em quá ồn ào với mẹ."@
br
dwave 0,"dat\voice\1_0538.ogg"`　"Mẹ em?"\

dwave 0,"dat\voice\3_0056.ogg"`　"Mẹ em là một nghệ sĩ dương cầm nổi tiếng. @
dwave 0,"dat\voice\3_0057.ogg"`Nhưng anh biết là bàn tay em thật nhỏ quá mà. @
dwave 0,"dat\voice\3_0058.ogg"`Đó thật sự là trở ngại lớn trên con đường âm nhạc của em. @
dwave 0,"dat\voice\3_0059.ogg"`Kể cả khi không xảy ra chuyện này đi nữa, em vẫn không xứng đáng với tài năng của mẹ. @
dwave 0,"dat\voice\3_0060.ogg"`Em vụng về thế này, trí nhớ lại kém... @
dwave 0,"dat\voice\3_0061.ogg"`Mỗi ngày em đều bị piano làm cho phân tâm, nên từ nay em có thể tập trung hoàn toàn vào chuyện học hành... @
dwave 0,"dat\voice\3_0062.ogg"`Thật tốt khi em không thể chơi đàn piano nữa."\

`　Em nhìn về phía rào chắn và nói, nhưng nghe như em đang cố thuyết phục bản thân hơn là tôi. Shinoi, ấn tượng đầu tiên về em là một người ít nói. Cũng Shinoi ấy, hiện đang bày tỏ về tương lai và hạnh phúc của bản thân.\

`　Tôi cứng họng.@
br
`　Em ấy muốn tôi nói gì đây?@
br
`　Đôi mắt em đã nói cho tôi biết câu trả lời.@
br
`　Chúng cứ dao động, chối bỏ, và giờ cứ mãi nhìn về màu xanh trải dài phía trước.\

`　Tôi tự trách mình vì không thể làm gì. Tôi không thể làm gì cho em khi em đang lừa chính bản thân về ước vọng thật sự của mình, nên tôi cũng đưa mắt nhìn về sắc xanh phía bên kia rào chắn.@
br
change_cc "しのりん212メあうう"
dwave 0,"dat\voice\3_0063.ogg"`　"Em xin lỗi."@
br
`　Đánh ánh mắt khỏi dải xanh kia, em nhìn xuống chân mình.\

dwave 0,"dat\voice\3_0064.ogg"`　"Nhưng em rất vui vì đã có thể hoàn thành buổi biểu diễn trước khi chuyện này xảy ra. @
dwave 0,"dat\voice\3_0065.ogg"`...dù thật tiếc cho Mami-chan. @
dwave 0,"dat\voice\3_0066.ogg"`Nhưng... em thấy hơi buồn khi nghĩ tới việc không thể đứng trên sân khấu cùng chị ấy nữa."@
br
`　Cô bé nói nhiều hơn bình thường... và từng câu từng chữ như đâm xuyên qua chính bản thân em.\

change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0067.ogg"`　"...ngày hội trường kết thúc rồi. @
dwave 0,"dat\voice\3_0068.ogg"`Em xin lỗi... @
dwave 0,"dat\voice\3_0069.ogg"`vì đã bắt anh phải nghe em kể lể về bản thân như thế này.... @
dwave 0,"dat\voice\3_0070.ogg"`Chắc anh đã hứa sẽ đi gặp bạn gái của mình, đúng không ạ?"@
br
dwave 0,"dat\voice\1_0539.ogg"`　"Bạn gái?"@
br
dwave 0,"dat\voice\3_0071.ogg"`　"Hazuki-san."\

dwave 0,"dat\voice\1_0540.ogg"`　"Ai cơ?"@
br
dwave 0,"dat\voice\3_0072.ogg"`　"Ưm... cô gái có hai bím tóc..."@
br
dwave 0,"dat\voice\1_0541.ogg"`　"À, Tóc bím hả? @
dwave 0,"dat\voice\1_0542.ogg"`...em ấy đâu phải bạn gái anh..."@
br
dwave 0,"dat\voice\3_0073.ogg"`　"Em lầm rồi sao?"@
br
`　...giờ cô bé nhắc, tôi mới nhớ là ĐÃ hứa sẽ hẹn hò suốt ngày hôm nay, nhưng cuối cùng lại chẳng tìm thấy nhau.\

dwave 0,"dat\voice\1_0543.ogg"`　"Chứ sao nữa. @
dwave 0,"dat\voice\1_0544.ogg"`Anh mới quen cô bé ấy thôi mà."@
br
dwave 0,"dat\voice\3_0074.ogg"`　"Nhưng hai người rất hợp nhau."@
br
dwave 0,"dat\voice\1_0545.ogg"`　"Thật á?"@
br
change_cc "しのりん213メ笑顔"
dwave 0,"dat\voice\3_0075.ogg"`　"Vâng. @
dwave 0,"dat\voice\3_0076.ogg"`Em đã nghĩ đó là một cặp thật đẹp."@
br
dwave 0,"dat\voice\1_0546.ogg"`　"Gì chứ?"@
br
dwave 0,"dat\voice\3_0077.ogg"`　"Anh và cô ấy."@
br
`　"..."\

change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0078.ogg"`　"Em nói gì kì lạ sao?"@
br
dwave 0,"dat\voice\1_0547.ogg"`　"À không, chỉ là Reiji cũng nói một câu y chang thế."@
br
`　Vì cả hai cùng nói như thế, nên tôi tự hỏi bản thân.@
br
`　――Tôi nghĩ gì về Tóc bím?@
br
`　Quả thật tôi thấy vui khi ở bên em ấy. Tôi có thể chọc ghẹo em, và em cũng sẽ chọc lại tôi. Nhưng...\

dwave 0,"dat\voice\1_0548.ogg"`　"Ừm, không phải như mọi người nghĩ đâu."@
br
`　"...?"@
br
dwave 0,"dat\voice\1_0549.ogg"`　"Thế em có bạn trai chưa?"@
br
change_cc "しのりん212メあうう"
dwave 0,"dat\voice\3_0079.ogg"`　"Hể- ể- ể...?"@
br
`　Như vừa giật mình hiểu ra- rõ ràng em ấy không quen bị hỏi mấy câu kiểu này.@
br
dwave 0,"dat\voice\3_0080.ogg"`　"E-em ư? @
dwave 0,"dat\voice\3_0081.ogg"`Em không có... @
dwave 0,"dat\voice\3_0082.ogg"`ai như thế hết."@
br
dwave 0,"dat\voice\1_0550.ogg"`　"Nhưng chắc em phải có người em thích chứ?"@
br
dwave 0,"dat\voice\3_0083.ogg"`　"Người... em... thích sao? @
dwave 0,"dat\voice\3_0084.ogg"`Ưư... a... ưm..."\

`　Mặt em đỏ bừng và dán mắt nhìn xuống chân, như thể cô bé có thể ngã dúi bất cứ lúc nào. Chẳng cần chờ câu trả lời, phản ứng ấy cũng đủ dễ để hiểu rồi.@
br
dwave 0,"dat\voice\1_0551.ogg"`　"Anh hiểu rồi, hiểu rồi. @
dwave 0,"dat\voice\1_0552.ogg"`Em không cần phải ép mình trả lời đâu."@
br
dwave 0,"dat\voice\3_0085.ogg"`　"A, ưm... em không biết chắc thích ai là thế nào, nhưng... gần đây, em có chú ý đến một người... @
dwave 0,"dat\voice\3_0086.ogg"`Ư-ư..."\

`　Giọng em ấy nghe thật lạ, thậm chí hơi thở cũng gấp gáp.@
br
change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0087.ogg"`　"C... còn anh thì sao?"@
br
dwave 0,"dat\voice\1_0553.ogg"`　"Ô, cũng sắp hết ngày hội rồi. @
dwave 0,"dat\voice\1_0554.ogg"`Mình quay về dọn lớp đi."@
br
dwave 0,"dat\voice\3_0088.ogg"`　"Ư! @
dwave 0,"dat\voice\3_0089.ogg"`Sugai-san chơi xấu quá đi..."@
br
change_d "中消去"
`　Khi tiến về phía cầu thang, chợt có làn gió nhẹ như đẩy tôi lùi lại. Tựa như tông nhạc piano của Shinoi... và khiến tôi nhớ lại câu nói của em.\

stop

dwave 0,"dat\voice\3_0090.ogg"`　"――Em... yêu thích piano."\

dwave 0,"dat\voice\1_0555.ogg"`　"Shinoi!"@
br
change_cc "しのりん211メ通常"
`　Cô bé hơi khiễng chân lên vì tiếng gọi đột ngột đó. Quay người lại, em nhìn tôi vẻ dò hỏi.@
br
dwave 0,"dat\voice\1_0556.ogg"`　"Có thật là em không thể chơi được nữa không? @
dwave 0,"dat\voice\1_0557.ogg"`Hay chỉ là em lựa chọn từ bỏ? @
dwave 0,"dat\voice\1_0558.ogg"`Em nói rằng em yêu thích... đó là lí do khiến em chơi piano."@
br
change_cc "しのりん212メあうう"
dwave 0,"dat\voice\3_0091.ogg"`　"...Sugai-san thật tàn nhẫn..."@
br
dwave 0,"dat\voice\1_0559.ogg"`　"Hể?"\

change_cc "しのりん215メ驚き"
`　Em lững thững bước về phía tôi, và khi đến gần, em đột nhiên ngã vào lòng tôi.@
br
`　Tôi đứng yên, chân như đóng băng. Tôi không thể cảm nhận được gì ngoài làn gió biển.@
br
dwave 0,"dat\voice\3_0092.ogg"`　"Em ghét... em ghét việc mình không thể chơi đàn piano được nữa... @
dwave 0,"dat\voice\3_0093.ogg"`Em ghét lắm..."@
br
dwave 0,"dat\voice\1_0560.ogg"`　"Shinoi..."@
br
`　Khẽ vuốt mái tóc em, tôi cố tìm cách làm khuây khỏa bớt nỗi buồn trong lòng em... nhưng ở tình thế này, tôi chẳng thể làm được gì.\

gosub *windowoff
bg black,%110
wait 2000
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
bg "dat\bg\bg02a_2.jpg",%110
gosub *windowon

`　Trên đường về lớp, tôi nhận ra một gương mặt quen thuộc đang bước lại gần.@
br
dwave 0,"dat\voice\1_0561.ogg"`　"Nguyên ngày nay anh đi tìm em đấy."@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0352.ogg"`　"Em cũng đi tìm anh đó! @
dwave 0,"dat\voice\2_0353.ogg"`Em tới cả lớp anh luôn, nhưng chẳng thấy anh đâu hết..."\

dwave 0,"dat\voice\1_0562.ogg"`　"Nhưng cũng tốt là chúng ta có thể gặp nhau lúc này để đi lửa trại mà?"@
br
change_cc "おさげ144うつむき"
dwave 0,"dat\voice\2_0354.ogg"`　"...vâng. @
dwave 0,"dat\voice\2_0355.ogg"`Đúng vậy nhỉ."@
br
dwave 0,"dat\voice\1_0563.ogg"`　"Sao thế?"@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0356.ogg"`　"Vâng?"@
br
dwave 0,"dat\voice\1_0564.ogg"`　"...à, không có gì."@
br
`　Trông em có vẻ không vui... đôi mắt chìm trong nỗi buồn giống như lúc chúng tôi gặp nhau trên tầng thượng.\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0357.ogg"`　"Còn Toshiki-senpai? Có chuyện gì sao ạ? @
dwave 0,"dat\voice\2_0358.ogg"`Trông anh... có vẻ cô đơn quá."@
br
dwave 0,"dat\voice\1_0565.ogg"`　"Em chỉ giỏi tưởng tượng..."@
br
`　Dường như cả hai chúng tôi đều có chuyện để nghĩ về.\

*honpen01

change_cc "おさげ131あさって"
dwave 0,"dat\voice\2_0359.ogg"`　"Lễ hội sắp kết thúc rồi ha."\

`　Tiếp sau đây, chúng tôi cần thu dọn rác trong lớp và đốt ngoài sân. Lửa trại sẽ được dựng trên đống rác thải; đó là truyền thống của trường tôi.\

change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0360.ogg"`　"Vẫn còn nhiều thời gian trước lễ bế mạc mà nhỉ?"@
br
dwave 0,"dat\voice\1_0566.ogg"`　"Em lấy đâu ra thời gian khi phải đi dọn rác ở lớp đó. @
br
dwave 0,"dat\voice\1_0567.ogg"`Hay là em định trốn luôn?"@
br
dwave 0,"dat\voice\2_0361.ogg"`　"A, bị phát hiện mất tiêu rồi. @
dwave 0,"dat\voice\2_0362.ogg"`Nhưng còn Toshiki-senpai thì sao? @
dwave 0,"dat\voice\2_0363.ogg"`Mặt trời lặn xuống biển giờ này đẹp lắm đấy."@
br
dwave 0,"dat\voice\1_0568.ogg"`　"Em nghĩ anh là đồng phạm với em hả?"@
br
dwave 0,"dat\voice\2_0364.ogg"`　"Đúng ạ. @
dwave 0,"dat\voice\2_0365.ogg"`Nào, mình đi thôi!"\

change_b "階段夕"


`　Cạnh bên tôi, Tóc bím bước lên cầu thang đến tầng thượng. Ngay lúc em mở toang cánh cửa, ánh chiều buông màu cam nhạt hắt vào làm tôi phải nheo mắt lại.\
gosub *windowoff
mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ
change_b "屋上夕"
change_cc "おさげ142笑顔"
gosub *windowon
dwave 0,"dat\voice\2_0366.ogg"`　"Uaa~ @
dwave 0,"dat\voice\2_0367.ogg"`Chói quá đi."@
br
`　Em đưa một tay lên che mắt để quen dần với ánh nắng.@
br
`　Phía đối diện rào chắn kia, một thế giới tạo bởi muôn sắc ảo ảnh cam đỏ trải dài trong huy hoàng.\

mov %287
mov %286,1:bgm "dat\music\bgm\bgm07.mp3"
change_b "ＣＧ０４＿１"

dwave 0,"dat\voice\2_0368.ogg"`　"Em đã không thể đến lễ hội trường năm ngoái."@
br
`　Em đặt tay lên thanh rào chắn quen thuộc.\

dwave 0,"dat\voice\2_0369.ogg"`　"Trước ngày hội, em đã gặp tai nạn và ngã xuống. @
dwave 0,"dat\voice\2_0370.ogg"`Em đã rất mong chờ ngày hội trường, nhưng khi em tới, nó đã kết thúc."@
br
`　Em mỉm cười nói. Ánh tà dương nhuộm đỏ mắt cô bé, nhưng nỗi buồn nơi đôi mắt ấy không thể giấu đi.\

dwave 0,"dat\voice\2_0371.ogg"`　"Em đã rất mong chờ ngày hội trường. @
dwave 0,"dat\voice\2_0372.ogg"`Từ trước khi em bước vào ngôi trường này..."@
br
dwave 0,"dat\voice\1_0569.ogg"`　"Từ trước?"@
br
dwave 0,"dat\voice\2_0373.ogg"`　"Vâng. @
dwave 0,"dat\voice\2_0374.ogg"`Đã từ rất lâu. @
dwave 0,"dat\voice\2_0375.ogg"`Từ rất, rất lâu rồi, và luôn luôn..."\

`　Dường như em ấy đang cẩn trọng lựa chọn ngôn từ. Em tắm trong chùm tia nắng rũ từ phía Tây. Trong thoáng chốc, tôi chợt hình dung đường nét cơ thể em như xao động và hóa trong suốt.\

if %41 > 0 goto *sinorin03;	しのりんルート

dwave 0,"dat\voice\2_0376.ogg"`　"Toshiki-senpai, anh còn nhớ chính xác lời hứa với cô gái của mối tình đầu không?"\
dwave 0,"dat\voice\1_0570.ogg"`　"Lời hứa à... thật ra, anh không nhớ rõ lắm. @
br
dwave 0,"dat\voice\1_0571.ogg"`Giống như bọn anh muốn làm điều gì đó ở ngôi trường này, nhưng anh không nhớ đó là gì. @
dwave 0,"dat\voice\1_0572.ogg"`Có khi anh vào nhầm trường cũng nên. @
dwave 0,"dat\voice\1_1108.ogg"`Nhưng... nếu nhìn thấy được cô ấy, biết đâu anh có thể nhớ lại tất cả. Nên... anh vào trường này với hy vọng sẽ gặp nhau, một lần thôi cũng được. @
dwave 0,"dat\voice\1_1109.ogg"`Thế mà vào đây anh học như một tên ngốc và thậm chí chẳng nhớ nổi tên cô ấy, vì không có cách nào tìm được cô ấy, nên mọi chuyện mới thành ra thế này."\

change_b "ＣＧ０４＿２"

dwave 0,"dat\voice\2_0377.ogg"`　"Em thì nhớ."@
br
dwave 0,"dat\voice\1_0573.ogg"`　"Hể?"\

change_b "ＣＧ０４＿１"
dwave 0,"dat\voice\2_0378.ogg"`　"Lời hứa với cô bé ấy là... sẽ tái ngộ ở ngôi trường này, tới đêm lửa trại bế mạc lễ hội, và cùng nhảy bên nhau. @
dwave 0,"dat\voice\2_0379.ogg"`Cha của cô bé ấy vì thuyên chuyển công tác, nên họ phải rời đi. @
dwave 0,"dat\voice\2_0380.ogg"`Từ đó, cô ấy phải chia xa cậu bé. @
dwave 0,"dat\voice\2_0381.ogg"`Nhưng vào những năm sơ trung, cô gái ấy trở lại thành phố. @
dwave 0,"dat\voice\2_0382.ogg"`Cô ấy chỉ có thể nhớ tên cậu bé, nhưng vẫn cố gắng tìm cậu, vì đoán rằng rồi họ sẽ vào học chung một trường.\

dwave 0,"dat\voice\2_0383.ogg"`Nhưng cô không thể tìm thấy cậu ấy. @
dwave 0,"dat\voice\2_0384.ogg"`Điều cô gái ấy không ngờ tới. @
dwave 0,"dat\voice\2_0385.ogg"`Vì một vài lí do, cô lại nghĩ rằng họ học chung một khối.\

dwave 0,"dat\voice\2_0686.ogg"`Cho đến khi cô gái ấy nhận ra cậu bé mà cô hẹn ước lớn hơn một tuổi, và cậu ấy sắp tốt nghiệp. @
dwave 0,"dat\voice\2_0687.ogg"`Vậy nên trong lễ tốt nghiệp, cô tìm kiếm giữa đám đông những cậu con trai trong tay cầm tấm văn bằng. @
dwave 0,"dat\voice\2_0688.ogg"`Và cô gái ấy tin rằng cậu bé sẽ giữ đúng hẹn ước, nên đã vào học trường Cao trung Uminari Koutou.\

dwave 0,"dat\voice\2_0689.ogg"`Và rồi... cuối cùng cô cũng tìm được cậu ấy. @
dwave 0,"dat\voice\2_0690.ogg"`Nhưng cô biết không tài nào cậu ấy có thể nhớ được lời hứa giữa họ. @
dwave 0,"dat\voice\2_0691.ogg"`Họ đi ngang qua nhau nhiều lần giữa hành lang, thế nhưng, vì đã trở thành một người thích ở một mình, nên cô không thể bắt chuyện với cậu ấy."\

dwave 0,"dat\voice\1_0574.ogg"`　"Mà, gượm đã. @
dwave 0,"dat\voice\1_0575.ogg"`Làm sao cô gái biết đó là cậu trai cần tìm? @
dwave 0,"dat\voice\1_0576.ogg"`Biết đâu cô ấy nhớ nhầm tên cậu thì sao?"@
br
dwave 0,"dat\voice\2_0386.ogg"`　"Cô ấy không thể nào nhầm được. @
dwave 0,"dat\voice\2_0387.ogg"`Vì hồi nhỏ, cô đã nhận được một món quà từ cậu, ngay trước lúc cô ra đi."\

dwave 0,"dat\voice\1_0577.ogg"`　"Món quà?"@
br
dwave 0,"dat\voice\2_0388.ogg"`　"Là móc khóa hình người tuyết. @
dwave 0,"dat\voice\2_0389.ogg"`Vào giữa mùa hạ, cậu ấy đưa tặng cô móc khóa trái mùa như một món quà. @
dwave 0,"dat\voice\2_0390.ogg"`Nó khá to, nên có thể cho vào trong một ít thứ. @
dwave 0,"dat\voice\2_0391.ogg"`Cậu bé đã viết lời hẹn ước vào một bức thư và xếp vào đó. @
br
dwave 0,"dat\voice\2_0392.ogg"`...'Sugai Toshiki' được viết trong mảnh giấy nhàu nát ấy."\

`　"..."@
br
change_b "ＣＧ０４＿２"
dwave 0,"dat\voice\2_0393.ogg"`　"Anh bất ngờ chứ?"@
br
dwave 0,"dat\voice\1_0578.ogg"`　"Em có thể nói đó là bất ngờ sao? Anh xin lỗi. @
dwave 0,"dat\voice\1_0579.ogg"`Anh không hiểu."@
br
dwave 0,"dat\voice\2_0394.ogg"`　"Haa... @
dwave 0,"dat\voice\2_0395.ogg"`Em đoán nói thế này vô dụng rồi ha?"@
br
dwave 0,"dat\voice\1_0580.ogg"`　"Nếu như lời em nói, em là cô gái đã lập lời hứa sao?"@
br
dwave 0,"dat\voice\2_0396.ogg"`　"Anh đừng có nói thờ ơ thế chứ! @
dwave 0,"dat\voice\2_0397.ogg"`Đáng ra phải là khung cảnh cảm động cơ mà!"@
br
dwave 0,"dat\voice\1_0581.ogg"`　"...ra vậy. @
dwave 0,"dat\voice\1_0582.ogg"`Anh cũng nghĩ đã có hẹn ước với một cô gái cùng tuổi mình."\

dwave 0,"dat\voice\2_0398.ogg"`　"Toshiki-senpai này, ngày sinh nhật của anh là?"@
br
dwave 0,"dat\voice\1_0583.ogg"`　"Ngày 13 tháng 9."@
br
dwave 0,"dat\voice\2_0399.ogg"`　"Còn em là ngày 8 tháng 5. @
dwave 0,"dat\voice\2_0400.ogg"`Nhưng hẳn rồi, anh sinh sớm hơn em một năm. @
dwave 0,"dat\voice\2_0401.ogg"`Và chúng ta gặp nhau vào tháng 8, khi chúng ta cùng tuổi, nên lầm tưởng sẽ học chung một lớp."\

dwave 0,"dat\voice\1_0584.ogg"`　"Nếu thế, sao em không nói cho anh biết sớm hơn? @
br
dwave 0,"dat\voice\1_0585.ogg"`Chẳng phải sẽ tốt hơn nếu em nói với anh lúc chúng ta gặp nhau hai ngày trước sao?"@
br
change_b "ＣＧ０４＿１"
dwave 0,"dat\voice\2_0402.ogg"`　"Nếu em chấm dứt mọi chuyện ở đây, sẽ là một cái kết thật đẹp. @
dwave 0,"dat\voice\2_0403.ogg"`Em còn muốn nói thêm nhiều nữa."\

`　Khi nói lời đó, đôi mắt em, ngắm nhìn mặt trời buổi hoàng hôn, là đôi mắt buồn thảm nhất tôi từng thấy.@
br
br
`　―Đôi mắt mới buồn làm sao.@
br
br
`　Tại sao mắt em lại như vậy? Nếu chúng tôi vẫn cứ tiếp chuyện, tôi có cảm giác em sẽ trả lời câu hỏi. Nhưng... tôi thấy lo lắng về câu trả lời.\

change_b "ＣＧ０４＿３"

`　Ánh chiều buông đỏ thẫm hạ thấp và chiếu xuyên qua người em, hắt vào tôi.\

mp3fadeout 1000
stop
mp3fadeout 0

`　―Xuyên qua... em?\

mov %289
mov %286,1:bgm "dat\music\bgm\bgm09.mp3";	かなしい

dwave 0,"dat\voice\2_0404.ogg"`　"Cô bé mang theo chiếc móc khóa tới trường. @
dwave 0,"dat\voice\2_0405.ogg"`Cô ấy thích ở một mình, nhưng cô cũng có một người bạn. @
dwave 0,"dat\voice\2_0406.ogg"`Người bạn đã ở trong ngôi trường này từ rất lâu, và họ cũng chơi cùng nhau từ nhỏ. @
dwave 0,"dat\voice\2_0407.ogg"`Người bạn đó thích chiếc móc khóa và cứ đùa giỡn với nó, khiến cô có lúc thấy hơi bực.\

dwave 0,"dat\voice\2_0692.ogg"`Người bạn đó rất thích tới một nơi. @
dwave 0,"dat\voice\2_0693.ogg"`Tan học, người bạn đó dường như cứ muốn rủ cô tới nơi ấy, chạy nhảy nô đùa với dáng hình màu trắng ấy. @
dwave 0,"dat\voice\2_0694.ogg"`Ba tháng sau khi nhập học, cô ấy nói với bạn mình @
dwave 0,"dat\voice\2_0695.ogg"`rằng cô chuẩn bị nói sự thật với cậu bé kia vào ngày trước lễ hội trường. @
dwave 0,"dat\voice\2_0696.ogg"`Rồi hai người họ sẽ cùng nhau vun đắp ước hẹn. Trong lúc cô ấy đang cười vui vẻ..."\

dwave 0,"dat\voice\1_0586.ogg"`　"Này, dừng lại... đừng nói thêm gì nữa...!"@
br
`　Đây không phải là ảnh ảo nữa. Tôi có thể nhìn thấy rào chắn xuyên qua em.\

`　Rào chắn đã bị gãy một đoạn. Một nữ sinh đã chết sau khi ngã xuống vào năm ngoái. Một cô gái đứng trước mặt tôi với đôi mắt buồn thảm. Ánh chiều tà hắt xuyên qua người em.\

`　Thứ cảm xúc đầy kinh hãi tăng dần lên. Đột nhiên, một suy nghĩ phi thực xuất hiện trong đầu tôi. Mọi thứ trước mắt tôi như thể một giấc mơ. Nhưng nó không phải mơ. Dậy sớm, đến trường, bắt đầu lễ hội, làm yakisoba, tận hưởng ngày hội trường... đây không thể là một giấc mơ nữa.\

`　―Vậy thì, chuyện gì đang xảy ra ngay trước mắt tôi?\

`　Tựa như khi hát ca khúc 'Giấc mơ mùa hạ'... em ấy cũng nhắm mắt lại như bây giờ.\

dwave 0,"dat\voice\2_0408.ogg"`　"Khi nhận ra, chốn này cũng đã trở thành nơi yêu thích của cô rồi. @
dwave 0,"dat\voice\2_0409.ogg"`Ba ngày trước lễ hội trường. @
dwave 0,"dat\voice\2_0410.ogg"`Cô lên tầng thượng trễ hơn mọi ngày vì bận chuẩn bị. @
dwave 0,"dat\voice\2_0411.ogg"`Hôm ấy, ánh tà dương vẫn đẹp như mọi ngày, như bị nó thôi miên, cô dần tiến sát lại hàng rào. @
dwave 0,"dat\voice\2_0412.ogg"`Cô đặt tay lên hàng rào như mọi khi, và khoảnh khắc cô ấy nhìn về phía mặt trời-"\

dwave 0,"dat\voice\1_0587.ogg"`　"Thôi đi ngay!"@
br
`　Không thể kìm được nữa, tôi lớn tiếng hét lên.@
br
dwave 0,"dat\voice\1_0588.ogg"`　"Vậy đó là em ư?! @
dwave 0,"dat\voice\1_0589.ogg"`Vậy em đã ra đi một năm về trước, và giờ em là một linh hồn hay gì thế ư?! @
dwave 0,"dat\voice\1_0590.ogg"`Làm sao tôi có thể tin vào điều đó cơ chứ??!"\

change_b "ＣＧ０４＿４"
dwave 0,"dat\voice\2_0413.ogg"`　"Anh không phải tin lời em. @
dwave 0,"dat\voice\2_0414.ogg"`Vì sẽ sớm thôi, Toshiki-senpai sẽ quên đi cô gái mang tên Hazuki Mizuna."@
br
dwave 0,"dat\voice\1_0591.ogg"`　"...tôi không thể quên được chuyện như thế."\

dwave 0,"dat\voice\2_0415.ogg"`　"Vì đây là một giấc mơ. @
dwave 0,"dat\voice\2_0416.ogg"`Một giấc mơ vô cùng buồn. @
dwave 0,"dat\voice\2_0417.ogg"`A very sad dream. @
dwave 0,"dat\voice\2_0418.ogg"`Nhưng dù chỉ là mơ, cô ấy vẫn hạnh phúc khi có thể gặp lại cậu bé. @
dwave 0,"dat\voice\2_0419.ogg"`Mặc dù không thể thực hiện ước hẹn... cô ấy vẫn hạnh phúc khi gặp lại cậu, và trò chuyện với cậu."@
br
dwave 0,"dat\voice\1_0592.ogg"`　"Tôi không hiểu em đang muốn nói gì nữa..."\

change_b "ＣＧ０４＿５"
dwave 0,"dat\voice\2_0420.ogg"`　"Đây là... @
dwave 0,"dat\voice\2_0421.ogg"`lời vĩnh biệt."\
gosub *windowoff
bg white,10,3000
gosub *windowon
`　Sắc đỏ chuyển sang trắng, và cơ thể em mờ vào trong sự trống rỗng thuần nhất. Khoảnh khắc tôi nhắm mắt lại trước thứ ánh sáng chói lòa ấy, tôi rơi từ thế giới màu trắng vào trong bóng đêm... và nhìn thấy khuôn mặt em ngấn lệ, mỉm cười tan biến.\

goto *honpen02

*sinorin03

change_b "ＣＧ０４＿４"

dwave 0,"dat\voice\2_0422.ogg"`　"Nhưng thật tình em nghĩ nó chẳng dễ chịu chút nào."@
br
`　Lát sau, giọng nói em lại vang lên...@
br
dwave 0,"dat\voice\2_0423.ogg"`　"Dẫu có trôi đi dù nhanh dù chậm, cuối cùng anh vẫn luôn phải tự đánh thức khỏi giấc mơ."\

gosub *windowoff
bg white,10,3000
gosub *windowon

`　...chuyện gì thế kia? Giống như tan mờ vào trong cảnh vật, Tóc bím bị bao phủ bởi làn sương trắng.@
br
dwave 0,"dat\voice\2_0424.ogg"`　"Nhưng dù chỉ là một giấc mơ, cũng thật vui làm sao."@
br
dwave 0,"dat\voice\1_0593.ogg"`　"Em đang nói cái quái gì thế...?"@
br
dwave 0,"dat\voice\2_0425.ogg"`　"Nếu anh cảm thấy hạnh phúc, thì chắc chắn em cũng có thể hạnh phúc."@
br
dwave 0,"dat\voice\1_0594.ogg"`　"Này! @
dwave 0,"dat\voice\1_0595.ogg"`Chuyện gì đang xảy ra thế này?!"\

mp3fadeout 1000
stop
mp3fadeout 0

`　Một dự cảm thật tệ. Kiểu như không còn trọng lực nữa... tôi không còn nhận biết được phương hướng nữa.@
br
`　Đột nhiên, Tóc bím bước lại gần tôi và nói.\

dwave 0,"dat\voice\2_0426.ogg"`　"Vĩnh biệt anh."@
br
dwave 0,"dat\voice\1_0596.ogg"`　"Tóc bím!!"@
br
`　Tôi với tay ra định ôm chầm lấy em, nhưng chỉ còn lại khoảng không phía trước. Lát sau, mọi thứ quanh tôi như ẩn vào một thế giới ngập toàn sắc trắng.\


*honpen02
gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000

;----------------------------------
;　一日目(二周)
;----------------------------------
change_day "十六日"

mov %283
mov %286,1:bgm "dat\music\bgm\bgm03.mp3";	さわやか
bg "dat\bg\bg05_1.jpg",%110
gosub *windowon

`　―Bíp bíp bíp bíp―!@
br
dwave 0,"dat\voice\1_0597.ogg"`　"Ngah?"@
br
`　Mở mắt ra trong tiếng ồn ào, liên hồi của đồng hồ báo thức, tôi ngồi dậy, nhìn mông lung không chớp mắt một hồi, rồi với tay tắt nó đi.\

dwave 0,"dat\voice\1_0598.ogg"`　"...hở?"@
br
`　Tối qua mình làm gì vậy nhỉ? Như thể tôi đã ngủ triền miên suốt mấy ngày, và chẳng thể nhớ chuyện gì. Thậm chí tôi còn không biết hôm nay là ngày mấy nữa.\

`　Vẫn còn ngái ngủ, tôi sắp xếp lại suy nghĩ và nhìn vào tờ lịch.\

stop

dwave 0,"dat\voice\1_0599.ogg"`　"Phải rồi... còn một ngày nữa là lễ hội trường."\

gosub *windowoff
wait 2000
if %41 = 1 bg black,10,5000:lsp 511,":s/20,20,0;#FFFFFF`Ending 3: Bad End",230,230:print 10,1000:click:csp 511:print 10,1000:wait 1000:mov %104,1:reset;	バッドエンド
bg black,%110
wait 2000


mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
wait 1000
gosub *windowon
`　Buổi sáng của tôi khởi đầu bằng những xúc cảm lạ kì, nhưng dần dần rồi cảm giác ấy cũng biến mất.\

change_b "教室昼"

`　Ở kia, Reiji đang bắt tay làm yakisoba sẽ bán vào ngày hội cho bữa sáng của tôi. Trước khi nó nấu xong, tôi ra ngoài mua ít nước.\

change_b "自販機前昼"

`　Lưỡng lự một hồi trước việc mua Nước ép Sợi đay đỏ 100% mà Reiji yêu cầu, tôi mua thêm cho mình lon coca và quay về lớp.@
br
`　"..."@
br
`　Tại sao? Tôi cứ có cảm giác như thể đã quên béng đi chuyện gì từ sáng. Một điều gì đó thật quan trọng...\

gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000

if %41 = 2 goto *sinorinroute

gosub *windowon

`　―Cuối cùng, đến hết ngày mà tôi vẫn không tài nào nhớ nổi đó là gì.\
gosub *windowoff

wait 3000
;----------------------------------
;　二日目(二周)
;----------------------------------
change_day "十七日"

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
wait 1000
gosub *windowon
`　Đã sát lễ hội trường. Tôi làm theo lời Reiji bảo và cẩn thận thái gọt rau củ cho món yakisoba ngày mai.\

change_b "廊下昼"

`　Mới làm có phân nửa, tôi đã thấy chán và lẻn đi chơi.@
br
`　Tôi đi lòng vòng xem mấy lớp khác chuẩn bị và đọc tờ rơi chương trình khai mạc, giết thời gian cho đến khi buổi lễ bắt đầu.\

change_b "自販機前昼"

dwave 0,"dat\voice\1_0600.ogg"`　"...ủa?"@
br
`　Thấy khát, tôi đến đứng trước máy bán hàng tự động. Tôi sực nhận ra mình vừa mua hai lon nước.@
br
dwave 0,"dat\voice\1_0601.ogg"`　"Mình lấy nước cam ép làm chi vậy nhỉ?"@
br
`　Lỡ rồi, tôi đã mua mất. Ngồi ở băng ghế gần đó, tôi uống cả hai lon.\

`　Không hiểu sao, cầu thang gần đó cứ đập vào mắt tôi. Tôi không thể nhớ nó dẫn tới đâu. Tôi cũng chưa tới tầng thượng bao giờ, vậy nên, với bấy nhiêu thời gian vô công rỗi nghề, tôi quyết định lên đó thử.\

change_b "階段昼"

dwave 0,"dat\voice\1_0602.ogg"`　"Ớ?"@
br
`　Tôi dừng lại tại một bậc thang trước khi đặt chân lên chiếu nghỉ tầng trên. Có một đoạn dây chắn ngang đường, với biển cảnh báo học sinh phải tránh xa.\

`　Ngước mắt nhìn lên, tôi chẳng thấy gì khác ngoài một cánh cửa. Chắc chắn nó là cửa ra tầng thượng.@
br
`　Tôi quyết định đó chẳng nên là nơi để giết thời gian rồi bỏ đi.\

change_b "学園祭教室昼"

`　Tôi quay về lớp và dùng mấy tiếng còn lại để sơ chế rau quả.@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0236.ogg"`　"Này, Toshiki. @
dwave 0,"dat\voice\5_0237.ogg"`Ông làm xong hết rồi à? @
dwave 0,"dat\voice\5_0238.ogg"`Tốt lắm."@
br
`　Mới quá năm giờ rưỡi chiều một tí.\

dwave 0,"dat\voice\1_0603.ogg"`　"Dọn dẹp đống này là tôi xong việc rồi. @
dwave 0,"dat\voice\1_0604.ogg"`Nếu ông không cần giúp gì nữa, thì tôi về đây."@
br
change_cc "うに412にしし"
dwave 0,"dat\voice\5_0239.ogg"`　"Thôi nào, ông cũng nên tận hưởng lễ hội một chút chứ?"@
br
`　Cất rau xong, dù vẫn còn khá sớm nhưng chúng tôi quyết định đến nhà thể chất, nơi lễ khai mạc diễn ra.\

change_b "体育館夕"

`　Vừa khi chúng tôi tới nhà thể chất, lễ khai mạc bắt đầu. Các tiết mục văn nghệ diễn ra tốt đẹp, và mau chóng tới lượt ban nhạc của Reiji.\

change_b "体育館夜"

`　Lúc Reiji đi chuẩn bị cho buổi biểu diễn, tôi tranh thủ tới nhà vệ sinh.\

change_b "廊下夜"

`　Nhà vệ sinh gần nhà thể chất chật kín người, vậy nên tôi đi sang một chỗ khác cách đó xa hơn.\

wait 2000

dwave 0,"dat\voice\1_0605.ogg"`　"Aaa. @
dwave 0,"dat\voice\1_0606.ogg"`Nhẹ cả người."@
br
`　Với tâm trạng thoải mái, tôi bước ngược ra hành lang.\
gosub *windowoff

mp3fadeout 1000
stop
mp3fadeout 0
gosub *windowon
`　"..."@
br
`　Nhưng... đột nhiên, một thứ cảm giác kì lạ dâng trào trong lồng ngực. Gần đây tôi gặp quá nhiều chuyện mơ hồ vừa lạ vừa quen. Dù thế, sao giờ đây xúc cảm mạnh mẽ của sự mất mát cứ xoáy sâu thêm vào tâm trí tôi?\

`　Tôi phải nhớ chứ.@
br
br
`　―Nhưng tại sao?\

change_cc "うに413真面目"
dwave 0,"dat\voice\5_0240.ogg"`　"Toshiki!"@
br
`　Reiji chạy đến chỗ tôi từ hướng tôi đi khỏi ban nãy.@
br
dwave 0,"dat\voice\5_0241.ogg"`　"Không xong rồi! @
dwave 0,"dat\voice\5_0242.ogg"`Kagawa bị cảm nên ngất đi rồi..."@
br
dwave 0,"dat\voice\1_0607.ogg"`　"Hả?"@
br
`　Nhìn biểu cảm nghiêm trọng của nó, tôi có thể nói nó không đùa.\

dwave 0,"dat\voice\5_0243.ogg"`　"Tôi vừa đưa nhỏ tới phòng y tế..."@
br
dwave 0,"dat\voice\1_0608.ogg"`　"Thế còn buổi live thì sao...?"@
br
dwave 0,"dat\voice\5_0244.ogg"`　"Kagawa bảo nếu có ai thay thế, nhỏ muốn người ấy hát giùm ngay... ông có biết ai có thể giúp không?"\

`　Tôi chẳng biết một ai đủ khả năng hát trước công chúng mà không cần tập dợt.@
br
`　Tôi lắc đầu.@
br
dwave 0,"dat\voice\5_0245.ogg"`　"Cũng phải ha... @
dwave 0,"dat\voice\5_0246.ogg"`Ông không có nhiều bạn, cũng chẳng có bạn gái, nên chắc chắn ông làm gì biết ai đủ tài năng nhỉ?"@
br
`　Làm ra vẻ như mình đang vô tư vô lo, nó châm đùa, nhưng có điều gì trong lời lẽ ấy khiến tôi để tâm.\

mp3fadein 1000
mov %288
mov %286,1:bgm "dat\music\bgm\bgm08.mp3";	かいそう
mp3fadein 0

dwave 0,"dat\voice\1_0609.ogg"`　"...không có nhiều bạn..."@
br
dwave 0,"dat\voice\5_0247.ogg"`　"Sao thế? @
dwave 0,"dat\voice\5_0248.ogg"`Ông nghĩ ra cách gì à?"@
br
dwave 0,"dat\voice\1_0610.ogg"`　"À không, tôi nhớ đến một người. @
dwave 0,"dat\voice\1_0611.ogg"`Không biết là ai nữa. @
dwave 0,"dat\voice\1_0612.ogg"`Cô ấy nói cô ấy thích ở một mình, hoặc thứ gì ảm đạm giống thế..."@
br
dwave 0,"dat\voice\5_0249.ogg"`　"Ông đang nói ai thế? @
dwave 0,"dat\voice\5_0250.ogg"`Người nào thích ông hả?"@
br
dwave 0,"dat\voice\1_0613.ogg"`　"Cái gì mà thích tôi chứ?! @
dwave 0,"dat\voice\1_0614.ogg"`Đừng đánh đồng tôi với nhỏ Tóc bím!"@
br
`　...Tóc bím? Ai là Tóc bím?\

`　Cố chạm vào điều ấy trong tuyệt vọng... đã tới gần lắm rồi, nhưng tôi không thể nắm lấy được. Bực tức với bản thân, tôi hét lên.@
br
dwave 0,"dat\voice\1_0615.ogg"`　"...aaaa!! @
dwave 0,"dat\voice\1_0616.ogg"`Vô vọng rồi. @
dwave 0,"dat\voice\1_0617.ogg"`Tôi không nhớ được gì hết! @
dwave 0,"dat\voice\1_0618.ogg"`Khốn nạn!!"\

`　Tôi đấm vào tường. Reiji đứng lặng đó, nhìn tôi đập vào tường lần nữa.@
br
dwave 0,"dat\voice\5_0251.ogg"`　"Này! @
dwave 0,"dat\voice\5_0252.ogg"`Ông bị điên hả?! @
dwave 0,"dat\voice\5_0253.ogg"`Tôi hiểu rồi, dừng lại mau!"@
br
dwave 0,"dat\voice\1_0619.ogg"`　"Tôi không nhớ được...! @
dwave 0,"dat\voice\1_0620.ogg"`Tôi đã quên đi một điều cực kì quan trọng."\

dwave 0,"dat\voice\5_0254.ogg"`　"Ông đang nói về lời hứa với mối tình đầu chứ gì? @
dwave 0,"dat\voice\5_0255.ogg"`Ông bảo đã quên nó rồi còn gì? @
dwave 0,"dat\voice\5_0256.ogg"`Giờ bình tĩnh lại đi. @
dwave 0,"dat\voice\5_0257.ogg"`Được chứ?"\

`　Reiji vỗ nhẹ vào lưng tôi. Khi nhịp thở của tôi trở về bình thường, tôi nhìn bàn tay phải đang sưng đau và quỳ sụp xuống sàn.@
br
`　Lời hứa với mối tình đầu...? Không. Đúng là tôi không thể nhớ lời hứa ấy ra sao, nhưng đó không phải là điều tôi đang cố gắng nhớ bây giờ.\

dwave 0,"dat\voice\1_0621.ogg"`　"Xin lỗi. @
dwave 0,"dat\voice\1_0622.ogg"`Giờ không phải lúc để tôi hành xử thế này."@
br
dwave 0,"dat\voice\5_0258.ogg"`　"Ông ổn chứ?"@
br
dwave 0,"dat\voice\1_0623.ogg"`　"Ừ. @
dwave 0,"dat\voice\1_0624.ogg"`Đầu óc tôi bây giờ như mớ hỗn độn ấy... @
dwave 0,"dat\voice\1_0625.ogg"`Haha. @
dwave 0,"dat\voice\1_0626.ogg"`Không biết tôi có cần kiếm cái bệnh viện nào đó không nhỉ?"\

dwave 0,"dat\voice\5_0259.ogg"`　"Khi không lại đi nói mấy điều gàn dở vậy? @
dwave 0,"dat\voice\5_0260.ogg"`Chắc tại mấy việc chuẩn bị và cái nóng làm ông ra thế này thôi. @
dwave 0,"dat\voice\5_0261.ogg"`Về nhà nghỉ ngơi chút đi. @
dwave 0,"dat\voice\5_0262.ogg"`Việc chính ngày mai mới bắt đầu mà."@
br
dwave 0,"dat\voice\1_0627.ogg"`　"Tôi sẽ về sau khi bình tĩnh lại."@
br
dwave 0,"dat\voice\5_0263.ogg"`　"Phải đấy. @
dwave 0,"dat\voice\5_0264.ogg"`Mà tôi quay lại ban nhạc đây. Ông chắc là ổn đó chứ?"@
br
dwave 0,"dat\voice\1_0628.ogg"`　"Tôi ổn."@
br
dwave 0,"dat\voice\5_0265.ogg"`　"Vậy mai gặp lại ông sau nhé."@
br
dwave 0,"dat\voice\1_0629.ogg"`　"Ờ. @
dwave 0,"dat\voice\1_0630.ogg"`Vậy đi."\
change_d "中消去"

`　Chắc còn lo lắng cho tình trạng của tôi, nó liếc nhìn tôi qua vai trước khi vào trong nhà thể chất. Vẫn thấy choáng váng, tôi ngồi đấy nhìn mông lung dọc hành lang.\

`　Tôi hít một hơi thật sau và trấn tĩnh lại. Điều tôi mong muốn nhớ ra là gì? Đó có phải chuyện tôi thật sự cần nhớ? Hay sẽ tốt hơn nếu tôi không nhớ ra? Hay tại làm sao mà ngay từ đầu tôi không thể nhớ?\

`　Trong nhà thể chất, mọi người đang hòa mình theo cao trào buổi hòa nhạc.@
br
`　Tôi đứng dậy, đi khỏi. Chẳng hiểu sao, tôi cảm giác như mình không thuộc về thế giới này.\

`　Tuy vậy, tôi vẫn cố nhớ trong vô vọng khi tiến ra cổng trường. Trên đường đi, tôi đánh mắt nhìn ra cửa sổ, và hiện lên một thứ cảm giác lạ lẫm như nhìn thấy bờ biển từ tầng thượng. Nhưng khi tôi ngước lên, chỉ là ánh trăng nhợt nhạt soi bóng mờ ảo.\

dwave 0,"dat\voice\1_0631.ogg"`　"Chắc tại mình mệt quá thôi."\

change_b "校門夜"

`　Chẳng nghĩ ngợi nhiều, tôi về nhà.@
br
`　Nếu không nghĩ tới, chắc chắn tôi không phải lo lắng nữa.@
br
`　Ngọn gió đêm ẩm ướt thổi qua, mang theo những tiếng reo hò cổ vũ xa xăm từ ngôi trường phía sau tôi.\

gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 2000

;----------------------------------
;　三日目(二周)
;----------------------------------
change_day "十八日"

bg "dat\bg\bg01a_1.jpg",%110
change_cc "うに411通常"
gosub *windowon

dwave 0,"dat\voice\5_0266.ogg"`　"Ê! Toshiki!"@
br
dwave 0,"dat\voice\1_0632.ogg"`　"Hả-? @
dwave 0,"dat\voice\1_0633.ogg"`...à, chuyện gì thế?"@
br
dwave 0,"dat\voice\5_0267.ogg"`　"Đừng hỏi lại kiểu đó chứ. @
dwave 0,"dat\voice\5_0268.ogg"`Lễ hội sắp bắt đầu đấy. @
dwave 0,"dat\voice\5_0269.ogg"`Nhanh nhanh vô bếp nào!"@
br
dwave 0,"dat\voice\1_0634.ogg"`　"À, đến giờ rồi sao?"\

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
change_cc "うに413真面目"
dwave 0,"dat\voice\5_0270.ogg"`　"...ông khỏe không đấy? @
dwave 0,"dat\voice\5_0271.ogg"`Hôm qua ngủ đủ giấc chưa?"@
br
dwave 0,"dat\voice\1_0635.ogg"`　"Khỏe rồi. @
dwave 0,"dat\voice\1_0636.ogg"`Tôi khỏe lại rồi. @
dwave 0,"dat\voice\1_0637.ogg"`Và ngủ ngon lắm."@
br
`　Rõ ràng Reiji lo lắng cho tôi. Tôi không muốn thế, nên gượng mỉm cười.\

dwave 0,"dat\voice\5_0272.ogg"`　"Dóc tổ. @
dwave 0,"dat\voice\5_0273.ogg"`Thế mớ quầng thâm dưới mắt ông là gì? @
dwave 0,"dat\voice\5_0274.ogg"`Và đừng có cố cười trong bộ dạng đó. @
dwave 0,"dat\voice\5_0275.ogg"`Nhìn tởm quá."@
br
dwave 0,"dat\voice\1_0638.ogg"`　"Ông nói gì đấy hả?"@
br
dwave 0,"dat\voice\5_0276.ogg"`　"Ra đằng kia nghỉ đi. @
dwave 0,"dat\voice\5_0277.ogg"`Bếp núc mình tôi lo được rồi."@
br
dwave 0,"dat\voice\1_0639.ogg"`　"Đã bảo là tôi khỏe rồi mà. @
dwave 0,"dat\voice\1_0640.ogg"`Tôi sẽ chuộc lại giấc ngủ sau khi hoàn thành công việc trong lễ hội trường cuối cùng của đời cao trung."@
br
dwave 0,"dat\voice\5_0278.ogg"`　"...thôi được rồi. @
dwave 0,"dat\voice\5_0279.ogg"`Nhưng đừng ép mình quá nhé."\

change_d "中消去"
`　Đầu óc cứ như trong mây mù, nhưng tôi di chuyển cơ thể theo chỉ dẫn của Reiji. May sao, lượng khách hàng tới từ từ, giúp chúng tôi dễ thở hơn. Và nếu không có khách nào cả, tôi sẽ đánh một giấc.\

dwave 0,"dat\voice\1_0641.ogg"`　"Này. @
dwave 0,"dat\voice\1_0642.ogg"`Gì mà ồn thế nhỉ?"@
br
`　Ngó từ bếp ra lớp, tôi trông thấy ít nhất mười gã to con lực lưỡng ngoài đó.@
br
`　Tôi nghe tiếng cô bạn đang chờ khách gọi món, và thấy mỗi tên đằng kia giơ ra ba đến bốn ngón tay.@
br
dwave 0,"dat\voice\1_0643.ogg"`　"Này, này. @
dwave 0,"dat\voice\1_0644.ogg"`Mấy tên đó ăn nổi bao nhiêu suất một lần thế?"@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0280.ogg"`　"Chắc chúng ta sẽ phải lo vụ này cho xong trước ca chiều. @
dwave 0,"dat\voice\5_0281.ogg"`Cố hết mình nhé, Toshiki."@
br
dwave 0,"dat\voice\1_0645.ogg"`　"Ờ."\

`　Reiji nấu như điên, còn tôi cho thức ăn ra đĩa và rửa chảo. Nó sẽ dùng chảo khác trong lúc tôi đang rửa cái này, và cứ lặp lại như thế.\

change_d "中消去"
`　Gần đến trưa, phiếu gọi của những khách hàng khác chất đống... vừa xong hết, tôi buông rơi đôi đũa dùng để nấu mì và hai mắt như tối sầm lại.\

gosub *windowoff
bg black,10,3000
mov %287
mov %286,1:bgm "dat\music\bgm\bgm07.mp3";	しっとり
bg white,10,3000
gosub *windowon

dwave 0,"dat\voice\1_0646.ogg"`　"Nóng quá..."@
br
`　Đã hai tuần từ khi nghỉ hè. Mặt trời nóng như đổ lửa của buổi sớm tháng Tám tàn nhẫn rọi xuống tôi. Tôi thậm chí chẳng động tay động chân mà mồ hôi vẫn túa ra. Đứng trên một con đường xa lạ, tôi bối rối nhìn quanh.\

`　Nghĩ ngợi trong giây lát, tôi nhanh chóng băng qua đường. Đi ngang qua những cửa tiệm và từng ngôi nhà lạ lẫm, trong khi không biết chút gì về con đường này.@
br
dwave 0,"dat\voice\1_0647.ogg"`　"Phải làm sao đây..."@
br
`　Đã chực khóc, nhưng tôi đang khát nên vẫn cứ bước đi loanh quanh, tìm thứ gì đó để uống.\

`　Cuối cùng tôi tìm thấy một máy bán hàng tự động và lục túi lấy tiền.@
br
`　Với lon coca an toàn trong tay, tôi vừa nốc một hơi vừa đi.\

change_b "校門通常時昼"

`　Lát sau, tôi đứng trước một ngôi trường rộng lớn.@
br
`　Trước cổng có ghi dòng chữ "Cao trung Uminari Koutou."@
br
dwave 0,"dat\voice\1_0648.ogg"`　"Cao trung Umi... cái gì đó... Koutou."@
br
`　...kì ghê, không đọc được.\

`　Tôi vừa định bỏ đi, thì nhìn thấy trước mắt một cô bạn trạc tuổi tôi. Bạn ấy đứng dưới ánh nắng, có mái tóc cắt ngắn, phớt màu hạt dẻ, và mặc một chiếc áo váy trắng không tay. Làn da nhợt nhạt như thể trong suốt.\

dwave 0,"dat\voice\2_0427.ogg"`　"Milk, hôm nay mình cùng chơi nào."@
br
`　Bạn ấy ngồi xổm, và dường như đang nói chuyện với thứ gì đó. Tôi lại gần bạn ấy, thắc mắc không biết là gì. Bên dưới váy của bạn ấy, tôi nghĩ mình đã thấy một thứ màu trắng đang di chuyển. Và, như thế, nó chạy vụt qua tôi, vào trong sân trường và biến đi mất.\

dwave 0,"dat\voice\2_0428.ogg"`　"Á! @
dwave 0,"dat\voice\2_0429.ogg"`Milk chạy rồi!"@
br
`　Bạn ấy chuyển sang đuổi con mèo, nhưng trong lúc luống cuống, bạn ấy giẫm phải tấm váy của mình.@
br
dwave 0,"dat\voice\2_0430.ogg"`　"Ui da!"@
br
`　Bạn ấy khóc nấc lên trông thật tội khi ngã dúi xuống.\

dwave 0,"dat\voice\1_0649.ogg"`　"...bạn không sao chứ?"@
br
`　Chẳng cần nghĩ ngợi, tôi hỏi bạn ấy.@
br
dwave 0,"dat\voice\2_0431.ogg"`　"Ưm... @
dwave 0,"dat\voice\2_0432.ogg"`Tớ không sao."@
br
`　Bạn ấy đứng dậy, ôm cánh tay với đôi mắt ngấn lệ.\

dwave 0,"dat\voice\2_0433.ogg"`　"Nhưng Milk chạy mất rồi..."@
br
dwave 0,"dat\voice\1_0650.ogg"`　"Milk? @
dwave 0,"dat\voice\1_0651.ogg"`Có phải cái màu trắng tớ vừa thấy không?"@
br
dwave 0,"dat\voice\2_0434.ogg"`　"Ưm. @
dwave 0,"dat\voice\2_0435.ogg"`Nó là bạn của tớ. @
dwave 0,"dat\voice\2_0436.ogg"`Từ rất lâu rồi."@
br
dwave 0,"dat\voice\1_0652.ogg"`　"Con... mèo đó là bạn của cậu à? @
dwave 0,"dat\voice\1_0653.ogg"`Vậy cậu không có bạn à?"@
br
dwave 0,"dat\voice\2_0437.ogg"`　"Ưư~... đừng có nói thế chứ!"\

`　Bạn ấy đáp trả kịch liệt, nhưng hàng lệ từ đôi mắt kia phản ánh điều ngược lại.@
br
dwave 0,"dat\voice\1_0654.ogg"`　"Oaa. @
dwave 0,"dat\voice\1_0655.ogg"`Nhìn nè, tay cậu bẩn hết rồi kìa. @
dwave 0,"dat\voice\1_0656.ogg"`Phải lấy nước rửa cho sạch đã. @
dwave 0,"dat\voice\1_0657.ogg"`Gần đây có chỗ nào có nước không nhỉ?"@
br
dwave 0,"dat\voice\2_0438.ogg"`　"Ưm... trong trường..."\

change_b "グラウンド昼"

`　Chúng tôi đi về hướng bạn ấy vừa chỉ. Bạn ấy rửa vết xước dưới vòi nước.\

`　Hình như bạn ấy tên là Hazuki Mizuna. Bạn ấy sống gần đây và chỉ thích tới trường này chơi. Bảo sao bạn ấy không có nhiều bạn...\

change_b "通学路夕"

`　Tôi quên hết mọi thứ và chơi đùa cùng Mizuna cả ngày. Cứ như thế thật lâu, đến khi mặt trời bắt đầu lặn xuống, và bạn ấy phải về nhà.@
br
dwave 0,"dat\voice\2_0439.ogg"`　"Ưm... Toshiki-kun. @
dwave 0,"dat\voice\2_0440.ogg"`Ngày mai mình cùng chơi nữa nhé?" @
`bạn ấy ngập ngừng nói, rồi quay bước đi.@
br
dwave 0,"dat\voice\1_0658.ogg"`　"Mình cũng phải về đây," @
`tôi nói, nhưng khi vừa cất bước, tôi sực nhớ-\

`　―Làm sao về nhà đây?\

`　Cuối cùng, tôi phải hỏi chú cảnh sát và gọi bố tới đón về.@
br
`　Tôi tưởng tôi đã đi khá xa, nhưng cuối cùng cũng không cách nhà là mấy.\

gosub *windowoff
wait 2000
bg "dat\bg\bg08a.jpg",%110
gosub *windowon
`　Những ngày sau đó, tôi lại đến con đường giờ đã quen thuộc này và chơi với cô bạn luôn đứng chờ trước cổng trường.\

change_b "グラウンド昼"

dwave 0,"dat\voice\1_0659.ogg"`　"Trường này gọi là gì vậy?"@
br
dwave 0,"dat\voice\2_0441.ogg"`　"Trường Cao trung Uminari Koutou đó."@
br
dwave 0,"dat\voice\1_0660.ogg"`　"Hể-ể."\

dwave 0,"dat\voice\2_0442.ogg"`　"Trường này nè, họ vừa làm lễ hội trước kì nghỉ hè. @
dwave 0,"dat\voice\2_0443.ogg"`Cực kỳ thú vị và vui lắm cơ! @
dwave 0,"dat\voice\2_0444.ogg"`Nào là quầy bán thức ăn, rồi bắt cá vàng, thậm chí có xe đẩy với dụng cụ làm lễ mỗi năm nữa. @
dwave 0,"dat\voice\2_0445.ogg"`Và họ bảo ngay cả khâu chuẩn bị cho lễ hội cũng vui lăm đó. @
dwave 0,"dat\voice\2_0446.ogg"`Trước giờ tớ chưa từng thấy, nhưng có hội diễn vào ban đêm, mẹ tớ và tớ lúc đó đi ngang qua trường nên tớ nghe cả tiếng nhạc thật lớn phát ra từ nhà thể chất. Trông náo nhiệt lắm cơ!"\

`　Nhìn đôi mắt chớp chớp với hàng mi lấp lánh ấy, tôi biết bạn ấy đang rất phấn khích.@
br
dwave 0,"dat\voice\2_0447.ogg"`　"Tớ cũng thích hát nữa, nhưng tớ sợ đứng trước mọi người quá."@
br
dwave 0,"dat\voice\1_0661.ogg"`　"Tớ thì chỉ hát nhẩm trong tiết nhạc thôi."@
br
dwave 0,"dat\voice\2_0448.ogg"`　"Thế không tốt đâu nha."@
br
dwave 0,"dat\voice\1_0662.ogg"`　"Có làm sao đâu. @
dwave 0,"dat\voice\1_0663.ogg"`Âm nhạc đâu giúp gì cho tớ trong tương lai. @
dwave 0,"dat\voice\1_0664.ogg"`Cố gắng quá làm gì trong khi nó hoàn toàn vô dụng."\

dwave 0,"dat\voice\2_0449.ogg"`　"Ưmmm. @
dwave 0,"dat\voice\2_0450.ogg"`Có lẽ cậu nói đúng, nhưng âm nhạc có thể lay chuyển cảm xúc người khác."@
br
dwave 0,"dat\voice\1_0665.ogg"`　"...thật sao?"@
br
dwave 0,"dat\voice\2_0451.ogg"`　"Phải đó. @
dwave 0,"dat\voice\2_0452.ogg"`Tớ nghĩ vậy."@
br
dwave 0,"dat\voice\1_0666.ogg"`　"Vậy thì, cậu hãy bước lên sân khấu ở nhà thể chất và lay chuyển thật nhiều người đi."@
br
dwave 0,"dat\voice\2_0453.ogg"`　"Hể-ể?! @
dwave 0,"dat\voice\2_0454.ogg"`Không được đâu! @
dwave 0,"dat\voice\2_0455.ogg"`Đứng trước bao nhiêu người á? Tớ sẽ sợ đến mức không hát nổi luôn."\

dwave 0,"dat\voice\1_0667.ogg"`　"Nếu nhắm mắt lại, cậu sẽ không để ý tới ánh mắt của người ta nhìn vào cậu đâu, đúng không?"@
br
dwave 0,"dat\voice\2_0456.ogg"`　"Tớ không muốn làm chuyện đáng ngượng ấy đâu. @
dwave 0,"dat\voice\2_0457.ogg"`A, còn nữa. @
dwave 0,"dat\voice\2_0458.ogg"`Trên sân trường sau lễ hội, họ có tổ chức cả lửa trại TO LẮM và mọi người cùng nhau nhảy múa quanh đó."\
dwave 0,"dat\voice\1_0668.ogg"`　"Hể-hể..."\

gosub *windowoff
bg white,%110
wait 2000
gosub *windowon

`　―Cứ thế, mỗi ngày trôi qua, chúng tôi tiếp tục chơi cùng nhau.@
br
`　Và trong chớp mắt, kì nghỉ hè cũng sắp kết thúc.\

change_b "グラウンド昼"

dwave 0,"dat\voice\2_0459.ogg"`　"Toshiki-kun, tớ nói nè..."@
br
dwave 0,"dat\voice\1_0669.ogg"`　"Gì thế?"@
br
dwave 0,"dat\voice\2_0460.ogg"`　"A... ưm... @
dwave 0,"dat\voice\2_0461.ogg"`Hức... hức... oaaaa!"@
br
dwave 0,"dat\voice\1_0670.ogg"`　"Này! @
dwave 0,"dat\voice\1_0671.ogg"`Sao thế?! @
dwave 0,"dat\voice\1_0672.ogg"`Tự nhiên lại khóc thế chứ!"\

`　Phải mất hồi lâu bạn ấy mới thôi khóc và bình tĩnh trở lại.@
br
`　Chuyện là bố bạn ấy vì công việc nên phải chuyển đi, và họ phải đến sống ở một nơi rất xa.\

dwave 0,"dat\voice\2_0462.ogg"`　"Nhưng bố tớ bảo một ngày nào đó, gia đình tớ sẽ trở về đây. @
dwave 0,"dat\voice\2_0463.ogg"`...vậy nên, mình sẽ gặp lại nhau thôi."@
br
`　Mặc dù nói rất hào hứng, nhưng trông bạn ấy mới buồn làm sao.@
br
dwave 0,"dat\voice\1_0673.ogg"`　"Vậy khi nào chúng mình lên cao trung, hãy cùng học ở đây nhé. @
dwave 0,"dat\voice\1_0674.ogg"`Như thế, chúng mình có thể gặp lại nhau, phải không?"@
br
dwave 0,"dat\voice\2_0464.ogg"`　"Ưm. @
dwave 0,"dat\voice\2_0465.ogg"`...khi ngày ấy đến..."@
br
dwave 0,"dat\voice\1_0675.ogg"`　"Khi ngày ấy đến?"\

dwave 0,"dat\voice\2_0466.ogg"`　"Cậu sẽ nhảy với tớ vào ngày cuối cùng của lễ hội trường nhé?"@
br
dwave 0,"dat\voice\1_0676.ogg"`　"Ý cậu là lửa trại hả? @
dwave 0,"dat\voice\1_0677.ogg"`Nhưng mọi người cũng sẽ nhảy cùng nhau mà?"@
br
dwave 0,"dat\voice\2_0467.ogg"`　"Nên cậu đứng cạnh tớ là được rồi. @
dwave 0,"dat\voice\2_0468.ogg"`Vậy, chúng mình nhảy với nhau nhé."@
br
dwave 0,"dat\voice\1_0678.ogg"`　"Ừa, tớ hiểu rồi. @
dwave 0,"dat\voice\1_0679.ogg"`Tớ sẽ nhảy cùng cậu."@
br
dwave 0,"dat\voice\2_0469.ogg"`　"Chắc chắn ha? @
dwave 0,"dat\voice\2_0470.ogg"`Mình hứa nhé?"@
br
dwave 0,"dat\voice\1_0680.ogg"`　"Ừa, tớ hứa."\

wait 2000

change_b "通学路昼"

`　Sau đó, chúng tôi cùng tận hưởng ngày cuối cùng. Nửa chừng, chúng tôi dừng lại ngang tiệm tạp hóa để mua giấy và một cây bút chì.\
dwave 0,"dat\voice\2_0471.ogg"`　"Cậu định làm gì thế?"@
br
dwave 0,"dat\voice\1_0681.ogg"`　"Tớ viết lại lời hứa để chúng mình không bị quên. @
dwave 0,"dat\voice\1_0682.ogg"`A, khoan nhìn đã."\

dwave 0,"dat\voice\2_0472.ogg"`　"Sao thế?"@
br
dwave 0,"dat\voice\1_0683.ogg"`　"Không có gì hết."@
br
dwave 0,"dat\voice\2_0473.ogg"`　"Tại saooo?"@
br
dwave 0,"dat\voice\1_0684.ogg"`　"Không có gì mà. @
dwave 0,"dat\voice\1_0685.ogg"`Chỉ được đọc khi tớ không có ở đây nhé."@
br
dwave 0,"dat\voice\2_0474.ogg"`　"Hể...? @
dwave 0,"dat\voice\2_0475.ogg"`Tớ tò mò quá à."\

`　Tôi viết xong rồi, nhưng cần thứ gì đó để bỏ vào. Rồi một chiếc hộp ở góc kia đập vào mắt tôi.@
br
dwave 0,"dat\voice\2_0476.ogg"`　"Aaa, cái móc khóa này dễ thương quá!"@
br
`　Bạn ấy nhặt lên một cái.\

dwave 0,"dat\voice\1_0686.ogg"`　"Cái gì thế? @
dwave 0,"dat\voice\1_0687.ogg"`Người tuyết à?"@
br
dwave 0,"dat\voice\2_0477.ogg"`　"Nhìn nè, nhìn nè. @
dwave 0,"dat\voice\2_0478.ogg"`Mình có thể để mấy thứ nho nhỏ vào trong đó."@
br
dwave 0,"dat\voice\1_0688.ogg"`　"Cho vào được thật nè."@
br

`　Tôi gửi số tiền vừa gom lại cho bà cụ đứng sau quầy hàng. Rồi tôi xếp bức thư vào trong và đưa cho bạn ấy ngay tắp lự.\

dwave 0,"dat\voice\1_0689.ogg"`　"Đây, đừng bao giờ làm mất nhé."@
br
dwave 0,"dat\voice\2_0479.ogg"`　"Toshiki-kun không có thư thì có ổn không vậy?"@
br
dwave 0,"dat\voice\1_0690.ogg"`　"Tớ sẽ không bao giờ quên lời hứa này, nên không sao đâu."@
br
dwave 0,"dat\voice\2_0480.ogg"`　"Thật sao?"@
br
dwave 0,"dat\voice\1_0691.ogg"`　"Thật đó. @
dwave 0,"dat\voice\1_0692.ogg"`Vậy nên, đây."@
br
`　Tôi đặt chiếc móc khóa người tuyết trái mùa vào lòng bàn tay bạn ấy.@
br
dwave 0,"dat\voice\2_0481.ogg"`　"Ưm. @
dwave 0,"dat\voice\2_0482.ogg"`Nhất định chúng mình sẽ gặp lại nhau."\

gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000

bg "dat\bg\bg01a_1.jpg",%110
gosub *windowon
dwave 0,"dat\voice\1_0693.ogg"`　"...ư..."@
br
`　Khi tỉnh giấc, trên trán tôi có chườm một tấm khăn ướt.\

change_cc "うに411通常"
dwave 0,"dat\voice\5_0282.ogg"`　"Ông tỉnh rồi à?"@
br
`　Reiji đang lau dọn nhà bếp thì nhận ra và gọi hỏi tôi.\

dwave 0,"dat\voice\1_0694.ogg"`　"Ơ kìa? @
dwave 0,"dat\voice\1_0695.ogg"`Tôi..."@
br
dwave 0,"dat\voice\5_0283.ogg"`　"Đúng là thiếu ngủ mà. @
dwave 0,"dat\voice\5_0284.ogg"`Xỉu ngay lúc đang bận túi bụi... hết nói nổi. @
dwave 0,"dat\voice\5_0285.ogg"`Mà, có tôi lo hết, nên bọn tôi cũng xoay xở được."@
br
dwave 0,"dat\voice\1_0696.ogg"`　"Xin lỗi."\

dwave 0,"dat\voice\5_0286.ogg"`　"Thiệt tình, hết Kagawa rồi đến ông. Tôi phải tính ra kế trước khi bị hai người lây bệnh mất," @
`nó nói, tỏ vẻ ngạc nhiên.@
br
change_cc "うに412にしし"
dwave 0,"dat\voice\5_0287.ogg"`　"Mà, đây là lễ hội cuối cùng rồi, nên cứ nhớ về nó như một kỷ niệm đáng cười thôi."@
br
`　Nó vừa cười nhạt vừa nói. Tôi có cảm giác nó đang chú ý lựa chọn từ cho phù hợp.\

dwave 0,"dat\voice\5_0288.ogg"`　"Giờ chỉ còn buổi bế mạc nữa thôi. @
dwave 0,"dat\voice\5_0289.ogg"`Khóc cười gì thì đây cũng là phần cuối cùng của lễ hội rồi. @
dwave 0,"dat\voice\5_0290.ogg"`Ông nên đi nhảy trong đêm lửa trại để khỏi phải hối tiếc sau này. @
dwave 0,"dat\voice\5_0291.ogg"`Mà tôi chả biết có ai muốn nhảy với ông không nữa."\

mov %289
mov %286,1:bgm "dat\music\bgm\bgm09.mp3";	かなしい

`　Nó chọc ghẹo tôi như thường ngày, nhưng mấy lời đó khiến tôi nhớ về giấc mơ vừa nhìn thấy.@
br
dwave 0,"dat\voice\1_0697.ogg"`　"Nhớ rồi! @
dwave 0,"dat\voice\1_0698.ogg"`Lời hứa là... @
dwave 0,"dat\voice\1_0699.ogg"`Là hãy cùng nhảy với nhau!"@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0292.ogg"`　"Ô, gì nữa đây? @
dwave 0,"dat\voice\5_0293.ogg"`Ra ông có cô nàng bí mật nào à?"\

dwave 0,"dat\voice\1_0700.ogg"`　"Không, là lời hứa của tôi với mối tình đầu. @
dwave 0,"dat\voice\1_0701.ogg"`Tôi nhớ là sẽ vào học trường này cùng cô ấy, và cùng nhảy với nhau trong lễ bế mạc ngày hội trường."@
br
dwave 0,"dat\voice\5_0294.ogg"`　"Vậy ông nên đi tìm cô ấy đi, chứ để lễ hội kết thúc thì ông không còn cách nào thực hiện lời hứa đó nữa đâu. @
dwave 0,"dat\voice\5_0295.ogg"`Được rồi, chúng ta để ngày mai hẵng lau dọn. @
dwave 0,"dat\voice\5_0296.ogg"`Nếu ông nhớ ra lời hứa, hẳn ông phải nhớ tên cô gái ấy chứ? @
dwave 0,"dat\voice\5_0297.ogg"`Nếu nhớ được thì tôi có thể giúp ông tìm cô ấy."\

dwave 0,"dat\voice\1_0702.ogg"`　"Ừa, @
dwave 0,"dat\voice\1_0703.ogg"`cảm ơn ông. @
dwave 0,"dat\voice\1_0704.ogg"`Tên cô gái ấy là..."@
br
`　Tên cô gái ấy... Phải rồi, tên cô ấy là...@
br
dwave 0,"dat\voice\1_0705.ogg"`　"Hazuki... @
dwave 0,"dat\voice\1_0706.ogg"`Mizuna. @
dwave 0,"dat\voice\1_0707.ogg"`Phải, là Mizuna!"@
br
change_cc "うに413真面目"
dwave 0,"dat\voice\5_0298.ogg"`　"...ể? @
dwave 0,"dat\voice\5_0299.ogg"`Hazuki Mizuna..."@
br
dwave 0,"dat\voice\1_0708.ogg"`　"Ông biết cô ấy sao, @
dwave 0,"dat\voice\1_0709.ogg"`Reiji?"@
br
dwave 0,"dat\voice\5_0300.ogg"`　"À không, tôi không biết có phải cùng một người không..."@
br
dwave 0,"dat\voice\1_0710.ogg"`　"Là sao? @
dwave 0,"dat\voice\1_0711.ogg"`Mau nói cho tôi nghe đi!"@
br
dwave 0,"dat\voice\5_0301.ogg"`　"Ông biết đó, năm ngoái, một nữ sinh lớp dưới đã ngã từ tầng thượng xuống và mất mạng, đúng không? @
dwave 0,"dat\voice\5_0302.ogg"`Tên cô gái ấy là..."@
br
`　"..."\

dwave 0,"dat\voice\5_0303.ogg"`　"Không, chắc là do tôi nhớ nhầm rồi. @
dwave 0,"dat\voice\5_0304.ogg"`Mình đi tìm cô ấy, nhé?"@
br
dwave 0,"dat\voice\1_0712.ogg"`　"Không... được rồi. @
dwave 0,"dat\voice\1_0713.ogg"`Tôi sẽ tự đi một mình."\

change_b "学園祭廊下夕"

`　Tôi chạy ra khỏi lớp. Mặt trời đang dần lặn xuống. Tôi có cảm giác mọi thứ sẽ kết thúc khi tia nắng cuối cùng tan biến.@
br
`　Còn một chuyện nữa tôi không thể nhớ. Đầu óc cứ quay cuồng khi tôi chạy dọc hành lang nhuộm ánh chiều tà.\

`　Lúc đi ngang qua một lớp học, bóng ma bằng giấy kia đập vào mắt tôi. Nó nằm trước lớp 2-C. Vốn dĩ tôi không quen học sinh nào ở đây, vì họ đều nhỏ tuổi hơn. Tuy vậy, tôi vẫn đứng trước căn phòng đó. Học sinh đi ra đi vào nhìn tôi với ánh mắt khó hiểu.\

`　Lát sau, một cô gái đeo kính từ trong lớp bước ra và chào tôi. Tôi định nói với em ấy là tôi không cần gì và sẽ đi ngay, nhưng rồi tôi hỏi em về một nữ sinh tên Hazuki Mizuna. Em ấy nhìn tôi bối rối, và nói rằng đó là người bạn cùng lớp đã ngã xuống từ tầng thượng và ra đi cách đây một năm. Ở ngôi trường này, chữ cái bảng tên giữ nguyên khi lên lớp; hay nói cách khác, người đó chắc hẳn học lớp 2-C.\

`　Em học sinh nói với tôi rằng cô bạn ấy không hay chơi với ai. Nhưng không có ai ghét bạn ấy cả; bạn ấy đáp lời bình thường nếu có ai bắt chuyện. Bạn ấy để bím tóc và là một cô gái nhỏ nhắn, dễ thương.@
br
`　Tôi cảm ơn em ấy và đi khỏi đó.\

change_b "体育館夕"

`　Nhiều học sinh đang lau quét nhà thể chất, và số khác đang dọn dẹp sân khấu.\

`　Đêm hội diễn hôm qua... tôi đã bỏ đi trước khi nhóm BROY lên sân khấu. Kagawa... ca sĩ hát chính không thể góp mặt, nhưng tôi không biết đã có chuyện gì xảy ra sau đó. Tôi có cảm giác lạ lùng rằng đã có ai đó hát thay cho cô ấy. Một giọng hát trong trẻo, đầy đau đớn, vang vọng khắp phòng. Dù chỉ nghĩ thoáng qua, nhưng ai là người đã đứng trên sân khấu?\

change_b "自販機前夕"

`　Tôi đi ngang qua nhà thể chất và xuống hành lang lần nữa, để rồi nhận ra mình đã đứng trước máy bán hàng tự động tự khi nào.@
br
`　Thở ra nặng nhọc, tôi khựng lại chống tay lên đùi, mồ hôi chảy thành giọt. Tôi muốn một lon coca lạnh, nên lấy trong ví ra ít tiền lẻ. Đang loay hoay thì đồng 100 yên tuột khỏi tay tôi và lăn đi mất.\

change_b "階段夕"

`　Tôi đuổi theo đồng xu, và nó lật úp ngay dưới chân cầu thang dẫn lên tầng thượng. Tôi lấy một hơi dài và bước lên cầu thang.@
br
`　Tôi băng ngang qua tấm biển báo và sợi dây cấm vào, đứng trước cánh cửa mở ra tầng thượng. Tôi thử mở cửa, nhưng nó bị khóa và không hề nhúc nhích.\

dwave 0,"dat\voice\1_0714.ogg"`　"Chết tiệt!"@
br
`　Tôi lấy cả hai tay đập mạnh vào cửa.\

`　"...!"@
br
`　Chiếc móc khóa thân quen nằm trên mặt đất ngay trước mặt tôi.\

dwave 0,"dat\voice\1_0715.ogg"`　"Móc khóa này... là quà tặng Tóc bím..."@
br
`　Tóc bím? Không. Đó không phải là tên cô gái tôi đã hẹn ước.\

`　...nhưng tại sao tôi lại biết đến cái tên này cơ chứ? Người con gái để tóc bím, nhỏ con và mảnh khảnh nhưng ngực thì hơi phồng, thích nhóm Red Ai, có thể hát rất hay, thích ở một mình, và trên hết, lúc nào cũng mang nỗi buồn thăm thẳm trong ánh mắt...\

`　Chắc chắn tôi biết em. Tôi đã gặp em.@
br
`　Tôi đã gặp em vào hôm trước lễ hội, phía sau cánh cửa này. Em đã lay chuyển bao khán giả ở khán phòng, và vào ngày hội hôm nay, chúng tôi đã đi dạo cùng nhau.\

`　Màn sương mờ mịt giăng phủ ký ức tôi cuối cùng cũng dần tan biến.@
br
`　Đúng rồi. Tôi vừa phải xa rời em ngày hôm nay, ngay trước khi lễ bế mạc bắt đầu. Nhưng em được bảo là đã không còn nữa từ một năm trước... và chắc chắn là vẫn ở đây, trong ký ức của tôi.@
br
`　Sự mâu thuẫn càng lúc càng dâng cao. Nhưng tôi chỉ mong mỏi một điều.\

`　―Tôi muốn gặp em.@
br
`　Nắm thật chặt móc khóa hình người tuyết, tôi mở dây kéo phía sau. Bên trong là bức thư tôi đã đặt vào và tặng cô bé ngày ấy. Tôi nhẹ nhàng lấy ra và mở bức thư được gấp lại cẩn thận. Đã bao nhiêu lần em mở ra để xem? Có những lỗ nhỏ trên nếp giấy, và tờ giấy gần như đã sờn màu. Ở đó, nằm trên phần giấy nhấp nhô là lời hứa, được viết lộn xộn và đầy lỗi chính tả.\

change_b "ＣＧ９１＿１"

br
br
br
`　Hãy cùng vào học
`　Trường Cao trung Uminari Koutou
`　Và cùng nhảy bên nhau trong ngày lễ hội trường.
br
br
br
`　　　　　　　　　　　Sugai Toshiki\

gosub *windowoff
mov %287
mov %286,1:bgm "dat\music\bgm\bgm07.mp3";	しっとり
bg white,%110
wait 1000
gosub *windowon

dwave 0,"dat\voice\1_0689.ogg"`　"Đây, đừng bao giờ làm mất nhé."@
br
dwave 0,"dat\voice\2_0479.ogg"`　"Toshiki-kun không có thư thì có ổn không vậy?"@
br
dwave 0,"dat\voice\1_0690.ogg"`　"Tớ sẽ không bao giờ quên lời hứa này, nên không sao đâu."@
br
dwave 0,"dat\voice\2_0480.ogg"`　"Thật sao?"\

gosub *windowoff
bg "dat\bg\bg03_2.jpg",%110
gosub *windowon

`　―Phải rồi.@
br
`　Tôi vẫn chưa làm tròn lời hứa đó.@
br
`　Tôi đã nói sẽ không bao giờ quên, nhưng tôi đã quên.@
br
`　Còn em vẫn tiếp tục tìm kiếm tôi, vẫn tin rằng tôi còn nhớ.\

`　Và một năm trước, dòng suy nghĩ ấy đã đứt đoạn. Lời hứa sẽ không bao giờ được thực hiện.@
br
`　Phải. Vì em không còn trên cõi đời này nữa.\

`　Nhưng dù vậy, nếu còn khả năng nào đó phía sau cánh cửa này... Không, nếu tôi nghĩ về khả năng này, SẼ không thể nào có. Thật lố bịch khi có thể nghĩ đến điều như vậy, và giờ tôi thấy thật buồn cười. Dù vậy, kể cả khi tôi nói như thế, nếu còn một cơ hội dù là mỏng manh nhất, tôi vẫn muốn thử đặt niềm tin vào nó.\

`　Tôi thử lại và đẩy cánh cửa.@
br
`　Chỉ để thực hiện lời hứa. Chỉ một ước nguyện.@
br
br
`　―Chỉ một lần nữa thôi, ở bên kia cánh cửa...\

gosub *windowoff
bg white,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000
bg black,10,3000

mov %288
mov %286,1:bgm "dat\music\bgm\bgm08.mp3";	かいそう
bg "dat\bg\bg08a.jpg",%110
gosub *windowon
dwave 0,"dat\voice\2_0427.ogg"`　"Milk, hôm nay mình cùng chơi nào."@
br
`　Đó là lời đầu tiên cô ấy sẽ nói.\

`　Tôi đã trú ngụ trong ngôi trường này hơn mười năm. Gần đây, có một cô nhóc đến nói chuyện với tôi hằng ngày. Một thời gian sau, cô ấy bắt đầu gọi tôi bằng cái tên đó. Cô ấy nói với tôi về những việc không ngoan mà cô ấy lỡ làm, hay chỉ đến để than thở.\

`　Từ khi nào? Ánh mặt trời thật chói chang; đã là giữa mùa hạ rồi.@
br
`　Tôi không còn nhỏ nữa, khi trông thấy bóng cô ấy dưới sân trường, tôi mới buồn ngủ làm sao và cái nắng khiến tôi thấy khó chịu, nên tôi làm ngơ và bỏ chạy. Sau đó tôi nhận ra, có một cậu bé lạ lẫm đứng sau cô ấy.\

`　Kể từ ngày ấy, cô bé và cậu bé cùng chơi với nhau. Cả hai như nắm giữ một bầu không khí chỉ thuộc về nhau.@
br
`　Rồi cô bé hạnh phúc kể cho tôi về thời gian ở bên cậu bé. Cô bé nói tôi nghe về những nơi họ đi, họ làm gì và những điều tương tự thật nhiều lần.\

`　Nhưng chuyện đó không thể kéo dài được mãi.\

`　Một ngày nọ, cô bé đột ngột bảo tôi rằng sẽ chuyển đi, và họ sẽ không thể gặp nhau trong một thời gian dài. Nhưng cô bé nói họ đã hứa sẽ tái ngộ một ngày nào đó, rồi cho tôi xem một vật nho nhỏ, màu trắng, hình bầu dục. Cô bé nói đầy tự tin rằng chắc chắn mình sẽ không thấy cô đơn, và cuối cùng nói 'Tạm biệt' rồi ra đi.\

`　Ngày hôm sau cô bé ấy không tới nữa. Cậu bé dạo quanh ngôi trường thêm vài ngày, nhưng thứ gọi là "kì nghỉ hè" cũng kết thúc, và cả cậu bé, cũng không bao giờ xuất hiện nữa.\

gosub *windowoff
wait 2000

bg white,%110
gosub *windowon
`　Bao năm tháng trôi qua.\

change_b "校門通常時昼"

`　Tôi không chạy ra khỏi trường nữa. Cơ thể tôi bắt đầu chậm chạp, và cũng chẳng có việc gì để ra ngoài, nên tôi nghĩ có thể sống phần đời còn lại trong yên bình, thế là vui rồi.\

`　Mặc thời gian thoi đưa, tôi cứ nằm ngắm ra cổng trường mãi như ngày ấy.\

`　Khi ánh dương đã mờ dần, một cô gái đi ngang qua, một mình. Cô ấy chưa từng vào ngôi trường này lần nào, và mặc bộ đồ được gọi là đồng phục trường sơ trung. Trên cặp đeo một thứ gì đó hình bầu dục màu trắng.@
br
`　Nhìn kĩ lại, tôi nhận ra đó là cô bé từ thuở nào. Khi nhìn thấy tôi, cô ấy chạy băng qua ngay, dù không phải học sinh trường này.\

`　Cô gái tràn đầy hạnh phúc cười nói với tôi, kể về chuyện bao lâu nay. Tôi nhận ra cơ thể cô ấy đã thay đổi, nhưng đó vẫn là cô bé năm xưa.@
br
`　Cô ấy nói với tôi là một ngày nào đó sẽ tìm ra cậu bé. Chẳng hiểu sao, họ nhầm tưởng khối học của mình, rằng thật ra cậu bé ấy học trên cô một năm. Nếu cậu bé nhớ lời hứa, chắc chắn cậu ấy sẽ tới ngôi trường này. Và, cuối cùng, tôi cứ tiếp tục dõi theo cô bé.\

gosub *windowoff
wait 2000
bg white,%110
bg "dat\bg\bg08a.jpg",%110
gosub *windowon

`　Đã là mùa hoa anh đào nở rộ. Tôi nhìn mặt các học sinh một cách vô thức. Giữa họ có một gương mặt tôi đã luôn tìm kiếm. Cậu ấy không nói chuyện với người xung quanh, và dường như không lo nghĩ về chuyện gì cả. Chỉ cần liếc mắt tôi cũng đủ biết đó là cậu bé ngày trước.@
br
`　Tôi không biết cậu ấy có nhớ lời hứa với cô gái kia không, nhưng dường như anh chàng chỉ chú tâm đến mỗi việc là đi học hay nghỉ ở nhà. Dù sao, đó chỉ là suy nghĩ của riêng tôi.\

gosub *windowoff
wait 2000
bg white,%110
gosub *windowon

`　Một năm nữa trôi qua, và cô gái ấy cũng trở thành học sinh của ngôi trường này.\

`　Nhưng lúc bấy giờ, tuổi của tôi đã ngang ngửa lão nhân trăm năm thọ mạng, và sức khỏe cũng yếu đi thấy rõ. Dù vậy, sau khi cô gái vào học, tôi muốn cho cô ấy thấy một chốn cực hay, nên đã gắng sức trèo lên cầu thang. Khốn khổ thay cho cơ thể già nua này.\

change_b "屋上昼過去"

`　Có được cơ hội, tôi dẫn cô ấy lên tầng thượng. Đây là nơi tuyệt đẹp để ngắm nhìn bầu trời và mặt biển hòa làm một. Cô gái ấy, cũng thấy thích nơi này.\

`　Kể từ đó, cô gái ấy trò chuyện với tôi mỗi khi thời tiết chuyển tốt. Mỗi khi lên tầng thượng, cô ấy sẽ bế tôi lên và ôm tôi đi cùng.\

`　Mặc dù cô ấy đã tới trường này, nhưng vẫn chưa gặp mặt cậu chàng chờ đợi bấy lâu. Chuyện ấy làm tôi cáu tiết vì cô nàng chẳng chịu nói gì hết, vì cô là một người nhút nhát. Như thể không có gì có thể thúc giục cô ấy cả.\

gosub *windowoff
bg white,%110
wait 2000
gosub *windowon

`　Nhiều tuần trôi qua, và mùa hạ lại sắp đến.\

`　Cái thứ gọi là "lễ hội" cũng chuẩn bị diễn ra ở trường này. Những hoạt động náo nhiệt thật quá sức cho cơ thể èo ọt này của tôi, nhưng có vẻ như cô gái sẽ làm tròn lời hứa với cậu ấy vào ngày đó. Cô nói với tôi rằng sẽ liên lạc với cậu ấy vào hôm trước lễ hội trường.\

`　Liệu cậu ấy có nhớ cô không? Liệu cậu ấy có nhớ lời hứa ấy? Cô gái trở nên rất lo sợ.@
br
`　Cô ấy lo lắm, và vẫn chưa bắt chuyện với cậu ấy. Cơ thể tôi đã đến giới hạn rồi, nhưng trước khi ra đi, chí ít tôi phải thấy được cái ngày lời hứa của cô ấy được vẹn toàn.\

gosub *windowoff
wait 2000
bg "dat\bg\bg04a_2.jpg",%110
gosub *windowon

`　Một hôm, cô ấy ở lại muộn để chuẩn bị cho lễ hội, và dẫn tôi lên tầng thượng vào chiều muộn.@
br
`　Khi mở cửa ra, tôi thấy nơi đây không trong xanh như bình thường, mà là một thế giới trải dài trong sắc đỏ tươi. Cô ấy đặt tôi xuống và bước lại bờ rào.\

`　Cô ấy đặt tay lên thanh rào chắn như thường lệ, và khi cô thốt lên 'Thật đẹp quá', chuyện ấy xảy ra.\

stop
change_b "屋上夕テープ無し"
`　Một tiếng rắc dữ dội, cả cô gái lẫn phần rào chắn đều rơi về phía trước. Dường như cô ấy còn chưa biết chuyện gì đang xảy ra, thì đã nằm trong thế giới ngập màu chết chóc.\

`　Tôi sợ hãi nhìn ngang qua rào chắn đã gãy và thấy cơ thể của cô gái tội nghiệp.\

gosub *windowoff
bg white,%110
gosub *windowon

`　Gắng hết sức với cơ thể gần quỵ, tôi lao vội xuống cầu thang đến bên cô gái ấy.@
br
`　Ngay bên cạnh nơi cô nằm xuống... vũng nước xung quanh phủ một màu đỏ, đỏ thẫm hơn cả màu sắc của ánh trời đổ từ hướng Tây.\

`　Cô gái đã hoàn toàn bất động.@
br
`　Màu đỏ ấy lan rộng ra.\

`　Vào thời điểm đó, hầu hết học sinh đã ra về. Tôi không thể làm gì và chỉ biết khóc. Hồi lâu, một giáo viên đi ngang qua. Nhìn thấy cô gái, giáo viên bật khóc, 'Ôi không!' và chạy ngược vào trong.@
br
`　Ngay sau đó, tiếng còi hụ vang lên, và một xe cấp cứu lao thẳng đến trường.\

`　Học sinh còn ở lại trường phát hiện ra và tập trung quanh khu vực đó.\

`　Chiếc xe cấp cứu lại lao khỏi. Sau khi cô ấy đi, tôi lặng lẽ rời khỏi chỗ đất. Cặp của cô gái nằm gần đó. Trên cặp là móc chìa khóa màu trắng... cô ấy bảo tôi vào mùa đông, nó được gọi là người tuyết, và nó được đắp từ quả cầu tuyết.\
`　Tôi cắn xé sợi dây da trên vòng móc khóa bằng răng, ngặm vật đó vào miệng, và rời đi.\

mov %289
mov %286,1:bgm "dat\music\bgm\bgm09.mp3";	かなしい

`　For my species, if I could surpass a hundred human years, I would become a mythical cat demon. But if I didn't want to strongly enough, I couldn't become one.\

`　If I were to turn into one, I could use black magic. I probably couldn't bring her back to life, but I might at least be able to carry out her feelings.\

`　There was one more year until I could. I spent my days just wishing fervently that I would be able to help her.\

bg "dat\bg\bg03_1.jpg",%110

`　It was only one year, but to me it felt like an eternity.@
br
`　From that day on, the path to the roof was chained, and a no entry sign was put up.@
br
`　I placed the keychain in front of the door, hoping.\

`　―I wanted to grant her wish.\

gosub *windowoff
bg black,%110
stop
gosub *windowon

`　What should I do? For an instant, I thought the lights dimmed right before me, and all of a suddent a linear light went right through me. In the next moment, my lead-like heavy body became light.@
br
`　I'd finally turned into a mythical cat.\

`　Knowledge of magic surged into me. I knew that if I overused the magic, I would be terminated and would cease to exist in this world, but the loss of my existence would affect no other life than that of the girl.\

`　Without hesitiating, I looked into my newly acquired store of knowledge on how to grant her wish, using the strongest magic I possibly could.\

`　Then, I found it.\

`　From the remaining thoughts of the deceased, one's dreams could be infused with reality, and there, the deceased could be made to exist.@
br
`　In other words, I could have reality exist within my dreams. Reality was what I dream. Within it, the people there would have to be in my memory to a certain extent in order for it to work. People that had already died could exist, but what already happened could not be changed. Once the dream was over, it would be as if nothing had happened, memories of the deceased would disappear, and they would once again continue with reality.\

`　If I used this method, there was no doubt that I would disappear. And above that, the dream would disappear, too. And... if I used this to resurrect her, would she be happy? It could be that I wanted to do would be cruel to both the girl and the boy.@
br
`　However, I was willing to make the gamble.\

mov %288
mov %286,1:bgm "dat\music\bgm\bgm08.mp3";	かいそう
bg "dat\bg\bg04_1.jpg",%110

`　It was the eve of the festival. I closed my eyes and released the spell. The girl's thoughts within the keychain were ten times more than enough. From that, I formed her. This location also reverted to the way it was a year ago. The no-entry sign disappeared, and the door unlocked.\

`　The girl herself knew that she was created. She understood that this was just a fleeting dream. She also noticed that I was putting my own life on the line for her, but also for my own sake. Still, she said to me, 'Thank you'.\

`　How far would this dream go...? My magic wouldn't be able to last that long.@
br
`　But if I didn't do this now, it would be meaningless. If I did this after the boy graduated, her dream wouldn't come true.\

`　And finally, on the roof, the girl and the boy would finally meet again.@
br
`　At the moment, the boy was off buying drinks. Upon seeing him, the girl broke down in tears. Her happiness faded before long, and she wept for her own fate.\

`　Not wanting him to see her crying face, she went back up to the roof.\

gosub *windowoff
wait 2000
bg white,%110
gosub *windowon
`　Time passed, the eve of the festival was over, and the festival was about to begin.@
br
`　Everything depended on this day. If I wanted to regret using this spell, it would have to be after this day.\

`　The girl would enjoy that day with the boy. But during the middle of it, I could feel my senses gradually fading.@
br
`　The spell had already gone on too long, but I wanted to at least finish this day. And, despite everything, the girl began to disappear from everyone's memories. However, the only one that hadn't forgotten her was the boy.\

change_b "屋上夕"

`　It was on the evening sun-bathed roof. With my fading consciousness, I watched the two of them. The girl spoke openly to the boy about the past.@
br
`　That she was the girl in their promise.@
br
`　That the promise was to dance together on the last night of the festival.@
br
`　That what he was seeing was nothing but a dream.\

`　And that when he woke up from this dream, he would forget she'd ever existed.@
br
`　My species loathe the idea of our masters seeing us die. That girl was like a master to me. I left the roof to find my deathbed, and descended the stairs.\

change_b "階段夕"

`　I'd definitely done something cruel to her. In the end, she hadn't been able to fulfill her promise. Cat demons have always existed to cause catastrophes for humans. After all, a cat demon is a cat demon. I wasn't meant to create happiness for any human.\

`　However, I still had one wish, and that was no other than the boy's desire.@
br
`　The boy was still tied into my spell; his love for the girl continued, and he yearned for her. Through his sentiments, he might be able to pull her out from this dream, and hold onto that feeble existence.\

`　From my irresponsible and egotistic dream... I would leave it to him to determine the girl's happiness.\

`　No... in the very end, the person who decided would have to be herself...\

bg black,10,3000

br
br
br
br
br
`　I wish,
`　　　For the two of them to wake in happiness...\

gosub *windowoff
wait 2000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000

bg white,10,3000
mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ
bg "dat\bg\bg04_2.jpg",18,5000,"dat\ef\effect03.bmp"	;夕日の差込

gosub *windowon
`　A crimson world was spread out. Between the undistinguishable horizon of the sky and the ocean, the light of the disappearing sun, and me, she was crying.@
br
dwave 0,"dat\voice\2_0483.ogg"`　"...Toshiki-senpai...?"@
br
change_cc "おさげ145うつむき泣き"
`　Her shadow overlapped onto me.\

dwave 0,"dat\voice\2_0484.ogg"`　"Huh? @
dwave 0,"dat\voice\2_0485.ogg"`...I didn't disappear yet? @
dwave 0,"dat\voice\2_0486.ogg"`You can see me? @
dwave 0,"dat\voice\2_0487.ogg"`You remember me?"@
br
dwave 0,"dat\voice\1_0716.ogg"`　"... what are you trying to say?"@
br
`　I didn't quite understand the situation myself.\

`　She'd said goodbye to me, disappearing into the light.@
br
`　I'd opened the door I couldn't open earlier and came here.@
br
`　I couldn't understand what had just happened up til now.\

`　But none of that mattered.@
br
`　I rushed to her and put my arms around her.\

mov %290
mov %286,1:bgm "dat\music\bgm\bgm10.mp3";	こくはく

dwave 0,"dat\voice\2_0488.ogg"`　"...this is... no good. @
dwave 0,"dat\voice\2_0489.ogg"`I'm just going to disappear. @
dwave 0,"dat\voice\2_0490.ogg"`From this world, from your memories..."\

dwave 0,"dat\voice\1_0717.ogg"`　"I'm not very smart, so I don't understand the situation or what's going to happen later. But I can understand this. @
dwave 0,"dat\voice\1_0718.ogg"`That right now, you're definitely here. @
dwave 0,"dat\voice\1_0719.ogg"`Because you're here, I can touch you like this, and you can also cry like that.\

dwave 0,"dat\voice\1_0720.ogg"`And above all, I can feel your warmth. @
dwave 0,"dat\voice\1_0721.ogg"`The warmth of your body- I can't feel that in a dream. @
dwave 0,"dat\voice\1_0722.ogg"`And even if you say you're just a dream, I can never believe that."\

`　To prove that, I hugged her tightly. Her delicate body trembled a little.@
br
dwave 0,"dat\voice\2_0491.ogg"`　"Toshiki-senpai... @
dwave 0,"dat\voice\2_0492.ogg"`I don't know what to do."@
br
dwave 0,"dat\voice\1_0723.ogg"`　"Then, just don't think."@
br
dwave 0,"dat\voice\2_0493.ogg"`　"Huh?"\

dwave 0,"dat\voice\1_0724.ogg"`　"We promised to be a couple today, right? @
dwave 0,"dat\voice\1_0725.ogg"`And we promised long ago that we would dance at the closing ceremony. @
dwave 0,"dat\voice\1_0726.ogg"`The only things we need to think about are fulfilling those promises. @
dwave 0,"dat\voice\1_0727.ogg"`If you keep crying, the ceremony will start, and you'll have to dance with a puffy face."@
br
`　As I said that, her tears kept coming and she pressed her face against my chest.\

dwave 0,"dat\voice\1_0728.ogg"`　"Hey, hey. @
dwave 0,"dat\voice\1_0729.ogg"`I told you not to cry."@
br
change_cc "おさげ146泣き"
dwave 0,"dat\voice\2_0494.ogg"`　"I- I know... but these are tears of happiness. @
dwave 0,"dat\voice\2_0495.ogg"`Just a little more... if I cry all I can just a little more, I can smile again... so just a little more..."@
br
dwave 0,"dat\voice\1_0730.ogg"`　"Is that a promise?"@
br
dwave 0,"dat\voice\2_0496.ogg"`　"I... promise."\

gosub *windowoff
change_d "中消去"
wait 2000
gosub *windowon
`　How long was it until she stopped crying? The sun was starting to disappear beneath the horizon, and we began to be covered in a veil of darkness.@
br
change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0497.ogg"`　"Thank you. @
dwave 0,"dat\voice\2_0498.ogg"`I'm okay now."@
br
`　Her eyes were red, but she smiled as she spoke.\

dwave 0,"dat\voice\2_0499.ogg"`　"Toshiki-senpai, @
dwave 0,"dat\voice\2_0500.ogg"`I have a request."@
br
dwave 0,"dat\voice\1_0731.ogg"`　"What is it?"@
br
dwave 0,"dat\voice\2_0501.ogg"`　"From now on, can you call me by my name?"@
br
dwave 0,"dat\voice\1_0732.ogg"`　"Request denied. @
dwave 0,"dat\voice\1_0733.ogg"`Calling you 'You' or 'Braidy' is enough."@
br
change_cc "おさげ143ええー"
dwave 0,"dat\voice\2_0502.ogg"`　"No way~"\

`　It was just that I found calling girls by their first names embarrassing, so I couldn't do it. Even with guys, Reiji was about the only one I could casually call out to.@
br
change_cc "おさげ116照れ"
dwave 0,"dat\voice\2_0503.ogg"`　"...then, Toshiki-senpai, @
dwave 0,"dat\voice\2_0504.ogg"`I have a different request instead."@
br
`　Shyly, she put her arms around my neck and stood on her tiptoes.@
br
dwave 0,"dat\voice\2_0505.ogg"`　"It's just for a little while, so could you lean over a little? @
dwave 0,"dat\voice\2_0506.ogg"`I can't reach."@
br
`　She didn't tell me what, but it wasn't hard to guess what she wanted to do.\

dwave 0,"dat\voice\1_0734.ogg"`　"What do you want to do?"@
br
`　Even though I knew, I smiled and asked her. It was fun to watch her shaking on her tiptoes, but more than anything it was adorable.@
br
dwave 0,"dat\voice\2_0507.ogg"`　"Geez! @
dwave 0,"dat\voice\2_0508.ogg"`Please don't make fun of me in a moment like this!"@
br
`　Blushing, she pouted.\

`　I wanted to be mean again.@
br
dwave 0,"dat\voice\1_0735.ogg"`　"Nope. @
dwave 0,"dat\voice\1_0736.ogg"`I don't know what you want to do, so I have to deny that request."@
br
change_cc "おさげ121もー"
dwave 0,"dat\voice\2_0509.ogg"`　"Ahh! @
dwave 0,"dat\voice\2_0510.ogg"`You're so mean! @
dwave 0,"dat\voice\2_0511.ogg"`You're going to make a girl say something embarrassing like that?!"@
br
dwave 0,"dat\voice\1_0737.ogg"`　"Come on. @
dwave 0,"dat\voice\1_0738.ogg"`Don't be stubborn; you'll feel better once you tell me. @
dwave 0,"dat\voice\1_0739.ogg"`Do I need to give you a truth serum?"@
br
dwave 0,"dat\voice\2_0512.ogg"`　"Am I some kind of criminal?! @
dwave 0,"dat\voice\2_0513.ogg"`Geez... Toshiki-senpai..."\

dwave 0,"dat\voice\1_0740.ogg"`　"Yes?"@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0514.ogg"`　"You... @
dwave 0,"dat\voice\2_0515.ogg"`really are the one I love."@
br
dwave 0,"dat\voice\1_0741.ogg"`　"Where'd that come from?"@
br
dwave 0,"dat\voice\2_0516.ogg"`　"It's okay if you don't get it. @
dwave 0,"dat\voice\2_0517.ogg"`I just wanted to tell that to myself again."@
br
dwave 0,"dat\voice\1_0742.ogg"`　"Weirdo."@
br
`　Shocked, I lowered my head with my eyes closed and breathed the word.\

gosub *windowoff
change_d "中消去"
mov %287
mov %286,1:bgm "dat\music\bgm\bgm07.mp3";	しっとり
wait 1000
gosub *windowon
`　"...!"@
br
`　The next instant, I felt her soft lips moving gently, warm against mine.@
br
`　I'd let my guard down, and I backed away in surprise, probably making a ridiculous face. Her expression full of laughter, she told me triumphantly, @
change_cc "おさげ142笑顔"
dwave 0,"dat\voice\2_0518.ogg"`"Ahaha. @
dwave 0,"dat\voice\2_0519.ogg"`Gotcha."\

dwave 0,"dat\voice\1_0743.ogg"`　"Wait! @
dwave 0,"dat\voice\1_0744.ogg"`That didn't count! @
dwave 0,"dat\voice\1_0745.ogg"`You cheated!"@
br
dwave 0,"dat\voice\2_0520.ogg"`　"What?! @
dwave 0,"dat\voice\2_0521.ogg"`It counted! @
dwave 0,"dat\voice\2_0522.ogg"`That was about one point I got from you."@
br
dwave 0,"dat\voice\1_0746.ogg"`　"You just stole my first kiss!"\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0523.ogg"`　"Senpai, you actually mind things like that?"@
br
dwave 0,"dat\voice\1_0747.ogg"`　"It's not surprising."@
br
change_cc "おさげ113ふふーん"
dwave 0,"dat\voice\2_0524.ogg"`　"That's because you don't tell me anything in the first place."@
br
`　She closed her eyes and began to lecture me.@
br

change_b "ＣＧ０５＿１"

dwave 0,"dat\voice\2_0525.ogg"`　"...mmph!"@
br
`　This time it was me that snatched away her lips. I held her head firmly with my right arm and hugged her tightly with my left to prevent her from escaping.\

dwave 0,"dat\voice\2_0526.ogg"`　"Mmh..."@
br
change_b "ＣＧ０５＿２"
`　She breathed softly and looked at me with sad eyes, but I ignored it and didn't let her break away.@
br
change_b "ＣＧ０５＿１"
`　She closed her eyes once more and devoted herself to me.\

`　Her sensation... her existence... in order to confirm it again, I pulled her close and we kissed for a long, long time, almost to the point of lightheadedness.\

gosub *windowoff
bg black,%124
wait 2000
change_b "ＣＧ９２＿１"
wait 2000
change_b "ＣＧ９２＿２"
wait 2000
gosub *windowon

`　There was a sudden boom. Without breaking the kiss, I glanced in the direction of the noise. Fireworks were coming from the grounds- a signal that the closing ceremony was beginning.@
br
`　The sun was gone, with only a bit of the horizon still red. We were surrounded by darkness, with only the rocketing fireworks shining on us.@
br
`　Reasonating with heavy rumbles, one light dissolved into many, floating away into the dark.\

change_b "屋上夜"

`　―At length, our lips separated.@
br
`　She had an intoxicated look in her eyes and was out of breath. I caressed her head, and she buried it into my chest, murmuring.\

change_cc "おさげ116照れ"
dwave 0,"dat\voice\2_0527.ogg"`　"...idiot."\
gosub *windowoff
bg black,%110
wait 3000
change_b "屋上夜"
gosub *windowon
`　After that, the two of us sat and cuddled, watching the fireworks.\

change_cc "おさげ131あさって"
dwave 0,"dat\voice\2_0528.ogg"`　"It's beautiful," @
`she said in a breathy voice. Her voice, rather than the fireworks, echoed in my ears. I brushed her hair gently, just once. She looked at me with a questioning face.\

dwave 0,"dat\voice\1_0748.ogg"`　"Let's go, @
dwave 0,"dat\voice\1_0749.ogg"`Mizuna."@
br
`　I stood up and held my hand out to her.@
br
change_cc "おさげ132気付く"
dwave 0,"dat\voice\2_0529.ogg"`　"What? @
dwave 0,"dat\voice\2_0530.ogg"`Did you just..."@
br
`　Looking down at the grounds, there was no doubt the campfire was being lit.@
br
dwave 0,"dat\voice\1_0750.ogg"`　"Look, if we don't hurry, the fire will burn out."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0531.ogg"`　"Ah, okay!"@
br
`　She took my hand and got up. Holding hands, we headed to the grounds to fulfill our promise.\

change_b "廊下夜"

dwave 0,"dat\voice\5_0305.ogg"`　"Hey, Toshiki!"@
br
gosub *windowoff
change_cl "うに411通常"
change_cr "おさげ111通常"
gosub *windowon
`　Spotting me, Reiji came running up to me from the hall.@
br
dwave 0,"dat\voice\5_0306.ogg"`　"Huh? @
dwave 0,"dat\voice\5_0307.ogg"`The girl next to you..."@
br
dwave 0,"dat\voice\1_0751.ogg"`　"What's wrong with Braidy?"@
br
change_cr "おさげ121もー"
dwave 0,"dat\voice\2_0532.ogg"`　"I told you, don't call me Braidy!"@
br
dwave 0,"dat\voice\5_0308.ogg"`　"Um... oh! @
dwave 0,"dat\voice\5_0309.ogg"`Why am I spacing out? @
dwave 0,"dat\voice\5_0310.ogg"`It's you, Mizuna-chan. @
dwave 0,"dat\voice\5_0311.ogg"`It was dark, so I couldn't tell."\

change_cr "おさげ111通常"
`　Even though he'd said that, Reiji looked confused and went on muttering to himself.@
br
dwave 0,"dat\voice\5_0312.ogg"`　"Hm? @
dwave 0,"dat\voice\5_0313.ogg"`But when we split, I was looking for Mizuna-chan by myself... @
dwave 0,"dat\voice\5_0314.ogg"`Why was I looking for her? @
dwave 0,"dat\voice\5_0315.ogg"`Huh? @
dwave 0,"dat\voice\5_0316.ogg"`For some reason I feel kinda weird today..."@
br
dwave 0,"dat\voice\1_0752.ogg"`　"It's okay. @
dwave 0,"dat\voice\1_0753.ogg"`There's always something wrong with your head."@
br
dwave 0,"dat\voice\5_0317.ogg"`　"What did you say? @
dwave 0,"dat\voice\5_0318.ogg"`And what about you?"@
br
dwave 0,"dat\voice\1_0754.ogg"`　"I don't have as many red marks as you do."\

dwave 0,"dat\voice\5_0319.ogg"`　"Geez. @
dwave 0,"dat\voice\5_0320.ogg"`We'll probably end up in Mizuna-chan's class next year."@
br
change_cr "おさげ112笑顔"
dwave 0,"dat\voice\2_0533.ogg"`　"If such interesting senpai such as you two come to my class, I'll gladly cheer you both on."@
br
dwave 0,"dat\voice\1_0755.ogg"`　"Stop, Braidy. @
dwave 0,"dat\voice\1_0756.ogg"`Don't even joke about that."@
br
dwave 0,"dat\voice\2_0534.ogg"`　"But can't you tell I'm serious?"\

change_cl "うに412にしし"
dwave 0,"dat\voice\5_0321.ogg"`　"Oh, right. @
dwave 0,"dat\voice\5_0322.ogg"`I wanted to tell you something. @
dwave 0,"dat\voice\5_0323.ogg"`Kagawa couldn't sing at the opening festival, right? @
dwave 0,"dat\voice\5_0324.ogg"`So we got the chance to do another concert on the special grounds when the festival ends. @
dwave 0,"dat\voice\5_0325.ogg"`We'll be here til the end, so make sure you go listen, okay?"\

dwave 0,"dat\voice\1_0757.ogg"`　"Oh, Kagawa is alright now?"@
br
dwave 0,"dat\voice\5_0326.ogg"`　"She's not in perfect condition, but she can sing. @
br
dwave 0,"dat\voice\5_0327.ogg"`Regardless, she won't be satisfied until she sings. @
dwave 0,"dat\voice\5_0328.ogg"`That's how she is."\

change_cr "おさげ142笑顔"
dwave 0,"dat\voice\2_0535.ogg"`　"Wow. @
dwave 0,"dat\voice\2_0536.ogg"`This time I'll get to hear Kagawa sing A Dream of Summer, right?"@
br
dwave 0,"dat\voice\5_0329.ogg"`　"Yes."@
br
dwave 0,"dat\voice\1_0758.ogg"`　"But if you do it on the grounds, won't the neighborhood complain? @
dwave 0,"dat\voice\1_0759.ogg"`The school gave us the okay."@
br
dwave 0,"dat\voice\5_0330.ogg"`　"They're not complaining about the fireworks or the campfire noises, so it shouldn't be a problem."@
br
dwave 0,"dat\voice\1_0760.ogg"`　"Yeah, you're right."\

change_cl "うに411通常"
dwave 0,"dat\voice\5_0331.ogg"`　"Well, I was in the middle of cleaning the classroom, so I gotta go back. @
dwave 0,"dat\voice\5_0332.ogg"`Toshiki, you don't have to worry about it, so just have fun dancing with Mizuna-chan, okay?"@
br
dwave 0,"dat\voice\1_0761.ogg"`　"Oh, sorry about that."@
br
dwave 0,"dat\voice\5_0333.ogg"`　"I'll just leave your share for you to clean up tomorrow."@
br
`　He smiled and waved, and then disappeared down the hall.\

change_d "左消去"
dwave 0,"dat\voice\2_0537.ogg"`　"Reiji-senpai is a good guy."@
br
dwave 0,"dat\voice\1_0762.ogg"`　"Hmm... yeah, I guess so."\

change_b "キャンプファイヤー"

`　In the middle of the grounds, as the festival ended, non-reusable lumber and decorations would now be used as kindling. In it was the ridiculously large yakisoba sign. With its slowly burning light, the atmosphere of the ending festival rushed through me.\

`　The dance had already begun. We entered the circle of people and danced next to each other.@
br
`　From her point of view, it really WAS like a very long dream. But in comparison, the time we spent together dancing was probably very short. In this short interval of time,though, she was dancing happily.\

`　Turning and repeating, it wouldn't be strange if this dance went on for eternity. I even wished a little that it would.\

`　When this song ended, would she still be there next to me?@
br
`　Would I even remember her in the first place?@
br
`　My thoughts whirled as I looked into the burning flames.\

change_cc "おさげ141通常"
dwave 0,"dat\voice\2_0538.ogg"`　"Toshiki-senpai?"@
br
dwave 0,"dat\voice\1_0763.ogg"`　"Hm?"@
br
change_cc "おさげ144うつむき"
dwave 0,"dat\voice\2_0539.ogg"`　"I won't... @
dwave 0,"dat\voice\2_0540.ogg"`disappear all of a sudden, okay?"@
br
dwave 0,"dat\voice\1_0764.ogg"`　"Sorry... @
dwave 0,"dat\voice\1_0765.ogg"`I told you not to think about it, but I ended up doing it myself."\

`　When the music ended, everyone there applauded the near end of the festival.@
br
`　An announcement for BROY's concert was echoed throughout the school. Many people, even more than there were at the opening ceremony, gathered to watch the unprecedented final event of the festival.\

change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0541.ogg"`　"The festival's almost over, huh?"@
br
dwave 0,"dat\voice\1_0766.ogg"`　"Yeah..."@
br
dwave 0,"dat\voice\2_0542.ogg"`　"Where are we going to see the concert? @
dwave 0,"dat\voice\2_0543.ogg"`I don't really like it here... there're too many people."@
br
dwave 0,"dat\voice\1_0767.ogg"`　"Me neither."@
br
dwave 0,"dat\voice\2_0544.ogg"`　"Then let's listen over there."@
br
`　She pointed to the top of the school.\

dwave 0,"dat\voice\1_0768.ogg"`　"Hey, hey. @
dwave 0,"dat\voice\1_0769.ogg"`The roof again?"@
br
dwave 0,"dat\voice\2_0545.ogg"`　"It'll be like sightseeing from a high place."@
br
dwave 0,"dat\voice\1_0770.ogg"`　"I don't think that's quite right."@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0546.ogg"`　"You'll lose out if you're picky like that."@
br
dwave 0,"dat\voice\1_0771.ogg"`　"Fine, fine. @
dwave 0,"dat\voice\1_0772.ogg"`If we're going to the roof, we'd better hurry. @
dwave 0,"dat\voice\1_0773.ogg"`It'd suck if it ended while we were on the way up."\

`　We held hands again and hurried to the roof.\

mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ
change_b "屋上夜"

`　Side by side, both with one hand on the fence, we watched BROY's concert.\

`　The opening concerts didn't even come close to the climax of this one. It was so full of energy... the neighborhood would definitely complain, though. I doubted they'd be able to get permission to have outdoor concerts again next year.\

change_cc "おさげ131あさって"
dwave 0,"dat\voice\2_0547.ogg"`　"Kagawa-san is amazing."@
br
dwave 0,"dat\voice\1_0774.ogg"`　"That's even after being sick... wait, doesn't she still have a cold? @
dwave 0,"dat\voice\1_0775.ogg"`She's... @
dwave 0,"dat\voice\1_0776.ogg"`truly amazing."@
br
change_cc "おさげ111通常"
dwave 0,"dat\voice\2_0548.ogg"`　"I really did try my best in the opening ceremony."@
br
dwave 0,"dat\voice\1_0777.ogg"`　"Your two songs were as high-spirited as hers."@
br
dwave 0,"dat\voice\2_0549.ogg"`　"I didn't move as intensely as she did."\

dwave 0,"dat\voice\1_0778.ogg"`　"But your singing was incredible."@
br
change_cc "おさげ116照れ"
dwave 0,"dat\voice\2_0550.ogg"`　"I'm happy, even though I know you're just saying that."@
br
dwave 0,"dat\voice\1_0779.ogg"`　"I'm not just saying it."@
br
dwave 0,"dat\voice\2_0551.ogg"`　"...thank you."\

change_cc "おさげ131あさって"
`　The song ended, and as the applause died down, Kagawa brought the mike to her mouth.\

dwave 0,"dat\voice\4_0058.ogg"`　"Everybody! @
dwave 0,"dat\voice\4_0059.ogg"`Thank you so much for staying this late just for BROY's live! @
dwave 0,"dat\voice\4_0060.ogg"`The festival will end with this next song! @
dwave 0,"dat\voice\4_0061.ogg"`I hope this festival will be one of your summer's most beautiful and lasting memories. I dedicate this song to all of you! @
dwave 0,"dat\voice\4_0062.ogg"`This is really the finale. @
dwave 0,"dat\voice\4_0063.ogg"`We might have an encore, but it'll depend on if we have enough time or not! @
dwave 0,"dat\voice\4_0064.ogg"`And here we go. @
dwave 0,"dat\voice\4_0065.ogg"`Red Ai's famous song, 'A Dream of Summer'!"\

`　The moment Kagawa shouted the song title, a cheer erupted.@
br
change_cc "おさげ112笑顔"
dwave 0,"dat\voice\2_0552.ogg"`　"Toshiki-senpai. @
dwave 0,"dat\voice\2_0553.ogg"`Close your eyes."@
br
dwave 0,"dat\voice\1_0780.ogg"`　"What for? @
dwave 0,"dat\voice\1_0781.ogg"`The song's starting."@
br
dwave 0,"dat\voice\2_0554.ogg"`　"It's fine. Please?"\

`　She smiled as she spoke. I couldn't tell what she was thinking, but I knew it couldn't be bad, so I obediently closed my eyes.\

gosub *windowoff
bg black,%110
gosub *windowon

`　"...!"@
br
`　She hugged me close from behind and covered my eyes with her hands.\

dwave 0,"dat\voice\2_0555.ogg"`　"Okay? @
dwave 0,"dat\voice\2_0556.ogg"`Please don't open them."@
br
dwave 0,"dat\voice\1_0782.ogg"`　"Even if I do, your hands are covering them anyway."@
br
dwave 0,"dat\voice\2_0557.ogg"`　"Just don't ever open them."@
br
`　She emphasized it. She was pressing her chest fully into my back.@
br
dwave 0,"dat\voice\1_0783.ogg"`　"That feeling on my back... is that some kind of fanservice?"@
br
dwave 0,"dat\voice\2_0558.ogg"`　"...idiot."\

`　Even though I couldn't see her, I could tell from her voice that she was slightly embarrassed.\

mov %285
mov %286,1:bgm "dat\music\bgm\bgm05.mp3";	いんすと

`　From the grounds, the sad prelude to 'A Dream of Summer' floated by. With it, she whispered close into my ear.\

dwave 0,"dat\voice\2_0559.ogg"`　"Toshiki-senpai. @
dwave 0,"dat\voice\2_0560.ogg"`Thank you for spending so much time with me today. @
dwave 0,"dat\voice\2_0561.ogg"`The festival will end with this song. @
dwave 0,"dat\voice\2_0562.ogg"`I hope that this will be one of your summer's most beautiful and lasting memories. I dedicate this song to you, Toshiki-senpai. @
dwave 0,"dat\voice\2_0563.ogg"`This is really the finale. @
dwave 0,"dat\voice\2_0564.ogg"`There might be an encore, but it'll depend on if we have enough time or not. @
dwave 0,"dat\voice\2_0565.ogg"`And here I go. @
dwave 0,"dat\voice\2_0566.ogg"`Red Ai's famous song, 'A Dream of Summer'..."\

`　It was what Kagawa had just said, but different. I could tell from her trembling voice that she wasn't just playing around.@
br
dwave 0,"dat\voice\1_0784.ogg"`　"...how long do I have to keep my eyes closed like this?"@
br
dwave 0,"dat\voice\2_0567.ogg"`　"Until the song ends. @
dwave 0,"dat\voice\2_0568.ogg"`When the song ends, please open your eyes."@
br
dwave 0,"dat\voice\1_0785.ogg"`　"And if I say no?"@
br
dwave 0,"dat\voice\2_0569.ogg"`　"Toshiki-senpai, do you want to say goodbye to me again?"@
br
`　"..."\

dwave 0,"dat\voice\2_0570.ogg"`　"If you don't want to, then please... @
dwave 0,"dat\voice\2_0571.ogg"`please don't say no. @
dwave 0,"dat\voice\2_1006.ogg"`And please don't cry. @
dwave 0,"dat\voice\2_1007.ogg"`See? With my hands like this, I can tell if you're crying. @
dwave 0,"dat\voice\2_1008.ogg"`And also, I want to keep the promise I made earlier. @
dwave 0,"dat\voice\2_1009.ogg"`After crying that much, I'll smile for you... @
dwave 0,"dat\voice\2_1010.ogg"`So, I'm not going to cry."\

`　Soon, I was wrapped up between Kagawa's song from the front and hers from behind me.@
br
`　Her sad voice, along with the warmth of her body, gradually became dimmer.\

`　Taking in the meaning of the song, I couldn't bear it much more and I began to shake, tears forming. As if in unison with me, I felt a warm drop fall to my neck.@
br
`　I couldn't say anything more, and had no choice but to wait for the song to end.\

mp3fadeout 3000
stop
mp3fadeout 0

`　―And then I couldn't hear her voice anymore.@
br
`　Still, I waited for the rest of the song to finish like she'd told me.\

`　―The concert ended, and people on the grounds started to leave.\

`　It was silent on the roof. I still didn't open my eyes. \

dwave 0,"dat\voice\1_0786.ogg"`　"Braidy... you're behind me, right? @
dwave 0,"dat\voice\1_0787.ogg"`Tell me if you are. @
dwave 0,"dat\voice\1_0788.ogg"`I won't open my eyes unless you tell me to. @
dwave 0,"dat\voice\1_0789.ogg"`So please... say something."@
br
`　Only my voice resounded on the roof.\

dwave 0,"dat\voice\1_0790.ogg"`　"...Mizuna..."@
br
`　Unbearably, I murmured her name. Her name I'd been too embarrassed to say.\

dwave 0,"dat\voice\1_0791.ogg"`　"Mizunaaaa!!"@
br
`　An unreachable voice. A devastated voice. But still, I had to call her name.\


;-----------------
;エンディング開始
;-----------------
;setfont "ＭＳ 明朝"
`　"..."\
skipoff
gosub *windowoff
saveoff
wait 2000

mov %291,1:bgmonce "dat\music\bgm\bgm11.mp3";	ひとなつ
resettimer

wait 3000
textspeed 0
;setwindow 420,65,5,16,18,22,15,0,0,1,1,#FFFFFF,19,49,609,439
setwindow 370,65,10,16,18,18,0,4,0,1,1,#FFFFFF,19,19,639,469

mov %31,1700
dwave 0,"dat\voice\2_0572.ogg"`"...geez. @
mov %31,5200
dwave 0,"dat\voice\2_0573.ogg"`If you're going to scream it out like that, I'll be the one who's embarrassed instead."@
br
mov %31,2200
dwave 0,"dat\voice\1_0792.ogg"`"...Mizuna!?"@
br
mov %31,3000
`I opened my eyes and turned toward her voice.\


bg "dat\bg\bg04_3.jpg",0
lsp 0,":mdat\ef\wide.bmp;dat\ef\wide.bmp",0,0
print 18,3000,"dat\ef\effect02.bmp"

mov %31,6300
dwave 0,"dat\voice\2_0574.ogg"`"I said there wouldn't be an encore, but you had to go and be so insistent."@
br

waittimer 26500
ld l,":a;dat\chra\osage115.jpg",0
tal l,150,10,500
waittimer 29000

mov %31,3000
`There she was, bathed in the moonlight, eyes shining with tears, smiling sadly.@
br
mov %31,7200
dwave 0,"dat\voice\2_0575.ogg"`"Will this work? I DID promise to smile at the end."\

mov %31,3400
dwave 0,"dat\voice\1_0793.ogg"`"You... that was mean. @
mov %31,3000
dwave 0,"dat\voice\1_0794.ogg"`To do something like that..."@

ld l,":a;dat\chra\osage145.jpg",0
tal l,150,10,500

mov %31,4200
dwave 0,"dat\voice\2_0576.ogg"`"I thought so too, when I was going. @
br
mov %31,7400
dwave 0,"dat\voice\2_0577.ogg"`But since you called out my name like that, it looks like I can stay a little bit longer."@
br
mov %31,2900
dwave 0,"dat\voice\1_0795.ogg"`"Then I won't stop calling your name."\

mov %31,2600
dwave 0,"dat\voice\2_0578.ogg"`"Don't do that. It's embarrassing. @
br
mov %31,8700
dwave 0,"dat\voice\2_0579.ogg"`And no matter how many times you say it, I'll still have to disappear completely next time in this dream."@
br
mov %31,3000
`She was smiling, tears flowing down her face.\

mov %31,1200
dwave 0,"dat\voice\1_0796.ogg"`"Wait! @
mov %31,2500
dwave 0,"dat\voice\1_0797.ogg"`What should I do, left behind like this?!"@
br

ld l,":a;dat\chra\osage146.jpg",0
tal l,150,10,500

mov %31,7600
dwave 0,"dat\voice\2_0580.ogg"`"This is it for me, but for you... you still have tomorrow, right? @
br
mov %31,5000
dwave 0,"dat\voice\2_0581.ogg"`There's still a long life ahead of you. @
mov %31,4800
dwave 0,"dat\voice\2_0582.ogg"`Think of our time together as a memory of one summer."\

mov %31,2400
dwave 0,"dat\voice\1_0798.ogg"`"It's not that easy. @
mov %31,3200
dwave 0,"dat\voice\1_0799.ogg"`If that's the case, I'd rather be where you are..."\

bg "dat\cg\CG92_3.jpg",18,3000,"dat\ef\effect02.bmp"

waittimer 109000

mov %31,3000
`I glanced past below the fence.@
br
mov %31,3000
`There was only a deep darkness, like it wanted to absorb everything around.@
br
mov %31,3000
`...it was pathetic, but I felt my legs grow weak from just looking.\

mov %31,5900
dwave 0,"dat\voice\2_0583.ogg"`"I'm telling you ahead of time, if you dare follow me, I'll never forgive you! @
mov %31,4000
dwave 0,"dat\voice\2_0584.ogg"`There were a lot of people that were sad when I died, even for someone like me. @
mov %31,5600
dwave 0,"dat\voice\2_0585.ogg"`I don't want that to happen to people around you."@
br
mov %31,2200
dwave 0,"dat\voice\1_0800.ogg"`"...I really can't see you anymore? @
br
mov %31,2900
dwave 0,"dat\voice\1_0801.ogg"`You're really going to disappear?"\

mov %31,1900
dwave 0,"dat\voice\2_0586.ogg"`"Yes... @
mov %31,4200
dwave 0,"dat\voice\2_0587.ogg"`This really, really is the last time."@
br
mov %31,4200
dwave 0,"dat\voice\1_0802.ogg"`"If this really is the last time..."@
br
mov %31,3000
`I went to her and held her tightly.@
br

mov %230,1:bg "dat\cg\cg06_1.jpg",10,5000
mov %31,4000

`I could barely feel her, but I knew that I was holding her, and she let me.\

waittimer 165000

mov %31,2300
dwave 0,"dat\voice\2_0588.ogg"`"Our last kiss? @
br
mov %31,5300
dwave 0,"dat\voice\2_0589.ogg"`Rather than a realist, you really are a romantic."@
br
mov %31,2400
dwave 0,"dat\voice\1_0803.ogg"`"Whatever you say. @
br
mov %31,9600
dwave 0,"dat\voice\1_0804.ogg"`You'll probably never forget that reckless kiss we had before, so let's be gentler this time.\
mov %31,6500
dwave 0,"dat\voice\1_1107.ogg"`This isn't the end of everything, but I want to at least feel your existence til the final moment."\

mov %31,3500
dwave 0,"dat\voice\2_0590.ogg"`"That's not something you say out loud."@
br
mov %31,1700
dwave 0,"dat\voice\1_0805.ogg"`"Yeah... @
mov %31,3800
dwave 0,"dat\voice\1_0806.ogg"`Even though I said it, it was still a little embarrassing."@
br
mov %31,3500
dwave 0,"dat\voice\2_0591.ogg"`"The one hearing that is more embarrassed. @
mov %31,5300
dwave 0,"dat\voice\2_0592.ogg"`But if you want to kiss me, make me one more promise."\
mov %31,1700
dwave 0,"dat\voice\1_0807.ogg"`"Promise?"@
br
mov %31,800
dwave 0,"dat\voice\2_0593.ogg"`"Yes. @
mov %31,2500
dwave 0,"dat\voice\2_0594.ogg"`This will be our last promise. @
br
mov %31,5100
dwave 0,"dat\voice\2_0595.ogg"`Toshiki-senpai, don't stay in love with me forever, okay?"\

mov %31,2100
dwave 0,"dat\voice\1_0808.ogg"`"What?"@
br
mov %31,3200
dwave 0,"dat\voice\2_0596.ogg"`"Actually, you never were, right? @
br
mov %31,1700
dwave 0,"dat\voice\2_0597.ogg"`I understand."@
br
mov %31,2300
dwave 0,"dat\voice\1_0809.ogg"`"You can't say that yourself."@
br
mov %31,3100
dwave 0,"dat\voice\2_0598.ogg"`"But stop your stalker ways, okay?"@
br
mov %31,1500
`"..."\

waittimer 237000

mov %31,4400
dwave 0,"dat\voice\2_0599.ogg"`"But don't you ever keep chasing after me. @
mov %31,2800
dwave 0,"dat\voice\2_0600.ogg"`It's like chasing something in a dream. @
mov %31,2800
dwave 0,"dat\voice\2_0601.ogg"`It's short lived... literally. @
mov %31,2000
dwave 0,"dat\voice\2_0602.ogg"`Okay? @
mov %31,2800
dwave 0,"dat\voice\2_0603.ogg"`To meet someone again as you promised... @
br
mov %31,8000
dwave 0,"dat\voice\2_0604.ogg"`to remember that miraculous dream, and to remember me... that is more than enough."\

mov %31,1800
dwave 0,"dat\voice\1_0810.ogg"`"I get it. @
mov %31,3500
dwave 0,"dat\voice\1_0811.ogg"`I'll forget you in a few seconds."@
br
mov %31,1600
dwave 0,"dat\voice\2_0605.ogg"`"Ahh! @
mov %31,2800
dwave 0,"dat\voice\2_0606.ogg"`You're mean to the end!"@
br
mov %31,3800
dwave 0,"dat\voice\1_0812.ogg"`"...fine, I promise."\

mov %228,1:bg "dat\cg\cg06_2.jpg",10,3000

waittimer 277500

mov %31,3000
`I held her close, but I gradually felt her fading.@
br
mov %31,3000
`I pulled her closer again and our distance lessened.\

mov %31,3700
dwave 0,"dat\voice\1_0813.ogg"`"So... Mizuna..."@
br
mov %31,1100
dwave 0,"dat\voice\2_0607.ogg"`"...hh... @
mov %31,5200
dwave 0,"dat\voice\2_0608.ogg"`It's cheating to whisper someone's name you don't usually call..."\

mov %31,4000
`She said that and shyly closed her eyes, tears flowing down her face.@
br
mov %31,3000
`I pressed my lips against hers.\

mov %31,5500
`The moment I felt her lips, she was surrounded in a light. Then the only thing I felt was the small warmth of her lips melting into the darkness of the night.\

flushout 3000
waittimer 1000
csp 160
mov %229,1:bg "dat\cg\CG06_3.jpg",18,5000,"dat\ef\effect04.bmp"
waittimer 1000

csp 0
bg black,10,5000

;-----------------
;エンドロール開始
;-----------------
lr_trap2 off
lr_trap2 *ed_000
*ed_000
lr_trap2 off
lr_trap2 *ed_999

waittimer 329000		;5:29
monocro #eeccaa

lsp 0,":mdat\ef\wide.bmp;dat\ef\wide.bmp",0,0
print 10,2000
lsp 511,":s/20,20,0;#FFFFFF`　　　　　　Cast",320,230
print 10,2500
csp 511
print 10,5000

waittimer 341000
bg "dat\bg\bg05_1.jpg",10,5000
lsp 511,":s/20,20,0;#FFFFFF`　　　　　Sugai Toshiki",310,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　　DAPP",320,250
print 10,2500
csp 511
csp 512
print 10,5000


waittimer 361000
bg "dat\bg\bg04_1.jpg",10,5000
ld l,":a;dat\chra\osage111.jpg",0
lsp 511,":s/20,20,0;#FFFFFF`　　　　　Hazuki Mizuna",310,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　　　Yuzuki",320,250
print 10,2500
csp 511
csp 512
cl l,0
print 10,5000

waittimer 381000
bg "dat\bg\bg09_1.jpg",10,5000
ld l,":a;dat\chra\sinorin211.jpg",0
lsp 511,":s/20,20,0;#FFFFFF`　　　　　Shinoi Rin",320,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　　Asagiri Eri",310,250
print 10,2500
csp 511
csp 512
cl l,0
print 10,5000

waittimer 401000
bg "dat\bg\bg02_1.jpg",10,5000
ld l,":a;dat\chra\mamitan311.jpg",0
lsp 511,":s/20,20,0;#FFFFFF`　　　　　Kagawa Mami",310,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　Minase Erumo",320,250
print 10,2500
csp 511
csp 512
cl l,0
print 10,5000

waittimer 421000
bg "dat\bg\bg01_1.jpg",10,5000
ld l,":a;dat\chra\uni411.jpg",0
lsp 511,":s/20,20,0;#FFFFFF`　　　　　Nishihara Reiji",310,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　　　Sagami",320,250
print 10,2500
csp 511
csp 512
cl l,0
print 10,5000

waittimer 441000

waittimer 1500
bg black,2,2000
waittimer 1500
lsp 511,":s/20,20,0;#FFFFFF`　　　　　Staff",310,230
print 10,2500
csp 511
print 10,5000

waittimer 456000
bg "dat\cg\cg01_1.jpg",9,5000
lsp 511,":s/20,20,0;#FFFFFF`　　Scenario Script",320,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　　　Nekono",320,250
print 10,2500
csp 511
csp 512
print 10,5000

waittimer 476000
waittimer 1500
bg "dat\cg\cg02_1.jpg",3,2000
waittimer 1500
lsp 511,":s/20,20,0;#FFFFFF`　　Character Design",320,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　　　Dobato",310,250
print 10,2500
csp 511
csp 512
print 10,5000

waittimer 496000
bg "dat\cg\cg03_1.jpg",8,5000
lsp 511,":s/20,20,0;#FFFFFF`　　　　　Background Art",320,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　　　G5",320,250
print 10,2500
csp 511
csp 512
print 10,5000

waittimer 516000
waittimer 1500
bg "dat\cg\cg04_5.jpg",4,2000
waittimer 1500
lsp 511,":s/20,20,0;#FFFFFF`　　　　BGM & SE",320,210
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　Bill of Fare",320,250
print 10,2500
csp 511
csp 512
print 10,5000

waittimer 536000
bg "dat\cg\cg05_1.jpg",7,5000
lsp 511,":s/20,20,0;#FFFFFF`Theme Song - 'A Dream of Summer'",320,180
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`Artist - Minase Erumo",320,210
lsp 513,":s/20,20,0;#FFFFFF`Composition - Bill of Fare",320,240
lsp 514,":s/20,20,0;#FFFFFF`Composer - Nekono",320,270
print 10,2500
csp 511
csp 512
csp 513
csp 514
print 10,5000
waittimer 1500
bg "dat\cg\cg05_2.jpg",10,1000

waittimer 556000
waittimer 1500
bg "dat\cg\cg06_1.jpg",5,2000
waittimer 1500
lsp 511,":s/20,20,0;#FFFFFF`　　　Special Thanks",310,190
print 10,2500
lsp 512,":s/20,20,0;#FFFFFF`　　　　ni-goh",320,220
lsp 513,":s/20,20,0;#FFFFFF`　　　　　asuka",310,250
print 10,2500
csp 511
csp 512
csp 513
print 10,5000

waittimer 566000
csp 510:bg black,6,5000
lsp 511,":s/20,20,0;#FFFFFF`Planner - milkcat",170,230
print 10,5000
csp 511
;csp 0
print 10,5000

waittimer 566000
csp 510:bg black,6,5000
lsp 511,":s/20,20,0;#FFFFFF`English Localization - Deja Vu",170,145
lsp 512,":s/20,20,0;#FFFFFF`Translator - Leona",170,175
lsp 513,":s/20,20,0;#FFFFFF`Additional Translation - J & Melithiel",170,205
lsp 514,":s/20,20,0;#FFFFFF`Programmer/Editor - Starchanchan",170,235
lsp 515,":s/20,20,0;#FFFFFF`http://www.mangasos.com/dejavu/",170,265
print 10,5000
csp 511
csp 512
csp 513
csp 514
csp 515
csp 0
print 10,5000

lr_trap2 off
waittimer 586000

;-----------------
;エンドロール終了
;-----------------

goto *ed_end

*ed_999
lr_trap2 off
gosub *windowoff
csp 511
csp 512
csp 513
csp 514
csp 0
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0

*ed_end
monocro off
;setfont "ＭＳ ゴシック"
;setwindow 200,35,10,18,22,22,20,0,0,1,1,#FFFFFF,19,19,619,469
setwindow 35,35,30,5,18,18,0,4,0,1,1,#FFFFFF,19,19,639,469
textspeed %125
mov %31,0
waittimer 5000
stop
saveon

;----------------------------------
;　おさげエンド
;----------------------------------
change_day "十九日"

mov %289
mov %286,1:bgm "dat\music\bgm\bgm09.mp3";	かなしい
bg "dat\bg\bg05_1.jpg",%110

gosub *windowon

`　―Beep beep beep beepー！@
br
`　I woke up to the usual sound of the alarm clock.@
br
`　Today was the cleanup day for the festival, and the day of the school closing ceremony. When that ended, the last summer of my high school life would begin. But I wasn't in a state to be able to enjoy the summer vacation.\

`　I remembered what happened yesterday. I was worried about forgetting last night and didn't sleep well, but I remembered clearly.@
br
`　I changed, ate breakfast, got ready, and left the house.\

change_b "通学路昼"
dwave 1,"dat\music\se\se15.wav":mov %22,15

`　It was so hot that I was sweating just from a bit of light walking.@
br
`　At length, I walked up the gentle slope to the school, and when I felt the sea breeze, Reiji called out to me.\

change_cc "うに412にしし"
dwave 0,"dat\voice\5_0334.ogg"`　"Yo, Toshiki! It's finally summer vacation! Where are you going this year? The ocean? The mountains? Or to some foreign country?!"@
br
`　He seemed to be at full throttle since early morning, excited about summer break.@
br
dwave 0,"dat\voice\1_0814.ogg"`　"You know, you'll be mostly traveling to school for summer classes."@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0335.ogg"`　"Hey! @
dwave 0,"dat\voice\5_0336.ogg"`Bastard, you promised not to mention that."\

`　He seemed to be trying to escape reality.@
br
dwave 0,"dat\voice\5_0337.ogg"`　"Anyway, did you get to see the performance yesterday? @
dwave 0,"dat\voice\5_0338.ogg"`I didn't see you."@
br
dwave 0,"dat\voice\1_0815.ogg"`　"Well yeah, trying to find me in that crowd would've been hard."@
br
change_cc "うに413真面目"
dwave 0,"dat\voice\5_0339.ogg"`　"Yeah. @
dwave 0,"dat\voice\5_0340.ogg"`That's true... @
dwave 0,"dat\voice\5_0341.ogg"`Oh, were you able to find Hazuki Mizuna?"@
br
`　"..."\

`　Of course, everyone except for me had forgotten she'd existed.@
br
dwave 0,"dat\voice\5_0342.ogg"`　"Huh? @
dwave 0,"dat\voice\5_0343.ogg"`But I thought I invited you to go to the concert when you were walking with someone... @
dwave 0,"dat\voice\5_0344.ogg"`Hm? @
dwave 0,"dat\voice\5_0345.ogg"`I guess not."@
br
`　I kept quiet, wondering what his conclusion would be, as he seemed to be confused with the inconsistent memory.\

dwave 0,"dat\voice\5_0346.ogg"`　"Well, you didn't know if that really was the girl that you made the promise with, right? @
dwave 0,"dat\voice\5_0347.ogg"`So don't worry about it."@
br
dwave 0,"dat\voice\1_0816.ogg"`　"No, I found her. @
dwave 0,"dat\voice\1_0817.ogg"`I kept the promise."@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0348.ogg"`　"Why Toshiki, good job!"@
br
`　After I said that, he didn't inquire further.\

dwavestop 15:mov %22,0
change_b "教室昼"

`　We cleaned the classroom, finished with the closing ceremony, got our summer school schedule from homeroom, and began summer vacation.@
br
`　With a huge load of summer classes, Reiji spoke to me.\

change_cc "うに413真面目"
dwave 0,"dat\voice\5_0349.ogg"`　"Comrade. @
dwave 0,"dat\voice\5_0350.ogg"`The world is excited about summer break, but for us, there will be not a day of rest, huh?"@
br
dwave 0,"dat\voice\1_0818.ogg"`　"Like I said, my grades aren't THAT bad."@
br
dwave 0,"dat\voice\5_0351.ogg"`　"Shit! @
dwave 0,"dat\voice\5_0352.ogg"`Traitor!"\

dwave 0,"dat\voice\1_0819.ogg"`　"You really ARE going to repeat a year. @
dwave 0,"dat\voice\1_0820.ogg"`Even if you have band activities, make sure you study properly."@
br
dwave 0,"dat\voice\5_0353.ogg"`　"Heh heh heh. @
dwave 0,"dat\voice\5_0354.ogg"`But you know, I DO have some good grades stored away."@
br
dwave 0,"dat\voice\1_0821.ogg"`　"Oh? @
dwave 0,"dat\voice\1_0822.ogg"`But those probably are irrelevant classes, right?"@
br
dwave 0,"dat\voice\5_0355.ogg"`　"Don't say that! @
dwave 0,"dat\voice\5_0356.ogg"`There's no better guy than I in home economics!"@
br
dwave 0,"dat\voice\1_0823.ogg"`　"But that's useless."\

dwave 0,"dat\voice\5_0357.ogg"`　"Not true! @
dwave 0,"dat\voice\5_0358.ogg"`In this era, girls long for a guy who can cook!"@
br
dwave 0,"dat\voice\1_0824.ogg"`　"That's just one point out of many."@
br
change_cc "うに412にしし"
dwave 0,"dat\voice\5_0359.ogg"`　"Are you that jealous of guys that can cook? @
dwave 0,"dat\voice\5_0360.ogg"`Hmm? @
dwave 0,"dat\voice\5_0361.ogg"`So what are you trying to say?"@
br
dwave 0,"dat\voice\1_0825.ogg"`　"Even if you can cook, would a girl still want you if you fail at everything else? Huh?"\

change_cc "うに413真面目"
`　"..."@
br
`　"..."@
br
dwave 0,"dat\voice\5_0362.ogg"`　"...guh..."@
br
dwave 0,"dat\voice\1_0826.ogg"`　"...guh?"@
br
change_d "中消去"
dwave 0,"dat\voice\5_0363.ogg"`　"...guhawaaaaaaaaaa!!"@
br
`　Wailing in a strange voice, Reiji covered his eyes in the pretense of crying and ran out of the classroom.\

dwave 0,"dat\voice\5_0364.ogg"`　"Toshiki hurt meeeeeeeee!!"@
br
`　Just asking for a terrible misunderstanding, those words resonated through the halls.\

`　Ignoring the idiot, I packed my things and left the room.\

change_b "自販機前昼"

`　I'd planned to go straight home, but on my way out, I ended up at the front of the vending machine. Of course, somewhere in my heart, I hoped that she was still wandering around the school.\

`　I took out some small change from my wallet and wondered about what to get. As usual, the poisonous 100% red jute juice was there. Not really caring, I bought it anyway.@
br
`　I deliberately took several gulps of the bitter green drink and slowly headed up the stairs.\
　
change_b "階段昼"

`　There was a no entry sign at the very top floor. I climbed past it and went to the front of the door to the roof.@
br
`　I wanted to open the door, but as expected, it was locked.\

`　"―don't stay in love with me forever, okay?"@
br
br
`　Those words reverberated through my head.\

`　My one-sided promise to her.@
br
`　Her wish that was a wish for my happiness.@
br
`　Swallowing the lump in my throat, I took a swig of the remaining juice and left the premises.\

`　The moment I took a step down the stairs, a feeling of something white swept past my foot and out the door.@
br
`　I turned to look at whatever it was, and I saw the snowman keychain there when it hadn't been there before.\

dwave 0,"dat\voice\1_0827.ogg"`　"...I was sure I had it yesterday."@
br
`　But now that I thought about it, I'd somehow lost it along the way. I picked it up and opened the zipper.@
br
`　There was a letter in it... but it wasn't the letter I knew.\

`　The letter was written neatly; just one sentence, but full of feeling.\

gosub *windowoff
waittimer 1000
mov %287
mov %286,1:bgm "dat\music\bgm\bgm07.mp3";	しっとり
gosub *windowon
br
br
br
br
br
dwave 0,"dat\voice\2_1012.ogg"`　"―Thank you for the beautiful dream.
`　　　　　　　　　Hazuki Mizuna..."\


`　And near her name, written in small letters was, 'Don't forget the promise!'\

`　Before I knew it, my tears were falling onto the letter.@
br
dwave 0,"dat\voice\1_0828.ogg"`　"If you write like this, I'll never forget."@
br
`　I put it back into the keychain so that it wouldn't get wetter and hung it on my bag.\

dwave 0,"dat\voice\1_0829.ogg"`　"...no, no, this isn't my character."@
br
`　I couldn't just have it hanging out in the open when I walked, so I put it inside my bag.@
br
dwave 0,"dat\voice\1_0830.ogg"`　"I wonder if it would've been better if I'd called her by her name a bit more."\

change_b "校門通常時昼"
dwave 1,"dat\music\se\se15.wav":mov %22,15

`　I left the school, and as usual, the sun shone brightly.@
br
`　As I passed the school gate, I paused and looked up into the blue sky.\

`　Seeing that blue, I once again engraved that last promise I'd made to her in my heart. And holding the bag that held my summer class schedule and the off-season keychain, I began to walk again.\

`　Me, who wasn't good with others, and she who liked to be by herself... that was how our summer dream came to an end.\

gosub *windowoff
bg black,10,3000
waittimer 2000
bg "dat\bg\bg04_1.jpg",10,3000
waittimer 2000
change_b "ＣＧ９３＿１"
waittimer 2000
bg white,10,3000
waittimer 1000

mp3fadeout 5000
dwavestop 15:mov %22,0
stop
mp3fadeout 0

bg black,10,3000
waittimer 1000:lsp 511,":s/20,20,0;#FFFFFF`Ending 1: Hazuki Mizuna End",170,230:print 10,1000:click:csp 511:print 10,1000:waittimer 1000
if %101 = 0 mov %101,1	;おさげクリアフラグ
if %101 = 2 mov %101,3	;おさげ・しのりんクリアフラグ


RESET

;以降しのりんルート

*sinorinroute
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
bg "dat\bg\bg02_1.jpg",%110
gosub *windowon

dwave 0,"dat\voice\1_0831.ogg"`　"Reiji, that bastard! He drank my soda on purpose... "@
br
`　Since my drink had now been stolen, I ended up having to go down the hall to get another one.@
br
`　On my way there, I spotted Shinoi and Kagawa, who seemed to be having fun talking about something.\
gosub *windowoff
change_cl "まみたん312笑顔"
change_cr "しのりん213メ笑顔"
gosub *windowon
dwave 0,"dat\voice\4_0066.ogg"`　"Ah, Toshiki. @
dwave 0,"dat\voice\4_0067.ogg"`Morning."@
br
dwave 0,"dat\voice\3_0094.ogg"`　"Good morning."@
br
dwave 0,"dat\voice\1_0832.ogg"`　"Hey. @
dwave 0,"dat\voice\1_0833.ogg"`Morning. @
dwave 0,"dat\voice\1_0834.ogg"`Are you two skipping out on class preparations?"@
br
dwave 0,"dat\voice\4_0068.ogg"`　"We're just taking a break."\

dwave 0,"dat\voice\1_0835.ogg"`　"Oh yeah... "@
br
`　I looked at Shinoi, who looked like she was about to say something.\

`　...huh? What was it?@
br
dwave 0,"dat\voice\3_0095.ogg"`　"...? @
dwave 0,"dat\voice\3_0096.ogg"`What is it?"@
br
dwave 0,"dat\voice\1_0836.ogg"`　"...oh, that's right. @
dwave 0,"dat\voice\1_0837.ogg"`Your finger... "@
br
change_cr "しのりん221メ通常"
dwave 0,"dat\voice\3_0097.ogg"`　"My finger?"@
br
`　Finger? What? Her finger... why would I say something like that?. As if I'd said something bad, Shinoi turned pale.\

change_cl "まみたん313はあー"

dwave 0,"dat\voice\4_0069.ogg"`　"What are you trying to say? @
dwave 0,"dat\voice\4_0070.ogg"`You're bothering Shinorin."@
br
dwave 0,"dat\voice\1_0838.ogg"`　"It's nothing, sorry. @
dwave 0,"dat\voice\1_0839.ogg"`The heat's probably getting to me."@
br
change_cl "まみたん311通常"
dwave 0,"dat\voice\4_0071.ogg"`　"Huh? @
dwave 0,"dat\voice\4_0072.ogg"`Aren't you like that all the time?"@
br
dwave 0,"dat\voice\1_0840.ogg"`　"Leave me alone."\

gosub *windowoff
bg black,%110
wait 2000
bg "dat\bg\bg01_1.jpg",%110
gosub *windowon

`　When I got back to class, Reiji's course in cooking delicious yakisoba was just beginning. Thanks to that, I was perfectly happy with not making any for the next five years.\

`　I was finally set free when Reiji had to leave the classroom for a band meeting.@
br
dwave 0,"dat\voice\1_0841.ogg"`　"Well then... I guess I'll go home."@
br
`　When we separated, he invited me to go see the band rehearsal if I had time, but I wasn't really interested. Probably because I felt heavy from all the food.\

dwave 0,"dat\voice\1_0842.ogg"`　"Fwa..."@
br
`　I yawned suddenly and was attacked by sleepiness. A small nap before leaving would be nice...@
br
`　I made a makeshift bed out of some chairs in a corner of the room.\

gosub *windowoff
bg black,%110
stop
wait 2000
change_b "学園祭教室夕"
gosub *windowon

dwave 0,"dat\voice\5_0365.ogg"`　"...Toshiki! @
dwave 0,"dat\voice\5_0366.ogg"`Wake up."@
br
dwave 0,"dat\voice\1_0843.ogg"`　"Nh... ?"@
br
`　Eyes blurry from the orange light shining in, I squinted and sat up.\

change_cc "うに411通常"

dwave 0,"dat\voice\5_0367.ogg"`　"You were sleeping here the whole time?"@
br
dwave 0,"dat\voice\1_0844.ogg"`　"Nh, Reiji? @
dwave 0,"dat\voice\1_0845.ogg"`What happened with the rehearsal?"@
br
dwave 0,"dat\voice\5_0368.ogg"`　"What, you're still half asleep? @
dwave 0,"dat\voice\5_0369.ogg"`It's already over. @
dwave 0,"dat\voice\5_0370.ogg"`Look at the clock. See?"@
br
`　I looked through my blurry vision at the class's clock.@
br
dwave 0,"dat\voice\1_0846.ogg"`　"...so time slips ARE real."@
br
dwave 0,"dat\voice\5_0371.ogg"`　"Are you stupid? @
dwave 0,"dat\voice\5_0372.ogg"`A span of time that small can't be a time slip."\

dwave 0,"dat\voice\1_0847.ogg"`　"Don't call me stupid over a little thing like that. You're being totally irrational."@
br
dwave 0,"dat\voice\5_0373.ogg"`　"I'm going home. @
dwave 0,"dat\voice\5_0374.ogg"`Don't go catching a cold from sleeping here now."@
br
dwave 0,"dat\voice\1_0848.ogg"`　"Uh huh. @
dwave 0,"dat\voice\1_0849.ogg"`Bye."\

change_d "中消去"

`　Reiji left the room, and I was left by myself.@
br
`　It was only then that I noticed that my body was covered with sweat. It seemed like the class's air-conditioning had been turned off. Then I noticed the hot sunlight streaming in through the window.@
br
`　I figured I should go home while it was still light out, so I grabbed my bag and left the room.\

change_b "学園祭廊下夕"
dwaveloop 12,"dat\music\se\se12.wav":mov %22,12

`　As I went out into the hallway, I heard piano music drift through the air.@
br
`　It seemed like there was nobody left from the daytime preparation. Piano music flowed through the lifelessly still hall and seemed to pull me towards the gym.\

dwavestop 12:mov %22,0
change_b "体育館夕"

`　A piano melody resonated through the wide gym. Unimaginably profound music came from those small hands, melding in with the setting sun and capturing me.@
br
`　I stayed like that, just listening until the musical performance ended. Before long, the music ended, the lid slowly slid shut, and a small student quietly stepped off from the stage.\


dwave 0,"dat\voice\1_0850.ogg"`　"Yo."@
br
mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん
change_cc "しのりん224メ照れ"
dwave 0,"dat\voice\3_0098.ogg"`　"Sugai-san? @
dwave 0,"dat\voice\3_0099.ogg"`How long have you been here?"@
br
dwave 0,"dat\voice\1_0851.ogg"`　"Just for a little while. @
dwave 0,"dat\voice\1_0852.ogg"`I didn't want to interrupt you in the middle of your performance."@
br
dwave 0,"dat\voice\3_0100.ogg"`　"Uu, so embarrassing... "@
br
dwave 0,"dat\voice\1_0853.ogg"`　"I didn't think that was an embarrassing performance at all."@
br
dwave 0,"dat\voice\3_0101.ogg"`　"Wah... "@
br
`　As usual, Shioi's face turned bright red and she hung her head.\

`　...huh? As usual...? When would that be?\

change_cc "しのりん221メ通常"

dwave 0,"dat\voice\3_0102.ogg"`　"Um... what are you doing here this late, Sugai-san?"@
br
dwave 0,"dat\voice\1_0854.ogg"`　"I kind of dozed off in the classroom. @
dwave 0,"dat\voice\1_0855.ogg"`I woke up and decided to leave because it was already so late, but I heard a piano playing and just dropped by for a bit. @
dwave 0,"dat\voice\1_0856.ogg"`You're still practicing?"@
br
dwave 0,"dat\voice\3_0103.ogg"`　"Yes. @
dwave 0,"dat\voice\3_0104.ogg"`I'm still kind of uneasy about this."@
br
dwave 0,"dat\voice\1_0857.ogg"`　"Uneasy?"\

change_cc "しのりん214メ目閉じ"
dwave 0,"dat\voice\3_0105.ogg"`　"It sounds good during practice, but I always make mistakes during the real thing. @
dwave 0,"dat\voice\3_0106.ogg"`It always happens when I have to play in front of people... @
dwave 0,"dat\voice\3_0107.ogg"`So I just want to practice some more here with the time I have left."@
br
dwave 0,"dat\voice\1_0858.ogg"`　"I think it sounds perfect though."@
br
dwave 0,"dat\voice\3_0108.ogg"`　"Tha... that's too much praise."@
br
dwave 0,"dat\voice\1_0859.ogg"`　"You really have five fingers on each hand? @
dwave 0,"dat\voice\1_0860.ogg"`I would've needed more than that to pull off such a performance."\

change_cc "しのりん213メ笑顔"
`　She held up her hands with her palms facing me so that I could see.@
br
dwave 0,"dat\voice\3_0109.ogg"`　"Only five fingers each, see?"@
br
dwave 0,"dat\voice\1_0861.ogg"`　"Yeah. @
dwave 0,"dat\voice\1_0862.ogg"`That's right. @
dwave 0,"dat\voice\1_0863.ogg"`Of course there would be five."\

change_cc "しのりん211メ通常"
`　"..."@
br
`　"..."@
br
dwave 0,"dat\voice\3_0110.ogg"`　"...when we met earlier, what did you say to me?"@
br
dwave 0,"dat\voice\1_0864.ogg"`　"Huh? @
dwave 0,"dat\voice\1_0865.ogg"`What I said?"@
br
dwave 0,"dat\voice\3_0111.ogg"`　"When I was with Mami-chan, you said something about my fingers, right?"@
br
dwave 0,"dat\voice\1_0866.ogg"`　"Oh, that was just my imagination."\

change_cc "しのりん222メ俯き"
dwave 0,"dat\voice\3_0112.ogg"`　"I think I had a dream about this."@
br
dwave 0,"dat\voice\1_0867.ogg"`　"But it was just a dream."@
br
dwave 0,"dat\voice\3_0113.ogg"`　"That's true... but it was a dream that was more like yesterday's memories."@
br
`　"... "\

dwave 0,"dat\voice\3_0114.ogg"`　"I injured my finger in that dream... @
dwave 0,"dat\voice\3_0115.ogg"`I don't remember how, but I couldn't play the piano after that anymore. @
dwave 0,"dat\voice\3_0116.ogg"`It was a dream like that... "\

change_d "中消去"

`　She put her hands together behind her and walked a few steps toward the stage. The evening sun reflected off the piano and outlined Shinoi, causing me to squint. Right then, an image of a girl disappearing on the roof popped into my mind.@
br
`　Shinoi stood and looked intently at the piano. It was as if time had stopped and she wouldn't move from that spot.\
stop
dwave 0,"dat\voice\1_0868.ogg"`　"...Shinoi?"@
br
`　"..."@
br
dwave 0,"dat\voice\1_0869.ogg"`　"What's wrong?"@
br
dwave 0,"dat\voice\3_0117.ogg"`　"...ex... excuse me."@
br
`　Her voice was shaking. I went to her and put my hand on her shoulder.@
br
`　When I touched her, I realized that it wasn't just her voice that was shaking. I looked at her and saw that she had tears in her eyes.\

dwave 0,"dat\voice\3_0118.ogg"`　"I can play the piano."@
br
`　She said that simply, but her tears just kept falling, and suddenly she was clinging to me.@
br

mov %287
mov %286,1:bgm "dat\music\bgm\bgm07.mp3";	しっとり
change_b "ＣＧ１３＿１"

`　I was dumbfounded. I couldn't understand what was happening.\

dwave 0,"dat\voice\3_0119.ogg"`　"...I think, in the dream, I couldn't play the piano anymore and I was crying a lot. @
dwave 0,"dat\voice\3_0120.ogg"`Isn't it strange? @
dwave 0,"dat\voice\3_0121.ogg"`It was just a dream, and I'm not even hurt in the first place... @
dwave 0,"dat\voice\3_0122.ogg"`I realized that I COULD play the piano and was so, so happy... and I even started to cry... @
dwave 0,"dat\voice\3_0123.ogg"`I'm sorry. I was too happy and cried like that."\

`　She smiled through her tears. I was bewildered by this Shinoi, but I put my arms around her anyway. I hugged her a bit tighter, but gently, so as not to hurt her delicate frame.\

dwave 0,"dat\voice\3_0124.ogg"`　"I love the piano after all. @
dwave 0,"dat\voice\3_0125.ogg"`I love it, so... I want to keep playing forever."\

stop
change_b "体育館夕"

`　It was a while til her tears stopped, and we stayed still until they did. When I slowly let go of her, she walked closer to the piano again.@
br

mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん
change_cc "しのりん222メ俯き"

dwave 0,"dat\voice\3_0126.ogg"`　"I guess I had that dream because I was uneasy."@
br
`　Silhouetted in the light, she stretched out her arms and caught the reflected light from the piano in her palms.\

dwave 0,"dat\voice\3_0127.ogg"`　"Tomorrow... is the real thing."@
br
dwave 0,"dat\voice\1_0870.ogg"`　"Are you nervous?"@
br
dwave 0,"dat\voice\3_0128.ogg"`　"Just a little... @
dwave 0,"dat\voice\3_0129.ogg"`But when it starts, I'll be really nervous."\

dwave 0,"dat\voice\1_0871.ogg"`　"If you're so nervous, why'd you decide to join this band? @
dwave 0,"dat\voice\1_0872.ogg"`Is it because Kagawa is making you?"@
br
dwave 0,"dat\voice\3_0130.ogg"`　"Of- of course not. @
dwave 0,"dat\voice\3_0131.ogg"`I've known Mami-chan since we were little because we live close to each other... and she looks like she has so much fun when she sings. I want to play the piano with her when she's happy like that. @
dwave 0,"dat\voice\3_0132.ogg"`And also... "\

dwave 0,"dat\voice\1_0873.ogg"`　"Also?"@
br
dwave 0,"dat\voice\3_0133.ogg"`　"I like it. @
dwave 0,"dat\voice\3_0134.ogg"`And the piano, and Red Ai, too."@
br
`　"..."@
br

change_cc "しのりん224メ照れ"

dwave 0,"dat\voice\3_0135.ogg"`　"...wah."@
br
`　She suddenly blushed and looked down.\

dwave 0,"dat\voice\3_0136.ogg"`　"I... on top of rambling, I had to cling to you like that... I'm sorry."@
br
dwave 0,"dat\voice\1_0874.ogg"`　"Nah... it's fine."\

change_cc "しのりん221メ通常"

dwave 0,"dat\voice\3_0137.ogg"`　"Um... can I say something that may sound a bit weird?"@
br
dwave 0,"dat\voice\1_0875.ogg"`　"Sure, if it's something a sound, self-conscious high school student would say."@
br

change_cc "しのりん224メ照れ"

dwave 0,"dat\voice\3_0138.ogg"`　"Wah..."@
br
`　Maybe it was something I said, but it looked like her head was going to boil over from all that steam coming out. Well... it WAS horrible for me to say that she would speak unselfconsciously. Now it was MY face that was beginning to feel hot.\

dwave 0,"dat\voice\3_0139.ogg"`　"Um... don't feel offended, okay?"@
br
dwave 0,"dat\voice\1_0876.ogg"`　"It's fine. @
dwave 0,"dat\voice\1_0877.ogg"`And I think I'm more or less immune to shock because of Reiji's dirty jokes."@
br
dwave 0,"dat\voice\3_0140.ogg"`　"Wah..."@
br
`　She gave an easily-understandable reaction. It was interesting, but any more than this and she'd really boil over. It would be okay if it was just steam, but she gave the impression of gushing it out in puffs.\

change_cc "しのりん211メ通常"

dwave 0,"dat\voice\3_0141.ogg"`　"Um... um..."@
br
`　As she gradually calmed down, she looked up to gauge my reaction.\

dwave 0,"dat\voice\3_0142.ogg"`　"It feels like I've had this conversation with you before..."@
br
`　She let out a breath and looked away. She gazed out the window with the the evening sun shining through and searched for her next words.\

change_cc "しのりん214メ目閉じ"

dwave 0,"dat\voice\3_0143.ogg"`　"Um... should we go home now? @
dwave 0,"dat\voice\3_0144.ogg"`It's already pretty late..."@
br
`　Probably because she'd said it would be something weird, she decided to change the subject.@
br
dwave 0,"dat\voice\1_0878.ogg"`　"Yeah, you're right."@
br
dwave 0,"dat\voice\3_0145.ogg"`　"Sorry for making you stay with me so late."@
br
dwave 0,"dat\voice\1_0879.ogg"`　"I was the one who decided to come and stay."\

gosub *windowoff
bg black,%110
stop
wait 2000
mov %283
mov %286,1:bgm "dat\music\bgm\bgm03.mp3";	さわやか
change_b "玄関夜"
gosub *windowon

`　I went home, ate, and now was staring at the ceiling from my bed.\

change_b "自室夜"


`　...it had been a strange day.@
br
`　Shinoi's finger... she'd said she had a dream where she'd injured it and couldn't play the piano anymore. It felt like I'd had a dream like that, too.\

`　It could be that I was really dreaming right now, and she actually HAD hurt her finger.\

dwave 0,"dat\voice\1_0880.ogg"`　"...that's not possible."@
br
`　I kicked those thoughts out right away.\

`　Tomorrow was the eve of the festival... It would be great if the concert was a success...\

gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000
;----------------------------------
;　二日目(二周)
;----------------------------------
change_day "十七日"

mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
change_b "学園祭教室昼"
change_cc "うに411通常"
gosub *windowon

dwave 0,"dat\voice\5_0375.ogg"`　"Toshiki! @
dwave 0,"dat\voice\5_0376.ogg"`Are you done preparing the vegetables?"@
br
dwave 0,"dat\voice\1_0881.ogg"`　"How could I be?!"\

`　Reiji had me cutting up the vegetables for tomorrow.  But... I wasn't even half done, and seeing that I'd never even HELD a kitchen knife before, this was nothing but torture. He'd asked me to do this, but that idiot had gone off somewhere himself...\

dwave 0,"dat\voice\1_0882.ogg"`　"Are we even going to USE all of this?"@
br
`　I waved the note about prepping that Reiji had left me.@
br
dwave 0,"dat\voice\5_0377.ogg"`　"That's probably not even CLOSE to enough. @
dwave 0,"dat\voice\5_0378.ogg"`If you have time to talk, make use of it with your hands."\

dwave 0,"dat\voice\1_0883.ogg"`　"If you have time to go places, help out."@
br
dwave 0,"dat\voice\5_0379.ogg"`　"Whoa. @
dwave 0,"dat\voice\5_0380.ogg"`It's already this late? @
dwave 0,"dat\voice\5_0381.ogg"`I've got stuff to do."@
br
dwave 0,"dat\voice\1_0884.ogg"`　"Hey! @
dwave 0,"dat\voice\1_0885.ogg"`Wait!"@
br
change_cc "うに412にしし"
dwave 0,"dat\voice\5_0382.ogg"`　"Do your best without breaks!"@
br
change_d "中消去"
`　Leaving me with those words, he left the classroom again.\

dwave 0,"dat\voice\1_0886.ogg"`　"...I hate this."@
br
`　Grumbling, I vented my stress through the knife and onto the vegetables.@
br
dwave 0,"dat\voice\1_0887.ogg"`　"I knew it. @
dwave 0,"dat\voice\1_0888.ogg"`This is bullying."\

gosub *windowoff
bg black,%110
wait 2000
change_b "学園祭教室夕"
gosub *windowon

`　Thanks to my rage, I managed to finish the amount he wanted before the opening ceremony.@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0383.ogg"`　"How's it coming, @
dwave 0,"dat\voice\5_0384.ogg"`Toshiki? @
dwave 0,"dat\voice\5_0385.ogg"`You're done?"@
br
`　He came back as I was washing the knife and chopping block.\

dwave 0,"dat\voice\1_0889.ogg"`　"Yeah, @
dwave 0,"dat\voice\1_0890.ogg"`as of just now."@
br
change_cc "うに413真面目"
`　"..."@
br
dwave 0,"dat\voice\1_0891.ogg"`　"Hm? @
dwave 0,"dat\voice\1_0892.ogg"`What?"@
br
dwave 0,"dat\voice\5_0386.ogg"`　"You really did it all?"@
br
dwave 0,"dat\voice\1_0893.ogg"`　"Yeah."@
br
dwave 0,"dat\voice\5_0387.ogg"`　"Well, that's great."\

dwave 0,"dat\voice\1_0894.ogg"`　"...wait a minute. @
dwave 0,"dat\voice\1_0895.ogg"`What are you trying to say?"@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0388.ogg"`　"No, it's just that I figured you would leave in the middle of it, so I told you to do more than you really needed to."@
br
dwave 0,"dat\voice\1_0896.ogg"`　"Bastard...!"\

change_cc "うに412にしし"
dwave 0,"dat\voice\5_0389.ogg"`　"Well, the ceremony's about to start. @
dwave 0,"dat\voice\5_0390.ogg"`Let's cast away those hard feelings and have fun!"@
br
dwave 0,"dat\voice\1_0897.ogg"`　"Like hell I'd forget about that for you!"\

change_d "中消去"
`　We put the vegetables into the refrigerator. It was a bit early, but we went to the gym where the ceremony was going to take place anyway.@
br
change_b "体育館夕"
`　Soon after we arrived, it began. The program went along fine, and soon it was Reiji's turn.\

change_cc "うに411通常"
dwave 0,"dat\voice\5_0391.ogg"`　"I have to go get ready for our live."@
br
dwave 0,"dat\voice\1_0898.ogg"`　"Oh, can I come along?"@
br
dwave 0,"dat\voice\5_0392.ogg"`　"I don't mind... but why?"@
br
dwave 0,"dat\voice\1_0899.ogg"`　"No reason."@
br
change_b "廊下夜"
`　If there had to be a reason, it would have to be that I was worried and wanted to see whether Shinoi was nervous to death or not.@
br
change_b "教室夜"
`　In the waiting room (or rather, in a classroom that wasn't being used today), Shinoi was sitting and looking at some music scores.\

change_cl "うに411通常"
dwave 0,"dat\voice\5_0393.ogg"`　"Shinoi, Kagawa and Araki aren't here yet?"@
br
change_cr "しのりん222メ俯き"
`　"..."@
br
dwave 0,"dat\voice\5_0394.ogg"`　"Heeeey~"@
br
`　"..."\

`　Reiji looked past the music sheets at Shinoi, but she gave no response. She was almost like a doll, sitting at the desk like that, unblinking.@
br
dwave 0,"dat\voice\1_0900.ogg"`　"I know you're busy asking her for an answer, but who's Araki?"\

dwave 0,"dat\voice\5_0395.ogg"`　"You... it wouldn't hurt for you to at least remember the name of our guitarist."@
br
dwave 0,"dat\voice\1_0901.ogg"`　"Oh, right. @
dwave 0,"dat\voice\1_0902.ogg"`So that's his name."\

`　Reiji knocked on Shinoi's head.@
br
dwave 0,"dat\voice\1_0903.ogg"`　"Is she always like this before a live?"@
br
dwave 0,"dat\voice\5_0396.ogg"`　"No, this is the first time she's been like this. @
dwave 0,"dat\voice\5_0397.ogg"`Kagawa told me she freezes up before her piano recitals, but I didn't think she'd be like this."\

dwave 0,"dat\voice\1_0904.ogg"`　"This is really her, isn't it? @
dwave 0,"dat\voice\1_0905.ogg"`Not just some life-size doll of her, right?"@
br
dwave 0,"dat\voice\5_0398.ogg"`　"Nobody would do something like this."@
br
dwave 0,"dat\voice\1_0906.ogg"`　"So what are you going to do?"@
br
dwave 0,"dat\voice\5_0399.ogg"`　"Kagawa probably knows what to do, but I have no idea where she is... @
dwave 0,"dat\voice\5_0400.ogg"`I'm gonna go look for her, so I'll leave Shinoi to you."@
br
dwave 0,"dat\voice\1_0907.ogg"`　"What? Hey, wait!"@
br
`　Before I could stop him, he was already outside.\

stop
change_d "全消去"
dwave 0,"dat\voice\1_0908.ogg"`　"...what does he want me to do?"@
br
change_cc "しのりん222メ俯き"
`　I tried knocking on her head, then pulling on her hair a little, but eerily enough, there was no reaction from her. It was like time had stopped for everything except me.\

dwave 0,"dat\voice\1_0909.ogg"`　"Shinoiii. @
dwave 0,"dat\voice\1_0910.ogg"`If you stay still for too long, your muscles will cramp."@
br
`　I thought I'd read something like this in a manga a long time ago. I didn't know if it was true or not, but...@
br
`　...it was only me and her in the classroom.@
br
`　Alone with a girl that wouldn't react to whatever you said or did.\

`　Huh? It didn't matter what you did...? Like now...\

`　...\

`　No! No freaking way! It would be horrible if she became aware of you while you were doing that. You couldn't do something like that to someone...\

`　But she didn't know I'd come by, and my youthful curiosity was growing rapidly.\

`　It was hopeless... I couldn't control myself!!\

gosub *windowoff
bg black,%110
wait 2000
gosub *windowon

`　―――\

wait 2000

`　"..."\

`　I just did it.@
br
`　It was out of curiosity... I...@
br
`　But... this was...@
br
br
`　...\

gosub *windowoff
change_b "教室夜"
change_cc "しのりん242俯き"
gosub *windowon
mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん

dwave 0,"dat\voice\1_0911.ogg"`　"She's... cute," @
`I murmured out loud.@
br
`　In my right hand was the pair of glasses that had been on her face just a moment ago. \

`　For a while I just stared at her face. For a while, it really DID feel like time had stopped in the room.@
br
`　If she smiled right now, it would be even cuter...@
br
`　With that in mind, I put her glasses back on her face.\

change_d "中消去"
stop
dwave 0,"dat\voice\5_0401.ogg"`　"Toshiki!"@
br
dwave 0,"dat\voice\1_0912.ogg"`　"Ack!"@
br
`　BANG! Reiji rushed into the room. I'd done nothing to feel guilty about, but for some reason I felt strangely nervous and my heart was pounding.\

change_cc "うに413真面目"
dwave 0,"dat\voice\1_0913.ogg"`　"What..."@
br
dwave 0,"dat\voice\5_0402.ogg"`　"...Kagawa collapsed from a cold," @
`Reiji burst out. She'd collapsed? He said it so seriously. He had to be telling the truth.\

dwave 0,"dat\voice\1_0914.ogg"`　"So what are you going to do about the live?"@
br
dwave 0,"dat\voice\5_0403.ogg"`　"We'll have to withdraw. @
dwave 0,"dat\voice\5_0404.ogg"`...she said that it would be best if someone could replace her, though. @
dwave 0,"dat\voice\5_0405.ogg"`But there's nobody who can do it..."@
br
`　"..."\

dwave 0,"dat\voice\5_0406.ogg"`　"...well, this is our last live in high school, but it's not like we're disbanding after this or anything... @
dwave 0,"dat\voice\5_0407.ogg"`We'll just have to give up. @
dwave 0,"dat\voice\5_0408.ogg"`I'm going to go explain this to the festival committee and take Kagawa home. So, help me tell Shinoi what happened when she comes back."@
br
`　He left the room again.\

change_d "中消去"
`　...and the two of us were left alone again.@
br
`　Hm...? The two of us...@
br
change_cc "しのりん222メ俯き"
dwave 0,"dat\voice\1_0915.ogg"`　"...heeey! @
dwave 0,"dat\voice\1_0916.ogg"`Shinoiii."@
br
`　What did Reiji want me to do?\

`　The faint music from outside stopped. It was now supposed to be BROY's turn.@
br
`　But with her frozen like this, how was she supposed to play...?@
br
`　In the deathly silent classroom, Red Ai's music suddenly flowed through.\

change_cc "しのりん221メ通常"
dwave 0,"dat\voice\3_0146.ogg"`　"...ah! @
dwave 0,"dat\voice\3_0147.ogg"`Is it our turn?"@
br
`　She suddenly came to life.@
br
change_cc "しのりん224メ照れ"
dwave 0,"dat\voice\3_0148.ogg"`　"Huh? @
dwave 0,"dat\voice\3_0149.ogg"`Sugai-san...?"\

`　She looked around, found that I was the only one there, and stared blankly at me. Then she reached in her pocket, pulled out her cell phone, and shut off the music that had suddenly torn up the silence. It seemed that it wasn't a call, but a timer or something that she'd set for herself. Hmm... it was Red Ai's ring tone that woke her up from that condition... that saved me.@
br
change_cc "しのりん221メ通常"
dwave 0,"dat\voice\3_0150.ogg"`　"Has the live started already?!"@
br
dwave 0,"dat\voice\1_0917.ogg"`　"No, that's..."@
br
`　"...?"\

gosub *windowoff
bg black,%110
wait 2000
gosub *windowon

`　I explained the situation to her. She was worried about Kagawa, so I went with her to the infirmary, but it seemed that Reiji had already taken her home.\

gosub *windowoff
change_b "通学路夜"
wait 2000
dwaveloop 12,"dat\music\se\se12.wav":mov %22,12
change_cc "しのりん221メ通常"
gosub *windowon

dwave 0,"dat\voice\3_0151.ogg"`　"I wonder if Mami-chan is okay..." @
`she said in a faint, almost inaudible voice. I slowed down to match her pace, and we walked up the hill.\

`　With nothing to talk about, the two of us continued in silence. The sea breeze tied the atmosphere around us.@
br
change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0152.ogg"`　"Ah..."@
br
dwave 0,"dat\voice\1_0918.ogg"`　"What's wrong?"@
br
dwave 0,"dat\voice\3_0153.ogg"`　"No, this is my street."@
br
dwave 0,"dat\voice\1_0919.ogg"`　"So then we separate here."@
br
dwave 0,"dat\voice\3_0154.ogg"`　"Yes. @
dwave 0,"dat\voice\3_0155.ogg"`Goodbye."@
br
dwave 0,"dat\voice\1_0920.ogg"`　"Yeah, see you later."@
br
change_d "中消去"
`　Heading into a dimly lit alley, her small form disappeared into the darkness.\

gosub *windowoff
bg black,%110
wait 1000
dwavestop 12:mov %22,0
wait 1000


;----------------------------------
;　三日目(二周)
;----------------------------------
change_day "十八日"

change_b "学園祭教室昼"
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
gosub *windowon

dwave 0,"dat\voice\5_0409.ogg"`　"Hey, Toshiki! @
dwave 0,"dat\voice\5_0410.ogg"`Get that plate ready for me!"@
br
dwave 0,"dat\voice\1_0921.ogg"`　"Yeah, yeah. @
dwave 0,"dat\voice\1_0922.ogg"`That's what I've BEEN doing."\

`　The day of the festival. It was approaching noon, and our class was fired up.@
br
`　Of course, as usual, Reiji had already been in high spirits since this morning... but I could see that he was doing it on purpose to show that he wasn't affected by the cancellation of yesterday's live.\

change_cc "うに411通常"
dwave 0,"dat\voice\5_0411.ogg"`　"What are you spacing out for? @
dwave 0,"dat\voice\5_0412.ogg"`Hurry and dish that up."@
br
dwave 0,"dat\voice\1_0923.ogg"`　"Oh, sorry."@
br
`　Whoops. I couldn't overthink it to the point of letting it affect my performance.\

gosub *windowoff
bg black,%110
wait 2000
change_b "学園祭教室昼"
gosub *windowon


`　Around noon, a small female student caught my eye.@
br
dwave 0,"dat\voice\1_0924.ogg"`　"Hey, Shinoi."@
br
mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん
change_cc "しのりん213メ笑顔"
dwave 0,"dat\voice\3_0156.ogg"`　"Ah, Sugai-san. @
dwave 0,"dat\voice\3_0157.ogg"`Hello."\

dwave 0,"dat\voice\1_0925.ogg"`　"Are you enjoying the festival?"@
br
dwave 0,"dat\voice\3_0158.ogg"`　"I was selling things up until now. @
dwave 0,"dat\voice\3_0159.ogg"`I can go now, though. @
dwave 0,"dat\voice\3_0160.ogg"`But selling things can be fun. @
dwave 0,"dat\voice\3_0161.ogg"`Have you been enjoying yourself?"@
br
dwave 0,"dat\voice\1_0926.ogg"`　"Nope. @
dwave 0,"dat\voice\1_0927.ogg"`But I can soon. @
dwave 0,"dat\voice\1_0928.ogg"`I'll be free after we change shifts."@
br
dwave 0,"dat\voice\3_0162.ogg"`　"Oh, then..."@
br
dwave 0,"dat\voice\1_0929.ogg"`　"Hm?"\

change_cc "しのりん224メ照れ"
`　As she was about to speak, she suddenly turned red and looked down.@
br
dwave 0,"dat\voice\3_0163.ogg"`　"Um... um, if it's okay with you... would you like to go around the festival with me? @
dwave 0,"dat\voice\3_0164.ogg"`...wah. @
dwave 0,"dat\voice\3_0165.ogg"`Please don't get so close to my face."\

dwave 0,"dat\voice\1_0930.ogg"`　"Oh, sorry. @
dwave 0,"dat\voice\1_0931.ogg"`It's just that your voice got so quiet that I couldn't hear..."@
br
dwave 0,"dat\voice\3_0166.ogg"`　"Unless you have something already planned?"@
br
dwave 0,"dat\voice\1_0932.ogg"`　"No, I have nothing planned. @
dwave 0,"dat\voice\1_0933.ogg"`Sure. @
dwave 0,"dat\voice\1_0934.ogg"`Let's go together."@
br
change_cc "しのりん213メ笑顔"
dwave 0,"dat\voice\3_0167.ogg"`　"Okay!"@
br
dwave 0,"dat\voice\1_0935.ogg"`　"Do you want to meet somewhere after I change shifts?"\
change_d "中消去"

`　After promising that I would meet her in front of the gym, I went back into the kitchen, and was met with Reiji's horrifyingly scary face.@
br
dwave 0,"dat\voice\1_0936.ogg"`　"What's with the gross face?"\

change_cc "うに412にしし"
dwave 0,"dat\voice\5_0413.ogg"`　"No, I just was thinking... has Sugai-kun's slightly late spring finally come?"@
br
dwave 0,"dat\voice\1_0937.ogg"`　"Look, you..."@
br
dwave 0,"dat\voice\5_0414.ogg"`　"But when did you and Shinoi start getting along? @
dwave 0,"dat\voice\5_0415.ogg"`You've only recently started talking to her, right?"@
br
dwave 0,"dat\voice\1_0938.ogg"`　"That's not..."\

`　...he was right. If I thought about it, it was true. It was about two or three days...? Huh? Was that it? It felt like I'd talked to her about other things before...@
br
dwave 0,"dat\voice\5_0416.ogg"`　"It looks like the last festival is going to be a fun one, huh, @
dwave 0,"dat\voice\5_0417.ogg"`Sugai-kun?"@
br
dwave 0,"dat\voice\1_0939.ogg"`　"I told you it feels gross hearing that from you."\

gosub *windowoff
change_d "中消去"
wait 2000
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
gosub *windowon

`　In a little bit, the classroom got a lot busier.@
br
dwave 0,"dat\voice\1_0940.ogg"`　"Hey, hey. @
dwave 0,"dat\voice\1_0941.ogg"`What's this? @
dwave 0,"dat\voice\1_0942.ogg"`Those guys..."@
br
change_cc "うに411通常"
dwave 0,"dat\voice\5_0418.ogg"`　"I think that's the judo club."@
br
`　As Reiji had said, ten... no, more than ten judo-looking guys were there. They came in and sat down.\

dwave 0,"dat\voice\1_0943.ogg"`　"I can't see Shinoi... she's too small."@
br
dwave 0,"dat\voice\5_0419.ogg"`　"That's usually the case anyway..."@
br
change_d "中消去"
`　To be exact, I couldn't see Shinoi after the shadows of those guys completely covered her. I found her as I looked around to see where she was sitting. She was about to leave the classroom.\

`　"...!"@
br
stop
gosub *windowoff
bg "dat\cg\cg12_1.jpg",1
bg "dat\bg\bg01a_1.jpg",10,500
gosub *windowon
`　Danger...!@
br
`　I didn't know why, but that word echoed in my head. Before I knew it, I chased after Shinoi, who was about to leave.\

change_b "学園祭廊下昼"

dwave 0,"dat\voice\1_0944.ogg"`　"Shinoi!!"@
br
`　Just after she got outside, I shouted for her.@
br
change_cc "しのりん211メ通常"
dwave 0,"dat\voice\3_0168.ogg"`　"Sugai-san?"@
br
`　As she turned around to look at me, the giant sign swung down heavily right across from her.\

bg black,%110

`　I pushed her away, the sign missing us by a hair's breadth.@
br
`　The moment I held her small body and rolled away, there was a loud bang. The sound echoed and suddenly there was a commotion around us. I felt a hint of wind against my cheek.\

dwave 0,"dat\voice\1_0945.ogg"`　"Shinoi?! @
dwave 0,"dat\voice\1_0946.ogg"`Are you okay?"@
br
dwave 0,"dat\voice\3_0169.ogg"`　"Ye... yes."@
br
`　It had happened in an instant. My body had moved with its own accord and I was surrounded with a strange sensation.@
br
`　It was as if I'd known this was going to happen.\

dwave 0,"dat\voice\3_0170.ogg"`　"Ah... um..."@
br
dwave 0,"dat\voice\1_0947.ogg"`　"Hm?"@
br
dwave 0,"dat\voice\3_0171.ogg"`　"Um... this is embarrassing..."@
br
dwave 0,"dat\voice\1_0948.ogg"`　"Huh? @
dwave 0,"dat\voice\1_0949.ogg"`Oh."\

change_b "学園祭廊下昼"

`　I'd been holding her the entire time I was looking at the fallen sign. It was as she'd said; people had noticed the sign falling, and we were right in the middle of it. Anyone's face would turn red in this situation, not just Shinoi's.\

change_cc "しのりん244照れ"
`　...then I noticed that her glasses had fallen off from the impact. I was looking at her uncovered eyes.@
br
dwave 0,"dat\voice\3_0172.ogg"`　"Um..."@
br
`　Face completely red, it was the only thing she could say in a situation like this.@
br
dwave 0,"dat\voice\1_0950.ogg"`　"Sorry."@
br
`　I stood up and brushed off my uniform.\

mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん
change_cc "しのりん243うわわ"
dwave 0,"dat\voice\3_0173.ogg"`　"Glasses..."@
br
`　She was feeling around, looking for them. I searched with her, and found them about five meters away from where we'd fallen.@
br
dwave 0,"dat\voice\1_0951.ogg"`　"Shinoi, over there."@
br
change_cc "しのりん241通常"
dwave 0,"dat\voice\3_0174.ogg"`　"Huh?"@
br
dwave 0,"dat\voice\1_0952.ogg"`　"They flew all the way over there."\

change_cc "しのりん234目閉じ"
dwave 0,"dat\voice\3_0175.ogg"`　"Sorry. @
dwave 0,"dat\voice\3_0176.ogg"`I couldn't see anything without my glasses... @
dwave 0,"dat\voice\3_0177.ogg"`They flew that far?"@
br
dwave 0,"dat\voice\1_0953.ogg"`　"Well, I guess you could say it's far..." @
`I said as I picked them up.@
br
dwave 0,"dat\voice\1_0954.ogg"`　"Ah... the lens cracked."@
br
change_cc "しのりん242俯き"
dwave 0,"dat\voice\3_0178.ogg"`　"Wah..."@
br
`　Both the lens were cracked from the impact.\

dwave 0,"dat\voice\3_0179.ogg"`　"I can't use them anymore..."@
br
dwave 0,"dat\voice\1_0955.ogg"`　"Sorry... @
dwave 0,"dat\voice\1_0956.ogg"`It's my fault they got broken."@
br
change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0180.ogg"`　"No. @
dwave 0,"dat\voice\3_0181.ogg"`It wouldn't be the glasses we'd be talking about if that sign had fallen on me. @
dwave 0,"dat\voice\3_0182.ogg"`Thank you."@
br
`　Shinoi walked past me and bowed her head to a random person.\

dwave 0,"dat\voice\1_0957.ogg"`　"Heeey. @
dwave 0,"dat\voice\1_0958.ogg"`I'm over here."@
br
change_cc "しのりん244照れ"
dwave 0,"dat\voice\3_0183.ogg"`　"Huh? @
dwave 0,"dat\voice\3_0184.ogg"`Huh?"@
br
`　It looked like her eyesight really WAS terrible.@
br
dwave 0,"dat\voice\1_0959.ogg"`　"You couldn't see the biggest letter they show you during eye exams, right?"@
br
change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0185.ogg"`　"...you knew?"\

dwave 0,"dat\voice\1_0960.ogg"`　"So it IS like that. @
dwave 0,"dat\voice\1_0961.ogg"`Aside from that, do you hurt anywhere?"@
br
dwave 0,"dat\voice\3_0186.ogg"`　"I think... I'm okay."@
br
dwave 0,"dat\voice\1_0962.ogg"`　"I see. @
dwave 0,"dat\voice\1_0963.ogg"`Oh yeah, there was something else..."@
br
dwave 0,"dat\voice\5_0420.ogg"`　"Hey! @
dwave 0,"dat\voice\5_0421.ogg"`Toshiki! @
dwave 0,"dat\voice\5_0422.ogg"`Hurry, come back!!"@
br
dwave 0,"dat\voice\1_0964.ogg"`　"Oh. @
dwave 0,"dat\voice\1_0965.ogg"`Crap. @
dwave 0,"dat\voice\1_0966.ogg"`I'll see you later... I think I'll be done soon."@
br
change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0187.ogg"`　"Okay! @
dwave 0,"dat\voice\3_0188.ogg"`I'll be waiting in front of the gym."\

change_d "中消去"
`　Before going back in the room, I looked back to see her walking away.@
br
change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0189.ogg"`　"Waaah...!"@
br
`　She walked head-on into another class's sign.
change_d "中消去"
dwave 0,"dat\voice\1_0967.ogg"`　"...is she... @
dwave 0,"dat\voice\1_0968.ogg"`okay?"\

gosub *windowoff
bg black,%110
wait 2000
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
change_b "学園祭教室昼"
gosub *windowon


dwave 0,"dat\voice\1_0969.ogg"`　"We're finally done..."@
br
`　I'd THOUGHT we were going to change shifts soon after, but with the judo club combined with noontime's deadly order rush, it was impossible to sneak off.@
br
dwave 0,"dat\voice\1_0970.ogg"`　"Oh no... @
dwave 0,"dat\voice\1_0971.ogg"`Shinoi's probably waiting for me."\

change_b "学園祭廊下昼"
`　Even though I'd only get there a little more quickly by running, I dashed down the hall.\

dwave 0,"dat\voice\1_0972.ogg"`　"Shinoi."@
br
mov %282
mov %286,1:bgm "dat\music\bgm\bgm02.mp3";	しのりん
change_cc "しのりん231通常"
dwave 0,"dat\voice\3_0190.ogg"`　"Sugai-san?"@
br
`　Like she'd promised, Shinoi was waiting in the hallway in front of the gym.@
br
dwave 0,"dat\voice\1_0973.ogg"`　"Sorry! @
dwave 0,"dat\voice\1_0974.ogg"`I couldn't get away."@
br
change_cc "しのりん234目閉じ"
dwave 0,"dat\voice\3_0191.ogg"`　"It's okay. @
dwave 0,"dat\voice\3_0192.ogg"`I just got here too."@
br
dwave 0,"dat\voice\1_0975.ogg"`　"You did?"@
br
`　Looking more closely, I realized that her clothes were covered with white dust in various places.\

dwave 0,"dat\voice\1_0976.ogg"`　"It must have been... difficult for you."@
br
dwave 0,"dat\voice\3_0193.ogg"`　"What?"@
br
dwave 0,"dat\voice\1_0977.ogg"`　"Shinoi, what degrees are your glasses?"@
br
change_cc "しのりん242俯き"
dwave 0,"dat\voice\3_0194.ogg"`　"Um... the right is 0.04 and the left is 0.02... huh? @
dwave 0,"dat\voice\3_0195.ogg"`Or was it 3...?"@
br
`　"..."\

change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0196.ogg"`　"And I have a little astigmatism."@
br
dwave 0,"dat\voice\1_0978.ogg"`　"I get it, I get it. @
dwave 0,"dat\voice\1_0979.ogg"`Even though you're telling me that so enthusiastically, though, it's still troubling. @
dwave 0,"dat\voice\1_0980.ogg"`...more importantly, like before, that 'Welcome to Uminari Koutou High!' sign is totally not me."@
br
change_cc "しのりん243うわわ"
dwave 0,"dat\voice\3_0197.ogg"`　"Eh?! @
dwave 0,"dat\voice\3_0198.ogg"`EEH?!"\

`　As she spoke, I realized that even though she was the spitting image of an uncommunicative, shy, and serene girl, she didn't seem that way now.@
br
dwave 0,"dat\voice\1_0981.ogg"`　"Pfft."@
br
change_cc "しのりん241通常"
`　"...?"\

dwave 0,"dat\voice\1_0982.ogg"`　"Sorry, sorry. @
dwave 0,"dat\voice\1_0983.ogg"`It's just that I had an image of you as a more composed person... but not so much now."@
br
dwave 0,"dat\voice\3_0199.ogg"`　"I think that's a bit rude of you."@
br
dwave 0,"dat\voice\1_0984.ogg"`　"But I think it's cute."@
br
change_cc "しのりん244照れ"
dwave 0,"dat\voice\3_0200.ogg"`　"Wha?"\

dwave 0,"dat\voice\1_0985.ogg"`　"Well, let's walk around the festival. @
dwave 0,"dat\voice\1_0986.ogg"`If we don't hurry, it'll be closing time before we know it."@
br
dwave 0,"dat\voice\3_0201.ogg"`　"Wait... Sugai-san? @
dwave 0,"dat\voice\3_0202.ogg"`What did you just say?"@
br
dwave 0,"dat\voice\1_0987.ogg"`　"Where do you want to go first? @
dwave 0,"dat\voice\1_0988.ogg"`Ahh, I haven't eaten yet, so let's look for something I can eat while we walk."@
br
change_cc "しのりん234目閉じ"
dwave 0,"dat\voice\3_0203.ogg"`　"Sugai-san! @
dwave 0,"dat\voice\3_0204.ogg"`Please don't ignore what I'm saying! @
change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0205.ogg"`Wah! Ah, sorry."@
br
`　She bumped into someone and immediately apologized. This was kind of dangerous for her...\

dwave 0,"dat\voice\1_0989.ogg"`　"Shinoi."@
br
change_cc "しのりん231通常"
dwave 0,"dat\voice\3_0206.ogg"`　"Yes?"@
br
dwave 0,"dat\voice\1_0990.ogg"`　"Here."@
br
`　"...?"@
br
`　I faced Shinoi and held out my hand. It was kind of embarrassing, of course, but if I didn't hold hands with her as she was now, who knew what could happen.@
br
change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0207.ogg"`　"Um..."\

`　Shinoi was bewildered. She held out her right index and middle finger.@
br
change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0208.ogg"`　"I win."@
br
dwave 0,"dat\voice\1_0991.ogg"`　"No no, I'm not asking to be beat in rock-paper-scissors."@
br
`　Her vision might have been blurry, but was her thinking like that too? Or was this just how she was normally...?\

dwave 0,"dat\voice\1_0992.ogg"`　"Not that. Here, hold my hand."@
br
`　Saying something like that out of the blue was embarrassing, but Shinoi just looked blankly at my hand, then at my face, confused.@
br
change_cc "しのりん244照れ"
dwave 0,"dat\voice\3_0209.ogg"`　"...um."@
br
`　Then she finally understood. And, as expected, she turned red and looked down.\

dwave 0,"dat\voice\1_0993.ogg"`　"...because it's dangerous. @
dwave 0,"dat\voice\1_0994.ogg"`Let's hold hands while we walk."@
br
change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0210.ogg"`　"O-okay..."@
br
`　She gingerly held my hand. It felt like if I put any strength into it, her small hand would break. I held her hand as gently as I could.\

dwave 0,"dat\voice\1_0995.ogg"`　"...hey."@
br
dwave 0,"dat\voice\3_0211.ogg"`　"Yes?"@
br
dwave 0,"dat\voice\1_0996.ogg"`　"A right hand holding onto a right hand is just a handshake, you know."@
br
change_cc "しのりん244照れ"
dwave 0,"dat\voice\3_0212.ogg"`　"Wah."@
br
`　What were we doing...?\

gosub *windowoff
bg black,%110
wait 2000
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
change_b "学園祭廊下昼"
change_cc "しのりん233笑顔"
gosub *windowon

dwave 0,"dat\voice\3_0213.ogg"`　"Sugai-san, you have good aim!" @
`she said while happily hugging a stuffed bunny.\

dwave 0,"dat\voice\1_0997.ogg"`　"It was just a lucky shot. @
dwave 0,"dat\voice\1_0998.ogg"`I was really aiming for that Norwegian Forest Cat doll next to it."@
br
change_cc "しのりん231通常"
dwave 0,"dat\voice\3_0214.ogg"`　"What was that cat's name? It was so long and complicated..."@
br
dwave 0,"dat\voice\1_0999.ogg"`　"Like I said, it's a Norwegian Forest Cat."\

change_cc "しのりん233笑顔"
`　"... @
dwave 0,"dat\voice\3_0215.ogg"`The cat is cute, but this bunny is cute, too. @
dwave 0,"dat\voice\3_0216.ogg"`Ah, now that I mention it, I haven't seen that cat today."@
br
dwave 0,"dat\voice\1_1001.ogg"`　"Hm? @
dwave 0,"dat\voice\1_1002.ogg"`What are you talking about?"@
br
dwave 0,"dat\voice\3_0217.ogg"`　"The one that lives in the school, the all-white one."@
br
dwave 0,"dat\voice\1_1003.ogg"`　"Hmm."\

`　She held onto the doll with one hand and my hand with her other.@
br
`　Nah. It wasn't how a couple would act; it looked more like two happy siblings holding hands.\

`　...now that I thought about it, did she have a boyfriend?@
br
`　...if she did, would she be walking around the festival holding my hand?@
br
change_b "自販機前昼"
`　Thinking hard, I kept walking, and as we aimlessly walked around the school, we came to the hall that had a vending machine.\

dwave 0,"dat\voice\1_1004.ogg"`　"Do you want something to drink?"@
br
change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0218.ogg"`　"Ah, I'll pay, as thanks for the bunny."@
br
dwave 0,"dat\voice\1_1005.ogg"`　"It's fine, it's fine."@
br
`　I stopped her from getting her wallet out and put change in.\

change_cc "しのりん234目閉じ"
dwave 0,"dat\voice\3_0219.ogg"`　"Since we're here, would you like to go outside and take a break?"@
br
dwave 0,"dat\voice\1_1006.ogg"`　"Sure."@
br
`　It would probably be good to breathe in some fresh air here.@
br
dwave 0,"dat\voice\3_0220.ogg"`　"So do you want to go to the roof?"@
br
dwave 0,"dat\voice\1_1007.ogg"`　"Roof?"@
br
dwave 0,"dat\voice\3_0221.ogg"`　"Yes. @
dwave 0,"dat\voice\3_0222.ogg"`I think we can get there if we use those stairs."@
br
`　She pointed to the stairs, and when I looked, she was already weaving her way there by herself.\

change_b "階段昼"

dwave 0,"dat\voice\1_1008.ogg"`　"Hey, @
dwave 0,"dat\voice\1_1009.ogg"`wait! @
dwave 0,"dat\voice\1_1010.ogg"`That's dangerous."@
br
dwave 0,"dat\voice\3_0223.ogg"`　"I'm okay."@
br
`　With the cans in hand, I chased her as she moved quickly up the stairs. On the way, I stopped and looked up, not seeing her at all since she'd gone around the corner...\

stop
dwave 0,"dat\voice\3_0224.ogg"`　"...that's strange."@
br
`　She was standing still, out of my sight.@
br
dwave 0,"dat\voice\1_1011.ogg"`　"Whoa!"@
br
`　I wasn't watching my own steps and ended up missing one. If I'd been unbalanced just a bit more, I would've tumbled down.\

change_cc "しのりん232あうう"
`　When I neared her, I understood why she'd had to stop.@
br
dwave 0,"dat\voice\1_1012.ogg"`　"Now that I think about it, there was an accident here last year and people weren't allowed in since, were they?"\

`　With the no entry sign in front of her, Shinoi murmered, @
br
change_cc "しのりん241通常"
dwave 0,"dat\voice\3_0225.ogg"`"...but I've been up here before? @
dwave 0,"dat\voice\3_0226.ogg"`I was chasing the cat, up these stairs..."@
br
`　She passed the sign and continued walking.@
br
dwave 0,"dat\voice\3_0227.ogg"`　"Sugai-san, too... you were there with me!"\
change_d "中消去"

dwave 0,"dat\voice\1_1013.ogg"`　"Hey, don't run! @
dwave 0,"dat\voice\1_1014.ogg"`That's really dangerous!"@
br
`　I hurried up the rest of the stairs as well, after the bookish girl that went up those stairs with surprising speed.\

change_cc "しのりん235驚き"

dwave 0,"dat\voice\3_0228.ogg"`　"Haa, haa... @
dwave 0,"dat\voice\3_0229.ogg"`Aww! @
dwave 0,"dat\voice\3_0230.ogg"`It won't open."@
br
`　I put my own weight on the door that led to the roof, but it still wouldn't budge.@
br
change_b "階段夕"
dwave 0,"dat\voice\1_1015.ogg"`　"It's locked, don't you think? @
dwave 0,"dat\voice\1_1016.ogg"`Let's just give up and... go?"\

`　...huh?@
br
`　From the window of the door, the setting sun flowed in and dyed the area red. When had it gotten this late?@
br
`　No, more than that, for a moment... what? It was as if something had appeared in front of me...\

bg black,%110

dwave 0,"dat\voice\2_0426.ogg"`　"Goodbye."\

`　...!@
br
br
`　Unconsciously, I put my hand to the door. The cans fell from my hands and rolled, tumbling down the stairs. There was no way to open this locked door, but I still used as much strength as I could to try to open it. The sun shone brightly and I had to close my eyes. In that moment, the pressure left my hands, and the door flew open. Not expecting this sudden release, Shinoi fell into the area.\

gosub *windowoff
wait 2000
change_b "ＣＧ１４＿１"
gosub *windowon

`　"..."@
br
dwave 0,"dat\voice\3_0231.ogg"`　"Ah..."@
br
`　When I noticed, she was pinned under me. It was like when I'd pushed her away from the falling sign earlier today, but for some reason, a lot more embarrassing.\

`　...and above all... my hand was on her chest...@
br
dwave 0,"dat\voice\1_1017.ogg"`　"Soft... no! Sorry!"@
br
`　I confusedly pulled my hand away, but she was already a deep shade of red.@
br
dwave 0,"dat\voice\3_0232.ogg"`　"...wah."\

mov %286
mov %286,1:bgm "dat\music\bgm\bgm06.mp3";	おくじょ
change_b "屋上夕"

`　Letting her cool down a bit, I walked through the open door.@
br
`　The fence that had broken a year ago was gone, and vinyl tape was stretched around the area. I stood beside it in a long moment of silence. Shinoi was the first to speak.\

change_cc "しのりん241通常"
dwave 0,"dat\voice\3_0233.ogg"`　"I remember clearly."@
br
dwave 0,"dat\voice\1_1018.ogg"`　"Yeah. @
dwave 0,"dat\voice\1_1019.ogg"`Me too."@
br
dwave 0,"dat\voice\3_0234.ogg"`　"That day's 'today' was a dream, wasn't it?"@
br
dwave 0,"dat\voice\1_1020.ogg"`　"I don't even know for sure."@
br
dwave 0,"dat\voice\3_0235.ogg"`　"...where's Hazuki-san?"@
br
`　"..."\

dwave 0,"dat\voice\3_0236.ogg"`　"Maybe that was Hazuki-san's dream?"@
br
dwave 0,"dat\voice\1_1021.ogg"`　"Why did we see her dream?"@
br
dwave 0,"dat\voice\3_0237.ogg"`　"...I don't know. @
dwave 0,"dat\voice\3_0238.ogg"`But until that day's today, she was definitely here. @
dwave 0,"dat\voice\3_0239.ogg"`Hazuki-san was talking and laughing."@
br
dwave 0,"dat\voice\1_1022.ogg"`　"I made a promise with her and was finally able to meet her that night... then..."\

`　...then, I was back in my own room.@
br
dwave 0,"dat\voice\3_0240.ogg"`　"The difference now is that she's not here, and I can still play the piano... right?"@
br
dwave 0,"dat\voice\1_1023.ogg"`　"What are you saying?"@
br
dwave 0,"dat\voice\3_0241.ogg"`　"...just speculating. @
dwave 0,"dat\voice\3_0242.ogg"`She separated her world from ours and let us repeat these days. She helped me, didn't she?"\

dwave 0,"dat\voice\1_1024.ogg"`　"Why did she have to do that? @
dwave 0,"dat\voice\1_1025.ogg"`And how is it possible that this dream could've happened?"@
br
dwave 0,"dat\voice\3_0243.ogg"`　"But if you say that, how is it possible for us to have the same dream, forget it the same way, and remember it again the same way?"@
br
dwave 0,"dat\voice\1_1026.ogg"`　"...then, Braidy... where is she? @
dwave 0,"dat\voice\1_1027.ogg"`So she doesn't exist in this world?!"\

`　I calmed down a bit and went closer to Shinoi, but she looked away, and then went to the fence.@
br
change_cc "しのりん242俯き"
dwave 0,"dat\voice\3_0244.ogg"`　"...last year, a student fell from here, right?"@
br
dwave 0,"dat\voice\1_1028.ogg"`　"...are you saying that was Braidy?"@
br
dwave 0,"dat\voice\3_0245.ogg"`　"I don't know... @
dwave 0,"dat\voice\3_0246.ogg"`but I feel like it's related somehow."\

`　If it was about the student that had fallen last year... we'd soon find out who it was if we asked the second years. I walked towards the stairs.@
br
change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0247.ogg"`　"Sugai-san?!"@
br
dwave 0,"dat\voice\1_1029.ogg"`　"Just wait over there! @
dwave 0,"dat\voice\1_1030.ogg"`I'll come back as soon as I can!!"\

gosub *windowoff
bg black,%110
wait 2000
change_b "学園祭廊下夕"
gosub *windowon

`　I asked around at every second year class, who all seemed to be starting to clean up. Whether it was my sudden questioning or frantic expression, there were a lot of students avoiding me.\

`　I was walking, dripping with sweat, when I felt a comfortable cold breeze coming from a classroom. I stopped.@
br
`　Class 2-C's haunted house... That was right. This was Braidy's class. I stopped a girl who was putting away a desk and heading into the classroom and asked her.\

dwave 0,"dat\voice\9_2011.ogg"`　"...are you talking about Mizuna-chan?"@
br
`　"...!"\

`　Hazuki Mizuna. Short, with braids that were uncommon these days, not bad with people, but was still often by herself... And 'when she was alive' she had been a student from this class.\

dwave 0,"dat\voice\9_2012.ogg"`　"She was looking forward to the festival. @
dwave 0,"dat\voice\9_2013.ogg"`She'd made a promise. @
dwave 0,"dat\voice\9_2014.ogg"`She said she came to this school because of that very old promise. @
dwave 0,"dat\voice\9_2015.ogg"`...oh, excuse me. @
dwave 0,"dat\voice\9_2016.ogg"`I babbled too much."@
br
dwave 0,"dat\voice\1_1031.ogg"`　"No, thank you. @
dwave 0,"dat\voice\1_1032.ogg"`I'm sorry for asking such a weird question out of the blue."\

`　After the slightly tearful student went back to her classroom, I couldn't move from that spot for a while.\

`　...a very old promise?@
br
`　This school... a promise...@
br
`　Was it possible that Braidy was...?!\

gosub *windowoff
bg black,%110
stop
wait 2000
change_b "屋上夕"
change_cc "しのりん242俯き"
gosub *windowon


dwave 0,"dat\voice\3_0248.ogg"`　"Sugai-san...?"@
br
dwave 0,"dat\voice\1_1033.ogg"`　"Sorry. @
dwave 0,"dat\voice\1_1034.ogg"`I took too long."@
br
change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0249.ogg"`　"No. @
dwave 0,"dat\voice\3_0250.ogg"`It didn't feel like very long. @
dwave 0,"dat\voice\3_0251.ogg"`Look, the sunset's so beautiful."\

mov %289
mov %286,1:bgm "dat\music\bgm\bgm09.mp3";	かなしい
dwave 0,"dat\voice\1_1035.ogg"`　"...I made a promise to a girl that was my first love. @
dwave 0,"dat\voice\1_1036.ogg"`I couldn't remember exactly what it was, but it was to come to this school together, and fulfill it together."@
br
change_cc "しのりん242俯き"
dwave 0,"dat\voice\3_0252.ogg"`　"...that girl... do you still love her now?"@
br
dwave 0,"dat\voice\1_1037.ogg"`　"It was a long time ago. It was back when I was a kid, and I couldn't even remember her name. But I came to this school and looked for her... Even now, I think I still do."\

`　"..."@
br
dwave 0,"dat\voice\1_1038.ogg"`　"Shinoi?"@
br
change_cc "しのりん235驚き"
dwave 0,"dat\voice\3_0253.ogg"`　"...excuse... me..."@
br
`　She began to cry, hiding her face in the stuffed animal.@
br
dwave 0,"dat\voice\1_1039.ogg"`　"There's no proof that the girl... that Braidy was the one in my promise."@
br
dwave 0,"dat\voice\3_0254.ogg"`　"But... but..."\

dwave 0,"dat\voice\1_1040.ogg"`　"A girl named Hazuki Mizuna definitely died falling from here. @
dwave 0,"dat\voice\1_1041.ogg"`Then a girl with the same name appeared in our dreams. @
dwave 0,"dat\voice\1_1042.ogg"`But in the end, that's it. @
dwave 0,"dat\voice\1_1043.ogg"`It's fragmented everywhere and we still don't understand anything about it, right?"@
br
dwave 0,"dat\voice\3_0255.ogg"`　"But this is... sad in itself, isn't it? @
dwave 0,"dat\voice\3_0256.ogg"`If Hazuki-san was the girl in the promise, she died last year. She went through all that for the chance of seeing you, but this had to happen and now she's not here anymore?"\

`　"..."@
br
dwave 0,"dat\voice\3_0257.ogg"`　"That's... so sad."@
br
dwave 0,"dat\voice\1_1044.ogg"`　"But even so, there's nothing we can do... @
dwave 0,"dat\voice\1_1045.ogg"`So don't cry anymore."@
br
dwave 0,"dat\voice\3_0258.ogg"`　"...no... @
dwave 0,"dat\voice\3_0259.ogg"`These tears... aren't what you think..."\

`　She kept the stuffed rabbit pressed tightly to her face.@
br
dwave 0,"dat\voice\3_0260.ogg"`　"I like you... Sugai-san, I like you... So, when I think about Hazuki-san, it's hard to look at you..."@
br
`　"..."@
br
dwave 0,"dat\voice\3_0261.ogg"`　"I'm sorry... I'm sorry..."@
br
`　Before long, her voice gave out into sobs.\

`　I was speechless.\

`　There was the promise from the past.@
br
`　Then there was the dream in which I didn't know if I'd fulfilled the promise or not.@
br
`　And now there was a trembling heart.@
br
`　The sound of the waves brought back some peace, but I felt so little that it hurt.\

stop
dwave 1,"dat\music\se\se14.wav"
change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0262.ogg"`　"Eek?!"@
br
dwave 0,"dat\voice\1_1046.ogg"`　"Whoa!"@
br
`　The gentle sea breeze suddenly erupted and blew against us. The sudden gust of wind disrupted Shinoi's balance and pulled the stuffed rabbit out of her grasp.\
bg black,%110
`　She reached out to try and catch it, and her left hand grabbed at the fence for support.@
br
dwave 0,"dat\voice\3_0263.ogg"`　"Ah...!"@
br
`　But there was no longer a fence... only vinyl tape in its place. Tape exposed to the sea wind for a year wouldn't hold even Shinoi's weight, and as a result tore into many pieces. And, just like that... she was going to fall right in front of my eyes.\

dwave 0,"dat\voice\1_1047.ogg"`　"Shinoi!!"@
br
`　The distance between us was just that much. I frantically reached out and grabbed her arm. As if we'd switched places, I was reaching out to grab her as my other hand held on to the fence next to me.\

gosub *windowoff
wait 2000
change_b "屋上夕テープ無し"
gosub *windowon

`　...it was the only thing I could do at that moment, and somehow I got her.@
br
`　She sat down shakily.\

change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0264.ogg"`　"...thank.... thank you."@
br
`　Her voice trembled as she spoke.\

`　Even though I'd moved so surely, my legs were now trembling, and if there was another gust of wind, I'd probably be blown down. I slowly looked below and saw that the rabbit had landed much farther down than I'd thought it would be. In the red light of the setting sun, the rabbit's white fur looked seeped in crimson. If I'd taken one wrong step, that would've been me in a much thicker red...\

mov %290
mov %286,1:bgm "dat\music\bgm\bgm10.mp3";	こくはく
change_b "ＣＧ１５＿１"

`　I swallowed and walked over to Shinoi with trembling legs.@
br
dwave 0,"dat\voice\3_0265.ogg"`　"Ah..."@
br
dwave 0,"dat\voice\1_1048.ogg"`　"It's true that the girl in my promise is important to me. @
dwave 0,"dat\voice\1_1049.ogg"`Even if it was or wasn't Braidy, I still think of her as an important person. @
dwave 0,"dat\voice\1_1050.ogg"`However, you are also an important person to me."\

dwave 0,"dat\voice\3_0266.ogg"`　"But that's... two-timing, isn't it?"@
br
dwave 0,"dat\voice\1_1051.ogg"`　"Well, even though you're both important, the one I like is you."@
br
dwave 0,"dat\voice\3_0267.ogg"`　"The way you're saying it... @
dwave 0,"dat\voice\3_0268.ogg"`is kind of unfair."@
br
dwave 0,"dat\voice\1_1052.ogg"`　"Well... @
dwave 0,"dat\voice\1_1053.ogg"`I was really worried here, so you'll have to forgive me for saying it like that."@
br
dwave 0,"dat\voice\3_0269.ogg"`　"But... I'm really happy."\

`　She smiled at me as tears rolled down her cheeks.@
br
dwave 0,"dat\voice\1_1054.ogg"`　"...I'm just saying this because it seems like the circumstances were too good to be true, but I wonder if she wanted to help us this way? @
dwave 0,"dat\voice\1_1055.ogg"`I wonder if she thought that as long as we were both happy, it would be okay? @
dwave 0,"dat\voice\1_1056.ogg"`That your finger wasn't injured, and by making us forget her, maybe she wanted us to keep heading forward steadily without feeling lost?"\

dwave 0,"dat\voice\3_0270.ogg"`　"Well, Sugai-san, do you think it's possible for you to forget her now?"@
br
dwave 0,"dat\voice\1_1057.ogg"`　"I don't know. @
dwave 0,"dat\voice\1_1058.ogg"`But even if I can't forget about Braidy, I can still continue loving you."@
br
`　Of course, since I'd said something like that, now MY face was turning red. In my case it was because of the situation, but she was all red as well.\

dwave 0,"dat\voice\3_0271.ogg"`　"...I'm happy, but... @
dwave 0,"dat\voice\3_0272.ogg"`it's so complicated. @
dwave 0,"dat\voice\3_0273.ogg"`Um... will you promise me something? @
dwave 0,"dat\voice\3_0274.ogg"`Please don't forget about Hazuki-san."@
br
dwave 0,"dat\voice\1_1059.ogg"`　"...is that okay?"@
br
dwave 0,"dat\voice\3_0275.ogg"`　"Yes. @
dwave 0,"dat\voice\3_0276.ogg"`But if you want to remember her, it has to be when I'm there too."@
br
dwave 0,"dat\voice\1_1060.ogg"`　"What do you mean?"@
br
dwave 0,"dat\voice\3_0277.ogg"`　"That's just me trying my best to not be jealous right now."@
br
dwave 0,"dat\voice\1_1061.ogg"`　"I get it."@
br
dwave 0,"dat\voice\3_0278.ogg"`　"Yes..."\

`　We were both quiet then, knowing that what had happened would shine on forever. Soon I dipped my head close to Shinoi's face. I looked into that small face of hers, and our eyes met.\

dwave 0,"dat\voice\3_0279.ogg"`　"...what is it?"@
br
dwave 0,"dat\voice\1_1062.ogg"`　"Can I tell you honestly?"@
br
dwave 0,"dat\voice\3_0280.ogg"`　"Wah... that's kind of scary."@
br
dwave 0,"dat\voice\1_1063.ogg"`　"Well, it's nothing like that."@
br
dwave 0,"dat\voice\3_0281.ogg"`　"Is... is that so?"@
br
dwave 0,"dat\voice\1_1064.ogg"`　"Yeah. @
dwave 0,"dat\voice\1_1065.ogg"`Just, well... I want to kiss you."@
br
dwave 0,"dat\voice\3_0282.ogg"`　"...waah~"@
br
dwave 0,"dat\voice\1_1066.ogg"`　"No?"\

dwave 0,"dat\voice\3_0283.ogg"`　"Um... um... @
dwave 0,"dat\voice\3_0284.ogg"`Um, even though you're so close to me, I can't see your face clearly. @
dwave 0,"dat\voice\3_0285.ogg"`So, if it's possible after my glasses are fixed... I want to see your face properly... I think, or something... @
dwave 0,"dat\voice\3_0286.ogg"`Um... It's not fair that only you get to see properly."@
br
dwave 0,"dat\voice\1_1067.ogg"`　"Um, well... you're supposed to close your eyes when you kiss, right?"@
br
dwave 0,"dat\voice\3_0287.ogg"`　"But I want to see you just before it."\

dwave 0,"dat\voice\1_1068.ogg"`　"....then... can I borrow those glasses right now?"@
br
dwave 0,"dat\voice\3_0288.ogg"`　"Yes?"@
br
`　With a questioning look, she pulled the case from her pocket and handed me her glasses.\

dwave 0,"dat\voice\3_0289.ogg"`　"If I wear these, I won't be able to see very well."@
br
dwave 0,"dat\voice\1_1069.ogg"`　"That's if YOU wear them. @
dwave 0,"dat\voice\1_1070.ogg"`But..."@
br
`　Taking the glasses, I put them on. The frames, made to fit her small face, were bent out of shape at the ear from the fall. So even if I put them on by force, it wouldn't really make a difference.\

change_b "ＣＧ１５＿２"
`　It was partly the broken lenses, but it was also with the help of Shinoi's wonderful eyesight that I got the glasses' full effect.@
br
dwave 0,"dat\voice\1_1071.ogg"`　"Whoa. @
dwave 0,"dat\voice\1_1072.ogg"`The world is all warped."@
br
dwave 0,"dat\voice\3_0290.ogg"`　"...um, um...?"@
br
`　Shinoi's eyes showed that she didn't understand why I was doing this.\

dwave 0,"dat\voice\1_1073.ogg"`　"Look, now it's fair, right?"@
br
dwave 0,"dat\voice\3_0291.ogg"`　"Wah..."@
br
`　Her face turned red, showing that she understood.@
br
dwave 0,"dat\voice\3_0292.ogg"`　"Do... do we have to right now?"@
br
dwave 0,"dat\voice\1_1074.ogg"`　"No, we don't have to if you don't want to..."@
br
dwave 0,"dat\voice\3_0293.ogg"`　"...um... um, it's a memorable day... so... it's okay."\

`　If I hadn't been this close to her already, I wouldn't have heard what she said.@
br
change_b "ＣＧ１５＿３"
`　When I gently got closer to her face, she closed her eyes softly in acceptance. Confirming that, I took off those sight-hindering things.@
br
change_b "ＣＧ１５＿４"
`　...she was incredibly cute.@
br
change_b "ＣＧ１５＿３"
`　As she blushed, I put on the glasses again, closed my eyes, and pressed my lips against hers.\

gosub *windowoff
bg black,%110
stop
wait 3000
mov %287
mov %286,1:bgm "dat\music\bgm\bgm07.mp3";	しっとり
change_b "屋上夜テープ無し"
change_cc "しのりん231通常"
gosub *windowon

dwave 0,"dat\voice\3_0294.ogg"`　"The festival's over."@
br
dwave 0,"dat\voice\1_1075.ogg"`　"Yeah."\

`　From the roof, we were able to see the brightly burning campfire on the grounds.@
br
change_cc "しのりん232あうう"
dwave 0,"dat\voice\3_0295.ogg"`　"...it was too bad... I wanted to have the live."@
br
dwave 0,"dat\voice\1_1076.ogg"`　"Even though you were frozen solid."@
br
change_cc "しのりん234目閉じ"
dwave 0,"dat\voice\3_0296.ogg"`　"I was nervous!"@
br
dwave 0,"dat\voice\1_1077.ogg"`　"But that was just weird. @
dwave 0,"dat\voice\1_1078.ogg"`Well, @
dwave 0,"dat\voice\1_1079.ogg"`should we leave for today? @
dwave 0,"dat\voice\1_1080.ogg"`Or do you want to go dance at the campfire?"\

change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0297.ogg"`　"Yes. @
dwave 0,"dat\voice\3_0298.ogg"`Since we're here, shall we go to the dance? @
dwave 0,"dat\voice\3_0299.ogg"`And we can't forget about the bunny."@
br
dwave 0,"dat\voice\1_1081.ogg"`　"Oh, right. @
dwave 0,"dat\voice\1_1082.ogg"`I feel sorry for it, being thrown like that, so let's go get it first."@
br
dwave 0,"dat\voice\3_0300.ogg"`　"Okay!"\

mov %283
mov %286,1:bgm "dat\music\bgm\bgm03.mp3";	さわやか
change_b "廊下夜"
`　While we'd been on the roof, most of the decorations had been taken down already, and the atmosphere in the hallway was returning back to normal.@
br
`　We walked through it, holding hands. Along with our irregular footsteps, the sounds of the far off campfire could be heard echoing through the halls.\

change_cc "しのりん231通常"
dwave 0,"dat\voice\3_0301.ogg"`　"You're graduating this year, right?"@
br
dwave 0,"dat\voice\1_1083.ogg"`　"Why do you ask all of a sudden?"@
br
dwave 0,"dat\voice\3_0302.ogg"`　"It's just that if I'd been born earlier, there would be more chances of us being in the same places."\

dwave 0,"dat\voice\1_1084.ogg"`　"Yeah. @
dwave 0,"dat\voice\1_1085.ogg"`If it was just a year's difference, there wouldn't be such a huge difference in our heights."@
br
change_cc "しのりん234目閉じ"
dwave 0,"dat\voice\3_0303.ogg"`　"I'm still growing."@
br
dwave 0,"dat\voice\1_1086.ogg"`　"Yeah. @
dwave 0,"dat\voice\1_1087.ogg"`Well, that's what we hope for."\
change_d "中消去"

`　As we arrived at the entrance, rushed footsteps could be heard from behind us. We stopped and looked back, and there was Reiji running at us with a changed expression.@
br
`　We let our hands loose in confusion... Which wasn't bad timing at all.\
change_cl "うに413真面目"

dwave 0,"dat\voice\5_0423.ogg"`　"Shinoi! @
dwave 0,"dat\voice\5_0424.ogg"`And incidentally, Toshiki! @
dwave 0,"dat\voice\5_0425.ogg"`Where were you?! @
dwave 0,"dat\voice\5_0426.ogg"`I was looking for you!!"@
br
dwave 0,"dat\voice\1_1088.ogg"`　"What's wrong?"@
br
dwave 0,"dat\voice\5_0427.ogg"`　"It's a live! @
dwave 0,"dat\voice\5_0428.ogg"`A LIVE!!"@
br
dwave 0,"dat\voice\1_1089.ogg"`　"Huh?"@
br
dwave 0,"dat\voice\5_0429.ogg"`　"We got special permission to do a live after the campfire!! @
dwave 0,"dat\voice\5_0430.ogg"`We're transporting our equipment, so you help too, Toshiki."@
br
dwave 0,"dat\voice\1_1090.ogg"`　"Are you serious?!"\

dwave 0,"dat\voice\5_0431.ogg"`　"Would I lie about this? @
dwave 0,"dat\voice\5_0432.ogg"`Come on, Shinoi, promise me you won't turn to stone and let's go!"@
br
change_cr "しのりん242俯き"
`　"..."@
br
dwave 0,"dat\voice\1_1091.ogg"`　"This is bad. @
dwave 0,"dat\voice\1_1092.ogg"`She already has."@
br
dwave 0,"dat\voice\5_0433.ogg"`　"Aww, geez! @
dwave 0,"dat\voice\5_0434.ogg"`We don't have time, so I'll go on ahead! @
br
dwave 0,"dat\voice\5_0435.ogg"`Toshiki, it's your responsibility to take her to the grounds."@
br
dwave 0,"dat\voice\1_1093.ogg"`　"Huh?"@
br
dwave 0,"dat\voice\5_0436.ogg"`　"I'll leave it to you!"\

change_d "左消去"
`　Reiji ran off in a hurry.@
br
dwave 0,"dat\voice\1_1094.ogg"`　"...geez."@
br
`　He probably knew.\

change_cl "まみたん311通常"
dwave 0,"dat\voice\4_0323.ogg"`　"Ah, Shinorin. @
dwave 0,"dat\voice\4_0324.ogg"`And Toshiki, too."@
br
dwave 0,"dat\voice\1_1095.ogg"`　"Hey, @
dwave 0,"dat\voice\1_1096.ogg"`Kagawa. @
dwave 0,"dat\voice\1_1097.ogg"`Hurry and do something about her."@
br
dwave 0,"dat\voice\4_0325.ogg"`　"Just let her cell phone ring and she'll come back."@
br
dwave 0,"dat\voice\1_1098.ogg"`　"I'm sorry to say that I don't have her number."@
br
dwave 0,"dat\voice\4_0326.ogg"`　"I see. @
dwave 0,"dat\voice\4_0327.ogg"`I'm in a hurry right now, so I'll do it later. @
br
dwave 0,"dat\voice\4_0328.ogg"`Just wait right there!"@
br
dwave 0,"dat\voice\1_1099.ogg"`　"He- hey! @
dwave 0,"dat\voice\1_1100.ogg"`You're still trying to get better! Is having a sudden live going to be okay?"@
br
change_cl "まみたん312笑顔"
dwave 0,"dat\voice\4_0329.ogg"`　"It's fine! @
dwave 0,"dat\voice\4_0330.ogg"`Because I love to sing!"\

change_d "全消去"
`　That had nothing to do with this, but off she went, disappearing before me.@
br
dwave 0,"dat\voice\1_1101.ogg"`　"Geez... this band... @
dwave 0,"dat\voice\1_1102.ogg"`they're all idiots."@
br
change_cc "しのりん242俯き"
`　For a long while, I looked at the frozen Shinoi.@
br
`　...with our relationship as it was now, she wouldn't mind what I did, right?\

`　I gently stroked her hair, and the moment I got close to her face...@
br
change_cc "しのりん244照れ"
dwave 0,"dat\voice\3_0304.ogg"`　"Um... Toshiki-san?"@
br
`　Her cell phone suddenly went off... wasn't the timing a bit TOO perfect?\

`　I looked around right away and saw two idiot faces sticking out in the hallway.@
br
dwave 0,"dat\voice\1_1103.ogg"`　"You guys!"@
br
change_cl "うに412にしし"
dwave 0,"dat\voice\5_0437.ogg"`　"So you two ARE like that. @
dwave 0,"dat\voice\5_0438.ogg"`Yup yup. @
dwave 0,"dat\voice\5_0439.ogg"`It's great to be young."@
br
change_cr "まみたん312笑顔"
dwave 0,"dat\voice\4_0331.ogg"`　"But it's rude to attack a girl while she's unconscious!"@
br
change_cc "しのりん243うわわ"
dwave 0,"dat\voice\3_0305.ogg"`　"Um... um..."@
br
`　Shinoi began to understand the situation bit by bit and turned red.\

change_cl "うに411通常"
dwave 0,"dat\voice\5_0440.ogg"`　"Whoa. @
dwave 0,"dat\voice\5_0441.ogg"`Look, it's almost time. @
dwave 0,"dat\voice\5_0442.ogg"`Araki's waiting there all lonely by himself."@
br
`　Even til the very end, that weak-presenced guy was all alone...@
br
change_cr "まみたん311通常"
dwave 0,"dat\voice\4_0332.ogg"`　"Well, let's go. @
dwave 0,"dat\voice\4_0333.ogg"`Let's have our best performance ever!"@
br
change_cc "しのりん233笑顔"
dwave 0,"dat\voice\3_0306.ogg"`　"Yes!"\

dwave 0,"dat\voice\1_1104.ogg"`　"Ah, Shinoi, can you play without your glasses?"@
br
change_cc "しのりん234目閉じ"
dwave 0,"dat\voice\3_0307.ogg"`　"Um... maybe."@
br
dwave 0,"dat\voice\1_1105.ogg"`　"Hey, are you going to be okay?"@
br
dwave 0,"dat\voice\4_0334.ogg"`　"She'll be fine. @
dwave 0,"dat\voice\4_0335.ogg"`It's Shinorin."@
br
dwave 0,"dat\voice\1_1106.ogg"`　"I'm not too sure about that, coming from you."@
br
change_cl "うに412にしし"
dwave 0,"dat\voice\5_0443.ogg"`　"Alright, the finale of the festival! @
dwave 0,"dat\voice\5_0444.ogg"`Let's heat it up!"@
br
dwave 0,"dat\voice\9_0001.ogg"`　"Yeah!"\

gosub *windowoff
wait 2000
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000:lsp 511,":s/20,20,0;#FFFFFF`Ending 2: Shinoi Rin End",200,230:print 10,1000:click:csp 511:print 10,1000:wait 1000

if %101 = 0 mov %101,2	;しのりんクリアフラグ
if %101 = 1 mov %101,3	;おさげ・しのりんクリアフラグ


RESET

;ジュース投げゲーム


*Juice


`　Grasped in my hand was the juice I'd bought before coming here, but... Braidy was about ten meters away from me. @
br
`　If I threw it at a general angle and strength, it should be enough to reach her.@
br

`　Now what to do?\

isskip %117:csel "`Throw it normally",*nage101,"`Throw it jokingly",*nage102

*nage102

if %103 > 47999 gosub *windowon:isskip %117:csel "`Normal mode",*J_normal,"`Master mode",*J_master,"`God mode",*J_kami

if %102 < 47999 goto *J_normal
gosub *windowon
isskip %117:csel "`Normal mode",*J_normal,"`Master mode",*J_master


;--------------------------------
;　ノーマルモード
;--------------------------------

*J_normal
gosub *windowoff
saveoff
dwavestop 15:mov %22,0
itoa $0,%102
len %0,$0
if %0 = 0 mov $1,"00000 ":goto *hs
if %0 = 1 mov $1,"0000":add $1,$0:add $1," ":goto *hs
if %0 = 2 mov $1,"000":add $1,$0:add $1," ":goto *hs
if %0 = 3 mov $1,"00":add $1,$0:add $1," ":goto *hs
if %0 = 4 mov $1,"0":add $1,$0:add $1," ":goto *hs
if %0 = 5 mov $1,$0:add $1," ":goto *hs
*hs
lsp 202,":s/60,30,0;#6688FF$1",132,45
lsp 201,":a;dat\system\nage.jpg",0,0
bar 11,100,40,90,30,300,100,#AAAAAA
bar 12,100,70,421,0,30,100,#FFFFFF
print %110

mov %1,300
mov %2,0
btndown 1
btnwait %0
resettimer
*barloop1
gettimer %1
if %1 > 0 div %1,2
sub %1,300:mul %1,-1
bar 11,100,40,90,30,%1,100,#AAAAAA
print 1
isdown %0
wait 2
if %0 = 0 goto *endloop1
if %1>0 goto *barloop1

resettimer
*barloop2
gettimer %1
if %1 > 0 div %1,2
bar 11,100,40,90,30,%1,100,#AAAAAA
print 1
isdown %0
wait 2
if %0 = 0 goto *endloop1
if %1<300 goto *barloop2

*endloop1

btndown 1
btnwait %0
resettimer
*barloop3
gettimer %2
if %2 > 0 div %2,2
if %2>500 mov %2,500
bar 12,100,70,421,%2,30,100,#FFFFFF
print 1
isdown %0
wait 2
if %0 = 0 goto *endloop2
if %2<500 goto *barloop3

resettimer
*barloop4
gettimer %2
if %2 > 0 div %2,2
sub %2,500:mul %2,-1
bar 12,100,70,421,%2,30,100,#FFFFFF
print 1
isdown %0
wait 2
if %0 = 0 goto *endloop2
if %2>0 goto *barloop4

*endloop2

;スコア計算
sub %1,300:mul %1,-1
if %1 = 0 goto *score01
if %1 = 300 mov %1,0:goto *score01
;if %1 < 150 mov %1,%1 * 100 / 150 * %2:goto *score01
if %1 < 150 mul %1,10:div %1,15:mul %1,%2:goto *score01
;mov %1,%1 - 300 * -1 * 100 / 150 * %2:goto *score01
sub %1,300:mul %1,-1:mul %1,10:div %1,15:mul %1,%2:goto *score01

*score01





csp 201
csp 202
barclear
print %110
dwave 1,"dat\music\se\se15.wav":mov %22,15
saveon

gosub *windowon
mov %27,%1
if %27 > %102 mov %102,%27
if %27 < 8000 goto *score11
if %27 < 10000 goto *score12
if %27 < 12000 goto *score13
if %27 < 15000 goto *score14
if %27 < 18000 goto *score15
if %27 < 20000 goto *score16
if %27 < 48000 goto *score17
if %27 > 47999 goto *score18


*score11

dwave 0,"dat\voice\1_1000.ogg"
`　"Ack!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0609.ogg"
`　"Wah..."\

`　The juice fell from my hand and rolled away, @
`leaving a trail of amber liquid.@
br
mov %200,6
goto *juice_short
*juice_nya6
dwave 0,"dat\voice\1_2107.ogg"
`　"Sorry, sorry. @
dwave 0,"dat\voice\1_2108.ogg" `Just a sec, I'll go buy another one."\

gosub *windowoff
bg black,%110
wait 2000
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon
dwave 0,"dat\voice\1_2109.ogg"
`　"Here."@
br
`　After dashing down the stairs, I arrived back on the roof and wiped off the sweat dripping down my face. Time to try again.\

goto *Juiceend

*score12

dwave 0,"dat\voice\1_1110.ogg"
`　"Here we go."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0610.ogg"
`　"Waah!"\
change_b "ＣＧ０２＿２"
`　Ooh! @
br
`　When Braidy jumped to catch the juice, her skirt fluttered. @
br
`　The juice may have escaped, but it wasn't all bad- her skirt flew up, and I at last caught sight of the Holy Land of my fantasies.@
br
mov %200,5
goto *juice_short
*juice_nya5
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ121もー"
gosub *windowon

dwave 0,"dat\voice\1_1111.ogg"
`　"Nice catch."@
br
dwave 0,"dat\voice\2_0611.ogg"
`　"Jeez! @
dwave 0,"dat\voice\2_0612.ogg"
 `Don't throw it so suddenly like that!"\

 `　It was almost as if the price of the juice had been refunded.\

change_cc "おさげ111通常"

goto *Juiceend

*score13

dwave 0,"dat\voice\1_0265.ogg"
`　"Here, catch."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0137.ogg"
`　"Eek!"\

change_b "ＣＧ０２＿１"

`　I tossed her the orange juice that I'd bought before coming here. She reached out with both hands, but it bounced and looked like it was going to fall. "Wah wah wah!" she yelped, and her posture made her skirt flutter up suggestively. It only lasted for about three seconds, though. I concentrated with all my might and caught a small glimpse of pure white sacredness.\

`　―Too bad. I didn't get the chance to admire for long. That was what one can of juice bought me.@
br
mov %200,4
goto *juice_short
*juice_nya4
dwave 0,"dat\voice\1_0266.ogg"`　"Next time I'll throw it more toward the side."@
br
`　I learned.\

gosub *windowoff
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend


*score14

dwave 0,"dat\voice\1_0265.ogg"
`　"Here, catch."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0613.ogg"
`　"Wha?"@
br
`　Although caught off-guard, she caught it easily. She had nice control, if I do say so myself.@
br
mov %200,0
goto *juice_short

*score15

dwave 0,"dat\voice\1_1112.ogg"
`　"Hya!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0614.ogg"
`　"Mew?!"\

change_b "ＣＧ０２＿３"

`　With a weird little yelp, she reached out, but it was a bit too high for her. Her top flew up, and between her top and her skirt, a view of miraculous, perfect territory was burned into my sight.@
br
mov %200,2
goto *juice_short
*juice_nya2
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ121もー"
gosub *windowon

dwave 0,"dat\voice\2_0615.ogg"
`　"Don't surprise me like that!"@
br
dwave 0,"dat\voice\1_1113.ogg"
`　"Sorry, sorry. @
dwave 0,"dat\voice\1_1114.ogg"`I messed up.\
change_cc "おさげ111通常"

goto *Juiceend

*score16
dwave 0,"dat\voice\1_1115.ogg"
`　"Hyah!"@
br
dwave 0,"dat\voice\2_0616.ogg"
`　"Wah~!"\

change_b "ＣＧ０２＿４"

`　The juice flew past Braidy, and she jumped a little and made a magnificent catch.@
br
`　Both her top and her skirt flew up together.\

`　Ooooooh... where to look, where to look?@
br
mov %200,3
goto *juice_short
*juice_nya3
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ121もー"
gosub *windowon

dwave 0,"dat\voice\2_0617.ogg"`　"Geez! @
dwave 0,"dat\voice\2_0618.ogg"`Isn't that dangerous?!"@
br
dwave 0,"dat\voice\1_1116.ogg"`　"No, it was a fine play. @
dwave 0,"dat\voice\1_1117.ogg"`For various reasons."@
br
change_cc "おさげ111通常"
`　"?"@
br
dwave 0,"dat\voice\1_1118.ogg"`　"Certainly that catch just now was a double play. @
dwave 0,"dat\voice\1_1119.ogg"`As it is, they were both outs, huh?"@
br
dwave 0,"dat\voice\2_0619.ogg"`　"Umm... what are you talking about?"@
br
dwave 0,"dat\voice\1_1120.ogg"`　"Nothing important. @
dwave 0,"dat\voice\1_1121.ogg"`Don't worry about it."\

goto *Juiceend

*score17

dwave 0,"dat\voice\1_1122.ogg"
`　"Hyaaaaaahhhhh!!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0620.ogg"
`　"Waaah?!"\

`　I threw the can as hard as I could.@
br
`　It flew through the air with a "pyuuu!" sound.\

`　Braidy searched the sky, but it was completely out of sight.@
br
mov %200,1
goto *juice_short
*juice_nya1
dwave 0,"dat\voice\1_1123.ogg"`　"Sorry, sorry. @
dwave 0,"dat\voice\1_1124.ogg"`That was way too hard for you. @
dwave 0,"dat\voice\1_1125.ogg"`Just a sec, I'll go buy another one."\

gosub *windowoff
bg black,%110
wait 2000
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon
dwave 0,"dat\voice\1_2109.ogg"
`　"Here."@
br
`　After dashing down the stairs, I arrived back on the roof and wiped off the sweat dripping down my face. Time to try again.\

goto *Juiceend

*score18

dwave 0,"dat\voice\1_1126.ogg" 
`　"Watch this!"\
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0621.ogg"
`　"Huh?! @
dwave 0,"dat\voice\2_0622.ogg"
 `Watch what?!"\

 `　Right before my eyes, a beam of light burst across the sky.@
 br
 `　I aimed at the glittering beam of light, and threw the can as hard as I could!@
br
dwave 0,"dat\voice\1_1127.ogg"
`　"Hiyaaaaaaaaahhhhhh!!"@
br
dwave 0,"dat\voice\2_0623.ogg"
`　"Ack?!"\

change_b "ＣＧ０２＿５"

`　"..."@
br
dwave 0,"dat\voice\2_0624.ogg"
`　"...whew.@
dwave 0,"dat\voice\2_0625.ogg" ` Got it."@
br
`　Even though I'd thrown as hard as I could, Braidy reacted beautifully and caught it.\

`　...although this wasn't the time to be surprised about that.@
br
`　Yes. Now was the time to journey on to the Holy Land of my fantasies.@
br
`　The Holy Land of my fantasies, stripes...@
br
dwave 0,"dat\voice\2_0626.ogg"`　"You really surprised me!"@
br
dwave 0,"dat\voice\1_1128.ogg"`　"No, I'm the one who's surprised!"@
br
mov %201,2
goto *juice_long
*juicelong_nya2
gosub *windowoff
bg black,%110
wait 2000
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend


;--------------------------------
;　マスターモード
;--------------------------------

*J_master
gosub *windowoff
saveoff
dwavestop 15:mov %22,0
itoa $0,%103
len %0,$0
if %0 = 0 mov $1,"00000 ":goto *m_hs
if %0 = 1 mov $1,"0000":add $1,$0:add $1," ":goto *m_hs
if %0 = 2 mov $1,"000":add $1,$0:add $1," ":goto *m_hs
if %0 = 3 mov $1,"00":add $1,$0:add $1," ":goto *m_hs
if %0 = 4 mov $1,"0":add $1,$0:add $1," ":goto *m_hs
if %0 = 5 mov $1,$0:add $1," ":goto *m_hs
*m_hs
lsp 202,":s/60,30,0;#FF8866$1",132,45
lsp 201,":a;dat\system\nage.jpg",0,0
bar 11,100,40,90,30,300,100,#AAAAAA
bar 12,100,70,421,0,30,100,#FFFFFF
print %110

mov %1,300
mov %2,0
btndown 1
btnwait %0
resettimer
*m_barloop1
gettimer %1
sub %1,300:mul %1,-1
bar 11,100,40,90,30,%1,100,#AAAAAA
print 1
isdown %0
wait 1
if %0 = 0 goto *m_endloop1
if %1>0 goto *m_barloop1

resettimer
*m_barloop2
gettimer %1
bar 11,100,40,90,30,%1,100,#AAAAAA
print 1
isdown %0
wait 1
if %0 = 0 goto *m_endloop1
if %1<300 goto *m_barloop2

*m_endloop1

btndown 1
btnwait %0
resettimer
*m_barloop3
gettimer %2
if %2>500 mov %2,500
bar 12,100,70,421,%2,30,100,#FFFFFF
print 1
isdown %0
wait 1
if %0 = 0 goto *m_endloop2
if %2<500 goto *m_barloop3

resettimer
*m_barloop4
gettimer %2
sub %2,500:mul %2,-1
bar 12,100,70,421,%2,30,100,#FFFFFF
print 1
isdown %0
wait 1
if %0 = 0 goto *m_endloop2
if %2>0 goto *m_barloop4

*m_endloop2

;スコア計算
sub %1,300:mul %1,-1
if %1 = 0 goto *m_score01
if %1 = 300 mov %1,0:goto *m_score01
if %1 < 150 mul %1,10:div %1,15:mul %1,%2:goto *m_score01
sub %1,300:mul %1,-1:mul %1,10:div %1,15:mul %1,%2:goto *m_score01

*m_score01

csp 201
csp 202
barclear
print %110
dwaveloop 1,"dat\music\se\se15.wav":mov %22,15
saveon
gosub *windowon
mov %27,%1
if %27 > %103 mov %103,%27
if %27 < 8000 goto *score11
if %27 < 10000 goto *score12
if %27 < 12000 goto *score13
if %27 < 15000 goto *score14
if %27 < 18000 goto *score15
if %27 < 20000 goto *score16
if %27 < 48000 goto *score17
if %27 > 47999 goto *score19

*score19

dwave 0,"dat\voice\1_1126.ogg" 
`　"Watch this!"\
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0621.ogg"
`　"Huh?! @
dwave 0,"dat\voice\2_0622.ogg"
`Watch what?!"\

`　Right before my eyes, a beam of light burst across the sky.@
br
`　I aimed at the glittering beam of light, and threw the can as hard as I could!@
br
dwave 0,"dat\voice\1_1127.ogg"
`　"Hiyaaaaaaaaahhhhhh!!"@
br
dwave 0,"dat\voice\2_0623.ogg"
`　"Ack?!"\

change_b "ＣＧ０２＿６"

`　"..."@
br
dwave 0,"dat\voice\2_0624.ogg"
`　"...whew.@
dwave 0,"dat\voice\2_0625.ogg" ` Got it."@
br
`　Even though I'd thrown as hard as I could, Braidy reacted beautifully and caught it.\

`　...although this wasn't the time to be surprised about that.@
br
`　Yes. Now was the time to journey on to the Holy Land of my fantasies.@
br
dwave 0,"dat\voice\2_0626.ogg"`　"You really surprised me!"@
br
dwave 0,"dat\voice\1_1128.ogg"`　"No, I'm the one who's surprised!"@
br
mov %201,3
goto *juice_long
*juicelong_nya3
gosub *windowoff
bg black,%110
wait 2000
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend


;--------------------------------
;　神モード
;--------------------------------

*J_kami
gosub *windowoff
saveoff
dwavestop 15:mov %22,0
itoa $0,%105
len %0,$0
if %0 = 0 mov $1,"00000 ":goto *k_hs
if %0 = 1 mov $1,"0000":add $1,$0:add $1," ":goto *k_hs
if %0 = 2 mov $1,"000":add $1,$0:add $1," ":goto *k_hs
if %0 = 3 mov $1,"00":add $1,$0:add $1," ":goto *k_hs
if %0 = 4 mov $1,"0":add $1,$0:add $1," ":goto *k_hs
if %0 = 5 mov $1,$0:add $1," ":goto *k_hs
*k_hs
lsp 202,":s/60,30,0;#FFFFFF$1",132,45
lsp 201,":a;dat\system\nage.jpg",0,0
bar 11,100,40,90,30,300,100,#AAAAAA
bar 12,100,70,421,0,30,100,#FFFFFF
print %110

mov %1,300
mov %2,0
btndown 1
btnwait %0
resettimer
*k_barloop1
gettimer %1
add %1,%1
sub %1,300:mul %1,-1
bar 11,100,40,90,30,%1,100,#AAAAAA
print 1
isdown %0
wait 1
if %0 = 0 goto *k_endloop1
if %1>0 goto *k_barloop1

resettimer
*k_barloop2
gettimer %1
add %1,%1
bar 11,100,40,90,30,%1,100,#AAAAAA
print 1
isdown %0
wait 1
if %0 = 0 goto *k_endloop1
if %1<300 goto *k_barloop2

*k_endloop1

btndown 1
btnwait %0
resettimer
*k_barloop3
gettimer %2
add %2,%2
if %2>500 mov %2,500
bar 12,100,70,421,%2,30,100,#FFFFFF
print 1
isdown %0
wait 1
if %0 = 0 goto *k_endloop2
if %2<500 goto *k_barloop3

resettimer
*k_barloop4
gettimer %2
add %2,%2
sub %2,500:mul %2,-1
bar 12,100,70,421,%2,30,100,#FFFFFF
print 1
isdown %0
wait 1
if %0 = 0 goto *k_endloop2
if %2>0 goto *k_barloop4

*k_endloop2
wait 200
;スコア計算
sub %1,300:mul %1,-1
if %1 = 0 goto *k_score01
if %1 = 300 mov %1,0:goto *k_score01
if %1 < 150 mul %1,10:div %1,15:mul %1,%2:goto *k_score01
sub %1,300:mul %1,-1:mul %1,10:div %1,15:mul %1,%2:goto *k_score01

*k_score01

csp 201
csp 202
barclear
print %110
dwaveloop 1,"dat\music\se\se15.wav":mov %22,15
saveon
gosub *windowon
mov %27,%1
if %27 > %105 mov %105,%27
if %27 < 8000 goto *score21
if %27 < 10000 goto *score22
if %27 < 12000 goto *score23
if %27 < 15000 goto *score24
if %27 < 18000 goto *score25
if %27 < 20000 goto *score26
if %27 < 48000 goto *score27
if %27 > 47999 goto *score28

*score21

dwave 0,"dat\voice\1_1000.ogg"
`　"Ack!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0609.ogg"
`　"Wah..."\
mov %200,0
goto *juice_short

*score22

dwave 0,"dat\voice\1_1110.ogg"
`　"Here we go."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0610.ogg"
`　"Waah!"\
change_b "ＣＧ０２＿２"
mov %200,12
goto *juice_short
*juice_nya12
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend

*score23

dwave 0,"dat\voice\1_0265.ogg"
`　"Here, catch."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0137.ogg"
`　"Eek!"\

change_b "ＣＧ０２＿１"
mov %200,13
goto *juice_short
*juice_nya13
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend


*score24

dwave 0,"dat\voice\1_0265.ogg"
`　"Here, catch."@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0613.ogg"
`　"Wha?"@
`　Although caught off-guard, she caught it easily. She had nice control, if I do say so myself.@
br
mov %200,0
goto *juice_short

*score25

dwave 0,"dat\voice\1_1112.ogg"
`　"Hya!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0614.ogg"
`　"Mew?!"\

change_b "ＣＧ０２＿３"
mov %200,14
goto *juice_short
*juice_nya14
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend

*score26
dwave 0,"dat\voice\1_1115.ogg"
`　"Hyah!"@
br
dwave 0,"dat\voice\2_0616.ogg"
`　"Wah!"\

change_b "ＣＧ０２＿４"
mov %200,15
goto *juice_short
*juice_nya15
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend

*score27

dwave 0,"dat\voice\1_1122.ogg"
`　"Hyaaaaaahhhhh!!"@
br
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0620.ogg"
`　"Wah?!"\
mov %200,16
goto *juice_short
*juice_nya16
gosub *windowoff
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend

*score28

dwave 0,"dat\voice\1_1126.ogg" 
`　"Watch this!"\
change_cc "おさげ114わ"
dwave 0,"dat\voice\2_0621.ogg"
`　"Huh?! @
dwave 0,"dat\voice\2_0622.ogg"
 `Watch what?!"\

 `　Right before my eyes, a beam of light burst across the sky.@
 br
 `　I aimed at the glittering beam of light, and threw the can as hard as I could!@
br
dwave 0,"dat\voice\1_1127.ogg"
`　"Hiyaaaaaaaaahhhhhh!!"@
br
dwave 0,"dat\voice\2_0623.ogg"
`　"Ack?!"\

change_b "ＣＧ０２＿５"
mov %201,4
goto *juice_short
*juicelong_nya4
gosub *windowoff
wait 2000
change_b "屋上昼"
change_cc "おさげ111通常"
gosub *windowon

goto *Juiceend

*juice_short
mov %28,%27
div %27,1000
; Here beginneth the Hacking of Doom.
; Frankly, it would have been simpler just to fix ONScripter to support this
; properly, but... well, it was a challenge. ^^
; Set up string padding (because otherwise integers get truncated sometimes).
itoa $7,%28:len %801,$7:mod %801,2
mov $5,"":mov $6,""
if %27<10 mov $5," "
if %801>0 mov $6," "
; Calculate current line number by reading the text position and adjusting for window position and font size.
getcursorpos %800,%800:sub %800,35:div %800,22
`　Basically, I threw it about 
locate 15,%800
%27$5
locate 16,%800
; Locate works on a zenkaku grid, so we sometimes need an extra space.
if %27>9 ` meters (to be precise,
if %27=1 `meter (to be precise,
if %27<>1 && %27<=9 `meters (to be precise,
%28$6 
; Calculate the position for the final text based on the length of the millimetre distance.
inc %800
len %801,$7:mov %802,%801:div %801,2:mod %802,2:add %801,%802
locate %801,%800
if %802>0 `millimeters).\
if %802=0 ` millimeters).\
; Here endeth the hacking, briefly.
if %200 = 1 goto *juice_nya1
if %200 = 2 goto *juice_nya2
if %200 = 3 goto *juice_nya3
if %200 = 4 goto *juice_nya4
if %200 = 5 goto *juice_nya5
if %200 = 6 goto *juice_nya6
if %200 = 12 goto *juice_nya12
if %200 = 13 goto *juice_nya13
if %200 = 14 goto *juice_nya14
if %200 = 15 goto *juice_nya15
if %200 = 16 goto *juice_nya16
if %200 = 0 goto *Juiceend

*juice_long
mov %28,%27
div %27,1000
; Similar to the above, but with different text.
itoa $7,%28:len %801,$7:mod %801,2
mov $5,"":mov $6,""
if %27<10 mov $5," "
if %801>0 mov $6," "
getcursorpos %800,%800:sub %800,35:div %800,22
`　Since she didn't catch it, I threw it about 
locate 23,%800
%27$5
locate 24,%800
if %27>9 ` meters
if %27=1 `meter
if %27<>1 && %27<=9 `meters
`(to be precise, 
inc %800
locate 8,%800
%28$6 
len %801,$7:mov %802,%801:div %801,2:mod %802,2:add %801,%802:add %801,8
locate %801,%800
if %802>0 `millimeters). Yeah, definitely.\
if %802=0 ` millimeters). Yeah, definitely.\
; Okay, it's safe to look now.
if %201 = 1 goto *juicelong_nya1
if %201 = 2 goto *juicelong_nya2
if %201 = 3 goto *juicelong_nya3
if %201 = 4 goto *juicelong_nya4
if %200 = 0 goto *Juiceend

;----------------------------------
;　CGモード
;----------------------------------
*cmode
mov %283
mov %286,1:bgm "dat\music\bgm\bgm03.mp3";	さわやか
mov %1,%201+%202+%203+%204+%205+%206+%207+%208+%209+%210+%211+%212+%213+%214+%215+%216+%217+%218+%219+%220+%221+%222+%223+%224+%225+%226+%227+%228+%229+%230
mul %1,100
div %1,30
itoa $1,%1
len %1,$1
if 1 = %1 mov $0,"00":add $1,"%":add $0,$1
if 2 = %1 mov $0,"0":add $1,"% ":add $0,$1
if 3 = %1 mov $0,"":add $1,"%":add $0,$1

*cg_01
;　１ページ目

btndef ""

csp -1

lsp 51,":s/50,30,0;#FFFFFF1/4 ",480,70
lsp 55,":s/50,30,0;#FFFFFF$0",470,150
lsp 52,":s/25,30,0;#CCCCCC#FFFFFF＞＞",497,235
lsp 53,":s/25,30,0;#CCCCCC#FFFFFF＜＜",497,320
lsp 54,":s/25,30,0;#CCCCCC#FFFFFFBack",497,405

lsp 101,":c;dat\cg\cdmode\cg_no.jpg",66,33
lsp 102,":c;dat\cg\cdmode\cg_no.jpg",66,148
lsp 103,":c;dat\cg\cdmode\cg_no.jpg",66,260
lsp 104,":c;dat\cg\cdmode\cg_no.jpg",66,373
lsp 105,":c;dat\cg\cdmode\cg_no.jpg",253,33
lsp 106,":c;dat\cg\cdmode\cg_no.jpg",253,148
lsp 107,":c;dat\cg\cdmode\cg_no.jpg",253,260
lsp 108,":c;dat\cg\cdmode\cg_no.jpg",253,373

lsph 1,":c;dat\cg\cdmode\1\cg01_1.jpg",66,33
lsph 2,":c;dat\cg\cdmode\1\cg01_2.jpg",66,148
lsph 3,":c;dat\cg\cdmode\1\cg02_1.jpg",66,260
lsph 4,":c;dat\cg\cdmode\1\cg02_2.jpg",66,373
lsph 5,":c;dat\cg\cdmode\1\cg02_3.jpg",253,33
lsph 6,":c;dat\cg\cdmode\1\cg02_4.jpg",253,148
lsph 7,":c;dat\cg\cdmode\1\cg02_5.jpg",253,260
lsph 8,":c;dat\cg\cdmode\1\cg02_6.jpg",253,373

exbtn_d "C1C2C3C4C5C6C7C8"

if %201 = 1 lsp 101,":c;dat\cg\cdmode\2\cg01_1.jpg",66,33:exbtn 1,1,"P1C2C3C4C5C6C7C8"
if %202 = 1 lsp 102,":c;dat\cg\cdmode\2\cg01_2.jpg",66,148:exbtn 2,2,"C1P2C3C4C5C6C7C8"
if %203 = 1 lsp 103,":c;dat\cg\cdmode\2\cg02_1.jpg",66,260:exbtn 3,3,"C1C2P3C4C5C6C7C8"
if %204 = 1 lsp 104,":c;dat\cg\cdmode\2\cg02_2.jpg",66,373:exbtn 4,4,"C1C2C3P4C5C6C7C8"
if %205 = 1 lsp 105,":c;dat\cg\cdmode\2\cg02_3.jpg",253,33:exbtn 5,5,"C1C2C3C4P5C6C7C8"
if %206 = 1 lsp 106,":c;dat\cg\cdmode\2\cg02_4.jpg",253,148:exbtn 6,6,"C1C2C3C4C5P6C7C8"
if %207 = 1 lsp 107,":c;dat\cg\cdmode\2\cg02_5.jpg",253,260:exbtn 7,7,"C1C2C3C4C5C6P7C8"
if %227 = 1 lsp 108,":c;dat\cg\cdmode\2\cg02_6.jpg",253,373:exbtn 8,8,"C1C2C3C4C5C6C7P8"
spbtn 52,52
spbtn 53,53
spbtn 54,54

bg "dat\cg\cdmode\cdmode.jpg",%110


*cg_loop_01

textbtnwait %0

if %0 = 1 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg01_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 2 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg01_2.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 3 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg02_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 4 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg02_2.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 5 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg02_3.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 6 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg02_4.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 7 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg02_5.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 8 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg02_6.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_01
if %0 = 52 dwave 1,"dat\music\se\se01.wav":goto *cg_02
if %0 = 53 dwave 1,"dat\music\se\se01.wav":goto *cg_04
if %0 = -1 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
if %0 = 54 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
;if %0 = -1 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET
;if %0 = 54 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET

goto *cg_loop_01


*cg_02
;　２ページ目

btndef ""

csp -1

lsp 51,":s/50,30,0;#FFFFFF2/4 ",480,70
lsp 55,":s/50,30,0;#FFFFFF$0",470,150
lsp 52,":s/25,30,0;#CCCCCC#FFFFFF＞＞",497,235
lsp 53,":s/25,30,0;#CCCCCC#FFFFFF＜＜",497,320
lsp 54,":s/25,30,0;#CCCCCC#FFFFFFBack",497,405

lsp 101,":c;dat\cg\cdmode\cg_no.jpg",66,33
lsp 102,":c;dat\cg\cdmode\cg_no.jpg",66,148
lsp 103,":c;dat\cg\cdmode\cg_no.jpg",66,260
lsp 104,":c;dat\cg\cdmode\cg_no.jpg",66,373
lsp 105,":c;dat\cg\cdmode\cg_no.jpg",253,33
lsp 106,":c;dat\cg\cdmode\cg_no.jpg",253,148
lsp 107,":c;dat\cg\cdmode\cg_no.jpg",253,260
lsp 108,":c;dat\cg\cdmode\cg_no.jpg",253,373

lsph 1,":c;dat\cg\cdmode\1\cg03_1.jpg",66,33
lsph 2,":c;dat\cg\cdmode\1\cg04_1.jpg",66,148
lsph 3,":c;dat\cg\cdmode\1\cg04_2.jpg",66,260
lsph 4,":c;dat\cg\cdmode\1\cg04_3.jpg",66,373
lsph 5,":c;dat\cg\cdmode\1\cg04_4.jpg",253,33
lsph 6,":c;dat\cg\cdmode\1\cg04_5.jpg",253,148
lsph 7,":c;dat\cg\cdmode\1\cg05_1.jpg",253,260
lsph 8,":c;dat\cg\cdmode\1\cg05_2.jpg",253,373

exbtn_d "C1C2C3C4C5C6C7C8"

if %208 = 1 lsp 101,":c;dat\cg\cdmode\2\cg03_1.jpg",66,33:exbtn 1,1,"P1C2C3C4C5C6C7C8"
if %209 = 1 lsp 102,":c;dat\cg\cdmode\2\cg04_1.jpg",66,148:exbtn 2,2,"C1P2C3C4C5C6C7C8"
if %210 = 1 lsp 103,":c;dat\cg\cdmode\2\cg04_2.jpg",66,260:exbtn 3,3,"C1C2P3C4C5C6C7C8"
if %211 = 1 lsp 104,":c;dat\cg\cdmode\2\cg04_3.jpg",66,373:exbtn 4,4,"C1C2C3P4C5C6C7C8"
if %212 = 1 lsp 105,":c;dat\cg\cdmode\2\cg04_4.jpg",253,33:exbtn 5,5,"C1C2C3C4P5C6C7C8"
if %213 = 1 lsp 106,":c;dat\cg\cdmode\2\cg04_5.jpg",253,148:exbtn 6,6,"C1C2C3C4C5P6C7C8"
if %214 = 1 lsp 107,":c;dat\cg\cdmode\2\cg05_1.jpg",253,260:exbtn 7,7,"C1C2C3C4C5C6P7C8"
if %215 = 1 lsp 108,":c;dat\cg\cdmode\2\cg05_2.jpg",253,373:exbtn 8,8,"C1C2C3C4C5C6C7P8"
spbtn 52,52
spbtn 53,53
spbtn 54,54

bg "dat\cg\cdmode\cdmode.jpg",%110


*cg_loop_02

textbtnwait %0

if %0 = 1 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg03_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = 2 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg04_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = 3 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg04_2.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = 4 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg04_3.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = 5 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg04_4.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = 6 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg04_5.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = 7 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg05_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = 8 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg05_2.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_02
if %0 = -1 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
;if %0 = -1 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET
if %0 = 52 dwave 1,"dat\music\se\se01.wav":goto *cg_03
if %0 = 53 dwave 1,"dat\music\se\se01.wav":goto *cg_01
if %0 = 54 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
;if %0 = 54 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET



goto *cg_loop_02


*cg_03
;　３ページ目

btndef ""

csp -1

lsp 51,":s/50,30,0;#FFFFFF3/4 ",480,70
lsp 55,":s/50,30,0;#FFFFFF$0",470,150
lsp 52,":s/25,30,0;#CCCCCC#FFFFFF＞＞",497,235
lsp 53,":s/25,30,0;#CCCCCC#FFFFFF＜＜",497,320
lsp 54,":s/25,30,0;#CCCCCC#FFFFFFBack",497,405

lsp 101,":c;dat\cg\cdmode\cg_no.jpg",66,33
lsp 102,":c;dat\cg\cdmode\cg_no.jpg",66,148
lsp 103,":c;dat\cg\cdmode\cg_no.jpg",66,260
lsp 104,":c;dat\cg\cdmode\cg_no.jpg",66,373
lsp 105,":c;dat\cg\cdmode\cg_no.jpg",253,33
lsp 106,":c;dat\cg\cdmode\cg_no.jpg",253,148
lsp 107,":c;dat\cg\cdmode\cg_no.jpg",253,260
lsp 108,":c;dat\cg\cdmode\cg_no.jpg",253,373

lsph 1,":c;dat\cg\cdmode\1\cg06_1.jpg",66,33
lsph 2,":c;dat\cg\cdmode\1\cg06_2.jpg",66,148
lsph 3,":c;dat\cg\cdmode\1\cg06_3.jpg",66,260
lsph 4,":c;dat\cg\cdmode\1\cg11_1.jpg",66,373
lsph 5,":c;dat\cg\cdmode\1\cg12_1.jpg",253,33
lsph 6,":c;dat\cg\cdmode\1\cg13_1.jpg",253,148
lsph 7,":c;dat\cg\cdmode\1\cg14_1.jpg",253,260
lsph 8,":c;dat\cg\cdmode\1\cg15_1.jpg",253,373

exbtn_d "C1C2C3C4C5C6C7C8"

if %230 = 1 lsp 101,":c;dat\cg\cdmode\2\cg06_1.jpg",66,33:exbtn 1,1,"P1C2C3C4C5C6C7C8"
if %228 = 1 lsp 102,":c;dat\cg\cdmode\2\cg06_2.jpg",66,148:exbtn 2,2,"C1P2C3C4C5C6C7C8"
if %229 = 1 lsp 103,":c;dat\cg\cdmode\2\cg06_3.jpg",66,260:exbtn 3,3,"C1C2P3C4C5C6C7C8"
if %216 = 1 lsp 104,":c;dat\cg\cdmode\2\cg11_1.jpg",66,373:exbtn 4,4,"C1C2C3P4C5C6C7C8"
if %217 = 1 lsp 105,":c;dat\cg\cdmode\2\cg12_1.jpg",253,33:exbtn 5,5,"C1C2C3C4P5C6C7C8"
if %218 = 1 lsp 106,":c;dat\cg\cdmode\2\cg13_1.jpg",253,148:exbtn 6,6,"C1C2C3C4C5P6C7C8"
if %219 = 1 lsp 107,":c;dat\cg\cdmode\2\cg14_1.jpg",253,260:exbtn 7,7,"C1C2C3C4C5C6P7C8"
if %220 = 1 lsp 108,":c;dat\cg\cdmode\2\cg15_1.jpg",253,373:exbtn 8,8,"C1C2C3C4C5C6C7P8"
spbtn 52,52
spbtn 53,53
spbtn 54,54

bg "dat\cg\cdmode\cdmode.jpg",%110


*cg_loop_03

textbtnwait %0

if %0 = 1 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg06_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = 2 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg06_2.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = 3 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg06_3.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = 4 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg11_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = 5 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg12_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = 6 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg13_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = 7 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg14_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = 8 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg15_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
if %0 = -1 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
;if %0 = -1 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET
if %0 = 52 dwave 1,"dat\music\se\se01.wav":goto *cg_04
if %0 = 53 dwave 1,"dat\music\se\se01.wav":goto *cg_02
if %0 = 54 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
;if %0 = 54 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET


goto *cg_loop_03


*cg_04
;　４ページ目

btndef ""

csp -1

lsp 51,":s/50,30,0;#FFFFFF4/4 ",480,70
lsp 55,":s/50,30,0;#FFFFFF$0",470,150
lsp 52,":s/25,30,0;#CCCCCC#FFFFFF＞＞",497,235
lsp 53,":s/25,30,0;#CCCCCC#FFFFFF＜＜",497,320
lsp 54,":s/25,30,0;#CCCCCC#FFFFFFBack",497,405

lsp 101,":c;dat\cg\cdmode\cg_no.jpg",66,33
lsp 102,":c;dat\cg\cdmode\cg_no.jpg",66,148
lsp 103,":c;dat\cg\cdmode\cg_no.jpg",66,260
lsp 104,":c;dat\cg\cdmode\cg_no.jpg",66,373
lsp 105,":c;dat\cg\cdmode\cg_no.jpg",253,33
lsp 106,":c;dat\cg\cdmode\cg_no.jpg",253,148
;lsp 107,":c;dat\cg\cdmode\cg_no.jpg",253,260
;lsp 108,":c;dat\cg\cdmode\cg_no.jpg",253,373

lsph 1,":c;dat\cg\cdmode\1\cg15_2.jpg",66,33
lsph 2,":c;dat\cg\cdmode\1\cg15_3.jpg",66,148
lsph 3,":c;dat\cg\cdmode\1\cg15_4.jpg",66,260
lsph 4,":c;dat\cg\cdmode\1\cg91_1.jpg",66,373
lsph 5,":c;dat\cg\cdmode\1\cg92_1.jpg",253,33
lsph 6,":c;dat\cg\cdmode\1\cg93_1.jpg",253,148
;lsph 7,":c;dat\cg\cdmode\1\cg15_4.jpg",253,260
;lsph 8,":c;dat\cg\cdmode\1\cg11_1.jpg",253,373

exbtn_d "C1C2C3C4C5C6"

if %221 = 1 lsp 101,":c;dat\cg\cdmode\2\cg15_2.jpg",66,33:exbtn 1,1,"P1C2C3C4C5C6"
if %222 = 1 lsp 102,":c;dat\cg\cdmode\2\cg15_3.jpg",66,148:exbtn 2,2,"C1P2C3C4C5C6"
if %223 = 1 lsp 103,":c;dat\cg\cdmode\2\cg15_4.jpg",66,260:exbtn 3,3,"C1C2P3C4C5C6"
if %224 = 1 lsp 104,":c;dat\cg\cdmode\2\cg91_1.jpg",66,373:exbtn 4,4,"C1C2C3P4C5C6"
if %225 = 1 lsp 105,":c;dat\cg\cdmode\2\cg92_1.jpg",253,33:exbtn 5,5,"C1C2C3C4P5C6"
if %226 = 1 lsp 106,":c;dat\cg\cdmode\2\cg93_1.jpg",253,148:exbtn 6,6,"C1C2C3C4C5P6"
;if %223 = 1 lsp 107,":c;dat\cg\cdmode\2\cg15_4.jpg",253,260:exbtn 7,7,"C1C2C3C4C5C6P7"
;if %208 = 1 lsp 108,":c;dat\cg\cdmode\2\cg11_1.jpg",253,373:exbtn 8,8,"C1C2C3C4C5C6C7"
spbtn 52,52
spbtn 53,53
spbtn 54,54

bg "dat\cg\cdmode\cdmode.jpg",%110


*cg_loop_04

textbtnwait %0

if %0 = 1 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg15_2.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_04
if %0 = 2 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg15_3.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_04
if %0 = 3 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg15_4.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_04
if %0 = 4 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg91_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_04
if %0 = 5 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg92_1.jpg",0,0:print 10,500:click:lsp 0,":c;dat\cg\cg92_2.jpg",0,0:print 13,3000:click:csp 0:print 10,500:goto *cg_loop_04
if %0 = 6 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg93_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_04
;if %0 = 7 dwave 1,"dat\music\se\se01.wav":lsp 0,":c;dat\cg\cg15_4.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
;if %0 = 8 lsp 0,":c;dat\cg\cg11_1.jpg",0,0:print 10,500:click:csp 0:print 10,500:goto *cg_loop_03
;if %0 = -1 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET
if %0 = -1 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
if %0 = 52 dwave 1,"dat\music\se\se01.wav":goto *cg_01
if %0 = 53 dwave 1,"dat\music\se\se01.wav":goto *cg_03
;if %0 = 54 dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET
if %0 = 54 dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset


goto *cg_loop_04


;----------------------------------
;　サウンドモード
;----------------------------------
*smode
bg "dat\bg\bg09_3.jpg",%110
	lsp 155,"dat\system\window.bmp",19,19,100

;	１　　　５　　　　10　　　　15　　　　20　22

lsp 105,":s/23,23,0;#CCCCCC#FFFFFF`Atmosphere",50,50
lsp 106,":s/23,23,0;#CCCCCC#FFFFFF`Blue Dress",50,95
lsp 107,":s/23,23,0;#CCCCCC#FFFFFF`She Takes Her Clothes Off",50,140
lsp 108,":s/23,23,0;#CCCCCC#FFFFFF`Good For My Soul",50,185
lsp 109,":s/23,23,0;#CCCCCC#FFFFFF`Summer",50,230
lsp 110,":s/23,23,0;#CCCCCC#FFFFFF`Signs of Rain",50,275
lsp 111,":s/23,23,0;#CCCCCC#FFFFFF`Dreams",370,50
lsp 112,":s/23,23,0;#CCCCCC#FFFFFF`Fearless",370,95
lsp 113,":s/23,23,0;#CCCCCC#FFFFFF`Sepia",370,140
lsp 114,":s/23,23,0;#CCCCCC#FFFFFF`Invisible Rainbow",370,185
lsp 115,":s/23,23,0;#CCCCCC#FFFFFF`A Dream of Summer",370,230
	lsp 123,":s/23,23,0;#CCCCCC#FFFFFF`Stop Playing",370,275

	lsp 116,":s/23,5,0;#EEEEEE―――――――――――――――――――――――――",30,320

	lsp 117,":s/25,25,0;#FFFFFF`Song : ",50,345
	lsp 118,":s/25,25,0;#FFFFFF`Composer : ",50,390
	lsp 125,":s/25,25,0;#CCCCCC#FFFFFF`Back",550,420

spbtn 105,105
spbtn 106,106
spbtn 107,107
spbtn 108,108
spbtn 109,109
spbtn 110,110
spbtn 111,111
spbtn 112,112
spbtn 113,113
spbtn 114,114
spbtn 115,115
spbtn 123,123
spbtn 125,125

print 11

*sd_loop

textbtnwait %0

	if %0 == 105 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm01.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Atmosphere",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Yoshihiro Ogawa",50,390:print 1;	おさげ
	if %0 == 106 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm02.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Blue Dress",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Yoshihiro Ogawa",50,390:print 1;	しのりん
	if %0 == 107 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm03.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : She Takes Her Clothes Off ",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Yoshihiro Ogawa",50,390:print 1;	さわやか
	if %0 == 108 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm04.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Good For My Soul",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Yoshihiro Ogawa",50,390:print 1;	がっこ
	if %0 == 109 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm05.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Summer",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Bill of Fare",50,390:print 1;	いんすと
	if %0 == 110 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm06.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Signs of Rain",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Bill of Fare",50,390:print 1;	おくじょ
	if %0 == 111 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm07.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Dreams",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Bill of Fare",50,390:print 1;	しっとり
	if %0 == 112 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm08.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Fearless",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Yoshihiro Ogawa",50,390:print 1;	かいそう
	if %0 == 113 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm09.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Sepia",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Bill of Fare",50,390:print 1;	かなしい
	if %0 == 114 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm10.mp3":lsp 117,":s/25,25,0;#FFFFFF`Song : Invisible Rainbow",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : Bill of Fare",50,390:print 1;	こくはく
	if %0 == 115 	dwave 1,"dat\music\se\se01.wav":bgm "dat\music\bgm\bgm11.mp3":lsp 117,":s/20,20,0;#FFFFFF`Song : A Dream of Summer------Vocals : Minase Erumo",50,345:lsp 118,":s/20,20,0;#FFFFFF`Composer : Bill of Fare------Lyrics : Nekono",50,390:print 1;	ひとなつ
	if %0 == 123 	dwave 1,"dat\music\se\se01.wav":stop:lsp 117,":s/25,25,0;#FFFFFF`Song : ",50,345:lsp 118,":s/25,25,0;#FFFFFF`Composer : ",50,390:print 1
	if %0 == 125 	dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset
	if %0 == -1 	dwave 1,"dat\music\se\se01.wav":gosub *windowoff:textoff:mp3fadeout 1000:bg black,0:print %110:wait 500:reset

;	if %0 == 125 	dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET
;	if %0 == -1 	dwave 1,"dat\music\se\se01.wav":allsphide:bg black,0:print %110:wait 500:RESET

goto *sd_loop
reset

;----------------------------------
;　あとがき
;----------------------------------
*atogaki

mov %29,1;	右クリックメニュー無効・右クリック時リセット確認
mov %284
mov %286,1:bgm "dat\music\bgm\bgm04.mp3";	がっこ
change_b "屋上夕過去"
gosub *windowon

`　Hello. This is Nekono.@
br
`　Thank you for playing 'A Dream of Summer'.\


`　Well, I think I should talk a bit about the original story.\


`　Whether you cried or laughed, that's Braidy's ending for you.@
br
`　In it, Braidy comes back in different forms, and there are probably some of you who want to see an ending where Braidy is still alive.\


`　It's not like I didn't think of an ending like that, but this time, I decided against it.@
br
`　Because one day I was watching the news, and it made me think.\


`　When asked, 'Is it possible to come back to life?' 15% of the grade school kids said 'yes'.@
br
`　So that means that in a class of forty, six believed that it is possible for a human being to come back to life.\


`　The idea of resurrection basically just makes the idea of confronting death a weak thing.@
br
`　And one reason for that weakening notion is the influence of the virtual world.\


`　Humans are adaptable creatures.@
br
`　Since they've been immersed in the virtual world longer and longer, humans are susceptible to the feelings there, even though they aren't real.@
br
`　So, for children who are not yet concrete in their thinking, these things are highly influential to them.\


`　In other words, common sense in the virtual world is corroding reality bit by bit. As a result, although unlikely, children being able to grasp reality will...\


`　But of course, the basis of influence isn't the virtual world.@
br
`　To begin with, are the parents and schools accurately teaching kids about the realities of death?@
br
`　Teaching it would probably be hard, but lots of schools teach sex education and other things that are even touchier, and things like this should be taught first.\


`　Saying it is simple. The virtual world is given the title of bad influence, but if education covered it, it wouldn't be such a big problem as it is now, relating to the problems of Japan today. Definitely.\


`　That means, opposing society and its way of thinking that humans can come back to life, I decided to keep my ending as is.@
br
`　By doing this, I pulled back from that scenario, even though I said this was a fantasy game.\


`　Well, whether or not my scenario would be highly influential (ahaha, yeah, sure), I'm sorry to those that wanted a happy-ever-after ending with Braidy.\


`　On a different subject, how was the can-toss game?@
br
`　I called it the 'Holy Land Game', but everyone around me just called it the 'Panty Game'.\


`　That's fine.@
br
`　Holy Land Game would've been more indirect and better!\


`　I will dignifiedly give all my support to the name of 'Holy Land Game'.\


`　The highest score is 50000, but I could never do it.@
br
`　Just for your information, my high score is 49302 in Master Mode.@
br
`　For those that don't know what Master Mode is, just do your best for now (haha).\


`　This production turned out to be something I selfishly devoted myself to.@
br
`　I would like to express my gratitude to everyone in the staff that supported my selfishness.\


`　Finally, I have plans to keep on doing things like this, but depending on my own job, I don't know how much time I'll have.@
br
`　Unlike before, I can't just take time off now that I have a stable job, so the pace of this will probably be much slower.@
br
`　Still, even if I do it slowly, if there's something I want to write, I'll write and make it, so if you feel like it, please take a look at my site.\


`　And that's it for this time.\



gosub *windowoff
bg black,10,3000
mp3fadeout 3000
stop
mp3fadeout 0
wait 1000


reset