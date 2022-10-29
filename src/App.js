import "./App.css";
import Problem1 from "./components/problems/Problem1";
import Problem2 from "./components/problems/Problem2";
import ProblemWrapper from "./components/problems/ProblemWrapper";

function App() {
  return (
    <>
      <ProblemWrapper name="Problem 1">
        <Problem1 />
      </ProblemWrapper>
      <ProblemWrapper name="Problem 2">
        <Problem2 />
      </ProblemWrapper>
    </>
  );
}

export default App;
