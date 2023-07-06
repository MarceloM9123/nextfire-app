import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Phone } from "./3DModels/Phone";
import { Center, Environment, Float, Lightformer, OrbitControls, PivotControls, Text3D } from "@react-three/drei";
import { useControls } from "leva";
import { Headphones } from "./3DModels/Headphones";
import { SoccerBall } from "./3DModels/SoccerBall";
import { useLayoutEffect, useRef } from "react";
import Script from 'next/script'
import { useIsomorphicEffect } from "/helpers/useIsomorphicEffect.js";

export default function Header({ env = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr' }) {
  const { viewport, camera } = useThree()

    return(
          <>
              <Environment
                files={env}
              >

              <Lightformer
                  form="circle" // circle | ring | rect (optional, default = rect)
                  intensity={10} // power level (optional = 1)
                  color="#ffffff" // (optional = white)
                  scale={[13, 3]} // Scale it any way you prefer (optional = [1, 1])
                  target={[0, -10, 0]} // Target position (optional = undefined)
                  position={[0, -1.25, -10]}
                />
              </Environment>

              <Float speed={20} rotationIntensity={.05} floatIntensity={.03}>
                  <Phone />  
              </Float>
              <Float speed={7} floatIntensity={2} rotationIntensity={.2}>
                  <Headphones />  
              </Float>
              <Float speed={4} floatIntensity={2} rotationIntensity={1}>
                  <SoccerBall />  
              </Float>

              <Center disableY disableZ>
                <Float speed={20} rotationIntensity={.05} floatIntensity={.03}>
                  <Text3D
                    position={[0, -1.5, 1]}
                    depth={1}
                    font="/fonts/JosefinSansThic.json"
                    size={1.25}
                    letterSpacing={-0.04}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                  >
                    Marcelo Mata 
                      <meshPhysicalMaterial 
                        color="#ED1C24"  
                        roughness={0}
                        emissive={'#000'}
                        clearcoat={1}
                        reflectivity={0.2}
                        metalness={.2}
                        iridescence={0.1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[100,1000]}         
                      />
                  </Text3D>
                </Float>
              </Center>
              <Center disableY disableZ>
                <Float speed={20} rotationIntensity={.05} floatIntensity={.03}>
                  <Text3D
                    position={[ 0, -3, 1.5]}
                    depth={1}
                    font="/fonts/JosefinSansThic.json"
                    size={.8}
                    letterSpacing={-0.04}
                    color="#279AF1"
                    anchorX="center"
                    anchorY="middle"
                  >
                    Software Developer
                      <meshPhysicalMaterial 
                        color="#279AF1"  
                        roughness={0}
                        emissive={'#000'}
                        clearcoat={1}
                        reflectivity={0.2}
                        metalness={.2}
                        iridescence={0.1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[100,1000]}         
                      />
                  </Text3D>
                </Float>
              </Center>

              {/* <OrbitControls makeDefault/> */}

            </>
    )
}
