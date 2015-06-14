*
* Help is in the end of this script
*
function drawpoly( args )

  _version='0.01r1'

  if( args = '' )
    help()
    return
  endif

  x_ini = subwrd( args, 1 )
  y_ini = subwrd( args, 2 )

  x_prev = x_ini
  y_prev = y_ini
  pos = 3
  while( 1 = 1 )
    x = subwrd( args, pos   )
    y = subwrd( args, pos+1 )
    if( valnum(x) = 0 | valnum(y) = 0 ) ; break ; endif
    'draw line 'x_prev' 'y_prev' 'x' 'y
    x_prev = x
    y_prev = y    
    pos = pos + 2
  endwhile
  'draw line 'x_prev' 'y_prev' 'x_ini' 'y_ini

return

*
* help
*
function help()
  say ' Name:'
  say '   drawpoly '_version' - draw polygon'
  say ' '
  say ' Usage:'
  say '   drawpoly x1 y1 x2 y2 ...'
  say ' '
  say '     x1, y1, ... : positions'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2013 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
