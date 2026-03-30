import { useState } from 'react'
import ColorCard from './ColorCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { ColorTranslator, Harmony } from 'colortranslator';
import Footer from './Footer';



//Function to generate a random number and convert it to hexadecimal
function generateRandomColor(): string {
  const randomNum: string = Math.floor(Math.random() * 16777215).toString(16);
  const randomColorHex: string = "#" + randomNum;
  console.log(randomColorHex);
  return randomColorHex;
}
//Function to generate a tetradic harmony from a given color
const getHarmony = (color: string): string[] => {
  const harmony: string[] = ColorTranslator.getHarmony(color, Harmony.TETRADIC);
  console.log(harmony);
  return harmony;

}



function App({ defaultColor = "#3357FF" }: { defaultColor: string }) {

  const [palette, setPalette] = useState<string[]>(getHarmony(defaultColor));
  const generateNewPalette: () => void = () => {
    const baseColor: string = generateRandomColor();
    const newHarmony: string[] = getHarmony(baseColor);
    setPalette(newHarmony);

  }


  const copyToClipboard: (hex: string) => void = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}!`, {
      icon: <span>🎨</span>,
      style: {
        borderRadius: '8px',
        background: hex,
        color: '#fff',
      },
    });
  };


  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />

      <section className="hero-section">
        <div className="hero">
          <h1 className="title">Chromic</h1>
          <p className="subtitle">A color palette generator</p>
        </div>
        <div>

          <h2 className="section-title">Get started</h2>
          <p>Click the button below to generate a new color palette</p>
          <p>Click on any color card to copy its hex code to the clipboard</p>
          <button
            className="button"
            onClick={() => {
              generateNewPalette();
            }}

          >
            Generate Palette
          </button>
        </div>

      </section>



      <section className="color-cards">
        {
          palette.map((color, index) => (
            <ColorCard
              key={index}
              hex={color}
              onCardClick={copyToClipboard}
            />

          ))}

      </section>

      <Footer />


    </>
  )
}

export default App
