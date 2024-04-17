//constantly extracting highlighted content from the current page
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
      let selection = document.getSelection
        ? document.getSelection().toString()
        : document.selection.createRange().toString();
      //sending the highlighted content to the sidepanel
      const response = await chrome.runtime.sendMessage({ message: selection });

      /** TODOs:
       * 1. Set up receiving end on the side panel and implement in-sync display of content
       */
      
    }, 250)
  );
})();
