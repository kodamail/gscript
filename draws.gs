*
* Help is in the end of this script
*
function draws(args)
  _version='0.05r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  pos     = 'tc'
  base    = 'none'
  xoffset = 0
  yoffset = 0
  color   = 1
  setfont = ''
  angle   = ''
  by      = 'figure'
  x       = -1
  y       = -1

***** Arguement *****
  i=1
  flag=0
  while(1)
    arg = subwrd(args,i)
    i = i + 1
    if( arg = '' ); break; endif

    while(1)
*** option
      if( arg = '-angle'   ) ; angle   = subwrd(args,i); i=i+1; break; endif
      if( arg = '-base'    ) ; base    = subwrd(args,i); i=i+1; break; endif
      if( arg = '-color'   ) ; color   = subwrd(args,i); i=i+1; break; endif
      if( arg = '-pos'     ) ; pos     = subwrd(args,i); i=i+1; break; endif
      if( arg = '-setfont' ) ; setfont = subwrd(args,i); i=i+1; break; endif
      if( arg = '-xoffset' | arg = '-xo' ) ; xoffset = subwrd(args,i); i=i+1; break; endif
      if( arg = '-yoffset' | arg = '-yo' ) ; yoffset = subwrd(args,i); i=i+1; break; endif
      if( arg = '-by'      )
        by = subwrd(args,i)
        i=i+1
        if( by = 'xy' | by = 'grid' | by = 'world' )
          x = subwrd(args,i) ; i=i+1
          y = subwrd(args,i) ; i=i+1
        endif
        break
      endif

      flag = 1
      i = i - 1
      break;
    endwhile

    if( flag = 1 ); break; endif

  endwhile

*** string
  start=0
  end=math_strlen(args)
* order of the word
  word=0
* previous character (0:space 1:word)
  pre=0

  while( start < end )
    start = start + 1

    c = substr(args, start, 1)
    if( c != ' ' & pre = 0 )
      word = word + 1
      pre = 1
    else
      if( c = ' ' & pre = 1 )
        pre = 0
      endif
    endif

    if( word = i ) ; break; endif

  endwhile

  str = substr(args, start, end-start+1)

****************************************
* case 1: relative to figure
****************************************
  if( by = 'figure' )

***** Parameter adjust *****
    if( base = 'none' )
      if( pos = 'tc' ); base = 'bc'; endif
      if( pos = 'bc' ); base = 'tc'; endif
      if( pos = 'tl' ); base = 'bl'; endif
      if( pos = 'bl' ); base = 'tl'; endif
      if( pos = 'tr' ); base = 'br'; endif
      if( pos = 'br' ); base = 'tr'; endif
      if( pos = 'l' );  base = 'r'; endif
      if( pos = 'r' );  base = 'l'; endif
    endif
***** TODO: Parameter check *****

***** Get gxinfo *****
*    'q gxinfo'
*    temp = sublin(result, 3)
*    xmin = subwrd(temp, 4)
*    xmax = subwrd(temp, 6)
*    temp = sublin(result, 4)
*    ymin = subwrd(temp, 4)
*    ymax = subwrd(temp, 6)
    xmin = qgxinfo( 'xmin' )
    xmax = qgxinfo( 'xmax' )
    ymin = qgxinfo( 'ymin' )
    ymax = qgxinfo( 'ymax' )

    if( pos = 'tc' )
      x = xmin + 0.5 * (xmax - xmin) + xoffset
      y = ymax + 0.1 + yoffset
    endif
    if( pos = 'bc' )
      x = xmin + 0.5 * (xmax - xmin) + xoffset
      y = ymin - 0.1 + yoffset
    endif
    if( pos = 'tl' )
      x = xmin + xoffset
      y = ymax + 0.1 + yoffset
    endif
    if( pos = 'bl' )
      x = xmin + xoffset
      y = ymin - 0.1 + yoffset
    endif
    if( pos = 'tr' )
      x = xmax + xoffset
      y = ymax + 0.1 + yoffset
    endif
    if( pos = 'br' )
      x = xmax + xoffset
      y = ymin - 0.1 + yoffset
    endif
    if( pos = 'l' )
      x = xmin - 0.1 + xoffset
      y = ymin + 0.5 * ( ymax - ymin ) + yoffset
    endif
    if( pos = 'r' )
      x = xmax + 0.1 + xoffset
      y = ymin + 0.5 * ( ymax - ymin ) + yoffset
    endif
  endif

****************************************
  if( by != 'figure' )
    if( base = 'none' ) ; base = '' ; endif
  endif

****************************************
* case 2: xy
****************************************
  if( by = 'xy' )
    x = x + xoffset
    y = y + yoffset
  endif

****************************************
* case 3: world
****************************************
  if( by = 'world' )
    xy = qw2xy( x, y )
    x = subwrd( xy, 1 ) + xoffset
    y = subwrd( xy, 2 ) + yoffset
  endif

****************************************
* case 4: grid
****************************************
  if( by = 'grid' )
    xy = qgr2xy( x, y )
    x = subwrd( xy, 1 ) + xoffset
    y = subwrd( xy, 2 ) + yoffset
  endif

***** draw *****
  if( angle = '' )
    'set string 'color' 'base
  else
    'set string 'color' 'base'  3 'angle
  endif
  if( setfont != "" )
    if( angle = '' )
      'setfont 'setfont' -base 'base
    else
      'setfont 'setfont' -base 'base' -angle 'angle
    endif
  endif
  'draw string 'x' 'y' 'str

return

*
* help
*
function help()
  say ' Name:'
  say '   draws '_version' - draw string at the position specified relative to the figure'
  say ' '
  say ' Usage:'
  say '   draws'
  say '     ([-by figure] [-pos position] [-base base]'
  say '     | -by (world | grid | xy) xpos ypos)'
  say '     [(-xoffset | -xo) xoffset] [(-yoffset | -yo) yoffset]'
  say '     [-color color] [-setfont size] [-angle angle]'
  say '     string'
  say ' '
  say '     -by : Coordinate type'
  say '         figure : relative to figure (default)'
  say '         world  : world coordinate (e.g. lat)'
  say '         grid   : grid coordinate (grid number)'
  say '         xy     : same as "draw line"'
  say '     position    : Position to draw string. Default value is "tc".'
  say '                   tc: top center,  bc: buttom center,'
  say '                   tl: top left,    bl: buttom left,'
  say '                   tr: top right,   br: buttom right,'
  say '                    l:left,          r: right'
  say '     base        : Base position of the string.'
  say '                   How to specify is same as position.'
  say '     xpos, ypos  : positions'
  say '     xoffset     : Horizontal offset. Default value is 0.'
  say '     yoffset     : Vertical offset. Default value is 0.'
  say '     color       : Font color. Default value is 1.'
  say '     size        : Size for setfont.gs.'
  say '     angle       : Rotation angle of string in degree. Default value is 0.'
  say '     string      : String to draw. Specify it as the last option.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009-2019 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
