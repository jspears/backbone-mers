define([ 'jquery', 'underscore', 'backbone', 'views/base' ], function($, _, Backbone, Base) {

  describe('Base view', function() {

    var el, tmpl, model;

    beforeEach(function() {
      equal   = $('<div />');
      tmpl    = _.template('<%= model.someText %>'),
      model   = new (Backbone.Model.extend({}))({ someText: 'Some Text' });
    });

    it('should render the template', function() {
      var base = new Base({ el: el, model: model });
      base.template = tmpl;
      base.render();

      expect(base.$el.html()).to.equal('Some Text');
    });

  });

});