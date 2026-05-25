import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons
from "@expo/vector-icons/Ionicons";

export default function DashboardScreen({
  navigation,
}: any) {

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >

          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color="#111827"
            />

          </TouchableOpacity>

          <View>

            <Text style={styles.subtitle}>
              Centro analítico
            </Text>

            <Text style={styles.title}>
              Dashboard
            </Text>

          </View>

        </View>

        <View style={styles.headerIcon}>

          <Ionicons
            name="stats-chart"
            size={28}
            color="#fff"
          />

        </View>

      </View>

      {/* PRODUCTIVIDAD */}

      <View style={styles.progressCard}>

        <Text style={styles.cardTitle}>
          Productividad General
        </Text>

        <View style={styles.progressWrapper}>

          <View style={styles.outerCircle}>

            <View style={styles.innerCircle}>

              <Text style={styles.progressValue}>
                78%
              </Text>

              <Text style={styles.progressLabel}>
                Rendimiento
              </Text>

            </View>

          </View>

        </View>

      </View>

      {/* KPIS */}

      <View style={styles.grid}>

        {/* KPI 1 */}

        <View style={styles.kpiCard}>

          <View
            style={[
              styles.kpiIcon,
              {
                backgroundColor: "#dbeafe",
              },
            ]}
          >

            <Ionicons
              name="water"
              size={26}
              color="#2563eb"
            />

          </View>

          <Text style={styles.kpiValue}>
            450L
          </Text>

          <Text style={styles.kpiLabel}>
            Producción Hoy
          </Text>

        </View>

        {/* KPI 2 */}

        <View style={styles.kpiCard}>

          <View
            style={[
              styles.kpiIcon,
              {
                backgroundColor: "#dcfce7",
              },
            ]}
          >

            <Ionicons
              name="cash"
              size={26}
              color="#16a34a"
            />

          </View>

          <Text style={styles.kpiValue}>
            $12.5K
          </Text>

          <Text style={styles.kpiLabel}>
            Ingresos
          </Text>

        </View>

        {/* KPI 3 */}

        <View style={styles.kpiCard}>

          <View
            style={[
              styles.kpiIcon,
              {
                backgroundColor: "#fef3c7",
              },
            ]}
          >

            <Ionicons
              name="paw"
              size={26}
              color="#d97706"
            />

          </View>

          <Text style={styles.kpiValue}>
            24
          </Text>

          <Text style={styles.kpiLabel}>
            Animales
          </Text>

        </View>

        {/* KPI 4 */}

        <View style={styles.kpiCard}>

          <View
            style={[
              styles.kpiIcon,
              {
                backgroundColor: "#fee2e2",
              },
            ]}
          >

            <Ionicons
              name="alert-circle"
              size={26}
              color="#dc2626"
            />

          </View>

          <Text style={styles.kpiValue}>
            3
          </Text>

          <Text style={styles.kpiLabel}>
            Alertas
          </Text>

        </View>

      </View>

      {/* ANALYTICS */}

      <View style={styles.analyticsCard}>

        <Text style={styles.analyticsTitle}>
          Rendimiento semanal
        </Text>

        {/* BARS */}

        <View style={styles.barsContainer}>

          <View style={styles.barItem}>
            <View
              style={[
                styles.bar,
                {
                  height: 80,
                  backgroundColor: "#3b82f6",
                },
              ]}
            />
            <Text style={styles.barLabel}>
              L
            </Text>
          </View>

          <View style={styles.barItem}>
            <View
              style={[
                styles.bar,
                {
                  height: 120,
                  backgroundColor: "#16a34a",
                },
              ]}
            />
            <Text style={styles.barLabel}>
              M
            </Text>
          </View>

          <View style={styles.barItem}>
            <View
              style={[
                styles.bar,
                {
                  height: 100,
                  backgroundColor: "#f59e0b",
                },
              ]}
            />
            <Text style={styles.barLabel}>
              M
            </Text>
          </View>

          <View style={styles.barItem}>
            <View
              style={[
                styles.bar,
                {
                  height: 150,
                  backgroundColor: "#06b6d4",
                },
              ]}
            />
            <Text style={styles.barLabel}>
              J
            </Text>
          </View>

          <View style={styles.barItem}>
            <View
              style={[
                styles.bar,
                {
                  height: 110,
                  backgroundColor: "#9333ea",
                },
              ]}
            />
            <Text style={styles.barLabel}>
              V
            </Text>
          </View>

        </View>

      </View>

      {/* ACTIVIDAD */}

      <View style={styles.activityCard}>

        <Text style={styles.analyticsTitle}>
          Actividad reciente
        </Text>

        <View style={styles.activityItem}>

          <Ionicons
            name="checkmark-circle"
            size={24}
            color="#16a34a"
          />

          <Text style={styles.activityText}>
            Producción registrada correctamente
          </Text>

        </View>

        <View style={styles.activityItem}>

          <Ionicons
            name="cash-outline"
            size={24}
            color="#3b82f6"
          />

          <Text style={styles.activityText}>
            Nueva venta agregada al sistema
          </Text>

        </View>

        <View style={styles.activityItem}>

          <Ionicons
            name="notifications"
            size={24}
            color="#f59e0b"
          />

          <Text style={styles.activityText}>
            Vacunación pendiente para 2 animales
          </Text>

        </View>

      </View>

      <View style={{ height: 50 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {

    backgroundColor: "#14b8a6",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 40,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {

    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor:
      "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: 15,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 6,
  },

  headerIcon: {

    width: 60,
    height: 60,

    borderRadius: 20,

    backgroundColor:
      "rgba(255,255,255,0.12)",

    justifyContent: "center",
    alignItems: "center",
  },

  progressCard: {

    backgroundColor: "#fff",

    margin: 22,
    padding: 26,

    borderRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 24,
  },

  progressWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  outerCircle: {

    width: 220,
    height: 220,

    borderRadius: 110,

    borderWidth: 18,
    borderColor: "#16a34a",

    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {

    width: 160,
    height: 160,

    borderRadius: 80,

    backgroundColor: "#f8fafc",

    justifyContent: "center",
    alignItems: "center",
  },

  progressValue: {
    fontSize: 42,
    fontWeight: "900",
    color: "#111827",
  },

  progressLabel: {
    color: "#64748b",
    marginTop: 6,
    fontWeight: "700",
  },

  grid: {

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    paddingHorizontal: 22,
  },

  kpiCard: {

    width: "48%",

    backgroundColor: "#fff",

    borderRadius: 28,

    padding: 22,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  kpiIcon: {

    width: 56,
    height: 56,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,
  },

  kpiValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  kpiLabel: {
    color: "#64748b",
    marginTop: 6,
    fontWeight: "700",
  },

  analyticsCard: {

    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginTop: 6,

    borderRadius: 30,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  analyticsTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 24,
    color: "#111827",
  },

  barsContainer: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",

    height: 180,
  },

  barItem: {
    alignItems: "center",
  },

  bar: {

    width: 42,

    borderRadius: 16,
  },

  barLabel: {
    marginTop: 10,
    color: "#64748b",
    fontWeight: "700",
  },

  activityCard: {

    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginTop: 18,

    borderRadius: 30,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  activityItem: {

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 22,
  },

  activityText: {
    marginLeft: 14,
    color: "#334155",
    fontWeight: "600",
    flex: 1,
    lineHeight: 22,
  },
});