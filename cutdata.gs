*
* Help is in the end of this script
*
function cutdata( args )
 _version = '0.01r1'
  rc = gsfallow( 'on' )

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  xmin = -9999
  xmax = -9999
  ymin = -9999
  ymax = -9999
  zmin = -9999
  zmax = -9999
  tmin = -9999
  tmax = -9999
  timemin = ''
  timemax = ''
  ctl_in  = ''
  grd_out = ''
  vnames  = ''
  undef   = ''

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-t' )
        timemin = ''
        timemax = ''
        tmp = subwrd( args, i ); i = i + 1
*       -t t1 t2
        if( find( tmp, '-' ) <= 0 )
          tmin = tmp
          tmax = subwrd( args, i ); i = i + 1
          if( valnum(tmax) != 1 )
            say 'error: invalid time range (-t ' % tmin % ' ' % tmax % ')'
            exit
          endif
*       -t [t1-t2]
        else
          tmin = rgnwrd( tmp, 1, 1, '-' )
          tmin = substr( tmin, 2, math_strlen(tmin)-1 )
          tmax = rgnwrd( tmp, 2, 2, '-' )
          tmax = substr( tmax, 1, math_strlen(tmax)-1 )
          flag_tmin = substr( tmp, 1, 1 )
          if( flag_tmin = '(' ) ; tmin = tmin + 1 ; endif
          flag_tmax = substr( tmp, math_strlen(tmp), 1 )
          if( flag_tmax = ')' ) ; tmax = tmax - 1 ; endif
        endif
        break
      endif
      if( arg = '-time' )
        tmin = -9999
        tmax = -9999
        tmp = subwrd( args, i ); i = i + 1
*       -time time1 time2
        if( find( tmp, '-' ) <= 0 )
          timemin = tmp
          timemax = subwrd( args, i ); i = i + 1
*       -time [time1-time2]
        else
          timemin = rgnwrd( tmp, 1, 1, '-' )
          timemin = substr( timemin, 2, math_strlen(timemin)-1 )
          timemax = rgnwrd( tmp, 2, 2, '-' )
          timemax = substr( timemax, 1, math_strlen(timemax)-1 )
          flag_timemin = substr( tmp, 1, 1 )
          flag_timemax = substr( tmp, math_strlen(tmp), 1 )
        endif
        break
      endif

      if( arg = '-x' )
        xmin = subwrd( args, i ); i = i + 1
        xmax = subwrd( args, i ); i = i + 1
        break
      endif
      if( arg = '-y' )
        ymin = subwrd( args, i ); i = i + 1
        ymax = subwrd( args, i ); i = i + 1
        break
      endif
      if( arg = '-z' )
        zmin = subwrd( args, i ); i = i + 1
        zmax = subwrd( args, i ); i = i + 1
        break
      endif

      if( arg = '-undef' ) ; undef = subwrd( args, i ); i = i + 1; break; endif

      if( arg = '-var' ) ; vnames = subwrd( args, i ); i = i + 1; break; endif

*** ctl_in, grd_out
      if( ctl_in  = '' ); ctl_in  = arg; break; endif
      if( grd_out = '' ); grd_out = arg; break; endif
      say 'syntax error : 'arg
      return
    endwhile
  endwhile

***** check arguments *****
  if( ctl_in = '' )
    say 'error: input control file name is not specified.'
    exit
  endif
  if( grd_out = '' )
    say 'error: output file name is not specified.'
    exit
  endif

  ret = read( grd_out )
  line = sublin( ret, 1 )
  stat = subwrd( line, 1 )
  if( stat = 0 )
    say 'output file (' % grd_out % ') exists.'
    exit
  endif

