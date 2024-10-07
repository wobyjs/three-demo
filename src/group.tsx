/** @jsxImportSource woby-three */

import { $, $$, useEffect } from 'woby'

import { OrbitControls } from 'woby-three/lib/examples/jsm/controls/OrbitControls'
import 'woby-three/src/lights/AmbientLight'
import 'woby-three/src/objects/Mesh'
import { Canvas3D, toColor } from 'woby-three/lib/components/Canvas3D'

import 'woby-three/src/lights/SpotLight'
import 'woby-three/src/lights/PointLight'
import 'woby-three/src/geometries/SphereGeometry'
import 'woby-three/src/core/Object3D'
import 'woby-three/src/objects/Group'
import { useScenes } from 'woby-three/lib/hooks/useScene'

export const Grp = () => {

    //@ts-ignore
    useEffect(() => console.log(window.scene = $$(useScenes())?.[0]))

    return <Canvas3D>
        <webglRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]}>
            <scene background={toColor('white')}>
                <ambientLight intensity={1} />
                <spotLight position={[0, 1, 0]} angle={10} penumbra={1} />
                <pointLight position={[0, 1, 0]} />
                <group>
                    <mesh position={[-1.2, 0, 0]}>
                        <sphereGeometry args={[1, 32, 16]} />
                        <meshBasicMaterial color={0x00ff00} wireframe />
                    </mesh>

                    <mesh position={[1.2, 0, 0]} >
                        <sphereGeometry args={[1, 32, 16]} />
                        <meshBasicMaterial color={0x00ff00} wireframe />
                    </mesh>
                </group>
            </scene>
        </webglRenderer>
        <perspectiveCamera position={[0, 0, 5]} />
        <OrbitControls enableDamping />
    </Canvas3D >
}