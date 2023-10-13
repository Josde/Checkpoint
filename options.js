function normalizeURL(url) {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
    url = `https://${url}`
  }
  return new URL(url);
}

async function saveOptions(e) {
    e.preventDefault();
    values = document.getElementById("pages").value.split('\n');
    values.forEach( (value, index, array) => {
        array[index] =  normalizeURL(value).hostname;
    });

    await browser.storage.local.set({blockedSites: values});
    await browser.storage.sync.set({
        blockedSites: values
    });
  }
  
  async function restoreOptions() {
    //TODO: Maybe try catch is not needed
    try {
        let res = await browser.storage.local.get('blockedSites');
        document.getElementById("pages").value = res.blockedSites.join('\n');
    } catch {

    }
    
    try {
        res = await browser.storage.sync.get('blockedSites');
        document.getElementById("pages").value = res.blockedSites.join('\n');
    } catch {

    }
    
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);