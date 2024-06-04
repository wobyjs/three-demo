/** @jsxImportSource woby */

import { $, $$, useEffect, useMemo, useContext, type JSX } from "woby"
import { useFrame, useThree, render, orbitControls, Canvas3D, Button, threeContext, MeshProps } from "woby-three"
import { Mesh, MeshBasicMaterial, TextureLoader } from "three"

import { Page1 } from "./page1"
import { Page2 } from "./page2"
import { Page3 } from "./page3"
import { Page4 } from "./page4"
import { Page5 } from "./page5"
import { FatLines } from "./FatLines"
import { Line } from "./Line"

export const App = () => {
    const page = $()
    return <div>
        <button onClick={() => page(Page1)}>3 Boxes + Click</button>
        <button onClick={() => page(Page2)}>Box + static text</button>
        <button onClick={() => page(Page3)}>GLTF</button>
        <button onClick={() => page(Page4)}>Boxesx  + Click</button>
        <button onClick={() => page(Page5)}>Box text rotate</button>
        <button onClick={() => page(FatLines)}>FatLines WebGL</button>
        <button onClick={() => page(Line)}>Line</button>
        

        {page}
    </div>
}

render(App, document.body)
