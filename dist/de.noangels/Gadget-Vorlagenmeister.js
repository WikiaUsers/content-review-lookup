/**
* Project:  Vorlagen-Meister, Version: 0.4.3beta, Date: 2009-10-17
* Copyright (C) 2007-2009 [[de:Benutzer:Revvar]]
* Released under the GPL license version 2
* http://www.gnu.org/copyleft/gpl.html
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty
* of MERCHANTABILITY or FITNESS FOR A PARTICULAR * PURPOSE.
* See the GNU General Public License for more details.
*/

//## File: tm_locals_de.js ####################################

/*
* Lokalisierung "Deutsch" des Vorlagen-Meister
* Copyright (C) 2007-2009 [[de:Benutzer:Revvar]] <revvar@gmx.de>
* Released under the GPL license version 2
* http://www.gnu.org/copyleft/gpl.html
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty
* of MERCHANTABILITY or FITNESS FOR A PARTICULAR * PURPOSE.
* See the GNU General Public License for more details.
*/

function tm_get_locals()
{
	var locals = new Object();
	locals["User"] = "Benutzer";
	locals["Template"] = "Vorlage";
	locals["Submit"] = "Übernehmen";
	locals["Cancel"] = "Abbrechen";
	locals["CreateXML"] = "XML-Beschreibung generieren...";
	locals["Progress"] = "wird geladen";
	locals["sys_load_error"] = "Konnte Vorlage \"$1\" nicht laden.";
	locals["sys_no_usage_section"] = "Keine XML-Beschreibung in der Vorlage \"$1\" gefunden.";
	locals["sys_no_such_template"] = "Keine Vorlage mit dem Namen \"$1\" gefunden.";
	locals["sys_no_help"] = "(Leider keine Hilfe vorhanden.)";
	locals["sys_invalid_condition"] = "XML-Beschreibung enthält einen ungültigen Condition-Parameter: \"$1\".";
	locals["sys_invalid_value"] = "Ungültiger Wert";
	locals["sys_enter_value"] = "Bitte geben sie einen Wert ein!";
	locals["sys_enter_valid_value"] = "Bitte geben sie einen gültigen Wert ein!";
	locals["sys_please_correct_errors"] = "Es sind Fehler aufgetreten. Bitte korrigieren Sie die rot markierten Felder.";
	locals["sys_question_repeat_http_request"] = "Wollen sie die Anfrage wiederholen=[Ok] oder [Abbrechen] ?";
	locals["sys_question_wait_for_http_response"] = "Der Server benötigt nun schon länger als $1 Sekunden. Wollen sie warten=[Ok]?";
	locals["sys_unknown_parameter"] = "Der Vorlagentext enthält folgende unbekannte Parameter: \"$1\". Gründe: Schreibfehler, z.B. Groß- bzw. Kleinschreibung wurde nicht beachtet, oder die Beschreibung der Vorlage ist unvollständig.";
	locals["sys_xml_generated_summary"] = "Automatisch erzeugt mit dem [[Wikipedia:Helferlein/Vorlagen-Meister|Vorlagen-Meister]]";
	locals["w2t plugin selection"] = "Bitte wählen sie eine Vorlage, welche mit dem ausgewählten Text ausgefüllt werden soll:";
	return locals;
}


//## File: tm_formular.xsl.js #################################

