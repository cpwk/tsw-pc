import React from 'react';
import U from "../../common/U";
import {App} from "../../common";
import '../../assets/css/page/article.scss'

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            article: {}
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let {id} = this.state;
        App.api('admin/article/findOne', {id}).then((article) => {
            this.setState({article});
        });
    };

    render() {
        let {article = {}} = this.state;
        let {title, createdAt, content} = article;
        return <div className='article-page'>
            <div className='inner'>
                <div className='a-left'/>
                <div className='a-right'>
                    <div className='title'>{title}</div>
                    <div className='date'> {U.date.format(new Date(createdAt), 'yyyy-MM-dd')} </div>
                    <div className='content'>
                        <div dangerouslySetInnerHTML={{__html: content}}/>
                    </div>
                    <div className='clearfix'/>
                </div>
                <div className='clearfix'/>
            </div>
        </div>
    }
}