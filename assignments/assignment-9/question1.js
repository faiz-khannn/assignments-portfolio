// Q1 - Nested Header Element
const Question1 = () => {
  // a) Using React.createElement()
  const headerElement = React.createElement(
    "div",
    { className: "title" },
    [
      React.createElement("h1", {}, "This is H1 (createElement)"),
      React.createElement("h2", {}, "This is H2"),
      React.createElement("h3", {}, "This is H3")
    ]
  );

  // b) Using JSX
  const headerJSX = (
    <div className="title">
      <h1>This is H1 (JSX)</h1>
      <h2>This is H2</h2>
      <h3>This is H3</h3>
    </div>
  );

  // c) Functional Component
  const HeaderComponent = () => (
    <div className="title">
      <h1>This is H1 (Functional Component)</h1>
      <h2>This is H2</h2>
      <h3>This is H3</h3>
    </div>
  );

  // d) Attributes in JSX
  const HeaderWithAttributes = () => (
    <div className="title">
      <h1 id="main-title" style={{ color: "blue" }}>H1 with ID</h1>
      <h2 title="Subtitle">H2 with title</h2>
      <h3 data-info="header-3">H3 with data attribute</h3>
    </div>
  );

  // e) Component Composition
  const Title = () => <h1>Welcome to React World</h1>;

  const HeaderComposition = () => (
    <div className="title">
      <Title />
      <h2>Composed Component Example</h2>
      <h3>Nested Components are fun!</h3>
    </div>
  );

  return (
    <>
      <h2>Question 1: Nested Headers</h2>
      {headerElement}
      {headerJSX}
      <HeaderComponent />
      <HeaderWithAttributes />
      <HeaderComposition />
    </>
  );
};
