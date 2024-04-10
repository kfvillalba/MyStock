import { Card, List, ListItem, Title } from "@tremor/react";

export function CategoryList() {
  const categorias = [
    {
      categoria: "Ropa y Accesorios",
      cantidad: "20",
    },
    {
      categoria: "Salud y Belleza",
      cantidad: "30",
    },
    {
      categoria: "Alimentos y Bebidas",
      cantidad: "30",
    },
    {
      categoria: "Deportes y Entretenimiento",
      cantidad: "20",
    },
    {
      categoria: "Electrónica de Consumo",
      cantidad: "40",
    },
  ];
  return (
    <Card
      style={{
        marginLeft: "0",
        marginRight: "0",
        width: "240px", // Cambia el ancho como desees
        height: "250px",
        backgroundColor: "#121621",
        color: "white",
      }}
      className="mx-auto max-w-md"
    >
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
        CATEGORIAS
      </h3>
      <List className="mt-2">
        {categorias.map((item) => (
          <ListItem key={item.categoria}>
            <span>{item.categoria}</span>
            <span>{item.cantidad}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
