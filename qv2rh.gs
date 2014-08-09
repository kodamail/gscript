* qv2rh qv prs rh
function qv2rh( args )
  qv  = subwrd( args, 1 )
  tem = subwrd( args, 2 )
* prs in [Pa]
  prs = subwrd( args, 3 )
  rh  = subwrd( args, 4 )


*** get saturation vapor mixing ratio [kg/kg]
* following conv_prs.f90 in NICAM (original: Enanuel 1994, eq.4.1.2)
  'tem0 = 273.15'
  'tc = 'tem' - tem0'
  'tc = const( maskout( tc, tc+80.0 ), -80.0, -u ) + 0 * 'tem

* for liquid
  'c0 = 0.6105851e+03'
  'c1 = 0.4440316e+02'
  'c2 = 0.1430341e+01'
  'c3 = 0.2641412e-01'
  'c4 = 0.2995057e-03'
  'c5 = 0.2031998e-05'
  'c6 = 0.6936113e-08'
  'c7 = 0.2564861e-11'
  'c8 = -0.3704404e-13'
  'psatl = c0 + tc * ( c1 + tc * ( c2 + tc * ( c3 + tc * ( c4 + tc * ( c5 + tc * ( c6 + tc * ( c7 + tc * c8 )))))))'

  'c0i = 0.609868993e+03'
  'c1i = 0.499320233e+02'
  'c2i = 0.184672631e+01'
  'c3i = 0.402737184e-01'
  'c4i = 0.565392987e-03'
  'c5i = 0.521693933e-05'
  'c6i = 0.307839583e-07'
  'c7i = 0.105785160e-09'
  'c8i = 0.161444444e-12'
  'psati = c0i + tc * ( c1i + tc * ( c2i + tc * ( c3i + tc * ( c4i + tc * ( c5i + tc * ( c6i + tc * ( c7i + tc * c8i )))))))'


* lmask = 1 & imask = 0: tc >= 0
* lmask = 0 & imask = 1: tc  < 0
  'lmask = const( const( maskout(tc, tc), 1 ), 0, -u )'
  'imask = -lmask + 1 + 0 * tc'

  'qvsat = lmask * 287.04 / 461.50 * psatl / ( 'prs' - psatl ) + imask * 287.04 / 461.50 * psati / ( 'prs' - psati )'

*  'qvsat = 287.04 / 461.50 * psatl / ( 'prs' - psatl )'
*  'qvsat = 287.04 / 461.50 * psati / ( 'prs' - psati )'

  
  rh' = const( maskout( 'qv', 'qv' ), 0, -u) / qvsat * 100'

return



