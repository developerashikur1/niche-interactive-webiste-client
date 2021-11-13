import initializeAuthentication from "../Login/Firebase/firebase.init"
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";


initializeAuthentication();
const useFirebase = () =>{
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // google sign in method
    const googleSignInMethod = (location, history) =>{
        setLoading(true);
        signInWithPopup(auth, googleProvider)
        .then(result=>{
            setUser(result.user)
            const locationTrack = location?.state?.from || "/";
            history.push(locationTrack);
            saveUsers(result?.user?.email, result?.user?.displayName, 'PUT' )
        })
        .catch(error=>{
            setError(error.message)
        })
        .finally(()=>setLoading(false))
    }

    // user password register method
    const emailPasswordRegisterMethod = (email, password, name, history) =>{
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            saveUsers(email, name, 'POST')
            history.replace("/")
            // Signed in 
            updateProfile(auth.currentUser,{
                displayName: name, 
            }).then(() => {
            }).catch((error) => {
               setError(error.message)
            });
          const newUser = {email, displayName: name}
          setUser(newUser)
        })
        .catch((error) => {
            setError(error.message)
        })
        .finally(()=>setLoading(false))
    }


    // sign in with user password method
    const emailPasswordSignInMethod = (email, password, location, history) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then(res=>{
            const locationTrack = location?.state?.from || "/";
            history.push(locationTrack);
        })
        .catch(error=>{
            setError(error)
        })
        .finally(()=>setLoading(false))
    }


    // 
    useEffect(()=>{
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, user=>{
            if(user){
                setUser(user)
            }
            else{
                setUser({})
            }
            setLoading(false)
        })
        return unsubscribe;
    },[auth])


    // signOut
    const logInOut = () =>{
        setLoading(true)
        signOut(auth)
        .then(()=>{
            setUser({})
        })
        .catch(error=>{
            setError(error.message)
        })
        .finally(()=>setLoading(false))
    }

    const saveUsers = (email, displayName, method) =>{
        const user={email, displayName}
        fetch('https://glacial-inlet-84612.herokuapp.com/users', {
            method:method,
            headers:{
                'content-type' : 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{console.log(data)
        })
       
    }

    useEffect(()=>{
       setLoading(true)
        
            fetch(`https://glacial-inlet-84612.herokuapp.com/users/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setAdmin(data)
        })
        setLoading(false)
    
       
    },[user.email])
    
    return{
        user,
        googleSignInMethod,
        emailPasswordSignInMethod,
        emailPasswordRegisterMethod,
        logInOut,
        loading,
        admin,
        error,
    }
}

export default useFirebase;