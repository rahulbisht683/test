import React, {useEffect, useState, useRef} from 'react';
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
import {useIsFocused} from '@react-navigation/native';
import ProfileCard from '../components/ProfileCard';
import {selectedprofile} from '../context/selectedProfile';
import {GetAllProfiles} from '../gqloperations/queries';
import {useMutation, useQuery} from '@apollo/client';
import CircularLoader from '../components/Loader';
import {DELETE_PROFILE} from '../gqloperations/mutations';
import Snackbar from 'react-native-snackbar';

const Home = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {theme, toggleTheme, themetype} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editprofilestate, seteditprofilestate] = useState(-1);
  const [searchedData, setSearchedData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const {selecteddata, changeData} = selectedprofile();
  const flatListRef = useRef(null);

  const [deleteProfile, {loading: mutationLoading, error: mutationError}] =
    useMutation(DELETE_PROFILE);

  // Function to simulate the actual search operation
  const performSearch = inputval => {
    refetch({searchString: inputval});
    console.log('datammm', data?.getAllProfiles?.profiles);
  };

  let debounceTimer;

  const handleSearchChange = inputValue => {
    setSearchTerm(inputValue);

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      performSearch(inputValue);
    }, 500);
  };

  useEffect(() => {
    if (isFocused == false) {
    } else {
      refetch();
      seteditprofilestate(-1);
    }
  }, [isFocused]);

  const handledeleteProfile = item => {
    setLoading(true);
    setDeleteModal(false);
    deleteProfile({
      variables: {
        deleteProfileId: selecteddata.id,
      },
    })
      .then(result => {
        setLoading(false);
        refetch();
        setLoading(false);

        Snackbar.show({
          text: 'User Deleted Successfully',
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

  const {
    loading: queryLoading,
    data,
    error,
    refetch,
    fetchMore,
  } = useQuery(GetAllProfiles, {
    variables: {
      orderBy: {
        key: 'is_verified',
        sort: 'desc',
      },
      rows: 10,
      page: 0,
      searchString: searchTerm,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading]);

  const handleedit = index => {
    console.log('dd', index);
    if (editprofilestate == index) {
      seteditprofilestate(-1);
    } else {
      seteditprofilestate(index);
    }
  };
  const handlenavigation = async (type, data) => {
    if (type != 'create') {
      await changeData(data);
    } else {
      changeData(null);
    }

    navigation.navigate('CreateProfile', {type: type});
  };

  const handleLoadMore = () => {
    // console.log(data.getAllProfiles.profiles);
    if (
      !loading &&
      data &&
      data.getAllProfiles.size > data.getAllProfiles.profiles.length
    ) {
      fetchMore({
        variables: {
          page: page + 1,
        },

        updateQuery: (prev, {fetchMoreResult}) => {
          console.log(
            'fetchMoreResult',
            fetchMoreResult.getAllProfiles.profiles,
          );
          if (!fetchMoreResult) return prev;
          return {
            getAllProfiles: {
              ...prev.getAllProfiles,
              profiles: [
                ...prev.getAllProfiles.profiles,
                ...fetchMoreResult.getAllProfiles.profiles,
              ],
            },
          };
        },
      });
      setPage(page + 1);
      console.log('page', page);
    }
  };

  const toggleSwitch = () => {
    toggleTheme();
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
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
              <TouchableOpacity
                onPress={() => setDeleteModal(false)}
                style={[styles.buttonDiv, {backgroundColor: '#EEEEEE'}]}>
                <Text style={styles.textd}>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handledeleteProfile()}
                style={styles.buttonDiv}>
                <Text style={[styles.textd, {color: 'white'}]}>Delete</Text>
              </TouchableOpacity>
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
            trackColor={{
              false: 'rgba(0,0,0,0.5)',
              true: 'rgba(255,255,255,0.2)',
            }}
            thumbColor={'white'}
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
          onChangeText={value => handleSearchChange(value)}
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
      {loading ? (
        <CircularLoader />
      ) : data?.getAllProfiles?.profiles.length == 0 ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: height * 0.02,
          }}>
          <Text style={[styles.textd, {color: theme.text}]}>
            No profile found
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={data?.getAllProfiles?.profiles || []}
          contentContainerStyle={{
            paddingBottom: height * 0.02,
            // marginTop: height * 0.02,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `key${index}`}
          onEndReached={handleLoadMore} // Implement scroll pagination
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          renderItem={({item, index}) => (
            <>
              <ProfileCard
                props={{item, index, editprofilestate, deleteModal}}
                editremove={() => handleedit(index)}
                newScreen={type => handlenavigation(type, item)}
                removeP={() => (
                  setDeleteModal(true),
                  seteditprofilestate(-1),
                  changeData(item)
                )}
              />
            </>
          )}></FlatList>
      )}
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
