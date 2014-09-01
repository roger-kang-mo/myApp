// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
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
.controller('MainCtrl', function($scope, $ionicModal) {

  init = function(){

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

    jQuery('.pictainer').click(function(e){
      targetElement = jQuery(e.target);

      if(!targetElement.hasClass('.pictainer')){
        targetElement = targetElement.parents('.pictainer');
      }

      targetElement.find('.comment-wrapper').removeClass('hidden').addClass('poop');
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


    //   filter: '*',
    //   animationOptions: {
    //     duration: 750,
    //     easing: 'linear',
    //     queue: false
    //   }
    // });
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
