*
* help is in the end of this script
*
function setfont( args )
  _version = '0.02r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  angle = 0
  base  = 'c'
  color = 1

***** Arguement *****
  type = subwrd(args,1)
  i = 2
  arg = "dummy"
  while( arg != "" )
    arg = subwrd( args, i )
    i = i + 1

    if( arg = "-angle" ) ; angle = subwrd( args, i ) ; i = i + 1 ; endif
    if( arg = "-base"  ) ; base  = subwrd( args, i ) ; i = i + 1 ; endif
    if( arg = "-color" ) ; color = subwrd( args, i ) ; i = i + 1 ; endif
  endwhile


  if( type = "tiny" )
    width = 0.09
    height = 0.09
    thickness = 2.7
  endif

  if( type = "small" )
    width = 0.12
    height = 0.12
    thickness = 3.6
  endif

  if( type = "normal" )
    width = 0.15
    height = 0.15
    thickness = 4.5
  endif

  if( type = "large" )
    width = 0.20
    height = 0.20
    thickness = 6.0
  endif

  if( type = "huge" )
    width = 0.30
    height = 0.30
    thickness = 9.0
  endif

  pt = strrep( type, 'pt', '' )
  if( type != pt )
    width  = pt / 72.0
    height = width
    thickness = math_int( width * 30 )
    if( thickness > 12 ) ; thickness = 12 ; endif
  endif

  'set strsiz 'width' 'height
  'set string 'color' 'base' 'thickness' 'angle

return


*
* help
*
function help()
  say ' Name:'
  say '   setfont '_version' - Set font property'
  say ' '
  say ' Usage:'
  say '   setfont size [-angle angle] [-base string-base]'
  say ''
  say '     size              : tiny, small, normal, large, huge, or e.g., 10pt '
  say '     -angle angle      : string angle (0<=angle<360)'
  say '     -base string-base : string base (c, tl, bc, etc...), default=c'
  say '     -color color-num  : color number'
  say ''
  say ' Note:'
  say '     [arg-name]       : specify if needed'
  say '     (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
