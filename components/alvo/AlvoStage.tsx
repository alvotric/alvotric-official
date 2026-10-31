"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Interactive 3D graph of connected automations. three.js is imported on demand so it never
 * weighs on the first paint, and the page falls back to the logo when WebGL is unavailable.
 */
export function AlvoStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const noGL = () => {
      stage.classList.add("nogl");
      canvas.style.display = "none";
    };

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        // Match the look the design was made with (plain sRGB values, no extra tone mapping).
        THREE.ColorManagement.enabled = false;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, 9);

        scene.add(new THREE.AmbientLight(0xcfe2ff, 0.9 * Math.PI));
        const key = new THREE.DirectionalLight(0xffffff, 1.4 * Math.PI);
        key.position.set(4, 5, 6);
        scene.add(key);
        const rim = new THREE.PointLight(0x2f8bff, 2.2 * Math.PI, 30, 1);
        rim.position.set(-5, -2, 4);
        scene.add(rim);
        const rim2 = new THREE.PointLight(0x9a7bff, 0.9 * Math.PI, 30, 1);
        rim2.position.set(5, -4, -2);
        scene.add(rim2);

        const root = new THREE.Group();
        scene.add(root);

        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.25, 1),
          new THREE.MeshPhysicalMaterial({
            color: 0x2a76ff,
            metalness: 0.15,
            roughness: 0.18,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            flatShading: true,
            emissive: 0x0b3fb8,
            emissiveIntensity: 0.35,
          }),
        );
        root.add(core);
        const shell = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.7, 1),
          new THREE.MeshBasicMaterial({ color: 0x6aa8ff, wireframe: true, transparent: true, opacity: 0.35 }),
        );
        root.add(shell);
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(1.05, 24, 24),
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 }),
        );
        root.add(halo);

        const ringMat = new THREE.MeshBasicMaterial({ color: 0x7fb2ff, transparent: true, opacity: 0.55 });
        const rings: InstanceType<typeof THREE.Mesh>[] = [];
        (
          [
            [2.6, 0.2, 0],
            [3.1, 1.1, 0.6],
            [3.6, -0.7, 1.2],
          ] as const
        ).forEach(([radius, rx, ry]) => {
          const r = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 160), ringMat);
          r.rotation.x = Math.PI / 2 + rx;
          r.rotation.y = ry;
          root.add(r);
          rings.push(r);
        });

        const nodeGeo = new THREE.SphereGeometry(0.2, 24, 24);
        const octGeo = new THREE.OctahedronGeometry(0.26);
        const nodeMats = [
          new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.2, clearcoat: 1, emissive: 0x2f8bff, emissiveIntensity: 0.55 }),
          new THREE.MeshPhysicalMaterial({ color: 0x66b5ff, roughness: 0.2, clearcoat: 1, emissive: 0x1f6bff, emissiveIntensity: 0.5 }),
        ];
        const N = 9;
        const radii = [2.6, 3.1, 3.6];
        const nodes = Array.from({ length: N }, (_, i) => {
          const ringIdx = i % 3;
          const mesh = new THREE.Mesh(i % 4 === 0 ? octGeo : nodeGeo, nodeMats[i % 2]);
          root.add(mesh);
          return {
            mesh,
            ring: rings[ringIdx],
            radius: radii[ringIdx],
            angle: (i / N) * Math.PI * 2 * 1.7,
            speed: (0.18 + 0.07 * ringIdx) * (ringIdx === 1 ? -1 : 1),
          };
        });

        const linePos = new Float32Array(N * 2 * 2 * 3);
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
        const lines = new THREE.LineSegments(
          lineGeo,
          new THREE.LineBasicMaterial({ color: 0x7db1ff, transparent: true, opacity: 0.55 }),
        );
        lines.frustumCulled = false;
        root.add(lines);

        const dustN = 160;
        const dp = new Float32Array(dustN * 3);
        for (let d = 0; d < dustN; d++) {
          const rr = 4 + Math.random() * 3;
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          dp[d * 3] = rr * Math.sin(ph) * Math.cos(th);
          dp[d * 3 + 1] = rr * Math.sin(ph) * Math.sin(th);
          dp[d * 3 + 2] = rr * Math.cos(ph);
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
        const dust = new THREE.Points(
          dustGeo,
          new THREE.PointsMaterial({ color: 0x4d93ff, size: 0.05, transparent: true, opacity: 0.7 }),
        );
        root.add(dust);

        const v = new THREE.Vector3();
        const placeNodes = (t: number) => {
          root.updateMatrixWorld(true);
          const pos = nodes.map((n) => {
            const a = n.angle + t * n.speed;
            v.set(Math.cos(a) * n.radius, Math.sin(a) * n.radius, 0);
            n.ring.localToWorld(v);
            root.worldToLocal(v);
            n.mesh.position.copy(v);
            n.mesh.rotation.y = t * 0.8;
            n.mesh.rotation.x = t * 0.5;
            return n.mesh.position;
          });
          let k = 0;
          for (let j = 0; j < pos.length; j++) {
            const nx = pos[(j + 1) % pos.length];
            linePos[k++] = 0;
            linePos[k++] = 0;
            linePos[k++] = 0;
            linePos[k++] = pos[j].x;
            linePos[k++] = pos[j].y;
            linePos[k++] = pos[j].z;
            linePos[k++] = pos[j].x;
            linePos[k++] = pos[j].y;
            linePos[k++] = pos[j].z;
            linePos[k++] = nx.x;
            linePos[k++] = nx.y;
            linePos[k++] = nx.z;
          }
          lineGeo.attributes.position.needsUpdate = true;
        };

        const resize = () => {
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.position.z = w < 420 ? 11.5 : 9.6;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(stage);

        let tx = 0;
        let ty = 0;
        let cx = 0;
        let cy = 0;
        const onMove = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          tx = Math.max(-1.4, Math.min(1.4, ((e.clientX - r.left) / r.width - 0.5) * 2));
          ty = Math.max(-1.4, Math.min(1.4, ((e.clientY - r.top) / r.height - 0.5) * 2));
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        let visible = true;
        const io = new IntersectionObserver((es) => {
          visible = es[0].isIntersecting;
        });
        io.observe(stage);

        const start = performance.now();
        let raf = 0;
        const frame = () => {
          raf = requestAnimationFrame(frame);
          if (!visible) return;
          const t = reduce ? 0 : (performance.now() - start) / 1000;
          cx += (tx - cx) * 0.05;
          cy += (ty - cy) * 0.05;
          root.rotation.y = t * 0.15 + cx * 0.55;
          root.rotation.x = -0.25 + cy * 0.35;
          core.rotation.y = t * 0.35;
          core.rotation.x = t * 0.2;
          shell.rotation.y = -t * 0.2;
          shell.rotation.z = t * 0.1;
          halo.scale.setScalar(1 + Math.sin(t * 1.6) * 0.025);
          dust.rotation.y = t * 0.03;
          placeNodes(t);
          renderer.render(scene, camera);
        };
        frame();

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          window.removeEventListener("pointermove", onMove);
          scene.traverse((obj) => {
            const mesh = obj as InstanceType<typeof THREE.Mesh>;
            mesh.geometry?.dispose?.();
          });
          [ringMat, ...nodeMats].forEach((m) => m.dispose());
          renderer.dispose();
        };
      } catch {
        if (!disposed) noGL();
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="stage" ref={stageRef}>
      <canvas ref={canvasRef} aria-label="Interactive 3D graph of connected automations" role="img" />
      <div className="fallback">
        <Image src="/icon.svg" alt="" width={300} height={300} />
      </div>
      <div className="chip3d c1"><b />invoice-sync · success</div>
      <div className="chip3d c2"><b />lead-routing · running</div>
      <div className="chip3d c3"><b />nightly-backup · 02:00</div>
    </div>
  );
}
