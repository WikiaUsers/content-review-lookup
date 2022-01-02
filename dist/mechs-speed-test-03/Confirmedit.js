require_once "$IP/extensions/ConfirmEdit/QuestyCaptcha.php";
$wgCaptchaQuestions = array (
        '本Wiki的全稱是？' => 'chain chronicle wiki',
        "What is this wiki's name?" => "cc wiki",
        'Please write the game name here, "chain chronicle", here:' => 'chain chronicle',
        'Type the code word, "96296", here:' => '96296',
        'Which animal? <img src="https://vignette.wikia.nocookie.net/chain-chronicle/images/a/ab/ホーク.jpg" />' => 'pig',
        'Fill in the blank: Blue is a ...' => array( 'colour', 'color' ),
);