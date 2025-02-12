/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 1:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Base {
    label;
    desc;
    debug;
    defualtHeaders;
    constructor(label, desc, debug = true) {
        this.label = label;
        this.desc = desc;
        this.debug = debug;
        this.defualtHeaders = {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
        };
        console.log(`=======📣[${label}]脚本已启动📣=======\n`);
    }
    logger() {
        console.log();
    }
    done(data) {
        console.log(`\n=======📣[${this.label}]脚本已结束📣=======\n`);
        $done(data);
    }
    serialize(data) {
        let _serialize = '';
        for (const key in data) {
            _serialize += `key=${encodeURIComponent(data[key])}&`;
        }
        return _serialize.substring(0, _serialize.length - 1);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Base);


/***/ }),

/***/ 10:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version),
/* harmony export */   "VERSION": () => (/* binding */ VERSION),
/* harmony export */   "atob": () => (/* binding */ _atob),
/* harmony export */   "atobPolyfill": () => (/* binding */ atobPolyfill),
/* harmony export */   "btoa": () => (/* binding */ _btoa),
/* harmony export */   "btoaPolyfill": () => (/* binding */ btoaPolyfill),
/* harmony export */   "fromBase64": () => (/* binding */ decode),
/* harmony export */   "toBase64": () => (/* binding */ encode),
/* harmony export */   "utob": () => (/* binding */ utob),
/* harmony export */   "encode": () => (/* binding */ encode),
/* harmony export */   "encodeURI": () => (/* binding */ encodeURI),
/* harmony export */   "encodeURL": () => (/* binding */ encodeURI),
/* harmony export */   "btou": () => (/* binding */ btou),
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "isValid": () => (/* binding */ isValid),
/* harmony export */   "fromUint8Array": () => (/* binding */ fromUint8Array),
/* harmony export */   "toUint8Array": () => (/* binding */ toUint8Array),
/* harmony export */   "extendString": () => (/* binding */ extendString),
/* harmony export */   "extendUint8Array": () => (/* binding */ extendUint8Array),
/* harmony export */   "extendBuiltins": () => (/* binding */ extendBuiltins),
/* harmony export */   "Base64": () => (/* binding */ gBase64)
/* harmony export */ });
/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
const version = '3.7.2';
/**
 * @deprecated use lowercase `version`.
 */
const VERSION = version;
const _hasatob = typeof atob === 'function';
const _hasbtoa = typeof btoa === 'function';
const _hasBuffer = typeof Buffer === 'function';
const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64chs = Array.prototype.slice.call(b64ch);
const b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
})(b64chs);
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const _fromCC = String.fromCharCode.bind(String);
const _U8Afrom = typeof Uint8Array.from === 'function'
    ? Uint8Array.from.bind(Uint8Array)
    : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
const _mkUriSafe = (src) => src
    .replace(/=/g, '').replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_');
const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, '');
/**
 * polyfill version of `btoa`
 */
const btoaPolyfill = (bin) => {
    // console.log('polyfilled');
    let u32, c0, c1, c2, asc = '';
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length;) {
        if ((c0 = bin.charCodeAt(i++)) > 255 ||
            (c1 = bin.charCodeAt(i++)) > 255 ||
            (c2 = bin.charCodeAt(i++)) > 255)
            throw new TypeError('invalid character found');
        u32 = (c0 << 16) | (c1 << 8) | c2;
        asc += b64chs[u32 >> 18 & 63]
            + b64chs[u32 >> 12 & 63]
            + b64chs[u32 >> 6 & 63]
            + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
const _btoa = _hasbtoa ? (bin) => btoa(bin)
    : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
        : btoaPolyfill;
const _fromUint8Array = _hasBuffer
    ? (u8a) => Buffer.from(u8a).toString('base64')
    : (u8a) => {
        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
        const maxargs = 0x1000;
        let strs = [];
        for (let i = 0, l = u8a.length; i < l; i += maxargs) {
            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(''));
    };
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
const cb_utob = (c) => {
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                + _fromCC(0x80 | (cc & 0x3f)))
                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                    + _fromCC(0x80 | (cc & 0x3f)));
    }
    else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
            + _fromCC(0x80 | (cc & 0x3f)));
    }
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
const utob = (u) => u.replace(re_utob, cb_utob);
//
const _encode = _hasBuffer
    ? (s) => Buffer.from(s, 'utf8').toString('base64')
    : _TE
        ? (s) => _fromUint8Array(_TE.encode(s))
        : (s) => _btoa(utob(s));
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
const encode = (src, urlsafe = false) => urlsafe
    ? _mkUriSafe(_encode(src))
    : _encode(src);
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
const encodeURI = (src) => encode(src, true);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc) => {
    switch (cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
            return (_fromCC((offset >>> 10) + 0xD800)
                + _fromCC((offset & 0x3FF) + 0xDC00));
        case 3:
            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2)));
        default:
            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1)));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
