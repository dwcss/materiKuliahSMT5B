// Import Library
import React, { useState, useRef, useEffect } from "react"; 

// Import Components
import {
  View,
  Text,
  Image,          
  ScrollView, 
  FlatList, 
  SectionList,    
  TextInput, 
  Button, 
  TouchableOpacity,
  Pressable, 
  Switch, 
  Modal, 
  ActivityIndicator, 
  StatusBar, 
  SafeAreaView,    
  StyleSheet, 
  Linking,
  Platform,
  KeyboardAvoidingView,
  Animated
} from 'react-native';

const PROFILE = {
  name: "Dawwas Zakka Sutiono",
  title: "Programmer Handal",
  email: "dawwaszakkas@uinssc.ac.id",
  phone: "085926116208",
  location: "Cirebon, Jawa Barat",
  bio: "Programer Yang selalu vibecoding",
  avatar: "https://ui-avatars.com/api/?name=Dawwas+Zakka&background=random&size=200",
  avatarOffline: require('./assets/WhatsApp Image 2025-03-01 at 12.42.48_9f84d4bf.jpg')
};

const DATA_SKILLS = [
  { id: '1', name: 'React Native', progress: 70, color: '#61DBFB' },
  { id: '2', name: 'JavaScript', progress: 50, color: '#F7DC6F' },
  { id: '3', name: 'Vibe Coding', progress: 100, color: '#FF6B6B' },
  { id: '4', name: 'Administrasi TU', progress: 60, color: '#4ECDC4' },
];

const DATA_RIWAYAT = [
  {
    title: "Pengalaman Kerja",
    data: [
      { 
        id: '1', 
        role: 'Staff Administrasi', 
        place: 'PT Indorama Synthetics Tbk', 
        year: '2025', 
        desc: 'Bertanggung jawab dalam pengelolaan dokumen administrasi, pencatatan data operasional, serta mendukung kelancaran komunikasi antar departemen.' 
      }
    ]
  },
  {
    title: "Pendidikan",
    data: [
      { 
        id: '2488010015', 
        role: 'Mahasiswa Informatika', 
        place: 'UIN SSC', 
        year: '2024 - Sekarang', 
        desc: 'Fokus pada pengembangan perangkat lunak.' 
      }
    ]
  }
];

