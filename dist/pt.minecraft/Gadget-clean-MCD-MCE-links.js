if (mw.config.get('wgAction') == 'edit') {
  const regex = /(?<!<gallery.+(?<!<\/gallery>[^<]*))\[\[(MCD|mcd|Dungeons|dungeons|Minecraft Dungeons|MCE|mce|Earth|earth|Minecraft Earth|MCL|mcl|Legends|legends|Minecraft Legends):([^\]\|]+)\|\2\]\]/gm;
  const subst = '['+'[$1:$2|]]';
  wpTextbox1.value = wpTextbox1.value.replace(regex, subst);
}