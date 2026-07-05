(() => {
    const TARGET_SELECTOR = '.typing-text';
    const TICK_MS = 50;                    // 每次刷新间隔
    const REVEAL_EVERY = 3;                // 每多少次刷新解锁一个字符
    const START_DELAY_STEP = 180;          // 多个元素时的起始错峰

    const CJK_POOL = '蜒格枣搔吴筷崭否孽营艾俄独饭叔弱值氏真擒谨磷剥镀汛趴箕串糕鸡推壮袭急啡鹏伪浑粥曙堪稀怯缆组帮世苹场免花本员驻怨聚证藐焊荔备议冕绊蚯踱熬仅驶轴差蚁韭害予乘授烈堤查退擅裳姆卵缰似妖付沮哥敛帜华递庄丹闰牍采飞态涡圾它累蛹奸蜕缕拼敷风伊集坑欧丰险锻袄厦匿或捶薄晾扭脖队逼俘苞轮砌耽拘划称跋涉蕊萨亥克膨蚊干琼喊徊读亩吐舌萌挺规熟耘布螃玄究炫动碉胳围拐个蚕涝跑膛缚菠拗驹席伺鸦阀纯葡孵诉痰画捻隔歧巨筋苫贮帖至昏裙锚吊腹栖奈悴僵衙邀签涮答悠暖轩麦梅烫碾凶胃鄙障铛螟漏炭途业婶阎吁胆断懒戚平裆疆胀醉恩巢交纪糙座实摘锣辞嫂谜样惭肪及启的企资挫蚂裁浇唐痴浓蔬尖财禁且蔓杠颓焦樱棉童产慢墓映垢皮梭占航笆亲洛僻锉们依劈了四上雕供裂璧细分基贼睁赡皱脯银隆静精周豺外爵暂滚应篱欢隙岳慎得欠灸缠涣云械昔速慈王如瑞翔空笋气强锤食体整粗姚蝴蝌设薯咖完隅玫峰示喧捐榛验即番筏貌脉挂吆印乍提穷趾捌氯逆押罐糠谣娩边蟀鹦尺主矮更遮非肌就叭曹祟唬闭捉欣窒淆盘舆囱棕葵怒狮册托婉枝果甫勤漾柴编植蹂效辽匈逊墅鸵肮述葱磅砚愁幔寇侯滑柑羡拍窑荚瓤圣响盟时殉锌卷馏屏均刮撤坏纺两碳轧宙瓢音眶雌咙戏拖烟埠搞弄愤硼颊焰售畅趁呻烙烦陷壤低侥亭衩网纫奔神葛礁链呵胚拱炒培来蚣咬借淀壁齿姻锭卜茁广秆丝悲锐降西找百嚣捺肝椒仪谐徘刀碎稻斥绍尘秃兽馍续臼枚芋侵录漩癣疫亚拒诊晴冀谈醋涵悼匹贿千骤瘩桑贩众闻未魔泡策落么头吃件吨另枯止淮胎叶舀追服坷誊祭柬政筑蓉碍闪巡窖初厌式糖冈同鸠欲磕懂疾肺谚醇榜凑恬匙酌俐寸篙谍伟狸晕恋诵对拾坠煤钝箭鸽痢渗掺芙化宛向川郭间砾瑰份楼近咪撇默九罩挠弹董盏忽浆板魁惕赤票侠最荠枉牌阔忆虹黍呐氮京胡床井惊榄罚准账糊弛饲啤鞭滤驰絮乙概秋冬洲木匆烛亡揩先砸犯丸寿思歇颠旭颇狰蒸被突赋咳巴白乏勉烘宁插富摹底复厚裸档楚黑宽涕笙闯吕也迅泵朋擎蝙箍冶窝料焚综疲破洽贵凿歹蜀崔怖诞沿眼毛葫驯萤泣携匪揉棋申跛菱涤耿佩芳坐铃充奴孤椿月故茅竿酝元赔胞豫沸犬历铸芹络请仗勋杭光攻哈畏晒博畜夏鹉关有截憔厉谓获壕廊龙钳靖赫脆篓昌叽躬渣号拿谊良生橱切凹刘毕练翻腺田匣庸耗喘素缤惑惨酒污泳求笼嗽涨街赎置好宪跃哗佳叼旬液琅翩适唆彭鸯檩通惜蝠靠瞧腔恐凝利圈数痹超说砂唉著栗渊火瓷店忌写餐焕软管碟逸望漆舵岁口凌祷射傅皂茧爷讨钞洁脐刁宠语宜渺踪孩灭搏绷海踏受嫌钱劣廉灌择馒限瘦漠齐二搀踩夜挑锋斜努煞舒畴忍衬庆荷瞒玉姓掂慌夸箱蜗竹玷饥汉诈解移次飒嚎撞茸帕蒲课下扩赁嗡损硝蛆每愕愉刽杂厢各';
    const FULLWIDTH_PUNCT = '，。？！；：、（）【】《》“”‘’——…￥';
    const HALFWIDTH_PUNCT = '.,?!;:()[]{}<>"\'`~@#$%^&*-_=+/\\|';

    const randInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
    const pick = (str) => str[randInt(0, str.length - 1)];

    function scrambleChar(ch) {
        if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') return ch;

        const code = ch.charCodeAt(0);

        if (code >= 48 && code <= 57) {
            return String(randInt(0, 9));
        }

        if (code >= 65 && code <= 90) {
            return String.fromCharCode(randInt(65, 90));
        }

        if (code >= 97 && code <= 122) {
            return String.fromCharCode(randInt(97, 122));
        }

        if (FULLWIDTH_PUNCT.includes(ch)) {
            return pick(FULLWIDTH_PUNCT);
        }

        if (HALFWIDTH_PUNCT.includes(ch)) {
            return pick(HALFWIDTH_PUNCT);
        }

        // 常见中文范围，或其他宽字符，统一走中文随机池
        if (
            (code >= 0x4E00 && code <= 0x9FFF) ||
            (code >= 0x3400 && code <= 0x4DBF) ||
            (code >= 0xF900 && code <= 0xFAFF)
        ) {
            return pick(CJK_POOL);
        }

        // 其他符号：尽量保持宽度感，优先随机同类标点，否则用中文池
        return Math.random() < 0.5 ? pick(HALFWIDTH_PUNCT) : pick(CJK_POOL);
    }

    function animateElement(el, startDelay = 0) {
        const original = el.textContent;
        const chars = Array.from(original);
        let revealIndex = 0;
        let tickCount = 0;

        el.style.whiteSpace = 'pre-wrap';
        el.textContent = chars.map(ch => scrambleChar(ch)).join('');

        const timer = setInterval(() => {
            tickCount++;

            const rendered = chars.map((ch, i) => {
                if (i < revealIndex) return ch;
                return scrambleChar(ch);
            }).join('');

            el.textContent = rendered;

            if (tickCount % REVEAL_EVERY === 0 && revealIndex < chars.length) {
                revealIndex++;
            }

            if (revealIndex >= chars.length) {
                el.textContent = original;
                clearInterval(timer);
            }
        }, TICK_MS);

        if (startDelay > 0) {
            clearInterval(timer);
            setTimeout(() => animateElement(el, 0), startDelay);
        }
    }

    const elements = document.querySelectorAll(TARGET_SELECTOR);
    elements.forEach((el, i) => {
        animateElement(el, i * START_DELAY_STEP);
    });
})();

