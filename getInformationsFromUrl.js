// const observer = new MutationObserver(() => {
//   let target = document.querySelectorAll('[type=ellipsis-horizontal-icon')
//   if(target.length > 0) {
//     target.forEach(s => {
//       let loadButton = document.createElement('button');
//       loadButton.innerText = '💎';
//       loadButton.addEventListener('click', handleData);
//       s.parentNode.parentNode.prepend(loadButton);
//     });
//   };
// })

// function init() {
//   const targetNode = document.querySelector("body");
//   const config = {
//     childList: true,
//   }

//   observer.observe(targetNode, config);
// }

// const handleData = (e) => {
// // e.target.closest('.comments-post-meta__name-text')).innerText) // name of the author of the comments
//   const dataToSave = {
//     name: e.target.parentNode.parentNode.parentNode.querySelector('.feed-shared-actor__name').innerText,
//     url: window.location.href,
//   }

//   chrome.storage.sync.get(['listResourcesLinkedin'], (result) => {
//     if (result.listResourcesLinkedin === undefined) {
//       result.listResourcesLinkedin = []
//     }
//     chrome.storage.sync.set({listResourcesLinkedin: [...result.listResourcesLinkedin, dataToSave]});
//   });
// }

const analyzeUrl = (url) => {
    console.log(`Analyze url: ${url}`)

    chrome.storage.sync.get('listResourcesLinkedin', (result) => {
        console.log(typeof(result))
        result.listResourcesLinkedin.forEach(resource => {
            analyzeResource(resource.url);
        })
    });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log("Request: ", request);
    console.log(document.href, window)
    if (request.message == "newLinkAdded") {
      sendResponse(analyzeUrl(request.url));
    }
  }
);
