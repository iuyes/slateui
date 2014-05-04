/**
 * Created by hujianmeng on 14-5-4.
 */
var config = require('../config');

exports.seajs = function (req, res, next) {
    var url = req.url;
    if (url.match(/^\/(slate)/)) {
        req.url = url.replace(/\d\.\d\.\d/, 'src');
        next();
    } else if (url.match(/^\/(ui)/)) {
        req.url = url.replace(/\/ui/, '/slate');
        next();
    } else if (url.match(/^\/(alice|jquery|seajs|zepto)/)) {
        res.redirect(301, config.proStaticDomain + url);
    } else {
        next();
    }
};