var fs = require('fs-extra');

var source = './dist/'; //'./dist/index.bundle.js';
var dest = [
        '/mnt/cms/01/firstspirit/htw',
        '/mnt/cms/02/firstspirit/htw',
        '/mnt/delivfr/s01/firstspirit/htw',
        '/mnt/cms/fs122/firstspirit/htw'
    ]

dest.forEach((d) => {
    fs.copy(source, d, function(err) {

        if (err) {
            return console.error(err);
        }

        console.log('Copied to ' + d);

    });
});
