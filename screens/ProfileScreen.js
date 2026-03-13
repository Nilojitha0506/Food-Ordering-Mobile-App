import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {
  const recentOrders = [
    {
      id: "1",
      title: "Margherita Pizza x2",
      time: "2h ago",
      total: "$17.98",
      status: "Delivered",
    },
    {
      id: "2",
      title: "Pepperoni Pizza",
      time: "1d ago",
      total: "$9.99",
      status: "Delivered",
    },
    {
      id: "3",
      title: "Chocolate Shake",
      time: "3d ago",
      total: "$4.99",
      status: "Delivered",
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#800000", "#A52A2A", "#FFD700"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>

          <View style={styles.profileHero}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("../assets/profile.png")}
                style={styles.avatar}
              />
              <View style={styles.avatarGlow} />
            </View>
            <Text style={styles.name}>Nilojitha</Text>
            <Text style={styles.handle}>@nilo_2026</Text>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.statsRow}>
          <LinearGradient
            colors={["rgba(255,215,0,0.15)", "rgba(255,215,0,0.05)"]}
            style={styles.statCard}
          >
            <Text style={styles.statBig}>42</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </LinearGradient>

          <LinearGradient
            colors={["rgba(255,215,0,0.15)", "rgba(255,215,0,05)"]}
            style={styles.statCard}
          >
            <Text style={styles.statBig}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </LinearGradient>

          <LinearGradient
            colors={["rgba(128,0,0,0.15)", "rgba(128,0,0,0.05)"]}
            style={styles.statCard}
          >
            <Text style={styles.statBig}>$245</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </LinearGradient>
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>📦</Text>
              </View>
              <Text style={styles.actionText}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>❤️</Text>
              </View>
              <Text style={styles.actionText}>Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>💳</Text>
              </View>
              <Text style={styles.actionText}>Payments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>📍</Text>
              </View>
              <Text style={styles.actionText}>Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {recentOrders.map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderItem}>
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,1)"]}
                style={styles.orderCard}
              >
                <View style={styles.orderContent}>
                  <Text style={styles.orderTitle}>{order.title}</Text>
                  <Text style={styles.orderMeta}>
                    {order.time} • {order.total}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    order.status === "Delivered" && styles.deliveredBadge,
                  ]}
                >
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f23",
  },
  headerGradient: {
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(32),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  settingsBtn: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: scale(22),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  settingsIcon: {
    fontSize: scale(20),
    color: "#fff",
  },
  profileHero: {
    flex: 1,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: verticalScale(12),
  },
  avatar: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.2)",
  },
  avatarGlow: {
    position: "absolute",
    top: -scale(4),
    left: -scale(4),
    right: -scale(4),
    bottom: -scale(4),
    borderRadius: moderateScale(54),
    backgroundColor: "#FFD700",
    opacity: 0.3,
  },
  name: {
    fontSize: scale(26),
    fontWeight: "900",
    color: "#fff",
    marginBottom: verticalScale(4),
  },
  handle: {
    fontSize: scale(16),
    color: "rgba(255,255,255,0.85)",
    fontWeight: "700",
  },
  editBtn: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: scale(22),
  },
  editText: {
    fontSize: scale(15),
    color: "#fff",
    fontWeight: "800",
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingBottom: verticalScale(100),
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: width > 600 ? "space-evenly" : "space-around",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(24),
    flexWrap: "wrap",
  },
  statCard: {
    padding: scale(20),
    borderRadius: scale(20),
    alignItems: "center",
    marginHorizontal: scale(6),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.2,
    shadowRadius: scale(16),
    elevation: 10,
    minWidth: width > 600 ? scale(100) : scale(90),
  },
  statBig: {
    fontSize: scale(24),
    fontWeight: "900",
    color: "#FFD700",
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: scale(13),
    color: "#fff",
    fontWeight: "700",
  },
  actionsSection: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
  },
  sectionTitle: {
    fontSize: scale(22),
    fontWeight: "900",
    color: "#fff",
    marginBottom: verticalScale(16),
  },
  actionsGrid: {
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: scale(20),
    borderRadius: scale(20),
    alignItems: "center",
    width: width > 600 ? "24%" : "100%",
    marginBottom: width > 600 ? 0 : verticalScale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: scale(12),
    elevation: 8,
  },
  actionIconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(8),
  },
  actionIcon: {
    fontSize: scale(24),
    color: "#fff",
  },
  actionText: {
    fontSize: scale(14),
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  ordersSection: {
    paddingHorizontal: scale(20),
  },
  orderItem: {
    marginBottom: verticalScale(14),
  },
  orderCard: {
    borderRadius: scale(20),
    padding: scale(18),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(8) },
    shadowOpacity: 0.18,
    shadowRadius: scale(20),
    elevation: 12,
  },
  orderContent: {
    flex: 1,
  },
  orderTitle: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: verticalScale(4),
  },
  orderMeta: {
    fontSize: scale(14),
    color: "#666",
    fontWeight: "600",
  },
  statusBadge: {
    backgroundColor: "rgba(255,107,107,0.2)",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(14),
    borderRadius: scale(14),
    alignSelf: "flex-start",
    marginTop: verticalScale(8),
    alignItems: "center",
  },
  deliveredBadge: {
    backgroundColor: "rgba(46,213,115,0.25)",
  },
  statusText: {
    fontSize: scale(12),
    fontWeight: "800",
    color: "#1a1a1a",
  },
});
