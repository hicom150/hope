function sync(value) {
    var hope = new Hope.Promise();
    _check(hope, value);
    return hope;
}

function async(value, time) {
    var hope = new Hope.Promise();
    setTimeout(function() { _check(hope, value); }, time || 1000);
    return hope;
}

function _check(promise, value) {
    if (value > 10) {
        promise.done("Error: Valor mayor que 10.", value);
    } else {
        promise.done(null, value);
    }
}
// ============================================================================
// ============================================================================


//SYNC
sync(1).then(function(error, result) {
    console.error("[sync]  :", error, result);
});


//ASYNC
async(2).then(function(error, result) {
    console.error("[async] :", error, result);
});


//JOIN
var date = new Date();
Hope.join([
    function() {
        return sync(1);
    },
    function() {
        return async(20, 1500);
    }
]).then(
    function(errors, values) {
        console.error("[join]  :", (new Date() - date) + "ms", errors, values);
    }
);


var date = new Date();
Hope.chain([
    function(error, value) {
        console.log("   >> [chain].f1", error, value);
        return async(1, 100);
    },
    function(error, value) {
        console.log("   >> [chain].f2", error, value);
        return async(value + 1, 200);
    },
    function(error, value) {
        console.log("   >> [chain].f3", error, value);
        return async(value + 2, 300);
    },
    function(error, value) {
        console.log("   >> [chain].f4", error, value);
        return async(value + 3, 400);
    }
]).then(
    function(error, value) {
        console.error("[chain] :", (new Date() - date) + "ms", error, value);
    }
);
