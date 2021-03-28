
var observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    let target = document.querySelectorAll('[type=ellipsis-horizontal-icon')
    if(target.length > 0) {
      post.observe(target[0], {childList: true})
    };
  })
})

var post = new MutationObserver((mutations) => {
  let selectors = document.querySelectorAll('[type=ellipsis-horizontal-icon')
  if(selectors.length > 0) {
    selectors.forEach(s => {
      let loadButton = document.createElement('button');
      loadButton.innerText = '💎';
      loadButton.addEventListener('click', handleData);
      s.parentNode.parentNode.prepend(loadButton);
    });
    post.disconnect();
  }
})

observer.observe(document.body, { 
  childList: true,
});

const handleData = (e) => {
// e.target.closest('.comments-post-meta__name-text')).innerText) // name of the author of the comments
  const dataToSave = {
    name: e.target.parentNode.parentNode.parentNode.querySelector('.feed-shared-actor__name').innerText,
    url: window.location.href,
  }

  chrome.storage.sync.get(['listResourcesLinkedin'], (result) => {
    if (result.listResourcesLinkedin === undefined) {
      result.listResourcesLinkedin = []
    }
    chrome.storage.sync.set({listResourcesLinkedin: [...result.listResourcesLinkedin, dataToSave]});
  });
}