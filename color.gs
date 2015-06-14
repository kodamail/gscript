*
* Help is in the end of this script
*
function color( args )
 _version = '0.07r3'

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  gxout  = 'shaded'
  kind   = 'blue->white->red'
  sample = 0
  var    = 'none'
  min    = 'none'
  max    = 'none'
  int    = 'none'
  div    = 10
  levs   = ''
  xcbar  = 'none'
  retflag = 0
  _verbose = 0

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-gxout' ) ; gxout=subwrd(args,i) ; i=i+1 ; break ; endif
      if( arg = '-kind' )  ; kind=subwrd(args,i)  ; i=i+1 ; break ; endif
      if( arg = '-div' )   ; div=subwrd(args,i)   ; i=i+1 ; break ; endif
      if( arg = '-sample' ); sample=1 ; break     ; endif
      if( arg = '-ret' )   ; retflag=1 ; break    ; endif
      if( arg = '-var' )   ; var=subwrd(args,i)   ; i=i+1 ; break ; endif
      if( arg = '-verbose' | arg = '-v' ); _verbose=1 ; break     ; endif
      if( arg = '-levs' )
        while( 1 )
          arg = subwrd( args, i )
          if( valnum(arg) = 0 ) ; break ; endif
          levs = levs % ' ' % arg
          i = i + 1
        endwhile
        break
      endif

*** int, max, min
      if( valnum(arg) != 0 & min != 'none' & max != 'none' & int = 'none' )
        int = arg
        break
      endif
      if( valnum(arg) != 0 & min != 'none' & max = 'none' )
        max = arg
        break
        endif
      if( valnum(arg) != 0 & min = 'none' )
        min = arg
        break
      endif

      if( arg = '-xcbar' )
        xcbar = ''
        break        
      endif

      say 'syntax error: 'arg
      return

    endwhile

    if( xcbar = '' ) ; break; endif
  endwhile


  if( xcbar = '' )
    start = 0
    end   = math_strlen( args )
* order of the word
    word = 0
* previous character (0:space 1:word)
    pre = 0

    while( start < end )
      start = start + 1

      c = substr( args, start, 1 )
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

    xcbar = substr( args, start, end-start+1 )
  endif


***** Parameter adjust *****

*** var -> min, max, int
  if( var != 'none' & ( min = 'none' | max = 'none' ) )

*   get min & max value of the variable
    i = 1
    while( i <= 4 )
      'q dims'
      line = sublin( result, i+1 )
      name.i = subwrd( line, 1 )
      type.i = subwrd( line, 3 )
      if( type.i = 'varying' )
        min.i = subwrd( line, 11 )
        max.i = subwrd( line, 13 )
      else
        min.i = subwrd( line, 9 )
        max.i = subwrd( line, 9 )
      endif
      i = i + 1
    endwhile

    j = 1
    while( j <= 2 )
      head.j = ''
      tail.j = ''
      i = 1
      while( i <= 4 )
        if( j = 1 ) ; head.j = 'min( '  % head.j 
        else        ; head.j = 'max( '  % head.j ; endif
        tail.j = tail.j % ', ' % name.i % '=' % min.i % ', ' % name.i % '=' max.i % ' )'
        i = i + 1
      endwhile

      'd 'head.j' 'var' 'tail.j
      i = 1
      while( 1 )
        line = sublin( result, i )
        word = subwrd( line, 1 )
        if( word = 'Result' ) ; break ; endif
        if( word = '' ) ; exit ; endif
        i = i + 1
      endwhile
      val = subwrd( line, 4 )
*      say val
      
      if( j = 1 ) ; minval = val
      else        ; maxval = val ; endif

      j = j + 1
    endwhile

    if( minval = maxval )
      say 'Constant Field: ' % minval
      exit
    endif

