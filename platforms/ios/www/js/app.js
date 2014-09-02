$(document).ready(function(){
  $('.comment-wrapper').hide()
});

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
    $scope.fadingIn = [];
    $scope.showing = [];
    $scope.pics = [
      { name: 'Allison Fox', url: 'img/allisonfox.png', comment: "Another call with @onemedical, another 'wow' experience. Can't recommend these guys highly enough for anyone looking for a new doctor."},
      { name: 'Andrew Feda', url: 'img/andrewfeda.png', comment: "One Medical is absolutely FANTASTIC. I’m so happy to find a service like this—it’s about time!"},
      { name: 'Carrie Bowler', url: 'img/carriebowler.png', comment: "Ubered to my appointment and doctor saw me right away...@onemedical is the Uber of healthcare!"},
      { name: 'Elizabeth Haskins', url: 'img/elizabethhaskins.png', comment: "This appointment at @onemedical was the best doctor's experience of my life. So calm and non-stressful."},
      { name: 'Evelyn Chu', url: 'img/evelynchu.png', comment: 'I am so happy to have found One Medical. It is a refreshing experience to see practitioners who really listen.'},
      { name: 'Honore Lansen', url: 'img/honorelansen.png', comment: "It was a huge relief to me to be able to get a same-day appointment (within the hour, even)."},
      { name: 'Karis Cho', url: 'img/karischo.png', comment: "I haven't been to a primary care dr in about 7 yrs-went to @onemedical for a physical and can't say enough great things. Switch now."},
      { name: 'Laura Guderian', url: 'img/lauraguderian.png', comment: "One Medical is everything a doctor's office should be."},
      { name: 'Manisha Patel', url: 'img/manishapatel.png', comment: "Holy crap, @onemedical is fantastic."}
      // { name: 'Rachana Jani', url: 'img/rachanajani.png', comment: "I am in love with @onemedical. They’re the absolute best."},
      // { name: 'Robert Wilson', url: 'img/robertwilson.png', comment: "Just got my annual physical at my local @onemedical office. Booked my appt on line. On time. In. Out. Fast. Easy. That's how it should be!"},
      // { name: 'Ronald Engblert', url: 'img/ronaldengblert.png', comment: "Loving One Medical. Staff is super nice, friendly, professional & even happy. It's nice now, going to the doctor. Thanks @onemedical ."},
      // { name: 'Stephen Clark', url: 'img/stephenclark.png', comment: "Just had my first appointment with @onemedical wildly impressed. Everything I was hoping for."},
      // { name: 'Thomas Feely', url: 'img/thomasfeely.png', comment: "@onemedical, you've spoiled me! I now struggle with 'normal wait times' at other appointments. Everyone should operate on"},
      // { name: 'Zarina Pino', url: 'img/zarinapino.png', comment: "@onemedical is the best. Prescriptions and appts the day of, by app! #soworththemoney"},
      // { name: 'Amy Stulman', url: 'img/amystulman.png', comment: "@onemedical, you've spoiled me! I now struggle with 'normal wait times' at other appointments. Everyone should operate on #OneMedicalTime"},
      // { name: 'Daniel Garfinkel', url: 'img/danielgarfinkel.png', comment: "If you're in Boston you should really consider switching over to @onemedical for your #health needs. No headaches and crazy wait periods."},
      // { name: 'John Snyder', url: 'img/johnsnyder.png', comment: "@onemedical is THE BEST healthcare provider."},
      // { name: 'Sarah Lewis', url: 'img/sarahlewis.png', comment: "Impressed with @onemedical - online appointments, can email my doctor, test results emailed. Thank you."},
      // { name: 'Tom X. Lee', url: 'img/tomlee.png', comment: "Enjoyed primary care today @onemedical (and a cold drink). Thx for seeing us as customers, not just patients."},
      // { name: 'Veena Chawla', url: 'img/veenachawla.png', comment: "IMHO, once you've experienced service like @onemedical (similar to @zappos) v hard to go back to mediocre alternative"}
    ];

    $scope.setupPics();

    $scope.inTransition = []
    $scope.hasPermission = false

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    $scope.resetData();
    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'nav-title-slide-ios7'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    jQuery('.picture').click(function(e){
      targetElement = jQuery(e.target);

      // targetElement.next('.comment-wrapper').removeClass('hidden')
      targetElement.next('.comment-wrapper').fadeIn();
      $scope.inTransition.push(targetElement.next('.comment-wrapper'));
      setTimeout(function(targetElement) {
        // num = "shown" + $scope.transitionCount;
        $scope.inTransition[0].fadeOut();
        $scope.inTransition = $scope.inTransition.splice(1);
      }, 5000);
    });

    jQuery('body').on('click', '#submit_pic', function(){
      $scope.submitPic();
    });

    jQuery('body').on('click', '.star', function(e){
      $scope.setRating(jQuery(e.target).data('value'));
    })

    jQuery('body').on('click', '#photo-btn', function(event){
      // $scope.changePicture(event);
      $('#cameraInput').click();
    });

    // $scope.rotatePics();
  }

  $scope.rotatePics = function(){
    setTimeout(function(){
      $scope.rotatePic();
    }, 1000);
  }

  $scope.rotatePic = function(){
    picIn = Math.floor(Math.random()*$scope.pics.length);
    picSpot = Math.floor(Math.random()*9);

    if($scope.picAdded){
      picIn = $scope.pics.length - 1;
      picSpot = 4
    }

    elem = "#img" + picSpot;
    $(elem).siblings('.hiding-wrapper').fadeIn();

    $scope.picSpot = picIn;
    $scope.picSpot = picSpot;

    setTimeout(function(){
      elem = "#img" + $scope.picSpot;
      $scope.showing[picSpot] = $scope.pics[picIn];
      
      $scope.fadingIn.push($(elem).siblings('.hiding-wrapper'));

      $scope.$apply();

      setTimeout(function(){
        $scope.fadingIn[0].fadeOut();
        $scope.fadingIn = $scope.fadingIn.splice(1);
      }, 400);
    }, 200);

    $scope.picAdded = false;
    $scope.rotatePics();
  }

  $scope.setupPics = function(){
    for(i = 0; i < 9; i++){
      $scope.showing.push($scope.pics[i]);
    }
  }

  $scope.initCamera = function(){
    console.log("Cam's ready");
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
    $scope.pics.push({ name: $scope.data.name, url: "img/zak.png", comment: $scope.data.comment });
    $scope.picAdded = true;
    // $scope.showing[4] = $scope.pics[$scope.pics.length];
    // $scope.rotatePic($scope.pics.length - 1);
    $scope.resetData();
  }

  $scope.setRating = function(rating){
    $scope.data.rating = rating;
  }

  $scope.starRated = function(num) {
    return $scope.data.rating > num;
  }

  // $scope.changePicture = function(event) {
  //   event.preventDefault();
  //   if (!navigator.camera) {
  //       alert("Camera API not supported", "Error");
  //       return;
  //   }
  //   var options =   {   quality: 50,
  //                       destinationType: Camera.DestinationType.DATA_URL,
  //                       sourceType: 1,  // 0:Photo Library, 1=Camera, 2=Saved Album
  //                       encodingType: 0 // 0=JPG 1=PNG
  //                   };

  //   navigator.camera.getPicture(
  //       function(imgData) {
  //           $('.media-object', this.$el).attr('src', "data:image/jpeg;base64,"+imgData);
  //       },
  //       function() {
  //           alert('Error taking picture', 'Error');
  //       },
  //       options);

  //   return false;
  // };

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