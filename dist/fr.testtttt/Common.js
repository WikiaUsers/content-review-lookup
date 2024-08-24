$(document).ready(function() {
    var totalMinutes = 300; // Total de secondes dans 5 minutes
    var timer = totalMinutes; // Timer initialis� � la dur�e totale
    var progressValue = 0; // Valeur de progression initiale
    var maxProgressValue = 355; // Valeur maximale pour progressValue

    // Fonction pour d�marrer le compte � rebours et g�rer la progression
    function startCountdown(duration, display) {
        var progressBar = $('#progress-bar');

        setInterval(function () {
            var minutes = parseInt(timer / 60, 10);
            var seconds = parseInt(timer % 60, 10);

            // Formater le temps restant en "M:S" avec des z�ros
            var formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            display.text(formattedTime);

            if (--timer < 0) {
                timer = totalMinutes; // R�initialiser le timer � la dur�e totale

                // Augmenter la valeur de progression de 1 jusqu'au maximum
                if (progressValue < maxProgressValue) {
                    progressValue++;
                    $('#progress-value').text(progressValue);
                }

                // Mettre � jour la barre de progression en pourcentage
                var progress = (progressValue / maxProgressValue) * 100;
                progressBar.css('width', progress + '%');
            }
        }, 1000); // Appeler la fonction toutes les 1000 millisecondes (1 seconde)
    }

    // D�marrer le compte � rebours lorsque le DOM est charg�
    var display = $('#countdown');
    if (display.length) {
        startCountdown(totalMinutes, display);
    }
});