import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import store from "./app/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={routes} />
        <Toaster />
      </Provider>
    </div>
  );
}

export default App;
