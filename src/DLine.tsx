/** @jsxImportSource woby-three */

// import { Canvas3D, Three, useFrame, useLoader, defaults, consParams, objParams, useThree, useRenderer } from "woby-three"
import { $, $$, type JSX } from "woby"

import { LineMaterial } from 'woby-three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'woby-three/examples/jsm/lines/LineGeometry'
import { MeshProps, } from 'woby-three/src/objects/Mesh'
import { OrbitControls } from 'woby-three/lib/examples/jsm/controls/OrbitControls'
import { useFrame } from 'woby-three/lib/hooks/useFrame'
import { FontLoader } from "woby-three/examples/jsm/loaders/FontLoader"
import { useRenderer } from 'woby-three/lib/hooks/useRenderer'
import { useLoader } from 'woby-three/lib/hooks/useLoader'
import { Canvas3D } from 'woby-three/lib/components/Canvas3D'
import { Mesh } from "woby-three/src/objects/Mesh"
import { MeshBasicMaterial } from "woby-three/src/materials/MeshBasicMaterial"
import { Vector2 } from "woby-three/src/math/Vector2"
import { WebGLRenderer } from "woby-three/src/renderers/WebGLRenderer"
import { Vector3 } from "woby-three/src/math/Vector3"


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

// const visiblePointCount = 0
// const line: Object3D
// const line2: Object3D
// const line2Trace: Object3D
// const sphere: Object3D


/** On resize event */
// onResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()

//     renderer.setSize(window.innerWidth, window.innerHeight)
// }

function createPoints(): Vector3[] {
    const points: Vector3[] = []

    points.push(
        new Vector3(0, 0, 0),
        new Vector3(1, 0, 0),
        new Vector3(1, 1, 0),
        new Vector3(.5, 1.2, 0),
        new Vector3(0, .9, 0),
        new Vector3(-.5, .9, 0),
        new Vector3(-.5, 0, 0)
    )

    console.log("createPoints() length: " + points.length)

    return points
}


const Line2Trace = () => {
    const renderer = useRenderer<WebGLRenderer>()
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

    const geometry = new LineGeometry()
    geometry.setPositions(pts)
    geometry.setColors(clrs)

    const resolution = new Vector2()
    $$(renderer).getSize(resolution)

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
            vertexColors={!!2}
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
        size: 1,
        depth: 0.1,
    }
    // const geometry = new TextGeometry("abc", parameters)


    return <Canvas3D background='white'>
        <ambientLight intensity={0.5} />
        {/* <Box /> */}
        {/* <Text str={() => clicked() ? "ABCD" : "cde"} pathToFont="fonts/helvetiker_regular.typeface.json" /> */}
        <OrbitControls />
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
        <mesh material={material} >
            <textGeometry text={"123"} parameters={parameters} />
        </mesh>

        <Line2Trace />
    </Canvas3D>
}

// consParams.lineGeometry = ['geometry', 'material']
// objParams.lineGeometry = []

// console.log('LineGeometry')
// //@ts-ignore
// Three.LineGeometry = LineGeometry
// //@ts-ignore
// Three.LineMaterial = LineMaterial
// //@ts-ignore
// Three.LineSegmentsGeometry = LineSegmentsGeometry
// //@ts-ignore
// Three.Line2 = Line2
// //@ts-ignore
// defaults.lineGeometry = {}
// //@ts-ignore
// defaults.lineMaterial = {}