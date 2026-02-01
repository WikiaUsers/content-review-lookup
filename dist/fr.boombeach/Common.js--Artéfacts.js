/* Code pour injecter les sélecteurs de Gravures */
$(function() {
    // Sélecteur Adrénaline
    $('#spanInputAdrenaline').html(`
        <select id="IDInputAdrenaline" class="bonusInput">
            <option value="0" selected>Aucun</option>
            <option value="5">Niveau 1</option>
            <option value="6">Niveau 2</option>
            <option value="7">Niveau 3</option>
            <option value="8">Niveau 4</option>
            <option value="9">Niveau 5</option>
            <option value="10">Niveau 6</option>
            <option value="11">Niveau 7</option>
            <option value="12">Niveau 8</option>
            <option value="13">Niveau 9</option>
            <option value="14">Niveau 10</option>
            <option value="15">Niveau 11</option>
            <option value="16">Niveau 12</option>
            <option value="17">Niveau 13</option>
            <option value="18">Niveau 14</option>
            <option value="19">Niveau 15</option>
            <option value="20">Niveau 16</option>
        </select>
    `);

    // Sélecteur Ordre de bataille
    $('#spanInputOrdreBataille').html(`
        <select id="IDInputOrdreBataille" class="bonusInput">
            <option value="0" selected>Aucun</option>
            <option value="1">Niveau 1</option>
            <option value="2">Niveau 2</option>
            <option value="3">Niveau 3</option>
            <option value="4">Niveau 4</option>
            <option value="5">Niveau 5</option>
            <option value="6">Niveau 6</option>
        </select>
    `);

    // Sélecteur Artilleur
    $('#spanInputArtilleur').html(`
        <select id="IDInputArtilleur" class="bonusInput">
            <option value="0" selected>Aucun</option>
            <option value="10">Niveau 1</option>
            <option value="11">Niveau 2</option>
            <option value="12">Niveau 3</option>
            <option value="13">Niveau 4</option>
            <option value="14">Niveau 5</option>
            <option value="15">Niveau 6</option>
            <option value="16">Niveau 7</option>
            <option value="17">Niveau 8</option>
            <option value="18">Niveau 9</option>
            <option value="19">Niveau 10</option>
            <option value="20">Niveau 11</option>
            <option value="21">Niveau 12</option>
            <option value="22">Niveau 13</option>
            <option value="23">Niveau 14</option>
            <option value="24">Niveau 15</option>
            <option value="25">Niveau 16</option>
            <option value="26">Niveau 17</option>
            <option value="27">Niveau 18</option>
            <option value="28">Niveau 19</option>
            <option value="29">Niveau 20</option>
            <option value="30">Niveau 21</option>
        </select>
    `);
});