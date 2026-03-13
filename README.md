#  Food Ordering Mobile App – React Native (Expo)

##  Demo Screenshots



# Project Overview

This project is a **Food Ordering Mobile Application** built using **React Native with Expo** as part of an **Intern Task Assignment**.

The app allows users to browse food categories, view food items, add them to a cart, adjust quantities, and place an order.

### Core Functionalities

✔ Browse food categories
✔ View food items in each category
✔ Add items to cart
✔ Increase / decrease quantity
✔ View subtotal and total price
✔ Place order with confirmation alert
✔ Smooth navigation between screens

---

# Tech Stack

```
React Native (Expo)
React Navigation v6 (Stack Navigator + Bottom Tabs)
React Context API (State Management)
react-native-size-matters (Responsive design)
expo-linear-gradient (UI styling)
@expo/vector-icons (Icons)
```

---

# Quick Start

## Clone the Repository

```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app
```

---

##  Install Dependencies

```bash
npm install
```

---

##  Start the Application

```bash
npx expo start
```

### Run on

**Mobile:** Scan the QR code using **Expo Go**
**Web:** Press **w** in the terminal

---

# Project Structure

```
food-ordering-app
│
├── assets/              # Images and icons
│
├── screens/             # Application screens
│   ├── HomeScreen.js
│   ├── FoodListScreen.js
│   ├── CartScreen.js
│   ├── LoginScreen.js
│   └── ProfileScreen.js
│
├── context/             # State management
│   └── CartContext.js
│
├── data/                # Static data
│   └── foodData.js
│
├── navigation/          # Navigation setup
│   └── AppNavigator.js
│
└── App.js               # Entry point
```

---

# Features Implemented

| Screen          | Features                                        |
| --------------- | ----------------------------------------------- |
| **Home**        | Category grid layout with images                |
| **Food List**   | Food cards with image, name, price, add to cart |
| **Cart**        | Item list with quantity adjustment (+ / −)      |
| **Cart Total**  | Subtotal and total price calculation            |
| **Place Order** | Alert confirmation message                      |
| **Navigation**  | Stack + Bottom Tab navigation                   |
| **Bonus**       | Login screen and Profile screen                 |

---

# Navigation Flow

```
Login Screen
     ↓
Main App (Bottom Tabs)
     ↓
Home → Category → Food List
Cart → Quantity Adjustment → Place Order
Profile → User Information
```

---

# Libraries Used

```
@react-navigation/native
@react-navigation/bottom-tabs
@react-navigation/stack
expo-linear-gradient
react-native-size-matters
@expo/vector-icons
```

---

#  Testing Commands

Run the app on different platforms.

```bash
npx expo start           # Start Expo
npx expo start --web     # Run on Web
npx expo start --android # Android
```

---

#  Supported Platforms

✔ Android
✔ iOS
✔ Web

Responsive design works on **mobile and tablets**.

---
