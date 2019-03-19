*
* Help is in the end of this script.
*
function saveanim( args )
  _version = '0.01b1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

*** arguements ***
  var  = subwrd( args, 1 )
  head = subwrd( args, 2 )
  if( head = '' ) ; head = 'anim_' % var ; endif

  fps = 5

***
  tmin = qdims( 'tmin' )
  tmax = qdims( 'tmax' )

  file_list = ''

  t = tmin
  while( t <= tmax )
    'set t 't
    file = head % '_' % printf( '%05d', t ) % '.png'
    say file

    'c'
    'set grads off'
    'd 'var
    'draw title 't2time(t)
    gxinfo = qgxinfo('last')
    if( gxinfo = 'Shaded2' | gxinfo = 'GrFill' )
      'xcbar -line on -edge triangle'
    endif
    'save -density low -size normal 'file
    file_list = file_list % ' ' % file
    t = t + 1
  endwhile

  delay = 100 / fps
*  prex( '!convert -layers optimize -delay 'delay' 'head'*.png 'head'.gif' )
*  prex( '!convert -layers optimize -delay 'delay' 'file_list' 'head'.gif' )
  prex( '!convert -delay 'delay' 'file_list' 'head'.gif' )
  'set t 'tmin' 'tmax
exit

return

*
* help
*
function help()
  say ' Name:'
  say '   saveanim '_version' - Save animation as gif format.'
  say ' '
  say ' Usage:'
  say '   saveanim var-exp [file-head]'
  say ''
  say '     var-exp   : expression'
  say '     file-head : filename before'
  say '       (ex. file-head=test -> save as test.eps)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   This function uses gxeps command.'
  say ''
  say ' Copyright (C) 2019-2019 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
