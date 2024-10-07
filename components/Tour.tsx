'use client'

import { Pannellum } from 'pannellum-react'
import * as React from 'react'
import scenesArray from './ScenesArray'
import Image from 'next/image'

/**
 * Tour component isn't currently supported
 * in the pannellum-react library: https://www.npmjs.com/package/pannellum-react
 *
 * * Original Unwrapped Pannellum Tour Component:
 * * https://pannellum.org/documentation/examples/tour/
 *
 * Thankfully, someone created a component for it 🙏🙏🙏
 * The Images and the Data are from the codesandbox
 * * https://codesandbox.io/p/sandbox/pannellum-react-tour-mnopwk?file=%2Fsrc%2Fpartials%2FScenesArray.js
 *
 * ? TODO: add type declarations (on actual project, not on this POC)
 * TODO: Fix initial hotspots
 */
function Tour() {
    const [currentScene, setCurrentScene] = React.useState('lobby')
    const [yaw, setYaw] = React.useState(0)
    const [pitch, setPitch] = React.useState(0)
    const [hfov, setHfov] = React.useState(100)
    const panImage = React.useRef(null)

    const hotspotIcon = (hotSpotDiv) => {
        const image = document.createElement('img')
        image.classList.add('hotspoticon')
        image.setAttribute('width', '30')
        image.setAttribute('height', '30')
        image.setAttribute('src', './images/circle-chevron-up-solid.svg')
        hotSpotDiv.appendChild(image)
    }

    const infoIcon = (hotSpotDiv) => {
        const image = document.createElement('img')
        image.classList.add('infoicon')
        image.setAttribute('width', '30')
        image.setAttribute('height', '30')
        image.setAttribute(
            'src',
            'https://img.icons8.com/material/4ac144/256/info.png'
        )
        hotSpotDiv.appendChild(image)
    }

    const hotSpotIcon = (type) => {
        if (type === 'custom') {
            return hotspotIcon
        } else if (type === 'info') {
            return infoIcon
        }
    }

    const moveForward = () => {
        setPitch((prevPitch) => prevPitch + 10) // Adjust the value for speed
    }

    const moveBackward = () => {
        setPitch((prevPitch) => prevPitch - 10) // Adjust the value for speed
    }

    const moveLeft = () => {
        setYaw((prevYaw) => prevYaw - 10) // Adjust the value for speed
    }

    const moveRight = () => {
        setYaw((prevYaw) => prevYaw + 10) // Adjust the value for speed
    }

    const zoomIn = () => {
        setHfov((prevHfov) => prevHfov - 10) // Adjust the value for speed
    }

    const zoomOut = () => {
        setHfov((prevHfov) => prevHfov + 10) // Adjust the value for speed
    }

    return (
        <>
            <Image
                src="https://drive.google.com/uc?export=preview&id=1MQzandsgZSfY7n5a7mv71SfCOzsJEZyf"
                alt="pano img"
                width={500}
                height={500}
            />
            <div>
                pitch: {pitch}, yaw: {yaw}
            </div>

            {/* Working imgur link:  */}
            <Pannellum
                crossOrigin="false"
                ref={panImage}
                width="100%"
                height="500px"
                keyboardZoom={false}
                // mouseZoom={false}
                image={
                    scenesArray[currentScene].scenePanoImg + '?resize=800%2C600'
                }
                pitch={scenesArray[currentScene].initPitch + pitch}
                yaw={scenesArray[currentScene].initYaw + yaw}
                hfov={hfov}
                haov={360}
                vaov={180}
                autoLoad
                showZoomCtrl={false}>
                {scenesArray[currentScene].hotSpotsArr.map((hotSpot) => {
                    return (
                        <Pannellum.Hotspot
                            key={hotSpot}
                            type={hotSpot.type}
                            pitch={hotSpot.pitch}
                            yaw={hotSpot.yaw}
                            tooltip={hotSpotIcon(hotSpot.type)}
                            handleClick={() =>
                                setCurrentScene(hotSpot.transition)
                            }
                            text={hotSpot.text}
                            URL={hotSpot.url}
                        />
                    )
                })}
            </Pannellum>

            <div className="flex flex-col">
                <button onClick={moveForward}>Up</button>
                <button onClick={moveBackward}>Down</button>
                <button onClick={moveLeft}>Left</button>
                <button onClick={moveRight}>Right</button>
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
            </div>
        </>
    )
}

export default Tour
