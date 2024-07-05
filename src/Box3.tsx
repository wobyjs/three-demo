/** @jsxImportSource woby-three */

import { $, $$ } from "woby"
import { useFrame, MeshProps } from "woby-three"
import { AmbientLight, Mesh, SpotLight, TextureLoader } from "three"

const Box = (props: MeshProps) => {
    const ref = $<Mesh>()
    const texture = new TextureLoader().load('../textures/usedSteel.png')
    const hovered = $(false)
    const clicked = $(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame

    useFrame(() => ($$(ref)?.rotateX(0.03)))

    // Return the view, these are regular Threejs elements expressed in JSX
    return <mesh
        {...props}
        ref={ref}
        scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        // onClick={(event) => clicked(!clicked())}
        onPointerOver={() => hovered(true)}
        onPointerOut={() => hovered(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={() => $$(hovered) ? 'hotpink' : 'orange'} map={texture} />
    </mesh>
}

export const Box3 = () => {
    const visible = $(false)
    const box = <Box position={[0, 1, 0]} />
    const ambientRef = $<AmbientLight>()
    const spotRef = $<SpotLight>()
    return (
        <canvas3D background='white'>
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