import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";

const estilos = {
    form: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    },
};

const ProductosMod = () => {
    const { id } = useParams();
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    // const modificar = async (id, payload) => {
    //     try {
    //         return await firebase.firestore().doc(`productos/${id}`).set(payload);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        const peticion = async () => {
            try {
                const pet = await firebase.firestore().doc(`productos/${id}`).get();
                setValue("name", pet.data().name);
                setValue("price", pet.data().price);
                setValue("description", pet.data().description);
                setValue("image", pet.data().image);
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    }, [id]);

    const onSubmit = async (data) => {
        try {
            await firebase.firestore().doc(`productos/${id}`).set(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Form style={estilos.form} onSubmit={handleSubmit(onSubmit)}>
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

export default ProductosMod;
