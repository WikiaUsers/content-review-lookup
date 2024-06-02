var form=document.createElement('form');
document.body.appendChild(form);


// 创建名字输入框
var nameInputLabel = document.createElement('label');
nameInputLabel.textContent = '角色姓名：';
form.appendChild(nameInputLabel);
var nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'nameInput';
nameInput.placeholder = '输入角色姓名';
form.appendChild(nameInput);
form.appendChild(document.createElement('br')); // 添加换行

// 创建稀有度选择框
// 创建稀有度选择框的文字说明
var rarityLabel = document.createElement('label');
rarityLabel.textContent = '稀有度：';
form.appendChild(rarityLabel);
var raritySelect = document.createElement('select');
raritySelect.id = 'raritySelect';
form.appendChild(raritySelect);
form.appendChild(document.createElement('br')); // 添加换行

// 创建稀有度选择框的选项
var rarityOptions = ['--', 'R', 'SR', 'SSR'];
rarityOptions.forEach(function(option, index) {
    var rarityOption = document.createElement('option');
    rarityOption.value = index.toString();
    rarityOption.textContent = option;
    raritySelect.appendChild(rarityOption);
});

// 创建职业选择框
var professionLabel = document.createElement('label');
professionLabel.textContent = '职业：';
form.appendChild(professionLabel);
var professionSelect = document.createElement('select');
professionSelect.id = 'professionSelect';
form.appendChild(professionSelect);
form.appendChild(document.createElement('br')); // 添加换行

// 创建职业选择框的选项
var professionOptions = ['--', '雇佣兵', '水手', '狙击手', '音乐家', '船医', '情报官'];
professionOptions.forEach(function(option) {
    var professionOption = document.createElement('option');
    professionOption.value = option;
    professionOption.textContent = option;
    professionSelect.appendChild(professionOption);
});

// 创建悬赏的上下界输入框
var bountyLabel = document.createElement('label');
bountyLabel.textContent = '悬赏：';
form.appendChild(bountyLabel);
//上界
var bountyMinInput = document.createElement('input');
bountyMinInput.type = 'number';
bountyMinInput.id = 'bountyMinInput';
bountyMinInput.placeholder = '最小悬赏';
form.appendChild(bountyMinInput);
//下界
var bountyMaxInput = document.createElement('input');
bountyMaxInput.type = 'number';
bountyMaxInput.id = 'bountyMaxInput';
bountyMaxInput.placeholder = '最大悬赏';
form.appendChild(bountyMaxInput);

form.appendChild(document.createElement('br')); // 添加换行

// 创建提交按钮
var submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = '筛选';
form.appendChild(submitButton);

// 创建角色表格
var characterTable = document.createElement('table');
characterTable.id = 'characterTable';
document.body.appendChild(characterTable);

// 创建表头
var thead = document.createElement('thead');
characterTable.appendChild(thead);

var headerRow = document.createElement('tr');
thead.appendChild(headerRow);

var headers = ['姓名', '稀有度', '职业', '悬赏'];
headers.forEach(function(header) {
    var th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
});

// 创建表体
var tbody = document.createElement('tbody');
characterTable.appendChild(tbody);

// 用于创建角色对象的构造函数
class Character {
    constructor(name, rarity, profession, bounty, url) {
        this.name = name;
        this.rarity = rarity;
        this.profession = profession;
        this.bounty = bounty;
        this.url = url;
    }

    // 根据选择的条件筛选角色的函数
    static filterCharacter(characters, name, rarity, profession, bountyMin, bountyMax){
        return characters.filter(character => {
            return (name === "" || character.name === name) &&
                   (rarity === 0 || character.rarity === rarity) &&
                   (profession === "--" || character.profession === profession) &&
                   (bountyMin === "" || character.bounty >= bountyMin) &&
                   (bountyMax === "" || character.bounty <= bountyMax);
        });
    }
}

// 角色对象数组
var characters = [
    new Character("哈露·阿雅", 3, "雇佣兵", 1000000,"http://insulafantasia-cn.wikidot.com/haru-aya"),
    new Character("冰纱", 3, "雇佣兵", 500000,"http://insulafantasia-cn.wikidot.com/hyoza"),
    new Character("诺斯费拉图", 3, "水手", 800000,"http://insulafantasia-cn.wikidot.com/nosferatu"),
    new Character("奥莉", 3, "狙击手", 1200000),
    new Character("克拉拉", 3, "音乐家", 1500000),
    new Character("墨先生", 3, "船医", 2000000),
    new Character("浮", 3, "船医", 1000000),
    new Character("阿普提娅", 3, "音乐家", 500000),
    new Character("安妮&玛丽", 2, "狙击手", 800000),
    new Character("卡尔妮菲克", 2, "音乐家", 1200000),
    new Character("阿尔法·图灵", 2, "情报官", 1500000,"http://insulafantasia-cn.wikidot.com/%CE%91lPha-Turing"),
    new Character("亚历珊德拉·卡涅阿德斯", 2, "情报官", 2000000),
    new Character("朵芬·亚爱拉", 2, "水手", 1000000),
    new Character("GR", 2, "情报官", 500000),
    new Character("多纳·路纳", 2, "船医", 800000),
    new Character("娜迦·奥伊", 1, "船医", 1200000),
    new Character("碧藻", 1, "水手", 1500000),
    new Character("弗雷姆·阿特伍德", 1, "水手", 2000000)
];

// 表单提交事件监听器
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // 获取表单中选择的值
    var name = nameInput.value;
    var rarity = parseInt(raritySelect.value);
    var profession = professionSelect.value;
    var bountyMin = bountyMinInput.value;
    var bountyMax = bountyMaxInput.value;

    // 根据选择的条件筛选角色
    var filteredCharacters = Character.filterCharacter(characters, name, rarity, profession, bountyMin, bountyMax);

    // 清空表格内容
    var tableBody = document.querySelector('#characterTable tbody');
    tableBody.innerHTML = '';

    // 填充表格内容
    filteredCharacters.forEach(function(character) {
        var row = document.createElement('tr');

        // 创建包含角色姓名链接的单元格
        var nameCell = document.createElement('td');
        var nameLink = document.createElement('a');
        nameLink.href = character.url;
        nameLink.textContent = character.name;
        nameCell.appendChild(nameLink);
        row.appendChild(nameCell);

        // 创建包含角色稀有度的单元格
        var rarityCell = document.createElement('td');
        rarityCell.textContent = character.rarity;
        row.appendChild(rarityCell);

        // 创建包含角色职业的单元格
        var professionCell = document.createElement('td');
        professionCell.textContent = character.profession;
        row.appendChild(professionCell);

        // 创建包含角色悬赏的单元格
        var bountyCell = document.createElement('td');
        bountyCell.textContent = character.bounty;
        row.appendChild(bountyCell);

        // 将行添加到表格内容中
        tableBody.appendChild(row);
    });
});

//code from【卡德罗斯】sama