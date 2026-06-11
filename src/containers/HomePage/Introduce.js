import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import leaf from '../../assets/images/leaf.png';
import { FormattedMessage } from 'react-intl';


class Introduce extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <>
                <h1>
                    <FormattedMessage id="footer.introduce" />
                </h1>
                <div className='introduce-page'>
                    <p>
                        Healthcare là Nền tảng Y tế chăm sóc sức khỏe toàn diện cung cấp nền tảng công nghệ giúp bệnh nhân dễ dàng lựa chọn dịch vụ y tế từ mạng lưới bác sĩ chuyên khoa giỏi, phòng khám/ bệnh viện uy tín với thông tin đã xác thực và đặt lịch nhanh chóng.<br />
                    </p>
                    <p style={{ fontWeight: 'bold' }}>
                        Bác sĩ chuyên khoa giỏi
                    </p>

                    <p>
                        Hệ thống Healthcare cung cấp dịch vụ đặt lịch khám với các bác sĩ chuyên khoa uy tín hàng đầu tại Hà Nội. Chúng tôi tìm hiểu và giới thiệu danh sách Bác sĩ được nhiều bệnh nhân tin tưởng, mong muốn được khám, đồng thời được đồng nghiệp trong ngành đánh giá cao.

                        Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như: Bệnh viện Bạch Mai, Bệnh Viện Việt Đức, Bệnh viện TW Quân đội 108, Bệnh viện Quân Y 103, Bệnh viện Nhi TW, Bệnh viện Tai Mũi Họng TW, Viện Tim mạch Việt Nam…Nhiều người đạt danh hiệu Thầy thuốc Nhân dân, Thầy thuốc ưu tú, bác sĩ cao cấp hoặc đạt bằng cấp Bác sĩ chuyên khoa, Bác sĩ nội trú…

                        Hiện tại, hầu hết các bác sĩ có lịch khám trong giờ hoặc ngoài giờ hành chính, tại các bệnh viện hoặc phòng khám tư nhân uy tín, được chọn lọc kỹ lưỡng tại Hà Nội.
                    </p>

                    <p style={{ fontWeight: 'bold' }}>
                        Kết nối bệnh nhân với "đúng bác sĩ"
                    </p>

                    <p>

                        Với mong muốn giúp bệnh nhân được gặp đúng bác sĩ giỏi với bệnh tật của mình, chúng tôi sắp xếp hệ thống chuyên khoa, giới thiệu thông tin bác sĩ đã được xác thực rõ ràng, uy tín, biên tập nội dung cẩm nang dễ hiểu, cùng với sự hỗ trợ của hệ thống, để giúp bệnh nhân hiểu rõ vấn đề của mình, đặt lịch đúng bác sĩ chuyên khoa giỏi.
                    </p>
                    <p>
                        Ngoài ra, hệ thống thường xuyên ghi nhận ý kiến đánh giá phản hồi của bệnh nhân sau khi đi khám và phương án điều trị của bác sĩ. Từ đó, chúng tôi hiểu thêm về thế mạnh chuyên môn của từng bác sĩ để kết nối đúng bệnh nhân.
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

export default connect(mapStateToProps, mapDispatchToProps)(Introduce);
