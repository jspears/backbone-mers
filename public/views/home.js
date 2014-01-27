define(['views/base', 'app', 'tpl!tpl/home'], function (View, app, template) {
    return View.extend({
        template: template,
        events: {
            "click #showMeBtn": "showMeBtnClick"
        },

        showMeBtnClick: function () {
            app.headerView.search();
        }

    });
});