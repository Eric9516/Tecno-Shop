import { auth, firestore, storage } from "../Config/firebase";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useColorCustomization = (settingKey) => {
    const [color, setColor] = useState("#555");
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthContext);
    const { userId } = context.user;

    const changeColor = (newColor) => {
        firestore()
            .collection("userSettings")
            .doc(userId)
            .update({ [settingKey]: newColor });
    };

    useEffect(() => {
        const cambiarColor = firestore
            .collection("userSettings")
            .doc(userId)
            .onSnapshot((snapshot) => {
                const userData = snapshot.data();
                if (userData && userData[settingKey]) {
                    setColor(userData[settingKey]);
                }
            });

        setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => {
            cambiarColor();
        };
    }, [userId, settingKey]);

    const style = {
        backgroundColor: color,
    };

    return { style, changeColor, loading };
};
