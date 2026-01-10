"use client";
import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";

const categoryDescriptions = [
  {
    maDanhMuc: "BackEnd",
    tenDanhMuc: "Lập trình Backend",
    short:
      "Danh mục Backend tập trung vào xây dựng hệ thống phía máy chủ, xử lý dữ liệu và logic nghiệp vụ.",
    full: "Danh mục Backend tập trung vào xây dựng hệ thống phía máy chủ, xử lý dữ liệu và logic nghiệp vụ. Bạn sẽ học cách làm việc với API, cơ sở dữ liệu, xác thực người dùng, bảo mật và tối ưu hiệu năng hệ thống. Các khóa học phù hợp cho những ai muốn trở thành Backend Developer hoặc Full Stack Developer.",
  },
  {
    maDanhMuc: "Design",
    tenDanhMuc: "Thiết kế Web",
    short:
      "Thiết kế Web giúp bạn tạo ra giao diện trực quan, đẹp mắt và thân thiện với người dùng.",
    full: "Thiết kế Web giúp bạn tạo ra giao diện trực quan, đẹp mắt và thân thiện với người dùng. Nội dung bao gồm UI/UX, bố cục, màu sắc, typography và trải nghiệm người dùng. Phù hợp cho designer, frontend developer hoặc những ai muốn nâng cao kỹ năng thẩm mỹ trong sản phẩm số.",
  },
  {
    maDanhMuc: "DiDong",
    tenDanhMuc: "Lập trình di động",
    short:
      "Danh mục lập trình di động tập trung vào xây dựng ứng dụng cho Android và iOS.",
    full: "Danh mục lập trình di động tập trung vào xây dựng ứng dụng cho Android và iOS. Bạn sẽ được học các công nghệ phổ biến như React Native, Flutter hoặc native app. Khóa học phù hợp cho những ai muốn phát triển ứng dụng di động chuyên nghiệp.",
  },
  {
    maDanhMuc: "FrontEnd",
    tenDanhMuc: "Lập trình Frontend",
    short:
      "Frontend là nơi xây dựng giao diện và trải nghiệm người dùng trên trình duyệt.",
    full: "Frontend là nơi xây dựng giao diện và trải nghiệm người dùng trên trình duyệt. Các khóa học tập trung vào HTML, CSS, JavaScript, React, Next.js và tối ưu UX/UI. Phù hợp cho những ai muốn trở thành Frontend Developer chuyên nghiệp.",
  },
  {
    maDanhMuc: "FullStack",
    tenDanhMuc: "Lập trình Full Stack",
    short:
      "Full Stack giúp bạn làm chủ cả Frontend lẫn Backend trong một hệ thống hoàn chỉnh.",
    full: "Full Stack giúp bạn làm chủ cả Frontend lẫn Backend trong một hệ thống hoàn chỉnh. Bạn sẽ học cách thiết kế kiến trúc hệ thống, xây dựng API, giao diện và triển khai sản phẩm thực tế. Phù hợp cho những ai muốn phát triển sản phẩm end-to-end.",
  },
  {
    maDanhMuc: "TuDuy",
    tenDanhMuc: "Tư duy lập trình",
    short:
      "Tư duy lập trình giúp bạn rèn luyện cách suy nghĩ logic và giải quyết vấn đề.",
    full: "Tư duy lập trình giúp bạn rèn luyện cách suy nghĩ logic và giải quyết vấn đề. Nội dung tập trung vào thuật toán cơ bản, phân tích bài toán và cách tiếp cận hiệu quả. Đây là nền tảng quan trọng cho mọi lập trình viên, đặc biệt là người mới bắt đầu.",
  },
];

