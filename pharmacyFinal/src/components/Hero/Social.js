import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Hero.css'
import {FaFacebook,FaTwitter,FaInstagram} from 'react-icons/fa'
import {motion} from 'framer-motion'
export default function Social() {

    const socialVarient={
        facebook:{
            opacity:1,
            transition:{
                delay:1.7
                // when:"afterParent"
            }
        },
        twitter:{
            opacity:1,
            transition:{
                delay:2
            }
        },
        instagram:{
            opacity:1,
            transition:{
delay:2.1

            }
        }
        
    }
    return (
        <motion.div  className="  list-div" style={{position:"absolute",bottom:50}}>
            <h6 className="text-center " style={{marginLeft:25}}> Find us here</h6>
            <motion.ul  className="d-flex gap-4 " >
                <motion.li initial={{opacity:0}}  variants={socialVarient} animate="facebook"   whileHover={{color:"blue",scale:1.3}}  ><FaFacebook size="2rem"/></motion.li>
                <motion.li initial={{opacity:0}} variants={socialVarient} animate="instagram"  whileHover={{color:"red",scale:1.3}}  ><FaInstagram size="2rem"/></motion.li>
                <motion.li initial={{opacity:0}} variants={socialVarient} animate="twitter" whileHover={{color:"blue",scale:1.3}}  ><FaTwitter size="2rem"/></motion.li>
            </motion.ul>
        </motion.div>
    )
}
