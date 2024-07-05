//// <reference types="../node_modules/woby-three/" />
/** @jsxImportSource woby-three */

import { $, $$, useEffect, type JSX } from "woby"
import { useFrame, useThree, render, orbitControls, Canvas3D, threeContext, MeshProps } from "woby-three"
import { Mesh, MeshBasicMaterial, TextureLoader } from "three"
import { SpotLight } from "three"
import { AmbientLight } from "three"

const Box = (props: MeshProps) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = $<Mesh>()
    const texture = new TextureLoader().load('../textures/usedSteel.png')
    // Hold state for hovered and clicked events
    const hovered = $(false)
    const clicked = $(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame

    useFrame(() =>
        ($$(ref)?.rotateX(0.03))
    )

    useEffect(() => {
        console.log($$(ref))
    })

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            // onClick={(event) => clicked(!clicked())}
            onPointerOver={(event) => hovered(true)}
            onPointerOut={(event) => hovered(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={() => $$(hovered) ? 'hotpink' : 'orange'} map={texture as any} />
        </mesh>
    )
}

export const App = () => {
    const visible = $(false)
    const box = <Box position={[0, 1, 0]} />
    const ambientRef = $<AmbientLight>()
    const spotRef = $<SpotLight>()
    // const angle = $(10)

    useEffect(() => {
        console.log(ambientRef())
        // console.log(spotRef(), angle())
    })
    return (
        <canvas3D>
            <ambientLight intensity={1} ref={ambientRef} />
            <spotLight position={[0, 1, 0]} angle={10} penumbra={1} ref={spotRef} />
            <pointLight position={[0, 1, 0]} />
            <orbitControls enableDamping />
            <Box position={[-1.2, 0, 0]} onClick={() => { visible(!$$(visible)); console.log($$(visible)) }} />
            {/* <Box position={[0, 1, 0]} visible={() => $$(visible) ? true : false} /> */}
            {() => $$(visible) ? box : null}
            <Box position={[1.2, 0, 0]} />
        </canvas3D>
    )
}
render(App, document.body)