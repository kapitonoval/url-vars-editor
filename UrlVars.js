/**
 * UrlVARS
 * operations with URL
 * @simple $.urlVar('get_myvar','valuue');
 * @author Alexey Kapitonov
 * @version 10.05.2016
 */
class UrlVars {
    getVars() {
        var vars = [], hash;
        var pos  = window.location.href.indexOf('?');
        if (pos > 0) {
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
        }
        return vars;
    }

    getVar(key, val) {
        return val === undefined
            ? this.getVars()[key]
            : this.setVar(key, val);
    }

    setVar(key, val) {
        var hashes = $.getUrlVars();

        if (hashes[key] === undefined) {
            hashes.push(key);
        }

        hashes[key] = val;

        var urlString = '';
        hashes.forEach(function (element, index) {
            urlString += ((index === 0) ? '?' : '&') + element + '=' + hashes[element];
        });
        window.history.pushState("object or string", "page name", urlString);
    }

    delVar(key) {
        var hashes = this.getVars();

        if (hashes[key] !== undefined) {
            hashes.splice(hashes.indexOf(key), 1);
            var urlString = '';
            hashes.forEach(function (element, index) {
                urlString += ((index === 0) ? '?' : '&') + element + '=' + hashes[element];
            });
            window.history.pushState("object or string", "page name", urlString);
        }
    }
}

const urlVars = new UrlVars;
export default urlVars;