const btou = (b) => b.replace(re_btou, cb_btou);
/**
 * polyfill version of `atob`
 */
const atobPolyfill = (asc) => {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc))
        throw new TypeError('malformed base64.');
    asc += '=='.slice(2 - (asc.length & 3));
    let u24, bin = '', r1, r2;
    for (let i = 0; i < asc.length;) {
        u24 = b64tab[asc.charAt(i++)] << 18
            | b64tab[asc.charAt(i++)] << 12
            | (r1 = b64tab[asc.charAt(i++)]) << 6
            | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
const _atob = _hasatob ? (asc) => atob(_tidyB64(asc))
    : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')
        : atobPolyfill;
//
const _toUint8Array = _hasBuffer
    ? (a) => _U8Afrom(Buffer.from(a, 'base64'))
    : (a) => _U8Afrom(_atob(a), c => c.charCodeAt(0));
/**
 * converts a Base64 string to a Uint8Array.
 */
const toUint8Array = (a) => _toUint8Array(_unURI(a));
//
const _decode = _hasBuffer
    ? (a) => Buffer.from(a, 'base64').toString('utf8')
    : _TD
        ? (a) => _TD.decode(_toUint8Array(a))
        : (a) => btou(_atob(a));
const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
const decode = (src) => _decode(_unURI(src));
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */
const isValid = (src) => {
    if (typeof src !== 'string')
        return false;
    const s = src.replace(/\s+/g, '').replace(/={0,2}$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
//
const _noEnum = (v) => {
    return {
        value: v, enumerable: false, writable: true, configurable: true
    };
};
/**
 * extend String.prototype with relevant methods
 */
const extendString = function () {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add('fromBase64', function () { return decode(this); });
    _add('toBase64', function (urlsafe) { return encode(this, urlsafe); });
    _add('toBase64URI', function () { return encode(this, true); });
    _add('toBase64URL', function () { return encode(this, true); });
    _add('toUint8Array', function () { return toUint8Array(this); });
};
/**
 * extend Uint8Array.prototype with relevant methods
 */
const extendUint8Array = function () {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });
    _add('toBase64URI', function () { return fromUint8Array(this, true); });
    _add('toBase64URL', function () { return fromUint8Array(this, true); });
};
/**
 * extend Builtin prototypes with relevant methods
 */
const extendBuiltins = () => {
    extendString();
    extendUint8Array();
};
const gBase64 = {
    version: version,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode: encode,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    utob: utob,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins,
};
// makecjs:CUT //




















// and finally,



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/**
[rewrite_local]
^https?:\/\/sjapi\.juqianpu\.com\/api url script-response-body http://192.168.31.14:8000/soonperson.js

https://sjapi.juqianpu.com/api/member/info
https://sjapi.juqianpu.com/api/video/video/video_play

[mitm]
hostname = sjapi.juqianpu.com
*/
// @ts-nocheck


const Utils = (function () {
    var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', l = {
        rotl: function (n, s) {
            return (n << s) | (n >>> (32 - s));
        },
        rotr: function (n, s) {
            return (n << (32 - s)) | (n >>> s);
        },
        endian: function (n) {
            if (n.constructor == Number)
                return (l.rotl(n, 8) & 16711935) | (l.rotl(n, 24) & 4278255360);
            for (var s = 0; s < n.length; s++)
                n[s] = l.endian(n[s]);
            return n;
        },
        randomBytes: function (n) {
            for (var s = []; n > 0; n--)
                s.push(Math.floor(Math.random() * 256));
            return s;
        },
        bytesToWords: function (n) {
            for (var s = [], c = 0, u = 0; c < n.length; c++, u += 8)
                s[u >>> 5] |= n[c] << (24 - (u % 32));
            return s;
        },
        wordsToBytes: function (n) {
            for (var s = [], c = 0; c < n.length * 32; c += 8)
                s.push((n[c >>> 5] >>> (24 - (c % 32))) & 255);
            return s;
        },
        bytesToHex: function (n) {
            for (var s = [], c = 0; c < n.length; c++)
                s.push((n[c] >>> 4).toString(16)), s.push((n[c] & 15).toString(16));
            return s.join('');
        },
        hexToBytes: function (n) {
            for (var s = [], c = 0; c < n.length; c += 2)
                s.push(parseInt(n.substr(c, 2), 16));
            return s;
        },
        bytesToBase64: function (n) {
            for (var s = [], c = 0; c < n.length; c += 3)
                for (var u = (n[c] << 16) | (n[c + 1] << 8) | n[c + 2], d = 0; d < 4; d++)
                    c * 8 + d * 6 <= n.length * 8 ? s.push(e.charAt((u >>> (6 * (3 - d))) & 63)) : s.push('=');
            return s.join('');
        },
        base64ToBytes: function (n) {
            n = n.replace(/[^A-Z0-9+\/]/gi, '');
            for (var s = [], c = 0, u = 0; c < n.length; u = ++c % 4)
                u != 0 &&
                    s.push(((e.indexOf(n.charAt(c - 1)) & (Math.pow(2, -2 * u + 8) - 1)) << (u * 2)) |
                        (e.indexOf(n.charAt(c)) >>> (6 - u * 2)));
            return s;
        }
    };
    return l;
})();
const H = {
    utf8: {
        stringToBytes: function (e) {
            return H.bin.stringToBytes(unescape(encodeURIComponent(e)));
        },
        bytesToString: function (e) {
            return decodeURIComponent(escape(A.bin.bytesToString(e)));
        }
    },
    bin: {
        stringToBytes: function (e) {
            for (var l = [], n = 0; n < e.length; n++)
                l.push(e.charCodeAt(n) & 255);
            return l;
        },
        bytesToString: function (e) {
            for (var l = [], n = 0; n < e.length; n++)
                l.push(String.fromCharCode(e[n]));
            return l.join('');
        }
    }
};
const Z = function (e) {
    return e != null && (J(e) || V(e) || !!e._isBuffer);
};
const C = (function () {
    var e = Utils, l = H.utf8, n = Z, s = H.bin, c = function (u, d) {
        u.constructor == String
            ? d && d.encoding === 'binary'
                ? (u = s.stringToBytes(u))
                : (u = l.stringToBytes(u))
            : n(u)
                ? (u = Array.prototype.slice.call(u, 0))
                : !Array.isArray(u) && u.constructor !== Uint8Array && (u = u.toString());
        for (var t = e.bytesToWords(u), v = u.length * 8, a = 1732584193, o = -271733879, i = -1732584194, r = 271733878, f = 0; f < t.length; f++)
            t[f] = (((t[f] << 8) | (t[f] >>> 24)) & 16711935) | (((t[f] << 24) | (t[f] >>> 8)) & 4278255360);
        (t[v >>> 5] |= 128 << v % 32), (t[(((v + 64) >>> 9) << 4) + 14] = v);
        for (var m = c._ff, _ = c._gg, w = c._hh, y = c._ii, f = 0; f < t.length; f += 16) {
            var I = a, g = o, h = i, E = r;
            (a = m(a, o, i, r, t[f + 0], 7, -680876936)),
                (r = m(r, a, o, i, t[f + 1], 12, -389564586)),
                (i = m(i, r, a, o, t[f + 2], 17, 606105819)),
                (o = m(o, i, r, a, t[f + 3], 22, -1044525330)),
                (a = m(a, o, i, r, t[f + 4], 7, -176418897)),
                (r = m(r, a, o, i, t[f + 5], 12, 1200080426)),
                (i = m(i, r, a, o, t[f + 6], 17, -1473231341)),
                (o = m(o, i, r, a, t[f + 7], 22, -45705983)),
                (a = m(a, o, i, r, t[f + 8], 7, 1770035416)),
                (r = m(r, a, o, i, t[f + 9], 12, -1958414417)),
                (i = m(i, r, a, o, t[f + 10], 17, -42063)),
                (o = m(o, i, r, a, t[f + 11], 22, -1990404162)),
                (a = m(a, o, i, r, t[f + 12], 7, 1804603682)),
                (r = m(r, a, o, i, t[f + 13], 12, -40341101)),
                (i = m(i, r, a, o, t[f + 14], 17, -1502002290)),
                (o = m(o, i, r, a, t[f + 15], 22, 1236535329)),
                (a = _(a, o, i, r, t[f + 1], 5, -165796510)),
                (r = _(r, a, o, i, t[f + 6], 9, -1069501632)),
                (i = _(i, r, a, o, t[f + 11], 14, 643717713)),
                (o = _(o, i, r, a, t[f + 0], 20, -373897302)),
                (a = _(a, o, i, r, t[f + 5], 5, -701558691)),
                (r = _(r, a, o, i, t[f + 10], 9, 38016083)),
                (i = _(i, r, a, o, t[f + 15], 14, -660478335)),
                (o = _(o, i, r, a, t[f + 4], 20, -405537848)),
                (a = _(a, o, i, r, t[f + 9], 5, 568446438)),
                (r = _(r, a, o, i, t[f + 14], 9, -1019803690)),
                (i = _(i, r, a, o, t[f + 3], 14, -187363961)),
                (o = _(o, i, r, a, t[f + 8], 20, 1163531501)),
                (a = _(a, o, i, r, t[f + 13], 5, -1444681467)),
                (r = _(r, a, o, i, t[f + 2], 9, -51403784)),
                (i = _(i, r, a, o, t[f + 7], 14, 1735328473)),
                (o = _(o, i, r, a, t[f + 12], 20, -1926607734)),
                (a = w(a, o, i, r, t[f + 5], 4, -378558)),
                (r = w(r, a, o, i, t[f + 8], 11, -2022574463)),
                (i = w(i, r, a, o, t[f + 11], 16, 1839030562)),
                (o = w(o, i, r, a, t[f + 14], 23, -35309556)),
                (a = w(a, o, i, r, t[f + 1], 4, -1530992060)),
                (r = w(r, a, o, i, t[f + 4], 11, 1272893353)),
                (i = w(i, r, a, o, t[f + 7], 16, -155497632)),
                (o = w(o, i, r, a, t[f + 10], 23, -1094730640)),
                (a = w(a, o, i, r, t[f + 13], 4, 681279174)),
                (r = w(r, a, o, i, t[f + 0], 11, -358537222)),
                (i = w(i, r, a, o, t[f + 3], 16, -722521979)),
                (o = w(o, i, r, a, t[f + 6], 23, 76029189)),
                (a = w(a, o, i, r, t[f + 9], 4, -640364487)),
                (r = w(r, a, o, i, t[f + 12], 11, -421815835)),
                (i = w(i, r, a, o, t[f + 15], 16, 530742520)),
                (o = w(o, i, r, a, t[f + 2], 23, -995338651)),
                (a = y(a, o, i, r, t[f + 0], 6, -198630844)),
                (r = y(r, a, o, i, t[f + 7], 10, 1126891415)),
                (i = y(i, r, a, o, t[f + 14], 15, -1416354905)),
                (o = y(o, i, r, a, t[f + 5], 21, -57434055)),
                (a = y(a, o, i, r, t[f + 12], 6, 1700485571)),
                (r = y(r, a, o, i, t[f + 3], 10, -1894986606)),
                (i = y(i, r, a, o, t[f + 10], 15, -1051523)),
                (o = y(o, i, r, a, t[f + 1], 21, -2054922799)),
                (a = y(a, o, i, r, t[f + 8], 6, 1873313359)),
                (r = y(r, a, o, i, t[f + 15], 10, -30611744)),
                (i = y(i, r, a, o, t[f + 6], 15, -1560198380)),
                (o = y(o, i, r, a, t[f + 13], 21, 1309151649)),
                (a = y(a, o, i, r, t[f + 4], 6, -145523070)),
                (r = y(r, a, o, i, t[f + 11], 10, -1120210379)),
                (i = y(i, r, a, o, t[f + 2], 15, 718787259)),
                (o = y(o, i, r, a, t[f + 9], 21, -343485551)),
                (a = (a + I) >>> 0),
                (o = (o + g) >>> 0),
                (i = (i + h) >>> 0),
                (r = (r + E) >>> 0);
        }
        return e.endian([a, o, i, r]);
    };
    c._ff = function (u, d, t, v, a, o, i) {
        var r = u + ((d & t) | (~d & v)) + (a >>> 0) + i;
        return ((r << o) | (r >>> (32 - o))) + d;
    };
    c._gg = function (u, d, t, v, a, o, i) {
        var r = u + ((d & v) | (t & ~v)) + (a >>> 0) + i;
        return ((r << o) | (r >>> (32 - o))) + d;
    };
    c._hh = function (u, d, t, v, a, o, i) {
        var r = u + (d ^ t ^ v) + (a >>> 0) + i;
        return ((r << o) | (r >>> (32 - o))) + d;
    };
    c._ii = function (u, d, t, v, a, o, i) {
        var r = u + (t ^ (d | ~v)) + (a >>> 0) + i;
        return ((r << o) | (r >>> (32 - o))) + d;
    };
    c._blocksize = 16;
    c._digestsize = 16;
    return c;
})();
function R(u, d) {
    if (u == null)
        throw new Error('Illegal argument ' + u);
    var t = Utils.wordsToBytes(C(u, d));
    return d && d.asBytes ? t : d && d.asString ? s.bytesToString(t) : Utils.bytesToHex(t);
}
const key = 'KsGK2N8XpW';
function decode(e, l = key) {
    const n = R(l), s = js_base64__WEBPACK_IMPORTED_MODULE_1__.Base64.decode(e);
    let c = '';
    if (n.length < s.length) {
        const d = Math.ceil(s.length / n.length);
        c = n.repeat(d);
    }
    let u = '';
    for (let d = 0; d < s.length; d++) {
        const t = c.charCodeAt(d) ^ s.charCodeAt(d);
        u += String.fromCharCode(t);
    }
    return js_base64__WEBPACK_IMPORTED_MODULE_1__.Base64.decode(u);
}
function encode(s, l = key) {
    const n = R(l);
    s = js_base64__WEBPACK_IMPORTED_MODULE_1__.Base64.encode(s);
    let c = n;
    if (n.length < s.length) {
        const d = Math.ceil(s.length / n.length);
        c = n.repeat(d);
    }
    let u = '';
    for (let d = 0; d < s.length; d++) {
        const _c = c.charCodeAt(d);
        const _d = s.charCodeAt(d);
        const t = _c ^ _d;
        u += String.fromCharCode(t);
    }
    return js_base64__WEBPACK_IMPORTED_MODULE_1__.Base64.encode(u);
}
class S extends _common_base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super('soonperson', 'soonperson');
    }
    start() {
        const url = $request.url;
        let body = $response.body;
        if (!body)
            return this.done();
        if (url.includes('member/info')) {
            const result = JSON.parse(decode(body));
            result.data.item.nick = 'Boys';
            result.data.item.vip = 9;
            result.data.item.vip_expire = 10000000000;
            result.data.item.coin = 1000000;
            result.data.item.is_guest = 0;
            result.data.item.qp_coin = '1000.0';
            result.data.item.qp_money = '1000.00';
            body = encode(JSON.stringify(result));
        }
        else if (url.includes('video/video_info')) {
            const result = JSON.parse(decode(body));
            result.data.video_info.vip = -1;
            result.data.video_info.price = 0;
            result.data.video_info.play_uri = result.data.video_info.play_uri.replace('-preview', '');
            body = encode(JSON.stringify(result));
        }
        this.done({ body });
    }
}
new S().start();

})();

/******/ })()
;
