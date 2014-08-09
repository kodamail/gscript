*
* Help is in the end of this script
*
function dshade( args )
 _version = '0.01b2'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

  sw = subwrd( args, 1 )

****************************************
* set color levels
****************************************
  if( sw = 'set' )

***** arguements *****
*   default
    alpha = '0 255'

*   user-specified arguemtnts
    sw2 = subwrd( args, 2 )
    colorarg = '-ret'
    i = 3
    while( i <= 1000 )
      word = subwrd( args, i )
      if( word = '' ) ; break ; endif
      if( word = '-alpha' )
        i = i + 1
        alpha = subwrd( args, i )
        i = i + 1
        alpha = alpha % ' ' % subwrd( args, i )
      else
        colorarg = colorarg % ' ' % word
      endif
      i = i + 1
    endwhile

*   check arguements
    if( sw2 != 'back' & sw2 != 'over' )
      say 'error: second arguement must be "back" or "over" when the first arguement is "set".'
      exit
    endif

*   get and save color information
    colorret = color( colorarg )

    if( sw2 = 'back' )
      setstr( colback, colorret )
    else
      setstr( colover, colorret )
      setstr( alphaover, alpha )
    endif

    return
  endif

****************************************
* draw double-shaded figure
****************************************
  if( sw = 'draw' )
***** arguements *****
*   default

*   user-specified arguemtnts
    vback = subwrd( args, 2 )
    'tmpvback = 'vback
    vover = subwrd( args, 3 )
    'tmpvover = 'vover

    colback   = getstr( colback )
    colover   = getstr( colover )
    alphaover = getstr( alphaover )

    key.1 = colback
    key.2 = colover
    f = 1
    while( f <= 2 )
      n = 1
      while( n <= 1000 )
        lev.f.n = sep( key.f, 'clevs', n )
        r.f.n = sep( key.f, 'rgb', 4*n-2 )
        g.f.n = sep( key.f, 'rgb', 4*n-1 )
        b.f.n = sep( key.f, 'rgb', 4*n-0 )
        say f % ',' % n % ' : ' % lev.f.n % ' ' % r.f.n % ' ' % g.f.n % ' ' % b.f.n
        if( lev.f.n = '' ) ; break ; endif
        n = n + 1
      endwhile

*      say f % ',' % n % ' : ' % 'NON  ' % r.f.n % ' ' % g.f.n % ' ' % b.f.n
      cnum.f = n
*      say n
      f = f + 1
    endwhile

    a.2.1 = subwrd( alphaover, 1 )
    n = cnum.2
    a.2.n = subwrd( alphaover, 2 )
    c = 2
    while( c <= n - 1 )
      a.2.c = a.2.1 + ( a.2.n - a.2.1 ) / ( n - 1 ) * ( c - 1 )
      c = c + 1
    endwhile


    c = 1
    while( c <= cnum.1 )
      cmm = c - 1

      'set gxout shaded'

      d = 1
      ccols = ''
      clevs = ''
      while( d <= cnum.2 )
        w = a.2.d / 255.0
        r = ( 1 - w ) * r.1.c + w * r.2.d
        g = ( 1 - w ) * g.1.c + w * g.2.d
        b = ( 1 - w ) * b.1.c + w * b.2.d
        temp = d + 15
        'set rgb 'temp' 'r' 'g' 'b
        ccols = ccols % ' ' % (d+15)
        if( d < cnum.2 ) ; clevs = clevs % ' ' % lev.2.d ; endif
        d = d + 1
      endwhile
      'set ccols 'ccols
      'set clevs 'clevs

      if( c = 1 )
        'd maskout( tmpvover, 'lev.1.c'-tmpvback )'
      endif
      if( c = cnum.1 )
        'd maskout( tmpvover, tmpvback-'lev.1.cmm' )'
      endif
      if( c != 1 & c != cnum.1 )
        'd maskout( tmpvover, -(tmpvback-'lev.1.cmm')*(tmpvback-'lev.1.c') )'
      endif

      c = c + 1
    endwhile



