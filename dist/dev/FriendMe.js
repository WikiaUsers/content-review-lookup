/**
 * Name:        FriendMe
 * Version:     v1.0
 * Author:      t7ru [[User:Gabonnie]]
 * Description: A simple system to add friends to your Fandom profile!
 */
(() => {
	"use strict";

	// prevents the script from reruns
	if (window.friendsModuleLoaded) return;
	window.friendsModuleLoaded = true;

	const namespaces = [2, 500, 1200, 3]; // User:, Message_Wall:, User_blog:, User_talk:
	const currentNamespace = mw.config.get("wgNamespaceNumber");

	if (!namespaces.includes(currentNamespace)) {
		return;
	}

	// logic
	// get profile's userid
	const profileUserId = Number(mw.config.get("profileUserId"));
	if (!profileUserId || Number.isNaN(profileUserId)) {
		console.error("[FriendMe] No valid profileUserId found");
		return;
	}

	const fetchFriendsData = (friendIds) => {
		if (!friendIds || friendIds.length === 0) {
			return $.Deferred().resolve({
				users: {}
			});
		}

		const url = `https://services.fandom.com/user-attribute/user/bulk?${friendIds.map((id) => `id=${id}`).join("&")}`;

		return $.ajax({
			url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			}
		});
	};

	const fetchProfileData = () => {
		return $.ajax({
			url: `https://services.fandom.com/user-attribute/user/${profileUserId}`,
			type: "GET",
			xhrFields: {
				withCredentials: true
			}
		});
	};

	const parseFriendIds = (friendListData) => {
		if (!friendListData) return [];

		return friendListData
			.split(",")
			.map((id) => id.trim())
			.filter((id) => id && /^\d+$/.test(id));
	};

	const extractFriendListData = (userData) => {
		if (!userData || !userData._embedded || !userData._embedded.properties) {
			return "";
		}

		const properties = userData._embedded.properties;
		for (let i = 0; i < properties.length; i++) {
			if (properties[i].name === "coverPhoto") {
				return properties[i].value || "";
			}
		}
		return "";
	};

	// build rail module
	const createFriendsModule = (friendsData, currentUserData) => {
		const users = friendsData.users || {};
		const userIds = Object.keys(users);

		let moduleHtml = `
             <section class="rail-module" id="friends-module">
                 <h2 class="rail-module__header has-icon">
                     <svg class="wds-icon wds-icon-small" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                         <path d="M12 8.25c1.245 0 2.243-1.005 2.243-2.25S13.245 3.75 12 3.75c-1.245 0-2.25 1.005-2.25 2.25S10.755 8.25 12 8.25zm-6 0c1.245 0 2.243-1.005 2.243-2.25S7.245 3.75 6 3.75c-1.245 0-2.25 1.005-2.25 2.25S4.755 8.25 6 8.25zm0 1.5c-1.748 0-5.25.878-5.25 2.625V14.25h10.5v-1.875c0-1.747-3.502-2.625-5.25-2.625zm6 0c-.218 0-.465.015-.728.038.87.63 1.478 1.478 1.478 2.587v1.875h4.5v-1.875c0-1.747-3.502-2.625-5.25-2.625z"/></svg>Friends</h2>
         `;

		const mutualFriends = [];

		userIds.forEach((userId) => {
			const user = users[userId];

			if (user.coverPhoto) {
				const theirFriendIds = parseFriendIds(user.coverPhoto);
				const isMutual = theirFriendIds.includes(profileUserId.toString());

				if (isMutual) {
					mutualFriends.push(user);
				}
			}
		});

		if (mutualFriends.length === 0) {
			moduleHtml +=
				'<div class="friends-empty-container"><p class="friends-empty">No friends added yet.</p></div>';
		} else {
			moduleHtml += '<ul class="rail-module__list friends-items">';

			mutualFriends.forEach((user) => {
				const username = user.username || "Unknown User";
				const avatar =
					user.avatar ||
					"https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg";
				const profileUrl = `/wiki/User:${encodeURIComponent(username)}`;

				moduleHtml += `
                     <li class="friends-item">
                         <a href="${profileUrl}" class="friends-link">
                             <img src="${avatar}" alt="${username}" class="friends-avatar" />
                             <span class="friends-username">${mw.html.escape(username)}</span>
                         </a>
                     </li>
                 `;
			});

			moduleHtml += "</ul>";
		}

		const currentUserId = mw.config.get("wgUserId");
		if (currentUserId && currentUserId !== profileUserId) {
			const buttonHtml = createFriendButton(currentUserData);
			moduleHtml += buttonHtml;
		}

		moduleHtml += "</section>";

		return moduleHtml;
	};

	// friends button
	const createFriendButton = (currentUserData) => {
		const myFriendList = extractFriendListData(currentUserData);
		const myFriendIds = parseFriendIds(myFriendList);
		const iHaveThem = myFriendIds.includes(profileUserId.toString());

		let buttonHtml =
			'<hr>';
		buttonHtml +=
			'<div class="friends-action-container">';
		buttonHtml += `<button class="wds-button wds-is-secondary friends-action-btn" data-profile-id="${profileUserId}" data-i-have-them="${iHaveThem}">Loading...</button>`;
		buttonHtml += "</div>";

		return buttonHtml;
	};

	const updateFriendButton = (profileData, currentUserData) => {
		const $btn = $(".friends-action-btn");
		if (!$btn.length) return;

		const theirFriendList = extractFriendListData(profileData);
		const currentUserId = mw.config.get("wgUserId");
		const theirFriendIds = parseFriendIds(theirFriendList);
		const theyHaveMe = theirFriendIds.includes(currentUserId.toString());
		const myFriendList = extractFriendListData(currentUserData);
		const myFriendIds = parseFriendIds(myFriendList);
		const iHaveThem = myFriendIds.includes(profileUserId.toString());

		let buttonText;
		let buttonAction;
		let buttonClass;

		if (iHaveThem && theyHaveMe) {
			buttonText = "Remove Friend";
			buttonAction = "remove";
			buttonClass = "wds-is-secondary";
		} else if (iHaveThem && !theyHaveMe) {
			buttonText = "Cancel Friend Request";
			buttonAction = "cancel";
			buttonClass = "wds-is-secondary";
		} else if (!iHaveThem && theyHaveMe) {
			buttonText = "Accept Friend Request";
			buttonAction = "accept";
			buttonClass = "";
		} else {
			buttonText = "Send Friend Request";
			buttonAction = "send";
			buttonClass = "";
		}

		$btn
			.text(buttonText)
			.attr("data-action", buttonAction)
			.attr("data-i-have-them", iHaveThem)
			.attr("data-they-have-me", theyHaveMe)
			.removeClass("wds-is-secondary")
			.addClass(buttonClass);
	};

	const handleFriendButtonClick = function (e) {
		e.preventDefault();
		const $btn = $(this);
		const action = $btn.attr("data-action");
		const currentUserId = mw.config.get("wgUserId");

		if ($btn.prop("disabled")) return;

		$btn.prop("disabled", true).text("Processing...");

		$.ajax({
				url: `https://services.fandom.com/user-attribute/user/${currentUserId}`,
				type: "GET",
				xhrFields: {
					withCredentials: true
				}
			})
			.done((currentUserData) => {
				const myFriendList = extractFriendListData(currentUserData);

				const myFriendIds = parseFriendIds(myFriendList);
				let newFriendIds;

				if (action === "send" || action === "accept") {
					if (!myFriendIds.includes(profileUserId.toString())) {
						myFriendIds.push(profileUserId.toString());
					}
					newFriendIds = myFriendIds.join(", ");
				} else if (action === "remove" || action === "cancel") {
					newFriendIds = myFriendIds
						.filter((id) => id !== profileUserId.toString())
						.join(", ");
				}

				$.ajax({
						type: "PATCH",
						url: `https://services.fandom.com/user-attribute/user/${currentUserId}`,
						data: {
							coverPhoto: newFriendIds
						},
						xhrFields: {
							withCredentials: true
						}
					})
					.done(() => {
						location.reload();
					})
					.fail((error) => {
						console.error("[FriendMe] PATCH failed:", error);
						$btn.prop("disabled", false).text("Error - Try Again");
					});
			})
			.fail((error) => {
				console.error("[FriendMe] Failed to fetch current user data:", error);
				$btn.prop("disabled", false).text("Error - Try Again");
			});
	};

	// insertion
	const insertModule = (moduleHtml, profileData, currentUserData) => {
		const $rail = $("#WikiaRail");
		if ($rail.length > 0) {
			$rail.prepend(moduleHtml);

			const currentUserId = mw.config.get("wgUserId");
			if (currentUserId && currentUserId !== profileUserId) {
				updateFriendButton(profileData, currentUserData);
				$(document).on("click", ".friends-action-btn", handleFriendButtonClick);
			}
		} else {
			console.error(
				"[FriendMe] WikiaRail not found when trying to insert module"
			);
		}
	};

	// initilization
	const init = () => {
		const currentUserId = mw.config.get("wgUserId");

		$.when(
				fetchProfileData(),
				currentUserId ?
				$.ajax({
					url: `https://services.fandom.com/user-attribute/user/${currentUserId}`,
					type: "GET",
					xhrFields: {
						withCredentials: true
					}
				}) :
				$.Deferred().resolve(null)
			)
			.done((profileDataResult, currentUserDataResult) => {
				const profileData = profileDataResult[0];
				const currentUserData = currentUserDataResult ?
					currentUserDataResult[0] :
					null;

				const friendListData = extractFriendListData(profileData);
				const friendIds = parseFriendIds(friendListData);

				fetchFriendsData(friendIds)
					.done((friendsData) => {
						const moduleHtml = createFriendsModule(
							friendsData,
							currentUserData
						);

						mw.hook("fandom.rightrail.loaded").add(() => {
							insertModule(moduleHtml, profileData, currentUserData);
						});
					})
					.fail((error) => {
						console.error("[FriendMe] Failed to fetch friends data:", error);
					});
			})
			.fail((error) => {
				console.error(
					"[FriendMe] Failed to fetch profile or current user data:",
					error
				);
			});
	};

	importArticle({
		type: "style",
		article: "u:dev:MediaWiki:FriendMe.css"
	});

	if (document.readyState === "loading") {
		$(document).ready(init);
	} else {
		init();
	}
})();