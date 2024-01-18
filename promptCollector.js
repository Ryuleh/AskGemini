
let highlighted_content = "";

//an eventlistener that listen to the open of context manual

//Q: does each web page has a service worker or is a service worker shared with all pages  

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      console.log(request.message);
      //update highghted content
    }
);

/*
console.log("hellooo???");
  //Testing code
 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");

      console.log("hellooo???2");
      console.log(request.message)

      sendResponse({farewell: "done"})
    }
  );
  */