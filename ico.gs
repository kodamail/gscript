*
* Help is in the end of this script.
*

*
function ico( args )
  _version='0.01b1'
  rc = gsfallow( 'on' )
  set_const()

  if( args = '' )
    help()
    return
  endif

*---------- arguements ----------*
*
*----- default (1)
*
  gl = -999
  xo = -999
  yo = -999
  hp_fill = 0
  _hp_color = 'colorful' 
  _color_kind = 'blue->red->yellow->green->magenta->orange->purple->aqua->maroon->lime'
  _color_num = 10
  hp_mark = 0
  _hp_mark_size = 0.2
  hp_number = 0
  tri_fill = 0
  tri_mark = 0
  _tri_mark_size = 0.2
  tri_number = 0
  _tri_color = 'basic-region'
  hp_line  = 0
  _hp_line_color = 1
  _hp_line_thick = 2
  tri_line = 0
  _tri_line_color = 1
  _tri_line_thick = 2
  rotx = 0
  roty = 0
  rotz = 0
  _verbose = 0
* direction of light ( (0,0,-1): light source from eye )
  _ix = 0
  _iy = 0
  _iz = -1
  _size = 2.5
  _lsmask_land = 3
  _lsmask_sea  = 4

*----- user-specidife
*
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1
    if( arg = '' ) ; break ; endif

    while( 1 )
      if( arg = '-hp-fill'  ) ; hp_fill = 1 ; break ; endif
      if( arg = '-hp-color' ) ; _hp_color = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-color-kind' ) ; _color_kind = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-color-num' ) ; _color_num = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-hp-number'  ) ; hp_number = 1 ; break ; endif
      if( arg = '-hp-mark'  ) ; hp_mark = 1 ; break ; endif
      if( arg = '-hp-mark-size' ) ; _hp_mark_size = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-tri-fill'  ) ; tri_fill = 1 ; break ; endif
      if( arg = '-tri-color' )
        _tri_color = subwrd( args, i )
        i=i+1
        if( _tri_color = 'rgb' )
          _tri_color = _tri_color % ' ' % subwrd( args, i ) ; i=i+1
          _tri_color = _tri_color % ' ' % subwrd( args, i ) ; i=i+1
          _tri_color = _tri_color % ' ' % subwrd( args, i ) ; i=i+1
        endif
        break
      endif
      if( arg = '-tri-mark'  ) ; tri_mark = 1 ; break ; endif
      if( arg = '-tri-mark-size' ) ; _tri_mark_size = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-tri-number'  ) ; tri_number = 1 ; break ; endif
      if( arg = '-hp-line'  ) ; hp_line = 1 ; break ; endif
      if( arg = '-hp-line-color' ) ; _hp_line_color = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-hp-line-thick' ) ; _hp_line_thick = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-tri-line' ) ; tri_line = 1 ; break ; endif
      if( arg = '-tri-line-color' ) ; _tri_line_color = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-tri-line-thick' ) ; _tri_line_thick = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-rotx' ) ; rotx = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-roty' ) ; roty = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-rotz' ) ; rotz = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-size' ) ; _size = subwrd( args, i ) ; i=i+1 ; break ; endif
      if( arg = '-light' )
        _ix = subwrd( args, i ) ; i=i+1
        _iy = subwrd( args, i ) ; i=i+1
        _iz = subwrd( args, i ) ; i=i+1
        break ; endif
      if( arg = '-lsmask-color' )
        _lsmask_land = subwrd( args, i ) ; i=i+1
        _lsmask_sea  = subwrd( args, i ) ; i=i+1
        break ; endif
      if( arg = '-verbose' | arg = '-v'  ) ; _verbose = 1 ; break ; endif

      if( valnum(arg) = 1  & gl = -999) ; gl = arg ; break ; endif
      if( valnum(arg) != 0 & xo = -999) ; xo = arg ; break ; endif
      if( valnum(arg) != 0 & yo = -999) ; yo = arg ; break ; endif

      say "syntax error: " % arg
            exit
    endwhile
  endwhile
*
*----- default (2)
*
  if( gl = -999 ) ; gl = 0 ; endif
  if( xo = -999 ) ; xo = 3 ; endif
  if( yo = -999 ) ; yo = 4 ; endif
  if( hp_fill + tri_fill + hp_line + tri_line = 0 ) ; tri_line = 1 ; endif
*---------- arguements ----------*

  if( _tri_color = 'lsmask'  | _hp_color = 'lsmask' )
    _lsmask_latmin = qctlinfo( 1, 'ydef', 3 )
    _lsmask_latmax = -_lsmask_latmin
  endif

  create( gl )
  rotate( rotx, roty, rotz )

  if( tri_fill   = 1 ) ; dtris( xo, yo, 'tri-fill'   ) ; endif
  if( hp_fill    = 1 ) ; dtris( xo, yo, 'hp-fill'    ) ; endif
  if( tri_line   = 1 ) ; dtris( xo, yo, 'tri-line'   ) ; endif
  if( hp_line    = 1 ) ; dtris( xo, yo, 'hp-line'    ) ; endif
  if( tri_mark   = 1 ) ; dtris( xo, yo, 'tri-mark'   ) ; endif
  if( hp_mark    = 1 ) ; dtris( xo, yo, 'hp-mark'    ) ; endif
  if( tri_number = 1 ) ; dtris( xo, yo, 'tri-number' ) ; endif
  if( hp_number  = 1 ) ; dtris( xo, yo, 'hp-number'  ) ; endif
