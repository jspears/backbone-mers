define(['backbone', 'underscore', 'models/employeemodel', 'views/employeelist', 'tpl!tpl/header'], function (Backbone, _, model, EmployeeListView, template) {

    return Backbone.View.extend({
        template: template,
        className: 'container',
        events: {
            'click .places a': 'onActivate',
            "keyup .search-query": "search",
            'submit':'onSubmit'
        },
        onSubmit:function(e){
            e.preventDefault();
        },
        onActivate: function (e) {
            var $ct = $(e.currentTarget);
            $ct.parent().removeClass('active');
            $ct.addClass('active');
        },
        initialize: function (options) {
            Backbone.View.prototype.initialize.call(this, options);
            this.searchResults = new model.EmployeeCollection();
            this.searchresultsView = new EmployeeListView({collection: this.searchResults, className: 'dropdown-menu'});
        },

        render: function (eventName) {
            this.$el.html(this.template());

            return this;
        },

        search: function (event) {
            var $search = this.$('#searchText');
            var key =$search.val();
            console.log('search ' + key);
            this.searchResults.findByName(key);
            var  results = this.searchresultsView;
            setTimeout(function () {
               $search.parent().addClass('open').append(results.render().el);
            });
        }

    });
});