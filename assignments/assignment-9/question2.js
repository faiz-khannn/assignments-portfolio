// Q2 - Header Component
const Question2 = () => {
  const Header = () => (
    <header className="header">
      <div className="logo">🌙 MyLogo</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-icon">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="User Icon"
        />
      </div>
    </header>
  );

  return (
    <>
      <h2>Question 2: Header Component</h2>
      <Header />
    </>
  );
};