* fill boundary
* another better way exist???

  c = 1
  while( c <= cnum.1 - 1 )

    'c = maskout( tmpvover, tmpvback-'lev.1.c' )'
    'int1 = cdiff( c, x ) + cdiff( c, y ) + cdiff( cdiff( c, x ), y ) + c'
    'int1 = const( int1, 1 )'
    'int1 = const( int1, -1, -u )'

    'c = maskout( tmpvover, 'lev.1.c'-tmpvback )'
    'int2 = cdiff( c, x ) + cdiff( c, y ) + cdiff( cdiff( c, x ), y ) + c'
    'int2 = const( int2, 1 )'
    'int2 = const( int2, -1, -u )'

    'bound1 = maskout( maskout( tmpvback, -int1 ), -int2 )'
    'bound1 = const( const( bound1, 1 ), -1, -u )'
    if( c = 1 )
      'bound = bound1 + 1'
    else
      'bound = bound + ( bound1 + 1 )'
    endif
    c = c + 1
  endwhile



*'bound = maskout( 'tmpvback', (bound1+1) + (bound2+1) - 1 )'

  'bound = maskout( 'tmpvback', bound - 1 )'
  'bound = const( const( bound, 1 ), -1, -u )'


  'set gxout grfill'

*'d maskout( b, bound )'


  'tmpvover = maskout( tmpvover, bound )'


  c = 1
  while( c <= cnum.1 )
    cmm = c - 1

*  kind = '(0,127,0)->(255,255,255)'
*  kind = '('r.1.c','g.1.c','b.1.c')->('r.2.12','r.2.12','r.2.12')'
*  'color 0.1 20.1 2 -kind 'kind
    'set gxout grfill'

    d = 1
    ccols = ''
    clevs = ''
    while( d <= cnum.2 )
      w = a.2.d / 255.0
      r = ( 1 - w ) * r.1.c + w * r.2.d
      g = ( 1 - w ) * g.1.c + w * g.2.d
      b = ( 1 - w ) * b.1.c + w * b.2.d
      temp = d + 15
      'set rgb 'temp' 'r' 'g' 'b
      ccols = ccols % ' ' % (d+15)
      if( d < cnum.2 ) ; clevs = clevs % ' ' % lev.2.d ; endif
      d = d + 1
    endwhile
    'set ccols 'ccols
    'set clevs 'clevs

    if( c = 1 )
      'd maskout( tmpvover, 'lev.1.c'-tmpvback )'
    endif
    if( c = cnum.1 )
      'd maskout( tmpvover, tmpvback-'lev.1.cmm' )'
    endif
    if( c != 1 & c != cnum.1 )
      'd maskout( tmpvover, -(tmpvback-'lev.1.cmm')*(tmpvback-'lev.1.c') )'
    endif

    c = c + 1
  endwhile
*******************************************************************


exit

'!sleep 3s'
****************************************
* reverse background & over-paint to smooth boundary

c = 1
while( c <= cnum.2 )
  cmm = c - 1

*  kind = '(0,127,0)->(255,255,255)'
*  kind = '('r.1.c','g.1.c','b.1.c')->('r.2.12','r.2.12','r.2.12')'
*  'color 0.1 20.1 2 -kind 'kind
  'set gxout shaded'

  d = 1
  ccols = ''
  clevs = ''
  while( d <= cnum.1 )
    w = a.2.c / 255.0
    r = ( 1 - w ) * r.1.d + w * r.2.d
    g = ( 1 - w ) * g.1.d + w * g.2.d
    b = ( 1 - w ) * b.1.d + w * b.2.d
    temp = d + 15
    'set rgb 'temp' 'r' 'g' 'b
    ccols = ccols % ' ' % (d+15)
    if( d < cnum.1 ) ; clevs = clevs % ' ' % lev.1.d ; endif
    d = d + 1
  endwhile
