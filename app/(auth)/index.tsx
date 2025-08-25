import { Redirect } from 'expo-router';

export default function AuthIndex() {
  // Redirect to the login page as the default screen for this group
  return <Redirect href="/login" />;
}