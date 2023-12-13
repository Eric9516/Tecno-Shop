import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { firestore } from "../Config/firebase";
import { estilosProdMod } from "../styles/estilosProdMod";

export const ProductosMod = () => {
    const { id } = useParams();
    const { handleSubmit, register, setValue } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const peticion = async () => {
            try {
                const pet = await firestore.doc(`productos/${id}`).get();
                setValue("name", pet.data().name);
                setValue("price", pet.data().price);
                setValue("description", pet.data().description);
                setValue("category", pet.data().category);
                setValue("image", pet.data().image);
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    });

    const onSubmit = async (data) => {
        try {
            await firestore.doc(`productos/${id}`).set(data);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async () => {
        try {
            await firestore.doc(`productos/${id}`).delete();
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Form style={estilosProdMod.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control type="text" {...register("category", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" {...register("image", { required: true })} />
                </Form.Group>
                <Button variant="primary" type="submit" style={estilosProdMod.boton}>
                    Guardar
                </Button>
                <Button variant="danger" onClick={deleteProduct}>
                    Eliminar producto
                </Button>
            </Form>
        </div>
    );
};
