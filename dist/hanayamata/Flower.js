// ウィンドウリサイズ時にウィンドウ情報を変更
$(window).on('resize', function (){
	w_width = $("#container").width();
	w_height = $("#container").height() + 20;

	$(".innerFlower").css({ 
		width: w_width,
		height : w_height
	})

})

// 移動量
var moveX = new Array();
var moveY = new Array();
var moveYold = new Array();

// 座標
var posX = new Array();
var posY = new Array();

// 移動角度
var angl = new Array();
var moveAngl = new Array();

// 移動の半径
var r = new Array();

// 重力
var gravity = new Array();
var DEFAULT_GRAVITY = 0.4;
var POW_GRAVITY = 0.05;

// 横風
var wind = new Array();
var DEFAULT_WIND = 1;
var POW_WIND = 1.5;

// 各レイヤーごとの花びらの枚数
var NUM_FLOWER_SMALL = 10;
var NUM_FLOWER_MIDDLE = 10;
var NUM_FLOWER_BIG = 10;

var SIZE_FLOWER_SMALL = 26;
var SIZE_FLOWER_MIDDLE = 32;
var SIZE_FLOWER_BIG = 40;

// 花びらの総数(全レイヤー合計)
var MAX_FLOWER = NUM_FLOWER_SMALL + NUM_FLOWER_MIDDLE + NUM_FLOWER_BIG;

// ウィンドウサイズ
var w_width;
var w_height;

// 花びらの初期化
function InitFlower() {
    for (var i = 0; i < MAX_FLOWER; i++) {
        moveX[i] = 0;

		// 画面内にランダムに配置
        SetFlower(i);
		gravity[i] = DEFAULT_GRAVITY;
		wind[i] = DEFAULT_WIND;
		
		angl[i] = 0;

		// レイヤー1
		if(i < NUM_FLOWER_SMALL) { 
			// レイヤー毎の値を設定
			InitFlowerlayer(i, 290, 0.2, 2, SIZE_FLOWER_SMALL, SIZE_FLOWER_SMALL);

			// 花びらの背景を指定
			$(".flower" + i).css({
				'background-image': 'http://hanayamata.com/assets/images/top/flower_anime.png'
			})
		}

		// レイヤー2
		else if((i >= NUM_FLOWER_SMALL) && (i < NUM_FLOWER_SMALL + NUM_FLOWER_MIDDLE)) {

			// レイヤー毎の値を設定
			InitFlowerlayer(i, 270, 0.18, 1.8, SIZE_FLOWER_MIDDLE, SIZE_FLOWER_MIDDLE);

			// 花びらの背景を指定
			$(".flower" + i).css({
				'background-image': 'http://hanayamata.com/assets/images/top/flower_anime2.png'
			})
		}

		// レイヤー3
		else if((i >= NUM_FLOWER_SMALL + NUM_FLOWER_MIDDLE) && 
			(i < NUM_FLOWER_SMALL + NUM_FLOWER_MIDDLE + NUM_FLOWER_BIG)) {

			// レイヤー毎の値を設定
			InitFlowerlayer(i, 250, 0.16, 1.6, SIZE_FLOWER_BIG, SIZE_FLOWER_BIG);

			// 花びらの背景を指定
			$(".flower" + i).css({
				'background-image': 'http://hanayamata.com/assets/images/top/flower_anime.png'
			})
		}
    }
}

// レイヤー毎の値設定
// 引数 : インデックス番号, 移動半径 , 移動速度, 落下速度, 幅, 高さ
function InitFlowerlayer(id, rasius, angle, mvY, width, height) {
	$("#top .innerFlower").append("<div class='flower" + id + "'></div>");

	// 移動半径を設定
	r[id] = rasius;

	// 落下速度
	moveY[id] = mvY;
	moveYold[id] = moveY[id];
	
	// X軸の移動速度
    moveAngl[id] = (Math.random() * angle) + 0.35;

	// 花びらのサイズを指定
	$(".flower" + id).css({
		width: width,
		height: height,
		backgroundSize: "100% auto"
	})
}

// 花びらの移動処理
function updateFlower() {
    for (var i = 0; i < MAX_FLOWER; i++) {

		// 重力を加算
		gravity[i] -= POW_GRAVITY;
		if(gravity[i] <= 0.1) gravity[i] = 0.1;

		// 横風を強く
		wind[i] += POW_WIND;

		// 移動量を計算
        moveX[i] = r[i] * Math.sin(angl[i] / 180 * Math.PI);
        posY[i] += moveY[i] + gravity[i];
        angl[i] = (angl[i] + moveAngl[i]) % 360;

		// anglの値を実数で取得
		var check_angl = parseInt(angl[i]);

		// 花びらが左側の最大まで移動したら
		if(check_angl == 270) {

			// 重力を加算した移動量を初期化
			moveY[i] = moveYold[i];

			// 重力を初期化
			gravity[i] = DEFAULT_GRAVITY;
		}
		// 花びらが右側の最大まで移動したら
		else if(check_angl == 90) {

			// 重力を加算した移動量を初期化
			moveY[i] = moveYold[i];

			// 重力を初期化
			gravity[i] = DEFAULT_GRAVITY;
		}

		// 花びらの移動を反映
        $(".flower" + i).css({
            left: posX[i] + moveX[i] + wind[i],
            top: posY[i]
        })

        // 画面下部まで移動したら最上部に移動
        if((posY[i] > w_height) || (posX[i] > w_width)) {
            SetFlower(i);

			// 横風の強さを初期化
			wind[i] = DEFAULT_WIND;
        }
    }
}

// 花びらの再配置
function SetFlower(id) {
	posX[id] = (Math.random() * w_width / 3) - 400;
    posY[id] = (Math.random() * -w_height) + 150;
}