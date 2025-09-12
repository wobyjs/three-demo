/** @jsxImportSource @woby/three */
import { $, $$, useEffect, type JSX, setRef } from "woby"

import { LineMaterial } from '@woby/three/examples/jsm/lines/LineMaterial'
import { OrbitControls } from '@woby/three/lib/examples/jsm/controls/OrbitControls'
import { FontLoader } from '@woby/three/examples/jsm/loaders/FontLoader'
import { useRenderers } from '@woby/three/lib/hooks/useRenderer'
import { useLoader } from '@woby/three/lib/hooks/useLoader'
import { Canvas3D } from '@woby/three/lib/components/Canvas3D'
import { MeshBasicMaterial } from '@woby/three/src/materials/MeshBasicMaterial'
import { Vector2 } from '@woby/three/src/math/Vector2'
import { Vector3 } from '@woby/three/src/math/Vector3'
import { toColor } from '@woby/three/lib/utils'
import '@woby/three/examples/jsm/renderers/CSS3DRenderer'
import { CSS3DObject, CSS3DRenderer } from '@woby/three/examples/jsm/renderers/CSS3DRenderer'
import { DoubleSide, NoBlending } from '@woby/three/src/constants'
import { Object3D, Object3DProps } from '@woby/three/src/core/Object3D'
import { Mesh } from '@woby/three/src/objects/Mesh'
import { Color } from '@woby/three/src/math/Color'
import { Event } from '@woby/three/lib/components/Event'
import { WebGLRenderer } from '@woby/three/src/renderers/WebGLRenderer'
import { LoadingManager } from '@woby/three/src/loaders/LoadingManager'


function createPoints(): Vector3[] {
    const points: Vector3[] = []

    points.push(
        new Vector3(0, 0, 0),
        new Vector3(100, 0, 0),
        new Vector3(100, 100, 0),
        new Vector3(50, 120, 0),
        new Vector3(0, 90, 0),
        new Vector3(-50, 90, 0),
        new Vector3(-50, 0, 0)
    )

    console.log("createPoints() length: " + points.length)

    return points
}


const Line2Trace = () => {
    const renderers = useRenderers()
    const points: Vector3[] = createPoints()

    const pts: number[] = []
    for (const point of points) {
        pts.push(point.x, point.y, point.z)
    }

    const clrs: number[] = []

    clrs.push(0, 255, 0)
    clrs.push(0, 0, 255)
    clrs.push(255, 0, 0)
    clrs.push(0, 255, 0)
    clrs.push(0, 0, 255)
    clrs.push(255, 0, 0)
    clrs.push(0, 255, 0)

    // const geometry = new LineGeometry()
    // geometry.setPositions(pts)
    // geometry.setColors(clrs)

    const resolution = new Vector2()
    $$(renderers)[0].getSize(resolution)

    const material = new LineMaterial({
        // color: new Color("#fff").getHex(),
        //@ts-ignore
        vertexColors: 2,
        linewidth: 15,
        dashed: false,
        resolution,
        polygonOffset: true,
        polygonOffsetFactor: 0,
        polygonOffsetUnits: -40,
    })

    return <line2 /* geometry={geometry} */ /* material={material} */>
        <lineGeometry setPositions={[pts]} setColors={[clrs]} />
        <lineMaterial
            vertexColors={true}
            linewidth={15}
            dashed={false}
            polygonOffset={true}
            polygonOffsetFactor={0}
            polygonOffsetUnits={-40}
            resolution={resolution}
        />
    </line2>
}



