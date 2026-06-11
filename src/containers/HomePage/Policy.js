import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import './HomePage.scss';


class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        return (
            <>
                <h1>
                    <FormattedMessage id="footer.regulations" />
                </h1>
                <div className='policy-page'>
                    <p style={{ fontWeight: 'bold' }}>
                        1. Mục đích thu nhập thông tin cá nhân
                    </p>
                    <p>
                        Để truy cập và sử dụng các dịch vụ của chúng tôi, quý khách sẽ được yêu cầu đăng ký thông tin cá nhân (Email, Họ tên, Số ĐT liên lạc…). Mọi thông tin được cung cấp phải đảm bảo tính xác thực và hợp pháp. Chúng tôi không chịu trách nhiệm liên quan đến luật pháp và những thông tin khai báo do quý khách hàng cung cấp.
                    </p>
                    <p>
                        Chúng tôi có thể thu thập một số thông tin về số lần truy cập website. Thông tin bao gồm số trang quý khách xem, số links (liên kết) được truy cập và các thông tin khác liên quan đến việc kết nối đến website này. Chúng tôi cũng thu thập các thông tin mà trình duyệt Web (Browser) quý khách đã sử dụng để cập vào website, bao gồm: địa chỉ IP, loại Browser, ngôn ngữ người dùng, thời gian và các địa chỉ mà Browser truy xuất xuất đến.
                    </p>
                    <p style={{ fontWeight: 'bold' }}>
                        2. Thời gian lưu trữ thông tin
                    </p>
                    <p>
                        Chúng tôi sẽ tiến hành các hoạt động lưu trữ những thông tin cá nhân do quý khách cung cấp trên các cổng thông tin nội bộ của chúng tôi trong quá trình cung ứng sản phẩm và dịch vụ hoặc cho đến lúc hoàn thành mục đích thu thập thông tin. Ở trường hợp khác, các thông tin của quý khách sẽ được hủy khi người mua đưa ra yêu cầu hủy những thông tin đã cung cấp cho chúng tôi.
                    </p>

                    <p style={{ fontWeight: 'bold' }}>
                        3. Cam kết bảo mật thông tin cá nhân của khách hàng
                    </p>

                    <p>
                        Chúng tôi sở hữu những phương pháp kỹ thuật và an ninh để ngăn chặn truy cập trái phép hoặc trái pháp luật gây tổn thất thông tin cá nhân của quý khách. Khi thu thập dữ liệu trên website, chúng tôi thu thập các thông tin cá nhân của khách hàng trên máy chủ và lưu trữ an toàn. Chúng tôi sử dụng hệ thống tường lửa cho máy chủ.
                    </p>
                    <p>
                        Khách hàng không nên gửi đầy đủ và các thông tin chi tiết của của thẻ tín dụng hay thẻ ghi nợ khi chưa được mã hóa cho chúng tôi. Chúng tôi luôn duy trì những biện pháp bảo vệ vật lý và điện tử trong mối liên kết chặt chẽ giữa các hoạt động thu thập, lưu trữ thông tin cá nhân của bạn. Đôi khi chúng tôi có thể yêu cầu xuất trình chứng minh hoặc các thông tin liên quan trước khi tiết lộ thông tin cá nhân cho quý khách.
                    </p>

                </div>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
