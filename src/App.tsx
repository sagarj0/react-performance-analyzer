import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./shared/components/AppLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
}

export default App;
