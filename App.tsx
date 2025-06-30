import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { RootNavigator } from './src/navigation/RootNavigator';
import './global.css';

// Initialize Convex client
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || "");

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <RootNavigator />
      <StatusBar style="auto" />
    </ConvexProvider>
  );
}
