import { FC } from "react";
import { clsx } from "clsx"

import Props from "./HelloWorld.interface.ts"

import "./HelloWorld.scss"

const HelloWorld: FC<Props> = ({ className }) => {
    return <div className={clsx("HelloWorld", className)}></div>
}

export default HelloWorld;
