define(['app/views/base', 'tpl!tpl/employee-list-item'], function (View, template) {
    return View.extend({
        tagName: "li",
        className: 'list-group-item',
        template: template,
        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },
        render: function () {
            var obj =  this.model.toJSON();
            obj.reports = this.model.reports().length;
            this.$el.html(this.template({model:obj}));
            return this;
        }

    });
})