*   determine contour interval following gagx.c, L5066
    rdif = ( maxval - minval ) / 10.0
    w2 = math_int( math_log10( rdif ) )
    w1 = math_pow( 10.0, w2 )
    norml = rdif / w1

    int = 0.0
    if( int = 0.0 & norml >= 1.0 & norml <= 1.5 ) ; int = 1.0 ; endif
    if( int = 0.0 & norml >  1.5 & norml <= 2.5 ) ; int = 2.0 ; endif
    if( int = 0.0 & norml >  2.5 & norml <= 3.5 ) ; int = 3.0 ; endif
    if( int = 0.0 & norml >  3.5 & norml <= 7.5 ) ; int = 5.0 ; endif
    if( int = 0.0 ) ; int = 10.0 ; endif
    int = int * w1
    min = int * math_int( minval / int + 1.0 )
    max = int * math_int( maxval / int )

    say 'min='min' max='max' int='int
  endif

*** min, max -> int
  if( min != 'none' & max != 'none' & int = 'none' )
    int = ( max - min ) / div
    say 'min='min' max='max' int='int
  endif

*** special kind
*  if( kind = 'bluered' ); kind='blue->white->red'; endif
*  if( kind = 'rainbow' ); kind='blue->aqua->lime->yellow->red'; endif
*  if( kind = 'redblue' ); kind='red->white->blue'; endif
*  if( kind = 'grainbow' ); kind='(160,0,200)->(110,0,220)->(30,60,255)->(0,160,255)->(0,200,200)->(0,210,140)->(0,220,0)->(160,230,50)->(230,220,50)->(230,175,45)->(240,130,40)->(250,60,60)->(240,0,130)'; endif

* replace special kind
  kind = spcol( kind )

***** Parameter check *****

  if( ( valnum(min)=0 | valnum(max)=0 | valnum(int)=0 ) & levs='' )
    say 'error in colog.gs: cannot determine color levels'
    return
  endif
  if( valnum(min)!=0 & valnum(max)!=0 & valnum(int)!=0 & levs!='' )
    say 'error in color.gs: multiple definition of color levels'
    return
  endif

*** gxout
  if( gxout != 'shaded' & gxout != 'contour' & gxout != 'grfill')
    say 'error in color.gs: 'gxout' not supported !'
    return
  endif


***** Calculate levels *****
  if( levs = '' )

*** get levs & colnum
    value = min
    colnum = 0
    levs = ''

    while( value <= max )
      levs = levs % ' ' % value
      value = value + int
      colnum = colnum + 1
    endwhile

  else

*** get colnum
    colnum = 0
    while( subwrd(levs,colnum+1) != '' )
      colnum = colnum + 1
    endwhile

  endif

*** get cols
  i = 1
  cols = ''
  while( i <= colnum )
    cols = cols % ' ' % (i+15)
    i = i + 1
  endwhile


**** one more color if gxout=shaded
  if( gxout = 'shaded' | gxout = 'grfill' )
    colnum = colnum + 1
    cols = cols % ' ' % (colnum+15)
  endif

***** Set levs/cols *****
  'set gxout 'gxout
  'set clevs 'levs
  'set ccols 'cols
  say 'clevs='levs
  say 'ccols='cols
  if( retflag = 1 )
    ret = 'clevs ' % levs
    ret = ret % ' ccols ' % cols
  endif
  ret = ret % ' rgb '


***** Define colors *****

*** analyze -kind
*   max    : number of color listed in -kind.
*   ncol.i : number of color between col.i and col.(i+1)
*            0 if no color exists between the two colors.
*            -1 if not specified (automatic).
    i = 1
    max = -999
    while( max != i-2 )
      col.i = getcol( kind,i )
*      say i % ': ' % col.i

      if( col.i = '' )
         max = i - 1
      else
*       get ncol.i if specified
        ncol.i = -1
        l = math_strlen( col.i )
        if( substr( col.i, l, 1 ) = ')' )
          ncol.i = ''
          l = l - 1
          while( substr( col.i, l, 1 ) != '(' & l > 1 )
            ncol.i = substr( col.i, l, 1 ) % ncol.i
            l = l - 1
          endwhile
          if( l = 1 )
            ncol.i = -1
          else
            col.i = substr( col.i, 1, l-2 )
          endif
        endif

      endif

      i = i + 1
    endwhile

*** define color
    max_ncol = max
    colnum_ncol = 0
    i = 1
    while( i <= max-1 )
