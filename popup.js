let LIST = []

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

 const addNewLink = (e) => {
  const dataToSave = {
    url: e.target.elements['link'].value,
    tags: Array.from(e.target.elements['tags'].selectedOptions).map(v => v.value) || [],
    notes: e.target.elements['notes'].value || '',
  }

  chrome.storage.sync.get(['listResourcesLinkedin'], (result) => {
    if (result.listResourcesLinkedin === undefined) {
      result.listResourcesLinkedin = []
    }
    chrome.storage.sync.set({listResourcesLinkedin: [...result.listResourcesLinkedin, dataToSave]});
  });

  chrome.notifications.create('1', { title: 'Sharing is caring!', type: 'basic', message: 'Resource added!', iconUrl:'icon.png'})
}

const generateList = async() => {
    LIST = await getLocalStorageValue('listResourcesLinkedin');

    return LIST.map(resource => (`<div class='row'><div class='col sm tags'>${resource.tags.map(t => `<span class='tag'>${t}</span>`).join(" ")}</div><div class='col md'>${resource.notes}</div><div class='col sm'><a class="link" href='${resource.url}' target="_blank">> Link</a></div></div>`))
}

const cleanList = () => {
    LIST = []
    chrome.storage.sync.set({listResourcesLinkedin: []});
    generateList().then(list => document.querySelector('#listResources').innerHTML = list.join(''))
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cleanListResources').addEventListener('click', cleanList);
    generateList().then(list => document.querySelector('#listResources').innerHTML = list.join(''))
});

// Handling tabs switch
function onTabClick(event) {
  let activeTabs = document.querySelectorAll('.active');

  activeTabs.forEach(function(tab) {
    tab.className = tab.className.replace('active', '');
  });

  event.target.parentElement.className += ' active';
  document.getElementById(event.target.href.split('#')[1]).className += ' active';
}

const element = document.getElementById('nav-tab');
const form = document.getElementById('formAddResource');

element.addEventListener('click', onTabClick, false);
form.addEventListener('submit', addNewLink);

