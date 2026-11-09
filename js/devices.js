// Optional, self-hosted 3D enhancement. The original project images remain the fallback.
import * as THREE from "../assets/vendor/three.module.min.js";
import { devicePose } from "./scene-timeline.js";

function roundedPanel(width, height, depth, material) {
  const radius = 0.08,
    x = -width / 2,
    y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: 4,
  });
  return new THREE.Mesh(geometry, material);
}

async function buildLaptop(imageSource) {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({
    color: "#686560",
    metalness: 0.72,
    roughness: 0.3,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: "#151515",
    metalness: 0.35,
    roughness: 0.35,
  });
  const base = roundedPanel(4.5, 2.75, 0.09, metal);
  base.rotation.x = -Math.PI / 2;
  base.position.y = 0.01;
  group.add(base);
  const lid = new THREE.Group();
  lid.position.set(0, 0.14, -1.22);
  lid.rotation.x = -0.12;
  const back = roundedPanel(4.45, 2.7, 0.075, dark);
  back.position.y = 1.31;
  lid.add(back);
  const bevel = roundedPanel(
    4.2,
    2.42,
    0.012,
    new THREE.MeshStandardMaterial({
      color: "#0a0a0a",
      metalness: 0.5,
      roughness: 0.2,
    }),
  );
  bevel.position.set(0, 1.32, 0.085);
  lid.add(bevel);
  const screenImage = await new THREE.TextureLoader().loadAsync(imageSource);
  screenImage.colorSpace = THREE.SRGBColorSpace;
  screenImage.anisotropy = 4;
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(4.08, 2.29),
    new THREE.MeshBasicMaterial({ map: screenImage, toneMapped: false }),
  );
  screen.position.set(0, 1.32, 0.16);
  lid.add(screen);
  group.add(lid);
  const hinge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 3.9, 12),
    metal,
  );
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, 0.14, -1.19);
  group.add(hinge);
  const keyboardMaterial = new THREE.MeshStandardMaterial({
    color: "#121212",
    roughness: 0.55,
    metalness: 0.2,
  });
  const keyGeometry = new THREE.BoxGeometry(0.265, 0.035, 0.19);
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 13; col++) {
      const key = new THREE.Mesh(keyGeometry, keyboardMaterial);
      key.position.set(-1.85 + col * 0.307, 0.13, -0.87 + row * 0.25);
      group.add(key);
    }
  }
  const labels = document.createElement("canvas");
  labels.width = 1024;
  labels.height = 512;
  const context = labels.getContext("2d");
  context.fillStyle = "#e2ded9";
  context.font = "17px sans-serif";
  context.textAlign = "center";
  [
    "1234567890-=⌫",
    "QWERTYUIOP[]\\",
    "ASDFGHJKL;'↵",
    "ZXCVBNM,./↑··",
    "·············",
  ].forEach((row, y) =>
    [...row]
      .slice(0, 13)
      .forEach((letter, x) =>
        context.fillText(letter, 34 + x * 79, 60 + y * 94),
      ),
  );
  const labelTexture = new THREE.CanvasTexture(labels);
  labelTexture.colorSpace = THREE.SRGBColorSpace;
  const labelPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 1.25),
    new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      depthWrite: false,
    }),
  );
  labelPlane.rotation.x = -Math.PI / 2;
  labelPlane.position.set(0, 0.152, -0.38);
  group.add(labelPlane);
  const trackpad = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.012, 0.66),
    new THREE.MeshStandardMaterial({
      color: "#77716a",
      metalness: 0.55,
      roughness: 0.45,
    }),
  );
  trackpad.position.set(0, 0.115, 0.79);
  group.add(trackpad);
  const lip = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.016, 0.07), dark);
  lip.position.set(0, 0.1, 1.36);
  group.add(lip);
  group.rotation.y = -0.2;
  return group;
}

