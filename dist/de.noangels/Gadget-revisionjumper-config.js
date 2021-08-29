 // <nowiki>
 
 switch (wgUserLanguage){
   case 'de':
   case 'de-at':
   case 'de-ch':
   case 'de-formal':
 
   var configrevisionjumper = new Array('Änderungen seit meiner letzten Bearbeitung', 
                                        'Zum vorletzten Bearbeiter',
                                        'frühere Versionen',
                                        'spätere Versionen',
                                        'Version(en) zurück',
                                        'Version(en) vorwärts',
                                        'Jahr(e)',
                                        'Monat(e)',
                                        'Tag(e)',
                                        'Stunde(n)',
                                        'zurück',    // 10
                                        'vorwärts',
                                        'prompt Version(en)',
                                        'prompt um-Zeit',
                                        'prompt auf-Zeit',
                                        'erste Version',
                                        'letzte Version',
                                        'Um wie viele Versionen springen?',
                                        'Um welche Zeit soll gesprungen werden? [a = Jahr; m = Monat; d = Tag; h = Stunde; alles optional -> „1h“ allein springt somit um eine Stunde in die gewünschte Richtung]',
                                        'Auf welche Zeit soll gesprungen werden? [Syntax: Jahr-Monat-Tag Stunde:Minute; es geht auch nur Jahr-Monat-Tag -> 2007-12-31 springt also auf die Version, die um 00:00 Uhr an Silvester angezeigt wurde]'); // 19
   break;
 
   case 'pt':
   case 'pt-br':
 
   var configrevisionjumper = new Array('alterações desde a minha última edição',
                                        'penúltimo editor',
                                        'edições anteriores',
                                        'edições posteriores',
                                        'revisão(ões) anteriores',
                                        'revisão(ões) posteriores',
                                        'ano(s)',
                                        'mês(es)',
                                        'dia(s)',
                                        'hora(s)',
                                        'retroceder',    // 10
                                        'avançar',
                                        'solicitar revisão(ões)',
                                        'saltar no tempo',
                                        'saltar para o tempo',
                                        'primeira revisão',
                                        'revisão atual',
                                        'Quantas revisões devem ser puladas?',
                                        'Que período deve ser pulado? [a = ano; m = mês; d = dia; h = hora; todos os itens são opcionais -> „1h“ apenas causa um salto de uma hora na direção selecionada]',
                                        "Para que instante de tempo você quer saltar? [sintaxe: ano-mês-dia hora:minuto; ano-mês-dia também é possível -> então 2007-12-31 mostra a revisão que estava disponível na véspera de ano novo às 00:00h]"); // 19
   break;
 
   default:
 
   var configrevisionjumper = new Array('changes since my last edit',
                                        'next-to-last editor',
                                        'former revisions',
                                        'later revisions',
                                        'revision(s) backward',
                                        'revision(s) forward',
                                        'year(s)',
                                        'month(s)',
                                        'day(s)',
                                        'hour(s)',
                                        'backward',    // 10
                                        'forward',
                                        'prompt revision(s)',
                                        'skip over time',
                                        'skip to time',
                                        'first revision',
                                        'current revision',
                                        'How many revisions to be skipped?',
                                        'What period is to be skipped? [a = year; m = month; d = day; h = hour; all items optional -> „1h“ only causes a jump of 1 hour in the selected direction]',
                                        "What time is to be skipped to? [syntax: year-month-day hour:minute; year-month-day possible as well -> thus 2007-12-31 shows the revision that has been available on New Year's Eve at 00:00]"); // 19
 }
 
 // </nowiki>