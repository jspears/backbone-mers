define(['backbone', 'supermodel'], function (Backbone, Supermodel) {
    var Employee = Supermodel.Model.extend({
        parse: function (resp) {
            if (resp && resp.status === 0) {
                return resp.payload;
            }
            return resp;
        },
        urlRoot: '../api/employees',
        defaults: {
            reports: []
        }

    });

    var EmployeeCollection = Backbone.Collection.extend({

        model: function (attrs, options) {
            return Employee.create(attrs, options);
        },
        url: "../api/employees",
        parse: function (resp) {
            if (resp.status == 0) {
                return resp.payload;
            }
            return resp;
        },
        findByName: function (key) {
            this.fetch({
                url: "../api/employees/search/" + key,
                reset: true
            });
        }

    });
    Employee.has().many('reports', {
        collection: EmployeeCollection.extend({
            url: function () {
                return this.owner.url() + '/reports';
            }
        }),
        inverse: 'manager'

    });

    Employee.has().one('manager', {
        model: Employee,
        inverse: 'reports'
    });

    return {
        Employee: Employee,
        EmployeeCollection: EmployeeCollection
    }
});