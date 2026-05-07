import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarStyle: { display: 'none' } 
    }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="login" />
      <Tabs.Screen name="registro" />
      <Tabs.Screen name="setup" />
      <Tabs.Screen name="home" />
    </Tabs>
  );
}