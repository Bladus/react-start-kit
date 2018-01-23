'use strict';

Number.prototype.withZero = function() {
    if (this > -10 && this < 0) {
        return this.toString().replace('-', '-0');
    }
    if (this >= 0 && this < 10) {
        return '0' + this.toString();
    }
    return this.toString();
}

let formatMethods = {
    YYYY: (date, utc) => date[`get${utc}FullYear`](),
    YY:   (date)      => date.getYear(),

    MM:   (date, utc) => (date[`get${utc}Month`]() + 1).withZero(),
    DD:   (date, utc) => date[`get${utc}Date`]().withZero(),
    HH:   (date, utc) => date[`get${utc}Hours`]().withZero(),
    mm:   (date, utc) => date[`get${utc}Minutes`]().withZero(),

    M:    (date, utc) => date[`get${utc}Month`]() + 1,
    D:    (date, utc) => date[`get${utc}Date`](),
    H:    (date, utc) => date[`get${utc}Hours`](),
    m:    (date, utc) => date[`get${utc}Minutes`](),
}

Date.prototype.format = function(template = 'YYYY.MM.DD', toUTC) {
    for(let key in formatMethods) {
        let re = new RegExp(key, 'g');
        template = template.replace(re, formatMethods[key](this, toUTC ? 'UTC' : ''));
    }
    return template;
}