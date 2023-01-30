import { auth, storage } from "./config";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

class Firebase {
    async login(data) {

        const { email, password } = data;

        try {
            await signInWithEmailAndPassword(auth, email, password)

            return {
                success: true
            }

        } catch (error) {
            return {
                error: errorSignInTypes[error.code] || error.message,
                success: false
            }
        }
    }

    async signUp(data) {
        const { email, password } = data

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, { photoURL: FIREBASE_USER_IMAGE_PLACEHOLDER })

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: errorSignUpTypes[error.code] || error.message
            }
        }

    }

    async changeUserAvatar(file) {
        const directory = "/avatars/" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
        const storageRef = ref(storage, directory)
        await uploadBytes(storageRef, file)
        const urlAvatar = await getDownloadURL(storageRef)
        await updateProfile(auth.currentUser, { photoURL: urlAvatar })
    }
}

const firebase = new Firebase()

export default firebase

const errorSignUpTypes = {
    'auth/email-already-in-use': `Email address is already in use.`,
    'auth/invalid-email': `Email address is invalid.`,
    'auth/operation-not-allowed': `Error during sign up.`,
    'auth/weak-password': 'Password must contain 6 characters',
}


const errorSignInTypes = {
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Wrong password"
}

const FIREBASE_USER_IMAGE_PLACEHOLDER = "https://firebasestorage.googleapis.com/v0/b/entertaiment-app.appspot.com/o/person-placeholder.png?alt=media&token=569773cf-8884-47e3-87ab-abf42ef7e774"
