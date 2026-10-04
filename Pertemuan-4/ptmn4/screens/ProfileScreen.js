import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nama</Text>
        <Text style={styles.value}>Nama Mahasiswa</Text>
        <Text style={styles.label}>NIM</Text>
        <Text style={styles.value}>1234567890</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0fdf4', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 12, width: '100%', maxWidth: 360, borderWidth: 1, borderColor: '#dddddd' },
  label: { fontSize: 12, color: '#888888', marginTop: 8 },
  value: { fontSize: 16, fontWeight: '600' },
});