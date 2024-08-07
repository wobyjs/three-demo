/** @jsxImportSource woby-three */


import { $, $$, useEffect } from "woby"
// import { MeshProps, Canvas3D, useFrame, useThree, useRenderer, Mesh, TextureLoader, WebGLRenderer } from "woby-three"

// import { MeshProps, } from 'woby-three/src/objects/Mesh'

import { Mesh, MeshProps, } from 'woby-three/src/objects/Mesh'
import { OrbitControls } from 'woby-three/lib/examples/jsm/controls/OrbitControls'
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useFrame } from "woby-three/lib/hooks/useFrame"
import { Canvas3D } from "woby-three/lib/components/Canvas3D"
import { useRenderer } from "woby-three/lib/hooks/useRenderer"
import { useThree } from "woby-three/lib/hooks/useThree"
import { CSS2DObject, CSS2DRenderer } from 'woby-three/examples/jsm/renderers/CSS2DRenderer'
import { WebGLRenderer } from "woby-three/src/renderers/WebGLRenderer"
import { Color } from "woby-three/src/math/Color"
import { DoubleSide } from "woby-three/src/constants"


function Box(props: MeshProps) {
    const texture = new TextureLoader().load('../textures/usedSteel.png')
    const ref = $<Mesh>()
    const hovered = $(false)
    const clicked = $(false)

    const { scene, camera, } = useThree()
    const renderer = useRenderer<WebGLRenderer>()

    $$(renderer).shadowMap.enabled = true
    $$(scene).background = new Color("grey")

    useEffect(() => {
        if (!$$(ref))
            return

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

    // useFrame(() => $$(ref)?.rotateX(0.01))

    useFrame(() => {
        $$(ref)?.rotateX(0.01)
        textRenderer.render($$(scene), $$(camera))
    })

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}

            scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={() => $$(hovered) ? 'hotpink' : 'orange'} map={texture} side={DoubleSide} />
        </mesh >
    )
}

export function BoxHtmlText() {
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