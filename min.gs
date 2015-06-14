*
* Help is in the end of this script.
*
function min( args )
  _version='0.01r1'

  if( args = '' )
    help()
    return
  endif

  org = subwrd( args, 1 )
  cmp = subwrd( args, 2 )
  new = subwrd( args, 3 )
  if( new = '' ) ; new = org ; endif

  'tempmin1 = maskout( 'org', 'cmp'-'org' )'
  'tempmin2 = maskout( 'cmp', const(const(tempmin1,-1),1,-u) )'

  new' = const( tempmin1, 0, -u ) + const( tempmin2, 0, -u )'

return



*
* help
*
function help()
  say ' Name:'
  say '   min '_version' - get minimum value from two field variables'
  say ' '
  say ' Usage:'
  say '   min org cmp [new]'
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
