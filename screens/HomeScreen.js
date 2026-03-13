import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { categories } from "../data/foodData";

const { width, height } = Dimensions.get("window");

const numColumns = width < 360 ? 2 : width < 600 ? 2 : width < 900 ? 3 : 4;
const cardWidth = width / numColumns - 24;

export default function HomeScreen({ navigation, route }) {
  const rootNavigation =
    route?.params?.rootNavigation || navigation.getParent();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          rootNavigation?.navigate("Login");
        },
      },
    ]);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { width: cardWidth }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("FoodList", { category: item.name })}
    >
      <LinearGradient colors={["#fff", "#f8f9ff"]} style={styles.cardGradient}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.categoryImage} />
          <View style={styles.playButton}>
            <Feather name="play" size={moderateScale(14)} color="#fff" />
          </View>
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.itemCount}>150+ Items</Text>
          <Feather name="arrow-right" size={14} color="#FF6B6B" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.greetingRow}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.hello}>Hello, Foodie!</Text>
          <Text style={styles.subtitle}>What are you craving?</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={["#FF6B6B", "#FF8E8E"]}
          style={styles.logoutGradient}
        >
          <Feather name="log-out" size={18} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />
      <LinearGradient
        colors={["#8B0000", "#B22222", "#FF4500"]}
        style={styles.container}
      >
        <View style={styles.shape1} />
        <View style={styles.shape2} />

        <Header />

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#666" />
            <Text style={styles.searchText}>Search meals...</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Feather name="flame" size={20} color="#FFD700" />
            <Text style={styles.statValue}>247cal</Text>
          </View>
          <View style={styles.stat}>
            <Feather name="truck" size={20} color="#FFD700" />
            <Text style={styles.statValue}>32min</Text>
          </View>
          <View style={styles.stat}>
            <Feather name="star" size={20} color="#FFD700" />
            <Text style={styles.statValue}>4.9</Text>
          </View>
        </View>

        <Text style={styles.title}>Food Categories</Text>

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ right: 1 }}
          flexGrow={1}
          style={styles.list}
          ListHeaderComponent={<View style={{ height: verticalScale(20) }} />}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    paddingTop: verticalScale(12),
  },
  shape1: {
    position: "absolute",
    top: "5%",
    right: "5%",
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 40,
    backgroundColor: "rgba(255,215,0,0.2)",
  },
  shape2: {
    position: "absolute",
    bottom: "15%",
    left: "3%",
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(16),
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: "rgba(255,255,255,0.25)",
    marginRight: scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  hello: {
    fontSize: scale(22),
    fontWeight: "800",
    color: "#fff",
    marginBottom: verticalScale(2),
  },
  subtitle: {
    fontSize: scale(14),
    color: "rgba(255,255,255,0.9)",
  },
  logoutBtn: {
    padding: scale(4),
    zIndex: 1000,
  },
  logoutGradient: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: scale(20),
  },

  searchContainer: {
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(12),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    borderRadius: scale(22),
  },
  searchText: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: scale(15),
    color: "#666",
  },

  statsRow: {
    flexDirection: "row",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(12),
  },
  stat: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: scale(14),
    borderRadius: scale(16),
    alignItems: "center",
  },
  statValue: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#fff",
    marginTop: verticalScale(4),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "900",
    color: "#fff",
    paddingHorizontal: scale(18),
    marginVertical: verticalScale(12),
  },
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: scale(12),
    paddingBottom: verticalScale(80),
  },
  row: {
    justifyContent: "space-evenly",
    paddingVertical: verticalScale(6),
  },
  categoryCard: {
    marginBottom: verticalScale(16),
    borderRadius: scale(20),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.2,
    shadowRadius: scale(12),
    elevation: 10,
  },
  cardGradient: {
    padding: scale(18),
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginBottom: verticalScale(12),
  },
  categoryImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: scale(16),
  },
  playButton: {
    position: "absolute",
    bottom: -moderateScale(6),
    right: -moderateScale(6),
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: scale(17),
    fontWeight: "800",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: verticalScale(6),
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemCount: {
    fontSize: scale(12),
    color: "#666",
    fontWeight: "600",
    marginRight: scale(4),
  },
});
