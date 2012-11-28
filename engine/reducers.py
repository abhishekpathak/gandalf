SUM = {
        'reducer':"function reduce (key,vals) {var sum = 0;for (var i in vals) sum += vals[i];return sum;}"
    }

COUNT = {
        'reducer':"function reduce (key,vals) {var count = 0;for (var i in vals) count += vals[i];return count;}"
    }

AVERAGE = {
        'reducer':"function reduce (key,vals) {var avg = 0;for (var i in vals) sum += vals[i];return sum/i;}"
    }