function buildKeyboard() {
  const group = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({
    color: "#a19a90",
    metalness: 0.65,
    roughness: 0.32,
  });
  const base = roundedPanel(4.7, 1.85, 0.22, shell);
  base.rotation.x = -Math.PI / 2;
  group.add(base);
  const dark = new THREE.MeshStandardMaterial({
    color: "#181716",
    roughness: 0.45,
  });
  const light = new THREE.MeshStandardMaterial({
    color: "#d6cfc5",
    roughness: 0.45,
  });
  const keyGeometry = new THREE.BoxGeometry(0.285, 0.13, 0.265);
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 14; col++) {
      const key = new THREE.Mesh(
        keyGeometry,
        row === 0 || col === 0 || col === 13 ? light : dark,
      );
      key.position.set(-2.12 + col * 0.322, 0.27, -0.72 + row * 0.32);
      group.add(key);
    }
  const legends = document.createElement("canvas");
  legends.width = 1400;
  legends.height = 500;
  const ink = legends.getContext("2d");
  ink.textAlign = "center";
  ink.textBaseline = "middle";
  ink.font = "500 31px Arial, sans-serif";
  const rows = [
    ["Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", ""],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    [
      "Caps",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ";",
      "'",
      "Enter",
      "Del",
    ],
    [
      "Shift",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      ",",
      ".",
      "/",
      "Up",
      "Shift",
      "Fn",
    ],
    [
      "Ctrl",
      "Win",
      "Alt",
      "",
      "",
      "",
      "Space",
      "",
      "",
      "Alt",
      "Left",
      "Down",
      "Right",
      "Ctrl",
    ],
  ];
  rows.forEach((row, y) =>
    row.forEach((label, x) => {
      ink.fillStyle = y === 0 || x === 0 || x === 13 ? "#181716" : "#f0ece6";
      ink.fillText(label, 50 + x * 100, 50 + y * 100, 86);
    }),
  );
  const legendTexture = new THREE.CanvasTexture(legends);
  legendTexture.colorSpace = THREE.SRGBColorSpace;
  const legendPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(4.508, 1.6),
    new THREE.MeshBasicMaterial({
      map: legendTexture,
      transparent: true,
      depthWrite: false,
    }),
  );
  legendPlane.rotation.x = -Math.PI / 2;
  legendPlane.position.set(-0.027, 0.339, -0.08);
  group.add(legendPlane);
  const knob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, 0.22, 24),
    shell,
  );
  knob.position.set(2.12, 0.33, -0.72);
  group.add(knob);
  return group;
}

