import React from 'react';

import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import NavLink from '../common/NavLink.jsx';

import '../assets/css/common.scss'
import '../assets/css/page/home-wrap.scss'


export default class HomeWrap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <LocaleProvider locale={zhCN} style={{height: '100%'}}>
            <div className='home-wrap'>
                <Header/>
                <div className='inner-page'>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        </LocaleProvider>
    }
}

const menus = [{cn: '首页', en: 'HOME', path: '/'},
    {cn: '关于', en: 'ABOUT', path: '/about'},
    {cn: '案例', en: 'CASE', path: '/custcases'},
    {cn: '思想', en: 'THOUGHT', path: '/thought'},
    {cn: '服务', en: 'SERVICE', path: '/service'},
    {cn: '动态', en: 'DYNAMIC', path: '/articles'},
    {cn: '联系', en: 'CONTACT', path: '/contact'}];


class Header extends React.Component {
    render() {
        return <div className="top-header">
            <div className="inner">
                <a href='/'>
                    <div className="logo"/>
                </a>

                <ul>
                    {menus.map((menu, index) => {
                        let {key, cn, en, path} = menu;
                        return <li key={index}>
                            <NavLink to={path} cn={cn} en={en}/>
                        </li>
                    })}
                </ul>

            </div>
        </div>

    }
}

class Footer extends React.Component {
    render() {
        return <div className="footer"/>
    }
}