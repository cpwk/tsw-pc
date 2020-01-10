import React from 'react';
import U from "../../common/U";
import {App, CTYPE} from "../../common/index";
import '../../assets/css/page/home.scss';
import {Banners, Custevals} from "../Comps";
import {ArticleList} from "./Articles";
import {CustcaseList, TopCaseList} from "./Custcases";


const focus = [{c: 'C', cn: '品牌咨询', en: 'Brand Consultation'}, {c: 'P', cn: '产品策略', en: 'Product Planning'}, {
    c: 'D',
    cn: '品牌设计',
    en: 'Brand Design'
}, {
    c: 'O',
    cn: '包装创意',
    en: 'Packaging Originality'
}, {c: 'I', cn: 'IP/插画/卡通', en: 'IP/Illustration/ Cartoon'}, {c: 'M', cn: '品牌营销', en: 'Brand Marketing'}, {
    c: 'S',
    cn: '商业空间',
    en: 'Space Design'
}];

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            articles: [],
            custcases:[]
        };
    }

    componentDidMount() {
        U.setWXTitle('首页');
        this.loadData();
    }

    loadData = () => {
        App.api('/user/findBanner', {bannerQo: JSON.stringify({status: 1, type: 1})}).then((banners) => {
            this.setState({banners});
        });

        App.api('admin/article/find',{
            articleQo: JSON.stringify({
                pageSize: 3,
                pageNumber: 1,
                status: 1
            })
        }).then((articles) => {
            this.setState({articles:articles.content});
        });

        App.api('admin/custcase/find',{
            custcaseQo: JSON.stringify({
               settop:1
            })
        }).then((custcases) => {
            this.setState({custcases:custcases.content});
        });
    };

    render() {
        let {banners = [],articles=[],custcases=[]} = this.state;
        return <div className='home-page'>
            {banners.length > 0 && <Banners banners={banners} type={CTYPE.bannerTypes.HOME}/>}

            <div className='focus'>
                <div className='f-header'/>
                <ul>
                    {focus.map((f, i) => {
                        let {c, cn, en} = f;
                        return <li key={i}>
                            <div className='c'>{c}</div>
                            <div className='cn'>{cn}</div>
                            <div className='en'>{en}</div>
                        </li>
                    })}
                </ul>
            </div>

            <div className='dong'/>

           <div className='cases-header-home'/>

            <TopCaseList list={custcases}/>

            <CustcaseList pagination={{pageNum:1,pageSize:9}}/>

            <ArticleList list={articles}/>

            <div className='coop'/>

            <Custevals pageNum={1} pageSize={4}/>

            <div className='renke'/>

        </div>
    }
}