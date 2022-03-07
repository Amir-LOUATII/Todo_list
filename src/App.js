import List from "./components/List";
import Form from "./components/Form";
import Text from "./components/Text";
import { useGlobalContext } from "./context/context";

function App() {
  const { clearList, list, isLoading } = useGlobalContext();
  return (
    <section className="section-center">
      <Text />
      <Form />
      <List />
      {list.length > 0 && !isLoading && (
        <button onClick={clearList} className="clear-btn">
          Clear List
        </button>
      )}
    </section>
  );
}

export default App;