const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.progress}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: item.color || COLORS.accent }]} />
    </View>
  </View>
);

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.timelineCard} onPress={onPress} activeOpacity={0.75}>
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelinePlace}>{item.place} ({item.year})</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail ➔</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('Info');
  const [showOfflineImage, setShowOfflineImage] = useState(false);
  
  const [nama, setNama] = useState('');
  const [pesan, setPesan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE KUSTOM ALERT POPUP ---
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', onOk: null });

  const showAlert = (title, message, onOk = null) => {
    setAlertConfig({ title, message, onOk });
    setAlertVisible(true);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const kirimPesan = () => {
    if (nama === '' || pesan === '') {
      showAlert("⚠️ Peringatan", "Nama dan pesan tidak boleh kosong!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showAlert("✅ Sukses", `Pesan dari ${nama} telah terkirim!`);
      setNama('');
      setPesan('');
    }, 2000); 
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* HEADER BAR */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {isOpenToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>
          <Switch 
            value={isOpenToWork} 
            onValueChange={(val) => setIsOpenToWork(val)} 
            trackColor={{ false: '#555', true: '#4ade80' }}
            thumbColor={isOpenToWork ? '#fff' : '#aaa'}
          />
        </View>
      </View>

      {/* TAB NAVIGASI SEDERHANA */}
      <View style={styles.tabContainer}>
        {['Info', 'Skills', 'Kontak'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* KEYBOARD AVOIDING VIEW */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          
          {/* TAB 1: INFO PROFIL & RIWAYAT */}
          {(activeTab === 'Info' || activeTab === 'All') && (
            <>
              <View style={styles.profileSection}>
                {/* ANIMATED AVATAR */}
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  }}
                >
                  <TouchableOpacity 
                    activeOpacity={0.7} 
                    onPress={() => setShowOfflineImage(!showOfflineImage)}
                  >
                    <Image 
                      source={showOfflineImage ? PROFILE.avatarOffline : { uri: PROFILE.avatar }} 
                      style={styles.avatar} 
                    />
                  </TouchableOpacity>
                </Animated.View>

                {isOpenToWork && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✅ Open to Work</Text>
                  </View>
                )}

                <Text style={styles.profileName}>{PROFILE.name}</Text>
                <Text style={styles.profileTitle}>{PROFILE.title}</Text>
                <Text style={styles.profileBio}>{PROFILE.bio}</Text>

                <View style={styles.contactRow}>
                  <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
                  <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
                </View>
                <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>

                <View style={styles.socialRow}>
                  {/* Tombol GitHub Profil dwcss */}
                  <TouchableOpacity 
                    style={styles.socialBtn} 
                    onPress={() => {
                      const url = 'https://github.com/dwcss';
                      showAlert('🔗 Link', url, () => Linking.openURL(url));
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.socialIcon}>🐙</Text>
                    <Text style={styles.socialLabel}>GitHub</Text>
                  </TouchableOpacity>
                  
                  {/* Tombol Instagram */}
                  <TouchableOpacity 
                    style={[styles.socialBtn, { borderColor: '#E1306C' }]} 
                    onPress={() => {
                      const url = 'https://www.instagram.com/dawwszkka_?stkn=MWJ4MzIycHIybjY3MQ%3D%3D&utm_source=qr';
                      showAlert('🔗 Link', url, () => Linking.openURL(url));
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.socialIcon}>📸</Text>
                    <Text style={[styles.socialLabel, { color: '#E1306C' }]}>Instagram</Text>
                  </TouchableOpacity>
                </View>

                {/* FITUR DOWNLOAD CV */}
                <Pressable 
                  style={({ pressed }) => [styles.downloadBtn, pressed && styles.downloadBtnPressed]}
                  onPress={() => {
                    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
                    showAlert('📥 Download', 'CV sedang diunduh...', () => Linking.openURL(pdfUrl));
                  }}
                >
                  <Text style={styles.downloadBtnText}>📥 Download CV (PDF)</Text>
                </Pressable>
              </View>

              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>📄 Riwayat</Text>
                <SectionList 
                  sections={DATA_RIWAYAT}
                  keyExtractor={(item) => item.id}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                  )}
                  renderItem={({ item }) => <TimelineCard item={item} onPress={() => openModal(item)} />}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
              </View>
            </>
          )}

          {/* TAB 2: SKILLS */}
          {(activeTab === 'Skills' || activeTab === 'All') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
              <FlatList 
                data={DATA_SKILLS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <SkillCard item={item} />}
                scrollEnabled={false} 
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              />
            </View>
          )}

          {/* TAB 3: KONTAK */}
          {(activeTab === 'Kontak' || activeTab === 'All') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>📬 Hubungi Saya</Text>
              <TextInput 
                style={styles.textInput} 
                placeholder="Nama Anda" 
                placeholderTextColor="#888"
                value={nama}
                onChangeText={setNama}
                editable={!isLoading}
              />
              <TextInput 
                style={[styles.textInput, styles.textArea]} 
                placeholder="Pesan Anda..." 
                placeholderTextColor="#888"
                multiline 
                numberOfLines={4}
                textAlignVertical="top"
                value={pesan}
                onChangeText={setPesan}
                editable={!isLoading}
              />
              
              {isLoading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="large" color={COLORS.accent} />
                  <Text style={styles.loadingText}>Mengirim pesan...</Text>
                </View>
              ) : (
                <Button title="✉️ Kirim Pesan" color={COLORS.accent} onPress={kirimPesan} />
              )}
            </View>
          )}
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL DETAIL RIWAYAT */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.place}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.year}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}
            <TouchableOpacity 
              style={styles.modalCloseBtn} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* POPUP ALERT MODAL (PUTIH DENGAN TOMBOL OK BIRU) */}
      <Modal
        visible={alertVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>{alertConfig.title}</Text>
            <Text style={styles.alertMessage}>{alertConfig.message}</Text>
            
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => {
                setAlertVisible(false);
                if (alertConfig.onOk) alertConfig.onOk();
              }}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const COLORS = {
  bg: '#0f0f1a',
  card: '#1a1a2e',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    padding: 6,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    justify: 'space-around',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: COLORS.accent,
  },
  tabText: {
    color: COLORS.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },
  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
  },
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelinePlace: { color: COLORS.accentLight, fontSize: 13, marginBottom: 6 },
  timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  /* STYLES POPUP ALERT */
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '85%',
    maxWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 20,
  },
  alertButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  alertButtonText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: 'bold',
  },
});