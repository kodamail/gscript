*
* Help is in the end of this script.
*
function shade( args )
  _version = '0.02r1'

  if( args = '' )
    help()
    return
  endif

  var = subwrd( args, 1 )

  min = subwrd( args, 2 )
  max = subwrd( args, 3 )
  if( min = '-min' )
    min = max
    max = 1e+30
  endif
  if( min = '-max' )
    min = -1e+30
  endif

  r = subwrd( args, 4 )
  g = subwrd( args, 5 )
  b = subwrd( args, 6 )

*** gray (default) ***
  if( r = "" | g = "" | b = "" )
    r = 211
    g = 211
    b = 211
  endif

  'set rgb 90 'r' 'g' 'b' 255'
  'set rgb 91 255 255 255 0'

  'set gxout shaded'
  'set clevs 'min' 'max
*  'set ccols 0 90 0'
  'set ccols 91 90 91'
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
  say '   shade '
  say '     var (min max | -min min | -max max)'
  say '     [r g b]'
  say ''
  say '     var : Variable name.'
  say '     min : Minimum value of the region to shade.'
  say '     max : Mamimum value of the region to shade.'
  say '     r   : RGB value (red) of the color for shading. Default value is 211.'
  say '     g   : RGB value (green) of the color for shading. Default value is 211.'
  say '     b   : RGB value (blue) of the color for shading. Default value is 211.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   If (r,g,b) is not specified, the color of shade is set to gray'
  say ''
  say ' Copyright (C) 2009-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
