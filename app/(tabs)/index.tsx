import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { processTextWithAI } from '../../utils/ai';

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    if (extractedText) {
      processTextWithAI(extractedText).then(aiResult => {
        try {
          router.navigate('test', {
            aiResult,
          });
        } catch (error) {
          setError('Error processing AI response.');
        }
      });
    }
  }, [extractedText]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setIsLoading(true);
    try {
      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      setError('Error picking image.');
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
    }
  };

  const performOCR = async (imageUri: string) => {
    // Basic OCR implementation (replace with actual OCR library)
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      // Simulate OCR processing
      setExtractedText(`This is some sample text extracted from ${imageUri}. This text will be sent to the AI.`);
      setIsLoading(false);
    } catch (error) {
      setError('Error performing OCR.');
      setIsLoading(false);
    }
  };

  if (error) {
    return <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error}</Text>;
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => performOCR(capturedImage)}>
              <Text style={styles.text}>Perform OCR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCapturedImage(null)}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>{}</TouchableOpacity>          
        </Camera>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.text}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
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
    marginVertical: 20,
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
