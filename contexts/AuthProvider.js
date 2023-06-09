import { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '@react-native-firebase/auth';
const AuthContext = createContext();

export function useAuth() {

    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [user, loading] = useAuthState(auth());
    return (
        <AuthContext.Provider
            value={{ user }}
        >
            {children}
        </AuthContext.Provider>
    );
}