*  say ccols
*  say clevs
  'set ccols 'ccols
  'set clevs 'clevs

  if( c = 1 )
    'd maskout( maskout( vback, 'lev.2.c'-vover ), bound )'
  endif
  if( c = cnum.2 )
    'd maskout( maskout( vback, vover-'lev.2.cmm' ), bound )'
  endif
  if( c != 1 & c != cnum.2 )
    'd maskout( maskout( vback, -(vover-'lev.2.cmm')*(vover-'lev.2.c') ), bound )'
  endif

  c = c + 1
endwhile
****************************************



exit


* lon=126 (x=127), lat=11 (y=102)
'temp = maskout( b, const( b, -1, -a ) )'
'set defval temp 127 102 1'
'set defval temp 128 102 2'
*'set defval temp 129 102 3'
'set defval temp 127 103 3'
'set defval temp 128 103 4'
*'set defval temp 129 103 5'
*'set defval temp 127 104 3'
*'set defval temp 128 104 4'
*'set defval temp 129 104 5'



exit
****************************************


c = 1
while( c <= cnum.1 )
  cmm = c - 1

*  kind = '(0,127,0)->(255,255,255)'
  kind = '('r.1.c','g.1.c','b.1.c')->('r.2.12','r.2.12','r.2.12')'
  'color 0.1 20.1 2 -kind 'kind
  'set gxout grfill'

  if( c = 1 )
    'd maskout( vover, 'lev.1.c'-vback )'
  endif
  if( c = cnum.1 )
    'd maskout( vover, vback-'lev.1.cmm' )'
  endif
  if( c != 1 & c != cnum.1 )
    'd maskout( vover, -(vback-'lev.1.cmm')*(vback-'lev.1.c') )'
  endif

  c = c + 1
endwhile


exit

*min.1 = 'infty' ; max.1 = 100
*min.2 = 100     ; max.2 = '1000'
*min.3 = 1000    ; max.3 = 'infty'

c = 1
while( c <= cnum.1 )
  cpp = c + 1

*  kind = '(0,127,0)->(255,255,255)'
  kind = '('r.1.c','g.1.c','b.1.c')->('r.2.6','r.2.6','r.2.6')'
  'color 0.1 20.1 2 -kind 'kind
  'set gxout grfill'

*  if( min.c = 'infty' )
  if( c = 1 )
    'd maskout( 'vover', 'max.c'-'vback' )'
  endif
*  if( max.c = 'infty' )
  if( c = cnum.1 )
    'd maskout( 'vover', 'vback'-'min.c' )'
  endif
*  if( max.c != 'infty' & min.c != 'infty' )
  if( c != 1 & c != cnum.1 )
    'd maskout( 'vover', -('vback'-'min.c')*('vback'-'max.c') )'
  endif

  c = c + 1
endwhile


exit

clev = 1
while( clev <= 3 )
*  kind = '(0,127,0)->(255,255,255)'
  kind = '('r.1.clev','g.1.clev','b.1.clev')->('r.2.6','r.2.6','r.2.6')'
  'color 0.1 20.1 2 -kind 'kind
  'set gxout grfill'

  if( max.clev = 'infty' )
    'd maskout( 'vover', 'vback'-'min.clev' )'
  endif
  if( min.clev = 'infty' )
    'd maskout( 'vover', 'max.clev'-'vback' )'
  endif
  if( max.clev != 'infty' & min.clev != 'infty' )
    'd maskout( 'vover', -('vback'-'min.clev')*('vback'-'max.clev') )'
  endif

  clev = clev + 1
endwhile


exit




exit

