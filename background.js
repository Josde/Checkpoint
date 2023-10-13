browser.tabs.onUpdated.addListener(function (_id, _info, _tab) {
    if (_info.status === "loading" && _tab.url) {
      browser.storage.local.get({ blockedSites: [] }).then((data) => {
        const blockedSites = ['twitter.com'];
        const currentSite = new URL(_tab.url).hostname;
        if (blockedSites.includes(currentSite)) {
          browser.tabs.update(_id, { url: `blocked.html?site=${currentSite}` }); 
        }
      });
    }
  });