function get_xsl_dom() {
return parseXML(
'<?xml version="1.0" encoding="utf-8" ?>\n'+
'<!--\n'+
'* Copyright (C) 2007-2009 [[de:Benutzer:Revvar]] <revvar@gmx.de>\n'+
'* Released under the GPL license\n'+
'* http://www.gnu.org/copyleft/gpl.html\n'+
'-->\n'+
'<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >\n'+
'	<xsl:output method = "html" />\n'+
'	<xsl:param name="locals_submit" />\n'+
'	<xsl:param name="locals_cancel" />\n'+
'	<xsl:param name="locals_createxml" />\n'+
'	<xsl:param name="locals_template" />\n'+
'	<xsl:param name="locals_nohelp" />\n'+
'	<xsl:param name="locals_version" />\n'+
'	<xsl:template match="/TemplateUsage">\n'+
'\n'+
'		<!-- create basic gui -->\n'+
'		<div id="tm_main_frame" class="tm_main_frame" tm_output="{@output}" tm_max_value_indentation="{@max_value_indentation}">\n'+
'		<div id="tm_header" class="tm_header">\n'+
'				<span class="tm_template"><xsl:choose><xsl:when test="$locals_template"><xsl:value-of select="$locals_template" /></xsl:when><xsl:otherwise>locals_template</xsl:otherwise></xsl:choose>: </span>\n'+
'				<input type="text" id="tm_template" class="tm_template" size="32" disabled="true"/>\n'+
'				<span class="tm_version"><xsl:choose><xsl:when test="$locals_version"><xsl:value-of select="$locals_version" /></xsl:when><xsl:otherwise>locals_version</xsl:otherwise></xsl:choose></span>\n'+
'		</div>\n'+
'		<div id="tm_group_selector" class="tm_group_selector">\n'+
'			<xsl:apply-templates mode="group_selector" />\n'+
'		</div>\n'+
'		<div id= "tm_form" class="tm_form">\n'+
'		<!-- create formular -->\n'+
'		<form>\n'+
'		<xsl:for-each select="Group">\n'+
'			<div id="tm_group_{position()}" class="tm_group" tabindex="{4000+position()}">\n'+
'				<xsl:choose>\n'+
'					<xsl:when test="@showempty=\'false\'">\n'+
'						<xsl:attribute name="tm_showempty">false</xsl:attribute>\n'+
'					</xsl:when>\n'+
'					<xsl:otherwise>\n'+
'						<xsl:attribute name="tm_showempty">true</xsl:attribute>\n'+
'					</xsl:otherwise>\n'+
'				</xsl:choose>\n'+
'				<xsl:if test="@name">\n'+
'					<h3 class="tm_group_heading"  tm_name="tm_formelem"><xsl:value-of select="@name"/></h3>\n'+
'				</xsl:if>\n'+
'				<xsl:for-each select="Parameter">\n'+
'					<div class="tm_formelem"><table class="tm_table">\n'+
'						<xsl:if test="@length=\'max\'">\n'+
'							<xsl:attribute name="class">tm_table tm_table_max</xsl:attribute>\n'+
'						</xsl:if>\n'+
'						<xsl:choose><xsl:when test="count(Value)=1">\n'+
'							<input type="checkbox" tm_name="tm_formelem" value="{Value}">\n'+
'								<xsl:call-template name="SetBasicAttributes" />\n'+
'							</input>\n'+
'							<span><xsl:choose>\n'+
'								<xsl:when test="@label">\n'+
'									<xsl:value-of select="@label"/>\n'+
'								</xsl:when>\n'+
'								<xsl:otherwise>\n'+
'									<xsl:value-of select="@name"/>\n'+
'								</xsl:otherwise>\n'+
'							</xsl:choose></span>\n'+
'						</xsl:when><xsl:otherwise>\n'+
'							<tr class="tm_tr"><td class="tm_td_label"><span>\n'+
'								<xsl:choose>\n'+
'									<xsl:when test="@null=\'false\'">\n'+
'										<xsl:attribute name="class">tm_param</xsl:attribute>\n'+
'									</xsl:when>\n'+
'									<xsl:otherwise>\n'+
'										<xsl:attribute name="class">tm_opt_param</xsl:attribute>\n'+
'									</xsl:otherwise>\n'+
'								</xsl:choose>\n'+
'								<xsl:choose>\n'+
'									<xsl:when test="@label">\n'+
'										<xsl:value-of select="@label"/>:\n'+
'									</xsl:when>\n'+
'									<xsl:otherwise>\n'+
'										<xsl:value-of select="@name"/>:\n'+
'									</xsl:otherwise>\n'+
'								</xsl:choose>\n'+
'							</span></td><td class="tm_td_content">\n'+
'							<xsl:choose><xsl:when test="Value">\n'+
'								<select tm_name="tm_formelem">\n'+
'									<xsl:call-template name="SetBasicAttributes" />\n'+
'									<xsl:if test="not (@null=\'false\')">\n'+
'										<option />\n'+
'									</xsl:if>\n'+
'									<xsl:for-each select="Value">\n'+
'										<option value="{text()}">\n'+
'											<xsl:attribute name="id">tm_form_<xsl:value-of select="@name"/>_<xsl:value-of select="position()"/></xsl:attribute>\n'+
'											<xsl:choose><xsl:when test="@label">\n'+
'											<xsl:value-of select="@label" />\n'+
'											</xsl:when>\n'+
'											<xsl:otherwise>\n'+
'												<xsl:value-of select="text()" />\n'+
'											</xsl:otherwise></xsl:choose>\n'+
'											<xsl:if test="position()=0">\n'+
'												<xsl:attribute name="selected" />\n'+
'											</xsl:if>\n'+
'										</option>\n'+
'									</xsl:for-each>\n'+
'								</select>\n'+
'							</xsl:when><xsl:when test="@height">\n'+
'								<textarea tm_name="tm_formelem" rows="{@height}">\n'+
'									<xsl:call-template name="SetBasicAttributes" />\n'+
'									<xsl:choose><xsl:when test="@length=\'max\'">\n'+
'										<xsl:attribute name="class">tm_textarea tm_textarea_max</xsl:attribute>\n'+
'									</xsl:when><xsl:otherwise>\n'+
'										<xsl:attribute name="class">tm_textarea tm_textarea_auto</xsl:attribute>\n'+
'										<xsl:attribute name="cols">\n'+
'											<xsl:choose><xsl:when test="@length">\n'+
'												<xsl:value-of select="@length" />\n'+
'											</xsl:when>\n'+
'											<xsl:otherwise>20</xsl:otherwise></xsl:choose>\n'+
'										</xsl:attribute>\n'+
'									</xsl:otherwise></xsl:choose>\n'+
'									<xsl:value-of select="Default" />\n'+
'								</textarea>\n'+
'							</xsl:when><xsl:otherwise>\n'+
'								<input type="text" tm_name="tm_formelem" value="{Default}" class="tm_input">\n'+
'									<xsl:call-template name="SetBasicAttributes" />\n'+
'									<xsl:choose><xsl:when test="@length=\'max\'">\n'+
'										<xsl:attribute name="class">tm_input tm_input_max</xsl:attribute>\n'+
'									</xsl:when><xsl:otherwise>\n'+
'										<xsl:attribute name="size">\n'+
'											<xsl:choose><xsl:when test="@length">\n'+
'												<xsl:value-of select="@length" />\n'+
'											</xsl:when>\n'+
'											<xsl:otherwise>20</xsl:otherwise></xsl:choose>\n'+
'										</xsl:attribute>\n'+
'									</xsl:otherwise></xsl:choose>\n'+
'								</input>\n'+
'							</xsl:otherwise></xsl:choose>\n'+
'							</td></tr>\n'+
'						</xsl:otherwise></xsl:choose></table>\n'+
'					</div>\n'+
'				</xsl:for-each>\n'+
'			</div>\n'+
'		</xsl:for-each>\n'+
'		</form>\n'+
'		<!-- end formular creation -->\n'+
'		</div> <!-- formular -->\n'+
'		<div id="tm_footer" class="tm_footer">\n'+
'				 <div id="tm_state" class="tm_state">:-)</div>\n'+
'				 <button id="tm_submit" class="tm_button" tabindex="5000" disabled="true"><xsl:choose><xsl:when test="$locals_submit"><xsl:value-of select="$locals_submit" /></xsl:when><xsl:otherwise>locals_submit</xsl:otherwise></xsl:choose></button>\n'+
'				 <button id="tm_cancel" class="tm_button" tabindex="5001" disabled="true"><xsl:choose><xsl:when test="$locals_cancel"><xsl:value-of select="$locals_cancel" /></xsl:when><xsl:otherwise>locals_cancel</xsl:otherwise></xsl:choose></button>\n'+
'				 <button id="tm_createxml" class="tm_button" tabindex="5002" disabled="true" style="visibility:hidden"><xsl:choose><xsl:when test="$locals_createxml"><xsl:value-of select="$locals_createxml" /></xsl:when><xsl:otherwise>locals_createxml</xsl:otherwise></xsl:choose></button>\n'+
'		</div>\n'+
'		</div> <!-- main frame -->\n'+
'\n'+
'	</xsl:template>\n'+
'	\n'+
'	<xsl:template match="Group" mode="group_selector">\n'+
'		<xsl:if test="@name">\n'+
'			<a id="tm_group_select_{position() div 2}" class="tm_button tm_selector tm_group_selector"><xsl:value-of select="@name"/></a>\n'+
'		</xsl:if>\n'+
'	</xsl:template>\n'+
'	\n'+
'	<xsl:template name="SetBasicAttributes">\n'+
'		<xsl:attribute name="id">tm_form_<xsl:value-of select="@name"/></xsl:attribute>\n'+
'		<xsl:attribute name="title"><xsl:choose>\n'+
'			<xsl:when test="Help">\n'+
'				<xsl:value-of select="Help"/>\n'+
'			</xsl:when>\n'+
'			<xsl:otherwise><xsl:choose><xsl:when test="$locals_nohelp"><xsl:value-of select="$locals_nohelp" /></xsl:when><xsl:otherwise>locals_nohelp</xsl:otherwise></xsl:choose></xsl:otherwise>\n'+
'		</xsl:choose>	</xsl:attribute>\n'+
'		<xsl:attribute name="tm_condition"><xsl:value-of select="Condition"/></xsl:attribute>\n'+
'		<xsl:attribute name="tabindex"><xsl:value-of select="20+count(preceding::*)"/></xsl:attribute>\n'+
'		<xsl:choose>\n'+
'			<xsl:when test="@null=\'false\'">\n'+
'				<xsl:attribute name="tm_null">false</xsl:attribute>\n'+
'			</xsl:when>\n'+
'			<xsl:otherwise>\n'+
'				<xsl:attribute name="tm_null">true</xsl:attribute>\n'+
'			</xsl:otherwise>\n'+
'		</xsl:choose>\n'+
'		<xsl:choose>\n'+
'			<xsl:when test="@predefined=\'true\'">\n'+
'				<xsl:attribute name="tm_predefined">true</xsl:attribute>\n'+
'			</xsl:when>\n'+
'			<xsl:otherwise>\n'+
'				<xsl:attribute name="tm_predefined">false</xsl:attribute>\n'+
'			</xsl:otherwise>\n'+
'		</xsl:choose>\n'+
'		<xsl:attribute name="tm_error">false</xsl:attribute>\n'+
'	</xsl:template>\n'+
'</xsl:stylesheet>'
);
}

//## File: vorlagenmeister.js #################################

/*
* Vorlagen-Meister, Version: 0.4.3beta, Date: 2009-10-17
* Copyright (C) 2007-2009 [[de:Benutzer:Revvar]] <revvar@gmx.de>
* Released under the GPL license version 2
* http://www.gnu.org/copyleft/gpl.html
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty
* of MERCHANTABILITY or FITNESS FOR A PARTICULAR * PURPOSE.
* See the GNU General Public License for more details.
*/

/* Plugin objects */
var TM_PluginList = new Array(); //< list with the plugins

/**
 Abstract PlugIn objects, to announce a plugin to the TemplateMaster
*/
function TM_Plugin()
{
	this.opGetName = null; //< returns plugin name for the user as String
	this.opGetType = null; //< returns plugin type as String
	this.opGetTemplate = null;  //< returns the template name the PlugIn is written for as String
}

/**
 Abstract object for a Wiki2Template plugin.
*/
function TM_P_Wiki2Template()
{
	var self=this;
	TM_Plugin.call(this);

	var type = "Wiki2Template";
	this.opGetType = function() {return type;};

	this.opTransform = function(wiki_text) {
		if (!((wiki_text) && (typeof(wiki_text) == "string") && (wiki_text.length>0))) throw("(TMP_Wiki2Template:contructor) Error: Invalid arguments.");
		return wiki_text;
	}
}
TM_P_Wiki2Template.prototype=new TM_Plugin();

/*END: Plugin objects */

