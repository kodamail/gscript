*
* Help is in the end of this script.
*
function template( args )
  _version = '0.01r1'

  if( args = '' )
    help()
    return
  endif

*
*
* scripts
*
*

return



*
* help
*
function help()
  say ' Name:'
  say '   template '_version' - brief document'
  say ' '
  say ' Usage:'
  say '   template size [-angle angle] [-base string-base]'
  say ''
  say '     size              : tiny, small, normal, large or huge '
  say '     -angle angle      : string angle (0<=angle<360)'
  say '     -base string-base : string base (c, tl, bc, etc...), default=c'
  say ''
  say ' Necessary script(s):'
  say '   aaa.gs'
  say '   bbb.gs (if necessary)'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009-2011 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
