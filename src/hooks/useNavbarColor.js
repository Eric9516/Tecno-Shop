import firebase from "../Config/firebase";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useNavbarColor = () => {
    const [navbarColor, setNavbarColor] = useState("#fff");
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthContext);
    const { userId } = context.user;

    const changeNavbarColor = (color) => {
        firebase.firestore().collection("userSettings").doc("3zM9QBqGDpb48JcTlZye1wid3VY2").update({ navbarColor: color });
    };

    useEffect(() => {
        const cambiarColor = firebase
            .firestore()
            .collection("userSettings")
            .doc("3zM9QBqGDpb48JcTlZye1wid3VY2")
            .onSnapshot((snapshot) => {
                const userData = snapshot.data();
                if (userData && userData.navbarColor) {
                    setNavbarColor(userData.navbarColor);
                }
            });
        setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => {
            cambiarColor();
        };
    }, [userId]);

    const navbarStyle = {
        backgroundColor: navbarColor,
    };

    return { navbarStyle, changeNavbarColor, loading };
};
