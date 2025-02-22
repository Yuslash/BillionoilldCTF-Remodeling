import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing"
import { useEffect, useRef } from "react"
import * as THREE from 'three'

export default function DifferentShape() {

    const { scene, nodes } = useGLTF("/different.glb")

    const meshs = []

    for (let i = 0; i < scene.children.length; i++) {
        const child = scene.children[i]
        if(child.isMesh) {
            child.rotation.y = Math.PI / 2
            //change the gloom mesh color 
            if(i === 0) {
                child.material.color = new THREE.Color(0xff0000)
                child.material.emissive = new THREE.Color(0xff0000)
                child.material.emissiveIntensity = 10
            } else if(i === 1) {
                child.material.color = new THREE.Color(0xff4287f5)
                // child.material.emissive = new THREE.Color(0x00ff00)
                // child.material.emissiveIntensity = 10
            }
            meshs.push(child)
        }
    }

    return (
        <div className="w-full h-full bg-black">
            <Canvas flat orthographic camera={{zoom: 100}}>
                <ambientLight intensity={1} />
                <EffectComposer disableNormalPass>
            <Bloom intensity={2} mipmapBlur luminanceThreshold={1} levels={8}/>
              <ToneMapping />
          </EffectComposer>
                    {/* {meshs.map((mesh, index) => (
                        <primitive 
                        key={mesh.uuid} 
                        object={mesh}
                           />
                    ))} */}
                    <primitive object={scene} />
                <OrbitControls />
            </Canvas>
        </div>
    )
}