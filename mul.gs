*
* Help is in the end of this script.
*
function mul(args)
  _version='0.05r2'

  if( args = '' )
    help()
    return
  endif

*** arguement ***
  imax = subwrd( args, 1 )
  jmax = subwrd( args, 2 )
  ipos = subwrd( args, 3 )
  jpos = subwrd( args, 4 )


  xoffset = 0
  yoffset = 0
  novpage = 0
  xini    = "none"
  xwid    = "none"
  xint    = "none"
  yini    = "none"
  ywid    = "none"
  yint    = "none"

  i = 5
  arg = "dummy"
  while( arg != "" )
    arg = subwrd( args, i )
    i = i + 1

    if( arg = "-xoffset" )
      xoffset = subwrd( args, i )
      i = i + 1
    endif
    if( arg = "-yoffset" )
      yoffset = subwrd( args, i )
      i = i + 1
    endif
    if( arg = "-xini" )
      xini = subwrd( args, i )
      i = i + 1
    endif
    if( arg = "-xwid" )
      xwid = subwrd( args, i )
      i = i + 1
    endif
    if( arg = "-xint" )
      xint = subwrd( args, i )
      i = i + 1
    endif
    if( arg = "-yini" )
      yini = subwrd( args, i )
      i = i + 1
    endif
    if( arg = "-ywid" )
      ywid = subwrd( args, i )
      i = i + 1
    endif
    if( arg = "-yint" )
      yint = subwrd( args, i )
      i = i + 1
    endif

  endwhile


***** get real page *****
  'q gxinfo'
  temp = sublin( result, 2 )
  vpagex = subwrd( temp, 4 )
  vpagey = subwrd( temp, 6 )


***** set default value (landscape) *****

***** imax *****
*** 1 ***
  xini.1 = 1.0
  xwid.1 = 9.5
  xint.1 = 0.0

*** 2 ***
  xini.2 = 1.0
  xwid.2 = 4.5
  xint.2 = 0.5

*** 3 ***
  xini.3 = 1.0
  xwid.3 = 3.0
  xint.3 = 0.4

*** 4 ***
  xini.4 = 0.4
  xwid.4 = 2.3
  xint.4 = 0.4

*** 5 ***
  xini.5 = 0.9
  xwid.5 = 1.9
  xint.5 = 0.1


***** jmax *****
*** 1 ***
  yini.1 = 1.0
  ywid.1 = 7.0
  yint.1 = 0.0

*** 2 ***
  yini.2 = 1.0
  ywid.2 = 3.0
  yint.2 = 1.0

*** 3 ***
  yini.3 = 0.8
  ywid.3 = 2.0
  yint.3 = 0.5

*** 4 ***
  yini.4 = 0.6
  ywid.4 = 1.5
  yint.4 = 0.4

*** 5 ***
  yini.5 = 0.6
  ywid.5 = 1.4
  yint.5 = 0.1



***** set default value (portrait) *****
  if( vpagex = 8.5 & vpagey = 11 )
    k = 1
    while( k <= 5 )
      ini = xini.k
      wid = xwid.k
      int = xint.k
      xini.k = yini.k
      xwid.k = ywid.k
      xint.k = yint.k
      yini.k = ini
      ywid.k = wid
      wint.k = int
      k = k + 1
    endwhile

  endif



***** set xini, xwid, etc *****
  if( xini = "none" ) ; xini = xini.imax ; endif
  if( xwid = "none" ) ; xwid = xwid.imax ; endif
  if( xint = "none" ) ; xint = xint.imax ; endif

  if( yini = "none" ) ; yini = yini.jmax ; endif
  if( ywid = "none" ) ; ywid = ywid.jmax ; endif
  if( yint = "none" ) ; yint = yint.jmax ; endif



***** set parea *****
  xmin = xini + (xwid + xint) * (ipos-1) + xoffset
  xmax = xini + (xwid + xint) * (ipos-1) + xwid + xoffset
  ymin = yini + (ywid + yint) * (jpos-1) + yoffset
  ymax = yini + (ywid + yint) * (jpos-1) + ywid + yoffset

  say 'set parea (by mul) -> xmin='xmin' xmax='xmax' ymin='ymin' ymax='ymax
  if( novpage = 0 )
    'set vpage 0 'vpagex' 0 'vpagey
  endif
  'set parea 'xmin' 'xmax' 'ymin' 'ymax

return



*
* help
*
function help()
  say ' Name:'
  say '   mul '_version' - set multi-window'
  say ' '
  say ' Usage:'
  say '   mul imax jmax ipos jpos'
  say '       [-xoffset value/0] [-yoffset value/0] [-novpage]'
  say '       [-xini value] [-xwid value] [-xint value]'
  say '       [-yini value] [-ywid value] [-yint value]'
  say ''
  say '     imax      : number of window horizontally ( 1<= imax <= 5 )'
  say '     jmax      : number of window vertically ( 1<= jmax <= 5 )'
  say '     ipos      : horizontal position (count from left window)'
  say '     jpos      : vertical position (count from bottom window)'
  say '     xoffset   : offset of horizontal position'
  say '     yoffset   : offset of vertical position'
  say '     novpage   : avoid "set vpage"'
  say '     xini,yini : lower-left position when "mul ? ? 1 1"'
  say '     xwid,ywid : width of figure'
  say '     xint,yint : interval of figures'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
