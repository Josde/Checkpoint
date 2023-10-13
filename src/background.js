browser.tabs.onUpdated.addListener(function (_id, _info, _tab) {
    if (_info.status === "loading" && _tab.url) {
      browser.storage.local.get({ blockedSites: [] }).then((data) => {
        const currentSite = new URL(_tab.url).hostname;
        //TODO: this still does not detect a few cases, like urls starting with www.
        // make a better normalize function and just reuse it i guess
        // or maybe uri.js has one
        data.blockedSites.forEach(hostname => {
          if (currentSite === hostname) {
            browser.storage.session.get({ exceptions: [] }).then((data) => {
            
            if (data.exceptions == null || !data.exceptions.includes(_id)) {
              browser.tabs.update(_id, { url: `src/blocked.html?site=${currentSite}` });
               
            } 
          });
      }});
    }
  )}
});



function handleInstalled(details) {
  browser.tabs.create({
    url: "src/options.html",
  });
}

browser.runtime.onInstalled.addListener(handleInstalled);
