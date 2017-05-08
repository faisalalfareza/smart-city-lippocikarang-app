angular
    .module('livein', ['ionic', 'ngCordovaOauth', 'ngCordova', 'ionic-toast', 'ngStorage', 'ngCookies', 'angularMoment', 'pascalprecht.translate', 'ionic.contrib.drawer.vertical', 'ds.clock', 'ngOpenFB', 'ionic.service.core', 'ionic.service.push', 'clickAndWait', 'angular-intro', 'base64'])
    .directive('ngEnter', ngEnter)
    .directive('repeatDone', repeatDone)
    .config(config)
    .run(run)

function config($stateProvider, $cordovaFacebookProvider, $urlRouterProvider, $translateProvider, $sceDelegateProvider, $ionicConfigProvider, $ionicAppProvider, $httpProvider) {

    var api_link = "http://innodev.vnetcloud.com/LiveIn/";
    var api_link_payment = "http://innodev.vnetcloud.com/liveinpayment/";

    // Identify app
    $ionicAppProvider.identify({
        // The App ID (from apps.ionic.io) for the server
        app_id: '62a7483e', //app_id: 'd0478393',
        // The public API key all services will use for this app
        api_key: '525ce14c728a8686fd3b1246cf85c2374a84958ebaad29bc', //api_key: 'bc00cfa0b603379dcb68106900d0286c7bc80768f8878d04',
        // Set the app to use development pushes
        //dev_push: true,
        //gcm_id: '999348773193'
    });

    //uncommenting the following line makes GET requests fail as well
    //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $ionicConfigProvider.platform.android.views.maxCache(0);
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
        .state('splashScreen', {
            url: '/',
            templateUrl: 'partials/splashScreen.html',
            controller: 'splashScreen'
        })
        .state('login', {
            url: "/login",
            templateUrl: "partials/login.html",
            controller: 'login'
        })
        .state('register', {
            url: "/register",
            templateUrl: "partials/register.html",
            controller: 'register'
        })
        .state('forget', {
            cache: false,
            url: "/forget",
            templateUrl: "partials/forgetPassword.html",
            controller: 'forget'
        })
        .state('reset', {
            cache: false,
            url: "/reset",
            templateUrl: "partials/resetPassword.html",
            controller: 'forget'
        })

    /* start : side menu */

    .state('app', {
            url: "/app",
            cache: false,
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'app'
        })
        .state('app.category', {
            url: "/category/:idcategory",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/tenant.html",
                    controller: 'category'
                }
            }
        })
        .state('app.recomended', {
            url: "/recomended/:idcategory",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/recomended.html",
                    controller: 'categoryRecomended'
                }
            }
        })
        .state('app.tenant', {
            url: "/tenantDetail/:idtenant",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/tenantDetail.html",
                    controller: "sportDetail"
                }
            }
        })
        .state('app.tenantDetailImage', {
            url: "/tenantDetailImage/:idtenant/{index}",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/tenantDetailImage.html",
                    controller: "sportDetailImage"
                }
            }
        })
        .state('app.aboutus', {
            url: "/aboutUs",
            views: {
                'menu-content': {
                    templateUrl: "partials/aboutus.html",
                    controller: 'aboutUs'
                }
            }
        })
        .state('app.gallery', {
            url: "/gallery",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/gallery.html",
                    controller: "gallery"
                }
            }
        })
        .state('app.detailGallery', {
            cache: false,
            url: "/detailGallery/{index}",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/detailGallery.html",
                    controller: "detailGallery"
                }
            }
        })
        .state('app.getSearchGallery', {
            cache: false,
            url: "/getSearchGallery/:name",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/getSearchGallery.html",
                    controller: "searchGalleryDetail"
                }
            }
        })
        .state('app.detailGallerySearch', {
            cache: false,
            url: "/detailGallerySearch/:gall/{index}",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/detailGallerySearch.html",
                    controller: "searchGalleryDetailImage"
                }
            }
        })
        .state('app.callCenter', {
            url: "/callCenter",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/callCenter.html",
                    controller: "callCenter"
                }
            }
        })
        .state('app.aboutHelp', {
            url: "/aboutHelp",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/aboutHelp.html",
                    controller: "aboutHelp"
                }
            }
        })
        .state('app.helpfulNumber', {
            url: "/helpfulNumber",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/helpfulNumber.html",
                    controller: "useful"
                }
            }
        })
        .state('app.whatsNew', {
            url: "/whatsNew",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/whatsNew.html",
                    controller: "whatsNew"
                }
            }
        })
        .state('app.cctvList', {
            url: "/cctvList",
            views: {
                'menu-content': {
                    // templateUrl: "partials/sides/soon.html"
                    templateUrl: "partials/sides/cctvList.html",
                    controller: "cctv"
                }
            }
        })
        .state('app.cctvDetail', {
            url: "/cctvDetail/{index}",
            views: {
                'main-content': {
                    templateUrl: "partials/sides/cctvDetail.html",
                    controller: "cctvDetail"
                }
            }
        })
        .state('app.cctvFull', {
            url: "/cctvFull/:port",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/cctvFull.html",
                    controller: "cctvFull"
                }
            }
        })
        .state('app.forum', {
            //cache: false,
            url: "/forum",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/forum.html",
                    controller: 'forum'
                }
            }
        })
        .state('app.forumdetail', {
            cache: false,
            url: "/forumdetail/:idforum/:idaccount",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/forumdetail.html",
                    controller: 'forumdetail'
                }
            }
        })
        .state('app.forumDetailImage', {
            url: "/forumDetailImage/:idforum/:idx",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/forumDetailImage.html",
                    controller: 'forumdetail'
                }
            }
        })
        .state('app.newforum', {
            url: "/newforum",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/newforum.html",
                    controller: 'topic'
                }
            }
        })
        .state('app.forumupdate', {
            url: "/forumupdate/:idforum",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/forumupdate.html",
                    controller: 'forumdetail'
                }
            }
        })
        .state('app.forumComment', {
            url: "/forumComment/:idforum",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/forumComment.html",
                    controller: 'forumComment'
                }
            }
        })

    /* end : side menu */
    /* start : navigation tabs */

        .state('app.main', {
            url: "/main",
            cache: false,
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/main.html",
                    controller: 'mainTabs'
                }
            }
        })
        .state('app.coupon', {
            url: "/coupon",
            views: {
                'menu-content': {
                    templateUrl: "partials/tabs/coupon.html",
                    controller: 'coupon'
                }
            }
        })
        .state('app.searchGlobal', {
            url: "/search/:name",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/search.html",
                    controller: 'searchGlobal'
                }
            }
        })
        .state('app.searchTenants', {
            url: "/searchTenants/:name",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/searchTenants.html",
                    controller: 'searchGlobal'
                }
            }
        })
        .state('app.searchProperty', {
            url: "/searchProperty/:name",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/searchProperty.html",
                    controller: 'searchGlobal'
                }
            }
        })
        .state('app.searchDiscount', {
            url: "/searchDiscount/:name",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/searchDiscount.html",
                    controller: 'searchGlobal'
                }
            }
        })
        .state('app.searchGallery', {
            url: "/searchGallery/:name",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/searchGallery.html",
                    controller: 'searchGlobal'
                }
            }
        })
        .state('app.searchGalleryDetail', {
            url: "/searchGalleryDetail/:name/{index}",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/searchGalleryDetail.html",
                    controller: 'searchGlobal'
                }
            }
        })
        .state('app.searchNews', {
            url: "/searchNews/:name",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/searchNews.html",
                    controller: 'searchGlobal'
                }
            }
        })
        .state('app.profile', {
            cache: false,
            url: "/profile",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile.html",
                    controller: 'profile'
                }
            }
        })
        .state('app.history', {
            url: "/history",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/history.html",
                    controller: "history"
                }
            }
        })
        .state('app.myhistory', {
            cache: false,
            url: "/myhistory/:idaccount",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/myhistory.html",
                    controller: "myhistory"
                }
            }
        })
        .state('app.tenantMap', {
            cache: false,
            url: "/tenantMap",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/tenantMapDetail.html",
                    controller: 'tenantMap'
                }
            }
        })
        .state('app.currency', {
            url: "/currency",
            views: {
                'main-content': {
                    templateUrl: "partials/tabs/currency.html",
                    controller: 'currency'
                }
            }
        })
        .state('app.inivitefriend', {
            url: "/inivitefriend",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/invitefriend.html",
                    controller: 'invitefriend'
                }
            }
        })
        .state('app.map', {
            cache: false,
            url: "/map",
            views: {
                'map-content': {
                    templateUrl: "partials/tabs/map.html",
                    controller: 'mainmap'
                }
            }
        })
        .state('app.download', {
            cache: false,
            url: "/download",
            views: {
                'download-content': {
                    templateUrl: "partials/tabs/download.html",
                    controller: 'download'
                }
            }
        })
        .state('app.downloadDetail', {
            url: "/downloadDetail/:iddownload",
            views: {
                'download-content': {
                    templateUrl: "partials/tabs/downloadDetail.html",
                    controller: 'detaildownload'
                }
            }
        })
        .state('app.more', {
            url: "/more",
            views: {
                'more-content': {
                    templateUrl: "partials/tabs/more.html",
                    controller: 'more'
                }
            }
        })
        .state('app.rate', {
            url: "/rate",
            views: {
                'more-content': {
                    templateUrl: "partials/tabs/profile/rating.html",
                    controller: 'tenant'
                }
            }
        })
        .state('app.bookmark', {
            url: "/bookmark",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/bookmark.html",
                    controller: 'tenant'
                }
            }
        })
        .state('app.listbookmark', {
            url: "/listbookmark",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/listbookmark.html",
                    controller: 'bookmark'
                }
            }
        })
        .state('app.notification', {
            cache: false,
            url: "/notification",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/notification.html",
                    controller: 'notification'
                }
            }
        })
        .state('app.notificationDetail', {
            url: "/notificationDetail/:idnotif/:bookmarked",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/notificationDetail.html",
                    controller: 'notificationDetail'
                }
            }
        })
        .state('app.editprofile', {
            url: "/editprofile",
            views: {
                'profile-content': {
                    templateUrl: "partials/tabs/profile/editprofile.html",
                    controller: 'editProfile'
                }
            }
        })
        .state('app.property', {
            url: "/property",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/property.html"
                }
            }
        })
        .state('app.propertyEmail', {
            url: "/propertyEmail/:idproperty/:agentemail",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/propertyEmail.html",
                    controller: 'sendEmail'
                }
            }
        })
        .state('app.propertylist', {
            url: "/property/:status",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/propertylist.html",
                    controller: 'property'
                }
            }
        })
        .state('app.propertyDetail', {
            url: "/propertyDetail/:idproperty",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/propertyDetail.html",
                    controller: 'propertyDetail'
                }
            }
        })
        .state('app.propertyDetailImage', {
            url: "/propertyDetailImage/:idproperty/{index}",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/propertyDetailImage.html",
                    controller: 'propertyDetail'
                }
            }
        })
        .state('app.propertysearch', {
            url: "/propertysearch/:searchval/:status",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/propertylistsearch.html",
                    controller: 'property'
                }
            }
        })
        .state('app.bus', {
            cache: false,
            url: "/bus",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/busSchedule.html",
                    controller: 'busSchedule'
                }
            }
        })
        .state('app.worldclock', {
            url: "/worldclock",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/worldclock.html",
                    controller: 'worldclock'
                }
            }
        })
        .state('app.loginbilling', {
            // cache: false,
            url: "/loginbilling",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/soon.html"
                }
            }
        })
        .state('app.eComplaint', {
            url: "/eComplaint",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/eComplaint.html",
                    controller: 'eComplaint'
                }
            }
        })
        .state('app.eComplaintList', {
            cache: false,
            url: "/eComplaintList",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/eComplaintList.html",
                    controller: 'eComplaintList'
                }
            }
        })
        .state('app.eComplaintDetail', {
            url: "/eComplaintDetail/:CaseNumber",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/eComplaintDetail.html",
                    controller: 'eComplaintDetail'
                }
            }
        })
        .state('app.billing', {
            cache: false,
            url: "/billing",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/billing.html",
                    controller: 'getbillingCtrl'
                }
            }
        })
        .state('app.payment', {
            url: "/payment",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/payment.html",
                    controller: 'payment'
                }
            }
        })
        .state('app.transaction', {
            url: "/transaction",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/transactionBilling.html",
                    controller: 'transactionBilling'
                }
            }
        })
        .state('app.ovo_payment', {
           url: "/paymentovo",
           views: {
             'menu-content': {
              templateUrl: "partials/sides/payment_ovo.html",
              controller: 'paymentovo'
           }
         }
       })
        .state('app.publictransportation', {
            url: "/publictransportation",
            views: {
                'menu-content': {
                    templateUrl: "partials/sides/publictransportation.html",
                    controller: 'publictransportation'
                }
            }
        });
    /* end : navigation tabs */

    //translate
    $translateProvider.translations('en', {
            apilink: api_link,
            apilinkpayment: api_link_payment,
            app_name: 'LippoCikarang.com', //{{'app_name' | translate}}
            openDrawer: 'Open Drawer',
            closeDrawer: 'Close Drawer',
            search_title: 'Search',
            eComplaint: 'Do you have any concern? ',
            eComplaint2: 'Just tell us and solved your concern easily.',
            btn_eC: 'Yes, I Have.',
            installed: 'installed',
            not_installed: 'not installed',
            confirm_install_sos: 'Do You want to download Ambulance Siloam 1health mobile apps ?',
            confirm_install_ovo: 'Do You want to download Ovo mobile apps ?',
            //asline
            sound: 'Sound',
            loading: 'Loading',
            loginmessage: 'Logging in',
            logoutmessage: 'Logging out',
            soon: 'Available Soon',
            Minimum_8_character: 'Minimum 8 character',
            about: 'About',
            accomodation: 'Accomodation',
            action_bookmark: 'Bookmark',
            action_call: 'Call',
            action_map: 'Map',
            action_review: 'Review',
            add_your_photo: 'Add Your Photo',
            address: 'Address',
            apartment: 'Apartments',
            Apartment: 'Apartments',
            with: 'with',
            orange_county: 'Orange County',
            are_resident: 'Are you a resident? Create your account with registered email address in our database to enjoy special feature',
            are_alreadyaccount: 'Already have an account ?',
            art: 'Art & Culture',
            atm_gallery: 'ATM Gallery',
            ATM_Gallery: 'ATM Gallery',
            automotive: 'Automotive',
            Automotive: 'Automotive',
            bakery: 'Bakery & Dessert',
            BAKERY___DESERT: 'Bakery & Dessert',
            bank: 'Bank',
            Bank: 'Bank',
            bar_cafe_club: 'Bar/Cafe/Club',
            CAFE___LOUNGE___BAR: 'Bar/Cafe/Club',
            Fast_Food: 'Fast Food',
            beauty: 'Beauty',
            Beauty:'Beauty',
            book_stationety: 'Book & Stationery',
            Book___Stationery: 'Book & Stationery',
            bookmarked: 'Bookmarked',
            all_bookmarked: 'Already Bookmarked',
            success_bookmark: 'Success Bookmark',
            btn_lets_go: 'Let\'s Go',
            bus: 'Bus',
            buy: 'Buy',
            send_email: 'Send Message',
            call_agent: 'Call Agent',
            call: 'Call',
            center: 'Center',
            call_center_html: '<b>Call</b>Center',
            cancel: 'Cancel',
            cctv: 'CCTV',
            chinese: 'Chinese',
            close: 'CLOSE',
            clothes: 'Clothes',
            condominiums: 'Condominiums',
            Condominiums: 'Condominiums',
            cosmetic: 'Cosmetic',
            create_account: 'Create new account',
            create_ur_account: 'CREATE YOUR ACCOUNT',
            daily: 'MONDAY - FRIDAY',
            weekly: 'SATURDAY & SUNDAY',
            expand: 'Expand',
            session: 'SESSION',
            delete: 'Delete',
            deparment_store: 'Department Store',
            Department_Store: 'Department Store',
            dialog_signout: 'Are you sure want to sign out your mobile apps ?',
            dialog_success_upgrade: 'Your email is registered, <br/> <b>Congratulations</b> <br/>Now you\'re resident!',
            dialog_fail_upgrade: 'Sorry, your email isn\’t registered, <br/> Please contact our Customer service <br/>to register your email',
            blm_login: 'Sorry, you are not logged in. Please login from Profile to access this menu.',
            blm_rate: 'Sorry, you are not logged in. Please login from Profile to rate.',
            blm_emailAgen: 'Sorry you are not logged in. Please login from Profile to send an email to agent.',
            intro1: 'Register to <br> experience more <br> <p style="font-size:8px;font-style:italic;margin:0;">special features for residents!</p>',
            intro2: 'Enjoy Special Discount, <br> Register Now!',
            intro3: 'Discover More <br> <p style="font-size:8px;font-style:italic;margin:0;">another features for residents & visitors!</p>',
            next: 'Next',
            previous: 'Previous',
            thanks: 'Thanks',
            dining: 'Dining',
            coupon: 'Coupon',
            discount: 'Discount',
            discount_coupon: 'Discount Coupon',
            Kupon: 'Discount',
            download: 'Downloads',
            download_more: 'Download for more',
            ebilling: 'eBilling',
            edit: 'Edit',
            edit_profile: 'Edit Profile',
            education: 'Education',
            Education: 'Education',
            electronic: 'Electronic',
            Electronic_ : 'Electronic',
            email_agent: 'Email Agent',
            entertaiment: 'Entertaiment',
            events: 'Events',
            Acara: 'Events',
            eyewear: 'Eyewear',
            fastfood: 'Fast Food',
            forgot_password: 'Forgot password ?',
            forgot_password_placeholder: 'Email or mobile phone',
            forum: 'Forum',
            gallery: 'Gallery',
            pro_gallery: 'Property Gallery',
            gallery_confirm: 'Are you sure you want to delete gallery forum ?',
            games: 'Games',
            gender: 'Gender',
            get_started: 'GET STARTED',
            golfing: 'Golf',
            gym: 'Gym',
            health: 'Health',
            Kesehatan: 'Health',
            health_care: 'Health Care',
            Health_Care: 'Health Care',
            hello: 'Hello',
            help: 'Help',
            helpful_number: 'Helpful Number',
            number: 'Date Created',
            what_c: 'What is your concern?',
            desc_c: 'Your concern ...',
            CC: 'Client Code',
            hint_confirm_password: 'Confirm Password',
            hint_email: 'Email',
            hint_pass: 'Password',
            hint_password: 'Password',
            hint_phone: 'Phone',
            hint_topic_desc: 'Discussion Description',
            hint_topic_title: 'Discussion Title',
            hist_cont_1: 'Explore Your Timeline',
            hist_cont_2: 'Location History helps you get useful information - automatic commute predictions and improved search results.',
            hist_cont_3: 'Rediscover the places you\'ve been search and the routes you\'ve traveled in your timeline',
            hist_cont_4: 'Only you can see your timeline',
            home_improvement: 'Home Improvement',
            Home_Improvement: 'Home Improvement',
            hospital: 'Hospital',
            hotel: 'Hotel',
            hours_today: 'Hours Today',
            what_new: 'What\'s New',
            indoor_sports: 'Indoor Sports',
            industry: 'Industrial Directory',
            Industry: 'Industrial Directory',
            industries: 'Industries',
            unit: ' unit',
            insurance: 'Insurance',
            Insurance: 'Insurance',
            invitation_msg: 'Share with your friends',
            invite_friend: 'Invite Friend',
            inviteFriend: 'Share With Your Friends',
            japanese: 'Japanese',
            Japanese_Food: 'Japanese',
            jewelry: 'Jewelry',
            join_us: 'Join us with your social account',
            karaoke: 'Karaoke',
            leisure: 'Leisure',
            Leisure: 'Leisure',
            login: 'Login',
            login_with: 'Login with',
            login_success: 'Login successfully',
            login_failed: 'Login failed!',
            failed: 'Failed!',
            facebook_login_failed: 'Facebook login failed',
            must_choose_1: 'You must choose 1 type payment',
            check_email: 'Check your email for confirm',
            cannot_put_email: 'We cannnot put email for verification',
            wrong_email: 'Email or Phone Number not valid',
            enter_credential: 'Please enter the credentials!',
            main: 'Main',
            map: 'Map',
            tenant_map: 'Tenant Map',
            mark: 'Mark as read',
            mart: 'Mart',
            more: 'More',
            exchange: 'Exchange Rates',
            currency: 'Currency',
            language: 'Language',
            success_language: 'You have selected ',
            minimarket: 'Minimarket',
            Minimarket: 'Mart',
            msg_deleted: 'Deleted',
            msg_marked: 'Marked',
            msg_update: 'Update',
            msg_update_failed: 'Update Failed',
            msg_update_success: 'Update Succesfully',
            msg_delete_success: 'Delete Success',
            msg_delete_failed: 'Delete Failed',
            music: 'Music',
            my_history: 'My History',
            my_notification: 'My Notification',
            my_location: 'My Location',
            mybookmark: 'My Bookmark',
            name: 'Name',
            newton_techno_park: 'Newton Techno Park',
            no: 'No',
            gps_on: 'GPS is active',
            gps_off: 'GPS not active',
            gps_set: 'Location set by GPS',
            no_connection: 'No internet connection!',
            retry: 'RETRY',
            no_item: 'No More Items Available !',
            no_gallery: 'This tenant doesn\'t have photo gallery',
            no_image_available: 'No Image Available',
            no_phone_agent: 'This agent doesn\'t have phone number',
            no_phone_tenant: 'This tenant doesn\'t have phone number',
            no_review_tenant: 'This tenant doesn\'t have review',
            not_empty: 'Not Empty',
            not_equal: 'password not equal',
            notaris: 'Notary',
            Notaris: 'Notary',
            notification: 'Turn On Notification',
            notification_info: 'Get update, latest information and special offers.',
            notification_push: 'You have a new notification',
            number_not_valid: 'Number or email Is not valid',
            number_null: 'Number is null',
            open: 'OPEN',
            others: 'Others',
            OTHERS: 'Others',
            Others: 'Others',
            outdoor_sports: 'Outdoor Sports',
            pelase_wait: 'Please wait ...',
            phone: 'Phone',
            photo_gallery: 'Photo Gallery',
            post_rating_success: 'Thank you for giving rating',
            profile: 'Profile',
            type: 'Type',
            property_agents: 'Property Agents',
            Property_Agent: 'Property Agents',
            property_market: 'Property Market',
            property_start: 'This app offers you property search for properties in Lippo Cikarang. Find properties for sale and for rent, including houses, apartments, shops, commercial properties and land.',
            property_finding: 'Finding the property of your dreams.',
            pscode: 'PSCODE',
            pscode_correct: 'PsCode is correct',
            public_services: 'Public Services',
            public_transportation: 'Public Transportation',
            public_transportation_bottom: 'Public Transportation which is entering Beverli area and Ventura, Lippo Cikarang only untill 9.00 WIB',
            rate_title: 'Tenant Rate',
            rate_this_tenant: 'Rate this tenant',
            tenant: 'Tenants',
            tenant_gallery: 'Gallery Tenant',
            rate_dialog: 'Are you sure want to rate this tenant ?',
            rate_text: 'Rate this place',
            recommended: 'Recommended',
            recreational_sites: 'Recreational Sites',
            registration_success: 'Registration Success',
            registration_failed: 'Registration Failed',
            activate_account: 'Please check your email to activate your account!',
            rent: 'Rent',
            rental_cars: 'Rental Cars',
            Rental_Cars: 'Rental Cars',
            resend_code: 'Resend code',
            reset: 'Reset',
            reset_password: 'Reset Password',
            reset_password_sub1: 'You are changing the password for',
            resident: 'Resident',
            employment: 'Employment',
            jobs: 'Jobs',
            information: 'Information',
            time_zone: 'Time Zone',
            tree: 'Tree',
            roads: 'Roads',
            vehicle_registration: 'Vehicle registration',
            shop: 'Shop House',
            salon: 'Salon',
            service_apartment: 'Service Apartment',
            area_code: 'Area code(s)',
            save: 'Save',
            save_profile: 'Save Profile',
            school: 'School',
            international_schools: 'International Schools',
            search_hint: 'Search',
            search_title: 'Search',
            send_code: 'Enter the code we sent \nto your email / mobile phone',
            send_email_agent: 'Message',
            send_email_success: 'Send email success',
            send_message: 'Send email success',
            shoes: 'Shoes',
            newCase: 'Are you sure you want to submit this concern?',
            shopping: 'Shopping',
            sign_start: 'Sign in and start exploring',
            signout: 'Sign Out',
            signup: 'Sign Up',
            goMain: 'Go to Main Page',
            signup_lippo: 'Sign up for LippoCikarang.com',
            lippo_cikarang: 'Lippo Cikarang',
            skip: 'Skip',
            skin_care: 'Skin Care',
            sound_info: 'Activate notiﬁcation sound',
            spa___treatment: 'Spa & Treatment',
            spbu: 'SPBU',
            version: 'Version',
            splash_g1_1: 'Discover What You Needed',
            splash_g2_1: 'The best way',
            splash_g2_2: 'to keep in touch',
            splash_g2_3: 'With your community',
            splash_g3_1: 'Start your profile',
            splash_g3_2: 'Find your favorite places',
            splash_g3_3: 'your favorite',
            sport: 'Sport',
            Sport: 'Sport',
            sports: 'Sports',
            start_now: 'Start Now',
            Art___Culture: 'Art & Culture',
            sub2_forget_password: 'We will send you an email shortly to reset your password',
            sub_forget_password: 'Enter your e-mail address or phone number\nbelow to reset your password',
            reset_success: 'Reset password is successfully',
            cannot_send_code: 'Cannot send code',
            email_not_exist: 'Email or phone doesn\'t exist',
            email_exist: 'Phone or email alredy exist!',
            submit: 'Submit',
            supermarket: 'Supermarket',
            taxi: 'Taxi',
            terms_privacy: 'I agree to the Term of Use',
            terms_privacy_next: 'and Privacy Policy',
            title_activity_detail_maps: 'Map',
            title_activity_transportation_public: 'Map',
            tour_travel: 'Tour & Travel',
            Tour___Travel: 'Tour & Travel',
            traditional: 'Traditional',
            Traditional_Food: 'Traditional',
            train: 'Train',
            transportation: 'Transportation',
            try_again: 'Try Again',
            tutor: 'Tutor',
            upgrade_resident: 'Upgrade to resident',
            upload_image_success: 'Upload image success',
            useful_information: 'Useful Information',
            workshop_services: 'Workshop Services',
            Workshop_Service: 'Workshop Services',
            world_clock: 'World Clock',
            yes: 'Yes',
            btn_discount_coupon: '<b>Discount</b>Coupon',
            welcome_dialog: 'You are registered \n as',
            okay: 'Okay',
            about_us: 'About Us',
            terms: 'Terms & Condition',
            privacy: 'Privacy Policy',
            rate: 'Rate us',
            emergency_call_1: 'Emergency',
            emergency_call_2: 'Call',
            emergency_service_1: 'Emergency',
            emergency_service_2: 'Services',
            sort: 'Sort',
            sort_distance: 'Distance',
            sort_name: 'Name',
            population: 'Population',
            sort_popularity: 'Popularity',
            category_all: 'All',
            accessories___toys: 'Accessories & Toys',
            accessories_toys: 'Accessories & Toys',
            //child property
            house_property: 'House',
            apartment_property: 'Apartment',
            kavling_property: 'Kavling',
            commercial_property: 'Commercial',
            industry_property: 'Industry',
            house: 'House',
            unit: 'Units',
            apartment: 'Apartment',
            kavling: 'Kavling',
            cinema: 'Cinema',
            commercial: 'Commercial',
            industry: 'Industry',
            e_success: 'Case Submitted!',
            e_failed: 'Case Unsubmited!',
            //Industry: 'Industry',

            //Sort Property
            sort_harga: 'Price ( Low - High )',
            sort_new: 'New',
            sort_popular: 'Popular (High - Low )',
            leght_password: 'Please enter a new password \n Password must be at least 8 character in length.',
            avoid_pasword: 'Avoid password that are easy \n to guess or used with other website.',
            verify: 'Verify',
            //forum
            post_a_comment: 'Post a Comment',
            views: 'VIEWS',
            new_topic: '+ NEW TOPIC',
            new_comment: '+ New Comment',
            discussion_title: 'Discussion Title',
            upload: 'Upload',
            post: 'Post',
            edit_topic: 'edit',
            edit_post: 'Edit Post',
            delete_discussion: 'Delete Discussion',
            comment: 'COMMENT',
            forum_comment: 'Forum Comment',
            comment_success: 'Success!',
            comment_failed: 'Failed!',
            edit_comment: 'Edit Comment',
            delete_comment: 'Delete Comment',
            stared_a_thread: 'START A THREAD',
            acces_billing: 'Now access, download\n and pay your billing is easy!',
            amount_to_be_paid: 'Amount to be paid',
            total_amount: 'Total Amount',
            description: 'Description',
            cant_acces_billing: 'I can\'t access my biling',
            payment: 'Payment',
            confirm_payment: 'Are you sure to pay your<br><b>Resident eBilling</b><br>on your mobile apps?',
            hint_email_phone: 'Email or mobile phone',
            hint_email:'Email',
            let_acces_billing: 'Let me access my billing',
            pay_now: 'Pay Now',
            select_payment: 'Please select your payment method:',
            total_bill: 'Total bill',
            unit_no: 'Unit no',
            client_code: 'Client Code',
            client_name: 'Client Name',
            read_condition: 'I have read and agree to the Term and Condition:',
            must_check_term: 'You Must Check Terms of Service',
            category: 'Category',
            category_property: 'Property',
            property: 'Property',
            category_events: 'Events',
            category_competition: 'Competition',
            competition: 'Competition',
            category_city: 'City',
            city: 'City',
            category_discount: 'Discount',
            general: 'General',
            Umum: 'General',
            download2: 'Download',
            no_file_download: 'There are no file download',
            no_category: 'There are no category',
            no_property: 'There are no property',
            there_no_gallery: 'There are no gallery',
            success_favorite: 'Succesfully Added to Favorites',
            failed_favorite: 'Failed Added to Favorites',
            no_user: 'There are no user',
            user_cancelled: 'Login cancelled.',
            no_news: 'There are no news',
            news: 'News',
            no_data: 'There are no data',
            are_you_download: 'Are you sure you want to download this file?',
            downloaded: 'Downloaded',
            discount_information: 'Discount Information',
            no_application_found: 'No Application Found',
            download_from_android_market: 'Download one from Android Market?',
            yes_please: 'Yes, Please',
            no_thanks: 'No, Thanks',
            download_dialog1: 'Do you want to download',
            download_dialog2: 'on your mobile apps?',
            downloading: 'Downloading',
            downloading_complete: 'Downloading complete',
            file_not_found: 'File not found',
            file_downloaded: 'File downloaded',
            download_error: 'Download error',
            select: 'select',
            set_to_main: 'set to main',
            must_choice_2: 'Choose 2 option',
            Calculator: 'Calculator',
            succes_set_to_main: 'Success to set in main page',
            exchange_rate: 'Exchange Rates',
            korean: 'Korean',
            Korean_Food: 'Korean Food',
            dialog_title_gps: '<b>Allow "LippoCikarang.com"\n to access your location while \n you use the app ?</b>',
            dialog_content_gps: 'Enable location service to explore spots \n near by',
            allow: 'Allow',
            dont_allow: 'Don\'t Allow',
            male: 'Male',
            female: 'Female',
            fashion: 'Fashion',
            Fashion_ : 'Fashion',
            fashion_ : 'Fashion',
            Batik: 'Batik',
            batik: 'Batik',
            post_topic_success: 'Post topic success',
            delete_topic_success: 'Delete topic success',
            delete_topic_failed: 'Delete topic failed',
            edit_topic_success: 'Edit topic success',
            post_topic_empty: 'Discussion title and description can\'t be empty',
            delete_image_success: 'Delete image success',
            post_comment_success: 'Post comment success',
            delete_comment_success: 'Delete comment success',
            edit_comment_success: 'Edit comment success',
            hint_comment: 'Comment',
            post_comment_empty: 'Comment can\'t be empty',
            post_bookmark_property_success: 'Added to favorites',
            delete_bookmark_property_success: 'Remove from favorites',
            remove_favorite_success: 'Succesfully remove form favorites',
            remove_favorite_failed: 'Failed remove form favorites',
            hint_fullname: 'Fullname',
            ovo: 'OVO',
            connect: 'Connect with Us',
            affiliates: 'Affiliates',
            featured: 'Featured',
            bookmark: 'Bookmark',
            load_from_library: 'Load from Library',
            use_camera: 'Use Camera',
            select_image_source: 'Select Image Source',
            failed_get_data: 'Failed Get Data',
            //
            entertaiment: 'Entertaiment',
            transportation: 'Transportation',
            dining: 'Dining',
            westren_food: 'Western',
            WESTREN_FOOD: 'Western Food',
            shopping: 'Shopping',
            gallery: 'Gallery',
            city_gallery: 'City Gallery',
            load_from_library: 'Load From Library',
            of: ' of ',
            Gas_Station: 'Gas Station',
            track: 'Track Your Complaint',
            add_new: '+ Add New',
            ds1: 'DS1',
            ds2: 'DS2',
            ds3: 'DS3',
            ds4: 'DS4',
            ds5: 'DS5',
            ds6: 'DS6',
            //button
            BUTTON_TEXT_EN: 'English',
            BUTTON_TEXT_DE: 'Indonesia'
        })
        .translations('ina', {
            apilink: api_link,
            apilinkpayment: api_link_payment,
            ds1: 'DS1',
            ds2: 'DS2',
            ds3: 'DS3',
            ds4: 'DS4',
            ds5: 'DS5',
            ds6: 'DS6',
            app_name: 'LippoCikarang.com',
            sound: 'Suara',
            eComplaint: 'Apakah Anda memiliki keluhan?',
            eComplaint2: 'Sampaikan pada kami dan kami akan menuntaskannya.',
            btn_eC: 'Ya, lanjutkan.',
            installed: 'tersedia',
            not_installed: 'belum tersedia',
            confirm_install_sos: 'Apakah Anda ingin mengunduh aplikasi Ambulance Siloam 1health ?',
            confirm_install_ovo: 'Apakah Anda ingin mengunduh aplikasi Ovo ?',
            loading: 'Memuat',
            loginmessage: 'Mencoba masuk',
            logoutmessage: 'Mencoba keluar',
            soon: 'Segera Tersedia',
            Minimum_8_character: 'Minimal 8 karakter',
            about: 'Tentang',
            accomodation: 'Akomodasi',
            action_bookmark: 'Tandai',
            action_call: 'Hubungi',
            action_map: 'Peta',
            action_review: 'Ulasan',
            add_your_photo: 'Tambahkan Foto Anda',
            address: 'Alamat',
            apartment: 'Apartemen',
            Apartment: 'Apartemen',
            kavling: 'Kavling',
            with: 'dengan',
            orange_county: 'Orange County',
            are_resident: 'Apakah Anda seorang warga ? Daftarkan alamat email di database kami untuk menikmati ﬁtur khusus',
            are_alreadyaccount: 'Telah memiliki akun ? ',
            art: 'Seni & Budaya',
            atm_gallery: 'Galeri ATM',
            ATM_Gallery: 'Galeri ATM',
            automotive: 'Otomotif',
            Automotive: 'Otomotif',
            bakery: 'Roti & Pencuci Mulut',
            BAKERY___DESERT: 'Roti & Pencuci Mulut',
            bank: 'Bank',
            Bank: 'Bank',
            bar_cafe_club: 'Bar/Cafe/Club',
            CAFE___LOUNGE___BAR: 'Bar/Cafe/Club',
            Fast_Food: 'Cepat Saji',
            eyewear: 'Kacamata',
            beauty: 'Kecantikan',
            Beauty: 'Kecantikan',
            clothes: 'Pakaian',
            book_stationety: 'Buku & Alat Tulis',
            Book___Stationery: 'Buku & Alat Tulis',
            bookmarked: 'Tertandai',
            all_bookmarked: 'Sudah Tertandai',
            bookmark: 'Tandai',
            btn_lets_go: 'Mulai',
            bus: 'Bis',
            buy: 'Beli',
            Batik: 'Batik',
            batik: 'Batik',
            send_email: 'Kirim Pesan',
            call_agent: 'Hubungi Agen',
            call: 'Pusat',
            center: 'Panggilan',
            call_center_html: '<b>Pusat</b>Panggilan',
            cancel: 'Batal',
            cctv: 'CCTV',
            chinese: 'China',
            close: 'TUTUP',
            clothes: 'Pakaian',
            condominiums: 'Kondominium',
            Condominiums: 'Kondominium',
            cosmetic: 'Kosmetik',
            create_account: 'Buat Akun Baru',
            create_ur_account: 'Buat Akun Anda',
            daily: 'SENIN - JUMAT',
            weekly: 'SABTU & MINGGU',
            expand: 'Perluas',
            session: 'SESI',
            delete: 'Hapus',
            deparment_store: 'Pusat Perbelanjaan',
            Department_Store: 'Pusat Perbelanjaan',
            dialog_signout: 'Apakah anda yakin \n ingin keluar dari akun ini?',
            dialog_success_upgrade: 'Email Anda Telah Terdaftar, <br/> <b>Selamat</b> <br/>Sekarang anda sudah<br/>menjadi warga',
            dialog_fail_upgrade: 'Maaf, email tidak dapat terdaftar, <br/> Silahkan menghubungi Customer Service <br/>untuk mendaftarkan email anda',
            blm_login: 'Maaf, Anda belum login. Mohon login dari Profil untuk mengakses menu ini.',
            blm_rate: 'Maaf, Anda belum login. Mohon login dari Profil untuk memberikan rating.',
            blm_emailAgen: 'Maaf Anda belum login. Mohon login dari Profil untuk mengirimkan email pada agen.',
            intro1: 'Daftarkan diri untuk pengalaman lebih <br> <p style="font-size:8px;font-style:italic;margin:0;">fitur khusus untuk residents!</p>',
            intro2: 'Nikmati Diskon Khusus, <br> Daftar Sekarang!',
            intro3: 'Temukan <br> Lebih Banyak <br> <p style="font-size:8px;font-style:italic;margin:0;">fitur lainnya untuk resident & visitor!</p>',
            next: 'Lanjut',
            previous: 'Kembali',
            thanks: 'Terimakasih',
            dining: 'Kuliner',
            westren_food: 'Barat',
            WESTREN_FOOD: 'Barat',
            coupon: 'Diskon',
            discount: 'Kupon',
            discount_coupon: 'Diskon Kupon',
            Kupon: 'Kupon',
            download: 'Unduhan',
            download_more: 'Unduh',
            ebilling: 'eBilling',
            edit: 'Ubah',
            edit_profile: 'Ubah Profile',
            education: 'Edukasi',
            Education: 'Edukasi',
            electronic: 'Elektronik',
            Electronic_ : 'Elektronik',
            email_agent: 'Email Agen',
            entertaiment: 'Hiburan',
            events: 'Acara',
            Acara: 'Acara',
            eyewear: 'Kacamata',
            fastfood: 'Cepat Saji',
            fashion: 'Fashion',
            Fashion_ : 'Fashion',
            fashion_ : 'Fashion',
            forgot_password: 'Lupa Sandi ?',
            forgot_password_placeholder: 'Email atau nomor telepon',
            forum: 'Forum',
            gallery: 'Galeri',
            city_gallery: 'Galeri Kota',
            pro_gallery: 'Galeri Properti',
            gallery_confirm: 'Yakin ingin menghapus galeri forum ?',
            games: 'Permainan',
            gender: 'Jenis Kelamin',
            get_started: 'Mulai',
            golfing: 'Golf',
            gym: 'Kebugaran',
            health: 'Kesehatan',
            Kesehatan: 'Kesehatan',
            health_care: 'Kesehatan',
            Health_Care: 'Kesehatan',
            hello: 'Halo',
            help: 'Bantuan',
            helpful_number: 'Nomor Bantuan',
            number: 'Tanggal Dibuat',
            what_c: 'Apakah keluhan anda?',
            desc_c: 'Keluhan Anda ...',
            CC: 'Klien Kode',
            hint_confirm_password: 'Konfirmasi Kata Sandi',
            hint_email: 'Email',
            hint_pass: 'Kata Sandi',
            hint_password: 'Kata Sandi',
            hint_phone: 'No Handphone',
            hint_topic_desc: 'Isi Diskusi',
            hint_topic_title: 'Judul Diskusi',
            hist_cont_1: 'Jelajahi Timeline Anda',
            hist_cont_2: 'Riwayat Lokasi membantu Anda mendapatkan informasi yang berguna - secara otomatis akan meningkatkan hasil pencarian.',
            hist_cont_3: 'Temukan kembali tempat yang sudah Anda temukan dan sudah kunjungi.',
            hist_cont_4: 'Hanya Anda yang dapat melihat Timeline Anda',
            home_improvement: 'Perbaikan Rumah',
            Home_Improvement: 'Perbaikan Rumah',
            hospital: 'Rumah Sakit',
            hotel: 'Hotel',
            hours_today: 'Jam Operasional',
            what_new: 'Berita Baru',
            indoor_sports: 'Dalam Ruangan',
            industry: 'Petunjuk Industrial',
            Industry: 'Petunjuk Industrial',
            e_success: 'Case Baru Sukses',
            e_failed: 'Case Baru Gagal',
            industries: 'Industri',
            unit: ' unit',
            insurance: 'Asuransi',
            Insurance: 'Asuransi',
            invitation_msg: 'Berbagi dengan teman anda',
            invite_friend: 'Undang Teman',
            inviteFriend: 'Berbagi dengan teman anda',
            japanese: 'Jepang',
            japanese_food: 'Makanan Jepang',
            Japanese_Food: 'Makanan Jepang',
            jewelry: 'Perhiasan',
            join_us: 'Bergabung dengan menggunakan akun \n media sosial anda',
            karaoke: 'Karaoke',
            leisure: 'Hiburan',
            Leisure: 'Hiburan',
            login: 'Masuk',
            login_with: 'Masuk dengan',
            login_failed: 'Gagal login!',
            facebook_login_failed: 'Gagal login Facebook',
            failed: 'Gagal!',
            failed_get_data: 'Gagal dapatkan data',
            must_choose_1: 'Harus memilih 1 tipe pembayaran',
            check_email: 'Silahkan cek email untuk konfirmasi',
            cannot_put_email: 'Tidak dapat menempatkan email untuk verifikasi',
            wrong_email: 'Email atau Nomor Telfon tidak benar',
            enter_credential: 'Silakan masukkan kredensial!',
            main: 'Utama',
            map: 'Peta',
            tenant_map: 'Peta Penyewa',
            mark: 'Tandai sudah dibaca',
            mart: 'Mart',
            more: 'Lainnya',
            exchange: 'Nilai Tukar',
            currency: 'Mata Uang',
            language: 'Bahasa',
            success_language: 'Anda memilih Bahasa ',
            minimarket: 'Minimarket',
            Minimarket: 'Mart',
            msg_deleted: 'Terhapus',
            msg_marked: 'Tertandai',
            msg_update: 'Update',
            msg_update_failed: 'Update Gagal',
            msg_update_success: 'Update Berhasil',
            msg_delete_success: 'Berhasil terhapus',
            msg_delete_failed: 'Gagal menghapus',
            music: 'Musik',
            my_history: 'Riwayat',
            my_notification: 'Pemberitahuan',
            my_location: 'Lokasi',
            mybookmark: 'Penanda',
            name: 'Nama',
            newton_techno_park: 'Newton Techno Park',
            no: 'Tidak',
            gps_on: 'GPS aktif',
            gps_off: 'GPS tidak aktif',
            gps_set: 'GPS mendapatkan lokasi',
            no_connection: 'no_connection',
            retry: 'ULANG',
            no_item: 'Tidak ada item tersedia',
            no_gallery: 'Tenant ini tidak mempunyai galeri foto',
            no_image_available: 'Gambar tidak tersedia',
            no_phone_agent: 'Agen ini tidak mempunyai nomor telepon',
            no_phone_tenant: 'Tenant ini tidak mempunyai nomor telepon',
            no_review_tenant: 'Tenant ini tidak mempunyai ulasan',
            not_empty: 'Tidak boleh kosong',
            not_equal: 'Password tidak sama',
            notaris: 'Notaris',
            Notaris: 'Notaris',
            notification: 'Nyalakan notifikasi',
            notification_info: 'Dapatkan informasi terbaru',
            notification_push: 'Kamu mempunyai pemberitahuan baru',
            number_not_valid: 'Nomor atau email salah',
            number_null: 'Nomor anda kosong',
            open: 'BUKA',
            others: 'Lainnya',
            OTHERS: 'Lainnya',
            Others: 'Lainnya',
            outdoor_sports: 'Luar Ruangan',
            pelase_wait: 'Silakan tunggu...',
            phone: 'Telpon',
            photo_gallery: 'Galeri',
            post_rating_success: 'Terimakasih telah memberi rating',
            profile: 'Profil',
            type: 'Tipe',
            property_agents: 'Agen Properti',
            Property_Agent: 'Agen Properti',
            property_market: 'Property Market',
            property_start: 'Aplikasi ini menawarkan pencarian properti di Lippo Cikarang. Temukan properti yang dijual, disewa, termasuk rumah, apartemen, ruko, komersial dan tanah.',
            property_finding: 'Temukan properti impian Anda.',
            pscode: 'PSCODE',
            pscode_correct: 'PsCode Benar',
            public_services: 'Pelayanan Publik',
            public_transportation: 'Transportasi Umum',
            public_transportation_bottom: 'Transportasi umum yang memasuki Beverly dan Ventura , Lippo Cikarang hanya sampai 09.00 WIB',
            rate_title: 'Rating Penyewa',
            rate_this_tenant: 'Nilai tempat ini',
            tenant: 'Penyewa',
            tenant_gallery: 'Galeri Tenant', 
            rate_dialog: 'Apakah Anda yakin ingin menilai penyewa ini ?',
            rate_text: 'Nilai tempat ini',
            recommended: 'Rekomendasi',
            recreational_sites: 'Rekreasi',
            registration_success: 'Pendaftaran Berhasil',
            registration_failed: 'Pendaftaran Gagal',
            activate_account: 'Silahkan cek email Anda untuk mengaktifkan akun Anda!',
            rent: 'Sewa',
            rental_cars: 'Rental Mobil',
            Rental_Cars: 'Rental Mobil',
            resend_code: 'Kirim Ulang Kode',
            reset: 'Reset',
            reset_password: 'Atur Ulang Kata Sandi',
            reset_password_sub1: 'Anda mengubah kata sandi untuk',
            resident: 'Resident',
            employment: 'Karyawan',
            jobs: 'Pekerjaan',
            house: 'Rumah',
            unit: 'Unit',
            information: 'Informasi',
            tree: 'Pohon',
            roads: 'Jalan',
            time_zone: 'Zona Waktu',
            area_code: 'Kode Area',
            vehicle_registration: 'Daftar Kendaraan',
            shop: 'Toko',
            salon: 'Salon',
            service_apartment: 'Layanan Apartemen',
            save: 'Simpan',
            save_profile: 'Simpan Profil',
            school: 'Sekolah',
            international_schools: 'Sekolah Internasional',
            search_hint: 'Cari',
            search_title: 'Cari',
            send_code: 'Masukkan kode yang kami kirimkan email / telepon seluler Anda',
            send_email_agent: 'Pesan',
            send_email_success: 'Email berhasil dikirim',
            send_message: 'Kirim Pesan',
            shoes: 'Sepatu',
            newCase: 'Are you sure you want to submit this concern?',
            shopping: 'Belanja',
            sign_start: 'Daftar dan mulai menjelajah',
            signout: 'Keluar',
            signup: 'Daftar',
            goMain: 'Kembali ke Halaman Utama',
            signup_lippo: 'Daftar ke LippoCikarang.com',
            lippo_cikarang: 'Lippo Cikarang',
            skip: 'Lewati',
            skin_care: 'Skin Care',
            sound_info: 'Nyalakan suara',
            spbu: 'SPBU',
            version: 'Versi',
            splash_g1_1: 'Temukan apa yang Anda perlukan',
            splash_g2_1: 'Cara terbaik',
            splash_g2_2: 'untuk berhubungan',
            splash_g2_3: 'dengan lingkungan anda',
            splash_g3_1: 'Mulai Profil Anda',
            splash_g3_2: 'Temukan tempat',
            splash_g3_3: 'favorit anda',
            sport: 'Olahraga',
            Sport: 'Olahraga',
            sports: 'Olahraga',
            start_now: 'Mulai Sekarang',
            Art___Culture: 'Seni & Budaya',
            sub2_forget_password: 'Kami akan mengirim email Anda segera untuk mereset password Anda',
            sub_forget_password: 'Masukkan alamat email atau nomor telepon bawah untuk mereset sandi Anda',
            reset_success: 'Berhasil mereset password',
            cannot_send_code: 'Tidak bisa mengirim kode',
            email_not_exist: 'Email atau nomor telepon tidak ada',
            email_exist: 'Nomor atau email telah ada!',
            submit: 'Masuk',
            supermarket: 'Supermarket',
            taxi: 'Taksi',
            terms_privacy: 'Saya Setuju dengan Syarat',
            terms_privacy_next: 'dan Ketentuan yang berlaku',
            title_activity_detail_maps: 'Peta',
            title_activity_transportation_public: 'Peta',
            tour_travel: 'Wisata & Perjalanan',
            Tour___Travel: 'Wisata & Perjalanan',
            traditional: 'Tradisional',
            Traditional_Food: 'Tradisional',
            train: 'Kereta',
            transportation: 'Transportasi',
            try_again: 'Coba Lagi',
            tutor: 'Lembaga Khusus',
            upgrade_resident: 'Menjadi Warga',
            upload_image_success: 'Mengunggah gambar berhasil',
            useful_information: 'Informasi',
            workshop_services: 'Bengkel',
            Workshop_Service: 'Bengkel',
            world_clock: 'Jam Dunia',
            yes: 'Ya',
            btn_discount_coupon: '<b>Kupon</b>Diskon',
            welcome_dialog: 'Anda terdaftar sebagai ',
            okay: 'Oke',
            about_us: 'Tentang kami',
            terms: 'SYARAT & KETENTUAN',
            privacy: 'KEBIJAKAN PRIVASI',
            rate: 'NILAI KAMI',
            emergency_call_1: 'Panggilan',
            emergency_call_2: 'Darurat',
            emergency_service_1: 'Layanan',
            emergency_service_2: 'Darurat',
            sort: 'Atur',
            sort_distance: 'Jarak',
            sort_name: 'Nama',
            population: 'Populasi',
            sort_popularity: 'Popularitas',
            category_all: 'Semua',
            accessories___toys: 'Aksesoris & Mainan',
            //child property
            house_property: 'Rumah',
            apartment_property: 'Apartemen',
            kavling_property: 'Kavling',
            commercial_property: 'Komersial',
            cinema: 'Bioskop',
            commercial: 'Komersial',
            industry_property: 'Industri',
            //Sort Property
            sort_harga: 'Harga(Rendah-Tinggi)',
            sort_new: 'Baru',
            sort_popular: 'Popularitas(Tinggi-Rendah)',
            leght_password: 'Silahkan masukkan kata sandi baru, \n password harus terdiri dari 8 karater.',
            avoid_pasword: 'Hindari password yang mudah ditebak \n atau digunakan dengan website lain',
            verify: 'Verifikasi',
            //forum
            post_a_comment: 'Komentar',
            views: 'VIEWS',
            new_topic: '+ TOPIK BARU',
            new_comment: '+ Komen Baru',
            discussion_title: 'Judul Diskusi',
            upload: 'Unggah',
            post: 'Pasang',
            edit_topic: 'edit',
            edit_post: 'Ubah',
            delete_discussion: 'Hapus Diskusi',
            comment: 'COMMENT',
            forum_comment: 'Komentar Forum',
            comment_success: 'Berhasil!',
            comment_failed: 'Gagal!',
            edit_comment: 'Ubah Komentar',
            delete_comment: 'Hapus Komentar',
            stared_a_thread: 'MEMULAI BAHASAN',
            acces_billing: 'Akses sekarang! Mengunduh dan membayar tagihan Anda semakin mudah',
            amount_to_be_paid: 'Total pembayaran',
            total_amount: 'Jumlah Total',
            description: 'Deskripsi',
            cant_acces_billing: 'Tidak dapat membuka tagihan',
            payment: 'Pembayaran',
            confirm_payment: 'Apakah Anda yakin akan membayar<br><b>Tagihan Perumahan</b><br>pada aplikasi Anda?',
            hint_email_phone: 'Email or Nomer Ponsel',
            hint_email:'Email',
            let_acces_billing: 'Melihat Tagihan',
            pay_now: 'Bayar',
            select_payment: 'Silahkan memilih metode pembayaran:',
            total_bill: 'Total Pembayaran',
            unit_no: 'No Unit',
            client_code: 'Kode Klien',
            client_name: 'Nama Klien',
            read_condition: 'Saya sudah membaca dan menyetujui \n Syarat & Ketentuan yang berlaku',
            must_check_term: 'You Must Check Terms of Service',
            category: 'Kategori',
            category_property: 'Properti',
            property: 'Properti',
            category_events: 'Acara',
            category_competition: 'Kompetisi',
            competition: 'Kompetisi',
            category_city: 'Kota',
            city: 'Kota',
            category_discount: 'Diskon',
            general: 'Umum',
            Umum: 'Umum',
            download2: 'Unduh',
            no_file_download: 'Tidak ada file yang diunduh',
            are_you_download: 'Apakah Anda ingin mengunduh file ini?',
            no_category: 'Tidak ada kategori',
            no_property: 'Tidak ada properti',
            there_no_gallery: 'Tidak ada galeri',
            success_favorite: 'Berhasil ditambahkan ke favorit',
            failed_favorite: 'Gagal ditambahkan ke favorit',
            no_user: 'Tidak ada pengguna',
            user_cancelled: 'Login dibatalkan.',
            no_news: 'Tidak ada berita',
            news: 'Berita',
            no_data: 'Tidak ada data',
            downloaded: 'Sudah Diunduh',
            discount_information: 'Informasi Diskon',
            no_application_found: 'Tidak ada aplikasi ditemukan',
            download_from_android_market: 'Mengunduh satu melalui Android Market?',
            yes_please: 'Ya, Silahkan',
            no_thanks: 'Tidak, terima kasih',
            download_dialog1: 'Anda ingin mengunduh',
            download_dialog2: 'di aplikasi Anda?',
            downloading: 'Mengunduh',
            downloading_complete: 'Mengunduh berhasil',
            file_not_found: 'File tidak ditemukan',
            file_downloaded: 'File terunduh',
            download_error: 'Mengunduh gagal',
            select: 'Pilih',
            set_to_main: 'Pengaturan Utama',
            must_choice_2: 'Pilih 2 opsi',
            Calculator: 'Kalkulator',
            succes_set_to_main: 'Berhasil mengatur di halaman utama',
            exchange_rate: 'Nilai Tukar',
            korean: 'Korea',
            Korean_Food: 'Korea',
            dialog_title_gps: 'Ijinkan "LippoCikarang.com" \n untuk mengakses lokasi \n anda selama menggunakan \n aplikasi?',
            dialog_content_gps: 'Aktifkan layanan lokasi untuk menjelajahi tempat-tempat terdekat',
            allow: 'Ijinkan',
            dont_allow: 'Tidak',
            male: 'Laki-laki',
            female: 'Perempuan',
            login_success: 'Berhasil login',
            post_topic_success: 'Berhasil menambahkan topik',
            delete_topic_success: 'Berhasil menghapus topik',
            delete_topic_failed: 'Gagal menghapus topik',
            edit_topic_success: 'Berhasil mengubah topik',
            post_topic_empty: 'Judul diskusi dan deskripsi tidak boleh kosong',
            remove_favorite_success: 'Berhasil menghapus dari favorit',
            remove_favorite_failed: 'Gagal menghapus dari Favorit',
            delete_image_success: 'Berhasil menghapus gambar',
            post_comment_success: 'Berhasil menambahkan komentar',
            delete_comment_success: 'Berhasil menghapus komentar',
            edit_comment_success: 'Berhasil mengubah komentar',
            hint_comment: 'Komentar',
            post_comment_empty: 'Komentar tidak boleh kosong',
            post_bookmark_property_success: 'Ditambahkan ke favorit',
            delete_bookmark_property_success: 'Dihapus dari favorit',
            success_bookmark: 'Berhasil menandai',
            hint_fullname: 'Nama Lengkap',
            spa___treatment: 'Spa & Treatment',
            ovo: 'OVO',
            connect: 'Terhubung dengan Kami',
            affiliates: 'Afiliasi',
            featured: 'Fitur',
            load_from_library: 'Ambil Dari Perpustakaan',
            use_camera: 'Gunakan Kamera',
            select_image_source: 'Pilih Sumber Gambar',
            of: ' dari ',
            Gas_Station: 'SPBU',
            track: 'Lacak Komplain Anda',
            add_new: '+ Tambahkan',
            //button
            BUTTON_TEXT_EN: 'Inggris',
            BUTTON_TEXT_DE: 'Indonesia'
        });
    $translateProvider.preferredLanguage('en');
    // remember language
    $translateProvider.useLocalStorage();
    $urlRouterProvider.otherwise("/");
    // white list link payment

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://innodev.vnetcloud.com/liveinpayment/payment?**'
    ]);

}

