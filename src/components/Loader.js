import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useTheme} from '../context/themecontext';

const CircularLoader = () => {
  const {theme, toggleTheme, themetype} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themetype
            ? 'rgba(255,255,255,0.5)'
            : 'rgba(0,0,0,0.5)',
        },
      ]}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default CircularLoader;
