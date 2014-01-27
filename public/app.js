define(['backbone', 'views/header', 'models/employeemodel'], function (Backbone, HeaderView, model) {
    var Employee = model.Employee;
    var App = Backbone.Router.extend({

        routes: {
            "employees/:id": "employeeDetails",
            "*action": "defaultAction"
        },

        initialize: function () {
            this.headerView = new HeaderView();
            $('header').html(this.headerView.render().el);

            // Close the search dropdown on click anywhere in the UI
            $('body').click(function () {
                $('.dropdown').removeClass("open");
            });
        },
        defaultAction: function (action) {
            console.log('routing', action);
            var sp = (action || 'home').split('/');
            require(['views/' + sp.shift()], function (View) {
                if (this.currentView) {
                    this.currentView.remove();
                }
                $('#content').html((this.currentView = new View({idx: sp.pop(), router: this}).render()).el);
            }.bind(this));

        },
        employeeDetails: function (id) {
            var employee = new Employee({id: id});
            employee.fetch({
                success: function (data) {
                    require(['views/employee'], function (EmployeeFullView) {
                        // Note that we could also 'recycle' the same instance of EmployeeFullView
                        // instead of creating new instances
                        $('#content').html(new EmployeeFullView({model: data}).render().el);
                    });
                }
            });
        }

    });
    return {
        initialize: function () {
            var ret = new App();
            Backbone.history.start();
            return ret;
        }
    };
});