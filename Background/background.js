import './promptGenerator.js';
import './promptCollector.js';
import './answersGenerator.js';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );

  chrome.runtime.onInstalled.addListener(async () => {
      chrome.contextMenus.create({
        id: 'OpenAskGPT',
        title: "Open AskGPT",
        type: 'normal'
      });
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'OpenAskGPT') {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab.windowId });
    }
  });
