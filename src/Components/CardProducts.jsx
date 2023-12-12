import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const CardProducts = ({ item }) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`/producto/${item.id}`);
    };
    return (
        <Card sx={{ maxWidth: 300, minHeight: 500, cursor: "pointer" }} onClick={handleOnClick}>
            <div style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CardMedia component="img" alt="productos" src={item.data().image} />
            </div>
            <hr />
            <CardContent>
                <Typography gutterBottom variant="p" component="div">
                    {item.data().name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    $ {item.data().price}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary" style={{ marginBottom: "5px" }}>
                    Categoría: {item.data().category}
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                    Descripción: {item.data().description}
                </Typography>
            </CardContent>
        </Card>
    );
};
