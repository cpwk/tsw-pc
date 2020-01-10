import React from 'react';
import {Carousel} from 'antd';
import '../assets/css/comps.scss';
import {App, CTYPE} from "../common";

class Banners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            banners: this.props.banners,
        };
    }

    go = (banner) => {
        let {url} = banner;
        if (url) {
            window.location.href = url;
        }
    };

    render() {
        let {banners = [], type} = this.state;
        let isHome = type === CTYPE.bannerTypes.HOME;
        let length = banners.length;
        return <div className={isHome ? 'main-carousel home-carousel' : 'main-carousel'}>
            <Carousel autoplay={length > 1} dots={length > 1}
                      speed={1000} autoplaySpeed={isHome ? 5000 : 4000} infinite>
                {banners.map((banner, index) => {
                    let {img} = banner;
                    return <div key={index} className='item'>
                        <div className='item'
                             style={{
                                 backgroundImage: `url(${img})`,
                                 backgroundPosition: '50% 50%',
                                 backgroundRepeat: 'no-repeat',
                                 backgroundSize: 'contain',
                             }}
                             onClick={() => {
                                 this.go(banner);
                             }}/>
                    </div>
                })}
            </Carousel>
        </div>
    }
}


class Custevals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: this.props.pageNum,
            pageSize: this.props.pageSize,
            list: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let {pageNum, pageSize} = this.state;
        App.api('admin/custeval/find', {
            custevalQo: JSON.stringify({
                    pageNumber: pageNum,
                    pageSize: pageSize,
                }
            )
        }).then((data) => {
            this.setState({list: data.content});
        });
    };

    render() {

        let {list = []} = this.state;

        return <div className='custeval-list'>
            <div className='eval-header'/>
            <ul>
                {list.map((list, index) => {
                    let {img, title, customer} = list;
                    return <li key={index} className='item'>
                        <img src={img} className='img'/>
                        <div className='title'>{title}</div>
                        <div className='customer'>{customer}</div>
                    </li>
                })}
            </ul>
            <div className='clearfix-h20'/>
        </div>
    }
}

export {Banners, Custevals}