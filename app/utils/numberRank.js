'use strict';

export default function numberRank(str) {
    return typeof str == 'string' || typeof str == 'number' ? str.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1").replace(/-\s/, '-') : undefined;
}