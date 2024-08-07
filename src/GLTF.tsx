/** @jsxImportSource woby-three */

import { $, $$, useEffect } from "woby"

import { OrbitControls } from 'woby-three/lib/examples/jsm/controls/OrbitControls'
import { Canvas3D } from "woby-three/lib/components/Canvas3D"
import { Gltf } from 'woby-three/lib/examples/jsm/loaders/Gltf'
import { PointLight } from "woby-three/src/lights/PointLight"
import { OrthographicCamera } from "woby-three/src/cameras/OrthographicCamera"
import { Group } from "woby-three/src/objects/Group"

export const GLTF = () => {
    const ref = $<Group>()
    const lightRef = $<PointLight>()

    useEffect(() => {
        if (!$$(lightRef)) return

        $$(lightRef).castShadow = true
    })

    useEffect(() => {
        if (!$$(ref)) return

        $$(ref).castShadow = true
        $$(ref).receiveShadow = true
    })

    return <Canvas3D camera={new OrthographicCamera()}>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[0, 0, 0]} ref={lightRef} />
        <Gltf path={"models/model.gltf"} ref={ref} /* position={[0, 0, 0]} */ />
        <OrbitControls enableDamping />
    </Canvas3D>
}