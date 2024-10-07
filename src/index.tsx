///<reference types='woby' />
/** @jsxImportSource woby */

import { $, type JSX, render } from 'woby'

import { Box3 } from './Box3'
import { BoxStaticText } from './BoxStaticText'
import { GLTF } from './GLTF'
import { GltfAnisotropy } from './GltfAnisotropy'
import { Box2Click } from './Box2Click'
import { BoxHtmlText } from './BoxHtmlText'
import { FatLines } from './FatLines'
import { SimpleLine } from './SimpleLine'
import { DLines } from './DLine'
import { Obj3D } from './Object3dAdd'
import { Grp } from './group'
// import { Line } from './Line'

export const App = () => {
    const page = $()
    return <div class='z-10'>
        <button onClick={() => page(Box3)}>3 Boxes + Click</button>
        <button onClick={() => page(BoxStaticText)}>Box + static text</button>
        <button onClick={() => page(GLTF)}>GLTF</button>
        <button onClick={() => page(GltfAnisotropy)}>GLTF2</button>
        <button onClick={() => page(Box2Click)}>Boxes + Click</button>
        <button onClick={() => page(BoxHtmlText)}>Box html text</button>
        <button onClick={() => page(FatLines)}>Fat Line</button>
        <button onClick={() => page(SimpleLine)}>Simple Line</button>
        <button onClick={() => page(DLines)}>DLines</button>
        <button onClick={() => page(Obj3D)}>Object3D Add</button>
        <button onClick={() => page(Grp)}>Group</button>
        {/* <button onClick={() => page(Line)}>Line</button> */}

        {page}
    </div>
}

render(App, document.body)
