
let highlighted_content = "";

//an eventlistener that listen to the open of context manual

//Q: does each web page has a service worker or is a service worker shared with all pages  

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      console.log(request.message);
      //update highghted content
    }
);

