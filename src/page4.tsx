
import { $, $$, } from "woby"
import { MeshProps, useFrame, useThree } from "woby-three"
import { BackSide, BoxGeometry, Color, Mesh, MeshPhongMaterial, TextureLoader } from "three"

function Box(props: MeshProps) {
    // This reference gives us direct access to the THREE.Mesh object
    const texture = new TextureLoader().load('../textures/usedSteel.png')
    const scene = useThree("scene")
    const renderer = useThree("renderer")

    $$(renderer).shadowMap.enabled = true
    $$(scene).background = new Color("grey")

    // Hold state for hovered and clicked events
    const hovered = $(false)
    const clicked = $(false)
    const ref = $<Mesh>()
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => $$(ref) && ($$(ref).rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX


    return <mesh
        {...props}
        ref={ref}
        scale={() => $$(clicked) ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(event) => clicked(!clicked())}
        onPointerOver={(event) => hovered(true)}
        onPointerOut={(event) => hovered(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={() => $$(hovered) ? 'hotpink' : 'orange'} map={texture} />
    </mesh>
}


export function Page4() {
    const visible = $(true)
    const box = <Box position={[0, 1, 0]} />

    const cubeSize = 30
    const cubeGeo = new BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMat = new MeshPhongMaterial({
        color: '#CCC',
        side: BackSide,
    })


    return <canvas3D>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} />
        <pointLight position={[0, 5, 0]} intensity={10} castShadow shadow-camera-far={333} shadow-camera-near={0.1} />
        <Box position={[0, 1, 0]} castShadow onClick={() => console.log("visible", visible())} />
        {/* {useMemo(() => visible() ? box : null)} */}
        <Box position={[-2, 0.8, 0]} castShadow />
        <mesh geometry={cubeGeo} material={cubeMat} position={[0, cubeSize / 2 - 0.1, 0]} receiveShadow />

        <orbitControls enableDamping />
    </canvas3D>
}