function tm_init() {
	/* check if edit page, otherwise exit*/
	var url=document.location.toString();
	if (url.search(/action=(edit|submit)/g) < 0) return;
	if (document.getElementById("wpTextbox1") == null) return;
	if (document.getElementById("wpSave") == null) return;

	// check if editing xml page from this tool
	if (url.search(/\/XML&tm_xml_content=/g) > 0) {
		var tm_xml_content = decodeURIComponent(url.replace(/^.*\&tm_xml_content=(.*)$/g, "$1"));
		var textbox = document.getElementById('wpTextbox1');
		textbox.value = tm_xml_content;
		return;
	}

	  // oHTTPRequest  globals
	var HTTPTIMEOUT=30000;
	var iRequestID=0;
	var bBreak=false;

	var toolbar = document.getElementById("toolbar");
	if (toolbar == null) {
		var Textbox = document.getElementById("wpTextbox1");
		var toolbar = cNode(null,"div",null, null);
		Textbox.parentNode.insertBefore(toolbar, Textbox);
	}

	var locals = null;
	try {
		locals = tm_get_locals();
	} catch(e) {
		log_message(e.message);
		return;
	}

	// globals
	var VERSION="0.4.2 beta";
	var State = null;
	var Template = new Object();
	var Tm_box = null;
	var act_view = "EB";
	var is_khtml = navigator.vendor == 'KDE' || ( document.childNodes && !document.all && !navigator.taintEnabled );
	var is_ie = !(is_gecko || is_opera || is_safari || is_khtml);
	var Act_input = null;
	var is_xml_generated = false;
	var generated_xml = '';
	var max_value_indentation = 32;

	var vm_button = cNode(null, "div", "VM", {"id":"tm_switch_button","class":"tm_switch_button"});
	addEventListener(vm_button, "click", show);
	if (toolbar.firstChild == null) toolbar.appendChild(vm_button); else toolbar.insertBefore(vm_button, toolbar.firstChild);

	return;

/* shows the template master */
function show()
{
	/* set some globals to there defaults */
	bBreak = false;
	State = null;
	if (document.getElementById("tm_dummy_div") != null) {
		switch_view_to();
		return;
	}

	/* check if cursor within template wikisource and parse it */
	var template_source = null;
	var Template_given = null;
	var Target = new Object();
	var Editbox = document.getElementById("wpTextbox1");
	Target["Editbox"] = Editbox;

	/* get cursor/mark position (browser indendend, depends on wikibits.js) */
	if (is_ie) {
		var marker_start = "####template_master_cursor_marker_start####";
		var marker_end = "####template_master_cursor_marker_end####";
		insertTags(marker_start, marker_end, "");
		Target["start"]  = Editbox.value.search(marker_start);
		Editbox.value = Editbox.value.replace(marker_start,"");
		Target["end"]  = Editbox.value.search(marker_end) - 1;
		Editbox.value = Editbox.value.replace(marker_end,"");
	} else {
		Target["cursor"] = Editbox.selectionStart;
		Target["start"]  = Editbox.selectionStart;
		Target["end"] = Editbox.selectionEnd - 1;
	}

	/* search if cursor within a template */

	/* (1) replace syntax chars within nowiki-tags and html-comments */
	var x_nowiki = /(<nowiki>.*?)[{|}](.*?<\/nowiki>)/g;
	var source = replace_all(Editbox.value, x_nowiki, "$1#$2");
	var x_htmlcomment = /(<!--.*?)[{|}](.*?-->)/g;
	var source = replace_all(Editbox.value, x_htmlcomment, "$1#$2");

	/* (2) create a list of all remaining template tags */
	var tag_list = new Array();
	var depth = 0;
	var x_tag = /(\{\{|\}\})/;
	var tag_pos = -2, new_pos = 0;
	do {
		new_pos = (source.substring(tag_pos + 2)).search(x_tag);
		if (new_pos >= 0) {
			tag_pos += new_pos + 2;
			switch (source.substring(tag_pos, tag_pos + 2)) {
				case "{{": {
					tag_list.push({"type":0, "depth":depth, "position":tag_pos});
					depth++;
				}; break;
				case "}}": {
					depth--;
					tag_list.push({"type":1, "depth":depth, "position":tag_pos});
				};break;
				default: alert("Internal error: Searching template tags failed ("+source.substring(tag_pos, tag_pos + 2)+").");return;
			}
		}
	} while (new_pos >= 0);

	/* (3) find nearest tag pair (same depth) around the cursor position */
	var  start = -1, end = -1, act_depth = 0;
	var cursor_pos = Target["start"] ;
	var cursor_depth = 0;
	/* (a) find the depth at cursor pos */
	for (var i = 0; i < tag_list.length; i++) {
		if (cursor_pos < tag_list[i].position) {
			cursor_depth = tag_list[i].depth;
		} else break;
	}

	/* (b) search */
	for (var i = 0; i < tag_list.length; i++) {
		if (cursor_pos >= tag_list[i].position) {
			if ((0 == tag_list[i].type) && (cursor_depth >= tag_list[i].depth)) {
				start = tag_list[i].position;
				act_depth = tag_list[i].depth;
			}
			if ((start > -1 ) && (1 == tag_list[i].type) && (act_depth == tag_list[i].depth)) start = -1;
		} else break;
	}
	if (start > -1) for (var i = tag_list.length - 1; i > 0 ; i--) {
		if (cursor_pos < tag_list[i].position) {
			if (cursor_depth >= tag_list[i].depth) {
				if ((1 == tag_list[i].type) && (act_depth == tag_list[i].depth)) {
					end = tag_list[i].position;
				}
			}
		} else break;
	}

	/* (4) get template source code without the surounding brackets */
	if ((start>=0) && (end>=0)) {
		template_source = Editbox.value.substring(start + 2, end);
	} else template_source = null;

	/* parse source */
	if (template_source != null) {
		Template_given = parse_template_source(template_source);
		if (Template_given != null) {
			// save new positions only, if template parsed successfull
			Target["start"] = start;
			Target["end"] = end + 1;
		} else template_source = null;
	}

	switch_view_to();
	/* dummy main div */
	Tm_box = cNode(Editbox.parentNode, "div", null, {"id":"tm_dummy_div","style":"position:absolute;z-index:99;left:"+(Editbox.offsetLeft)+"px;top:"+(Editbox.offsetTop)+"px;width:"+(Editbox.offsetWidth)+"px;height:"+(Editbox.offsetHeight)+"px;"+((is_ie)?"overflow-x:hidden;overflow-y:auto;":"overflow:auto;")});

	if ((template_source == null) && (Target["start"] <= Target["end"])) {
		// ask, if the user want to use a Wikisource_To_Template-Plugin
		if ((TM_PluginList) && (TM_PluginList.length)) {
			/* create plugin list */
			var plugins = new Array();
			for (var i = 0; i < TM_PluginList.length; i++) {
				try {
					var name = TM_PluginList[i].opGetName();
					var type = TM_PluginList[i].opGetType();
					if ((type !=null) && (type =="Wiki2Template") && (name != null)) plugins.push(TM_PluginList[i]);
				} catch(e) {
					log_message("Incompatible Plugin: " + e.message);
				}
			}
			if (plugins.length > 0) {
				var Plugin_div = cNode(null, "div", locals["w2t plugin selection"], {"class":"tm_plugin_selector"});
				for (var i = 0; i < plugins.length; i++) {
					var A_plugin = cNode(Plugin_div, "a", plugins[i].opGetName(), {"class":"tm_button tm_v_selector tm_plugin_selector"});
					A_plugin.tm_plugin = plugins[i];
					addEventListener(A_plugin, "click", function(e) {
						var plugin = ((is_ie)?e.srcElement:e.target).tm_plugin;
						if (plugin != null) {
							Template_given = plugin.opTransform(Editbox.value.substring(Target["start"], Target["end"] + 1));
							if (Template_given != null) {
								Plugin_div.parentNode.removeChild(Plugin_div);
								show_template(Tm_box,"none", Template_given, Target);
							}
						} else alert("Internal error: No tm_plugin attribute found.");
					});
				}
				var A_cancel = cNode(Plugin_div, "a", locals["Cancel"], {"class":"tm_button tm_v_selector tm_cancel_button","style":"margin-top:8px !important"});
				addEventListener(A_cancel, "click", function(e) {
					Plugin_div.parentNode.removeChild(Plugin_div);
					show_template(Tm_box,"none", null, Target);
				});
				Tm_box.appendChild(Plugin_div);
			}
/*			log_message(plugins.join(","));
			Template_given = TM_PluginList[0].opTransform(Editbox.value.substring(Target["start"], Target["end"] + 1));*/
		}
	} else {
		/* load given template */
		show_template(Tm_box,"none", Template_given, Target);
	}
	return;
}

/* shows specific template */
function show_template(Root_node, template_name, Template_given, Target)
{
	// check parameter
	if ((Template_given != null) && (Template_given["template_name"] != template_name)) template_name = Template_given["template_name"];

	// create empty formular
	if ((Template_given == null) && (template_name == "none")) {
		var rv = new Object();
// 		rv.responseText='<div id="template_usage">&lt;?xml version="1.0" encoding="utf-8"?&gt;&lt;TemplateUsage&gt;&lt;Group&gt;&lt;/Group&gt;&lt;/TemplateUsage&gt;</div>';
		rv.responseText='<?xml version="1.0" encoding="utf-8"?><TemplateUsage><Group></Group></TemplateUsage>';
		parseUsage(rv, '');
		return;
	}

	var Template_new = new Object();
	Template_new["template_name"] = template_name;

	if (restoreTemplate(template_name) == true) return;
	else load_template();
	return;

	function load_template()
	{
		var Dummy_div = document.getElementById("tm_dummy_div");
		var Progress_div = cNode(Dummy_div, "div", locals["Template"]+ " \"" + template_name+"\" " +locals["Progress"] +" .", {"class":"tm_load_progress", "id":"tm_load_progress"});

		var A_cancel = cNode(Progress_div, "a", locals["Cancel"], {"class":"tm_button tm_v_selector tm_cancel_button"});
		addEventListener(A_cancel, "click", function(e) {
			bBreak = true;
			switch_view_to("EB");
		});

		var full_name = ((template_name.search(new RegExp(locals["User"]+"( [^:]+){0,1}:"),"")>=0)?(""):(locals["Template"]+":"))+template_name;

		oXmlHttpRequest({
			'method':'GET',
			'url': wgServer + wgScriptPath + "/index.php?title=" + full_name +"/XML&action=raw",
			'headers':{'User-agent': 'Skript:TM(wp_de_user_Revvar)'},
			'onload': function(rD) {
				parseUsage(rD, full_name);
			},
			'onerror':function(rD) {
				log_message(locals["sys_load_error"].replace("$1", template_name));
				switch_view_to("EB");
			},
			'onreadystatechange':function() {
				Progress_div.firstChild.data += ".";
			},
   			'on_cancel': function() {switch_view_to("EB");}
		});
		return;
	}

	function parseUsage(rv, full_name)
	{
		try {
			var usage_text = rv.responseText;
			var Xml_dom=null;
			var Xsl_dom=null;
			var Dummy_div = document.getElementById("tm_dummy_div");
			var Progress_div = document.getElementById("tm_load_progress");
			is_xml_generated = false;

			if (usage_text.length == 0) {
				oXmlHttpRequest({
					'method':'GET',
					'url': wgServer + wgScriptPath +'/api.php?action=query&prop=revisions&rvprop=content&rvlimit=1&format=json&titles='+encodeURIComponent(full_name),
					'headers':{'User-agent': 'Skript:TM(wp_de_user_Revvar)'},
					'onload': function(rD) {
						try {
							if (Dummy_div && Progress_div) Dummy_div.removeChild(Progress_div);

							var rT = rD.responseText;
							var startPos = rT.search('\\[\\{"\\*":"')+7;
							var endPos = rT.search('"\\}\\]\\}\\}\\},"');

							if (endPos < 0) {
								log_message(locals["sys_no_such_template"].replace("$1", template_name));
								switch_view_to("EB");
								return;
							}

							rT = rT.substring(startPos, endPos);
							var xVarname = /\{\{\{[\s]*([^\s\|\}]([^\|\}]*[^\s\|\}]){0,1})[\s\|\}]/g;
							var names = rT.match(xVarname);
							var vars = new Object();
							if (names) {
								for (var i = 0; i < names.length; i++) {
									var tmp = names[i].replace(xVarname, "$1");
									tmp = tmp.replace(/<[^>]+>/g, '');
									tmp = decodeURI(tmp);
									tmp = tmp.replace('\\u00f6', 'ö');
									tmp = tmp.replace('\\u00fc', 'ü');
									tmp = tmp.replace('\\u00e4', 'ä');
									tmp = tmp.replace('\\u00df', 'ß');
									tmp = tmp.replace('\\u00d6', 'Ö');
									tmp = tmp.replace('\\u00dc', 'Ü');
									tmp = tmp.replace('\\u00c4', 'Ä');
									vars[tmp] = true;
								}
							}
							usage_text =  '<?xml version="1.0" encoding="utf-8"?>\n';
							usage_text += '<?mediawiki "{{XML-Warnung|' + template_name +'}}"?>\n';

							usage_text += ' <TemplateUsage output="expand">\n';
							usage_text += '   <Group>\n';
							for (var varname in vars) {
								usage_text += '     <Parameter name="' + varname + '">\n';
								usage_text += '       <Help></Help>\n';
								usage_text += '     </Parameter>\n';
							}
							usage_text += '   </Group>\n';
							usage_text += ' </TemplateUsage>\n';

							Xml_dom=parseXML(usage_text);
							Xsl_dom=get_xsl_dom();

							is_xml_generated = true;
							generated_xml = usage_text;

							onload();
							return;
						} catch (e) {
							log_message(e.message);
							switch_view_to("EB");
							return;
						}
					},
					'onerror':function(rD) {
						log_message(locals["sys_load_error"].replace("$1", template_name));
						switch_view_to("EB");
					},
					'onreadystatechange':function() {
						Progress_div.firstChild.data += ".";
					},
					'on_cancel': function() {
						switch_view_to("EB");
					}
				});
				return;
			}
			if (Dummy_div && Progress_div) Dummy_div.removeChild(Progress_div);

			/* create document from XML text */
			Xml_dom=parseXML(usage_text);
			Xsl_dom=get_xsl_dom();

			/* load style sheet for the transformation */
// 			var Xsl_dom = document.implementation.createDocument("", "", null);
// 			Xsl_dom.addEventListener("load", onload, false);
// 			Xsl_dom.load("http://tools.wikimedia.de/~revvar/tm_formular.xsl");

			/* next step "function onload"*/
			onload();
			return;

		} catch(e) {
			log_message(e.message);
			switch_view_to("EB");
			return;
		}
		return;

		function onload() {
			var dom = createForm(Xml_dom, Xsl_dom);
			if (dom) {
				attachForm(dom);

				/* cache template */
				Template[template_name] = new Object();
				Template[template_name].Xml_dom = Xml_dom;
				Template[template_name].Xsl_dom = Xsl_dom;
			} else switch_view_to("EB");
			return;
		}
	}

	function createForm(Xml_dom, Xsl_dom) {
		try {
			/* transform the XML Formular Specification with the loaded stylesheet */
			var Result_dom = null;
			if (is_ie) {
				var result_xml = Xml_dom.transformNode(Xsl_dom.documentElement);
				result_xml = result_xml.replace("locals_submit", locals["Submit"]);
				result_xml = result_xml.replace("locals_cancel", locals["Cancel"]);
				result_xml = result_xml.replace("locals_createxml", locals["CreateXML"]);
				result_xml = result_xml.replace("locals_template", locals["Template"]);
				result_xml = result_xml.replace(new RegExp("locals_nohelp","g"), locals["sys_no_help"]);
				result_xml = result_xml.replace("locals_version", VERSION);
				var Result_div = cNode(null, "div", null, {"id":"tm_dummy_ie_div", "style":"visibility:hidden;"});
				Result_div.innerHTML = result_xml;
				Root_node.appendChild(Result_div);
				Result_dom = document;
				var group_div = document.getElementById("tm_group_selector");
				if (group_div.firstChild == null) {
					group_div.parentNode.removeChild(group_div);
				}
			} else {
				var Processor = new XSLTProcessor()
				Processor.importStylesheet(Xsl_dom);
				Processor.setParameter(null, "locals_submit", locals["Submit"]);
				Processor.setParameter(null, "locals_cancel", locals["Cancel"]);
				Processor.setParameter(null, "locals_createxml", locals["CreateXML"]);
				Processor.setParameter(null, "locals_template", locals["Template"]);
				Processor.setParameter(null, "locals_nohelp",locals["sys_no_help"]);
				Processor.setParameter(null, "locals_version",VERSION);

				Result_dom = Processor.transformToDocument(Xml_dom);
			}

			/* add program logic */
			completeForm(Result_dom);

			return Result_dom;
		} catch(e) {
			log_message(e.message);
			return null;
		}
	}

	function attachForm(dom) {
		/* append formular to root node */
		var Mf = dom.getElementById("tm_main_frame");
		if (is_ie) Root_node.removeChild(document.getElementById("tm_dummy_ie_div"));
		Root_node.appendChild(Mf);

		var Tm_main = document.getElementById("tm_main_frame");
		var Tm_header=document.getElementById("tm_header");
		var Tm_form=document.getElementById("tm_form");
		var Tm_footer=document.getElementById("tm_footer");

		/* resize all input boxes*/
		var Input_node = null;
		Input_node = traverse(Tm_form, "tm_formelem");
		for (var i = 0; i < Input_node.length; i++) {
			if (Input_node[i].className == "tm_input") {
				resizeInputBox(Input_node[i], 1);
			}
		}


		/* resize formular */
		var new_height = Root_node.offsetHeight;
		new_height = new_height - Tm_header.offsetHeight - Tm_footer.offsetHeight;
		setStyleAttribute(Tm_form, {"height":(new_height+ "px")});
		setStyleAttribute(Tm_form, {"height":((new_height + (Root_node.offsetHeight - Tm_main.offsetHeight) )+ "px")});
	}

	function removeForm() {
		Root_node.removeChild(document.getElementById("tm_main_frame"));
	}

	function restoreTemplate(name)
	{
		if (Template[name]) {
			var dom = createForm(Template[name].Xml_dom, Template[name].Xsl_dom);
			if (dom) {
				attachForm(dom);
				return true;
			}
		}
		return false;
	}

	function traverse(Parent, name)
	{
		var childs = new Array();
		var Child = Parent.firstChild;
		while (Child != null) {
			if ((Child.getAttribute) && (Child.getAttribute("tm_name"))) {
				if (((""+Child.getAttribute("tm_name")).search(name) == 0)) childs.push(Child);
			}
			if (Child.firstChild != null) childs = childs.concat(traverse(Child, name));
			Child = Child.nextSibling;
		}
		return childs;
	}

	function mapParameter(Temp_plugin, Temp_real) {
		var Temp_given = new Object();
		for (var id in Temp_real) {
			if (Temp_plugin[id] != null) {
				Temp_given[id] = Temp_plugin[id];
				Temp_plugin[id] = null;
			} else {
				for (var pi_id in Temp_plugin) if (Temp_plugin[pi_id] != null) {
					if (id.toLowerCase() == pi_id.toLowerCase()) {
						Temp_given[id] = Temp_plugin[pi_id];
						Temp_plugin[pi_id] = null;
						break;
					}
				}
			}
		}

		/* append all unknown params */
		for (var pi_id in Temp_plugin) if (Temp_plugin[pi_id] != null) Temp_given[pi_id] = Temp_plugin[pi_id];
		return Temp_given;
	}

	function completeForm(dom)
	{
		State = dom.getElementById("tm_state").firstChild;
		var Name_node = dom.getElementById("tm_template");
		Name_node.value= template_name;
		if (template_name.length > 32) Name_node.size = template_name.length;
		if (template_name != "none") Name_node.readOnly = true;
		else {
			Name_node.value = "";
			addEventListener(Name_node, "keypress", template_name_changed);
		}

		var is_changed = false;
		function template_name_changed(e)
		{
			if (is_changed) return;
			if (e.type == "keypress") {
				if (e.which) {
					if (e.which != 13) return;
				} else if (e.keyCode) {
					if (e.keyCode != 13) return;
				} else return;
			}
			var new_name = Name_node.value + "";
			if (new_name.length == 0) return;
			is_changed = true;
			removeForm();
			show_template(Root_node, new_name, null, Target);
		}

		/* fix an ie width problem for the group divs */
 		if (is_ie) {
			var group_count = 1;
			do {
				var Group_div = dom.getElementById("tm_group_" + group_count);
  				if ((Group_div) && (Group_div.className) && (("" + Group_div.className).search("tm_ie_group") < 0)) {
 					Group_div.className = "tm_group tm_ie_group";
				}
				group_count++;
			} while (Group_div != null);
  		}

		var Input_node = null;
		Input_node = traverse(dom, "tm_formelem");

		/* save references to nodes and set help attribute */
		var comment_counter = 0;
		for (var i = 0; i < Input_node.length; i++) {
			if (Input_node[i].className == "tm_group_heading") {
				var id = "tm_comment_" + comment_counter;
				Template_new[id] = new Object();
				Template_new[id].showempty = (Input_node[i].parentNode.getAttribute("tm_showempty") == "true");
				Template_new[id].value = "";
				if (comment_counter > 0) Template_new[id].value += "\n";
				Template_new[id].value += "<!-- " + Input_node[i].firstChild.data + " -->\n";
				comment_counter++;
			} else  {
				var id = Input_node[i].id;
				if (id == null) {
					log_message("Internal error: XSLT created input node without id.");
					switch_view_to("EB");
					return;
				}
				if (Template_new[id] != null) {
					log_message("Internal error: Duplicate id \"" + id + "\".");
					switch_view_to("EB");
					return;
				}
				Input_node[i].tm_help = Input_node[i].title;
				Template_new[id] = Input_node[i];
			}
		}

		/* transform all condition attributes from text to a RegExp */
		for (var i = 0; i < Input_node.length; i++) {
			var condition_text = Input_node[i].getAttribute("tm_condition");
			if ((condition_text != null) && ((""+condition_text).length > 0)) {
				try {
					Input_node[i].tm_condition = new RegExp(condition_text);
				} catch(e) {
					log_message(e.message+"\n"+locals["sys_invalid_condition"].replace("$1", condition_text));
					switch_view_to("EB");
					return;
				}
			}
		}

		/* map suggested to existing parameter names */
		if ((Template_given != null) && (Template_given["source"]) && (Template_given["source"] == "plug-in")) {
			/* create a list with all valid parameter names */
			var Temp_real = new Object();
			for (var i = 0; i < Input_node.length; i++) {
				var name = "" + Input_node[i].id;
				if ((name !=null) && (name.length) && (name.length>0)) Temp_real[name] = true;
			}

			Template_given = mapParameter(Template_given, Temp_real);
		}

		/* fill the formular with the given template and add resize handler */
		var Template_used = new Object();
		if (Template_given != null) {
			for (var i = 0; i < Input_node.length; i++) {
				var name = "" + Input_node[i].id;
				if (Template_given[name] != null) Template_used[name] = true; /* mark given parameter to find unknown */
				if ((name !=null) && (name.length) && (name.length>0) && (Template_given[name] != null) && (Template_given[name].length>0)) {
					if (Input_node[i].nodeName.search(/^select$/i) == 0) {
							Input_node[i].value = Template_given[name];
							if (Input_node[i].value != Template_given[name]) {
								Input_node[i].title = locals["sys_invalid_value"] + ": \""+Template_given[name]+"\"! "+Input_node[i].tm_help;
								Input_node[i].className = "tm_input tm_error";
								Input_node[i].setAttribute("tm_error", "true");
							}
					} else {
						if (Input_node[i].type.search(/^checkbox$/i) == 0) {
							Input_node[i].checked = true;
						} else  {
							Input_node[i].value = Template_given[name];
							if (Input_node[i].nodeName.search(/^input$/i) == 0) {
								/* (1) replace newlines with <br /> */
								Input_node[i].value = replace_all(Input_node[i].value, new RegExp("\n","g"), "<br />");
							}
						}
					}
				}
			}
		}

		/* add function to show help text at state bar on focus and to trace act input field + add resize handler */
		for (var i = 0; i < Input_node.length; i++) {
			addEventListener(Input_node[i], "focus", showHelp);
			if ((Input_node[i].nodeName.search(/^input$/i) == 0) && (Input_node[i].type.search(/^text$/i) == 0) && (Input_node[i].className.search(/tm_input_max/i) < 0)) {
				addEventListener(Input_node[i], "keyup", resizeHandler);
			}
		}

		/* add function for the group selection button */
		var Group_selector = dom.getElementById("tm_group_selector");
		if (Group_selector  != null) {
			var Group_button = Group_selector.firstChild;
			while (Group_button != null) {
				if (Group_button.nodeName.search(/^a$/i) == 0) addEventListener(Group_button, "click", selectGroup);
				Group_button = Group_button.nextSibling;
			}
		}

		/* search unknown given named parameter*/
		if ((Template_given != null) && (Template_used != null)) {
			var unknown_parameter = new Array();
			for (var id in Template_given) if (!((Template_used[id]) && (Template_used[id] == true))) {
				if (((""+id).search(/^(source|template_name)$/) < 0) && ((""+id).search("tm_form_parameter") < 0))
					unknown_parameter.push(id.replace(/^tm_form_(.+)$/, "$1"));
			}
			if (unknown_parameter.length > 0) {
				var unknown_div = cNode(dom.getElementById("tm_group_selector"), "div", null, {"class":"tm_unknown_selector","id":"tm_unknown_selector"});
				for (var i = 0; i < unknown_parameter.length; i++) {
					var Unknown_link = cNode(unknown_div, "a", unknown_parameter[i] , {"class":"tm_button tm_selector tm_unknown_selector","title":Template_given["tm_form_" + unknown_parameter[i]]});
					addEventListener(Unknown_link, "click", insertUnknown);
				}
			}
		}

		/* buttons */
		var Button_submit = dom.getElementById("tm_submit");
		addEventListener(Button_submit, "click", submitTemplate);
		var Button_cancel = dom.getElementById("tm_cancel");
		addEventListener(Button_cancel, "click", cancelTemplate);
		if ((is_xml_generated) && (!is_opera)) {
			var Button_createxml = dom.getElementById("tm_createxml");
			setStyleAttribute(Button_createxml, {'visibility':'visible'});
			Button_createxml.removeAttribute("disabled");
			if (Button_createxml) addEventListener(Button_createxml, "click", createXML);
		}

		/* last op (possible race condition!): enable Template_name node and buttons */
		Name_node.removeAttribute("disabled");
		Button_cancel.removeAttribute("disabled");
		if (template_name != "none") Button_submit.removeAttribute("disabled");

		return true;
	}

	function submitTemplate(e)
	{
		if (!is_ie) e.preventDefault();

		/* read all results and correct them if necessary */
		var success = true;
		var First_error_node = null;
		for (var id in Template_new) if (id.search(/^(source|template_name|tm_comment_)/) < 0) {
			var Node = Template_new[id];
			switch ((""+Node.nodeName).toLowerCase()) {
				case "textarea": {
					Node.tm_value = trim(Node.value);
					var lines = Node.tm_value.split("\n");
					if ((lines.length - 1 > 1) && (lines[lines.length - 1].search(/[\S]/) < 0)) lines.pop();
					Node.tm_value = lines.join("\n");
					if (lines.length > 1) Node.tm_value = "\n" + Node.tm_value;
				};break;
				case "input": {
					if ((""+Node.type).toLowerCase() == "checkbox") {
						if (Node.checked == true) Node.tm_value = trim(Node.value);
						else Node.tm_value = "";
					} else {
						Node.tm_value = trim(Node.value);
					}
				};break;

				case "select": {
					Node.tm_value = trim(Node.value);
				};break;

				default: {
					log_message("Internal Error: Unknown Node type \"" + Node.nodeName + "\".");
					switch_view_to("EB");
					return;
				}
			}

			/* verify values */
			var node_success = true;
			if ((Node.getAttribute("tm_null") == "false") && ((""+Node.tm_value).length==0)) {
				success = false; node_success = false;
				if (First_error_node == null) First_error_node=Node;
				Node.title = locals["sys_enter_value"]+" "+Node.tm_help;
				Node.className = "tm_input tm_error";
				Node.setAttribute("tm_error", "true");
			} else if (Node.tm_condition != null) {
				if ((!((Node.getAttribute("tm_null") == "true") && ((""+Node.value).length==0))) &&
				((""+Node.tm_value).search(Node.tm_condition) != 0)) {
					success = false; node_success = false;
					if (First_error_node == null) First_error_node=Node;
					Node.title = locals["sys_enter_valid_value"]+" "+Node.tm_help;
					Node.className = "tm_input tm_error";
					Node.setAttribute("tm_error", "true");
				}
			}
			if (node_success == true) {
				Node.setAttribute("tm_error", "false");
				Node.className = "tm_input";
				Node.title = Node.tm_help;
			}
		}
		if (success==false) {
			if (State) State.data = locals["sys_please_correct_errors"];
			First_error_node.focus();
			return;
		}

		/* create new template source */
		var x_param = /^tm_form_(.+)$/;
		var output = document.getElementById("tm_main_frame");
		if (output != null) {
			if (output.getAttribute("tm_max_value_indentation")) {
				max_value_indentation = 0+output.getAttribute("tm_max_value_indentation");
			}
			output = ((""+output.getAttribute("tm_output")).search(/^expand$/)==0);
		} else output=false;
		var new_template = "{{" + Template_new["template_name"] + ((output)?"\n":"");
		var group_count = 0;
		var group_template = "";
		var group_showempty = false;

		// get max parameter length
		var max_parameter_length = 0;
		for (id in Template_new) if (id.search(/^(source|template_name)$/) < 0) {
			if ((output || ((""+Template_new[id].tm_value).length > 0)) && ((id.search("tm_comment_") < 0))) {
				var tmp_param = (""+id).replace(x_param,"$1");
				if (max_parameter_length < tmp_param.length) max_parameter_length = tmp_param.length;
			}
		}

		var parameter_space = "";
		var xNumber = /^[0-9]+$/g;
		var prevEmptyNumbers = '';
		for (var i = 0; i < ((max_parameter_length > max_value_indentation) ? max_value_indentation : max_parameter_length); i++) parameter_space += " ";

		for (id in Template_new) if (id.search(/^(source|template_name)$/) < 0) {
			var tmp_param = (""+id).replace(x_param,"$1");
			if (output == true) {
				if (id.search("tm_comment_") == 0) {
					if ((group_count > 0) || (group_showempty == true)) new_template += group_template;
					group_count = 0;
					group_template = "";
					group_showempty = Template_new[id].showempty;
//  					group_template += Template_new[id].value;
				} else {
					if (tmp_param.length < parameter_space.length) tmp_param = (tmp_param + parameter_space).substr(0, parameter_space.length);
					if (tmp_param.search(xNumber) == 0) {
						group_template += "|";
					} else {
						group_template += "| " + tmp_param;
					}
					if (((""+Template_new[id].tm_value).length > 0) || (Template_new[id].getAttribute("tm_predefined") == "false")) {
						if (tmp_param.search(xNumber) == 0) {
							group_template += Template_new[id].tm_value;
						} else {
							group_template += "= " + Template_new[id].tm_value;
						}
					}
					group_template += "\n";
					if ((""+Template_new[id].tm_value).length > 0) group_count++;
				}
			} else if (((""+Template_new[id].tm_value).length > 0) && ((id.search("tm_comment_") < 0))) {
				if (tmp_param.length < parameter_space.length) tmp_param = (tmp_param + parameter_space).substr(0, parameter_space.length);
				new_template += prevEmptyNumbers;
				prevEmptyNumbers = '';
				if (tmp_param.search(xNumber) == 0) {
					new_template += "|"+ Template_new[id].tm_value;
				} else {
					new_template += "| "+ tmp_param + "= " + Template_new[id].tm_value;
				}
			} else if (tmp_param.search(xNumber) == 0) prevEmptyNumbers += '|';
		}
		if (output == true) if ((group_count > 0) || (group_showempty == true)) new_template += group_template;
		new_template += "}}";

		switch_view_to("EB");

		/* insert source into Editbox at cursor */
 		var scroll_top = Target["Editbox"].scrollTop;
		Target["Editbox"].value = Target["Editbox"].value.substring(0, Target["start"]) + new_template + Target["Editbox"].value.substring(Target["end"] + 1);
		if (is_ie) {
			var Range = Target["Editbox"].createTextRange();
			Range.collapse(true);
			Range.moveEnd('character', Target["start"]);
			Range.moveStart('character', Target["start"]);
			Range.select();
		} else {
			Target["Editbox"].selectionStart = Target["cursor"];
			Target["Editbox"].selectionEnd = Target["cursor"];
			Target["Editbox"].scrollTop = scroll_top;
		}
	}

	function cancelTemplate(e)
	{
		if (!is_ie) e.preventDefault();
		switch_view_to("EB");
	}

	function createXML(e) {
		if (!is_ie) e.preventDefault();

		var full_name = ((template_name.search(new RegExp(locals["User"]+"( [^:]+){0,1}:"),"")>=0)?(""):(locals["Template"]+":"))+template_name;
		var xml_window = window.open(wgServer + wgScriptPath + '/index.php?action=edit&summary=' + encodeURIComponent(locals["sys_xml_generated_summary"]) + '&title=' + encodeURIComponent(full_name) + '/XML');
		xml_window.focus();
		var textbox = xml_window.document.getElementById('wpTextbox1');
		if (textbox) textbox.value = generated_xml;
		else {
			addEventListener(xml_window, 'load', function (e) {
				var textbox = xml_window.document.getElementById('wpTextbox1');
				if (textbox) textbox.value = generated_xml;
			});
		}
	}
}

