/**
    🙝 Super Epic Boss Dialogue js That Took 2 Novice Coders to Even Figure Out
                                                                                **/
$('.BossDialogueBefore').click(function() {
  $(this).closest(".BossDialogueBefore").toggleClass('uncollapse');
  $(this).next("#BeforeCollapse").toggleClass('uncollapse');
});

$('.BossDialogueAfter').click(function() {
  $(this).closest(".BossDialogueAfter").toggleClass('uncollapse');
  $(this).next("#AfterCollapse").toggleClass('uncollapse');
});