angular.module('rating', []).directive('starating', function($compile) {
  return {
    template: '<div></div>',
    replace: true,
    link: function(scope, element) {
      scope.rating = 0;
      var el = angular.element('<span/>');
      var max = 5;
      var value = 0;
      var stars = []
      for(var i =1;i<=max;i++){
        var star = angular.element('<span data-id="'+i+'" class="glyphicon glyphicon-star-empty" ng-click="rating='+i+';getRate('+i+')"></span>');
        stars.push(star);
        el.append(star);
        star.bind('mouseover', function(){
          this.classList.remove('glyphicon-star-empty');
          this.classList.add('glyphicon-star');
          value = angular.element(this).attr('data-id');
          updateStars(value);
        }).bind('mouseout', function(){
          updateStars(value);
        });
      }
      function updateStars(val){
        for(var j=0;j<max;j++){
          if(stars[j].attr('data-id') <= val){
            stars[j].removeClass("glyphicon-star-empty");
            stars[j].addClass("glyphicon-star");
          }else{
            stars[j].removeClass("glyphicon-star");
            stars[j].addClass("glyphicon-star-empty");
          }
        }
      }
      el.bind('mouseout', function(){
        updateStars(scope.rating);
      });
      $compile(el)(scope);
      element.append(el);
    }
  }
});