/* Javascript Iconv routine for EUC-KR and CP949 encodings.
 * Copyright (c) 2008, 2010, Kang Seonghoon.
 * Licensed under MIT license, as written in http://opensource.org/licenses/mit-license.php
 */
var Iconv = function(TOCP949_MAP, FROMCP949_MAP) {
	return {
	toCP949: function(str) {
		var arr = [], len = str.length;
		for (var i = 0; i < len; ++i) {
			var ch = str.charCodeAt(i);
			var code = (TOCP949_MAP[ch >> __TOCP949_MAP_SHIFT__] || __TOCP949_MAP_DEFAULT__).charCodeAt(ch & __TOCP949_MAP_MASK__);
			arr.push(code & 255);
			if (code > 255) arr.push(0x80 | (code >> 8));
		}
		return arr;
	},
	fromCP949: function(arr) {
		var text = [], len = arr.length;
		for (var i = 0; i < len; ++i) {
			var ch = arr[i];
			if (ch < 128) {
				text.push(ch);
			} else if (++i < len) {
				var ch2 = arr[i] || 0;
				var ord;
				if (ch < 199) {
					ord = (ch2 < 65 ? 0 : ch2 < 91 ? 178 * ch + ch2 - 23026 :
						ch2 < 97 ? 0 : ch2 < 123 ? 178 * ch + ch2 - 23032 :
						ch2 < 129 ? 0 : ch2 < 255 ? 178 * ch + ch2 - 23038 : 0);
				} else {
					ord = (ch2 >= 161 && ch2 < 255 ? 94 * ch + ch2 - 6406 : 0);
				}
				text.push(FROMCP949_MAP.charCodeAt(ord));
			} else {
				text.push(__FROMCP949_MAP_REPLACEMENT__);
			}
		}
		return String.fromCharCode.apply(null, text);
	}
	};
}(__TOCP949_MAP__, __FROMCP949_MAP__);

