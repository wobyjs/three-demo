// / <reference path=". /jsx-runtime" />
/** @jsxImportSource ./jsx-runtime */

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Three } from 'woby-three'

console.log('TextGeometry')

declare module 'woby-three' {
    interface Three {
        TextGeometry: TextGeometry
    }
}

//@ts-ignore
Three.TextGeometry = TextGeometry
