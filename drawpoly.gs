*
* Help is in the end of this script
*
function drawpoly( args )
  _version = '0.02r1'
  rc = gsfallow( 'on' )
  if( args = '' )
    help()
    return
  endif

*  pos = 1

***** Default value
* closed: for drawline.gs
  closed = 1
  by     = 'xy'
  fill = 0
  r = -1
  g = -1
  b = -1
  a = -1

***** Arguement *****
  i = 1
  p = 0
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-o' | arg = 'opened' ) ; closed = 0   ; break ; endif
      if( arg = '-f' )     ; fill   = 1                ; break ; endif
      if( arg = '-by'    ) ; by=subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-rgb' ) 
        r = subwrd(args,i)
        g = subwrd(args,i+1)
        b = subwrd(args,i+2)
        i=i+3 ; break
      endif
      if( arg = '-rgba' ) 
        r = subwrd(args,i)
        g = subwrd(args,i+1)
        b = subwrd(args,i+2)
        a = subwrd(args,i+3)
        i=i+4 ; break
      endif

      if( valnum(arg) != 0 )
        x.p = arg
        y.p = subwrd(args,i)
        i = i + 1
        p = p + 1
        break
      endif

      say 'syntax error: 'arg
      return

    endwhile
  endwhile
  pmax = p - 1

  if( r != -1 & g != -1 & g != -1 )
    if( a != -1 ) ; 'set rgb 99 'r' 'g' 'b' 'a
    else ; 'set rgb 99 'r' 'g' 'b
    endif

    'set line 99'
  endif

  p = 0
  pmm = -1
  str_fill = ''
  while( p <= pmax )
    if( by = 'world' ) ; xy.p = qw2xy(  x.p, y.p ) ; endif
    if( by = 'grid'  ) ; xy.p = qgr2xy( x.p, y.p ) ; endif
    if( by = 'xy'    ) ; xy.p = x.p % ' ' % y.p ; endif

    if( pmm >= 0 & fill = 0 )
      'draw line 'xy.pmm' 'xy.p
    endif
    if( fill = 1 )
      str_fill = str_fill % xy.p % ' '
    endif

    p = p + 1
    pmm = pmm + 1
  endwhile

  if( fill = 0 & closed = 1 )
    'draw line 'xy.pmax' 'xy.0
  endif
  if( fill = 1 )
    'draw polyf 'str_fill
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
  say '   drawpoly [ -o | open ]'
  say '            [ -f ]'
  say '            [ -rgb  r g b ]'
  say '            [ -rgba r g b a ]'
  say '            [ -by ( world | grid | xy ) ] x1 y1 x2 y2 ...'
  say ' '
  say ''
  say '     -o | open : open polygon (for drawline.gs)'
  say ''
  say '     -f   : filled
  say ''
  say '     -rgb | -rgba : rgb or rgba values in [0-255]
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
  say ' Copyright (C) 2013-2019 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
