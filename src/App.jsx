import AuthContextProvider from "./Components/Auth/AuthcontextProvider";
import AppRoutes from "./routes/Routes";

const App = () => {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
};

export default App;
