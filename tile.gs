*
* Help is in the end of this script
*
function tile( args )
  _version = '0.01b1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  var       = 'none'
  vmin      = 'none'
  vmax      = 'none'
  int       = 9
  color     = 1
  type      = 5
  thickness = 3
  varmin    = 'none'
  varmax    = 'none'

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
      if( arg = '-int'       ); int       = subwrd(args,i); i=i+1; break; endif
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
      say 'type "tile" for help'
      return

    endwhile
  endwhile

  if( vmin = 'none' ); vmin = -1e+30; endif
  if( vmax = 'none' ); vmax =  1e+30; endif

  'set tile 1 'type' 'int' 'int' 'thickness' 'color
  'set rgb 16 tile 1'

* for 1-D
  if( qdims( 'varying' ) = 1 )
    'set gxout linefill'
    'set lfcols -1 16'    
    'd 'varmin';'varmax

* for 2-D
  else
    'set gxout shaded'
    'set clevs 'vmin' 'vmax
    'set ccols -1 16 -1'
    'd 'var
  endif

return


*
* help
*
function help()
  say ' Name:'
  say '   tile '_version' - Draw tile (hatch).'
  say ''
  say ' Usage:'
  say '   tile ( var ( min max | -min min | -max max ) | varmin varmax ) '
  say '        [-type type] [-int int]'
  say '        [-color color] [-thickness thickness]'
  say ''
  say '     var           : Variable.'
  say '     varmin,varmax : variable range (only for 1D chart)'
  say '     min,max       : value range to be drawn (default: [-1e+30:1e+30])'
  say '     varmin,varmax : range of variable to be drawn (only for 1D chart)'
  say '     int           : integer tile interval (default: 9)'
  say '     color         : hatch color (default: 1)'
  say '     type          : hatch line type (default: 5)'
  say '     thickness     : hatch line thickness between 1-12 (default: 3)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say '   Only for GrADS 2.1 or later.'
  say ''
  say ' Copyright (C) 2015-2015 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
