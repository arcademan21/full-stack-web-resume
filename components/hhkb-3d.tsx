"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Float, Center, ContactShadows } from "@react-three/drei"
import { useTheme } from "next-themes"

const KEY_SIZE = 0.8
const SPACING = 0.1
const UNIT = KEY_SIZE + SPACING

function Key({ 
  position, 
  width = 1, 
  color = "#334155", 
  activeColor = "#38bdf8",
  isAutoPressed = false
}: { 
  position: [number, number, number], 
  width?: number, 
  color?: string, 
  activeColor?: string,
  isAutoPressed?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  
  const isPressed = pressed || isAutoPressed
  const keyWidth = (UNIT * width) - SPACING
  
  return (
    <group position={position}>
        <mesh 
            position={[0, isPressed ? -0.1 : 0, 0]} 
            castShadow 
            receiveShadow
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
        >
            <boxGeometry args={[keyWidth, 0.4, KEY_SIZE]} />
            <meshStandardMaterial 
                color={isPressed ? activeColor : (hovered ? "#475569" : color)} 
                roughness={0.6} 
                metalness={0.05} 
            />
        </mesh>
    </group>
  )
}

function HHKBModel({ isDark }: { isDark: boolean }) {
  // HHKB Layout Approximation
  // Row 1
  const r1 = Array(15).fill(1)
  // Row 2: Tab(1.5) ... Backslash(1.5)
  const r2 = [1.5, ...Array(12).fill(1), 1.5]
  // Row 3: Caps(1.75) ... Enter(2.25)
  const r3 = [1.75, ...Array(11).fill(1), 2.25]
  // Row 4: Shift(2.25) ... Fn(1)
  const r4 = [2.25, ...Array(10).fill(1), 1.75, 1]
  // Row 5: Space row
  const r5 = [1, 1.5, 6, 1.5, 1]

  const rowConfig = [
    { y: -2 * UNIT, keys: r1 },
    { y: -1 * UNIT, keys: r2 },
    { y: 0, keys: r3 },
    { y: 1 * UNIT, keys: r4 },
    { y: 2 * UNIT, keys: r5 } 
  ]
  
  const [autoPressedKey, setAutoPressedKey] = useState<{r: number, k: number} | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const typeKey = () => {
        // Randomly pick a key
        const r = Math.floor(Math.random() * rowConfig.length)
        const k = Math.floor(Math.random() * rowConfig[r].keys.length)
        
        setAutoPressedKey({ r, k })

        // Release after short delay
        setTimeout(() => {
            setAutoPressedKey(null)
        }, 150) // Press duration

        // Schedule next press
        const nextPressDelay = Math.random() * 300 + 100 // Speed of typing
        timeoutId = setTimeout(typeKey, nextPressDelay)
    }

    typeKey()

    return () => clearTimeout(timeoutId)
  }, []) // Remove dependencies to simulate continuous typing

  const keys = []
  
  for(let r = 0; r < rowConfig.length; r++) {
      const row = rowConfig[r]
      let currentX = 0
      for(let k = 0; k < row.keys.length; k++) {
          const kWidth = row.keys[k]
          const cx = currentX + (kWidth * UNIT / 2)
          
          // Light Mode / Dark Mode Palette
          // Dark: slate-800 keys, slate-950 mods
          // Light: white keys, slate-200 mods
          let kColor = isDark ? "#1e293b" : "#ffffff" 
          let kActive = isDark ? "#0ea5e9" : "#38bdf8" 
          
          // Modifiers
          if (kWidth > 1 || r === 4) {
             kColor = isDark ? "#0f172a" : "#e2e8f0"
          }
          
          // Fancy Colors configuration
          if (r === 0 && k === 0) { kColor = "#f43f5e"; kActive = "#fda4af" } // Esc (Rose) - Keep same
          if (r === 2 && k === row.keys.length -1) { kColor = "#8b5cf6"; kActive = "#c4b5fd" } // Enter (Violet) - Keep same
          if (r === 4 && k === 2) { kColor = isDark ? "#e2e8f0" : "#f8fafc"; kActive = "#ffffff" } // Space
          
          // Arrow cluster accents - keep subtle
          if (r === 3 && k > 10) { kColor = isDark ? "#334155" : "#f1f5f9" }
          
          const isAuto = autoPressedKey?.r === r && autoPressedKey?.k === k

          keys.push(
              <Key 
                key={`k-${r}-${k}`} 
                position={[cx, 0.4, row.y]} 
                width={kWidth} 
                color={kColor}
                activeColor={kActive}
                isAutoPressed={isAuto}
              />
          )
          
          currentX += kWidth * UNIT
      }
  }
  
  return (
    <group>
        {/* Case */}
        <mesh position={[6.75, 0, 0]} receiveShadow>
            {/* Main body */}
            <boxGeometry args={[14.8, 0.7, 5.8]} />
            <meshStandardMaterial 
                color={isDark ? "#020617" : "#cbd5e1"} 
                roughness={0.7} 
                metalness={0.1}
            />
        </mesh>
        
        {/* Underglow fake */}
        <pointLight position={[6.75, -2, 0]} color="#0ea5e9" intensity={2} distance={15} />

        <group position={[0, 0, 0]}>
            {keys}
        </group>
    </group>
  )
}

function Scene({ isDark }: { isDark: boolean }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 15, 20]} fov={25} />
            
            {/* Hemisphere Light - Brighter in light mode */}
            <hemisphereLight intensity={isDark ? 0.5 : 0.8} color="#ffffff" groundColor={isDark ? "#000000" : "#cbd5e1"} />
            
            <ambientLight intensity={1.5} />
            
            {/* Key Light (Top Right) - Boosted intensity */}
            <directionalLight 
                position={[5, 15, 5]} 
                intensity={3} 
                castShadow 
                shadow-mapSize={[1024, 1024]} 
            />
            
            {/* Fill Light (Top Left - Warm) */}
            <spotLight 
                position={[-10, 15, 10]} 
                angle={0.5} 
                penumbra={1} 
                intensity={2} 
                color="#e0e7ff" 
            />
            
            {/* Rim Lights */}
            <pointLight position={[-10, 2, -5]} intensity={8} color="#d946ef" distance={30} />
            <pointLight position={[10, 2, -5]} intensity={8} color="#0ea5e9" distance={30} />

            <Float 
                speed={2} 
                rotationIntensity={0} 
                floatIntensity={0.5} 
            >
                <Center top>
                    <group rotation={[0.1, -0.25, 0]}>
                        <HHKBModel isDark={isDark} />
                    </group>
                </Center>
            </Float>

            <ContactShadows 
                position={[0, -2, 0]} 
                opacity={0.4} 
                scale={40} 
                blur={2.5} 
                far={4.5} 
                color="#000000" 
            />

            <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 2}
                autoRotate={false} 
            />
        </>
    )
}

export default function HHKB3D() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  )
}