*        say colnum_ncol
      if( ncol.i >= 0 )
        max_ncol = max_ncol - 1
        colnum_ncol = colnum_ncol + ncol.i + 1
      endif
      i = i + 1
    endwhile

*    say colnum
    i = 1
    while( i <= max-1 )
      if( ncol.i < 0 )
*        ncol.i = (colnum-1) / (max-1.0)-1
        ncol.i = (colnum-colnum_ncol-1) / (max_ncol-1.0)-1
      endif

*      say i % ' ' % ncol.i
      i = i + 1
    endwhile

    enum = 16
    i = 1
    while( i <= max-1 )
      ipp = i + 1
      scol = col.i
      ecol = col.ipp
      snum = enum
      enum = snum + ncol.i + 1
      if( i = max - 1 ) ; enum = 16 + colnum - 1 ; endif
*      say 'i=' % i
*      say snum' 'enum
      rgb = defcol( snum, scol, enum, ecol )
      ret = ret % rgb % ' '
      i = i + 1
    endwhile


***** display color sample *****
  if( sample = 1 )
    i = 0
    dx = 11.0 / colnum
    while( i < colnum )
     'set line 'i+16
      'draw recf 'i*dx' 4 'i*dx+dx' 5'
      i = i + 1
    endwhile
  endif


***** run xcbar.gs *****
  if( xcbar != 'none' )
    levcol = ''

    if( levs = '' )
      i = 1
      value = min

      while( i < colnum )
        levcol = levcol % ' ' % (i+15) % ' ' % value
        value = value + int
        i = i + 1
      endwhile
      levcol = levcol % ' ' % (i+15)

    else

      i = 1
      while( i < colnum )
        levcol = levcol % ' ' % (i+15) % ' ' % subwrd(levs,i)
        i = i + 1
      endwhile
      levcol = levcol % ' ' % (i+15)

    endif

    say '  -> xcbar 'xcbar' -levcol 'levcol
    'xcbar 'xcbar' -levcol 'levcol
  endif

  if( retflag = 1 )
    return ret
  endif


return


**********************************************
*
* replace special color in -kind 
*
*   kind : -kind parameter
*
**********************************************
function spcol( kind )
  length = math_strlen( kind );
  i = 1
  kind2 = ''
  coltemp = ''
  while( i <= length )
    c  = substr( kind, i, 1 )
    c2 = substr( kind, i+1, 1 )
    if( c%c2 = '->' | c%c2 = '-(' | c = '>' | c = '(' | c = ')' | i = length )
      if( i = length ) ; coltemp = coltemp % c ; c = '' ; endif

      if( coltemp = 'bluered' ) ; coltemp = 'blue->white->red' ; endif
      if( coltemp = 'rainbow' ) ; coltemp = 'blue->aqua->lime->yellow->red' ; endif
      if( coltemp = 'redblue' ) ; coltemp = 'red->white->blue' ; endif
      if( coltemp = 'grainbow') ; coltemp = '(160,0,200)->(110,0,220)->(30,60,255)->(0,160,255)->(0,200,200)->(0,210,140)->(0,220,0)->(160,230,50)->(230,220,50)->(230,175,45)->(240,130,40)->(250,60,60)->(240,0,130)' ; endif

      kind2 = kind2 % coltemp % c
      coltemp = ''
    else
      coltemp = coltemp % c
    endif

    i = i + 1
  endwhile
  say kind2
return ( kind2 )


**********************************************
*
* get color from -kind parameters
*
*   kind : -kind parameter
*   num  : order
*
**********************************************
function getcol( kind, num )
  ret = ''
  length = math_strlen( kind );

  order = 1
  i = 1
  while( i <= length )
    c  = substr( kind, i, 1 )
    c2 = substr( kind, i+1, 1 )

    if( c%c2 = '->' ); order=order+1; i=i+1;
    else
      if( order = num ); ret=ret%c; endif
    endif

    i = i + 1
  endwhile

return ( ret )




**********************************************
*
* define color
*
*   snum : start color number
*   scol : start color name
*   enum : end   color number
*   ecol : end   color name
*
**********************************************
function defcol( snum, scol, enum, ecol )
*  say snum'('scol') -> 'enum'('ecol')'
  diff = enum - snum
