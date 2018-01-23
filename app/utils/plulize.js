'use strict';

function pluralize(value, first, second, third) {
    value = value % 100;

    if (value === 1) {
        return first;
    } else if (value > 1 && value < 5) {
        return second;
    } else {
        return third;
    }
}

export default pluralize;