import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const estilos = {
    div: {
        width: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "30px",
    },
};

const FotoPerfil = () => {
    const [dialogs, setDialogs] = useState(false);
    const [imgCrop, setImgCrop] = useState(false);
    const [storeImage, setStoreImage] = useState([]);

    const onCrop = (view) => {
        setImgCrop(view);
    };

    const onClose = () => {
        setImgCrop(null);
    };

    const saveImage = () => {
        setStoreImage([...storeImage, { imgCrop }]);
        setDialogs(false);
    };

    const profileImageShow = storeImage.map((item) => item.imgCrop);
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
                        src={profileImageShow.length ? profileImageShow : "https://www.shutterstock.com/image-vector/default-avatar-profile-trendy-style-260nw-1759726295.jpg"}
                        alt=""
                        onClick={() => setDialogs(true)}
                    />
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
