*
* Help is in the end of this script
*
function drawpoly( args )
  _version = '0.01r1'
  rc = gsfallow( 'on' )
  if( args = '' )
    help()
    return
  endif

  pos = 1

* For drawline.gs
  closed = 1
  arg = subwrd( args, pos )
  if( arg = 'opened' )
    closed = 0
    pos = pos + 1
  endif

  by = 'xy'
  arg = subwrd( args, pos )
  if( arg = '-by' )
    by = subwrd( args, pos+1 )
    pos = pos + 2
  endif

  x_ini = subwrd( args, pos )
  y_ini = subwrd( args, pos+1 )
  if( by = 'world' ) ; xy_ini = qw2xy(  x_ini, y_ini ) ; endif
  if( by = 'grid'  ) ; xy_ini = qgr2xy( x_ini, y_ini ) ; endif
  if( by = 'xy'    ) ; xy_ini = x_ini % ' ' % y_ini ; endif
  pos = pos + 2

*  x_prev = x_ini
*  y_prev = y_ini
  xy_prev = xy_ini
  while( 1 = 1 )
    x = subwrd( args, pos   )
    y = subwrd( args, pos+1 )
    if( valnum(x) = 0 | valnum(y) = 0 ) ; break ; endif
    if( by = 'world' ) ; xy = qw2xy(  x, y ) ; endif
    if( by = 'grid'  ) ; xy = qgr2xy( x, y ) ; endif
    if( by = 'xy'    ) ; xy = x % ' ' % y ; endif
*    'draw line 'x_prev' 'y_prev' 'x' 'y
    'draw line 'xy_prev' 'xy
*    x_prev = x
*    y_prev = y    
    xy_prev = xy
    pos = pos + 2
  endwhile
*  'draw line 'x_prev' 'y_prev' 'x_ini' 'y_ini
  if( closed = 1 )
    'draw line 'xy_prev' 'xy_ini
  endif

return

*
* help
*
function help()
  say ' Name:'
  say '   drawpoly '_version' - draw polygon'
  say ' '
  say ' Usage:'
  say '   drawpoly [ open ]  [ -by ( world | grid | xy ) ] x1 y1 x2 y2 ...'
  say ' '
  say ''
  say '     open : open polygon (for drawline.gs)'
  say ''
  say '     -by : unit of p1, q1, p2, q2'
  say '         world : world coordinate (e.g. lat)'
  say '         grid  : grid coordinate (grid number)'
  say '         xy    : same as "draw line"'
  say ''
  say '     x1, y1, ... : positions'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2013-2016 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
