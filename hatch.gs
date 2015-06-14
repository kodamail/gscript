*
* Help is in the end of this script
*
function hatch( args )
  _version='0.04r1'

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  var     = 'none'
  vmin    = 'none'
  vmax    = 'none'
  density = 0.01
  int     = 0.1
  angle   = 45
  color   = 1
  type    = 1
  thickness = 1

  varmin  = 'none'
  varmax  = 'none'

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-min'       ); vmin      = subwrd(args,i); i=i+1; break; endif
      if( arg = '-max'       ); vmax      = subwrd(args,i); i=i+1; break; endif
      if( arg = '-density'   ); density   = subwrd(args,i); i=i+1; break; endif
      if( arg = '-int'       ); int       = subwrd(args,i); i=i+1; break; endif
      if( arg = '-angle'     ); angle     = subwrd(args,i); i=i+1; break; endif
      if( arg = '-color'     ); color     = subwrd(args,i); i=i+1; break; endif
      if( arg = '-type'      ); type      = subwrd(args,i); i=i+1; break; endif
      if( arg = '-thickness' ); thickness = subwrd(args,i); i=i+1; break; endif

*** var, min, max
      if( var != 'none' & vmin != 'none' & vmax = 'none' & valnum(arg) != 0 )
        vmax = arg
        break
      endif
      if( var != 'none' & vmin = 'none' & valnum(arg) != 0 )
        vmin = arg
        break
      endif
      if( var = 'none' & valnum(arg) = 0 )
        var    = arg
        varmin = arg
        break
      endif
      if( varmax = 'none' & valnum(arg) = 0 )
        varmax = arg
        break
      endif

      say 'syntax error : 'arg
      say 'type "hatch" for help'
      return

    endwhile
  endwhile


* draw hatch for each angle
  length = math_strlen( angle )
  i = 1
  angletmp = ''
  while( i <= length )
    c  = substr( angle, i, 1 )
    if( c = ',' )
      hatchcore( var, vmin, vmax, density, int, angletmp, color, type, thickness, varmin, varmax )
      angletmp = ''
    else
      angletmp = angletmp % c
    endif
    i = i + 1
  endwhile
  hatchcore( var, vmin, vmax, density, int, angletmp, color, type, thickness, varmin, varmax )

return



function hatchcore( var, vmin, vmax, density, int, angle, color, type, thickness, varmin, varmax )


*** adjust angle
*   0 <= angle < 180
*   +X axis <-> angle=0
*   anti-clockwise
  while( angle < 0 )
    angle = angle + 180
  endwhile
  angle = math_fmod( angle, 180 )

  if( vmin = 'none' ); vmin = -1e+30; endif
  if( vmax = 'none' ); vmax =  1e+30; endif


* Note:
*   x,y   : coordinate on the display (0 <= x,y <= 8.5 or 11)
*   wx,wy : coordinate on the map (e.g. lat, lon)
*   gx,gy : coordinate on the map (number)
*   gxset, gyset : string like 'set x '
*

***** Get range *****
  gxmin = -1
  gxmax = -1
  gxset = ''
  gymin = -1
  gymax = -1
  gyset = ''
  'q dims'
  i = 1
  while( i <= 4 )
    temp = sublin( result, i+1 )
    coname = subwrd( temp, 1 )
    flag = subwrd( temp, 3 )
    if( flag = "varying" )
      comin.i = subwrd( temp, 11 )
      comax.i = subwrd( temp, 13 )
      if( gxmin = -1 )
        gxmin = comin.i
        gxmax = comax.i
        gxset = 'set ' % coname
      else
        gymin = comin.i
        gymax = comax.i
        gyset = 'set ' % coname
      endif
    else
      comin.i = subwrd( temp, 9 )
      comax.i = comin.i
    endif

    i = i + 1
  endwhile

  'set x 'comin.1' 'comax.1
  'set y 'comin.2' 'comax.2
  'set z 'comin.3' 'comax.3
  'set t 'comin.4' 'comax.4

  'q gxinfo'
  temp = sublin( result, 3 )
  xmin = subwrd( temp, 4 )
  xmax = subwrd( temp, 6 )
  temp = sublin( result, 4 )
  ymin = subwrd( temp, 4 )
  ymax = subwrd( temp, 6 )
*  say xmin % ' ' % xmax % ' ' % ymin % ' ' % ymax