return

*************************************************
*
* set constants
*
function set_const()
  _pi = 4 * math_atan( 1.0 )
  _d2r = _pi / 180.0
  _r2d = 180.0 / _pi
return


*************************************************
*
* create icosahedral grid
*
function create( gl )
  create_basic()
  create_basic_tri()
  while( gl > 0 )
    plus_glevel()
    gl = gl - 1
  endwhile
  _rotfinx = 0
  _rotfiny = 0
  _rotfinz = 0

  if( _verbose = 1 )
    print_x()
    print_vlink()
    print_trin()
  endif

return


*************************************************
*
* make icosahedron (i.e. rl=0)
*
function create_basic()
*
* calculate (x,y,z) relative to O(0,0,0)
*
* reference:http://www1.ocn.ne.jp/~km31/solid_sei20.htm
*
* consider regular pentagon
*
  x = _size / 2 * math_tan( 54*_d2r )
*
  theta = math_acos( x / (math_sqrt(3.0)/2.0)/_size )
*
  h = x * math_tan( theta )
*
  theta_p = math_asin( h / _size )
*
* radius of the sphere
  _r = h / ( 1 - math_cos(2*theta_p) )
*
  if( _verbose = 1 )
    say 'basic patameters'
    say '  x = ' % x
    say '  theta = ' % (theta*_r2d)
    say '  h = ' % h
    say '  theta_p = ' % (theta_p*_r2d)
    say '  r = ' % _r
  endif
*
* (_x.n, _y.n, _z.n): n-th vertex
* _vlink.n.i: neighboring vertex of n-th vertex (1<=i<=6)
*             =-999: not defined
*             counterclockwise for i = 1 -> 6
* _br.n: number unique for each basic region
*
* "top of the " icosahedron
  _x.1 = 0.0 ; _y.1 = 0.0 ; _z.1 = _r
  _vlink.1.1 = 2  ; _vlink.1.2 = 3  ; _vlink.1.3 = 4
  _vlink.1.4 = 5  ; _vlink.1.5 = 6  ; _vlink.1.6 = -999
  _br.1 = 1

  _x.2 = _size * math_cos(theta_p)
  _y.2 = 0.0
  _z.2 = _r - h
  _vlink.2.1 = 1  ; _vlink.2.2 = 6  ; _vlink.2.3 = 12
  _vlink.2.4 = 8 ; _vlink.2.5 = 3  ; _vlink.2.6 = -999
  _br.2 = 2

  i = 3
  while( i <= 6 )
    imm = i - 1
    _x.i = _x.imm * math_cos(72*_d2r) - _y.imm * math_sin(72*_d2r)
    _y.i = _x.imm * math_sin(72*_d2r) + _y.imm * math_cos(72*_d2r)
    _z.i = _r - h
    _vlink.i.1 = 1   ; _vlink.i.2 = i-1 ; _vlink.i.3 = i+5
    _vlink.i.4 = i+6 ; _vlink.i.5 = math_mod(i-1,5)+2 ; _vlink.i.6 = -999
    _br.i = i
    i = i + 1
  endwhile

* "bottom of the" icosahedron
  _x.7 = 0.0 ; _y.7 = 0.0 ; _z.7 = -_r
  _vlink.7.1 = 12 ; _vlink.7.2 = 11 ; _vlink.7.3 = 10
  _vlink.7.4 = 9  ; _vlink.7.5 = 8  ; _vlink.7.6 = -999
  _br.7 = -1

  _x.8 = _x.2 * math_cos(36*_d2r) - _y.2 * math_sin(36*_d2r)
  _y.8 = _x.2 * math_sin(36*_d2r) + _y.2 * math_sin(36*_d2r)
  _z.8 = -(_r - h)
  _vlink.8.1 = 7 ; _vlink.8.2 = 9  ; _vlink.8.3 = 3
  _vlink.8.4 = 2 ; _vlink.8.5 = 12 ; _vlink.8.6 = -999
  _br.8 = -2

  i = 9
  while( i <= 12 )
    imm = i - 1
    _x.i = _x.imm * math_cos(72*_d2r) - _y.imm * math_sin(72*_d2r)
    _y.i = _x.imm * math_sin(72*_d2r) + _y.imm * math_cos(72*_d2r)
    _z.i = -(_r - h)
    _vlink.i.1 = 7   ; _vlink.i.2 = math_mod(i-7,5)+8 ; _vlink.i.3 = math_mod(i-7,5)+2
    _vlink.i.4 = i-6 ; _vlink.i.5 = i-1               ; _vlink.i.6 = -999
    _br.i = -i+6
    i = i + 1
  endwhile

  _xn = 12
  _xh.1.1 = -999
return


*************************************************
*
* set triangle
*   _trin.n.i: vertex number.
*     position vector = [ _x.{_trin.n.i}, _y.{_trin.n.i}, _z.{_trin.n.i} ]
*     n: n-th triangle
*     i: i-th vertex (1<=i<=3)
*   seeing from outside, _trin.n.1 - _trin.n.2 - _trin.n.3 should be counter-clockwise

function create_basic_tri()
  n = 1

  i = 1
  while( i <= 5 )
    _trin.n.1 = 1
    _trin.n.2 = i + 1
    _trin.n.3 = math_mod(i,5) + 2

