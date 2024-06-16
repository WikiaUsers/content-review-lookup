$(document).ready(function() {
        var inputBox = document.createElement("div");
        var input = document.createElement("input");
        input.type = "text"; 
        input.style.display = "inline-block";
        var textParagraph = document.createElement("p");
        textParagraph.innerHTML = "请输入战斗书页ID：";
        textParagraph.style.display = "inline-block";
        textParagraph.id = "textParagraph";
        var getAnswer = document.createElement("button");
        getAnswer.innerHTML = "输出";
        getAnswer.addEventListener("click", function() {
            var ID = input.value; 
            if (ID) {
                combatdice(ID); 
            }
        });
        inputBox.appendChild(textParagraph);
        inputBox.appendChild(input);
        inputBox.appendChild(getAnswer);
        document.getElementById("combotpage-input").appendChild(inputBox);
});

function combatdice(ID) {
    var ID = parseInt(ID);

    $.ajax({
        url: "/zh/api.php",
        data: {
            action: 'parse',
            text: "{{#invoke:CombatCardDice|getData|" + ID + "}}",
            format: 'json'
        },
        dataType: 'json',
        success: function (data) {
            var templateContent = data.parse.text['*'];

            var outputDiv = document.getElementById('combotpage-output');
            if (outputDiv) {
                outputDiv.innerHTML = templateContent;
            }
        },
    });
}
$(document).ready(function() {
            var loadingDiv = document.getElementById('combotpage-loading');
            loadingDiv.style.display = 'none';
});