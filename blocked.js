// Substitute website name to whatever the query parameter is
var query = URI(document.URL).query(true);
var website = document.getElementById('website_name');
website.innerHTML = query.site;
// Substitute list to whatever we had on options (soonTM)
var list = document.getElementById('things');
list.replaceChildren = 'TODO: This'
// Add a timer to the procceed button
var button = document.getElementById('proceed');
button.onclick = function() { 
    let data = browser.storage.session.get('exceptions');
    browser.tabs.getCurrent().then( (tab) => {
        if (data == null || data.exceptions === undefined) {
            browser.storage.session.set({'exceptions': [tab.id]}); //TODO: Make this per tab and per site too
        } else {
            data.exceptions.append(tab.id);
            browser.storage.session.set({'exceptions': data.exceptions}); //TODO: Make this per tab and per site too
        }
        }
    );
    location.replace('https://' + query.site);

    // TODO: somehow recover full url instead of hostname
}; 

var seconds = 5;
function buttonTimer() {
    if (seconds <= 0) {
        seconds = 0;
        button.innerHTML = 'Proceed';
        button.disabled = false;
    } else {
        button.disabled = true;
        button.innerHTML = seconds;
        seconds -= 1;
        setTimeout(buttonTimer.bind(this), 1000);
    }
}
buttonTimer();