* _tribr.n: the number unique for each basic region
    _tribr.n = n
    n = n + 1
    i = i + 1
  endwhile

  i = 1
  while( i <= 5 )
    _trin.n.1 = 7
    _trin.n.2 = math_mod(i,5) + 8
    _trin.n.3 = i + 7
    _tribr.n = n
    n = n + 1
    i = i + 1
  endwhile

  i = 1
  while( i <= 5 )
*   8 3 2
*   9 4 3
    _trin.n.1 = i + 7
    _trin.n.2 = math_mod(i,5) + 2
    _trin.n.3 = i + 1
    _tribr.n = n - 10
    n = n + 1
    i = i + 1
  endwhile

  i = 1
  while( i <= 5 )
*   3 8   9
*   4 9  10
*   5 10 11
*   6 11 12
*   2 12  8
    _trin.n.1 = math_mod(i+0,5) + 2
    _trin.n.2 = i + 7
    _trin.n.3 = math_mod(i+0,5) + 8
    _tribr.n = n - 10
    n = n + 1
    i = i + 1
  endwhile

  _trin = n - 1
return


*************************************************
*
* glevel++
*
function plus_glevel()
  say "glevel++"

*----- save on temporary buffer
  i = 1
  while( i <= _trin )
    j = 1
    while( j <= 3 )
      tmptrin.i.j = _trin.i.j
      j = j + 1
    endwhile
    tmptribr.i = _tribr.i
    i = i + 1
  endwhile
  tmptrin = _trin
  _trin = 0

  i = 1
  while( i <= _xn )
    j = 1
    while( j <= 6 )
      tmpvlink.i.j = _vlink.i.j
      j = j + 1
    endwhile
    i = i + 1
  endwhile
  tmpxn = _xn

*----- add new vertex between the previous vertices
  i = 1
  while( i <= tmpxn )
    j = 1
    while( j <= 6 )
      if( i < tmpvlink.i.j )
        _xn = _xn + 1
        i2 = tmpvlink.i.j
        _x._xn = 0.5 * ( _x.i + _x.i2 )
        _y._xn = 0.5 * ( _y.i + _y.i2 )
        _z._xn = 0.5 * ( _z.i + _z.i2 )
        scale = _r / math_sqrt( _x._xn*_x._xn + _y._xn*_y._xn + _z._xn*_z._xn )
        _x._xn = _x._xn * scale
        _y._xn = _y._xn * scale
        _z._xn = _z._xn * scale

        if( _br.i <= 1 ) ; _br._xn = _br.i2
        else             ; _br._xn = _br.i  ; endif

        _br._xn = -999
        if( _br._xn = -999 & math_abs(_br.i)  = 1 ) ; _br._xn = _br.i2 ; endif
        if( _br._xn = -999 & math_abs(_br.i2) = 1 ) ; _br._xn = _br.i  ; endif

        if( _br._xn = -999 & _br.i * _br.i2 > 0 & math_abs(_br.i)-math_abs(_br.i2) = 4 ) ; _br._xn = _br.i  ; endif
        if( _br._xn = -999 & _br.i * _br.i2 > 0 & math_abs(_br.i2)-math_abs(_br.i) = 4 ) ; _br._xn = _br.i2  ; endif

        if( _br._xn = -999 & _br.i * _br.i2 < 0 & _br.i+_br.i2 = 0 )
          if( _br.i > 0 ) ; _br._xn = _br.i
          else            ; _br._xn = _br.i2 ; endif
        endif

        if( _br._xn = -999 & _br.i * _br.i2 < 0 )
          if( _br.i > 0 ) ; _br._xn = _br.i2
          else            ; _br._xn = _br.i ; endif
        endif

        if( _br._xn = -999 )
          if( math_abs(_br.i) <= math_abs(_br.i2) ) ; _br._xn = _br.i
          else                                      ; _br._xn = _br.i2 ; endif
        endif

*       reconnect
        _vlink.i.j = _xn
*        say 'reconnect: ' % i % ' ' % j % ' ' % _xn

* n1, n2 -> return j, where _vlink.n1.j = n2
* here, i, i2 -> k (NO!!!: because of tmpvlink)
*        k = get_vlink_2( i, i2 )

        k = 1
        while( k <= 6 )
          if( tmpvlink.i2.k = i )
            _vlink.i2.k = _xn
*           say 'reconnect: ' % i2 % ' ' % k % ' ' % _xn
            break
          endif
          k = k + 1
        endwhile

*      for _xn (only for i and i2)
        _vlink._xn.1 = i
        _vlink._xn.4 = i2
      endif

      j = j + 1
    endwhile    
    i = i + 1
  endwhile