***** open control file *****
  'xopen 'ctl_in
  f = last()
  'set dfile 'f

  if( vnames = '' )
    vnames = qctlinfo( f, 'vlist', 0 )
    vnames = strrep( vnames, ' ', ',' )
    say vnames
  endif	

  v = 1
  while( 1 = 1 )
    vname.v = rgnwrd( vnames, v, v, ',' )
    if( vname.v = '' | vname.v = vnames ) ; break ; endif
    v = v + 1
  endwhile
  if( vnames = vname.1 ) ; vmax = 1 
  else ; vmax = v - 1 ; endif

  'set gxout fwrite'
  'set fwrite -be 'grd_out
  if( undef = '' )
    'set undef dfile'
  else
    'set undef 'undef
  endif

  if( timemin != '' )
    tmin = time2t( timemin )
    tmax = time2t( timemax )
    if( flag_timemin = '(' ) ; tmin = tmin + 1 ; endif
    if( flag_timemax = ')' ) ; tmax = tmax - 1 ; endif
  endif

  xdef = qctlinfo( f, 'xdef', 1 )
  ydef = qctlinfo( f, 'ydef', 1 )
  zdef = qctlinfo( f, 'zdef', 1 )
  tdef = qctlinfo( f, 'tdef', 1 )

  if( xmin = -9999 ) ; xmin = 1    ; endif
  if( xmax = -9999 ) ; xmax = xdef ; endif
  if( ymin = -9999 ) ; ymin = 1    ; endif
  if( ymax = -9999 ) ; ymax = ydef ; endif
  if( zmin = -9999 ) ; zmin = 1    ; endif
  if( zmax = -9999 ) ; zmax = zdef ; endif
  if( tmin = -9999 ) ; tmin = 1    ; endif
  if( tmax = -9999 ) ; tmax = tdef ; endif

***** cut data *****
  prex( 'set x 'xmin' 'xmax )
  prex( 'set y 'ymin' 'ymax )
  say 'zmin=' % zmin % ', zmax=' % zmax
  t = tmin

  while( t <= tmax )
    prompt '  t=' % t % ': '
    'set t 't
    v = 1
    while( v <= vmax )
      if( v >= 2 ) ; prompt ', ' ; endif
      prompt vname.v
      z = zmin
      while( z <= zmax )
        'set z 'z
        'd 'vname.v
        z = z + 1
      endwhile
      v = v + 1
    endwhile
    say ''
    t = t + 1
  endwhile

  'disable fwrite'
  'close 'f
  'set gxout contour'
return

*
* help
*
function help()
  say ' Name:'
  say '   cutdata '_version' - cut data'
  say ' '
  say ' Usage:'
  say '   cutdata input-ctl output-grd '
  say '           [-x xmin xmax]'
  say '           [-y ymin ymax]'
  say '           [-z zmin zmax]'
  say '           [-t tmin tmax]'
  say '           [-t timestep-range | -time timemin tmimeax | -time time-range]'
  say '           [-var vname1,vname2,...]'
  say '           [-undef undefined-value]'
  say ''
  say '     input-ctl        : Control file name for input.'
  say '     output-grd       : Output flat-binary file name'
  say '                        cutdata.gs stops if the file already exists.'
  say '     -x xmin xmax     : X range to cut.'
  say '     -y ymin ymax     : Y range to cut.'
  say '     -z zmin zmax     : Z range to cut.'
  say '     -t tmin tmax     : Time step range to cut.'
  say '     -t timestep-range: Time step range to cut.'
  say '                        e.g. [1-3]: 1<=t<=3 is stored'
  say '                        e.g. [1-3): 1<=t<3 is stored'
  say '     -time timemin timemax '
  say '                      : Time range to cut.'
  say '     -time time-range:  Time range to cut.'
  say '                        e.g. [01jan2000-02jan2000]: 01jan2000<=time<=02jan2000 is stored'
  say '                        e.g. [01jan2000-02jan2000): 01jan2000<=t<02jan2000 is stored'
  say '     -var vname1,vname2,...'
  say '                      : List of variable names to cut'
  say '     -undef undefined-value'
  say '                      : Undefined value for output data.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   cutdata.gs depends on xopen.gs, last.gsf, qctlinfo.gsf, and rgnwrd.gsf.'
  say ''
  say ' Copyright (C) 2014-2014 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
