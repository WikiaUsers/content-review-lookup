var userList = [
    { name: ["The F Factor", "KaelSilence", "Kuroneko6558"], class: "tag-userTag-FBAdmin", textContent: "Admin Facebook" },
    {
        name: [
            ".Kuno",
            "A.Homura",
            "Aria132",
            "Aria0214",
            "Avianhope",
            "Brisingr22",
            "Chio Miyamo",
            "Danielhopper1806",
            "Datvippq",
            "DeHooker",
            "Dorevsdore02",
            "Dqt1995",
            "Kiv x Monster",
            "Hibiki3190",
            "Hewki98",
            "Hika2310",
            "HiKiTaNi",
            "Himemaouyuki",
            "Ispassingby",
            "Kaizuka Satomi",
            "Kagamine Rukato",
            "Kirito96",
            "Kurogane Ikki",
            "Leaf snivy",
            "Lolicon-er",
            "Minhtun",
            "Mistykd",
            "MurakamiAvianHope",
            "Mysakuradying",
            "NoHag",
            "Pikeman1",
            "Phạm Thanh Hà",
            "Ryugamine Mikado",
            "ScarletGold",
            "Shiratori Kanae",
            "Sweec1890",
            "Tran Duc Anh",
            "Trung Khệnh",
            "Turtle-kun",
            "VaSu.Takei",
            "Vnsharing135",
            "Wasabikiller",
            "W.H.H.H.",
            "Yamitohikari136",
            "Zecro",
        ],
        class: "tag-userTag-Member",
        textContent: "Member of Sonako",
    },
    { name: ["Duong0810", "HamanoAkira", "Krt Shu", "Kurosame Yato", "Ngubathong", "Silver Eyes", "Tnguyen2511", "Yuseifudo1994"], class: "tag-userTag-SuperMem", textContent: "S-Rank Member" },
    { name: ["GVN.Chaos", "Medassin", "PrinzEugenz", "QDuyPFIEV", "XDarKraDx", "YUGI-OH510", "ZzZMineIsMyLifeZzZ"], class: "tag-userTag-Legend", textContent: "Legendary Member" },
    { name: ["Perfectstrong"], class: "tag-userTag-Editor", textContent: "Editor of Sonako" },
    { name: ["Perfectstrong", "A.Homura"], class: "tag-userTag-Legion", textContent: "Legion of Honour" },
];

var userNameElement = document.querySelector('h1[itemprop="name"]');
var userName = userNameElement.textContent;

for (var user of userList) {
    if (user.name.includes(userName)) {
        var newSpan = document.createElement("span");
        newSpan.classList.add("user-identity-header__tag", user.class);
        newSpan.textContent = user.textContent;
        userNameElement.parentNode.insertBefore(newSpan, userNameElement.parentElement.querySelector(".user-identity-header__actions"));
    }
}

if (userName === "Dai ca superman") {
    var firstSpan = userNameElement.nextElementSibling;


    firstSpan.classList.add("tag-userTag-bureaucrat");


    var adminSpan = firstSpan.nextElementSibling;
    adminSpan.textContent = "Admin";
    adminSpan.classList.add("tag-userTag-Admin");
}
if (userName === "Vnsnas") {
    var firstSpan = userNameElement.nextElementSibling;
    firstSpan.textContent = "Admin";
    firstSpan.classList.add("tag-userTag-Admin");
} else if (userName === "Sonako.Sozuoka") {
    var firstSpan = userNameElement.nextElementSibling;
    firstSpan.textContent = "Admin";
    firstSpan.classList.add("tag-userTag-Admin");
} else if (userName === "Maththunder") {
    var firstSpan = userNameElement.nextElementSibling;
    firstSpan.textContent = "Admin";
    firstSpan.classList.add("tag-userTag-Admin");
} else if (userName === "XDarKraDx") {
    var firstSpan = userNameElement.nextElementSibling;
    firstSpan.textContent = "Admin";
    firstSpan.classList.add("tag-userTag-Admin");
} else if (userName === "You got Fio") {
    var firstSpan = userNameElement.nextElementSibling;
    firstSpan.textContent = "Admin";
    firstSpan.classList.add("tag-userTag-Admin");
}