*
* Help is in the end of this script.
*
function allcolor(args)
  _version='0.01r2'

*  if( args = '' )
*    help()
*  endif

  imax = 20
  jmax = 10

  c = 0
  while( c <= 255 )
    'set line 'c
    i = math_fmod( c, imax )
    j = ( c - i ) / imax

    x1 = 0.5 + 0.5 * i
    x2 = 0.5 + 0.5 * (i+1)
    xmed = ( x1 + x2 ) / 2.0

    y1 = 7.5 - 0.5 * j
    y2 = 7.5 - 0.5 * (j-1)
    ymed = ( y1 + y2 ) / 2.0

    'draw recf 'x1' 'y1' 'x2' 'y2

    'set strsiz 0.1 0.15'
    'set string 0 c 0.15'
    'draw string 'xmed' 'ymed' 'c

    c = c + 1
  endwhile

return


*
* help
*
function help()
  say ' Name:'
  say '   allcolor '_version' - display all the colors'
  say ' '
  say ' Usage:'
  say '   allcolor'
  say ''
  say ' Copyright (C) 2009-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
