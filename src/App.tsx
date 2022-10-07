import { Content } from "./components/Content";
import { ListSnackBarMessage } from "./components/YoutubeItem/ListSnackBarMessage";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <main>
      <GlobalStyle />
      <Content />

      <ListSnackBarMessage />
    </main>
  );
}

export default App;
