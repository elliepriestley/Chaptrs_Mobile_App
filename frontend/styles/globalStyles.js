import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#DCC8A9',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 50,
  },
  smText: {
    fontFamily: 'Sansation-Regular',
    fontSize: 12,
  },
  mdText: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
  },
  lgText: {
    fontFamily: 'Sansation-Regular',
    fontSize: 18,
  },
  xlText: {
    fontFamily: 'Sansation-Regular',
    fontSize: 20,
  },
});

export default globalStyles;
