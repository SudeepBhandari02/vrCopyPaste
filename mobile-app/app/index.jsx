// app/index.jsx
import { View, Button, Text } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Select Mode:</Text>
      <Button title="2D Scan" onPress={() => router.push('/object-scanner')} />
      <Button title="3D Scan" onPress={() => router.push('/object-scanner?mode=3d')} />
      <Button title="Text Scan" onPress={() => router.push('/text-scanner')} />
      <Button title="Saved Items" onPress={() => router.push('/saved-items')} />
    </View>
  );
}
