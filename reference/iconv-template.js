/* Javascript Iconv routine for EUC-KR and CP949 encodings.
 * Copyright (c) 2008, 2010, Kang Seonghoon.
 * Licensed under MIT license, as written in http://opensource.org/licenses/mit-license.php
 */
var Iconv=function(a,b){return{toCP949:function(x){for(var y=[],i=0,l=x.length,c,d;i<l;++i){c=x.charCodeAt(i);d=(a[c>>__TOCP949_MAP_SHIFT__]||__TOCP949_MAP_DEFAULT__).charCodeAt(c&__TOCP949_MAP_MASK__);y.push(d&255);if(d>255)y.push(128|d>>8)}return y},fromCP949:function(y){for(var x=[],i=0,l=y.length,c,d;i<l;++i){c=y[i];if(c<128)x.push(c);else if(++i<l){d=y[i]||0;x.push(b.charCodeAt(c<199?(d<65?0:d<91?178*c+d-23026:d<97?0:d<123?178*c+d-23032:d<129?0:d<255?178*c+d-23038:0):(d>=161&&d<255?94*c+d-6406:0)))}else x.push(__FROMCP949_MAP_REPLACEMENT__)}return String.fromCharCode.apply(null,x)}}}(__TOCP949_MAP__,__FROMCP949_MAP__)
