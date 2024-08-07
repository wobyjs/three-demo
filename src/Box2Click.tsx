/** @jsxImportSource woby-three */

import { $, $$, } from "woby"
// import { Canvas3D, useFrame, useRenderer, useScene, useThree } from "woby-three"
// import { MeshProps, } from 'woby-three/src/objects/Mesh'

// import { MeshProps, Canvas3D, useFrame, useRenderer, useScene, useThree } from "woby-three"

// import 'woby-three/src/lights/SpotLight'
// import 'woby-three/src/lights/PointLight'

import { Mesh, MeshProps, } from 'woby-three/src/objects/Mesh'
import { OrbitControls } from 'woby-three/lib/examples/jsm/controls/OrbitControls'
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame } from "woby-three/lib/hooks/useFrame"
import { Canvas3D } from "woby-three/lib/components/Canvas3D"
import { MeshPhongMaterial } from "woby-three/src/materials/MeshPhongMaterial"
import { BoxGeometry } from "woby-three/src/geometries/BoxGeometry"
import { BackSide } from "woby-three/src/constants"
import { useScene } from "woby-three/lib/hooks/useScene"
import { useRenderer } from "woby-three/lib/hooks/useRenderer"
import { WebGLRenderer } from "woby-three/src/renderers/WebGLRenderer"
import { Color } from "woby-three/src/math/Color"

function Box(props: MeshProps) {
    // This reference gives us direct access to the THREE.Mesh object
    const texture = new TextureLoader().load('../textures/usedSteel.png')
    const scene = useScene()
    const renderer = useRenderer<WebGLRenderer>()

    $$(renderer).shadowMap.enabled = true
    $$(scene).background = new Color("grey")

    // Hold state for hovered and useRenderer()$(false)
    const hovered = $(false)
    const clicked = $(false)
    const ref = $<Mesh>()
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => $$(ref) && ($$(ref).rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX


    return <mesh
        {...props}
        ref={ref}
        scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(event) => clicked(!clicked())}
        onPointerOver={(event) => hovered(true)}
        onPointerOut={(event) => hovered(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={() => $$(hovered) ? 'hotpink' : 'orange'} map={texture} />
    </mesh>
}


export function Box2Click() {
    const visible = $(true)

    const cubeSize = 30
    const cubeGeo = new BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMat = new MeshPhongMaterial({
        color: '#CCC',
        side: BackSide,
    })


    return <Canvas3D>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} />
        <pointLight position={[0, 5, 0]} intensity={10} castShadow shadow-camera-far={333} shadow-camera-near={0.1} />
        <Box position={[0, 1, 0]} castShadow onClick={() => console.log("visible", visible())} />
        {/* {useMemo(() => visible() ? box : null)} */}
        <Box position={[-2, 0.8, 0]} castShadow />
        <mesh geometry={cubeGeo} material={cubeMat} position={[0, cubeSize / 2 - 0.1, 0]} receiveShadow />

        <OrbitControls enableDamping />
    </Canvas3D>
}