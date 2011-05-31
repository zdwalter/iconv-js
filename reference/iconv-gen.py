# coding=utf-8

import sys
code = open('iconv-template.js', 'rb').read()

fromcp949_map = u'\ufffd' # for replacement character
pivot = ord(u'힣'.encode('cp949')[0]) + 1
for i in xrange(0x81, pivot):
    for j in range(65, 65+26) + range(97, 97+26) + range(0x81,0xff):
        fromcp949_map += ('%c%c' % (i,j)).decode('cp949', 'replace')
for i in xrange(pivot, 0xff):
    for j in xrange(0xa1, 0xff):
        fromcp949_map += ('%c%c' % (i,j)).decode('cp949', 'replace')
#print pivot
code = code.replace('__FROMCP949_MAP_REPLACEMENT__', str(ord(fromcp949_map[0])))
code = code.replace('__FROMCP949_MAP__', "'" + fromcp949_map.encode('utf-8') + "'")

tocp949_map = []
shift = 7
for i in xrange(0, 0x10000, 1<<shift):
    row = []
    for j in xrange(i, i + (1<<shift)):
        ch = unichr(j).encode('cp949', 'ignore') or '?'
        if len(ch) == 1: row.append(ord(ch))
        else: row.append(ord(ch[0]) | ((ord(ch[1])&0x7f)<<8))
    if row == [63] * (1<<shift): row = None
    tocp949_map.append(row)
def toprintable(ch):
    if ch == 92 or ch == 39: return '\\%c' % ch
    if ch < 0x20 or ch == 0x7f: return '\\x%02x' % ch
    return unichr(ch).encode('utf-8')
code = code.replace('__TOCP949_MAP_SHIFT__', str(shift))
code = code.replace('__TOCP949_MAP_MASK__', str((1<<shift) - 1))
code = code.replace('__TOCP949_MAP_DEFAULT__', "'" + '?' * (1<<shift) + "'")
code = code.replace('__TOCP949_MAP__',
        '[' + ','.join('\'' + ''.join(map(toprintable, row)) + '\'' if row else '0'
                       for row in tocp949_map) + ']')

sys.stdout.write(code)

