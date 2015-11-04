import React from 'react';

export default function({children}) {
  return (
    <div className="application">
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>

      <main>
        {children}
      </main>

      <footer>
        &copy; Zooniverse, etc.
      </footer>
    </div>
  );
}
