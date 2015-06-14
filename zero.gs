*
* Help is in the end of this script.
*
function zero( args )
  _version='0.01r2'

  if( args = '' )
    help()
    return
  endif

  var = subwrd( args, 1 )

  'set gxout contour'
  'set clevs 0'
  'd 'var

return

*
* help
*
function help()
  say ' Name:'
  say '   zero '_version' - draw zero-line'
  say ' '
  say ' Usage:'
  say '   zero var'
  say '     var : variable'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
