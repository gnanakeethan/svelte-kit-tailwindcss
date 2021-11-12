const brotli = require('brotli');
const fs = require('fs');
const gzip = require('gzipme');

const brotliSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
    quality: 11, // 0 - 11,
    lgwin: 12 // default
};

const path = require('path');
const walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};
walk('build/', function (err, results) {
    if (err) throw err;
    console.log(results);
    results.forEach(file => {
        if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.svg')) {
            const result = brotli.compress(fs.readFileSync(file), brotliSettings);
            fs.writeFileSync(file + '.br', result);
            gzip(file, {output: file + '.gz'});
        }
        // console.log(file);
    });
});

