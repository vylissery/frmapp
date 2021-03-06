frmControllers.controller('NavController', ['$scope', '$location','remoteDataService','navigationService',
  function($scope, $location,remoteDataService,navigationService) {

    $scope.innerWidth = window.innerWidth;
    $scope.innerHeight = window.innerHeight;
    $scope.searchTerms = "";
    $scope.userData = remoteDataService.userData;
    $scope.currentMessage = {};
    $scope.isMobile = isMobile();
    $scope.messages = null;

    $scope.userImage = $scope.userData.FullPhotoUrl + '?oauth_token=' + $scope.userData.accessToken;

    switch(document.location.hash) {
      case '#/readings':
        $scope.currentMenuItem = 'Readings';
        break;
      case '#/examsettings':
        $scope.currentMenuItem = 'Tests';
        break;
      case '#/dashboard':
        $scope.currentMenuItem = 'Dashboard';
        break;
      case '#/examday':
        $scope.currentMenuItem = 'Exam Details';
        break;
      case '#/messages':
        $scope.currentMenuItem = 'Messages';
        break;
      case '#/glossary':
        $scope.currentMenuItem = 'Glossary';
        break;
      default:
        $scope.currentMenuItem = 'Dashboard';
        break;
    }

    $scope.$on('browserResize', function() {
      $scope.innerWidth = window.innerWidth;
      $scope.innerHeight = window.innerHeight;
    });

    remoteDataService.getMessges(function(err, msgs) {
      if(defined(msgs,"length") && msgs.length > 0)
        $scope.messages = msgs;
    });

    $scope.isOnline = function() {
      return isOnline();
    }

    $scope.openMessage = function(msg) {
        $scope.currentMessage = msg;
        $("#msgModal").modal();
    }

    $scope.searchGlossary = function(terms) {
      remoteDataService.searchTerms = terms;
      $scope.changeView('glossary');
    }

    $scope.changeView = function(view) {
      navigationService.changeView(view);
    }

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };    

    $scope.getEpochDateTimeText = function(epochDate) {
      return getEpochDateTimeText(epochDate);
    }

    $scope.getEpochDateShortText = function(epochDate) {
      return getEpochDateShortText(epochDate);
    }
  }
]);
