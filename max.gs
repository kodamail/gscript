*
* Help is in the end of this script.
*
function max( args )
  _version='0.01r1'

  if( args = '' )
    help()
    return
  endif

  org = subwrd( args, 1 )
  cmp = subwrd( args, 2 )
  new = subwrd( args, 3 )
  if( new = '' ) ; new = org ; endif

  'tempmax1 = maskout( 'org', 'org'-'cmp' )'
  'tempmax2 = maskout( 'cmp', const(const(tempmax1,-1),1,-u) )'

  new' = const( tempmax1, 0, -u ) + const( tempmax2, 0, -u )'

return



*
* help
*
function help()
  say ' Name:'
  say '   max '_version' - get maximum value from two field variables'
  say ' '
  say ' Usage:'
  say '   max org cmp [new]'
  say ''
  say '     org    : 1st variable name'
  say '              without specifying [new], it will be overridden.'
  say '     cmp    : 2nd variable name'
  say '     new    : result variable name. Without specified it, new=org.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
