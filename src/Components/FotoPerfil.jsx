import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import firebase from "../Config/firebase";
import { AiFillCamera } from "react-icons/ai";

import img from "../img/perfil.jpg";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const FotoPerfil = () => {
    const context = useContext(AuthContext);
    const [dialogs, setDialogs] = useState(false);
    const [imgCrop, setImgCrop] = useState(null);
    const [image, setImage] = useState("");
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    const onCrop = (view) => {
        setImgCrop(view);
    };

    const onClose = () => {
        setImgCrop(null);
    };

    const saveImage = async () => {
        await firebase.firestore().collection("imagenesDePerfil").doc(context.user.userId).set({
            img: imgCrop,
            id: context.user.userId,
        });

        setDialogs(false);
        setImgCrop(null);
        setIsFirstTime(false);

        setSuccessMessage(isFirstTime ? "Foto agregada correctamente" : "Foto de perfil cambiada correctamente");

        setImage(imgCrop);

        setTimeout(() => {
            setSuccessMessage("");
        }, 5000);
    };

    const deleteImage = async () => {
        try {
            await firebase.firestore().collection("imagenesDePerfil").doc(context.user.userId).delete();
            setImage("");
            setSuccessMessage("Foto de perfil eliminada correctamente");

            setTimeout(() => {
                setSuccessMessage("");
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const peticion = async () => {
            try {
                const consulta = await firebase.firestore().collection("imagenesDePerfil").doc(context.user.userId).get();
                const data = consulta.data();
                if (data) {
                    setImage(data.img);
                } else {
                    setImage("");
                }
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    }, [context.user.userId, imgCrop]);

    return (
        <div>
            <div className="profile_img text-center p-4">
                <div className="div">
                    <img
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        src={image.length ? image : img}
                        alt=""
                    />

                    <p style={{ cursor: "pointer" }} onClick={() => setDialogs(true)}>
                        {isFirstTime ? "Agregar imagen de perfil" : "Cambiar imagen de perfil"}&nbsp;
                        <AiFillCamera size={"1.5em"} />
                    </p>
                    <Dialog
                        visible={dialogs}
                        header={() => (
                            <p htmlFor="" className="text-2xl font-semibold textColor">
                                Update Profile
                            </p>
                        )}
                        onHide={() => setDialogs(false)}
                    >
                        <div className="confirmation-content flex flex-column align-items-center">
                            <div className="flex flex-column align-items-center mt-5 w-12">
                                <div className="flex justify-content-around w-12 mt-4">
                                    <Avatar width={400} height={300} onClose={onClose} onCrop={onCrop} />

                                    <Button label="Save" icon="pi pi-check" onClick={saveImage}></Button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                {image && <Button className="p-button-danger mt-2" label="Eliminar Foto de Perfil" onClick={deleteImage} />}
            </div>
        </div>
    );
};
