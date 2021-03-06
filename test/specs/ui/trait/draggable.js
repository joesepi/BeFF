define([
  'nbd/util/extend',
  'ui/trait/draggable'
], function(extend, draggable) {
  'use strict';

  describe('ui/trait/draggable', function() {
    beforeEach(function() {
      var $view = affix('div');

      this.view = extend({
        $view: $view
      }, draggable);
    });

    it('sets the default options', function() {
      this.view.makeDraggable();

      expect(this.view.$view.draggable('option', 'handle')).toEqual('.js-drag-handle');
      expect(this.view.$view.draggable('option', 'containment')).toEqual('window');
      expect(this.view.$view.draggable('option', 'cancel')).toEqual('input,textarea,button,select,option, .js-drag-cancel');
    });

    it('sets the specified options', function() {
      var $altView = affix('div');

      this.view.makeDraggable($altView, '.test-handle', '.test-containment', '.test-cancel');

      expect($altView.draggable('option', 'handle')).toEqual('.test-handle');
      expect($altView.draggable('option', 'containment')).toEqual('.test-containment');
      expect($altView.draggable('option', 'cancel')).toEqual('input,textarea,button,select,option, .test-cancel');
    });
  });
});
