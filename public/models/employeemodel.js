define(['backbone'], function (Backbone) {
    var Employee = Backbone.Model.extend({

        urlRoot: "../api/employees",

        parse: function (resp) {
            if (resp.status == 0) {
                return resp.payload;
            }
            return resp;
        },
        initialize: function () {
            this.reports = new EmployeeCollection();
            this.reports.url = '../api/employees/' + this.id + '/reports';
        }

    });

    var EmployeeCollection = Backbone.Collection.extend({

        model: Employee,

        url: "../api/employees",
        parse: function (resp) {
            if (resp.status == 0) {
                return resp.payload;
            }
            return resp;
        },
        findByName: function (key) {
            // TODO: Modify service to include firstName in search
            var url = (key == '') ? '../api/employees' : "../api/employees/search/" + key;
            console.log('findByName: ' + key);
            var self = this;
            $.ajax({
                url: url,
                dataType: "json",
                success: function (data) {
                    console.log("search success: " + data.length);
                    self.reset(data);
                }
            });
        }

    });
    return {
        Employee: Employee,
        EmployeeCollection: EmployeeCollection
    }
});