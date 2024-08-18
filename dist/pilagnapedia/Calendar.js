       $parser->mOutput->mCacheTime = -1;
       $argv = array();
       foreach (func_get_args() as $arg) if (!is_object($arg)) {
               if (preg_match('/^(.+?)\\s*=\\s*(.+)$/',$arg,$match)) $argv[$match[1]]=$match[2];
               }
       if (isset($argv['format']))    $f = $argv['format']; else $f = '%e %B %Y';
       if (isset($argv['dayformat'])) $df = $argv['dayformat']; else $df = false;
       if (isset($argv['title']))     $p = $argv['title'].'/'; else $p = ;
       if (isset($argv['query']))     $q = $argv['query'].'&action=edit'; else $q = 'action=edit';
       if (isset($argv['year']))      $y = $argv['year']; else $y = date('Y');
       if (isset($argv['month'])) {
               $m = $argv['month'];
               return wfRenderMonth(strftime('%m',strtotime("$y-$m-01")),$y,$p,$q,$f,$df);
               } else $m = 1;
       $table = "{| class=\"calendar\"\n";
       for ($rows = 3; $rows--; $table .= "|-\n")
               for ($cols = 0; $cols < 4; $cols++)
                       $table .= '|'.wfRenderMonth($m++,$y,$p,$q,$f,$df)."\n";
       return "$table\n|}\n";
       }