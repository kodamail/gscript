*
* Help is in the end of this script
*
function dlev( args )
  _version='0.01r2'

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  var = ''
  dvdlev = ''
  loglev = 0


***** Arguement *****
  i = 1
  while(1)
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while(1)
*** option
      if( arg = '-loglev' ); loglev=1; break; endif

*** int, max, min
      if( var = '' ); var=arg; break; endif
      if( var != '' & dvdlev = '' ); dvdlev=arg; break; endif

      say 'syntax error : 'arg
      return

    endwhile
  endwhile

  'q dims'
  line = sublin( result, 4 )
  flag = subwrd( line, 3 )
  if( flag != 'varying' ); return; endif

  zmin = subwrd( line, 11 )
  zmax = subwrd( line, 13 )

  zminpp = zmin + 1
  zmaxmm = zmax - 1


*  Half level
  'set z 'zmin' 'zmaxmm
  if( loglev = 0 )
    'dvp = ( 'var'(z+1) - 'var' ) / ( lev(z+1) - lev )'
    'levp = 0.5 * ( lev + lev(z+1) )'
  else
    'dvp = ( 'var'(z+1) - 'var' ) / ( log(lev(z+1)) - log(lev) )'
    'levp = 0.5 * ( log(lev) + log(lev(z+1)) )'
  endif

*  'dv = 0 * 'var
*  z = zmin
*  while( z <= zmaxmm )
*    'set z 'z+1
*    'varpp = 'var
*    'set z 'zmin' 'zmaxmm
**    'dv = dv + maskout(varpp,z)'
*    z = z + 1
*  endwhile



*exit

  'set z 'zminpp' 'zmax
  if( loglev = 0 )
    'dvm = ( 'var' - 'var'(z-1) ) / ( lev - lev(z-1) )'
    'levm = 0.5 * ( lev(z-1) + lev )'
  else
    'dvm = ( 'var' - 'var'(z-1) ) / ( log(lev) - log(lev(z-1)) )'
    'levm = 0.5 * ( log(lev(z-1)) + log(lev) )'
  endif

*  Full level
  'set z 'zminpp' 'zmaxmm
  if( loglev = 0 )
    'w = ( lev - levm ) / ( levp - levm )'
    'out = w * dvp + (1-w) * dvm'
  else
    'w = ( log(lev) - levm ) / ( levp - levm )'
    'out = w * dvp + (1-w) * dvm'
    'out = 'out' / lev'
  endif


*  Output
  'set z 'zmin' 'zmax

  if( dvdlev = '' )
    'd out'
  else
    dvdlev' = out'
  endif

return


*
* help
*
function help()
  say ' Name:'
  say '   dlev '_version' - differentiate variable with respect to lev'
  say ' '
  say ' Usage:'
  say '   dlev var [var_out] [-loglev]'
  say ''
  say '     var         : variable to be differentiated'
  say '     var_out     : result variable'
  say '                   if var_out is not specified,'
  say '                   result is displayed on the screen instead'
  say '     -loglev     : use log(lev) instead of lev'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   Without -loglev, var_out = d(var)/d(lev)'
  say '   With -loglev, var_out = d(var)/dlog(lev) / lev'
  say '   Half-level value is calculated for accuracy (2nd-order)'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