*  if( diff < 1.0 )
  if( diff <= 0.0 )
    return
  endif

*** set start & end color (rgb)
  sr = colornum( scol, 'r' )
  sg = colornum( scol, 'g' )
  sb = colornum( scol, 'b' )

  er = colornum( ecol, 'r' )
  eg = colornum( ecol, 'g' )
  eb = colornum( ecol, 'b' )

*** set initial color number (integer)
* e.g.,
*   i=16   -> 16
*   i=16.5 -> 17
*   i=16.9 -> 17
*
  i = math_int( snum ) 
*  if( i != 16 )
  if( snum != 16 )
    i = i + 1
  endif
*  if( i != snum )
*    i = i + 1
*  endif

*** set color
  ret = ''
  while( i <= enum )
    r = math_nint( sr + (er-sr) * (i-snum) / diff )
    g = math_nint( sg + (eg-sg) * (i-snum) / diff )
    b = math_nint( sb + (eb-sb) * (i-snum) / diff )
*    if( _verbose = 1 ) ; say i' r='r' g='g' b='b ; endif
    if( _verbose = 1 ) ; say 'ccol=' % i % ' : (' % r % ',' % g % ',' % b % ')' ; endif


   'set rgb 'i' 'r' 'g' 'b

    ret = ret' 'i' 'r' 'g' 'b
    i = i + 1
  endwhile

return ret



**********************************************
*
* color -> rgb value table
*
*   color  : color name
*   rgb    : "r" or "g" or "b"
*
*   return : rgb value
*
**********************************************
function colornum( color, rgb )
  r=-1; g=-1; b=-1

