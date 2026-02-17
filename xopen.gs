*
* Help is in the end of this script.
*
function xopen( args )
  rc = gsfallow( 'on' )
  _version = '0.01r2'

  if( args = '' )
    help()
    return
  endif

*** arguements ***
  show_type = 0
  arg.1 = subwrd( args, 1 )
  arg.2 = subwrd( args, 2 )
  if( arg.1 = '-t' | arg.2 = '-t' )
    show_type = 1
    if( arg.1 = '-t' ) ; fname = arg.2 ; endif
    if( arg.2 = '-t' ) ; fname = arg.1 ; endif
  else
    fname = arg.1
  endif

*** get extension ***
  length = strlen( fname )
  ext2 = substr( fname, length-2, 3 )
  ext3 = substr( fname, length-3, 4 )

  cmd = ''

*** open with sdfopen if appropriate ***
  if( ext2 = '.nc' | ext3 = '.nc4' )
    cmd = 'sdfopen'
  endif

*** open with open/xdfopen ***
  if( cmd = '' )
    if( ext3 != '.ctl' )
      fname = fname % '.ctl'
      ext3 = '.ctl'
    endif

    file_type = 'grd'
    flag_tail_ch = 0
    str_ch = ''
    while( 1 = 1 )
      ret = read( fname )
      line1 = sublin( ret, 1 )
      line2 = sublin( ret, 2 )
      if( line1 != 0 ) ; break ; endif
  
      wrd1 = subwrd( line2, 1 )
      wrd1 = chcase( wrd1, 'upper' )
      wrd2 = subwrd( line2, 2 )
      if( wrd1 = 'DSET' )
        length_tmp = strlen( wrd2 )
        ext2_tmp   = substr( wrd2, length_tmp-2, 3 )
        ext3_tmp   = substr( wrd2, length_tmp-3, 4 )
        if( ext2_tmp = '.nc' | ext3_tmp = '.nc4' )
          file_type = 'nc'
          break
        endif
        if( ext2_tmp = '%ch' )
          flag_tail_ch = 1
	endif
      endif
      if( wrd1 = 'CHSUB' & str_ch = '')
        str_ch = subwrd( line2, 4 )
      endif
    endwhile

    if( flag_tail_ch = 1 )
      length_tmp = strlen( str_ch )
      ext2_tmp   = substr( str_ch, length_tmp-2, 3 )
      ext3_tmp   = substr( wstrch, length_tmp-3, 4 )
      if( ext2_tmp = '.nc' | ext3_tmp = '.nc4' )
        file_type = 'nc'
      endif
    endif

    if( file_type = 'grd' )
      cmd = 'open'
    else
      cmd = 'xdfopen'
    endif
  endif

  if( show_type = 1 ) ; say 'using 'cmd; endif
  cmd' 'fname
  prompt result

return


*
* help
*
function help()
  say ' Name:'
  say '   xopen '_version' - Automatically choose appropriate open command (open/sdfopen/xdfopen)'
  say ' '
  say ' Usage:'
  say '   open [-t] file-name'
  say ''
  say '     file-name : filename'
  say '       (ex. test.ctl, test.nc, test)'
  say '     -t : show command to open.'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say '   This function depends on chcase.gsf.'
  say ''
  say ' Copyright (C) 2012-2026 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
