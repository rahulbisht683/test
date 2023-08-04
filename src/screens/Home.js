import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {useTheme} from '../context/themecontext';
import {RFValue} from 'react-native-responsive-fontsize';
import ProfileCard from '../components/ProfileCard';
import {selectedprofile} from '../context/selectedProfile';
import {GetAllProfiles} from '../gqloperations/queries';
import {useQuery} from '@apollo/client';

const Home = ({navigation, route}) => {
  const {theme, toggleTheme, themetype} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editprofilestate, seteditprofilestate] = useState(-1);
  const [searchedData, setSearchedData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');

  const {selecteddata, changeData} = selectedprofile();

  const {loading: queryLoading, data} = useQuery(GetAllProfiles, {
    variables: {
      orderBy: {
        key: 'is_verified',
        sort: 'desc',
      },
      rows: 10,
      page: 0,
      searchString: '',
    },
  });
  // useEffect(() => {
  //   setLoading(queryLoading);
  // }, [queryLoading]);

  useEffect(() => {
    if (data) {
      // Update the profiles state when data is fetched
      setProfiles(prevProfiles => [
        ...prevProfiles,
        ...data.getAllProfiles.profiles,
      ]);
      setLoading(false);
    }
  }, [data]);

  const sortingdata = () => {};

  // const fetchData = async () => {
  //       try {
  //         setLoading(true);
  //         setData(prevData => [...prevData, ...newData]);
  //         setPage(page + 1);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //         setLoading(false);
  //       }
  //     };
  const handleedit = index => {
    console.log('dd', index);
    if (editprofilestate == index) {
      seteditprofilestate(-1);
    } else {
      seteditprofilestate(index);
    }
  };
  const handlenavigation = async type => {
    await changeData();
    navigation.navigate('CreateProfile', {type: type});
  };

  // const handleLoadMore = () => {
  //   // Fetch more data when the FlatList is close to the end
  //   if (!loading) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  let data1 = [
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
  ];
  let datas = [
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
    {
      name: 'Rahul Bisht',
      email: 'rahul.bisht@aidetic.in',
      message:
        'Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.',
    },
  ];

  const toggleSwitch = () => {
    toggleTheme();
  };

  return (
    <View style={[styles.maindiv, {backgroundColor: theme.primaryBackground}]}>
      <Modal visible={deleteModal} transparent>
        <View style={styles.modaldiv}>
          <View
            style={{
              width: '80%',
              backgroundColor: theme.cardBGColor,
              elevation: 2,
              borderRadius: 3,
            }}>
            <View
              style={[
                styles.deleteprofilediv,
                {borderBottomColor: theme.gtext},
              ]}>
              <Text style={[styles.textd, {color: theme.text}]}>
                Remove Profile
              </Text>
              <Icon2
                onPress={() => setDeleteModal(false)}
                name="close"
                color={theme.text}
                size={22}></Icon2>
            </View>
            <View
              style={[
                styles.deleteprofilediv,
                {borderBottomColor: theme.gtext},
              ]}>
              <Text
                style={[
                  styles.textd,
                  {fontWeight: '400', fontSize: RFValue(14), color: theme.text},
                ]}>
                Removed profile will be deleted permenantly and won’t be
                available anymore.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
                // backgroundColor: 'red',
                paddingVertical: height * 0.02,
              }}>
              <View style={[styles.buttonDiv, {backgroundColor: '#EEEEEE'}]}>
                <Text style={styles.textd}>Cancle</Text>
              </View>
              <View style={styles.buttonDiv}>
                <Text style={[styles.textd, {color: 'white'}]}>Delete</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.headerDiv,
          {backgroundColor: theme.secondaryBackground},
        ]}>
        <View style={styles.topbar}>
          <Image
            style={[styles.companylogo, {tintColor: theme.text}]}
            source={require('../../assets/logo.png')}></Image>
        </View>
        <View style={styles.toggleButton}>
          <Icon2
            name="sunny"
            color={theme.text}
            size={24}
            style={{justifyContent: 'flex-end'}}></Icon2>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'#f5dd4b'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={themetype}
          />
          <Icon
            name="dark-mode"
            size={24}
            color={theme.text}
            style={{justifyContent: 'flex-end'}}></Icon>
        </View>
      </View>
      <View style={styles.searchview}>
        <TextInput
          placeholderTextColor={theme.text}
          style={[styles.inputbox, {color: theme.text}]}
          placeholder="Search"
          textAlignVertical="center"></TextInput>
        <TouchableOpacity
          style={[
            styles.createprofileview,
            {borderColor: theme.Cprofile, backgroundColor: theme.lowwhite},
          ]}
          onPress={() => handlenavigation('create')}>
          <Icon
            name="person-add-alt-1"
            size={RFValue(16)}
            color={theme.text}></Icon>
          <Text style={[styles.createprofile, {color: theme.text}]}>
            Create Profile
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={datas}
        contentContainerStyle={{paddingBottom: height * 0.02}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `key${index}`}
        onEndReached={handleLoadMore} // Implement scroll pagination
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <ProfileCard
            props={{item, index, editprofilestate, deleteModal}}
            editremove={() => handleedit(index)}
            newScreen={type => handlenavigation(type)}
            removeP={() => (setDeleteModal(true), seteditprofilestate(-1))}
          />
        )}></FlatList>
    </View>
  );
};

export default Home;
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

//     import React, { useState, useEffect } from 'react';
// import { View, FlatList, ActivityIndicator, Text } from 'react-native';

// const YourComponent = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch initial data on component mount
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`YOUR_API_ENDPOINT?page=${page}`);
//       const newData = await response.json();
//       setData(prevData => [...prevData, ...newData]);
//       setPage(page + 1);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   const renderFooter = () => {
//     if (!loading) return null;
//     return <ActivityIndicator size="large" color="blue" />;
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <View style={{ padding: 16 }}>
//         <Text>{item.title}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         onEndReached={fetchData} // This will be triggered when the user reaches the end of the list
//         onEndReachedThreshold={0.1} // Adjust the value if you want to trigger earlier or later
//         ListFooterComponent={renderFooter} // Show loading indicator at the bottom
//       />
//     </View>
//   );
// };

// export default YourComponent;
