import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  Float, 
  Points, 
  PointMaterial 
} from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// PARTICLE CLOUD COMPONENT - DATA DUST FIELD
// --------------------------------------------------------
const ParticleCloud = ({ count = 600 }) => {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorPrimary = new THREE.Color('#00E5FF'); // Laser Cyber Cyan
    const colorSecondary = new THREE.Color('#FF5B00'); // Hazard Orange

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 3.2 + Math.random() * 4.8; // Dynamic bounding field

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 0.5;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = colorPrimary.clone().lerp(colorSecondary, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.008) * 0.04;
    }
  });

  return (
    <Points ref={points} positions={positions} colors={colors}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={0.06} 
        sizeAttenuation={true} 
        depthWrite={false}
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// --------------------------------------------------------
// WELDING SPARKS PARTICLE FIELD
// Renders physical sparks cascading downwards from the weld contact
// --------------------------------------------------------
const SparksField = ({ active, targetPos }: { active: boolean; targetPos: THREE.Vector3 }) => {
  const sparksRef = useRef<THREE.Group>(null);
  const sparkRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const sparkVelocities = useMemo(() => {
    return Array.from({ length: 12 }).map(() => new THREE.Vector3(
      (Math.random() - 0.5) * 1.5,
      (Math.random() * 1.5 + 0.8), // upward lift initially
      (Math.random() - 0.5) * 1.5
    ));
  }, []);

  useFrame((state, delta) => {
    if (!sparksRef.current) return;
    
    if (!active) {
      sparksRef.current.visible = false;
      return;
    }
    sparksRef.current.visible = true;

    sparkRefs.current.forEach((spark, i) => {
      if (!spark) return;
      
      // Move spark along velocity vector
      spark.position.addScaledVector(sparkVelocities[i], delta * 1.8);
      
      // Gravity acceleration pulling sparks downward
      sparkVelocities[i].y -= delta * 4.2;

      // Shrink scales over time
      const scale = spark.scale.x - delta * 0.9;
      if (scale <= 0) {
        // Reset back to nozzle emission contact point
        spark.position.copy(targetPos);
        spark.scale.setScalar(0.06 + Math.random() * 0.06);
        sparkVelocities[i].set(
          (Math.random() - 0.5) * 2.2,
          (Math.random() * 1.6 + 0.6),
          (Math.random() - 0.5) * 2.2
        );
      } else {
        spark.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={sparksRef}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (sparkRefs.current[i] = el)}
          position={targetPos.toArray()}
          scale={0.06}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#FF9900" />
        </mesh>
      ))}
    </group>
  );
};

// --------------------------------------------------------
// PROCEDURAL 3D ROBOT DRONE COMPONENT - "IN THE WORKING"
// Styled with Carbon Steel, Laser Cyan and Hazard Orange
// Features procedural welding, flashing sparks, and active hover tracking!
// --------------------------------------------------------
const RobotModel = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;
  const robotPositionX = isMobile ? 0 : 1.35;

  const robotGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const baseCogRef = useRef<THREE.Mesh>(null);
  const gearRingRef = useRef<THREE.Mesh>(null);

  // Welding visual refs
  const weldingBeamRef = useRef<THREE.Mesh>(null);
  const weldingLightRef = useRef<THREE.PointLight>(null);
  const blueprintCogRef = useRef<THREE.Group>(null);

  // State loops for welding activity (working rhythm)
  const [isWelding, setIsWelding] = useState(true);
  const weldContactPos = useMemo(() => new THREE.Vector3(0.0, -0.32, 0.55), []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Robotic active working cycles (3s welding / 2s inspecting)
    const cycle = Math.floor(elapsed) % 5;
    const weldingActive = cycle < 3;
    if (weldingActive !== isWelding) {
      setIsWelding(weldingActive);
    }

    // 2. Hover floating bobbing (levitation mechanical system)
    const bobOffset = Math.sin(elapsed * 1.5) * 0.12;
    if (robotGroupRef.current) {
      robotGroupRef.current.position.y = bobOffset;
      robotGroupRef.current.position.x = robotPositionX;
    }

    // 3. Head & chest alignment tracking mouse (interactive telemetry)
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    if (headRef.current) {
      // Robot focuses head slightly on pointer, but maintains gaze near weld zone if active
      const targetHeadY = weldingActive 
        ? THREE.MathUtils.lerp(mouseX * 0.3, 0, 0.5) 
        : mouseX * 0.5;
      
      const targetHeadX = weldingActive 
        ? THREE.MathUtils.lerp(-mouseY * 0.2, 0.2, 0.5) // looks down at weld cog
        : -mouseY * 0.3;

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, 0.08);
    }

    if (robotGroupRef.current) {
      const targetTorsoY = mouseX * 0.12;
      robotGroupRef.current.rotation.y = THREE.MathUtils.lerp(robotGroupRef.current.rotation.y, targetTorsoY, 0.08);
    }

    // 4. Scanner visor pulsing diagnostics
    if (scannerRef.current) {
      const material = scannerRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.5 + Math.sin(elapsed * 8) * 0.35 + (Math.random() * 0.08);
      }
    }

    // 5. Procedural welding arm movements ("IN THE WORKING")
    if (leftArmRef.current) {
      if (weldingActive) {
        // Points welding arm tool directly at the blueprint cog contact spot
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.25 + Math.sin(elapsed * 15) * 0.02, 0.1);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, -0.4, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.15, 0.1);
      } else {
        // Neutral inspecting rest pose
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(elapsed * 1.5) * 0.1, 0.05);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0.0, 0.05);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -Math.PI / 6, 0.05);
      }
    }

    // Right arm stabilizing balance pose
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.PI / 6 - Math.sin(elapsed * 1.5) * 0.06;
      rightArmRef.current.rotation.x = -Math.cos(elapsed * 1.0) * 0.08;
    }

    // 6. Laser welding beam visual flashes & point lighting
    if (weldingBeamRef.current) {
      weldingBeamRef.current.visible = weldingActive;
      if (weldingActive) {
        // High frequency laser width oscillation
        const beamScale = 0.8 + Math.sin(elapsed * 45) * 0.2;
        weldingBeamRef.current.scale.set(beamScale, beamScale, 1.0);
      }
    }

    if (weldingLightRef.current) {
      weldingLightRef.current.intensity = weldingActive 
        ? 3.5 + Math.sin(elapsed * 60) * 1.5 + (Math.random() * 0.5)
        : 0;
    }

    // Spin blueprint blueprint cog
    if (blueprintCogRef.current) {
      blueprintCogRef.current.rotation.z = elapsed * 0.35;
    }

    // Spin mechanical cogs in support base
    if (baseCogRef.current) {
      baseCogRef.current.rotation.z = elapsed * 0.6;
    }
    if (gearRingRef.current) {
      gearRingRef.current.rotation.z = -elapsed * 0.25;
    }
  });

  return (
    <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.15}>
      <group ref={robotGroupRef} position={[0, 0.5, 0]}>
        
        {/* ========================================================
            1. ROBOT HEAD ASSEMBLY (Helmet visor scan)
            ======================================================== */}
        <group ref={headRef} position={[0, 0.4, 0]}>
          {/* Main Skull shell */}
          <mesh castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhysicalMaterial
              color="#1C1F26" // Carbon steel panel
              metalness={0.9}
              roughness={0.15}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
            />
          </mesh>

          {/* Crest Armor Plate */}
          <mesh position={[0, 0.3, -0.05]} scale={[1, 0.4, 1.2]}>
            <sphereGeometry args={[0.42, 16, 16]} />
            <meshPhysicalMaterial
              color="#FF5B00" // Hazard Orange accent
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>

          {/* Head Side Joints */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
            <meshPhysicalMaterial color="#FF5B00" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
            <meshPhysicalMaterial color="#FF5B00" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Cyber Antenna rods */}
          <group position={[-0.54, 0.25, -0.05]} rotation={[0, 0, -0.15]}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
              <meshPhysicalMaterial color="#14161B" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#00E5FF" />
            </mesh>
          </group>
          <group position={[0.54, 0.25, -0.05]} rotation={[0, 0, 0.15]}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
              <meshPhysicalMaterial color="#14161B" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#00E5FF" />
            </mesh>
          </group>

          {/* Visor shield */}
          <mesh position={[0, 0.06, 0.36]}>
            <boxGeometry args={[0.66, 0.16, 0.18]} />
            <meshPhysicalMaterial color="#0D0E11" metalness={0.95} roughness={0.3} clearcoat={1.0} />
          </mesh>
          {/* Laser Visor Cyclops scan line */}
          <mesh ref={scannerRef} position={[0, 0.06, 0.46]}>
            <boxGeometry args={[0.56, 0.06, 0.01]} />
            <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* ========================================================
            2. ROBOT TORSO & CHEST REACTOR
            ======================================================== */}
        <group position={[0, -0.45, 0]}>
          {/* Outer Chest casing */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.48, 0.36, 0.95, 16]} />
            <meshPhysicalMaterial
              color="#14161B"
              metalness={0.92}
              roughness={0.2}
              clearcoat={0.7}
            />
          </mesh>

          {/* Reactor ring */}
          <mesh position={[0, 0.1, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.18, 0.04, 16, 32]} />
            <meshPhysicalMaterial color="#FF5B00" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Reactor Core sphere */}
          <mesh position={[0, 0.1, 0.32]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#FF5B00" />
          </mesh>

          {/* Warning stripe overlays */}
          <mesh position={[0, -0.32, 0.36]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.24, 0.04, 0.02]} />
            <meshBasicMaterial color="#FFD200" />
          </mesh>
          <mesh position={[0, -0.38, 0.36]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.24, 0.04, 0.02]} />
            <meshBasicMaterial color="#0D0E11" />
          </mesh>
        </group>

        {/* ========================================================
            3. ARTICULATED KINETIC ARMS (Working appendange)
            ======================================================== */}
        
        {/* LEFT ARM (WELDER APPENDAGE - "IN THE WORKING") */}
        <group ref={leftArmRef} position={[-0.62, -0.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshPhysicalMaterial color="#FF5B00" metalness={0.9} roughness={0.1} />
          </mesh>
          <group position={[-0.15, -0.2, 0]} rotation={[0, 0, 0.2]}>
            <mesh>
              <cylinderGeometry args={[0.055, 0.045, 0.45, 8]} />
              <meshPhysicalMaterial color="#1C1F26" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh position={[0, -0.225, 0]}>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshPhysicalMaterial color="#00E5FF" metalness={0.95} />
            </mesh>
            <group position={[0, -0.4, 0]}>
              {/* Forearm cylinder welder shaft */}
              <mesh>
                <cylinderGeometry args={[0.045, 0.038, 0.36, 8]} />
                <meshPhysicalMaterial color="#14161B" metalness={0.9} />
              </mesh>
              
              {/* Cybernetic Welder Nozzle Tool (instead of hand claws) */}
              <group position={[0, -0.22, 0]}>
                {/* Nozzle body */}
                <mesh>
                  <cylinderGeometry args={[0.04, 0.015, 0.12, 8]} />
                  <meshPhysicalMaterial color="#FF5B00" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Glowing cyan lens tip */}
                <mesh position={[0, -0.065, 0]}>
                  <sphereGeometry args={[0.02, 8, 8]} />
                  <meshBasicMaterial color="#00E5FF" />
                </mesh>

                {/* Cybernetic Welding Laser Beam (thin neon cylinder extending to cog) */}
                <mesh 
                  ref={weldingBeamRef} 
                  position={[0.26, -0.28, 0.4]} 
                  rotation={[0.35, -0.48, 0.0]}
                >
                  <cylinderGeometry args={[0.018, 0.005, 0.65, 8]} />
                  <meshBasicMaterial color="#00E5FF" transparent opacity={0.9} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* RIGHT ARM (SUPPORT PIECE) */}
        <group ref={rightArmRef} position={[0.62, -0.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshPhysicalMaterial color="#FF5B00" metalness={0.9} roughness={0.1} />
          </mesh>
          <group position={[0.15, -0.2, 0]} rotation={[0, 0, -0.2]}>
            <mesh>
              <cylinderGeometry args={[0.055, 0.045, 0.45, 8]} />
              <meshPhysicalMaterial color="#1C1F26" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh position={[0, -0.225, 0]}>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshPhysicalMaterial color="#00E5FF" metalness={0.95} />
            </mesh>
            <group position={[0, -0.4, 0]}>
              <mesh>
                <cylinderGeometry args={[0.045, 0.038, 0.36, 8]} />
                <meshPhysicalMaterial color="#14161B" metalness={0.9} />
              </mesh>
              <mesh position={[0, -0.18, 0]}>
                <boxGeometry args={[0.07, 0.07, 0.07]} />
                <meshPhysicalMaterial color="#FF5B00" metalness={0.9} />
              </mesh>
              <mesh position={[-0.025, -0.24, 0]}>
                <boxGeometry args={[0.016, 0.06, 0.036]} />
                <meshBasicMaterial color="#00E5FF" />
              </mesh>
              <mesh position={[0.025, -0.24, 0]}>
                <boxGeometry args={[0.016, 0.06, 0.036]} />
                <meshBasicMaterial color="#00E5FF" />
              </mesh>
            </group>
          </group>
        </group>

        {/* ========================================================
            4. BLUEPRINT COG UNDER CONSTRUCTION ("WORKING ZONE")
            ======================================================== */}
        <group ref={blueprintCogRef} position={weldContactPos.toArray()} rotation={[Math.PI / 4, 0, 0]}>
          {/* Cyber grid cogs */}
          <mesh>
            <torusGeometry args={[0.26, 0.018, 8, 8]} />
            <meshBasicMaterial color="#00E5FF" wireframe />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 8]}>
            <ringGeometry args={[0.04, 0.24, 8, 1]} />
            <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Dynamic bright flashing welding light at the weld node */}
        <pointLight
          ref={weldingLightRef}
          position={weldContactPos.toArray()}
          color="#FF7A00"
          distance={2.5}
          decay={1.8}
        />

        {/* Welding sparks field particle emitter */}
        <SparksField active={isWelding} targetPos={weldContactPos} />

        {/* ========================================================
            5. SUPPORTING BASE STRUCTURE (Rotating gears)
            ======================================================== */}
        <group position={[0, -1.2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.26, 0.42, 0.5, 16]} />
            <meshPhysicalMaterial color="#1C1F26" metalness={0.92} roughness={0.25} />
          </mesh>

          <mesh ref={baseCogRef} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.38, 0.05, 8, 8]} />
            <meshPhysicalMaterial
              color="#00E5FF"
              metalness={0.95}
              roughness={0.1}
              emissive="#00E5FF"
              emissiveIntensity={0.25}
            />
          </mesh>

          <mesh ref={gearRingRef} position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.46, 0.04, 16, 16]} />
            <meshPhysicalMaterial
              color="#FF5B00"
              metalness={0.9}
              roughness={0.15}
              emissive="#FF5B00"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
        
      </group>
    </Float>
  );
};

// --------------------------------------------------------
// MAIN SCENE CONTAINER
// --------------------------------------------------------
const Scene = () => {
  return (
    <>
      {/* Industrial lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 12, 5]} intensity={2.0} color="#FF5B00" />
      <directionalLight position={[-8, -12, -4]} intensity={1.4} color="#00E5FF" />
      <pointLight position={[0, 2, 2]} intensity={1.5} color="#00E5FF" />
      
      {/* 3D Working Robot Drone */}
      <RobotModel />
      
      {/* Telemetry data bit particles */}
      <ParticleCloud count={600} />

      <Environment preset="city" />
    </>
  );
};

export default Scene;
