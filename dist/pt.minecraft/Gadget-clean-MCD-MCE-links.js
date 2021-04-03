if (mw.config.get('wgAction') == 'edit') {
  const regex = /(?<!<gallery.+(?<!<\/gallery>[^<]*))\[\[(MCD|mcd|Dungeons|dungeons|Minecraft Dungeons|MCE|mce|Earth|earth|Minecraft Earth):([^\]\|]+)\|\2\]\]/gm;
  const subst = '['+'[$1:$2|]]';
  wpTextbox1.value = wpTextbox1.value.replace(regex, subst);
}