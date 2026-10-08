import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'

export default function WhiteGloveDoorstepScene({
  isReducedMotion = false,
  artworkSrc = screenshotImage,
  artworkTitle = 'Divine Tunes-11'
}) {
  const mountRef = useRef(null)
  const [animationPhase, setAnimationPhase] = useState(0) // 0: Arrival, 1: Greeting, 2: Handover, 3: Receipt, 4: Complete

  // Continuous 5-Step Story Titles (Genuine & Descriptive)
  const PHASE_TITLES = [
    { step: '01', label: 'Courier Arrival', desc: 'Courier arrives carrying the framed artwork to the residence doorstep' },
    { step: '02', label: 'Door Opens & Greeting', desc: 'Door opens and customer steps to the doorstep to greet the courier' },
    { step: '03', label: 'Direct Handover', desc: 'Courier carefully hands the authenticated masterpiece into customer\'s hands' },
    { step: '04', label: 'Artwork Received Inside', desc: 'Customer receives the artwork and walks back into the house' },
    { step: '05', label: 'Delivery Complete', desc: 'Door closes securely as courier confirms white-glove fulfillment' }
  ]

  useEffect(() => {
    if (isReducedMotion) return

    const container = mountRef.current
    if (!container) return

    // ── 1. THREE.JS SCENE SETUP ──
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x131720)

    // Camera with clear framing & optimal depth
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(-0.15, 1.75, 5.8)
    camera.lookAt(0.35, 1.35, -0.6)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    container.appendChild(renderer.domElement)

    // ── 2. HIGH-VISIBILITY CINEMATIC LIGHTING RIG ──
    const hemiLight = new THREE.HemisphereLight(0xa5b8d6, 0x423425, 2.8)
    scene.add(hemiLight)

    const ambientLight = new THREE.AmbientLight(0x454f63, 2.0)
    scene.add(ambientLight)

    // Key Light for Courier & Porch Walkway
    const courierKeyLight = new THREE.SpotLight(0xfff7ed, 4.5)
    courierKeyLight.position.set(-2.0, 5.0, 3.2)
    courierKeyLight.target.position.set(-0.8, 1.2, 0)
    courierKeyLight.angle = Math.PI / 3.2
    courierKeyLight.penumbra = 0.6
    courierKeyLight.castShadow = true
    courierKeyLight.shadow.mapSize.width = 1024
    courierKeyLight.shadow.mapSize.height = 1024
    scene.add(courierKeyLight)
    scene.add(courierKeyLight.target)

    // Key Light for Doorstep & Customer
    const customerKeyLight = new THREE.SpotLight(0xffeedd, 4.5)
    customerKeyLight.position.set(1.4, 5.0, 3.0)
    customerKeyLight.target.position.set(0.8, 1.2, 0)
    customerKeyLight.angle = Math.PI / 3.2
    customerKeyLight.penumbra = 0.6
    customerKeyLight.castShadow = true
    scene.add(customerKeyLight)
    scene.add(customerKeyLight.target)

    // Warm Interior Foyer Light
    const foyerLight = new THREE.PointLight(0xffbe6b, 2.2, 10)
    foyerLight.position.set(1.35, 2.4, -2.4)
    scene.add(foyerLight)

    // Architectural Sconce Light
    const sconceLight = new THREE.PointLight(0xdfb76c, 3.8, 6)
    sconceLight.position.set(2.4, 2.5, 0.1)
    scene.add(sconceLight)

    // Rim Lights (Left: Cool Cyan, Right: Warm Gold)
    const rimLeft = new THREE.DirectionalLight(0x7dd3fc, 3.0)
    rimLeft.position.set(-5.0, 3.5, -2.5)
    scene.add(rimLeft)

    const rimRight = new THREE.DirectionalLight(0xfde68a, 3.0)
    rimRight.position.set(4.5, 3.5, -2.5)
    scene.add(rimRight)

    // Soft Upward Floor Bounce
    const floorBounce = new THREE.DirectionalLight(0xdbeafe, 1.0)
    floorBounce.position.set(0, -2.0, 2.0)
    scene.add(floorBounce)

    // ── 3. LUXURY ARCHITECTURAL ENVIRONMENT ──
    const envGroup = new THREE.Group()
    scene.add(envGroup)

    // Porch Ground Floor
    const floorGeo = new THREE.PlaneGeometry(16, 12)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x242938,
      roughness: 0.3,
      metalness: 0.2
    })
    const floorMesh = new THREE.Mesh(floorGeo, floorMat)
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.position.y = 0
    floorMesh.receiveShadow = true
    envGroup.add(floorMesh)

    // Raised Entrance Platform Step
    const stepGeo = new THREE.BoxGeometry(14, 0.16, 3.8)
    const stepMat = new THREE.MeshStandardMaterial({
      color: 0x2d3448,
      roughness: 0.35,
      metalness: 0.25
    })
    const stepMesh = new THREE.Mesh(stepGeo, stepMat)
    stepMesh.position.set(0, 0.08, -0.1)
    stepMesh.receiveShadow = true
    stepMesh.castShadow = true
    envGroup.add(stepMesh)

    // Brass Stair Edge Strip
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xdfb76c,
      roughness: 0.2,
      metalness: 0.85
    })
    const brassStrip = new THREE.Mesh(new THREE.BoxGeometry(14, 0.035, 0.06), brassMat)
    brassStrip.position.set(0, 0.16, 1.8)
    envGroup.add(brassStrip)

    // ── ARCHITECTURAL FACADE WITH GENUINE DOORWAY CUTOUT ──
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x1b202e,
      roughness: 0.55,
      metalness: 0.15
    })

    // Left Facade Wall (x: -7.0 -> 0.5)
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(7.5, 6, 0.3), wallMat)
    leftWall.position.set(-3.25, 3.0, -1.8)
    leftWall.receiveShadow = true
    envGroup.add(leftWall)

    // Right Facade Wall (x: 2.2 -> 7.2)
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(5.0, 6, 0.3), wallMat)
    rightWall.position.set(4.7, 3.0, -1.8)
    rightWall.receiveShadow = true
    envGroup.add(rightWall)

    // Top Header Lintel Wall (above door, y: 3.56 -> 6.0)
    const lintelWall = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.44, 0.3), wallMat)
    lintelWall.position.set(1.35, 4.78, -1.8)
    lintelWall.receiveShadow = true
    envGroup.add(lintelWall)

    // Fluted Vertical Slats on Walls
    const slatGeo = new THREE.BoxGeometry(0.04, 5.8, 0.05)
    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x2e364c,
      roughness: 0.4,
      metalness: 0.3
    })
    for (let x = -6.8; x <= 6.8; x += 0.28) {
      if (x > 0.45 && x < 2.25) continue // doorway gap
      const slat = new THREE.Mesh(slatGeo, slatMat)
      slat.position.set(x, 3.0, -1.63)
      envGroup.add(slat)
    }

    // Door Frame (Brushed Gold)
    const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.10, 3.44, 0.28), brassMat)
    frameL.position.set(0.5, 1.8, -1.65)
    const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.10, 3.44, 0.28), brassMat)
    frameR.position.set(2.2, 1.8, -1.65)
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(1.80, 0.10, 0.28), brassMat)
    frameTop.position.set(1.35, 3.52, -1.65)
    envGroup.add(frameL, frameR, frameTop)

    // ── LUXURY INTERIOR FOYER ROOM (BEYOND DOOR) ──
    const foyerGroup = new THREE.Group()
    envGroup.add(foyerGroup)

    // Foyer Floor
    const foyerFloorMat = new THREE.MeshStandardMaterial({
      color: 0x302636,
      roughness: 0.25,
      metalness: 0.3
    })
    const foyerFloor = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 3.0), foyerFloorMat)
    foyerFloor.position.set(1.35, 0.08, -3.1)
    foyerFloor.receiveShadow = true
    foyerGroup.add(foyerFloor)

    // Foyer Back Wall
    const foyerBackMat = new THREE.MeshStandardMaterial({
      color: 0x382c22,
      roughness: 0.6
    })
    const foyerBackWall = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 4.4), foyerBackMat)
    foyerBackWall.position.set(1.35, 2.2, -4.5)
    foyerGroup.add(foyerBackWall)

    // Foyer Decorative Art / Mirror on Back Wall
    const foyerArtFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 1.4, 0.04),
      brassMat
    )
    foyerArtFrame.position.set(1.35, 2.5, -4.46)
    foyerGroup.add(foyerArtFrame)

    const foyerArtInner = new THREE.Mesh(
      new THREE.PlaneGeometry(0.88, 1.28),
      new THREE.MeshStandardMaterial({
        color: 0xdfb76c,
        emissive: 0x553e1a,
        roughness: 0.2
      })
    )
    foyerArtInner.position.set(1.35, 2.5, -4.43)
    foyerGroup.add(foyerArtInner)

    // ── GRAND ENTRANCE PIVOT DOOR (SWINGS INWARD INTO FOYER) ──
    // Pivot located on right frame (x = 2.15, z = -1.65)
    const doorPivotGroup = new THREE.Group()
    doorPivotGroup.position.set(2.15, 1.8, -1.65)
    envGroup.add(doorPivotGroup)

    const doorLeafGeo = new THREE.BoxGeometry(1.62, 3.36, 0.08)
    const doorLeafMat = new THREE.MeshStandardMaterial({
      color: 0x262c3e,
      roughness: 0.4,
      metalness: 0.2
    })
    const doorLeafMesh = new THREE.Mesh(doorLeafGeo, doorLeafMat)
    doorLeafMesh.position.set(-0.81, 0, 0)
    doorLeafMesh.castShadow = true
    doorPivotGroup.add(doorLeafMesh)

    // Gold Door Pull Handle
    const handleGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.6, 16)
    const handleMesh = new THREE.Mesh(handleGeo, brassMat)
    handleMesh.position.set(-1.45, 0, 0.06)
    doorPivotGroup.add(handleMesh)

    // Architectural Sconce Light Fixture
    const sconceCylinderGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 16)
    const sconceFixture = new THREE.Mesh(sconceCylinderGeo, brassMat)
    sconceFixture.position.set(2.4, 2.5, -1.55)
    envGroup.add(sconceFixture)

    // Architectural Planter & Foliage (Walkway Left)
    const potGeo = new THREE.CylinderGeometry(0.28, 0.20, 0.65, 24)
    const potMat = new THREE.MeshStandardMaterial({
      color: 0x222736,
      roughness: 0.4,
      metalness: 0.3
    })
    const potMesh = new THREE.Mesh(potGeo, potMat)
    potMesh.position.set(-2.8, 0.33, -0.8)
    potMesh.castShadow = true
    potMesh.receiveShadow = true
    envGroup.add(potMesh)

    const potRimGeo = new THREE.TorusGeometry(0.29, 0.02, 12, 32)
    const potRim = new THREE.Mesh(potRimGeo, brassMat)
    potRim.rotation.x = Math.PI / 2
    potRim.position.set(-2.8, 0.65, -0.8)
    envGroup.add(potRim)

    const plantGroup = new THREE.Group()
    plantGroup.position.set(-2.8, 0.65, -0.8)
    const leafGeo = new THREE.SphereGeometry(0.18, 8, 8)
    leafGeo.scale(1, 0.2, 2.0)
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x25553e,
      roughness: 0.35,
      metalness: 0.1
    })
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat)
      leaf.rotation.y = (i / 7) * Math.PI * 2
      leaf.rotation.x = 0.4 + (i % 3) * 0.1
      leaf.position.y = 0.1 + (i % 2) * 0.08
      plantGroup.add(leaf)
    }
    envGroup.add(plantGroup)

    // ── 4. 3D HUMANOID RIG CREATOR ──
    function createHumanoidRig({ isCourier = true }) {
      const rootGroup = new THREE.Group()

      const skinMat = new THREE.MeshStandardMaterial({
        color: isCourier ? 0xe5aa7d : 0xebd1b7,
        roughness: 0.45,
        metalness: 0.05
      })
      const hairMat = new THREE.MeshStandardMaterial({
        color: isCourier ? 0x2a1d15 : 0x3d281a,
        roughness: 0.65
      })
      const jacketMat = new THREE.MeshStandardMaterial({
        color: isCourier ? 0x34415e : 0x463854,
        roughness: isCourier ? 0.55 : 0.35,
        metalness: isCourier ? 0.15 : 0.25
      })
      const pantsMat = new THREE.MeshStandardMaterial({
        color: isCourier ? 0x252e42 : 0x362c42,
        roughness: 0.6,
        metalness: 0.1
      })
      const shirtMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.3
      })
      const gloveMat = new THREE.MeshStandardMaterial({
        color: isCourier ? 0xffffff : 0xebd1b7,
        roughness: 0.25,
        metalness: 0.05
      })
      const goldTrimMat = new THREE.MeshStandardMaterial({
        color: 0xdfb76c,
        roughness: 0.2,
        metalness: 0.85
      })
      const shoeMat = new THREE.MeshStandardMaterial({
        color: 0x181a24,
        roughness: 0.25,
        metalness: 0.35
      })

      // Pelvis
      const pelvis = new THREE.Group()
      pelvis.position.y = 0.95
      rootGroup.add(pelvis)

      // Torso & Spine
      const torsoGroup = new THREE.Group()
      pelvis.add(torsoGroup)

      const torsoMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.23, 0.18, 0.60, 16),
        jacketMat
      )
      torsoMesh.position.y = 0.32
      torsoMesh.castShadow = true
      torsoGroup.add(torsoMesh)

      const innerShirt = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.18, 12), shirtMat)
      innerShirt.position.set(0, 0.54, 0.08)
      torsoGroup.add(innerShirt)

      if (isCourier) {
        const tie = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.25, 0.02), goldTrimMat)
        tie.position.set(0, 0.44, 0.16)
        torsoGroup.add(tie)
      } else {
        const robePiping = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.55, 0.02), goldTrimMat)
        robePiping.position.set(0.06, 0.32, 0.16)
        torsoGroup.add(robePiping)
      }

      // Neck & Head
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.12, 12), skinMat)
      neck.position.y = 0.66
      torsoGroup.add(neck)

      const headGroup = new THREE.Group()
      headGroup.position.y = 0.82
      torsoGroup.add(headGroup)

      const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), skinMat)
      headMesh.scale.set(1, 1.22, 1.05)
      headMesh.castShadow = true
      headGroup.add(headMesh)

      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.06, 8), skinMat)
      nose.position.set(0, 0, 0.14)
      nose.rotation.x = Math.PI / 2
      headGroup.add(nose)

      const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.136, 14, 14), hairMat)
      hairMesh.position.set(0, 0.04, -0.02)
      hairMesh.scale.set(1.02, 1.15, 1.06)
      headGroup.add(hairMesh)

      // Arms & Hands
      function createArm(isLeft) {
        const sign = isLeft ? -1 : 1
        const shoulderPivot = new THREE.Group()
        shoulderPivot.position.set(sign * 0.26, 0.54, 0)
        torsoGroup.add(shoulderPivot)

        const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.32, 12), jacketMat)
        upperArm.position.y = -0.16
        upperArm.castShadow = true
        shoulderPivot.add(upperArm)

        const elbowPivot = new THREE.Group()
        elbowPivot.position.y = -0.32
        shoulderPivot.add(elbowPivot)

        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.30, 12), jacketMat)
        forearm.position.y = -0.15
        forearm.castShadow = true
        elbowPivot.add(forearm)

        const handPivot = new THREE.Group()
        handPivot.position.y = -0.30
        elbowPivot.add(handPivot)

        const handMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.05), gloveMat)
        handMesh.position.y = -0.05
        handMesh.castShadow = true
        handPivot.add(handMesh)

        return { shoulderPivot, elbowPivot, handPivot }
      }

      const leftArm = createArm(true)
      const rightArm = createArm(false)

      // Legs & Feet
      function createLeg(isLeft) {
        const sign = isLeft ? -1 : 1
        const hipPivot = new THREE.Group()
        hipPivot.position.set(sign * 0.13, 0, 0)
        pelvis.add(hipPivot)

        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.07, 0.46, 12), pantsMat)
        thigh.position.y = -0.23
        thigh.castShadow = true
        hipPivot.add(thigh)

        const kneePivot = new THREE.Group()
        kneePivot.position.y = -0.46
        hipPivot.add(kneePivot)

        const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.44, 12), pantsMat)
        shin.position.y = -0.22
        shin.castShadow = true
        kneePivot.add(shin)

        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.08, 0.22), shoeMat)
        foot.position.set(0, -0.44, 0.06)
        foot.castShadow = true
        kneePivot.add(foot)

        return { hipPivot, kneePivot }
      }

      const leftLeg = createLeg(true)
      const rightLeg = createLeg(false)

      return {
        rootGroup,
        pelvis,
        torsoGroup,
        headGroup,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg
      }
    }

    // Spawn Characters
    const courier = createHumanoidRig({ isCourier: true })
    courier.rootGroup.position.set(-3.4, 0.16, 0.15)
    courier.rootGroup.rotation.y = Math.PI / 2
    scene.add(courier.rootGroup)

    const customer = createHumanoidRig({ isCourier: false })
    customer.rootGroup.position.set(1.35, 0.16, -2.6)
    customer.rootGroup.rotation.y = Math.PI
    scene.add(customer.rootGroup)

    // ── 5. FRAMED ARTWORK MASTERPIECE ──
    const artworkGroup = new THREE.Group()
    scene.add(artworkGroup)

    const texLoader = new THREE.TextureLoader()
    const artTexture = texLoader.load(artworkSrc, () => {
      renderer.render(scene, camera)
    })
    artTexture.colorSpace = THREE.SRGBColorSpace

    const canvasGeo = new THREE.PlaneGeometry(0.88, 0.68)
    const canvasMat = new THREE.MeshStandardMaterial({
      map: artTexture,
      roughness: 0.15,
      metalness: 0.05,
      emissive: new THREE.Color(0x222222),
      emissiveMap: artTexture
    })
    const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat)
    canvasMesh.position.z = 0.04
    canvasMesh.castShadow = true
    artworkGroup.add(canvasMesh)

    // Brushed Champagne Gold Frame
    const frameGeo = new THREE.BoxGeometry(0.98, 0.78, 0.07)
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xdfb76c,
      roughness: 0.2,
      metalness: 0.85
    })
    const frameMesh = new THREE.Mesh(frameGeo, frameMat)
    frameMesh.castShadow = true
    artworkGroup.add(frameMesh)

    // Backing
    const backGeo = new THREE.BoxGeometry(0.96, 0.76, 0.02)
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x181c28,
      roughness: 0.5
    })
    const backMesh = new THREE.Mesh(backGeo, backMat)
    backMesh.position.z = -0.04
    artworkGroup.add(backMesh)

    // Direct Artwork Follow Light
    const artDirectLight = new THREE.PointLight(0xfff8ee, 3.5, 3.5)
    artDirectLight.position.set(0, 0, 0.45)
    artworkGroup.add(artDirectLight)

    // Subtle Verification Shimmer Highlight
    const auraGeo = new THREE.TorusGeometry(0.58, 0.015, 16, 48)
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    })
    const auraMesh = new THREE.Mesh(auraGeo, auraMat)
    auraMesh.position.z = 0.08
    artworkGroup.add(auraMesh)

    // ── 6. CONTINUOUS 5-STEP 3D ANIMATION ENGINE ──
    const LOOP_DURATION = 13.5 // 13.5s smooth continuous sequence
    const startTime = performance.now()
    let isRunning = true

    function smoothstep(min, max, value) {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
      return x * x * (3 - 2 * x)
    }

    const animate = (currentTime) => {
      if (!isRunning) return
      requestAnimationFrame(animate)

      const elapsed = ((currentTime - startTime) / 1000) % LOOP_DURATION
      const t = elapsed / LOOP_DURATION // 0.0 -> 1.0

      // ─────────────────────────────────────────────────────────────
      // STEP 1: COURIER ARRIVAL (0.00 -> 0.22)
      // Courier arrives carrying artwork firmly with both hands.
      // Customer is inside house foyer; door is closed.
      // ─────────────────────────────────────────────────────────────
      if (t < 0.22) {
        setAnimationPhase(0)
        const p = t / 0.22 // 0.0 -> 1.0

        // Courier walks along porch from x = -3.4 to x = -0.45
        const walkX = THREE.MathUtils.lerp(-3.4, -0.45, smoothstep(0, 1, p))
        const walkBounce = Math.abs(Math.sin(p * Math.PI * 6)) * 0.035

        courier.rootGroup.position.set(walkX, 0.16, 0.15)
        courier.rootGroup.rotation.y = Math.PI / 2
        courier.pelvis.position.y = 0.95 + walkBounce
        courier.torsoGroup.rotation.y = Math.sin(p * Math.PI * 3) * 0.04
        courier.torsoGroup.rotation.x = 0
        courier.headGroup.rotation.x = 0

        // Leg swing gait
        const legAngle = Math.sin(p * Math.PI * 6) * 0.38
        courier.leftLeg.hipPivot.rotation.x = legAngle
        courier.rightLeg.hipPivot.rotation.x = -legAngle
        courier.leftLeg.kneePivot.rotation.x = Math.max(0, -legAngle * 0.75)
        courier.rightLeg.kneePivot.rotation.x = Math.max(0, legAngle * 0.75)

        // Arms holding artwork securely in front of chest
        courier.leftArm.shoulderPivot.rotation.set(0.65, 0.20, -0.32)
        courier.leftArm.elbowPivot.rotation.set(-1.15, 0.30, 0)
        courier.rightArm.shoulderPivot.rotation.set(0.65, -0.20, 0.32)
        courier.rightArm.elbowPivot.rotation.set(-1.15, -0.30, 0)

        // ARTWORK IS LOCKED IN COURIER'S HANDS
        artworkGroup.position.set(walkX + 0.48, 1.45 + walkBounce * 0.5, 0.15)
        artworkGroup.rotation.set(0, Math.PI / 2 - 0.22, 0.04)

        // Door remains closed
        doorPivotGroup.rotation.y = 0
        foyerLight.intensity = 1.0
        auraMat.opacity = 0

        // Customer inside house foyer waiting
        customer.rootGroup.position.set(1.35, 0.16, -2.6)
        customer.rootGroup.rotation.y = Math.PI
        customer.pelvis.position.y = 0.95
        customer.headGroup.rotation.x = 0
        customer.leftArm.shoulderPivot.rotation.set(0.08, 0, 0.05)
        customer.rightArm.shoulderPivot.rotation.set(0.08, 0, -0.05)
        customer.leftArm.elbowPivot.rotation.set(-0.10, 0, 0)
        customer.rightArm.elbowPivot.rotation.set(-0.10, 0, 0)
        customer.leftLeg.hipPivot.rotation.set(0, 0, 0)
        customer.rightLeg.hipPivot.rotation.set(0, 0, 0)
        customer.leftLeg.kneePivot.rotation.set(0, 0, 0)
        customer.rightLeg.kneePivot.rotation.set(0, 0, 0)
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 2: DOOR OPENS & CUSTOMER STEPS TO DOORSTEP (0.22 -> 0.42)
      // Door opens inward into foyer; customer walks out to doorstep.
      // Courier waits outside on porch.
      // ─────────────────────────────────────────────────────────────
      else if (t < 0.42) {
        setAnimationPhase(1)
        const p = (t - 0.22) / 0.20 // 0.0 -> 1.0
        const doorEase = smoothstep(0, 0.55, p)
        const stepEase = smoothstep(0.15, 1.0, p)

        // Courier waiting on porch
        courier.rootGroup.position.set(-0.45, 0.16, 0.15)
        courier.rootGroup.rotation.y = Math.PI / 2
        courier.pelvis.position.y = 0.95
        courier.torsoGroup.rotation.set(0, 0, 0)
        courier.headGroup.rotation.set(0, 0, 0)
        courier.leftLeg.hipPivot.rotation.set(0, 0, 0)
        courier.rightLeg.hipPivot.rotation.set(0, 0, 0)
        courier.leftLeg.kneePivot.rotation.set(0, 0, 0)
        courier.rightLeg.kneePivot.rotation.set(0, 0, 0)

        courier.leftArm.shoulderPivot.rotation.set(0.65, 0.20, -0.32)
        courier.leftArm.elbowPivot.rotation.set(-1.15, 0.30, 0)
        courier.rightArm.shoulderPivot.rotation.set(0.65, -0.20, 0.32)
        courier.rightArm.elbowPivot.rotation.set(-1.15, -0.30, 0)

        artworkGroup.position.set(0.03, 1.45, 0.15)
        artworkGroup.rotation.set(0, Math.PI / 2 - 0.22, 0)

        // Door opens inward into foyer (0 -> -Math.PI * 0.48)
        doorPivotGroup.rotation.y = -Math.PI * 0.48 * doorEase
        foyerLight.intensity = 1.0 + doorEase * 3.5

        // Customer walks from inside foyer (1.35, 0.16, -2.6) to doorstep (0.85, 0.16, 0.15)
        const custZ = THREE.MathUtils.lerp(-2.6, 0.15, stepEase)
        const custX = THREE.MathUtils.lerp(1.35, 0.85, stepEase)
        const custWalkBounce = Math.abs(Math.sin(stepEase * Math.PI * 4)) * 0.03
        const custLegAngle = Math.sin(stepEase * Math.PI * 4) * 0.35

        customer.rootGroup.position.set(custX, 0.16, custZ)
        customer.rootGroup.rotation.y = THREE.MathUtils.lerp(Math.PI, -Math.PI / 2, stepEase)
        customer.pelvis.position.y = 0.95 + custWalkBounce

        customer.leftLeg.hipPivot.rotation.x = custLegAngle
        customer.rightLeg.hipPivot.rotation.x = -custLegAngle
        customer.leftLeg.kneePivot.rotation.x = Math.max(0, -custLegAngle * 0.7)
        customer.rightLeg.kneePivot.rotation.x = Math.max(0, custLegAngle * 0.7)

        // Customer raises hands in greeting / readiness to receive
        customer.leftArm.shoulderPivot.rotation.set(0.45 * stepEase, -0.15 * stepEase, 0.15 * stepEase)
        customer.leftArm.elbowPivot.rotation.set(-0.60 * stepEase, 0, 0)
        customer.rightArm.shoulderPivot.rotation.set(0.45 * stepEase, 0.15 * stepEase, -0.15 * stepEase)
        customer.rightArm.elbowPivot.rotation.set(-0.60 * stepEase, 0, 0)
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 3: DIRECT HANDOVER AT DOORSTEP (0.42 -> 0.62)
      // Courier extends artwork -> Customer hands receive frame directly.
      // ─────────────────────────────────────────────────────────────
      else if (t < 0.62) {
        setAnimationPhase(2)
        const p = (t - 0.42) / 0.20 // 0.0 -> 1.0
        const handEase = smoothstep(0, 1, p)

        // Courier stays outside on porch
        courier.rootGroup.position.set(-0.45, 0.16, 0.15)
        customer.rootGroup.position.set(0.85, 0.16, 0.15)
        customer.rootGroup.rotation.y = -Math.PI / 2
        customer.pelvis.position.y = 0.95
        customer.leftLeg.hipPivot.rotation.set(0, 0, 0)
        customer.rightLeg.hipPivot.rotation.set(0, 0, 0)
        customer.leftLeg.kneePivot.rotation.set(0, 0, 0)
        customer.rightLeg.kneePivot.rotation.set(0, 0, 0)

        // Courier extends arms forward toward customer
        courier.leftArm.shoulderPivot.rotation.set(
          THREE.MathUtils.lerp(0.65, 0.95, handEase),
          0.15,
          -0.15
        )
        courier.leftArm.elbowPivot.rotation.set(
          THREE.MathUtils.lerp(-1.15, -0.35, handEase),
          0.10,
          0
        )
        courier.rightArm.shoulderPivot.rotation.set(
          THREE.MathUtils.lerp(0.65, 0.95, handEase),
          -0.15,
          0.15
        )
        courier.rightArm.elbowPivot.rotation.set(
          THREE.MathUtils.lerp(-1.15, -0.35, handEase),
          -0.10,
          0
        )

        // Customer extends hands to take the artwork
        customer.leftArm.shoulderPivot.rotation.set(
          THREE.MathUtils.lerp(0.45, 0.85, handEase),
          -0.15,
          0.15
        )
        customer.leftArm.elbowPivot.rotation.set(
          THREE.MathUtils.lerp(-0.60, -0.50, handEase),
          0,
          0
        )
        customer.rightArm.shoulderPivot.rotation.set(
          THREE.MathUtils.lerp(0.45, 0.85, handEase),
          0.15,
          -0.15
        )
        customer.rightArm.elbowPivot.rotation.set(
          THREE.MathUtils.lerp(-0.60, -0.50, handEase),
          0,
          0
        )

        // ARTWORK TRANSLATES DIRECTLY FROM COURIER TO CUSTOMER
        const artX = THREE.MathUtils.lerp(0.03, 0.40, handEase)
        const artY = THREE.MathUtils.lerp(1.45, 1.46, handEase)
        artworkGroup.position.set(artX, artY, 0.15)

        artworkGroup.rotation.set(
          0,
          THREE.MathUtils.lerp(Math.PI / 2 - 0.22, Math.PI / 2 - 0.45, handEase),
          0
        )

        if (p > 0.35) {
          const auraPulse = (p - 0.35) / 0.65
          auraMat.opacity = auraPulse * 0.85
        }
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 4: CUSTOMER TAKES ARTWORK INTO HOUSE (0.62 -> 0.82)
      // Customer holds artwork securely and walks back inside the house.
      // Courier steps back respectfully and stays outside on porch!
      // ─────────────────────────────────────────────────────────────
      else if (t < 0.82) {
        setAnimationPhase(3)
        const p = (t - 0.62) / 0.20 // 0.0 -> 1.0
        const stepInsideEase = smoothstep(0, 1, p)

        // Customer holds artwork firmly against chest
        customer.leftArm.shoulderPivot.rotation.set(0.70, -0.20, 0.25)
        customer.leftArm.elbowPivot.rotation.set(-1.20, 0.20, 0)
        customer.rightArm.shoulderPivot.rotation.set(0.70, 0.20, -0.25)
        customer.rightArm.elbowPivot.rotation.set(-1.20, -0.20, 0)
        customer.headGroup.rotation.x = 0.12 // Looking down admiringly at artwork

        // Customer turns and walks from doorstep (0.85, 0.16, 0.15) into foyer (1.35, 0.16, -2.6)
        const custZ = THREE.MathUtils.lerp(0.15, -2.6, stepInsideEase)
        const custX = THREE.MathUtils.lerp(0.85, 1.35, stepInsideEase)
        const custRotY = THREE.MathUtils.lerp(-Math.PI / 2, 0, stepInsideEase)
        const custWalkBounce = Math.abs(Math.sin(stepInsideEase * Math.PI * 4)) * 0.03
        const custLegAngle = Math.sin(stepInsideEase * Math.PI * 4) * 0.35

        customer.rootGroup.position.set(custX, 0.16, custZ)
        customer.rootGroup.rotation.y = custRotY
        customer.pelvis.position.y = 0.95 + custWalkBounce

        customer.leftLeg.hipPivot.rotation.x = custLegAngle
        customer.rightLeg.hipPivot.rotation.x = -custLegAngle
        customer.leftLeg.kneePivot.rotation.x = Math.max(0, -custLegAngle * 0.7)
        customer.rightLeg.kneePivot.rotation.x = Math.max(0, custLegAngle * 0.7)

        // ARTWORK TRAVELS WITH CUSTOMER INSIDE
        // Compute offset from customer's chest based on customer rotation
        const artOffsetX = Math.sin(custRotY) * 0.42 + 0.05
        const artOffsetZ = Math.cos(custRotY) * 0.42
        artworkGroup.position.set(custX - artOffsetX, 1.46 + custWalkBounce * 0.5, custZ + artOffsetZ)
        artworkGroup.rotation.set(0.04, custRotY + Math.PI / 2 - 0.45, -0.02)

        // Courier steps back on porch outside (x = -0.45 -> -0.85)
        const courierBackX = THREE.MathUtils.lerp(-0.45, -0.85, smoothstep(0, 1, Math.min(1, p * 1.4)))
        courier.rootGroup.position.set(courierBackX, 0.16, 0.15)

        // Courier lowers arms to sides
        courier.leftArm.shoulderPivot.rotation.set(
          THREE.MathUtils.lerp(0.95, 0.08, Math.min(1, p * 1.4)),
          0,
          -0.05
        )
        courier.leftArm.elbowPivot.rotation.set(
          THREE.MathUtils.lerp(-0.35, -0.10, Math.min(1, p * 1.4)),
          0,
          0
        )
        courier.rightArm.shoulderPivot.rotation.set(
          THREE.MathUtils.lerp(0.95, 0.08, Math.min(1, p * 1.4)),
          0,
          0.05
        )
        courier.rightArm.elbowPivot.rotation.set(
          THREE.MathUtils.lerp(-0.35, -0.10, Math.min(1, p * 1.4)),
          0,
          0
        )

        // Courier polite nod
        const bowAngle = Math.sin(Math.min(1, p * 1.3) * Math.PI) * 0.14
        courier.torsoGroup.rotation.x = bowAngle
        courier.headGroup.rotation.x = bowAngle * 1.2

        // Shimmer aura fades smoothly
        auraMat.opacity = Math.max(0, (1 - p * 1.5) * 0.85)
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 5: DOOR CLOSES & DELIVERY COMPLETE (0.82 -> 1.00)
      // Door closes securely. Customer is inside.
      // Courier stands outside on porch with satisfaction.
      // ─────────────────────────────────────────────────────────────
      else {
        setAnimationPhase(4)
        const p = (t - 0.82) / 0.18 // 0.0 -> 1.0
        const doorCloseEase = smoothstep(0, 0.75, p)

        // Customer stays inside house with artwork
        customer.rootGroup.position.set(1.35, 0.16, -2.6)
        customer.rootGroup.rotation.y = 0
        customer.pelvis.position.y = 0.95
        customer.leftLeg.hipPivot.rotation.set(0, 0, 0)
        customer.rightLeg.hipPivot.rotation.set(0, 0, 0)
        customer.leftLeg.kneePivot.rotation.set(0, 0, 0)
        customer.rightLeg.kneePivot.rotation.set(0, 0, 0)

        // Artwork stays with customer inside
        artworkGroup.position.set(1.35, 1.46, -2.2)
        artworkGroup.rotation.set(0, Math.PI / 2 - 0.45, 0)
        auraMat.opacity = 0

        // Door closes smoothly (-Math.PI * 0.48 -> 0)
        doorPivotGroup.rotation.y = THREE.MathUtils.lerp(-Math.PI * 0.48, 0, doorCloseEase)
        foyerLight.intensity = THREE.MathUtils.lerp(4.5, 1.0, doorCloseEase)

        // Courier stands outside on porch
        courier.rootGroup.position.set(-0.85, 0.16, 0.15)
        courier.torsoGroup.rotation.set(0, 0, 0)
        courier.headGroup.rotation.set(0, 0, 0)
        courier.leftArm.shoulderPivot.rotation.set(0.08, 0, -0.05)
        courier.leftArm.elbowPivot.rotation.set(-0.10, 0, 0)
        courier.rightArm.shoulderPivot.rotation.set(0.08, 0, 0.05)
        courier.rightArm.elbowPivot.rotation.set(-0.10, 0, 0)
      }

      renderer.render(scene, camera)
    }

    requestAnimationFrame(animate)

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      isRunning = false
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      scene.clear()
    }
  }, [isReducedMotion, artworkSrc])

  // Reduced motion accessible fallback
  if (isReducedMotion) {
    return (
      <div className="relative w-full h-full min-h-[280px] xs:min-h-[310px] sm:min-h-[340px] md:min-h-[360px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#181d2a] via-[#121622] to-[#0a0d14] border border-neutral-700 p-4 flex flex-col items-center justify-center">
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#dfb76c]/20 border border-[#dfb76c] flex items-center justify-center text-[#dfb76c] shadow-[0_0_25px_rgba(223,183,108,0.4)]">
            <CheckCircle2 size={30} />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfb76c] bg-[#dfb76c]/10 border border-[#dfb76c]/30 px-3 py-1 rounded-full">
            White-Glove Handover
          </span>
          <h5 className="font-serif text-lg font-medium text-white">Direct Doorstep Receipt</h5>
          <p className="text-xs text-neutral-300 max-w-sm">
            Hand-to-hand white-glove artwork handover directly to your doorstep.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full min-h-[280px] xs:min-h-[310px] sm:min-h-[340px] md:min-h-[360px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#1c2230] via-[#141824] to-[#0d1017] border border-neutral-700/80 flex flex-col justify-between select-none shadow-2xl">
      
      {/* ── 3D WEBGL CANVAS CONTAINER (MOBILE SCROLL-SAFE) ── */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ touchAction: 'pan-y' }}
      />

      {/* ── TOP HUD HEADER (MATCHING STAGES 01, 02, 03) ── */}
      <div className="relative z-20 flex items-center justify-between px-3.5 pt-3 sm:px-5 sm:pt-4 pointer-events-none bg-black/40 backdrop-blur-md border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#f7d794] font-semibold">
            Stage 04 // White-Glove Doorstep
          </span>
        </div>

        {/* Dynamic Phase Step Indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={animationPhase}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#dfb76c]/40 text-[9px] sm:text-[10px] text-[#dfb76c] font-medium font-mono shadow-lg"
          >
            <Sparkles size={11} className="text-[#dfb76c] animate-pulse" />
            <span>Step {PHASE_TITLES[animationPhase]?.step}: {PHASE_TITLES[animationPhase]?.label}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM CONTINUOUS STORY STATUS STRIP ── */}
      <div className="relative z-20 px-3 pb-2.5 sm:px-5 sm:pb-3 pointer-events-none flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 bg-black/80 backdrop-blur-md border border-neutral-700/80 px-3 py-1.5 rounded-xl text-[9px] sm:text-[10px] text-neutral-200 shadow-xl">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-mono text-neutral-300 truncate font-medium">
              {PHASE_TITLES[animationPhase]?.desc}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 text-[#dfb76c] font-mono font-semibold">
            <span>Handover 3D</span>
          </div>
        </div>
      </div>

    </div>
  )
}
