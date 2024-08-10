import axios from "axios";
import {create} from "zustand"
import toast from "react-hot-toast"

export const useAuthStore = create( (set)=>({
    user : null,
    isSignUp:false,
    isLogin : false,
    isLogOut: false,
    isCheckingAuth: true, // went refresh => auto check auth
    signup: async(credentials) =>{
        set({ isSigningUp: true });
		try {
			const response = await axios.post("/api/v1/auth/signup", credentials);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.msg || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
    },
    login: async (credentials) => {
		set({ isLogin: true });
		try {
			const response = await axios.post("/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLogin: false });
		} catch (error) {
			set({ isLogin: false, user: null });
			toast.error(error.response.data.msg || "Login failed");
		}
	},
    logout: async() =>{
        set({ isLogOut: true });
        try {
            await axios.post("/api/v1/auth/logout")
            set({isLogOut: false, user: null });
            toast.success("Account Logout successfully");
        } catch (error) {
            toast.error(error.response.data.msg || "Logout failed");
			set({ isLogOut: false, user: null });
        }
    },
    authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			// toast.error(error.response.data.message || "An error occurred");
		}
	},
    
}))