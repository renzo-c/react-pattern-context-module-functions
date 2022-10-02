import "./styles.css";
import { UserProvider } from "./context/user-context";
import { UserSettings, UserDataDisplay } from "./screens/user-profile";

export default function App() {
  return (
    <UserProvider>
      <UserSettings />
      <UserDataDisplay />
    </UserProvider>
  );
}
