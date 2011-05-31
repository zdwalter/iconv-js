/* Javascript Iconv routine for EUC-KR and CP949 encodings.
 * Copyright (c) 2008, 2010, Kang Seonghoon.
 * Licensed under MIT license, as written in http://opensource.org/licenses/mit-license.php
 */
var iconv = function(TOCP949_MAP) {
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
	}
    };
}(__TOCP949_MAP__);

