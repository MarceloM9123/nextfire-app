import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";


export default function ResponsiveCamera(){
    const { viewport } = useThree()

    const aspectRatioThreshold = .6

    const aspectRatio = viewport.width / viewport.height

    // const respsonsivePosition = aspectRatio < aspectRatioThreshold ? [0,0,10] : [0,0,5]
    const responsiveFOV = aspectRatio < aspectRatioThreshold ? 100 : 75

    // return <PerspectiveCamera makeDefault position={respsonsivePosition} fov={responsiveFOV} />
    return <PerspectiveCamera makeDefault position={[0,0,10]} fov={responsiveFOV} />
}