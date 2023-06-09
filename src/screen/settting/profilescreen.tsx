import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

const menuItems = [
  {
    title: 'Edit Profile',
    screen: 'Edit Profile',
    image: require('../assets/img-logo/right-arrow.png'),
  },
  {
    title: 'Notification',
    screen: 'Notification',
    image: require('../assets/img-logo/right-arrow.png'),
  },
  {
    title: 'Security',
    screen: 'Security',
    image: require('../assets/img-logo/right-arrow.png'),
  },
  {
    title: 'Privacy Policy',
    screen: 'Privacy Policy',
    image: require('../assets/img-logo/right-arrow.png'),
  },
  {
    title: 'Help Center',
    screen: 'Help Center',
    image: require('../assets/img-logo/right-arrow.png'),
  },
  {
    title: 'Language',
    screen: 'Language',
    image: require('../assets/img-logo/right-arrow.png'),
  },
];

const MenuItem = ({title, image, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
    <Image source={image} style={styles.imagenext} />
  </TouchableOpacity>
);

const ProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);
  const renderMenuItem = ({item}) => (
    <MenuItem
      title={item.title}
      onPress={() => {
        navigation.navigate(item.screen);
      }}
      image={item.image}
    />
  );

  const imagePick = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,

      cropping: true,
    }).then(async image => {
      setProfileImage(image.path);
      await updateAvatarToFirestore(image.path);
    });
  };
  const updateAvatarToFirestore = async (imageUrl: string) => {
    try {
      const currentUser = auth().currentUser;
      const userRef = firestore().collection('users').doc(currentUser.uid);

      await userRef.update({
        avatar: imageUrl, // Tên trường chứa URL ảnh avatar trong Firestore của bạn
      });

      console.log('Avatar đã được cập nhật vào Firestore');
    } catch (error) {
      console.log('Lỗi khi cập nhật avatar vào Firestore:', error);
    }
  };
  const getAvatarFromFirestore = async () => {
    try {
      const currentUser = auth().currentUser;
      const userRef = firestore().collection('users').doc(currentUser.uid);
      const snapshot = await userRef.get();

      if (snapshot.exists) {
        const userData = snapshot.data();
        const avatarUrl = userData.avatar; // Thay 'avatar' bằng trường chứa URL ảnh avatar trong Firestore của bạn
        return avatarUrl;
      } else {
        return null; // Người dùng không tồn tại trong Firestore
      }
    } catch (error) {
      console.log('Lỗi khi lấy avatar từ Firestore:', error);
      return null;
    }
  };
  const fetchAvatarUrl = async () => {
    const avatarUrl = await getAvatarFromFirestore();
    if (avatarUrl) {
      setProfileImage(avatarUrl);
    }
  };

  useEffect(() => {
    fetchAvatarUrl();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [userName, setUserName] = useState('');
  const getUserNameFromFirestore = async () => {
    try {
      const currentUser = auth().currentUser;
      const userRef = firestore().collection('users').doc(currentUser.uid);
      const snapshot = await userRef.get();

      if (snapshot.exists) {
        const userData = snapshot.data();
        const uName = userData.name;
        return uName;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Lỗi khi lấy tên người dùng từ Firestore:', error);
      return null;
    }
  };

  const fetchUserName = async () => {
    const MName = await getUserNameFromFirestore();
    if (MName) {
      setUserName(MName);
    } else {
      console.log('Người dùng không tồn tại trong Firestore');
    }
  };
  useEffect(() => {
    fetchUserName();
  });
  const dangxuat = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewHeaderCart}>
        <Image
          source={require('../assets/img-logo/logo.jpg')}
          style={styles.imagelogo}
        />
        <Text style={styles.title}>Setting</Text>
      </View>
      <View style={styles.avatarChange}>
        <Image
          style={styles.avatar}
          source={
            profileImage
              ? {uri: profileImage}
              : require('../assets/img-logo/meme1.jpg')
          }
        />
        <TouchableOpacity onPress={imagePick}>
          <Image
            style={styles.changeavatar}
            source={require('../assets/img-logo/pencil-image.png')}
          />
        </TouchableOpacity>
        <Text style={styles.textavatar}>{userName}</Text>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.title}
        style={{width: '100%'}}
      />
      <View style={styles.btnlogout}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <LottieView
              style={styles.image}
              source={require('../assets/lottie/68582-log-out.json')}
              autoPlay
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.buttonlogout, {backgroundColor: 'red'}]}
                onPress={() => {
                  toggleModal();
                  dangxuat();
                }}>
                <Text style={styles.buttonText}>Log out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonlogout, {backgroundColor: 'green'}]}
                onPress={() => {
                  toggleModal();
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  viewHeaderCart: {
    padding: 10,
    height: 80,
    width: '100%',
    flexDirection: 'row',
  },
  imagelogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  imgManage: {
    height: 40,
    width: 40,
    marginLeft: '60%',
    marginTop: 5,
  },
  title: {
    fontSize: 30,
    color: 'black',
    marginLeft: 15,
    padding: 5,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    marginLeft: 40,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 50,
    fontSize: 17,
    color: 'black',
  },
  avatarChange: {
    alignItems: 'center',
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  changeavatar: {
    position: 'absolute',
    height: 35,
    width: 35,
    resizeMode: 'cover',
    marginLeft: 35,
    marginTop: -35,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  textavatar: {
    fontSize: 25,
    fontWeight: '500',
    padding: 20,
  },
  imagenext: {
    position: 'absolute',
    height: 20,
    width: 20,
    marginLeft: w * 0.7,
  },
  btnlogout: {
    width: '100%',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonlogout: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
