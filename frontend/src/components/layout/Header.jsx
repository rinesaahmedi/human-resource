import React from 'react';
import Button from "../common/button";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={'flex justify-between px-[50px] pt-[20px]'}>
            <NavLink  to={'/'} className={'font-bold text-[25px] '}>
                Logo
            </NavLink>
            <div className={'flex gap-[30px]'}>
                <ul className={'flex gap-[40px] items-center'}>
                    <li className={'text-[20px] text-[#bab9b8] font-light'}>
                        <NavLink to="/" exact activeClassName="active">Home</NavLink>
                    </li>
                    <li className={'text-[20px] text-[#bab9b8] font-light'} >
                        <NavLink to="/about" activeClassName="active">About</NavLink>
                    </li>
                    <li className={'text-[20px] text-[#bab9b8] font-light'}>
                        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                    </li>
                </ul>
                <div className={'flex gap-[5px]'}>

                    <Button variant={'outlined'} title={'Log In'} type={'submit'}/>
                    <Button variant={'gray'} title={'Create Account'} type={'submit'}/>
                </div>



            </div>



        </div>
    );
};

export default Header;