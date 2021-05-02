# SocialGEMS
`SocialGEMS` is a Chrome Extension to save locally resources from interesting posts/profiles/comments from Linkedin.

# How to install the Chrome Extension
The easier way is to download the extension through the chrome extension marketplace.

If you want to get the extension and use it with the `developer mode`, you should:
- Fork this repository
- Enable `Developer Mode` by toggling the switch to the right on Chrome
- Click the `Load Unpacked` button that appears when developer mode is on
- Select the `sharing_is_caring` folder

Your browser will immediately be updated with the icon on the upper right corner with your other installed extensions.

# How the extension is working
A user can create a resource for Linkedin website.
Each time a new resource is added by the user, the background script is sending a message through the Chrome API to the content script.
The content script will scrape the URL sent by the background script and will return the data via message with the Chrome API.