* for _xn (except for i and i2)
  i = tmpxn + 1
  while( i <= _xn )
    n1 = _vlink.i.1
    j = 1
    while( j <= 6 )
      if( _vlink.n1.j = i ) ; break ; endif
      if( j = 6 ) ; say 'error!' ; exit ; endif
      j = j + 1
    endwhile
    j2 = j - 1
    if( j2 <= 0 ) ; j2 = j2 + 6 ; endif
    if( _vlink.n1.j2 = -999 ) ; j2 = j2 - 1; endif
    _vlink.i.2 = _vlink.n1.j2
    j2 = j + 1
    if( j2 > 6 | _vlink.n1.j2 = -999 ) ; j2 = 1 ; endif
    _vlink.i.6 = _vlink.n1.j2

    n4 = _vlink.i.4
    j = 1
    while( j <= 6 )
      if( _vlink.n4.j = i ) ; break ; endif
      if( j = 6 ) ; say 'error!' ; exit ; endif
      j = j + 1
    endwhile
    j2 = j - 1
    if( j2 <= 0 ) ; j2 = j2 + 6 ; endif
    if( _vlink.n4.j2 = -999 ) ; j2 = j2 - 1; endif
    _vlink.i.5 = _vlink.n4.j2
    j2 = j + 1
    if( j2 > 6 | _vlink.n4.j2 = -999 ) ; j2 = 1 ; endif
    _vlink.i.3 = _vlink.n4.j2

    i = i + 1
  endwhile

  if( _verbose = 1 )
    print_x()
    print_vlink()
  endif

  i = 1
  n = 1
  while( i <= tmptrin )
    n1 = tmptrin.i.1
    n2 = tmptrin.i.2
    n3 = tmptrin.i.3

*  between n1 and n2 (search for k toward n2 tmpvlink.n1.k)
    k12 = 1
    while( k12 <= 6 )
      if( tmpvlink.n1.k12 = n2 ) ; break ; endif
      if( k12 = 6 ) ; say 'error' ; exit ;  endif
      k12 = k12 + 1
    endwhile
*  between n2 and n3
    k23 = 1
    while( k23 <= 6 )
      if( tmpvlink.n2.k23 = n3 ) ; break ; endif
      if( k23 = 6 ) ; say 'error' ; exit ;  endif
      k23 = k23 + 1
    endwhile
*  between n3 and n1
    k31 = 1
    while( k31 <= 6 )
      if( tmpvlink.n3.k31 = n1 ) ; break ; endif
      if( k31 = 6 ) ; say 'error' ; exit ;  endif
      k31 = k31 + 1
    endwhile

    _trin.n.1 = n1
    _trin.n.2 = _vlink.n1.k12
    _trin.n.3 = _vlink.n3.k31
    _tribr.n = tmptribr.i
    n = n + 1

    _trin.n.1 = n2
    _trin.n.2 = _vlink.n2.k23
    _trin.n.3 = _vlink.n1.k12
    _tribr.n = tmptribr.i
    n = n + 1

    _trin.n.1 = n3
    _trin.n.2 = _vlink.n3.k31
    _trin.n.3 = _vlink.n2.k23
    _tribr.n = tmptribr.i
    n = n + 1

    _trin.n.1 = _vlink.n1.k12
    _trin.n.2 = _vlink.n2.k23
    _trin.n.3 = _vlink.n3.k31
    _tribr.n = tmptribr.i
    n = n + 1

    i = i + 1
  endwhile

  _trin = n - 1
  _xh.1.1 = -999
  if( _verbose = 1 ) ; print_trin() ; endif
return


*************************************************
*
* draw
*
function dtris( xo, yo, type )
  type.1 = rgnwrd( type, 1, 1, '-' )
  type.2 = rgnwrd( type, 2, 2, '-' )

  if( _color_kind != '' )
    'color 2 '_color_num' 1 -kind '_color_kind
  endif

*---------- triangle ----------*
  if( type.1 = 'tri' )
    n = 1
    while( n <= _trin )
      n1 = _trin.n.1
      n2 = _trin.n.2
      n3 = _trin.n.3

*   if 1-2-3 is clockwise -> not draw
      theta1 = arg( _x.n2-_x.n1, _y.n2-_y.n1 )
      theta2 = arg( _x.n3-_x.n1, _y.n3-_y.n1 )
      theta = math_fmod( theta2 - theta1 + 2*_pi, 2*_pi )
      if( theta > _pi ) ; n = n + 1 ; continue ; endif
*      if( theta < _pi ) ; n = n + 1 ; continue ; endif

*----- filled triangle or mark at the center of the triangle -----*
      if( type.2 = 'fill' | type.2 = 'mark' | type.2 = 'number' )
        color = -999

        if( valnum(_tri_color) = 1 )
          color = _tri_color
        endif

        if( subwrd(_tri_color,1) = 'rgb' )
          'set rgb 50 'subwrd(_tri_color,2)' 'subwrd(_tri_color,3)' 'subwrd(_tri_color,4)
          color = 50
        endif

        if( _tri_color = 'colorful' )
*          color = math_mod(n,10) + 16
          color = math_mod(n,_color_num) + 16
        endif

        if( _tri_color = 'basic-region' )
          color = math_mod(_tribr.n-1,10) + 16
        endif

        if( _tri_color = 'lsmask' )
          lsmask = ( get_lsmask( _x.n1, _y.n1, _z.n1 ) + get_lsmask( _x.n2, _y.n2, _z.n2 ) + get_lsmask( _x.n3, _y.n3, _z.n3 ) ) / 3.0
          if( lsmask < 0.5 ) ; color = _lsmask_sea
          else ;  color = _lsmask_land ; endif
        endif

        if( _tri_color = 'light' )
*          alpha = theta_from_light( n1, n2, n3 )
          alpha = theta_from_light( _x.n1, _y.n1, _z.n1, _x.n2, _y.n2, _z.n2, _x.n3, _y.n3, _z.n3 )
          b = alpha2bri( alpha )
          'set rgb 50 'b' 'b' 'b
           color = 50
        endif
      
        if( color = -999 ) ; say 'error in color' ; exit ; endif
        'set line 'color' 1'

        if( type.2 = 'fill' )
          'draw polyf '_x.n1+xo' '_y.n1+yo' '_x.n2+xo' '_y.n2+yo' '_x.n3+xo' '_y.n3+yo
        endif

