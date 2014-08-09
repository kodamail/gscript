*
* Help is in the end of this script.
*
function grid(args)
  _version='0.03r1'

  if( args = '' )
    help()
  endif


*** arguements ***
  xstep = subwrd(args,1)
  ystep = subwrd(args,2)
  numflag = subwrd(args,3)


*** default value ***
  if( xstep = "" | xstep = -9999)
    xstep = 1.0
  endif
  if(ystep = "" | ystep = -9999)
    ystep = xstep
  endif
  if(numflag = "" | numflag = -9999)
    numflag = 1
  endif


*** checking value ***
  if( xstep <= 0 | ystep <= 0 )
    say "error! ---step value is negative---"
    return
  endif
  if( numflag != 0 & numflag != 1 )
    say "warning! ---invalid num flag -> set to 1---"
    numflag = 1
  endif


*** get gxinfo ***
  'q gxinfo'
  line = sublin( result, 2 )
  psx = subwrd( line, 4 )
  psy = subwrd( line, 6 )

*** draw line (x) ***
  i = xstep + 0
  while( i < psx )
    if( numflag = 1 )
      'set strsiz 'xstep/3' 'xstep/3
      'set string 1 bc'
      'draw string 'i' 0.05 'i
      'draw line 'i' 'xstep/3+0.1' 'i' 'psy

    else
      'draw line 'i' 0 'i' 'psy

    endif

    i = i + xstep
  endwhile


*** draw line (y) ***
  i = ystep + 0
  while( i < psy )
    if( numflag = 1 )
      'set strsiz 'ystep/3' 'ystep/3
      'set string 1 l'
      'draw string 0.05 'i' 'i
      'draw line '0.1+ystep/3*math_strlen(i)' 'i' 'psx' 'i

    else
      'draw line 0 'i' 'psx' 'i

    endif

    i = i + ystep
  endwhile

return


*
* help
*
function help()
  say ' Name:'
  say '   grid '_version' - display grid'
  say ' '
  say ' Usage:'
  say '   grid [xstep [ystep [numflag]]]'
  say ''
  say '     xstep   : grid step for x (default=1.0)'
  say '     ystep   : grid step for y (default=xstep)'
  say '     numflag : numbering switch (0:no Number 1:draw Number)'
  say '               (default=1)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009-2010 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
