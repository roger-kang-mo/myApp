angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
// .controller('MainCtrl', function($scope, Camera) {
.controller('MainCtrl', function($scope, $ionicModal, Camera) {

  init = function(){
    $scope.hasPermission = false

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    $scope.resetData();
    // $scope.container = jQuery('.container')
    // $scope.container.isotope({
    //   itemSelector : '.picture',
    //   layoutMode: 'fitRows'
    // });
    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      // animation: 'slide-in-up'
      animation: 'nav-title-slide-ios7'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    jQuery('.picture').click(function(e){
      targetElement = jQuery(e.target);

      // if(!targetElement.hasClass('.pictainer')){
        // targetElement = targetElement.parents('.pictainer');
      // }

      // targetElement.next('.comment-wrapper').removeClass('hidden').addClass('poop');
      // setTimeout(function(targetElement) {
      //   jQuery('.comment-wrapper.poop').fadeOut();
      // }, 5000);
    });

    jQuery('body').on('click', '#submit_pic', function(){
      $scope.submitPic();
    });

    jQuery('body').on('click', '.star', function(e){
      $scope.setRating(jQuery(e.target).data('value'));
    })

    jQuery('body').on('click', '#photo-btn', function(event){
      $scope.changePicture(event);
    });


    //   filter: '*',
    //   animationOptions: {
    //     duration: 750,
    //     easing: 'linear',
    //     queue: false
    //   }
    // });
  }

  $scope.initCamera = function(){
    console.log("Cam's ready");
    window.addEventListener("DOMContentLoaded", function() {
      // Grab elements, create settings, etc.
      var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function(error) {
          console.log("Video capture error: ", error.code); 
        };

      // Put video listeners into place
      if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
          video.src = stream;
          video.play();
        }, errBack);
      } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream){
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
        }, errBack);
      }
      else if(navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(videoObj, function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, errBack);
      }
    }, false);
  }

  $scope.resetData = function(){
    $scope.data = {
      name: '',
      rating: 0,
      comment: ''
    }
  }

  $scope.showModal = function(){
    $scope.modal.show();
    // COMMENT FOR DEV
    if (navigator.getUserMedia && !$scope.hasPermission) {
        navigator.getUserMedia({video: true}, $scope.initCamera, function(){console.log("ohshit2");});
    }
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  $scope.submitPic = function(){
    $scope.closeModal();
    $scope.resetData();
  }

  $scope.setRating = function(rating){
    $scope.data.rating = rating;
  }

  $scope.starRated = function(num) {
    return $scope.data.rating > num;
  }

  $scope.changePicture = function(event) {
    event.preventDefault();
    if (!navigator.camera) {
        alert("Camera API not supported", "Error");
        return;
    }
    console.log("HELLO BUTT");
    var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 1,  // 0:Photo Library, 1=Camera, 2=Saved Album
                        encodingType: 0 // 0=JPG 1=PNG
                    };

    navigator.camera.getPicture(
        function(imgData) {
            $('.media-object', this.$el).attr('src', "data:image/jpeg;base64,"+imgData);
        },
        function() {
            alert('Error taking picture', 'Error');
        },
        options);

    return false;
  };

  // $scope.getPhoto = function() {
  //   Camera.getPicture().then(function(imageURI) {
  //     console.log(imageURI);
  //     $scope.lastPhoto = imageURI;
  //   }, function(err) {
  //     console.err(err);
  //   }, {
  //     quality: 75,
  //     targetWidth: 320,
  //     targetHeight: 320,
  //     saveToPhotoAlbum: false
  //   });
  // };
  init();
})
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);