/** @jsxImportSource @woby/three */

import { FontLoader } from '@woby/three/examples/jsm/loaders/FontLoader'

// import './TextGeometry'
import '@woby/three/src/objects/Mesh'
import '@woby/three/src/geometries/BoxGeometry'
import '@woby/three/src/materials/MeshStandardMaterial'
import '@woby/three/examples/jsm/geometries/TextGeometry'
import '@woby/three/src/lights/AmbientLight'
import '@woby/three/src/objects/Line'
import { BufferGeometry } from '@woby/three/src/core/BufferGeometry'
import { OrbitControls } from '@woby/three/lib/examples/jsm/controls/OrbitControls'
import { MeshBasicMaterial } from '@woby/three/src/materials/MeshBasicMaterial'
import { useLoader } from '@woby/three/lib/hooks/useLoader'
import { Canvas3D } from '@woby/three/lib/components/Canvas3D'
import { toColor } from '@woby/three/lib/utils'
import '@woby/three/src/math/Line3'
import '@woby/three/src/geometries/EdgesGeometry'
import '@woby/three/src/materials/LineBasicMaterial'
import '@woby/three/src/objects/LineSegments'
import '@woby/three/src/geometries/CircleGeometry'

// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

export const Sector = () => {
    const material = new MeshBasicMaterial({ color: "black" })
    const parameters = {
        font: useLoader(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }),
        size: 1,
        depth: 0.1,
    }
    // const geometry = new TextGeometry("abc", parameters)


    return <Canvas3D>
        <webglRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]}>
            <scene background={toColor('white')}>
                <ambientLight intensity={0.5} />
                {/* <Box /> */}
                {/* <Text str={() => clicked() ? "ABCD" : "cde"} pathToFont="fonts/helvetiker_regular.typeface.json" /> */}
                {/* <Test/> */}

                <mesh position={[0, 0, 0]} >
                    <lineSegments>
                        <edgesGeometry /* args={[new CircleGeometry(1, 32)]} */ >
                            <circleGeometry radius={1} segments={32} />
                        </edgesGeometry>
                        <lineBasicMaterial linewidth={1} color={0} />
                    </lineSegments>
                </mesh>

                {/* <mesh material={material} >
                    <textGeometry text={"abcd"} parameters={parameters} />
                </mesh> */}
            </scene>
        </webglRenderer>
        <perspectiveCamera position={[0, 0, 5]} />

        <OrbitControls />

    </Canvas3D>
}
