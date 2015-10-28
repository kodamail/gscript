*
* Help is in the end of this script.
*
function setshift( args )
  _version = '0.01r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

  dim   = subwrd( args, 1 )
  shift = subwrd( args, 2 )

  min = qdims( dim'min' )
  max = qdims( dim'max' )

  min = min + shift
  max = max + shift

*  prex( 'set 'dim' 'min' 'max )
  'set 'dim' 'min' 'max

return

*
* help
*
function help()
  say ' Name:'
  say '   setshift '_version' - set dimension relative to the current one'
  say ' '
  say ' Usage:'
  say '   setshift dim-name shift'
  say ''
  say '     dim    : Dimension name. "x", "y", "z", or "t"'
  say '     shift  : Amount of shift relative to the current dimension.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2015-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
