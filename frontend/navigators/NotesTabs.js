import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import CurrentBookTab from '../screens/currentBook';

const SecondRoute = () => (
  <View
    style={{ flex: 1, backgroundColor: '#F8F6F2', borderTopLeftRadius: 50 }}
  >
    <Text>Past Books</Text>
  </View>
);

const renderScene = SceneMap({
  currentBook: CurrentBookTab,
  pastBooks: SecondRoute,
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
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={TabBar}
    />
  );
}

function TabBar({ navigationState }) {
  const routes = navigationState.routes;
  const activeIndex = navigationState.index;
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
          <View
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
                fontSize: 20,
                fontFamily: 'Sansation-Regular',
                textAlign: 'center',
              }}
            >
              {route.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
