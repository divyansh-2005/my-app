'use client'

import { useTma } from "./hook"

export function Me(){
    const {user}= useTma();

    return <pre>
        user: {user.firstName} 
    </pre>
}