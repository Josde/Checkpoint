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
    location.replace('https://' + query.site);
    // TODO: Disable the extension too
    // also fix potato code
    // also somehow recover full url instead of hostname
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