function switch_view_to(view)
{
	var Editbox = document.getElementById("wpTextbox1");
	var Tm_box = document.getElementById("tm_dummy_div");
	if (view == null) view = "";
	if (((view == "VM")  || (view == "")) && (act_view == "EB")) {
		if (Editbox != null) {
			setStyleAttribute(Editbox, {"visibility":"hidden"});
			Editbox.readOnly = true;
			document.getElementById("wpSave").disabled = true;
			document.getElementById("wpPreview").disabled = true;
			document.getElementById("wpDiff").disabled = true;
		}
		if (Tm_box != null) setStyleAttribute(Tm_box, {"z-index":"99", "visibility":"visible"});
		act_view = "VM";
	} else if (((view == "EB")  || (view == "")) && (act_view == "VM")) {
		if (Tm_box != null) setStyleAttribute(Tm_box, {"visibility":"hidden", "z-index":"0"});
		if (Editbox != null) {
			if (view == "EB") {
				// removes user interface
				if (Tm_box) Tm_box.parentNode.removeChild(Tm_box);
				Tm_box = null;

				if (is_ie) Editbox.removeAttribute("readOnly");
				else Editbox.removeAttribute("readonly");
				document.getElementById("wpSave").removeAttribute("disabled");
				document.getElementById("wpPreview").removeAttribute("disabled");
				document.getElementById("wpDiff").removeAttribute("disabled");
			}
			setStyleAttribute(Editbox, {"visibility":"visible"});
			Editbox.focus();
		}
		act_view = "EB";
	} else {
		log_message("Internal error: act_view conflicts with view parameter");
	}
}