*** degree -> radian
  rangle = angle * 4 * math_atan(1) / 180

  if( 0 <= angle & angle < 45 )
    xint = 0
    yint = int / math_cos(rangle)
    xstart = xmin
    ystart = ymin - (xmax-xmin) * math_tan(rangle)
    xend = 0
    yend = ymax
    xdensity = density * math_cos(rangle)
    ydensity = density * math_sin(rangle)
  endif
  if( 45 <= angle & angle < 90 )
    xint = int / math_sin(rangle)
    yint = 0
    xstart = xmin - (ymax-ymin) / math_tan(rangle)
    ystart = ymin
    xend = xmax
    xdensity = density * math_cos(rangle)
    ydensity = density * math_sin(rangle)
  endif
  if( 90 <= angle & angle < 135 )
    xint = int / math_sin(rangle)
    yint = 0
    xstart = xmin
    ystart = ymin
    xend = xmax - (ymax-ymin) / math_tan(rangle)
    yend = 0
    xdensity = density * math_cos(rangle)
    ydensity = density * math_sin(rangle)
  endif
  if( 135 <= angle & angle < 180 )
    xint = 0
    yint = -int / math_cos(rangle)
    xstart = xmin
    ystart = ymin
    xend = 0
    yend = ymax - (xmax-xmin) * math_tan(rangle)
    xdensity = -density * math_cos(rangle)
    ydensity = -density * math_sin(rangle)
  endif

*  say xstart % ' ' % ystart
*  say xint % ' ' % yint
*  say xdensity % ' ' % ydensity

  line = ''

  while( ( xint > 0 & xstart <= xend ) | ( yint > 0 & ystart <= yend ) )

*   set start point of the line
    x = xstart
    y = ystart
    if( xint > 0 & x < xmin )
      x = xmin
      y = ymin + (xmin-xstart) * math_tan(rangle)
    endif
    if( yint > 0 & y < ymin )
      x = xmin + (ymin-ystart) / math_tan(rangle)
      y = ymin
    endif
*    say x % ' ' % y

*   loop for line starting from (x,y) as determined above
    while( 1 )
      if( xdensity > 0 & x > xmax ); break; endif
      if( xdensity < 0 & x < xmin ); break; endif
      if( ydensity > 0 & y > ymax ); break; endif
      if( ydensity < 0 & y < ymin ); break; endif

      if( x < xmin | x > xmax | y < ymin | y > ymax )
        x = x + xdensity
        y = y + ydensity
        continue
      endif

      'set x 'comin.1' 'comax.1
      'set y 'comin.2' 'comax.2
      'set z 'comin.3' 'comax.3
      'set t 'comin.4' 'comax.4


*     get target coordinates (gx,gy), (wx,wy) at (x,y)
      'q xy2gr 'x' 'y
      gx = subwrd( result, 3 )
      gy = subwrd( result, 6 )
      'q xy2w 'x' 'y
      wx = subwrd( result, 3 )
      wy = subwrd( result, 6 )
*      say 'xy(' % x % ',' % y % ') : gr(' % gx % ',' % gy % ') : w(' % wx % ',' % wy % ')'


*     get the surrounding 4 point coordinates
      'q xy2gr 'x' 'y
      gx.1 = subwrd( result, 3 )
      gx.1 = math_int(gx.1)
      gy.1 = subwrd( result, 6 )
      gy.1 = math_int(gy.1)

      if( gx.1 < gxmin )
        gx.1 = gx.1 + 1
      endif
      if( gx.1+1 > gxmax )
        gx.1 = gx.1 - 1
      endif
      if( gy.1 < gymin )
        gy.1 = gy.1 + 1
      endif
      if( gy.1+1 > gymax )
        gy.1 = gy.1 - 1
      endif

      gx.2 = gx.1 + 1
      gy.2 = gy.1

      gx.3 = gx.1
      gy.3 = gy.1 + 1

      gx.4 = gx.1 + 1
      gy.4 = gy.1 + 1

      i = 1
      while( i <= 4 )
        'q gr2w 'gx.i' 'gy.i
        wx.i = subwrd( result, 3 )
        wy.i = subwrd( result, 6 )

        'q gr2xy 'gx.i' 'gy.i
        x.i = subwrd( result, 3 )
        y.i = subwrd( result, 6 )

*       get the surrounding 4 point values (set ccolor: dummy)
        gxset' 'gx.i

        valmin.i = 0
        valmax.i = 0

*       2D
        if( gyset != '' )
          gyset' 'gy.i
          'set ccolor 1'
          'd 'var
          val.i = subwrd( result, 4 )

          if( val.i = 'Interpolation' )
            temp = sublin( result, 2 )
            val.i = subwrd( temp, 4 )
          endif

