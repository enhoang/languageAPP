import type { LText } from '../../../types';
import type { TermNotes } from '../../types';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

// Explanations, examples and confusable terms (written for this app, supplementary), by term id.
export const NOTES_A: Record<string, TermNotes> = {
  'acceptance-criteria': {
    explanation: L(
      `Tiêu chí chấp nhận (acceptance criteria) là các điều kiện mà một sản phẩm công việc — thường là một user story — phải đáp ứng để các bên liên quan (stakeholders) chấp nhận. Theo syllabus, acceptance criteria có thể xem như các điều kiện kiểm thử (test condition) cần được các bài test thực thi; chúng giúp xác định phạm vi user story, đạt đồng thuận giữa các bên, mô tả cả kịch bản tích cực lẫn tiêu cực, làm cơ sở cho kiểm thử chấp nhận user story và cho việc lập kế hoạch, ước lượng. Hai định dạng phổ biến: hướng kịch bản (Given/When/Then của BDD) và hướng quy tắc (danh sách kiểm tra, bảng đầu vào – đầu ra).`,
      `Acceptance criteria are the conditions a work product (typically a user story) must satisfy to be accepted by stakeholders. The syllabus treats them as test conditions to be exercised by tests: they define the scope of the story, build consensus, describe positive and negative scenarios, serve as the basis for user story acceptance testing and support planning and estimation. Common formats are scenario-oriented (Given/When/Then, as in BDD) and rule-oriented (verification lists, input-output tables).`,
      `验收准则（acceptance criteria）是工作产品（通常是用户故事）为被干系人接受而必须满足的条件。大纲指出，验收准则可视为需要由测试来执行的测试条件：用于界定用户故事范围、达成干系人共识、描述正向与反向场景、作为用户故事验收测试的依据，并支持计划和估算。常见格式有面向场景（BDD 的 Given/When/Then）和面向规则（检查清单、输入-输出对照表）。`,
    ),
    example: L(
      `User story "Là khách hàng, tôi muốn chuyển tiền nội bộ": Given số dư 5.000.000đ, When chuyển 6.000.000đ, Then hệ thống từ chối và hiển thị "Số dư không đủ"; quy tắc bổ sung: hạn mức mỗi giao dịch tối đa 50.000.000đ.`,
      `Story "As a customer I want to make an internal transfer": Given a balance of 5,000,000 VND, When I transfer 6,000,000 VND, Then the transfer is rejected with "Insufficient balance"; extra rule: max 50,000,000 VND per transaction.`,
      `用户故事"作为客户，我想进行行内转账"：Given 余额 500 万越南盾，When 转账 600 万，Then 系统拒绝并提示"余额不足"；补充规则：单笔限额 5000 万。`,
    ),
    confusedWith: [
      {
        id: 'exit-criteria',
        note: L(
          `Acceptance criteria áp dụng cho từng user story/sản phẩm (cái gì phải đúng để được chấp nhận); exit criteria (hay Definition of Done) áp dụng cho một hoạt động/test level (khi nào được coi là hoàn thành, ví dụ đạt độ bao phủ, không còn lỗi nghiêm trọng).`,
          `Acceptance criteria apply to a specific story/work product (what must be true for it to be accepted); exit criteria (Definition of Done) apply to an activity or test level (when it can be declared complete, e.g. coverage reached, no open critical defects).`,
          `验收准则针对具体的用户故事/工作产品（满足什么才被接受）；准出准则（完成的定义）针对某项活动或测试级别（何时可宣布完成，如达到覆盖率、无未关闭的严重缺陷）。`,
        ),
      },
    ],
  },

  'acceptance-testing': {
    explanation: L(
      `Kiểm thử chấp nhận (acceptance testing) là một cấp độ kiểm thử (test level) nhằm quyết định có chấp nhận hệ thống hay không. Syllabus nhấn mạnh nó tập trung vào xác nhận (validation) và chứng minh hệ thống sẵn sàng triển khai, tức là đáp ứng nhu cầu nghiệp vụ của người dùng; lý tưởng là do chính người dùng dự kiến thực hiện. Các dạng chính: UAT (user acceptance testing), kiểm thử chấp nhận vận hành (operational acceptance testing), chấp nhận theo hợp đồng, theo quy định pháp lý (regulatory), alpha testing và beta testing.`,
      `Acceptance testing is the test level that determines whether to accept the system. The syllabus stresses that it focuses on validation and on demonstrating readiness for deployment, i.e. that the system fulfils the users' business needs, ideally performed by the intended users. Main forms: user acceptance testing (UAT), operational, contractual and regulatory acceptance testing, alpha testing and beta testing.`,
      `验收测试（acceptance testing）是用于决定是否接受系统的测试级别。大纲强调它侧重确认（validation），证明系统已准备好部署、满足用户的业务需求，理想情况下由预期用户执行。主要形式包括：用户验收测试（UAT）、运行验收测试、合同验收测试、法规验收测试、Alpha 测试和 Beta 测试。`,
    ),
    example: L(
      `Trước khi phát hành tính năng trả góp trên sàn thương mại điện tử, nhóm nghiệp vụ và một số khách hàng thân thiết thử mua hàng trả góp end-to-end trên môi trường gần giống production và ký biên bản chấp nhận.`,
      `Before releasing instalment payments on an e-commerce site, business users and selected customers run end-to-end instalment purchases in a production-like environment and sign off.`,
      `电商平台上线分期付款前，业务人员和部分忠实客户在类生产环境中端到端地完成分期购买并签字验收。`,
    ),
    confusedWith: [
      {
        id: 'system-testing',
        note: L(
          `System testing kiểm tra hệ thống có đáp ứng đặc tả (verification) không, thường do đội test độc lập làm; acceptance testing tập trung vào việc hệ thống có đáp ứng nhu cầu nghiệp vụ và sẵn sàng triển khai không (validation), lý tưởng do người dùng làm.`,
          `System testing checks the whole system against its specifications (verification), often by an independent test team; acceptance testing focuses on business needs and readiness for deployment (validation), ideally by the intended users.`,
          `系统测试检查整个系统是否符合规格说明（验证），通常由独立测试团队执行；验收测试关注是否满足业务需求、是否可部署（确认），理想情况下由预期用户执行。`,
        ),
      },
      {
        id: 'user-acceptance-testing',
        note: L(
          `UAT chỉ là một dạng của acceptance testing (người dùng dự kiến có chấp nhận không); acceptance testing là cả test level, gồm thêm operational, contractual, regulatory, alpha, beta.`,
          `UAT is only one form of acceptance testing (do the intended users accept it?); acceptance testing is the whole level, also covering operational, contractual, regulatory, alpha and beta testing.`,
          `UAT 只是验收测试的一种形式（预期用户是否接受）；验收测试是整个测试级别，还包括运行、合同、法规、Alpha 和 Beta 测试。`,
        ),
      },
    ],
  },

  'alpha-testing': {
    explanation: L(
      `Kiểm thử alpha (alpha testing) là một dạng kiểm thử chấp nhận được thực hiện tại môi trường test của bên phát triển, nhưng bởi những người không thuộc tổ chức phát triển (ví dụ khách hàng tiềm năng, người dùng nội bộ ở bộ phận khác). Syllabus chỉ liệt kê alpha testing là một dạng chính của acceptance testing; định nghĩa chi tiết đến từ glossary.`,
      `Alpha testing is a form of acceptance testing performed in the developer's test environment by people outside the development organization (e.g. potential customers). The syllabus only lists it as a main form of acceptance testing; the detailed definition comes from the glossary.`,
      `Alpha 测试（alpha testing）是一种验收测试，在开发方的测试环境中、由开发组织以外的人员（如潜在客户）执行。大纲仅将其列为验收测试的主要形式之一，详细定义来自术语表。`,
    ),
    example: L(
      `Công ty phần mềm mời 20 nhân viên chi nhánh ngân hàng đến văn phòng của mình để dùng thử ứng dụng mobile banking mới trên thiết bị test của đội phát triển.`,
      `A software vendor invites 20 bank branch staff to its office to try the new mobile banking app on the development team's test devices.`,
      `软件公司邀请 20 名银行网点员工到公司，用开发团队的测试设备试用新的手机银行应用。`,
    ),
    confusedWith: [
      {
        id: 'beta-testing',
        note: L(
          `Điểm phân biệt là địa điểm/môi trường: alpha ở môi trường của bên phát triển; beta ở nơi bên ngoài (môi trường của chính người dùng). Cả hai đều do người ngoài tổ chức phát triển thực hiện.`,
          `The difference is the location: alpha is in the developer's environment, beta at an external site (the users' own environment). Both are done by people outside the development organization.`,
          `区别在于地点/环境：Alpha 在开发方环境，Beta 在外部场所（用户自己的环境）。两者都由开发组织以外的人员执行。`,
        ),
      },
    ],
  },

  'behavior-driven-development': {
    explanation: L(
      `Phát triển hướng hành vi (behavior-driven development, BDD) là cách tiếp cận cộng tác, trong đó cả nhóm tập trung vào hành vi mong đợi của hệ thống đối với khách hàng, và hành vi đó trở thành cơ sở để kiểm thử. Theo syllabus, BDD mô tả hành vi mong muốn bằng các test case viết bằng ngôn ngữ tự nhiên đơn giản, dễ hiểu với stakeholders — thường theo định dạng Given/When/Then — rồi chuyển tự động thành test thực thi được. Giống TDD và ATDD, BDD là cách tiếp cận test-first, thể hiện nguyên tắc kiểm thử sớm và shift left.`,
      `Behavior-driven development (BDD) is a collaborative approach in which the team focuses on delivering the expected behavior for the customer, which forms the basis for testing. Per the syllabus, BDD expresses the desired behavior in test cases written in simple natural language understandable by stakeholders (usually Given/When/Then), which are then automatically translated into executable tests. Like TDD and ATDD it is test-first, implementing early testing and shift left.`,
      `行为驱动开发（behavior-driven development, BDD）是一种协作方法，团队聚焦于为客户交付期望的行为，并以此作为测试的基础。大纲指出，BDD 用干系人易懂的简单自然语言（通常为 Given/When/Then 格式）编写测试用例来表达期望行为，然后自动转换为可执行测试。与 TDD、ATDD 一样，它属于测试先行，体现早期测试和左移。`,
    ),
    example: L(
      `File Gherkin: "Given giỏ hàng có 2 sản phẩm, When áp mã GIAM10, Then tổng tiền giảm 10%" — BA, dev, tester cùng viết, sau đó Cucumber chạy kịch bản này như test tự động trong CI.`,
      `Gherkin: "Given the cart has 2 items, When I apply code SAVE10, Then the total is reduced by 10%" — written jointly by BA, developer and tester, then run by Cucumber as an automated test in CI.`,
      `Gherkin 场景："Given 购物车有 2 件商品，When 使用优惠码 SAVE10，Then 总价减少 10%"——由 BA、开发和测试共同编写，再由 Cucumber 在 CI 中自动执行。`,
    ),
    confusedWith: [
      {
        id: 'test-driven-development',
        note: L(
          `TDD do developer dẫn dắt ở mức code (viết unit test trước, rồi code, rồi refactor); BDD diễn đạt hành vi nghiệp vụ bằng ngôn ngữ tự nhiên (Given/When/Then) để stakeholders hiểu được.`,
          `TDD is developer-driven at code level (write the test, then code, then refactor); BDD expresses business behavior in natural language (Given/When/Then) understandable by stakeholders.`,
          `TDD 由开发人员在代码层面驱动（先写测试、再写代码、再重构）；BDD 用干系人能懂的自然语言（Given/When/Then）表达业务行为。`,
        ),
      },
      {
        id: 'acceptance-test-driven-development',
        note: L(
          `ATDD suy ra test từ acceptance criteria trong quá trình thiết kế hệ thống; BDD nhấn mạnh hành vi mong đợi, viết dạng Given/When/Then và tự động hoá. Hai cách rất gần nhau, đều test-first.`,
          `ATDD derives tests from acceptance criteria during system design; BDD emphasizes expected behavior written as Given/When/Then and automated. They are closely related; both are test-first.`,
          `ATDD 在系统设计过程中从验收准则推导测试；BDD 强调以 Given/When/Then 描述并自动化期望行为。两者非常接近，都是测试先行。`,
        ),
      },
    ],
  },

  'beta-testing': {
    explanation: L(
      `Kiểm thử beta (beta testing) là một dạng kiểm thử chấp nhận được thực hiện ở nơi bên ngoài môi trường test của bên phát triển, bởi những người không thuộc tổ chức phát triển — thường là người dùng thật trên thiết bị/môi trường của họ. Mục đích là thu phản hồi trong điều kiện sử dụng thực tế trước khi phát hành rộng. Syllabus chỉ liệt kê beta testing là một dạng của acceptance testing.`,
      `Beta testing is a form of acceptance testing performed at a site external to the developer's test environment by people outside the development organization, typically real users on their own devices, to get feedback under real conditions before a wide release. The syllabus only lists it as a form of acceptance testing.`,
      `Beta 测试（beta testing）是一种验收测试，在开发方测试环境以外的场所、由开发组织以外的人员执行，通常是真实用户在自己的设备上使用，以便在大范围发布前获得真实使用条件下的反馈。大纲仅将其列为验收测试的一种形式。`,
    ),
    example: L(
      `Ứng dụng ví điện tử phát hành bản beta qua TestFlight/Google Play cho 2.000 người dùng đăng ký trước; họ dùng trên điện thoại riêng và gửi phản hồi qua form trong app.`,
      `An e-wallet app ships a beta via TestFlight/Google Play to 2,000 opted-in users, who use it on their own phones and send feedback through an in-app form.`,
      `电子钱包应用通过 TestFlight/Google Play 向 2000 名报名用户发布 Beta 版，用户在自己的手机上使用并通过应用内表单反馈。`,
    ),
    confusedWith: [
      {
        id: 'alpha-testing',
        note: L(
          `Alpha: tại môi trường của bên phát triển; beta: tại nơi bên ngoài, môi trường của người dùng.`,
          `Alpha: in the developer's environment; beta: at an external site, in the users' environment.`,
          `Alpha：在开发方环境；Beta：在外部场所、用户环境。`,
        ),
      },
    ],
  },

  'black-box-testing': {
    explanation: L(
      `Kiểm thử hộp đen (black-box testing, còn gọi specification-based testing) dựa trên đặc tả của thành phần/hệ thống, không dựa vào cấu trúc bên trong. Syllabus mô tả: test được suy ra từ tài liệu không liên quan đến cấu trúc nội bộ của đối tượng kiểm thử; mục tiêu chính là kiểm tra hành vi hệ thống so với đặc tả. Vì test case không phụ thuộc cách hiện thực, nếu code thay đổi mà hành vi yêu cầu giữ nguyên thì test case vẫn dùng được. Các kỹ thuật hộp đen trong CTFL: phân vùng tương đương (equivalence partitioning), phân tích giá trị biên (boundary value analysis), bảng quyết định (decision table testing), chuyển trạng thái (state transition testing).`,
      `Black-box testing (specification-based testing) is based on the specification of a component or system, not its internal structure. The syllabus says tests are derived from documentation not related to the internal structure of the test object, with the main objective of checking behavior against specifications. Because the test cases are independent of the implementation, they remain useful if the code changes but the required behavior does not. CTFL black-box techniques: equivalence partitioning, boundary value analysis, decision table testing, state transition testing.`,
      `黑盒测试（black-box testing，又称基于规格说明的测试）以组件或系统的规格说明为依据，而非其内部结构。大纲指出：测试从与测试对象内部结构无关的文档中推导，主要目标是对照规格说明检查系统行为。由于测试用例与实现无关，若实现改变而要求的行为不变，测试用例仍然有效。CTFL 的黑盒技术：等价类划分、边界值分析、决策表测试、状态转换测试。`,
    ),
    example: L(
      `Tester thiết kế test cho form đăng ký mở tài khoản chỉ dựa trên tài liệu yêu cầu (tuổi 18–65, CMND/CCCD 12 số), không cần xem code xử lý.`,
      `A tester designs tests for an account-opening form purely from the requirements (age 18-65, 12-digit ID number) without looking at the code.`,
      `测试人员仅根据需求（年龄 18–65 岁、12 位身份证号）为开户表单设计测试，无需查看代码。`,
    ),
    confusedWith: [
      {
        id: 'white-box-testing',
        note: L(
          `Hộp đen dựa vào đặc tả (hệ thống phải làm gì); hộp trắng (white-box) dựa vào cấu trúc bên trong (code, kiến trúc, luồng dữ liệu) và nhằm bao phủ cấu trúc đó.`,
          `Black-box uses the specification (what the system should do); white-box uses the internal structure (code, architecture, data flows) and aims to cover that structure.`,
          `黑盒依据规格说明（系统应做什么）；白盒依据内部结构（代码、架构、数据流），目标是覆盖该结构。`,
        ),
      },
      {
        id: 'functional-testing',
        note: L(
          `Functional testing nói về CÁI GÌ được kiểm thử (chức năng); black-box nói về CĂN CỨ để thiết kế test (đặc tả). Non-functional testing cũng có thể làm theo kiểu hộp đen.`,
          `Functional testing is about WHAT is tested (functions); black-box is about the BASIS for deriving tests (the specification). Non-functional tests can also be black-box.`,
          `功能测试关注测什么（功能）；黑盒关注依据什么设计测试（规格说明）。非功能测试同样可以是黑盒的。`,
        ),
      },
    ],
    versionNote: L(
      `Glossary v4.8.1 gọi black-box testing là một "test approach" (cách tiếp cận kiểm thử), còn syllabus v4.0.1 (mục 2.2.2) xếp nó vào bốn loại kiểm thử (test types) cùng functional, non-functional và white-box testing. Khi thi CTFL, hãy theo cách phân loại của syllabus.`,
      `Glossary v4.8.1 calls black-box testing a "test approach", while syllabus v4.0.1 (2.2.2) lists it as one of four test types alongside functional, non-functional and white-box testing. For CTFL, follow the syllabus classification.`,
      `术语表 v4.8.1 将黑盒测试称为"测试方法（test approach）"，而大纲 v4.0.1（2.2.2）将其列为四种测试类型之一（与功能、非功能、白盒测试并列）。备考 CTFL 时以大纲的分类为准。`,
    ),
  },

  'compatibility': {
    explanation: L(
      `Tính tương thích (compatibility) là mức độ một thành phần/hệ thống có thể trao đổi thông tin với các thành phần/hệ thống khác, và/hoặc thực hiện chức năng cần thiết khi dùng chung cùng môi trường phần cứng hoặc phần mềm. Đây là một trong các đặc tính chất lượng phi chức năng theo ISO/IEC 25010 được syllabus liệt kê; nó bao gồm khả năng cùng tồn tại (co-existence) và khả năng tương tác (interoperability).`,
      `Compatibility is the degree to which a component or system can exchange information with other components or systems and/or perform its required functions while sharing the same hardware or software environment. It is one of the ISO/IEC 25010 non-functional quality characteristics listed in the syllabus, covering co-existence and interoperability.`,
      `兼容性（compatibility）是组件或系统能与其他组件或系统交换信息，和/或在共享同一软硬件环境时执行所需功能的程度。它是大纲列出的 ISO/IEC 25010 非功能质量特性之一，包括共存性和互操作性。`,
    ),
    example: L(
      `Kiểm tra app ngân hàng vẫn hoạt động khi chạy cùng app bảo mật của nhà mạng trên cùng điện thoại, và trao đổi dữ liệu đúng với cổng thanh toán NAPAS.`,
      `Checking that the banking app still works when running alongside a carrier security app on the same phone, and exchanges data correctly with the national payment gateway.`,
      `检查银行应用与运营商安全应用在同一手机上同时运行时仍正常工作，并能与支付网关正确交换数据。`,
    ),
    confusedWith: [
      {
        id: 'portability',
        note: L(
          `Compatibility: hoạt động/trao đổi dữ liệu cùng hệ thống khác trong CÙNG môi trường; portability: chuyển được sang MÔI TRƯỜNG KHÁC (phần cứng, OS, nền tảng).`,
          `Compatibility: working with/exchanging data with other systems in the SAME environment; portability: being transferable to a DIFFERENT environment.`,
          `兼容性：在同一环境中与其他系统共同工作/交换数据；可移植性：能迁移到不同的环境。`,
        ),
      },
    ],
  },

  'component-integration-testing': {
    explanation: L(
      `Kiểm thử tích hợp thành phần (component integration testing) là kiểm thử tích hợp giữa các thành phần (component): tập trung vào giao diện (interface) và tương tác giữa chúng. Syllabus nói nó phụ thuộc nhiều vào chiến lược tích hợp như bottom-up, top-down hoặc big-bang, và thường do developer thực hiện.`,
      `Component integration testing is integration testing of components: it focuses on the interfaces and interactions between components. The syllabus notes it is heavily dependent on the integration strategy (bottom-up, top-down, big-bang) and is often performed by developers.`,
      `组件集成测试（component integration testing）是组件之间的集成测试，关注组件之间的接口和交互。大纲指出它在很大程度上依赖于集成策略（自底向上、自顶向下、大爆炸），通常由开发人员执行。`,
    ),
    example: L(
      `Kiểm tra module Giỏ hàng gọi đúng API của module Khuyến mãi (đúng tham số, xử lý đúng khi module Khuyến mãi trả lỗi) trong cùng một ứng dụng thương mại điện tử.`,
      `Checking that the Cart module calls the Promotion module's API correctly (right parameters, correct handling when Promotion returns an error) within the same e-commerce application.`,
      `检查同一电商应用中购物车模块是否正确调用促销模块的 API（参数正确、促销模块报错时处理正确）。`,
    ),
    confusedWith: [
      {
        id: 'system-integration-testing',
        note: L(
          `Component integration: giữa các thành phần BÊN TRONG một hệ thống; system integration: giữa hệ thống đang test với HỆ THỐNG KHÁC/dịch vụ bên ngoài (cổng thanh toán, hệ thống core banking).`,
          `Component integration: between components INSIDE one system; system integration: between the system under test and OTHER systems/external services.`,
          `组件集成：一个系统内部组件之间；系统集成：被测系统与其他系统/外部服务之间。`,
        ),
      },
      {
        id: 'component-testing',
        note: L(
          `Component testing kiểm thử từng thành phần riêng lẻ, cô lập; component integration testing kiểm thử giao diện/tương tác giữa các thành phần.`,
          `Component testing tests each component in isolation; component integration testing tests the interfaces/interactions between components.`,
          `组件测试孤立地测试单个组件；组件集成测试测试组件之间的接口/交互。`,
        ),
      },
    ],
    versionNote: L(
      `Syllabus v4.0.1 viết "component integration testing (also known as unit integration testing)", còn glossary v4.8.1 ghi từ đồng nghĩa là "module integration testing". Cả ba cách gọi chỉ cùng một cấp độ kiểm thử.`,
      `Syllabus v4.0.1 says "also known as unit integration testing", while glossary v4.8.1 lists the synonym "module integration testing". All refer to the same test level.`,
      `大纲 v4.0.1 写作"又称单元集成测试（unit integration testing）"，术语表 v4.8.1 给出的同义词是"模块集成测试（module integration testing）"，均指同一测试级别。`,
    ),
  },

  'component-testing': {
    explanation: L(
      `Kiểm thử thành phần (component testing) là cấp độ kiểm thử tập trung vào từng thành phần phần cứng hoặc phần mềm riêng lẻ. Syllabus mô tả: kiểm thử các component một cách cô lập, thường cần hỗ trợ đặc biệt như test harness hoặc unit test framework, và thường do developer làm trong môi trường phát triển của họ.`,
      `Component testing is the test level that focuses on individual hardware or software components. Per the syllabus, components are tested in isolation, often with test harnesses or unit test frameworks, normally by developers in their development environments.`,
      `组件测试（component testing）是关注单个硬件或软件组件的测试级别。大纲指出：组件被孤立地测试，通常需要测试工具集（test harness）或单元测试框架，一般由开发人员在开发环境中执行。`,
    ),
    example: L(
      `Developer viết JUnit test cho hàm tinhLaiTietKiem() với các kỳ hạn 1, 6, 12 tháng, dùng stub thay cho service lấy lãi suất.`,
      `A developer writes JUnit tests for calculateSavingsInterest() for 1-, 6- and 12-month terms, using a stub in place of the interest-rate service.`,
      `开发人员为 calculateSavingsInterest() 编写 JUnit 测试，覆盖 1、6、12 个月期限，并用桩（stub）替代利率服务。`,
    ),
    confusedWith: [
      {
        id: 'unit-testing',
        note: L(
          `Trong syllabus v4.0.1, unit testing là tên gọi khác của component testing. Glossary v4.8.1 có mục riêng cho unit testing ("phần code nhỏ nhất có thể kiểm thử cô lập"); khi thi, coi hai từ là tương đương.`,
          `In syllabus v4.0.1 unit testing is another name for component testing. Glossary v4.8.1 has a separate entry for unit testing ("smallest part of code testable in isolation"); for the exam treat them as equivalent.`,
          `大纲 v4.0.1 中单元测试是组件测试的别名。术语表 v4.8.1 为单元测试单独列条目（"可孤立测试的最小代码部分"）；考试时视为等同。`,
        ),
      },
    ],
    versionNote: L(
      `Syllabus v4.0.1 viết "component testing (also known as unit testing)"; glossary v4.8.1 ghi từ đồng nghĩa là "module testing" và định nghĩa unit testing thành một mục riêng. Glossary cũng nói "hardware or software components", còn syllabus chỉ bàn phần mềm.`,
      `Syllabus v4.0.1: "also known as unit testing"; glossary v4.8.1 lists "module testing" as the synonym and defines unit testing as a separate entry. The glossary also mentions hardware components; the syllabus discusses software only.`,
      `大纲 v4.0.1 写作"又称单元测试"；术语表 v4.8.1 的同义词为"模块测试（module testing）"，并把单元测试单列为一条。术语表还提到硬件组件，而大纲只讨论软件。`,
    ),
  },

  'confirmation-testing': {
    explanation: L(
      `Kiểm thử xác nhận (confirmation testing, còn gọi retesting) là loại kiểm thử liên quan đến thay đổi, thực hiện sau khi sửa lỗi để xác nhận lỗi gốc đã được sửa thành công và failure do nó gây ra không còn xuất hiện. Theo syllabus, tuỳ rủi ro có thể chạy lại tất cả các test đã fail vì lỗi đó, hoặc thêm test mới cho phần code thay đổi khi sửa lỗi; khi thiếu thời gian, có thể chỉ chạy các bước tái hiện failure. Syllabus khuyến nghị người đã thực hiện test ban đầu làm confirmation testing.`,
      `Confirmation testing (retesting) is change-related testing performed after a defect fix to confirm that the original defect was successfully fixed and its failure does not reoccur. Per the syllabus, depending on risk you may re-run all tests that failed due to the defect or add new tests for changes made in the fix; under time pressure it may be limited to re-running the steps that reproduce the failure. Preferably it is done by the person who ran the original test.`,
      `确认测试（confirmation testing，又称再测试 retesting）是与变更相关的测试，在缺陷修复后执行，确认原缺陷已成功修复、其引起的失效不再出现。大纲指出，可视风险重新执行所有因该缺陷而失败的测试，或为修复所做的变更增加新测试；时间紧张时可仅执行复现失效的步骤。最好由最初执行测试的人员进行。`,
    ),
    example: L(
      `Bug #482 "Nút Thanh toán không phản hồi khi dùng mã giảm giá" được dev đánh dấu Fixed; tester chạy lại đúng test case TC-PAY-17 đã fail trên build mới và thấy thanh toán thành công → đóng bug.`,
      `Bug #482 "Pay button unresponsive with a discount code" is marked Fixed; the tester re-runs the failed test TC-PAY-17 on the new build, payment succeeds, the bug is closed.`,
      `缺陷 #482"使用优惠码时支付按钮无响应"被标记为已修复；测试人员在新构建上重新执行失败的用例 TC-PAY-17，支付成功，关闭缺陷。`,
    ),
    confusedWith: [
      {
        id: 'regression-testing',
        note: L(
          `Confirmation testing hỏi "lỗi ĐÃ SỬA đã hết chưa?"; regression testing hỏi "thay đổi (kể cả bản sửa) có làm HỎNG chỗ khác không?". Thường làm confirmation trước, regression sau.`,
          `Confirmation testing asks "is the FIXED defect really gone?"; regression testing asks "did the change (including the fix) BREAK anything else?". Usually confirmation first, then regression.`,
          `确认测试问"已修复的缺陷是否真的消失？"；回归测试问"变更（包括修复）是否破坏了其他部分？"。通常先确认测试，再回归测试。`,
        ),
      },
      {
        id: 'debugging',
        note: L(
          `Debugging (tái hiện, chẩn đoán, sửa lỗi) là hoạt động phát triển, không phải kiểm thử; confirmation testing diễn ra SAU debugging để kiểm tra bản sửa.`,
          `Debugging (reproduce, diagnose, fix) is a development activity, not testing; confirmation testing comes AFTER debugging to check the fix.`,
          `调试（复现、诊断、修复）是开发活动而非测试；确认测试在调试之后用于检查修复结果。`,
        ),
      },
    ],
  },

  'continuous-delivery': {
    explanation: L(
      `Chuyển giao liên tục (continuous delivery, CD) là quy trình phát triển tự động, trong đó mỗi thay đổi code được tự động build, test và chuẩn bị sẵn để phát hành lên production. Syllabus nhắc CD là một thực hành kỹ thuật của DevOps (cùng CI), giúp phản hồi nhanh và hỗ trợ shift left; quyết định đưa lên production vẫn có thể là một bước thủ công.`,
      `Continuous delivery (CD) is an automated procedure in which code changes are automatically built, tested and prepared for a release to production. The syllabus mentions CD (with CI) as a DevOps technical practice providing fast feedback and supporting shift left; the actual release to production may still be a manual decision.`,
      `持续交付（continuous delivery, CD）是一种自动化软件开发过程，代码变更被自动构建、测试并做好发布到生产环境的准备。大纲将 CD（与 CI 一起）列为 DevOps 的技术实践，可提供快速反馈并支持左移；是否真正发布到生产仍可由人工决定。`,
    ),
    example: L(
      `Mỗi lần merge vào nhánh main, pipeline tự build app, chạy unit test, API test và E2E test trên staging; nếu xanh, gói release sẵn sàng và Product Owner bấm nút "Deploy" khi muốn phát hành.`,
      `On each merge to main the pipeline builds the app and runs unit, API and E2E tests on staging; if green, the release package is ready and the Product Owner clicks "Deploy" when desired.`,
      `每次合并到 main 分支，流水线自动构建并在预发环境运行单元、API 和端到端测试；全部通过后发布包就绪，产品负责人在需要时点击"部署"。`,
    ),
    confusedWith: [
      {
        id: 'continuous-deployment',
        note: L(
          `Continuous delivery: thay đổi được chuẩn bị SẴN SÀNG phát hành; continuous deployment: thay đổi được TỰ ĐỘNG đưa lên production sau khi qua hết các test đã định.`,
          `Continuous delivery: changes are made READY for release; continuous deployment: changes are AUTOMATICALLY deployed to production after all specified tests pass.`,
          `持续交付：变更随时可发布；持续部署：通过所有指定测试后自动部署到生产环境。`,
        ),
      },
      {
        id: 'continuous-integration',
        note: L(
          `CI tập trung vào việc merge, tích hợp và test mỗi thay đổi ngay khi commit; CD đi xa hơn — đưa thay đổi tới trạng thái sẵn sàng phát hành.`,
          `CI focuses on merging, integrating and testing each change as soon as it is committed; CD goes further, bringing changes to a releasable state.`,
          `CI 侧重在每次提交后立即合并、集成并测试；CD 更进一步，使变更达到可发布状态。`,
        ),
      },
    ],
  },

  'continuous-integration': {
    explanation: L(
      `Tích hợp liên tục (continuous integration, CI) là quy trình tự động merge, tích hợp và kiểm thử mọi thay đổi ngay khi chúng được commit. Theo syllabus (DevOps), CI thúc đẩy shift left bằng cách khuyến khích developer nộp code chất lượng kèm component test và phân tích tĩnh (static analysis); khi dùng CI nên đưa cả test hồi quy tự động vào pipeline.`,
      `Continuous integration (CI) is an automated procedure that merges, integrates and tests all changes as soon as they are committed. In the syllabus (DevOps), CI promotes shift left by encouraging developers to submit high-quality code with component tests and static analysis; where CI is used it is good practice to include automated regression tests.`,
      `持续集成（continuous integration, CI）是一种自动化过程，在每次提交后立即合并、集成并测试所有变更。大纲（DevOps 部分）指出，CI 鼓励开发人员提交附带组件测试和静态分析的高质量代码，从而促进左移；使用 CI 时应纳入自动化回归测试。`,
    ),
    example: L(
      `Mỗi pull request trên GitLab kích hoạt job: build, chạy SonarQube, 1.200 unit test và bộ smoke API test; PR chỉ được merge khi pipeline xanh.`,
      `Each GitLab merge request triggers a job: build, SonarQube scan, 1,200 unit tests and a smoke API suite; it can only be merged when the pipeline is green.`,
      `GitLab 的每个合并请求都会触发作业：构建、SonarQube 扫描、1200 个单元测试和冒烟 API 测试；流水线全部通过才能合并。`,
    ),
    confusedWith: [
      {
        id: 'continuous-testing',
        note: L(
          `CI là quy trình kỹ thuật tích hợp + test mỗi commit; continuous testing là cách tiếp cận kiểm thử xuyên suốt vòng đời, sớm và thường xuyên, dùng tự động hoá để có phản hồi nhanh — CI là một công cụ để thực hiện nó.`,
          `CI is the engineering procedure of integrating and testing every commit; continuous testing is a test approach of testing early and often throughout the lifecycle with automation for fast feedback — CI is one means of achieving it.`,
          `CI 是对每次提交进行集成和测试的工程过程；持续测试是在整个生命周期中尽早、频繁测试并借助自动化获得快速反馈的测试方法——CI 是实现它的手段之一。`,
        ),
      },
    ],
  },

  'continuous-testing': {
    explanation: L(
      `Kiểm thử liên tục (continuous testing) là cách tiếp cận kiểm thử xuyên suốt vòng đời phát triển phần mềm, sớm và thường xuyên, và tự động hoá test để có phản hồi nhanh nhất có thể về các ứng viên phát hành. Syllabus chỉ nhắc continuous testing như một hình thức của hoạt động thực thi kiểm thử (test execution).`,
      `Continuous testing is a test approach that tests throughout the SDLC, early and often, and automates tests to get feedback on release candidates as quickly as possible. The syllabus mentions it only as one form that test execution can take.`,
      `持续测试（continuous testing）是一种在整个软件开发生命周期中尽早、频繁地测试并自动化测试，以尽快获得候选发布版本反馈的测试方法。大纲仅将其作为测试执行的一种形式提及。`,
    ),
    example: L(
      `Ứng dụng đặt vé: unit test chạy mỗi commit, API test chạy mỗi giờ, E2E test chạy mỗi đêm trên bản release candidate, kết quả hiển thị trên dashboard cho cả nhóm.`,
      `Ticket-booking app: unit tests on each commit, API tests hourly, E2E tests nightly on the release candidate, with results on a team dashboard.`,
      `订票应用：每次提交运行单元测试、每小时运行 API 测试、每晚对候选发布版本运行端到端测试，结果显示在团队看板上。`,
    ),
  },

  'coverage': {
    explanation: L(
      `Độ bao phủ (coverage, test coverage) là mức độ các mục bao phủ (coverage item) đã xác định được bộ test (test suite) thực thi, biểu diễn bằng phần trăm. Công thức chung trong syllabus: số coverage item đã được ít nhất một test case thực thi chia cho tổng số coverage item đã xác định. Coverage item khác nhau theo kỹ thuật: phân vùng (EP), giá trị biên (BVA), cột/quy tắc (decision table), trạng thái/chuyển trạng thái (state transition), câu lệnh (statement), nhánh (branch). Coverage được dùng làm tiêu chí kết thúc (exit criteria) và đánh giá qua truy vết (traceability). Lưu ý: 100% coverage không có nghĩa là không còn lỗi.`,
      `Coverage (test coverage) is the degree to which specified coverage items are exercised by a test suite, expressed as a percentage. The syllabus formula: coverage items exercised by at least one test case divided by the total identified coverage items. Coverage items depend on the technique: partitions (EP), boundary values (BVA), columns/rules (decision tables), states/transitions (state transition), statements, branches. Coverage is used in exit criteria and evaluated via traceability. 100% coverage does not mean no defects remain.`,
      `覆盖率（coverage，测试覆盖率）是测试套件执行指定覆盖项的程度，以百分比表示。大纲的通用公式：至少被一个测试用例执行的覆盖项数 ÷ 已识别覆盖项总数。覆盖项因技术而异：等价类（EP）、边界值（BVA）、决策表的列/规则、状态/转换、语句、分支。覆盖率常用作准出准则，并通过可追溯性来评估。100% 覆盖并不意味着没有缺陷。`,
    ),
    example: L(
      `Trường "số tiền chuyển" có 3 phân vùng (<10.000đ không hợp lệ, 10.000–50.000.000đ hợp lệ, >50.000.000đ không hợp lệ). Bộ test chỉ thử 2 phân vùng → EP coverage = 2/3 ≈ 67%.`,
      `The "transfer amount" field has 3 partitions (<10,000 invalid, 10,000-50,000,000 valid, >50,000,000 invalid). Tests exercise only 2 → EP coverage = 2/3 ≈ 67%.`,
      `"转账金额"字段有 3 个等价类（<1 万无效、1 万–5000 万有效、>5000 万无效）。测试只覆盖其中 2 个 → 等价类覆盖率 = 2/3 ≈ 67%。`,
    ),
    confusedWith: [
      {
        id: 'coverage-item',
        note: L(
          `Coverage item là "đơn vị được đếm" (một phân vùng, một giá trị biên, một nhánh…); coverage là tỷ lệ phần trăm các đơn vị đó đã được thực thi.`,
          `A coverage item is the "thing counted" (a partition, a boundary value, a branch…); coverage is the percentage of those items exercised.`,
          `覆盖项是"被计数的单位"（一个等价类、一个边界值、一个分支……）；覆盖率是这些单位被执行的百分比。`,
        ),
      },
    ],
  },

  'coverage-item': {
    explanation: L(
      `Mục bao phủ (coverage item) là một thuộc tính hoặc tổ hợp thuộc tính được suy ra từ một hay nhiều điều kiện kiểm thử (test condition) bằng một kỹ thuật kiểm thử. Trong hoạt động thiết kế kiểm thử (test design), coverage item giúp định hướng việc xác định đầu vào của test case và là "mẫu số" để đo coverage. Ví dụ theo syllabus: với EP là các phân vùng; BVA 2 giá trị là giá trị biên và láng giềng gần nhất ở phân vùng kề; BVA 3 giá trị là giá trị biên và cả hai láng giềng; bảng quyết định là các cột khả thi; statement testing là các câu lệnh thực thi được; branch testing là các nhánh.`,
      `A coverage item is an attribute or combination of attributes derived from one or more test conditions by using a test technique. In test design, coverage items guide the specification of test case inputs and are the denominator for measuring coverage. Syllabus examples: partitions (EP); a boundary value and its closest neighbor in the adjacent partition (2-value BVA); a boundary value and both neighbors (3-value BVA); feasible columns (decision tables); executable statements; branches.`,
      `覆盖项（coverage item）是使用测试技术从一个或多个测试条件推导出的属性或属性组合。在测试设计中，覆盖项指导测试用例输入的确定，并作为计算覆盖率的分母。大纲示例：等价类（EP）；边界值及相邻分区中最近的邻值（两值 BVA）；边界值及其两侧邻值（三值 BVA）；决策表中可行的列；可执行语句；分支。`,
    ),
    example: L(
      `Điều kiện kiểm thử "tuổi mở tài khoản 18–65": với BVA 2 giá trị, coverage item là 17, 18, 65, 66; với BVA 3 giá trị là 17, 18, 19, 64, 65, 66.`,
      `Test condition "account-opening age 18-65": with 2-value BVA the coverage items are 17, 18, 65, 66; with 3-value BVA they are 17, 18, 19, 64, 65, 66.`,
      `测试条件"开户年龄 18–65 岁"：两值 BVA 的覆盖项为 17、18、65、66；三值 BVA 为 17、18、19、64、65、66。`,
    ),
    confusedWith: [
      {
        id: 'test-condition',
        note: L(
          `Test condition (test analysis) là "cái cần kiểm thử", ví dụ "kiểm tra giới hạn tuổi"; coverage item (test design) được suy ra từ test condition bằng một kỹ thuật, ví dụ "giá trị 17 và 18"; test case thì cụ thể hơn nữa (đầu vào, kết quả mong đợi, điều kiện tiên quyết).`,
          `A test condition (test analysis) is "what to test", e.g. "age limit"; a coverage item (test design) is derived from it by a technique, e.g. "values 17 and 18"; a test case is more concrete still (inputs, expected results, preconditions).`,
          `测试条件（测试分析）是"测什么"，如"年龄限制"；覆盖项（测试设计）是用某种技术从测试条件推导出来的，如"值 17 和 18"；测试用例则更具体（输入、预期结果、前置条件）。`,
        ),
      },
    ],
  },

  'debugging': {
    explanation: L(
      `Gỡ lỗi (debugging) là quá trình tìm, phân tích và loại bỏ nguyên nhân gây ra failure. Syllabus nhấn mạnh testing và debugging là hai hoạt động tách biệt: testing gây ra failure (dynamic testing) hoặc tìm trực tiếp defect (static testing); debugging là hoạt động phát triển, không phải kiểm thử. Khi dynamic testing gây failure, quá trình debugging điển hình gồm: tái hiện failure, chẩn đoán (tìm defect), sửa defect. Khi static testing tìm ra defect, debugging chỉ cần loại bỏ nó, không cần tái hiện hay chẩn đoán.`,
      `Debugging is the process of finding, analyzing and removing the causes of failures. The syllabus stresses that testing and debugging are separate: testing triggers failures (dynamic testing) or finds defects directly (static testing); debugging is a non-testing activity. After a failure in dynamic testing, debugging typically involves reproduction, diagnosis (finding the defect) and fixing. For a defect found by static testing, debugging just removes it — no reproduction or diagnosis is needed.`,
      `调试（debugging）是查找、分析并消除失效原因的过程。大纲强调测试与调试是两项独立活动：测试引发失效（动态测试）或直接发现缺陷（静态测试）；调试是非测试活动。动态测试引发失效后，调试通常包括：复现失效、诊断（找到缺陷）、修复缺陷。对于静态测试发现的缺陷，调试只需消除它，无需复现或诊断。`,
    ),
    example: L(
      `Tester báo "tổng tiền đơn hàng sai khi có 2 mã giảm giá". Developer tái hiện trên máy local, đặt breakpoint, phát hiện hàm áp mã cộng dồn phần trăm sai thứ tự, rồi sửa code.`,
      `A tester reports "order total wrong with 2 discount codes". The developer reproduces it locally, sets breakpoints, finds the discount function applies percentages in the wrong order, and fixes it.`,
      `测试人员报告"使用两个优惠码时订单总额错误"。开发人员在本地复现、设置断点，发现优惠计算函数叠加百分比的顺序错误，然后修复代码。`,
    ),
    confusedWith: [
      {
        id: 'testing',
        note: L(
          `Testing phát hiện failure/defect và đánh giá chất lượng; debugging tìm nguyên nhân và sửa. Tester thường không debug; developer debug rồi tester làm confirmation testing.`,
          `Testing reveals failures/defects and evaluates quality; debugging finds the cause and fixes it. Developers debug, then testers perform confirmation testing.`,
          `测试发现失效/缺陷并评估质量；调试找到原因并修复。通常开发人员调试，然后测试人员进行确认测试。`,
        ),
      },
    ],
  },

  'defect': {
    explanation: L(
      `Khiếm khuyết (defect, còn gọi bug, fault, flaw) là điểm không hoàn hảo hoặc thiếu sót trong một sản phẩm công việc khiến nó không đáp ứng yêu cầu/đặc tả hoặc làm suy giảm mục đích sử dụng. Theo syllabus: con người mắc lỗi (error), tạo ra defect, defect có thể dẫn tới failure. Defect có thể nằm trong tài liệu (đặc tả yêu cầu, test script), trong mã nguồn, hoặc sản phẩm hỗ trợ như file build. Không phải defect nào cũng gây failure: có cái luôn gây failure khi được thực thi, có cái chỉ gây failure trong điều kiện đặc biệt, có cái không bao giờ gây failure. Static testing tìm defect trực tiếp; dynamic testing gây failure rồi phân tích để tìm defect.`,
      `A defect (bug, fault, flaw) is an imperfection or deficiency in a work product where it does not meet its requirements or specifications or impairs its intended use. Per the syllabus, humans make errors, which produce defects, which may result in failures. Defects can be in documentation (requirements, test scripts), source code or supporting work products such as build files. Some defects always cause a failure when executed, some only in specific circumstances, some never. Static testing finds defects directly; dynamic testing causes failures from which defects are determined by analysis.`,
      `缺陷（defect，又称 bug、故障 fault、瑕疵 flaw）是工作产品中不满足需求或规格说明、或妨碍其预期用途的不完善或不足之处。大纲指出：人犯错误（error），产生缺陷，缺陷可能导致失效（failure）。缺陷可能存在于文档（需求规格、测试脚本）、源代码或构建文件等辅助工作产品中。有些缺陷一旦执行必然导致失效，有些仅在特定情况下导致失效，有些永远不会。静态测试直接发现缺陷；动态测试引发失效，再通过分析确定缺陷。`,
    ),
    example: L(
      `Đặc tả: được chuyển tối đa 50.000.000đ (tính cả 50.000.000đ), nhưng code viết "if (soTien >= 50000000) tuChoi()" — đây là defect (biên đặt sai chỗ); nó chỉ gây failure khi khách chuyển đúng 50.000.000đ.`,
      `Spec: up to and including 50,000,000 may be transferred, but the code says "if (amount >= 50000000) reject()" — a misplaced boundary is a defect that only causes a failure when someone transfers exactly 50,000,000.`,
      `规格：最多可转账 5000 万（含 5000 万），但代码写成 "if (amount >= 50000000) reject()"——边界位置错误就是缺陷，只有在恰好转账 5000 万时才会导致失效。`,
    ),
    confusedWith: [
      {
        id: 'error',
        note: L(
          `Error là HÀNH ĐỘNG sai của con người (dev hiểu sai yêu cầu); defect là KẾT QUẢ nằm trong sản phẩm (dòng code sai, câu yêu cầu mơ hồ).`,
          `An error is the human ACTION (developer misreads a requirement); a defect is the RESULT inside the work product (wrong line of code, ambiguous requirement).`,
          `错误是人的行为（开发人员误解需求）；缺陷是工作产品中的结果（错误的代码行、模糊的需求）。`,
        ),
      },
      {
        id: 'failure',
        note: L(
          `Defect nằm tĩnh trong sản phẩm; failure là SỰ KIỆN quan sát được khi chạy hệ thống (hệ thống làm sai). Một defect có thể không bao giờ gây failure.`,
          `A defect sits statically in the product; a failure is an observable EVENT during execution (the system misbehaves). A defect may never cause a failure.`,
          `缺陷静态地存在于产品中；失效是运行时可观察到的事件（系统行为错误）。缺陷可能永远不会导致失效。`,
        ),
      },
      {
        id: 'root-cause',
        note: L(
          `Root cause là lý do gốc dẫn tới error/defect (ví dụ áp lực thời gian, thiếu đào tạo); sửa defect chỉ xử lý một lỗi, xử lý root cause giúp ngăn các defect tương tự.`,
          `The root cause is the fundamental reason behind the error/defect (e.g. time pressure, lack of training); fixing a defect removes one instance, addressing the root cause prevents similar defects.`,
          `根本原因是导致错误/缺陷的根本理由（如时间压力、培训不足）；修复缺陷只解决一个实例，消除根本原因才能预防类似缺陷。`,
        ),
      },
      {
        id: 'anomaly',
        note: L(
          `Anomaly là bất kỳ điều gì lệch khỏi kỳ vọng; khi báo cáo, anomaly có thể hoá ra là defect thật hoặc thứ khác (false positive, change request).`,
          `An anomaly is anything that deviates from expectation; a reported anomaly may turn out to be a real defect or something else (false positive, change request).`,
          `异常（anomaly）是任何偏离预期的情况；被报告的异常最终可能是真实缺陷，也可能是其他情况（误报、变更请求）。`,
        ),
      },
    ],
  },

  'defect-report': {
    explanation: L(
      `Báo cáo khiếm khuyết (defect report, bug report) là tài liệu ghi lại sự xuất hiện, bản chất và trạng thái của một defect. Theo syllabus, mục tiêu: cung cấp đủ thông tin cho người xử lý để giải quyết vấn đề, theo dõi chất lượng sản phẩm, và gợi ý cải tiến quy trình. Một defect report trong dynamic testing thường có: ID duy nhất, tiêu đề tóm tắt, ngày/tổ chức/tác giả, đối tượng và môi trường test, ngữ cảnh, mô tả failure với các bước tái hiện và bằng chứng (log, ảnh chụp), kết quả mong đợi và thực tế, mức độ nghiêm trọng (severity), độ ưu tiên (priority), trạng thái, tham chiếu (ví dụ test case). Defect report cũng là sản phẩm của test analysis (lỗi trong test basis) và test execution.`,
      `A defect report (bug report) documents the occurrence, nature and status of a defect. Per the syllabus its objectives are to give those resolving it enough information, to track work product quality and to provide ideas for process improvement. A defect report from dynamic testing typically includes: unique ID, title/summary, date/organization/author, test object and environment, context, failure description with reproduction steps and evidence, expected and actual results, severity, priority, status and references (e.g. to the test case). Defect reports are work products of test analysis (defects in the test basis) and test execution.`,
      `缺陷报告（defect report，bug report）记录缺陷的发生、性质和状态。大纲指出其目标是：为处理者提供足够信息以解决问题、跟踪工作产品质量、为过程改进提供思路。动态测试中的缺陷报告通常包括：唯一标识、标题摘要、日期/组织/作者、测试对象和测试环境、上下文、带复现步骤与证据（日志、截图）的失效描述、预期结果与实际结果、严重程度、优先级、状态、引用（如测试用例）。缺陷报告是测试分析（测试依据中的缺陷）和测试执行的工作产品。`,
    ),
    example: L(
      `BUG-1024 "Chuyển khoản 24/7 bị trừ tiền 2 lần khi mất mạng giữa chừng" — Môi trường: UAT, Android 14, app v3.2.1; Bước: 1) chuyển 500.000đ 2) tắt Wi-Fi khi đang xử lý 3) bật lại; Mong đợi: trừ 1 lần; Thực tế: trừ 2 lần; Severity: Critical; Priority: P1; kèm video và log.`,
      `BUG-1024 "24/7 transfer debited twice when network drops mid-way" — Env: UAT, Android 14, app v3.2.1; Steps: 1) transfer 500,000 2) turn off Wi-Fi while processing 3) turn it on; Expected: one debit; Actual: two debits; Severity: Critical; Priority: P1; video and logs attached.`,
      `BUG-1024"24 小时转账在中途断网时被扣款两次"——环境：UAT、Android 14、应用 v3.2.1；步骤：1) 转账 50 万 2) 处理中关闭 Wi-Fi 3) 重新打开；预期：扣款一次；实际：扣款两次；严重程度：致命；优先级：P1；附视频和日志。`,
    ),
    confusedWith: [
      {
        id: 'test-log',
        note: L(
          `Test log ghi lại theo thời gian mọi chi tiết thực thi test (kể cả test pass); defect report chỉ viết cho một anomaly/defect cụ thể và theo dõi nó đến khi đóng.`,
          `A test log is a chronological record of test execution (including passed tests); a defect report covers one specific anomaly/defect and tracks it until closure.`,
          `测试日志按时间记录测试执行的所有细节（包括通过的测试）；缺陷报告针对某个具体异常/缺陷并跟踪直至关闭。`,
        ),
      },
    ],
  },

  'driver': {
    explanation: L(
      `Driver (test driver) là một thành phần hoặc công cụ tạm thời thay thế một thành phần khác và điều khiển/gọi đối tượng kiểm thử (test item) một cách cô lập. Nói đơn giản, driver đóng vai "bên gọi" khi bên gọi thật chưa có. Syllabus liệt kê driver (cùng stub, simulator, service virtualization) là các thành phần của môi trường kiểm thử, được tạo ra trong test implementation.`,
      `A driver (test driver) is a component or tool that temporarily replaces another component and controls or calls a test item in isolation — it plays the "caller" when the real caller is not available. The syllabus lists drivers (with stubs, simulators, service virtualization) as test environment items created during test implementation.`,
      `驱动器（driver，测试驱动）是临时替代另一组件、并孤立地控制或调用测试项的组件或工具——当真正的调用方尚不可用时，它充当"调用方"。大纲将驱动器（与桩、模拟器、服务虚拟化一起）列为测试实现阶段创建的测试环境项。`,
    ),
    example: L(
      `Màn hình đặt hàng chưa làm xong, nhưng API tính phí vận chuyển đã có: tester viết một script Postman/Python làm driver, gọi API với nhiều địa chỉ và cân nặng khác nhau để kiểm tra kết quả.`,
      `The checkout screen is not ready but the shipping-fee API is: the tester writes a Postman/Python script as a driver that calls the API with different addresses and weights.`,
      `下单页面尚未完成，但运费计算 API 已就绪：测试人员编写 Postman/Python 脚本作为驱动器，用不同地址和重量调用该 API。`,
    ),
    confusedWith: [
      {
        id: 'stub',
        note: L(
          `Driver thay cho thành phần GỌI đối tượng test (ở phía trên); stub thay cho thành phần ĐƯỢC đối tượng test gọi (ở phía dưới) và trả về phản hồi định sẵn.`,
          `A driver replaces the component that CALLS the test item (above it); a stub replaces a component CALLED BY the test item (below it) and returns predefined responses.`,
          `驱动器替代调用测试项的组件（上层）；桩替代被测试项调用的组件（下层），并返回预定义的响应。`,
        ),
      },
    ],
  },

  'dynamic-testing': {
    explanation: L(
      `Kiểm thử động (dynamic testing) là cách tiếp cận kiểm thử có thực thi đối tượng kiểm thử (chạy phần mềm). Syllabus: dynamic testing dùng các kỹ thuật và cách tiếp cận kiểm thử để suy ra test case; nó gây ra failure, từ đó defect liên quan được xác định qua phân tích; chỉ áp dụng cho sản phẩm thực thi được và đo được các đặc tính phụ thuộc việc chạy code (ví dụ hiệu năng). Static testing và dynamic testing bổ trợ cho nhau, và cả hai nên bắt đầu càng sớm càng tốt.`,
      `Dynamic testing is a test approach that involves executing the test item. Per the syllabus it uses test techniques and approaches to derive test cases; it causes failures, from which the associated defects are determined by analysis; it applies only to executable work products and can measure characteristics that depend on running code (e.g. performance efficiency). Static and dynamic testing complement each other and both should start as early as possible.`,
      `动态测试（dynamic testing）是需要执行测试项的测试方法。大纲指出：它使用测试技术和方法推导测试用例；它引发失效，再通过分析确定相关缺陷；只适用于可执行的工作产品，能度量依赖代码运行的质量特性（如性能效率）。静态测试与动态测试相辅相成，两者都应尽早开始。`,
    ),
    example: L(
      `Chạy app mua sắm trên điện thoại, thêm sản phẩm vào giỏ, thanh toán bằng thẻ test và so sánh kết quả thực tế với kết quả mong đợi.`,
      `Running the shopping app on a phone, adding items to the cart, paying with a test card and comparing actual with expected results.`,
      `在手机上运行购物应用，加入购物车，用测试卡支付，并将实际结果与预期结果比较。`,
    ),
    confusedWith: [
      {
        id: 'static-testing',
        note: L(
          `Static testing KHÔNG chạy phần mềm (review, static analysis), tìm defect trực tiếp, áp dụng được cho tài liệu; dynamic testing CÓ chạy phần mềm, phát hiện failure rồi mới truy ra defect.`,
          `Static testing does NOT execute the software (reviews, static analysis), finds defects directly and applies to documents too; dynamic testing DOES execute it, revealing failures from which defects are traced.`,
          `静态测试不执行软件（评审、静态分析），直接发现缺陷，也可用于文档；动态测试执行软件，先发现失效再追溯缺陷。`,
        ),
      },
    ],
  },

  'entry-criteria': {
    explanation: L(
      `Tiêu chí bắt đầu (entry criteria) là tập điều kiện để chính thức bắt đầu một nhiệm vụ đã xác định. Syllabus: entry criteria xác định các điều kiện tiên quyết để thực hiện một hoạt động; nếu không đáp ứng, hoạt động có thể khó hơn, tốn thời gian, chi phí và rủi ro hơn. Ví dụ điển hình: sẵn có nguồn lực (người, công cụ, môi trường, test data, ngân sách, thời gian), sẵn có testware (test basis, yêu cầu kiểm thử được, user story, test case), và mức chất lượng ban đầu của đối tượng test (ví dụ smoke test đã pass). Trong Agile, entry criteria cho user story gọi là Definition of Ready. Entry criteria là một phần của test plan.`,
      `Entry criteria are the set of conditions for officially starting a defined task. The syllabus says they define the preconditions for an activity; if not met, the activity is likely to be more difficult, time-consuming, costly and risky. Typical examples: availability of resources (people, tools, environments, test data, budget, time), of testware (test basis, testable requirements, user stories, test cases) and an initial quality level of the test object (e.g. all smoke tests passed). In Agile, entry criteria for a user story are the Definition of Ready. They are usually part of the test plan.`,
      `准入准则（entry criteria）是正式开始某项既定任务的条件集合。大纲指出它定义开展某项活动的前提条件；若未满足，活动可能更困难、更耗时、成本和风险更高。典型示例：资源可用（人员、工具、环境、测试数据、预算、时间）、测试件可用（测试依据、可测试的需求、用户故事、测试用例）、测试对象达到初始质量水平（如冒烟测试全部通过）。在敏捷中，用户故事的准入准则称为"就绪的定义（Definition of Ready）"。它通常是测试计划的一部分。`,
    ),
    example: L(
      `Điều kiện bắt đầu system test cho bản phát hành ví điện tử: môi trường SIT đã dựng xong, có dữ liệu 500 tài khoản test, build qua toàn bộ smoke test, tài liệu đặc tả đã được review.`,
      `Entry criteria for e-wallet system testing: SIT environment ready, 500 test accounts loaded, build passes all smoke tests, specification reviewed.`,
      `电子钱包系统测试的准入准则：SIT 环境搭建完毕、已准备 500 个测试账户、构建通过全部冒烟测试、规格说明已评审。`,
    ),
    confusedWith: [
      {
        id: 'exit-criteria',
        note: L(
          `Entry criteria trả lời "đã đủ điều kiện để BẮT ĐẦU chưa?"; exit criteria trả lời "đã đủ điều kiện để KẾT THÚC chưa?". Trong mô hình tuần tự, exit criteria của level trước thường là một phần entry criteria của level sau.`,
          `Entry criteria answer "can we START?"; exit criteria answer "can we declare it DONE?". In sequential models the exit criteria of one level are often part of the entry criteria of the next.`,
          `准入准则回答"能否开始？"；准出准则回答"能否宣布完成？"。在顺序模型中，前一级别的准出准则常是后一级别准入准则的一部分。`,
        ),
      },
    ],
  },

  'error': {
    explanation: L(
      `Lỗi (error, còn gọi mistake) là hành động của con người dẫn tới một defect. Syllabus: con người mắc error vì nhiều lý do như áp lực thời gian, độ phức tạp của sản phẩm, quy trình, hạ tầng hoặc tương tác, hay đơn giản vì mệt mỏi hoặc thiếu đào tạo. Chuỗi nhân quả: error → defect → (có thể) failure; phía sau error có thể là một root cause.`,
      `An error (mistake) is a human action that results in a defect. Per the syllabus people make errors due to time pressure, complexity of work products, processes, infrastructure or interactions, or simply because they are tired or lack training. Chain: error → defect → (possibly) failure; behind the error there may be a root cause.`,
      `错误（error，又称 mistake）是导致缺陷的人为行为。大纲指出：人会因时间压力、工作产品/过程/基础设施/交互的复杂性，或者仅仅因为疲劳或缺乏培训而犯错。因果链：错误 → 缺陷 →（可能）失效；错误背后可能还有根本原因。`,
    ),
    example: L(
      `BA chịu áp lực deadline nên ghi nhầm hạn mức rút tiền ATM là "5 triệu/lần" thay vì "5 triệu/ngày" — hành động ghi nhầm đó là error; câu sai trong tài liệu yêu cầu là defect.`,
      `Under deadline pressure a BA writes the ATM withdrawal limit as "5 million per transaction" instead of "per day" — the act of miswriting is the error; the wrong sentence in the requirements is the defect.`,
      `BA 因赶工期把 ATM 取款限额误写成"每次 500 万"而非"每天 500 万"——误写这个行为是错误；需求文档中的错误语句是缺陷。`,
    ),
    confusedWith: [
      {
        id: 'defect',
        note: L(
          `Error là hành động của con người; defect là kết quả của hành động đó, nằm trong sản phẩm công việc.`,
          `The error is the human action; the defect is its result inside the work product.`,
          `错误是人的行为；缺陷是该行为在工作产品中留下的结果。`,
        ),
      },
      {
        id: 'failure',
        note: L(
          `Error xảy ra lúc con người làm việc (viết code, viết tài liệu); failure xảy ra lúc hệ thống chạy. Chữ "lỗi" trong tiếng Việt hay bị dùng lẫn cho cả hai — khi thi hãy nhớ tên tiếng Anh.`,
          `An error happens while people work (coding, writing specs); a failure happens while the system runs. In everyday speech "bug/error" is used loosely for both — use the precise English terms.`,
          `错误发生在人工作时（编码、写文档）；失效发生在系统运行时。日常口语常混用，考试时请使用准确的英文术语。`,
        ),
      },
      {
        id: 'root-cause',
        note: L(
          `Root cause là lý do khiến con người mắc error (ví dụ thiếu đào tạo về quy định mới); error là hành động sai cụ thể.`,
          `The root cause is why the person made the error (e.g. no training on a new regulation); the error is the specific wrong action.`,
          `根本原因是人为何犯错（如未接受新规培训）；错误是具体的错误行为。`,
        ),
      },
    ],
  },

  'exhaustive-testing': {
    explanation: L(
      `Kiểm thử toàn diện (exhaustive testing, complete testing) là cách tiếp cận mà bộ test bao gồm mọi tổ hợp giá trị đầu vào và điều kiện tiên quyết. Theo nguyên tắc kiểm thử số 2 của syllabus, "exhaustive testing is impossible": kiểm thử mọi thứ là không khả thi trừ trường hợp tầm thường; thay vào đó nên dùng kỹ thuật kiểm thử, ưu tiên test case và kiểm thử dựa trên rủi ro (risk-based testing) để tập trung nỗ lực.`,
      `Exhaustive testing (complete testing) is a test approach in which the test suite comprises all combinations of input values and preconditions. Testing principle 2 in the syllabus: exhaustive testing is impossible except in trivial cases; instead, use test techniques, test case prioritization and risk-based testing to focus effort.`,
      `穷尽测试（exhaustive testing，完全测试）是测试套件包含所有输入值与前置条件组合的测试方法。大纲测试原则 2："穷尽测试是不可能的"——除简单情形外无法测试所有情况，应使用测试技术、测试用例优先级排序和基于风险的测试来集中测试工作。`,
    ),
    example: L(
      `Form tìm chuyến bay có điểm đi, điểm đến (mỗi cái 200 sân bay), 365 ngày, 9 hạng hành khách: chỉ riêng tổ hợp đã hơn 100 triệu — không thể test hết, nên dùng EP, BVA và ưu tiên theo rủi ro.`,
      `A flight search form with origin and destination (200 airports each), 365 dates and 9 passenger types already gives over 100 million combinations — impossible to test them all, so use EP, BVA and risk-based prioritization.`,
      `航班搜索表单的出发地、目的地（各 200 个机场）、365 个日期、9 类乘客，组合已超过 1 亿——无法全部测试，因此使用等价类、边界值和基于风险的优先级。`,
    ),
  },

  'exit-criteria': {
    explanation: L(
      `Tiêu chí kết thúc (exit criteria, còn gọi test completion criteria, completion criteria) là tập điều kiện để chính thức hoàn thành một nhiệm vụ đã xác định. Syllabus: exit criteria xác định những gì phải đạt để tuyên bố một hoạt động đã hoàn tất, nên được định nghĩa cho từng test level. Ví dụ: thước đo mức độ kỹ lưỡng (độ bao phủ đạt được, số defect chưa giải quyết, mật độ defect, số test case fail) và tiêu chí có/không (đã chạy hết test theo kế hoạch, đã làm static testing, mọi defect đều được báo cáo, mọi regression test đã được tự động hoá). Hết thời gian hoặc ngân sách cũng có thể là exit criteria hợp lệ nếu stakeholders chấp nhận rủi ro. Trong Agile, exit criteria thường gọi là Definition of Done.`,
      `Exit criteria (test completion criteria, completion criteria) are the set of conditions for officially completing a defined task. The syllabus says they define what must be achieved to declare an activity complete and should be defined for each test level. Examples: measures of thoroughness (coverage achieved, unresolved defects, defect density, failed test cases) and binary criteria (planned tests executed, static testing done, all defects reported, all regression tests automated). Running out of time or budget can be valid if stakeholders accept the risk. In Agile, exit criteria are often called the Definition of Done.`,
      `准出准则（exit criteria，又称测试完成准则、完成准则）是正式完成某项既定任务的条件集合。大纲指出它定义宣布活动完成所必须达到的条件，应为每个测试级别定义。示例：充分性度量（达到的覆盖率、未解决缺陷数、缺陷密度、失败用例数）和"是/否"型准则（计划的测试已执行、已进行静态测试、所有缺陷均已报告、所有回归测试已自动化）。若干系人接受风险，时间或预算耗尽也可作为有效的准出准则。在敏捷中常称为"完成的定义（Definition of Done）"。`,
    ),
    example: L(
      `Exit criteria cho system test app ngân hàng: ≥ 95% test case đã chạy, 100% yêu cầu rủi ro cao được bao phủ, không còn defect Critical/High mở, bộ regression đã tự động hoá chạy xanh.`,
      `Exit criteria for banking app system testing: ≥95% of test cases executed, 100% of high-risk requirements covered, no open Critical/High defects, automated regression suite green.`,
      `银行应用系统测试的准出准则：≥95% 的测试用例已执行、高风险需求 100% 覆盖、无未关闭的致命/高级缺陷、自动化回归套件全部通过。`,
    ),
    confusedWith: [
      {
        id: 'entry-criteria',
        note: L(
          `Entry = điều kiện để bắt đầu (Definition of Ready); exit = điều kiện để kết thúc (Definition of Done).`,
          `Entry = conditions to start (Definition of Ready); exit = conditions to finish (Definition of Done).`,
          `准入 = 开始的条件（就绪的定义）；准出 = 完成的条件（完成的定义）。`,
        ),
      },
      {
        id: 'acceptance-criteria',
        note: L(
          `Acceptance criteria gắn với một user story cụ thể; exit criteria gắn với một hoạt động hoặc test level.`,
          `Acceptance criteria belong to a specific user story; exit criteria belong to an activity or test level.`,
          `验收准则属于具体用户故事；准出准则属于某项活动或测试级别。`,
        ),
      },
    ],
  },

  'failure': {
    explanation: L(
      `Thất bại / sự cố (failure, còn gọi malfunction) là sự kiện trong đó thành phần hoặc hệ thống không đáp ứng yêu cầu trong giới hạn quy định khi đang thực thi. Syllabus: nếu một defect trong code được thực thi, hệ thống có thể không làm điều nó phải làm hoặc làm điều không nên làm, gây ra failure. Failure không chỉ do error/defect: điều kiện môi trường (như bức xạ, trường điện từ gây defect trong firmware) cũng có thể gây failure. Dynamic testing có thể gây ra failure; static testing không thể.`,
      `A failure (malfunction) is an event in which a component or system does not meet its requirements within specified limits during its execution. Per the syllabus, if a defect in code is executed the system may fail to do what it should or do something it shouldn't, causing a failure. Failures can also be caused by environmental conditions (e.g. radiation or electromagnetic fields causing defects in firmware). Dynamic testing can trigger failures; static testing cannot.`,
      `失效（failure，又称 malfunction）是组件或系统在执行期间未在规定限度内满足其要求的事件。大纲指出：代码中的缺陷被执行时，系统可能无法完成应做之事或做了不该做的事，从而导致失效。失效也可能由环境条件引起（如辐射或电磁场导致固件缺陷）。动态测试可以引发失效，静态测试则不能。`,
    ),
    example: L(
      `Khách bấm "Thanh toán" và app hiện "Giao dịch thành công" nhưng đơn hàng không được tạo trong hệ thống — đó là failure người dùng nhìn thấy; defect gây ra nó có thể là một transaction không được commit trong code.`,
      `A customer taps "Pay", the app says "Payment successful" but no order is created — that is the visible failure; the underlying defect might be an uncommitted database transaction.`,
      `客户点击"支付"，应用显示"交易成功"，但系统中未生成订单——这是用户可见的失效；其背后的缺陷可能是代码中未提交的数据库事务。`,
    ),
    confusedWith: [
      {
        id: 'defect',
        note: L(
          `Failure là cái quan sát được khi chạy (triệu chứng); defect là nguyên nhân nằm trong sản phẩm. Tester thấy failure, developer tìm defect qua debugging.`,
          `A failure is what you observe at runtime (the symptom); the defect is the cause inside the product. Testers observe failures; developers find defects by debugging.`,
          `失效是运行时观察到的现象（症状）；缺陷是产品中的原因。测试人员看到失效，开发人员通过调试找到缺陷。`,
        ),
      },
      {
        id: 'error',
        note: L(
          `Error là hành động sai của con người khi tạo sản phẩm; failure là hành vi sai của hệ thống khi vận hành.`,
          `An error is a human's wrong action when building the product; a failure is the system's wrong behavior when running.`,
          `错误是人在构建产品时的错误行为；失效是系统运行时的错误表现。`,
        ),
      },
    ],
  },

  'feature-driven-development': {
    explanation: L(
      `Phát triển hướng tính năng (feature-driven development, FDD) là quy trình phát triển lặp và tăng dần, được dẫn dắt bởi các chức năng có giá trị với khách hàng (feature); chủ yếu dùng trong phát triển Agile. Syllabus chỉ liệt kê FDD trong số các phương pháp phát triển phần mềm và thực hành Agile (cùng ATDD, BDD, DDD, XP, Kanban, Lean IT, Scrum, TDD), không mô tả chi tiết.`,
      `Feature-driven development (FDD) is an iterative and incremental development process driven by client-valued functionality (features), mostly used in Agile. The syllabus only lists FDD among software development methods and Agile practices (with ATDD, BDD, DDD, XP, Kanban, Lean IT, Scrum, TDD) without further detail.`,
      `特性驱动开发（feature-driven development, FDD）是从客户认可的功能（特性）角度驱动的迭代增量式开发过程，主要用于敏捷开发。大纲仅将 FDD 与 ATDD、BDD、DDD、XP、看板、精益 IT、Scrum、TDD 一同列为开发方法和敏捷实践，未作详细说明。`,
    ),
    example: L(
      `Dự án ví điện tử lập danh sách feature như "Nạp tiền từ thẻ ATM", "Thanh toán QR", "Chia hoá đơn", rồi lần lượt thiết kế và xây dựng từng feature trong các vòng lặp ngắn 2 tuần.`,
      `An e-wallet project lists features such as "Top up from ATM card", "QR payment", "Split the bill", then designs and builds them one by one in short 2-week iterations.`,
      `电子钱包项目列出"从银行卡充值""二维码支付""分摊账单"等特性，然后在两周一次的短迭代中逐个设计和构建。`,
    ),
    confusedWith: [
      {
        id: 'behavior-driven-development',
        note: L(
          `FDD tổ chức việc phát triển theo các feature có giá trị với khách hàng; BDD là cách tiếp cận test-first, mô tả hành vi bằng Given/When/Then làm cơ sở cho test.`,
          `FDD organizes development around client-valued features; BDD is a test-first approach describing behavior as Given/When/Then as the basis for tests.`,
          `FDD 围绕客户认可的特性组织开发；BDD 是测试先行方法，用 Given/When/Then 描述行为作为测试基础。`,
        ),
      },
    ],
  },

  'flexibility': {
    explanation: L(
      `Tính linh hoạt (flexibility) theo glossary là mức độ một thành phần/hệ thống có thể được điều chỉnh khi yêu cầu, bối cảnh sử dụng hoặc môi trường hệ thống thay đổi. Trong syllabus, flexibility chỉ xuất hiện trong danh sách đặc tính chất lượng phi chức năng theo ISO/IEC 25010: "Portability (also known as flexibility)" — tức tên mới của nhóm đặc tính khả chuyển trong phiên bản ISO/IEC 25010:2023.`,
      `Per the glossary, flexibility is the degree to which a component or system can be adapted to changes in its requirements, contexts of use or system environment. In the syllabus it only appears in the ISO/IEC 25010 list of non-functional characteristics as "Portability (also known as flexibility)" — the newer name of that characteristic in ISO/IEC 25010:2023.`,
      `灵活性（flexibility）按术语表定义，是组件或系统能适应需求、使用环境或系统环境变化的程度。在大纲中，它只出现在 ISO/IEC 25010 非功能质量特性列表中："可移植性（又称灵活性）"——即 ISO/IEC 25010:2023 中该特性的新名称。`,
    ),
    example: L(
      `App thương mại điện tử có thể bật thêm phương thức thanh toán mới hoặc thêm thị trường Campuchia chỉ bằng cấu hình, không phải viết lại code — đó là flexibility tốt.`,
      `An e-commerce app can enable a new payment method or a new market (e.g. Cambodia) by configuration alone, without rewriting code — good flexibility.`,
      `电商应用只需配置即可启用新的支付方式或新增柬埔寨市场，无需重写代码——这体现了良好的灵活性。`,
    ),
    confusedWith: [
      {
        id: 'portability',
        note: L(
          `Syllabus coi hai từ là một ("portability also known as flexibility"); glossary v4.8.1 định nghĩa riêng: portability = chuyển sang môi trường khác; flexibility = thích ứng với thay đổi yêu cầu, bối cảnh sử dụng hoặc môi trường (rộng hơn).`,
          `The syllabus treats them as one ("portability also known as flexibility"); glossary v4.8.1 defines them separately: portability = transfer to another environment; flexibility = adapt to changed requirements, contexts of use or environment (broader).`,
          `大纲视二者为同一概念（"可移植性又称灵活性"）；术语表 v4.8.1 分别定义：可移植性 = 迁移到其他环境；灵活性 = 适应需求、使用环境或系统环境的变化（范围更广）。`,
        ),
      },
    ],
    versionNote: L(
      `Khác biệt đáng chú ý: syllabus v4.0.1 viết "Portability (also known as flexibility)" như hai tên của cùng một đặc tính, còn glossary v4.8.1 định nghĩa flexibility riêng (thích ứng với thay đổi yêu cầu, bối cảnh sử dụng, môi trường) và chỉ "see also" portability. Khi thi CTFL v4.0.1, chỉ cần nhớ flexibility là tên khác của portability trong danh sách ISO/IEC 25010.`,
      `Notable difference: syllabus v4.0.1 says "Portability (also known as flexibility)", i.e. two names for one characteristic, while glossary v4.8.1 defines flexibility separately (adapting to changes in requirements, contexts of use, environment) and only cross-references portability. For CTFL v4.0.1, remember flexibility as the alternative name of portability in the ISO/IEC 25010 list.`,
      `显著差异：大纲 v4.0.1 写作"可移植性（又称灵活性）"，视为同一特性的两个名称；而术语表 v4.8.1 单独定义灵活性（适应需求、使用环境、系统环境的变化），仅以"另见"关联可移植性。备考 CTFL v4.0.1 时，记住灵活性是 ISO/IEC 25010 列表中可移植性的别名即可。`,
    ),
  },

  'functional-appropriateness': {
    explanation: L(
      `Tính phù hợp chức năng (functional appropriateness) là mức độ các chức năng giúp hoàn thành các nhiệm vụ và mục tiêu đã định — tức chức năng có thật sự hỗ trợ người dùng làm việc hiệu quả, không thừa bước. Syllabus nêu đây là một trong ba điều mà functional testing nhắm tới kiểm tra, cùng functional completeness và functional correctness.`,
      `Functional appropriateness is the degree to which the functions facilitate the accomplishment of specified tasks and objectives — whether the functions actually help users get the job done without unnecessary steps. The syllabus names it, with functional completeness and functional correctness, as a main objective of functional testing.`,
      `功能适合性/恰当性（functional appropriateness）是功能促进完成指定任务和目标的程度——功能是否真正帮助用户高效完成工作、没有多余步骤。大纲将其与功能完整性、功能正确性一起列为功能测试的主要检查目标。`,
    ),
    example: L(
      `Chức năng chuyển tiền đúng và đủ, nhưng để chuyển cho người quen phải nhập lại số tài khoản mỗi lần vì không có danh bạ người nhận — functional appropriateness kém.`,
      `The transfer function is correct and complete, but users must retype the account number every time because there is no saved-payee list — poor functional appropriateness.`,
      `转账功能正确且完整，但因没有常用收款人列表，每次都要重新输入账号——功能恰当性差。`,
    ),
    confusedWith: [
      {
        id: 'functional-suitability',
        note: L(
          `Functional suitability là đặc tính tổng (cung cấp chức năng đáp ứng nhu cầu), gồm ba đặc tính con: completeness (đủ), correctness (đúng), appropriateness (phù hợp, hỗ trợ hoàn thành nhiệm vụ). Lưu ý glossary ghi "suitability" là từ đồng nghĩa của functional appropriateness — dễ nhầm.`,
          `Functional suitability is the parent characteristic, with three sub-characteristics: completeness, correctness and appropriateness. Note the glossary lists "suitability" as a synonym of functional appropriateness — easy to confuse.`,
          `功能适合性（functional suitability）是上位特性，包含三个子特性：完整性、正确性、恰当性。注意术语表把 "suitability" 列为功能恰当性的同义词，容易混淆。`,
        ),
      },
      {
        id: 'functional-completeness',
        note: L(
          `Completeness hỏi "có đủ chức năng cho mọi nhiệm vụ không?"; appropriateness hỏi "các chức năng đó có giúp làm nhiệm vụ thuận lợi không?".`,
          `Completeness asks "are there functions for all tasks?"; appropriateness asks "do those functions make the tasks easy to accomplish?".`,
          `完整性问"是否为所有任务提供了功能？"；恰当性问"这些功能是否便于完成任务？"。`,
        ),
      },
    ],
  },

  'functional-completeness': {
    explanation: L(
      `Tính đầy đủ chức năng (functional completeness) là mức độ tập hợp chức năng bao phủ tất cả các nhiệm vụ và mục tiêu người dùng đã được đặc tả. Syllabus nêu đây là một trong các mục tiêu chính của functional testing (cùng correctness và appropriateness).`,
      `Functional completeness is the degree to which the set of functions covers all the specified tasks and user objectives. The syllabus names it as a main objective of functional testing (with correctness and appropriateness).`,
      `功能完整性（functional completeness）是功能集合覆盖所有指定任务和用户目标的程度。大纲将其列为功能测试的主要目标之一（与正确性、恰当性一起）。`,
    ),
    example: L(
      `Đặc tả yêu cầu app có: đăng nhập, xem số dư, chuyển khoản, thanh toán hoá đơn, khoá thẻ. Bản build thiếu "khoá thẻ" → functional completeness chưa đạt.`,
      `The spec requires login, balance, transfer, bill payment and card lock. The build lacks card lock → functional completeness not achieved.`,
      `规格要求：登录、查询余额、转账、缴费、锁卡。构建缺少"锁卡"→ 功能完整性未达到。`,
    ),
    confusedWith: [
      {
        id: 'functional-correctness',
        note: L(
          `Completeness: có ĐỦ chức năng không; correctness: chức năng có cho kết quả ĐÚNG không.`,
          `Completeness: are ALL functions there; correctness: do they give CORRECT results.`,
          `完整性：功能是否齐全；正确性：功能结果是否正确。`,
        ),
      },
    ],
  },

  'functional-correctness': {
    explanation: L(
      `Tính đúng đắn chức năng (functional correctness, còn gọi accuracy) là mức độ thành phần/hệ thống cung cấp kết quả đúng với độ chính xác cần thiết. Syllabus nêu đây là một trong các mục tiêu chính của functional testing.`,
      `Functional correctness (accuracy) is the degree to which a component or system provides the correct results with the needed degree of precision. The syllabus names it as a main objective of functional testing.`,
      `功能正确性（functional correctness，又称准确性 accuracy）是组件或系统以所需精度提供正确结果的程度。大纲将其列为功能测试的主要目标之一。`,
    ),
    example: L(
      `Tiền lãi tiết kiệm 100.000.000đ, lãi suất 5,5%/năm, kỳ hạn 6 tháng phải là 2.750.000đ; nếu app hiển thị 2.749.999đ do làm tròn sai thì functional correctness không đạt.`,
      `Interest on 100,000,000 VND at 5.5%/year for 6 months must be 2,750,000; showing 2,749,999 due to wrong rounding fails functional correctness.`,
      `1 亿越南盾、年利率 5.5%、6 个月期的利息应为 275 万；若因舍入错误显示 2,749,999，则功能正确性不达标。`,
    ),
    confusedWith: [
      {
        id: 'functional-completeness',
        note: L(
          `Correctness: kết quả có đúng không; completeness: có đủ các chức năng đã đặc tả không.`,
          `Correctness: are results right; completeness: are all specified functions present.`,
          `正确性：结果是否正确；完整性：指定功能是否齐全。`,
        ),
      },
    ],
  },

  'functional-testing': {
    explanation: L(
      `Kiểm thử chức năng (functional testing) là một loại kiểm thử (test type) nhằm xác định tính phù hợp chức năng (functional suitability) của đối tượng kiểm thử. Syllabus: functional testing đánh giá các chức năng mà thành phần/hệ thống phải thực hiện — "hệ thống làm GÌ"; mục tiêu chính là kiểm tra functional completeness, functional correctness và functional appropriateness. Có thể áp dụng ở mọi test level.`,
      `Functional testing is a test type to determine the functional suitability of a test object. Per the syllabus it evaluates the functions a component or system should perform — "what" it should do — mainly checking functional completeness, correctness and appropriateness. It can be applied at all test levels.`,
      `功能测试（functional testing）是用于确定测试对象功能适合性的测试类型。大纲指出它评估组件或系统应执行的功能——系统应"做什么"，主要检查功能完整性、正确性和恰当性。可应用于所有测试级别。`,
    ),
    example: L(
      `Kiểm tra chức năng "Đặt lại mật khẩu": nhập email đúng nhận được OTP, OTP hết hạn sau 5 phút, nhập OTP sai 5 lần thì khoá — tất cả là functional test.`,
      `Testing "Reset password": a valid email receives an OTP, the OTP expires after 5 minutes, 5 wrong OTPs lock the account — all functional tests.`,
      `测试"重置密码"：输入正确邮箱可收到 OTP、OTP 5 分钟后失效、输错 5 次即锁定——这些都是功能测试。`,
    ),
    confusedWith: [
      {
        id: 'non-functional-testing',
        note: L(
          `Functional: hệ thống làm GÌ (đúng chức năng); non-functional: hệ thống làm TỐT NHƯ THẾ NÀO (nhanh, an toàn, dễ dùng, tin cậy…). Cùng một chức năng có thể vừa có test chức năng vừa có test phi chức năng (ví dụ đăng nhập phải xong trong 2 giây).`,
          `Functional: WHAT the system does; non-functional: HOW WELL it does it (speed, security, usability, reliability…). The same function can have both kinds of tests (e.g. login must complete within 2 seconds).`,
          `功能：系统做什么；非功能：系统做得多好（速度、安全、易用、可靠……）。同一功能可同时有功能测试和非功能测试（如登录须在 2 秒内完成）。`,
        ),
      },
      {
        id: 'black-box-testing',
        note: L(
          `Functional testing phân loại theo đặc tính chất lượng được kiểm thử; black-box phân loại theo căn cứ thiết kế test (đặc tả). Functional test thường được thiết kế bằng kỹ thuật hộp đen nhưng không bắt buộc.`,
          `Functional testing is classified by the quality characteristic tested; black-box by the basis for test design. Functional tests are often black-box, but not necessarily.`,
          `功能测试按被测质量特性分类；黑盒按测试设计依据分类。功能测试常用黑盒技术设计，但并非必然。`,
        ),
      },
    ],
  },

  'impact-analysis': {
    explanation: L(
      `Phân tích tác động (impact analysis) là việc xác định tất cả các sản phẩm công việc bị ảnh hưởng bởi một thay đổi, kèm ước lượng nguồn lực cần thiết để thực hiện thay đổi. Syllabus: nên làm impact analysis trước để biết phạm vi regression testing — nó cho thấy phần nào của phần mềm có thể bị ảnh hưởng; trong bảo trì, impact analysis có thể làm trước khi thay đổi để giúp quyết định có nên thay đổi hay không. Truy vết (traceability) tốt giúp làm impact analysis.`,
      `Impact analysis identifies all work products affected by a change, including an estimate of the resources needed. Per the syllabus it is advisable to perform impact analysis first to recognize the extent of regression testing — it shows which parts could be affected; in maintenance it may be done before a change to help decide whether to make it. Good traceability makes it possible.`,
      `影响分析（impact analysis）是识别受某项变更影响的所有工作产品，并估算实施该变更所需资源。大纲指出：应先进行影响分析以确定回归测试的范围——它显示软件哪些部分可能受影响；在维护中，可在变更前进行影响分析以帮助决定是否实施变更。良好的可追溯性有助于影响分析。`,
    ),
    example: L(
      `Ngân hàng đổi công thức tính phí chuyển khoản liên ngân hàng: impact analysis cho thấy ảnh hưởng tới màn hình xác nhận chuyển khoản, sao kê, báo cáo đối soát và 37 test case hồi quy; ước lượng 5 ngày công.`,
      `The bank changes the interbank fee formula: impact analysis shows effects on the confirmation screen, statements, reconciliation reports and 37 regression test cases; estimated 5 person-days.`,
      `银行修改跨行转账手续费公式：影响分析显示会影响转账确认页、对账单、对账报表以及 37 个回归测试用例，预计 5 人日。`,
    ),
    confusedWith: [
      {
        id: 'regression-testing',
        note: L(
          `Impact analysis là phân tích (không chạy test) để biết chỗ nào có thể bị ảnh hưởng; regression testing là chạy test để kiểm tra thực tế chỗ đó có bị hỏng không.`,
          `Impact analysis is analysis (no test execution) to find what could be affected; regression testing runs tests to check whether those areas actually broke.`,
          `影响分析是分析活动（不执行测试），找出可能受影响的部分；回归测试则执行测试，检查这些部分是否真的出问题。`,
        ),
      },
    ],
    versionNote: L(
      `Glossary v4.8.1 đưa cả "ước lượng nguồn lực cần cho thay đổi" vào định nghĩa; syllabus v4.0.1 chỉ dùng impact analysis để xác định phần bị ảnh hưởng, phạm vi regression testing và hỗ trợ quyết định có thay đổi hay không.`,
      `Glossary v4.8.1 includes "an estimate of the resources needed" in the definition; syllabus v4.0.1 uses impact analysis only to identify affected parts, the extent of regression testing and whether to make the change.`,
      `术语表 v4.8.1 的定义包含"估算变更所需资源"；大纲 v4.0.1 仅用影响分析来识别受影响部分、确定回归测试范围并辅助决定是否变更。`,
    ),
  },

  'incremental-development-model': {
    explanation: L(
      `Mô hình phát triển tăng dần (incremental development model) là mô hình vòng đời trong đó thành phần/hệ thống được phát triển qua một chuỗi các phần tăng thêm (increment), mỗi lần bổ sung thêm một phần chức năng. Syllabus lấy Unified Process làm ví dụ và nói: trong mô hình lặp và tăng dần, mỗi vòng lặp giao một bản mẫu hoặc increment chạy được, nên ở mỗi vòng lặp có thể làm cả static và dynamic testing ở mọi test level; giao hàng thường xuyên đòi hỏi phản hồi nhanh và regression testing rộng.`,
      `The incremental development model is an SDLC model in which the system is developed through a series of increments, each adding a piece of functionality. The syllabus gives the Unified Process as an example and says that in iterative and incremental models each iteration delivers a working prototype or increment, so static and dynamic testing may be performed at all test levels in each iteration; frequent delivery requires fast feedback and extensive regression testing.`,
      `增量开发模型（incremental development model）是一种软件开发生命周期模型，组件或系统通过一系列增量来开发，每次增加一部分功能。大纲以统一过程（Unified Process）为例，并指出：在迭代和增量模型中，每次迭代交付可运行的原型或增量，因此每次迭代都可在所有测试级别进行静态和动态测试；频繁交付需要快速反馈和大量回归测试。`,
    ),
    example: L(
      `App ngân hàng phát hành theo đợt: đợt 1 đăng nhập + xem số dư, đợt 2 thêm chuyển khoản, đợt 3 thêm thanh toán hoá đơn; mỗi đợt test phần mới và chạy hồi quy phần cũ.`,
      `A banking app ships in increments: 1) login + balance, 2) adds transfers, 3) adds bill payment; each increment tests the new part and regression-tests the old ones.`,
      `银行应用分批发布：第 1 批登录 + 查余额，第 2 批增加转账，第 3 批增加缴费；每批测试新功能并对旧功能做回归测试。`,
    ),
    confusedWith: [
      {
        id: 'iterative-development-model',
        note: L(
          `Incremental: xây hệ thống TỪNG PHẦN, cộng dồn chức năng; iterative: lặp lại các CHU KỲ để tinh chỉnh dần (ví dụ spiral, prototyping). Thực tế hai cách hay kết hợp (Agile).`,
          `Incremental: build the system PIECE BY PIECE, adding functionality; iterative: repeat CYCLES to refine (e.g. spiral, prototyping). In practice they are often combined (Agile).`,
          `增量：逐块构建系统、累积功能；迭代：重复周期逐步完善（如螺旋模型、原型法）。实践中常结合使用（敏捷）。`,
        ),
      },
      {
        id: 'sequential-development-model',
        note: L(
          `Mô hình tuần tự (waterfall, V-model) đi qua các pha tuyến tính, code chạy được chỉ có ở pha sau nên dynamic testing đến muộn; mô hình tăng dần cho phép dynamic testing ngay từ increment đầu.`,
          `Sequential models (waterfall, V-model) go through linear phases, with executable code only late, so dynamic testing comes late; incremental models allow dynamic testing from the first increment.`,
          `顺序模型（瀑布、V 模型）按线性阶段推进，可执行代码较晚出现，动态测试也较晚；增量模型从第一个增量起即可进行动态测试。`,
        ),
      },
    ],
  },

  'independence-of-testing': {
    explanation: L(
      `Tính độc lập của kiểm thử (independence of testing) là việc tách trách nhiệm kiểm thử khỏi trách nhiệm phát triển đối với một đối tượng kiểm thử. Syllabus mô tả các mức: tác giả tự test (không độc lập), đồng nghiệp cùng nhóm (độc lập một phần), tester ngoài nhóm nhưng trong tổ chức (độc lập cao), tester ngoài tổ chức (rất cao). Lợi ích: tester độc lập nhận ra các loại failure/defect khác do khác nền tảng, góc nhìn và thiên kiến, có thể thách thức các giả định. Hạn chế: bị cô lập khỏi nhóm dev, thiếu hợp tác, dev mất tinh thần trách nhiệm về chất lượng, tester bị coi là nút thắt cổ chai. Thường tốt nhất là kết hợp nhiều mức độc lập.`,
      `Independence of testing is the separation of testing responsibilities from development for a test object. The syllabus describes levels: tested by the author (none), by peers in the same team (some), by testers outside the team but inside the organization (high), by testers outside the organization (very high). Benefits: independent testers recognize different kinds of failures and defects and can challenge assumptions. Drawbacks: isolation from developers, poor collaboration, developers losing responsibility for quality, testers seen as a bottleneck. Usually multiple levels are best.`,
      `测试独立性（independence of testing）是将测试对象的测试职责与开发职责分离。大纲描述的级别：作者自测（无独立性）、同组同事（一定独立性）、组织内其他团队的测试人员（高独立性）、组织外的测试人员（非常高）。优点：独立测试人员因背景、视角和偏见不同而能识别不同类型的失效和缺陷，并可质疑假设。缺点：与开发团队隔离、协作不足、开发人员可能丧失质量责任感、测试人员被视为瓶颈。通常最好结合多个独立级别。`,
    ),
    example: L(
      `Dự án core banking: developer làm component test, đội QA nội bộ làm system test, công ty kiểm thử bảo mật bên ngoài làm penetration test, nghiệp vụ chi nhánh làm acceptance test.`,
      `Core banking project: developers do component testing, the internal QA team does system testing, an external security firm runs penetration tests and branch business users do acceptance testing.`,
      `核心银行项目：开发人员做组件测试，内部 QA 团队做系统测试，外部安全公司做渗透测试，网点业务人员做验收测试。`,
    ),
  },

  'integration-testing': {
    explanation: L(
      `Kiểm thử tích hợp (integration testing) là cấp độ kiểm thử tập trung vào tương tác giữa các thành phần hoặc hệ thống. Syllabus chia thành hai test level: component integration testing (giao diện và tương tác giữa các component, phụ thuộc chiến lược tích hợp bottom-up/top-down/big-bang) và system integration testing (giao diện giữa hệ thống đang test với các hệ thống và dịch vụ bên ngoài, cần môi trường gần giống vận hành).`,
      `Integration testing is a test level that focuses on interactions between components or systems. The syllabus splits it into component integration testing (interfaces and interactions between components, dependent on bottom-up/top-down/big-bang strategy) and system integration testing (interfaces between the system under test and other systems and external services, needing an environment similar to operations).`,
      `集成测试（integration testing）是关注组件或系统之间交互的测试级别。大纲将其分为组件集成测试（组件间的接口和交互，依赖自底向上/自顶向下/大爆炸等集成策略）和系统集成测试（被测系统与其他系统及外部服务之间的接口，需要接近生产的环境）。`,
    ),
    example: L(
      `Kiểm tra luồng "đặt hàng → trừ tồn kho → tạo vận đơn với đơn vị giao hàng": các module nội bộ nói chuyện với nhau (component integration) và hệ thống gọi API của hãng vận chuyển (system integration).`,
      `Checking "place order → reduce stock → create shipment with the courier": internal modules talking to each other (component integration) and the system calling the courier's API (system integration).`,
      `检查"下单 → 扣减库存 → 向物流公司创建运单"：内部模块之间的交互（组件集成）以及系统调用物流公司 API（系统集成）。`,
    ),
    confusedWith: [
      {
        id: 'system-testing',
        note: L(
          `Integration testing tập trung vào giao diện/tương tác; system testing tập trung vào hành vi và năng lực tổng thể của toàn hệ thống (end-to-end, phi chức năng).`,
          `Integration testing focuses on interfaces/interactions; system testing on the overall behavior and capabilities of the whole system (end-to-end, non-functional).`,
          `集成测试关注接口/交互；系统测试关注整个系统的整体行为和能力（端到端、非功能）。`,
        ),
      },
    ],
  },

  'interaction-capability': {
    explanation: L(
      `Khả năng tương tác (interaction capability) theo glossary là mức độ thành phần/hệ thống có thể trao đổi thông tin qua giao diện người dùng với người dùng đã xác định để hoàn thành nhiệm vụ dự định. Trong syllabus, nó chỉ xuất hiện trong danh sách ISO/IEC 25010: "Usability (also known as interaction capability)" — tên mới của đặc tính usability trong ISO/IEC 25010:2023.`,
      `Per the glossary, interaction capability is the degree to which a component or system can exchange information via the user interface with its specified users to complete an intended task. In the syllabus it only appears in the ISO/IEC 25010 list as "Usability (also known as interaction capability)" — the newer name of usability in ISO/IEC 25010:2023.`,
      `交互能力（interaction capability）按术语表定义，是组件或系统通过用户界面与指定用户交换信息以完成预期任务的程度。在大纲中，它只出现在 ISO/IEC 25010 列表中："易用性（又称交互能力）"——即 ISO/IEC 25010:2023 中易用性的新名称。`,
    ),
    example: L(
      `Người lớn tuổi có thể tự nạp tiền điện thoại trong app chỉ với 3 bước, chữ đủ lớn, thông báo lỗi dễ hiểu — interaction capability tốt.`,
      `Elderly users can top up their phone in the app in 3 steps, with readable text and clear error messages — good interaction capability.`,
      `老年用户只需 3 步即可在应用中为手机充值，字体足够大，错误提示易懂——交互能力良好。`,
    ),
    confusedWith: [
      {
        id: 'usability',
        note: L(
          `Syllabus coi hai từ là một. Glossary v4.8.1 định nghĩa riêng: usability = mức độ người dùng đạt mục tiêu trong bối cảnh sử dụng; interaction capability nhấn mạnh việc trao đổi thông tin qua giao diện người dùng.`,
          `The syllabus treats them as one. Glossary v4.8.1 defines them separately: usability = degree to which users achieve goals in a context of use; interaction capability stresses exchanging information via the user interface.`,
          `大纲视二者为同一概念。术语表 v4.8.1 分别定义：易用性 = 用户在使用环境中达成目标的程度；交互能力强调通过用户界面交换信息。`,
        ),
      },
    ],
    versionNote: L(
      `Syllabus v4.0.1 viết "Usability (also known as interaction capability)", còn glossary v4.8.1 có định nghĩa riêng cho interaction capability (trao đổi thông tin qua giao diện người dùng) và chỉ "see also" usability. Với CTFL v4.0.1, nhớ đây là tên khác của usability trong danh sách ISO/IEC 25010.`,
      `Syllabus v4.0.1 says "Usability (also known as interaction capability)", while glossary v4.8.1 gives interaction capability its own definition (information exchange via the user interface) and only cross-references usability. For CTFL v4.0.1, remember it as the alternative name of usability in the ISO/IEC 25010 list.`,
      `大纲 v4.0.1 写作"易用性（又称交互能力）"，而术语表 v4.8.1 为交互能力单独给出定义（通过用户界面交换信息），仅以"另见"关联易用性。备考 CTFL v4.0.1 时，记住它是 ISO/IEC 25010 列表中易用性的别名。`,
    ),
  },

  'iterative-development-model': {
    explanation: L(
      `Mô hình phát triển lặp (iterative development model) là mô hình vòng đời trong đó hệ thống được phát triển qua một chuỗi chu kỳ lặp lại, mỗi chu kỳ cải tiến/hoàn thiện sản phẩm dựa trên phản hồi. Syllabus lấy ví dụ spiral model và prototyping; trong các mô hình lặp, mỗi vòng lặp giao một bản mẫu hoặc increment chạy được, nên có thể làm static và dynamic testing ở mọi test level trong mỗi vòng lặp, cần phản hồi nhanh và regression testing rộng. TDD, ATDD, BDD hỗ trợ mô hình lặp.`,
      `The iterative development model is an SDLC model in which the system is developed through a series of repeated cycles, each refining the product based on feedback. The syllabus gives spiral and prototyping as examples; each iteration delivers a working prototype or increment, so static and dynamic testing may be done at all test levels in each iteration, requiring fast feedback and extensive regression testing. TDD, ATDD and BDD support an iterative model.`,
      `迭代开发模型（iterative development model）是一种软件开发生命周期模型，系统通过一系列重复周期开发，每个周期根据反馈完善产品。大纲以螺旋模型和原型法为例；每次迭代交付可运行的原型或增量，因此每次迭代都可在所有测试级别进行静态和动态测试，需要快速反馈和大量回归测试。TDD、ATDD、BDD 支持迭代模型。`,
    ),
    example: L(
      `Nhóm làm màn hình mở tài khoản online qua 3 vòng: vòng 1 prototype cho khách hàng thử, vòng 2 làm lại theo góp ý, vòng 3 hoàn thiện eKYC — mỗi vòng đều test và nhận phản hồi.`,
      `The team builds the online account-opening screen in 3 cycles: a prototype for customers to try, a rework based on feedback, then the finished eKYC flow — each cycle is tested and reviewed.`,
      `团队分 3 轮开发在线开户页面：第 1 轮原型供客户试用，第 2 轮根据反馈重做，第 3 轮完善电子身份认证——每轮都进行测试并收集反馈。`,
    ),
    confusedWith: [
      {
        id: 'incremental-development-model',
        note: L(
          `Iterative: lặp chu kỳ để tinh chỉnh dần; incremental: thêm từng phần chức năng. Có thể kết hợp.`,
          `Iterative: repeat cycles to refine; incremental: add functionality piece by piece. They can be combined.`,
          `迭代：重复周期逐步完善；增量：逐块增加功能。二者可以结合。`,
        ),
      },
    ],
  },

  'maintainability': {
    explanation: L(
      `Khả năng bảo trì (maintainability) là mức độ thành phần/hệ thống có thể được người bảo trì dự kiến sửa đổi (sửa lỗi, cải tiến, thích ứng). Đây là một đặc tính chất lượng phi chức năng theo ISO/IEC 25010 trong syllabus, bao gồm các khía cạnh như modularity, khả năng phân tích (analyzability), khả năng sửa đổi (modifiability) và khả năng kiểm thử (testability). Syllabus nói static testing có thể đo các đặc tính không phụ thuộc chạy code, ví dụ maintainability.`,
      `Maintainability is the degree to which a component or system can be modified by the intended maintainers. It is an ISO/IEC 25010 non-functional characteristic in the syllabus, covering aspects such as modularity, analyzability, modifiability and testability. The syllabus notes static testing can measure characteristics not dependent on executing code, such as maintainability.`,
      `可维护性（maintainability）是组件或系统能被预期维护人员修改的程度。它是大纲列出的 ISO/IEC 25010 非功能质量特性，涵盖模块化、易分析性、易修改性和可测试性等方面。大纲指出，静态测试可度量不依赖代码执行的质量特性，例如可维护性。`,
    ),
    example: L(
      `SonarQube báo module tính phí có độ phức tạp cyclomatic 45 và trùng lặp code 30% — dấu hiệu maintainability kém, sửa một quy tắc phí sẽ tốn công và dễ gây lỗi hồi quy.`,
      `SonarQube reports the fee module has cyclomatic complexity 45 and 30% duplicated code — poor maintainability; changing one fee rule will be costly and risky.`,
      `SonarQube 报告手续费模块圈复杂度为 45、代码重复率 30%——可维护性差，修改一条收费规则既费力又易引入回归缺陷。`,
    ),
    confusedWith: [
      {
        id: 'maintenance-testing',
        note: L(
          `Maintainability là một đặc tính chất lượng (dễ sửa đổi đến mức nào); maintenance testing là hoạt động kiểm thử các thay đổi trên hệ thống đang vận hành.`,
          `Maintainability is a quality characteristic (how easy to modify); maintenance testing is testing changes to an operational system.`,
          `可维护性是质量特性（易于修改的程度）；维护测试是对运行中系统的变更进行测试的活动。`,
        ),
      },
    ],
  },

  'maintenance-testing': {
    explanation: L(
      `Kiểm thử bảo trì (maintenance testing) là kiểm thử đánh giá ảnh hưởng của các thay đổi trên hệ thống đang vận hành hoặc môi trường của nó. Syllabus: bảo trì có thể là sửa lỗi (corrective), thích ứng với môi trường, cải thiện hiệu năng hoặc khả năng bảo trì; có thể theo kế hoạch hoặc đột xuất (hotfix). Kiểm thử gồm đánh giá thay đổi đã được triển khai thành công và kiểm tra hồi quy ở phần không đổi. Phạm vi phụ thuộc mức rủi ro của thay đổi, kích thước hệ thống và kích thước thay đổi. Các tác nhân kích hoạt: sửa đổi (nâng cấp theo kế hoạch, sửa lỗi, hotfix), nâng cấp/di chuyển môi trường vận hành (kể cả chuyển đổi dữ liệu), và ngừng sử dụng hệ thống (kiểm thử lưu trữ, khôi phục dữ liệu).`,
      `Maintenance testing evaluates the effect of changes made to an operational system or its environment. Per the syllabus, maintenance can be corrective, adaptive or improve performance/maintainability, planned or unplanned (hot fixes). Testing covers both the success of the change and regressions in unchanged parts. Scope depends on the risk of the change, the size of the system and the size of the change. Triggers: modifications (planned enhancements, corrective changes, hot fixes), upgrades or migrations of the operational environment (incl. data conversion) and retirement (data archiving, restore and retrieval).`,
      `维护测试（maintenance testing）评估对运行中的系统或其环境所做变更的影响。大纲指出：维护可以是纠正性的、适应环境变化的，或改进性能/可维护性的，可以是计划内或计划外（热修复）。测试既包括评估变更是否成功实施，也包括检查未变更部分的回归。范围取决于变更风险、现有系统规模和变更规模。触发因素：修改（计划内增强、纠正性变更、热修复）、运行环境升级或迁移（含数据转换）、系统退役（数据归档、恢复与检索测试）。`,
    ),
    example: L(
      `App ngân hàng đang chạy production: hotfix sửa lỗi OTP không gửi được với nhà mạng X — test bản sửa, chạy hồi quy luồng đăng nhập và chuyển tiền; quý sau chuyển database từ Oracle sang PostgreSQL — test chuyển đổi dữ liệu.`,
      `A live banking app: a hotfix for OTPs not sent to carrier X — test the fix and regression-test login and transfers; next quarter the database migrates from Oracle to PostgreSQL — test the data conversion.`,
      `线上银行应用：热修复运营商 X 收不到 OTP 的问题——测试修复并回归测试登录和转账；下季度数据库从 Oracle 迁移到 PostgreSQL——测试数据转换。`,
    ),
    confusedWith: [
      {
        id: 'regression-testing',
        note: L(
          `Regression testing là một phần của maintenance testing (và cũng dùng cả khi phát triển mới); maintenance testing rộng hơn: còn test chính thay đổi, môi trường mới, chuyển đổi dữ liệu, ngừng hệ thống.`,
          `Regression testing is part of maintenance testing (and also used in new development); maintenance testing is broader: it also tests the change itself, new environments, data migration and retirement.`,
          `回归测试是维护测试的一部分（新开发中也会用到）；维护测试范围更广：还包括测试变更本身、新环境、数据迁移和系统退役。`,
        ),
      },
    ],
    versionNote: L(
      `Glossary v4.8.1 gọi maintenance testing là một "test type", nhưng syllabus v4.0.1 không xếp nó vào bốn test type (functional, non-functional, black-box, white-box) mà trình bày riêng ở mục 2.3.`,
      `Glossary v4.8.1 calls maintenance testing a "test type", but syllabus v4.0.1 does not include it among its four test types (functional, non-functional, black-box, white-box) and treats it separately in section 2.3.`,
      `术语表 v4.8.1 称维护测试为一种"测试类型"，但大纲 v4.0.1 未将其列入四种测试类型（功能、非功能、黑盒、白盒），而是在 2.3 节单独介绍。`,
    ),
  },

  'non-functional-testing': {
    explanation: L(
      `Kiểm thử phi chức năng (non-functional testing) là loại kiểm thử đánh giá thành phần/hệ thống có tuân thủ các yêu cầu phi chức năng hay không — "hệ thống hoạt động TỐT NHƯ THẾ NÀO". Syllabus liệt kê các đặc tính theo ISO/IEC 25010: performance efficiency, compatibility, usability (interaction capability), reliability, security, maintainability, portability (flexibility), safety. Nên bắt đầu sớm khi có thể (trong review, component testing — một dạng shift left); nhiều test phi chức năng được suy ra từ test chức năng; phát hiện muộn defect phi chức năng có thể đe doạ dự án; đôi khi cần môi trường đặc thù như usability lab.`,
      `Non-functional testing evaluates whether a component or system complies with non-functional requirements — "how well the system behaves". The syllabus lists the ISO/IEC 25010 characteristics: performance efficiency, compatibility, usability (interaction capability), reliability, security, maintainability, portability (flexibility), safety. It should start early where possible (reviews, component testing — a form of shift left); many non-functional tests are derived from functional tests; late discovery of non-functional defects threatens projects; some need special environments such as a usability lab.`,
      `非功能测试（non-functional testing）评估组件或系统是否符合非功能需求——"系统表现得有多好"。大纲列出 ISO/IEC 25010 特性：性能效率、兼容性、易用性（交互能力）、可靠性、信息安全性、可维护性、可移植性（灵活性）、功能安全性。应尽可能早开始（评审、组件测试——左移的一种形式）；许多非功能测试由功能测试派生；非功能缺陷发现过晚会严重威胁项目；有时需要特定环境，如易用性实验室。`,
    ),
    example: L(
      `Dùng JMeter giả lập 5.000 người dùng đồng thời trong đợt flash sale 11.11, yêu cầu trang thanh toán phản hồi dưới 2 giây và tỷ lệ lỗi < 0,1%.`,
      `Using JMeter to simulate 5,000 concurrent users during an 11.11 flash sale, requiring checkout to respond within 2 seconds with < 0.1% errors.`,
      `用 JMeter 模拟"双 11"秒杀期间 5000 名并发用户，要求结算页 2 秒内响应、错误率 < 0.1%。`,
    ),
    confusedWith: [
      {
        id: 'functional-testing',
        note: L(
          `Functional = làm GÌ; non-functional = làm TỐT thế nào. Ví dụ "chuyển được tiền" là chức năng; "chuyển trong 3 giây khi có 1.000 người dùng" là phi chức năng.`,
          `Functional = WHAT; non-functional = HOW WELL. "Can transfer money" is functional; "transfers within 3 s under 1,000 users" is non-functional.`,
          `功能 = 做什么；非功能 = 做得多好。"能转账"是功能；"1000 用户时 3 秒内完成转账"是非功能。`,
        ),
      },
    ],
  },

  'operational-acceptance-testing': {
    explanation: L(
      `Kiểm thử chấp nhận vận hành (operational acceptance testing, production acceptance testing) là một dạng kiểm thử chấp nhận nhằm xác định tổ chức chịu trách nhiệm vận hành hệ thống (đội vận hành/IT operations) có thể chấp nhận nó hay không. Thường kiểm tra sao lưu/khôi phục, cài đặt/gỡ cài đặt, khôi phục thảm hoạ, giám sát, quản lý người dùng, bảo trì. Syllabus chỉ liệt kê operational acceptance testing là một dạng chính của acceptance testing.`,
      `Operational acceptance testing (production acceptance testing) is acceptance testing to determine whether the organization responsible for operating the system can accept it. It typically covers backup/restore, installation, disaster recovery, monitoring, user management and maintenance tasks. The syllabus only lists it as a main form of acceptance testing.`,
      `运行验收测试（operational acceptance testing，又称生产验收测试）是一种验收测试，用于确定负责运行系统的组织（运维团队）能否接受该系统。通常检查备份/恢复、安装、灾难恢复、监控、用户管理和维护任务。大纲仅将其列为验收测试的主要形式之一。`,
    ),
    example: L(
      `Trước go-live hệ thống internet banking, đội vận hành thử khôi phục database từ bản backup, chuyển sang site dự phòng (DR) trong 30 phút và kiểm tra cảnh báo giám sát hoạt động.`,
      `Before internet banking go-live, the operations team restores the database from backup, fails over to the DR site within 30 minutes and checks that monitoring alerts work.`,
      `网上银行上线前，运维团队从备份恢复数据库、在 30 分钟内切换到灾备站点，并检查监控告警是否正常。`,
    ),
    confusedWith: [
      {
        id: 'user-acceptance-testing',
        note: L(
          `UAT: người dùng cuối/nghiệp vụ có chấp nhận không; operational acceptance testing: đội vận hành/quản trị hệ thống có chấp nhận không.`,
          `UAT: do the end users/business accept it; operational acceptance testing: do the operations/system administrators accept it.`,
          `UAT：最终用户/业务是否接受；运行验收测试：运维/系统管理人员是否接受。`,
        ),
      },
    ],
  },

  'pair-testing': {
    explanation: L(
      `Kiểm thử theo cặp (pair testing) là cách tiếp cận trong đó hai thành viên trong nhóm cùng lúc cộng tác kiểm thử một sản phẩm công việc — ví dụ tester + developer, hoặc tester + BA, ngồi chung một máy. Syllabus chỉ nhắc pair testing như một hình thức của test execution (pair testing sessions).`,
      `Pair testing is a test approach in which two team members simultaneously collaborate on testing a work product — e.g. tester + developer or tester + BA at one machine. The syllabus mentions it only as a form of test execution (pair testing sessions).`,
      `结对测试（pair testing）是两名团队成员同时协作测试一个工作产品的测试方法——例如测试人员与开发人员、或测试人员与 BA 共用一台机器。大纲仅将结对测试会话作为测试执行的一种形式提及。`,
    ),
    example: L(
      `Tester và developer ngồi cùng 45 phút khám phá tính năng "trả góp 0%": tester thao tác các tình huống bất thường, developer xem log ngay và giải thích hành vi.`,
      `A tester and a developer spend 45 minutes exploring "0% instalments" together: the tester tries unusual scenarios while the developer watches the logs and explains behavior.`,
      `测试人员和开发人员一起用 45 分钟探索"0% 分期"功能：测试人员尝试各种异常场景，开发人员实时查看日志并解释行为。`,
    ),
  },

  'performance-efficiency': {
    explanation: L(
      `Hiệu năng (performance efficiency) là mức độ thành phần/hệ thống thực hiện chức năng với việc sử dụng tài nguyên hiệu quả trong điều kiện, thông lượng và thời gian xác định — gồm thời gian phản hồi (time behavior), sử dụng tài nguyên (resource utilization) và sức chứa (capacity). Đây là đặc tính phi chức năng theo ISO/IEC 25010 trong syllabus; syllabus nói dynamic testing đo được các đặc tính phụ thuộc chạy code như performance efficiency, và DevOps làm tăng khả năng quan sát các đặc tính này.`,
      `Performance efficiency is the degree to which a component or system performs its functions with efficient use of resources under specified conditions, throughput and time — covering time behavior, resource utilization and capacity. It is an ISO/IEC 25010 non-functional characteristic in the syllabus; dynamic testing can measure it because it depends on executing code, and DevOps increases its visibility.`,
      `性能效率（performance efficiency）是组件或系统在规定条件、吞吐量和时间下高效利用资源执行功能的程度，包括时间特性、资源利用率和容量。它是大纲列出的 ISO/IEC 25010 非功能特性；动态测试可以度量它，因为它依赖代码执行，DevOps 也提高了对它的可见性。`,
    ),
    example: L(
      `Yêu cầu: tra cứu lịch sử giao dịch 12 tháng phản hồi ≤ 1,5 giây ở 2.000 người dùng đồng thời, CPU server < 70%, app mobile dùng < 200 MB RAM.`,
      `Requirement: 12-month transaction history loads in ≤1.5 s with 2,000 concurrent users, server CPU < 70%, mobile app uses < 200 MB RAM.`,
      `需求：2000 并发用户时查询 12 个月交易记录 ≤1.5 秒，服务器 CPU < 70%，手机应用内存 < 200 MB。`,
    ),
    confusedWith: [
      {
        id: 'reliability',
        note: L(
          `Performance efficiency: nhanh và tiết kiệm tài nguyên đến đâu; reliability: hoạt động ổn định, đúng chức năng trong một khoảng thời gian, dưới điều kiện xác định (ít sự cố, khôi phục được).`,
          `Performance efficiency: how fast and resource-efficient; reliability: how consistently it performs specified functions over a period under specified conditions (few failures, recoverable).`,
          `性能效率：有多快、多节省资源；可靠性：在规定条件和时间内稳定执行规定功能的程度（少故障、可恢复）。`,
        ),
      },
    ],
  },

  'portability': {
    explanation: L(
      `Khả năng chuyển đổi / khả chuyển (portability) là mức độ thành phần/hệ thống có thể được chuyển từ một môi trường phần cứng, phần mềm, vận hành hoặc sử dụng sang môi trường khác — gồm khả năng thích ứng (adaptability), khả năng cài đặt (installability), khả năng thay thế (replaceability). Đây là đặc tính phi chức năng theo ISO/IEC 25010 trong syllabus, được ghi là "Portability (also known as flexibility)"; syllabus lấy ví dụ test kiểm tra một chức năng có thể chuyển sang nền tảng mới.`,
      `Portability is the degree to which a component or system can be transferred from one hardware, software or other operational or usage environment to another — covering adaptability, installability and replaceability. It is an ISO/IEC 25010 non-functional characteristic in the syllabus, written as "Portability (also known as flexibility)"; the syllabus example is checking that a function can be ported to a new platform.`,
      `可移植性（portability）是组件或系统能从一种硬件、软件或其他运行/使用环境迁移到另一种环境的程度，包括适应性、易安装性、易替换性。它是大纲列出的 ISO/IEC 25010 非功能特性，写作"可移植性（又称灵活性）"；大纲的例子是检查某功能能否移植到新平台。`,
    ),
    example: L(
      `Kiểm tra web shop chạy được trên cả Chrome, Safari, Firefox, và hệ thống backend cài được trên cả máy chủ on-premise lẫn Kubernetes trên cloud.`,
      `Checking that the web shop works in Chrome, Safari and Firefox, and that the backend can be installed both on-premise and on cloud Kubernetes.`,
      `检查网店在 Chrome、Safari、Firefox 上都能运行，后端既能安装在本地服务器也能部署到云端 Kubernetes。`,
    ),
    confusedWith: [
      {
        id: 'compatibility',
        note: L(
          `Portability: chuyển sang môi trường KHÁC; compatibility: cùng tồn tại/trao đổi dữ liệu với hệ thống khác trong CÙNG môi trường.`,
          `Portability: moving to a DIFFERENT environment; compatibility: co-existing/exchanging data with other systems in the SAME environment.`,
          `可移植性：迁移到不同环境；兼容性：在同一环境中与其他系统共存/交换数据。`,
        ),
      },
      {
        id: 'flexibility',
        note: L(
          `Syllabus coi flexibility là tên khác của portability; glossary v4.8.1 định nghĩa flexibility rộng hơn (thích ứng với thay đổi yêu cầu, bối cảnh sử dụng, môi trường).`,
          `The syllabus treats flexibility as another name for portability; glossary v4.8.1 defines flexibility more broadly (adapting to changes in requirements, contexts of use, environment).`,
          `大纲把灵活性视为可移植性的别名；术语表 v4.8.1 对灵活性的定义更广（适应需求、使用环境、系统环境的变化）。`,
        ),
      },
    ],
  },

  'quality': {
    explanation: L(
      `Chất lượng (quality) là mức độ một sản phẩm công việc thoả mãn các yêu cầu được nêu rõ và các yêu cầu ngầm định. Syllabus: kiểm thử đánh giá chất lượng phần mềm và giúp giảm rủi ro failure khi vận hành; kiểm thử là một dạng kiểm soát chất lượng (quality control), giúp đạt mục tiêu trong ràng buộc phạm vi, thời gian, chất lượng, ngân sách. Kiểm thử chỉ gián tiếp nâng cao chất lượng, vì defect được loại bỏ qua debugging.`,
      `Quality is the degree to which a work product satisfies stated and implied requirements. Per the syllabus, testing assesses software quality and helps reduce the risk of failure in operation; testing is a form of quality control helping achieve objectives within scope, time, quality and budget constraints. Testing contributes to quality only indirectly, since defects are removed by debugging.`,
      `质量（quality）是工作产品满足明示和隐含需求的程度。大纲指出：测试评估软件质量并帮助降低运行中失效的风险；测试是质量控制的一种形式，有助于在范围、时间、质量和预算约束内达成目标。测试只是间接提高质量，因为缺陷是通过调试消除的。`,
    ),
    example: L(
      `Yêu cầu nêu rõ: "chuyển khoản phải ghi nhận đúng số tiền". Yêu cầu ngầm định: không ai viết ra nhưng khách hàng mong app không làm lộ số dư khi chụp màn hình đa nhiệm. Chất lượng cao phải đáp ứng cả hai.`,
      `Stated: "transfers must record the correct amount". Implied: nobody wrote it down, but customers expect the app not to reveal balances in the task-switcher screenshot. High quality must satisfy both.`,
      `明示需求："转账必须记录正确金额"。隐含需求：没人写下来，但客户期望应用在多任务切换截图中不暴露余额。高质量需同时满足两者。`,
    ),
  },

  'quality-assurance': {
    explanation: L(
      `Đảm bảo chất lượng (quality assurance, QA) là các hoạt động nhằm tạo niềm tin rằng các yêu cầu chất lượng sẽ được đáp ứng. Syllabus nhấn mạnh testing và QA không giống nhau: QA là cách tiếp cận hướng quy trình, phòng ngừa (preventive), tập trung vào triển khai và cải tiến quy trình, dựa trên ý tưởng quy trình tốt được làm đúng sẽ tạo ra sản phẩm tốt; QA áp dụng cho cả quy trình phát triển lẫn kiểm thử và là trách nhiệm của mọi người trong dự án. Kết quả test được QA dùng làm phản hồi về hiệu quả quy trình. Lưu ý: ở Việt Nam chức danh "QA" thường được dùng cho tester, nhưng trong ISTQB, QA và testing là hai khái niệm khác.`,
      `Quality assurance (QA) comprises activities focused on providing confidence that quality requirements will be fulfilled. The syllabus stresses that testing and QA are not the same: QA is a process-oriented, preventive approach focusing on implementing and improving processes, on the basis that a good process followed correctly generates a good product; it applies to development and testing processes and is everyone's responsibility. QA uses test results as feedback on how well processes perform. Note: job titles often say "QA" for testers, but in ISTQB QA and testing are different concepts.`,
      `质量保证（quality assurance, QA）是旨在提供"质量要求将被满足"的信心的活动。大纲强调测试与 QA 不同：QA 是面向过程的预防性方法，关注过程的实施和改进，其依据是正确遵循良好过程就能产出好产品；QA 适用于开发和测试过程，是项目中每个人的责任。QA 将测试结果用作过程运行情况的反馈。注意：职位名称常把测试人员称为"QA"，但在 ISTQB 中 QA 与测试是不同概念。`,
    ),
    example: L(
      `Sau 3 sprint có nhiều lỗi về hạn mức giao dịch, nhóm bổ sung bước review yêu cầu bắt buộc và checklist quy tắc nghiệp vụ cho mọi user story liên quan tiền — đây là hoạt động QA (cải tiến quy trình), không phải testing.`,
      `After 3 sprints with many transaction-limit bugs, the team adds a mandatory requirements review and a business-rule checklist for every money-related story — a QA activity (process improvement), not testing.`,
      `连续 3 个冲刺出现大量交易限额缺陷后，团队为所有涉及资金的用户故事增加强制需求评审和业务规则检查清单——这是 QA 活动（过程改进），而非测试。`,
    ),
    confusedWith: [
      {
        id: 'testing',
        note: L(
          `Testing: hướng sản phẩm, khắc phục (corrective), là một dạng quality control — tìm defect trong sản phẩm. QA: hướng quy trình, phòng ngừa (preventive) — cải tiến cách làm để ít defect ngay từ đầu.`,
          `Testing: product-oriented, corrective, a form of quality control — finds defects in the product. QA: process-oriented, preventive — improves how work is done so fewer defects arise.`,
          `测试：面向产品、纠正性，是质量控制的一种——发现产品中的缺陷。QA：面向过程、预防性——改进工作方式以从源头减少缺陷。`,
        ),
      },
      {
        id: 'quality-control',
        note: L(
          `Quality control đánh giá chất lượng của sản phẩm (testing là dạng chính); quality assurance tập trung vào quy trình để tạo niềm tin chất lượng sẽ đạt.`,
          `Quality control evaluates the product's quality (testing is its main form); quality assurance focuses on processes to give confidence quality will be achieved.`,
          `质量控制评估产品质量（测试是其主要形式）；质量保证关注过程，以提供质量将会达成的信心。`,
        ),
      },
    ],
    versionNote: L(
      `Glossary v4.8.1 định nghĩa QA theo mục đích ("tạo niềm tin rằng yêu cầu chất lượng sẽ được đáp ứng"), còn syllabus v4.0.1 mô tả QA theo đặc điểm: hướng quy trình, phòng ngừa, tập trung triển khai và cải tiến quy trình. Hai cách không mâu thuẫn; khi thi hãy nhớ cách mô tả của syllabus (process-oriented, preventive).`,
      `Glossary v4.8.1 defines QA by purpose ("providing confidence that quality requirements will be fulfilled"), while syllabus v4.0.1 characterizes it as process-oriented, preventive and focused on implementing and improving processes. They do not conflict; for the exam remember the syllabus description.`,
      `术语表 v4.8.1 从目的角度定义 QA（"提供质量要求将被满足的信心"），而大纲 v4.0.1 从特点描述：面向过程、预防性、关注过程的实施和改进。二者并不矛盾；考试时记住大纲的描述。`,
    ),
  },

  'quality-control': {
    explanation: L(
      `Kiểm soát chất lượng (quality control, QC) là các hoạt động nhằm đánh giá chất lượng của một thành phần hoặc hệ thống. Syllabus: testing là một dạng chính của QC (các dạng khác gồm phương pháp hình thức như model checking và chứng minh tính đúng, mô phỏng, làm mẫu); QC/testing mang tính hướng sản phẩm và khắc phục. Mọi hoạt động phát triển nên có hoạt động kiểm thử tương ứng để đều được quality control.`,
      `Quality control (QC) comprises activities designed to evaluate the quality of a component or system. Per the syllabus, testing is a major form of QC (others include formal methods such as model checking and proof of correctness, simulation and prototyping); it is product-oriented and corrective. Every development activity should have a corresponding test activity so all are subject to quality control.`,
      `质量控制（quality control, QC）是用于评估组件或系统质量的活动。大纲指出：测试是 QC 的主要形式（其他形式包括模型检查、正确性证明等形式化方法，以及仿真和原型）；它面向产品、具有纠正性。每项开发活动都应有对应的测试活动，使所有开发活动都受到质量控制。`,
    ),
    example: L(
      `Trước khi release, nhóm chạy bộ test hồi quy, review mã nguồn và quét bảo mật để đánh giá chất lượng bản build 4.2 — đều là hoạt động QC.`,
      `Before release the team runs the regression suite, reviews code and runs a security scan to evaluate build 4.2 — all QC activities.`,
      `发布前团队运行回归套件、评审代码并进行安全扫描，以评估 4.2 版构建的质量——这些都是 QC 活动。`,
    ),
    confusedWith: [
      {
        id: 'quality-assurance',
        note: L(
          `QC: kiểm tra SẢN PHẨM (phát hiện, khắc phục); QA: cải tiến QUY TRÌNH (phòng ngừa).`,
          `QC: checks the PRODUCT (detect, correct); QA: improves the PROCESS (prevent).`,
          `QC：检查产品（发现、纠正）；QA：改进过程（预防）。`,
        ),
      },
    ],
  },

  'regression-testing': {
    explanation: L(
      `Kiểm thử hồi quy (regression testing) là loại kiểm thử liên quan đến thay đổi nhằm phát hiện xem có defect nào được đưa vào hoặc lộ ra ở các phần không thay đổi của phần mềm hay không. Syllabus: regression testing xác nhận thay đổi (kể cả bản sửa lỗi đã qua confirmation testing) không gây hậu quả bất lợi — ảnh hưởng có thể ở cùng component, component khác, hệ thống kết nối, hoặc môi trường. Nên làm impact analysis trước để xác định phạm vi. Bộ regression chạy nhiều lần và ngày càng lớn nên rất phù hợp để tự động hoá, nên đưa vào CI. Cần ở mọi test level khi có thay đổi.`,
      `Regression testing is change-related testing to detect whether defects have been introduced or uncovered in unchanged areas of the software. Per the syllabus it confirms that a change (including an already confirmation-tested fix) has caused no adverse consequences — in the same component, other components, connected systems or the environment. Perform impact analysis first to determine its extent. Regression suites run many times and grow, so they are strong candidates for automation, ideally in CI. Needed at every test level where changes are made.`,
      `回归测试（regression testing）是与变更相关的测试，用于检测软件未变更区域是否引入或暴露了缺陷。大纲指出：回归测试确认变更（包括已经过确认测试的修复）没有造成不利后果——影响可能在同一组件、其他组件、相连系统或环境中。应先进行影响分析确定范围。回归测试套件会多次运行且不断增长，因此非常适合自动化，并应纳入 CI。只要有变更，各测试级别都需要回归测试。`,
    ),
    example: L(
      `Sửa lỗi làm tròn tiền lãi ở module Tiết kiệm; sau khi confirmation test pass, chạy bộ regression tự động 600 case cho Tiết kiệm, Sao kê, Báo cáo thuế để chắc chắn không có gì khác bị ảnh hưởng.`,
      `After fixing an interest-rounding bug in Savings and passing confirmation testing, the team runs a 600-case automated regression suite on Savings, Statements and Tax reports to ensure nothing else broke.`,
      `修复储蓄模块的利息舍入缺陷并通过确认测试后，团队对储蓄、对账单、税务报表运行 600 个用例的自动化回归套件，确保没有其他部分受影响。`,
    ),
    confusedWith: [
      {
        id: 'confirmation-testing',
        note: L(
          `Confirmation: kiểm tra lỗi ĐÃ SỬA thật sự hết (chạy lại test đã fail). Regression: kiểm tra thay đổi KHÔNG làm hỏng chỗ khác (chạy test đã từng pass).`,
          `Confirmation: checks the FIXED defect is really gone (re-run failed tests). Regression: checks the change did NOT break other things (re-run previously passing tests).`,
          `确认测试：检查已修复缺陷确实消失（重跑失败用例）。回归测试：检查变更没有破坏其他部分（重跑曾通过的用例）。`,
        ),
      },
      {
        id: 'impact-analysis',
        note: L(
          `Impact analysis là phân tích để chọn phạm vi regression; regression testing là việc chạy test.`,
          `Impact analysis selects the regression scope; regression testing executes the tests.`,
          `影响分析用于确定回归范围；回归测试是执行测试。`,
        ),
      },
    ],
    versionNote: L(
      `Glossary v4.8.1 nói về defect ở "các phần không thay đổi" của phần mềm, còn syllabus v4.0.1 mô tả rộng hơn: hậu quả bất lợi có thể ở cùng component nơi thay đổi được thực hiện, ở component khác, hệ thống kết nối, và cả môi trường.`,
      `Glossary v4.8.1 speaks of defects in "unchanged areas" of the software, while syllabus v4.0.1 is broader: adverse consequences may affect the same component where the change was made, other components, connected systems and even the environment.`,
      `术语表 v4.8.1 说的是软件"未变更区域"中的缺陷，而大纲 v4.0.1 的描述更广：不利后果可能影响发生变更的同一组件、其他组件、相连系统乃至环境。`,
    ),
  },

  'reliability': {
    explanation: L(
      `Độ tin cậy (reliability) là mức độ thành phần/hệ thống thực hiện các chức năng đã định trong điều kiện xác định trong một khoảng thời gian xác định — gồm độ trưởng thành (maturity), tính sẵn sàng (availability), khả năng chịu lỗi (fault tolerance), khả năng phục hồi (recoverability). Đây là đặc tính phi chức năng theo ISO/IEC 25010 trong syllabus; syllabus nói DevOps làm tăng khả năng quan sát các đặc tính như reliability.`,
      `Reliability is the degree to which a component or system performs specified functions under specified conditions for a specified period of time — covering maturity, availability, fault tolerance and recoverability. It is an ISO/IEC 25010 non-functional characteristic in the syllabus, whose visibility DevOps increases.`,
      `可靠性（reliability）是组件或系统在规定条件下、规定时间内执行规定功能的程度，包括成熟性、可用性、容错性和易恢复性。它是大纲列出的 ISO/IEC 25010 非功能特性，DevOps 能提高其可见性。`,
    ),
    example: L(
      `Yêu cầu hệ thống thanh toán thẻ: sẵn sàng 99,95%/tháng; nếu một node chết, giao dịch tự chuyển sang node khác mà không mất giao dịch; khôi phục dịch vụ trong ≤ 5 phút.`,
      `Card payment system: 99.95% monthly availability; if a node fails, transactions fail over without loss; service recovers within ≤5 minutes.`,
      `银行卡支付系统：月可用性 99.95%；节点故障时交易自动切换且不丢失；服务在 ≤5 分钟内恢复。`,
    ),
    confusedWith: [
      {
        id: 'performance-efficiency',
        note: L(
          `Reliability: chạy ổn định, ít sự cố theo thời gian; performance efficiency: nhanh và dùng tài nguyên hiệu quả.`,
          `Reliability: stable, few failures over time; performance efficiency: fast and resource-efficient.`,
          `可靠性：长期稳定、故障少；性能效率：快速且节省资源。`,
        ),
      },
    ],
  },

  'retrospective': {
    explanation: L(
      `Họp cải tiến / họp nhìn lại (retrospective) là sự kiện định kỳ trong đó các thành viên thảo luận kết quả, xem lại cách làm và tìm cách cải tiến. Syllabus: retrospective thường diễn ra cuối dự án, cuối vòng lặp, ở mốc phát hành hoặc khi cần; người tham gia (tester, developer, kiến trúc sư, product owner, BA…) bàn: điều gì thành công nên giữ, điều gì chưa tốt cần cải thiện, làm sao áp dụng cải tiến. Kết quả nên được ghi lại, thường là một phần của test completion report, và các cải tiến cần được theo dõi thực hiện. Lợi ích cho kiểm thử: tăng hiệu quả, chất lượng testware, gắn kết đội, cải thiện test basis, hợp tác dev–test tốt hơn.`,
      `A retrospective is a regular event in which team members discuss results, review their practices and identify ways to improve. Per the syllabus it is held at the end of a project or iteration, at a release milestone or when needed; participants (testers, developers, architects, product owner, BAs…) discuss what was successful and should be kept, what could be improved and how to incorporate improvements. Results should be recorded, normally in the test completion report, and improvements followed up. Benefits for testing: effectiveness/efficiency, testware quality, team bonding, better test basis, better dev-test cooperation.`,
      `回顾会议（retrospective）是团队成员定期讨论结果、审视工作方式并找出改进方法的活动。大纲指出：回顾通常在项目或迭代结束、发布里程碑或需要时举行；参与者（测试、开发、架构师、产品负责人、BA 等）讨论：哪些做得好应保留、哪些不好需改进、如何落实改进并保持成功。结果应被记录，通常纳入测试完成报告，改进项需跟进落实。对测试的好处：提高效果/效率、提升测试件质量、增强团队凝聚力、改进测试依据、加强开发与测试的协作。`,
    ),
    example: L(
      `Cuối sprint 12 app ví điện tử, nhóm nhận ra môi trường test thường chết vào thứ Hai; hành động cải tiến: dựng môi trường bằng script tự động, giao cho DevOps theo dõi ở sprint 13.`,
      `At the end of sprint 12 of an e-wallet app the team notes the test environment often breaks on Mondays; action: script the environment setup, owned by DevOps, followed up in sprint 13.`,
      `电子钱包应用第 12 个冲刺结束时，团队发现测试环境常在周一宕机；改进行动：用脚本自动搭建环境，由 DevOps 负责并在第 13 个冲刺跟进。`,
    ),
  },

  'risk': {
    explanation: L(
      `Rủi ro (risk) theo glossary là một yếu tố có thể dẫn tới hậu quả tiêu cực trong tương lai. Syllabus mô tả risk là một sự kiện, mối nguy, mối đe doạ hoặc tình huống tiềm ẩn mà nếu xảy ra sẽ gây tác động bất lợi, được đặc trưng bởi khả năng xảy ra (risk likelihood, xác suất giữa 0 và 1) và mức tác động (risk impact, harm); hai yếu tố này tạo nên mức rủi ro (risk level). Trong kiểm thử có hai loại: rủi ro dự án (project risk — tổ chức, con người, kỹ thuật, nhà cung cấp) và rủi ro sản phẩm (product risk — liên quan đặc tính chất lượng). Kiểm thử giúp giảm rủi ro chất lượng phần mềm không đủ; risk-based testing chọn và ưu tiên test dựa trên phân tích rủi ro.`,
      `Per the glossary, a risk is a factor that could result in future negative consequences. The syllabus describes it as a potential event, hazard, threat or situation whose occurrence causes an adverse effect, characterized by risk likelihood (probability between 0 and 1) and risk impact (harm), which together express the risk level. In testing there are project risks (organizational, people, technical, supplier) and product risks (related to quality characteristics). Testing reduces the risk of inadequate quality; risk-based testing selects and prioritizes tests based on risk analysis.`,
      `风险（risk）按术语表定义是可能导致未来负面后果的因素。大纲将其描述为一旦发生就会造成不利影响的潜在事件、危害、威胁或情况，由风险可能性（概率介于 0 和 1 之间）和风险影响（危害）两个因素刻画，二者共同表示风险级别。测试中关注两类风险：项目风险（组织、人员、技术、供应商）和产品风险（与质量特性相关）。测试有助于降低软件质量不足的风险；基于风险的测试根据风险分析选择测试并排定优先级。`,
    ),
    example: L(
      `Product risk: tính sai phí chuyển khoản liên ngân hàng (khả năng: trung bình; tác động: rất cao — mất tiền, khiếu nại). Project risk: nhà cung cấp cổng thanh toán giao API sandbox trễ 2 tuần.`,
      `Product risk: wrong interbank transfer fee calculation (likelihood medium, impact very high — financial loss, complaints). Project risk: the payment gateway vendor delivers its sandbox API 2 weeks late.`,
      `产品风险：跨行转账手续费计算错误（可能性中等，影响极高——资金损失、投诉）。项目风险：支付网关供应商的沙箱 API 延迟两周交付。`,
    ),
    confusedWith: [
      {
        id: 'product-risk',
        note: L(
          `Risk là khái niệm chung; product risk ảnh hưởng chất lượng sản phẩm (chức năng sai, chậm, lỗ hổng bảo mật); project risk ảnh hưởng sự thành công của dự án (trễ tiến độ, thiếu người, vượt ngân sách).`,
          `Risk is the general concept; a product risk affects product quality (wrong functions, slowness, vulnerabilities); a project risk affects project success (delays, staff shortage, budget overrun).`,
          `风险是总称；产品风险影响产品质量（功能错误、缓慢、安全漏洞）；项目风险影响项目成功（延期、人手不足、超预算）。`,
        ),
      },
      {
        id: 'defect',
        note: L(
          `Risk là điều CÓ THỂ xảy ra trong tương lai; defect là thứ ĐÃ tồn tại trong sản phẩm. Defect cluster dự đoán/thực tế là đầu vào cho risk-based testing.`,
          `A risk is something that MAY happen; a defect ALREADY exists in the product. Predicted and actual defect clusters feed risk-based testing.`,
          `风险是未来可能发生的事；缺陷是产品中已存在的东西。预测的和实际的缺陷集群是基于风险的测试的输入。`,
        ),
      },
    ],
    versionNote: L(
      `Cách diễn đạt khác nhau: glossary v4.8.1 gọi risk là "một yếu tố có thể dẫn tới hậu quả tiêu cực trong tương lai"; syllabus v4.0.1 gọi là "sự kiện, mối nguy, mối đe doạ hoặc tình huống tiềm ẩn" và gắn trực tiếp với likelihood và impact. Bản chất tương đương; khi thi hãy nhớ hai yếu tố likelihood và impact.`,
      `Wording differs: glossary v4.8.1 calls risk "a factor that could result in future negative consequences"; syllabus v4.0.1 calls it "a potential event, hazard, threat, or situation" characterized by likelihood and impact. The substance is equivalent; for the exam remember the two factors.`,
      `表述不同：术语表 v4.8.1 称风险为"可能导致未来负面后果的因素"；大纲 v4.0.1 称其为"潜在的事件、危害、威胁或情况"，并直接以可能性和影响刻画。实质相同；考试时记住可能性和影响两个因素。`,
    ),
  },

  'risk-register': {
    explanation: L(
      `Sổ đăng ký rủi ro (risk register) là tài liệu dùng trong quản lý dự án và quản trị để đánh giá, ưu tiên và theo dõi các rủi ro đã xác định. Syllabus: risk register là danh sách rủi ro kèm khả năng xảy ra, mức tác động và thông tin về biện pháp giảm thiểu (risk mitigation); nó là sản phẩm của test planning và thường là một phần của test plan.`,
      `A risk register is the documentation used in project management and governance to assess, prioritize and track identified risks. Per the syllabus it is a list of risks with risk likelihood, risk impact and risk mitigation information; it is a test planning work product, often part of the test plan.`,
      `风险登记册（risk register）是项目管理和治理中用于评估、排序和跟踪已识别风险的文档。大纲指出：它是列有风险可能性、风险影响和风险缓解信息的风险清单，是测试计划阶段的工作产品，通常是测试计划的一部分。`,
    ),
    example: L(
      `Một dòng trong risk register: "R-07 Tính sai phí chuyển khoản liên ngân hàng — Khả năng: 3/5, Tác động: 5/5, Mức: 15 (cao) — Giảm thiểu: decision table testing đầy đủ, review công thức với nghiệp vụ — Người phụ trách: Lan (QA lead) — Trạng thái: đang theo dõi".`,
      `A risk register row: "R-07 Wrong interbank fee — Likelihood 3/5, Impact 5/5, Level 15 (high) — Mitigation: full decision table testing, formula review with business — Owner: Lan (QA lead) — Status: monitoring".`,
      `风险登记册中的一行："R-07 跨行手续费计算错误——可能性 3/5，影响 5/5，级别 15（高）——缓解措施：完整的决策表测试、与业务评审公式——负责人：Lan（QA 负责人）——状态：监控中"。`,
    ),
  },

  'root-cause': {
    explanation: L(
      `Nguyên nhân gốc (root cause) là nguồn gốc của một defect mà nếu loại bỏ thì loại defect đó sẽ giảm hoặc không còn xuất hiện. Syllabus: root cause là lý do cơ bản dẫn tới một vấn đề (ví dụ một tình huống dẫn tới error); được xác định qua phân tích nguyên nhân gốc (root cause analysis), thường làm khi xảy ra failure hoặc phát hiện defect. Người ta tin rằng xử lý root cause (ví dụ loại bỏ nó) sẽ ngăn chặn hoặc giảm tần suất các failure/defect tương tự.`,
      `A root cause is a source of a defect such that if it is removed, the occurrence of that defect type is decreased or removed. Per the syllabus it is a fundamental reason for the occurrence of a problem (e.g. a situation that leads to an error), identified through root cause analysis, typically when a failure occurs or a defect is found. Addressing it (e.g. removing it) is believed to prevent or reduce similar failures or defects.`,
      `根本原因（root cause）是缺陷的根源，一旦消除，该类缺陷的发生就会减少或消失。大纲指出：根本原因是问题发生的根本理由（如导致错误的某种情况），通过根本原因分析识别，通常在发生失效或发现缺陷时进行。人们认为处理根本原因（如将其消除）可以预防类似失效或缺陷，或降低其频率。`,
    ),
    example: L(
      `Nhiều bug "sai múi giờ" trong lịch sử giao dịch. Root cause analysis cho thấy nhóm không có quy ước lưu thời gian chuẩn UTC → đặt quy ước + thêm rule static analysis; các bug loại này giảm hẳn.`,
      `Many "wrong time zone" bugs in transaction history. Root cause analysis shows the team had no convention to store times in UTC → a convention plus a static analysis rule are added; such bugs drop sharply.`,
      `交易记录中出现大量"时区错误"缺陷。根本原因分析发现团队没有统一以 UTC 存储时间的约定 → 制定约定并增加静态分析规则；此类缺陷大幅减少。`,
    ),
    confusedWith: [
      {
        id: 'error',
        note: L(
          `Error là hành động sai cụ thể (dev quên đổi múi giờ); root cause là lý do sâu xa khiến error xảy ra (không có quy ước, thiếu đào tạo, áp lực thời gian).`,
          `The error is the specific wrong action (developer forgets time-zone conversion); the root cause is the deeper reason it happened (no convention, no training, time pressure).`,
          `错误是具体的错误行为（开发人员忘记时区转换）；根本原因是导致该错误的深层理由（无约定、缺乏培训、时间压力）。`,
        ),
      },
      {
        id: 'defect',
        note: L(
          `Sửa defect = sửa một chỗ sai; xử lý root cause = ngăn cả loại defect đó tái diễn.`,
          `Fixing a defect removes one instance; addressing the root cause prevents that type of defect recurring.`,
          `修复缺陷只消除一个实例；处理根本原因可防止该类缺陷再次出现。`,
        ),
      },
      {
        id: 'root-cause-analysis',
        note: L(
          `Root cause là cái được tìm ra; root cause analysis là quá trình đi tìm nó.`,
          `The root cause is what you find; root cause analysis is the process of finding it.`,
          `根本原因是被找到的东西；根本原因分析是寻找它的过程。`,
        ),
      },
    ],
    versionNote: L(
      `Glossary v4.8.1 định nghĩa root cause là nguồn gốc của một defect; syllabus v4.0.1 nói rộng hơn: lý do cơ bản dẫn tới "một vấn đề" (ví dụ tình huống dẫn tới error), và việc xử lý nó giúp giảm cả failure lẫn defect tương tự.`,
      `Glossary v4.8.1 defines the root cause as the source of a defect; syllabus v4.0.1 is broader: the fundamental reason for "a problem" (e.g. a situation leading to an error), whose removal reduces similar failures as well as defects.`,
      `术语表 v4.8.1 将根本原因定义为缺陷的根源；大纲 v4.0.1 更宽泛：导致"问题"的根本理由（如导致错误的情况），消除它可减少类似的失效和缺陷。`,
    ),
  },
};