function run($ionicPlatform, $ionicPopup, $timeout, $rootScope, $location, $filter, $localStorage, ngFB, NotifAccountService, AdvertiseService) {

    $rootScope.search = function(value) {
        if ($location.path() == "/app/main" || $location.path() == "/app/currency") {
            $location.path('/app/search/' + value);
        } else if ($location.path() == "/app/property") {
            $location.path('/app/propertysearch/' + value + '/');
        } else if ($location.path() == "/app/gallery") {
            $location.path('/app/getSearchGallery/' + value);
        } else {
            $rootScope.search_page = value;
        }
    }

    $rootScope.$on("$ionicView.beforeEnter", function() {
        var myEl = angular.element(document.querySelector('#sidemenu-con'));

        if ($location.path().substr(0, 15) == "/app/cctvDetail" || $location.path() == "/app/main" || $location.path().substr(0, 11) == "/app/search" ||
            $location.path() == "/app/currency" || $location.path() == "/app/profile" || $location.path() == "/app/history" ||
            $location.path().substr(0, 14) == "/app/myhistory" || $location.path() == "/app/editprofile" || $location.path() == "/app/listbookmark" ||
            $location.path() == "/app/listbookmark" || $location.path() == "/app/notification" || $location.path().substr(0, 23) == "/app/notificationDetail" ||
            $location.path() == "/app/map" || $location.path() == "/app/download" || $location.path().substr(0, 19) == "/app/downloadDetail" ||
            $location.path() == "/app/more" || $location.path() == "/app/inivitefriend" || $location.path() == "/app/tenantDetail/:idtenant") {
            myEl.attr('nav-view', 'cached');
        } else {
            myEl.attr('nav-view', 'active');
        }

    });

    $rootScope.$on("$ionicView.beforeEnter", function() {
        if ($location.path() == "/app/bus" || $location.path().substr(0, 17) == "/app/tenantDetail" || $location.path().substr(0, 13) == "/app/cctvFull") {
            $rootScope.tab = false;
        } else {
            $rootScope.tab = true;
        }

    });


    $rootScope.$on("$ionicView.beforeEnter", function() {
        if($location.path() != "/app/main") {
            $rootScope.$broadcast('adsModal:hideModal');
            $rootScope.$broadcast('adsLogin:hideModal');
        }    
    });

    $ionicPlatform.ready(function(){
        
     backgroundGeolocation.configure(callBackFn,failureFn,{
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        interval: 60000

    });

    //get location succes
    function callBackFn (position){
            // alert(JSON.stringify(position));
            $rootScope.backgroundmyLatlng = new google.maps.LatLng(position.latitude,position.longitude);

        }   

        function failureFn(errror){
            $rootScope.backgroundmyLatlng= undefined;
        //    alert(JSON.stringify(position));
            // $scope.tujuan = new google.maps.LatLng($rootScope.lattenant, $rootScope.longtenant);
            // getdirection($scope.tujuan)

        }

      backgroundGeolocation.start();

    });

    $ionicPlatform.ready(function() {

        $rootScope.StartEvent = false;

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
            /*StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString('#0D6DB6');*/
        }   

        // Push Notification
        setInterval(function() {
            if ($localStorage.currentUser != null) {

                // Push Notifications
                PushNotifications();
                PushAdvertise();

            }
        }, 10000);             

        function PushNotifications() {
            NotifAccountService.countNotif(function(response) {
                var sum = response;

                if ($localStorage.notifPush.sound != false) {
                    var playSound = 'res://platform_default';
                } else {
                    var playSound = 'TYPE_NOTIFICATION';
                }

                if (sum > 0) {
                    // console.log('Anda memiliki ' + sum + ' notif baru..');
                    if ($localStorage.notifPush.status != false) {

                        // console.log('Notif Aktif ..');
                        // console.log('playSound : ' + playSound);
                        window.plugin.notification.local.schedule({
                            id: 2,
                            title: $filter('translate')('notification_push'),
                            every: "minute",
                            sound: playSound,
                            badge: sum
                        });
                        window.plugin.notification.local.on("trigger", function(notification) {
                            // console.log('Success with ' + notification);
                        });
                    } else {
                        // console.log('Notif Nonaktif ..');
                    }
                } else {
                    // console.log('Tidak ada notif baru ..');
                }
            });
        }

        function PushAdvertise() {
            AdvertiseService.AdsWhenNew(function(response) {
                var sum = response;

                if (sum > 0) {
                    //console.log('Anda memiliki ' + sum + ' ads baru..');
                    AdvertiseService.AdsOpen();
                } else {
                    // console.log('Tidak ada ads baru ..');
                }
            });
        }

    });

    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $localStorage.currentUser.fullname = $localStorage.currentUser.fullname;
    }

    /*// redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/');
        }
    });*/

    ngFB.init({ appId: '822365854560840' });

}

function ngEnter() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    }
}

function repeatDone() {
    return function(scope, element, attrs) {
        if(scope.$last){
            scope.$eval(attrs.repeatDone);
        }
    }
}
