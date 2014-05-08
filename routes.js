/**
 * Created by hujianmeng on 14-5-4.
 */
var userController = require('./controller/user');
var slateController = require('./controller/slate');
var appController = require('./controller/app');
var toolsController = require('./controller/tools');
var articleController = require('./controller/article')

module.exports = function (app) {
    //开发环境
    app.get('/*', slateController.seajs);
    //登录
    app.get('/login', userController.login);
    app.post('/login', userController.login);
    //应用列表
    app.get('/apps', appController.list);
    //tools-文件遍历
    app.get('/tools/directory', toolsController.directory);

    //文章管理
    app.get('/article/add', articleController.add);
}