angular
  .module('livein')
  .controller('invitefriend', invitefriend);

  function invitefriend($scope, $ionicHistory, $cordovaSocialSharing, $cordovaInAppBrowser) {
    $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
    $scope.sharefacebook = sharefacebook;
    $scope.sharemessage = sharemessage;
    $scope.sharewhatsapp = sharewhatsapp;
    $scope.shareline = shareline;
    $scope.shareemail = shareemail;
    $scope.sharelinkedin = sharelinkedin;
    $scope.sharetwitter = sharetwitter;

    function sharefacebook() {
      $cordovaSocialSharing
        .shareViaFacebook('Silahkan download aplikasi LippoCikarang', null, 'http://www.lippo-cikarang.com')
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
          var url = "https://www.facebook.com/dialog/feed?app_id=822365854560840&name=Lippo%20Cikarang&picture=http://cdn.jabarmerdeka.co/uploads/2016/05/jpg-134&description=Silahkan%20download%20aplikasi%20Lippo%20Cikarang%20-%20www.lippo-cikarang.com&caption=www.lippo-cikarang.com&link=http://www.lippo-cikarang.com&redirect_uri=http://www.lippo-cikarang.com";
            window.open(url, '_system', 'location=yes')
        });
    }

    function sharemessage() {
      $cordovaSocialSharing
        .shareViaSMS('Silahkan download aplikasi LippoCikarang http://www.lippo-cikarang.com', '039080837836')
        .then(function (result) {
          // Success!
        }, function (err) {
          alert("Cannot share on Twitter" + error);
        });
    }

    function sharewhatsapp() {
      $cordovaSocialSharing
        .shareViaWhatsApp("Silahkan download aplikasi LippoCikarang", null, "http://www.lippo-cikarang.com")
        .then(function (result) {
          // Success!
        }, function (err) {
          alert('Whatsapp have not been installed');
        });
    }

    function shareline() {
      $cordovaSocialSharing.share( "Silahkan download aplikasi LippoCikarang",null ,null, "http://www.lippo-cikarang.com/en").then(function (result) {

      }, function (error) {
        alert("Line not installed" + error);
      });
    }

    function shareemail() {
      $cordovaSocialSharing
        .shareViaEmail("Silahkan download aplikasi LippoCikarang http://www.lippo-cikarang.com/en", "LippoCikarang", ['', ""], ['', ""], [' ', ""], null)
        .then(function (result) {
          // Success!
        }, function (err) {
          alert("Cannot share on Twitter" + error);
        });
    }

    function sharelinkedin() {
      console.log('share linkedin');
      var urllinkedin = "https://www.linkedin.com/shareArticle?mini=true&url=http://www.lippo-cikarang.com&title=Lippo%20Cikarang&summary=Silahkan%20download%20aplikasi%20Lippo%20Cikarang%20-%20www.lippo-cikarang.com&source=http://www.lippo-cikarang.com";
      window.open(urllinkedin, '_system', 'location=yes')
    }

    function sharetwitter() {
    $cordovaSocialSharing
      .shareViaTwitter('silahakan download aplikasi lippo cikarang  http://www.lippo-cikarang.com/en', null, 'http://www.lippo-cikarang.com/en')
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occurred. Show a message to the user
        var fullUrl = "https://twitter.com/intent/tweet?text=Silahkan%20download%20aplikasi%20Lippo%20Cikarang%20-%20&url=http://www.lippo-cikarang.com/&via=LippoCikarang&hashtags=LiveIn";

        window.open(fullUrl, '_system', 'location=yes')
      });

    }
  }
