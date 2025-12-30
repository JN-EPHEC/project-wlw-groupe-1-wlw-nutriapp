import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { RoleProvider } from './src/context/RoleContext';

export default function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </RoleProvider>
    </AuthProvider>
  );
}
