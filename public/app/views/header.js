define(['app/views/base', 'backbone', 'underscore', 'app/models/employeemodel', 'app/views/employeelist', 'tpl!tpl/header'], function (View, Backbone, _, model, EmployeeListView, template) {

    return View.extend({
        template: template,
        className: 'container',
        events: {
            'click .dropdown-menu a': 'onActivate',
            "keyup .search-query": "search",
            'submit': 'onSubmit'
        },
        onSubmit: function (e) {
            e.preventDefault();
        },
        onActivate: function (e) {
            var $ct = $(e.currentTarget);
            $ct.parent().removeClass('active');
            $ct.addClass('active');
            this.$search.val('')
        },
        initialize: function (options) {
            Backbone.View.prototype.initialize.call(this, options);
            this.searchResults = new model.EmployeeCollection();
            this.searchresultsView = new EmployeeListView({collection: this.searchResults, className: 'dropdown-menu'});
        },
        render: function (opts) {
            View.prototype.render.call(this, opts);
            this.$search = this.$('#searchText');
            return this;
        },
        search: function (event) {
            var $search = this.$search;
            var key = $search.val();
            this.searchResults.findByName(key);
            var results = this.searchresultsView;
            setTimeout(function () {
                $search.parent().addClass('open').append(results.render().$el.empty());
            });
        }

    });
});