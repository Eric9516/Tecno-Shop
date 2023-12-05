import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";
import { AiFillCamera } from "react-icons/ai";
import img from "../img/perfil.jpg";
import { useProfileImage } from "../hooks/useProfileImage";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const FotoPerfil = () => {
    const { imgCrop, image, isFirstTime, successMessage, onCrop, onClose, saveImage, deleteImage } = useProfileImage();

    return (
        <div className="profile_img text-center p-4">
            <div className="div">
                <img style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover" }} src={image.length ? image : img} alt="" />

                <p style={{ cursor: "pointer" }} onClick={() => onClose()}>
                    {isFirstTime ? "Agregar imagen de perfil" : "Cambiar imagen de perfil"}&nbsp;
                    <AiFillCamera size={"1.5em"} />
                </p>
                <Dialog visible={imgCrop !== null} header={() => <p className="text-2xl font-semibold textColor">Update Profile</p>} onHide={() => onClose()}>
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
    );
};
