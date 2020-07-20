<table style="text-align: center; border-collapse: collapse;">
    <tr>
        <td><label for="difficulty">Difficulty:</label></td>
        <td><input type="number" id="difficulty" style="text-align: right; width: 50px;"></input></td>
    </tr>
    <tr>
        <td><label for="goods">Goods:</label></td>
        <td><input type="number" id="goods" value="0" style="text-align: right; width: 50px;"></input></td>
    </tr>
    <tr>
        <td><label for="averages">Averages:</label></td>
        <td><input type="number" id="averages" value="0" style="text-align: right; width: 50px;"></input></td>
    </tr>
    <tr>
        <td><label for="misses">Misses:</label></td>
        <td><input type="number" id="misses" value="0" style="text-align: right; width: 50px;"></input></td>
    </tr>
    <tr>
        <td><label for="boos">Boos:</label></td>
        <td><input type="number" id="boos" value="0" style="text-align: right; width: 50px;"></input></td>
    </tr>
    <tr>
        <td style="text-align: left;"><button type="button" id="calc-button" onClick="calculate()" style="font-weight: bold;">Calculate</button></td>
    </tr>
    <tr>
        <td><label>AAA Equivalent:</label></td>
    </tr>
    <tr>
        <td><label id="result"></label></td>
    </tr>

</table>

<script>
    window.onload = function() {
        importArticle({ type: "script", article: "MediaWiki:AAAEquivalentCalculator.js" });
    };
</script>