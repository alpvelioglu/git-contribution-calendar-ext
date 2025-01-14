console.log('serviceWorker script loaded')

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'index.html' });
});