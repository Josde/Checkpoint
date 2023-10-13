browser.tabs.onUpdated.addListener(function (_id, _info, _tab) {
    if (_info.status === "loading" && _tab.url) {
      browser.storage.local.get({ blockedSites: [] }).then((data) => {
        const currentSite = new URL(_tab.url).hostname;

        data.blockedSites.forEach(hostname => {
          if (currentSite === hostname) {
            browser.tabs.update(_id, { url: `blocked.html?site=${currentSite}` }); 
          }
        });
    }
  )}
});

