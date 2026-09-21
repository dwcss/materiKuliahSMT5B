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

        {/* Bagian Cita-cita (Singkat) */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Cita-cita:</Text>
          <Text style={styles.value}>Programmer Handal 🚀</Text>
        </View>

        {/* Bagian Rencana (Paragraf Panjang) */}
        <View style={[styles.infoRow, styles.lastRow]}>
          <Text style={styles.label}>Rencana cita-cita:</Text>
          <Text style={styles.paragraph}>
            Untuk mencapai cita-cita tersebut, saya berencana untuk mendalami berbagai bahasa pemrograman dan teknologi modern, khususnya di bidang Full-stack Development. Saya akan fokus membangun fondasi coding yang kuat, memperbanyak latihan dengan membuat proyek-proyek nyata (portofolio), dan aktif berkontribusi di komunitas developer. Saya juga akan terus belajar beradaptasi dengan teknologi terbaru seperti AI agar bisa menciptakan solusi digital yang bermanfaat bagi masyarakat luas. 💻✨
          </Text>
        </View>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
  lastRow: {
    borderBottomWidth: 0, 
    marginBottom: 0,
    paddingBottom: 0,
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
  paragraph: {
    fontSize: 14,
    fontWeight: '500',
    color: '#34495E',
    lineHeight: 22, 
    textAlign: 'justify',
    marginTop: 4,
  },
});