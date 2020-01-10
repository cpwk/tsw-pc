import React from 'react';
import {App, U} from "../../common";
import '../../assets/css/page/custcases.scss';
import {Icon} from 'antd';


export default class Custcases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        U.setWXTitle('客户案例');
    }

    render() {

        return <div className='custcases-page'>

            <div className='cases-header'/>

            <CustcaseList pagination={{pageNum: 1, pageSize: 6}}/>

        </div>
    }
}

export class CustcaseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pagination: this.props.pagination,
            total: 0,
            totalPages: 0
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let {pagination, list} = this.state;
        let {pageNum, pageSize} = pagination;
        App.api('admin/custcase/find', {
            custcaseQo: JSON.stringify({
                    pageNumber: pageNum,
                    pageSize: pageSize,
                    status: 1
                }
            )
        }).then((data) => {
            let {content} = data;
            list.push(...content);
            let totalPages = data.totalPages;
            this.setState({list, totalPages});
        });
    };

    caseLoadMore = () => {
        let pagination = this.state.pagination;
        let {pageNum} = pagination;
        this.setState({
            pagination: {
                ...pagination,
                pageNum: pageNum + 1
            }
        }, () => this.loadData());
    };

    go = (id) => {
        App.go(`/custcase/${id}`);
    };

    render() {
        let {list = [], pagination = {}, totalPages} = this.state;
        let {pageNum} = pagination;

        return <div>
            <ul className='ul-custcases'>
                {list.map((custcase, index) => {
                    let {id, img, title, subtitle, service} = custcase;
                    return <li key={index} onClick={() => {
                        this.go(id);
                    }}>
                        <img src={img} className='img'/>
                        <div className='cover'>
                            <div className='title'> {title}</div>
                            <div className='subtitle'>{subtitle}</div>
                            <div className='subtitle' style={{marginTop: '20px'}}>{service}</div>
                        </div>
                    </li>
                })}

            </ul>

            <div className='clearfix-h20'/>

            {pageNum < totalPages &&
            <div className='btn-more-topcase' onClick={this.caseLoadMore}>更多案例&nbsp;<Icon type='down'/></div>}

            <div className='clearfix-h20'/>
        </div>
    }
}

export class TopCaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.list});
    }


    go = (id) => {
        App.go(`/custcase/${id}`);
    };

    render() {

        let {list = []} = this.state;

        return <div>

            <ul className='ul-topcases'>
                {list.map((custcase, index) => {
                    let {id, topImg, title, subtitle, topIntro, service} = custcase;
                    return <li key={index}>
                        <div className='left'>
                            <div className='title' onClick={() => {
                                this.go(id);
                            }}> {title}</div>
                            <div className='subtitle'>{subtitle}</div>
                            <div className='intro'>{topIntro}</div>
                            <div className='service'>{service}</div>
                            <div className='btn' onClick={() => {
                                this.go(id);
                            }}>了解更多 >
                            </div>
                        </div>
                        <img src={topImg} className='banner'/>
                    </li>
                })}

            </ul>

            <div className='clearfix-h20'/>

        </div>

    }

}