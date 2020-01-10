import React from 'react';
import {App, CTYPE} from "../../common";
import '../../assets/css/page/custcase.scss'
import {Banners} from "../Comps";

export default class Custcase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            custcase: {}
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData=()=>{
        let {id} = this.state;
        App.api('admin/custcase/findOne', {id}).then((custcase) => {
            this.setState({custcase});
        });
    };

    render() {
        let {custcase = {}} = this.state;

        let {banners = [], title, subtitle, context, customer, industry, service, content} = custcase;

        return<div className='custcase-page'>

            {banners.length > 0 && <Banners banners={banners} type={CTYPE.bannerTypes.CASE}/>}

            <div className='inner'>
                <div className='case-info'>
                    <div className='title'>{title}</div>
                    <div className='info'>
                        <div className='subtitle'>{subtitle}</div>
                        <div className='line'>项目背景</div>
                        <div className='line'>{context}</div>
                        <div className='line'>客户：{customer}</div>
                        <div className='line'>行业：{industry}</div>
                        <div className='line'>服务：{service}</div>
                    </div>

                    <div className='clearfix'/>
                </div>
                <div className='content'>
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </div>
                <div className='clearfix'/>
            </div>
        </div>
    }
}



