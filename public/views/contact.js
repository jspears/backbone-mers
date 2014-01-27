define(['backbone', 'tpl!tpl/contact'], function (Backbone, template) {
    return Backbone.View.extend({
        template: template,
        render: function (eventName) {
            this.$el.html(this.template());
            return this;
        }

    });
});