(() => {
    const TARGET_SELECTOR = '.typing-text-1';
    const TICK_MS = 75;                    // 每次刷新间隔
    const REVEAL_EVERY = 3;                // 每多少次刷新解锁一个字符
    const START_DELAY_STEP = 180;          // 多个元素时的起始错峰

    const CJK_POOL = '蜒格枣搔吴筷崭否孽营艾俄独饭叔弱值氏真擒谨磷剥镀汛趴箕串糕鸡推壮袭急啡鹏伪浑粥曙堪稀怯缆组帮世苹场免花本员驻怨聚证藐焊荔备议冕绊蚯踱熬仅驶轴差蚁韭害予乘授烈堤查退擅裳姆卵缰似妖付沮哥敛帜华递庄丹闰牍采飞态涡圾它累蛹奸蜕缕拼敷风伊集坑欧丰险锻袄厦匿或捶薄晾扭脖队逼俘苞轮砌耽拘划称跋涉蕊萨亥克膨蚊干琼喊徊读亩吐舌萌挺规熟耘布螃玄究炫动碉胳围拐个蚕涝跑膛缚菠拗驹席伺鸦阀纯葡孵诉痰画捻隔歧巨筋苫贮帖至昏裙锚吊腹栖奈悴僵衙邀签涮答悠暖轩麦梅烫碾凶胃鄙障铛螟漏炭途业婶阎吁胆断懒戚平裆疆胀醉恩巢交纪糙座实摘锣辞嫂谜样惭肪及启的企资挫蚂裁浇唐痴浓蔬尖财禁且蔓杠颓焦樱棉童产慢墓映垢皮梭占航笆亲洛僻锉们依劈了四上雕供裂璧细分基贼睁赡皱脯银隆静精周豺外爵暂滚应篱欢隙岳慎得欠灸缠涣云械昔速慈王如瑞翔空笋气强锤食体整粗姚蝴蝌设薯咖完隅玫峰示喧捐榛验即番筏貌脉挂吆印乍提穷趾捌氯逆押罐糠谣娩边蟀鹦尺主矮更遮非肌就叭曹祟唬闭捉欣窒淆盘舆囱棕葵怒狮册托婉枝果甫勤漾柴编植蹂效辽匈逊墅鸵肮述葱磅砚愁幔寇侯滑柑羡拍窑荚瓤圣响盟时殉锌卷馏屏均刮撤坏纺两碳轧宙瓢音眶雌咙戏拖烟埠搞弄愤硼颊焰售畅趁呻烙烦陷壤低侥亭衩网纫奔神葛礁链呵胚拱炒培来蚣咬借淀壁齿姻锭卜茁广秆丝悲锐降西找百嚣捺肝椒仪谐徘刀碎稻斥绍尘秃兽馍续臼枚芋侵录漩癣疫亚拒诊晴冀谈醋涵悼匹贿千骤瘩桑贩众闻未魔泡策落么头吃件吨另枯止淮胎叶舀追服坷誊祭柬政筑蓉碍闪巡窖初厌式糖冈同鸠欲磕懂疾肺谚醇榜凑恬匙酌俐寸篙谍伟狸晕恋诵对拾坠煤钝箭鸽痢渗掺芙化宛向川郭间砾瑰份楼近咪撇默九罩挠弹董盏忽浆板魁惕赤票侠最荠枉牌阔忆虹黍呐氮京胡床井惊榄罚准账糊弛饲啤鞭滤驰絮乙概秋冬洲木匆烛亡揩先砸犯丸寿思歇颠旭颇狰蒸被突赋咳巴白乏勉烘宁插富摹底复厚裸档楚黑宽涕笙闯吕也迅泵朋擎蝙箍冶窝料焚综疲破洽贵凿歹蜀崔怖诞沿眼毛葫驯萤泣携匪揉棋申跛菱涤耿佩芳坐铃充奴孤椿月故茅竿酝元赔胞豫沸犬历铸芹络请仗勋杭光攻哈畏晒博畜夏鹉关有截憔厉谓获壕廊龙钳靖赫脆篓昌叽躬渣号拿谊良生橱切凹刘毕练翻腺田匣庸耗喘素缤惑惨酒污泳求笼嗽涨街赎置好宪跃哗佳叼旬液琅翩适唆彭鸯檩通惜蝠靠瞧腔恐凝利圈数痹超说砂唉著栗渊火瓷店忌写餐焕软管碟逸望漆舵岁口凌祷射傅皂茧爷讨钞洁脐刁宠语宜渺踪孩灭搏绷海踏受嫌钱劣廉灌择馒限瘦漠齐二搀踩夜挑锋斜努煞舒畴忍衬庆荷瞒玉姓掂慌夸箱蜗竹玷饥汉诈解移次飒嚎撞茸帕蒲课下扩赁嗡损硝蛆每愕愉刽杂厢各';
    const FULLWIDTH_PUNCT = '，。？！；：、（）【】《》“”‘’——…￥';
    const HALFWIDTH_PUNCT = '.,?!;:()[]{}<>"\'`~@#$%^&*-_=+/\\|';

    const randInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
    const pick = (str) => str[randInt(0, str.length - 1)];

    function scrambleChar(ch) {
        if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') return ch;

        const code = ch.charCodeAt(0);

        if (code >= 48 && code <= 57) {
            return String(randInt(0, 9));
        }

        if (code >= 65 && code <= 90) {
            return String.fromCharCode(randInt(65, 90));
        }

        if (code >= 97 && code <= 122) {
            return String.fromCharCode(randInt(97, 122));
        }

        if (FULLWIDTH_PUNCT.includes(ch)) {
            return pick(FULLWIDTH_PUNCT);
        }

        if (HALFWIDTH_PUNCT.includes(ch)) {
            return pick(HALFWIDTH_PUNCT);
        }

        // 常见中文范围，或其他宽字符，统一走中文随机池
        if (
            (code >= 0x4E00 && code <= 0x9FFF) ||
            (code >= 0x3400 && code <= 0x4DBF) ||
            (code >= 0xF900 && code <= 0xFAFF)
        ) {
            return pick(CJK_POOL);
        }

        // 其他符号：尽量保持宽度感，优先随机同类标点，否则用中文池
        return Math.random() < 0.5 ? pick(HALFWIDTH_PUNCT) : pick(CJK_POOL);
    }

    function animateElement(el, startDelay = 0) {
        const original = el.textContent;
        const chars = Array.from(original);
        let revealIndex = 0;
        let tickCount = 0;

        el.style.whiteSpace = 'pre-wrap';
        el.textContent = chars.map(ch => scrambleChar(ch)).join('');

        const timer = setInterval(() => {
            tickCount++;

            const rendered = chars.map((ch, i) => {
                if (i < revealIndex) return ch;
                return scrambleChar(ch);
            }).join('');

            el.textContent = rendered;

            if (tickCount % REVEAL_EVERY === 0 && revealIndex < chars.length) {
                revealIndex++;
            }

            if (revealIndex >= chars.length) {
                el.textContent = original;
                clearInterval(timer);
            }
        }, TICK_MS);

        if (startDelay > 0) {
            clearInterval(timer);
            setTimeout(() => animateElement(el, 0), startDelay);
        }
    }

    const elements = document.querySelectorAll(TARGET_SELECTOR);
    elements.forEach((el, i) => {
        animateElement(el, i * START_DELAY_STEP);
    });
})();


