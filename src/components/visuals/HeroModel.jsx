import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn("3D Model failed to load, falling back to SVG.", error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Model({ prefersReducedMotion }) {
  const { scene } = useGLTF("/models/model.glb");
  
  return (
    <Float 
      speed={prefersReducedMotion ? 0 : 2} 
      rotationIntensity={prefersReducedMotion ? 0 : 0.5} 
      floatIntensity={prefersReducedMotion ? 0 : 1}
    >
      <primitive object={scene} scale={2.5} position={[0, -2, 0]} />
    </Float>
  );
}

// Pre-load the model to avoid waterfall if possible
useGLTF.preload("/models/model.glb");

function FallbackVisual({ prefersReducedMotion }) {
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
    },
  };
  const ringRotate1 = {
    animate: {
      rotateX: [60, 60], rotateY: [0, 360], rotateZ: [0, 360],
      transition: { duration: 20, ease: "linear", repeat: Infinity },
    },
  };
  const ringRotate2 = {
    animate: {
      rotateX: [60, 60], rotateY: [0, -360], rotateZ: [0, -360],
      transition: { duration: 25, ease: "linear", repeat: Infinity },
    },
  };
  const pulseVariants = {
    animate: {
      opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
    },
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent pointer-events-none" />
      <motion.div 
        variants={prefersReducedMotion ? {} : floatVariants}
        animate="animate"
        className="relative z-10 w-64 h-80 flex items-center justify-center perspective-[1000px]"
      >
        <div className="absolute inset-0 flex items-center justify-center preserve-3d">
          <motion.div variants={prefersReducedMotion ? {} : ringRotate1} animate="animate" className="absolute w-48 h-48 border border-primary-500/30 rounded-full" style={{ borderTopWidth: '2px', borderBottomWidth: '2px' }} />
          <motion.div variants={prefersReducedMotion ? {} : ringRotate2} animate="animate" className="absolute w-56 h-56 border border-primary-500/20 rounded-full opacity-70" style={{ borderLeftWidth: '2px', borderRightWidth: '2px' }} />
        </div>
        <div className="relative z-20 flex flex-col items-center drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          <svg width="200" height="250" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyber-grad" x1="0" y1="0" x2="0" y2="250">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path d="M60 50 L140 50 L160 120 L180 250 L20 250 L40 120 Z" fill="url(#cyber-grad)" opacity="0.1" />
            <path d="M70 60 L130 60 L150 110 L140 180 L100 200 L60 180 L50 110 Z" fill="#050505" stroke="url(#cyber-grad)" strokeWidth="2" />
            <motion.circle cx="100" cy="110" r="12" fill="#c4b5fd" filter="url(#glow)" variants={prefersReducedMotion ? {} : pulseVariants} animate="animate" />
            <circle cx="100" cy="110" r="18" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M85 30 L115 30 L120 60 L100 75 L80 60 Z" fill="#050505" stroke="#8b5cf6" strokeWidth="2" />
            <path d="M85 45 L115 45 L110 55 L90 55 Z" fill="#c4b5fd" filter="url(#glow)" />
            <path d="M100 135 L100 180 M90 145 L110 145 M85 160 L115 160" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroModel() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[480px] xl:h-[540px] flex items-center justify-center overflow-visible">
      
      <ErrorBoundary fallback={<FallbackVisual prefersReducedMotion={prefersReducedMotion} />}>
        <Suspense fallback={<FallbackVisual prefersReducedMotion={prefersReducedMotion} />}>
          <Canvas 
            camera={{ position: [0, 1, 6], fov: 40 }}
            className="w-full h-full"
            style={{ pointerEvents: 'auto', background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color="#c4b5fd" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
            
            <Model prefersReducedMotion={prefersReducedMotion} />
            
            <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#8b5cf6" />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={!prefersReducedMotion}
              autoRotateSpeed={1.0}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
