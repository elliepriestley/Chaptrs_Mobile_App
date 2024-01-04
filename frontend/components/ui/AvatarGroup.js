import { View, Image, Text } from 'react-native';

function AvatarGroup({
  users = [],
  maxAvatars = 3,
  size = 30,
  overlap = size / 4,
}) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {users.slice(0, maxAvatars).map((user, index) => {
        return (
          <Image
            key={index}
            style={{
              width: size,
              height: size,
              borderRadius: 999,
              transform: [{ translateX: index * -overlap }],
            }}
            source={{
              uri:
                user?.profile_picture ||
                `https://ui-avatars.com/api/?length=1&background=random&name=${user.username[0]}}`,
            }}
          />
        );
      })}
      {users.length > maxAvatars && (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: 999,
            transform: [{ translateX: maxAvatars * -overlap }],
            backgroundColor: '#DCC8A9',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: size / 2, fontFamily: 'Sansation-Regular' }}>
            {`+${users.length - maxAvatars}`}
          </Text>
        </View>
      )}
    </View>
  );
}

export default AvatarGroup;
