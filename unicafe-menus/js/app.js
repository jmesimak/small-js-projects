var unijs = angular.module('unijs', ['geolocation', 'LocalStorageModule']);

unijs.filter('fav', function() {
  return function(input, favs) {
    if (favs) {
      var ret = _.where(input, {favorite: true})
      return ret;
    }
    return input;
  }
});

unijs.controller('WorldCtrl', ['$scope', '$http', 'geolocation', 'localStorageService', '$filter', function($scope, $http, geolocation, localStorageService, $filter) {

  $scope.baseurl = "http://hyy-lounastyokalu-production.herokuapp.com/publicapi/restaurant/"

  $scope.unicafeLocations = [{
    name: 'Albertinkatu',
    id: 21,
    lat: 60.16532119999999,
    lon: 24.9316561,
    areacode: 6,
    addr: 'Albertinkatu 40-42'
  }, {
    name: 'Biokeskus',
    id: 16,
    lat: 60.2269484,
    lon: 25.0139846,
    areacode: 5,
    addr: 'Viikinkaari 9'
  }, {
    name: 'Bulevardi',
    id: 20,
    lat: 60.1626864,
    lon: 24.9319735,
    areacode: 6,
    addr: 'Bulevardi 31'
  }, {
    name: 'Cafe Portaali',
    id: 5,
    lat: 60.1702682,
    lon: 24.9478013,
    areacode: 1,
    addr: 'Vuorikatu 3'
  }, {
    name: 'Chemicum',
    id: 10,
    lat: 60.2060393,
    lon: 24.9634343,
    areacode: 2,
    addr: 'A.I. Virtasen aukio 1'
  }, {
    name: 'Exactum',
    id: 11,
    lat: 60.20497469999999,
    lon: 24.9634712,
    areacode: 2,
    addr: 'Gustaf Hällströmin katu 2b'
  }, {
    name: 'Gaudeamus Kirja & Kahvi',
    id: 31,
    lat: 60.1711237,
    lon: 24.9478039,
    areacode: 1,
    addr: 'Vuorikatu 7'
  }, {
    name: 'Hämeentie',
    id: 25,
    lat: 60.2147376,
    lon: 24.9804215,
    areacode: 6,
    addr: 'Hämeentie 161'
  }, {
    name: 'Korona',
    id: 17,
    lat: 60.22719110000001,
    lon: 25.0123344,
    areacode: 5,
    addr: 'Viikinkaari 11'
  }, {
    name: 'Leiritie',
    id: 28,
    lat: 60.25858569999999,
    lon: 24.8455813,
    areacode: 6,
    addr: 'Leiritie 1'
  }, {
    name: 'Meilahti',
    id: 13,
    lat: 60.190132,
    lon: 24.9094045,
    areacode: 3,
    addr: 'Haartmaninkatu 3'
  }, {
    name: 'Metsätalo',
    id: 1,
    lat: 60.1722951,
    lon: 24.9490657,
    areacode: 1,
    addr: 'Fabianinkatu 39'
  }, {
    name: 'Olivia',
    id: 2,
    lat: 60.1751035,
    lon: 24.9533853,
    areacode: 1,
    addr: 'Siltavuorenpenger 5 A'
  }, {
    name: 'Onnentie',
    id: 22,
    lat: 60.21979880000001,
    lon: 24.9567839,
    areacode: 6,
    addr: 'Onnentie 18'
  }, {
    name: 'Päärakennus',
    id: 4,
    lat: 60.16945089999999,
    lon: 24.9495854,
    areacode: 1,
    addr: 'Fabianinkatu 33'
  }, {
    name: 'Päärakennus Opettajien ravintola',
    id: 32,
    lat: 60.16945089999999,
    lon: 24.9495854,
    areacode: 1,
    addr: 'Fabianinkatu 33 ( 2.krs )'
  }, {
    name: 'Physicum',
    id: 12,
    lat: 60.20497469999999,
    lon: 24.9634712,
    areacode: 2,
    addr: 'Gustaf Hällströmin katu 2'
  }, {
    name: 'Porthania',
    id: 3,
    lat: 60.16995530000001,
    lon: 24.9483891,
    areacode: 1,
    addr: 'Yliopistonkatu 3'
  }, {
    name: 'Ravintola Domus',
    id: 30,
    lat: 60.1700105,
    lon: 24.9223593,
    areacode: 1,
    addr: 'Hietaniemenkatu 14'
  }, {
    name: 'Ravintola Serpens',
    id: 33,
    lat: 60.181991,
    lon: 24.9228806,
    areacode: 1,
    addr: 'Töölönkatu 37 A'
  }, {
    name: 'Ricola',
    id: 19,
    lat: 60.1843652,
    lon: 24.9562495,
    areacode: 6,
    addr: 'Agricolankatu 1-3, '
  }, {
    name: 'Ruskeasuo',
    id: 14,
    lat: 60.2054443,
    lon: 24.8959336,
    areacode: 3,
    addr: 'Kytäsuontie 9'
  }, {
    name: 'Soc&Kom',
    id: 15,
    lat: 60.1730803,
    lon: 24.9525119,
    areacode: 1,
    addr: 'Yrjö-Koskisen katu 3'
  }, {
    name: 'Sofianlehto',
    id: 26,
    lat: 60.20388670000001,
    lon: 24.9505266,
    areacode: 6,
    addr: 'Sofianlehdonkatu 5 b'
  }, {
    name: 'Topelias',
    id: 7,
    lat: 60.17188629999999,
    lon: 24.9504797,
    areacode: 1,
    addr: 'Unioninkatu 38'
  }, {
    name: 'Tukholmankatu',
    id: 23,
    lat: 60.1912105,
    lon: 24.9016905,
    areacode: 6,
    addr: 'Tukholmankatu 10'
  }, {
    name: 'Valtiotiede',
    id: 8,
    lat: 60.17342719999999,
    lon: 24.9507684,
    areacode: 1,
    addr: 'Unioninkatu 37'
  }, {
    name: 'Vanha Maantie',
    id: 27,
    lat: 60.2219203,
    lon: 24.8055343,
    areacode: 6,
    addr: 'Vanha Maantie 6'
  }, {
    name: 'Vanha Viertotie',
    id: 24,
    lat: 60.21112900000001,
    lon: 24.8816592,
    areacode: 6,
    addr: 'Vanha Viertotie 23'
  }, {
    name: 'Viikuna',
    id: 18,
    lat: 60.229297,
    lon: 25.0218129,
    areacode: 5,
    addr: 'Agnes Sjöbergin katu 2'
  }, {
    name: 'Viola',
    id: 29,
    lat: 60.17585519999999,
    lon: 24.9478571,
    areacode: 1,
    addr: 'Kaisaniemenranta 2'
  }, {
    name: 'Ylioppilasaukio',
    id: 9,
    lat: 60.16674709999999,
    lon: 24.9430141,
    areacode: 1,
    addr: 'Mannerheimintie 3 B'
  }];

  geolocation.getLocation().then(function(data) {
    $scope.userLocation = {
      lat: data.coords.latitude,
      lon: data.coords.longitude
    };
    $scope.userLocation.leafletLoc = L.latLng(data.coords.latitude, data.coords.longitude);

    $scope.unicafeLocations = _.map($scope.unicafeLocations, function(uc) {
      uc.leafletLoc = L.latLng(uc.lat, uc.lon);
      uc.distFromUser = Math.floor(uc.leafletLoc.distanceTo($scope.userLocation.leafletLoc));
      return uc;
    });

    $scope.nearest = _.min($scope.unicafeLocations, function(uc) {
      return uc.distFromUser;
    });

    $http.get($scope.baseurl + $scope.nearest.id)
    .success(function(data, status, headers, config) {
      $scope.nearestList = data.data;

      $scope.nearestList = _.map($scope.nearestList, function(day) {
        var date = day.date.split(" ")[1];
        var date_day = date.split(".")[0];
        var date_mo = date.split(".")[1];
        var date_y = "2014";
        day.corr_date = new Date(Date.parse(date_y + "-" + date_mo + "-" + date_day));
        return day;
      });

      $scope.corrDay = _.find($scope.nearestList, function(day) {
        return new Date().getDay() === day.corr_date.getDay() && new Date().getMonth() === day.corr_date.getMonth();
      });

      $scope.foodz = $scope.corrDay.data;

    })

    $scope.unicafeLocations = $filter('orderBy')($scope.unicafeLocations, 'distFromUser');

    for (var i = 0; i < 3; i++) {
      $scope.fetchListById($scope.unicafeLocations[i].id);
    }

  });



$scope.fetchListById = function(id) {
  var unicafe = _.find($scope.unicafeLocations, function(unicafe) {
    return unicafe.id === id;
  });

  unicafe.loading = true;

  $http.get($scope.baseurl + id)
  .success(function(data, status, headers, config) {
    unicafe.loading = false;
    var list = data.data;

    list = _.map(list, function(day) {
      var date = day.date.split(" ")[1];
      var date_day = date.split(".")[0];
      var date_mo = date.split(".")[1];
      var date_y = "2014";
      day.corr_date = new Date(Date.parse(date_y + "-" + date_mo + "-" + date_day));
      return day;
    });

    var corrDay = _.find(list, function(day) {
      return new Date().getDay() === day.corr_date.getDay() && new Date().getMonth() === day.corr_date.getMonth();
    });

    unicafe.foodz = corrDay.data;
  })
}

$scope.favorites = localStorageService.get("uniJS-favorites");
if (!$scope.favorites) {
  $scope.favorites = [];
}

$scope.inFavorites = function(id) {
  return $scope.favorites.indexOf(id) !== -1;
}

$scope.flipFavorite = function(id) {
  console.log("foo");
  $scope.inFavorites(id) ? $scope.removeFromFavorites(id) : $scope.addToFavorites(id);
}

$scope.addToFavorites = function(id) {
  var unicafe = _.find($scope.unicafeLocations, function(unicafe) {
    return unicafe.id === id;
  });

  unicafe.favorite = true;

  if ($scope.favorites.indexOf(id) === -1) {
    console.log($scope.favorites.indexOf(id));
    $scope.favorites.push(id);
    localStorageService.set("uniJS-favorites", JSON.stringify($scope.favorites));
    console.log($scope.favorites);
  }
}

$scope.removeFromFavorites = function(id) {
  var unicafe = _.find($scope.unicafeLocations, function(unicafe) {
    return unicafe.id === id;
  });
  unicafe.favorite = false;

  _.remove($scope.favorites, function(item) {
    console.log(id);
    console.log(item);
    return item === id
  });
  localStorageService.set("uniJS-favorites", JSON.stringify($scope.favorites));
}
$scope.favs = false;
$scope.favoriteUnicafes = [];

$scope.fetchFavorites = function() {
  $scope.unicafeLocations.forEach(function(cafe) {
    if ($scope.favorites.indexOf(cafe.id) !== -1) {
      cafe.favorite = true;
      $scope.favoriteUnicafes.push(cafe);
    }
  });
  $scope.favoriteUnicafes.forEach(function(unicafe) {
    $scope.fetchListById(unicafe.id);
  })
}

$scope.showClosest = function() {
  $scope.closest = 1;
}

$scope.fav = function() {
  $scope.favs = true;
}

$scope.unfav = function() {
  $scope.favs = false;
}

$scope.fetchFavorites();

}]);