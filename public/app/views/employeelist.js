define(['app/views/base', 'app/views/employeelistitem'], function (View, EmployeeListItemView) {
    return View.extend({

        tagName: 'ul',

        className: 'list-group',
        itemView: EmployeeListItemView,
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render, this);
            this.listenTo(this.collection, 'add', this.add, this);
        },
        add: function (employee) {
            if (!employee)
            return
            this.$el.append(new this.itemView({model: employee}).render().el);
        },
        render: function () {
            if (this.collection.length == 0){
                this.$el.append('<li><i>No matching employees</i></li>')
            }else{
                this.$el.empty();
            }
            this.collection.each(this.add, this);
            return this;
        }
    });


});
