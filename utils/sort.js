'use strict';

export function sortDown(a, b, compare) {
    if (a[compare] > b[compare]) {
        return -1;
    }
    if (a[compare] < b[compare]) {
        return 1;
    }
    return 0;
}

export function sortUp(a, b, compare) {
    if (a[compare] > b[compare]) {
        return 1;
    }
    if (a[compare] < b[compare]) {
        return -1;
    }
    return 0;
}

export function sortNumber(a, b, compare) {
    return a[compare] - b[compare];
}