*---- mark -----*
        if( type.2 = 'mark' )
          x = ( _x.n1 + _x.n2 + _x.n3 ) / 3.0 + xo
          y = ( _y.n1 + _y.n2 + _y.n3 ) / 3.0 + yo
          'draw mark 3 'x' 'y' '_tri_mark_size
        endif

*---- triangle number -----*
        if( type.2 = 'number' )
          'setfont huge'
          'set string 'color
          x = ( _x.n1 + _x.n2 + _x.n3 ) / 3.0 + xo
          y = ( _y.n1 + _y.n2 + _y.n3 ) / 3.0 + yo
          'draw string 'x' 'y' 'n
        endif

*        if( _tri_color = 'light' )
*          xpos = (_x.n1 + _x.n2 + _x.n3) / 3.0 + xo
*          ypos = (_y.n1 + _y.n2 + _y.n3) / 3.0 + yo
*          'setfont normal'
*          'draw string 'xpos' 'ypos' 'math_nint(alpha*_r2d)
*        endif

      endif

*----- line triangle -----*
      if( type.2 = 'line' )
        'set line '_tri_line_color' 1 '_tri_line_thick
        'drawpoly '_x.n1+xo' '_y.n1+yo' '_x.n2+xo' '_y.n2+yo' '_x.n3+xo' '_y.n3+yo
      endif

      n = n + 1
    endwhile

  endif

*---------- hexagonal/pentagonal ----------*
  if( type.1 = 'hp' )
    if( _xh.1.1 = -999 ) ; create_hp() ; endif

    n = 1
    while( n <= _xn )
      theta1 = arg( _xh.n.2-_xh.n.1, _yh.n.2-_yh.n.1 )
      theta2 = arg( _xh.n.3-_xh.n.1, _yh.n.3-_yh.n.1 )
      theta = math_fmod( theta2 - theta1 + 2*_pi, 2*_pi )
      if( theta > _pi ) ; n = n + 1 ; continue ; endif
*      if( theta < _pi ) ; n = n + 1 ; continue ; endif

      str = ''
      xc = 0 ; yc = 0 ; zc = 0
      j = 1
      while( j <= 6 )
        if( _xh.n.j = -999 |  _yh.n.j = -999  ) ; break ; endif
        str = str % ' ' % _xh.n.j+xo % ' ' % _yh.n.j+yo
        j = j + 1
      endwhile
      jn = j - 1

*----- filled hp or mark at the center of the hp -----*
      if( type.2 = 'fill' | type.2 = 'mark' | type.2 = 'number' )
        color = -999

        if( valnum(_hp_color) = 1 )
          color = _hp_color
        endif

        if( _hp_color = 'colorful' )
*          color = math_mod(n,10) + 16
          color = math_mod(n,_color_num) + 16
        endif

        if( _hp_color = 'lsmask' )
          lsmask = 0
          j = 1
          while( j <= jn )
            lsmask = lsmask + get_lsmask( _xh.n.j, _yh.n.j, _zh.n.j )
            j = j + 1
          endwhile
          lsmask = lsmask + get_lsmask( _x.n, _y.n, _z.n )
          lsmask = lsmask / (jn+1)
          if( lsmask < 0.5 ) ; color = _lsmask_sea
          else ;  color = _lsmask_land ; endif
        endif

        if( _hp_color = 'light' )
          alpha = theta_from_light( _xh.n.1, _yh.n.1, _zh.n.1, _xh.n.2, _yh.n.2, _zh.n.2, _xh.n.3, _yh.n.3, _zh.n.3 )
          b = alpha2bri( alpha )
          'set rgb 50 'b' 'b' 'b
           color = 50
        endif

        if( _hp_color = 'basic-region' )
*         1<=_br.n<=6: NH,  -1>=_br.n>=-6: SH
*         _br.n=1 or -1: poles
          color = _br.n + 7
          if( _color_kind != '' )
            color = 16
            if( _br.n >=  2 ) ; color = _br.n + 15 ; endif
            if( _br.n <= -2 ) ; color = _br.n + 28 ; endif
          endif
        endif

        if( color = -999 ) ; say 'error in color' ; exit ; endif
        'set line 'color' 1'

*---- filled -----*
        if( type.2 = 'fill' )
          'draw polyf 'str   
        endif

*---- mark -----*
        if( type.2 = 'mark' )
          'draw mark 3 '_x.n+xo' '_y.n+yo' '_hp_mark_size
        endif

*---- number -----*
        if( type.2 = 'number' )
          'setfont huge'
          'set string 'color
*          'draw string '_x.n+xo' '_y.n+yo' 'n
          'draw string '_x.n+xo' '_y.n+yo' 'n'('_br.n')'
        endif

      endif

      if( type.2 = 'line' )
        'set line '_hp_line_color' 1 '_hp_line_thick
        'drawpoly 'str   
      endif

      n = n + 1
    endwhile

  endif

return



