*
* Help is in the end of this script
*
function draws(args)

  _version='0.02r2'

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  pos = 'tc'
  base = 'none'
  xoffset = 0
  yoffset = 0
  color = 1

***** Arguement *****
  i=1
  flag=0
  while(1)
    arg = subwrd(args,i)
    i = i + 1
    if( arg = '' ); break; endif

    while(1)
*** option
      if( arg = '-base' )    ; base  = subwrd(args,i); i=i+1; break; endif
      if( arg = '-color' )   ; color = subwrd(args,i); i=i+1; break; endif
      if( arg = '-pos' )     ; pos   = subwrd(args,i); i=i+1; break; endif
      if( arg = '-xoffset' | arg = '-xo' ) ; xoffset = subwrd(args,i); i=i+1; break; endif
      if( arg = '-yoffset' | arg = '-yo' ) ; yoffset = subwrd(args,i); i=i+1; break; endif

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
'q gxinfo'
temp = sublin(result, 3)
xmin = subwrd(temp, 4)
xmax = subwrd(temp, 6)
temp = sublin(result, 4)
ymin = subwrd(temp, 4)
ymax = subwrd(temp, 6)

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

***** draw *****
'set string 'color' 'base
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
  say '   draws [-pos position] [-base base] [-xoffset xoffset] [-yoffset yoffset] [-color color] string'
  say ' '
  say '     position    : position to draw string (default: tc)'
  say '                   tc: top center,  bc: buttom center,'
  say '                   tl: top left,    bl: buttom left,'
  say '                   tr: top right,   br: buttom right,'
  say '                    l:left,          r: right'
  say '     base        : base position of the string (default: bc if position=tc) '
  say '                   how to specify is same as -pos'
  say '     xoffset     : horizontal offset (default: 0)'
  say '     yoffset     : vertical offset (default: 0)'
  say '     color       : font color (default: 1)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
