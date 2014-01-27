define(['backbone', 'app', 'tpl!tpl/home'], function (Backbone, app, template) {
    return Backbone.View.extend({
        template: template,
        events: {
            "click #showMeBtn": "showMeBtnClick"
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        showMeBtnClick: function () {
            app.headerView.search();
        }

    });
});