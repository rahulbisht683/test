import React, {useState, useEffect} from 'react';
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
import {CREATE_PROFILE, UPDATE_PROFILE} from '../../gqloperations/mutations';
import {useMutation} from '@apollo/client';
import CircularLoader from '../../components/Loader';
import {selectedprofile} from '../../context/selectedProfile';

const {width, height} = Dimensions.get('window');
const CreateProfile = ({navigation, route}) => {
  const {theme, toggleTheme, themetype} = useTheme();
  const {selecteddata} = selectedprofile();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    is_verified: true,
    image_url: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [createProfile, {loading: mutationLoading, error: mutationError}] =
    useMutation(CREATE_PROFILE);

  const [updateProfile, {loading: umutationLoading, error: umutationError}] =
    useMutation(UPDATE_PROFILE);

  const handleformdata = (name, value) => {
    // console.log('name', e.target.name);
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (route?.params?.type != 'create') {
      setFormData(selecteddata);
      console.log('selectedData', selecteddata);
    }
  }, []);

  const handleUpdateUser = () => {
    setLoading(true);

    const {id, __typename, ...newobj2} = formData;
    let updatedData = {...newobj2, updateProfileId: selecteddata.id};
    console.log('formdataaaa', updatedData);
    updateProfile({
      variables: {
        updateProfileId: selecteddata.id,
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        isVerified: formData.is_verified,
        imageUrl: formData.image_url,
        description: formData.description,
      },
    })
      .then(result => {
        setLoading(false);
        navigation.navigate('Home');
        console.log('Updated User:', result.data.createProfile);
        Snackbar.show({
          text: 'User Data Updated Successfully',
          duration: Snackbar.LENGTH_LONG,
        });
      })
      .catch(error => {
        setLoading(false);
        console.error('Error creating user:', error.message);
        Snackbar.show({
          text: 'Something Went Wrong',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  const handleCreateUser = () => {
    setLoading(true);
    // Check if any required field is missing in the form data
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.image_url ||
      !formData.description
    ) {
      setLoading(false);
      console.log(formData);
      Snackbar.show({
        text: 'Please fill all then feilds',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    createProfile({
      variables: {
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        isVerified: formData.is_verified,
        imageUrl: formData.image_url,
        description: formData.description,
      },
    })
      .then(result => {
        setLoading(false);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          is_verified: true,
          image_url: '',
          description: '',
        });
        navigation.navigate('Home');
        console.log('New user created:', result.data.createProfile);
        Snackbar.show({
          text: 'New User Created Successfully',
          duration: Snackbar.LENGTH_LONG,
        });
      })
      .catch(error => {
        setLoading(false);
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
      {loading ? <CircularLoader /> : null}

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
          placeholderTextColor={theme.gtext}
          placeholder={selecteddata?.image_url}
          onChangeText={val => handleformdata('image_url', val)}
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
              name="first_name"
              // value={formData.first_name}
              placeholderTextColor={theme.gtext}
              placeholder={selecteddata?.first_name}
              onChangeText={val => handleformdata('first_name', val)}
              style={[styles.inputbox, {color: theme.text}]}></TextInput>
          </View>
          <View style={{width: '45%'}}>
            <Text style={[styles.formtext, {color: theme.text}]}>
              Last name
            </Text>
            <TextInput
              placeholderTextColor={theme.gtext}
              placeholder={selecteddata?.last_name}
              onChangeText={val => handleformdata('last_name', val)}
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
          placeholderTextColor={theme.gtext}
          placeholder={selecteddata?.email}
          onChangeText={val => handleformdata('email', val)}
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
          multiline={true}
          placeholder="Write a description for the talent"
          placeholderTextColor={theme.gtext}
          name="description"
          onChangeText={val => handleformdata('description', val)}
          style={[
            styles.inputbox,
            {height: height * 0.2, color: theme.text},
          ]}></TextInput>
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
        <TouchableOpacity
          onPress={() =>
            route?.params?.type == 'edit'
              ? handleUpdateUser()
              : handleCreateUser()
          }
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
            {route?.params?.type !== 'edit'
              ? 'Create Profile'
              : 'Update Profile'}
          </Text>
        </TouchableOpacity>
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
