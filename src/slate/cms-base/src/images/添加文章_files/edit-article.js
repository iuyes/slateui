seajs.config({
    alias: {
        '$': 'jquery/jquery/2.1.0/jquery',
        'jquery': 'jquery/jquery/2.1.0/jquery',
        'cms.base.js': 'slate/cms-base/1.0.0/cms-base',
        'upload': 'slate/upload/1.0.0/upload',
        'edit.article.css': 'css/cms/edit-article.css'
    }
});

seajs.use(
    [
        '$',
        'cms.base.js',
        'upload',
        'edit.article.css'
    ], function ($, cmsBase, Uploader) {

        $(function () {
            new Uploader({
                trigger: '.upload-btn',
                name: 'image',
                action: 'http://develop.jinxin.bbwc.cn/yaf_attachments/public/index.php/cms/upload/debug/1/datatype/2',
                accept: 'image/*',
                data: {},
                multiple: true,
                error: function (file) {
                    console.log(file);
                },
                success: function (response) {
                    console.log(response);
                },
                progress: function (event, position, total, percent, files) {
                    console.log(percent);
                }
            });
        })
    });