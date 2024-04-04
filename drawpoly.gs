*
* Help is in the end of this script
*
function drawpoly( args )
  _version = '0.03r1'
  rc = gsfallow( 'on' )
  if( args = '' )
    help()
    return
  endif

*  pos = 1

***** Default value
* closed: for drawline.gs
  closed  = 1
  by      = 'xy'
  fill    = 0
  r       = -1
  g       = -1
  b       = -1
  a       = -1
  color   = -1
  setline = ''

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
      if( arg = '-color' ) 
        color = subwrd(args,i)
        i=i+1 ; break
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

* color table from http://cola.gmu.edu/grads/gadoc/colorcontrol.html
  r.0  =   0 ; g.0  =   0 ; b.0  =   0
  r.1  = 255 ; g.1  = 255 ; b.1  = 255
  r.2  = 250 ; g.2  =  60 ; b.2  =  60
  r.3  =   0 ; g.3  = 220 ; b.3  =   0
  r.4  =  30 ; g.4  =  60 ; b.4  = 255  
  r.5  =   0 ; g.5  = 200 ; b.5  = 200
  r.6  = 240 ; g.6  =   0 ; b.6  = 130
  r.7  = 230 ; g.7  = 220 ; b.7  =  50
  r.8  = 240 ; g.8  = 130 ; b.8  =  40
  r.9  = 160 ; g.9  =   0 ; b.9  = 200
  r.10 = 160 ; g.10 = 230 ; b.10 =  50
  r.11 =   0 ; g.11 = 160 ; b.11 = 255
  r.12 = 230 ; g.12 = 175 ; b.12 =  45
  r.13 =   0 ; g.13 = 210 ; b.13 = 140
  r.14 = 130 ; g.14 =   0 ; b.14 = 220
  r.15 = 170 ; g.15 = 170 ; b.15 = 170

  if( setline != '' )
    'set line 'setline
    if( a != -1 )
      c = subwrd( setline, 1 )
      'set rgb 99 'r.c' 'g.c' 'b.c' 'a
      'set line 99'
    endif
  endif

  if( color >= 0 )
    r = r.color
    g = g.color
    b = b.color
  endif
  
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
  say '   drawline '_version' - draw line'
  say ' '
  say ' Usage:'
  say '   drawpoly [ -o | opened ]'
  say '            [ -f ]'
  say '            [ -rgb  r g b ]'
  say '            [ -rgba r g b a ]'
  say '            [ -color color ]'
  say '            [ -setline setline-options ]'
  say '            [ -by ( world | grid | xy ) ] x1 y1 x2 y2 ...'
  say ' '
  say ''
  say '     -o | opened : open polygon (for drawline.gs)'
  say ''
  say '     -f   : filled'
  say ''
  say '     -rgb | -rgba : rgb or rgba values in [0-255]'
  say ''
  say '     -color : color number [0-15]'
  say ''
  say '     -setline : options same as "set line"'
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
  say ' Copyright (C) 2013-2024 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
