/**
 * UrlVARS
 * operations with URL
 * @author Alexey Kapitonov
 * @version 27.09.2012
 */
var urlVars = {
    getVars: function () {
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
    },

    getVar: function (key, val) {
        return val === undefined
            ? this.getVars()[key]
            : this.setVar(key, val);
    },

    setVar: function (key, val) {
        let hashes = this.getVars();

        if (hashes[key] === undefined) {
            hashes.push(key);
        }

        hashes[key] = val;

        var urlString = '';
        hashes.forEach(function (element, index) {
            urlString += ((index === 0) ? '?' : '&') + element + '=' + hashes[element];
        });
        window.history.pushState("object or string", "page name", urlString);
    },

    delVar: function (key) {
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

export default urlVars;