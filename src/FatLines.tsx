/** @jsxImportSource woby-three */

import * as three from 'three'
import { Three, consParams, objParams, defaults, LineProps, useThree, useFrame, useRenderer } from "woby-three"
import { $, $$, useEffect, } from "woby"
import * as GeometryUtils from 'three/examples/jsm/utils/GeometryUtils'
import { Line2 } from 'three/examples/jsm/lines/Line2' //'three/addons/lines/Line2.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min' //'three/addons/lines/Line2.js';
import './TextGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import Stats from 'three/examples/jsm//libs/stats.module';
import { GPUStatsPanel } from 'three/examples/jsm/utils/GPUStatsPanel';

import { Line } from 'three'

//https://threejs.org/examples/?q=line#webgl_lines_fat


//@ts-ignore
Three.GUI = GUI

//@ts-ignore
Three.Line22 = Line2
//@ts-ignore
consParams.line22 = consParams.line2
//@ts-ignore
objParams.line22 = objParams.line2
//@ts-ignore
defaults.line22 = defaults.line

declare global {
    namespace JSX {
        interface IntrinsicElements {
            line22: LineProps
        }
    }
}

const Panel = () => {
    const { scene, camera } = useThree()
    const renderer = useRenderer<three.WebGLRenderer>()

    // $$(renderer).setPixelRatio(window.devicePixelRatio)
    // $$(renderer).setSize(window.innerWidth, window.innerHeight)
    // $$(renderer).setClearColor(0x000000, 0.0)

    const camera2 = new three.PerspectiveCamera(40, 1, 1, 1000)

    const stats = new Stats()
    document.body.appendChild(stats.dom)

    let gpuPanel
    let insetWidth
    let insetHeight

    useEffect(() => {
        const r = $$(renderer)
        if (!r) return null
        if (!$$(camera)) return null

        camera2.position.copy($$(camera).position)

        gpuPanel = new GPUStatsPanel(r.getContext())
        stats.addPanel(gpuPanel)
        stats.showPanel(0)

        function onWindowResize() {
            ($$(camera) as three.PerspectiveCamera).aspect = window.innerWidth / window.innerHeight;
            $$(camera).updateProjectionMatrix();

            r.setSize(window.innerWidth, window.innerHeight);

            insetWidth = window.innerHeight / 4; // square
            insetHeight = window.innerHeight / 4;

            camera2.aspect = insetWidth / insetHeight;
            camera2.updateProjectionMatrix();

        }

        window.addEventListener('resize', onWindowResize);
        onWindowResize()

        return () => window.removeEventListener('resize', onWindowResize)
    })


    useFrame(() => {
        const r = $$(renderer)
        if (!r) return
        if (!$$(scene)) return
        if (!$$(camera)) return

        r.setClearColor(0x000000, 0)
        r.setViewport(0, 0, window.innerWidth, window.innerHeight)

        gpuPanel?.startQuery()
        r.render($$(scene) as any, $$(camera))
        gpuPanel?.endQuery()

        r.setClearColor(0x222222, 1)

        r.clearDepth() // important!

        r.setScissorTest(true)

        r.setScissor(20, 20, insetWidth, insetHeight)

        r.setViewport(20, 20, insetWidth, insetHeight)

        camera2.position.copy($$(camera).position)
        camera2.quaternion.copy($$(camera).quaternion)

        r.render($$(scene) as any, camera2)

        r.setScissorTest(false)

        stats.update()
    })

}


