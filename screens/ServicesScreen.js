import React from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'expo';
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors'
import {Transition} from  'react-navigation-fluid-transitions';

const COLUMNS = 3;

export class ServicesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'SERVICES',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: Colors.appTheme,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        ...Platform.select({
          ios: {},
          android: {
            elevation: 1,
          },
        }),
      },

      headerRight: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-cart' : 'md-cart'} onPress={() => navigation.navigate('Cart')} />,
      headerLeft: <NavigationBarButton name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-down'} onPress={() => navigation.pop()} />
      // header: null
    };
  };

  constructor() {
    super();
    this.state = {
      items: ([]),
    };
    this.makeSections();
  }

  makeSections() {
    for (let index = 0; index < 12; index++) {
      this.state.items.push({
        id: `${index}`,
        title: 'Managment Team',
        color: 'black',
        icon: `https:\/\/theappsolutions.com\/images\/articles\/source\/restaurant-app\/tumvi-logo.png`,
      })
    }
  }

  _onItemPress(item, index) {
    this.props.navigation.navigate('ServicesItems', {item, index});
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.sectionContentContainer}>
        <TouchableOpacity onPress={() => this._onItemPress(item, index)} activeOpacity={0.8} style={[styles.card, { backgroundColor: item.color }]}>
          {/* <Transition shared={`image${index}`}> */}
            <Image style={styles.itemImage} source={{ uri: item.icon }} />
          {/* </Transition> */}
          <Text style={styles.sectionContentText} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.flatContainer}
          data={this.state.items}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
          numColumns={COLUMNS}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appTheme,
  },
  flatContainer: {

  },
  sectionContentContainer: {
    height: Dimensions.get('window').width / COLUMNS,
    width: Dimensions.get('window').width / COLUMNS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '95%',
    width: '95%',
    // marginVertical: 12,
    // marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itemImage: {
    height: Dimensions.get('window').width / COLUMNS - 60,
    width: Dimensions.get('window').width / COLUMNS - 60,
    marginBottom: 5,
    borderRadius: (Dimensions.get('window').width / COLUMNS - 60)/2,
  },
  sectionContentText: {
    color: 'white',
    ...Platform.select({
      ios: {
        fontSize: 14,
        fontWeight: '500',
      },
      android: {
        fontSize: 14,
        fontWeight: '300',
      },
    }),
  },
});