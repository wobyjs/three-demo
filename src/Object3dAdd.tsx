/** @jsxImportSource woby-three */

import { $, $$ } from 'woby'

import { OrbitControls } from 'woby-three/lib/examples/jsm/controls/OrbitControls'
import 'woby-three/src/lights/AmbientLight'
import 'woby-three/src/objects/Mesh'
import { Canvas3D, toColor } from 'woby-three/lib/components/Canvas3D'

import 'woby-three/src/lights/SpotLight'
import 'woby-three/src/lights/PointLight'
import 'woby-three/src/geometries/BoxGeometry'
import 'woby-three/src/core/Object3D'

export const Obj3D = () => {
    return (
        <Canvas3D>
            <webglRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]}>
                <scene background={toColor('white')}>
                    <ambientLight intensity={1} />
                    <spotLight position={[0, 1, 0]} angle={10} penumbra={1} />
                    <pointLight position={[0, 1, 0]} />
                    <object3d>
                        <mesh position={[-1.2, 0, 0]}>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshBasicMaterial color={0x00ff00} wireframe />
                        </mesh>

                        <mesh position={[1.2, 0, 0]} >
                            <boxGeometry args={[1, 1, 1]} />
                            <meshBasicMaterial color={0x00ff00} wireframe />
                        </mesh>
                    </object3d>
                </scene>
            </webglRenderer>
            <perspectiveCamera position={[0, 0, 5]} />
            <OrbitControls enableDamping />
        </Canvas3D >
    )
}