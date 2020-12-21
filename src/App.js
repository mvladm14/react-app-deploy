import { useEffect } from "react";

import "./App.css";

function App() {
  useEffect(() => {
    function listener(event) {
      const { data } = event;

      if (!data._h || typeof data._h !== "object") {
        // This is not coming from Happeo
        return;
      }

      if (data._h.userinfo) {
        // Case, Happeo sent us userinfo, we should do stuff with it
        const { primaryEmail } = data._h.userinfo;
        console.log(primaryEmail);
      }
    }
    console.log('asdasd')
    window.addEventListener("message", listener);

    window.parent.postMessage(
      { _c: { id: "test", scopes: ["userinfo.email"] } },
      "*"
    );

    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
