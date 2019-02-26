function checkRetina() {
  return matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)').matches;
}

const mobile = matchMedia('(max-width: 991px)');

export { checkRetina, mobile };