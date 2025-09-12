/** @jsxImportSource @woby/three */

import { $, $$, useEffect, useMemo } from "woby"
import { MeshProps, } from '@woby/three/src/objects/Mesh'
import { MeshBasicMaterial, } from '@woby/three/src/materials/MeshBasicMaterial'
import { OrbitControls } from '@woby/three/lib/examples/jsm/controls/OrbitControls'
import { FontLoader } from '@woby/three/examples/jsm/loaders/FontLoader'
import { Canvas3D } from '@woby/three/lib/components/Canvas3D'
import { Event } from '@woby/three/lib/components/Event'
import { useLoader } from '@woby/three/lib/hooks/useLoader'
import '@woby/three/examples/jsm/geometries/TextGeometry'
import { TextGeometry } from '@woby/three/examples/jsm/geometries/TextGeometry'
import { toColor } from '@woby/three/lib/utils'

console.log('page2')
const Box = (props: MeshProps) => {
    // const texture = new TextureLoader().load('../textures/usedSteel.png')
    // Hold state for hovered and clicked events
    const hovered = $(false)
    const clicked = $(false)


    return <mesh
        {...props}
        onFrame={ref => ref.rotation.x += 0.03}
        scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(event) => clicked(!$$(clicked))}
        onPointerOver={(event) => hovered(true)}
        onPointerOut={(event) => hovered(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} />
    </mesh>
}


export const BoxStaticText = () => {
    const clicked = $(false)
    const material = new MeshBasicMaterial({ color: "black" })
    const parameters = {
        // font: useLoaderAsync(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }), //promise only in constructor
        font: useLoader(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }), // observable only in object properties
        size: 1,
        depth: 0.1,

        // bevelEnabled: true,
        // bevelSize: 1.5,
        // bevelThickness: 2,
        // curveSegments: 4,
        // depth: 20,
        // size: 70
    }
    // const geometry = new TextGeometry("abc", parameters)

    // useEffect(() => { !$$(parameters.font) })
    const text = $('aaa')
    const geo = useMemo(() => !$$(parameters.font) ? null : new TextGeometry($$(text), { font: $$(parameters.font), size: parameters.size, depth: parameters.depth }))

    //@ts-ignore
    useEffect(() => console.log(window.font = $$(parameters.font())))

    return <Canvas3D>
        <webglRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]} />

        <scene background={toColor('white')}>
            <ambientLight intensity={0.5} />
            <Box />

            {/* {() => !$$(geo) ? null : <mesh material={material} geometry={$$(geo)} onClick={() => { console.log('text click'); text('123') }} />} */}

            <mesh material={material} onClick={() => clicked(!$$(clicked))} >
                <textGeometry text={() => clicked() ? "ABCD" : "cde"} parameters={parameters} />
                {/* <textGeometry text={"ABCD"} parameters={parameters} /> */}
            </mesh>
        </scene>
        <perspectiveCamera position={[0, 0, 5]} />
        <OrbitControls />
        <Event />
    </Canvas3D>
}
