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

const FotoPerfil = () => {
    const context = useContext(AuthContext);
    const [dialogs, setDialogs] = useState(false);
    const [imgCrop, setImgCrop] = useState(false);
    const [storeImage, setStoreImage] = useState([]);
    const [image, setImage] = useState("");

    const onCrop = (view) => {
        setImgCrop(view);
    };

    const onClose = () => {
        setImgCrop(null);
    };

    const saveImage = async () => {
        setStoreImage([...storeImage, { imgCrop }]);
        await firebase.firestore().collection("imagenesDePerfil").add({
            img: storeImage[0].imgCrop,
            id: context.user.userId,
        });
        setDialogs(false);
        window.location.reload();
    };

    useEffect(() => {
        const peticion = async () => {
            try {
                const consulta = await firebase.firestore().collection("imagenesDePerfil").where("id", "==", context.user.userId).get();
                const data = consulta.docs[0].data();
                setImage(data.img);
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    });

    return (
        <div>
            <div className="profile_img text-center p-4">
                <div className="div">
                    <img
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            objectFix: "cover",
                        }}
                        src={image.length ? image : img}
                        alt=""
                    />

                    <p style={{ cursor: "pointer" }} onClick={() => setDialogs(true)}>
                        Cambiar imagen de perfil&nbsp;
                        <AiFillCamera size={"1.5em"} />
                    </p>
                    <Dialog
                        visible={dialogs}
                        header={() => (
                            <p htmlFor="" className="text-2x1 font-semibold textColor">
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
            </div>
        </div>
    );
};

export default FotoPerfil;
