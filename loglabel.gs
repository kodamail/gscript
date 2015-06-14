*
* Help is in the end of this script.
*
function loglabel( args )
  _version='0.04r3'

  if( args = '-help' )
    help()
    return
  endif

  'q dims'
  res = sublin(result,4)
  levmin = subwrd(res,6)
  levmax = subwrd(res,8)

  fix = subwrd(res,3)
  if( fix = 'fixed' )
    return
  endif

  lnlevmin = math_log10(levmin)
  lnlevmax = math_log10(levmax)
  diff = lnlevmin-lnlevmax

***** set parameters *****
* rule: (diff * n) should be close to 10

* ex. 1000hPa - 100hPa
  if( diff >= 0.5  &  diff < 1.5 )
    base.1 = 8.5
    base.2 = 7.0
    base.3 = 6.0
    base.4 = 5.0
    base.5 = 4.0
    base.6 = 3.0
    base.7 = 2.5
    base.8 = 2.0
    base.9 = 1.5
    base.10= 1.0
    n = 10
*    loop = 2
  endif

* ex. 100hPa - 1hPa
  if( diff >= 1.5  &  diff < 2.5 )
    base.1 = 7.0
    base.2 = 5.0
    base.3 = 3.0
    base.4 = 2.0
    base.5 = 1.0
    n = 5
*    loop = 3
  endif

* ex. 1000hPa - 1hPa
  if( diff >= 2.5  &  diff < 3.5 )
    base.1 = 5.0
    base.2 = 3.0
    base.3 = 2.0
    base.4 = 1.0
    n = 4
*    loop = 4
  endif

** ex. 1000hPa - 0.1hPa
*  if( diff >= 3.5  &  diff < 4.5 )
*    base.1 = 5.0
*    base.2 = 2.0
*    base.3 = 1.0
*    n = 3
**    loop = 5
*  endif
*
** ex. 1000hPa - 0.01hPa
*  if( diff >= 4.5  &  diff < 5.5 )
*    base.1 = 5.0
*    base.2 = 2.0
*    base.3 = 1.0
*    n = 3
**    loop = 6
*  endif

* ex. 1000hPa - 0.1hPa
  if( diff >= 3.5  &  diff < 4.5 )
    base.1 = 5.0
    base.2 = 2.0
    base.3 = 1.0
    n = 3
  endif

* ex. 1000hPa - 0.01hPa, 1000hPa - 0.001hPa, 1000hPa - 0.0001hPa, 
  if( diff >= 4.5  &  diff < 7.5 )
    base.1 = 3.0
    base.2 = 1.0
    n = 2
  endif

* ex. 1000hPa - 0.01hPa, 1000hPa - 0.001hPa, 1000hPa - 0.0001hPa, 
  if( diff >= 7.5 )
    base.1 = 1.0
    n = 1
  endif

*  if( diff < 0.5 | diff >= 5.5 )
*  if( diff < 0.5 | diff >= 6.5 )
*    say 'loglabel : out of range'
*    return
*  endif

***** set ylevs *****
  loop = math_int( diff + 1.5 )
  fact = math_pow(10,math_int(math_log10(levmin)))
  string = base.n * fact * 10 % ' '
 j = 1
  while( j <= loop )
    div = math_pow(10,j-1)

    i = 1
    while ( i <= n )
      string = string % fact*base.i/div % ' '
      i = i + 1
    endwhile

    j = j + 1
  endwhile

  'set ylevs 'string
*say 'ylevs (loglabels) = ' % string

return

*
* help
*
function help()
  say ' Name:'
  say '   loglabel '_version' - set log-p label'
  say ' '
  say ' Usage:'
  say '   loglabel [-help]'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say '   "set imprun loglabel" is useful'
  say '   set level before running loglabel'
  say ''
  say ' Copyright (C) 2004-2011 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
