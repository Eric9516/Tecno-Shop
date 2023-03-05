import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaCartPlus } from "react-icons/fa";
export const CardProducts = ({ item }) => {
    return (
        <Card sx={{ maxWidth: 300, height: 550 }}>
            <CardMedia component="img" alt="productos" height="auto" src={item.data().image} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {item.data().name}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                    Precio: ${item.data().price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <Link style={{ textDecoration: "none" }} to={`/producto/${item.id}`}>
                        Ver detalles
                    </Link>
                </Button>
                <Button size="small">
                    <Link to={`/carrito/${item.id}`}>
                        <FaCartPlus size={"1.5em"} style={{ marginLeft: "20px" }} />
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
};
