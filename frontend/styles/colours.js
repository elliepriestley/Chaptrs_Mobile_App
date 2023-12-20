export const neutral = {
  white: '#ffffff',
  s100: '#efeff6',
  s150: '#dfdfe6',
  s200: '#c7c7ce',
  s250: '#bbbbc2',
  s300: '#9f9ea4',
  s400: '#7c7c82',
  s500: '#515154',
  s600: '#38383a',
  s700: '#2d2c2e',
  s800: '#212123',
  s900: '#161617',
  black: '#000000',
};

export const main = {
  primary: '#DCC8A9',
  secondary: '#F8F6F2',
  accent: '#695203',
  danger: '#b80c09',
};

const applyOpacity = (hexColor, opacity) => {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

export const transparent = {
  clear: 'rgba(255, 255, 255, 0)',
  lightGray: applyOpacity(neutral.s300, 0.4),
  darkGray: applyOpacity(neutral.s800, 0.8),
};

export const shadeColor = (hexColor, percent) => {
  const redGamut = parseInt(hexColor.slice(1, 3), 16);
  const greenGamut = parseInt(hexColor.slice(3, 5), 16);
  const blueGamut = parseInt(hexColor.slice(5, 7), 16);

  const rgb = [redGamut, greenGamut, blueGamut];

  const toShadedGamut = (gamut) => {
    return Math.floor(Math.min(gamut * (1 + percent / 100), 255));
  };

  const toHex = (gamut) => {
    return gamut.toString(16).length === 1
      ? `0${gamut.toString(16)}`
      : gamut.toString(16);
  };

  const shadedRGB = rgb.map(toShadedGamut);
  const shadedHex = shadedRGB.map(toHex);

  const hexString = shadedHex.join('');

  return `#${hexString}`;
};
