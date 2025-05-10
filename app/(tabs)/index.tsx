import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors'; // Assuming Colors.ts is in constants

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OCR Scanner</Text>
      <Pressable style={styles.scanButton} onPress={() => {
        // TODO: Add navigation or logic to initiate scanning
        console.log("Scan button pressed!");
      }}>
        <Text style={styles.scanButtonText}>Scan Image</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background, // Use background color from constants
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: Colors.light.text, // Use text color from constants
  },
  scanButton: {
    backgroundColor: Colors.light.tint, // Use a tint color for the button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  scanButtonText: {
    color: Colors.light.background, // Use background color for button text for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
});