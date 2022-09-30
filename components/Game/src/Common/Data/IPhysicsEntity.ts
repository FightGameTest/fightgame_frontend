import { Engine, World, Composite, Body, Bodies, Constraint} from 'matter-js';

interface IPhysicsEntity {
    position: { x: number, y: number, anchorX: number, anchorY: number },
    body: Body | null,
    display: { width: number, height: number },
    timeSlotA: number,
    defaultTime: number,
    id: number
};

export default IPhysicsEntity;