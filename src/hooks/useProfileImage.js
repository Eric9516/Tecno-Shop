import { useState, useEffect, useContext } from "react";
import { auth, firestore, storage } from "../Config/firebase";
import { AuthContext } from "../Context/AuthContext";

export const useProfileImage = () => {
    const context = useContext(AuthContext);
    const [imgCrop, setImgCrop] = useState(null);
    const [image, setImage] = useState("");
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    const onCrop = (view) => setImgCrop(view);
    const onClose = () => setImgCrop(null);

    const saveImage = async () => {
        try {
            await updateProfileImage();
            setIsFirstTime(false);
            setSuccessMessage(isFirstTime ? "Foto agregada correctamente" : "Foto de perfil cambiada correctamente");
            setImage(imgCrop);
            setTimeout(() => setSuccessMessage(""), 5000);
        } catch (error) {
            console.error("Error al guardar la imagen:", error);
        }
    };

    const deleteImage = async () => {
        try {
            await deleteProfileImage();
            setImage("");
            setSuccessMessage("Foto de perfil eliminada correctamente");
            setTimeout(() => {
                setSuccessMessage("");
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
        }
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const consulta = await firestore.collection("imagenesDePerfil").doc(context.user.userId).get();
                return consulta.data()?.img;
            } catch (error) {
                console.error("Error al obtener la imagen:", error);
                return null;
            }
        };

        const fetchData = async () => {
            try {
                const data = await fetchProfileImage();
                setImage(data || "");
            } catch (error) {
                console.error("Error al obtener la imagen:", error);
            }
        };

        fetchData();
    }, [context.user.userId, imgCrop]);

    const updateProfileImage = async () => {
        await firestore.collection("imagenesDePerfil").doc(context.user.userId).set({
            img: imgCrop,
            id: context.user.userId,
        });
    };

    const deleteProfileImage = async () => {
        await firestore.collection("imagenesDePerfil").doc(context.user.userId).delete();
    };

    return {
        imgCrop,
        image,
        isFirstTime,
        successMessage,
        onCrop,
        onClose,
        saveImage,
        deleteImage,
    };
};
