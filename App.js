import React from 'react';
import { StyleSheet, View } from 'react-native';
import CarnaRoutes from './routes/CarnaRoutes';
export default function App() {
  return (
    <View style={styles.container}>
      {/*StackRoutes*/}
      <CarnaRoutes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
  },
});
