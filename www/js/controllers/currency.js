/**
 * Created by Lenovo on 02/12/2016.
 */
angular
    .module('livein')
    .controller('currency', currency)

function currency($scope, currencyService, $ionicLoading, $localStorage, $filter) {

    $scope.wakut = new Date();
    $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });
    $scope.rate = [];
    $scope.selected = []
    $scope.currency = [];
    $scope.arrayselected = [];
    $scope.limit = 4;
    $scope.checked = 0;
    $scope.name = [
        'Austarlia', 'Bulgaria', 'brazil', 'Canada', 'Swiss', 'China', 'Czech', 'Denmark', 'England',
        'HongKong', 'Croatian ', 'Hungaria', 'Israel', 'India', 'Japan', 'South Korea', 'Mexico', 'Malaysia', 'Norwegian', 'New Zealand', 'Philippine ', 'Poland', 'Romania', 'Rusia', 'Swedish',
        'Singapura', 'Thai', 'Turky', 'Usa', 'South Africa', 'Euro'
    ];

    $scope.flag = [
        'img/currency/flag_of_australia.png',
        'img/currency/flag_of_bulgaria.png',
        'img/currency/flag_of_brazil.png',
        'img/currency/flag_of_canada.png',
        'img/currency/flag_of_switzerland.png',
        'img/currency/flag_of_china.png',
        'img/currency/flag_of_czech_republic.png',
        'img/currency/flag_of_denmark.png',
        'img/currency/flag_of_united_kingdom.png',
        'img/currency/flag_of_hongkong.jpg',
        'img/currency/flag_of_croatia.png',
        'img/currency/flag_of_hungary.png',
        'img/currency/flag_of_israel.png',
        'img/currency/flag_of_india.png',
        'img/currency/flag_of_japan.png',
        'img/currency/flag_of_korea_south.png',
        'img/currency/flag_of_mexico.png',
        'img/currency/flag_of_malaysia.png',
        'img/currency/flag_of_norway.png',
        'img/currency/flag_of_new_zealand.png',
        'img/currency/flag_of_philippines.png',
        'img/currency/flag_of_poland.png',
        'img/currency/flag_of_romania.png',
        'img/currency/flag_of_russia.png',
        'img/currency/flag_of_sweden.png',
        'img/currency/flag_of_singapore.png',
        'img/currency/flag_of_thailand.png',
        'img/currency/flag_of_turkey.png',
        'img/currency/flag_of_united_states_of_america.png',
        'img/currency/flag_of_south_africa.png',
        'img/currency/flag_of_euro.GIF',

    ]


    currencyService.currencylist(function(response) {
        if (response != false) {

            $scope.itemrate = response.rates;
            $scope.date = response.date;
            $scope.time = new Date();
            angular.forEach($scope.itemrate, function(halo, key) {
                $scope.rate.push(halo);
                $scope.currency.push(key);
            });
            settocalc();

        } else {
            $scope.data = false;
        }
        $ionicLoading.hide();
    });
    $scope.checkChanged = function(item) {
        if (item.winner) $scope.checked++;
        else $scope.checked--;
    }

    function settocalc() {
        console.log($scope.rate)
        $scope.cur1 = $scope.currency[1];
        $scope.cur2 = $scope.currency[2];
        console.log($scope.myColor);

        $scope.curtext1 = 0;
        $scope.curtext2 = 0;
    }


    $scope.calculator = function() {
        console.log($scope.curtext1)
        ratepat = $scope.cur1;
        console.log($scope.cur2)

        $scope.curtext2 = $scope.curtext1 / $scope.cur2;

    }
    $scope.tesslected = function($index, selected) {

        $scope.countMax = 0;
        $scope.arrayselected.push($index);
        $scope.dancok = $scope.arrayselected;


        if ($scope.arrayselected.length > 2) {
            $scope.selected[$scope.arrayselected[0]] = false;
            $scope.arrayselected = [];
            $scope.arrayselected[0] = $scope.dancok[1];
            $scope.arrayselected[1] = $scope.dancok[2];

        }


        // for (var k = 0; k < $scope.selected.length; k++) {
        //     if ($scope.selected[k] == true) {
        //         $scope.countMax++;
        //     }
        // }
        // console.log("CALC", $scope.countMax, $scope.MAX)


        // if ($scope.countMax > 2) {
        //     if ($scope.countMax == 3) {
        //         $scope.selected[$scope.arrayselected[1]] = false;
        //     } else {
        //         $scope.selected[$scope.arrayselected[0]] = false;
        //     }
        // }
        console.log($index, selected);
        console.log($scope.arrayselected[0]);
        console.log($scope.arrayselected);



    }

    $scope.settomain = function() {
        $scope.selectedItems = [];
        if ($scope.selected.length != 0) {
            for (var i = 0; i < $scope.selected.length; i++) {
                if ($scope.selected[i] == true) {
                    $scope.selectedItems.push(i);
                }
            }

        }
        var currencymain = {
            'time': $scope.wakut,
            'index': $scope.selectedItems,
            'flag1': $scope.flag[$scope.selectedItems[0]],
            'rate1': $scope.rate[$scope.selectedItems[0]],
            'cur1': $scope.currency[$scope.selectedItems[0]],
            'flag2': $scope.flag[$scope.selectedItems[1]],
            'rate2': $scope.rate[$scope.selectedItems[1]],
            'cur2': $scope.currency[$scope.selectedItems[1]]


        }
        $localStorage.currency = { currency: currencymain };
        $ionicLoading.show({
            template: $filter('translate')('succes_set_to_main'),
            duration: 2000
        });

    }

    $scope.maxCheck = function($index) {



    }

}