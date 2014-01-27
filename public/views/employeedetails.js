define(['views/employee', 'views/employeelist', 'backbone', 'tpl!tpl/employee-full'], function (EmployeeView, EmployeeListView, Backbone, template) {
    return  Backbone.View.extend({
        template: template,
        onFetch: function (data) {
            if (data.length == 0)
                $('.no-reports').show();
        },
        render: function (eventName) {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('#details').html(new EmployeeView({model: this.model}).render().el);
            this.model.reports.fetch({
                success: this.onFetch.bind(this)
            });
            this.$('#reports').append(new EmployeeListView({model: this.model.reports}).render().el);
            return this;
        }
    });

});
