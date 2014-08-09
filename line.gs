*
* Help is in the end of this script
*
function line(args)
 _version='0.01r1'

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  p1 = 'none'
  q1 = 'none'
  p2 = 'none'
  q2 = 'none'
  by = 'world'

***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-by' ); by = subwrd(args,i); i = i + 1; break; endif

*** x1, y1, x2, y2
      if( p1 = 'none' ); p1 = arg; break; endif
      if( q1 = 'none' ); q1 = arg; break; endif
      if( p2 = 'none' ); p2 = arg; break; endif
      if( q2 = 'none' ); q2 = arg; break; endif

      say 'syntax error : 'arg
      return
    endwhile

  endwhile

  if( p1 = 'none' |  q1 = 'none' | p2 = 'none' | q2 = 'none' )
      say 'syntax error : too few arguement'
      return
  endif
  if( by != 'world' & by != 'grid' & by != 'xy' )
      say 'syntax error : "-by 'by'" is invalid'
  endif

  if( by = 'world' )
    'q w2xy 'p1' 'q1
    x1 = subwrd( result, 3 )
    y1 = subwrd( result, 6 )
    'q w2xy 'p2' 'q2
    x2 = subwrd( result, 3 )
    y2 = subwrd( result, 6 )
  endif

  if( by = 'grid' )
    'q gr2xy 'p1' 'q1
    x1 = subwrd( result, 3 )
    y1 = subwrd( result, 6 )
    'q gr2xy 'p2' 'q2
    x2 = subwrd( result, 3 )
    y2 = subwrd( result, 6 )
  endif

  if( by = 'xy' )
    x1 = p1
    y1 = q1
    x2 = p2
    y2 = q2
  endif

  'draw line 'x1' 'y1' 'x2' 'y2  

return


*
* help
*
function help()
  say ' Name:'
  say '   line '_version' - draw line in various coordinates'
  say ' '
  say ' Usage:'
  say '   line [-by ( world | grid | xy ) ] p1 q1 p2 q2'
  say ''
  say '     -by : unit of p1, q1, p2, q2'
  say '         world : world coordinate (e.g. lat)'
  say '         grid  : grid coordinate (grid number)'
  say '         xy    : same as "draw line"'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2010 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
