/**
 * Created by hujianmeng on 14-5-4.
 */
var userController = require('./user');
var slateController = require('./slate');

module.exports = function (app) {
    //开发环境
    app.get('/*', slateController.seajs);
    //登录
    app.get('/login', userController.login);
}