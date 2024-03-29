import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderedProducts} from '../store/index';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../store/cartReducer';
import ViewMoreText from 'react-native-view-more-text';
import LottieView from 'lottie-react-native';
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;
const OrderedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const orderedProducts = useSelector(state => state.order.orderedProducts);
  const orderedProductsLenght = orderedProducts ? orderedProducts.length : 0;

  const handleReviewPress = (item: any) => {
    // Thực hiện chức năng đánh giá
    navigation.navigate('Evaluate');
    console.log('Đánh giá');
  };
  const handleBuyAgainPress = (item: any) => {
    // Thực hiện chức năng mua lại
    console.log('Mua lại');
  };

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
    dispatch(addToCart(item));
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewHeaderCart}>
        <Image
          source={require('../assets/img-logo/logo.jpg')}
          style={styles.imagelogo}
        />
        <Text
          style={{fontSize: 30, color: 'black', marginLeft: 20, marginTop: 15}}>
          My Ordered
        </Text>
      </View>
      {orderedProductsLenght > 0 ? (
        <FlatList
          style={styles.listItem}
          data={orderedProducts}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View key={`${item.id}-${index}`} style={styles.item}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.text}</Text>
              <Text style={styles.itemMoney}>Cash: {item.money} $</Text>
              <Text style={styles.itemColourShown}>
                Colour: {item.ColourShown}
              </Text>
              <Text style={styles.itemTypeID}>Type: {item.type_ID}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => handleReviewPress(item)}
                  style={styles.btn}>
                  <Text style={styles.btnText}>Evaluate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleItemClick(item)}
                  style={styles.btn}>
                  <Text style={styles.btnText}>Repurchase</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../assets/lottie/132793-empty-box.json')}
            style={{height: h * 0.4, width: '100%'}}
            autoPlay
          />
          <Text style={{fontSize: 20, padding: 10}}>
            You have not yet bought any products
          </Text>
        </View>
      )}

      {/* Re order */}

      {/* Item */}
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeModal}>
          <TouchableOpacity
            onPress={closeModal}
            style={{paddingTop: 40, backgroundColor: 'white'}}>
            <Image
              source={require('../assets/img-logo/checkerror.png')}
              style={styles.close}
            />
          </TouchableOpacity>

          <ScrollView>
            <View
              style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
              <Image
                source={{uri: selectedProduct.image}}
                style={styles.img_main}
              />
              <Text style={styles.text_main}>{selectedProduct.text}</Text>
              <View style={{marginLeft: 20}}>
                <Text style={{marginRight: 250, fontSize: 18, color: 'black'}}>
                  Rate: {selectedProduct.star}
                </Text>

                <View style={{borderWidth: 0.4, width: 400, height: 1}} />

                <ViewMoreText
                  numberOfLines={3}
                  renderViewLess={_renderViewLess}
                  renderViewMore={_renderViewMore}>
                  <Text
                    style={{
                      marginRight: 250,
                      fontSize: 18,
                      marginLeft: 100,
                      color: 'black',
                    }}>
                    Description:{' '}
                  </Text>
                  <Text
                    style={{
                      marginRight: 250,
                      fontSize: 18,
                      marginLeft: 100,
                      color: '#179',
                    }}>
                    {'\n'}
                    {selectedProduct.description}
                  </Text>
                </ViewMoreText>

                <Text style={{fontSize: 18, color: 'black'}}>
                  ColourShown:{' '}
                </Text>
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
                        // 'Mù hả ? Không thấy chữ đã thêm thành công à, qua giỏ hàng mà xem',
                        'The product has been added to cart',
                      )
                    }>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Add your Cart
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={() => addItemToCart(selectedProduct)}
                    onPressIn={() => Alert.alert('Added product')}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Add your Cart
                    </Text>
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

export default OrderedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewHeaderCart: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
  },
  imagelogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 15,
    marginLeft: 5,
  },

  listItem: {
    margin: 10,
  },
  item: {
    backgroundColor: '#D9EEF1',
    margin: 15,
    borderRadius: 25,
  },
  itemImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.3,
  },
  itemText: {
    fontSize: 25,
    padding: 10,
    color: 'black',
  },
  itemMoney: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 20,
  },
  itemColourShown: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 20,
  },
  itemTypeID: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 20,
  },
  btn: {
    height: 35,
    borderRadius: 30,
    backgroundColor: '#212122',
    marginLeft: 5,
    marginRight: 5,
  },
  btnText: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    color: 'white',
    paddingTop: 5,
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
    marginLeft: 350,
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
});
