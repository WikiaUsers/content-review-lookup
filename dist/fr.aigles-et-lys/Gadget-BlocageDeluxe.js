/**
 * BlocageDeluxe
 *
 * Rajout de boutons prédéfinis pour justifier un blocage
 *
 * Auteur : Pabix
 * Dernière révision : 5 novembre 2006
 * {{:Projet:JavaScript/Script|BlocageDeluxe}}
 */

//////////////////////ZONE PERSONNALISABLE//////////////////////
var blocagedeluxeMessages = new Array();
var blocagedeluxeDuree = new Array();
var blocagedeluxeInterdireInscription = new Array();
var blocagedeluxeUniquementIP = new Array();
var blocagedeluxeBloquerIPsUtilisees = new Array();

with (blocagedeluxeMessages) {
        push ("IP fixe - Pas d'inscription possible");
        push ("IP fixe multi utilisateurs (ex. scolaire) - Création de compte autorisée");
        push ("IP variable - Aucune nouvelle inscription autorisée, comptes actuels utilisables");
        push ("Utilisteur enregistré - Blocage du compte");
        push ("Utilisateur enregistré - Blocage du compte et des IPs associées");
}
with (blocagedeluxeInterdireInscription) {
        push(true);
        push(false);
        push(true);
        push(false);
        push(false);
}
with (blocagedeluxeBloquerIPsUtilisees) {
        push(false);
        push(false);
        push(false);
        push(false);
        push(true);
}
with (blocagedeluxeUniquementIP) {
        push(false);
        push(true);
        push(true);
        push(false);
        push(false);
}
with (blocagedeluxeDuree) {
        push("1 hour");
        push("infinite");
        push("1 hour");
        push("1 hour");
        push("1 hour");
}
/////////////////FIN DE LA ZONE PERSONNALISABLE/////////////////

function BlocageDeluxe() {
        if (document.title.indexOf("Bloquer une adresse IP ou un utilisateur - Aigles et Lys")!=0) return;
        var mainNode = document.getElementsByTagName("form");
        var firstForm = mainNode[0];
        var table = document.createElement("table");
        var tr = document.createElement("tr");
        table.appendChild(tr);
        if (firstForm.getAttribute("id")=="blockip") {
                actionBlock = firstForm.getAttribute("action");
                var inputs = firstForm.getElementsByTagName("input");
                // inputs :
                // 0 -> wpBlockAddress        Le nom de l'utilisateur ou son IP
                // 1 -> wpBlockOther          Durée
                // 2 -> wpBlockReason         Raison invoquée
                // 3 -> wpAnonOnly            Ne pas bloquer les comptes existants
                // 4 -> wpCreateAccount       Empêcher la création de compte
                // 5 -> wpEnableAutoblock     Bloquer toutes les IPs utilisées par ce pseudonyme
                // 6 -> (submit) wpBlock      Soumission du formulaire
                // 7 -> wpEditToken           (Variable d'identification)
                var token = inputs[7].getAttribute("value");
                var lePauvre = inputs[0].getAttribute("value");
                for (var i=0;i<blocagedeluxeMessages.length;i++) {
                        //   if (i%3==0) {
                        tr = document.createElement("tr");
                        table.appendChild(tr);
                        //   }

                        // Crée le formulaire
                        var formElement = document.createElement("form");
                        with (formElement) {
                                setAttribute("id", "blockip");
                                setAttribute("method", "post");
                                setAttribute("action", actionBlock);
                        }

                        // Champ invisible : identification
                        var inputToken = document.createElement("input");
                        with (inputToken) {
                                setAttribute("name", "wpEditToken");
                                setAttribute("value", token);
                                setAttribute("type", "hidden");
                        }

                        // Champ invisible : nom de l'utilisateur
                        var ident = document.createElement("input");
                        with (ident) {
                                setAttribute("name", "wpBlockAddress");
                                setAttribute("value", lePauvre);
                                setAttribute("type", "hidden");
                        }

                        // Champ invisible de raison
                        var inputReason = document.createElement("input");
                        with (inputReason) {
                                setAttribute("name", "wpBlockReason");
                                setAttribute("value", blocagedeluxeMessages[i]);
                                setAttribute("type", "hidden");
                        }

                        // Champ invisible de durée
                        var dureeC = document.createElement("input");
                        with (dureeC) {
                                setAttribute("name", "wpBlockExpiry");
                                setAttribute("value", "other");
                                setAttribute("type", "hidden");
                        }

                        // Champ modifiable de durée
                        var dureeC2 = document.createElement("input");
                        with (dureeC2) {
                                setAttribute("name", "wpBlockOther");
                                setAttribute("value", blocagedeluxeDuree[i]);
                                setAttribute("type", "text");
                        }

                        // Case à cocher : bloquer les IPs utilisées par l'utilisateur
                        var blockIPs = document.createElement("input");
                        with (blockIPs) {
                                setAttribute("name", "wpEnableAutoblock");
                                setAttribute("type", "checkbox");
                                setAttribute("title", "blocage automatique des IPs utilisées par ce pseudonyme");
                                checked = blocagedeluxeBloquerIPsUtilisees[i];
                        }

                        // Case à cocher : Bloquer seulement les IPs
                        var anonymousOnly = document.createElement("input");
                        with (anonymousOnly) {
                                setAttribute("name", "wpAnonOnly");
                                setAttribute("type", "checkbox");
                                setAttribute("title", "Ne pas bloquer les comptes déjà existants");
                                checked = blocagedeluxeUniquementIP[i];
                        }

                        // Case à cocher : empêcher la création de compte
                        var allowAccCreat = document.createElement("input");
                        with (allowAccCreat) {
                                setAttribute("name", "wpCreateAccount");
                                setAttribute("type", "checkbox");
                                setAttribute("title", "Empêcher la création de compte");
                                checked = blocagedeluxeInterdireInscription[i];
                        }

                        // Case à cocher : empêcher la création de compte
                        // Bouton de soumission avec raison
                        var inputConfirm = document.createElement("input");
                        with (inputConfirm) {
                                setAttribute("name", "wpBlock");
                                setAttribute("value", blocagedeluxeMessages[i]);
                                setAttribute("type", "submit");
                        }

                        with (formElement) {
                                appendChild(anonymousOnly);
                                appendChild(allowAccCreat);
                                appendChild(blockIPs);
                                appendChild(inputReason);
                                appendChild(dureeC);
                                appendChild(dureeC2);
                                appendChild(inputConfirm);
                                appendChild(inputToken);
                                appendChild(ident);
                        }
                        var td = document.createElement("td");
                        td.appendChild(formElement);
                        tr.appendChild(td);
                }
                var separation = document.createElement("p");
                separation.appendChild(document.createElement("hr"));
                insertAfter(firstForm.parentNode, separation, firstForm);
                insertAfter(firstForm.parentNode, table, separation);
        }
}
addOnloadHook(BlocageDeluxe);