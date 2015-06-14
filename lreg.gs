function lreg( args )
  _version = '0.01b1'
  rc = gsfallow("on")

 if( args = '' )
    help()
    return
  endif

***** Arguement *****
  'vx = 'subwrd( args, 1 )
  'vy = 'subwrd( args, 2 )

* optional
  slope_in = subwrd( args, 3 )
  icept_in = subwrd( args, 4 )
  cor_in   = subwrd( args, 5 )

  xmin = qdims( xmin ) ; xmax = qdims( xmax )
  ymin = qdims( ymin ) ; ymax = qdims( ymax )
  zmin = qdims( zmin ) ; zmax = qdims( zmax )
  tmin = qdims( tmin ) ; tmax = qdims( tmax )
  emin = qdims( emin ) ; emax = qdims( emax )

  str_head = ''
  str_tail = ''

  if( xmin != xmax )
    str_head = 'ave(' % str_head
    str_tail = str_tail % ',x='xmin',x='xmax')'
  endif
  if( ymin != ymax )
    str_head = 'ave(' % str_head
    str_tail = str_tail % ',y='ymin',y='ymax')'
  endif
  if( zmin != zmax )
    str_head = 'ave(' % str_head
    str_tail = str_tail % ',z='zmin',z='zmax')'
  endif
  if( tmin != tmax )
    str_head = 'ave(' % str_head
    str_tail = str_tail % ',t='tmin',t='tmax')'
  endif
  if( emin != emax )
    str_head = 'ave(' % str_head
    str_tail = str_tail % ',e='emin',e='emax')'
  endif

  'set x 1'
  'set y 1'
  'set z 1'
  'set t 1'
  'set e 1'

* avx, avy: ave(vx), ave(vy)
  'tmp = ' % str_head % 'vx' % str_tail
  'd tmp'
  avx = subwrd( result, 4 )
  say 'avx = ' % str_head % 'vx' % str_tail % ' = ' % avx

  'tmp = ' % str_head % 'vy' % str_tail
  'd tmp'
  avy = subwrd( result, 4 )
  say 'avy = ' % str_head % 'vy' % str_tail % ' = ' % avy

* avxy: ave(vx*vy)
  'tmp = ' % str_head % 'vx*vy' % str_tail
  'd tmp'
  avxy = subwrd( result, 4 )
  say 'avxy = ' % str_head % 'vx*vy' % str_tail % ' = ' % avxy

* avxx: ave(vx*vx)
  'tmp = ' % str_head % 'vx*vx' % str_tail
  'd tmp'
  avxx = subwrd( result, 4 )
  say 'avxx = ' % str_head % 'vx*vx' % str_tail % ' = ' % avxx

* sgx, sgy: sigma(vx), sigma(vy)
  'tmp = sqrt(' % str_head % '(vx-'avx')*(vx-'avx')' % str_tail % ')'
  'd tmp'
  sgx = subwrd( result, 4 )
  say 'sgx = sqrt(' % str_head % '(vx-avx)*(vx-avx)' % str_tail % ' = ' % sgx

  'tmp = sqrt(' % str_head % '(vy-'avy')*(vy-'avy')' % str_tail % ')'
  'd tmp'
  sgy = subwrd( result, 4 )
  say 'sgy = sqrt(' % str_head % '(vy-avy)*(vy-avy)' % str_tail % ' = ' % sgy


* linear regression coefficient
  slope = ( avxy - avx * avy ) / ( avxx - avx * avx )
  icept = avy - slope * avx
  say 'y = ' % slope % ' x + ' % icept

* correlation coefficient
  'tmp = ' % str_head % '(vx-'avx')*(vy-'avy')' % str_tail % ' / ('sgx'*'sgy')'
  'd tmp'
  cor = subwrd( result, 4 )
  say 'correlation: ' % cor

  if( slope_in != '' )
    slope_in' = 'slope
  endif
  if( icept_in != '' )
    icept_in' = 'icept
  endif
  if( cor_in != '' )
    cor_in' = 'cor
  endif

  ret = slope % ' ' % icept % ' ' % cor

  'set x 'xmin' 'xmax
  'set y 'ymin' 'ymax
  'set z 'zmin' 'zmax
  'set t 'tmin' 'tmax
  'set e 'emin' 'emax
return ret



*
* help
*
function help()
  say ' Name:'
  say '   lreg '_version' - linear regression and correlation for any varying dimensions'
  say ' '
  say ' Usage:'
  say '   lreg vx vy [slope [icept [cor]]]'
  say ''
  say '     vx,vy            : input field variables'
  say '     slope            : output field variable name for slope parameter'
  say '     icept            : output field variable name for intercept parameter'
  say '     cor              : output field variable name for correlation coefficient'
  say ' Output as "result"'
  say '1. slope parameter in linear regression'
  say '2. intercept parameter in linear regression'
  say '3. correlation coefficient'
  say ''
  say ' Note:'
  say '   This script is under construction and its syntax will perhaps be changed in near future.'
  say '   lon/lat is weighted...'
  say ''
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2012-2012 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
