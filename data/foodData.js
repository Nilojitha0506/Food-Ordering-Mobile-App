export const categories = [
  { id: "1", name: "Pizza", image: require("../assets/pizza.png") },
  { id: "2", name: "Burger", image: require("../assets/burger.png") },
  { id: "3", name: "Drinks", image: require("../assets/drinks.png") },
  { id: "4", name: "Desserts", image: require("../assets/dessert.png") },
];

export const foods = {
  Pizza: [
    {
      id: "p1",
      name: "Margherita Pizza",
      price: 8.99,
      image: require("../assets/margherita.png"),
    },
    {
      id: "p2",
      name: "Pepperoni Pizza",
      price: 9.99,
      image: require("../assets/pepperoni.png"),
    },
  ],
  Burger: [
    {
      id: "b1",
      name: "Cheese Burger",
      price: 6.99,
      image: require("../assets/cheeseburger.png"),
    },
  ],
  Drinks: [
    {
      id: "d1",
      name: "Coca Cola",
      price: 2.99,
      image: require("../assets/cola.png"),
    },
  ],
  Desserts: [
    {
      id: "ds1",
      name: "Chocolate Lava Cake",
      price: 5.99,
      image: require("../assets/choco.png"),
    },
  ],
};
