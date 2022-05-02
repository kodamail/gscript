*
* help is in the end of this script
*
function clsum(args)
  _version = '0.01r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  varin  = ''
  time1  = ''
  time2  = ''
  ystart = ''
  yend   = ''
  ylist  = ''
  varout = ''

  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-ylist' )  ; ylist = subwrd(args,i) ; i=i+1 ; break ; endif

*** varin, time1, time2, ...
      if( varin  = '' ) ; varin = arg ; break ; endif
      if( time1  = '' ) ; time1 = arg ; break ; endif
      if( time2  = '' ) ; time2 = arg ; break ; endif
      if( ystart = '' & ylist = '' ) ; ystart = arg ; break ; endif
      if( yend   = '' & ylist = '' ) ; yend   = arg ; break ; endif
      if( varout = '' ) ; varout = arg ; break ; endif

      say 'syntax error: 'arg
      return
    endwhile
  endwhile

  if( varin = '' ) ; say 'error: no varin is specified!' ; return ; endif
  if( time1 = '' ) ; say 'error: no time1 is specified!' ; return ; endif
  if( time2 = '' ) ; say 'error: no time2 is specified!' ; return ; endif
  if( ystart = '' & yend = '' & ylist = '' )
                     say 'error: no year range is specified!' ; return ; endif
  if( ystart != '' & yend != '' & ystart > yend )
                     say 'error: no ystart > yend' ; return ; endif

* set year list (year.pn)
  if( ystart != '' & yend != '' )
    pn = 0
    y = ystart
    while( y <= yend )
      pn = pn + 1
      year.pn = y
      y = y + 1
    endwhile
  endif
  if( ylist != '' )
    pn = 1
    year.pn = ''
    len = math_strlen( ylist )
    i = 1
    while( i <= len )
      c = substr( ylist, i, 1 )
      if( c = ',' ) ; pn = pn + 1 ; year.pn = ''
      else ; year.pn = year.pn % c ; endif
      i = i + 1
    endwhile
  endif


***** Calculate *****
  p = 1
  while( p <= pn )
    y = year.p
    timey1 = gettime( time1, y )
    timey2 = gettime( time2, y )
    if( time2t(timey1) > time2t(timey2) )
      say 'error: time range is ' % timey1 % ' and ' % timey2
      exit
    endif

    say 'sum( 'varin', time='timey1', time='timey2 ')'
    'clsumtemp = sum( 'varin', time='timey1', time='timey2' )'
 
    if( p = 1 )
      'clsum = clsumtemp'
    else
      'clsummask = const( clsum*0+1, 0, -u ) + const( clsumtemp*0+1, 0, -u ) - 0.5'
      'clsum = maskout( const( clsum, 0, -u ) + const( clsumtemp, 0, -u ), clsummask )'
    endif

    p = p + 1
  endwhile


***** Output *****
  if( varout = '' )
    'd clsum'
  else
    varout'=clsum'
  endif

  'undefine clsum'
return



*
* help
*
function help()
  say ' Name:'
  say '   clsum '_version' - make climatological sum '
  say ''
  say ' Usage:'
  say '   clsum'
  say '       var_in time1 time2'
  say '       (ystart yend | -ylist y1,y2,...) [var_out]'
  say ''
  say '     var_in      : variable'
  say '     time1 time2 : Seasonal time range'
  say '                   %y, %ypp, or %ymm should be included. '
  say '                   They will be replaced by a particular year,'
  say '                   the next year or the previous year.'
  say '                   %end, which will be replaced by the end of month, may be included.'
  say '                   e.g.  time1    time2'
  say '                         01jan%y  01feb%y    : January-mean (including 01feb)'
  say '                         01jan%y  %endjan%y  : January-mean (summing only over January)'
  say '                         01jun%y  %endaug%y  : JJA-mean'
  say '                         01dec%y  %endfeb%ypp: DJF-mean'
  say '     ystart yend : year range (ystart <= yend)'
  say '     -ylist list : year used'
  say '     var_out     : variable in which climatological mean will be stored.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   If var_out is not specified, climatological mean will be drawn.'
  say ''
  say ' Copyright (C) 2022-2022 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
