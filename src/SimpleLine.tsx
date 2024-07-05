/** @jsxImportSource woby-three */

import { Mesh, MeshBasicMaterial } from "three"
import * as three from 'three'
import { MeshProps, useFrame, useLoader } from "woby-three"
import { $, $$, } from "woby"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import './TextGeometry'
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

console.log('page2')
const Box = (props: MeshProps) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = $<Mesh>()

    // const texture = new TextureLoader().load('../textures/usedSteel.png')
    // Hold state for hovered and clicked events
    const hovered = $(false)
    const clicked = $(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame

    useFrame(() => $$(ref) && ($$(ref).rotation.x += 0.03))

    // useEffect(() => {
    //     console.log($$(ref))
    // })
    // Return the view, these are regular Threejs elements expressed in JSX
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
        <textGeometry text={"abc"} parameters={parameters} />
    </mesh>
}
export const SimpleLine = () => {
    const material = new MeshBasicMaterial({ color: "black" })
    const parameters = {
        font: useLoader(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }),
        size: 1,
        depth: 0.1,
    }
    // const geometry = new TextGeometry("abc", parameters)


    return <canvas3D background='white'>
        <ambientLight intensity={0.5} />
        {/* <Box /> */}
        {/* <Text str={() => clicked() ? "ABCD" : "cde"} pathToFont="fonts/helvetiker_regular.typeface.json" /> */}
        <orbitControls />
        {/* <Test/> */}

        {/* <line geometry={new three.BufferGeometry().setFromPoints([
            new three.Vector3(- 1, 0, 0),
            new three.Vector3(0, 1, 0),
            new three.Vector3(1, 0, 0),
        ])}
            material={new three.LineBasicMaterial({ color: 0x000ff })} /> */}

        <line>
            <bufferGeometry points={[
                new three.Vector3(- 1, 0, 0),
                new three.Vector3(0, 1, 0),
                new three.Vector3(1, 0, 0),
            ]} />
            <lineBasicMaterial color={0x0000ff} linewidth={10} />
        </line>

        <mesh material={material} >
            <textGeometry text={"abcd"} parameters={parameters} />
        </mesh>
    </canvas3D >
}
