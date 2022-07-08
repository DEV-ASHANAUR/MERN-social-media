import React from 'react'
import './skeleton.css';
const Skeleton = ({ type }) => {
    const COUNTER = 5;
    const ItemSkeleton = () => (
        <div className="postSk">
            <div className="postSkImg"></div>
            <div className="postSkInfo">
                <div className="info1 info_basic"></div>
                <div className="info2 info_basic"></div>
                <div className="info3 info_basic"></div>
            </div>
            <div className="postLikeSk"></div>
            <div className="postDetailsSk"></div>
            <div className="postDetailsSk"></div>
            <div className="postDetailsSk3"></div>
        </div>
    )

    if (type === 'post') return Array(COUNTER).fill(<ItemSkeleton />);

}

export default Skeleton