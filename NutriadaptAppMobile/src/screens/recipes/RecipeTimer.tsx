import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RecipeTimer({ totalMinutes = 10, onClose }: { totalMinutes?: number; onClose?: () => void }) {
  const [seconds, setSeconds] = useState(totalMinutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.time}>{mm}:{ss}</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: running ? '#E5E7EB' : '#1DBF73' }]} onPress={() => setRunning((v) => !v)}>
            <Text style={[styles.btnText, { color: running ? '#1A1A1A' : '#fff' }]}>{running ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#E5E7EB' }]} onPress={() => setSeconds(totalMinutes * 60)}>
            <Text style={styles.btnText}>Reset</Text>
          </TouchableOpacity>
          {onClose && (
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#E5E7EB' }]} onPress={onClose}>
              <Text style={styles.btnText}>Fermer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  time: { fontSize: 48, fontWeight: '700', color: '#1A1A1A' },
  btn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  btnText: { fontWeight: '700', color: '#1A1A1A' },
});
