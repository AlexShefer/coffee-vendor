import { Tabs } from "./components/Tabs";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Table } from "./components/table/Table";

function App() {
    return (
        <div>
            <Tabs />
            <Table />
            <Dashboard />
        </div>
    );
}

export default App;
