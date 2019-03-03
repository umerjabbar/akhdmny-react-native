import React from 'react';
import { Icon } from 'expo';
import { View, Button, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors';

export class NavigationBarButton extends React.Component {

  constructor(props){
    super(props)
  }

  onClickListen = () => {}

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} onPressOut={this.onClickListen}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 3,
        height: 30,
        width: 34,
        marginLeft: 12,
        marginRight: 12,
      }}>
        
          <Icon.Ionicons
            name={this.props.name}
            size={28}
            color={'white'}
            style={{flex: 1}}
          />
        </TouchableOpacity>
    );
  }
}