export const DLines = () => {
    const clicked = $(false)
    const material = new MeshBasicMaterial({ color: "black" })
    const parameters = {
        font: useLoader(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }),
        size: 100,
        depth: 10,
    }
    // const geometry = new TextGeometry("abc", parameters)

    const renderer1 = $<WebGLRenderer>()
    const renderer2 = $<CSS3DRenderer>()

    const color1 = '#7bb38d'
    const color2 = '#71a381'

    const div = $<HTMLDivElement>()
    useEffect(() => $$(div)?.setAttribute('contenteditable', 'plaintext-only'))

    const background = $<CSS3DObject>()

    const inVal = $('aaa')

    return <Canvas3D class='absolute top-[100px]'>
        <css3dRenderer ref={renderer2} setSize={[window.innerWidth, window.innerHeight]}
            domElement-id='css3d'
            domElement-onClick={e => {
                // console.log('renderer2 clicked');
                const ee = new MouseEvent('click', { ...e, bubbles: true, cancelable: true })
                $$(renderer1).domElement.dispatchEvent(ee)
            }}
            domElement-class='pointer-events-auto border absolute border-solid border-[black] top-0'>
        </css3dRenderer>

        <webglRenderer ref={renderer1} antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]}
            domElement-class='pointer-events-auto'
        // domElement-onClick={e => console.log('renderer1 clicked')}
        >
        </webglRenderer>
        {/* 
        <scene >
            <mesh>
                <textGeometry text={"Loading..."} parameters={parameters} />
                <meshBasicMaterial color={0xffffff} />

            </mesh>
        </scene> */}

        <scene background={toColor('white')}>
            <ambientLight intensity={0.5} />
            {/* <Box /> */}
            {/* <Text str={() => clicked() ? "ABCD" : "cde"} pathToFont="fonts/helvetiker_regular.typeface.json" /> */}
            {/* <Test/> */}

            {/* <line geometry={new three.BufferGeometry().setFromPoints([
            new three.Vector3(- 1, 0, 0),
            new three.Vector3(0, 1, 0),
            new three.Vector3(1, 0, 0),
        ])}
            material={new three.LineBasicMaterial({ color: 0x000ff })} /> */}

            {/* <line>
            <bufferGeometry points={[
                new three.Vector3(- 1, 0, 0),
                new three.Vector3(0, 1, 0),
                new three.Vector3(1, 0, 0),
            ]} />
            <lineBasicMaterial color={0x0000ff} linewidth={10} />
        </line> */}

            {/* <Line points={[
            new three.Vector3(- 10, 0, 0),
            new three.Vector3(0, 10, 0),
            new three.Vector3(10, 0, 0),
        ]} color={0x0000ff} lineWidth={10} />
*/}
            <mesh material={material} onClick={e => console.log('text geometry clicked')}>
                <textGeometry text={"123"} parameters={parameters} />
            </mesh>

            <Line2Trace />

            <object3d position={[0, 0, 0]} /* rotation={[0, Math.PI / 3, 0]} */ >
                <ElementObject onClick={e => alert('Div clicked')} ref={background} receiveShadow element={
                    <div ref={div} class='z-[10] pointer-event-auto box-border opacity-[0.999] p-2.5 w-[200px] h-[50px]'
                        // onPointerDown={e => alert('div clicked')} 
                        style={{
                            background: `repeating-linear-gradient(
        45deg,
        ${color1},
        ${color1} 10px,
        ${color2} 10px,
        ${color2} 20px
    )`}} >I am a &lt;div&gt; intersecting a WebGL sphere.<br /><br />This text is editable!
                        <button class='[border:2px_solid_#fa5a85] bg:[#e64e77]' onPointerDown={() => alert('hello clicked!')}>HELLO in div</button>
                        <input type='text' value='value in div'></input>
                    </div>}
                    position={[0, 0, 0]} width={.2} height={.2} >
                    <ElementObject element={<button class='z-[2] pointer-event-auto box-border opacity-[0.999] [border:2px_solid_#fa5a85] bg:[#e64e77] w-[75px] h-[20px]' onPointerDown={() => alert('You clicked a <button> element in the DOM!')}>Click me!</button>}
                        width={75} height={20} position={[0, 0, .04]} castShadow>

                    </ElementObject>
                </ElementObject>

                {/* <mesh geometry={geometry} position={[0, -10, 20]} receiveShadow
                        onFrame={sphere => {
                            sphere.rotation.x += 0.005
                            sphere.rotation.y += 0.005
                        }}>
                        <meshPhongMaterial {...{
                            color: 0x991d65,
                            emissive: 0x000000,
                            specular: 0x111111,
                            side: DoubleSide,
                            flatShading: false,
                            shininess: 30,
                            vertexColors: true,
                        }} />
                    </mesh> */}
                <ambientLight args={[new Color(.6, .6, .6), 1.5]} />
                {/* <pointLight position={[0, 5, 0]} intensity={10} castShadow shadow-camera-far={333} shadow-camera-near={0.1} /> */}

                <pointLight /* ref={light} */ args={[0xffffff, 10, 0]} castShadow position={[0, 0, 150]}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-near={1}
                    shadow-camera-far={2000} />
            </object3d>


            <object3d position={[0, -120, 0]} /* rotation={[0, 0, Math.PI]} */>
                <css3dObject element={<button class='bg-transparent border-none p-0 m-0 text-blue-500 hover:underline' onPointerDown={e => { console.log('btn clicked') }}>btn<img class='w-[12px] h-[12px]' src={'https://www.svgrepo.com/show/331702/cache.svg'} /><br />乾坤</button>} />
            </object3d>
            <object3d position={[, -130, 0]}>
                <css3dObject element={<input value={inVal} />} />
            </object3d>
            <object3d position={[0, -150, 0]}>
                <css3dObject element={<span value={inVal}>SPAN</span>} />
            </object3d>
        </scene>

        <perspectiveCamera position={[0, 0, 500]} />
        <OrbitControls domElement={() => $$(renderer2)?.domElement} />
        <Event />
        {/* <Event renderer={renderer2} /> */}
    </Canvas3D >
}

function ElementObject({ ref, element, width = 200, height = 200, children, ...props }: Object3DProps & { element: HTMLElement | JSX.Child, width?: number, height?: number }) {
    const css3dObject = $<CSS3DObject>()


    const myRef = $<Object3D>()
    useEffect(() => { setRef($$(myRef), ref) })

    // console.log($$(width), $$(height))
    return <object3d ref={myRef} {...props} /* onClick={e => alert('object3d clicked')} */>
        <css3dObject ref={css3dObject} element={element} /* onClick={e => alert('css3dobj clicked')} */ />
        {/* <mesh ref={lightShadowMesh} castShadow receiveShadow onClick={e => alert('mesh clicked')}>
            <boxGeometry args={() => [$$(width), $$(height), 1]} />
            <meshPhongMaterial args={{
                opacity: 0.15,
                color: new Color(0x111111),
                blending: NoBlending,
                // side	: DoubleSide,
            }} />
        </mesh> */null as any}
        {children}
    </object3d>


}
