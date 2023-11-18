import { StyleSheet, View, Text, Image } from 'react-native';
import LogoMedium from '../components/LogoMedium';

function HomeScreen() {

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 25}}>
        <LogoMedium />
        <Text style={styles.heading}>Upcoming Sessions</Text>
        <View style={[styles.line, {width: 219}]} />
        <Text style={styles.heading}>Past Sessions</Text>
        <View style={[styles.line, {width: 153}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontFamily: 'Sansation-Regular',
    fontSize: 24,
    paddingBottom: 5,
    marginTop: 30,
  },
  line: {
    height: 0,
    borderTopColor: '#DCC8A9',
    borderTopWidth: 2,
    marginTop: 5
  },
});

export default HomeScreen;
