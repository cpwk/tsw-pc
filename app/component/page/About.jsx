import React from 'react';
import '../../assets/css/page/about.scss';
import U from "../../common/U";
import {Custevals} from "../Comps";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        U.setWXTitle('关于');
    }


    render() {
        return <div>
            <div className='about-page'></div>
            <Custevals pageNum={1} pageSize={8}/>
        </div>
    }
}