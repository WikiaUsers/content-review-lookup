var tCafeInt2 = {nowmenu:{},allmenu:{},menufunc:{}};
//メニュー一覧
tCafeInt2.allmenu.list = {
    always:{name:"いつもの",desc:"普段販売しているメニュー。"},
    morning:{name:"朝メニュー",desc:"朝限定のメニュー。"},
    ofes:{name:"オブジェクトフェス",desc:"オブジェクトフェス開催中に注文できるメニュー。いつ開催されるか分からない！"},
    frenz:{name:"FRENZ",desc:"FRENZ放映中に注文できるメニュー。"},
};
tCafeInt2.allmenu.always = {
    dailybowl:{name:"日替わり丼",desc:"何が出るかは日付次第！そんな丼もの。"},
    _24Pafe:{name:"ぷよパフェ",desc:""},
    icetea:{name:"アイスティー",desc:"普通のアイスティー。レモンとミルクの追加ができる。"},
    icetealemon:{name:"アイスティー＋レモン",desc:"レモンを追加したアイスティー。"},
    iceteamilk:{name:"アイスティー＋ミルク",desc:"ミルクを追加したアイスティー。"},
    cup:{name:"いつものカップ",desc:"何もない時に提供されるシンプルなカップ。"}
};
tCafeInt2.allmenu.morning = {
    bpcake:{name:"ベーコンパンケーキ",desc:"ベーコンの乗ったパンケーキ。"},
    mspark:{name:"モーニング",desc:"朝限定の炭酸飲料。複数の種類があるが、アイスは乗っていない。"},
    msparkberry:{name:"モーニングスパークリング　タイプ：ベリー",desc:"いちごとぶどうがミックスされた朝限定の炭酸飲料。"},
    msparkmelon:{name:"モーニングスパークリング　タイプ：メロン",desc:"すいかとかぼちゃがミックスされた朝限定の炭酸飲料。"},
};
tCafeInt2.allmenu.ofes = {
    booksand:{name:"ブックサンド",desc:"本の形をしたサンドイッチ。"},
    mephone:{name:"MePhoneのクッキー＆ラテアート",desc:"ちょっとまずーいクッキーと、ラテアートのセット。クッキーをラテアートに浸すと・・・？"},
    facedcup:{name:"顔つきカップ",desc:"手描きの顔があるカップ。喋ったりはしない。"},
    cup:facedcup
};
tCafeInt2.allmenu.frenz = {
    frenzcocktail:{name:"FRENZカクテル",desc:"FRENZロゴをテーマにしたカクテル。"},
    frenzbeer:{name:"FRENZビール",desc:"FRENZカクテルがワインに対してこちらはビール。"},
    videobowl:{name:"映像丼",desc:"普段は日替わり丼として提供されているけど、FRENZ中は『映像丼』として営業されるよ！"},
    frenzcup:{name:"FRENZカップ",desc:"FRENZロゴの描かれたカップをトレース出力したもの。"},
    dailybowl:videobowl,
    cup:frenzcup
};
//メニューセット用ファンクション
tCafeInt2.menufunc.zukan = function(menu){
    tCafeInt.nowmenu = menu;
};
tCafeInt2.menufunc.now = function(orderdate){
    tCafeInt.nowmenu = tCafeInt.allmenu.always;
    switch( orderdate ) {
    case 'm':
        tCafeInt.nowmenu = add(tCafeInt.nowmenu,tCafeInt.allmenu.morning);
        break;
    case 'mofes':
        tCafeInt.nowmenu = add(tCafeInt.nowmenu,tCafeInt.allmenu.morning);
        tCafeInt.nowmenu = add(tCafeInt.nowmenu,tCafeInt.allmenu.ofes);
        break;
    case 'ofes':
        tCafeInt.nowmenu = add(tCafeInt.nowmenu,tCafeInt.allmenu.ofes);
        break;
    case 'mfrenz':
        tCafeInt.nowmenu = add(tCafeInt.nowmenu,tCafeInt.allmenu.morning);
        tCafeInt.nowmenu = add(tCafeInt.nowmenu,tCafeInt.allmenu.frenz);
        break;
    case 'frenz':
        tCafeInt.nowmenu = add(tCafeInt.nowmenu,tCafeInt.allmenu.frenz);
        break;
    }
};
tCafeInt2.menufunc.add = function(now,add){
    for(var key in add){
        now[key] = add[key];
    }
    return now;
};