*** define rgb value
  if( color = 'black')  ; r=0 ; g=0 ; b=0 ; endif
  if( color = 'navy')  ; r=0 ; g=0 ; b=128 ; endif
  if( color = 'darkblue')  ; r=0 ; g=0 ; b=139 ; endif
  if( color = 'mediumblue')  ; r=0 ; g=0 ; b=205 ; endif
  if( color = 'blue')  ; r=0 ; g=0 ; b=255 ; endif
  if( color = 'darkgreen')  ; r=0 ; g=100 ; b=0 ; endif
  if( color = 'green')  ; r=0 ; g=128 ; b=0 ; endif
  if( color = 'teal')  ; r=0 ; g=128 ; b=128 ; endif
  if( color = 'darkcyan')  ; r=0 ; g=139 ; b=139 ; endif
  if( color = 'deepskyblue')  ; r=0 ; g=191 ; b=255 ; endif
  if( color = 'darkturquoise')  ; r=0 ; g=206 ; b=209 ; endif
  if( color = 'mediumspringgreen')  ; r=0 ; g=250 ; b=154 ; endif
  if( color = 'lime')  ; r=0 ; g=255 ; b=0 ; endif
  if( color = 'springgreen')  ; r=0 ; g=255 ; b=127 ; endif
  if( color = 'aqua')  ; r=0 ; g=255 ; b=255 ; endif
  if( color = 'cyan')  ; r=0 ; g=255 ; b=255 ; endif
  if( color = 'midnightblue')  ; r=25 ; g=25 ; b=112 ; endif
  if( color = 'dodgerblue')  ; r=30 ; g=144 ; b=255 ; endif
  if( color = 'lightseagreen')  ; r=32 ; g=178 ; b=170 ; endif
  if( color = 'forestgreen')  ; r=34 ; g=139 ; b=34 ; endif
  if( color = 'seagreen')  ; r=46 ; g=139 ; b=87 ; endif
  if( color = 'darkslategray')  ; r=47 ; g=79 ; b=79 ; endif
  if( color = 'limegreen')  ; r=50 ; g=205 ; b=50 ; endif
  if( color = 'mediumseagreen')  ; r=60 ; g=179 ; b=113 ; endif
  if( color = 'turquoise')  ; r=64 ; g=224 ; b=208 ; endif
  if( color = 'royalblue')  ; r=65 ; g=105 ; b=225 ; endif
  if( color = 'steelblue')  ; r=70 ; g=130 ; b=180 ; endif
  if( color = 'darkslateblue')  ; r=72 ; g=61 ; b=139 ; endif
  if( color = 'mediumturquoise')  ; r=72 ; g=209 ; b=204 ; endif
  if( color = 'indigo')  ; r=75 ; g=0 ; b=130 ; endif
  if( color = 'darkolivegreen')  ; r=85 ; g=107 ; b=47 ; endif
  if( color = 'cadetblue')  ; r=95 ; g=158 ; b=160 ; endif
  if( color = 'cornflowerblue')  ; r=100 ; g=149 ; b=237 ; endif
  if( color = 'mediumaquamarine')  ; r=102 ; g=205 ; b=170 ; endif
  if( color = 'dimgray')  ; r=105 ; g=105 ; b=105 ; endif
  if( color = 'slateblue')  ; r=106 ; g=90 ; b=205 ; endif
  if( color = 'olivedrab')  ; r=107 ; g=142 ; b=35 ; endif
  if( color = 'slategray')  ; r=112 ; g=128 ; b=144 ; endif
  if( color = 'lightslategray')  ; r=119 ; g=136 ; b=153 ; endif
  if( color = 'mediumslateblue')  ; r=123 ; g=104 ; b=238 ; endif
  if( color = 'lawngreen')  ; r=124 ; g=252 ; b=0 ; endif
  if( color = 'chartreuse')  ; r=127 ; g=255 ; b=0 ; endif
  if( color = 'aquamarine')  ; r=127 ; g=255 ; b=212 ; endif
  if( color = 'maroon')  ; r=128 ; g=0 ; b=0 ; endif
  if( color = 'purple')  ; r=128 ; g=0 ; b=128 ; endif
  if( color = 'olive')  ; r=128 ; g=128 ; b=0 ; endif
  if( color = 'gray')  ; r=128 ; g=128 ; b=128 ; endif
  if( color = 'skyblue')  ; r=135 ; g=206 ; b=235 ; endif
  if( color = 'lightskyblue')  ; r=135 ; g=206 ; b=250 ; endif
  if( color = 'blueviolet')  ; r=138 ; g=43 ; b=226 ; endif
  if( color = 'darkred')  ; r=139 ; g=0 ; b=0 ; endif
  if( color = 'darkmagenta')  ; r=139 ; g=0 ; b=139 ; endif
  if( color = 'saddlebrown')  ; r=139 ; g=69 ; b=19 ; endif
  if( color = 'darkseagreen')  ; r=143 ; g=188 ; b=143 ; endif
  if( color = 'lightgreen')  ; r=144 ; g=238 ; b=144 ; endif
  if( color = 'mediumpurple')  ; r=147 ; g=112 ; b=219 ; endif
  if( color = 'darkviolet')  ; r=148 ; g=0 ; b=211 ; endif
  if( color = 'palegreen')  ; r=152 ; g=251 ; b=152 ; endif
  if( color = 'darkorchid')  ; r=153 ; g=50 ; b=204 ; endif
  if( color = 'yellowgreen')  ; r=154 ; g=205 ; b=50 ; endif
  if( color = 'sienna')  ; r=160 ; g=82 ; b=45 ; endif
  if( color = 'brown')  ; r=165 ; g=42 ; b=42 ; endif
  if( color = 'darkgray')  ; r=169 ; g=169 ; b=169 ; endif
  if( color = 'lightblue')  ; r=173 ; g=216 ; b=230 ; endif
  if( color = 'greenyellow')  ; r=173 ; g=255 ; b=47 ; endif
  if( color = 'paleturquoise')  ; r=175 ; g=238 ; b=238 ; endif
  if( color = 'lightsteelblue')  ; r=176 ; g=196 ; b=222 ; endif
  if( color = 'powderblue')  ; r=176 ; g=224 ; b=230 ; endif
  if( color = 'firebrick')  ; r=178 ; g=34 ; b=34 ; endif
  if( color = 'darkgoldenrod')  ; r=184 ; g=134 ; b=11 ; endif
  if( color = 'mediumorchid')  ; r=186 ; g=85 ; b=211 ; endif
  if( color = 'rosybrown')  ; r=188 ; g=143 ; b=143 ; endif
  if( color = 'darkkhaki')  ; r=189 ; g=183 ; b=107 ; endif
  if( color = 'silver')  ; r=192 ; g=192 ; b=192 ; endif
  if( color = 'mediumvioletred')  ; r=199 ; g=21 ; b=133 ; endif
  if( color = 'indianred')  ; r=205 ; g=92 ; b=92 ; endif
  if( color = 'peru')  ; r=205 ; g=133 ; b=63 ; endif
  if( color = 'chocolate')  ; r=210 ; g=105 ; b=30 ; endif
  if( color = 'tan')  ; r=210 ; g=180 ; b=140 ; endif
  if( color = 'lightgray')  ; r=211 ; g=211 ; b=211 ; endif
  if( color = 'thistle')  ; r=216 ; g=191 ; b=216 ; endif
  if( color = 'orchid')  ; r=218 ; g=112 ; b=214 ; endif
  if( color = 'goldenrod')  ; r=218 ; g=165 ; b=32 ; endif
  if( color = 'palevioletred')  ; r=219 ; g=112 ; b=147 ; endif
  if( color = 'crimson')  ; r=220 ; g=20 ; b=60 ; endif
  if( color = 'gainsboro')  ; r=220 ; g=220 ; b=220 ; endif
  if( color = 'plum')  ; r=221 ; g=160 ; b=221 ; endif
  if( color = 'burlywood')  ; r=222 ; g=184 ; b=135 ; endif
  if( color = 'lightcyan')  ; r=224 ; g=255 ; b=255 ; endif
  if( color = 'lavender')  ; r=230 ; g=230 ; b=250 ; endif
  if( color = 'darksalmon')  ; r=233 ; g=150 ; b=122 ; endif
  if( color = 'violet')  ; r=238 ; g=130 ; b=238 ; endif
  if( color = 'palegoldenrod')  ; r=238 ; g=232 ; b=170 ; endif
  if( color = 'lightcoral')  ; r=240 ; g=128 ; b=128 ; endif
  if( color = 'khaki')  ; r=240 ; g=230 ; b=140 ; endif
  if( color = 'aliceblue')  ; r=240 ; g=248 ; b=255 ; endif
  if( color = 'honeydew')  ; r=240 ; g=255 ; b=240 ; endif
  if( color = 'azure')  ; r=240 ; g=255 ; b=255 ; endif
  if( color = 'sandybrown')  ; r=244 ; g=164 ; b=96 ; endif
  if( color = 'wheat')  ; r=245 ; g=222 ; b=179 ; endif
  if( color = 'beige')  ; r=245 ; g=245 ; b=220 ; endif
  if( color = 'whitesmoke')  ; r=245 ; g=245 ; b=245 ; endif
  if( color = 'mintcream')  ; r=245 ; g=255 ; b=250 ; endif
  if( color = 'ghostwhite')  ; r=248 ; g=248 ; b=255 ; endif
  if( color = 'salmon')  ; r=250 ; g=128 ; b=114 ; endif
  if( color = 'antiquewhite')  ; r=250 ; g=235 ; b=215 ; endif
  if( color = 'linen')  ; r=250 ; g=240 ; b=230 ; endif
  if( color = 'lightgoldenrodyellow')  ; r=250 ; g=250 ; b=210 ; endif
  if( color = 'oldlace')  ; r=253 ; g=245 ; b=230 ; endif
  if( color = 'red')  ; r=255 ; g=0 ; b=0 ; endif
  if( color = 'fuchsia')  ; r=255 ; g=0 ; b=255 ; endif
  if( color = 'magenta')  ; r=255 ; g=0 ; b=255 ; endif
  if( color = 'deeppink')  ; r=255 ; g=20 ; b=147 ; endif
  if( color = 'orangered')  ; r=255 ; g=69 ; b=0 ; endif
  if( color = 'tomato')  ; r=255 ; g=99 ; b=71 ; endif
  if( color = 'hotpink')  ; r=255 ; g=105 ; b=180 ; endif
  if( color = 'coral')  ; r=255 ; g=127 ; b=80 ; endif
  if( color = 'darkorange')  ; r=255 ; g=140 ; b=0 ; endif
  if( color = 'lightsalmon')  ; r=255 ; g=160 ; b=122 ; endif
  if( color = 'orange')  ; r=255 ; g=165 ; b=0 ; endif
  if( color = 'lightpink')  ; r=255 ; g=182 ; b=193 ; endif
  if( color = 'pink')  ; r=255 ; g=192 ; b=203 ; endif
  if( color = 'gold')  ; r=255 ; g=215 ; b=0 ; endif
  if( color = 'peachpuff')  ; r=255 ; g=218 ; b=185 ; endif
  if( color = 'navajowhite')  ; r=255 ; g=222 ; b=173 ; endif
  if( color = 'moccasin')  ; r=255 ; g=228 ; b=181 ; endif
  if( color = 'bisque')  ; r=255 ; g=228 ; b=196 ; endif
  if( color = 'mistyrose')  ; r=255 ; g=228 ; b=225 ; endif
  if( color = 'blanchedalmond')  ; r=255 ; g=235 ; b=205 ; endif
  if( color = 'papayawhip')  ; r=255 ; g=239 ; b=213 ; endif
  if( color = 'lavenderblush')  ; r=255 ; g=240 ; b=245 ; endif
  if( color = 'seashell')  ; r=255 ; g=245 ; b=238 ; endif
  if( color = 'cornsilk')  ; r=255 ; g=248 ; b=220 ; endif
  if( color = 'lemonchiffon')  ; r=255 ; g=250 ; b=205 ; endif
  if( color = 'floralwhite')  ; r=255 ; g=250 ; b=240 ; endif
  if( color = 'snow')  ; r=255 ; g=250 ; b=250 ; endif
  if( color = 'yellow')  ; r=255 ; g=255 ; b=0 ; endif
  if( color = 'lightyellow')  ; r=255 ; g=255 ; b=224 ; endif
  if( color = 'ivory')  ; r=255 ; g=255 ; b=240 ; endif
  if( color = 'white')  ; r=255 ; g=255 ; b=255 ; endif


