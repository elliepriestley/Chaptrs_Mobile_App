import { StyleSheet, View, Text } from 'react-native';

function Heading({ text = 'Heading', headingStyles = {}, textStyles = {} }) {
  return (
    <View style={{ ...styles.heading, ...headingStyles }}>
      <Text style={{ ...styles.text, ...textStyles }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#DCC8A9',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Sansation-Regular',
  },
});

export default Heading;

// Example usage
// <Heading
//   text='Upcoming Sessions'
//   headingStyles={{ marginTop: 100, borderColor: 'red' }}
//   textStyles={{ color: 'red' }}
// />
