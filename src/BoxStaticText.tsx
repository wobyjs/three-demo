/** @jsxImportSource woby-three */

import { Mesh, MeshBasicMaterial } from "three"
import { MeshProps, useFrame, useLoader, Text } from "woby-three"
import { $, $$, } from "woby"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import './TextGeometry'
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

console.log('page2')
const Box = (props: MeshProps) => {
    const ref = $<Mesh>()
    // const texture = new TextureLoader().load('../textures/usedSteel.png')
    // Hold state for hovered and clicked events
    const hovered = $(false)
    const clicked = $(false)

    useFrame(() => $$(ref) && ($$(ref).rotation.x += 0.03))

    return <mesh
        {...props}
        ref={ref}
        scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(event) => clicked(!$$(clicked))}
        onPointerOver={(event) => hovered(true)}
        onPointerOut={(event) => hovered(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} />
    </mesh>
}

const Test = () => {
    const material = new MeshBasicMaterial({ color: "black" })
    const parameters = {
        font: useLoader(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }),
        size: 1,
        depth: 0.1,
    }

    return <mesh material={material} >
        {/** @ts-ignore */}
        <textGeometry str={"abc"} parameters={parameters} />
    </mesh>
}
export const BoxStaticText = () => {
    const clicked = $(false)
    const material = new MeshBasicMaterial({ color: "black" })
    const parameters = {
        font: useLoader(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }),
        size: 1,
        depth: 0.1,
    }
    // const geometry = new TextGeometry("abc", parameters)


    return <canvas3D background='white'>
        <ambientLight intensity={0.5} />
        <Box />
        <orbitControls />

        <mesh material={material} >
            {/* <Text text={() => clicked() ? "ABCD" : "cde"} parameters={parameters} /> */}
            <textGeometry text={() => clicked() ? "ABCD" : "cde"} parameters={parameters} />
        </mesh>
    </canvas3D >
}
