import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { CartContext } from "../context/CartContext";
import { foods } from "../data/foodData";

const { width } = Dimensions.get("window");

export default function FoodListScreen({ route, navigation }) {
  const { category } = route.params;
  const { addToCart, getQuantity, removeFromCart } = useContext(CartContext);

  const renderItem = ({ item }) => {
    const quantity = getQuantity(item.id);

    return (
      <TouchableOpacity style={styles.foodCard} activeOpacity={0.9}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "#fff"]}
          style={styles.cardGradient}
        >
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.foodImage} />
            <View style={styles.favoriteIcon}>
              <Text style={styles.favoriteCount}>★</Text>
            </View>
          </View>

          <View style={styles.foodInfo}>
            <Text style={styles.foodName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text style={styles.calories}>320 cal</Text>
            </View>

            {quantity === 0 ? (
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.minus}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#800000", "#A52A2A", "#FFD700"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{category}</Text>

          <TouchableOpacity style={styles.cartIcon}></TouchableOpacity>
        </View>
      </LinearGradient>
      <FlatList
        data={foods[category]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{ right: 1 }}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerGradient: {
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
  },
  backButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: scale(22),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: scale(20),
    color: "#fff",
    fontWeight: "900",
  },
  headerTitle: {
    fontSize: scale(24),
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 0.5,
  },
  cartIcon: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: scale(22),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -scale(2),
    right: -scale(2),
    backgroundColor: "#FFD700",
    color: "#1a1a1a",
    fontSize: scale(12),
    fontWeight: "900",
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    textAlign: "center",
    lineHeight: scale(20),
  },
  listContent: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    paddingBottom: verticalScale(120),
  },
  gridRow: {
    justifyContent: "space-between",
  },
  foodCard: {
    flex: 0.48,
    marginBottom: verticalScale(16),
    borderRadius: scale(24),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(8) },
    shadowOpacity: 0.15,
    shadowRadius: scale(20),
    elevation: 12,
  },
  cardGradient: {
    padding: scale(16),
  },
  imageContainer: {
    position: "relative",
    marginBottom: verticalScale(12),
  },
  foodImage: {
    width: "100%",
    height: moderateScale(140),
    borderRadius: scale(20),
    resizeMode: "cover",
  },
  favoriteIcon: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    backgroundColor: "rgba(255,215,0,0.9)",
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteCount: {
    color: "#fff",
    fontSize: scale(14),
    fontWeight: "900",
  },
  foodInfo: {
    alignItems: "center",
  },
  foodName: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#1a1a1a",
    textAlign: "center",
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: verticalScale(12),
  },
  price: {
    fontSize: scale(20),
    fontWeight: "900",
    color: "#FFD700",
  },
  calories: {
    fontSize: scale(14),
    color: "#666",
    fontWeight: "600",
  },
  addToCartBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(16),
    alignItems: "center",
  },
  addText: {
    fontSize: scale(15),
    fontWeight: "800",
    color: "#1a1a1a",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(4),
  },
  quantityBtn: {
    backgroundColor: "#FFD700",
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(4),
  },
  quantityText: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#1a1a1a",
  },
  quantity: {
    fontSize: scale(18),
    fontWeight: "800",
    color: "#1a1a1a",
    minWidth: scale(24),
    textAlign: "center",
  },
  minus: {
    fontSize: scale(20),
    fontWeight: "900",
    color: "#1a1a1a",
  },
  plus: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#1a1a1a",
  },
});
