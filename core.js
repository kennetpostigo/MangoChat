export var core = (function () {
  var names = {};
  // claim a name so that no one else can have the same one
  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // Generates a guest and increments the guestid
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // grab the names object and turn it into an array for client.
  var get = function () {
    var res = [];
    for (var user in names) {
      res.push(user);
    }

    return res;
  };
  //free up a name when the guest disconnects.
  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());
