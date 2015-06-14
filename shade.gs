*
* Help is in the end of this script.
*
function shade( args )
  _version='0.01r2'

  if( args = '' )
    help()
    return
  endif

  var = subwrd( args, 1 )

  min = subwrd( args, 2 )
  max = subwrd( args, 3 )

  r = subwrd( args, 4 )
  g = subwrd( args, 5 )
  b = subwrd( args, 6 )

*** gray (default) ***
  if( r = "" | g = "" | b = "" )
    r = 211
    g = 211
    b = 211
  endif

  'set rgb 90 'r' 'g' 'b

  'set gxout shaded'
  'set clevs 'min' 'max
  'set ccols 0 90 0'
  'd 'var

return


*
* help
*
function help()
  say ' Name:'
  say '   shade '_version' - draw shade'
  say ' '
  say ' Usage:'
  say '   shade var min max [r/211] [g/211] [b/211]'
  say ''
  say '     var : variable'
  say '     min : minimum value'
  say '     max : maximum value'
  say '     r   : shade color(red)'
  say '     g   : shade color(green)'
  say '     b   : shade color(blue)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   If (r,g,b) is not specified, the color of shade is set to grey'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
