import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = () => {
  const navigation = useNavigation();

  const handleBackToCart = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Đây là màn hình thanh toán!</Text>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Thanh Toán</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Thông tin thanh toán:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Tên khách hàng:</Text>
            <Text style={styles.infoValue}>Nguyễn Văn A</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoValue}>123 Nguyễn Văn Cừ, Q.5, TP.HCM</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>SĐT:</Text>
            <Text style={styles.infoValue}>0123456789</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>nguyenvana@example.com</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button title="Quay lại giỏ hàng" onPress={handleBackToCart} />
          <Button
            title="Thanh toán"
            onPress={() => console.log("Thanh toán thành công!")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CheckoutScreen;
