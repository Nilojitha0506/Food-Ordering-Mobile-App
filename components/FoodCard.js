import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

export default function FoodCard({ item, onAdd, containerStyle, index }) {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        containerStyle,
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />

        {item.discount && (
          <LinearGradient
            colors={["#FF6B6B", "#FF8E8E"]}
            style={styles.discountBadge}
          >
            <Text style={styles.discountText}>{item.discount}</Text>
          </LinearGradient>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description || "Freshly prepared delicious meal"}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            {item.originalPrice && (
              <Text style={styles.oldPrice}>
                ${item.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAdd(item)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#7A0C2E", "#A4133C"]}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: scale(20),
    overflow: "hidden",
    margin: scale(12),
    width: width * 0.44 - scale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(8) },
    shadowOpacity: 0.15,
    shadowRadius: scale(16),
    elevation: 12,
    backdropFilter: "blur(10px)",
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: width * 0.32,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },

  discountBadge: {
    position: "absolute",
    top: scale(12),
    left: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(8),
    minWidth: scale(44),
    alignItems: "center",
  },

  discountText: {
    fontSize: scale(11),
    fontWeight: "800",
    color: "#fff",
  },

  info: {
    padding: scale(16),
    flex: 1,
  },

  name: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: verticalScale(4),
  },

  description: {
    fontSize: scale(13),
    color: "#666",
    lineHeight: scale(16),
    marginBottom: verticalScale(8),
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },

  priceContainer: {
    flex: 1,
  },

  price: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#7A0C2E",
    marginBottom: verticalScale(2),
  },

  oldPrice: {
    fontSize: scale(13),
    color: "#999",
    textDecorationLine: "line-through",
  },

  addButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    overflow: "hidden",
    marginLeft: scale(8),
  },

  addButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
