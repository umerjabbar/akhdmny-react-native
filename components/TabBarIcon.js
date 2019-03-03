import React from 'react';
import { Icon } from 'expo';
import { View, Button, TouchableOpacity, Dimensions, Text } from 'react-native'
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

      }}>

        <Icon.MaterialIcons
          name={this.props.name}
          size={28}
          color={'white'}
        />

        <Text style={{color: 'white', fontSize : 18, fontWeight: '500', }}
        >{'  ' + this.props.title + '  '}</Text>
      </View>

    );
  }
}