*
* note: creation of triangle grid and rotation should be finished before it is invoked.
*
function create_hp()
  say "creating hexagonal-pentagonal grid"

  n = 1
  while( n <= _xn )
    j = 1
    _xh.n.6 = -999
    _yh.n.6 = -999
    _zh.n.6 = -999
    while( j <= 6 )
      if( _vlink.n.j = -999 ) ; break ; endif
      jpp = j + 1
      if( jpp > 6 ) ; jpp =1 ; endif
      if( _vlink.n.jpp = -999 ) ; jpp =1 ; endif
      n1 = n
      n2 = _vlink.n.j
      n3 = _vlink.n.jpp
*      say n1 % ', ' % n2 % ',' % n3

      zeta = 30 * _d2r
      len = math_sqrt( (_x.n1-_x.n2)*(_x.n1-_x.n2) + (_y.n1-_y.n2)*(_y.n1-_y.n2) + (_z.n1-_z.n2)*(_z.n1-_z.n2) )

      p = len / (2 * math_cos(zeta) )
      q = len * math_cos(zeta) - p
      xm = 0.5 * ( _x.n2 + _x.n3 )
      ym = 0.5 * ( _y.n2 + _y.n3 )
      zm = 0.5 * ( _z.n2 + _z.n3 )

      x = ( q * _x.n1 + p * xm ) / ( p + q )
      y = ( q * _y.n1 + p * ym ) / ( p + q )
      z = ( q * _z.n1 + p * zm ) / ( p + q )
      scale = _r / math_sqrt( x*x + y*y + z*z )

      _xh.n.j = x * scale
      _yh.n.j = y * scale
      _zh.n.j = z * scale

      j = j + 1
    endwhile
    n = n + 1
  endwhile
return

*
* calculate angle relative to the toward-eye-direction
* alpha is always positive except for no reflection case
*
*function theta_from_light( n1, n2, n3 )
function theta_from_light( x1, y1, z1, x2, y2, z2, x3, y3, z3 )
*
*   A = (ax,ay,az)
*   B = (bx,by,bz)
*   AB = A x B: vector perpendicular to the surface
*    ax = _x.n2 - _x.n1 ; ay = _y.n2 - _y.n1 ; az = _z.n2 - _z.n1
*    bx = _x.n3 - _x.n1 ; by = _y.n3 - _y.n1 ; bz = _z.n3 - _z.n1
    ax = x2 - x1 ; ay = y2 - y1 ; az = z2 - z1
    bx = x3 - x1 ; by = y3 - y1 ; bz = z3 - z1
    abx = ay * bz - az * by
    aby = az * bx - ax * bz
    abz = ax * by - ay * bx
*    say 'for ' % n % 'th triangle'
*    say '  (ax,ay,az)    = (' % math_format("%8.3f",ax) % ',' % math_format("%8.3f",ay) % ',' math_format("%8.3f",az) % ')'
*    say '  (bx,by,bz)    = (' % math_format("%8.3f",bx) % ',' % math_format("%8.3f",by) % ',' math_format("%8.3f",bz) % ')'
*    say '  (abx,aby,abz) = (' % math_format("%8.3f",abx) % ',' % math_format("%8.3f",aby) % ',' math_format("%8.3f",abz) % ')'
*    'set line 1' ; 'arrow 3 2 '3+ax' '2+ay
*    'set line 2' ; 'arrow 3 2 '3+bx' '2+by
*   I = (_ix,_iy,_iz) : source of light
*    _ix = 1 ; _iy = 0 ; _iz = 0
*   E = (ex,ey,ez) : line of sight ( positive toward eye )
    ex = 0 ; ey = 0 ; ez = 1
*abx = -1 ; aby = 0 ; abz = 1
*    'set line 3' ; 'arrow 3 2 '3+abx' '2+aby
*    'set line 4' ; 'arrow 3 3 '3+_ix' '3+_iy

*-----   rotate vectors to make AxB parallel to z-axis

*   get angle for rotation on x-y plane to make aby=0
    theta_z = arg( abx, aby )
    if( theta_z = 9999 ) ; theta_z = 0 ; endif
    tmpx = abx * math_cos(-theta_z) - aby * math_sin(-theta_z)
    tmpy = abx * math_sin(-theta_z) + aby * math_cos(-theta_z)
    tmpz = abz

*   get angle for rotation on z-x plane to make abx=0
    theta_y = arg( tmpz, tmpx )
    if( theta_y = 9999 ) ; theta_y = 0 ; endif
    r_abz = tmpz * math_cos(-theta_y) - tmpx * math_sin(-theta_y)
    r_abx = tmpz * math_sin(-theta_y) + tmpx * math_cos(-theta_y)
    r_aby = tmpy
*    say '  (r_abx,r_aby,r_abz) = (' % math_format("%8.3f",r_abx) % ',' % math_format("%8.3f",r_aby) % ',' math_format("%8.3f",r_abz) % ')'

*   rotate I
    tmpx = _ix * math_cos(-theta_z) - _iy * math_sin(-theta_z)
    tmpy = _ix * math_sin(-theta_z) + _iy * math_cos(-theta_z)
    tmpz = _iz
    r_iz = tmpz * math_cos(-theta_y) - tmpx * math_sin(-theta_y)
    r_ix = tmpz * math_sin(-theta_y) + tmpx * math_cos(-theta_y)
    r_iy = tmpy
*    say '  (r_ix,r_iy,r_iz) = (' % math_format("%8.3f",r_ix) % ',' % math_format("%8.3f",r_iy) % ',' math_format("%8.3f",r_iz) % ')'

*    'set line 5' ; 'arrow 3 2 '3+r_abx' '2+r_aby
*    'set line 6' ; 'arrow 3 2 '3+r_ix' '2+r_iy

