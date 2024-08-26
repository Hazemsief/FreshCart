import React , {useContext, useEffect, useState} from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../../context/ConactContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import MainSlider from '../MainSlider/MainSlider';
import CatagorySlider from '../CatagorySlider/CatagorySlider';



export default function Home() {

    return <>
    <MainSlider/>
    <CatagorySlider/>
    <RecentProducts/>
    </>
}
