import React from 'react';

import '../../assets/css/page/articles.scss';
import {Pagination} from 'antd';
import U from "../../common/U";
import {App} from "../../common";

export default class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pagination: {
                pageSize: 9,
                current: 1,
                total: 0
            }
        };
    }

    componentDidMount() {
        U.setWXTitle('动态');
        this.loadData();
    }

    loadData = () => {
        let {pagination = {}} = this.state;
        App.api('admin/article/find', {
            articleQo: JSON.stringify({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
                status: 1
            })
        }).then((data) => {
            this.setState({list: data.content, pagination: {...pagination, total: data.totalElements}});
        })
    };

    render() {
        let {list, pagination} = this.state;
        let {total, current, pageSize} = pagination;
        return <div className='articles-page'>

            <ArticleList list={list}/>

            <Pagination showQuickJumper={true} total={total} current={current} pageSize={pageSize}
                        onChange={(current, pageSize) => {
                            this.setState({
                                pagination: {
                                    ...pagination,
                                    current: current,
                                    pageSize: pageSize
                                }
                            }, () => {
                                this.loadData();
                            })
                        }}/>

            <div className='clearfix-h20'/>
        </div>
    }
}


export class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.list})
    }

    go = (id) => {
        App.go(`/article/${id}`);
    };

    render() {
        let {list = []} = this.state;
        return <div>
            <div className='articles-header'/>
            <ul className='ul-articles'>
                {list.map((article, index) => {
                    let {id, img, title, intro, createdAt} = article;
                    return <li key={index} onClick={() => this.go(id)}>
                        <img src={img} className='img'/>
                        <div className='title'>{title}</div>
                        <div className='date'>{U.date.format(new Date(createdAt), 'yyyy-MM-dd')}</div>
                        <div className='intro'>{intro}</div>
                    </li>
                })}
            </ul>
            <div className='clearfix-h20'/>
        </div>
    }

}