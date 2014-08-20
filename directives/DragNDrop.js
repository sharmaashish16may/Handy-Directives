angular.module('dragNdrop', []).directive('droppable', function() {
  return {
    scope: {
      drop: '&' // parent
    },
    link: function(scope, element) {
      var el = element[0];
      el.addEventListener('drop', function(e) {
        this.classList.remove('over');
        scope.$apply('drop()');
        return false;
      }, false);
      el.addEventListener('dragover', function(e) {
        e.dataTransfer.dropEffect = 'move';
        if (e.preventDefault) e.preventDefault();
        this.classList.add('over');
        return false;
      }, false);
    }
  }
}).directive('draggable', function() {
  return {
    scope: {
      drag: '&' // parent
    },
    link: function(scope, element) {
      var el = element[0];
      el.draggable = true;
      el.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('TEXT', " ");
        e.dataTransfer.effectAllowed = 'move';
        this.classList.add('drag');
        scope.$apply('drag()');
        return false;
      }, false);

      el.addEventListener('dragend', function(e) {
        this.classList.remove('drag');
        return false;
      }, false);
    }
  }
});