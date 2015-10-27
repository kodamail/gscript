*
* Help is in the end of this script.
*
function save( args )
  _version = '0.03r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

*** arguements ***
  fhead = subwrd( args, 1 )

  if( gradsver( 'v2.1.a1' ) = 1 )
    'gxprint 'fhead'.eps white'

  else
    'enable print 'fhead'.gmf'
    'print'
    'disable'
    '!gxeps -c -i 'fhead'.gmf -o 'fhead'.eps'
    '!rm -f 'fhead'.gmf'
  endif

return

*
* help
*
function help()
  say ' Name:'
  say '   save '_version' - Save image as eps format.'
  say ' '
  say ' Usage:'
  say '   save file-head'
  say ''
  say '     file-head : filename before'
  say '       (ex. file-head=test -> save as test.eps)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   This function uses gxeps command.'
  say ''
  say ' Copyright (C) 2009-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
