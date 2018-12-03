let open = null

// eslint-disable-next-line no-undef
chrome.browserAction.onClicked.addListener(function () {
  if (!open) {
    openTab()
  } else {
    // eslint-disable-next-line no-undef
    chrome.tabs.getAllInWindow(open.windowId, function (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === open.id) {
          // eslint-disable-next-line no-undef
          chrome.tabs.update(open.id, { active: true })
          return
        }
      }
      openTab()
    })
  }
})

function openTab () {
  // eslint-disable-next-line no-undef
  chrome.tabs.create({ 'url': chrome.extension.getURL('index.html') }, function (tab) { open = tab })
}
