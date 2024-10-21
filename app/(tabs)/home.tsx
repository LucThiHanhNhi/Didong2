import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Alert,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// HomeScreen Component
function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm..." />
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* Banner quảng cáo */}
      <View style={styles.banner}>
        <Image source={{ uri: '../../assets/images/slide.jpg' }} style={styles.bannerImage} />
      </View>

      {/* Danh mục */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Sản phẩm nổi bật */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Nổi bật</Text>
        <View style={styles.productContainer}>
          {products.map((product, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}đ</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ProfileScreen Component
function ProfileScreen() {
  return (
    <View style={styles.centeredView}>
      <Text>Trang cá nhân</Text>
    </View>
  );
}
//detail component

const Detail = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "Son Mistine màu V6",
    description:
      "Màu son mới cho bộ sưu tập thu đông, mang đến sự cuốn hút và thời thượng.",
    price: 130000,
    image:
      "https://img.ltwebstatic.com/images3_spmp/2024/07/11/c4/17206933248c8e9509bf209617d0edc44397ee269b_thumbnail_750x999.webp",
  };

  const addToCart = () => {
    Alert.alert(
      "Đã thêm vào giỏ hàng",
      `Bạn đã thêm ${quantity} sản phẩm vào giỏ hàng.`
    );
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImages} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          {product.price.toLocaleString("vi-VN")} VND
        </Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.quantityContainer}>
          <Ionicons
            name="remove-circle-outline"
            size={30}
            color="black"
            onPress={decreaseQuantity}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <Ionicons
            name="add-circle-outline"
            size={30}
            color="black"
            onPress={increaseQuantity}
          />
        </View>

        <Button title="Thêm vào giỏ hàng" onPress={addToCart} color="#ff6347" />
      </View>
    </ScrollView>
  );
};
//Gio hang

// App Component
export default function App() {
  const [selectedScreen, setSelectedScreen] = useState('Home'); 
  
  return (
    <View style={{ flex: 1 }}>
      {/* Hiển thị màn hình dựa trên state */}
      {selectedScreen === "Home" && <HomeScreen />}
      {selectedScreen === "Profile" && <ProfileScreen />}
      {selectedScreen === "Detail" && <Detail />}

      {/* Thanh Tab đơn giản */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSelectedScreen("Home")}
          style={styles.tabItem}
        >
          <Ionicons name="home-outline" size={25} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedScreen("Detail")}
          style={styles.tabItem}
        >
          <Ionicons name="person-outline" size={25} color="black" />
          <Text>Sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedScreen("Profile")}
          style={styles.tabItem}
        >
          <Ionicons name="person-outline" size={25} color="black" />
          <Text>Tôi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Dummy data
const categories = [
  // { name: 'Son', image: require('../assets/images/logo.jpg') }, 
  { name: 'Son bbia', image: 'data:image/jpeg;base64,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' },
  { name: 'Son 3ce', image: 'data:image/jpeg;base64,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' },
  { name: 'Son Mac', image: 'data:image/jpeg;base64,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' },
  { name: 'Son thoi', image: 'data:image/jpeg;base64,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' },
];

const products = [
  { name: 'Son bbia mau moi', price: '135.000', image: 'data:image/jpeg;base64,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' },
  { name: 'Son Mac mau moi', price: '645.000', image: 'data:image/jpeg;base64,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' },
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  banner: {
    marginVertical: 10,
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  categorySection: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },
  featuredSection: {
    marginVertical: 10,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productImages: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  productInfo: {
    padding: 20,
  },
  productDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 12,
    color: "#FF0000",
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  tabItem: {
    alignItems: "center",
  },
});
