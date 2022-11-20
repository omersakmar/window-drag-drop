import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardGrid from "./components/CardGrid";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <CardGrid />
      </div>
    </DndProvider>
  );
}

export default App;
