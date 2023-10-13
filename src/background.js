import { getDomain } from "./helpers.js";
browser.tabs.onUpdated.addListener(function (_id, _info, _tab) {
    if (_info.status === "loading" && _tab.url) {
      
      browser.storage.local.get({ blockedSites: [] }).then((data) => {
        const currentSite = getDomain(_tab.url);
        data.blockedSites.forEach(domain => {
          if (currentSite === domain) {
            browser.storage.session.get({ exceptions: [] }).then((data) => {
            
            if (data.exceptions == null || !data.exceptions.includes(_id)) {
              browser.tabs.update(_id, { url: `blocked.html?site=${currentSite}` }); // FIXME: I could use _tab.url to keep full url for redirection, however for some reason this fucks up on urls with www. in them 
               
            } 
          });
      }});
    }
  )}
});



function handleInstalled(details) {
  browser.tabs.create({
    url: "options.html",
  });
}

browser.runtime.onInstalled.addListener(handleInstalled);
