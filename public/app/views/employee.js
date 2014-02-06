define(['app/views/base', 'app/views/employeelist', 'tpl!tpl/employee-details'], function (View, EmployeeListView, template) {
    return View.extend({
        template: template,
        onFetch: function (data) {
            if (!data || data.length == 0)
                this.$('.no-reports').show();
            else
                this.$('.reports').append(new EmployeeListView({collection: this.model.reports()}).render().el);
        },
        render: function (eventName) {
            this.$el.html(this.template(this.model.toJSON()));
            if (this.model.reports) {
                this.model.reports && this.model.reports().fetch({
                    success: this.onFetch.bind(this)
                });
            } else {
                this.onFetch([]);
            }
            return this;
        }
    });
});