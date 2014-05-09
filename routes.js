/**
 * Created by hujianmeng on 14-5-4.
 */
var userController = require('./controller/user');
var slateController = require('./controller/slate');
var appController = require('./controller/app');
var toolsController = require('./controller/tools');
var articleController = require('./controller/article');
var frontController = require('./controller/front');

module.exports = function (app) {
    //开发环境
    app.get('/*', slateController.seajs);
    //登录
    app.get('/', userController.login);
    app.get('/login', userController.login);
    app.post('/login', userController.login);
    app.get('/logout', userController.logout);
    //应用列表
    app.get('/apps', appController.list);
    //tools-文件遍历
    app.get('/tools/directory', toolsController.directory);
    app.post('/tools/upload', toolsController.upload);
    app.options('/tools/upload', toolsController.upload);

    //文章管理
    app.get('/article/add', articleController.add);
    app.get('/pdf/add', articleController.add);

    //前端管理
    app.get('/front/templates', frontController.templates); //模板文件管理
    app.get('/front/modules', frontController.modules);  //slateui模块管理
    app.get('/front/template/:name', frontController.getTemplate);
    app.get('/front/module/:name', frontController.getModule);
}