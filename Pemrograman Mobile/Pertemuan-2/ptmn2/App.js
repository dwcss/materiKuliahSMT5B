import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Biodata Diri</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Nama Lengkap:</Text>
          <Text style={styles.value}>Dawwas Zakka Sutiono</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>NIM:</Text>
          <Text style={styles.value}>2488010015</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Asal Sekolah:</Text>
          <Text style={styles.value}>MAN Purwakarta</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Rencana Cita-cita:</Text>
          <Text style={styles.value}>Jadi programmer handal 🚀</Text>
        </View>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Warna background yang lebih lembut
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 25,
    borderRadius: 16,
    // Efek bayangan untuk iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Efek bayangan untuk Android
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
});