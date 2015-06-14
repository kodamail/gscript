*
* Help is in the end of this script
*
function tbox( args )
  _version = '0.01b2'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

  sw = subwrd( args, 1 )

********** start **********
  if( sw = 'start' )
    xstart = subwrd( args, 2 )
    ystart = subwrd( args, 3 )

*   start position
    rc = setstr( gstboxxstart, xstart )
    rc = setstr( gstboxystart, ystart )

*   current position
    x = xstart
    y = ystart
    rc = setstr( gstboxx, x )
    rc = setstr( gstboxy, y )
  endif

********** draw **********
  if( sw = 'draw' )
*    str = subwrd( args, 2 )
    len = math_strlen( args )
    str = substr( args, 6, len-5 )
*    say '"' % args % '"'
*    say '"' % str % '"'

    x = getstr( gstboxx )
    y = getstr( gstboxy )

    'draw string 'x' 'y' 'str

    'q string 'str
    width = subwrd( result, 4 )
    x = x + width
    rc = setstr( gstboxx, x )
  endif

********** enter **********
  if( sw = 'enter' )
    yint = subwrd( args, 2 )

    xstart = getstr( gstboxxstart )
    y      = getstr( gstboxy )

    x = xstart
    y = y - yint
    rc = setstr( gstboxx, x )
    rc = setstr( gstboxy, y )
  endif

return


*
* help
*
function help()
  say ' Name:'
  say '   tbox '_version' - draw string using text-box'
  say ' '
  say ' Usage 1 (create text-box):'
  say '   tbox start xpos ypos '
  say ' '
  say ' Usage 2: (draw string)'
  say '   tbox draw string'
  say ' '
  say ' Usage 3: (return)'
  say '   tbox enter yint'
  say ''
  say '     xpos, ypos  : starting position'
  say '     string      : string to draw'
  say '     yint        : vertical interval'
  say ''
  say ' Copyright (C) 2010 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
