*
* Help is in the end of this script
*
function clave( args )
  _version='0.01r2'

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  x1 = -1
  y1 = -1
  x2 = -1
  y2 = -1
  angle = 30
  head = '20%'

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while(1)
*** option
      if( arg = '-angle'); angle=subwrd(args,i); i=i+1; break; endif
      if( arg = '-head');  head=subwrd(args,i);  i=i+1; break; endif

*** x1, y1, x2, y2
      if( x1 = -1 ); x1 = arg; break; endif
      if( y1 = -1 ); y1 = arg; break; endif
      if( x2 = -1 ); x2 = arg; break; endif
      if( y2 = -1 ); y2 = arg; break; endif

      say 'syntax error : 'arg
      return

    endwhile
  endwhile

  if( substr( head, math_strlen(head), 1 ) = '%' )
    head = substr( head, 1, math_strlen(head)-1 )
    head = math_sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) ) * head / 100.0
  endif

***** Draw *****
  pi = 3.14159
  alpha = math_atan2( y2-y1, x2-x1 )

  'draw line 'x1' 'y1' 'x2' 'y2

  x = x2 + head * math_cos( (180+angle)*pi/180 + alpha )
  y = y2 + head * math_sin( (180+angle)*pi/180 + alpha )
  'draw line 'x2' 'y2' 'x' 'y

  x = x2 + head * math_cos( (180-angle)*pi/180 + alpha )
  y = y2 + head * math_sin( (180-angle)*pi/180 + alpha )
  'draw line 'x2' 'y2' 'x' 'y

return


*
* help
*
function help()
  say ' Name:'
  say '   arrow '_version' - draw arrow '
  say ' '
  say ' Usage:'
  say '   arrow x1 y1 x2 y2 [-angle angle] [-head head[%]]'
  say ''
  say '     x1 y1    : start point'
  say '     x2 y2    ; end point'
  say '     angle    : arrow head angle. default=30.'
  say '     head[%]  : arrow head length. default=20%'
  say '                If you specify %, '
  say '                then the length will be set relative to the arrow length.'
  say ''
  say ' Note:'
  say '     [arg-name]       : specify if needed'
  say '     (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
