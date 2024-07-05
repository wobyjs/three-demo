///// <reference path="woby-three" />
/** @jsxImportSource woby-three */

import {  Group,  MeshBasicMaterial, OrthographicCamera, PointLight } from "three"
import { render, useThree,  GLTFProps } from "woby-three"
import { $, $$, useEffect, useMemo } from "woby"

const App = () => {
    const clicked = $(false)
    const material = new MeshBasicMaterial({ color: "black" })
    const ref = $<Group>()
    const lightRef = $<PointLight>()

    useEffect(() => {
        console.log("Light", lightRef())

        if (!lightRef()) {
            return
        }
        lightRef().castShadow = true
    })

    useEffect(() => {
        console.log("gltf", $$(ref))

        if (!$$(ref)) {
            return
        }

        $$(ref).castShadow = true
        $$(ref).receiveShadow = true
        // console.log($$(ref))
    })

    return (
        <canvas3D camera={new OrthographicCamera()}>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} castShadow />
            <pointLight position={[0, 0, 0]} ref={lightRef} />
            <gltf path={"models/model.gltf"} ref={ref} position={[0, 0, 0]} />
            <orbitControls enableDamping />
        </canvas3D >

    )


}

render(App, document.body)