* land
*'color 1 1 1 -kind (165,42,42)->(0,0,255)'
*'color 1 1 1 -kind (0,255,0)->(255,255,255)'
*'set rgb 16   0 127   0'
*'set rgb 17 255 255 255'
'color 0.1 20.1 2 -kind (0,127,0)->(255,255,255)'
*'set ccols 16 17'
*'set clevs 1'
*'d maskout( lterp(prate.2*24*3600,hgs.1(t=1)), hgs.1(t=1)-100 )'
*'d maskout( lterp(prate.2*24*3600,dummy), lterp(hgs.1(t=1)-100,dummy) )'

*'set gxout grfill'
'd maskout( b, a-100 )'

* ocean
*'color 1 1 1 -kind (255,255,255)->(0,0,255)'
*'set rgb 16   0   0   0'
*'set rgb 17 255 255 255'
*'set ccols 16 17'
*'set clevs 1'
'color 0.1 20.1 2 -kind (0,0,255)->(255,255,255)'
*'d maskout( lterp(prate.2*24*3600,hgs.1(t=1)), 100-hgs.1(t=1) )'
*'d maskout( lterp(prate.2*24*3600,dummy), lterp(200-hgs.1(t=1),dummy) )'
*'set gxout grfill'
'd maskout( b, 100-a )'




exit



*'c = maskout( 'vover', 'vback'-1000 )'
*'int1 = cdiff( c, x ) + cdiff( c, y ) + cdiff( cdiff( c, x ), y ) + c'
*'int1 = const( int1, 1 )'
*'int1 = const( int1, -1, -u )'

*'c = maskout( 'vover', 1000-'vback' )'
*'int2 = cdiff( c, x ) + cdiff( c, y ) + cdiff( cdiff( c, x ), y ) + c'
*'int2 = const( int2, 1 )'
*'int2 = const( int2, -1, -u )'

*'bound1 = maskout( maskout( 'vback', -int1 ), -int2 )'
*'bound1 = const( const( bound1, 1 ), -1, -u )'


*'c = maskout( 'vover', 'vback'-100 )'
*'int1 = cdiff( c, x ) + cdiff( c, y ) + cdiff( cdiff( c, x ), y ) + c'
*'int1 = const( int1, 1 )'
*'int1 = const( int1, -1, -u )'

*'c = maskout( 'vover', 100-'vback' )'
*'int2 = cdiff( c, x ) + cdiff( c, y ) + cdiff( cdiff( c, x ), y ) + c'
*'int2 = const( int2, 1 )'
*'int2 = const( int2, -1, -u )'

*'bound2 = maskout( maskout( 'vback', -int1 ), -int2 )'
*'bound2 = const( const( bound2, 1 ), -1, -u )'






    return
  endif

  say 'error: dshade.gs did nothing'
return



function sep( colorret, id, num )
*  say 'sep: ' % colorret
*  say id % ' ' % num
  i = 1
  n = 1
  flag = 0
  while( i <= 1000 )
    word = subwrd( colorret, i )
    if( flag = 1 & valnum(word) != 0 )
      if( n = num ) ; return word ; endif
      n = n + 1
    else
      flag = 0
    endif
    if( word = id )
      flag = 1
    endif
    i = i + 1
  endwhile

return ''


*
* help
*
function help()
  say ' Name:'
  say '   dshade '_version' - draw transparent shadings'
  say ' '
  say ' Usage(1): set background color'
  say '   dshade set back color-args...'
  say ''
  say ' Usage(2): set overlay color'
  say '   dshade set over [-alpha min max] color-args...'
  say ''
  say ' Usage(3): draw'
  say '   dshade draw var-back var-over'
  say ''
  say '     color-args       : same as color.gs'
  say '     -alpha min max   : min. and max. transparency'
  say '     var-back         : background variable'
  say '     var-over         : variable to overlay'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say '   dshades.gs needs setstr.gsf, getstr.gsf, strmem.gsf'
  say '   dshades.gs needs color.gs whose version is more than 0.06r3'
  say ''
  say ' Copyright (C) 2010-2010 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
