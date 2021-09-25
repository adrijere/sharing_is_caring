chrome.runtime.onMessage.addListener(function(msg, sender){
    console.log('Got message : ', msg)
    if(msg == "toggle"){
        toggle();
    }
})

let iframe = document.createElement('iframe'); 
iframe.style.background = "green";
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.frameBorder = "none"; 
iframe.src = chrome.runtime.getURL("popup.html")

document.body.appendChild(iframe);

const toggle = () => {
    if(iframe.style.width == "0px"){
        iframe.style.width="600px";
    }
    else{
        iframe.style.width="0px";
    }
}
