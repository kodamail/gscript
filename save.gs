*
* Help is in the end of this script.
*
function save( args )
  _version = '0.04r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  fhead      = ''
  background = 'white'
  density    = 'low'
  size       = 'normal'

***** Arguements *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif
    while( 1 )
*** option
      if( arg = '-background' )  ; background = subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-density'    )  ; density    = subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-size'       )  ; size       = subwrd(args,i) ; i=i+1 ; break ; endif

      if( arg = '-hh'               )  ; size = 'huge'   ; density = 'high'   ; break ; endif
      if( arg = '-lh' | arg = '-hl' )  ; size = 'large'  ; density = 'high'   ; break ; endif
      if( arg = '-nh' | arg = '-hn' )  ; size = 'normal' ; density = 'high'   ; break ; endif
      if( arg = '-sh' | arg = '-hs' )  ; size = 'small'  ; density = 'high'   ; break ; endif

*** fhead
      if( fhead = '' ) ; fhead = arg ; break ; endif
      say 'syntax error: 'arg
      return
    endwhile
  endwhile

  if( background != 'white' & background != 'black' )
    say 'error: background = ' % background % ' is not supported'
    exit
  endif

* quality of rendering
  if( density = 'low'    ) ; density =  150 ; endif
  if( density = 'normal' ) ; density =  300 ; endif
  if( density = 'high'   ) ; density =  600 ; endif
  if( density = 'print'  ) ; density = 1200 ; endif

  if( size = 'small'  ) ; size = '400x400'   ; endif
  if( size = 'normal' ) ; size = '800x800'   ; endif
  if( size = 'large'  ) ; size = '1600x1600' ; endif
  if( size = 'huge'   ) ; size = '3200x3200' ; endif

***** *****
  len = math_strlen( fhead )
  ext = substr( fhead, len-3, 4 )

  fname = ''
  if( ext = '.png' )
    fname = fhead
    fhead = substr( fhead, 1, len-4 )
  endif
  if( ext = '.eps' )
    fhead = substr( fhead, 1, len-4 )
    fname = fhead % '.eps'
  endif
  if( fname = '' )
    ext = '.eps'
    fname = fhead % '.eps'
  endif


***** png *****
  if( ext = '.png' )

*   This version (v2.1.0) seems to have a bug in printim.
*    if( gradsver( 'v2.1.0' ) = 0 )
      eps   = fhead % '_tmp.eps'
      temp1 = fhead % '_tmp1.png'
      temp2 = fhead % '_tmp2.png'
      'save 'fhead'_tmp -background 'background
      '!convert -rotate 90 +antialias -depth 8 -define png:bit-depth=8 -density 'density' -resize 'size' 'eps' 'temp1
      '!convert -fill 'background' -draw "rectangle 0,0,10000,10000" 'temp1' 'temp2
      '!composite 'temp1' 'temp2' 'fname
      '!rm 'eps' 'temp1' 'temp2

*    else

*      'printim 'fname' 'background

*    endif
  endif

***** eps *****
  if( ext = '.eps' )

    if( gradsver( 'v2.1.a1' ) = 1 )
      'gxprint 'fhead'.eps 'background

    else
      'enable print 'fhead'.gmf'
      'print'
      'disable'
      opt = ''
      if( background = 'black' )
        opt = '-r'
      endif
      '!gxeps -c 'opt' -i 'fhead'.gmf -o 'fhead'.eps'
      '!rm -f 'fhead'.gmf'
    endif
  endif

return

*
* help
*
function help()
  say ' Name:'
  say '   save '_version' - Save image as eps/png format.'
  say ' '
  say ' Usage(1):'
  say '   save file-head'
  say ''
  say '     file-head : filename before .eps'
  say '       (ex. file-head=test -> save as test.eps)'
  say ''
  say ' Usage(2):'
  say '   save filename [-background ("white"|"black")]'
  say '                 [-density ("low"|"normal"|"high"|"print"|density)]'
  say '                 [-size ("small"|"normal"|"large"|"huge"|size)]'
  say '                 [-hh|-lh|-hl|-nh|-nl|-sh|-hs]'
  say ''
  say '     filename   : Filename ending with .eps or .png'
  say '     background : Background color. Default="white"'
  say '     density    : Quality of rendering from eps to png. Default="low"'
  say '     size       : Size of png. Default="normal"'
  say '     -hh       : same as "-size huge   -density high"'
  say '     -lh | -hl : same as "-size large  -density high"'
  say '     -nh | -hn : same as "-size normal -density high"'
  say '     -sh | -hs : same as "-size small  -density high"'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   This function uses ImageMagick and gxeps commands.'
  say ''
  say ' Copyright (C) 2009-2019 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
