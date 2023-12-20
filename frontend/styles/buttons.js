import { TextStyle, ViewStyle } from 'react-native';

import * as Colours from './colours';
// import * as Outlines from './outlines';
// import * as Sizing from './sizing';
import * as Typography from './typography';

export const main = {
  primary: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 999,
      backgroundColor: Colours.main.primary,
    },
    text: {
      ...Typography.fontSize.lg,
      color: Colours.neutral.black,
    },
  },
};

export const circular = {
  primary: {
    container: {
      ...main.primary.container,
      height: 100,
      width: 100,
    },
  },
};

const opacity = (state) => {
  const opacity = state.pressed ? 0.65 : 1;
  return { opacity };
};

export const applyOpacity = (style) => {
  return (state) => {
    return {
      ...style,
      ...opacity(state),
    };
  };
};
