//Скрипт выводит факты из массива в случайном порядке так, чтобы один факт не выводился два раза подряд.
var RandomFacts = ['Fact 1', 'Fact 2', 'Fact 3', 'Fact 4', 'Fact 5', 'Fact 6', 'Fact 7', 'Fact 8', 'Fact 9', 'Fact 10', 'Fact 11'];
var FactResult;
var ResultText = '';
var CountOfFacts = 5;
for (var i = 1; i <= CountOfFacts; i++) {
    FactResult = Math.floor(Math.random() * RandomFacts.length);
    ResultText = ResultText + RandomFacts[FactResult] + '<br />';
    RandomFacts.splice(FactResult, 1);
}
$('<span>' + ResultText + '</span>').appendTo('.RandomFactModule');