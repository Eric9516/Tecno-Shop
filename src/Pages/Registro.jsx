import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import firebase from "../Config/firebase";

const estilos = {
    form: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    },
};

const Registro = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const responseUser = await firebase.auth.createUserWithEmailAndPassword(data.email, data.password);
            navigate("/home");
            if (responseUser.user.uid) {
                await firebase.firestore().collection("usuarios").add({
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    userId: responseUser.user.uid,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Form style={estilos.form} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" {...register("name", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su apellido" {...register("lastname")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su Email" {...register("email", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" {...register("password", { required: true })} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>
        </div>
    );
};

export default Registro;
