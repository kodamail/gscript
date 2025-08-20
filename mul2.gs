*
* Help is in the end of this script.
*
function mul2( args )
  _version = '0.01b1'

  if( args = '' )
    help()
    return
  endif

*** argument ***
  imax = subwrd( args, 1 )
  jmax = subwrd( args, 2 )
  ipos = subwrd( args, 3 )
  jpos = subwrd( args, 4 )

***** get real page *****
  'set vpage off'
  if( imax = 1 & jmax = 1 ) ; return ; endif
  'q gxinfo'
  temp = sublin( result, 2 )
  vpagex = subwrd( temp, 4 )
  vpagey = subwrd( temp, 6 )

  xmin = ( vpagex / imax ) * ( ipos - 1 )
  xmax = ( vpagex / imax ) * ( ipos )
  ymin = ( vpagey / jmax ) * ( jpos - 1 )
  ymax = ( vpagey / jmax ) * ( jpos )
  'set vpage 'xmin' 'xmax' 'ymin' 'ymax

  'set grads off'
return


*
* help
*
function help()
  say ' Name:'
  say '   mul2 '_version' - set multi-virtual window'
  say ' '
  say ' Usage:'
  say '   mul2 imax jmax ipos jpos'
  say ''
  say '     imax      : Number of horizontal windows.'
  say '     jmax      : Number of vertical windows'
  say '     ipos      : Horizontal position (count from left window)'
  say '     jpos      : Vertical position (count from bottom window)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2015-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