var help_mutex = false;
function showHelp(e)
{
	if (help_mutex == true) return;
	help_mutex = true;
	if (!is_ie) e.preventDefault();
	Act_input = ((is_ie)?e.srcElement:e.target);
	var text = Act_input.title;
	/* write help text and resize formular */
	var Tm_main = document.getElementById("tm_main_frame");
	var Tm_header=document.getElementById("tm_header");
	var Tm_form=document.getElementById("tm_form");
	var rel_scroll_pos = Tm_form.scrollTop / Tm_form.scrollHeight;
	var Tm_footer=document.getElementById("tm_footer");
	var new_height = Tm_main.parentNode.offsetHeight;

	document.getElementById("tm_state").firstChild.data = text;

	new_height = new_height - Tm_header.offsetHeight - Tm_footer.offsetHeight;
	setStyleAttribute(Tm_form, {"height":(new_height+ "px")});
	setStyleAttribute(Tm_form, {"height":((new_height + (Tm_main.parentNode.offsetHeight - Tm_main.offsetHeight) )+ "px")});
	Tm_form.scrollTop = Tm_form.scrollHeight * rel_scroll_pos;
	help_mutex = false;
}

function resizeHandler(e)
{
	Act_input = ((is_ie)?e.srcElement:e.target);
	Act_input.tm_old_size = Act_input.size;
	resizeInputBox(Act_input, 1);
	if ((is_gecko) && (Act_input.tm_old_size != Act_input.size)) {
		var org_value = Act_input.value;
		var org_start = Act_input.selectionStart;
		var org_end = Act_input.selectionEnd;
		Act_input.value = "";
		Act_input.value = org_value;
		if (org_end >= org_start) Act_input.selectionEnd = org_end;
		Act_input.selectionStart = org_start;
		if (org_end < org_start) Act_input.selectionEnd = org_end;
	}
}

