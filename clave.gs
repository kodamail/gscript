*
* help is in the end of this script
*
function clave(args)
  _version = '0.05r1'
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
  within = 0

  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-ylist' )  ; ylist = subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-within' ) ; within = 1 ; break ; endif

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

*  varin  = subwrd( args, 1 )
*  time1  = subwrd( args, 2 )
*  time2  = subwrd( args, 3 )
*  ystart = subwrd( args, 4 )
*  if( ystart = '-ylist' )
*    ystart = ''
*    yend   = ''
*    ylist  = subwrd( args, 5 )
*  else
*    yend   = subwrd( args, 5 )
*    ylist  = ''
*  endif
*  varout = subwrd( args, 6 )

  if( varin = '' ) ; say 'error: no varin is specified!' ; return ; endif
  if( time1 = '' ) ; say 'error: no time1 is specified!' ; return ; endif
  if( time2 = '' ) ; say 'error: no time2 is specified!' ; return ; endif
  if( ystart = '' & yend = '' & ylist = '' )
                     say 'error: no year range is specified!' ; return ; endif
  if( ystart != '' & yend != '' & ystart > yend )
                     say 'error: no ystart > yend' ; return ; endif

* set yeay list (year.pn)
*  if( ystart != '' & y_end != '' )
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

    calc = 0

*   only support ystart/yend for within=1
*   timey2 >= 00z01jan{ypp} ->
    if( within = 1 )
      if( time2t(timey2) >= time2t('00z01jan' % (yend+1)) )
        calc = 1
        say 'Keep time within year range'
        timey2a = gettime( time2, ystart-1 )
        timey1a = t2time( time2t( '00z01jan'ystart ) )
        say '  ave( 'varin', time='timey1a', time='timey2a ')'
        'claveav = ave( 'varin', time='timey1a', time='timey2a ')'
        'clavean = sum( const('varin'*0+1,0,-u), time='timey1a', time='timey2a ')'
        timey2b = t2time( time2t( '00z01jan' % (yend+1) ) - 1 )
        say '  ave( 'varin', time='timey1', time='timey2b ')'
        'clavebv = ave( 'varin', time='timey1', time='timey2b ')'
        'clavebn = sum( const('varin'*0+1,0,-u), time='timey1', time='timey2b ')'
        'claveav = const( claveav, 0, -u )'
        'clavebv = const( clavebv, 0, -u )'
        'clavetemp = ( claveav * clavean + clavebv * clavebn ) / ( clavean + clavebn )'
      endif
      if( time2t(timey1) < time2t('00z01jan' % (ystart)) )
        calc = 1
        say 'Keep time within year range'
        timey2a = gettime( time2, ystart )
        timey1a = t2time( time2t( '00z01jan'ystart ) )
        say '  ave( 'varin', time='timey1a', time='timey2a ')'
        'claveav = ave( 'varin', time='timey1a', time='timey2a ')'
        'clavean = sum( const('varin'*0+1,0,-u), time='timey1a', time='timey2a ')'
        timey1b = gettime( time1, yend+1 )
        timey2b = t2time( time2t( '00z01jan' % (yend+1) ) - 1 )
        say '  ave( 'varin', time='timey1b', time='timey2b ')'
        'clavebv = ave( 'varin', time='timey1', time='timey2b ')'
        'clavebn = sum( const('varin'*0+1,0,-u), time='timey1', time='timey2b ')'
        'claveav = const( claveav, 0, -u )'
        'clavebv = const( clavebv, 0, -u )'
        'clavetemp = ( claveav * clavean + clavebv * clavebn ) / ( clavean + clavebn )'
      endif
    endif

    if( calc = 0 )
      say 'ave( 'varin', time='timey1', time='timey2 ')'
      'clavetemp = ave( 'varin', time='timey1', time='timey2' )'
    endif
 
   if( p = 1 )
      'clavenum = const( clavetemp*0+1, 0, -u )'
      'clave = clavetemp'
    else
      'clavenum = clavenum + const( clavetemp*0+1, 0, -u )'
      'clavemask = const( clave*0+1, 0, -u ) + const( clavetemp*0+1, 0, -u ) - 0.5'
      'clave = maskout( const( clave, 0, -u ) + const( clavetemp, 0, -u ), clavemask )'
    endif

    p = p + 1
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
* Convert time for GrADS
*
* str: virtual time including %y, %ypp, %end.
* y  : year
* ret: time for GrADS
*
* e.g. %y, %ypp -> 1980, 1981
*      %end -> 18z31 (if Jan, 6 hourly )
*
function gettime( str, y )
  ret = str
  yret = -999
  ypp = y + 1
  ymm = y - 1

  tmp = strrep( ret, '%ypp', ypp )
  if( ret != tmp ) ; yret = ypp ; endif
  ret = tmp

  tmp = strrep( ret, '%ymm', ymm )
  if( ret != tmp ) ; yret = ymm ; endif
  ret = tmp

  tmp = strrep( ret, '%y', y )
  if( ret != tmp ) ; yret = y ; endif
  ret = tmp

  pos = find( ret, '%end' )
  if( pos > 0 )
    len = math_strlen( ret )
    cm   = substr( ret, pos+4, 3 )
    year = substr( ret, pos+7, len-(pos+7)+1 )
    t1 = time2t( '00z01'cm''year )
    t2 = t1 + tsteps( year, cmonth(cm) ) - 1
    ret = t2time( t2 )
  endif

return ( ret )


*
* help
*
function help()
  say ' Name:'
  say '   clave '_version' - make climatological mean '
  say ''
  say ' Usage:'
  say '   clave'
  say '       var_in time1 time2'
  say '       (ystart yend | -ylist y1,y2,...) [var_out]'
  say '       [-within]'
  say ''
  say '     var_in      : variable'
  say '     time1 time2 : Seasonal time range'
  say '                   %y, %ypp, or %ymm should be included. '
  say '                   They will be replaced by a particular year,'
  say '                   the next year or the previous year.'
  say '                   %end, which will be replaced by the end of month, may be included.'
  say '                   e.g.  time1    time2'
  say '                         01jan%y  01feb%y    : January-mean (including 01feb)'
  say '                         01jan%y  %endjan%y  : January-mean (averaged only within January)'
  say '                         01jun%y  %endaug%y  : JJA-mean'
  say '                         01dec%y  %endfeb%ypp: DJF-mean'
  say '     ystart yend : year range (ystart <= yend)'
  say '     -ylist list : year used'
  say '     var_out     : variable in which climatological mean will be stored.'
  say '     -within     : do not use data outside year range with %ypp and/or %ymm.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   If var_out is not specified, climatological mean will be drawn.'
  say ''
  say ' Copyright (C) 2009-2017 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
