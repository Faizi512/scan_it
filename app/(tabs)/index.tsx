import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

export default function HomeScreen() {
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const performOCR = async (imageUri: string) => {
    // Basic OCR implementation (replace with actual OCR library)
    // For now, let's just display the image URI as the "extracted text"
    // You would integrate a library like Google ML Kit or Tesseract.js here
    setExtractedText(`Image URI: ${imageUri}`);
  };


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (  
    <View style={styles.container}>
      {capturedImage ? (
        <Image source={{ uri: capturedImage }} style={styles.preview} />
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.text}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      {extractedText && <Text style={styles.extractedText}>{extractedText}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
 flex: 1,
 justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  preview: {
    flex: 1,
    resizeMode: 'contain',
  },
  extractedText: {
    marginTop: 20,
    padding: 10,
  }
});
