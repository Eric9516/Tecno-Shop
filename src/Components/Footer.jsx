import React from "react";
import { BsFacebook, BsInstagram, BsFillTelephoneFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { A, Div1, Div2, DivContenedor, DivFooter, Redes, Ul, H5 } from "../styles/StyledFooter";

export const Footer = () => {
    return (
        <>
            <DivFooter id="footer">
                <DivContenedor>
                    <Div1>
                        <Ul>
                            <H5>Encontranos en nuestras redes sociales</H5>
                            <Redes>
                                <li>
                                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
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
                                <A href="tel:45645645">
                                    <BsFillTelephoneFill size="1.5em" color="#61dafb" /> xxxx-xxxxxxx
                                </A>
                            </li>
                            <li>
                                <A href="mailto:ejemplo@gmail.com">
                                    <MdEmail size="1.5em" color="#61dafb" /> xxxxxxxxx@gmail.com
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
