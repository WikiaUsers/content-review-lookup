/*********************************************************\
    Funktion ändert Hintergrundbild
\*********************************************************/ 
function ChangeHintergrund(NeuerHintergrund)
{
  if (NeuerHintergrund != null)
  {
    switch(wgCanonicalNamespace)
    {          
      case "Buch":   BG_BUCH   = NeuerHintergrund; break;
      case "Spiele": BG_SPIELE = NeuerHintergrund; break;
      case "Comic":  BG_COMIC  = NeuerHintergrund; break;
      default:       BG_TV     = NeuerHintergrund; break;
    }
  }
  var b = document.getElementsByTagName('body');
  for ( all=0; all<b.length; all++ )
  {
    // HINTERGRUNDBILD (Individuell - fixiert (man sieht es immer) )
    if (document.getElementById("Wikia-Hintergrund-Bild") != null)
    {
      b[all].style.backgroundImage ="url("+document.getElementById("Wikia-Hintergrund-Bild").className+")";
      b[all].style.backgroundAttachment = "fixed";
    }
    // HINTERGRUNDBILD (Individuell - scrollt mit (man kann es hoch und runter scrollen) )
    else if (document.getElementById("Wikia-Hintergrund-Bild-scroll") != null)
    {
      b[all].style.backgroundImage ="url("+document.getElementById("Wikia-Hintergrund-Bild-scroll").className+")";
      b[all].style.backgroundAttachment = "scroll";
    }
    // HINTERGRUNDBILD (Allgemein - Standardbild)
    else
    {
    b[all].style.backgroundAttachment = "scroll";
      switch(wgCanonicalNamespace)
      {          
        case "Buch":
          switch(BG_BUCH)
          {
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/8a/Hintergrund_Atlanta.jpg)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/c/c0/Hintergrundbild_S3.jpg)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/9/9d/BG-Standard.jpg)";
              b[all].style.backgroundAttachment = "fixed";
              break;       
          }
          break;
 
        case "Spiele":
          b[all].style.backgroundAttachment = "fixed";
          switch(BG_SPIELE)
          {
            case "6":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/b/b2/Spiele_2.jpg)";
              break;       
            case "5":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/2/29/Spiele_1.jpg)";
              break;       
            case "4":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/1/1b/Spiele_1b.jpg)";
              break;       
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/a/a3/Spiele_2b.jpg)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/3/3b/Spiele_4b.jpg)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/f/f1/Spiele_3b.jpg)";
              break;       
          }
          break;
 
        case "Comic":
          b[all].style.backgroundAttachment = "fixed";
          switch(BG_COMIC)
          {
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/5/50/Motiv_3.jpg)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/85/Hintergrund_Comic_1.jpg)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/3/35/Hintergrund_Comic_2.jpg)";
              break;       
          }
          break;
 
        case "TV":
        default:
          switch(BG_TV)
          {
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/8a/Hintergrund_Atlanta.jpg)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/c/c0/Hintergrundbild_S3.jpg)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/9/9d/BG-Standard.jpg)";
              b[all].style.backgroundAttachment = "fixed";
              break;       
          }
          break;
      }
    }
  }
}