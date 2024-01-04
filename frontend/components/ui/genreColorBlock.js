import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import colorBlocks from '../../data/colourBlocks';

export default function GenreColorBlock({ genres }) {
  return (
    <View style={styles.categories}>
      {genres.map((item, index) => {
        return (
          <View
            key={index}
            style={[
              styles.category,
              { backgroundColor: colorBlocks[index % colorBlocks.length] },
            ]}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Sansation-Regular',
              }}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    lineHeight: 30,
    marginLeft: 20,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
    flex: 1,
  },
  category: {
    backgroundColor: '#F8964D7D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
});
