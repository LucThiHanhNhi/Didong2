import Ionicons from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import CartScreen from "./CartScreen";
import Detail from "./detail";

type Product = {
  id: string;
  name: string;
  price: number;
  image: any; // Dùng kiểu any cho ảnh nếu không xác định cụ thể
};
// HomeScreen Component
function HomeScreen({ onSelectProduct }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Update the products state
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Call the fetch function when the component is rendered
  }, []);
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
        <Image
          source={{ uri: "../../assets/images/slide.jpg" }}
          style={styles.bannerImage}
        />
      </View>

      {/* Danh mục */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
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
            <TouchableOpacity
              key={index}
              style={styles.productCard}
              onPress={() => onSelectProduct(product)} // Thêm sự kiện nhấn
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
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
const ProfileScreen = () => {
  // Dữ liệu giả lập cho người dùng
  const user = {
    name: "Lục Thị Hạnh Nhi",
    email: "hanhnhi5924@gmail.com",
    phone: "0392515081",
    address: "Lâm Đồng, Việt Nam",
    gender: "Nữ",
    birthDate: "05/09/2004",
    avatar: "https://example.com/avatar.jpg", // Thay bằng URL ảnh thực tế
  };

  const handleEditProfile = () => {
    // Xử lý chỉnh sửa thông tin người dùng
    alert("Chỉnh sửa thông tin người dùng");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Giới tính</Text>
        <Text style={styles.info}>{user.gender}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ngày sinh</Text>
        <Text style={styles.info}>{user.birthDate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.info}>{user.phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.info}>{user.address}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Ionicons name="pencil-outline" size={20} color="#fff" />
        <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>
    </View>
  );
};

// App Component
<CartScreen />;
export default function App() {
  const [selectedScreen, setSelectedScreen] = useState("Home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedScreen("Detail"); // Đổi sang màn Detail
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Hiển thị màn hình dựa trên state */}
      {selectedScreen === "Home" && (
        <HomeScreen onSelectProduct={handleSelectProduct} />
      )}
      {selectedScreen === "Profile" && <ProfileScreen />}
      {selectedScreen === "Detail" && <Detail product={selectedProduct} />}
      {selectedScreen === "Cart" && <CartScreen />}
      {selectedScreen === "Checkout"}

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
          onPress={() => setSelectedScreen("Cart")}
          style={styles.tabItem}
        >
          <Ionicons name="cart-outline" size={25} color="black" />
          <Text>Giỏ hàng</Text>
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
  {
    name: "Son 3ce",
    image:
      "https://th.bing.com/th/id/OIP.v8GGYP2vdZe82yvUXbx_ywHaF3?w=250&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    name: "Son Bbia",
    image:
      "https://th.bing.com/th/id/OIP.XJVRkyAqzRWKil2phuyTdAHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    name: "Son MAC",
    image:
      "https://th.bing.com/th/id/OIP.B0nNeW1FpwZNYdSPQiFgMgHaHa?w=181&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    name: "Son Romand",
    image:
      "https://th.bing.com/th/id/OIP.xgXpeClZfpnT5fQK5JjtxgHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
];

// Styles
const styles = StyleSheet.create({
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
    flexWrap: "wrap",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productImages: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  productDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 18, // Kích thước chữ
    fontWeight: "bold", // Đậm
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productimage: {
    width: "100%",
    height: 350,
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#ff6347",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
  },
  avatarContainer: {
    borderWidth: 4,
    borderColor: "#ff6347",
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 2, // Đổ bóng cho Android
    shadowColor: "#000", // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  info: {
    fontSize: 16,
    color: "#333",
  },
});
