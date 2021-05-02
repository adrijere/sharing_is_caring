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

async function getLocalStorageValue(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, function (result) {
                resolve(result[key]);
            })
        }
        catch (ex) {
            reject(ex);
        }
    });
}

const analyzeResource = (url) => {
    console.log(url);
}

const init = () => {
    console.log('Running content script')

    chrome.storage.sync.get('listResourcesLinkedin', (result) => {
        console.log(typeof(result))
        result.listResourcesLinkedin.forEach(resource => {
            analyzeResource(resource.url);
        })
    });
}

init();