(() => {
    const TARGET_SELECTOR = '.typing-text-2';
    const TICK_MS = 50;                    // 每次刷新间隔
    const REVEAL_EVERY = 3;                // 每多少次刷新解锁一个字符
    const START_DELAY_STEP = 180;          // 多个元素时的起始错峰
    const MAX_CYCLE_TIME = 2000;           // 最大周期时间（减少周期时间）
    const MIN_CYCLE_TIME = 500;           // 最小周期时间（减少周期时间）

    const CJK_POOL = '蜒格枣搔吴筷崭否孽营艾俄独饭叔弱值氏真擒谨磷剥镀汛趴箕串糕鸡推壮袭急啡鹏伪浑粥曙堪稀怯缆组帮世苹场免花本员驻怨聚证藐焊荔备议冕绊蚯踱熬仅驶轴差蚁韭害予乘授烈堤查退擅裳姆卵缰似妖付沮哥敛帜华递庄丹闰牍采飞态涡圾它累蛹奸蜕缕拼敷风伊集坑欧丰险锻袄厦匿或捶薄晾扭脖队逼俘苞轮砌耽拘划称跋涉蕊萨亥克膨蚊干琼喊徊读亩吐舌萌挺规熟耘布螃玄究炫动碉胳围拐个蚕涝跑膛缚菠拗驹席伺鸦阀纯葡孵诉痰画捻隔歧巨筋苫贮帖至昏裙锚吊腹栖奈悴僵衙邀签涮答悠暖轩麦梅烫碾凶胃鄙障铛螟漏炭途业婶阎吁胆断懒戚平裆疆胀醉恩巢交纪糙座实摘锣辞嫂谜样惭肪及启的企资挫蚂裁浇唐痴浓蔬尖财禁且蔓杠颓焦樱棉童产慢墓映垢皮梭占航笆亲洛僻锉们依劈了四上雕供裂璧细分基贼睁赡皱脯银隆静精周豺外爵暂滚应篱欢隙岳慎得欠灸缠涣云械昔速慈王如瑞翔空笋气强锤食体整粗姚蝴蝌设薯咖完隅玫峰示喧捐榛验即番筏貌脉挂吆印乍提穷趾捌氯逆押罐糠谣娩边蟀鹦尺主矮更遮非肌就叭曹祟唬闭捉欣窒淆盘舆囱棕葵怒狮册托婉枝果甫勤漾柴编植蹂效辽匈逊墅鸵肮述葱磅砚愁幔寇侯滑柑羡拍窑荚瓤圣响盟时殉锌卷馏屏均刮撤坏纺两碳轧宙瓢音眶雌咙戏拖烟埠搞弄愤硼颊焰售畅趁呻烙烦陷壤低侥亭衩网纫奔神葛礁链呵胚拱炒培来蚣咬借淀壁齿姻锭卜茁广秆丝悲锐降西找百嚣捺肝椒仪谐徘刀碎稻斥绍尘秃兽馍续臼枚芋侵录漩癣疫亚拒诊晴冀谈醋涵悼匹贿千骤瘩桑贩众闻未魔泡策落么头吃件吨另枯止淮胎叶舀追服坷誊祭柬政筑蓉碍闪巡窖初厌式糖冈同鸠欲磕懂疾肺谚醇榜凑恬匙酌俐寸篙谍伟狸晕恋诵对拾坠煤钝箭鸽痢渗掺芙化宛向川郭间砾瑰份楼近咪撇默九罩挠弹董盏忽浆板魁惕赤票侠最荠枉牌阔忆虹黍呐氮京胡床井惊榄罚准账糊弛饲啤鞭滤驰絮乙概秋冬洲木匆烛亡揩先砸犯丸寿思歇颠旭颇狰蒸被突赋咳巴白乏勉烘宁插富摹底复厚裸档楚黑宽涕笙闯吕也迅泵朋擎蝙箍冶窝料焚综疲破洽贵凿歹蜀崔怖诞沿眼毛葫驯萤泣携匪揉棋申跛菱涤耿佩芳坐铃充奴孤椿月故茅竿酝元赔胞豫沸犬历铸芹络请仗勋杭光攻哈畏晒博畜夏鹉关有截憔厉谓获壕廊龙钳靖赫脆篓昌叽躬渣号拿谊良生橱切凹刘毕练翻腺田匣庸耗喘素缤惑惨酒污泳求笼嗽涨街赎置好宪跃哗佳叼旬液琅翩适唆彭鸯檩通惜蝠靠瞧腔恐凝利圈数痹超说砂唉著栗渊火瓷店忌写餐焕软管碟逸望漆舵岁口凌祷射傅皂茧爷讨钞洁脐刁宠语宜渺踪孩灭搏绷海踏受嫌钱劣廉灌择馒限瘦漠齐二搀踩夜挑锋斜努煞舒畴忍衬庆荷瞒玉姓掂慌夸箱蜗竹玷饥汉诈解移次飒嚎撞茸帕蒲课下扩赁嗡损硝蛆每愕愉刽杂厢各';
    const FULLWIDTH_PUNCT = '，。？！；：、（）【】《》“”‘’——…￥';
    const HALFWIDTH_PUNCT = '.,?!;:()[]{}<>"\'`~@#$%^&*-_=+/\\|';

    const randInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
    const pick = (str) => str[randInt(0, str.length - 1)];

    function scrambleChar(ch) {
        if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') return ch;

        const code = ch.charCodeAt(0);

        if (code >= 48 && code <= 57) {
            return String(randInt(0, 9));
        }

        if (code >= 65 && code <= 90) {
            return String.fromCharCode(randInt(65, 90));
        }

        if (code >= 97 && code <= 122) {
            return String.fromCharCode(randInt(97, 122));
        }

        if (FULLWIDTH_PUNCT.includes(ch)) {
            return pick(FULLWIDTH_PUNCT);
        }

        if (HALFWIDTH_PUNCT.includes(ch)) {
            return pick(HALFWIDTH_PUNCT);
        }

        // 常见中文范围，或其他宽字符，统一走中文随机池
        if (
            (code >= 0x4E00 && code <= 0x9FFF) ||
            (code >= 0x3400 && code <= 0x4DBF) ||
            (code >= 0xF900 && code <= 0xFAFF)
        ) {
            return pick(CJK_POOL);
        }

        // 其他符号：尽量保持宽度感，优先随机同类标点，否则用中文池
        return Math.random() < 0.5 ? pick(HALFWIDTH_PUNCT) : pick(CJK_POOL);
    }

    function animateElement(el, startDelay = 0) {
        const original = el.textContent;
        const chars = Array.from(original);
        let revealIndex = 0;
        let tickCount = 0;

        el.style.whiteSpace = 'pre-wrap';
        el.textContent = chars.map(ch => scrambleChar(ch)).join('');

        const cycleTime = randInt(MIN_CYCLE_TIME, MAX_CYCLE_TIME); // 随机周期时间
        const timer = setInterval(() => {
            tickCount++;

            const rendered = chars.map((ch, i) => {
                if (i < revealIndex) return ch;
                return scrambleChar(ch);
            }).join('');

            el.textContent = rendered;

            if (tickCount % REVEAL_EVERY === 0 && revealIndex < chars.length) {
                revealIndex++;
            }

            if (revealIndex >= chars.length) {
                el.textContent = original;
                setTimeout(() => {
                    revealIndex = 0; // 每完成后清零，重新开始乱码
                    el.textContent = chars.map(ch => scrambleChar(ch)).join(''); // 替换为乱码
                }, cycleTime);
            }
        }, TICK_MS);

        if (startDelay > 0) {
            clearInterval(timer);
            setTimeout(() => animateElement(el, 0), startDelay);
        }
    }

    const elements = document.querySelectorAll(TARGET_SELECTOR);
    elements.forEach((el, i) => {
        animateElement(el, i * START_DELAY_STEP);
    });
})();