export const FatLines = () => {
    const positions = [];
    const colors = [];

    const points = GeometryUtils.hilbert3D(new three.Vector3(0, 0, 0), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7)

    const spline = new three.CatmullRomCurve3(points)
    const divisions = Math.round(12 * points.length)
    const point = new three.Vector3()
    const color = new three.Color()

    const isLineGeometry = $(true)

    for (let i = 0, l = divisions; i < l; i++) {

        const t = i / l;

        spline.getPoint(t, point)
        positions.push(point.x, point.y, point.z)

        color.setHSL(t, 1.0, 0.5, three.SRGBColorSpace)
        colors.push(color.r, color.g, color.b)

    }

    const bf = $<three.BufferGeometry<three.NormalBufferAttributes>>()
    const l2 = $<Line2>()
    const matLine = $<LineMaterial>()
    const g = $<GUI>()
    const l1 = $<Line>()


    useEffect(() => {
        if (!$$(g)) return

        const param = {
            'line type': 0,
            'world units': false,
            'width': 5,
            'alphaToCoverage': false,
            'dashed': false,
            // 'dash scale': 1,
            // 'dash / gap': 1
        };
        const gui = $$(g)

        gui.add(param, 'line type', { 'LineGeometry': 0, 'gl.LINE': 1 }).onChange(val => {

            switch (val) {

                case 0:
                    isLineGeometry(true)
                    break;

                case 1:
                    isLineGeometry(false)
                    break;

            }

        })

        gui.add(param, 'world units').onChange(val => {
            $$(matLine).worldUnits = val
            $$(matLine).needsUpdate = true
        })

        gui.add(param, 'width', 1, 10).onChange(val => $$(matLine).linewidth = val)

        gui.add(param, 'alphaToCoverage').onChange(val => $$(matLine).alphaToCoverage = val)

        // gui.add(param, 'dashed').onChange(val => {
        //     $$(matLine).dashed = val
        //     $$(l1).material = val ? matLineDashed : matLineBasic
        // })

        // gui.add(param, 'dash scale', 0.5, 2, 0.1).onChange(function (val) {

        //     $$(matLine).dashScale = val;
        //     matLineDashed.scale = val;

        // })

        // gui.add(param, 'dash / gap', { '2 : 1': 0, '1 : 1': 1, '1 : 2': 2 }).onChange(function (val) {

        //     switch (val) {

        //         case 0:
        //             $$(matLine).dashSize = 2;
        //             $$(matLine).gapSize = 1;

        //             matLineDashed.dashSize = 2;
        //             matLineDashed.gapSize = 1;

        //             break;

        //         case 1:
        //             $$(matLine).dashSize = 1;
        //             $$(matLine).gapSize = 1;

        //             matLineDashed.dashSize = 1;
        //             matLineDashed.gapSize = 1;

        //             break;

        //         case 2:
        //             $$(matLine).dashSize = 1;
        //             $$(matLine).gapSize = 2;

        //             matLineDashed.dashSize = 1;
        //             matLineDashed.gapSize = 2;

        //             break;

        //     }

        // })
    })
    useEffect(() => {
        if (!$$(bf)) return

        $$(bf).setAttribute('position', new three.Float32BufferAttribute(positions, 3))
        $$(bf).setAttribute('color', new three.Float32BufferAttribute(colors, 3))
    })

    // useEffect(()=>{
    //     if(!$$(l2))return

    //     $$(l2).computeLineDistances()
    // })

    return <canvas3D noRender background={0x222222} /* camera={new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000)} */
    // renderer={new three.WebGLRenderer({ antialias: true })}
    >
        <gui ref={g} />
        {/* <webGLRenderer antialias setPixelRatio={[window.devicePixelRatio]} setSize={[window.innerWidth, window.innerHeight]} setClearColor={[0x000000, 0.0]} /> */}
        {/* <perspectiveCamera fov={40} aspect={window.innerWidth / window.innerHeight} near={1} far={1000} position={[-40, 0, 60]} /> */}
        <Panel />
        <ambientLight intensity={0.5} />
        <orbitControls minDistance={10} maxDistance={500} enableDamping />

        <line22 ref={l2} scale={[1, 1, 1]}
            visible={isLineGeometry}
        // onClick={() => console.log('canvas clicked')}
        >
            <lineGeometry setPositions={[positions]} setColors={[colors]} />
            {/* line.computeLineDistances() */}
            <lineMaterial ref={matLine} color={0xffffff}
                linewidth={10} // in world units with size attenuation, pixels otherwise
                vertexColors={true}
                dashed={false}
                alphaToCoverage={false} />
        </line22>

        {/* matLineDashed = new THREE.LineDashedMaterial( {vertexColors: true, scale: 2, dashSize: 1, gapSize: 1 } ) */}

        <line ref={l1} visibility={() => !$$(isLineGeometry) as any}>
            <bufferGeometry ref={bf} /* points={new three.Float32BufferAttribute(positions, 3) as any} */ />
            {/* <bufferGeometry ref={bf} points={positions} /> */}
            <lineBasicMaterial vertexColors={true} />
        </line>
    </canvas3D >
}
