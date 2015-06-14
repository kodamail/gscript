function setlabs( args )
  _version = '0.01b1'
  rc = gsfallow("on")

 if( args = '' )
    help()
    return
  endif

***** Default value *****
  axis = ''
  int  = 0
  mul = '1'
  add = '0'

  opmax = 0

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-int' )  ; int=subwrd(args,i) ; i=i+1 ; break ; endif

      if( arg = '-mul' | arg = '-add' )
        opmax = opmax + 1
        op.opmax    = arg
        opval.opmax = subwrd(args,i)
        i=i+1
        break
      endif

*** dim
      if( axis = '' )
        axis = arg
        break
      endif

      say 'syntax error: 'arg
      
      return

    endwhile
  endwhile

  type.1 = 'xtype' ; dim.1 = 'lon'
  type.2 = 'ytype' ; dim.2 = 'lat'
  type.3 = 'ztype' ; dim.3 = 'lev'

  cnt = 0
  i = 1
  while( i <= 3 )
    tmp = qdims( type.i )
    if( tmp = 'varying' )
      cnt = cnt + 1
      if( ( cnt = 1 & axis = 'xl' ) | ( cnt = 2 & axis = 'yl' ) )
        dim = dim.i
        break
      endif
    endif
    i = i + 1
  endwhile

  min = qdims( dim'min' )
  max = qdims( dim'max' )
  o = 1
  while( o <= opmax )
    if( op.o = '-mul' )
      min = min * (opval.o)
      max = max * (opval.o)
    endif
    if( op.o = '-add' )
      min = min + (opval.o)
      max = max + (opval.o)
    endif
    o = o + 1
  endwhile

  if( int > 0 )
    num = ( max - min ) / int
    if( valnum(num) != 1 )
      say 'error in setlabs.gs: number of labels must be an integer.'
      return
    endif
  else
    num = 10
    int = ( max - min ) / num
  endif

  n = 0
  val = min
  while( n <= num )
    val_disp = val
    
*    o = 1
*    while( o <= opmax )
*      if( op.o = '-mul' )
*        val_disp = val_disp * (opval.o)
*      endif
*      if( op.o = '-add' )
*        val_disp = val_disp + (opval.o)
*      endif
*      o = o + 1
*    endwhile

    if( n = 0 )
      labs = val_disp
    else
      labs = labs % '|' % val_disp
    endif

    n = n + 1
    val = val + int
  endwhile

*  say labs
  'set 'axis'abs 'labs
return


*
* help
*
function help()
  say ' Name:'
  say '   setlabs '_version' - set x/y labels'
  say ' '
  say ' Usage:'
  say '   setlabs ( xl | yl )'
  say '           [ (-mul value1) | (-add value1) ]'
  say '           [ (-mul value2) | (-add value2) ] ...'
  say '           [-int interval]'
  say ''
  say '     ( xl | yl )      : xlabels or ylabels.'
  say '     (-mul value1)    : label values are multiplied by value1.'
  say '     (-add value1)    : label values are added by value1.'
  say '         These are operated by the order appeared in the arguements.'
  say '     -int interval    : interval of label values (after operator is applied).'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2012-2012 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
