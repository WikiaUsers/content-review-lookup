window.onload = function () {
/* Заглавная | навигация */
$('#image-characters').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Персонажи'    
});

$('#image-bosses').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Категория:Боссы'    
});

$('#image-items').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Предметы'    
});

$('#image-badges').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Значки'    
});

$('#image-effects').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Баффы_и_дебаффы'    
});

$('#image-achievements').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Достижения'    
});

$('#image-areas').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Зоны'    
});

$('#image-locations').on('click', function() {
    location.href = 'https://rabi-ribi.fandom.com/ru/wiki/Локации'    
});

    
/* API-цены */
    /* Steam */
    function pricesGetSteam() {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails",
        data: {
            appids: "400910",
            l: "russian",
            cc: "ru"
        },
        type: "GET",
        crossdomain: true
    }).done(
        function (data) {
            var SteamPriceHolder = document.getElementById("rbrbw-price-steam");
            var SteamPriceData = data["400910"].data.price_overview.final/100 + " руб.";
            var SteamPriceDiscount;
            SteamPriceHolder.innerHTML = SteamPriceData;
        });
    }
    
    /* PS4 */
    function pricesGetPs4() {
    $.ajax({
        url: "https://store.playstation.com/store/api/chihiro/00_09_000/container/ru/ru/999/EP4293-CUSA08233_00-RABIRIBIPS400100",
        data: { topCategory: "downloadable_game" },
        type: "GET",
        crossdomain: true
    }).done(
        function (data) {
            var ps4PriceHolder = document.getElementById('rbrbw-price-ps4');
            var ps4PriceData;
            var ps4PriceDiscount;
            var ps4Rewards = data.default_sku.rewards[0];
            
            function priceFormat(price) {
                return price.split(' ')[1].replace(".", "")
            }

            if (ps4Rewards) {
                ps4PriceDiscount = ps4Rewards.discount;
                ps4PriceData = priceFormat(ps4Rewards.display_price) + " (Скидка: " + ps4PriceDiscount + "%)";
            } else {
                ps4PriceData = priceFormat(data.default_sku.display_price) + " руб.";
            }
            ps4PriceHolder.innerHTML = ps4PriceData;
        });
    }

/* Функции */
    pricesGetSteam();
    pricesGetPs4();
};