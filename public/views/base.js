define(['backbone'], function (Backbone) {
    return Backbone.View.extend({
        render: function (eventName) {
            this.$el.html(this.template(this.model && this.model.toJSON() || {}));
            return this;
        }
    });
});