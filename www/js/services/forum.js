angular
    .module('livein')
    .service('ForumService', ForumService)

    function ForumService($http, $localStorage, $stateParams, $filter) {
        var service = {};
        
        service.listforum = listforum;
        service.forumdetail = forumdetail;
        service.newforum = newtopic;
        service.deleteforum = deleteforum;
        service.updateforum = updateforum;
        service.deleteforum = deleteforum;
        service.commentforum = commentforum;
        service.deleteGallery = deleteGallery;
        service.insertGallery = insertGallery;

        return service;

        function listforum(status, callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Forums/?action=listforums&pagesize=10000&pagenumber=1'
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function forumdetail(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Forums/?action=retrieve_get&idforums=' + $stateParams.idforum
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function newtopic(title, description, image, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Forums/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'insert_forums' +
                    '&idaccount=' + $localStorage.currentUser.data[0].idaccount +
                    '&title=' + title +
                    '&description=' + description +
                    '&avatar=' + image +
                    '&viewer=1'

            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function updateforum(idaccount, title, description, viewer, createdate, idforums, callback) {

            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Forums/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'update_forums' +
                    '&idaccount=' + idaccount +
                    '&title=' + title +
                    '&description=' + description +
                    '&viewer=' + viewer +
                    '&createdate=' + createdate +
                    '&idforums=' + idforums
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function deleteforum(idforums, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Forums/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'delete_forums' +
                    '&idforums=' + idforums
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function deleteGallery(idgallery, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Galleryforums/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'delete_galleryforums' +
                    '&idgalleryforums=' + idgallery
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function insertGallery(idforum, avatar, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Galleryforums/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'insert_galleryforums' +
                    '&idforums=' + idforum +
                    '&avatar=' + avatar
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function commentforum(forumComment, callback) {
            var req = {
                    method: 'POST',
                    url: $filter('translate')('apilink') + 'api/Comment/',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'action=' + 'insert_comment' +
                        '&idaccount=' + $localStorage.currentUser.data[0].idaccount +
                        '&idforums=' + $stateParams.idforum +
                        '&comment=' + forumComment
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

    }