*
* Help is in the end of this script.
*
function saveanim( args )
  _version = '0.01r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  var     = ''
  head    = ''
  type    = 'gifanim'
  fps     = 5
  density = 'low'
  size    = 'medium'

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-density' ) ; density = subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-fps'     ) ; fps     = subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-size'    ) ; size    = subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-type'    ) ; type    = subwrd(args,i) ; i=i+1 ; break ; endif

      if( arg = '-hh'               ) ; size = 'huge'   ; density = 'high' ; break ; endif
      if( arg = '-hl' | arg = '-lh' ) ; size = 'large'  ; density = 'high' ; break ; endif
      if( arg = '-hn' | arg = '-nh' ) ; size = 'normal' ; density = 'high' ; break ; endif
      if( arg = '-hs' | arg = '-sh' ) ; size = 'small'  ; density = 'high' ; break ; endif

***
      if( var = '' )
        var = arg
        break
      endif

      if( var != '' & head = '' )
        head = arg
        break
      endif

      say 'syntax error: 'arg
      return
    endwhile

  endwhile

*  var  = subwrd( args, 1 )
*  head = subwrd( args, 2 )
  if( head = '' ) ; head = 'anim_' % var ; endif

***
  tmin = qdims( 'tmin' )
  tmax = qdims( 'tmax' )

* save color table
  gxinfo = qgxinfo('last')
  if( gxinfo = 'Shaded2' | gxinfo = 'GrFill' )
    'q shades'
    shdinfo = result
    cnum = subwrd( shdinfo, 5 )
    ccols = ''
    clevs = ''
    i = 1
    while( i <= cnum )
      rec = sublin( shdinfo, i+1 )
      ccols = ccols % ' ' % subwrd( rec, 1 )
      if( i = cnum ) ; break ; endif
      clevs = clevs % ' ' % subwrd( rec, 3 )
      i = i + 1
    endwhile
  endif

  file_list = ''

  t = tmin
  while( t <= tmax )
    'set t 't
    file = head % '_' % printf( '%05d', t ) % '.png'
    say file

    'c'
    'set grads off'
    if( gxinfo = 'Shaded2' | gxinfo = 'GrFill' )
      'set clevs 'clevs
      'set ccols 'ccols
    endif
    'd 'var
    'draw title 't2time(t)
    gxinfo = qgxinfo('last')
    if( gxinfo = 'Shaded2' | gxinfo = 'GrFill' )
      'xcbar -line on -edge triangle'
    endif
    'save -density 'density' -size 'size' 'file
    file_list = file_list % ' ' % file
    t = t + 1
  endwhile

  if( type = 'gifanim' )
    delay = 100 / fps
    prex( '!convert -delay 'delay' 'file_list' 'head'.gif' )
  endif

  'set t 'tmin' 'tmax
return

*
* help
*
function help()
  say ' Name:'
  say '   saveanim '_version' - Save animation as gif format or separate png files.'
  say ' '
  say ' Usage:'
  say '   saveanim var-exp [fhead]'
  say '            [-type type]'
  say '            [-fps fps]'
  say '            [-density ] [-size size]'
  say '            [-hh|-lh|-hl|-nh|-hn|-sh|-hs]'
  say ''
  say '     var-exp   : Expression'
  say '     fhead     : Header of filename (before extension)'
  say '     type      : Output file type. "gifanim" or "png". Default="gifanim".'
  say '     fps       : Flame per second for animation. Default=5'
  say '     density   : Quality of rendering from eps to png. Default="low"'
  say '     size      : Size of png. Default="normal"'
  say '     -hh       : Same as "-size huge   -density high"'
  say '     -lh | -hl : Same as "-size large  -density high"'
  say '     -nh | -hn : Same as "-size normal -density high"'
  say '     -sh | -hs : Same as "-size small  -density high"'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   This function uses save.gs and ImageMagic.'
  say ''
  say ' Copyright (C) 2019-2022 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return

  fps     = 5
  density = 'low'
  size    = 'medium'