function insertUnknown(e)
{
	if (!is_ie) e.preventDefault();
	var text = ((is_ie)?e.srcElement:e.target).title;
	if ((Act_input != null) && (Act_input.nodeName.search(/^(input|select|textarea)$/i) ==0) && (Act_input.type.search(/^checkbox$/i) < 0)) Act_input.value = text;
}

function selectGroup(e)
{
	if (!is_ie) e.preventDefault();
	try {
		var text = "" + ((is_ie)?e.srcElement:e.target).id;
		var position = Math.round(parseFloat(text.replace(/^.+_([0-9\.]+)$/,"$1")) * ((is_ie)?2:1));
		var Group_div = document.getElementById("tm_group_"+position);
		var Form_div = document.getElementById("tm_form");
		Form_div.scrollTop = Group_div.offsetTop - Group_div.parentNode.offsetTop;
	} catch(e) {
		log_message(e.message+"\n"+"Internal error: Can't select group div with id=\"tm_group_"+position+"\".");
		switch_view_to("EB");
		return;
	}
}

function parse_template_source(source)
{
	var x_comment = /<!--.*?-->/g;
	source = replace_all(source, x_comment, "");

	/* replace split chars within nowiki segments and nested templates */
	var x_nowiki_1 = /(<nowiki>.*?)[|](.*?<\/nowiki>)/g;
	var x_nested = /((?:^|[^{])\{\{[^{}]*?)[|]([^{}]*?\}\}(?:$|[^}]))/g;
	source = replace_all(source, x_nowiki_1, "$1###TM###$2");
	source = replace_all(source, x_nested, "$1###TM###$2");

	/* replace split chars within wikilinks */
	var x_wikilinks = /(\[\[[^\]]+)\|([^\]]*)/g;
	source = replace_all(source, x_wikilinks, "$1###TM###$2");

	var parameter = source.split("|");
	var Template_given = new Object();
	for (var i = 0; i < parameter.length; i++) {
		parameter[i] = replace_all(parameter[i], /###TM###/g, "|");
		parameter[i] = trim(parameter[i]);
		if (i==0) {
			Template_given["template_name"] = parameter[i];
		} else {
			var parameter_name = "";
			var parameter_value = "";
			var first_equal_char = parameter[i].search("=");
			if (first_equal_char < 0) {
				parameter_name = "tm_form_" + i;
				parameter_value = parameter[i];
			} else {
				parameter_name = "tm_form_" + trim(parameter[i].substring(0, first_equal_char));
				parameter_value = trim(parameter[i].substring(first_equal_char + 1));
			}
			if (Template_given[parameter_name] != null) {
				log_message("Syntax error: Parameter name \""+parameter_name+"\" already in use.");
				return null;
			}
			/* correct format errors */

			Template_given[parameter_name] = parameter_value;
		}
	}
	Template_given["source"] = "source code";
	return Template_given;
}

/* ==helper functions===================================================*/
function replace_all(text, regexp, replacement)
{
	var count_tmp = 0;
	while (text.search(regexp) >= 0) {
		text = text.replace(regexp, replacement);
		count_tmp++;
		if (count_tmp > 1000) {
			log_message("replace_all: Internal error - endless loop.");
			return null;
		}
	}
	return text;
}

function trim(text)
{
	text = "" + text;
	text = replace_all(text, /^\s+/g, "");
	text = replace_all(text, /^(.*?)\s+$/, "$1");
	text = replace_all(text, "\n\n", "\n");
	if (text.search(/[^\s]/) < 0) text = "";
	return text;
}

/**
  Creates a new GUI node.

 @author [[de:Benutzer:Revvar]]
 @param nRoot null or reference to the prefered root node object
 @param nType HTML type string ("div" for example)
 @param nText null or string with the text for the text child node
 @param nAttr null or object with attribute attributes, ({style:"...",width:"100%"} for example)
 @return the new node object
*/
function cNode(nRoot,nType,nText,nAttr)
{
	var elem=document.createElement(nType);
	if (nAttr) for (var aid in nAttr) {
		if (aid == "style") {
			var style_attr = nAttr[aid].split(";");
			var style_obj = new Object();
			for (var i = 0; i < style_attr.length; i++) {
				var style_id = style_attr[i].replace(/^\s*([^:]+):.*$/,"$1");
				var style_value = style_attr[i].replace(/^\s*[^:]+:\s*([^\s;]+)[\s;]*$/,"$1");
				if (style_id.length > 0) style_obj[style_id] = style_value;
// 				log_message(style_id + ":" + style_value);
			}
		  setStyleAttribute(elem, style_obj);
		} else {
			if (aid == "class") elem.className = nAttr[aid];
			else elem.setAttribute(aid, nAttr[aid]);
		}
	}
	if (nText) elem.appendChild(document.createTextNode(nText));
	if (nRoot) nRoot.appendChild(elem);
	return elem;
}


function setStyleAttribute(Node, Attribute)
{
	if ((Node) && (Attribute)) {
		 for (var aid in Attribute) {
			 Node.style[aid] = Attribute[aid];
		 }
	}
}

function addEventListener(Node, event, callback)
{
	if (is_ie) Node.attachEvent("on"+event, callback);
	else Node.addEventListener(event, callback, false);
}

function removeEventListener(Node, event, callback)
{
	if (is_ie) Node.detachEvent("on"+event, callback);
	else Node.removeEventListener(event, callback, false);
}

//XMLHttpRequest wrapper, with timeout support
function oXmlHttpRequest(data)
{
	//preconditions
	if ((data.onload==null) || (data.onreadystatechange==null)) throw("oXmlHttpRequest-precondition");
	var orgHandler={id:(iRequestID++),onload:data.onload,onreadystatechange:data.onreadystatechange,onerror:data.onerror,timeout:null,valid:true};

	data.onload=function (rD) {
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		orgHandler.onload(rD);
		orgHandler.valid=false;
		return;
	}

	data.onreadystatechange=function (rD) {
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		orgHandler.onreadystatechange(rD);
		orgHandler.timeout=setTimeout(fTimeout,HTTPTIMEOUT);
	}

	data.onerror=function (rD)
	{
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		orgHandler.valid=false;//discard request
		if (orgHandler.onerror) orgHandler.onerror(rD);
		log_message("HTTP-Error "+rD.status+":"+rD.statusText);
		fRetry("Error: "+rD.status+".");
		return;
	}

	function fRetry(text)
	{
		if (data.silent) return;
		var bRetry=confirm(text+" "+locals["sys_question_repeat_http_request"]);
		if (bRetry==false) {
			bBreak=true;
			if (data.on_cancel) data.on_cancel();
			return;
		}
		//retry request
		setTimeout(function() {oXmlHttpRequest({method:data.method,url:data.url,headers:data.headers,data:data.data,onload:orgHandler.onload,onerror:orgHandler.onerror,onreadystatechange:orgHandler.onreadystatechange})},10);
		return;
	}

	function fTimeout()
	{
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		var bWait=false;
		if (!data.silent) bWait=confirm(locals["sys_question_wait_for_http_response"].replace("$1", Math.round(HTTPTIMEOUT/1000)));
		if (bWait==false) {
			orgHandler.valid=false;//discard request
			fRetry("Timeout: "+data.url+"\n");
		} else {
			if (!orgHandler.valid) return; //old discarded request
			orgHandler.timeout=setTimeout(fTimeout,HTTPTIMEOUT);
		}
		return;
	}
	orgHandler.timeout=setTimeout(fTimeout,HTTPTIMEOUT);
	GM_xmlhttpRequest(data);
	return;
}

function GM_xmlhttpRequest(req)
{
	if (is_gecko && (url.search("file://") == 0)) {
		/* Debugging with a local copy */
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
		} catch (e) {
			alert("Internal error: Permission UniversalBrowserRead denied.");
		}
	}
	var xmlHttp = sajax_init_object();// gets the XMLHttpRequest object (depends on ajax.js)

	xmlHttp.open(req.method, req.url, true);
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			req.onload(xmlHttp);
		} else req.onreadystatechange;
	};
	for (var name in req.headers) {
		xmlHttp.setRequestHeader(name, req.headers[name]);
	}
	xmlHttp.send(req.data);
}

