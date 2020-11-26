import React from 'react';
import './App.css';
import Widget from './../src/components/Widget';

function App() {
  //Get Custom colors
  let primaryColor = document.currentScript.getAttribute("primary");
  let secondaryColor = document.currentScript.getAttribute("secondary");
  let fontColor = document.currentScript.getAttribute("font");
  let company = document.currentScript.getAttribute("company");

  return (
    <div className="App">
      <Widget 
        primaryColor={primaryColor} 
        secondaryColor={secondaryColor} 
        fontColor={fontColor} 
        company={company}>
      </Widget>
    </div>
  );
}

export default App;
