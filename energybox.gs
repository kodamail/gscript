function energybox(args)

*** arguement ***
type = subwrd( args, 1 )


xbase = 0.0
ybase = 0.0
az = ''
kz = ''
ae = ''
ke = ''
w = ''
c_az_kz = ''
c_kz_ae = ''
c_ae_ke = ''
c_ke_kz = ''
c_kz_w = ''
qz = ''
qz_res = ''
qe = ''
qe_res = ''
dz_res = ''
de_res = ''

i = 2
arg = "dummy"
while( arg != "" )
  arg = subwrd( args, i )
  i = i + 1

  if( arg = "-xbase" ) ; xbase = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-ybase" ) ; ybase = subwrd( args, i ) ; i = i + 1 ; endif

  if( arg = "-az" )      ; az      = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-kz" )      ; kz      = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-ae" )      ; ae      = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-ke" )      ; ke      = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-w" )       ; w       = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-c_az_kz" ) ; c_az_kz = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-c_kz_ae" ) ; c_kz_ae = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-c_ae_ke" ) ; c_ae_ke = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-c_ke_kz" ) ; c_ke_kz = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-c_kz_w" )  ; c_kz_w  = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-qz" )      ; qz      = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-qz_res" )  ; qz_res  = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-qe" )      ; qe      = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-qe_res" )  ; qe_res  = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-dz_res" )  ; dz_res  = subwrd( args, i ) ; i = i + 1 ; endif
  if( arg = "-de_res" )  ; de_res  = subwrd( args, i ) ; i = i + 1 ; endif

endwhile



if( type = 'iwasaki4' )

  box( xbase+1.4, xbase+2.0, ybase+5.4, ybase+6.0, 'A`bZ', az )
  box( xbase+1.4, xbase+2.0, ybase+4.2, ybase+4.8, 'K`bZ', kz )
  box( xbase+2.6, xbase+3.2, ybase+5.4, ybase+6.0, 'A`bE', ae )
  box( xbase+2.6, xbase+3.2, ybase+4.2, ybase+4.8, 'K`bE', ke )

  'setfont small -angle 0'
  head = 0.15

  'arrow 'xbase+1.7' 'ybase+5.4' 'xbase+1.7' 'ybase+4.8' -head 'head
  string( xbase+1.4, ybase+5.1, c_az_kz )

  'arrow 'xbase+2.0' 'ybase+4.8' 'xbase+2.6' 'ybase+5.4' -head 'head
  'setfont small -angle 45'
  string( xbase+2.1, ybase+5.1, c_kz_ae )
  'setfont small -angle 0'

  'arrow 'xbase+2.9' 'ybase+5.4' 'xbase+2.9' 'ybase+4.8' -head 'head
  string( xbase+3.2, ybase+5.1, c_ae_ke )

  'arrow 'xbase+2.6' 'ybase+4.5' 'xbase+2.0' 'ybase+4.5' -head 'head
  string( xbase+2.3, ybase+4.3, c_ke_kz )

  'arrow 'xbase+1.1' 'ybase+6.3' 'xbase+1.4' 'ybase+6.0' -head 'head
  if( qz_res = '' ) ; string( xbase+1.1, ybase+6.5, qz )
  else ; string( xbase+1.1, ybase+6.7, qz ) ; endif
  string_bracket( xbase+1.1, ybase+6.5, qz_res )

  'arrow 'xbase+3.5' 'ybase+6.3' 'xbase+3.2' 'ybase+6.0' -head 'head
  if( qe_res = '' ) ; string( xbase+3.5, ybase+6.5, qe )
  else ; string( xbase+3.5, ybase+6.7, qe ) ; endif
  string_bracket( xbase+3.5, ybase+6.5, qe_res )


  'arrow 'xbase+1.7' 'ybase+4.2' 'xbase+1.7' 'ybase+3.9' -head 'head
  string_bracket( xbase+1.7, ybase+3.7, dz_res )

  'arrow 'xbase+2.9' 'ybase+4.2' 'xbase+2.9' 'ybase+3.9' -head 'head
  string_bracket( xbase+2.9, ybase+3.7, de_res )

endif




if( type = 'iwasaki3' )

  box( xbase+1.0, xbase+1.6, ybase+5.4, ybase+6.0, 'A`bZ', az )
  box( xbase+2.2, xbase+2.8, ybase+5.4, ybase+6.0, 'K`bZ', kz )
  box( xbase+3.4, xbase+4.0, ybase+5.4, ybase+6.0, 'W', w )

  'setfont small -angle 0 -base c'
  head = 0.15

  'arrow 'xbase+1.6' 'ybase+5.7' 'xbase+2.2' 'ybase+5.7' -head 'head
  string( xbase+1.9, ybase+5.4, c_az_kz )

  'arrow 'xbase+2.8' 'ybase+5.7' 'xbase+3.4' 'ybase+5.7' -head 'head
  string( xbase+3.1, ybase+5.4, c_kz_w )

  'arrow 'xbase+1.3' 'ybase+6.3' 'xbase+1.3' 'ybase+6.0' -head 'head
  if( qz_res = '' ) ; string( xbase+1.3, ybase+6.5, qz )
  else ; string( xbase+1.3, ybase+6.7, qz ) ; endif
  string_bracket( xbase+1.3, ybase+6.5, qz_res )

  'arrow 'xbase+3.7' 'ybase+6.3' 'xbase+3.7' 'ybase+6.0' -head 'head
  if( qe_res = '' ) ; string( xbase+3.7, ybase+6.5, qe )
  else ; string( xbase+3.7, ybase+6.7, qe ) ; endif
  string_bracket( xbase+3.7, ybase+6.5, qe_res )

  'arrow 'xbase+2.5' 'ybase+5.4' 'xbase+2.5' 'ybase+5.1' -head 'head
  string_bracket( xbase+2.5, ybase+4.9, dz_res )

  'arrow 'xbase+3.7' 'ybase+5.4' 'xbase+3.7' 'ybase+5.1' -head 'head
  string_bracket( xbase+3.7, ybase+4.9, de_res )


endif






return





function box( xmin, xmax, ymin, ymax, name, value )
  'set line 1 1 6'
  'draw rec 'xmin' 'ymin' 'xmax' 'ymax

  'setfont normal'
  x = xmin + (xmax - xmin) / 2.0
  y = ymin + (ymax - ymin) / 4.0 * 3.0
  'draw string 'x' 'y' 'name


  if( value != '' )

    'setfont small'
*  'set strsiz 0.25 0.25'
*  'set string 1 c 8'
    x = xmin + (xmax - xmin) / 2.0
    y = ymin + (ymax - ymin) / 4.0
    'draw string 'x' 'y' 'math_format("%.2f",value)
  endif

return



function string( x, y, value )
  if( value != '' )
    'draw string 'x' 'y' 'math_format("%.2f", value)
  endif
return

function string_bracket( x, y, value )
  if( value != '' )
    'draw string 'x' 'y' ('math_format("%.2f",value)')'
  endif
return
