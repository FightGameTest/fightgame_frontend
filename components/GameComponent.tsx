import React, { useRef, useEffect } from "react";

import ControlContainer from "./Game/src/Dep/ControlContainer";
import NoireLibre from "./Game/src/Core/NoireLibre";





const CreateGame = (containerRef: React.RefObject<HTMLDivElement>, GlobalState: any) => {

    

    if(!(window as any).pixiDivTarget) {
        console.log("Hello World!");
        console.log("containerRef: ", containerRef.current);

        (window as any).pixiDivTarget = containerRef.current;

        console.log("GlobalState", GlobalState);



        let cc = new ControlContainer(GlobalState);
        let noireLibre = cc.getMain();

        noireLibre.startGame();

        console.log("Welcome to NoireLibre!");
    }
    
}

const GameComponent = ({GlobalState}) => {
    const parentEl = useRef<HTMLDivElement>(null);


    //console.log("parentEl: ", parentEl);

    useEffect(() => {
        CreateGame(parentEl, GlobalState)
    }, [parentEl]);

    return <div ref={parentEl} />;
}

export default GameComponent;