import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import firebase from "../Config/firebase";
import { estilosProdAlta } from "../styles/productosAlta";

export const ProductosAlta = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            await firebase.firestore().collection("productos").add(data);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Form style={estilosProdAlta.form} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" {...register("name", { required: true })} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" {...register("price", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" {...register("description", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" {...register("image", { required: true })} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Form>
        </div>
    );
};
