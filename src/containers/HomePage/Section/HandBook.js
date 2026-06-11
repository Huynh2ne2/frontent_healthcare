import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

const handbookItems = [
    {
        id: 1,
        title: 'Cẩm nang khám tổng quát',
        image: ''
    },
    {
        id: 2,
        title: 'Cẩm nang tim mạch',
        image: ''
    },
    {
        id: 3,
        title: 'Cẩm nang nhi khoa',
        image: ''
    }
];

class HandBook extends Component {

    handbookItems = [1, 2, 3, 4, 5, 6];

    renderHandbookItem = (item) => {
        return (
            <div className='section-customize' key={item}>
                <div className='bg-image section-HandBook'></div>

                <div>
                    <FormattedMessage id="homepage.handbook" /> {item}
                </div>
            </div>
        );
    };

    render() {
        const { settings } = this.props;

        return (
            <div className='section-share section-HandBook'>
                <div className='section-container'>

                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.handbook" />
                        </span>

                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>

                    <div className='section-body'>
                        <Slider {...settings}>
                            {this.handbookItems.map(this.renderHandbookItem)}
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
});

export default connect(mapStateToProps)(HandBook);
