define(['backbone', 'tpl!tpl/employee-list-item'], function (Backbone, itemTemplate) {

    var EmployeeListItemView = Backbone.View.extend({

        tagName: "li",
        template: itemTemplate,
        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });
    return Backbone.View.extend({

        tagName: 'ul',

        className: 'nav nav-list',

        initialize: function () {
            this.collection.bind("reset", this.render, this);
            this.collection.bind("add", this.add, this);
        },
        add: function (employee) {
            this.$el.append(new EmployeeListItemView({model: employee}).render().el);
        },
        render: function (eventName) {
            this.collection.each(this.add, this);
            return this;
        }
    });


});
