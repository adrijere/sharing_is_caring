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

const defineTypeOfUrl = (url) => {
  let type;

  if (url.includes('/in/')) {
    type = `😎`;
  } else if (url.includes('comment')) {
    type = `💬`;
  } else {
    type = `📝`;
  }

  return type;
}

 const addNewLink = (e) => {
  const url = e.target.elements['link'].value;
  const dataToSave = {
    url: url,
    tags: e.target.elements['tags'].value.split(',').filter(v => v) || [],
    notes: e.target.elements['notes'].value || '',
    type: defineTypeOfUrl(url),
  }

  chrome.storage.sync.get(['listResourcesLinkedin'], (result) => {
    if (result.listResourcesLinkedin === undefined) {
      result.listResourcesLinkedin = []
    }
    chrome.storage.sync.set({listResourcesLinkedin: [...result.listResourcesLinkedin, dataToSave]});
  });

  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {message: "newLinkAdded", url: url}, (response) => {
  //     console.log("Response from content script : ", response);
  //   });
  // });

  chrome.notifications.create('1', { title: 'SocialGems', type: 'image', message: 'Resource added!', iconUrl:'./images/ruby.png'})
}

const generateList = async() => {
    resourcesList = await getLocalStorageValue('listResourcesLinkedin') || [];

    return (resourcesList || []).map(resource => (`<div class='row'><div class='col sm tags'>${resource.tags.map(t => `<span class='tag'>${t}</span>`).join(" ")}</div><div class='col sm'>${resource.type}</div><div class='col md'>${resource.notes}</div><div class='col sm'><a class="link" href='${resource.url}' target="_blank">> Link</a></div></div>`))
}

const cleanList = () => {
    chrome.storage.sync.set({listResourcesLinkedin: []});
    generateList().then(list => document.querySelector('#listResources').innerHTML = list.join(''))
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cleanListResources').addEventListener('click', cleanList);
    generateList().then(list => document.querySelector('#listResources').innerHTML = list.join(''))
});

// Handling tabs switch
const onTabClick = (event) => {
  let activeTabs = document.querySelectorAll('.active');

  activeTabs.forEach(function(tab) {
    tab.className = tab.className.replace('active', '');
  });

  event.target.parentElement.className += ' active';
  document.getElementById(event.target.href.split('#')[1]).className += ' active';
}

const navBar = document.getElementById('nav-tab');
const bottomMonkey = document.getElementById('about-us');
const form = document.getElementById('formAddResource');

navBar.addEventListener('click', onTabClick, false);
bottomMonkey.addEventListener('click', onTabClick, false);
form.addEventListener('submit', addNewLink);

// tag handling

var tags = [];
var $container = document.querySelector('.tag-field');
var $input = document.querySelector('.tag-field input');
var $tags = document.querySelector('.js-tags');
var $tagsList = document.getElementById('tags');

$container.addEventListener('keydown', function(evt) {
  if ( !evt.target.matches('.js-tag-input') ) {
    return;
  }
  
  // if the keyCode is `,`
  if ( evt.keyCode !== 188 ) {
    return;
  }
  
  var value = String(evt.target.value);
  
  if (!value.length) {
    return;
  }
  
  tags.push(evt.target.value);
  render(tags, $tags);
  $input.value = '';
});

$container.addEventListener('keydown', function(evt) {
  if ( !evt.target.matches('.js-tag-input') ) {
    return;
  }
  
    // if the keyCode is `ESC`
  if ( evt.keyCode !== 8 ) {
    return;
  }
  
  if ( String(evt.target.value).length ) {
    return;
  }
  
  tags = tags.slice(0, tags.length - 1);
  $input.value = '';
  render(tags, $tags);
});

$container.addEventListener('click', function(evt) {
  if ( evt.target.matches('.js-tag-close') || evt.target.matches('.js-tag') ) {
    tags = tags.filter(function(tag, i) {
      return i != evt.target.getAttribute('data-index');
    });
    render(tags, $tags);
  }
}, true);
 

function render(tags, el) {
  $tagsList.value = '';

  el.innerHTML = tags.map(function(tag, i) {
    $tagsList.value += `${tag},`;

    return (
      '<div class="tag js-tag" data-index="' + i + '">' +
        tag +
        '<span class="tag-close js-tag-close" data-index="' + i + '">×</span>' +
      '</div>'
   );
  }).join('') + ('<div><input placeholder="Enter new tag..." class="js-tag-input"></div>')
  ;
  
  $container.querySelector('.js-tag-input').focus();
}