*
* Help is in the end of this script
*
function drawmark( args )
  _version='0.02r2'
  rc = gsfallow( 'on' )
  if( args = '' )
    help()
    return
  endif

***** Default value
  name  = 'none'
  xpos  = 'none'
  ypos  = 'none'
  size  = 'none'
  angle = 0
  by = 'xy'
  fill = 0
  r = -1
  g = -1
  b = -1
  a = -1


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
    x.4 =  999 ; y.4 = 999
  endif
  if( name = 'rectangle' )
    x.1 = -0.4 ; y.1 = -0.4
    x.2 =  0.4 ; y.2 = -0.4
    x.3 =  0.4 ; y.3 =  0.4
    x.4 = -0.4 ; y.4 =  0.4
    x.5 =  999 ; y.5 = 999
  endif

* size
  if( size != 0 )
    i = 1
    while( x.i != 999 & y.i != 999 )
      x.i = x.i * size
      y.i = y.i * size
      i = i + 1
    endwhile
  endif

* rotate
  if( angle != 0 )
    d2r = 4.0 * math_atan(1.0) / 180.0
    i = 1
    while( x.i != 999 & y.i != 999 )
      xtmp = x.i * math_cos(angle*d2r) - y.i * math_sin(angle*d2r)
      ytmp = x.i * math_sin(angle*d2r) + y.i * math_cos(angle*d2r)
      x.i = xtmp
      y.i = ytmp
      i = i + 1
    endwhile
  endif

* draw
  str = ''
  i = 1
  while( x.i != 999 & y.i != 999 )
    str = str % x.i+xpos % ' ' % y.i+ypos % ' '
    i = i + 1
  endwhile
  if( fill = 1 ) ; str = str % ' -f' ; endif
  str = str % ' -rgba 'r' 'g' 'b' 'a

  if( setline != '' ) ; str = str % ' -setline ' % setline ; endif

  'drawpoly 'str

return

*
* help
*
function help()
  say ' Name:'
  say '   drawmark '_version' - draw mark'
  say ' '
  say ' Usage:'
  say '   drawmark mark-name x y [size] [-angle angle]'
  say '            [ -rgb  r g b ]'
  say '            [ -rgba r g b a ]'
  say '            [ -setline setline-options ]'
  say '            [ -by ( world | grid | xy ) ] x y'
  say ''
  say '     x, y : positions'
  say ''
  say '     -rgb | -rgba : rgb or rgba values in [0-255]'
  say ''
  say '     -setline : options same as "set line"'
  say ''
  say '     -by : unit of p1, q1, p2, q2'
  say '         world : world coordinate (e.g. lat)'
  say '         grid  : grid coordinate (grid number)'
  say '         xy    : same as "draw line"'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2016-2019 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
