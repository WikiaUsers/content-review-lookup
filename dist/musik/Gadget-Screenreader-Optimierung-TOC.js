/**
 * Verschiebt die Einleitung von Artikeln nach oben, vor Infoboxen, Bilder,
 * Tabellen usw. Eine ausführliche Beschreibung ist auf der Diskussionsseite zu
 * finden.
 */
function moveIntroductionToTop()
{
	var deleteTemplateIds = window.deleteTemplateIds || [];
	var doNotMoveTemplateIds = window.doNotMoveTemplateIds ||
		["loeschantragstext", "qualitaetssicherungstext", "urv",
		"urvzweifel", "Vorlage_Begriffskl.C3.A4rungshinweis",
		"Vorlage_Dieser_Artikel", "Vorlage_Doppeleintrag",
		"Vorlage_Inuse", "Vorlage_loeschen"];
	/* Bevorzugt die Wechseln-zu-Links als Ziel verwenden. */
	var targetWasUsed = false, target = document.getElementById("jump-to-nav");
	/* Alternatives Verschiebeziel bei ausgeblendeten Wechseln-zu-Links. */
	if (! target) target = document.getElementById("contentSub");
	/* Für die Methode insertBefore() wird das nachfolgende Element benötigt. */
	if (target && target.nextSibling) target = target.nextSibling;
	var currentNode, nextNode = target;
	/* Alle Elemente iterativ abarbeiten, beginnend mit dem Zielelement selbst. */
	while (currentNode = nextNode)
	{
		nextNode = currentNode.nextSibling;
		/* Leerräume, Kommentare, Skripte etc. überspringen. */
		if (currentNode.nodeType !== 1 || currentNode.nodeName === "SCRIPT")
			continue;
		/* Die Sprungmarken vor den Überschriften nicht verschieben. */
		if (currentNode.firstChild && currentNode.firstChild.nodeType === 1 &&
			currentNode.firstChild.nodeName === "A" &&
			! currentNode.firstChild.firstChild) continue;
		/* Bei der ersten gefundenen Zwischenüberschrift abbrechen. */
		if (currentNode.nodeName.match(/^H[1-6]$/i)) return;
		/* Benutzerdefiniertes Löschen von Bausteinen aus der Einleitung. */
		if (currentNode.id)
			for (var i = 0; i < deleteTemplateIds.length; i++)
				if (deleteTemplateIds[i] === currentNode.id)
				{
					currentNode.parentNode.removeChild(currentNode);
					continue;
				}
		/* Bestimmte Bausteine am Anfang stehen lassen. */
		if (currentNode.className == "usermessage")
		{
			target = currentNode.nextSibling;
			continue;
		}
		if (! targetWasUsed && currentNode.id)
			for (var i = 0; i < doNotMoveTemplateIds.length; i++)
				if (doNotMoveTemplateIds[i] === currentNode.id)
				{
					target = currentNode.nextSibling;
					continue;
				}
		/* Nur Bilder, Infoboxen und Ähnliches nach unten schieben. */
		if (currentNode.nodeName.match(/^(DIV|TABLE)$/i)) continue;
		/* Bei Verschiebung auf sich selbst sicherheitshalber abbrechen. */
		if (currentNode == target) return;
		target.parentNode.insertBefore(currentNode, target);
		targetWasUsed = true;
	}
}
if (wgIsArticle && ! wgNamespaceNumber) addOnloadHook(moveIntroductionToTop);