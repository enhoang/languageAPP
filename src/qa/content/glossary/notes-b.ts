import type { TermNotes } from '../../types';

// Explanations, examples and confusable terms for glossary batch B (written for this app — supplementary), by term id.
type LText = TermNotes['explanation'];
const l = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

export const NOTES_B: Record<string, TermNotes> = {
  safety: {
    explanation: l(
      `An toàn (safety) là một đặc tính chất lượng phi chức năng: hệ thống, trong điều kiện xác định, tránh gây nguy hiểm cho tính mạng, sức khỏe, tài sản hoặc môi trường. Syllabus CTFL v4.0.1 liệt kê safety trong danh sách đặc tính phi chức năng theo ISO/IEC 25010, được kiểm tra bằng kiểm thử phi chức năng (non-functional testing).`,
      `Safety is a non-functional quality characteristic: under defined conditions the system avoids endangering human life, health, property or the environment. The CTFL v4.0.1 syllabus lists safety among the ISO/IEC 25010 non-functional characteristics checked by non-functional testing.`,
      `安全性（safety）是一种非功能质量特性：在规定条件下，系统能够避免危及人的生命、健康、财产或环境。CTFL v4.0.1 大纲将其列为 ISO/IEC 25010 的非功能质量特性之一，通过非功能测试来检查。`,
    ),
    example: l(
      `Phần mềm điều khiển máy bơm insulin: kiểm thử rằng khi cảm biến báo lỗi, máy dừng bơm và báo động thay vì tiếp tục bơm liều sai.`,
      `Insulin pump software: test that when a sensor fails, the pump stops dosing and raises an alarm instead of continuing with a wrong dose.`,
      `胰岛素泵软件：测试当传感器故障时，泵停止给药并报警，而不是继续输出错误剂量。`,
    ),
    confusedWith: [
      {
        id: 'security',
        note: l(
          `Safety = không gây hại cho người/tài sản/môi trường (thường do sự cố, lỗi). Security = chống lại tấn công cố ý và kiểm soát quyền truy cập.`,
          `Safety = not causing harm to people, property or the environment (usually through accidents or malfunctions). Security = defending against deliberate attacks and controlling access.`,
          `安全性（safety）关注不伤害人、财产或环境（通常源于事故或故障）；信息安全性（security）关注抵御蓄意攻击并控制访问权限。`,
        ),
      },
    ],
  },

  security: {
    explanation: l(
      `Bảo mật (security) là đặc tính chất lượng phi chức năng: mức độ hệ thống chống lại tấn công bảo mật và chỉ cấp quyền truy cập phù hợp với loại và cấp độ phân quyền. Syllabus nêu security trong danh sách ISO/IEC 25010 và cho biết phân tích tĩnh (static analysis) cũng được dùng để đánh giá security, ví dụ phát hiện lỗ hổng buffer overflow.`,
      `Security is a non-functional quality characteristic: the degree to which the system defends against attacks and grants access appropriate to the type and level of authorization. The syllabus lists it under ISO/IEC 25010 and notes that static analysis is also used to evaluate security (e.g., finding buffer overflows).`,
      `信息安全性（security）是一种非功能质量特性：系统抵御安全攻击、并按授权类型和级别提供相应访问的程度。大纲将其列为 ISO/IEC 25010 特性之一，并指出静态分析也可用于评估信息安全性（如发现缓冲区溢出）。`,
    ),
    example: l(
      `Kiểm tra rằng người dùng vai trò "nhân viên" không thể xem bảng lương qua việc sửa ID trong URL, và form đăng nhập chống được SQL injection.`,
      `Check that a user with the "staff" role cannot view payroll by editing the ID in the URL, and that the login form resists SQL injection.`,
      `检查"员工"角色的用户无法通过修改 URL 中的 ID 查看工资表，并且登录表单能抵御 SQL 注入。`,
    ),
    confusedWith: [
      {
        id: 'safety',
        note: l(
          `Security bảo vệ hệ thống khỏi kẻ tấn công; safety bảo vệ con người/môi trường khỏi tác hại do hệ thống gây ra.`,
          `Security protects the system from attackers; safety protects people and the environment from harm caused by the system.`,
          `信息安全性保护系统免受攻击者侵害；安全性（safety）保护人和环境免受系统造成的伤害。`,
        ),
      },
      {
        id: 'security-testing',
        note: l(
          `Security là đặc tính chất lượng; security testing là loại kiểm thử dùng để đánh giá đặc tính đó.`,
          `Security is the quality characteristic; security testing is the testing that evaluates it.`,
          `信息安全性是质量特性；安全性测试（security testing）是评估该特性的测试。`,
        ),
      },
    ],
  },

  'service-virtualization': {
    explanation: l(
      `Ảo hóa dịch vụ (service virtualization) là kỹ thuật tạo ra các dịch vụ ảo thay thế cho dịch vụ thật (API bên thứ ba, hệ thống core…) chưa có sẵn, đắt hoặc khó kiểm soát. Trong syllabus, service virtualization được liệt kê là một hạng mục môi trường kiểm thử (test environment item) được tạo trong test implementation, cùng với stub, driver và simulator.`,
      `Service virtualization is a technique that provides virtual services standing in for real ones (third-party APIs, core systems…) that are unavailable, costly or hard to control. The syllabus lists service virtualizations as test environment items created during test implementation, alongside stubs, drivers and simulators.`,
      `服务虚拟化（service virtualization）是一种提供虚拟服务以替代不可用、昂贵或难以控制的真实服务（第三方 API、核心系统等）的技术。大纲将其列为测试实现阶段产生的测试环境项，与桩、驱动和模拟器并列。`,
    ),
    example: l(
      `Ứng dụng ví điện tử cần gọi API ngân hàng; nhóm QA dựng dịch vụ ảo trả về "thành công", "số dư không đủ", "timeout" để kiểm thử mọi nhánh mà không cần ngân hàng thật.`,
      `An e-wallet app calls a bank API; QA sets up a virtual service returning "success", "insufficient funds" and "timeout" to test every path without the real bank.`,
      `电子钱包应用需要调用银行 API；QA 搭建虚拟服务返回"成功""余额不足""超时"，无需真实银行即可测试所有路径。`,
    ),
    confusedWith: [
      {
        id: 'stub',
        note: l(
          `Stub thường là đoạn code thay thế một thành phần ở mức component; service virtualization mô phỏng cả một dịch vụ (qua mạng/giao thức) và thường dùng ở mức tích hợp hệ thống.`,
          `A stub usually replaces a component in code at component level; service virtualization simulates a whole service (over the network/protocol), typically for system integration testing.`,
          `桩通常在代码层面替代某个组件；服务虚拟化则通过网络/协议模拟整个服务，常用于系统集成测试。`,
        ),
      },
    ],
    versionNote: l(
      `Định nghĩa glossary v4.8.1 nhấn mạnh việc "cung cấp dịch vụ ảo được triển khai, truy cập và quản lý từ xa", còn syllabus v4.0.1 chỉ nhắc service virtualization như một hạng mục môi trường kiểm thử, không định nghĩa thêm.`,
      `The v4.8.1 glossary emphasizes "delivery of virtual services deployed, accessed and managed remotely", while the v4.0.1 syllabus only mentions service virtualization as a test environment item without defining it.`,
      `v4.8.1 术语表强调"交付远程部署、访问和管理的虚拟服务"，而 v4.0.1 大纲仅将其作为测试环境项提及，未作进一步定义。`,
    ),
  },

  'shift-left': {
    explanation: l(
      `Dịch trái (shift left) là cách tiếp cận đưa hoạt động kiểm thử và đảm bảo chất lượng lên càng sớm càng tốt trong vòng đời phát triển (SDLC); syllabus gọi đây là nguyên tắc kiểm thử sớm (early testing). Các cách làm: review đặc tả dưới góc nhìn tester, viết test case trước khi viết code, CI/CD với test tự động, static analysis trước dynamic testing, kiểm thử phi chức năng từ mức component. Shift left không có nghĩa là bỏ qua kiểm thử ở giai đoạn sau, và cần stakeholder đồng thuận.`,
      `Shift left means performing testing and QA activities as early as possible in the SDLC; the syllabus links it to the early testing principle. Practices: reviewing specifications from a tester's perspective, writing test cases before code, CI/CD with automated tests, static analysis before dynamic testing, non-functional testing from component level. It does not mean neglecting later testing, and stakeholders must buy in.`,
      `左移（shift left）是指在软件开发生命周期中尽早开展测试和质量保证活动，大纲将其与"尽早测试"原则联系起来。做法包括：从测试者角度评审规格说明、编码前编写测试用例、带自动化测试的 CI/CD、动态测试前完成静态分析、从组件级开始非功能测试。左移并不意味着忽视后期测试，且需要干系人认同。`,
    ),
    example: l(
      `Trong sprint planning, tester đọc user story và phát hiện tiêu chí chấp nhận mâu thuẫn về giới hạn chuyển tiền — lỗi được sửa trước khi có dòng code nào.`,
      `During sprint planning a tester reads a user story and spots contradictory acceptance criteria on the transfer limit — fixed before any code is written.`,
      `在迭代计划会上，测试人员阅读用户故事时发现关于转账限额的验收准则相互矛盾——在写任何代码之前就得到了修正。`,
    ),
    confusedWith: [
      {
        id: 'shift-right',
        note: l(
          `Shift left = kiểm thử sớm hơn trong SDLC; shift right = tiếp tục kiểm thử/giám sát sau khi phát hành (production). Shift right không thuộc nội dung syllabus CTFL v4.0.1.`,
          `Shift left = testing earlier in the SDLC; shift right = continuing testing/monitoring after release in production. Shift right is not covered by the CTFL v4.0.1 syllabus.`,
          `左移是在生命周期中更早测试；右移（shift right）是在发布后于生产环境继续测试/监控。右移不属于 CTFL v4.0.1 大纲内容。`,
        ),
      },
    ],
  },

  simulator: {
    explanation: l(
      `Bộ mô phỏng (simulator) là thành phần hoặc hệ thống dùng trong kiểm thử, có hành vi giống một thành phần/hệ thống thật (thiết bị, cảm biến, hệ thống bên ngoài) để có thể kiểm thử khi hệ thống thật không có sẵn, nguy hiểm hoặc quá đắt. Syllabus liệt kê simulator là hạng mục môi trường kiểm thử, và nói system testing có thể dùng mô phỏng các hệ thống con.`,
      `A simulator is a component or system used during testing that behaves like a real one (device, sensor, external system), so testing can proceed when the real one is unavailable, dangerous or too expensive. The syllabus lists simulators as test environment items and says system testing may use simulations of subsystems.`,
      `模拟器（simulator）是测试中使用的组件或系统，其行为类似于真实的组件或系统（设备、传感器、外部系统），以便在真实对象不可用、危险或昂贵时仍可测试。大纲将其列为测试环境项，并指出系统测试可以使用子系统的模拟。`,
    ),
    example: l(
      `Kiểm thử phần mềm trạm sạc xe điện bằng simulator giả lập pin xe với các mức sạc và lỗi nhiệt độ, thay vì dùng xe thật.`,
      `Testing EV charging-station software with a simulator that mimics a car battery at different charge levels and temperature faults instead of a real car.`,
      `用模拟不同电量和温度故障的电池模拟器来测试电动车充电桩软件，而不是使用真实车辆。`,
    ),
    confusedWith: [
      {
        id: 'emulator',
        note: l(
          `Simulator mô phỏng hành vi (ở mức logic); emulator tái tạo hệ thống chính xác đến mức có thể chạy cùng chương trình, nhận cùng dữ liệu và cho cùng kết quả (ví dụ Android emulator).`,
          `A simulator mimics behavior; an emulator reproduces a system so faithfully that it accepts the same inputs, runs the same programs and gives the same results (e.g., an Android emulator).`,
          `模拟器模仿行为；仿真器（emulator）高度复现原系统，可接受相同输入、运行相同程序并得到相同结果（如 Android 仿真器）。`,
        ),
      },
      {
        id: 'stub',
        note: l(
          `Stub là test double đơn giản trả về phản hồi định sẵn cho một lời gọi; simulator mô phỏng hành vi phong phú hơn của cả một thiết bị/hệ thống.`,
          `A stub is a simple test double returning predefined responses; a simulator reproduces the richer behavior of a whole device or system.`,
          `桩是返回预设响应的简单测试替身；模拟器则模拟整个设备或系统更丰富的行为。`,
        ),
      },
    ],
  },

  'software-development-lifecycle': {
    explanation: l(
      `Vòng đời phát triển phần mềm (software development lifecycle, SDLC) là các hoạt động trong từng giai đoạn phát triển và quan hệ logic, thời gian giữa chúng. Syllabus phân biệt mô hình SDLC (SDLC model) như tuần tự (waterfall, V-model), lặp (spiral, prototyping), tăng dần (Unified Process). Việc chọn SDLC ảnh hưởng tới phạm vi, thời điểm kiểm thử, mức chi tiết tài liệu, kỹ thuật kiểm thử, mức tự động hóa và vai trò tester.`,
      `The software development lifecycle (SDLC) is the set of activities in each development phase and how they relate logically and chronologically. The syllabus describes SDLC models: sequential (waterfall, V-model), iterative (spiral, prototyping), incremental (Unified Process). The chosen SDLC affects the scope and timing of testing, documentation detail, test techniques, automation extent and the tester's role.`,
      `软件开发生命周期（software development lifecycle，SDLC）是每个开发阶段所执行的活动及其在逻辑和时间上的相互关系。大纲介绍了 SDLC 模型：顺序型（瀑布、V 模型）、迭代型（螺旋、原型）、增量型（统一过程）。所选 SDLC 会影响测试范围和时机、文档详细程度、测试技术、自动化程度以及测试人员角色。`,
    ),
    example: l(
      `Dự án ngân hàng theo V-model: tester tham gia review yêu cầu từ đầu, nhưng chỉ chạy test động khi có bản build ở giai đoạn sau. Dự án startup theo Scrum: mỗi sprint đều có test tĩnh và động.`,
      `A bank project on the V-model: testers review requirements early but run dynamic tests only once builds arrive later. A Scrum startup: every sprint has both static and dynamic testing.`,
      `采用 V 模型的银行项目：测试人员早期参与需求评审，但要到后期有构建版本时才执行动态测试；采用 Scrum 的创业项目：每个迭代都有静态和动态测试。`,
    ),
    confusedWith: [
      {
        id: 'software-lifecycle',
        note: l(
          `SDLC chỉ bao phần phát triển; software lifecycle bao trọn đời sản phẩm từ ý tưởng đến vận hành, bảo trì và ngừng sử dụng.`,
          `The SDLC covers development; the software lifecycle covers the product's whole life from concept through operation and maintenance to retirement.`,
          `SDLC 只涵盖开发；软件生命周期（software lifecycle）涵盖产品从构想到运行、维护直至退役的整个生命。`,
        ),
      },
    ],
    versionNote: l(
      `Glossary v4.8.1 ghi "lifecycle model" là từ đồng nghĩa của SDLC, trong khi syllabus v4.0.1 phân biệt SDLC với "SDLC model" (biểu diễn trừu tượng, cấp cao của quy trình phát triển).`,
      `The v4.8.1 glossary lists "lifecycle model" as a synonym of SDLC, whereas the v4.0.1 syllabus distinguishes the SDLC from an "SDLC model" (an abstract, high-level representation of the development process).`,
      `v4.8.1 术语表将"lifecycle model（生命周期模型）"列为 SDLC 的同义词，而 v4.0.1 大纲区分了 SDLC 与"SDLC 模型"（开发过程的抽象高层表示）。`,
    ),
  },

  'static-analysis': {
    explanation: l(
      `Phân tích tĩnh (static analysis) là việc dùng công cụ tự động đánh giá code hoặc sản phẩm công việc mà không chạy nó. Đây là một dạng của kiểm thử tĩnh (static testing), bên cạnh review (làm thủ công). Theo syllabus, static analysis phát hiện vấn đề trước dynamic testing với ít công sức hơn (không cần test case), thường tích hợp vào CI, dùng để tìm lỗi code cụ thể và đánh giá maintainability, security; trình kiểm tra chính tả cũng là công cụ static analysis.`,
      `Static analysis is the tool-based, automated evaluation of code or other work products without executing them. It is one form of static testing, next to (manual) reviews. Per the syllabus it finds problems before dynamic testing with less effort (no test cases needed), is often part of CI, detects specific code defects and evaluates maintainability and security; spelling checkers are static analysis tools too.`,
      `静态分析（static analysis）是借助工具、在不执行的情况下自动评估代码或其他工作产品的过程，是静态测试的一种形式（另一种是人工评审）。按大纲所述，它能以较少投入在动态测试之前发现问题（无需测试用例），常集成到 CI 中，用于发现特定代码缺陷并评估可维护性和信息安全性；拼写检查器也属于静态分析工具。`,
    ),
    example: l(
      `Mỗi pull request chạy SonarQube trong pipeline CI: báo biến chưa khởi tạo, code trùng lặp, độ phức tạp cyclomatic quá cao trước khi merge.`,
      `Every pull request runs SonarQube in the CI pipeline, flagging uninitialized variables, duplicated code and excessive cyclomatic complexity before merge.`,
      `每个合并请求都在 CI 流水线中运行 SonarQube，在合并前报告未初始化变量、重复代码和过高的圈复杂度。`,
    ),
    confusedWith: [
      {
        id: 'static-testing',
        note: l(
          `Static testing là khái niệm bao trùm (không chạy phần mềm) gồm review và static analysis; static analysis chỉ là phần dùng công cụ tự động.`,
          `Static testing is the umbrella (no execution) covering reviews and static analysis; static analysis is only the automated, tool-based part.`,
          `静态测试是总称（不执行软件），包括评审和静态分析；静态分析只是其中借助工具自动完成的部分。`,
        ),
      },
      {
        id: 'review',
        note: l(
          `Review do con người đọc và đánh giá sản phẩm; static analysis do công cụ thực hiện. Cả hai đều là static testing.`,
          `A review is people examining a work product; static analysis is done by tools. Both are static testing.`,
          `评审由人来检查工作产品；静态分析由工具完成。二者都属于静态测试。`,
        ),
      },
      {
        id: 'dynamic-analysis',
        note: l(
          `Dynamic analysis đánh giá hệ thống khi đang chạy (ví dụ phát hiện rò rỉ bộ nhớ); static analysis không chạy code.`,
          `Dynamic analysis evaluates the system while it runs (e.g., detecting memory leaks); static analysis does not execute code.`,
          `动态分析在系统运行时进行评估（如检测内存泄漏）；静态分析不执行代码。`,
        ),
      },
    ],
  },

  'static-testing': {
    explanation: l(
      `Kiểm thử tĩnh (static testing) là cách tiếp cận kiểm thử không thực thi đối tượng kiểm thử. Nó gồm review (đánh giá thủ công) và static analysis (dùng công cụ), áp dụng được cho cả sản phẩm không thực thi được như yêu cầu, user story, thiết kế, kế hoạch kiểm thử. Static testing tìm trực tiếp defect (không cần qua failure), dùng được cho cả verification và validation, và bổ sung chứ không thay thế dynamic testing.`,
      `Static testing is a test approach that does not execute the test item. It comprises reviews (manual) and static analysis (tool-based) and can be applied to non-executable work products such as requirements, user stories, designs and test plans. It finds defects directly (not via failures), supports both verification and validation, and complements rather than replaces dynamic testing.`,
      `静态测试（static testing）是不执行测试项的测试方法，包括评审（人工）和静态分析（工具），可用于需求、用户故事、设计、测试计划等不可执行的工作产品。它直接发现缺陷（而非通过失效），可用于验证和确认，是对动态测试的补充而非替代。`,
    ),
    example: l(
      `Trước khi dev bắt đầu, nhóm review đặc tả API và phát hiện thiếu mã lỗi cho trường hợp "tài khoản bị khóa" — một defect tìm được mà không cần chạy phần mềm.`,
      `Before development starts, the team reviews the API spec and finds no error code for "account locked" — a defect found without running anything.`,
      `开发开始前，团队评审 API 规格说明，发现缺少"账户被锁定"的错误码——这是无需运行软件就发现的缺陷。`,
    ),
    confusedWith: [
      {
        id: 'dynamic-testing',
        note: l(
          `Dynamic testing chạy phần mềm và gây ra failure để từ đó tìm defect; static testing không chạy phần mềm và tìm defect trực tiếp. Dynamic testing đo được đặc tính phụ thuộc thực thi (performance), static testing đo được đặc tính không phụ thuộc thực thi (maintainability).`,
          `Dynamic testing executes the software and causes failures from which defects are found; static testing does not execute and finds defects directly. Dynamic testing measures execution-dependent characteristics (performance); static testing measures ones that are not (maintainability).`,
          `动态测试执行软件、引发失效后再分析找出缺陷；静态测试不执行软件、直接发现缺陷。动态测试可度量依赖执行的特性（性能），静态测试可度量不依赖执行的特性（可维护性）。`,
        ),
      },
      {
        id: 'static-analysis',
        note: l(
          `Static analysis chỉ là một phần của static testing (phần dùng công cụ); review là phần còn lại.`,
          `Static analysis is just one part of static testing (the tool-based part); reviews are the other part.`,
          `静态分析只是静态测试中借助工具的部分，评审是另一部分。`,
        ),
      },
      {
        id: 'review',
        note: l(
          `Review là một hình thức của static testing do con người thực hiện; static testing rộng hơn, gồm cả static analysis.`,
          `A review is one form of static testing performed by people; static testing is broader and includes static analysis.`,
          `评审是由人执行的一种静态测试形式；静态测试范围更广，还包括静态分析。`,
        ),
      },
    ],
  },

  stub: {
    explanation: l(
      `Stub là một loại test double cung cấp phản hồi định sẵn, thay thế cho thành phần mà đối tượng kiểm thử gọi tới nhưng chưa có hoặc không muốn dùng thật. Syllabus liệt kê stub là hạng mục môi trường kiểm thử được tạo trong test implementation; stub thường dùng trong kiểm thử thành phần (component testing) để cô lập thành phần.`,
      `A stub is a type of test double that provides predefined responses, replacing a component called by the test object that is not yet available or should not be used for real. The syllabus lists stubs as test environment items created in test implementation; they are typically used in component testing to isolate the component.`,
      `桩（stub）是一种提供预设响应的测试替身，用于替代被测对象所调用、但尚不可用或不宜真实调用的组件。大纲将桩列为测试实现阶段产生的测试环境项，常用于组件测试以隔离被测组件。`,
    ),
    example: l(
      `Kiểm thử module tính phí ship: thay module tra cứu khoảng cách (gọi Google Maps) bằng stub luôn trả về 12 km để kết quả tính phí có thể dự đoán được.`,
      `Testing a shipping-fee module: replace the distance lookup (which calls Google Maps) with a stub that always returns 12 km so the fee result is predictable.`,
      `测试运费计算模块时，用始终返回 12 公里的桩替代调用 Google 地图的距离查询模块，使计算结果可预测。`,
    ),
    confusedWith: [
      {
        id: 'driver',
        note: l(
          `Stub được đối tượng kiểm thử GỌI TỚI (thay thành phần bên dưới); driver GỌI đối tượng kiểm thử (thay thành phần bên trên).`,
          `A stub is CALLED BY the test object (replaces a lower component); a driver CALLS the test object (replaces a higher component).`,
          `桩被被测对象调用（替代下层组件）；驱动（driver）调用被测对象（替代上层组件）。`,
        ),
      },
      {
        id: 'mock',
        note: l(
          `Stub chỉ trả về phản hồi định sẵn; mock còn ghi nhận và kiểm tra (verify) các lời gọi nó nhận được.`,
          `A stub only returns predefined responses; a mock also records and verifies the calls it receives.`,
          `桩只返回预设响应；模拟对象（mock）还会记录并校验其收到的调用。`,
        ),
      },
    ],
  },

  'system-integration-testing': {
    explanation: l(
      `Kiểm thử tích hợp hệ thống (system integration testing) là mức kiểm thử tập trung vào tích hợp giữa các hệ thống: giao diện của hệ thống đang kiểm thử với các hệ thống khác và dịch vụ bên ngoài. Theo syllabus, mức này cần môi trường kiểm thử phù hợp, tốt nhất là giống môi trường vận hành.`,
      `System integration testing is a test level focusing on the integration of systems: the interfaces between the system under test and other systems and external services. Per the syllabus it requires suitable test environments, preferably similar to the operational environment.`,
      `系统集成测试（system integration testing）是关注系统之间集成的测试级别：被测系统与其他系统及外部服务之间的接口。按大纲所述，它需要合适的测试环境，最好接近运行环境。`,
    ),
    example: l(
      `Kiểm thử hệ thống bán hàng gửi đơn sang hệ thống ERP và cổng thanh toán VNPay: đơn có tạo đúng trong ERP không, callback thanh toán có cập nhật trạng thái đơn không.`,
      `Testing that the sales system sends orders to the ERP and the payment gateway: are orders created correctly in the ERP, does the payment callback update order status?`,
      `测试销售系统向 ERP 和支付网关发送订单：ERP 中订单是否正确创建，支付回调是否更新订单状态。`,
    ),
    confusedWith: [
      {
        id: 'component-integration-testing',
        note: l(
          `Component integration testing kiểm thử giao diện giữa các thành phần BÊN TRONG một hệ thống; system integration testing kiểm thử giao diện GIỮA các hệ thống/dịch vụ bên ngoài.`,
          `Component integration testing tests interfaces between components INSIDE one system; system integration testing tests interfaces BETWEEN systems and external services.`,
          `组件集成测试测试同一系统内部组件之间的接口；系统集成测试测试系统与其他系统/外部服务之间的接口。`,
        ),
      },
      {
        id: 'system-testing',
        note: l(
          `System testing đánh giá hành vi và khả năng của toàn bộ một hệ thống; system integration testing tập trung vào điểm nối giữa hệ thống đó với hệ thống khác.`,
          `System testing evaluates the behavior and capabilities of one whole system; system integration testing focuses on the connections between that system and others.`,
          `系统测试评估单个完整系统的行为与能力；系统集成测试关注该系统与其他系统之间的连接。`,
        ),
      },
    ],
  },

  'system-testing': {
    explanation: l(
      `Kiểm thử hệ thống (system testing) là mức kiểm thử xác minh toàn bộ hệ thống đáp ứng yêu cầu đã đặc tả. Syllabus mô tả mức này tập trung vào hành vi và khả năng tổng thể của cả hệ thống/sản phẩm, thường gồm kiểm thử chức năng các tác vụ end-to-end và kiểm thử phi chức năng (ví dụ usability nên test trên hệ thống hoàn chỉnh trong môi trường đại diện). Có thể do nhóm kiểm thử độc lập thực hiện, dựa trên đặc tả hệ thống.`,
      `System testing is a test level verifying that the system as a whole meets specified requirements. The syllabus describes it as focusing on the overall behavior and capabilities of the entire system, often including functional testing of end-to-end tasks and non-functional testing (e.g., usability is best tested on a complete system in a representative environment). It may be done by an independent test team and relates to system specifications.`,
      `系统测试（system testing）是验证整个系统是否满足规定需求的测试级别。大纲描述其关注整个系统或产品的整体行为和能力，通常包括端到端任务的功能测试和质量特性的非功能测试（如易用性最好在代表性环境中的完整系统上测试）。可由独立测试团队执行，以系统规格说明为依据。`,
    ),
    example: l(
      `Trên môi trường staging, nhóm QA kiểm thử toàn bộ luồng đặt vé máy bay: tìm chuyến, chọn ghế, thanh toán, nhận email — và đo thời gian phản hồi khi 200 người dùng cùng truy cập.`,
      `On staging, QA tests the full flight-booking flow — search, seat selection, payment, confirmation email — and measures response time with 200 concurrent users.`,
      `QA 在预发布环境中测试完整的机票预订流程——查询航班、选座、支付、收到邮件——并测量 200 个并发用户时的响应时间。`,
    ),
    confusedWith: [
      {
        id: 'component-testing',
        note: l(
          `Component testing kiểm thử từng thành phần riêng lẻ (thường do dev làm); system testing kiểm thử cả hệ thống đã tích hợp.`,
          `Component testing tests individual components in isolation (usually by developers); system testing tests the whole integrated system.`,
          `组件测试单独测试各个组件（通常由开发人员执行）；系统测试测试已集成的整个系统。`,
        ),
      },
      {
        id: 'acceptance-testing',
        note: l(
          `System testing chủ yếu xác minh (verification) theo đặc tả; acceptance testing tập trung xác nhận (validation) nhu cầu nghiệp vụ và sẵn sàng triển khai, lý tưởng do người dùng thực hiện.`,
          `System testing mainly verifies against specifications; acceptance testing focuses on validation of business needs and deployment readiness, ideally performed by intended users.`,
          `系统测试主要依据规格说明进行验证；验收测试侧重确认业务需求并证明可部署，理想情况下由预期用户执行。`,
        ),
      },
      {
        id: 'system-integration-testing',
        note: l(
          `System integration testing tập trung vào giao diện với hệ thống khác; system testing nhìn vào một hệ thống như một tổng thể.`,
          `System integration testing focuses on interfaces with other systems; system testing looks at one system as a whole.`,
          `系统集成测试关注与其他系统的接口；系统测试把单个系统作为整体来看。`,
        ),
      },
    ],
  },

  'test-analysis': {
    explanation: l(
      `Phân tích kiểm thử (test analysis) là hoạt động phân tích cơ sở kiểm thử (test basis) để xác định các điều kiện kiểm thử (test condition). Theo syllabus, test analysis xác định tính năng có thể kiểm thử, định nghĩa và ưu tiên test condition theo rủi ro, đồng thời đánh giá test basis và test object để tìm defect và đánh giá testability. Nó trả lời câu hỏi "test cái gì?".`,
      `Test analysis is the activity of analyzing the test basis to identify test conditions. Per the syllabus it identifies testable features, defines and prioritizes test conditions considering risks, and evaluates the test basis and test object for defects and testability. It answers "what to test?".`,
      `测试分析（test analysis）是通过分析测试依据来识别测试条件的活动。按大纲所述，它识别可测试的特性，结合风险定义并排序测试条件，同时评估测试依据和测试对象中的缺陷及可测试性。它回答"测什么？"。`,
    ),
    example: l(
      `Từ user story "đặt lại mật khẩu", tester liệt kê test condition: link hết hạn sau 15 phút, mật khẩu mới phải khác 3 mật khẩu gần nhất, email không tồn tại… và hỏi lại PO vì story không nói gì về giới hạn số lần gửi.`,
      `From the "reset password" story, the tester lists test conditions — link expires after 15 minutes, new password differs from the last 3, unknown email… — and asks the PO because the story says nothing about a resend limit.`,
      `测试人员从"重置密码"用户故事中列出测试条件：链接 15 分钟后失效、新密码不得与最近 3 个相同、邮箱不存在……并因故事未提及重发次数限制而向产品负责人确认。`,
    ),
    confusedWith: [
      {
        id: 'test-design',
        note: l(
          `Test analysis trả lời "test cái gì?" (ra test condition); test design trả lời "test như thế nào?" (biến test condition thành test case).`,
          `Test analysis answers "what to test?" (produces test conditions); test design answers "how to test?" (turns test conditions into test cases).`,
          `测试分析回答"测什么？"（产出测试条件）；测试设计回答"怎么测？"（将测试条件细化为测试用例）。`,
        ),
      },
    ],
  },

  'test-automation': {
    explanation: l(
      `Tự động hóa kiểm thử (test automation) là chuyển các hoạt động kiểm thử sang thực hiện tự động bằng công cụ. Syllabus nêu lợi ích (giảm việc lặp lại như chạy regression test, nhất quán hơn, đánh giá khách quan hơn như coverage, phản hồi nhanh hơn, tester có thời gian thiết kế test sâu hơn) và rủi ro (kỳ vọng không thực tế, ước lượng sai chi phí bảo trì script, dùng tool khi test thủ công phù hợp hơn, phụ thuộc vào nhà cung cấp…). Agile và DevOps ưa chuộng tự động hóa để hỗ trợ regression testing, nhưng vẫn cần test thủ công.`,
      `Test automation is converting test activities to automated operation using tools. The syllabus lists benefits (less repetitive work such as regression runs, more consistency, objective measures like coverage, faster feedback, more time for deeper tests) and risks (unrealistic expectations, underestimated script maintenance, using a tool where manual testing fits better, vendor dependency…). Agile and DevOps favor automation to support regression testing, yet manual testing is still needed.`,
      `测试自动化（test automation）是借助工具将测试活动转为自动执行。大纲列出了收益（减少重复工作如回归测试、更一致、更客观的度量如覆盖率、更快反馈、测试人员有更多时间设计更深入的测试）和风险（不切实际的期望、低估脚本维护成本、在更适合手工测试的场合使用工具、依赖供应商等）。敏捷和 DevOps 倾向于自动化以支持回归测试，但仍需要手工测试。`,
    ),
    example: l(
      `Bộ 300 test Playwright cho luồng thanh toán chạy mỗi đêm trong pipeline, giảm regression test thủ công từ 2 ngày xuống 40 phút; nhóm vẫn dành thời gian cho exploratory testing giao diện mới.`,
      `A 300-test Playwright suite for checkout runs nightly in the pipeline, cutting manual regression from 2 days to 40 minutes; the team still spends time on exploratory testing of the new UI.`,
      `针对结账流程的 300 个 Playwright 测试每晚在流水线中运行，使手工回归测试从 2 天缩短到 40 分钟；团队仍然花时间对新界面进行探索性测试。`,
    ),
    confusedWith: [
      {
        id: 'test-automation-framework',
        note: l(
          `Test automation là hoạt động/cách tiếp cận nói chung; test automation framework là bộ công cụ, thư viện và quy ước cụ thể để xây dựng test tự động.`,
          `Test automation is the general practice; a test automation framework is the specific set of tools, libraries and conventions used to build automated tests.`,
          `测试自动化是总体做法；测试自动化框架是用于构建自动化测试的具体工具、库和约定。`,
        ),
      },
    ],
    versionNote: l(
      `Glossary v4.8.1 định nghĩa hẹp: "chuyển hoạt động kiểm thử sang vận hành tự động". Syllabus v4.0.1 (mục 6.1, 6.2) nói rộng hơn về hỗ trợ của công cụ cho nhiều hoạt động kiểm thử (quản lý, thiết kế, thực thi, coverage…) cùng lợi ích và rủi ro.`,
      `The v4.8.1 glossary defines it narrowly as "conversion of test activities to automated operation". The v4.0.1 syllabus (6.1, 6.2) speaks more broadly about tool support across many test activities (management, design, execution, coverage…) and its benefits and risks.`,
      `v4.8.1 术语表的定义较窄："将测试活动转为自动化运行"。v4.0.1 大纲（6.1、6.2）则更宽泛地讨论工具对多种测试活动（管理、设计、执行、覆盖等）的支持及其收益与风险。`,
    ),
  },

  'test-basis': {
    explanation: l(
      `Cơ sở kiểm thử (test basis) là toàn bộ kiến thức/tài liệu dùng làm nền tảng cho test analysis và test design: yêu cầu, user story, tiêu chí chấp nhận, thiết kế, code, quy định pháp lý… Syllabus nói test basis là một thuộc tính phân biệt các mức kiểm thử, và cần duy trì truy vết (traceability) giữa test basis với test condition, test case, kết quả và defect.`,
      `The test basis is the body of knowledge used for test analysis and test design: requirements, user stories, acceptance criteria, designs, code, regulations… The syllabus names it as one attribute distinguishing test levels and stresses traceability from the test basis to test conditions, test cases, results and defects.`,
      `测试依据（test basis）是测试分析和测试设计所依据的知识体系：需求、用户故事、验收准则、设计、代码、法规等。大纲将其列为区分测试级别的属性之一，并强调要在测试依据与测试条件、测试用例、测试结果和缺陷之间建立可追溯性。`,
    ),
    example: l(
      `Với mức system testing của app bảo hiểm, test basis gồm tài liệu đặc tả chức năng (SRS), quy tắc tính phí bảo hiểm và thông tư của Bộ Tài chính.`,
      `For system testing of an insurance app, the test basis includes the functional specification (SRS), premium calculation rules and the relevant government regulation.`,
      `对保险应用的系统测试而言，测试依据包括功能规格说明（SRS）、保费计算规则和相关监管规定。`,
    ),
    confusedWith: [
      {
        id: 'test-object',
        note: l(
          `Test basis là cái dùng để suy ra test (tài liệu, yêu cầu); test object là cái được kiểm thử (phần mềm, sản phẩm công việc). Khi review một đặc tả, đặc tả đó là test object.`,
          `The test basis is what tests are derived from (documents, requirements); the test object is what is tested. When reviewing a specification, that specification is the test object.`,
          `测试依据是推导测试的来源（文档、需求）；测试对象是被测试的东西。评审规格说明时，该规格说明就是测试对象。`,
        ),
      },
      {
        id: 'test-oracle',
        note: l(
          `Test basis dùng để xác định test cần làm gì; test oracle là nguồn để xác định kết quả mong đợi. Một tài liệu có thể đóng cả hai vai trò.`,
          `The test basis determines what to test; a test oracle is the source for determining expected results. One document can play both roles.`,
          `测试依据决定测什么；测试预言（test oracle）是确定预期结果的来源。同一文档可同时扮演两种角色。`,
        ),
      },
    ],
  },

  'test-case': {
    explanation: l(
      `Ca kiểm thử (test case) là tập hợp điều kiện tiên quyết (precondition), đầu vào, hành động (nếu có), kết quả mong đợi (expected result) và điều kiện sau (postcondition), được xây dựng từ test condition. Test case được tạo trong test design (thường bằng kỹ thuật kiểm thử như EP, BVA), sau đó được tổ chức thành test procedure và test suite trong test implementation.`,
      `A test case is a set of preconditions, inputs, actions (where applicable), expected results and postconditions, developed from test conditions. Test cases are created in test design (often with test techniques such as EP or BVA) and then organized into test procedures and test suites in test implementation.`,
      `测试用例（test case）是根据测试条件开发的一组前置条件、输入、动作（如适用）、预期结果和后置条件。测试用例在测试设计中创建（常使用等价类划分、边界值分析等测试技术），并在测试实现中被组织为测试规程和测试套件。`,
    ),
    example: l(
      `TC-017: Tiền điều kiện: tài khoản có 1.000.000đ. Đầu vào: chuyển 1.000.001đ. Kết quả mong đợi: báo "Số dư không đủ", số dư không đổi. Hậu điều kiện: không có giao dịch nào được ghi.`,
      `TC-017: Precondition: account balance 1,000,000. Input: transfer 1,000,001. Expected: "Insufficient balance" message, balance unchanged. Postcondition: no transaction recorded.`,
      `TC-017：前置条件：账户余额 1,000,000。输入：转账 1,000,001。预期结果：提示"余额不足"，余额不变。后置条件：无交易记录。`,
    ),
    confusedWith: [
      {
        id: 'test-condition',
        note: l(
          `Test condition là khía cạnh cần test ("chuyển tiền vượt số dư"); test case là cách test cụ thể với dữ liệu và kết quả mong đợi. Một test condition có thể sinh nhiều test case.`,
          `A test condition is the aspect to test ("transfer exceeding balance"); a test case is a concrete way to test it with data and expected results. One condition can yield many test cases.`,
          `测试条件是要测试的方面（"转账超过余额"）；测试用例是带具体数据和预期结果的测试方式。一个测试条件可产生多个测试用例。`,
        ),
      },
      {
        id: 'test-procedure',
        note: l(
          `Test procedure là chuỗi các test case theo thứ tự thực thi kèm các bước chuẩn bị và dọn dẹp; test case là một đơn vị riêng lẻ.`,
          `A test procedure is a sequence of test cases in execution order with setup and wrap-up actions; a test case is a single unit.`,
          `测试规程是按执行顺序排列的一系列测试用例及其准备和收尾动作；测试用例是单个单元。`,
        ),
      },
      {
        id: 'test-script',
        note: l(
          `Test script là chuỗi chỉ dẫn để thực thi test (thủ công hoặc tự động, thường là code); test case mô tả cái cần kiểm tra (đầu vào, kết quả mong đợi).`,
          `A test script is the sequence of instructions to execute a test (manual or automated, often code); a test case describes what is checked (inputs, expected results).`,
          `测试脚本是执行测试的一系列指令（手工或自动，常为代码）；测试用例描述检查内容（输入、预期结果）。`,
        ),
      },
    ],
  },

  'test-charter': {
    explanation: l(
      `Điều lệ kiểm thử (test charter) là tuyên bố nhiệm vụ định hướng một phiên kiểm thử thăm dò (exploratory testing). Theo syllabus, test charter là sản phẩm của test design; trong session-based testing, tester dùng charter chứa mục tiêu kiểm thử để dẫn hướng phiên làm việc trong một khung thời gian cố định.`,
      `A test charter is a mission statement guiding an exploratory test session. Per the syllabus, test charters are test design work products; in session-based testing the tester uses a charter containing test objectives to guide a time-boxed session.`,
      `测试章程（test charter）是指导一次探索性测试会话的使命陈述。按大纲所述，测试章程是测试设计的工作产品；在基于会话的测试中，测试人员使用包含测试目标的章程来指导限时会话。`,
    ),
    example: l(
      `"Khám phá chức năng tải ảnh đại diện với các định dạng file và kích thước khác nhau để tìm lỗi xử lý file, trong 60 phút."`,
      `"Explore avatar upload with various file formats and sizes to discover file-handling problems — 60 minutes."`,
      `"在 60 分钟内，使用各种文件格式和大小探索头像上传功能，以发现文件处理问题。"`,
    ),
    confusedWith: [
      {
        id: 'test-case',
        note: l(
          `Test case quy định cụ thể đầu vào và kết quả mong đợi; test charter chỉ nêu mục tiêu và phạm vi, còn các bước cụ thể do tester tự quyết định khi thăm dò.`,
          `A test case specifies exact inputs and expected results; a charter states only the mission and scope, leaving the concrete steps to the tester while exploring.`,
          `测试用例规定具体输入和预期结果；测试章程只说明使命和范围，具体步骤由测试人员在探索时自行决定。`,
        ),
      },
      {
        id: 'test-plan',
        note: l(
          `Test plan bao toàn bộ dự án/mức kiểm thử; test charter chỉ cho một phiên exploratory testing.`,
          `A test plan covers a whole project or test level; a test charter covers a single exploratory session.`,
          `测试计划覆盖整个项目或测试级别；测试章程只针对一次探索性测试会话。`,
        ),
      },
    ],
  },

  'test-completion': {
    explanation: l(
      `Hoàn thành kiểm thử (test completion) là hoạt động diễn ra ở các mốc dự án (phát hành, cuối iteration, hoàn tất một mức kiểm thử). Theo syllabus: tạo change request/backlog item cho defect chưa xử lý, lưu trữ hoặc bàn giao testware hữu ích, đưa môi trường kiểm thử về trạng thái đã thống nhất, rút ra bài học kinh nghiệm, và lập test completion report gửi stakeholder.`,
      `Test completion is the activity performed at project milestones (release, end of iteration, test level completion). Per the syllabus: create change requests or backlog items for unresolved defects, archive or hand over useful testware, shut the test environment down to an agreed state, identify lessons learned, and produce and communicate the test completion report.`,
      `测试完成（test completion）是在项目里程碑（发布、迭代结束、测试级别完成）时进行的活动。按大纲所述：为未解决的缺陷创建变更请求或待办项，归档或移交有用的测试件，将测试环境恢复到约定状态，总结经验教训，并编写和发布测试完成报告。`,
    ),
    example: l(
      `Cuối release 3.2: nhóm QA chuyển 4 bug mức thấp vào backlog, lưu bộ test regression lên Git, xóa dữ liệu khách hàng giả trên UAT, tổ chức retrospective và gửi báo cáo tổng kết cho PM.`,
      `End of release 3.2: QA moves 4 low-severity bugs to the backlog, commits the regression suite to Git, wipes fake customer data from UAT, runs a retrospective and sends the completion report to the PM.`,
      `3.2 版本结束时：QA 将 4 个低严重度缺陷移入待办列表，把回归测试集提交到 Git，清除 UAT 环境中的虚拟客户数据，召开回顾会并将完成报告发送给项目经理。`,
    ),
    confusedWith: [
      {
        id: 'test-completion-report',
        note: l(
          `Test completion là hoạt động; test completion report là một sản phẩm của hoạt động đó.`,
          `Test completion is the activity; the test completion report is one of its work products.`,
          `测试完成是活动；测试完成报告是该活动的工作产品之一。`,
        ),
      },
    ],
  },

  'test-completion-report': {
    explanation: l(
      `Báo cáo hoàn thành kiểm thử (test completion report, trước đây gọi là test summary report) được lập khi kết thúc một dự án, mức kiểm thử hoặc loại kiểm thử, lý tưởng là khi đã đạt exit criteria. Theo syllabus, báo cáo gồm: tóm tắt, đánh giá chất lượng kiểm thử và sản phẩm so với kế hoạch ban đầu (mục tiêu, exit criteria), sai lệch so với kế hoạch, trở ngại, metric, rủi ro chưa xử lý và defect chưa sửa, bài học kinh nghiệm. Thường theo mẫu và chỉ lập một lần.`,
      `A test completion report (formerly test summary report) is produced when a project, test level or test type is complete, ideally once exit criteria are met. Per the syllabus it contains: test summary, evaluation of testing and product quality against the original plan (objectives, exit criteria), deviations from the plan, impediments, metrics, unmitigated risks and unfixed defects, lessons learned. It usually follows a template and is produced once.`,
      `测试完成报告（test completion report，旧称测试总结报告）在项目、测试级别或测试类型完成时编写，理想情况下此时已满足退出准则。按大纲所述，内容包括：测试总结、依据原测试计划（目标、退出准则）对测试和产品质量的评估、与计划的偏差、障碍、度量、未缓解的风险和未修复的缺陷、经验教训。通常遵循模板且只编写一次。`,
    ),
    example: l(
      `Báo cáo cuối UAT: 412/420 test case đạt, 2 defect mức trung bình còn mở (đã có workaround), mục tiêu 100% yêu cầu ưu tiên cao được bao phủ đã đạt, trễ 3 ngày do môi trường — đề xuất phát hành.`,
      `End-of-UAT report: 412/420 test cases passed, 2 medium defects open with workarounds, 100% of high-priority requirements covered as targeted, 3 days late due to the environment — release recommended.`,
      `UAT 结束报告：420 个测试用例通过 412 个，2 个中等缺陷仍未关闭（已有规避方案），已按目标覆盖 100% 高优先级需求，因环境问题延期 3 天——建议发布。`,
    ),
    confusedWith: [
      {
        id: 'test-progress-report',
        note: l(
          `Test progress report lập định kỳ (hằng ngày/tuần) trong khi đang kiểm thử để hỗ trợ test control; test completion report lập một lần khi kết thúc để tổng kết.`,
          `A test progress report is produced periodically during testing to support test control; a test completion report is produced once at the end to summarize.`,
          `测试进度报告在测试期间定期编写，以支持测试控制；测试完成报告在结束时编写一次，用于总结。`,
        ),
      },
    ],
  },

  'test-condition': {
    explanation: l(
      `Điều kiện kiểm thử (test condition) là một khía cạnh có thể kiểm thử của thành phần hoặc hệ thống mà ta định kiểm thử (còn gọi test situation, test requirement, test idea). Test condition được xác định và ưu tiên trong test analysis, trả lời "test cái gì?". Syllabus cho biết tiêu chí chấp nhận (acceptance criteria) có thể xem như test condition, và trong session-based testing, mục tiêu kiểm thử có thể được coi là test condition cấp cao.`,
      `A test condition is a testable aspect of a component or system intended to be tested (also called test situation, test requirement, test idea). Test conditions are identified and prioritized in test analysis and answer "what to test?". The syllabus notes that acceptance criteria may be viewed as test conditions, and in session-based testing test objectives may be treated as high-level test conditions.`,
      `测试条件（test condition）是组件或系统中拟被测试的可测试方面（又称测试情境、测试需求、测试想法）。测试条件在测试分析中识别并排序，回答"测什么？"。大纲指出，验收准则可视为测试条件；在基于会话的测试中，测试目标可视为高层测试条件。`,
    ),
    example: l(
      `Cho chức năng giảm giá: "khách VIP được giảm 10%", "mã giảm giá hết hạn bị từ chối", "không cộng dồn hai mã" là ba test condition.`,
      `For a discount feature: "VIP customers get 10% off", "expired coupons are rejected", "two coupons cannot be combined" are three test conditions.`,
      `对于折扣功能，"VIP 客户享受 9 折""过期优惠码被拒绝""两个优惠码不可叠加"是三个测试条件。`,
    ),
    confusedWith: [
      {
        id: 'test-case',
        note: l(
          `Test condition là "cái gì" (trừu tượng); test case là "như thế nào" với đầu vào, kết quả mong đợi cụ thể, được suy ra từ test condition trong test design.`,
          `A test condition is the "what" (abstract); a test case is the "how" with concrete inputs and expected results, derived from the condition in test design.`,
          `测试条件是"测什么"（抽象）；测试用例是"怎么测"，带有具体输入和预期结果，在测试设计中由测试条件推导而来。`,
        ),
      },
      {
        id: 'coverage-item',
        note: l(
          `Coverage item là thực thể/thuộc tính dùng để đo coverage (ví dụ một phân vùng, một giá trị biên), xác định trong test design; test condition rộng hơn, xác định trong test analysis.`,
          `A coverage item is an entity/property used to measure coverage (e.g., a partition, a boundary value), identified in test design; a test condition is broader and identified in test analysis.`,
          `覆盖项是用于度量覆盖率的实体或属性（如一个等价类、一个边界值），在测试设计中识别；测试条件更宽泛，在测试分析中识别。`,
        ),
      },
    ],
  },

  'test-control': {
    explanation: l(
      `Kiểm soát kiểm thử (test control) là hoạt động đưa ra và áp dụng hành động khắc phục để đưa dự án kiểm thử về đúng hướng khi có sai lệch so với kế hoạch. Syllabus nói test control dùng thông tin từ test monitoring, đưa ra các chỉ thị kiểm soát (control directives) như: ưu tiên lại test khi rủi ro thành sự cố, đánh giá lại entry/exit criteria sau khi sửa, điều chỉnh lịch khi môi trường giao trễ, bổ sung nguồn lực.`,
      `Test control is the activity of developing and applying corrective actions to get a test project back on track when it deviates from the plan. The syllabus says it uses information from test monitoring to issue control directives, e.g., reprioritizing tests when a risk becomes an issue, re-evaluating entry/exit criteria after rework, adjusting the schedule when the environment is late, adding resources.`,
      `测试控制（test control）是在测试项目偏离计划时制定并实施纠正措施、使其回到正轨的活动。大纲指出它利用测试监控的信息发布控制指令，例如：风险变为问题时重新排序测试、返工后重新评估入口/退出准则、测试环境延迟交付时调整进度、增加资源。`,
    ),
    example: l(
      `Môi trường UAT giao trễ 1 tuần; test lead quyết định chạy trước các test rủi ro cao trên staging và xin thêm 1 tester trong 5 ngày.`,
      `The UAT environment is a week late; the test lead decides to run high-risk tests first on staging and requests one extra tester for 5 days.`,
      `UAT 环境延迟一周交付；测试负责人决定先在预发布环境中执行高风险测试，并申请增加一名测试人员 5 天。`,
    ),
    confusedWith: [
      {
        id: 'test-monitoring',
        note: l(
          `Test monitoring thu thập thông tin và so sánh tiến độ thực tế với kế hoạch (quan sát); test control hành động dựa trên thông tin đó (điều chỉnh).`,
          `Test monitoring gathers information and compares actual progress with the plan (observe); test control acts on that information (adjust).`,
          `测试监控收集信息并将实际进度与计划比较（观察）；测试控制据此采取行动（调整）。`,
        ),
      },
    ],
  },

  'test-data': {
    explanation: l(
      `Dữ liệu kiểm thử (test data) là dữ liệu cần để thực thi kiểm thử: dữ liệu đầu vào, dữ liệu có sẵn trong database, tài khoản người dùng, file… Theo syllabus, yêu cầu về test data được xác định trong test design, còn test data được tạo hoặc thu thập trong test implementation.`,
      `Test data is the data needed for test execution: input values, pre-existing database records, user accounts, files… Per the syllabus, test data requirements are defined in test design, and test data is created or acquired in test implementation.`,
      `测试数据（test data）是执行测试所需的数据：输入值、数据库中预置的记录、用户账号、文件等。按大纲所述，测试数据需求在测试设计中定义，测试数据在测试实现中创建或获取。`,
    ),
    example: l(
      `Để test chức năng sao kê, QA chuẩn bị 3 tài khoản: một tài khoản không có giao dịch, một có 1 giao dịch, một có 10.000 giao dịch trong tháng — số CMND đã được ẩn danh.`,
      `To test statements, QA prepares 3 accounts: one with no transactions, one with a single transaction, one with 10,000 in a month — with ID numbers anonymized.`,
      `为测试对账单功能，QA 准备了 3 个账户：一个无交易、一个有 1 笔交易、一个当月有 10,000 笔交易——身份证号已匿名化处理。`,
    ),
    confusedWith: [
      {
        id: 'test-case',
        note: l(
          `Test case mô tả đầu vào và kết quả mong đợi; test data là dữ liệu thực tế cần có để chạy test case đó (gồm cả dữ liệu nền trong hệ thống).`,
          `A test case describes inputs and expected results; test data is the actual data needed to run it (including background data in the system).`,
          `测试用例描述输入和预期结果；测试数据是运行该用例所需的实际数据（包括系统中的背景数据）。`,
        ),
      },
    ],
  },

  'test-design': {
    explanation: l(
      `Thiết kế kiểm thử (test design) là hoạt động suy ra và đặc tả test case từ test condition. Theo syllabus, test design còn tạo testware khác như test charter, xác định coverage item, định nghĩa yêu cầu test data, thiết kế môi trường kiểm thử, xác định hạ tầng và công cụ. Kỹ thuật kiểm thử (chương 4) hỗ trợ hoạt động này. Test design trả lời "test như thế nào?".`,
      `Test design is the activity of deriving and specifying test cases from test conditions. Per the syllabus it also produces other testware such as test charters, identifies coverage items, defines test data requirements, designs the test environment and identifies infrastructure and tools. Test techniques (chapter 4) support it. It answers "how to test?".`,
      `测试设计（test design）是从测试条件推导并规定测试用例的活动。按大纲所述，它还产出测试章程等其他测试件，识别覆盖项，定义测试数据需求，设计测试环境并确定基础设施和工具。测试技术（第 4 章）可支持此活动。它回答"怎么测？"。`,
    ),
    example: l(
      `Từ test condition "tuổi hợp lệ 18–60", tester áp dụng BVA hai giá trị để thiết kế test case với tuổi 17, 18, 60, 61 và ghi yêu cầu cần tài khoản có ngày sinh tương ứng.`,
      `From the condition "valid age 18–60", the tester applies 2-value BVA to design test cases with ages 17, 18, 60, 61 and records the need for accounts with matching birth dates.`,
      `测试人员根据测试条件"有效年龄 18–60"，应用两值边界值分析设计年龄为 17、18、60、61 的测试用例，并记录需要相应出生日期账户的数据需求。`,
    ),
    confusedWith: [
      {
        id: 'test-analysis',
        note: l(
          `Test analysis xác định "test cái gì" (test condition); test design xác định "test như thế nào" (test case).`,
          `Test analysis decides "what to test" (test conditions); test design decides "how to test" (test cases).`,
          `测试分析决定"测什么"（测试条件）；测试设计决定"怎么测"（测试用例）。`,
        ),
      },
      {
        id: 'test-implementation',
        note: l(
          `Test design đặc tả test case; test implementation chuẩn bị mọi thứ để chạy: tạo test data, test procedure, script, test suite, lịch thực thi và dựng môi trường.`,
          `Test design specifies test cases; test implementation prepares everything to run them: test data, procedures, scripts, suites, execution schedule and the environment.`,
          `测试设计规定测试用例；测试实现准备运行所需的一切：测试数据、规程、脚本、套件、执行进度表和环境。`,
        ),
      },
    ],
    versionNote: l(
      `Glossary v4.8.1 chỉ nói test design "suy ra và đặc tả test case từ test condition"; syllabus v4.0.1 mô tả rộng hơn, gồm cả test charter, coverage item, yêu cầu test data, thiết kế môi trường, hạ tầng và công cụ.`,
      `The v4.8.1 glossary only says test design "derives and specifies test cases from test conditions"; the v4.0.1 syllabus describes it more broadly, including test charters, coverage items, test data requirements, environment design, infrastructure and tools.`,
      `v4.8.1 术语表仅称测试设计"从测试条件推导并规定测试用例"；v4.0.1 大纲描述更广，包括测试章程、覆盖项、测试数据需求、环境设计、基础设施和工具。`,
    ),
  },

  'test-environment': {
    explanation: l(
      `Môi trường kiểm thử (test environment, còn gọi test bed, test rig) gồm phần cứng, công cụ đo, simulator, công cụ phần mềm và các yếu tố hỗ trợ khác cần để thực hiện kiểm thử. Theo syllabus: test design thiết kế môi trường, test implementation dựng và xác minh môi trường được cài đặt đúng, test completion đưa môi trường về trạng thái đã thống nhất. Các hạng mục môi trường gồm stub, driver, simulator, service virtualization.`,
      `A test environment (also test bed, test rig) contains the hardware, instrumentation, simulators, software tools and other support elements needed to perform a test. Per the syllabus: test design designs it, test implementation builds it and verifies it is set up correctly, and test completion shuts it down to an agreed state. Environment items include stubs, drivers, simulators and service virtualizations.`,
      `测试环境（test environment，又称测试台、测试装置）包含执行测试所需的硬件、仪器、模拟器、软件工具和其他支持要素。按大纲所述：测试设计阶段设计环境，测试实现阶段搭建并验证其设置正确，测试完成阶段将其恢复到约定状态。环境项包括桩、驱动、模拟器和服务虚拟化。`,
    ),
    example: l(
      `Môi trường SIT của ngân hàng: 2 server ứng dụng, database Oracle với dữ liệu đã ẩn danh, stub cho hệ thống core banking và tool giám sát log.`,
      `A bank's SIT environment: 2 application servers, an Oracle database with anonymized data, a stub for the core banking system and a log monitoring tool.`,
      `银行的 SIT 环境：2 台应用服务器、含匿名化数据的 Oracle 数据库、核心银行系统的桩以及日志监控工具。`,
    ),
    confusedWith: [
      {
        id: 'test-harness',
        note: l(
          `Test harness chỉ là tập driver và test double để chạy một test suite (thường ở mức component); test environment rộng hơn, bao gồm phần cứng, mạng, dữ liệu, công cụ.`,
          `A test harness is just the drivers and test doubles needed to run a test suite (often at component level); a test environment is broader, including hardware, network, data and tools.`,
          `测试工具集（test harness）只是运行测试套件所需的驱动和测试替身（常在组件级）；测试环境更广，包括硬件、网络、数据和工具。`,
        ),
      },
    ],
  },

  'test-execution': {
    explanation: l(
      `Thực thi kiểm thử (test execution) là hoạt động chạy test trên thành phần/hệ thống và tạo ra kết quả thực tế. Theo syllabus, test được chạy theo lịch thực thi (test run), thủ công hoặc tự động, có thể dưới dạng continuous testing hay pair testing; kết quả thực tế được so sánh với kết quả mong đợi, kết quả được ghi log, các bất thường (anomaly) được phân tích để báo cáo defect.`,
      `Test execution is the activity that runs a test on a component or system, producing actual results. Per the syllabus, tests are run according to the test execution schedule (test runs), manually or automated, possibly as continuous testing or pair testing; actual results are compared with expected results, results are logged and anomalies are analyzed and reported.`,
      `测试执行（test execution）是在组件或系统上运行测试并产生实际结果的活动。按大纲所述，测试按执行进度表运行（测试运行），可手工或自动，可采用持续测试或结对测试；将实际结果与预期结果比较，记录结果，分析异常并报告。`,
    ),
    example: l(
      `Tester chạy 50 test case của sprint, 3 case fail; với mỗi case fail, tester chụp màn hình, xem log, xác nhận lỗi tái hiện được rồi tạo bug trên Jira.`,
      `A tester runs the sprint's 50 test cases, 3 fail; for each failure the tester takes screenshots, checks the logs, confirms it reproduces and files a Jira bug.`,
      `测试人员执行本迭代的 50 个测试用例，其中 3 个失败；对每个失败用例截图、查看日志、确认可复现后在 Jira 中提交缺陷。`,
    ),
    confusedWith: [
      {
        id: 'test-implementation',
        note: l(
          `Test implementation chuẩn bị (data, script, môi trường, lịch); test execution là thực sự chạy test và so sánh kết quả.`,
          `Test implementation prepares (data, scripts, environment, schedule); test execution actually runs the tests and compares results.`,
          `测试实现负责准备（数据、脚本、环境、进度表）；测试执行是真正运行测试并比较结果。`,
        ),
      },
    ],
  },

  'test-execution-schedule': {
    explanation: l(
      `Lịch thực thi kiểm thử (test execution schedule) là lịch xác định thứ tự chạy các test suite trong một chu kỳ kiểm thử. Theo syllabus, nó được tạo trong test implementation; thứ tự dựa trên ưu tiên (theo rủi ro, coverage hoặc yêu cầu) nhưng phải tính đến phụ thuộc giữa test case và sự sẵn có của tài nguyên (công cụ, môi trường, con người).`,
      `A test execution schedule defines the order in which test suites are run within a test cycle. Per the syllabus it is created in test implementation; the order is based on priority (risk-, coverage- or requirements-based) but must account for dependencies between test cases and availability of resources (tools, environments, people).`,
      `测试执行进度表（test execution schedule）规定了在一个测试周期内运行各测试套件的顺序。按大纲所述，它在测试实现中创建；顺序依据优先级（基于风险、覆盖或需求），但必须考虑测试用例间的依赖以及资源（工具、环境、人员）的可用性。`,
    ),
    example: l(
      `Ngày 1: suite "đăng nhập" (các test khác phụ thuộc vào nó), ngày 2: suite "thanh toán" rủi ro cao, ngày 3 (khi có thiết bị iOS mượn được): suite tương thích di động.`,
      `Day 1: the "login" suite (others depend on it); day 2: the high-risk "payment" suite; day 3 (when borrowed iOS devices arrive): the mobile compatibility suite.`,
      `第 1 天："登录"套件（其他测试依赖它）；第 2 天：高风险的"支付"套件；第 3 天（借到 iOS 设备时）：移动端兼容性套件。`,
    ),
    confusedWith: [
      {
        id: 'test-schedule',
        note: l(
          `Test schedule là lịch của toàn bộ quy trình kiểm thử (hoạt động, mốc, ngày bắt đầu/kết thúc), thuộc test plan; test execution schedule chỉ là thứ tự chạy các test suite trong một chu kỳ.`,
          `A test schedule covers the whole test process (activities, milestones, start/end dates) and is part of the test plan; a test execution schedule is only the running order of test suites within a cycle.`,
          `测试进度（test schedule）涵盖整个测试过程（活动、里程碑、起止日期），属于测试计划；测试执行进度表只是某个周期内测试套件的运行顺序。`,
        ),
      },
    ],
  },

  'test-harness': {
    explanation: l(
      `Khung kiểm thử (test harness) là tập hợp các driver và test double (stub, mock…) cần để chạy một test suite. Syllabus nói component testing thường cần hỗ trợ đặc biệt như test harness hoặc unit test framework, và shift left gồm việc viết test trước rồi cho code chạy trong test harness khi đang phát triển.`,
      `A test harness is a collection of drivers and test doubles (stubs, mocks…) needed to execute a test suite. The syllabus says component testing often needs specific support such as test harnesses or unit test frameworks, and shift left includes writing tests first and running the code in a test harness during implementation.`,
      `测试工具集（test harness）是执行测试套件所需的驱动和测试替身（桩、模拟对象等）的集合。大纲指出组件测试通常需要测试工具集或单元测试框架等特定支持，而左移包括先写测试、在编码期间让代码在测试工具集中运行。`,
    ),
    example: l(
      `Để test module tính lãi vay chưa có giao diện, dev viết driver gọi hàm tính lãi với nhiều tham số và stub thay cho dịch vụ lấy lãi suất từ ngân hàng nhà nước.`,
      `To test a loan-interest module that has no UI yet, the developer writes a driver calling the function with many parameters and a stub replacing the central-bank rate service.`,
      `为测试尚无界面的贷款利息模块，开发人员编写驱动以多组参数调用计算函数，并用桩替代获取央行利率的服务。`,
    ),
    confusedWith: [
      {
        id: 'unit-test-framework',
        note: l(
          `Unit test framework là công cụ (JUnit, pytest) cung cấp môi trường để test một unit cô lập; test harness là tập driver/test double cụ thể dựng cho một test suite — có thể được xây bằng unit test framework.`,
          `A unit test framework is a tool (JUnit, pytest) providing an environment to test a unit in isolation; a test harness is the specific set of drivers/test doubles built for a suite — possibly using such a framework.`,
          `单元测试框架是提供隔离测试单元环境的工具（JUnit、pytest）；测试工具集是为某测试套件搭建的具体驱动和测试替身——可借助单元测试框架构建。`,
        ),
      },
      {
        id: 'test-environment',
        note: l(
          `Test environment rộng hơn, gồm phần cứng, mạng, dữ liệu, công cụ; test harness chỉ là phần driver và test double.`,
          `A test environment is broader (hardware, network, data, tools); a test harness is only the drivers and test doubles.`,
          `测试环境更广（硬件、网络、数据、工具）；测试工具集只是驱动和测试替身部分。`,
        ),
      },
    ],
  },

  'test-implementation': {
    explanation: l(
      `Triển khai kiểm thử (test implementation) là hoạt động chuẩn bị testware cần cho test execution. Theo syllabus: tạo hoặc thu thập test data, tổ chức test case thành test procedure và test suite, viết test script thủ công và tự động, ưu tiên và sắp xếp test procedure vào test execution schedule, dựng môi trường kiểm thử và xác minh nó được cài đặt đúng.`,
      `Test implementation is the activity that prepares the testware needed for test execution. Per the syllabus: creating or acquiring test data, organizing test cases into test procedures and test suites, writing manual and automated test scripts, prioritizing procedures into a test execution schedule, and building the test environment and verifying it is set up correctly.`,
      `测试实现（test implementation）是准备测试执行所需测试件的活动。按大纲所述：创建或获取测试数据，将测试用例组织为测试规程和测试套件，编写手工和自动化测试脚本，对测试规程排序并编入测试执行进度表，搭建测试环境并验证其设置正确。`,
    ),
    example: l(
      `Trước ngày chạy test, QA nhập 200 khách hàng mẫu vào DB, viết script Postman cho 30 API, gom thành suite "Đơn hàng" và kiểm tra smoke rằng môi trường SIT đã lên đúng phiên bản.`,
      `Before execution day QA loads 200 sample customers into the DB, writes Postman scripts for 30 APIs, groups them into an "Orders" suite and smoke-checks that SIT runs the right version.`,
      `执行日前，QA 向数据库导入 200 个示例客户，为 30 个 API 编写 Postman 脚本并组成"订单"套件，并冒烟检查 SIT 环境已部署正确版本。`,
    ),
    confusedWith: [
      {
        id: 'test-design',
        note: l(
          `Test design trả lời "test như thế nào" (đặc tả test case, yêu cầu data/môi trường); test implementation hiện thực hóa: tạo data, script, procedure, dựng môi trường.`,
          `Test design answers "how to test" (specifies test cases, data and environment requirements); test implementation makes it real: data, scripts, procedures, environment.`,
          `测试设计回答"怎么测"（规定测试用例、数据和环境需求）；测试实现将其落地：数据、脚本、规程、环境。`,
        ),
      },
      {
        id: 'test-execution',
        note: l(
          `Test implementation chuẩn bị; test execution chạy test.`,
          `Test implementation prepares; test execution runs the tests.`,
          `测试实现负责准备；测试执行负责运行测试。`,
        ),
      },
    ],
  },

  'test-level': {
    explanation: l(
      `Mức kiểm thử (test level, còn gọi test stage) là một thể hiện cụ thể của quy trình kiểm thử — nhóm hoạt động kiểm thử được tổ chức và quản lý cùng nhau, ứng với một giai đoạn phát triển. Syllabus mô tả 5 mức: component testing, component integration testing, system testing, system integration testing, acceptance testing. Các mức được phân biệt bởi test object, test objective, test basis, loại defect/failure, cách tiếp cận và trách nhiệm.`,
      `A test level (also test stage) is a specific instantiation of the test process — a group of test activities organized and managed together, tied to a development phase. The syllabus describes five: component, component integration, system, system integration and acceptance testing. Levels are distinguished by test object, test objectives, test basis, defects and failures, approach and responsibilities.`,
      `测试级别（test level，又称测试阶段）是测试过程的一个具体实例——一组共同组织和管理的测试活动，对应某个开发阶段。大纲描述了五个级别：组件测试、组件集成测试、系统测试、系统集成测试、验收测试。各级别通过测试对象、测试目标、测试依据、缺陷和失效、方法和职责来区分。`,
    ),
    example: l(
      `Trong dự án app giao đồ ăn: dev viết unit test (component testing), QA kiểm thử luồng đặt món đầy đủ (system testing), nhà hàng đối tác dùng thử trước khi ra mắt (acceptance testing).`,
      `In a food-delivery app: developers write unit tests (component testing), QA tests the full ordering flow (system testing), partner restaurants try it before launch (acceptance testing).`,
      `在外卖应用项目中：开发人员编写单元测试（组件测试），QA 测试完整的点餐流程（系统测试），合作餐厅在上线前试用（验收测试）。`,
    ),
    confusedWith: [
      {
        id: 'test-type',
        note: l(
          `Test level trả lời "test ở giai đoạn/phạm vi nào" (component, system…); test type trả lời "test đặc tính gì" (chức năng, phi chức năng, black-box, white-box). Hầu hết test type áp dụng được ở mọi test level.`,
          `A test level answers "at which stage/scope" (component, system…); a test type answers "which characteristic" (functional, non-functional, black-box, white-box). Most test types apply at every level.`,
          `测试级别回答"在哪个阶段/范围测"（组件、系统等）；测试类型回答"测什么特性"（功能、非功能、黑盒、白盒）。大多数测试类型可在各级别应用。`,
        ),
      },
    ],
  },

  'test-log': {
    explanation: l(
      `Nhật ký kiểm thử (test log) là bản ghi theo trình tự thời gian các chi tiết liên quan về việc thực thi kiểm thử: test nào được chạy, khi nào, bởi ai, trên phiên bản/môi trường nào, kết quả ra sao. Syllabus liệt kê test log là sản phẩm của test execution và là thông tin có thể đính kèm vào defect report.`,
      `A test log is a chronological record of relevant details about test execution: which tests ran, when, by whom, on which build/environment, with what result. The syllabus lists test logs as test execution work products and as information that can be attached to defect reports.`,
      `测试日志（test log）是按时间顺序记录测试执行相关细节的文档：运行了哪些测试、何时、由谁、在哪个版本/环境、结果如何。大纲将测试日志列为测试执行的工作产品，也可附在缺陷报告中。`,
    ),
    example: l(
      `"2026-10-12 09:14 — build 3.2.1 — SIT — TC-101 Pass — TC-102 Fail (lỗi 500 khi lưu) — người chạy: Lan"; pipeline CI cũng tự sinh log dạng này cho test tự động.`,
      `"2026-10-12 09:14 — build 3.2.1 — SIT — TC-101 Pass — TC-102 Fail (500 error on save) — run by Lan"; the CI pipeline produces similar logs for automated tests.`,
      `"2026-10-12 09:14 — 版本 3.2.1 — SIT — TC-101 通过 — TC-102 失败（保存时报 500 错误）— 执行人：Lan"；CI 流水线也会为自动化测试生成类似日志。`,
    ),
    confusedWith: [
      {
        id: 'test-report',
        note: l(
          `Test log ghi chi tiết từng lần chạy (dữ liệu thô); test report tổng hợp và diễn giải thông tin cho stakeholder.`,
          `A test log records the details of each run (raw data); a test report summarizes and interprets information for stakeholders.`,
          `测试日志记录每次运行的细节（原始数据）；测试报告为干系人汇总和解读信息。`,
        ),
      },
    ],
  },

  'test-monitoring': {
    explanation: l(
      `Giám sát kiểm thử (test monitoring) là hoạt động kiểm tra liên tục trạng thái các hoạt động kiểm thử, phát hiện sai lệch so với kế hoạch/kỳ vọng và báo cáo trạng thái cho stakeholder. Theo syllabus, thông tin thu được dùng để đánh giá tiến độ và đo xem exit criteria đã thỏa chưa (ví dụ mục tiêu bao phủ rủi ro, yêu cầu, tiêu chí chấp nhận); sản phẩm chính là test progress report.`,
      `Test monitoring is the activity that checks the status of test activities, identifies variances from the plan or expectations and reports status to stakeholders. Per the syllabus the information is used to assess progress and measure whether exit criteria are satisfied (e.g., coverage targets for risks, requirements, acceptance criteria); its main work product is the test progress report.`,
      `测试监控（test monitoring）是检查测试活动状态、识别与计划或预期的偏差，并向干系人报告状态的活动。按大纲所述，所收集的信息用于评估进度并衡量退出准则是否满足（如风险、需求、验收准则的覆盖目标）；其主要工作产品是测试进度报告。`,
    ),
    example: l(
      `Dashboard Jira hằng ngày: 65% test đã chạy so với kế hoạch 80%, 12 bug mở trong đó 2 critical — test lead đưa thông tin này vào báo cáo tuần.`,
      `Daily Jira dashboard: 65% of tests run versus 80% planned, 12 open bugs including 2 critical — the test lead puts this into the weekly report.`,
      `每日 Jira 仪表盘：已执行 65% 的测试（计划为 80%），12 个未关闭缺陷，其中 2 个严重——测试负责人将这些信息写入周报。`,
    ),
    confusedWith: [
      {
        id: 'test-control',
        note: l(
          `Monitoring = quan sát và đo; control = hành động khắc phục dựa trên kết quả quan sát.`,
          `Monitoring = observing and measuring; control = taking corrective action based on what was observed.`,
          `监控＝观察与度量；控制＝根据观察结果采取纠正措施。`,
        ),
      },
    ],
  },

  'test-object': {
    explanation: l(
      `Đối tượng kiểm thử (test object) là sản phẩm công việc được kiểm thử. Syllabus nói các sản phẩm công việc phần mềm khi được kiểm thử thì gọi là test object — không chỉ code chạy được mà cả yêu cầu, user story, thiết kế (trong static testing). Test object là một thuộc tính phân biệt các mức kiểm thử (ví dụ component, cả hệ thống).`,
      `The test object is the work product being tested. The syllabus says software work products, when tested, are called test objects — not only executable code but also requirements, user stories and designs (in static testing). The test object is one attribute distinguishing test levels (e.g., a component vs a whole system).`,
      `测试对象（test object）是被测试的工作产品。大纲指出，软件工作产品在被测试时称为测试对象——不仅是可执行代码，也包括需求、用户故事、设计（静态测试中）。测试对象是区分测试级别的属性之一（如单个组件与整个系统）。`,
    ),
    example: l(
      `Trong sprint review tài liệu, test object là file đặc tả màn hình đăng ký; trong system testing, test object là bản build 2.4 của app.`,
      `In a document review, the test object is the sign-up screen specification; in system testing, the test object is build 2.4 of the app.`,
      `在文档评审中，测试对象是注册页面的规格说明；在系统测试中，测试对象是应用的 2.4 版本构建。`,
    ),
    confusedWith: [
      {
        id: 'test-item',
        note: l(
          `Test item là một phần riêng lẻ của test object (theo syllabus mục 5.4); test object là toàn bộ sản phẩm được kiểm thử.`,
          `A test item is an individual part of the test object (syllabus 5.4); the test object is the whole work product under test.`,
          `测试项（test item）是测试对象中的单个部分（大纲 5.4）；测试对象是被测试的整个工作产品。`,
        ),
      },
      {
        id: 'test-basis',
        note: l(
          `Test basis là nguồn để suy ra test; test object là cái bị kiểm thử.`,
          `The test basis is the source tests are derived from; the test object is what gets tested.`,
          `测试依据是推导测试的来源；测试对象是被测试的东西。`,
        ),
      },
    ],
  },

  'test-objective': {
    explanation: l(
      `Mục tiêu kiểm thử (test objective, còn gọi test goal) là lý do/mục đích của việc kiểm thử. Syllabus liệt kê các mục tiêu điển hình: đánh giá sản phẩm công việc, gây failure và tìm defect, đảm bảo coverage, giảm rủi ro chất lượng kém, xác minh yêu cầu, tuân thủ hợp đồng/pháp lý, cung cấp thông tin cho stakeholder ra quyết định, tạo niềm tin, xác nhận hệ thống đáp ứng kỳ vọng. Mục tiêu thay đổi theo ngữ cảnh: sản phẩm, mức kiểm thử, rủi ro, SDLC, yếu tố kinh doanh.`,
      `A test objective (also test goal) is the purpose for testing. The syllabus lists typical ones: evaluating work products, causing failures and finding defects, ensuring coverage, reducing quality risk, verifying requirements, contractual/legal compliance, informing stakeholders' decisions, building confidence, validating that the object works as stakeholders expect. Objectives vary by context: work product, test level, risks, SDLC, business factors.`,
      `测试目标（test objective，又称 test goal）是测试的目的。大纲列出典型目标：评估工作产品、引发失效并发现缺陷、确保覆盖、降低质量风险、验证需求、符合合同和法规要求、为干系人决策提供信息、建立对质量的信心、确认测试对象符合干系人期望。目标随情境变化：工作产品、测试级别、风险、SDLC、业务因素。`,
    ),
    example: l(
      `Ở component testing, mục tiêu chính là tìm defect trong logic; ở UAT của phần mềm kế toán, mục tiêu là tạo niềm tin và xác nhận phần mềm đáp ứng quy trình nghiệp vụ của kế toán trưởng.`,
      `In component testing the main objective is finding logic defects; in UAT of accounting software it is building confidence and validating that it fits the chief accountant's business process.`,
      `在组件测试中，主要目标是发现逻辑缺陷；在会计软件的 UAT 中，目标是建立信心并确认软件符合总会计师的业务流程。`,
    ),
    confusedWith: [
      {
        id: 'test-condition',
        note: l(
          `Test objective là "vì sao test"; test condition là "test khía cạnh nào". Trong session-based testing, test objective có thể được coi như test condition cấp cao.`,
          `A test objective is "why we test"; a test condition is "which aspect we test". In session-based testing objectives may be treated as high-level test conditions.`,
          `测试目标是"为什么测"；测试条件是"测哪个方面"。在基于会话的测试中，测试目标可视为高层测试条件。`,
        ),
      },
    ],
  },

  'test-plan': {
    explanation: l(
      `Kế hoạch kiểm thử (test plan) là tài liệu mô tả mục tiêu kiểm thử, phương tiện và lịch trình để đạt được chúng. Theo syllabus, test plan ghi lại phương tiện và lịch, giúp đảm bảo hoạt động kiểm thử đạt tiêu chí đặt ra, là công cụ giao tiếp với stakeholder, và cho thấy việc tuân thủ test policy, test strategy (hoặc giải thích lý do khác biệt). Nội dung điển hình: ngữ cảnh (phạm vi, mục tiêu, test basis), giả định và ràng buộc, stakeholder, giao tiếp, risk register, test approach, ngân sách và lịch.`,
      `A test plan documents the test objectives and the means and schedule for achieving them. Per the syllabus it helps ensure test activities meet established criteria, serves as communication with stakeholders and shows adherence to the test policy and test strategy (or explains deviations). Typical content: context (scope, objectives, test basis), assumptions and constraints, stakeholders, communication, risk register, test approach, budget and schedule.`,
      `测试计划（test plan）是描述测试目标以及实现目标的手段和进度的文档。按大纲所述，它有助于确保测试活动满足既定准则，是与干系人沟通的手段，并表明测试遵循测试方针和测试策略（或说明偏离原因）。典型内容：背景（范围、目标、测试依据）、假设与约束、干系人、沟通、风险登记册、测试方法、预算和进度。`,
    ),
    example: l(
      `Test plan cho release ví điện tử Q4: phạm vi gồm nạp/rút/chuyển tiền; rủi ro chính là tích hợp ngân hàng; cách tiếp cận gồm SIT, performance test 1.000 TPS; exit criteria: 0 bug critical mở; lịch 6 tuần, 4 tester.`,
      `Test plan for the Q4 e-wallet release: scope top-up/withdraw/transfer; main risk bank integration; approach SIT plus a 1,000 TPS performance test; exit criteria no open critical bugs; 6 weeks, 4 testers.`,
      `电子钱包第四季度版本的测试计划：范围为充值/提现/转账；主要风险为银行集成；方法包括 SIT 和 1,000 TPS 性能测试；退出准则为无未关闭的严重缺陷；周期 6 周，4 名测试人员。`,
    ),
    confusedWith: [
      {
        id: 'test-strategy',
        note: l(
          `Test strategy mô tả chung cách kiểm thử để đạt mục tiêu trong hoàn cảnh nhất định (thường ở cấp tổ chức/sản phẩm); test plan áp dụng cụ thể cho một dự án/mức kiểm thử, với lịch, nguồn lực, rủi ro cụ thể.`,
          `A test strategy describes generally how testing is done to reach objectives in given circumstances (often organization or product level); a test plan applies it concretely to one project or level with schedule, resources and risks.`,
          `测试策略概括描述在特定情况下如何开展测试以达成目标（常在组织或产品层面）；测试计划针对具体项目或级别，包含具体进度、资源和风险。`,
        ),
      },
      {
        id: 'test-planning',
        note: l(
          `Test planning là hoạt động; test plan là tài liệu kết quả.`,
          `Test planning is the activity; the test plan is the resulting document.`,
          `测试策划是活动；测试计划是其产出的文档。`,
        ),
      },
    ],
  },

  'test-planning': {
    explanation: l(
      `Lập kế hoạch kiểm thử (test planning) là hoạt động thiết lập hoặc cập nhật test plan. Syllabus mô tả: xác định mục tiêu kiểm thử rồi chọn cách tiếp cận đạt mục tiêu tốt nhất trong ràng buộc của bối cảnh. Việc lập kế hoạch buộc tester suy nghĩ trước về rủi ro, lịch, con người, công cụ, chi phí, công sức. Trong Agile, tester còn tham gia lập kế hoạch release và iteration.`,
      `Test planning is the activity of establishing or updating a test plan. The syllabus describes it as defining the test objectives and selecting an approach that best achieves them within the constraints of the context. It forces testers to think ahead about risks, schedules, people, tools, costs and effort. In Agile, testers also contribute to release and iteration planning.`,
      `测试策划（test planning）是制定或更新测试计划的活动。大纲描述为：定义测试目标，然后在整体情境的约束下选择最能实现目标的方法。它促使测试人员提前思考风险、进度、人员、工具、成本和工作量。在敏捷中，测试人员还参与发布和迭代规划。`,
    ),
    example: l(
      `Khi khách hàng đổi hạn phát hành sớm 2 tuần, test lead cập nhật test plan: cắt bớt test tương thích trình duyệt cũ, ưu tiên các luồng thanh toán — đây cũng là test planning.`,
      `When the client moves the release 2 weeks earlier, the test lead updates the test plan — dropping old-browser compatibility tests and prioritizing payment flows; that too is test planning.`,
      `客户将发布提前两周后，测试负责人更新测试计划：削减旧浏览器兼容性测试、优先测试支付流程——这同样属于测试策划。`,
    ),
    confusedWith: [
      {
        id: 'test-plan',
        note: l(
          `Test planning là hoạt động (diễn ra và cập nhật suốt dự án); test plan là tài liệu nó tạo ra.`,
          `Test planning is the activity (ongoing and updated throughout); the test plan is the document it produces.`,
          `测试策划是贯穿项目并持续更新的活动；测试计划是它产出的文档。`,
        ),
      },
    ],
  },

  'test-procedure': {
    explanation: l(
      `Thủ tục kiểm thử (test procedure) là chuỗi các test case theo thứ tự thực thi, kèm các hành động cần để thiết lập điều kiện ban đầu và dọn dẹp sau khi chạy. Theo syllabus, test case được tổ chức thành test procedure trong test implementation, các test procedure thường được gom thành test suite và sắp xếp vào test execution schedule.`,
      `A test procedure is a sequence of test cases in execution order, plus any actions needed to set up initial preconditions and wrap up afterwards. Per the syllabus, test cases are organized into test procedures during test implementation; procedures are often assembled into test suites and arranged in the test execution schedule.`,
      `测试规程（test procedure）是按执行顺序排列的一系列测试用例，以及建立初始前置条件和执行后收尾所需的动作。按大纲所述，测试用例在测试实现中被组织为测试规程，测试规程常被组装成测试套件并编入测试执行进度表。`,
    ),
    example: l(
      `Thủ tục "Vòng đời đơn hàng": chuẩn bị — tạo khách hàng; TC-1 tạo đơn → TC-2 thanh toán → TC-3 hủy đơn → TC-4 kiểm tra hoàn tiền; dọn dẹp — xóa dữ liệu test.`,
      `Procedure "Order lifecycle": setup — create a customer; TC-1 create order → TC-2 pay → TC-3 cancel → TC-4 check refund; wrap-up — delete test data.`,
      `规程"订单生命周期"：准备——创建客户；TC-1 创建订单 → TC-2 支付 → TC-3 取消订单 → TC-4 检查退款；收尾——删除测试数据。`,
    ),
    confusedWith: [
      {
        id: 'test-case',
        note: l(
          `Test case là một đơn vị; test procedure nối nhiều test case theo thứ tự và thêm các bước chuẩn bị/dọn dẹp.`,
          `A test case is one unit; a test procedure chains several in order and adds setup/wrap-up steps.`,
          `测试用例是单个单元；测试规程按顺序串联多个用例，并增加准备和收尾步骤。`,
        ),
      },
      {
        id: 'test-suite',
        note: l(
          `Test suite là tập hợp nhiều test script/test procedure để chạy trong một lần chạy (test run); test procedure là một chuỗi cụ thể bên trong.`,
          `A test suite is a set of test scripts or procedures for one test run; a test procedure is one specific sequence within it.`,
          `测试套件是在一次测试运行中执行的一组测试脚本或规程；测试规程是其中一个具体序列。`,
        ),
      },
    ],
  },

  'test-process': {
    explanation: l(
      `Quy trình kiểm thử (test process) là tập hợp các hoạt động kiểm thử thực hiện để đạt mục tiêu kiểm thử. Syllabus mô tả các nhóm hoạt động: test planning, test monitoring và control, test analysis, test design, test implementation, test execution, test completion — thường lặp lại hoặc song song chứ không tuần tự cứng nhắc. Quy trình cần được điều chỉnh (tailor) theo bối cảnh: stakeholder, nhóm, lĩnh vực, kỹ thuật, ràng buộc dự án, tổ chức, SDLC, công cụ.`,
      `A test process is the set of test activities performed to achieve a test objective. The syllabus describes the groups: test planning, monitoring and control, analysis, design, implementation, execution and completion — often iterative or parallel rather than strictly sequential. It must be tailored to the context: stakeholders, team, domain, technical factors, project constraints, organization, SDLC, tools.`,
      `测试过程（test process）是为达成测试目标而执行的一组测试活动。大纲描述的活动组包括：测试策划、监控与控制、分析、设计、实现、执行和完成——常为迭代或并行，而非严格顺序。测试过程需根据情境裁剪：干系人、团队、业务领域、技术因素、项目约束、组织、SDLC、工具。`,
    ),
    example: l(
      `Trong mỗi sprint 2 tuần, nhóm vừa phân tích story mới (analysis), vừa viết test (design/implementation) và chạy test cho story đã xong (execution) — cùng lúc, không theo thứ tự thác nước.`,
      `In each 2-week sprint the team analyzes new stories, writes tests and runs tests for finished stories at the same time — not in waterfall order.`,
      `在每个两周迭代中，团队同时分析新故事、编写测试并为已完成的故事执行测试——而不是按瀑布式顺序。`,
    ),
    confusedWith: [
      {
        id: 'test-level',
        note: l(
          `Test process là tập hoạt động chung; mỗi test level là một thể hiện (instance) cụ thể của test process cho một giai đoạn phát triển.`,
          `The test process is the general set of activities; each test level is one specific instance of it for a development phase.`,
          `测试过程是一般性的活动集合；每个测试级别是针对某开发阶段的测试过程的一个具体实例。`,
        ),
      },
    ],
  },

  'test-progress-report': {
    explanation: l(
      `Báo cáo tiến độ kiểm thử (test progress report, còn gọi test status report) là báo cáo định kỳ về tiến độ hoạt động kiểm thử so với baseline, rủi ro và các phương án cần ra quyết định. Theo syllabus, nó hỗ trợ test control, lập đều đặn (hằng ngày, tuần) và gồm: giai đoạn báo cáo, tiến độ và sai lệch, trở ngại và cách xử lý, metric, rủi ro mới/thay đổi, kế hoạch kỳ tiếp theo.`,
      `A test progress report (also test status report) is a periodic report on progress of test activities against a baseline, risks and alternatives needing a decision. Per the syllabus it supports test control, is produced regularly (daily, weekly) and includes: period, progress and deviations, impediments and workarounds, metrics, new or changed risks, testing planned next.`,
      `测试进度报告（test progress report，又称测试状态报告）是关于测试活动相对基线的进度、风险以及需决策的备选方案的定期报告。按大纲所述，它支持测试控制，定期（每日、每周）编写，内容包括：报告期、进度及偏差、障碍及规避方案、度量、新增或变化的风险、下期测试计划。`,
    ),
    example: l(
      `Báo cáo tuần 42: đã chạy 310/500 test (chậm 1 ngày), trở ngại: API đối tác lỗi chứng chỉ — dùng service virtualization tạm thời; rủi ro mới: thiếu thiết bị Android 15; tuần sau: regression module thanh toán.`,
      `Week 42 report: 310/500 tests run (1 day behind); impediment: partner API certificate error — using service virtualization meanwhile; new risk: no Android 15 devices; next week: payment regression.`,
      `第 42 周报告：已执行 310/500 个测试（落后 1 天）；障碍：合作方 API 证书错误——暂用服务虚拟化；新风险：缺少 Android 15 设备；下周：支付模块回归测试。`,
    ),
    confusedWith: [
      {
        id: 'test-completion-report',
        note: l(
          `Progress report: định kỳ, trong khi kiểm thử, thường ít trang trọng, phục vụ test control. Completion report: một lần, khi kết thúc, theo mẫu, tổng kết và đánh giá so với exit criteria.`,
          `Progress report: periodic, during testing, often informal, serves test control. Completion report: once, at the end, templated, summarizes and evaluates against exit criteria.`,
          `进度报告：测试期间定期编写，常较非正式，服务于测试控制。完成报告：结束时编写一次，遵循模板，总结并对照退出准则评估。`,
        ),
      },
    ],
  },

  'test-result': {
    explanation: l(
      `Kết quả kiểm thử (test result, còn gọi outcome, test outcome) là trạng thái của việc thực thi một test, ví dụ đạt (passed), không đạt (failed), bị chặn (blocked). Syllabus nói kết quả kiểm thử được ghi log trong test execution, được truy vết tới test basis, rủi ro và defect, và được cả testing (để sửa defect) lẫn QA (phản hồi về quy trình) sử dụng.`,
      `A test result (also outcome, test outcome) is the status of a test's execution, e.g., passed, failed, blocked. The syllabus says test results are logged during test execution, traced to the test basis, risks and defects, and used both by testing (to fix defects) and by QA (as process feedback).`,
      `测试结果（test result，又称 outcome、测试输出）是一次测试执行的状态，如通过、失败、阻塞。大纲指出，测试结果在测试执行中被记录，可追溯到测试依据、风险和缺陷，既被测试用于修复缺陷，也被质量保证用作过程反馈。`,
    ),
    example: l(
      `Sau lần chạy đêm qua: TC-201 passed, TC-202 failed (liên kết bug #873), TC-203 blocked do môi trường thanh toán sập.`,
      `After last night's run: TC-201 passed, TC-202 failed (linked to bug #873), TC-203 blocked because the payment environment was down.`,
      `昨晚运行后：TC-201 通过，TC-202 失败（关联缺陷 #873），TC-203 因支付环境宕机而阻塞。`,
    ),
    confusedWith: [
      {
        id: 'actual-result',
        note: l(
          `Actual result là hành vi thực tế quan sát được (ví dụ "hiện thông báo lỗi 500"); test result là trạng thái kết luận sau khi so actual result với expected result (pass/fail).`,
          `The actual result is the behavior observed (e.g., "error 500 shown"); the test result is the status concluded by comparing actual with expected results (pass/fail).`,
          `实际结果是观察到的行为（如"显示 500 错误"）；测试结果是将实际结果与预期结果比较后得出的状态（通过/失败）。`,
        ),
      },
      {
        id: 'expected-result',
        note: l(
          `Expected result được xác định trước khi chạy (thường từ test oracle); test result chỉ có sau khi chạy.`,
          `The expected result is defined before execution (often from a test oracle); the test result exists only after execution.`,
          `预期结果在执行前确定（常来自测试预言）；测试结果只在执行后产生。`,
        ),
      },
    ],
    versionNote: l(
      `Glossary v4.8.1 định nghĩa test result là "trạng thái" của việc thực thi (pass/fail…), tách biệt với actual result. Syllabus v4.0.1 đôi khi dùng "test results" rộng hơn, ví dụ "Actual test results are compared with the expected results" (mục 1.4.1), gần nghĩa với actual result.`,
      `The v4.8.1 glossary defines test result as the "status" of execution (pass/fail…), separate from actual result. The v4.0.1 syllabus sometimes uses "test results" more loosely, e.g., "Actual test results are compared with the expected results" (1.4.1), closer to actual result.`,
      `v4.8.1 术语表将测试结果定义为执行的"状态"（通过/失败等），与实际结果分开。v4.0.1 大纲有时用法更宽泛，如 1.4.1 中"Actual test results are compared with the expected results"，含义更接近实际结果。`,
    ),
  },

  'test-schedule': {
    explanation: l(
      `Lịch kiểm thử (test schedule) là danh sách các hoạt động, nhiệm vụ và mốc của quy trình kiểm thử cùng ngày bắt đầu/kết thúc dự kiến và sự phụ thuộc giữa chúng. Syllabus liệt kê test schedule là sản phẩm của test planning, thường là một phần của test plan; test control có thể điều chỉnh lịch, ví dụ khi môi trường giao trễ.`,
      `A test schedule lists the activities, tasks and milestones of the test process with their intended start and finish dates and interdependencies. The syllabus lists it as a test planning work product, often part of the test plan; test control may adjust it, e.g., when the environment is delivered late.`,
      `测试进度（test schedule）列出测试过程的活动、任务和里程碑，以及计划的起止日期和相互依赖关系。大纲将其列为测试策划的工作产品，通常是测试计划的一部分；测试控制可对其进行调整，例如测试环境延迟交付时。`,
    ),
    example: l(
      `01/11–05/11: thiết kế test; 06/11–08/11: chuẩn bị môi trường (phụ thuộc bản build 3.0); 09/11–20/11: thực thi SIT; 21/11: mốc báo cáo hoàn thành.`,
      `Nov 1–5: test design; Nov 6–8: environment setup (depends on build 3.0); Nov 9–20: SIT execution; Nov 21: completion report milestone.`,
      `11 月 1–5 日：测试设计；11 月 6–8 日：准备环境（依赖 3.0 版本构建）；11 月 9–20 日：执行 SIT；11 月 21 日：完成报告里程碑。`,
    ),
    confusedWith: [
      {
        id: 'test-execution-schedule',
        note: l(
          `Test schedule bao toàn bộ quy trình (thiết kế, chuẩn bị, chạy, báo cáo); test execution schedule chỉ là thứ tự chạy test suite trong một chu kỳ.`,
          `A test schedule spans the whole process (design, preparation, execution, reporting); a test execution schedule is just the order of running test suites in a cycle.`,
          `测试进度涵盖整个过程（设计、准备、执行、报告）；测试执行进度表只是某周期内测试套件的运行顺序。`,
        ),
      },
    ],
  },

  'test-script': {
    explanation: l(
      `Kịch bản kiểm thử (test script) là chuỗi chỉ dẫn để thực thi một test. Theo syllabus, test script thủ công và tự động được tạo trong test implementation. Trong thực tế, "test script" thường chỉ code test tự động (Selenium, Playwright…), nhưng cũng có thể là các bước hướng dẫn cho người test thủ công.`,
      `A test script is a sequence of instructions for the execution of a test. Per the syllabus, manual and automated test scripts are created in test implementation. In practice "test script" often means automated test code (Selenium, Playwright…), but it can also be step-by-step instructions for a manual tester.`,
      `测试脚本（test script）是执行测试的一系列指令。按大纲所述，手工和自动化测试脚本在测试实现中创建。实践中"测试脚本"常指自动化测试代码（Selenium、Playwright 等），但也可以是给手工测试人员的逐步指示。`,
    ),
    example: l(
      `Script Playwright: mở trang đăng nhập → nhập email/mật khẩu → bấm "Đăng nhập" → kiểm tra (assert) tiêu đề trang là "Tổng quan".`,
      `A Playwright script: open the login page → enter email/password → click "Log in" → assert that the page title is "Dashboard".`,
      `Playwright 脚本：打开登录页 → 输入邮箱/密码 → 点击"登录" → 断言页面标题为"总览"。`,
    ),
    confusedWith: [
      {
        id: 'test-case',
        note: l(
          `Test case nói CẦN kiểm tra gì (đầu vào, kết quả mong đợi); test script nói CÁCH thực hiện từng bước (thường là code tự động).`,
          `A test case says WHAT to check (inputs, expected results); a test script says HOW to perform it step by step (often automated code).`,
          `测试用例说明要检查什么（输入、预期结果）；测试脚本说明如何逐步执行（常为自动化代码）。`,
        ),
      },
      {
        id: 'test-procedure',
        note: l(
          `Hai khái niệm gần nhau: test procedure nhấn mạnh thứ tự các test case và bước chuẩn bị/dọn dẹp; test script nhấn mạnh chỉ dẫn thực thi, hay dùng cho test tự động.`,
          `Close concepts: a test procedure stresses the order of test cases and setup/wrap-up; a test script stresses execution instructions and is commonly used for automation.`,
          `二者相近：测试规程强调测试用例的顺序及准备/收尾；测试脚本强调执行指令，常用于自动化。`,
        ),
      },
    ],
  },

  'test-strategy': {
    explanation: l(
      `Chiến lược kiểm thử (test strategy) là mô tả cách thực hiện kiểm thử để đạt mục tiêu kiểm thử trong những hoàn cảnh nhất định. Syllabus nói bối cảnh (stakeholder, lĩnh vực, kỹ thuật, ràng buộc…) ảnh hưởng tới test strategy, và test plan cần cho thấy việc tuân thủ test policy và test strategy hiện có (hoặc giải thích lý do khác biệt). Test strategy thường ở mức tổng quát hơn test plan.`,
      `A test strategy describes how testing is performed to reach test objectives under given circumstances. The syllabus says context factors (stakeholders, domain, technical factors, constraints…) shape the test strategy, and a test plan should show adherence to the existing test policy and test strategy (or explain deviations). It is usually more general than a test plan.`,
      `测试策略（test strategy）描述在特定情况下如何开展测试以实现测试目标。大纲指出，情境因素（干系人、业务领域、技术因素、约束等）影响测试策略，测试计划应表明遵循现有测试方针和测试策略（或说明偏离原因）。测试策略通常比测试计划更概括。`,
    ),
    example: l(
      `Chiến lược kiểm thử của công ty fintech: kiểm thử dựa trên rủi ro, tự động hóa regression theo kim tự tháp kiểm thử, bắt buộc security test cho mọi tính năng liên quan tiền — mọi dự án lập test plan dựa trên đó.`,
      `A fintech company's test strategy: risk-based testing, regression automation following the test pyramid, mandatory security testing for every money-related feature — each project's test plan builds on it.`,
      `某金融科技公司的测试策略：基于风险的测试，按测试金字塔自动化回归测试，所有涉及资金的功能必须做安全性测试——各项目的测试计划都以此为基础。`,
    ),
    confusedWith: [
      {
        id: 'test-plan',
        note: l(
          `Test strategy = cách làm chung (thường áp dụng nhiều dự án); test plan = áp dụng cụ thể cho một dự án/mức kiểm thử với lịch, nguồn lực, rủi ro.`,
          `Test strategy = the general way of testing (often across projects); test plan = concrete application to one project or level with schedule, resources and risks.`,
          `测试策略＝一般性做法（常跨项目）；测试计划＝针对具体项目或级别的落地，含进度、资源和风险。`,
        ),
      },
      {
        id: 'test-approach',
        note: l(
          `Test approach là cách tiếp cận được chọn cho một dự án cụ thể (test level, test type, kỹ thuật…, được ghi trong test plan); test strategy là định hướng chung mà test approach dựa vào.`,
          `A test approach is the approach chosen for a specific project (levels, types, techniques…, recorded in the test plan); the test strategy is the general direction it is based on.`,
          `测试方法（test approach）是为具体项目选定的方法（级别、类型、技术等，记录在测试计划中）；测试策略是其依据的总体方向。`,
        ),
      },
    ],
  },

  'test-suite': {
    explanation: l(
      `Bộ kiểm thử (test suite, còn gọi test set) là tập hợp test script hoặc test procedure để chạy trong một lần chạy kiểm thử (test run) cụ thể. Theo syllabus, test procedure thường được gom thành test suite trong test implementation; các test suite được sắp xếp vào test execution schedule theo thứ tự ưu tiên.`,
      `A test suite (also test set) is a set of test scripts or test procedures to be executed in a specific test run. Per the syllabus, test procedures are often assembled into test suites in test implementation, and suites are arranged by priority in the test execution schedule.`,
      `测试套件（test suite，又称测试集）是在一次特定测试运行中执行的一组测试脚本或测试规程。按大纲所述，测试规程常在测试实现中被组装为测试套件，套件再按优先级编入测试执行进度表。`,
    ),
    example: l(
      `Suite "Smoke" gồm 25 test chạy sau mỗi lần deploy; suite "Regression đầy đủ" gồm 900 test chạy mỗi đêm.`,
      `A "Smoke" suite of 25 tests runs after every deploy; a "Full regression" suite of 900 tests runs nightly.`,
      `"冒烟"套件含 25 个测试，每次部署后运行；"完整回归"套件含 900 个测试，每晚运行。`,
    ),
    confusedWith: [
      {
        id: 'test-procedure',
        note: l(
          `Test procedure là một chuỗi test case có thứ tự; test suite gom nhiều procedure/script để chạy cùng nhau.`,
          `A test procedure is one ordered sequence of test cases; a test suite groups many procedures/scripts to run together.`,
          `测试规程是一个有序的测试用例序列；测试套件将多个规程/脚本组合在一起运行。`,
        ),
      },
    ],
  },

  'test-type': {
    explanation: l(
      `Loại kiểm thử (test type) là nhóm hoạt động kiểm thử dựa trên mục tiêu cụ thể, nhắm vào các đặc tính cụ thể của thành phần/hệ thống. Syllabus mô tả 4 loại: kiểm thử chức năng (functional), phi chức năng (non-functional), hộp đen (black-box), hộp trắng (white-box). Cả 4 loại đều áp dụng được ở mọi mức kiểm thử, dù trọng tâm khác nhau ở từng mức.`,
      `A test type is a group of test activities based on specific objectives, aimed at specific characteristics of a component or system. The syllabus covers four: functional, non-functional, black-box and white-box testing. All four can be applied at all test levels, with a different focus at each.`,
      `测试类型（test type）是基于特定测试目标、针对组件或系统特定特性的一组测试活动。大纲涵盖四种：功能测试、非功能测试、黑盒测试、白盒测试。四种类型都可应用于所有测试级别，只是各级别侧重点不同。`,
    ),
    example: l(
      `Ở mức system testing của app đặt xe: functional test kiểm tra tính cước đúng; non-functional test đo app mở trong dưới 2 giây; cả hai cũng có thể làm ở mức component.`,
      `At system level for a ride-hailing app: functional tests check fares are correct; non-functional tests check the app opens in under 2 seconds; both can also be done at component level.`,
      `在打车应用的系统测试级别：功能测试检查车费计算正确；非功能测试检查应用在 2 秒内打开；二者也可在组件级进行。`,
    ),
    confusedWith: [
      {
        id: 'test-level',
        note: l(
          `Test level = phạm vi/giai đoạn (component, system, acceptance…); test type = đặc tính hoặc góc nhìn (chức năng, phi chức năng, hộp đen, hộp trắng). Một test có cả level và type.`,
          `Test level = scope/stage (component, system, acceptance…); test type = characteristic or viewpoint (functional, non-functional, black-box, white-box). Every test has both.`,
          `测试级别＝范围/阶段（组件、系统、验收等）；测试类型＝特性或视角（功能、非功能、黑盒、白盒）。每个测试同时具有级别和类型。`,
        ),
      },
      {
        id: 'test-technique',
        note: l(
          `Test technique (EP, BVA, decision table…) là cách suy ra test condition/test case; test type là nhóm hoạt động theo đặc tính cần kiểm. Kỹ thuật được dùng bên trong các test type.`,
          `A test technique (EP, BVA, decision tables…) is a way to derive conditions and cases; a test type is a group of activities by characteristic. Techniques are used within test types.`,
          `测试技术（等价类划分、边界值分析、决策表等）是推导测试条件和用例的方法；测试类型是按特性划分的活动组。测试技术在各测试类型中使用。`,
        ),
      },
    ],
  },

  'test-driven-development': {
    explanation: l(
      `Phát triển hướng kiểm thử (test-driven development, TDD) là kỹ thuật phát triển trong đó test case được viết (và tự động hóa) trước, sau đó code được viết từng bước để vượt qua các test đó. Syllabus mô tả TDD: định hướng việc code bằng test case (thay vì thiết kế phần mềm chi tiết), viết test trước → viết code thỏa test → refactor cả test và code. TDD thể hiện nguyên tắc kiểm thử sớm và shift left, hỗ trợ mô hình phát triển lặp.`,
      `Test-driven development (TDD) is a development technique where test cases are written (and automated) first and the software is then developed incrementally to pass them. The syllabus describes TDD as directing coding through test cases (instead of extensive design): write tests first, write code to satisfy them, then refactor tests and code. It embodies early testing and shift left and supports iterative development.`,
      `测试驱动开发（test-driven development，TDD）是一种先编写（并自动化）测试用例、再增量开发软件以通过这些测试的开发技术。大纲描述 TDD：通过测试用例（而非大量软件设计）引导编码；先写测试，再写满足测试的代码，然后重构测试和代码。TDD 体现了尽早测试和左移原则，支持迭代开发模型。`,
    ),
    example: l(
      `Dev viết unit test "phí ship = 0 khi đơn ≥ 500.000đ" (test đỏ vì chưa có code), viết hàm tính phí cho test xanh, rồi refactor; lặp lại cho quy tắc tiếp theo.`,
      `A developer writes the unit test "shipping is free when the order ≥ 500,000" (red, no code yet), writes the fee function to make it green, then refactors; repeat for the next rule.`,
      `开发人员先写单元测试"订单 ≥ 500,000 时免运费"（无代码故失败），再编写运费函数使测试通过，然后重构；对下一条规则重复此过程。`,
    ),
    confusedWith: [
      {
        id: 'acceptance-test-driven-development',
        note: l(
          `TDD do dev thực hiện ở mức code/component; ATDD xuất phát từ tiêu chí chấp nhận của user story, test được cả nhóm (khách hàng, dev, tester) viết trước khi phát triển.`,
          `TDD is done by developers at code/component level; ATDD starts from user story acceptance criteria, with tests written by the whole team (customers, developers, testers) before development.`,
          `TDD 由开发人员在代码/组件层面进行；ATDD 从用户故事的验收准则出发，由整个团队（客户、开发、测试）在开发前编写测试。`,
        ),
      },
      {
        id: 'behavior-driven-development',
        note: l(
          `BDD diễn đạt hành vi mong muốn bằng ngôn ngữ tự nhiên dễ hiểu cho stakeholder (Given/When/Then), sau đó chuyển thành test chạy được; TDD dùng test code kỹ thuật.`,
          `BDD expresses desired behavior in natural language understandable to stakeholders (Given/When/Then), then turns it into executable tests; TDD uses technical test code.`,
          `BDD 用干系人易懂的自然语言（Given/When/Then）描述期望行为，再转为可执行测试；TDD 使用技术性的测试代码。`,
        ),
      },
    ],
    versionNote: l(
      `Glossary v4.8.1 nhấn mạnh test case được "phát triển, tự động hóa" rồi phần mềm phát triển dần để vượt qua; syllabus v4.0.1 nhấn mạnh chu trình viết test → viết code → refactor test và code, và không nói rõ test phải được tự động hóa.`,
      `The v4.8.1 glossary stresses test cases being "developed, automated" before incremental development; the v4.0.1 syllabus stresses the cycle write tests → write code → refactor tests and code, and does not explicitly require automation.`,
      `v4.8.1 术语表强调测试用例先"开发并自动化"，然后增量开发软件；v4.0.1 大纲强调"写测试 → 写代码 → 重构测试和代码"的循环，并未明确要求自动化。`,
    ),
  },

  testability: {
    explanation: l(
      `Khả năng kiểm thử (testability) là mức độ có thể thiết lập test condition cho thành phần/hệ thống và thực hiện test để xác định các điều kiện đó có được đáp ứng hay không. Syllabus nói trong test analysis, test basis và test object được đánh giá để xác định testability; static testing cũng đánh giá testability của sản phẩm công việc (ví dụ user story có tiêu chí chấp nhận kiểm thử được hay không).`,
      `Testability is the degree to which test conditions can be established for a component or system and tests performed to determine whether they are met. The syllabus says test analysis evaluates the test basis and test object for testability, and static testing assesses work products' testability (e.g., whether a user story has testable acceptance criteria).`,
      `可测试性（testability）是能为组件或系统建立测试条件、并执行测试以判断这些条件是否满足的程度。大纲指出，测试分析会评估测试依据和测试对象的可测试性；静态测试也会评估工作产品的可测试性（如用户故事是否有可测试的验收准则）。`,
    ),
    example: l(
      `Yêu cầu "trang phải tải nhanh" có testability thấp; tester đề nghị sửa thành "trang chủ tải xong trong 2 giây với 95% request ở 4G" để có thể đo được.`,
      `The requirement "the page must load fast" has low testability; the tester proposes "the home page loads within 2 s for 95% of requests on 4G" so it can be measured.`,
      `需求"页面必须加载快"的可测试性低；测试人员建议改为"在 4G 下 95% 的请求首页在 2 秒内加载完成"，以便可度量。`,
    ),
    confusedWith: [
      {
        id: 'maintainability',
        note: l(
          `Maintainability là mức độ dễ sửa đổi sản phẩm; testability (theo ISO 25010 là một đặc tính con của maintainability) chỉ tập trung vào việc có thể thiết lập và thực hiện test hay không.`,
          `Maintainability is how easily a product can be modified; testability (a sub-characteristic of maintainability in ISO 25010) focuses only on whether tests can be established and performed.`,
          `可维护性是产品被修改的难易程度；可测试性（ISO 25010 中为可维护性的子特性）只关注能否建立并执行测试。`,
        ),
      },
    ],
  },

  testing: {
    explanation: l(
      `Kiểm thử (testing) là quy trình trong vòng đời phát triển nhằm đánh giá chất lượng của thành phần/hệ thống và các sản phẩm công việc liên quan. Syllabus mô tả kiểm thử là tập hoạt động để phát hiện defect và đánh giá chất lượng, gồm cả kiểm thử tĩnh và động, cả verification lẫn validation; không chỉ là chạy test mà còn lập kế hoạch, quản lý, giám sát. Testing là một hình thức kiểm soát chất lượng (quality control), hướng sản phẩm và mang tính khắc phục.`,
      `Testing is the process within the SDLC that evaluates the quality of a component or system and related work products. The syllabus describes it as a set of activities to discover defects and evaluate quality, covering static and dynamic testing, verification and validation; it is not only running tests but also planning, managing and monitoring. Testing is a form of quality control: product-oriented and corrective.`,
      `测试（testing）是软件开发生命周期中评估组件或系统及相关工作产品质量的过程。大纲将其描述为发现缺陷并评估质量的一组活动，涵盖静态和动态测试、验证与确认；不只是执行测试，还包括策划、管理和监控。测试是质量控制的一种形式，面向产品、具有纠正性。`,
    ),
    example: l(
      `Testing trong dự án không chỉ là chạy test trước release: còn gồm review user story, viết test plan, theo dõi tiến độ và báo cáo chất lượng cho PO.`,
      `Testing on a project is not just running tests before release: it also includes reviewing user stories, writing the test plan, tracking progress and reporting quality to the PO.`,
      `项目中的测试不仅是发布前执行测试，还包括评审用户故事、编写测试计划、跟踪进度并向产品负责人报告质量。`,
    ),
    confusedWith: [
      {
        id: 'quality-assurance',
        note: l(
          `Testing hướng sản phẩm, mang tính khắc phục (một dạng quality control); QA hướng quy trình, mang tính phòng ngừa và là trách nhiệm của mọi người trong dự án.`,
          `Testing is product-oriented and corrective (a form of quality control); QA is process-oriented, preventive and everyone's responsibility.`,
          `测试面向产品、具有纠正性（质量控制的一种形式）；质量保证面向过程、具有预防性，是项目中每个人的责任。`,
        ),
      },
      {
        id: 'debugging',
        note: l(
          `Testing phát hiện failure/defect; debugging là hoạt động phát triển tìm nguyên nhân, phân tích và sửa defect.`,
          `Testing reveals failures and defects; debugging is the development activity that finds, analyzes and fixes their causes.`,
          `测试揭示失效和缺陷；调试是查找、分析并修复其原因的开发活动。`,
        ),
      },
    ],
    versionNote: l(
      `Glossary v4.8.1 định nghĩa testing là "quy trình... đánh giá chất lượng" mà không nhắc việc phát hiện defect; syllabus v4.0.1 nêu rõ testing là "tập hoạt động để phát hiện defect và đánh giá chất lượng".`,
      `The v4.8.1 glossary defines testing as "the process… that evaluates quality" without mentioning defect discovery; the v4.0.1 syllabus explicitly says testing is "a set of activities to discover defects and evaluate the quality".`,
      `v4.8.1 术语表将测试定义为"评估质量的过程"，未提及发现缺陷；v4.0.1 大纲明确称测试是"发现缺陷并评估质量的一组活动"。`,
    ),
  },

  testware: {
    explanation: l(
      `Testware là các sản phẩm công việc được tạo ra trong quy trình kiểm thử, dùng để lập kế hoạch, thiết kế, thực thi, đánh giá và báo cáo kiểm thử. Syllabus liệt kê testware theo từng hoạt động: test plan, test schedule, risk register (planning); test progress report (monitoring/control); test condition (analysis); test case, test charter, coverage item (design); test procedure, script, suite, test data, môi trường (implementation); test log, defect report (execution); test completion report, bài học kinh nghiệm (completion). Cần quản lý cấu hình (configuration management) cho testware.`,
      `Testware is the work products produced during the test process for planning, designing, executing, evaluating and reporting on testing. The syllabus lists it by activity: test plan, schedule, risk register (planning); progress reports (monitoring/control); test conditions (analysis); test cases, charters, coverage items (design); procedures, scripts, suites, test data, environment items (implementation); test logs, defect reports (execution); completion report, lessons learned (completion). Configuration management keeps testware consistent.`,
      `测试件（testware）是测试过程中为策划、设计、执行、评估和报告测试而产生的工作产品。大纲按活动列出：测试计划、进度、风险登记册（策划）；进度报告（监控与控制）；测试条件（分析）；测试用例、章程、覆盖项（设计）；规程、脚本、套件、测试数据、环境项（实现）；测试日志、缺陷报告（执行）；完成报告、经验教训（完成）。配置管理确保测试件的一致性和完整性。`,
    ),
    example: l(
      `Khi bàn giao dự án cho nhóm bảo trì, QA đưa lên Git: bộ test tự động, file test case Excel, script tạo dữ liệu và báo cáo hoàn thành — tất cả là testware.`,
      `When handing over to the maintenance team, QA commits the automated suite, test case spreadsheets, data-generation scripts and the completion report — all testware.`,
      `向维护团队移交时，QA 将自动化测试集、测试用例表格、数据生成脚本和完成报告提交到 Git——这些都是测试件。`,
    ),
  },

  traceability: {
    explanation: l(
      `Khả năng truy vết (traceability) là khả năng thiết lập quan hệ rõ ràng giữa các sản phẩm công việc liên quan. Theo syllabus, cần duy trì truy vết giữa test basis, testware (test condition, rủi ro, test case), kết quả kiểm thử và defect để: đánh giá coverage (yêu cầu nào đã có test), đánh giá rủi ro còn lại, phân tích ảnh hưởng khi thay đổi, hỗ trợ audit, và làm báo cáo dễ hiểu hơn.`,
      `Traceability is the ability to establish explicit relationships between related work products. Per the syllabus, traceability between the test basis, testware (test conditions, risks, test cases), test results and defects supports coverage evaluation, residual risk assessment, change impact analysis, audits and clearer reports.`,
      `可追溯性（traceability）是在相关工作产品之间建立明确关系的能力。按大纲所述，在测试依据、测试件（测试条件、风险、测试用例）、测试结果和缺陷之间保持可追溯性，可支持覆盖率评估、剩余风险评估、变更影响分析、审计，并使报告更易理解。`,
    ),
    example: l(
      `Khi yêu cầu REQ-45 "giới hạn chuyển tiền" thay đổi, ma trận truy vết cho thấy ngay 7 test case và 2 bug liên quan cần cập nhật và test lại.`,
      `When requirement REQ-45 "transfer limit" changes, the traceability matrix immediately shows 7 test cases and 2 bugs that must be updated and retested.`,
      `当需求 REQ-45"转账限额"变更时，追溯矩阵立即显示需要更新并重新测试的 7 个测试用例和 2 个缺陷。`,
    ),
    confusedWith: [
      {
        id: 'traceability-matrix',
        note: l(
          `Traceability là khả năng/khái niệm; traceability matrix là một công cụ (bảng 2 chiều) để thể hiện mối quan hệ đó.`,
          `Traceability is the ability/concept; a traceability matrix is one tool (a two-dimensional table) to record those relationships.`,
          `可追溯性是一种能力/概念；追溯矩阵是记录这些关系的工具（二维表）。`,
        ),
      },
      {
        id: 'coverage',
        note: l(
          `Coverage là mức độ (%) các coverage item được kiểm thử thực hiện; traceability là phương tiện giúp đo coverage (ví dụ yêu cầu nào đã có test case).`,
          `Coverage is the degree (%) to which coverage items are exercised; traceability is the means that helps measure it (e.g., which requirements have test cases).`,
          `覆盖率是覆盖项被测试执行的程度（%）；可追溯性是帮助度量覆盖率的手段（如哪些需求已有测试用例）。`,
        ),
      },
    ],
  },

  'unit-test-framework': {
    explanation: l(
      `Khung kiểm thử đơn vị (unit test framework) là công cụ cung cấp môi trường để kiểm thử một unit (thành phần) một cách cô lập, ví dụ JUnit, NUnit, pytest, Jest. Syllabus nói component testing thường cần hỗ trợ đặc biệt như test harness hoặc unit test framework, và thường do dev thực hiện trong môi trường phát triển.`,
      `A unit test framework is a tool providing an environment to test a unit (component) in isolation, e.g., JUnit, NUnit, pytest, Jest. The syllabus says component testing often requires specific support such as test harnesses or unit test frameworks and is usually done by developers in their development environments.`,
      `单元测试框架（unit test framework）是提供隔离测试单元（组件）环境的工具，如 JUnit、NUnit、pytest、Jest。大纲指出，组件测试通常需要测试工具集或单元测试框架等特定支持，一般由开发人员在开发环境中执行。`,
    ),
    example: l(
      `Dev dùng Jest viết 40 unit test cho hàm tính thuế TNCN, mock module đọc bảng thuế suất, và chạy chúng tự động mỗi lần commit.`,
      `A developer uses Jest to write 40 unit tests for the personal income tax function, mocking the tax-rate table module, and runs them automatically on every commit.`,
      `开发人员用 Jest 为个人所得税计算函数编写 40 个单元测试，模拟读取税率表的模块，并在每次提交时自动运行。`,
    ),
    confusedWith: [
      {
        id: 'test-harness',
        note: l(
          `Unit test framework là công cụ có sẵn dùng chung; test harness là tập driver và test double cụ thể dựng cho test suite của bạn.`,
          `A unit test framework is a general reusable tool; a test harness is the specific drivers and test doubles built for your suite.`,
          `单元测试框架是通用的可复用工具；测试工具集是为你的测试套件搭建的具体驱动和测试替身。`,
        ),
      },
      {
        id: 'test-automation-framework',
        note: l(
          `Unit test framework phục vụ test cô lập ở mức component; test automation framework rộng hơn, hỗ trợ tự động hóa test ở nhiều mức (UI, API, end-to-end).`,
          `A unit test framework serves isolated component-level tests; a test automation framework is broader, supporting automation at many levels (UI, API, end-to-end).`,
          `单元测试框架服务于组件级隔离测试；测试自动化框架范围更广，支持多个级别（UI、API、端到端）的自动化。`,
        ),
      },
    ],
  },

  usability: {
    explanation: l(
      `Khả năng sử dụng (usability) là mức độ người dùng xác định có thể dùng thành phần/hệ thống để đạt mục tiêu xác định trong ngữ cảnh sử dụng xác định. Syllabus liệt kê usability (còn gọi interaction capability) trong các đặc tính phi chức năng ISO/IEC 25010, nói usability nên được kiểm thử trên hệ thống hoàn chỉnh trong môi trường đại diện, và có thể cần môi trường đặc biệt như phòng thí nghiệm usability (usability lab).`,
      `Usability is the degree to which specified users can use a component or system to achieve specified goals in a specified context of use. The syllabus lists usability (also known as interaction capability) among the ISO/IEC 25010 non-functional characteristics, notes it is best tested on a complete system in a representative environment, and that it may need a usability lab.`,
      `易用性（usability）是特定用户在特定使用环境中使用组件或系统实现特定目标的程度。大纲将易用性（又称交互能力，interaction capability）列为 ISO/IEC 25010 的非功能特性之一，指出它最好在代表性环境中的完整系统上测试，并可能需要易用性实验室。`,
    ),
    example: l(
      `Mời 6 người lớn tuổi dùng thử app khám bệnh: đo thời gian đặt lịch, số lần bấm nhầm, và xem họ có tìm được nút "Hủy lịch" không.`,
      `Six elderly users try a clinic-booking app: measure time to book, number of mis-taps, and whether they can find the "Cancel appointment" button.`,
      `邀请 6 位老年用户试用挂号应用：测量预约所需时间、误触次数，并观察他们能否找到"取消预约"按钮。`,
    ),
    confusedWith: [
      {
        id: 'user-experience',
        note: l(
          `Usability đo việc đạt mục tiêu (hiệu quả, hiệu suất, hài lòng) khi sử dụng; user experience rộng hơn, gồm cảm nhận và phản ứng của người dùng trước, trong và sau khi dùng.`,
          `Usability measures achieving goals (effectiveness, efficiency, satisfaction) during use; user experience is broader, covering users' perceptions and responses before, during and after use.`,
          `易用性衡量使用中实现目标的情况（有效性、效率、满意度）；用户体验更广，涵盖用户在使用前、中、后的感受和反应。`,
        ),
      },
      {
        id: 'accessibility',
        note: l(
          `Accessibility tập trung vào việc người dùng có đặc điểm/khả năng đa dạng (ví dụ khiếm thị) có dùng được không; usability xét người dùng xác định nói chung.`,
          `Accessibility focuses on use by people with the widest range of characteristics and capabilities (e.g., visually impaired users); usability concerns specified users in general.`,
          `可访问性（accessibility）关注具有各种特征和能力的人（如视障用户）能否使用；易用性关注一般的特定用户。`,
        ),
      },
    ],
    versionNote: l(
      `Syllabus v4.0.1 ghi "Usability (also known as interaction capability)", theo cách ISO/IEC 25010 bản mới đổi tên đặc tính này. Glossary v4.8.1 giữ thuật ngữ usability và tham chiếu tới interaction capability như một thuật ngữ riêng (see also).`,
      `The v4.0.1 syllabus writes "Usability (also known as interaction capability)", reflecting the renaming in the newer ISO/IEC 25010. The v4.8.1 glossary keeps "usability" and points to "interaction capability" as a separate term (see also).`,
      `v4.0.1 大纲写作"Usability（also known as interaction capability）"，反映了新版 ISO/IEC 25010 对该特性的更名。v4.8.1 术语表保留"usability"，并将"interaction capability"作为单独术语（参见）引用。`,
    ),
  },

  'user-acceptance-testing': {
    explanation: l(
      `Kiểm thử chấp nhận người dùng (user acceptance testing, UAT) là một dạng kiểm thử chấp nhận nhằm xác định người dùng dự kiến có chấp nhận hệ thống hay không. Syllabus liệt kê UAT là một hình thức chính của acceptance testing (cùng operational, contractual, regulatory acceptance testing, alpha và beta testing); acceptance testing tập trung vào validation và chứng minh sẵn sàng triển khai, lý tưởng do người dùng dự kiến thực hiện.`,
      `User acceptance testing (UAT) is a type of acceptance testing to determine whether intended users accept the system. The syllabus lists UAT as a main form of acceptance testing (with operational, contractual and regulatory acceptance testing, alpha and beta testing); acceptance testing focuses on validation and readiness for deployment, ideally performed by intended users.`,
      `用户验收测试（user acceptance testing，UAT）是一种验收测试，用于确定预期用户是否接受系统。大纲将 UAT 列为验收测试的主要形式之一（另有运行验收、合同验收、法规验收测试以及 alpha、beta 测试）；验收测试侧重确认和证明可部署，理想情况下由预期用户执行。`,
    ),
    example: l(
      `Trước khi chuyển sang phần mềm nhân sự mới, 5 nhân viên phòng HR chạy thử quy trình tính lương tháng 9 trên môi trường UAT và ký biên bản chấp nhận.`,
      `Before switching to new HR software, 5 HR staff run September's payroll process on the UAT environment and sign the acceptance record.`,
      `在切换到新人事软件之前，5 名人力资源员工在 UAT 环境中试运行 9 月份的工资核算流程并签署验收记录。`,
    ),
    confusedWith: [
      {
        id: 'acceptance-testing',
        note: l(
          `Acceptance testing là mức kiểm thử bao trùm; UAT chỉ là một dạng của nó, do người dùng cuối thực hiện (các dạng khác: operational, contractual, regulatory, alpha, beta).`,
          `Acceptance testing is the overall test level; UAT is one form of it, done by end users (others: operational, contractual, regulatory, alpha, beta).`,
          `验收测试是总的测试级别；UAT 只是其中由最终用户执行的一种形式（其他：运行、合同、法规、alpha、beta）。`,
        ),
      },
      {
        id: 'operational-acceptance-testing',
        note: l(
          `UAT do người dùng nghiệp vụ kiểm tra hệ thống có đáp ứng nhu cầu sử dụng; operational acceptance testing do nhóm vận hành kiểm tra sao lưu, phục hồi, cài đặt, giám sát…`,
          `UAT is business users checking that the system meets their needs; operational acceptance testing is operations staff checking backup, recovery, installation, monitoring…`,
          `UAT 由业务用户检查系统是否满足使用需求；运行验收测试由运维人员检查备份、恢复、安装、监控等。`,
        ),
      },
    ],
  },

  'v-model': {
    explanation: l(
      `Mô hình chữ V (V-model) là mô hình SDLC tuần tự, mô tả quan hệ một-một giữa các giai đoạn phát triển chính (từ đặc tả yêu cầu nghiệp vụ đến chuyển giao) và các mức kiểm thử tương ứng (từ acceptance testing đến component testing). Syllabus nêu V-model là ví dụ mô hình phát triển tuần tự; trong mô hình tuần tự, tester tham gia review yêu cầu, test analysis và test design từ sớm, nhưng dynamic testing thường chỉ làm được ở giai đoạn sau.`,
      `The V-model is a sequential SDLC model describing a one-for-one relationship between major development phases (from business requirements specification to delivery) and corresponding test levels (from acceptance testing to component testing). The syllabus gives it as an example of a sequential model; in such models testers take part early in requirement reviews, test analysis and design, but dynamic testing usually happens only later.`,
      `V 模型（V-model）是一种顺序型 SDLC 模型，描述主要开发阶段（从业务需求规格到交付）与相应测试级别（从验收测试到组件测试）之间一一对应的关系。大纲将其作为顺序开发模型的示例；在此类模型中，测试人员早期参与需求评审、测试分析和设计，但动态测试通常只能在后期进行。`,
    ),
    example: l(
      `Dự án chính phủ điện tử: đặc tả yêu cầu nghiệp vụ ↔ acceptance testing, đặc tả hệ thống ↔ system testing, thiết kế kiến trúc ↔ integration testing, thiết kế chi tiết ↔ component testing; test plan UAT được viết ngay khi yêu cầu được duyệt.`,
      `An e-government project: business requirements ↔ acceptance testing, system specification ↔ system testing, architecture ↔ integration testing, detailed design ↔ component testing; the UAT plan is written as soon as requirements are approved.`,
      `电子政务项目：业务需求规格 ↔ 验收测试，系统规格 ↔ 系统测试，架构设计 ↔ 集成测试，详细设计 ↔ 组件测试；需求一经批准就开始编写 UAT 计划。`,
    ),
    confusedWith: [
      {
        id: 'iterative-development-model',
        note: l(
          `V-model là tuần tự: mỗi giai đoạn làm một lần, code chạy được xuất hiện muộn; mô hình lặp giao bản chạy được mỗi vòng lặp nên test tĩnh và động có thể làm ở mọi mức trong mỗi vòng.`,
          `The V-model is sequential: each phase happens once and executable code comes late; iterative models deliver a working increment each iteration, so static and dynamic testing can occur at all levels every iteration.`,
          `V 模型是顺序的：每个阶段只进行一次，可执行代码出现较晚；迭代模型每次迭代都交付可运行的增量，因此每次迭代都可在所有级别进行静态和动态测试。`,
        ),
      },
    ],
  },

  validation: {
    explanation: l(
      `Xác nhận (validation) là việc xác nhận bằng kiểm tra rằng sản phẩm công việc đáp ứng nhu cầu của stakeholder. Syllabus phân biệt: verification kiểm tra hệ thống có đáp ứng yêu cầu đã đặc tả không; validation kiểm tra hệ thống có đáp ứng nhu cầu của người dùng và stakeholder khác trong môi trường vận hành không. Static testing có thể dùng cho cả hai; acceptance testing tập trung vào validation.`,
      `Validation is confirmation by examination that a work product matches a stakeholder's needs. The syllabus distinguishes: verification checks whether the system meets specified requirements; validation checks whether it meets users' and other stakeholders' needs in its operational environment. Static testing can serve both; acceptance testing focuses on validation.`,
      `确认（validation）是通过检查确认工作产品符合干系人的需要。大纲区分：验证（verification）检查系统是否满足规定的需求；确认检查系统在运行环境中是否满足用户和其他干系人的需要。静态测试可用于两者；验收测试侧重于确认。`,
    ),
    example: l(
      `App đáp ứng đúng 100% đặc tả (verification đạt), nhưng khi tài xế dùng thử ngoài trời nắng, màn hình quá tối và nút quá nhỏ khi đeo găng — validation cho thấy nó chưa đáp ứng nhu cầu thực.`,
      `The app meets 100% of its specification (verification passes), but when drivers try it in bright sunlight the screen is too dark and buttons too small for gloved hands — validation shows it does not meet real needs.`,
      `应用 100% 符合规格说明（验证通过），但司机在强烈阳光下试用时屏幕太暗、戴手套时按钮太小——确认表明它尚未满足真实需要。`,
    ),
    confusedWith: [
      {
        id: 'verification',
        note: l(
          `Verification: "làm sản phẩm đúng cách?" — so với yêu cầu đã đặc tả. Validation: "làm đúng sản phẩm?" — so với nhu cầu thực của stakeholder.`,
          `Verification: "are we building the product right?" — against specified requirements. Validation: "are we building the right product?" — against stakeholders' real needs.`,
          `验证："产品做得对吗？"——对照规定的需求。确认："做的是对的产品吗？"——对照干系人的真实需要。`,
        ),
      },
    ],
  },
};
