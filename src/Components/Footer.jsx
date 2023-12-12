import React, { useEffect, useState } from "react";
import { BsFacebook, BsInstagram, BsFillTelephoneFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { A, Div1, Div2, DivContenedor, DivFooter, Redes, Ul, H5 } from "../styles/StyledFooter";
import firebase from "../Config/firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Footer = () => {
    const context = useContext(AuthContext);
    // const [provincia, setProvincia] = useState("");
    // const [localidad, setLocalidad] = useState("");
    // const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");

    useEffect(() => {
        const peticion = async () => {
            try {
                const consulta = await firebase.firestore().collection("datosUsuarios").where("user_id", "==", context.user.userId).get();
                if (consulta.docs.length > 0) {
                    const data = consulta.docs[0].data();
                    setTelefono(data.telefono);
                    setFacebook(data.facebook);
                    setInstagram(data.instagram);
                }
            } catch (error) {
                console.log(error);
            }
        };

        peticion();
    }, [context.user.userId]);

    return (
        <>
            <DivFooter id="footer">
                <DivContenedor>
                    <Div1>
                        <Ul>
                            <H5>Encontranos en nuestras redes sociales</H5>
                            <Redes>
                                <li>
                                    <a href={`${facebook}`} target="_blank" rel="noreferrer">
                                        <BsFacebook size="2em" color="#61dafb" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                                        <BsInstagram size="2em" color="#61dafb" />
                                    </a>
                                </li>
                            </Redes>
                        </Ul>
                        <Ul>
                            <h5>Contactanos</h5>
                            <li>
                                <A href={{ telefono }}>
                                    <BsFillTelephoneFill size="1.5em" color="#61dafb" /> {telefono}
                                </A>
                            </li>
                            <li>
                                <A href="mailto:ejemplo@gmail.com">
                                    <MdEmail size="1.5em" color="#61dafb" /> {context.user.email}
                                </A>
                            </li>
                            <li>
                                <A href="whastsapp.com">
                                    <RiWhatsappFill size="1.5em" color="#61dafb" /> Whatsapp
                                </A>
                            </li>
                        </Ul>
                    </Div1>
                    <Div2>
                        <Ul>
                            <li>
                                <A href="#nav">
                                    <BsFillArrowUpCircleFill size="2em" color="#61dafb" /> Volver al inicio
                                </A>
                            </li>
                        </Ul>
                    </Div2>
                </DivContenedor>
            </DivFooter>
        </>
    );
};
