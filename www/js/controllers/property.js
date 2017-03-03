angular
    .module('livein')
    .controller('property', property)
    .controller('propertyDetail', propertyDetail)
    .controller('sendEmail', sendEmail);

    function property($scope, $filter, $state, $stateParams, $window, PropertyService, $ionicLoading, $ionicPopup) {
        $scope.insertBookmarkProperty = insertBookmarkProperty;
        $scope.deleteBookmarkProperty = deleteBookmarkProperty;

        listProperty();
        $scope.searchval = $stateParams.searchval;

        function listProperty() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });

            PropertyService.listproperty($stateParams.status, function(response) {
                if (response != false) {
                    $scope.data = response;
                    $scope.favorites = false;
                } else {
                    $scope.data = [{ name: $filter('translate')('no_property') }];
                }
                $ionicLoading.hide();
            });
            PropertyService.propertycategory(function(response) {
                if (response != false) {
                    $scope.category = response;
                    console.log($scope.category);
                    $scope.categoryData = [];
                    var a = 0;
                    angular.forEach($scope.category, function() {
                        var b = a++;
                        var list = $scope.category;
                        var data = list[b];

                        var categoryname = data.categoryname;
                        var categoryKey = categoryname.toLowerCase('');
                        categoryKey = categoryKey.replace(/ +|&/g, '_');

                        $scope.categoryData.push({
                            'categoryValue': categoryname,
                            'categoryName': $filter('translate')(categoryKey)
                        });
                        //$scope.list = $filter('translate')(categoryname);                        
                    });
                    console.log($scope.categoryData);

                } else {
                    $scope.category = [{ name: $filter('translate')('no_category') }];
                }
                $ionicLoading.hide();
            });
        };

        function insertBookmarkProperty(idproperty) {
            $ionicLoading.show({ template: $filter('translate')('post_bookmark_property_success'), duration: 5000 });
            PropertyService.insertBookmarkProperty(
                idproperty,
                function(response) {
                    if (response != false) {

                        if (response[0].status == true) {
                            $ionicLoading.show({ template: $filter('translate')('success_favorite'), duration: 5000 });
                            listProperty();
                        } else {
                            $ionicLoading.show({ template: response[0].message, duration: 5000 });
                            listProperty();
                        }

                    } else {
                        $ionicLoading.show({ template: $filter('translate')('failed_favorite'), duration: 5000 });
                        listProperty();
                    }
                });
        };

        function deleteBookmarkProperty(idbookmark) {
            $ionicLoading.show({ template: $filter('translate')('delete_bookmark_property_success'), duration: 5000 });
            PropertyService.deleteBookmarkProperty(
                idbookmark,
                function(response) {
                    if (response != false) {
                        $ionicLoading.show({ template: $filter('translate')('remove_favorite_success'), duration: 5000 });
                        listProperty();
                    } else {
                        $ionicLoading.show({ template: $filter('translate')('remove_favorite_failed'), duration: 5000 });
                        listProperty();
                    }
                });
        };
    }

    function propertyDetail($scope, $timeout, $stateParams, $ionicSlideBoxDelegate, PropertyService, $ionicLoading, $filter) {
        $scope.next = next;
        $scope.previous = previous;

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });
        PropertyService.retriveGetProperty($stateParams.idproperty, function(response) {
            if (response != false) {
                $ionicSlideBoxDelegate.update();
                $scope.roomlist = ['0', '0', '0', '0', '0', '0'];

                angular.forEach(response.detail, function(value, key) {
                    $scope.propertydata = value;
                });

                var a = 0;
                angular.forEach(response.room, function(value, key) {
                    var b = a++;
                    var list = response.room;
                    var data = list[b];
                    var idproperty = data.idproperty;
                    var idroom = data.idroom
                    var name = data.name
                    var jumlah = data.jumlah

                    if (name == "bedroom") {
                        $scope.roomlist[0] = jumlah;
                    } else if (name == "bathroom") {
                        $scope.roomlist[1] = jumlah;
                    } else if (name == "garage") {
                        $scope.roomlist[2] = jumlah;
                    } else if (name == "kitchen") {
                        $scope.roomlist[3] = jumlah;
                    } else if (name == "diningroom") {
                        $scope.roomlist[4] = jumlah;
                    } else if (name == "livingroom") {
                        $scope.roomlist[5] = jumlah;
                    }
                });

                var gall = $stateParams.index;
                $scope.gall = gall;
                
                $scope.propertygallery = response.gallery;

                var keys = Object.keys($scope.propertygallery);
                $scope.len = keys.length;

                var i = 1;
                $scope.propertygallery.forEach(function(itemfile, indexfile, arrfile) {
                    $scope.propertygallery[indexfile].number = i++;
                });

                $scope.property1 = response.gallery[0];
                $scope.property2 = response.gallery[1];
                $scope.property3 = response.gallery[2];

            } else {
                $scope.propertydata = [{ name: $filter('translate')('no_property') }];
            }
            $ionicLoading.hide();
        });
        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };

        function next() {
            $ionicSlideBoxDelegate.next();
        };

        function previous() {
            $ionicSlideBoxDelegate.previous();
        };
    }

    function sendEmail($scope, $state, $stateParams, $location, PropertyService, $ionicPopup, $ionicLoading, $filter) {
        $scope.getRandomSpan = Math.floor((Math.random()*14532));
        var memeSize = 200;
        var canvas = document.getElementById('memecanvas');
        ctx = canvas.getContext('2d');


        // Set the text style to that to which we are accustomed
        canvas.width = 200;
        canvas.height = 40;

        //  Grab the nodes
        var img = document.getElementById('start-image');
        var topText = document.getElementById('top-text');

        // When the image has loaded...
        img.onload = function() {
            drawMeme()
        }  

        function drawMeme() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, memeSize, memeSize);
            ctx.lineWidth  = 4;
            ctx.font = '30pt sans-serif';
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            var text1 = document.getElementById('top-text').value;
            text1 = text1.toUpperCase();
            x = memeSize / 2;
            y = 0;

            wrapText(ctx, text1, x, y, 200, 28, false);
        }

        function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {

            var pushMethod = (fromBottom)?'unshift':'push';
            
            lineHeight = (fromBottom)?-lineHeight:lineHeight;

            var lines = [];
            var y = y;
            var line = '';
            var words = text.split(' ');

            for (var n = 0; n < words.length; n++) {
            var testLine = line + ' ' + words[n];
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth) {
                lines[pushMethod](line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
            }
            lines[pushMethod](line);

            for (var k in lines) {
            //context.strokeText(lines[k], x, y + lineHeight * k);
            context.fillText(lines[k], x, y + lineHeight * k);
            }


        }


        //
        PropertyService.retriveGetProperty($stateParams.idproperty, function(response) {
            if (response != false) {
                angular.forEach(response.detail, function(value, key) {
                    $scope.propertydata = value;
                });
                console.log('ini propert data : ' ,$scope.propertydata);
            } else {
                $scope.propertydata = [{ name: $filter('translate')('no_property') }];
            }
            $ionicLoading.hide();
        });

        $scope.sending = function(email) {
            if(email.cap == $scope.getRandomSpan){
                alert('captcha benar')
                $scope.eml = [];
                $scope.eml.push({
                    description: email.desc
                });
                email.desc = "";

                var bodyemail = $scope.eml;

                if (bodyemail != "") {
                    $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
                    PropertyService.emailProperty(bodyemail,
                        function(response) {
                            if (response != false) {
                                console.log('sucsess');
                            } else {
                                console.log('error');
                            }
                            $ionicLoading.hide();
                        });
                }
            } else {
                alert('captcha salah');
            }
        };
    }