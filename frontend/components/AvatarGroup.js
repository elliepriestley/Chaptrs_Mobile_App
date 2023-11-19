import { StyleSheet, View, Image, Text } from 'react-native';

function AvatarGroup({ users = [], maxAvatars = 3 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {users.slice(0, maxAvatars).map((user, index) => {
        return (
          <Image
            key={index}
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              transform: [{ translateX: index * -20 }],
            }}
            source={{
              uri:
                user.photo ||
                `https://ui-avatars.com/api/?length=1&background=random&name=${user[0]}}`,
            }}
          />
        );
      })}
      {users.length > maxAvatars && (
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            transform: [{ translateX: maxAvatars * -20 }],
            backgroundColor: '#DCC8A9',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontFamily: 'Sansation-Regular' }}>
            {`+${users.length - maxAvatars}`}
          </Text>
        </View>
      )}
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

export default AvatarGroup;
