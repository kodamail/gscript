*
* Help is in the end of this script
*
function drawline( args )
  _version = '0.01r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

  'drawpoly opened 'args

return


*
* help
*
function help()
  say ' Name:'
  say '   drawline '_version' - draw polygon'
  say ' '
  say ' Usage:'
  say '   drawpoly [ -by ( world | grid | xy ) ] x1 y1 x2 y2 ...'
  say ' '
  say ''
  say '     -by : unit of p1, q1, p2, q2'
  say '         world : world coordinate (e.g. lat)'
  say '         grid  : grid coordinate (grid number)'
  say '         xy    : same as "draw line"'
  say ''
  say '     x1, y1, ... : positions'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2016 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
