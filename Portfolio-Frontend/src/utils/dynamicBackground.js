import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DynamicBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Shader uniforms
    const uniforms = {
      uTime: { value: 0 },
      color1: { value: new THREE.Color(0x6a85b6) }, // Soft Blue
      color2: { value: new THREE.Color(0xbac8e0) }, // Pale Sky
    };

    // Shader Material
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;

      void main() {
        float swirl = sin(4.0 * (vUv.x + vUv.y) + uTime) * 0.5 + 0.5;
        vec3 color = mix(color1, color2, swirl);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.uTime.value += 0.02;
      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement); // Cleanup renderer on unmount
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="background-container"
    ></div>
  );
};

export default DynamicBackground;
