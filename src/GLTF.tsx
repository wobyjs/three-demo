/** @jsxImportSource @woby/three */

import { $, $$, useEffect } from "woby"

import { OrbitControls } from '@woby/three/lib/examples/jsm/controls/OrbitControls'
import { Canvas3D } from '@woby/three/lib/components/Canvas3D'
import { Gltf } from '@woby/three/lib/examples/jsm/loaders/Gltf'
import "@woby/three/src/cameras/OrthographicCamera"
import { Event } from '@woby/three/lib/components/Event'
import { Vector3 } from '@woby/three/src/math/Vector3'
import { GLTFLoader } from '@woby/three/examples/jsm/loaders/GLTFLoader'


export const GLTF = () => {
    const s = $()
    useEffect(() => console.log('scene', $$(s)))
    // const g = new GLTFLoader().load('models/model.gltf', gltf=>)
    return <Canvas3D>
        <webglRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]} />
        <scene ref={s}>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 0, 10]} angle={0.15} penumbra={1} castShadow />
            <pointLight position={[0, 0, 10]} /* ref={lightRef} */ castShadow />
            {/* @ts-ignore */}
            <Gltf url={"models/AnisotropyBarnLamp.glb"} /* ref={ref} */ castShadow receiveShadow position={[0, 0, 0]} />
        </scene>

        <perspectiveCamera args={[40, window.innerWidth / window.innerHeight, 0.01, 10]} position={[0, 5, 10]} />

        <OrbitControls enableDamping
            target={new Vector3(0, - 0.08, 0.11)}
            minDistance={0.1}
            maxDistance={2}
        />
        <Event />
    </Canvas3D>
}