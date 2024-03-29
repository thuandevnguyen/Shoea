import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ViewMoreText from 'react-native-view-more-text';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../screen/store/cartReducer';
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
const AllItemScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  // console.log(cart);
  const dispatch = useDispatch();
  const productmain = [
    {
      id: '0',
      text: 'Nike ACG Lowcate ',
      star: '4.3',
      money: '425',
      image: 'https://bom.so/97BrcX',
      description:
        'From streets to parks to trails, build up the miles in these city-to-adventure shoes. Designed and tested in the rugged Pacific Northwest, the mixed-material upper pairs durability with easy styling. A rubber outsole with a heavy-duty, tuned lug pattern grips slick and rocky terrain, so you can go up, down, through and around.',
      ColourShown: 'Hemp/Dark Russet/Total Orange/Coral Chalk',
      type_ID: 'DM8019-201',

      // https://www.nike.com/vn/t/acg-lowcate-shoes-HjWrQ6/DM8019-201
    },
    {
      id: '1',
      text: 'Cell Divide Men Running Shoes',
      star: '4.5',
      money: '475',
      image: 'https://bom.so/XJVgMf',
      description:
        'Be inspired to go the distance with these stand-out running shoes. A sleek silhouette clad in mesh, PU details and a statement PUMA',
      ColourShown: 'Puma Black-Sun Stream',
      type_ID: '376296_08',
      //https://us.puma.com/us/en/pd/cell-divide-mens-running-shoes/376296?search=true&swatch=08
    },
    {
      id: '2',
      text: 'Nike Vaporfly 3 ',
      star: '4.5',
      money: '537',
      image: 'https://bom.so/Ik2noZ',
      description:
        'Catch if you can. Giving you race-day speed to conquer any distance, the Nike Vaporfly 3 is made for the chasers, the racers and the elevated pacers who cant turn down the thrill of the pursuit. We reworked the leader of the super shoe pack and tuned the engine underneath to help you chase personal bests from a 10K to marathon. From elite runners to those new to racing, this versatile road-racing workhorse is for those who see speed as a gateway to more miles and more seemingly uncatchable highs.',
      ColourShown: 'Hyper Pink/Laser Orange/Black',
      type_ID: 'DV4130-600',
      // https://www.nike.com/vn/t/vaporfly-3-road-racing-shoes-wdmHPR/DV4130-600
    },
    {
      id: '3',
      text: 'ADIZERO ADIOS PRO 2.0',
      star: '4.4',
      money: '550',
      image: 'https://bom.so/KOSs3E',
      description:
        'From streets to parks to trails, build up the miles in these city-to-adventure shoes. Designed and tested in the rugged Pacific Northwest, the mixed-material upper pairs durability with easy styling. A rubber outsole with a heavy-duty, tuned lug pattern grips slick and rocky terrain, so you can go up, down, through and around.',
      ColourShown: 'Hemp/Dark Russet/Total Orange/Coral Chalk',
      type_ID: 'DM8019-201',
      // https://www.adidas.com.vn/vi/gi%C3%A0y-adizero-adios-pro-2.0/FZ2477.html
    },
    {
      id: '4',
      text: 'Enzo 2 Mens Training Shoes',
      star: '4.7',
      money: '580',
      image: 'https://bom.so/HLxlym',
      description:
        'From streets to parks to trails, build up the miles in these city-to-adventure shoes. Designed and tested in the rugged Pacific Northwest, the mixed-material upper pairs durability with easy styling. A rubber outsole with a heavy-duty, tuned lug pattern grips slick and rocky terrain, so you can go up, down, through and around.',
      ColourShown: 'Hemp/Dark Russet/Total Orange/Coral Chalk',
      type_ID: 'DM8019-201',
      // https://us.puma.com/us/en/pd/enzo-2-mens-training-shoes/193249?search=true&swatch=05
    },
    {
      id: '5',
      text: 'Converse 1970s Archive Paint',
      star: '4.3',
      money: '440',
      image: 'https://bom.so/rvMMlz',
      description:
        'From streets to parks to trails, build up the miles in these city-to-adventure shoes. Designed and tested in the rugged Pacific Northwest, the mixed-material upper pairs durability with easy styling. A rubber outsole with a heavy-duty, tuned lug pattern grips slick and rocky terrain, so you can go up, down, through and around.',
      ColourShown: 'Hemp/Dark Russet/Total Orange/Coral Chalk',
      type_ID: 'DM8019-201',
      // https://drake.vn/converse/converse-chuck-taylor-all-star-1970s-archive-paint-splatter-a01170c?sort=p.price&order=DESC
    },
    {
      id: '6',
      text: 'ZG21 MOTION PRIMEGREEN BOA',
      star: '4.2',
      money: '460',
      image: 'https://bom.so/Iwzegv',
      description:
        'From streets to parks to trails, build up the miles in these city-to-adventure shoes. Designed and tested in the rugged Pacific Northwest, the mixed-material upper pairs durability with easy styling. A rubber outsole with a heavy-duty, tuned lug pattern grips slick and rocky terrain, so you can go up, down, through and around.',
      ColourShown: 'Hemp/Dark Russet/Total Orange/Coral Chalk',
      type_ID: 'DM8019-201',
      //https://www.adidas.com.vn/vi/giay-golf-co-lung-zg21-motion-primegreen-boa/G58741.html
    },
    {
      id: '7',
      text: 'Converse Chuck Taylor Roots',
      star: '4.8',
      money: '605',
      image: 'https://bom.so/L7tXYW',
      description:
        'From streets to parks to trails, build up the miles in these city-to-adventure shoes. Designed and tested in the rugged Pacific Northwest, the mixed-material upper pairs durability with easy styling. A rubber outsole with a heavy-duty, tuned lug pattern grips slick and rocky terrain, so you can go up, down, through and around.',
      ColourShown: 'Hemp/Dark Russet/Total Orange/Coral Chalk',
      type_ID: 'DM8019-201',
      // https://drake.vn/converse/converse-chuck-taylor-all-star-cx-explore-roots-170138c?sort=p.price&order=DESC
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null); // state để lưu thông tin sản phẩm được click
  const [modalVisible, setModalVisible] = useState(false); // state để điều khiển hiển thị modal

  const handleItemClick = (item: React.SetStateAction<null>) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };
  const _renderViewMore = (
    onPress: ((event: GestureResponderEvent) => void) | undefined,
  ) => {
    return (
      <Text onPress={onPress} style={{color: 'black'}}>
        View more
      </Text>
    );
  };
  const _renderViewLess = (
    onPress: ((event: GestureResponderEvent) => void) | undefined,
  ) => {
    return (
      <Text onPress={onPress} style={{color: 'black'}}>
        View less
      </Text>
    );
  };

  const addItemToCart = (item: never) => {
    const cartItem = cart.find((p: {id: any}) => p.id === item.id);
    if (cartItem) {
      dispatch(incrementQuantity(item));
    } else {
      dispatch(addToCart(item));
    }
  };

  const removeItemFromCart = (item: any) => {
    dispatch(removeFromCart(item));
  };
  const increaseQuantity = (item: any) => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = (item: any) => {
    dispatch(decrementQuantity(item));
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>All Product</Text> */}

      <FlatList
        data={productmain}
        numColumns={2}
        renderItem={({item, index}) => (
          <View key={`${item.id}-${index}`} style={styles.view_flatlist}>
            <TouchableOpacity onPress={() => handleItemClick(item)}>
              <Image
                source={{uri: item.image}}
                resizeMode="cover"
                style={styles.image}
              />
              <Text style={styles.text}>{item.text}</Text>
              <View style={styles.viewItemFlastlist}>
                <Text style={styles.start}>{item.star}</Text>

                <Image
                  source={require('../../screen/assets/img-logo/star.png')}
                  style={{height: 26, width: 26}}
                />
                <Text style={styles.money}>${item.money}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Item */}
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeModal}>
          <TouchableOpacity onPress={closeModal} style={styles.btnCloseItem}>
            <Image
              source={require('../firebase/checkerror.png')}
              style={styles.close}
            />
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.viewInfoItem}>
              <Image
                source={{uri: selectedProduct.image}}
                style={styles.img_main}
              />
              <Text style={styles.text_main}>{selectedProduct.text}</Text>
              <View style={styles.viewTextRate}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textRate}>
                    Rate: {selectedProduct.star}
                  </Text>
                  <Image
                    source={require('../../screen/assets/img-logo/star.png')}
                    style={styles.imgStar}
                  />
                </View>

                <View style={styles.viewDescription} />

                <ViewMoreText
                  numberOfLines={3}
                  renderViewLess={_renderViewLess}
                  renderViewMore={_renderViewMore}>
                  <Text style={styles.textDescription1}>Description: </Text>
                  <Text style={styles.textDescription2}>
                    {'\n'}
                    {selectedProduct.description}
                  </Text>
                </ViewMoreText>

                <Text style={styles.textColour}>ColourShown: </Text>
                <Text style={styles.alltext}>
                  {selectedProduct.ColourShown}
                </Text>
                <Text style={styles.alltext}>
                  Styles: {selectedProduct.type_ID}
                </Text>
              </View>

              <View style={styles.viewBtn}>
                <Text style={{fontSize: 15, padding: 5}}>
                  Total price: {'\n'}
                  <Text style={{fontSize: 20, color: 'black'}}>
                    $ {selectedProduct.money}
                  </Text>
                </Text>
                {cart.some(
                  (value: {id: any}) => value.id == selectedProduct.id,
                ) ? (
                  <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={() =>
                      Alert.alert(
                        'Notify',
                        'The product has been added to cart',
                      )
                    }>
                    <Text style={styles.textBtnAdd}>Add your Cart</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={() => addItemToCart(selectedProduct)}
                    onPressIn={() => Alert.alert('Notify', 'Added product')}>
                    <Text style={styles.textBtnAdd}>Add your Cart</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

export default AllItemScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
    backgroundColor: '#2341',
    borderRadius: 20,
  },
  view_flatlist: {
    flex: 1,
    height: 220,
    width: 175,
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    backgroundColor: '#fff',
  },
  viewItemFlastlist: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 185,
  },
  viewInfoItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 130,
    width: '100%',
    // borderRadius:20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'pink',
    marginBottom: 10,
  },
  imgStar: {
    height: 25,
    width: 25,
    position: 'absolute',
    marginLeft: 75,
  },
  viewTextRate: {marginLeft: 20},
  textRate: {
    marginRight: 250,
    fontSize: 18,
    color: 'black',
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  start: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  money: {
    fontSize: 20,
    color: 'black',
    marginLeft: 50,
    fontWeight: 'bold',
  },
  close: {
    height: 40,
    width: 40,
    position: 'absolute',
    marginLeft: w * 0.8,
  },
  btnCloseItem: {
    paddingTop: 40,
    backgroundColor: 'white',
  },
  alltext: {
    fontSize: 18,
    color: '#179',
  },
  img_main: {
    height: 350,
    width: '90%',
    borderRadius: 10,
    marginTop: 30,
  },
  text_main: {
    fontSize: 35,
    textAlign: 'center',
    margin: 15,
    color: 'black',
  },
  viewBtn: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 15,
    width: '90%',
  },
  btnAdd: {
    backgroundColor: '#2349',
    padding: 15,
    marginLeft: 50,
    borderRadius: 23,
    width: '60%',
  },
  textBtnAdd: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  viewDescription: {
    borderWidth: 0.4,
    width: 400,
    height: 1,
  },
  textDescription1: {
    marginRight: 250,
    fontSize: 18,
    marginLeft: 100,
    color: 'black',
  },
  textDescription2: {
    marginRight: 250,
    fontSize: 18,
    marginLeft: 100,
    color: '#179',
  },
  textColour: {
    fontSize: 18,
    color: 'black',
  },
});
