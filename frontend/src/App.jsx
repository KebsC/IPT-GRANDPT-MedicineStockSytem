import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import AddMedicinePage from "./pages/AddMedicinePage";
import EditMedicinePage from "./pages/EditMedicinePage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <div data-theme="light">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-medicine" element={<AddMedicinePage />} />
        <Route path="/cart" element={<EditMedicinePage />} />
        <Route path="/orders" element={<CartPage />} />
      </Routes>
    </div>
  );
};

export default App;
