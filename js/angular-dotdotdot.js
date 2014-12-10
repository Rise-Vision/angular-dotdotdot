angular.module('dotdotdot-angular', [])
	.directive('dotdotdot', function(){
		return {
			restrict: 'A',
			link: function(scope, element) {
				scope.$watch(function() {
					$(element).dotdotdot({watch: true});
				});
			}
		}
	});
