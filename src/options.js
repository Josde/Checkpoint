import { getDomain } from  './helpers.js';

async function saveOptions(e) {
    e.preventDefault();
    let _blockedSites = document.getElementById("pages").value.split('\n');
    _blockedSites.forEach( (value, index, array) => {
        array[index] =  getDomain(value);
    });
    let _leadingText = document.getElementById("leading").value;
    let _reminders = document.getElementById("reminders").value.split('\n');
    // TODO: Figure out the storage situation cause this is kind of disgusting.
    await browser.storage.local.set({blockedSites: _blockedSites});
    await browser.storage.sync.set({
      blockedSites: _blockedSites
    });
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
    // FIXME: same thing with storage as above.
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