async function mountDevice(element, imageSource, small = false) {
  if (element.dataset.deviceState) return;
  element.dataset.deviceState = "loading";
  let renderer;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    if (!context) {
      element.dataset.deviceState = "fallback";
      return;
    }
    renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight("#ffffff", "#78614e", 2.6));
    const key = new THREE.DirectionalLight("#ffffff", 4);
    key.position.set(-3, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight("#c7a183", 3);
    rim.position.set(4, 3, -4);
    scene.add(rim);
    const fill = new THREE.DirectionalLight("#ffffff", 1.4);
    fill.position.set(4, 1, 5);
    scene.add(fill);
    const keyboard = element.classList.contains("experience-object");
    const model = keyboard ? buildKeyboard() : await buildLaptop(imageSource);
    if (small) {
      const box = new THREE.Box3().setFromObject(model),
        center = box.getCenter(new THREE.Vector3()),
        dimensions = box.getSize(new THREE.Vector3());
      model.position.sub(center);
      const pivot = new THREE.Group();
      pivot.add(model);
      pivot.scale.setScalar(
        (keyboard ? 2.05 : 1.36) /
          Math.max(dimensions.x, dimensions.y, dimensions.z),
      );
      scene.add(pivot);
    }
    if (!small) scene.add(model);
    const rotating = small ? model.parent : model;
    if (!element.isConnected) {
      scene.traverse((item) => {
        item.geometry?.dispose();
        if (item.material) {
          item.material.map?.dispose();
          item.material.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      return;
    }
    const camera = new THREE.PerspectiveCamera(
      small ? (keyboard ? 44 : 38) : 35,
      1,
      0.1,
      50,
    );
    if (small) {
      camera.position.set(0, 0, keyboard ? 3.8 : 4.4);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(1.8, 2.8, 5.3);
      camera.lookAt(0, 1.05, 0);
      camera.zoom = 1.5;
    }
    if (small) camera.zoom = 1.18;
    camera.updateProjectionMatrix();
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.append(renderer.domElement);
    let frame = 0,
      visible = false,
      disposed = false,
      pointerX = 0,
      lastPaint = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    function draw(timestamp = 0) {
      frame = 0;
      if (!element.isConnected) {
        dispose();
        return;
      }
      if (disposed || !visible || document.hidden) return;
      if (!reduced.matches && timestamp - lastPaint < 33) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = timestamp;
      const section = element.closest("section"),
        rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)),
      );
      if (small) {
        const pose = devicePose(
          reduced.matches ? 0.5 : progress,
          keyboard ? "keyboard" : "laptop",
          drag,
        );
        ["x", "y", "z"].forEach(
          (axis) =>
            (rotating.rotation[axis] +=
              (pose[axis] - rotating.rotation[axis]) *
              (reduced.matches ? 1 : 0.08)),
        );
        element.dataset.rotation = [
          rotating.rotation.x,
          rotating.rotation.y,
          rotating.rotation.z,
        ]
          .map((v) => v.toFixed(3))
          .join(",");
      } else {
        rotating.rotation.set(0.05, -0.2, 0);
      }
      renderer.render(scene, camera);
      if (small && !reduced.matches && !navigator.connection?.saveData)
        frame = requestAnimationFrame(draw);
    }
    const resize = () => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const visibility = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !frame) frame = requestAnimationFrame(draw);
        if (!visible && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "100px" },
    );
    const size = new ResizeObserver(resize);
    size.observe(element);
    visibility.observe(element);
    const drag = { x: 0, y: 0 };
    let dragging = false,
      lastX = 0,
      lastY = 0;
    const raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2();
    const move = (event) => {
      if (!small || event.pointerType === "touch") return;
      if (dragging) {
        drag.y += (event.clientX - lastX) * 0.007;
        drag.x = Math.max(
          -0.85,
          Math.min(0.85, drag.x + (event.clientY - lastY) * 0.007),
        );
        lastX = event.clientX;
        lastY = event.clientY;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit =
        visible && raycaster.intersectObject(rotating, true).length > 0;
      element.style.zIndex = hit ? "7" : "";
      canvas.style.pointerEvents = hit ? "auto" : "none";
      canvas.style.cursor = hit ? "grab" : "";
    };
    canvas.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || reduced.matches) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      event.preventDefault();
    });
    const release = (event) => {
      dragging = false;
      if (canvas.hasPointerCapture(event.pointerId))
        canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);
    const resume = () => {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", resume);
    function dispose() {
      if (disposed) return;
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      visibility.disconnect();
      size.disconnect();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", resume);
      reduced.removeEventListener("change", resume);
      scene.traverse((item) => {
        item.geometry?.dispose();
        if (item.material) {
          const materials = Array.isArray(item.material)
            ? item.material
            : [item.material];
          materials.forEach((material) => {
            material.map?.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      element.classList.remove("webgl-ready");
      renderer.domElement.remove();
    }
    window.addEventListener("pagehide", dispose, { once: true });
    renderer.domElement.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      dispose();
    });
    element.dataset.deviceState = "ready";
    element.classList.add("webgl-ready");
    resize();
  } catch {
    renderer?.dispose();
    renderer?.forceContextLoss();
    element.dataset.deviceState = "fallback";
  }
}

export function initDevices() {
  if (navigator.connection?.saveData) return;
  const targets = [];
  const workflow = document.querySelector(".workflow-object");
  if (workflow) targets.push(workflow);
  const keyboard = document.querySelector(".experience-object");
  if (keyboard) targets.push(keyboard);
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const source =
          entry.target.querySelector("img")?.getAttribute("src") ||
          "assets/portfolio-overview-v2.png";
        mountDevice(
          entry.target,
          new URL("../" + source, import.meta.url).href,
          entry.target === workflow || entry.target === keyboard,
        );
      }),
    { rootMargin: "300px" },
  );
  targets.forEach((target) => observer.observe(target));
  window.addEventListener("pagehide", () => observer.disconnect(), {
    once: true,
  });
}
