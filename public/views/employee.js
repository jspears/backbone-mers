define(['backbone', 'tpl!tpl/employee-details'], function (Backbone, template) {
    return Backbone.View.extend({
        template: template,
        initialize:function(){
            this.listenTo(this.model, 'change', this.render);
//            this.model.bind("change", this.render, this);
        },
        render: function (eventName) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});