var resize_mutex = false;
 function resizeInputBox(oInputBox, extra_spaces) {
	if (resize_mutex == true) return;
	resize_mutex = true;
	if (!((oInputBox.nodeName) && (oInputBox.nodeName.search(/^input$/i) == 0) && (oInputBox.type) && (oInputBox.type.search(/^text$/i) == 0))) {
		alert("Internal error: call of CInputBoxResizer.opResize with an unsupported node type: " + oInputBox);
		resize_mutex = false;
		return;
	}

	/* first call for this node ? */
	if (!(oInputBox.tm_org_size)) {
		oInputBox.tm_org_size = oInputBox.size; // save orginal size
	}

	if (oInputBox.tm_org_size >= oInputBox.value.length)  {
		resize_mutex = false;
		return;
	}
	oInputBox.size = oInputBox.value.length + extra_spaces;
	var right_pos = oInputBox.offsetWidth;
	var tmp_str = "";
	var node = oInputBox;
	var table_node = null;
	do {
		if (node.className.search("tm_table") >= 0) table_node = node;
		else {
			right_pos += node.offsetLeft;
			tmp_str += node.offsetLeft + "px +";
		}
		node = node.parentNode;
	} while (node.className.search("tm_group") < 0);
	if ((right_pos + 8) > node.offsetWidth) {
		if (is_ie) {
			while ((right_pos + 8) > node.offsetWidth) {
				var old_width = oInputBox.offsetWidth;
				oInputBox.size--;
				right_pos -= old_width - oInputBox.offsetWidth;
			}
		} else {
			oInputBox.size = oInputBox.tm_org_size;
			var child = node.firstChild;
			if (table_node != null) table_node.className = "tm_table tm_table_max"; else alert("internal error: table not found");
			oInputBox.className = "tm_input tm_input_max";
		}
		removeEventListener(oInputBox, "keyup", resizeHandler);
	}
	resize_mutex = false;
	return;
}

} // tm_init

