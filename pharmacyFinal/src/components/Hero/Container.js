import React from 'react'
import HeroText from './HeroText'
import SearchForm from './SearchForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import Social from './Social'
import './Hero.css'
import {motion} from 'framer-motion'
import NavBar from '../Header/NavBar'

export default function Container() {

    return (
        <div>
        <NavBar show={true} />
        <motion.div
        animate={{opacity:1}}
        initial={{opacity:0}}
        transition={{duration:.7 , when:"beforChildren",delay:.5}}
        className="hero">
            <HeroText />
        <SearchForm  />
        <Social />
        </motion.div>
        </div>
    )
}