*       1D
        else
          'set ccolor 1'
          'd 'var
          val.i = subwrd( result, 4 )

          if( val.i = 'Interpolation' )
            temp = sublin( result, 2 )
            val.i = subwrd( temp, 4 )
          endif

          if( varmin != 'none' & varmax != 'none' )
            'set ccolor 1'
            'd 'varmin
            valmin.i = subwrd( result, 4 )
            'set ccolor 1'
            'd 'varmax
            valmax.i = subwrd( result, 4 )
*            say val.i % ' ' % valmin.i % ' ' % valmax.i
          endif

        endif


*       get the distance from the target point to the surrounding 4 points
        r.i = math_sqrt( (x.i-x)*(x.i-x)+(y.i-y)*(y.i-y) )

        i = i + 1
      endwhile
    
*      say 'xy(' %  x.1 % ',' %  y.1 % ') - (' %  x.4 % ',' %  y.4 % ')'
*      say 'gr(' % gx.1 % ',' % gy.1 % ') - (' % gx.4 % ',' % gy.4 % ')'
*      say 'w(' % wx.1 % ',' % wy.1 % ') - (' % wx.4 % ',' % wy.4 % ')'


***   Interpolation ( 1/r^2 weighted )
* for sps, nsp (which is the best way...)
*      say r.1 % ' ' % r.2 % ' ' % r.3 % ' ' % r.4
      r123=math_pow(r.1 * r.2 * r.3, 2)
      r124=math_pow(r.1 * r.2 * r.4, 2)
      r134=math_pow(r.1 * r.3 * r.4, 2)
      r234=math_pow(r.2 * r.3 * r.4, 2)
      rsumrev = 1.0 / ( r123 + r124 + r134 + r234 )
      val = ( r123*val.4 + r124*val.3 + r134*val.2 + r234*val.1 ) * rsumrev
*     For 1D with linefill
      if( varmin != 'none' & varmax != 'none' )
        vmintmp = ( r123*valmin.4 + r124*valmin.3 + r134*valmin.2 + r234*valmin.1 ) * rsumrev
        vmaxtmp = ( r123*valmax.4 + r124*valmax.3 + r134*valmax.2 + r234*valmax.1 ) * rsumrev
      endif
*      say val.1 % ' ' % val.2 % ' ' % val.3 % ' ' % val.4 % ' ' % val

****   Interpolation ( 3 times linear ) ***
**     1(x.1,y.1), 2(x.2,y.2=y.1) -> v12(x,y.1)
**      if( x.2-x.1 = 0 ) ; w = 0
*      if( math_abs(x.2-x.1) <= 1e-3 ) ; w = 0
*      else ; w = (x-x.1) / (x.2-x.1) ; endif
*      v12    = w * val.2    + (1-w) * val.1
*      vmin12 = w * valmin.2 + (1-w) * valmin.1
*      vmax12 = w * valmax.2 + (1-w) * valmax.1
*
**     3(x.3,y.3), 4(x.4,y.4=y.3) -> v34(x,y.3)
**      if ( x.2-x.1 = 0 ) ; w = 0
*      if ( math_abs(x.2-x.1) <= 1e-3 ) ; w = 0
*      else ; w = (x-x.1) / (x.2-x.1) ; endif
*      v34    = w * val.4    + (1-w) * val.3
*      vmin34 = w * valmin.4 + (1-w) * valmin.3
*      vmax34 = w * valmax.4 + (1-w) * valmax.3
*
**     v12(x,y.1), v34(x,y.3) -> val(x,y)
**      if ( y.3-y.1 = 0 ) ; w = 0
*      if ( math_abs(y.3-y.1) <= 1e-3 ) ; w = 0
*      else ; w = (y-y.1) / (y.3-y.1) ; endif
*      val     = w * v34    + (1-w) * v12
*      vmintmp = w * vmin34 + (1-w) * vmin12
*      vmaxtmp = w * vmax34 + (1-w) * vmax12

***** judge & draw *****

*** For 2D and 1D without linefill
      if( varmin = 'none' | varmax = 'none' )

*       find point which should be drawn
        if( vmin <= val & val <= vmax & line = '' )
*        if( vmin <= val & val <= vmax & line = '' & wy < 0 )
          line = x % ' ' % y % ' '
        endif

*       accelerator (if needed)
        if( vmin <= val & val <= vmax )
*        if( vmin <= val & val <= vmax  & wy < 0 )
          if( vmin <= val.1 & val.1 <= vmax & vmin <= val.2 & val.2 <= vmax & vmin <= val.3 & val.3 <= vmax & vmin <= val.4 & val.4 <= vmax )
            while( x > x.1 & y > y.1 & x < x.4 & y < y.4 )
              x = x + xdensity
              y = y + ydensity
            endwhile
          endif
        endif

*       draw line
        if( ( val < vmin | vmax < val ) & line != '' )