/* XXX: public for the xsl include hack */
function parseXML(text)
{
	var dom = null;
	if (window.ActiveXObject)
	{
			dom=new ActiveXObject("Microsoft.XMLDOM");
			dom.async="false";
			dom.loadXML(text);
			return dom;
	} else {
		var parser=new DOMParser();
		dom=parser.parseFromString(text,"text/xml");
		var error=dom.getElementsByTagName("parsererror");
		if (!error[0]) {
			return dom;
		} else {
			var sError=error[0].firstChild.nodeValue;
			log_message(sError);
			var aError=sError.split("\n");
			if (aError[2]) {
				aLocation=aError[2].match(/[0-9]+/g);
				if (aLocation[0]) {
					var aHtmlText=text.split("\n");
					log_message("error line:"+aHtmlText[aLocation[0]-1]);
					return;
				}
			} else log_message("no error position");
			return;
		}
		return;
	}
}

function log_message(msg)
{
	alert(msg);
}

hookEvent("load", tm_init);


//## File: tm_w2t_infobox_schienenfahrzeug.js #################

/**
* Wiki2Template-Plugin des Vorlagen-Meister fuer die Vorlage "Infobox Schienenfahrzeug", Version: 0.1beta, Date: 2007-02-04
* Copyright (C) 2007 [[de:Benutzer:Revvar]] <revvar@gmx.de>
* Released under the GPL license version 2
* http://www.gnu.org/copyleft/gpl.html
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty
* of MERCHANTABILITY or FITNESS FOR A PARTICULAR * PURPOSE.
* See the GNU General Public License for more details.
*/

function TM_P_Infobox_Schienenfahrzeug()
{
	var self = this;
	TM_P_Wiki2Template.call(this);

	var name = "Infobox Schienenfahrzeug";
	this.opGetName = function() {return name;};

	var template = "Infobox Schienenfahrzeug";
	this.opGetTemplate = function() {return template;};

	var super_opTransform = this.opTransform;
	this.opTransform = function(wiki_text) {
		wiki_text = super_opTransform(wiki_text);
		var Template = new Object();
		Template["template_name"] = template;
		Template["source"] = "plug-in";
		var line = wiki_text.split("\n");
		for (var i = 0; i < line.length; i++) if ((line[i].search(/\s*(\|-|\|\}|\{\|)/) != 0) && (line[i].search(/\|\|/) > 0)) {
			var entry = line[i].split("||");
			if (entry.length != 2) {alert("TM_P_Infobox_Schienenfahrzeug: Momentan wird nur ein ||-Trenner pro Zeile unterstützt.");return null;}
			var x_wikilink = /\[\[[^|]+\|([^\]]+)\]\]/;
			if (entry[0].search(x_wikilink) >= 0) entry[0] = entry[0].replace(x_wikilink, "$1");
			entry[0] = entry[0].replace(/^\s*\|\s*/g, "").replace(/^\s*(\S.*\S)\s*$/g,"$1").replace(/[^a-zA-ZäöüÄÖÜß0-9_]/g,"");
			entry[1] = entry[1].replace(/^\s*(\S.*\S)\s*$/g,"$1");
			if (entry[1].charAt(0) == "|") entry[1] = entry[1].substring(1);
			if (entry[0].search(/^Indienststellung$/i) == 0) entry[0] = "Baujahre";
			if ((entry[1].search(/^\s*k\s*\.\s*A\s*(\.){0,1}\s*$/) < 0) && (entry[1].search(/^\s*-+\s*/) < 0)) {
				Template["tm_form_"+entry[0]] = entry[1];
			}
		} else if (line[i].search(/^\s*!.*((color:|background)[^\|]*){2,2}\|.*/) == 0) {
			var base_color_name = {"aqua":"00ffff", "black":"000000", "blue":"0000ff", "fuchsia":"ff00ff", "gray":"808080", "green":"008000", "lime":"00ff00", "maroon":"800000", "navy":"000080", "olive":"808000", "purple":"800080", "red":"ff0000", "silver":"c0c0c0", "teal":"008080", "white":"ffffff", "yellow":"ffff00"};
			// Baureihe, Farbe1 und Farbe2
			var baureihe = line[i].substring(line[i].search(/\|/) + 1).replace(/^\s*(\S.*\S)\s*$/g,"$1");
			var farbe2 = line[i].replace(/^.*[^a-zA-Z]color\s*:\s*(#[a-fA-F0-9]{6,6}|[a-zA-Z]+).*/,"$1").replace(/^\s*(\S.*\S)\s*$/g,"$1");
			var farbe1 = line[i].replace(/^.*[^a-zA-Z]background(-color){0,1}\s*:\s*(#[a-fA-F0-9]{6,6}|[a-zA-Z]+).*/,"$2").replace(/^\s*(\S.*\S)\s*$/g,"$1");
			if (farbe1.charAt(0) == "#") farbe1 = farbe1.substring(1);
			else if (base_color_name[farbe1.toLowerCase()]) farbe1 = base_color_name[farbe1.toLowerCase()]; else farbe1 = null;
			if (farbe2.charAt(0) == "#") farbe2 = farbe2.substring(1);
			else if (base_color_name[farbe2.toLowerCase()]) farbe2 = base_color_name[farbe2.toLowerCase()]; else farbe2 = null;
			Template["tm_form_Baureihe"] = baureihe;
			if (farbe1 != null) Template["tm_form_Farbe1"] = farbe1;
			if (farbe2 != null) Template["tm_form_Farbe2"] = farbe2;
		} else if (line[i].search(/^\s*(!|\|[^\-]).*\[\[(Bild|Image):[^\]]+\]\]/) == 0) {
			var bild = line[i].replace(/^\s*(!|\|).*\[\[(Bild|Image):([^\]]+)\]\].*/,"$3");
			bild = bild.split("|");
			Template["tm_form_Abbildung"] = bild[0];
			for (var k = 1; k < bild.length; k++) if (bild[k].search("[0-9]px") < 0) {
				Template["tm_form_Name"] = bild[k].replace(/^\s*(\S.*\S)\s*$/g,"$1");
			}
		}
		return Template;
	}
}
TM_P_Infobox_Schienenfahrzeug.prototype=new TM_P_Wiki2Template();

TM_PluginList.push(new TM_P_Infobox_Schienenfahrzeug()); // register plugin