import * as React from 'react';
import { View, useWindowDimensions, Text, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import CurrentBookTab from './screens/currentBookTab';
import PastBooksTab from './screens/pastBooksTab';

const renderScene = SceneMap({
  currentBook: CurrentBookTab,
  pastBooks: PastBooksTab,
});

export default function BookTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'currentBook', title: 'Current Book' },
    { key: 'pastBooks', title: 'Past Books' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes, setIndex }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={TabBar}
    />
  );
}

function TabBar({ navigationState }) {
  const { routes, index: activeIndex, setIndex } = navigationState;
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: 40,
      }}
    >
      {routes.map((route, index) => {
        return (
          <Pressable
            onPress={() => setIndex(index)}
            key={index}
            style={{
              flex: 1,
              padding: 10,
              height: 80,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              backgroundColor:
                index === activeIndex ? '#F8F6F2' : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Sansation-Regular',
                textAlign: 'center',
              }}
            >
              {route.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