*   fold with z-axis to obtain reflection vector R
     r_rx = -r_ix ; r_ry = -r_iy ; r_rz = r_iz
     r_rx = -r_rx ; r_ry = -r_ry ; r_rz = -r_rz

*   reversely rotate AxB (for check)
*    tmpz = r_abz * math_cos(theta_y) - r_abx * math_sin(theta_y)
*    tmpx = r_abz * math_sin(theta_y) + r_abx * math_cos(theta_y)
*    tmpy = r_aby
*    testx = tmpx * math_cos(theta_z) - tmpy * math_sin(theta_z)
*    testy = tmpx * math_sin(theta_z) + tmpy * math_cos(theta_z)
*    testz = tmpz
*    'set line 7' ; 'arrow 3 2 '3+testx' '2+testy

*   reversely rotate R
    tmpz = r_rz * math_cos(theta_y) - r_rx * math_sin(theta_y)
    tmpx = r_rz * math_sin(theta_y) + r_rx * math_cos(theta_y)
    tmpy = r_ry
    rx = tmpx * math_cos(theta_z) - tmpy * math_sin(theta_z)
    ry = tmpx * math_sin(theta_z) + tmpy * math_cos(theta_z)
    rz = tmpz
*    'set line 7' ; 'arrow 3 4 '3+rx' '4+ry
*    say '  (rx,ry,rz) = (' % math_format("%8.3f",rx) % ',' % math_format("%8.3f",ry) % ',' math_format("%8.3f",rz) % ')'

*  obtain angle between R and E
    theta = ( rx*ex + ry*ey + rz*ez ) / ( math_sqrt( rx*rx + ry*ry + rz*rz ) * math_sqrt( ex*ex + ey*ey + ez*ez) )

    theta = math_acos(theta)

    if( r_abz * r_iz > 0 )
      theta = -999
*      say ' -> not reflected'
    endif
return theta


function alpha2bri( alpha )
  cr_alpha = _pi * 1.0 / 2.0
*  cr_alpha = _pi * 3.0 / 7.0
*  cr_alpha = _pi * 2.0 / 5.0
*  cr_alpha = _pi * 1.0 / 3.0
  bmin = 100
  bmax = 225
  
  if( alpha = -999 )
* no reflection
    b = bmin
  else
*   brightest
    if( alpha < cr_alpha )
      b = bmax
    else
*     medium brightness
*      b = 135
      b = bmax - (bmax-bmin) * (alpha-cr_alpha)/(135*_d2r-cr_alpha)
*      b = bmax - (bmax-bmin) * (alpha-cr_alpha)/(180*_d2r-cr_alpha)
      if( b > bmax ) ; b = bmax ; endif
    endif
  endif
return b



*************************************************
*
* rotate (_x.n, _y.n, _z.n)
* angle in degree
*
function rotate( rot_p, rot_q, rot_r )
  _rotfinx = _rotfinx + rot_p
  _rotfiny = _rotfiny + rot_q
  _rotfinz = _rotfinz + rot_r

  say "rotating..."
  rot_p = rot_p * _d2r
  rot_q = rot_q * _d2r
  rot_r = rot_r * _d2r

* rotation with respect to r (x-y plane)
  i = 1
  tmpsin = math_sin(rot_r)
  tmpcos = math_cos(rot_r)
  while( i <= _xn )
    x_org = _x.i
    y_org = _y.i
    z_org = _z.i
    _x.i = x_org * tmpcos - y_org * tmpsin
    _y.i = x_org * tmpsin + y_org * tmpcos
    _z.i = z_org
    i = i + 1
  endwhile

* rotation with respect to q (z-x plane)
  i = 1
  tmpsin = math_sin(rot_q)
  tmpcos = math_cos(rot_q)
  while( i <= _xn )
    x_org = _x.i
    y_org = _y.i
    z_org = _z.i
    _z.i = z_org * tmpcos - x_org * tmpsin
    _x.i = z_org * tmpsin + x_org * tmpcos
    _y.i = y_org
    i = i + 1
  endwhile

* rotation with respect to p (y-z plane)
  i = 1
  tmpsin = math_sin(rot_p)
  tmpcos = math_cos(rot_p)
  while( i <= _xn )
    x_org = _x.i
    y_org = _y.i
    z_org = _z.i
    _y.i = y_org * tmpcos - z_org * tmpsin
    _z.i = y_org * tmpsin + z_org * tmpcos
    _x.i = x_org
    i = i + 1
  endwhile
return


*************************************************
function get_lsmask( x, y, z )
  rot_p = -_rotfinx * _d2r
  rot_q = -_rotfiny * _d2r
  rot_r = -_rotfinz * _d2r

* rotation with respect to p (y-z plane)
  tmpsin = math_sin(rot_p)
  tmpcos = math_cos(rot_p)
  x_org = x
  y_org = y
  z_org = z
  y = y_org * tmpcos - z_org * tmpsin
  z = y_org * tmpsin + z_org * tmpcos
  x = x_org

* rotation with respect to q (z-x plane)
  tmpsin = math_sin(rot_q)
  tmpcos = math_cos(rot_q)
  x_org = x
  y_org = y
  z_org = z
  z = z_org * tmpcos - x_org * tmpsin
  x = z_org * tmpsin + x_org * tmpcos
  y = y_org

