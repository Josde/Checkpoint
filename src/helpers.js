export function getDomain(url, subdomain) {
    // https://stackoverflow.com/questions/11401897/get-the-current-domain-name-with-javascript-not-the-path-etc
    subdomain = subdomain || false;
  
    url = url.replace(/(https?:\/\/)?(www.)?/i, '');
  
    if (!subdomain) {
        url = url.split('.');
  
        url = url.slice(url.length - 2).join('.');
    }
  
    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }
  
    return url;
  }