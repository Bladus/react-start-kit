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

let unformatMethods = {
    YYYY: (date, value) => date.setFullYear(value),
    YY:   (date, value) => date.setYear(value),

    MM:   (date, value) => date.setMonth(value - 1),
    DD:   (date, value) => date.setDate(value),
    HH:   (date, value) => date.setHours(value),
    mm:   (date, value) => date.setMinutes(value),

    M:    (date, value) => date.setMonth(value - 1),
    D:    (date, value) => date.setDate(value),
    H:    (date, value) => date.setHours(value),
    m:    (date, value) => date.setMinutes(value),
}

Date.prototype.format = function(template = 'YYYY.MM.DD', toUTC) {
    for(let key in formatMethods) {
        let re = new RegExp(key, 'g');
        template = template.replace(re, formatMethods[key](this, toUTC ? 'UTC' : ''));
    }
    return template;
}

// TODO: функция не готова, почему-то возвращает дату с неверным часовым поясом 
String.prototype.unformat = function(template = 'YYYY.MM.DD') {
    let date = new Date();
    let arr = this.split('');

    for(let key in unformatMethods) {
        if (~template.indexOf(key)) {
            let index = template.indexOf(key);
            let value = arr.splice(index, key.length).join('');
            template = template.replace(key, '');
            unformatMethods[key](date, +value);
        }
    }
    return date;
}

String.prototype.rank = Number.prototype.rank = function() {
    let num      = +this;
    let [whole, fraction] = this.toString().split('.')

    whole = whole.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1").slice(1);
    return fraction ? `${whole}.${fraction}` : whole
}
Number.prototype.roundPlus = function roundPlus(n) { 
  if(isNaN(this) || isNaN(n)) return false;
  let m = Math.pow(10,n);
  return Math.round(this*m)/m;
}

Element.prototype.matches = Element.prototype.matches
    || Element.prototype.matchesSelector
    || Element.prototype.webkitMatchesSelector
    || Element.prototype.mozMatchesSelector
    || Element.prototype.msMatchesSelector
    || Element.prototype.oMatchesSelector;


// Object.prototype.getProp1 = function(getter) {
//     switch (typeof getter) {
//         case 'string': return this[getter];
//         case 'number': return this[getter];
//         case 'function': return getter(this);
//     }
//     throw new TypeError('Invalid argument type, expected string, number or function')
// }

Array.prototype.first = function(where, def) {
    if (typeof where == 'function') {
        return this.filter(where).first() || def;
    }
    return this[0];
}

Array.prototype.last = function(where, def) {
    if (typeof where == 'function') {
        return this.filter(where).last() || def;
    }
    return this[this.length - 1];
}
Array.prototype.diff = function(a) {
    return this.filter(function(i){return a.indexOf(i) < 0;});
};