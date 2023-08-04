// components/ContactCard.js

import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {useTheme} from '../context/themecontext';
const {width, height} = Dimensions.get('window');

const ProfileCard = ({props, editremove, newScreen, removeP}) => {
  const {theme, toggleTheme, themetype} = useTheme();
  return (
    <View style={[styles.cardView, {backgroundColor: theme.cardBGColor}]}>
      <View style={styles.profileparentdiv}>
        <View style={{flexDirection: 'row', gap: width * 0.04}}>
          <View style={styles.imagediv}>
            <Image
              style={styles.userprofile}
              source={{
                uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
              }}></Image>
          </View>
          <View>
            <View style={styles.userDetaildiv}>
              <Text style={[styles.textd, {color: theme.text}]}>
                {props.item.name}
              </Text>
              <View
                style={{
                  height: height * 0.025,
                  marginLeft: 3,

                  overflow: 'hidden',
                }}>
                <Image
                  style={{height: '100%', resizeMode: 'contain'}}
                  source={require('../../assets/accreditation_badge.png')}></Image>
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: RFValue(12),
                color: theme.gtext,
              }}>
              {props.item.email}
            </Text>
          </View>
        </View>
        <View>
          <Icon3
            onPress={() => editremove(props.index)}
            name="dots-three-vertical"
            color={theme.text}
            size={22}></Icon3>
          <View style={{zIndex: 2}}>
            {props.editprofilestate == props.index ? (
              <View
                style={[
                  styles.editprofilediv,
                  {backgroundColor: theme.fixedpopup},
                ]}>
                <Text
                  onPress={() => newScreen('edit', item)}
                  style={[styles.editprofile, {color: theme.text}]}>
                  Edit profile
                </Text>
                <Text
                  onPress={() => removeP()}
                  style={[styles.editprofile, {color: theme.text}]}>
                  Remove profile
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <Text style={{marginTop: height * 0.02, color: theme.text}}>
        {props.item.message}
      </Text>
    </View>
  );
};

export default ProfileCard;
const styles = StyleSheet.create({
  modaldiv: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDiv: {
    width: '45%',
    borderRadius: 5,
    paddingVertical: height * 0.01,
    backgroundColor: '#CC1016',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteprofilediv: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: height * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  editprofile: {
    fontWeight: '400',
    fontSize: RFValue(14),
    color: 'black',
    letterSpacing: 0.5,
    paddingVertical: height * 0.01,
  },
  editprofilediv: {
    position: 'absolute',
    // width: width * 0.2,
    width: width * 0.34,
    right: width * 0.018,
    paddingVertical: height * 0.01,
    backgroundColor: 'white',
    zIndex: 3,
    paddingLeft: width * 0.02,
    elevation: 2,
    borderRadius: 2,
  },
  imagediv: {
    height: width * 0.11,
    width: width * 0.11,
    backgroundColor: 'red',
    borderRadius: 100,
    overflow: 'hidden',
  },
  profileparentdiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  userDetaildiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textd: {
    fontSize: RFValue(17),
    letterSpacing: 0.3,
    color: 'black',
    fontWeight: '500',
  },
  userprofile: {
    resizeMode: 'cover',
    height: '100%',
  },
  inputbox: {
    width: '100%',
    height: height * 0.05,
    borderWidth: 1,
    paddingLeft: width * 0.05,
    borderColor: 'grey',
    borderRadius: 1,
    fontSize: RFValue(14),
  },
  cardView: {
    width: '89%',
    alignSelf: 'center',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginTop: height * 0.02,
    borderRadius: 10,
  },
  searchview: {
    marginTop: height * 0.04,
    width: '89%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  createprofile: {
    color: '#3DACFF',
    fontWeight: '500',
  },
  maindiv: {
    flex: 1,
    width: '100%',
  },
  createprofileview: {
    alignSelf: 'flex-end',
    marginTop: height * 0.02,
    borderWidth: 1,
    borderRadius: 6,

    paddingVertical: 8,
    paddingHorizontal: width * 0.02,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerDiv: {
    flexDirection: 'row',
    // justifyContent : "space-between",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,

    height: height * 0.1,

    alignItems: 'center',
  },
  companylogo: {
    resizeMode: 'contain',
    height: '80%',
    alignSelf: 'flex-start',
    width: '60%',
  },
  topbar: {
    width: '60%',
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  toggleButton: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
