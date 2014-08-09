function shift( args )
  _version = '0.01b1'
  rc = gsfallow("on")

 if( args = '' )
    help()
    return
  endif

***** Default value *****
  xshift = 0
  yshift = 0
  xcyc = 0
  ycyc = 0
  xrev = 0
  yrev = 0

  vorg = ''
  vnew = ''

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-xcyc'    ) ; xcyc = 1 ; break ; endif
      if( arg = '-ycyc'    ) ; ycyc = 1 ; break ; endif
      if( arg = '-xrev'    ) ; xrev = 1 ; break ; endif
      if( arg = '-yrev'    ) ; yrev = 1 ; break ; endif
      if( arg = '-xshift'  ) ; xshift=subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-yshift'  ) ; yshift=subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-xyshift' )
        xshift = subwrd(args,i)
        i = i + 1
        yshift = subwrd(args,i)
        i = i + 1
        break
      endif

*** vorg, vnew
      if( vorg = '' )
        vorg = arg
        break
      endif
      if( vnew = '' )
        vnew = arg
        break
        endif

      say 'syntax error: 'arg
      return

    endwhile
  endwhile

  xmin = qdims( xmin )
  xmax = qdims( xmax )
  xdef = xmax - xmin + 1
  ymin = qdims( ymin )
  ymax = qdims( ymax )
  ydef = ymax - ymin + 1

  'q undef'
  undef = subwrd( result, 7 )

  vnew' = maskout('vorg',-1)'

  y = ymin
  while( y <= ymax )
    x = xmin
    while( x <= xmax )

      xnew = x + xshift
      ynew = y + yshift
      if( xrev = 1 ) ; xnew = xmax - ( xnew - xmin ) ; endif
      if( yrev = 1 ) ; ynew = ymax - ( ynew - ymin ) ; endif

      if( xcyc = 1 & xnew < xmin ) ; xnew = xnew + xdef ; endif
      if( xcyc = 1 & xnew > xmax ) ; xnew = xnew - xdef ; endif
      if( ycyc = 1 & ynew < ymin ) ; ynew = ynew + ydef ; endif
      if( ycyc = 1 & ynew > ymax ) ; ynew = ynew - ydef ; endif

      if( xnew >= xmin & xnew <= xmax & ynew >= ymin & ynew <= ymax )
        'set x 'x
        'set y 'y
        'd 'vorg
        tmpvorg = subwrd( result, 4 )
        if( tmpvorg != undef )
          'set defval 'vnew' 'xnew' 'ynew' 'tmpvorg
        endif
      endif

      x = x + 1  
    endwhile
    y = y + 1  
  endwhile

  'set x 'xmin' 'xmax
  'set y 'ymin' 'ymax
return


*
* help
*
function help()
  say ' Name:'
  say '   shift '_version' - horizontally shift values of variable'
  say ' '
  say ' Usage:'
  say '   shift vorg vnew'
  say '         [-xshift xshift]'
  say '         [-yshift yshift]'
  say '         [-xyshift xshift yshift]'
  say '         [-xcyc]'
  say '         [-ycyc]'
  say ''
  say '     vorg             : original variable name'
  say '     vnew             : converted variable name'
  say '     xshift/yshift    : shift in x/y direction'
  say '     -xcyc, -ycyc     : specify if x/y is cyclic'
  say '     -xrev, -yrev     : reverse x/y AFTER shifting'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2012-2012 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
