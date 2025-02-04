import Grid from "./components/Grid";
import Controls from "./components/Controls";
import { SavedImages } from "./components/SavedImages";

function App() {
  return (
    <>
      <div className="title">
        <h1>PIXEL PAINT</h1> <h2>by Paul</h2>
      </div>

      <div className="main-container">
        <Controls />
        <div className="grid-border">
          <Grid />
        </div>
      </div>
      <SavedImages />
    </>
  );
}

export default App;