export default function CategoriesDescription() {
  return (
    <div className="space-y-4">
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Sự phát triển của các website học trực tuyến đã giúp cho bất kỳ ai
          cũng có thể học tập, tiếp thu kiến thức và mở rộng tri thức, từ đó
          phát triển bản thân mỗi ngày. Chỉ cần có một thiết bị kết nối
          Internet, bạn hoàn toàn có thể học online mọi kiến thức và kỹ năng ở
          bất cứ đâu, bất cứ lúc nào.
        </p>

        <p>
          Hãy khám phá ngay các khóa học online tại nền tảng giáo dục trực tuyến{" "}
          <span className="font-medium text-primary">TOT.com</span>, nơi đồng
          hành cùng bạn trên hành trình học tập và phát triển bản thân mỗi ngày.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Những con số biết nói về xu hướng học online
        </h2>

        <p>
          Học online đang trở thành xu hướng phát triển mạnh mẽ trong lĩnh vực
          giáo dục và đào tạo trên toàn thế giới. Dưới đây là một số số liệu
          tiêu biểu thể hiện rõ sự tăng trưởng của hình thức học tập này:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            Trong năm 2020, số lượng học viên trực tuyến trên toàn cầu đã tăng
            gấp đôi so với năm 2015, đạt hơn 160 triệu người (theo báo cáo của
            Class Central).
          </li>
          <li>
            Theo Ambient Insight, thị trường giáo dục trực tuyến toàn cầu tăng
            trưởng trung bình 9,23% mỗi năm, từ 247 tỷ USD năm 2016 lên 398 tỷ
            USD năm 2021.
          </li>
          <li>
            Báo cáo của Docebo cho thấy ngành e-learning toàn cầu dự kiến đạt
            giá trị 325 tỷ USD vào năm 2025.
          </li>
          <li>
            Tại Việt Nam, số lượng người học online trong năm 2020 đã tăng gấp
            đôi so với năm 2015, đạt hơn 5 triệu người (theo Topica Edtech
            Group).
          </li>
          <li>
            Coursera – một trong những nền tảng học trực tuyến lớn nhất thế giới
            – đã có hơn 87 triệu người dùng đến từ 190 quốc gia và vùng lãnh
            thổ.
          </li>
          <li>
            Khoảng 80% các trường đại học hàng đầu thế giới đã cung cấp các khóa
            học trực tuyến miễn phí cho cộng đồng (theo Class Central).
          </li>
        </ul>

        <p>
          Những con số trên cho thấy học online không chỉ là xu hướng nhất thời
          mà còn là một phương thức học tập bền vững, mang lại nhiều lợi ích về
          sự tiện lợi, chi phí và khả năng tiếp cận kiến thức cho cả người học
          lẫn các tổ chức đào tạo.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Học online – cách giúp bạn “học, học nữa, học mãi”
        </h2>

        <p>
          Học online là công cụ hiệu quả giúp bạn tiếp tục trau dồi kiến thức và
          phát triển bản thân sau khi hoàn thành chương trình học tại trường.
          Trong môi trường làm việc không ngừng thay đổi, việc liên tục cập nhật
          kiến thức mới là yếu tố quan trọng giúp mỗi cá nhân thích nghi, nâng
          cao năng lực và mở rộng cơ hội nghề nghiệp.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          10+ khóa học online hữu ích nhất hiện nay
        </h2>

        <p>
          Dưới đây là danh sách hơn 10 khóa học online phổ biến và hữu ích, giúp
          bạn nâng cao kỹ năng và kiến thức trong nhiều lĩnh vực khác nhau. Mời
          bạn cùng tham khảo và lựa chọn khóa học phù hợp với nhu cầu của mình.
        </p>
      </div>

      {categoryDescriptions.map((item) => (
        <div
          key={item.maDanhMuc}
          className="bg-white rounded-xl p-5 border shadow-sm"
        >
          <Link
            href={`/categories?id=${item.maDanhMuc}`}
            className="text-lg font-semibold text-primary hover:underline"
          >
            {item.tenDanhMuc}
          </Link>

          <p className="text-gray-700 mt-2 leading-relaxed">{item.short}</p>

          <Accordion
            isCompact
            className="px-0 mt-2"
            itemClasses={{
              base: "px-0",
              trigger: "px-0",
              title: "text-primary font-medium",
              content: "text-gray-600 leading-relaxed",
            }}
          >
            <AccordionItem key="more" title="Xem thêm">
              {item.full}
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
