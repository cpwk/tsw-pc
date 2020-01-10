import React from 'react';
import '../../assets/css/page/contact.scss';
import U from "../../common/U";

export default class Contact extends React.Component{
    constructor(porps){
        super(porps);
        this.state={};
    }

    componentDidMount() {
        U.setWXTitle('联系');
    }

    render() {
        return<div className='contact-page'></div>
    }
}