*        if( ( val < vmin | vmax < val  | wy > 0 ) & line != '' )

          line = line % x-xdensity % ' ' % y-ydensity
          'set line 'color' 'type' 'thickness
          'draw line 'line
          line=''
        endif

*       accelerator (if needed)
        if( val < vmin | vmax < val )
*        if( val < vmin | vmax < val | wy > 0 )
          if( ( val.1 < vmin & val.2 < vmin & val.3 < vmin & val.4 < vmin ) | ( vmax < val.1 & vmax < val.2 & vmax < val.3 & vmax < val.4 ) )
            while( x > x.1 & y > y.1 & x < x.4 & y < y.4 )
              x = x + xdensity
              y = y + ydensity
            endwhile
          endif
        endif

*       draw line before loop end
        if( ( x+xdensity < xmin | x+xdensity > xmax | y+ydensity < ymin | y+ydensity > ymax ) & line != '' )
          line = line % x % ' ' % y
          'set line 'color' 'type' 'thickness
          'draw line 'line
          line=''
        endif

***   For 1D linefill
*     vmin -> vmintmp
*     vmax -> vmaxtmp
*     val -> wy
      else

*       find point which should be drawn
        if( vmintmp <= wy & wy <= vmaxtmp & line = '' )
          line = x % ' ' % y % ' '
        endif

*       accelerator (if needed)
        if( vmintmp <= wy & wy <= vmaxtmp )
          if( vmintmp <= wy.1 & wy.1 <= vmaxtmp & vmintmp <= wy.2 & wy.2 <= vmaxtmp & vmintmp <= wy.3 & wy.3 <= vmaxtmp & vmintmp <= wy.4 & wy.4 <= vmaxtmp )
            while( x > x.1 & y > y.1 & x < x.4 & y < y.4 )
              x = x + xdensity
              y = y + ydensity
            endwhile
          endif
        endif

*       draw line
        if( ( wy < vmintmp | vmaxtmp < wy ) & line != '' )
          line = line % x-xdensity % ' ' % y-ydensity
          'set line 'color' 'type' 'thickness
          'draw line 'line
          line=''
        endif

*       accelerator (if needed)
        if( wy < vmintmp | vmaxtmp < wy )
          if( ( wy.1 < vmintmp & wy.2 < vmintmp & wy.3 < vmintmp & wy.4 < vmintmp ) | ( vmaxtmp < wy.1 & vmaxtmp < wy.2 & vmaxtmp < wy.3 & vmaxtmp < wy.4 ) )
            while( x > x.1 & y > y.1 & x < x.4 & y < y.4 )
              x = x + xdensity
              y = y + ydensity
            endwhile
          endif
        endif

*       draw line before loop end
        if( ( x+xdensity < xmin | x+xdensity > xmax | y+ydensity < ymin | y+ydensity > ymax ) & line != '' )
          line = line % x % ' ' % y
          'set line 'color' 'type' 'thickness
          'draw line 'line
          line=''
        endif

      endif


      x = x + xdensity
      y = y + ydensity
    endwhile

    xstart = xstart + xint
    ystart = ystart + yint
  endwhile

  'set x 'comin.1' 'comax.1
  'set y 'comin.2' 'comax.2
  'set z 'comin.3' 'comax.3
  'set t 'comin.4' 'comax.4

return


*
* help
*
function help()
  say ' Name:'
  say '   hatch '_version' - draw hatch '
  say ' '
  say ' Usage:'
  say '   hatch ( var ( min max | -min min | -max max ) | varmin varmax ) '
  say '         [-angle angle] [-density density] [-int int]'
  say '         [-color color] [-type type] [-thickness thickness]'
  say ' '
  say '     var           : variable'
  say '     varmin,varmax : variable range (only for 1D chart)'
  say '     min,max       : value range to be drawn (default: [-1e+30:1e+30])'
  say '     varmin,varmax : range of variable to be drawn (only for 1D chart)'
  say '     angle         : angle of the hatch (default: 45). '
  say '                     hatch is parallel to +X axis when angle=0.'
  say '                     anti-clockwise.'
  say '                     you can specify two or more angles by'
  say '                     comma-separated values, e.g., -angle 45,90.'
  say '     density       : density (or accuracy) of the hatch (default: 0.01)'
  say '     int           : hatch interval (default: 0.1)'
  say '     color         : hatch color (default: 1)'
  say '     type          : hatch line type (default: 1)'
  say '     thickness     : hatch line thickness (default: 1)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say '   Method of drawing hatch is not equivalent to that in grads'
  say '   so please check whether hatch is correctly drawn'
  say ''
  say ' Copyright (C) 2008-2012 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
