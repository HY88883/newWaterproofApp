import { getCurrentUser } from "@/config/authority";
import { useRef } from "react";

export default function useUserObject(){
    const userRef=useRef(null)
    if(!userRef.current){
        getCurrentUser().then(r=>{
            userRef.current=r
        })
    }
    return userRef.current
}



