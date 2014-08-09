*
* help is in the end of this script
*
function clave(args)
  _version='0.03r1'
  rc = gsfallow("on")

  if( args = '' )
    help()
    return
  endif

  varin  = subwrd( args, 1 )
  time1  = subwrd( args, 2 )
  time2  = subwrd( args, 3 )
  ystart = subwrd( args, 4 )
  if( ystart = '-ylist' )
    ystart = ''
    yend   = ''
    ylist  = subwrd( args, 5 )
  else
    yend   = subwrd( args, 5 )
    ylist  = ''
  endif
  varout = subwrd( args, 6 )

  if( varin = '' ) ; say 'error: no varin is specified!' ; return ; endif
  if( time1 = '' ) ; say 'error: no time1 is specified!' ; return ; endif
  if( time2 = '' ) ; say 'error: no time2 is specified!' ; return ; endif
  if( ystart = '' & yend = '' & ylist = '' )
                     say 'error: no year range is specified!' ; return ; endif
  if( ystart != '' & yend != '' & ystart > yend )
                     say 'error: no ystart > yend' ; return ; endif

*  if( varin = '' | time1 = '' | time2 = '' | ystart = '' | yend = '' | ystart > yend )
*    say 'Error: arguements are inscorrect!'
*    say 'try "clave" for help'
*    return
*  endif

  if( ystart != '' & y_end != '' )
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
*  y = ystart
*  while( y <= yend )
  while( p <= pn )
    y = year.p
    timey1 = gettime( time1, y )
    timey2 = gettime( time2, y )

    say 'ave( 'varin', time='timey1', time='timey2 ')'

    'clavetemp = ave( 'varin', time='timey1', time='timey2' )'
*    if( y = ystart )
    if( p = 1 )
      'clavenum = const( clavetemp*0+1, 0, -u )'
      'clave = clavetemp'
    else
      'clavenum = clavenum + const( clavetemp*0+1, 0, -u )'
      'clavemask = const( clave*0+1, 0, -u ) + const( clavetemp*0+1, 0, -u ) - 0.5'
      'clave = maskout( const( clave, 0, -u ) + const( clavetemp, 0, -u ), clavemask )'
    endif

    p = p + 1
*    y = y + 1
  endwhile

  'clave = clave / clavenum'


***** Output *****
  if( varout = '' )
    'd clave'
  else
    varout'=clave'
  endif

  'undefine clave'
return



*
* get time for grads
*
* e.g. %y, %ypp -> 1980, 1981
*      %end -> 18z31 (if Jan, 6 hourly )
function gettime( str, y )
  time = ''
  len = math_strlen( str )
  pos = 1
  while( pos <= len )
    c = substr( str, pos, 1 )

    if( c = '%' )
      c1 = substr( str, pos+1, 1 )
      c2 = substr( str, pos+2, 1 )
      c3 = substr( str, pos+3, 1 )

      while( 1 )

*       %ypp
        if( c1 = 'y' & c2 = 'p' & c3 = 'p' )
          ypp = y + 1
          time = time % ypp
          pos = pos + 3
          break
        endif

*       %y
        if( c1 = 'y' )
          time = time % y
          pos = pos + 1
          break
        endif

        time = time % '%'
        break
      endwhile

    else      
      time = time % c

    endif

    pos = pos + 1
  endwhile

return ( time )

* below TODO

* for %end
  str = time
  len = math_strlen( str )
  pos = 1
  while( pos <= len )
    c = substr( str, pos, 1 )
    if( c = '%' )
      c1 = substr( str, pos+1, 1 )
      c2 = substr( str, pos+2, 1 )
      c3 = substr( str, pos+3, 1 )

      while( 1 )
*       %end
        if( c1 = 'e' & c2 = 'n' & c3 = 'd' )
          temp = substr( str, pos+4, len-(pos+3) )
*          say t2time( time2t( temp )-1 )
          say temp
*          temp = time2t
exit
          time = time % ypp
          pos = pos + 3
          break
        endif

        time = time % '%'
        break
      endwhile
    else      
      time = time % c
    endif
    pos = pos + 1
  endwhile

return ( time )


*
* help
*
function help()
  say ' Name:'
  say '   clave '_version' - make climatological mean '
  say ''
  say ' Usage:'
  say '   1. clave var_in time1 time2 ystart yend [var_out]'
  say '   2. clave var_in time1 time2 -ylist y1,y2,... [var_out]'
  say ''
  say '     var_in      : variable'
  say '     time1 time2 : (seasonal) time range'
  say '                   %y and %ypp should be included. '
  say '                   They will be replaced by a particular year '
  say '                                            and the next year'
  say '                   e.g.  time1    time2'
  say '                         01jan%y  01feb%y  : January-mean (including 00z01feb)'
  say '                         01jun%y  01sep%y  : JJA-mean (including 00z01sep)'
  say '                         01dec%y  01mar%ypp: DJF-mean (including 00z01mar)'
  say '     ystart yend : year range (ystart <= yend)'
  say '     -ylist list : year used'
  say '     var_out     : variable in which climatological mean will be stored.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   If var_out is not specified, climatological mean will be drawn.'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
