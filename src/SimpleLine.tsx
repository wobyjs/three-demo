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
import { Vector3 } from '@woby/three/src/math/Vector3'
import { LineBasicMaterial } from '@woby/three/src/materials/LineBasicMaterial'
import { toColor } from '@woby/three/lib/utils'
import { type JSX } from '@woby/three'


// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

export const SimpleLine = () => {
    const material = new MeshBasicMaterial({ color: "black" })
    const parameters = {
        font: useLoader(FontLoader, { path: "fonts/helvetiker_regular.typeface.json" }),
        size: 1,
        depth: 0.1,
    }
    // const geometry = new TextGeometry("abc", parameters)


    return <Canvas3D>
        <webglRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]} />
        <scene background={toColor('white')}>
            <ambientLight intensity={0.5} />
            {/* <Box /> */}
            {/* <Text str={() => clicked() ? "ABCD" : "cde"} pathToFont="fonts/helvetiker_regular.typeface.json" /> */}
            {/* <Test/> */}

            <line geometry={new BufferGeometry().setFromPoints([
                new Vector3(- 1, 0, 0),
                new Vector3(0, -1, 0),
                new Vector3(1, 0, 0),
            ])}
                material={new LineBasicMaterial({ color: "#FF0000" })} />

            <line>
                <bufferGeometry setFromPoints={[[
                    new Vector3(- 1, 0, 0),
                    new Vector3(0, 1, 0),
                    new Vector3(1, 0, 0),
                ]]} />
                <lineBasicMaterial color={0x0000ff} linewidth={10} />
            </line>

            <mesh material={material} >
                <textGeometry text={"abcd"} parameters={parameters} />
            </mesh>
        </scene>
        <perspectiveCamera position={[0, 0, 5]} />

        <OrbitControls />

    </Canvas3D>
}
