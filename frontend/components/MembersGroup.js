import { View, Image, Text } from 'react-native';

export default function MembersGroup({ bookclub }) {
    if (bookclub.members.length !== 0) {
        return (
            <View style={{ paddingLeft: 20, flexDirection: 'row' }}>
                {bookclub.members.map((i, index) => (
                    <View key={index} style={{ gap: 10, flexDirection: 'column', alignItems: 'center' }}>
                        <Image
                            source={{ uri: i.profile_picture }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 999,
                            }}
                        />
                        <Text style={{ fontSize: 18, fontFamily: 'Sansation-Regular' }}>{i.username}</Text>
                    </View>
                ))}
            </View>
        );
    } else {
        return (
            <Text style={{ paddingLeft: 20 }}>You will be the 1st to join!</Text>
        );
    }
}
