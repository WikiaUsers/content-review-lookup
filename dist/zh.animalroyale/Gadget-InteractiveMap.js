			//奇克製作
			//20200503 版
			//配合遊戲版本 v0.94.0
			//前置語言判斷
			var Language_Index = 0;
			var Language_List = ["zh","zh-cn","zh-tw","en","zh-hk"];
			var Head_list = ["超級動物世界","超级动物世界","Super_Animal_World"];
			var Head_Index = 0;
			Language_Index = Language_List.indexOf(mw.config.get("wgPageContentLanguage"));
			Head_Index = Head_list.indexOf(document.getElementById("firstHeading").innerText);
			if (Head_Index == -1 && Language_Index == -1){Language_Index = 3;}
			if (Head_Index == 2 && Language_Index == -1){Language_Index = 3;}
			if (Head_Index == 0 && Language_Index == -1){Language_Index = 2;}
			if (Head_Index == 1 && Language_Index == -1){Language_Index = 0;}
			//全域屬性宣告
			var flag = 0;
			var flag2 = 0;
			
			if(Head_Index != -1)firstload();
			
			function firstload(){
					//宣告背景地圖,地圖資訊格,清除格式
				var frame1 = document.createElement("div");		//框架
				var gbmap = document.createElement("div");		//背景地圖
				var right = document.createElement("div");		//右方格子
				var maptitle = document.createElement("div");	//地圖標題
				var space = document.createElement("div");		//地圖空格
				var outmapinfo = document.createElement("div");	//外地圖資訊
				var mapinfo = document.createElement("div");	//地圖資訊
				var title = document.createElement("span");		//標題替換
				var info = document.createElement("span");		//資訊替換
				var cleardiv = document.createElement("div");	//清除格式
					//加入整體框架
				document.getElementById("mw-content-text").appendChild(frame1);
				frame1.id="frame1";
				frame1.style.width="1175px";
				frame1.style.height="700px";
				frame1.style.border="4px #888888 solid";
				frame1.style.borderRadius="5px";
				frame1.align="center";
					//加入背景地圖,地圖資訊格,清除格式
				document.getElementById("frame1").appendChild(gbmap);
				document.getElementById("frame1").appendChild(right);
				right.appendChild(maptitle);
				right.appendChild(space);
				right.appendChild(outmapinfo);
				outmapinfo.appendChild(mapinfo);
				document.getElementById("frame1").appendChild(cleardiv);
				maptitle.appendChild(title);
				mapinfo.appendChild(info);
					//背景地圖屬性
				gbmap.id="wolfy";
				gbmap.style.position="relative";
				gbmap.style.width="700px";
				gbmap.style.height="700px";
				gbmap.style.backgroundImage="url('https://gamepedia.cursecdn.com/animalroyale_gamepedia_en/8/8a/SmallMap.jpg?version=75c125758ee981fa36de28e0ca21069c')";
				gbmap.style.backgroundSize="700px 700px";
				gbmap.style.zIndex="1";
				gbmap.style.float="left";
					//右方格屬性
				right.id="right";
				right.style.width="475px";
				right.style.height="700px";
				right.style.backgroundImage="url('https://gamepedia.cursecdn.com/animalroyale_gamepedia_en/5/5b/Poster.jpg')";
				right.style.backgroundSize="475px 700px";
				right.style.float="left";
				right.style.opacity="0.9";
				right.align="center";
					//地圖標題格屬性
				maptitle.id="maptitle";
				maptitle.style.width="370px";
				maptitle.style.height="100px";
				maptitle.style.display="none";
				maptitle.style.lineHeight="100px";
				maptitle.style.backgroundColor="#eeeeee";
				maptitle.style.opacity="0.95";
				maptitle.style.borderRadius="10px";
				maptitle.align="center";
					//地圖空格屬性
				space.id="space";
				space.style.width="350px";
				space.style.height="100px";
					//外地圖資訊格屬性
				outmapinfo.id="outmapinfo";
				outmapinfo.style.width="350px";
				outmapinfo.style.height="440px";
				outmapinfo.style.display="none";
				outmapinfo.style.lineHeight="330px";
				outmapinfo.style.backgroundColor="#eeeeee";
				outmapinfo.style.opacity="0.95";
				outmapinfo.style.borderRadius="10px";
				outmapinfo.align="center";
					//地圖資訊格屬性
				mapinfo.id="mapinfo";
				mapinfo.style.width="330px";
				mapinfo.style.height="440px";
				mapinfo.style.display="none";
				mapinfo.style.lineHeight="23px";
				mapinfo.align="left";
				mapinfo.padding="50px";
				mapinfo.style.overflow="scroll";
					//標題替換屬性
				title.id="title";
					//資訊替換屬性
				info.id="info";
					//清除格式屬性
				cleardiv.style.clear="both";
				
				pointinput();
			}
			function pointinput(){
					//加入css樣式表
				var str = '.point {border:1px #ffffff solid;width:25px;height:25px;position:absolute;z-index:999;background-color:blue;margin:0px;border-radius:50%;opacity:0.8;} .textset{color:#000000;} .titleset{font-size:30px;color:#000000;}';
				var style = document.createElement("style");
				document.getElementsByTagName('head')[0].appendChild(style);
				
				if(document.all) { // IE
					style.styleSheet.cssText = str;
					return;
				}
	
					// Firefox, Google Chrome
				style.textContent = str;
						
				
				//加入圖標和屬性

				var map_point = ["pointSAWBR",   	//竹林度假村
								"pointSAWRL",		//實驗室
								"pointSM",			//紫晶山
								"pointSPP",			//企鵝宮殿
								"pointSAF",			//動物農場
								"pointGEL",			//鷹臨之地
								"pointPS",			//Pete 的沼澤
								"pointSAWWC",		//S.A.W. 迎賓中心
								"pointSAWV",		//S.A.W. 別墅區
								"pointGW",			//金木森林
								"pointSAWS",		//S.A.W. 船廠
								"pointSS",			//超级撒哈拉沙漠
								"pointTT",			//Thomas 的苔原
								"pointSP",			//超級金字塔
								"pointGER"			//鴯鶓牧場
								];			
												
				var pointx = [54.4,59,25,45,58,23,45,10,26,75,88,12,57,27,38];  //left
				var pointy = [55,32,28,14,70,70,77,85,60,81,63,40,11,39,41];	  //top
				var map_point_length = map_point.length;
				var str1;
				
				
				for (i=0;i < map_point_length; i++){
					str1 = document.createElement("div");
					document.getElementById("wolfy").appendChild(str1);
					str1.id="p-"+i;
					str1.classList.add("point");
					str1.style.top=pointy[i]+"%";
					str1.style.left=pointx[i]+"%";
					str1.onmouseover=pointchange1;
					str1.onmouseout=pointchange2;
					str1.onclick=pointchange3;			
				}

			}
			function pointchange4(x){
				if (flag == 1){
					document.getElementById(flag2).style.backgroundColor="blue";
					}
				flag2 = x;
				flag = 0;
				document.getElementById(x).style.backgroundColor="red";
				document.getElementById("maptitle").style.display="block";
				document.getElementById("outmapinfo").style.display="block";
				document.getElementById("mapinfo").style.display="block";
				var y = x.substr(2);
				switch (Language_Index){
					case 0: //zh
						switch (y) {
							case "0":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 竹林度假村</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E7%AB%B9%E6%9E%97%E5%BA%A6%E5%81%87%E6%9D%91'> S.A.W. 竹林度假村</a></font><br>中国主题的竹林度假村位于岛上中央，提供按摩、卫浴、餐饮等服务。度假村附近生长着大量密集的竹林，是很好的躲藏和埋伏地点。</p>";
								return
							case "1":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 实验室</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E5%AE%9E%E9%AA%8C%E5%AE%A4'> S.A.W. 实验室</a></font><br><b>实验室</b>曾经是岛上用来培育和研究超级动物的地方，由收容区、研究栋和培育所组成。物资密集的放置在实验室内，但建筑内大量的狭窄通道和房间使得探索时要特别警戒附近的敌人并随时注意退路。</p>";
								return
							case "2":
								document.getElementById("title").innerHTML="<p class='titleset'>超级紫晶山</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超级紫晶山</b>是位于岛上西北方的矿场。矿山靠海的一端有着大量的紫色晶体矿物，目前无从得知这些晶体的实际用途。矿山内部有着狭小的通道、监狱般的石窟及少部分开放空间组成。</p>";
								return
							case "3":
								document.getElementById("title").innerHTML="<p class='titleset'>企鹅宫殿</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>无资料</font></p>";
								return
							case "4":
								document.getElementById("title").innerHTML="<p class='titleset'>超级动物农场</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超级动物农场</b>位于 Pete 的沼泽的右上方，由谷仓、超级牛奶吧和周边的小木屋组成。超级动物农场的装备主要集中在农场正中央的谷仓和谷仓下方的超级牛奶吧。超级动物农场拥有许多小木屋，使得这里是甩开敌人的好地方。</p>";
								return
							case "5":
								document.getElementById("title").innerHTML="<p class='titleset'>鹰临</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/%E9%B9%B0%E4%B8%B4'> 鹰临</a></font><br><b>鹰临</b>鹰临是岛上的鸟类主题区域，提供餐饮和歌舞表演等娱乐活动。鹰临被此地特有的樱花树包围，加上三种独特结构的建筑物和中央的广场组成。</p>";
								return
							case "6":
								document.getElementById("title").innerHTML="<p class='titleset'>Pete 的沼泽</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/Pete_%E7%9A%84%E6%B2%BC%E6%B3%BD'> Pete 的沼泽</a></font><br><b>Pete 的沼泽</b>是个在迎宾中心东方的小型区域。正如同名字所言，是一座沼泽。此地区被分割为较小的北方区域与较大的南方区域。整个沼泽所铺设的木桥道路布满了许多物品。只有少数的遮蔽物和狭窄的木桥道路使火拼发生时将难以躲避子弹，但是桥上布满的物品使他成为开局时收集武器与装甲的主要地点之一。</p>";
								return
							case "7":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 迎宾中心</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E8%BF%8E%E8%B3%93%E4%B8%AD%E5%BF%83"> S.A.W. 迎宾中心</a></font><br>这里是岛上主要的入口，并且也是巨鹰的登鹰点。玩家会生成在这个如同游戏前大厅的地区。这地方有着商店、餐厅与咖啡馆的废墟。在中心有个被树丛包围的喷泉，并在每个角落各有一个喇叭。喇叭播着一段应该是公园主题曲的旋律，然而旋律却有损坏，在重复播放后会带着断断续续的噪点。喷泉右方有个接近后会自燃的篝火，与那个声名狼籍的"派对草丛"。这个区域在东边由许多的桥;在北边由两个沙洲连接着岛与其他地区。</p>';
								return
							case "8":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 别墅区</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主条目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E5%88%A5%E5%A2%85%E5%8D%80"> S.A.W. 别墅区</a></font><br><b>S.A.W. 别墅区</b>是由各种不同的地形组合而成的地区。北方是垃圾场，东方是针叶林和建筑群，南方是海滩和桥梁，西方是布满岩石和树林的村庄，东南方还有一个树木包围的小营地。由于地形的多样性，后期游戏在这里进行时可能需要随时观察局势来更换武器和战术。</p>';
								return
							case "9":
								document.getElementById("title").innerHTML="<p class='titleset'>金木森林</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>金木森林</b>是游戏中占地面积第二大的区域，由大量的树林组成。此地的物资非常分散，除了特定的房屋和货柜区/哨站外，其余区域很难找到装备。树林的阻碍也难以使用载具快速移动。虽然游戏前期在这里很难有效率的收集装备，但后期游戏中树林可以提供许多庇护来避开或偷袭敌人。</p>';
								return
							case "10":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 船厂</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>S.A.W. 船厂</b>位于岛屿东部的岸边地区，由大量密集的货柜组成。虽然大量密集的货柜可以提供许多装备，但由于货柜之间紧密相邻导致视野欠佳，需要随时警戒附近有没有敌人到来。船厂旁沿海有许多椰子树，可以拿来当成冲突后的额外补给或方便玩家进行拾取椰子的每日挑战。</p>';
								return
							case "11":
								document.getElementById("title").innerHTML="<p class='titleset'>超级撒哈拉沙漠</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主条目：<a href="https://animalroyale-zh.gamepedia.com/%E8%B6%85%E7%B4%9A%E6%92%92%E5%93%88%E6%8B%89%E6%B2%99%E6%BC%A0">超级撒哈拉沙漠</a></font><br><b>超级撒哈拉沙漠</b>是由密集的住宅区和大量开放区域的沙漠组成。虽然沙漠主要是空旷的开放区域，但是密集的建筑物使得物资十分集中，沙漠的开放环境也很容易注意到正在朝你前进的敌人。由于沙漠大部分区域缺乏掩蔽物，游戏后期可能会使得近距离武器陷入劣势。<font style="color:#ee0000">此为旧版资料</font></p>';
								return
							case "12":
								document.getElementById("title").innerHTML="<p class='titleset'>Thomas 的苔原</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>Thomas 的苔原</b>覆盖了地图北部的整块区域，分散着针叶树林，岩山和各种建筑群。除了两处结冰的湖面外，大量覆盖这个区域的树木，岩石和建筑都可以在后期游戏提供很好的掩蔽。</p>';
								return
							case "13":
								document.getElementById("title").innerHTML="<p class='titleset'>超级金字塔</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>无资料</font></p>";
								return
							case "14":
								document.getElementById("title").innerHTML="<p class='titleset'>超级鸸鹋牧场</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>无资料</font></p>";
								return
						}	
					case 1: //zh-cn
						switch (y) {
							case "0":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 竹林度假村</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E7%AB%B9%E6%9E%97%E5%BA%A6%E5%81%87%E6%9D%91'> S.A.W. 竹林度假村</a></font><br>中国主题的竹林度假村位于岛上中央，提供按摩、卫浴、餐饮等服务。度假村附近生长着大量密集的竹林，是很好的躲藏和埋伏地点。</p>";
								return
							case "1":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 实验室</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E5%AE%9E%E9%AA%8C%E5%AE%A4'> S.A.W. 实验室</a></font><br><b>实验室</b>曾经是岛上用来培育和研究超级动物的地方，由收容区、研究栋和培育所组成。物资密集的放置在实验室内，但建筑内大量的狭窄通道和房间使得探索时要特别警戒附近的敌人并随时注意退路。</p>";
								return
							case "2":
								document.getElementById("title").innerHTML="<p class='titleset'>超级紫晶山</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超级紫晶山</b>是位于岛上西北方的矿场。矿山靠海的一端有着大量的紫色晶体矿物，目前无从得知这些晶体的实际用途。矿山内部有着狭小的通道、监狱般的石窟及少部分开放空间组成。</p>";
								return
							case "3":
								document.getElementById("title").innerHTML="<p class='titleset'>企鹅宫殿</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>无资料</font></p>";
								return
							case "4":
								document.getElementById("title").innerHTML="<p class='titleset'>超级动物农场</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超级动物农场</b>位于 Pete 的沼泽的右上方，由谷仓、超级牛奶吧和周边的小木屋组成。超级动物农场的装备主要集中在农场正中央的谷仓和谷仓下方的超级牛奶吧。超级动物农场拥有许多小木屋，使得这里是甩开敌人的好地方。</p>";
								return
							case "5":
								document.getElementById("title").innerHTML="<p class='titleset'>鹰临</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/%E9%B9%B0%E4%B8%B4'> 鹰临</a></font><br><b>鹰临</b>鹰临是岛上的鸟类主题区域，提供餐饮和歌舞表演等娱乐活动。鹰临被此地特有的樱花树包围，加上三种独特结构的建筑物和中央的广场组成。</p>";
								return
							case "6":
								document.getElementById("title").innerHTML="<p class='titleset'>Pete 的沼泽</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主条目：<a href='https://animalroyale-zh.gamepedia.com/Pete_%E7%9A%84%E6%B2%BC%E6%B3%BD'> Pete 的沼泽</a></font><br><b>Pete 的沼泽</b>是个在迎宾中心东方的小型区域。正如同名字所言，是一座沼泽。此地区被分割为较小的北方区域与较大的南方区域。整个沼泽所铺设的木桥道路布满了许多物品。只有少数的遮蔽物和狭窄的木桥道路使火拼发生时将难以躲避子弹，但是桥上布满的物品使他成为开局时收集武器与装甲的主要地点之一。</p>";
								return
							case "7":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 迎宾中心</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E8%BF%8E%E8%B3%93%E4%B8%AD%E5%BF%83"> S.A.W. 迎宾中心</a></font><br>这里是岛上主要的入口，并且也是巨鹰的登鹰点。玩家会生成在这个如同游戏前大厅的地区。这地方有着商店、餐厅与咖啡馆的废墟。在中心有个被树丛包围的喷泉，并在每个角落各有一个喇叭。喇叭播着一段应该是公园主题曲的旋律，然而旋律却有损坏，在重复播放后会带着断断续续的噪点。喷泉右方有个接近后会自燃的篝火，与那个声名狼籍的"派对草丛"。这个区域在东边由许多的桥;在北边由两个沙洲连接着岛与其他地区。</p>';
								return
							case "8":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 别墅区</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主条目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E5%88%A5%E5%A2%85%E5%8D%80"> S.A.W. 别墅区</a></font><br><b>S.A.W. 别墅区</b>是由各种不同的地形组合而成的地区。北方是垃圾场，东方是针叶林和建筑群，南方是海滩和桥梁，西方是布满岩石和树林的村庄，东南方还有一个树木包围的小营地。由于地形的多样性，后期游戏在这里进行时可能需要随时观察局势来更换武器和战术。</p>';
								return
							case "9":
								document.getElementById("title").innerHTML="<p class='titleset'>金木森林</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>金木森林</b>是游戏中占地面积第二大的区域，由大量的树林组成。此地的物资非常分散，除了特定的房屋和货柜区/哨站外，其余区域很难找到装备。树林的阻碍也难以使用载具快速移动。虽然游戏前期在这里很难有效率的收集装备，但后期游戏中树林可以提供许多庇护来避开或偷袭敌人。</p>';
								return
							case "10":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 船厂</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>S.A.W. 船厂</b>位于岛屿东部的岸边地区，由大量密集的货柜组成。虽然大量密集的货柜可以提供许多装备，但由于货柜之间紧密相邻导致视野欠佳，需要随时警戒附近有没有敌人到来。船厂旁沿海有许多椰子树，可以拿来当成冲突后的额外补给或方便玩家进行拾取椰子的每日挑战。</p>';
								return
							case "11":
								document.getElementById("title").innerHTML="<p class='titleset'>超级撒哈拉沙漠</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主条目：<a href="https://animalroyale-zh.gamepedia.com/%E8%B6%85%E7%B4%9A%E6%92%92%E5%93%88%E6%8B%89%E6%B2%99%E6%BC%A0">超级撒哈拉沙漠</a></font><br><b>超级撒哈拉沙漠</b>是由密集的住宅区和大量开放区域的沙漠组成。虽然沙漠主要是空旷的开放区域，但是密集的建筑物使得物资十分集中，沙漠的开放环境也很容易注意到正在朝你前进的敌人。由于沙漠大部分区域缺乏掩蔽物，游戏后期可能会使得近距离武器陷入劣势。<font style="color:#ee0000">此为旧版资料</font></p>';
								return
							case "12":
								document.getElementById("title").innerHTML="<p class='titleset'>Thomas 的苔原</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>Thomas 的苔原</b>覆盖了地图北部的整块区域，分散着针叶树林，岩山和各种建筑群。除了两处结冰的湖面外，大量覆盖这个区域的树木，岩石和建筑都可以在后期游戏提供很好的掩蔽。</p>';
								return
							case "13":
								document.getElementById("title").innerHTML="<p class='titleset'>超级金字塔</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>无资料</font></p>";
								return
							case "14":
								document.getElementById("title").innerHTML="<p class='titleset'>超级鸸鹋牧场</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>无资料</font></p>";
								return
						}
					case 2: //zh-tw
						switch (y) {
							case "0":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 竹林度假村</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E7%AB%B9%E6%9E%97%E5%BA%A6%E5%81%87%E6%9D%91'> S.A.W. 竹林度假村</a></font><br>中國主題的竹林度假村位於島上中央，<br>提供按摩、衛浴、餐飲等服務。<br>度假村附近生長着大量密集的竹林，<br>是很好的躲藏和埋伏地點。</p>";
								return
							case "1":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 研究所</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E5%AE%9E%E9%AA%8C%E5%AE%A4'> S.A.W. 實驗室</a></font><br><b>研究所</b>曾經是島上用來培育和研究超級動物的地方，<br>由收容區、研究棟和培育所組成。<br>物資密集的放置在研究所內，<br>但建築內大量的狹窄通道和房間使得探索時要特別警戒附近的敵人並隨時注意退路。</p>";
								return
							case "2":
								document.getElementById("title").innerHTML="<p class='titleset'>超級紫晶山</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超級紫晶山</b>是位於島上西北方的礦場。<br>礦山靠海的一端有著大量的紫色晶體礦物，<br>目前無從得知這些晶體的實際用途。<br>礦山內部有著狹小的通道、監獄般的石窟及少部分開放空間組成。</p>";
								return
							case "3":
								document.getElementById("title").innerHTML="<p class='titleset'>企鵝宫殿</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>無資料</font></p>";
								return
							case "4":
								document.getElementById("title").innerHTML="<p class='titleset'>超級動物農場</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超級動物農場</b>位於 Pete 的沼澤的右上方，<br>由穀倉、超級牛奶吧和周邊的小木屋組成。<br>超級動物農場的裝備主要集中在農場正中央的穀倉和穀倉下方的超級牛奶吧。<br>超級動物農場擁有許多小木屋，<br>使得這裡是甩開敵人的好地方。</p>";
								return
							case "5":
								document.getElementById("title").innerHTML="<p class='titleset'>鷹臨之地</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/%E9%B9%B0%E4%B8%B4'> 鷹臨之地</a></font><br><b>鷹臨之地</b>是島上的鳥類主題區域，<br>提供餐飲和歌舞表演等娛樂活動。<br>鷹臨之地被此地特有的櫻花樹包圍，<br>加上三種獨特結構的建築物和中央的廣場組成。</p>";
								return
							case "6":
								document.getElementById("title").innerHTML="<p class='titleset'>Pete 的沼澤</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/Pete_%E7%9A%84%E6%B2%BC%E6%B3%BD'> Pete 的沼澤</a></font><br><b>Pete 的沼澤</b>是個在迎賓中心東方的小型區域。<br>正如同名字所言，是一座沼澤。<br>此地區被分割為較小的北方區域與較大的南方區域。<br>整個沼澤所鋪設的木橋道路布滿了許多物品。<br>只有少數的遮蔽物和狹窄的木橋道路使火拼發生時將難以躲避子彈，<br>但是橋上布滿的物品使他成為開局時收集武器與裝甲的主要地點之一。</p>";
								return
							case "7":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 迎賓中心</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E8%BF%8E%E8%B3%93%E4%B8%AD%E5%BF%83"> S.A.W. 迎賓中心</a></font><br>這裡是島上主要的入口，並且也是巨鷹的登鷹點。<br>玩家會生成在這個如同遊戲前大廳的地區。<br>這地方有著商店、餐廳與咖啡館的廢墟。<br>在中心有個被樹叢包圍的噴泉，並在每個角落各有一個喇叭。<br>喇叭播著一段應該是公園主題曲的旋律，<br>然而旋律卻有損壞，<br>在重複播放後會帶著斷斷續續的噪點。<br>噴泉右方有個接近後會自燃的營火，<br>與那個聲名狼籍的"派對草叢"。<br>這個區域在東邊由許多的橋;在北邊由兩個沙洲連接著島與其他地區。</p>';
								return
							case "8":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 別墅區</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E5%88%A5%E5%A2%85%E5%8D%80"> S.A.W. 別墅區</a></font><br><b>S.A.W. 別墅區</b>是由各種不同的地形組合而成的地區。<br>北方是垃圾場，東方是針葉林和建築群，<br>南方是海灘和橋樑，西方是布滿岩石和樹林的村莊，<br>東南方還有一個樹木包圍的小營地。由於地形的多樣性，<br>後期遊戲在這裡進行時可能需要隨時觀察局勢來更換武器和戰術。</p>';
								return
							case "9":
								document.getElementById("title").innerHTML="<p class='titleset'>金木森林</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>金木森林</b>是遊戲中占地面積第二大的區域，<br>由大量的樹林組成。<br>此地的物資非常分散，<br>除了特定的房屋和貨櫃區哨站外，<br>其餘區域很難找到裝備。<br>樹林的阻礙也難以使用載具快速移動。<br>雖然遊戲前期在這裡很難有效率的收集裝備，<br>但後期遊戲中樹林可以提供許多庇護來避開或偷襲敵人。</p>';
								return
							case "10":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 船廠</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>S.A.W. 船廠</b>位於島嶼東部的岸邊地區，<br>由大量密集的貨櫃組成。<br>雖然大量密集的貨櫃可以提供許多裝備，<br>但由於貨櫃之間緊密相鄰導致視野欠佳，<br>需要隨時警戒附近有沒有敵人到來。<br>船廠旁沿海有許多椰子樹，<br>可以拿來當成衝突後的額外補給或方便玩家進行拾取椰子的每日挑戰。</p>';
								return
							case "11":
								document.getElementById("title").innerHTML="<p class='titleset'>超級撒哈拉沙漠</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/%E8%B6%85%E7%B4%9A%E6%92%92%E5%93%88%E6%8B%89%E6%B2%99%E6%BC%A0">超級撒哈拉沙漠</a></font><br><b>超級撒哈拉沙漠</b>是由密集的住宅區和大量開放區域的沙漠組成。雖然沙漠主要是空曠的開放區域，但是密集的建築物使得物資十分集中，沙漠的開放環境也很容易注意到正在朝你前進的敵人。由於沙漠大部分區域缺乏掩蔽物，遊戲後期可能會使得近距離武器陷入劣勢。<font style="color:#ee0000">此為舊版資料</font></p>';
								return
							case "12":
								document.getElementById("title").innerHTML="<p class='titleset'>Thomas 的苔原</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>Thomas 的苔原</b>覆蓋了地圖北部的整塊區域，分散着針葉樹林，岩山和各種建築群。除了兩處結冰的湖面外，大量覆蓋這個區域的樹木，岩石和建築都可以在後期遊戲提供很好的掩蔽。</p>';
								return
							case "13":
								document.getElementById("title").innerHTML="<p class='titleset'>超級金字塔</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="color:#888888">無資料</font></p>";</p>';
								return
							case "14":
								document.getElementById("title").innerHTML="<p class='titleset'>超级鴯鶓牧場</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>無資料</font></p>";
								return
						}
					case 3: //en
						switch (y) {
							case "0":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. Bamboo Resort</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>none</font></p>";
								return
							case "1":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. Research Labs</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>none</font></p>";
								return
							case "2":
								document.getElementById("title").innerHTML="<p class='titleset'>Superite Mountain</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>none</font></p>";
								return
							case "3":
								document.getElementById("title").innerHTML="<p class='titleset'>Super Penguin Palace</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>none</font></p>";
								return
							case "4":
								document.getElementById("title").innerHTML="<p class='titleset'>Super Animal Farm</p>";
								document.getElementById("info").innerHTML="<p class='textset'>The countryside of the island, the Super Animal Farm is located in the center-most and bottom of the island, between Pete's Swamp, S.A.W. Bamboo Resort, and Goldwood Woods. In here, wheat surrounds the area, which a player can still cut as grass and count for the achievement. The Super Milk Barn is the biggest building of Super Animal Farm, containing a blocked door to the northern part of the barn and Duke's Storytelling on the east wing. The Super Milk Bar is the second largest building and may contain possible satisfactory drops. The third largest is the shack with a laboratory, located just east of the Barn and northeast of Milk Bar where Super Fried Chickens are possibly made. A long shack with drops can be also found just the west of Super Animal Barn, while all the other buildings are shacks containing other drops. There is also an area for chasing a Super Pig, which seemed to be an attraction before. Cover for this area is numerous, but interior-wise, corner-camping may be deadly for unsuspecting players. This area is one of the spots where players may drop in frequently, due to its large area and decent loot spawns.</p>";
								return
							case "5":
								document.getElementById("title").innerHTML="<p class='titleset'>Giant Eagle Landing</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>Giant Eagle Landing</b> is a subarea located in between of S.A.W. Welcome Center and S.A.W. Villas, somehow making an impression of a gathering spot secondary to that of S.A.W. Welcome Center. The area's theme seems to be centered about the Giant Eagle, to which the player drops from in the beginning of the match, and possibly, the Super Birds. It houses a store on the east that either plays Lady Cawcaw, Blue JayZ or Kelly Larkson's song whenever the player enters the stage. In the middle is a broken stage which spawns a lot of crates during the game. On top of it is an entertainment house called Giant Eagle Rides and at the left of the stage is a restaurant. There are also a couple of villas located in its western side. Cover in this area are moderate and involve also getting in and out of buildings. The items spawned in here make it a secondary choice of a spot worth dropping. Mole crates here appear infrequent and rarely.</p>";
								return
							case "6":
								document.getElementById("title").innerHTML="<p class='titleset'>Pete's Swamp</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>Pete's Swamp</b> is a relatively small area just east of the S.A.W. Welcome Center. As the name implies, it is indeed a swamp. The area is divided into a small northern section and a larger southern section. Elaborate, boardwalks covered in items weave through the swamp. There is very little cover however, and the narrow boardwalks make it hard to dodge bulvars if a firefight breaks out. Otherwise, the area's sheer amount of items make it a prime spot for gathering weapons and armor in the early game.</p>";
								return
							case "7":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. Welcome Center</p>";
								document.getElementById("info").innerHTML='<p class="textset">This is the main entrance of the island and the pick up area for deagle. Players spawn in this area and it acts as the pre-game lobby. The area is littered with shops, diners, and cafes. There is a fountain surrounded by hedges in the center, with 4 speakers at each corner. These speakers play a tune, presumably the theme song for the park. The tune is broken, filled with stutters and white noise after looping. To the right of the fountain is a campfire that ignites upon approach, as well as the infamous "party bush". This area is connected to the rest of the island by bridges to the east, as well as 2 sandbars to the north.</p>';
								return
							case "8":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. Villas</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="color:#888888">none</font></p>';
								return
							case "9":
								document.getElementById("title").innerHTML="<p class='titleset'>Goldwood Woods</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>Goldwood Woods</b> is the second largest area in the game with an area of 9 quadrants. It is a primarily composed of forest land that makes navigation tricky, especially while using a hamsterball. Beyond a few cluster of houses and small cargo yard there are few opportunities to find weapons and armor, making it a less desirable location in the early game. It is much better in the late game however as the trees provide plenty of cover and reduce the chances of being seen by enemies.</p>';
								return
							case "10":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. Shipyards</p>";
								document.getElementById("info").innerHTML='<p class="textset">A small and dense section of the eastern-most part of the map, the shipyards consist of several cargo containers with lots of cover, and its density makes for several close quarters encounters as well as some hard navigation. Whilst not a common place for the Circle Of Life to spawn the good quality loot spawn rates and density make it a good place to drop and loot in early game but quite hectic. Since the Shipyards are along the east beaches, coconuts can easily be found providing for easy health or challenge progress. The purpose of the Shipyards appears to be an area for S.A.W. to handle cargo.</p>';
								return
							case "11":
								document.getElementById("title").innerHTML="<p class='titleset'>Super Saharaland</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>Super Saharaland</b> takes place within a desert setting with very open plains consisting of very little cover and a few run-down and abandoned building complexes. The south part of Saharaland consists of bridges connecting the desert with the rest of the S.A.W. map whilst heading north will eventually lead you to Superite Mountain. While there aren't many opportunities to find loot in most of the desert, the small sections consisting of buildings have reliable and dense loot spawns, making it an acceptable place to drop within. Saharaland is commonly placed within the Circle Of Life but sees to be a rarer endgame location once the Circle Of Life has shrunk to its final phases. Saharaland appears to be a previous place for accommodation to visitors of S.A.W but does appear to have not been in use for some time.<font style='color:#ee0000'>此為舊版資料</font></p>";
								return
							case "12":
								document.getElementById("title").innerHTML="<p class='titleset'>Thomas's Tundra</p>";
								document.getElementById("info").innerHTML="<p class='textset'>An extremely large and open Tundra area that takes up a large chunk of the northern-most part of the map. This area is littered with small groups of houses, mountains and cargo containers. The Tundra has very similar properties to other parts of the map such as Goldwood Woods with a reasonable amount of cover provided by buildings, rocks and trees. But whilst it spans a large area, very little amounts of desirable loot spawns here. The Circle Of Life also doesn't often include the Tundra, making it a very undesirable area to drop within. The purpose of the Tundra within the park is unknown other than for accommodation.</p>";
								return
							case "13":
								document.getElementById("title").innerHTML="<p class='titleset'>Super Pyramid</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>none</font></p>";
								return
							case "14":
								document.getElementById("title").innerHTML="<p class='titleset'>Giant Emu Ranch</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>none</font></p>";
								return
						}
					case 4: //zh-hk
						switch (y) {
							case "0":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 竹林度假村</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E7%AB%B9%E6%9E%97%E5%BA%A6%E5%81%87%E6%9D%91'> S.A.W. 竹林度假村</a></font><br>中國主題的竹林度假村位於島上中央，<br>提供按摩、衛浴、餐飲等服務。<br>度假村附近生長着大量密集的竹林，<br>是很好的躲藏和埋伏地點。</p>";
								return
							case "1":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 研究所</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/S.A.W._%E5%AE%9E%E9%AA%8C%E5%AE%A4'> S.A.W. 實驗室</a></font><br><b>研究所</b>曾經是島上用來培育和研究超級動物的地方，<br>由收容區、研究棟和培育所組成。<br>物資密集的放置在研究所內，<br>但建築內大量的狹窄通道和房間使得探索時要特別警戒附近的敵人並隨時注意退路。</p>";
								return
							case "2":
								document.getElementById("title").innerHTML="<p class='titleset'>超級紫晶山</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超級紫晶山</b>是位於島上西北方的礦場。<br>礦山靠海的一端有著大量的紫色晶體礦物，<br>目前無從得知這些晶體的實際用途。<br>礦山內部有著狹小的通道、監獄般的石窟及少部分開放空間組成。</p>";
								return
							case "3":
								document.getElementById("title").innerHTML="<p class='titleset'>企鵝宫殿</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>無資料</font></p>";
								return
							case "4":
								document.getElementById("title").innerHTML="<p class='titleset'>超級動物農場</p>";
								document.getElementById("info").innerHTML="<p class='textset'><b>超級動物農場</b>位於 Pete 的沼澤的右上方，<br>由穀倉、超級牛奶吧和周邊的小木屋組成。<br>超級動物農場的裝備主要集中在農場正中央的穀倉和穀倉下方的超級牛奶吧。<br>超級動物農場擁有許多小木屋，<br>使得這裡是甩開敵人的好地方。</p>";
								return
							case "5":
								document.getElementById("title").innerHTML="<p class='titleset'>鷹臨</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/%E9%B9%B0%E4%B8%B4'> 鷹臨之地</a></font><br><b>鷹臨</b>是島上的鳥類主題區域，<br>提供餐飲和歌舞表演等娛樂活動。<br>鷹臨被此地特有的櫻花樹包圍，<br>加上三種獨特結構的建築物和中央的廣場組成。</p>";
								return
							case "6":
								document.getElementById("title").innerHTML="<p class='titleset'>Pete 的沼澤</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='font-size:8px;color:#color:#5555ff;background-color: #aaaaaa'>主條目：<a href='https://animalroyale-zh.gamepedia.com/Pete_%E7%9A%84%E6%B2%BC%E6%B3%BD'> Pete 的沼澤</a></font><br><b>Pete 的沼澤</b>是個在迎賓中心東方的小型區域。<br>正如同名字所言，是一座沼澤。<br>此地區被分割為較小的北方區域與較大的南方區域。<br>整個沼澤所鋪設的木橋道路布滿了許多物品。<br>只有少數的遮蔽物和狹窄的木橋道路使火拼發生時將難以躲避子彈，<br>但是橋上布滿的物品使他成為開局時收集武器與裝甲的主要地點之一。</p>";
								return
							case "7":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 迎賓中心</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E8%BF%8E%E8%B3%93%E4%B8%AD%E5%BF%83"> S.A.W. 迎賓中心</a></font><br>這裡是島上主要的入口，並且也是巨鷹的登鷹點。<br>玩家會生成在這個如同遊戲前大廳的地區。<br>這地方有著商店、餐廳與咖啡館的廢墟。<br>在中心有個被樹叢包圍的噴泉，並在每個角落各有一個喇叭。<br>喇叭播著一段應該是公園主題曲的旋律，<br>然而旋律卻有損壞，<br>在重複播放後會帶著斷斷續續的噪點。<br>噴泉右方有個接近後會自燃的營火，<br>與那個聲名狼籍的"派對草叢"。<br>這個區域在東邊由許多的橋;在北邊由兩個沙洲連接著島與其他地區。</p>';
								return
							case "8":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 別墅區</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/S.A.W._%E5%88%A5%E5%A2%85%E5%8D%80"> S.A.W. 別墅區</a></font><br><b>S.A.W. 別墅區</b>是由各種不同的地形組合而成的地區。<br>北方是垃圾場，東方是針葉林和建築群，<br>南方是海灘和橋樑，西方是布滿岩石和樹林的村莊，<br>東南方還有一個樹木包圍的小營地。由於地形的多樣性，<br>後期遊戲在這裡進行時可能需要隨時觀察局勢來更換武器和戰術。</p>';
								return
							case "9":
								document.getElementById("title").innerHTML="<p class='titleset'>金木森林</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>金木森林</b>是遊戲中占地面積第二大的區域，<br>由大量的樹林組成。<br>此地的物資非常分散，<br>除了特定的房屋和貨櫃區哨站外，<br>其餘區域很難找到裝備。<br>樹林的阻礙也難以使用載具快速移動。<br>雖然遊戲前期在這裡很難有效率的收集裝備，<br>但後期遊戲中樹林可以提供許多庇護來避開或偷襲敵人。</p>';
								return
							case "10":
								document.getElementById("title").innerHTML="<p class='titleset'>S.A.W. 船廠</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>S.A.W. 船廠</b>位於島嶼東部的岸邊地區，<br>由大量密集的貨櫃組成。<br>雖然大量密集的貨櫃可以提供許多裝備，<br>但由於貨櫃之間緊密相鄰導致視野欠佳，<br>需要隨時警戒附近有沒有敵人到來。<br>船廠旁沿海有許多椰子樹，<br>可以拿來當成衝突後的額外補給或方便玩家進行拾取椰子的每日挑戰。</p>';
								return
							case "11":
								document.getElementById("title").innerHTML="<p class='titleset'>超級撒哈拉沙漠</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="font-size:8px;color:#color:#5555ff;background-color: #aaaaaa">主條目：<a href="https://animalroyale-zh.gamepedia.com/%E8%B6%85%E7%B4%9A%E6%92%92%E5%93%88%E6%8B%89%E6%B2%99%E6%BC%A0">超級撒哈拉沙漠</a></font><br><b>超級撒哈拉沙漠</b>是由密集的住宅區和大量開放區域的沙漠組成。雖然沙漠主要是空曠的開放區域，但是密集的建築物使得物資十分集中，沙漠的開放環境也很容易注意到正在朝你前進的敵人。由於沙漠大部分區域缺乏掩蔽物，遊戲後期可能會使得近距離武器陷入劣勢。<font style="color:#ee0000">此為舊版資料</font></p>';
								return
							case "12":
								document.getElementById("title").innerHTML="<p class='titleset'>Thomas 的苔原</p>";
								document.getElementById("info").innerHTML='<p class="textset"><b>Thomas 的苔原</b>覆蓋了地圖北部的整塊區域，分散着針葉樹林，岩山和各種建築群。除了兩處結冰的湖面外，大量覆蓋這個區域的樹木，岩石和建築都可以在後期遊戲提供很好的掩蔽。</p>';
								return
							case "13":
								document.getElementById("title").innerHTML="<p class='titleset'>超級金字塔</p>";
								document.getElementById("info").innerHTML='<p class="textset"><font style="color:#888888">無資料</font></p>';
								return
							case "14":
								document.getElementById("title").innerHTML="<p class='titleset'>超级鴯鶓牧場</p>";
								document.getElementById("info").innerHTML="<p class='textset'><font style='color:#888888'>無資料</font></p>";
								return
						}
					}
				}	
			function pointchange2(){
				var x = this.id;
				if( flag == 0 ){
					document.getElementById(x).style.backgroundColor="blue";
					document.getElementById("maptitle").style.display="none";
					document.getElementById("outmapinfo").style.display="none";
					document.getElementById("mapinfo").style.display="none";
					document.getElementById("title").innerHTML="";
					document.getElementById("info").innerHTML="";
				}
			}
			function pointchange3(){
				var x = this.id;
				pointchange4(x);
				flag = 1;
			}
			function pointchange1(){
				var x = this.id;
				pointchange4(x);
			}