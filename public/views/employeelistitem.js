define(['views/base', 'tpl!tpl/employee-list-item'], function (View, template) {
    return View.extend({
        tagName: "li",
        template: template,
        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        }

    });
})