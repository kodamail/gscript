*
* Help is in the end of this script
*
function drawmark( args )
  _version='0.03r1'
  rc = gsfallow( 'on' )
  if( args = '' )
    help()
    return
  endif

***** Default value
  name    = 'none'
  xpos    = 'none'
  ypos    = 'none'
  size    = 'none'
  angle   = 0
  by      = 'xy'
  fill    = 0
  r       = -1
  g       = -1
  b       = -1
  a       = -1
  setline = ''

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-angle' ) ; angle=subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-by'    ) ; by=subwrd(args,i)    ; i=i+1 ; break ; endif
      if( arg = '-f' )     ; fill   = 1                ; break ; endif
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
      if( arg = '-setline' ) 
        setline = subwrd(args,i) ; i=i+1
        tmp = subwrd(args,i)
        if( valnum(tmp) != 0 ) ; setline = setline % ' ' % tmp ; i=i+1 ; endif
        tmp = subwrd(args,i)
        if( valnum(tmp) != 0 ) ; setline = setline % ' ' % tmp ; i=i+1 ; endif
        break
      endif
      if( arg = '-a' ) ; a=subwrd(args,i) ; i=i+1 ; break ; endif

*** name, xpos, ypos, size
      if( name = 'none' )
        name = arg
        break
      endif
      if( valnum(arg) != 0 & xpos = 'none' )
        xpos = arg
        break
      endif
      if( valnum(arg) != 0 & ypos = 'none' )
        ypos = arg
        break
      endif
      if( valnum(arg) != 0 & size = 'none' )
        size = arg
        break
      endif

      say 'syntax error: 'arg
      return
    endwhile
  endwhile

  if( size = 'none' ) ; size = 1 ; endif

  if( by = 'world' ) ; xypos = qw2xy(  xpos, ypos ) ; endif
  if( by = 'grid'  ) ; xypos = qgr2xy( xpos, ypos ) ; endif
  if( by = 'xy'    ) ; xypos = xpos % ' ' % ypos ; endif
  xpos = subwrd( xypos, 1 )
  ypos = subwrd( xypos, 2 )

* virtual coordinate: [-0.5,-0,5]-[0.5:0.5]
  if( name = 'triangle' )
    tmpred = math_sqrt(3.0)/3.0*2
    x.1 = -0.5/tmpred ; y.1 = -math_sqrt(3.0)/6.0/tmpred
    x.2 =  0.5/tmpred ; y.2 = -math_sqrt(3.0)/6.0/tmpred
    x.3 =  0.0/tmpred ; y.3 = math_sqrt(3.0)/3.0/tmpred
    pmax = 3
    cmd = 'drawpoly'
  endif
  if( name = 'rectangle' )
    x.1 = -0.4 ; y.1 = -0.4
    x.2 =  0.4 ; y.2 = -0.4
    x.3 =  0.4 ; y.3 =  0.4
    x.4 = -0.4 ; y.4 =  0.4
    pmax = 4
    cmd = 'drawpoly'
  endif
  if( name = 'plus' )
    x.1 = -0.4 ; y.1 =  0.0
    x.2 =  0.4 ; y.2 =  0.0
    x.3 =  111 ; y.3 =  111
    x.4 =  0.0 ; y.4 = -0.4
    x.5 =  0.0 ; y.5 =  0.4
    pmax = 5
    cmd = 'drawline'
  endif
  if( name = 'circle' )
    dint = 15
    if( size > 1 )
      dint = dint / size
    endif
    d = 0 ; i = 1
    while( d < 360 )
      x.i = 0.4 * math_sin(d*3.14159/180)
      y.i = 0.4 * math_cos(d*3.14159/180)
      i = i + 1 ; d = d + dint
    endwhile
    pmax = i - 1
    cmd = 'drawpoly'
  endif

* rotate
  if( angle != 0 )
    d2r = 4.0 * math_atan(1.0) / 180.0
    i = 1
    while( i <= pmax )
      if( x.i < 100 & y.i < 100 )
        xtmp = x.i * math_cos(angle*d2r) - y.i * math_sin(angle*d2r)
        ytmp = x.i * math_sin(angle*d2r) + y.i * math_cos(angle*d2r)
        x.i = xtmp
        y.i = ytmp
      endif
      i = i + 1
    endwhile
  endif

* size
  if( size != 0 )
    i = 1
    while( i <= pmax )
      if( x.i < 100 & y.i < 100 )
        x.i = x.i * size
        y.i = y.i * size
      endif
      i = i + 1
    endwhile
  endif


* draw
  strtail = ''
  if( fill = 1 ) ; strtail = strtail % ' -f' ; endif
  strtail = strtail % ' -rgba 'r' 'g' 'b' 'a
  if( setline != '' ) ; strtail = strtail % ' -setline ' % setline ; endif

  str = ''
  i = 1
  while( i <= pmax )
*  while( x.i != 999 & y.i != 999 )

    if( x.i = 111 & y.i = 111 )
      'drawline 'str' 'strtail
      str = ''
    else
      str = str % x.i+xpos % ' ' % y.i+ypos % ' '
    endif
    i = i + 1
  endwhile

  cmd' 'str' 'strtail

return

*
* help
*
function help()
  say ' Name:'
  say '   drawmark '_version' - draw mark'
  say ' '
  say ' Usage:'
  say '   drawmark mark-name p q [size] [-angle angle]'
  say '            [ -f ]'
  say '            [ ( -rgb  r g b | -rgba r g b a ) ]'
  say '            [ -setline setline-options ]'
  say '            [ -by ( world | grid | xy ) ]'
  say ''
  say '     mark-name : rectangle, triangle, plus, or circle'
  say ''
  say '     p, q : positions'
  say ''
  say '     -f : filled mark'
  say ''
  say '     -rgb | -rgba : rgb or rgba values in [0-255]'
  say ''
  say '     -setline : options same as "set line"'
  say ''
  say '     -by : unit of (p, q)'
  say '         world : world coordinate (e.g. lat)'
  say '         grid  : grid coordinate (grid number)'
  say '         xy    : display coordinate (e.g. 11x8.5)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2016-2020 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
