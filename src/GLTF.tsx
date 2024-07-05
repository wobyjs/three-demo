/** @jsxImportSource woby-three */

import { Group, OrthographicCamera, PointLight } from "three"
import { $, $$, useEffect } from "woby"


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

    return <canvas3D camera={new OrthographicCamera()}>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[0, 0, 0]} ref={lightRef} />
        <gltf path={"models/model.gltf"} ref={ref} /* position={[0, 0, 0]} */ />
        <orbitControls enableDamping />
    </canvas3D >
}