*** direct rgb specification
  length = math_strlen( color )
  first = substr( color, 1, 1 )
  if( first = '(' )
    i = 2
    k = 1
    rgb.1 = ''

    while( i <= length )
      c = substr( color, i, 1 )
      if( c = ',' | c = ')' )
        k = k + 1
        rgb.k = ''
      else
        rgb.k = rgb.k % c
      endif
      i = i + 1
    endwhile

    r = rgb.1
    g = rgb.2
    b = rgb.3
  endif

*** return  
  if( rgb = 'r' ); return( r ); endif
  if( rgb = 'g' ); return( g ); endif
  if( rgb = 'b' ); return( b ); endif

return


*
* help
*
function help()
  say ' Name:'
  say '   color '_version' - set color'
  say ' '
  say ' Usage:'
  say '   color [-gxout (contour|shaded|grfill)]'
  say '         [-kind kind]'
  say '         [-sample]'
  say '         [-div div]'
  say '         (-var variable | min max [int] | -levs lev1 lev2 ...)'
  say '         [-verbose | -v]'
  say '         [-xcbar xcba-args]'
  say ''
  say '     -gxout           : type of gxout'
  say '     -kind kind       : color list, '
  say '                        or color name or rgb value connected with "->".'
  say '                        e.g., blue->white->red, bluered,'
  say '                              (200,100,100)->red->(0.0,0)'
  say '                        You can specify number of color '
  say '                        between the two colors using -(n)-> :'
  say '                        e.g. white-(0)->blue->red'
  say '     -sample          : draw color sample'
  say '     -var variable    : variable to draw'
  say '     -div div         : when "int" is not specified,'
  say '                        [min:max] is divided by "div" (default: 10)'
  say '     min max [int]    : minimum and maximum values of the graphic'
  say '     -levs lev1 lev2 ... '
  say '                      : levels'
  say '     -verbose         : verbose mode'
  say '     -ret             : pretend to be script function.'
  say '     -xcbar xcbar-args: run xcbar.gs to draw color bar.'
  say '                        xcbar.gs is necessary.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   This version is compatible with color.gs Ver 0.01 and after.'
  say ''
  say ' Copyright (C) 2005-2013 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
