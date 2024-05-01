(async () => {
  function debounce(fn, delay) {
    let timer = null;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  document.addEventListener(
    "selectionchange",
    debounce(async (event) => {
      let selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
      // sending the highlighted content to the sidepanel
      const response = await chrome.runtime.sendMessage({ message: selection });

      /** TODOs:
       * 1. Set up receiving end on the side panel and implement in-sync display of content
       */
      
    }, 250)
  );
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message contains the highlighted content
  if (message && message.message) {
    // Assuming you have a DOM element with id "highlightedContent" to display the content
    const highlightedContentElement = document.getElementById("highlightedContent");
    if (highlightedContentElement) {
      // Update the content of the element with the received highlighted content
      highlightedContentElement.textContent = message.message;
    }
  }
});
