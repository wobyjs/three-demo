/** @jsxImportSource woby-three */
import { $, $$, type JSX } from "woby"

import { LineMaterial } from 'woby-three/examples/jsm/lines/LineMaterial'
import { OrbitControls } from 'woby-three/lib/examples/jsm/controls/OrbitControls'
import { FontLoader } from "woby-three/examples/jsm/loaders/FontLoader"
import { useRenderers } from 'woby-three/lib/hooks/useRenderer'
import { useLoader } from 'woby-three/lib/hooks/useLoader'
import { Canvas3D, toColor } from 'woby-three/lib/components/Canvas3D'
import { MeshBasicMaterial } from "woby-three/src/materials/MeshBasicMaterial"
import { Vector2 } from "woby-three/src/math/Vector2"
import { Vector3 } from "woby-three/src/math/Vector3"


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


    return <Canvas3D >
        <webglRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]}>
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
                <mesh material={material} >
                    <textGeometry text={"123"} parameters={parameters} />
                </mesh>

                <Line2Trace />
            </scene>
        </webglRenderer>
        <perspectiveCamera position={[0, 0, 5]} />
        <OrbitControls />
    </Canvas3D>
}

// consParams.lineGeometry = ['geometry', 'material']
// objProps.lineGeometry = []

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