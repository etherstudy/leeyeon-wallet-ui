// eslint-disable-next-line no-undef
chrome.browserAction.onClicked.addListener(function () {
  // eslint-disable-next-line no-undef
  chrome.tabs.create({ 'url': chrome.extension.getURL('index.html') },
    // eslint-disable-next-line no-unused-vars
    function (tab) {
    // Tab opened.
    })
})
