import React from 'react';
import circle1 from '../images/newStock/circle1.svg';
import circle2 from '../images/newStock/circle2.svg';
import square1 from '../images/newStock/square1.svg';
import square2 from '../images/newStock/square2.svg';
import square3 from '../images/newStock/square3.svg';
import martini from '../images/newStock/martini.svg';
import pizza from '../images/newStock/pizza.svg';
import coke from '../images/newStock/coke.svg';
import garfo from '../images/newStock/garfo.svg';
import '../styles/Background.css';

export default function Background() {
  return (
    <div className="Background">
      <object
        data={ circle1 }
        type="image/svg+xml"
        className="Background-circle1"
      >
        circle1
      </object>
      <object
        data={ circle2 }
        type="image/svg+xml"
        className="Background-circle2"
      >
        circle2
      </object>
      <object
        data={ square1 }
        type="image/svg+xml"
        className="Background-square1"
      >
        square1
      </object>
      <object
        data={ square2 }
        type="image/svg+xml"
        className="Background-square2"
      >
        square2
      </object>
      <object
        data={ square3 }
        type="image/svg+xml"
        className="Background-square3"
      >
        square3
      </object>
      <object
        data={ martini }
        type="image/svg+xml"
        className="Background-martini"
      >
        martini
      </object>
      <object
        data={ pizza }
        type="image/svg+xml"
        className="Background-pizza"
      >
        pizza
      </object>
      <object
        data={ coke }
        type="image/svg+xml"
        className="Background-coke"
      >
        coke
      </object>
      <object
        data={ garfo }
        type="image/svg+xml"
        className="Background-fork"
      >
        Recipes App
      </object>
    </div>
  );
}
