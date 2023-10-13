function normalizeURL(url) {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
    url = `https://${url}`
  }
  return new URL(url);
}

async function saveOptions(e) {
    e.preventDefault();
    _blockedSites = document.getElementById("pages").value.split('\n');
    _blockedSites.forEach( (value, index, array) => {
        array[index] =  normalizeURL(value).hostname;
    });
    _leadingText = document.getElementById("leading").value;
    _reminders = document.getElementById("reminders").value.split('\n');
    await browser.storage.local.set({leadingText: _leadingText});
    await browser.storage.sync.set({
      leadingText: _leadingText
    });
    await browser.storage.local.set({reminders: _reminders});
    await browser.storage.sync.set({
      reminders: _reminders
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

    try {
      let res = await browser.storage.local.get('leadingText');
      document.getElementById("leading").value = res.leadingText
  } catch {

  }
  
  try {
      res = await browser.storage.sync.get('leadingText');
      document.getElementById("leading").value = res.leadingText
  } catch {

  }

  try {
    let res = await browser.storage.local.get('reminders');
    document.getElementById("reminders").value = res.reminders.join('\n');
} catch {

}

try {
    res = await browser.storage.sync.get('reminders');
    document.getElementById("reminders").value = res.reminders.join('\n');
} catch {

}
    
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);