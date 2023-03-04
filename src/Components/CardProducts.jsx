import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";

export const CardProducts = ({ item }) => {
    return (
        <div key={item.id}>
            <Card style={{ width: "14rem", minHeight: "450px" }}>
                <div style={{ width: "100%", height: "250px" }}>
                    <Card.Img variant="top" src={item.data().image} />
                </div>
                <Card.Body>
                    <Card.Title>🛒{item.data().name}</Card.Title>
                    <Card.Text>▪ Precio: ${item.data().price}</Card.Text>
                    <Button variant="primary">
                        <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/${item.id}`}>
                            Ver detalles
                        </Link>
                    </Button>
                    <Link to={`/carrito/${item.id}`}>
                        <FaCartPlus size={"1.5em"} style={{ marginLeft: "20px" }} />
                    </Link>
                    <br />
                </Card.Body>
            </Card>
        </div>
    );
};
