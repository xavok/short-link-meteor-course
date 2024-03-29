/**
 * Created by Xavok on 4/7/2017.
 */
import React, {Component} from 'react';
import {Tracker} from 'meteor/tracker';
import { Links } from '/imports/api/links';
import {Meteor} from 'meteor/meteor';
import LinksListItem from './LinksListItem';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';
export default class LinksList extends Component {
    constructor(props) {
        super(props);
        this.state = {links: []};
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
        });
    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        if(this.state.links.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Links Found</p>
                </div>
            );
        }
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
        });
    }
    render() {
        return(
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
};