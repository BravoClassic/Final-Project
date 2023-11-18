//utils/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supaBaseClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)
        const navigate = useNavigate();
        const [auth, setAuth] = useState(false);

        const getUser = async () => {
          const { data } = await supabase.auth.getUser();
          const { user } = data;
          setUser(user ?? null);
          setAuth(user ? true : false);
          setLoading(false);
        };
        useEffect(() => {
          getUser();
          const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
              // setUser(data);
              setAuth(true);
            } else if (event === "SIGNED_OUT") {
              setUser(null);
              setAuth(false);
            }
          });
          return () => {
            data.subscription.unsubscribe();
          };
        }, []);

         const loginUser = async (userInfo) => {
          try {
            const { error } = await supabase.auth.signInWithPassword({
              email: userInfo.target[0].value.trim().toLowerCase(),
              password: userInfo.target[1].value,
            });
            if (error) throw error;
            await getUser();
            navigate("/home");
      
            // alert("Logged in successfully!");
          } catch (error) {
            alert(error.error_description || error.message);
          }
         }

         const logoutUser = async () => {
          try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
            navigate("/");
          } catch (error) {
            alert(error.error_description || error.message);
          }
         }

         const registerUser = async (userInfo) => {
          
          try {
            let {  error } = await supabase.auth.signUp({
              email: userInfo.target[1].value.trim().toLowerCase(),
              password: userInfo.target[2].value,
              options: {
                data: {
                  username: userInfo.target[0].value.trim().toLowerCase(),
                },
              },
            });
            // console.log("Submitted values:", username, email, password);
            if (error) throw error;
            // console.log("data", data);
            alert("Check your email for the verfication link!");
          } catch (error) {
            alert(error.error_description || error.message);
          }
         }

        //  const checkUserStatus = async () => {}

        const contextData = {
            auth,
            user,
            loginUser,
            logoutUser,
            registerUser
        }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;