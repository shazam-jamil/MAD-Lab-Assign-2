import firebase from "firebase";
import { Alert } from "react-native";

import { useUser } from "./useUser";
import secureStorage from "../utilities/secureStorage";

const useAuthentication = () => {
  const { setIsLogged } = useUser();

  const logIn = (email, password, setLoading, onAuth = null) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((current) => {
        secureStorage.storeUser({ email, password });

        setIsLogged(true);
        setLoading(false);

        // navigate after successfully login.
        if (onAuth) onAuth();
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(
          "Invalid Credentials !!",
          "The email or password is incorrect."
        );
      });
  };

  const register = (newUser, setLoading, onAuth = null) => {
    const { email, password, username } = newUser;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((current) => {
        secureStorage.storeUser({ email, password });

        current.user.updateProfile({
          displayName: username,
        });

        setIsLogged(true);
        setLoading(false);

        // navigate after successfully login.
        if (onAuth) onAuth();
      })
      .catch((error) => {
        Alert.alert("Error !!", error.message);
        setLoading(false);
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        secureStorage.removeUser();
        setIsLogged(false);
        Alert.alert("Alert", "Logged Out Successfully.");
      });
  };

  return { logIn, register, signOut };
};

export default useAuthentication;
