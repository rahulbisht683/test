import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
// import {styles} from './CreateProfile.jsx';
import {useTheme} from '../../context/themecontext';
import Snackbar from 'react-native-snackbar';
import {CREATE_PROFILE} from '../../gqloperations/mutations';
import {useMutation} from '@apollo/client';

const {width, height} = Dimensions.get('window');
const CreateProfile = ({navigation, route}) => {
  const {theme, toggleTheme, themetype} = useTheme();
  const [formData, setFormData] = useState({
    firstName: 'bhjbj',
    lastName: '',
    email: '',
    isVerified: false,
    imageUrl: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [createProfile, {loading: mutationLoading, error: mutationError}] =
    useMutation(CREATE_PROFILE);

  const handleformdata = (name, value) => {
    // console.log('name', e.target.name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateUser = () => {
    // Check if any required field is missing in the form data
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      formData.imageUrl ||
      !formData.isVerified ||
      !formData.description
    ) {
      Snackbar.show({
        text: 'Please fill all then feilds',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    createProfile({
      variables: formData,
    })
      .then(result => {
        console.log('New user created:', result.data.createProfile);
        Snackbar.show({
          text: 'New User Created Successfully',
          duration: Snackbar.LENGTH_LONG,
        });
      })
      .catch(error => {
        console.error('Error creating user:', error.message);
        Snackbar.show({
          text: 'Something Went Wrong',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.maindiv, {backgroundColor: theme.primaryBackground}]}>
      <View style={[styles.headerDiv, {borderBottomColor: theme.text}]}>
        <Text
          style={{
            fontSize: RFValue(22),
            color: theme.text,
            letterSpacing: 1,
          }}>
          {route?.params?.type == 'create' ? 'Create Profile' : 'Edit Profile'}
        </Text>
        <Icon
          onPress={() => navigation.navigate('Home')}
          name="close"
          size={26}
          color="grey"></Icon>
      </View>
      <View
        style={{
          marginTop: height * 0.04,
          height: height * 0.72,
          // backgroundColor : "red",
          paddingHorizontal: width * 0.04,
        }}>
        <Text style={[styles.formtext, {color: theme.text}]}>Image link</Text>
        <TextInput
          placeholderTextColor={theme.text}
          value={formData.imageUrl}
          onChange={e => handleformdata('imageUrl', e.target.value)}
          style={[styles.inputbox, {color: theme.text}]}></TextInput>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: height * 0.02,
          }}>
          <View style={{width: '45%'}}>
            <Text style={[styles.formtext, {color: theme.text}]}>
              First name
            </Text>
            <TextInput
              placeholderTextColor={theme.text}
              name="firstName"
              value={formData.firstName}
              onChange={e => handleformdata('firstName', e.target.value)}
              style={[styles.inputbox, {color: theme.text}]}></TextInput>
          </View>
          <View style={{width: '45%'}}>
            <Text style={[styles.formtext, {color: theme.text}]}>
              Last name
            </Text>
            <TextInput
              placeholderTextColor={theme.text}
              value={formData.lastName}
              onChange={e => handleformdata('lastName', e.target.value)}
              style={[styles.inputbox, {color: theme.text}]}></TextInput>
          </View>
        </View>
        <Text
          style={[
            styles.formtext,
            {marginTop: height * 0.02, color: theme.text},
          ]}>
          Email
        </Text>
        <TextInput
          placeholderTextColor={theme.text}
          value={formData.email}
          onChange={e => handleformdata('email', e.target.value)}
          style={[styles.inputbox, {color: theme.text}]}></TextInput>
        <Text
          style={[
            styles.formtext,
            {marginTop: height * 0.02, color: theme.text},
          ]}>
          Description
        </Text>
        <TextInput
          textAlignVertical="top"
          value={formData.description}
          multiline={true}
          placeholder="Write a description for the talent"
          placeholderTextColor={theme.text}
          name="description"
          onChange={e => handleformdata('description', e.target.value)}
          style={[styles.inputbox, {height: height * 0.2}]}></TextInput>
        <Text
          style={[
            styles.formtext,
            {
              marginTop: height * 0.02,
              color: theme.text,
              marginBottom: height * 0.01,
            },
          ]}>
          Verification
        </Text>
        <Text
          style={[
            styles.Vtext,
            {
              backgroundColor: themetype ? theme.lowwhite : '#E0E0E0',
              color: theme.text,
            },
          ]}>
          Talent is verified
        </Text>
      </View>
      <View
        style={[styles.UpdateprofileOuterDiv, {borderTopColor: theme.text}]}>
        <View
          style={{
            backgroundColor: '#3DACFF',
            justifyContent: 'center',
            paddingHorizontal: width * 0.05,
            borderRadius: 4,
            paddingVertical: height * 0.015,
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: 'white',
              fontWeight: '600',
            }}>
            Update Profile
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateProfile;
const styles = StyleSheet.create({
  maindiv: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
  },
  formtext: {
    color: 'rgba(0,0,0,1)',
    fontSize: RFValue(14),
  },
  inputbox: {
    width: '100%',
    height: height * 0.06,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    fontSize: RFValue(17),
  },
  Vtext: {
    color: 'rgba(0,0,0,1)',
    backgroundColor: '#E0E0E0',
    fontSize: RFValue(16),
    letterSpacing: 1,
    fontWeight: '700',
    // marginTop: height * 0.02,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: 3,
  },
  UpdateprofileOuterDiv: {
    alignItems: 'flex-end',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingRight: width * 0.05,
    borderTopColor: 'rgba(0,0,0.0.4)',
    borderTopWidth: 0.5,
    marginTop: height * 0.01,
  },
});
