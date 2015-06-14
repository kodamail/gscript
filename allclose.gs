*
* Help is in the end of this script.
*
function allclose( args )
  _version='0.01r1'

*  if( args = '' )
*    help()
*    return
*  endif

* serach for the largest file number
  'q files'
  i = 1
  fmax = 0
  while( 1 )
    line = sublin( result, i )
    if( line = '' ) ; break ; endif
    num  = subwrd( line, 2 )
    if( num = fmax + 1 ) ; fmax = fmax + 1 ; endif
    i = i + 1
  endwhile

* close
  say 'closing 'fmax' files'
  f = fmax
  while( f >= 1 )
    'close 'f
    f = f - 1
  endwhile

return

*
* help
*
function help()
  say ' Name:'
  say '   allclose '_version' - close all the opened files'
  say ' '
  say ' Usage:'
  say '   allclose'
  say ''
  say ' Copyright (C) 2010 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
