import React from 'react'
import {motion} from 'framer-motion'
import './animation.css'
export default function Loader() {
    const animationVariant={
        first:{
           opacity:[0,.3,.5,.7,1],
        //    display:["none","block"],
           transition:{
               opacity:{
                   repeat:Infinity,
                   duration:.5
               }
           }
        },
        second:{
            opacity:[0,.3,.5,.7,1],
         //    display:["none","block"],
            transition:{
                opacity:{
                    repeat:Infinity,
                    duration:.5,
                    delay:.5
                }
            }
         },
         third:{
            opacity:[0,.3,.5,.7,1],
         //    display:["none","block"],
            transition:{
                opacity:{
                    repeat:Infinity,
                    duration:.5,
                    delay:.7
                }
            }
         }
    }
    return (
        <div className="d-flex gap-2">
           <motion.div
           variants={animationVariant}
           animate="first"
            className="loader">

               </motion.div> 
               <motion.div
           variants={animationVariant}
           animate="second"
            className="loader">

               </motion.div> 
               <motion.div
           variants={animationVariant}
           animate="third"
            className="loader">

               </motion.div> 
        </div>
    )
}
