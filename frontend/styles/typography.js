import { TextStyle, Platform } from 'react-native';

import * as Colours from './colours';

const mainFontFamily = Platform.select({
  ios: 'Sansation-Regular',
  android: 'Sansation-Regular',
});

const boldFontFamily = Platform.select({
  ios: 'Sansation-Bold',
  android: 'Sansation-Bold',
});

export const fontFamily = {
  regular: {
    fontFamily: mainFontFamily,
  },
  bold: {
    fontFamily: boldFontFamily,
  },
};

export const fontSize = {
  xs: {
    ...fontFamily.regular,
    fontSize: 8,
  },
  sm: {
    ...fontFamily.regular,
    fontSize: 10,
  },
  md: {
    ...fontFamily.regular,
    fontSize: 12,
  },
  lg: {
    ...fontFamily.regular,
    fontSize: 14,
  },
  xl: {
    ...fontFamily.regular,
    fontSize: 16,
  },
  xxl: {
    ...fontFamily.regular,
    fontSize: 20,
  },
  '2xl': {
    ...fontFamily.regular,
    fontSize: 28,
  },
  '3xl': {
    ...fontFamily.regular,
    fontSize: 36,
  },
  '4xl': {
    ...fontFamily.regular,
    fontSize: 42,
  },
};

export const heading = {
  xs: {
    ...fontSize.xs,
    ...fontFamily.bold,
  },
  sm: {
    ...fontSize.sm,
    ...fontFamily.bold,
  },
  md: {
    ...fontSize.md,
    ...fontFamily.bold,
  },
  lg: {
    ...fontSize.lg,
    ...fontFamily.bold,
  },
  xl: {
    ...fontSize.xl,
    ...fontFamily.bold,
  },
  xxl: {
    ...fontSize.xxl,
    ...fontFamily.bold,
  },
  '3xl': {
    ...fontSize['3xl'],
    ...fontFamily.bold,
  },
  '4xl': {
    ...fontSize['4xl'],
    ...fontFamily.bold,
  },
};
