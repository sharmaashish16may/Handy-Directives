var max = 5;
angular.module('rating', []).directive('starRating', function($compile) {
  return {
    template: '<div></div>',
    replace: true,
    require:"ngModel",
    link: function(scope, element, attr, ngModel) {
      scope.$watch(function(){
        return ngModel.$modelValue;
    }, function(modelValue){
      scope.rating = modelValue;
      updateStars(modelValue, stars);
    });
      var el = angular.element('<span/>');
      var value = 0;
      var stars = [];
      for(var i =1;i<=max;i++){
        var star = angular.element('<span data-id="'+i+'" class="glyphicon glyphicon-star-empty" ng-click="rating='+i+';getRate('+i+')"></span>');
        stars.push(star);
        el.append(star);
        star.bind('mouseover', function(){
          this.classList.remove('glyphicon-star-empty');
          this.classList.add('glyphicon-star');
          value = angular.element(this).attr('data-id');
          updateStars(value, stars);
        }).bind('mouseout', function(){
          updateStars(value, stars);
        });
      }
      el.bind('mouseout', function(){
        updateStars(scope.rating, stars);
      });
      $compile(el)(scope);
      element.append(el);
    }
  }
}).directive('showRating', function($compile) {
  return {
    template: '<div></div>',
    replace: true,
    require:"ngModel",
    link: function(scope, element, attr, ngModel) {
      scope.$watch(function(){
        return ngModel.$modelValue;
    }, function(modelValue){
        console.log(modelValue);
        var el = angular.element('<span/>');
        var value = 0;
        var stars = [];
        for(var i =1;i<=max;i++){
          var star = angular.element('<span data-id="'+i+'" class="glyphicon glyphicon-star-empty"></span>');
          stars.push(star);
          el.append(star);
        }
        updateStars(modelValue, stars);
        $compile(el)(scope);
        element.append(el);
        
    });
    }
  }
});

function updateStars(val, stars){
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