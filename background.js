chrome.action.onClicked.addListener(function(tab){
    console.log('Toggle app')
    chrome.tabs.sendMessage(tab.id,"toggle");
});
