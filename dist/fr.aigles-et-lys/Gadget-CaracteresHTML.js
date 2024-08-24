/**
 * HTML
 * 
 * Ajoute les tags et entités HTML courants dans la liste des caractères spéciaux
 * 
 * Auteur : Zelda
 * {{Projet:JavaScript/Script|caracteres/HTML}}
 */

addOnloadHook(function() {
  if (wgAction == 'edit' || wgAction == 'submit') {
     addSpecialCharset("HTML", "&lt;br/&gt; &lt;code&gt;+&lt;/code&gt; &lt;div&gt;+&lt;/div&gt; &lt;p&gt;+&lt;/p&gt; &lt;pre&gt;+&lt;/pre&gt; &lt;q&gt;+&lt;/q&gt; &lt;tt&gt;+&lt;/tt&gt; &lt;s&gt;+&lt;/s&gt; &lt;sub&gt;+&lt;/sub&gt; &lt;sup&gt;+&lt;/sup&gt; &lt;span&gt;+&lt;/span&gt; &amp;nbsp;");
 }
});