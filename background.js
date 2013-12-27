// background.js

function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf("prod-servicedesk.publicisgroupe.net") > -1) {
		chrome.pageAction.show(tabId);
	}
};


chrome.tabs.onUpdated.addListener(checkForValidUrl);