* rotation with respect to r (x-y plane)
  tmpsin = math_sin(rot_r)
  tmpcos = math_cos(rot_r)
  x_org = x
  y_org = y
  z_org = z
  x = x_org * tmpcos - y_org * tmpsin
  y = x_org * tmpsin + y_org * tmpcos
  z = z_org

  lat = math_asin( z / _r ) * _r2d

  if( math_abs(math_abs(lat)-90) < 0.1 )
    if( lat < _lsmask_latmin ) ; lat = _lsmask_latmin ; endif
    if( lat > _lsmask_latmax ) ; lat = _lsmask_latmax ; endif
    lon = 0
  else
    tmp = x / (_r * math_cos( lat*_d2r ) )
    tmp = xmath_max( tmp, -1 )
    tmp = xmath_min( tmp,  1 )
    if( y >= 0 )
      lon = math_acos( tmp ) * _r2d
    else
      lon = 180 + ( 180 - math_acos( tmp ) * _r2d )
    endif

  endif

  'set lon 'lon
  'set lat 'lat
  lsmask = v2s( 'lsmask' )

  if( _verbose = 1 )
    say '  -> lon=' % lon % ' lat=' % lat
    say '  ->' % lsmask
  endif
return lsmask


*************************************************
function print_x()
  say 'vertex position'
  i = 1
  while( i <= _xn )
    say '  (_x.' % i % ', _y.' % i % ', _z.' % i % ') = (' % math_format("%8.3f",_x.i) % ', ' % math_format("%8.3f",_y.i) % ', ' % math_format("%8.3f",_z.i) % ')'
    i = i + 1
  endwhile
return


*************************************************
function print_vlink()
  say 'neighboring vertex'
  i = 1
  while( i <= _xn )
    str = ''
    j = 1
    while( j <= 6 )
      if( _vlink.i.j = -999 | valnum(_vlink.i.j) != 1 ) ; break ; endif
*      if( _vlink.i.j = -999  ) ; break ; endif
      if( j >= 2 ) ; str = str % ', ' ; endif
*      str = str % math_format("%3d",_vlink.i.j)
      str = str % _vlink.i.j
      j = j + 1
    endwhile
    say '  ' % i % '-th vertex: ' % str
    i = i + 1
  endwhile
return


*************************************************
function print_trin()
  say 'indices of which triangle made'
  i = 1
  while( i <= _trin )
    str = ''
    j = 1
    while( j <= 3 )
*      if( _vlink.i.j = -999 | valnum(_vlink.i.j) != 1 ) ; break ; endif
*      if( _vlink.i.j = -999  ) ; break ; endif
      if( j >= 2 ) ; str = str % ', ' ; endif
*      str = str % math_format("%3d",_vlink.i.j)
      str = str % _trin.i.j
      j = j + 1
    endwhile
    say '  ' % i % '-th triangle: ' % str
    i = i + 1
  endwhile
return


* n1, n2 -> return j, where _vlink.n1.j = n2
function get_vlink_2( n1, n2 )
  j = 1
  while( j <= 6 )
*say _vlink.n1.j
    if( _vlink.n1.j = n2 ) ; return j ; endif
    j = j + 1
  endwhile
return -999



*************************************************
function help()
  say 'ico [ "glevel" [ "xo" "yo" ] ]'
  say '    [ -rotz "xy-degree" ] [ -rotx "yz-degree" ] [ -roty "zx-degree" ]'
  say '    [ -tri-line ]'
  say '    [ -tri-line-color "color-number" ]'
  say '    [ -tri-line-thick "thickness" ]'
  say '    [ -tri-fill ]'
  say '    [ -tri-mark ]'
  say '    [ -tri-mark-size "size" ]'
  say '    [ -tri-number ]'
  say '    [ -tri-color '
  say '      (   "color-number"'
  say '        | basic-region'
  say '        | colorful'
  say '        | light'
  say '        | lsmask'
  say '        | rgb "r" "g" "b"'
  say '      )'
  say '    ]'
  say '    [ -hp-line ]'
  say '    [ -hp-line-color "color-number" ]'
  say '    [ -hp-line-thick "thickness" ]'
  say '    [ -hp-fill ]'
  say '    [ -hp-color ( "color-number" | colorful | lsmask ) ]'
  say '    [ -hp-mark ]'
  say '    [ -hp-mark-size "size" ]'
  say '    [ -hp-number ]'
  say '    [ -color-kind "kind-for-color" ]'
  say '    [ -color-num "number-of-colors" ]'
  say '    [ -lsmask-color "color-number-land" "color-number-ocean" ]'
  say '    [ -light "ix" "iy" "iz" ]'
  say '    [ -size "triangle-size" ]'
  say '    [ -v | -verbose ]'
  say ''
  say ''
  say ''
  say '(1) draw tri-grid with line (glevel=1, tri-line is default)'
  say '  ga-> ico 1 -tri-line'
  say ''
  say '(2) draw tri-grid with line (glevel=1, rotate to draw Asia)'
  say '  ga-> ico 1 -rotz 135 -rotx -80'
  say ''
  say '(3) draw hex-pent-grid with line'
  say '  ga-> ico 1 -hp-line'
  say ''
  say '(4) draw both tri- and hex-pent-grids with line'
  say '  ga-> ico 1 -hp-line -tri-line'
  say ''
  say '(5) draw tri-grids with filled color'
  say '  ga-> ico 1 -tri-fill'
  say ''
return

