/** @jsxImportSource woby-three */

import { $, $$, useEffect } from "woby"
// import { useFrame, useThree, render, useScene, useCamera, useRenderer, Canvas3D } from "woby-three"
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { Mesh, MeshProps, } from 'woby-three/src/objects/Mesh'
import 'woby-three/examples/jsm/lines/Wireframe'
import 'woby-three/examples/jsm/lines/WireframeGeometry2'
import 'woby-three/src/geometries/IcosahedronGeometry'
import { OrbitControls } from "woby-three/lib/examples/jsm/controls/OrbitControls"
import { TextureLoader } from "woby-three/src/loaders/TextureLoader"
import { useFrame } from "woby-three/lib/hooks/useFrame"
import { useRenderer } from "woby-three/lib/hooks/useRenderer"
import { WebGLRenderer } from "woby-three/src/renderers/WebGLRenderer"
import { useScene } from "woby-three/lib/hooks/useScene"
import { useCamera } from "woby-three/lib/hooks/useCamera"
import { Color } from "woby-three/src/math/Color"
import { BoxGeometry } from "woby-three/src/geometries/BoxGeometry"
import { MeshPhongMaterial } from "woby-three/src/materials/MeshPhongMaterial"
import { BackSide } from "woby-three/src/constants"
import { Canvas3D } from "woby-three/lib/components/Canvas3D"


function Box(props: MeshProps) {
    // This reference gives us direct access to the THREE.Mesh object
    const texture = new TextureLoader().load('../textures/usedSteel.png')
    const ref = $<Mesh>()
    // Hold state for hovered and clicked events
    const hovered = $(false)
    const clicked = $(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => $$(ref)?.rotateX(0.01))

    const scene = useScene()
    const renderer = useRenderer<WebGLRenderer>()
    const camera = useCamera()

    $$(renderer).shadowMap.enabled = true
    $$(scene).background = new Color("grey")


    useEffect(() => {
        if (!$$(ref)) {
            return
        }

        $$(ref).add(label)
    })

    const div = document.createElement('div')
    div.className = 'label'
    div.textContent = 'Earth'
    div.style.backgroundColor = 'transparent'

    div.addEventListener("pointerdown", (e) => {
        console.log("div clicked")
    })

    const label = new CSS2DObject(div)
    label.position.set(0, 2, 0)
    label.center.set(0, 0)
    $$(scene).add(label)


    const textRenderer = new CSS2DRenderer()
    textRenderer.setSize(window.innerWidth, window.innerHeight)
    textRenderer.domElement.style.position = 'absolute'
    textRenderer.domElement.style.top = '0px'

    document.body.appendChild(textRenderer.domElement)

    document.body.addEventListener("pointerdown", (e: PointerEvent) => {
        if (e.target == textRenderer.domElement) {
            const myEvent = new PointerEvent('pointerdown', e)
            $$(renderer).domElement.dispatchEvent(myEvent)
        }
        else {
            (e.target as HTMLElement).click()

        }
    })

    document.body.addEventListener('pointermove', (e) => {
        if (e.target == textRenderer.domElement) {
            const myEvent = new PointerEvent('pointermove', e)
            $$(renderer).domElement.dispatchEvent(myEvent)
        }
        else
            (e.target as HTMLElement).click()
    })

    useFrame(() => {
        textRenderer.render($$(scene), $$(camera))
    })

    // Return the view, these are regular Threejs elements expressed in JSX
    return <wireframe
        // {...props}
        ref={ref}

        scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}>
        <wireframeGeometry2>
            <icosahedronGeometry args={[20, 1]} />
        </wireframeGeometry2>
        <lineMaterial color='0x4080ff' linewidth={5} dashed={false} />

        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* <meshStandardMaterial color={() => $$(hovered) ? 'hotpink' : 'orange'} map={texture} side={DoubleSide} /> */}

    </wireframe>
}

export function Line() {
    const box = <Box selfDispose position={[0, 1, 0]} />

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
        <Box position={[0, 1, 0]} onClick={(event) => console.log("box clicked")} />
        {/* {useMemo(() => visible() ? box : null)} */}
        {/* <Box position={[-2, 0.8, 0]} castShadow /> */}
        {/* <mesh geometry={cubeGeo} material={cubeMat} position={[0, cubeSize / 2 - 0.1, 0]} receiveShadow /> */}

        <OrbitControls enableDamping />
    </Canvas3D>
}