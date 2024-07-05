///<reference types='woby' />
/** @jsxImportSource woby */

import { $, $$, useEffect, useMemo, useContext, type JSX, render } from 'woby'

import { Box3 } from './Box3'
import { BoxStaticText } from './BoxStaticText'
import { GLTF } from './GLTF'
import { Box2Click } from './Box2Click'
import { BoxHtmlText } from './BoxHtmlText'
import { SimpleLine } from './SimpleLine'
import {FatLines} from './FatLines'
// import { Line } from './Line'
import { DLines } from './DLine'

export const App = () => {
    const page = $()
    return <div class='z-10'>
        <button onClick={() => page(Box3)}>3 Boxes + Click</button>
        <button onClick={() => page(BoxStaticText)}>Box + static text</button>
        <button onClick={() => page(GLTF)}>GLTF</button>
        <button onClick={() => page(Box2Click)}>Boxes + Click</button>
        <button onClick={() => page(BoxHtmlText)}>Box text rotate</button>
        <button onClick={() => page(FatLines)}>Fat Line</button>
        <button onClick={() => page(SimpleLine)}>Simple Line</button>
        <button onClick={() => page(DLines)}>DLines</button>
        {/* <button onClick={() => page(Line)}>Line</button> */}
        

        {page}
    </div>
}

render(App, document.body)
