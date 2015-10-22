*
* Help is in the end of this script.
*
function grid(args)
  _version='0.04r1'

  if( args = '' )
    help()
  endif

***** Default value *****
  xstep  = 'none'
  ystep  = 'none'
  lflag  = 1
  aflag  = 0
  xastep = 'none'
  yastep = 'none'

***** Arguement *****
  i = 1
  flag = 0
  while(1)
    arg = subwrd(args,i)
    i = i + 1
    if( arg = '' ); break; endif
    while(1)
*** option
      if( arg = '-nl'  ) ; lflag = 0; break; endif
      if( arg = '-a'  )
        aflag = 1
        arg = subwrd(args,i)
        if( valnum(arg) != 0 & xastep = 'none' ) ; xastep = arg ; i = i + 1 ; endif
        arg = subwrd(args,i)
        if( valnum(arg) != 0 & yastep = 'none' ) ; yastep = arg ; i = i + 1 ; endif
        break
      endif

      if( valnum(arg) != 0 & xstep = 'none' ) ; xstep = arg ; break ; endif
      if( valnum(arg) != 0 & ystep = 'none' ) ; ystep = arg ; break ; endif


      say 'syntax error: 'arg
      return
      break;
    endwhile

    if( flag = 1 ); break; endif

  endwhile

*** default value ***
  if( xstep  = 'none' ) ; xstep  = 1.0       ; endif
  if( ystep  = 'none' ) ; ystep  = xstep     ; endif
  if( xastep = 'none' ) ; xastep = xstep / 2 ; endif
  if( yastep = 'none' ) ; yastep = xastep    ; endif

*** checking value ***
  if( xstep <= 0 | ystep <= 0 | xastep <= 0 | yastep <= 0 )
    say "error! ---step value is negative---"
    return
  endif

*** get gxinfo ***
  'q gxinfo'
  line = sublin( result, 2 )
  psx = subwrd( line, 4 )
  psy = subwrd( line, 6 )

*** draw line (x) ***
  if( aflag = 1 )
    'set line 1 1 6'
  else
    'set line 1 1 3'
  endif
  i = xstep + 0
  while( i < psx )
    if( lflag = 1 )
      'set strsiz 'xstep/3' 'xstep/3
      'set string 1 bc'
      'draw string 'i' 0.05 'i
      'draw line 'i' 'xstep/3+0.1' 'i' 'psy
    else
      'draw line 'i' 0 'i' 'psy
    endif
    i = i + xstep
  endwhile

  if( aflag = 1 )
    i = xastep + 0
    'set line 1 1 1'
    while( i < psx )
      if( math_abs( math_int(i/xstep)-(i/xstep)) > 0.001  )
        'draw line 'i' 0 'i' 'psy
      endif
      i = i + xastep
    endwhile
  endif


*** draw line (y) ***
  if( aflag = 1 )
    'set line 1 1 6'
  else
    'set line 1 1 3'
  endif
  i = ystep + 0
  while( i < psy )
    if( lflag = 1 )
      'set strsiz 'ystep/3' 'ystep/3
      'set string 1 l'
      'draw string 0.05 'i' 'i
      'draw line '0.1+ystep/3*math_strlen(i)' 'i' 'psx' 'i
    else
      'draw line 0 'i' 'psx' 'i
    endif
    i = i + ystep
  endwhile

  if( aflag = 1 )
    i = yastep + 0
    'set line 1 1 1'
    while( i < psy )
      if( math_abs( math_int(i/ystep)-(i/ystep)) > 0.001  )
        'draw line 0 'i' 'psx' 'i
      endif
      i = i + yastep
    endwhile
  endif

return


*
* help
*
function help()
  say ' Name:'
  say '   grid '_version' - display grid'
  say ''
  say ' Usage:'
  say '   grid [xstep [ystep]]  [-nl]  [-a [xastep [yastep]]]'
  say ''
  say '     xstep   : Interval in x-direction. Default value is 1.0.'
  say '     ystep   : Interval in y-direction. Default value is xstep.'
  say '     -nl     : No label.'
  say '     -a      : Extension line is on.'
  say '     xastep  : Interval of extension line for x-direction. Default value is xstep/2.'
  say '     yastep  : Interval of extension line for x-direction. Default value is ystep/2.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
