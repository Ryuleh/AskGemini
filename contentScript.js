(async () => {
    function debounce(fn, delay) {
        let timer = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        };
      };
      
      document.addEventListener("selectionchange", debounce( async (event) => {
        let selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
        const response = await chrome.runtime.sendMessage({message: selection});
      }, 250));
})();


//Test code
    /*
    document.addEventListener("click", async () => {
        const response = await chrome.runtime.sendMessage({greeting: "hello"});
        // do something with response here, not outside the function
        console.log(response.farewell);

    })

    document.addEventListener("selectionchange", async () => {

        let selection = document.selection ? document.getSelection().toString() : "Selection nothing";
        const response = await chrome.runtime.sendMessage({greeting: selection});
        // do something with response here, not outside the function
        console.log(selection);
        console.log(response.farewell);

    })

    document.addEventListener("selectionchange", () => {
        console.log(document.getSelection().toString());
    });*/
