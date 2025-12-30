import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Victory: any = require('victory-native');

export default function PatientGraphs() {
  const data = [
    { x: 1, y: 1850 },
    { x: 2, y: 1920 },
    { x: 3, y: 1780 },
    { x: 4, y: 2050 },
    { x: 5, y: 1890 },
    { x: 6, y: 1950 },
    { x: 7, y: 1820 },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Victory.VictoryChart theme={Victory.VictoryTheme.material}>
          <Victory.VictoryLine data={data} style={{ data: { stroke: '#1DBF73' } }} />
        </Victory.VictoryChart>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
});
