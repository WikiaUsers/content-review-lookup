/**
 * Name:        FriendMe
 * Version:     v2.0
 * Author:      t7ru [[User:Gabonnie]]
 * Description: A simple system to add friends to your Fandom profile!
 */
(() => {
	"use strict";

	// prevents the script from reruns
	if (window.friendsModuleLoaded) return;
	window.friendsModuleLoaded = true;

	const API_BASE_URL = "https://services.toru.ca";
	const namespaces = [2, 500, 1200, 3]; // User, Message Wall, User blog, User talk
	const currentNamespace = mw.config.get("wgNamespaceNumber");
	const profileUserId = Number(mw.config.get("profileUserId"));
	const currentUserId = mw.config.get("wgUserId");

	if (!namespaces.includes(currentNamespace) || !profileUserId) return;

	// logic (a bunch of helpers and whatnot)
	const parseFriendIds = (userData) => {
		const friends = (userData && userData.friends) || [];
		return friends.map((id) => id.toString()).filter((id) => /^\d+$/.test(id));
	};

	const apiRequest = (endpoint, method = "GET", data = null) => {
		return $.ajax({
			url: `${API_BASE_URL}${endpoint}`,
			type: method,
			contentType: data ? "application/json" : undefined,
			data: data ? JSON.stringify(data) : undefined,
			xhrFields: {
				withCredentials: false
			}
		});
	};

	const fetchFriendsData = (friendIds) => {
		if (!friendIds.length) return $.Deferred().resolve({
			users: {}
		});
		const query = friendIds.map((id) => `id=${id}`).join("&");
		return apiRequest(`/user/bulk?${query}`);
	};

	const updateFriendButton = (profileData, currentUserData) => {
		const $btn = $(".friends-action-btn");
		if (!$btn.length) return;

		const theirFriendIds = parseFriendIds(profileData);
		const myFriendIds = parseFriendIds(currentUserData);

		const theyHaveMe = theirFriendIds.includes(currentUserId.toString());
		const iHaveThem = myFriendIds.includes(profileUserId.toString());

		let config = {
			text: "Send Friend Request",
			action: "send",
			class: ""
		};

		if (iHaveThem && theyHaveMe) {
			config = {
				text: "Remove Friend",
				action: "remove",
				class: "wds-is-secondary"
			};
		} else if (iHaveThem) {
			config = {
				text: "Cancel Friend Request",
				action: "cancel",
				class: "wds-is-secondary"
			};
		} else if (theyHaveMe) {
			config = {
				text: "Accept Friend Request",
				action: "accept",
				class: ""
			};
		}

		$btn.text(config.text)
			.attr("data-action", config.action)
			.removeClass("wds-is-secondary")
			.addClass(config.class)
			.prop("disabled", false);
	};

	const handleFriendButtonClick = function(e) {
		e.preventDefault();
		const $btn = $(this);
		const action = $btn.attr("data-action");

		$btn.prop("disabled", true).text("Processing...");

		apiRequest(`/user/${currentUserId}`).done((currentUserData) => {
			let myFriendIds = parseFriendIds(currentUserData);

			if (action === "send" || action === "accept") {
				if (!myFriendIds.includes(profileUserId.toString())) {
					myFriendIds.push(profileUserId.toString());
				}
			} else {
				myFriendIds = myFriendIds.filter((id) => id !== profileUserId.toString());
			}

			apiRequest(`/user/${currentUserId}`, "PATCH", {
					friends: myFriendIds
				})
				.done(() => location.reload())
				.fail(() => $btn.prop("disabled", false).text("Error - Try Again"));
		});
	};

	// build rail module
	const createFriendsModule = (friendsData) => {
		const users = friendsData.users || {};
		const mutualFriends = Object.keys(users)
			.map(id => users[id])
			.filter(user => parseFriendIds(user).includes(profileUserId.toString()));

		let html = `
            <section class="rail-module" id="friends-module">
                <h2 class="rail-module__header has-icon">
                    <svg class="wds-icon wds-icon-small" width="18" height="18" viewBox="0 0 18 18"><path d="M12 8.25c1.245 0 2.243-1.005 2.243-2.25S13.245 3.75 12 3.75c-1.245 0-2.25 1.005-2.25 2.25S10.755 8.25 12 8.25zm-6 0c1.245 0 2.243-1.005 2.243-2.25S7.245 3.75 6 3.75c-1.245 0-2.25 1.005-2.25 2.25S4.755 8.25 6 8.25zm0 1.5c-1.748 0-5.25.878-5.25 2.625V14.25h10.5v-1.875c0-1.747-3.502-2.625-5.25-2.625zm6 0c-.218 0-.465.015-.728.038.87.63 1.478 1.478 1.478 2.587v1.875h4.5v-1.875c0-1.747-3.502-2.625-5.25-2.625z"/></svg>
                    Friends
                </h2>`;

		if (mutualFriends.length === 0) {
			html += '<div class="friends-empty-container"><p class="friends-empty">No friends added yet.</p></div>';
		} else {
			html += '<ul class="rail-module__list friends-items">';
			mutualFriends.forEach((user) => {
				const name = user.username || "Unknown User";
				const avatar = user.avatar || "https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg";
				html += `
                    <li class="friends-item">
                        <a href="/wiki/User:${encodeURIComponent(name)}" class="friends-link">
                            <img src="${avatar}" alt="${name}" class="friends-avatar" />
                            <span class="friends-username">${mw.html.escape(name)}</span>
                        </a>
                    </li>`;
			});
			html += "</ul>";
		}

		if (currentUserId && currentUserId !== profileUserId) {
			html += '<hr><div class="friends-action-container"><button class="wds-button wds-is-secondary friends-action-btn">Loading...</button></div>';
		}

		return html + "</section>";
	};

	// initilization
	const init = () => {
		$.when(
			apiRequest(`/user/${profileUserId}`),
			currentUserId ? apiRequest(`/user/${currentUserId}`) : $.Deferred().resolve(null)
		).done((profileRes, currentRes) => {
			const profileData = profileRes[0];
			const currentUserData = currentRes ? currentRes[0] : null;

			fetchFriendsData(parseFriendIds(profileData)).done((friendsData) => {
				const moduleHtml = createFriendsModule(friendsData);

				mw.hook("fandom.rightrail.loaded").add(() => {
					const $rail = $("#WikiaRail");
					if (!$rail.length) return;

					$rail.prepend(moduleHtml);
					if (currentUserId && currentUserId !== profileUserId) {
						updateFriendButton(profileData, currentUserData);
						$(document).on("click", ".friends-action-btn", handleFriendButtonClick);
					}
				});
			});
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