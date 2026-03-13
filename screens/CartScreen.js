import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { CartContext } from "../context/CartContext";

const { width } = Dimensions.get("window");

export default function CartScreen() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getQuantity,
    getTotal,
    clearCart,
  } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Add some delicious items first! 🍕");
      return;
    }
    setModalVisible(true);
  };

  const handleConfirmOrder = () => {
    clearCart();
    setModalVisible(false);
    Alert.alert("Order Confirmed!", "Your food is on the way! 🚀");
  };

  const renderItem = ({ item }) => {
    const quantity = getQuantity(item.id);

    return (
      <View style={styles.cartItem}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "#fff"]}
          style={styles.itemGradient}
        >
          <TouchableOpacity style={styles.removeBtn}>
            <Text style={styles.removeIcon}>✕</Text>
          </TouchableOpacity>

          <Image source={item.image} style={styles.itemImage} />

          <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>

          <View style={styles.quantitySection}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.qtyMinus}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.qtyPlus}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtotal}>
            ${(item.price * quantity).toFixed(2)}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#800000", "#A52A2A", "#FFD700"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <Text style={styles.itemCount}>{cartItems.length} items</Text>
        </View>
      </LinearGradient>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{ right: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add some delicious items to get started
            </Text>
          </View>
        }
        style={styles.list}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.95)", "#fff"]}
        style={styles.footer}
      >
        <View style={styles.footerContent}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={handlePlaceOrder}
          disabled={cartItems.length === 0}
        >
          <LinearGradient
            colors={["#FFD700", "#FFA500"]}
            style={[
              styles.checkoutGradient,
              cartItems.length === 0 && styles.checkoutDisabled,
            ]}
          >
            <Text style={styles.checkoutText}>Place Order</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

      <Modal visible={modalVisible} transparent animationType="fade">
        <LinearGradient
          colors={[
            "rgba(128,0,0,0.9)",
            "rgba(165,42,42,0.9)",
            "rgba(255,215,0,0.8)",
          ]}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>Order Confirmed!</Text>
            <Text style={styles.modalMessage}>
              Your delicious food is on the way!
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={handleConfirmOrder}
            >
              <Text style={styles.modalBtnText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerGradient: {
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
  },
  headerTitle: {
    fontSize: scale(26),
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 0.5,
  },
  itemCount: {
    fontSize: scale(16),
    color: "rgba(255,255,255,0.9)",
    fontWeight: "700",
  },

  list: { flex: 1 },
  listContent: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    paddingBottom: verticalScale(20),
  },
  cartItem: {
    marginBottom: verticalScale(14),
  },
  itemGradient: {
    borderRadius: scale(20),
    padding: scale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.12,
    shadowRadius: scale(16),
    elevation: 8,
  },
  removeBtn: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: "rgba(255,107,107,0.9)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  removeIcon: {
    fontSize: scale(16),
    color: "#fff",
    fontWeight: "900",
  },
  itemImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: scale(16),
    marginBottom: verticalScale(12),
  },
  itemInfo: {
    flex: 1,
    marginLeft: scale(12),
  },
  itemName: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(4),
  },
  itemPrice: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#800000",
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(8),
  },
  qtyBtn: {
    backgroundColor: "#FFD700",
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(6),
  },
  qtyMinus: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#1a1a1a",
  },
  qtyPlus: {
    fontSize: scale(16),
    fontWeight: "900",
    color: "#1a1a1a",
  },
  quantity: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#1a1a1a",
    minWidth: scale(24),
    textAlign: "center",
  },
  subtotal: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#FFD700",
    textAlign: "center",
    marginTop: verticalScale(8),
  },
  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(40),
  },
  emptyIcon: {
    fontSize: scale(64),
    marginBottom: verticalScale(16),
  },
  emptyTitle: {
    fontSize: scale(22),
    fontWeight: "800",
    color: "#666",
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
  emptySubtitle: {
    fontSize: scale(16),
    color: "#999",
    textAlign: "center",
    lineHeight: verticalScale(22),
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: scale(80),
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -verticalScale(8) },
    shadowOpacity: 0.15,
    shadowRadius: scale(20),
    elevation: 12,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  totalLabel: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#1a1a1a",
  },
  totalAmount: {
    fontSize: scale(24),
    fontWeight: "900",
    color: "#800000",
  },
  checkoutBtn: {
    borderRadius: scale(16),
  },
  checkoutGradient: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(24),
    alignItems: "center",
  },
  checkoutDisabled: {
    opacity: 0.5,
  },
  checkoutText: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#1a1a1a",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(24),
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: scale(24),
    padding: scale(32),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(20) },
    shadowOpacity: 0.3,
    shadowRadius: scale(24),
    elevation: 20,
    maxWidth: "95%",
  },
  modalEmoji: {
    fontSize: scale(48),
    marginBottom: verticalScale(12),
  },
  modalTitle: {
    fontSize: scale(24),
    fontWeight: "900",
    color: "#1a1a1a",
    marginBottom: verticalScale(8),
  },
  modalMessage: {
    fontSize: scale(16),
    color: "#666",
    textAlign: "center",
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(24),
  },
  modalBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(32),
    borderRadius: scale(20),
    width: "100%",
  },
  modalBtnText: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#1a1a1a",
    textAlign: "center",
  },
});
