import {MaxMin} from './AnimationDir';

interface IDirection {
    startTime: number,
    vectorX: number,
    vectorY: number,
    animation: MaxMin,
    scaleX: number,
    scaleY: number
}

export default IDirection;