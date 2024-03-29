var fs = require('fs');
var root_path = process.argv[2];
var w_file = 'res.lst';
function getAllFiles(root) {
    var res = [] , files = fs.readdirSync(root);
    files.forEach(function (file) {
        var pathname = root + '/' + file
            , stat = fs.lstatSync(pathname);
console.log(pathname.match(/\.css/g));
        if (!stat.isDirectory()) {
            if(pathname.match(/\.css/g))
            res.push(pathname.replace(root_path, '.'));
        } else {
            res = res.concat(getAllFiles(pathname));
        }
    });
    return res
}
var w_content = getAllFiles(root_path).join('\n');
fs.readFile(root_path + w_file, function (err, data) {
    if (err && err.errno == 33) {
        fs.open(w_file, "w", 0666, function (e, fd) {
            if (e) throw e;
            fs.write(fd, w_content, 0, 'utf8', function (e) {
                if (e) throw e;
                fs.closeSync(fd);
            })
        });
    } else {
        fs.writeFile(root_path + w_file, w_content, function (e) {
            if (e) throw e
        })
    }
})