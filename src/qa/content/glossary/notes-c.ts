import type { TermNotes } from '../../types';

// Explanations, examples and confusable terms (written for this app, supplementary), by term id.
export const NOTES_C: Record<string, TermNotes> = {
  verification: {
    explanation: {
      vi: `Kiểm chứng (verification) là xác nhận sản phẩm công việc có đáp ứng đúng đặc tả của nó hay không — câu hỏi "làm có đúng như đã mô tả không?". Syllabus nhấn mạnh kiểm thử không chỉ là verification mà còn gồm validation, và kiểm thử tĩnh (static testing) cũng dùng được cho cả hai.`,
      en: `Verification confirms that a work product fulfills its specification — "did we build it as specified?". The syllabus stresses that testing involves verification but also validation, and that static testing can be applied for both.`,
      zh: `验证 (verification) 是确认工作产品是否满足其规格说明——“是否按规格做对了？”。大纲强调测试既包括验证，也包括确认 (validation)；静态测试同样可用于两者。`,
    },
    example: {
      vi: `Đặc tả yêu cầu: mật khẩu tối thiểu 8 ký tự. Tester chạy test với mật khẩu 7 và 8 ký tự để kiểm chứng hệ thống làm đúng như đặc tả.`,
      en: `The specification says passwords need at least 8 characters. The tester runs tests with 7- and 8-character passwords to verify the system behaves as specified.`,
      zh: `规格说明要求密码至少 8 个字符。测试人员用 7 位和 8 位密码执行测试，验证系统是否符合规格。`,
    },
    confusedWith: [
      {
        id: 'validation',
        note: {
          vi: `Verification: đúng với đặc tả/yêu cầu đã ghi ("build the product right"). Validation: đáp ứng nhu cầu thực của người dùng và các bên liên quan trong môi trường vận hành ("build the right product").`,
          en: `Verification: conforms to the specification/specified requirements ("built right"). Validation: meets users' and stakeholders' needs in the operational environment ("right product").`,
          zh: `验证：符合规格/既定需求（“正确地做产品”）。确认：在运行环境中满足用户和干系人的实际需要（“做正确的产品”）。`,
        },
      },
    ],
  },

  'white-box-testing': {
    explanation: {
      vi: `Kiểm thử hộp trắng (white-box testing) thiết kế test dựa trên cấu trúc bên trong của thành phần/hệ thống: mã nguồn, kiến trúc, luồng công việc, luồng dữ liệu. Mục tiêu chính là bao phủ (cover) cấu trúc bên dưới đến mức chấp nhận được. Có thể áp dụng ở mọi cấp kiểm thử (test level).`,
      en: `White-box testing derives tests from the internal structure of a component or system — code, architecture, workflows, data flows. Its main objective is to cover the underlying structure to an acceptable level. It can be applied at all test levels.`,
      zh: `白盒测试 (white-box testing) 依据组件或系统的内部结构（代码、架构、工作流、数据流）设计测试，主要目标是使测试对内部结构的覆盖达到可接受的程度。可应用于所有测试级别。`,
    },
    example: {
      vi: `Developer xem báo cáo coverage thấy nhánh xử lý "hết hạn token" chưa được chạy, liền viết thêm unit test để bao phủ nhánh đó.`,
      en: `A developer sees in the coverage report that the "token expired" branch was never executed and adds a unit test for it.`,
      zh: `开发人员在覆盖率报告中发现“令牌过期”分支从未执行，于是补充单元测试覆盖它。`,
    },
    confusedWith: [
      {
        id: 'white-box-test-technique',
        note: {
          vi: `White-box testing là loại kiểm thử/cách tiếp cận nói chung; white-box test technique là kỹ thuật cụ thể để thiết kế test (vd. statement testing, branch testing).`,
          en: `White-box testing is the overall test type/approach; a white-box test technique is a specific design technique (e.g., statement testing, branch testing).`,
          zh: `白盒测试是总体的测试类型/方法；白盒测试技术是具体的设计技术（如语句测试、分支测试）。`,
        },
      },
      {
        id: 'black-box-testing',
        note: {
          vi: `Black-box testing dựa trên đặc tả, không nhìn vào cấu trúc bên trong; white-box dựa trên cấu trúc/mã nguồn.`,
          en: `Black-box testing is specification-based without reference to internal structure; white-box is structure-based.`,
          zh: `黑盒测试基于规格说明，不考虑内部结构；白盒测试基于内部结构/代码。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary v4.8.1 định nghĩa white-box testing là một "test approach", còn syllabus v4.0.1 (mục 2.2.2) xếp nó vào một trong bốn "test type" (cùng functional, non-functional, black-box).`,
      en: `Glossary v4.8.1 calls white-box testing a "test approach", while syllabus v4.0.1 (section 2.2.2) presents it as one of four test types (with functional, non-functional and black-box testing).`,
      zh: `术语表 v4.8.1 将白盒测试定义为一种“测试方法 (test approach)”，而大纲 v4.0.1（2.2.2 节）将其列为四种测试类型之一（与功能、非功能、黑盒测试并列）。`,
    },
  },

  'test-oracle': {
    explanation: {
      vi: `Test oracle (nguồn tiên đoán kết quả) là bất kỳ nguồn nào giúp xác định kết quả mong đợi (expected result) để so với kết quả thực tế: đặc tả, user story, hệ thống cũ, chuyên gia nghiệp vụ, mô hình tính toán… Không có oracle thì không biết test pass hay fail.`,
      en: `A test oracle is any source used to determine the expected result to compare with the actual result: specifications, user stories, a legacy system, a domain expert, a calculation model, etc. Without an oracle you cannot decide pass or fail.`,
      zh: `测试预言 (test oracle) 是用来确定预期结果、以便与实际结果比较的任何来源：规格说明、用户故事、旧系统、领域专家、计算模型等。没有测试预言就无法判断通过或失败。`,
    },
    example: {
      vi: `Khi kiểm thử module tính thuế mới, team dùng hệ thống tính thuế cũ đang chạy làm test oracle: cùng dữ liệu đầu vào thì kết quả phải khớp.`,
      en: `When testing a new tax calculation module, the team uses the old production system as the oracle: same inputs must give the same results.`,
      zh: `测试新的计税模块时，团队把现行旧系统作为测试预言：相同输入应得到相同结果。`,
    },
    confusedWith: [
      {
        id: 'expected-result',
        note: {
          vi: `Expected result là giá trị/hành vi mong đợi cụ thể của một test case; test oracle là nguồn dùng để suy ra expected result đó.`,
          en: `The expected result is the specific predicted outcome of a test case; the test oracle is the source from which it is derived.`,
          zh: `预期结果是某个测试用例具体的预期输出；测试预言是推导出预期结果的来源。`,
        },
      },
      {
        id: 'test-basis',
        note: {
          vi: `Test basis là tài liệu/kiến thức làm cơ sở cho phân tích và thiết kế test; nó thường đồng thời là oracle, nhưng oracle cũng có thể là thứ khác (hệ thống cũ, chuyên gia).`,
          en: `The test basis is the body of knowledge used for test analysis and design; it often serves as the oracle, but an oracle can also be something else (legacy system, expert).`,
          zh: `测试依据是测试分析与设计所依据的知识；它常兼作测试预言，但预言也可以是其他来源（旧系统、专家）。`,
        },
      },
    ],
  },

  'acceptance-test-driven-development': {
    explanation: {
      vi: `Phát triển hướng kiểm thử chấp nhận (ATDD – acceptance test-driven development) là cách tiếp cận test-first dựa trên cộng tác: khách hàng, developer và tester cùng viết test chấp nhận từ tiêu chí chấp nhận (acceptance criteria) trước khi hiện thực user story. Test viết bằng ngôn ngữ nghiệp vụ mà các bên hiểu được; bắt đầu bằng test tích cực, rồi tiêu cực, rồi phi chức năng. Nếu viết theo định dạng mà test automation framework hỗ trợ, chúng trở thành yêu cầu có thể thực thi.`,
      en: `ATDD is a collaboration-based test-first approach: customers, developers and testers define acceptance tests from the acceptance criteria before the user story is implemented, in language the stakeholders understand. Typically positive tests come first, then negative, then non-functional. In a format supported by a test automation framework they become executable requirements.`,
      zh: `验收测试驱动开发 (ATDD) 是基于协作的测试先行方法：客户、开发和测试人员在实现用户故事之前，根据验收准则用干系人能理解的业务语言编写验收测试。通常先写正向用例，再写负向用例，最后覆盖非功能特性。若采用测试自动化框架支持的格式，它们就成为可执行的需求。`,
    },
    example: {
      vi: `Trong buổi specification workshop cho story "Chuyển khoản", team thống nhất: "Cho số dư 1.000.000đ, khi chuyển 1.200.000đ, thì hiển thị lỗi 'Số dư không đủ'". Kịch bản này được tự động hóa trước khi code xong.`,
      en: `In a specification workshop for the "Transfer money" story the team agrees: "Given a balance of 1,000, when transferring 1,200, then 'Insufficient funds' is shown". The scenario is automated before coding is done.`,
      zh: `在“转账”故事的规格研讨会上，团队约定：“余额 1000，转账 1200 时，显示‘余额不足’”。该场景在编码完成前即被自动化。`,
    },
    confusedWith: [
      {
        id: 'test-driven-development',
        note: {
          vi: `TDD: developer viết unit test ở mức mã trước khi code. ATDD: cả team viết test chấp nhận từ acceptance criteria ở mức nghiệp vụ.`,
          en: `TDD: developers write code-level (unit) tests before coding. ATDD: the whole team writes business-level acceptance tests from acceptance criteria.`,
          zh: `TDD：开发人员在编码前编写代码级（单元）测试。ATDD：整个团队根据验收准则编写业务级验收测试。`,
        },
      },
      {
        id: 'behavior-driven-development',
        note: {
          vi: `BDD mô tả hành vi mong muốn, thường dùng cú pháp Given/When/Then; ATDD tập trung vào test chấp nhận của user story. Hai cách rất gần nhau và hay dùng chung.`,
          en: `BDD expresses desired behavior, often in Given/When/Then; ATDD focuses on the acceptance tests of a user story. They are closely related and often combined.`,
          zh: `BDD 描述期望行为，常用 Given/When/Then 格式；ATDD 聚焦于用户故事的验收测试。两者非常接近，常结合使用。`,
        },
      },
    ],
  },

  anomaly: {
    explanation: {
      vi: `Bất thường (anomaly) là bất kỳ điều kiện nào lệch khỏi mong đợi. Syllabus nhấn mạnh anomaly chưa chắc là defect: sau khi phân tích có thể là lỗi thật, false positive, hay change request. Trong review, reviewer ghi nhận anomaly; trong defect management, anomaly được log rồi phân tích, phân loại.`,
      en: `An anomaly is any condition that deviates from expectation. The syllabus stresses it is not necessarily a defect: analysis may show a real defect, a false positive, or a change request. Reviewers log anomalies; defect management logs, analyzes and classifies them.`,
      zh: `异常 (anomaly) 是任何偏离预期的情况。大纲强调异常不一定是缺陷：分析后可能是真实缺陷、误报或变更请求。评审中由评审员记录异常；缺陷管理中对其登记、分析和分类。`,
    },
    example: {
      vi: `Tester thấy báo cáo doanh thu hiển thị số âm và log lại. Khi phân tích, BA xác nhận đây là hành vi đúng (hoàn tiền) → anomaly được đóng với trạng thái "rejected", không phải defect.`,
      en: `A tester logs that the revenue report shows a negative value. On analysis the BA confirms it is correct (refunds) — the anomaly is closed as "rejected", not a defect.`,
      zh: `测试人员发现营收报表出现负数并记录。分析后业务分析师确认这是正确行为（退款），该异常以“拒绝”关闭，并非缺陷。`,
    },
    confusedWith: [
      {
        id: 'defect',
        note: {
          vi: `Defect là khiếm khuyết thật trong sản phẩm; anomaly chỉ là điều quan sát được lệch mong đợi, cần phân tích mới biết có phải defect không.`,
          en: `A defect is a real flaw in the work product; an anomaly is an observed deviation that must be analyzed to know whether it is a defect.`,
          zh: `缺陷是工作产品中真实存在的瑕疵；异常只是观察到的偏离，需要分析才能确定是否为缺陷。`,
        },
      },
      {
        id: 'failure',
        note: {
          vi: `Failure là sự kiện hệ thống không làm đúng khi chạy; anomaly rộng hơn, có thể phát hiện cả trong review (không chạy phần mềm).`,
          en: `A failure is an event where the running system does not behave as required; an anomaly is broader and can also be found in reviews without execution.`,
          zh: `失效是运行时系统未按要求工作的事件；异常范围更广，也可在不执行软件的评审中发现。`,
        },
      },
    ],
  },

  'black-box-test-technique': {
    explanation: {
      vi: `Kỹ thuật kiểm thử hộp đen (black-box test technique), còn gọi specification-based, dựa trên phân tích hành vi được đặc tả của đối tượng kiểm thử mà không xét cấu trúc bên trong. Vì test case độc lập với cách hiện thực, khi code thay đổi mà hành vi yêu cầu giữ nguyên thì test vẫn dùng được. CTFL gồm: EP, BVA, decision table testing, state transition testing.`,
      en: `Black-box (specification-based) test techniques analyze the specified behavior of the test object without reference to its internal structure. Test cases are independent of the implementation, so they stay useful if the code changes but required behavior does not. CTFL covers EP, BVA, decision table testing and state transition testing.`,
      zh: `黑盒测试技术（基于规格的技术）依据测试对象的规定行为进行分析，不涉及内部结构。测试用例与实现无关，实现变化而需求行为不变时用例仍然有效。CTFL 涵盖等价类划分、边界值分析、决策表测试和状态转换测试。`,
    },
    example: {
      vi: `Chỉ dựa vào tài liệu "Giảm 10% cho đơn từ 500.000đ", tester thiết kế test bằng EP và BVA mà không cần đọc code.`,
      en: `Using only the requirement "10% off for orders from 500", the tester designs tests with EP and BVA without reading the code.`,
      zh: `仅依据需求“订单满 500 打九折”，测试人员用等价类划分和边界值分析设计测试，无需阅读代码。`,
    },
    confusedWith: [
      {
        id: 'white-box-test-technique',
        note: {
          vi: `Black-box dựa trên đặc tả (làm gì); white-box dựa trên cấu trúc bên trong (làm thế nào) và chỉ tạo được sau khi có thiết kế/mã.`,
          en: `Black-box is based on the specification (what); white-box on internal structure (how) and can only be created after design/implementation.`,
          zh: `黑盒基于规格（做什么）；白盒基于内部结构（怎么做），只能在设计/实现之后创建。`,
        },
      },
      {
        id: 'experience-based-test-technique',
        note: {
          vi: `Experience-based dựa vào kinh nghiệm, kiến thức của tester, không cần đặc tả chi tiết; black-box dựa có hệ thống vào đặc tả.`,
          en: `Experience-based techniques rely on the tester's knowledge and experience; black-box techniques systematically use the specification.`,
          zh: `基于经验的技术依赖测试人员的知识与经验；黑盒技术系统地依据规格说明。`,
        },
      },
    ],
  },

  'boundary-value-analysis': {
    explanation: {
      vi: `Phân tích giá trị biên (BVA – boundary value analysis) kiểm thử các giá trị min/max của phân vùng tương đương, vì developer hay sai ở biên. Chỉ dùng được cho phân vùng có thứ tự. 2-value BVA: mỗi biên có 2 coverage item (giá trị biên và giá trị kề thuộc phân vùng bên cạnh). 3-value BVA: giá trị biên và cả hai giá trị kề — chặt hơn.`,
      en: `BVA exercises the minimum and maximum values of equivalence partitions, because developers often make errors at boundaries. It applies only to ordered partitions. 2-value BVA: two coverage items per boundary (the boundary and its closest neighbor in the adjacent partition). 3-value BVA: the boundary and both neighbors — more rigorous.`,
      zh: `边界值分析 (BVA) 测试等价类的最小值和最大值，因为开发人员常在边界出错，只适用于有序分区。二值 BVA：每个边界有两个覆盖项（边界值及相邻分区中最近的值）；三值 BVA：边界值及其两侧相邻值，更严格。`,
    },
    example: {
      vi: `Tuổi hợp lệ 18–60. 2-value BVA: 17, 18, 60, 61. 3-value BVA: 17, 18, 19, 59, 60, 61.`,
      en: `Valid age 18–60. 2-value BVA: 17, 18, 60, 61. 3-value BVA: 17, 18, 19, 59, 60, 61.`,
      zh: `有效年龄 18–60。二值 BVA：17、18、60、61；三值 BVA：17、18、19、59、60、61。`,
    },
    confusedWith: [
      {
        id: 'equivalence-partitioning',
        note: {
          vi: `EP chọn 1 giá trị đại diện bất kỳ cho mỗi phân vùng (kể cả phân vùng không có thứ tự); BVA chỉ tập trung vào giá trị ở biên của các phân vùng có thứ tự.`,
          en: `EP picks any one representative per partition (ordered or not); BVA targets the edge values of ordered partitions only.`,
          zh: `等价类划分为每个分区任选一个代表值（不论是否有序）；边界值分析只针对有序分区的边界值。`,
        },
      },
    ],
  },

  branch: {
    explanation: {
      vi: `Nhánh (branch) là một lần chuyển điều khiển giữa hai nút trong đồ thị luồng điều khiển (control flow graph). Nhánh có thể không điều kiện (code tuần tự) hoặc có điều kiện (kết quả true/false của if, một case của switch, quyết định thoát/tiếp tục vòng lặp).`,
      en: `A branch is a transfer of control between two nodes in the control flow graph. It can be unconditional (straight-line code) or conditional (a decision outcome: true/false of an if, a switch case, exiting or continuing a loop).`,
      zh: `分支 (branch) 是控制流图中两个节点之间的控制转移。可以是无条件的（顺序代码），也可以是有条件的（判定结果：if 的真/假、switch 的某个 case、循环继续或退出）。`,
    },
    example: {
      vi: `"if (tuoi >= 18) A; else B;" có 2 nhánh có điều kiện: true → A và false → B.`,
      en: `"if (age >= 18) A; else B;" has two conditional branches: true → A and false → B.`,
      zh: `“if (age >= 18) A; else B;” 有两个条件分支：真 → A，假 → B。`,
    },
    confusedWith: [
      {
        id: 'branch-coverage',
        note: {
          vi: `Branch là phần tử cấu trúc của code; branch coverage là tỷ lệ % các nhánh đã được test thực thi.`,
          en: `A branch is a structural element of the code; branch coverage is the percentage of branches exercised by tests.`,
          zh: `分支是代码的结构元素；分支覆盖是被测试执行的分支所占百分比。`,
        },
      },
    ],
  },

  'branch-coverage': {
    explanation: {
      vi: `Độ bao phủ nhánh (branch coverage) = số nhánh được test thực thi / tổng số nhánh × 100%. Đạt 100% nghĩa là mọi nhánh, có điều kiện và không điều kiện, đều được chạy. Branch coverage bao hàm (subsumes) statement coverage: 100% branch ⇒ 100% statement, nhưng không ngược lại.`,
      en: `Branch coverage = branches exercised / total branches, as a percentage. 100% means every branch, conditional and unconditional, was exercised. It subsumes statement coverage: 100% branch coverage implies 100% statement coverage, not vice versa.`,
      zh: `分支覆盖率 = 已执行分支数 / 分支总数（百分比）。100% 表示所有条件和无条件分支均已执行。分支覆盖包含语句覆盖：100% 分支覆盖必然 100% 语句覆盖，反之不成立。`,
    },
    example: {
      vi: `Hàm có 1 lệnh if không có else. Một test với điều kiện true đạt 100% statement coverage nhưng chỉ 50% branch coverage của quyết định đó; cần thêm test với điều kiện false.`,
      en: `A function has one if without else. One test with the condition true gives 100% statement coverage but covers only half of that decision's branches; a false test is also needed.`,
      zh: `某函数有一个不带 else 的 if。条件为真的一条测试即可达到 100% 语句覆盖，但只覆盖该判定一半的分支，还需条件为假的测试。`,
    },
    confusedWith: [
      {
        id: 'statement-coverage',
        note: {
          vi: `Statement coverage đo câu lệnh đã chạy; branch coverage đo nhánh đã chạy và mạnh hơn (có thể đạt 100% statement mà bỏ sót nhánh false của if không có else).`,
          en: `Statement coverage measures executed statements; branch coverage measures executed branches and is stronger (100% statements may still miss the false branch of an if without else).`,
          zh: `语句覆盖衡量已执行的语句；分支覆盖衡量已执行的分支，更强（100% 语句覆盖仍可能漏掉无 else 的 if 的假分支）。`,
        },
      },
      {
        id: 'branch-testing',
        note: {
          vi: `Branch testing là kỹ thuật thiết kế test; branch coverage là thước đo mức độ kỹ thuật đó đã đạt được.`,
          en: `Branch testing is the design technique; branch coverage is the measure of how far it was achieved.`,
          zh: `分支测试是设计技术；分支覆盖是该技术达成程度的度量。`,
        },
      },
    ],
  },

  'branch-testing': {
    explanation: {
      vi: `Kiểm thử nhánh (branch testing) là kỹ thuật hộp trắng, trong đó coverage item là các nhánh; mục tiêu là thiết kế test case thực thi các nhánh trong code cho đến khi đạt mức bao phủ chấp nhận được. Lưu ý: chạy qua nhánh không đảm bảo phát hiện mọi lỗi, vd. lỗi chỉ xuất hiện ở một đường đi (path) cụ thể.`,
      en: `Branch testing is a white-box technique whose coverage items are branches; test cases are designed to exercise branches until an acceptable coverage level is reached. Exercising a branch does not guarantee finding all defects, e.g., those needing a specific path.`,
      zh: `分支测试 (branch testing) 是一种白盒技术，覆盖项为分支，设计测试用例执行代码中的分支直至达到可接受的覆盖水平。执行分支并不能发现所有缺陷，例如只在特定路径上出现的缺陷。`,
    },
    example: {
      vi: `Với hàm tính phí ship có "if (tong >= 500) mienPhi else tinhPhi", tester viết 2 test: tổng 600 và tổng 200 để chạy cả hai nhánh.`,
      en: `For a shipping fee function "if (total >= 500) free else charge", the tester writes two tests, total 600 and total 200, to exercise both branches.`,
      zh: `对于运费函数“if (total >= 500) 免运费 else 计费”，测试人员编写总额 600 和 200 两条测试，执行两个分支。`,
    },
    confusedWith: [
      {
        id: 'statement-testing',
        note: {
          vi: `Statement testing nhắm vào câu lệnh thực thi được; branch testing nhắm vào các nhánh (mỗi kết quả quyết định), nên phát hiện được nhiều lỗi logic hơn.`,
          en: `Statement testing targets executable statements; branch testing targets branches (each decision outcome), revealing more logic defects.`,
          zh: `语句测试针对可执行语句；分支测试针对分支（每个判定结果），能发现更多逻辑缺陷。`,
        },
      },
    ],
  },

  'checklist-based-testing': {
    explanation: {
      vi: `Kiểm thử dựa trên checklist (checklist-based testing) là kỹ thuật dựa trên kinh nghiệm: tester thiết kế, thực hiện test để bao phủ các điều kiện test trong một checklist. Mục checklist thường viết dạng câu hỏi, kiểm tra được riêng lẻ; không nên chứa mục tự động kiểm được, mục giống entry/exit criteria hay quá chung chung. Checklist cần cập nhật thường xuyên dựa trên phân tích lỗi nhưng không quá dài.`,
      en: `Checklist-based testing is an experience-based technique: the tester designs, implements and executes tests to cover test conditions from a checklist. Items are often questions that can be checked separately; avoid items that can be checked automatically, belong in entry/exit criteria, or are too general. Update checklists based on defect analysis, but keep them short.`,
      zh: `基于检查表的测试 (checklist-based testing) 是一种基于经验的技术：测试人员设计并执行测试，以覆盖检查表中的测试条件。条目常以问题形式出现，可单独直接检查；不应包含可自动检查的条目、适合作为入口/出口准则的条目或过于笼统的条目。应依据缺陷分析定期更新，但避免过长。`,
    },
    example: {
      vi: `Checklist UI cho mỗi form: "Có thông báo lỗi rõ ràng khi bỏ trống trường bắt buộc không?", "Phím Tab di chuyển đúng thứ tự không?".`,
      en: `A UI checklist for every form: "Is there a clear error message when a required field is empty?", "Does Tab move in the correct order?".`,
      zh: `每个表单的 UI 检查表：“必填项为空时是否有清晰的错误提示？”“Tab 键是否按正确顺序移动？”。`,
    },
    confusedWith: [
      {
        id: 'error-guessing',
        note: {
          vi: `Error guessing dựa vào dự đoán lỗi từ kinh nghiệm (có thể dùng danh sách lỗi cho fault attack); checklist-based testing bao phủ các mục cố định trong checklist, nhất quán hơn giữa các tester.`,
          en: `Error guessing anticipates errors from experience (possibly via fault-attack lists); checklist-based testing covers fixed checklist items, giving more consistency between testers.`,
          zh: `错误推测依据经验预判错误（可借助故障攻击清单）；基于检查表的测试覆盖固定的检查条目，测试人员之间更一致。`,
        },
      },
    ],
  },

  'collaboration-based-test-approach': {
    explanation: {
      vi: `Cách tiếp cận kiểm thử dựa trên cộng tác (collaboration-based test approach) chú trọng phòng ngừa lỗi (defect avoidance) thông qua cộng tác và giao tiếp giữa các bên liên quan, chứ không chỉ phát hiện lỗi. Syllabus gồm: viết user story cộng tác, tiêu chí chấp nhận (acceptance criteria) và ATDD.`,
      en: `A collaboration-based test approach focuses on defect avoidance through collaboration and communication among stakeholders, not only on defect detection. The syllabus covers collaborative user story writing, acceptance criteria and ATDD.`,
      zh: `基于协作的测试方法 (collaboration-based test approach) 通过干系人之间的协作与沟通来避免缺陷，而不仅是发现缺陷。大纲涵盖协作编写用户故事、验收准则和 ATDD。`,
    },
    example: {
      vi: `PO, dev và tester cùng ngồi viết acceptance criteria cho story "Đặt lịch khám"; tester hỏi "Nếu bác sĩ nghỉ phép thì sao?" và lỗ hổng yêu cầu được sửa trước khi code.`,
      en: `PO, developer and tester write acceptance criteria together for "Book an appointment"; the tester asks "What if the doctor is on leave?" and the requirement gap is fixed before coding.`,
      zh: `产品负责人、开发和测试一起为“预约就诊”编写验收准则；测试人员问“医生休假怎么办？”，需求漏洞在编码前得到修正。`,
    },
    confusedWith: [
      {
        id: 'test-technique',
        note: {
          vi: `Các test technique (black-box, white-box, experience-based) hướng tới phát hiện lỗi; collaboration-based approach hướng thêm tới phòng ngừa lỗi.`,
          en: `Test techniques (black-box, white-box, experience-based) target defect detection; collaboration-based approaches also target defect avoidance.`,
          zh: `测试技术（黑盒、白盒、基于经验）着眼于发现缺陷；基于协作的方法还着眼于避免缺陷。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary nói cách tiếp cận này "tập trung vào phòng ngừa lỗi"; syllabus (mục 4.5) diễn đạt là "cũng tập trung vào" phòng ngừa lỗi — tức bên cạnh việc phát hiện lỗi.`,
      en: `The glossary says it "focuses on defect avoidance"; the syllabus (4.5) says such approaches "focus also on defect avoidance" — i.e., in addition to defect detection.`,
      zh: `术语表称其“侧重于避免缺陷”；大纲（4.5 节）表述为“也侧重于”避免缺陷，即在发现缺陷之外。`,
    },
  },

  'decision-table-testing': {
    explanation: {
      vi: `Kiểm thử bảng quyết định (decision table testing) dùng cho yêu cầu mà các tổ hợp điều kiện dẫn đến các hành động khác nhau (vd. quy tắc nghiệp vụ). Hàng là điều kiện và hành động, mỗi cột là một quy tắc (rule). Coverage item là các cột có tổ hợp điều kiện khả thi; 100% coverage khi mọi cột khả thi được test. Bảng có thể rút gọn bằng cách bỏ cột không khả thi hoặc gộp cột.`,
      en: `Decision table testing suits requirements where combinations of conditions lead to different actions (e.g., business rules). Rows are conditions and actions; each column is a decision rule. Coverage items are columns with feasible condition combinations; 100% coverage means all are exercised. Tables can be simplified by removing infeasible columns or minimized by merging.`,
      zh: `决策表测试 (decision table testing) 适用于条件组合导致不同动作的需求（如业务规则）。行为条件和动作，每列为一条规则。覆盖项是包含可行条件组合的列，执行全部可行列即 100% 覆盖。可删除不可行列简化，或合并列最小化。`,
    },
    example: {
      vi: `Điều kiện: thành viên VIP (T/F), đơn ≥ 1 triệu (T/F) → 4 rule; hành động: giảm 10%, miễn ship. Tester viết 4 test case, mỗi cột 1 test.`,
      en: `Conditions: VIP member (T/F), order ≥ 1,000 (T/F) → 4 rules; actions: 10% discount, free shipping. The tester writes 4 test cases, one per column.`,
      zh: `条件：VIP 会员（T/F）、订单 ≥ 1000（T/F）→ 4 条规则；动作：九折、免运费。测试人员编写 4 个用例，每列一个。`,
    },
    confusedWith: [
      {
        id: 'state-transition-testing',
        note: {
          vi: `Decision table: tổ hợp điều kiện tại một thời điểm, không phụ thuộc lịch sử. State transition: hành vi phụ thuộc trạng thái hiện tại và chuỗi sự kiện.`,
          en: `Decision tables: combinations of conditions at one point, no history. State transition: behavior depends on the current state and the sequence of events.`,
          zh: `决策表：某一时刻的条件组合，与历史无关。状态转换：行为取决于当前状态和事件序列。`,
        },
      },
    ],
  },

  'defect-management': {
    explanation: {
      vi: `Quản lý lỗi (defect management) là quy trình nhận biết, ghi nhận, phân loại, điều tra, sửa và xử lý dứt điểm lỗi. Syllabus: tối thiểu cần một workflow cho từng anomaly từ khi phát hiện đến khi đóng (log → phân tích, phân loại → quyết định sửa hay giữ nguyên → đóng) và quy tắc phân loại; mọi bên liên quan phải tuân theo. Lỗi từ kiểm thử tĩnh nên được xử lý tương tự.`,
      en: `Defect management is the process of recognizing, recording, classifying, investigating, fixing and disposing of defects. The syllabus: at minimum a workflow per anomaly from discovery to closure (log → analyze and classify → decide on a response such as fix or keep as is → close) plus classification rules, followed by all stakeholders. Defects from static testing should be handled similarly.`,
      zh: `缺陷管理 (defect management) 是识别、记录、分类、调查、修复和处置缺陷的过程。大纲指出：至少需要从发现到关闭的处理流程（登记 → 分析分类 → 决定修复或保持现状 → 关闭）和分类规则，所有干系人都须遵循。静态测试发现的缺陷也应类似处理。`,
    },
    example: {
      vi: `Trên Jira: bug được tạo (Open) → triage gán severity/priority → dev sửa → "Awaiting confirmation testing" → tester retest → Closed (hoặc Re-opened).`,
      en: `In Jira: a bug is created (Open) → triage sets severity/priority → developer fixes → "Awaiting confirmation testing" → tester retests → Closed (or Re-opened).`,
      zh: `在 Jira 中：创建缺陷（Open）→ 分诊设定严重程度/优先级 → 开发修复 → “等待确认测试” → 测试人员复测 → 关闭（或重新打开）。`,
    },
    confusedWith: [
      {
        id: 'defect-report',
        note: {
          vi: `Defect report là tài liệu cho một lỗi (ID, tiêu đề, bước tái hiện, expected/actual, severity, priority…); defect management là toàn bộ quy trình xử lý các report đó.`,
          en: `A defect report documents one defect (ID, title, steps, expected/actual, severity, priority…); defect management is the whole process of handling such reports.`,
          zh: `缺陷报告记录单个缺陷（ID、标题、复现步骤、预期/实际结果、严重程度、优先级等）；缺陷管理是处理这些报告的整个过程。`,
        },
      },
    ],
  },

  'each-choice-coverage': {
    explanation: {
      vi: `Bao phủ mỗi lựa chọn (each choice coverage) là tiêu chí đơn giản nhất khi có nhiều tập phân vùng (vd. nhiều tham số đầu vào): mỗi phân vùng của mỗi tập phải được test ít nhất một lần. Nó không xét tổ hợp giữa các phân vùng.`,
      en: `Each choice coverage is the simplest criterion for multiple sets of partitions (e.g., several input parameters): each partition from each set must be exercised at least once. It does not consider combinations of partitions.`,
      zh: `每选项覆盖 (each choice coverage) 是存在多组分区（如多个输入参数）时最简单的覆盖准则：每组中的每个分区至少被执行一次，不考虑分区之间的组合。`,
    },
    example: {
      vi: `Tham số "loại thẻ" {Visa, Master, JCB} và "tiền tệ" {VND, USD}: chỉ cần 3 test, vd. (Visa,VND), (Master,USD), (JCB,VND) đã đạt each choice coverage.`,
      en: `Parameters "card type" {Visa, Master, JCB} and "currency" {VND, USD}: 3 tests such as (Visa,VND), (Master,USD), (JCB,VND) achieve each choice coverage.`,
      zh: `参数“卡类型” {Visa, Master, JCB} 和“币种” {VND, USD}：只需 3 条测试，如 (Visa,VND)、(Master,USD)、(JCB,VND)，即达到每选项覆盖。`,
    },
    confusedWith: [
      {
        id: 'pairwise-coverage',
        note: {
          vi: `Each choice chỉ yêu cầu mỗi giá trị xuất hiện một lần; pairwise yêu cầu mọi cặp giá trị giữa hai tham số đều xuất hiện — cần nhiều test hơn (không thuộc phạm vi CTFL).`,
          en: `Each choice needs every value once; pairwise needs every pair of values across two parameters — more tests (beyond CTFL scope).`,
          zh: `每选项覆盖只要求每个取值出现一次；成对覆盖要求任意两个参数的所有取值对都出现，需要更多测试（超出 CTFL 范围）。`,
        },
      },
    ],
  },

  'equivalence-partitioning': {
    explanation: {
      vi: `Phân vùng tương đương (EP – equivalence partitioning) chia dữ liệu thành các phân vùng mà mọi phần tử được hệ thống xử lý như nhau, nên một giá trị đại diện mỗi phân vùng là đủ. Áp dụng cho đầu vào, đầu ra, cấu hình, giá trị nội bộ, thời gian, tham số giao diện. Phân vùng không được chồng lấp, không rỗng; gồm phân vùng hợp lệ và không hợp lệ. Coverage = số phân vùng đã test / tổng số phân vùng (kể cả không hợp lệ).`,
      en: `EP divides data into partitions whose elements are expected to be processed the same way, so one value per partition is sufficient. It applies to inputs, outputs, configuration, internal and time-related values, interface parameters. Partitions must not overlap and must be non-empty; there are valid and invalid partitions. Coverage = partitions exercised / all identified partitions (including invalid).`,
      zh: `等价类划分 (EP) 将数据划分为预期被同样处理的分区，因此每个分区测一个值即可。适用于输入、输出、配置项、内部值、时间相关值和接口参数。分区不得重叠且不能为空，分为有效和无效分区。覆盖率 = 已执行分区数 / 全部分区数（含无效分区）。`,
    },
    example: {
      vi: `Số lượng đặt hàng hợp lệ 1–99: phân vùng ≤0 (không hợp lệ), 1–99 (hợp lệ), ≥100 (không hợp lệ). Test với -5, 50, 150 → 100% EP coverage.`,
      en: `Valid order quantity 1–99: partitions ≤0 (invalid), 1–99 (valid), ≥100 (invalid). Tests with -5, 50, 150 → 100% EP coverage.`,
      zh: `有效订购数量 1–99：分区 ≤0（无效）、1–99（有效）、≥100（无效）。用 -5、50、150 测试 → 100% 等价类覆盖。`,
    },
    confusedWith: [
      {
        id: 'boundary-value-analysis',
        note: {
          vi: `EP: một giá trị bất kỳ trong mỗi phân vùng. BVA: các giá trị ở biên (và giá trị kề) của phân vùng có thứ tự. Thường dùng EP trước rồi BVA.`,
          en: `EP: any one value per partition. BVA: the boundary (and neighbor) values of ordered partitions. EP usually comes first, then BVA.`,
          zh: `EP：每个分区任取一个值。BVA：有序分区的边界值（及相邻值）。通常先做 EP，再做 BVA。`,
        },
      },
      {
        id: 'each-choice-coverage',
        note: {
          vi: `EP là kỹ thuật cho một tập phân vùng; each choice coverage là tiêu chí bao phủ khi có nhiều tập phân vùng cùng lúc.`,
          en: `EP is the technique for a set of partitions; each choice coverage is the criterion when several sets of partitions are combined in test cases.`,
          zh: `EP 是针对一组分区的技术；每选项覆盖是多组分区同时出现在用例中时的覆盖准则。`,
        },
      },
    ],
  },

  'error-guessing': {
    explanation: {
      vi: `Đoán lỗi (error guessing) là kỹ thuật dự đoán error, defect và failure dựa trên kiến thức của tester: ứng dụng đã hoạt động thế nào trước đây, developer hay mắc lỗi gì, các ứng dụng tương tự từng hỏng ra sao. Lỗi thường liên quan đến input, output, logic, tính toán, interface, dữ liệu. Fault attack là một cách hiện thực error guessing.`,
      en: `Error guessing anticipates errors, defects and failures based on the tester's knowledge: how the application worked in the past, typical developer errors, failures in similar applications. Typical areas: input, output, logic, computation, interfaces, data. Fault attacks are one way to implement it.`,
      zh: `错误推测 (error guessing) 依据测试人员的知识预判错误、缺陷和失效：应用以往的表现、开发人员常犯的错误、类似应用发生过的失效。常见领域：输入、输出、逻辑、计算、接口、数据。故障攻击是实施错误推测的一种方式。`,
    },
    example: {
      vi: `Từng gặp lỗi khi tên khách hàng có dấu tiếng Việt, tester thử ngay "Nguyễn Thị Ánh" và tên có ký tự đặc biệt ở module xuất hóa đơn mới.`,
      en: `Having seen bugs with Vietnamese diacritics before, the tester immediately tries "Nguyễn Thị Ánh" and names with special characters in the new invoice export.`,
      zh: `曾遇到越南语带声调姓名导致的缺陷，测试人员在新的发票导出模块中立即尝试“Nguyễn Thị Ánh”及含特殊字符的姓名。`,
    },
    confusedWith: [
      {
        id: 'exploratory-testing',
        note: {
          vi: `Error guessing nhắm vào các lỗi dự đoán trước; exploratory testing là thiết kế–thực thi–đánh giá đồng thời trong khi học về hệ thống, có thể dùng error guessing bên trong.`,
          en: `Error guessing targets anticipated defects; exploratory testing designs, executes and evaluates tests simultaneously while learning, and may use error guessing.`,
          zh: `错误推测针对预判的缺陷；探索性测试在学习系统的同时设计、执行和评估测试，可在其中运用错误推测。`,
        },
      },
      {
        id: 'fault-attack',
        note: {
          vi: `Fault attack là cách làm có hệ thống của error guessing: lập/thu thập danh sách lỗi có thể xảy ra rồi thiết kế test tấn công từng lỗi.`,
          en: `A fault attack is a structured form of error guessing: build or acquire a list of possible errors/defects/failures and design tests for each.`,
          zh: `故障攻击是错误推测的系统化形式：建立或获取可能的错误/缺陷/失效清单，再针对每项设计测试。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary giới hạn cơ sở của error guessing ở "các failure trong quá khứ hoặc failure mode"; syllabus mô tả rộng hơn: dự đoán cả error, defect, failure, dựa trên hành vi trước đây của ứng dụng, loại lỗi developer hay mắc và failure ở ứng dụng tương tự.`,
      en: `The glossary bases error guessing on "past failures or failure modes"; the syllabus is broader: anticipating errors, defects and failures from the application's past behavior, typical developer errors, and failures in similar applications.`,
      zh: `术语表将错误推测的依据限定为“过去的失效或失效模式”；大纲描述更宽：依据应用过往表现、开发人员常犯的错误及类似应用的失效来预判错误、缺陷和失效。`,
    },
  },

  'experience-based-test-technique': {
    explanation: {
      vi: `Kỹ thuật dựa trên kinh nghiệm (experience-based test technique) tận dụng kinh nghiệm, kiến thức và trực giác của tester để thiết kế, thực hiện test. Hiệu quả phụ thuộc nhiều vào kỹ năng tester; có thể tìm ra lỗi mà black-box và white-box bỏ sót, nên mang tính bổ sung. CTFL gồm: error guessing, exploratory testing, checklist-based testing.`,
      en: `Experience-based test techniques use the tester's experience, knowledge and intuition to design and implement tests. Effectiveness depends heavily on tester skills; they can find defects missed by black-box and white-box techniques, so they are complementary. CTFL covers error guessing, exploratory testing and checklist-based testing.`,
      zh: `基于经验的测试技术利用测试人员的经验、知识和直觉设计与实施测试。其有效性高度依赖测试人员技能，能发现黑盒和白盒技术遗漏的缺陷，因此是补充性的。CTFL 涵盖错误推测、探索性测试和基于检查表的测试。`,
    },
    example: {
      vi: `Sau khi chạy hết test case từ EP/BVA, tester senior dành 1 giờ dùng kinh nghiệm thử các tình huống mất mạng giữa chừng khi thanh toán.`,
      en: `After running EP/BVA test cases, a senior tester spends an hour using experience to try network drops in the middle of payment.`,
      zh: `执行完基于 EP/BVA 的用例后，资深测试人员凭经验花一小时尝试支付途中断网的情况。`,
    },
    confusedWith: [
      {
        id: 'black-box-test-technique',
        note: {
          vi: `Black-box có hệ thống, dựa trên đặc tả và lặp lại được; experience-based dựa vào người tester, hữu ích khi đặc tả thiếu hoặc gấp thời gian.`,
          en: `Black-box techniques are systematic and specification-based; experience-based ones depend on the tester and help when specs are poor or time is short.`,
          zh: `黑盒技术系统化、基于规格；基于经验的技术依赖测试人员，适用于规格不足或时间紧迫时。`,
        },
      },
    ],
  },

  'exploratory-testing': {
    explanation: {
      vi: `Kiểm thử thăm dò (exploratory testing): test được thiết kế, thực thi và đánh giá đồng thời trong khi tester tìm hiểu đối tượng kiểm thử. Hữu ích khi đặc tả ít/kém hoặc áp lực thời gian lớn, và để bổ sung cho kỹ thuật chính thức. Có thể tổ chức theo session-based testing với test charter và time box; có thể kết hợp kỹ thuật khác như EP.`,
      en: `In exploratory testing, tests are simultaneously designed, executed and evaluated while the tester learns about the test object. It is useful with few or inadequate specifications, under time pressure, and to complement more formal techniques. It may be structured with session-based testing (charter, time box) and can incorporate other techniques like EP.`,
      zh: `探索性测试 (exploratory testing) 在测试人员学习测试对象的同时设计、执行并评估测试。适用于规格很少或不足、时间紧迫，以及补充更正式的技术。可用基于会话的测试（测试章程、时间盒）来组织，也可结合等价类划分等技术。`,
    },
    example: {
      vi: `Charter: "Khám phá chức năng lọc đơn hàng với dữ liệu lớn để tìm vấn đề hiệu năng và hiển thị", time box 60 phút, ghi lại phát hiện vào session sheet.`,
      en: `Charter: "Explore order filtering with large data to discover performance and display issues", 60-minute time box, findings noted on a session sheet.`,
      zh: `测试章程：“使用大数据量探索订单筛选功能，以发现性能和显示问题”，时间盒 60 分钟，发现记录在会话记录表中。`,
    },
    confusedWith: [
      {
        id: 'ad-hoc-testing',
        note: {
          vi: `Ad hoc testing là test không chính thức, không có chuẩn bị hay ghi chép; exploratory testing có mục tiêu (charter), có thể giới hạn thời gian và ghi lại phát hiện.`,
          en: `Ad hoc testing is informal and unstructured; exploratory testing has objectives (a charter), can be time-boxed, and records findings.`,
          zh: `随机测试 (ad hoc testing) 非正式、无结构；探索性测试有目标（章程），可设时间盒并记录发现。`,
        },
      },
      {
        id: 'session-based-testing',
        note: {
          vi: `Exploratory testing là cách test; session-based testing là cách tổ chức (session có time box, charter, debriefing) thường dùng cho exploratory testing.`,
          en: `Exploratory testing is the way of testing; session-based testing is a way of organizing it (time-boxed sessions, charter, debriefing).`,
          zh: `探索性测试是测试方式；基于会话的测试是组织它的方式（时间盒会话、章程、汇报）。`,
        },
      },
    ],
  },

  'fault-attack': {
    explanation: {
      vi: `Tấn công lỗi (fault attack) — theo syllabus là một cách hiện thực error guessing: tester tạo hoặc thu thập danh sách các error, defect, failure có thể xảy ra, rồi thiết kế test để lộ ra defect hoặc gây ra failure tương ứng. Danh sách xây dựng từ kinh nghiệm, dữ liệu lỗi, hoặc hiểu biết chung về nguyên nhân phần mềm hỏng.`,
      en: `Per the syllabus, a fault attack is a way to implement error guessing: the tester creates or acquires a list of possible errors, defects and failures and designs tests to expose the defects or cause the failures. Lists come from experience, defect/failure data, or common knowledge of why software fails.`,
      zh: `按大纲，故障攻击 (fault attack) 是实施错误推测的一种方式：测试人员建立或获取可能的错误、缺陷和失效清单，并设计测试以暴露缺陷或引发失效。清单可来自经验、缺陷/失效数据或关于软件为何失效的常识。`,
    },
    example: {
      vi: `Danh sách tấn công cho form nhập: bỏ trống, chuỗi rất dài, ký tự Unicode, số âm, định dạng ngày sai, nhấn Submit 2 lần liên tiếp — mỗi mục là một test.`,
      en: `An attack list for an input form: empty fields, very long strings, Unicode characters, negative numbers, wrong date formats, double-clicking Submit — each item becomes a test.`,
      zh: `输入表单的攻击清单：留空、超长字符串、Unicode 字符、负数、错误日期格式、连续两次点击提交——每项对应一条测试。`,
    },
    confusedWith: [
      {
        id: 'security-attack',
        note: {
          vi: `Security attack nhắm riêng vào lỗ hổng bảo mật; fault attack nhắm vào failure nói chung theo danh sách lỗi có thể xảy ra.`,
          en: `A security attack targets security vulnerabilities specifically; a fault attack targets failures in general from a list of possible faults.`,
          zh: `安全攻击专门针对安全漏洞；故障攻击依据可能故障清单针对一般性失效。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary v4.8.1 định nghĩa fault attack là kỹ thuật đánh giá một đặc tính chất lượng cụ thể bằng cách cố gây ra các failure cụ thể; syllabus v4.0.1 không nhắc tới đặc tính chất lượng mà mô tả nó như một cách hiện thực error guessing dựa trên danh sách error/defect/failure.`,
      en: `Glossary v4.8.1 defines a fault attack as evaluating a specific quality characteristic by trying to trigger specific failures; syllabus v4.0.1 does not mention quality characteristics and presents it as a way to implement error guessing from a list of errors/defects/failures.`,
      zh: `术语表 v4.8.1 将故障攻击定义为通过尝试触发特定失效来评估某一质量特性；大纲 v4.0.1 未提及质量特性，而是将其描述为基于错误/缺陷/失效清单实施错误推测的方式。`,
    },
  },

  'formal-review': {
    explanation: {
      vi: `Review chính thức (formal review) tuân theo quy trình đã định nghĩa và có đầu ra được ghi chép chính thức. Mức độ chính thức phụ thuộc vào SDLC, độ trưởng thành quy trình, độ quan trọng/phức tạp của sản phẩm, yêu cầu pháp lý và nhu cầu audit trail. Review càng chính thức thì càng thực hiện nhiều task trong quy trình review chung (ISO/IEC 20246); inspection là loại chính thức nhất.`,
      en: `A formal review follows a defined process with a formally documented output. The required formality depends on the SDLC, process maturity, criticality and complexity of the work product, legal/regulatory requirements and the need for an audit trail. More formal reviews perform more of the generic review process tasks (ISO/IEC 20246); inspection is the most formal.`,
      zh: `正式评审 (formal review) 遵循既定流程并有正式记录的输出。所需正式程度取决于 SDLC、过程成熟度、工作产品的关键性和复杂度、法律法规要求及审计追踪需要。越正式，执行的通用评审过程 (ISO/IEC 20246) 任务越多；审查 (inspection) 最正式。`,
    },
    example: {
      vi: `Đặc tả thanh toán cho ngân hàng được review theo quy trình: lập kế hoạch, phân vai, review cá nhân, họp, biên bản các anomaly và quyết định, theo dõi đến khi đạt exit criteria.`,
      en: `A bank's payment specification is reviewed with planning, assigned roles, individual review, a meeting, minutes of anomalies and decisions, and follow-up until exit criteria are met.`,
      zh: `银行支付规格说明按流程评审：计划、分配角色、个人评审、会议、记录异常与决定，并跟踪至达到出口准则。`,
    },
    confusedWith: [
      {
        id: 'informal-review',
        note: {
          vi: `Informal review không có quy trình định nghĩa và không cần đầu ra chính thức; formal review có cả hai.`,
          en: `An informal review has no defined process and no formal documented output; a formal review has both.`,
          zh: `非正式评审没有既定流程，也不要求正式输出；正式评审两者兼备。`,
        },
      },
    ],
  },

  'informal-review': {
    explanation: {
      vi: `Review không chính thức (informal review) không theo quy trình định nghĩa và không yêu cầu đầu ra được ghi chép chính thức; mục tiêu chính là phát hiện anomaly. Nhanh, rẻ, phổ biến trong nhóm Agile (vd. nhờ đồng nghiệp xem qua).`,
      en: `An informal review does not follow a defined process and has no formally documented output; its main objective is detecting anomalies. Quick and cheap, common in agile teams (e.g., asking a colleague to look over something).`,
      zh: `非正式评审 (informal review) 不遵循既定流程，也不要求正式记录的输出，主要目标是发现异常。快速廉价，在敏捷团队中很常见（如请同事过目）。`,
    },
    example: {
      vi: `Tester nhắn đồng nghiệp: "Xem giúp mình bộ test case đăng nhập này 10 phút nhé" — góp ý qua chat, không có biên bản.`,
      en: `A tester messages a colleague: "Could you look over my login test cases for 10 minutes?" — feedback via chat, no minutes.`,
      zh: `测试人员给同事发消息：“帮我花 10 分钟看看这些登录用例”——通过聊天反馈，没有会议记录。`,
    },
    confusedWith: [
      {
        id: 'walkthrough',
        note: {
          vi: `Walkthrough do tác giả dẫn dắt, có nhiều mục tiêu (đào tạo, đồng thuận, ý tưởng…); informal review không có cấu trúc, chủ yếu tìm anomaly.`,
          en: `A walkthrough is led by the author and serves many objectives (education, consensus, ideas…); an informal review is unstructured and mainly detects anomalies.`,
          zh: `走查由作者主导，目标多样（培训、达成共识、产生想法等）；非正式评审无结构，主要发现异常。`,
        },
      },
    ],
  },

  inspection: {
    explanation: {
      vi: `Thanh tra (inspection) là loại review chính thức nhất: theo đầy đủ quy trình review chung, có vai trò xác định và thu thập số liệu (metrics). Mục tiêu chính là tìm tối đa anomaly; ngoài ra đánh giá chất lượng, tạo sự tin cậy, giúp tác giả cải thiện. Metrics dùng để cải tiến SDLC và chính quy trình inspection. Tác giả không được làm review leader hay scribe.`,
      en: `Inspection is the most formal review type: it follows the complete generic process with defined roles and measurement. Main objective: find the maximum number of anomalies; also evaluate quality, build confidence, help authors improve. Metrics are used to improve the SDLC and the inspection process. The author cannot be review leader or scribe.`,
      zh: `审查 (inspection) 是最正式的评审类型：遵循完整的通用流程，有明确角色并收集度量。主要目标是发现尽可能多的异常，也用于评估质量、建立信心、帮助作者改进。度量用于改进 SDLC 及审查过程本身。作者不能担任评审组长或记录员。`,
    },
    example: {
      vi: `Mã điều khiển thiết bị y tế được inspection: moderator điều phối, scribe ghi, reviewer chuẩn bị trước với checklist; số lỗi/trang và thời gian chuẩn bị được thống kê để cải tiến quy trình.`,
      en: `Medical-device control code is inspected: a moderator facilitates, a scribe records, reviewers prepare with checklists; defects per page and preparation time are measured to improve the process.`,
      zh: `医疗设备控制代码进行审查：主持人主持，记录员记录，评审员事先用检查表准备；统计每页缺陷数和准备时间以改进过程。`,
    },
    confusedWith: [
      {
        id: 'technical-review',
        note: {
          vi: `Technical review do chuyên gia kỹ thuật thực hiện, mục tiêu chính là đồng thuận và ra quyết định về vấn đề kỹ thuật; inspection nhắm tìm tối đa anomaly, theo đủ quy trình và thu thập metrics.`,
          en: `A technical review by qualified experts mainly aims at consensus and technical decisions; an inspection aims at finding the most anomalies, with the full process and metrics.`,
          zh: `技术评审由技术专家进行，主要目标是就技术问题达成共识并做决定；审查旨在发现最多异常，执行完整流程并收集度量。`,
        },
      },
      {
        id: 'walkthrough',
        note: {
          vi: `Walkthrough do tác giả dẫn dắt; trong inspection tác giả không được làm leader hay scribe.`,
          en: `A walkthrough is led by the author; in an inspection the author cannot be the leader or scribe.`,
          zh: `走查由作者主导；在审查中作者不能担任组长或记录员。`,
        },
      },
    ],
  },

  'product-risk': {
    explanation: {
      vi: `Rủi ro sản phẩm (product risk) là rủi ro ảnh hưởng đến chất lượng sản phẩm, gắn với các đặc tính chất lượng (vd. ISO 25010): thiếu/sai chức năng, tính toán sai, lỗi runtime, kiến trúc kém, phản hồi chậm, UX kém, lỗ hổng bảo mật. Hậu quả: người dùng không hài lòng, mất doanh thu/uy tín, chi phí bảo trì cao, phạt, thậm chí thương vong. Product risk là đầu vào của risk-based testing.`,
      en: `A product risk impacts product quality and relates to quality characteristics (e.g., ISO 25010): missing or wrong functionality, incorrect calculations, runtime errors, poor architecture, slow response, poor UX, security vulnerabilities. Consequences: user dissatisfaction, lost revenue/reputation, high maintenance cost, penalties, even injury. Product risks drive risk-based testing.`,
      zh: `产品风险 (product risk) 影响产品质量，与质量特性（如 ISO 25010）相关：功能缺失或错误、计算错误、运行时错误、架构不佳、响应慢、用户体验差、安全漏洞。后果包括用户不满、收入与声誉损失、维护成本高、处罚，甚至人身伤害。产品风险驱动基于风险的测试。`,
    },
    example: {
      vi: `"Tính lãi vay sai khi kỳ hạn qua năm nhuận" là product risk → ưu tiên test BVA quanh ngày 29/02.`,
      en: `"Loan interest is wrong when the term spans a leap year" is a product risk → prioritize BVA tests around 29 February.`,
      zh: `“贷款期限跨闰年时利息计算错误”是产品风险 → 优先围绕 2 月 29 日进行边界值测试。`,
    },
    confusedWith: [
      {
        id: 'project-risk',
        note: {
          vi: `Hỏi "nếu xảy ra thì cái gì bị ảnh hưởng?": chất lượng sản phẩm → product risk; tiến độ, ngân sách, phạm vi dự án → project risk.`,
          en: `Ask "what is affected if it happens?": product quality → product risk; schedule, budget, scope → project risk.`,
          zh: `问“发生后影响什么？”：产品质量 → 产品风险；进度、预算、范围 → 项目风险。`,
        },
      },
    ],
  },

  'project-risk': {
    explanation: {
      vi: `Rủi ro dự án (project risk) liên quan đến quản lý và kiểm soát dự án, ảnh hưởng đến tiến độ, ngân sách hoặc phạm vi, tức khả năng đạt mục tiêu dự án. Gồm: vấn đề tổ chức (giao hàng trễ, ước lượng sai, cắt giảm chi phí), con người (thiếu kỹ năng, xung đột, thiếu người), kỹ thuật (scope creep, công cụ kém), nhà cung cấp (bên thứ ba giao trễ, phá sản).`,
      en: `A project risk relates to project management and control and affects schedule, budget or scope — the ability to achieve project objectives. Types: organizational (late deliveries, inaccurate estimates, cost cutting), people (insufficient skills, conflicts, staff shortage), technical (scope creep, poor tool support), supplier (third-party delivery failure, bankruptcy).`,
      zh: `项目风险 (project risk) 与项目的管理和控制相关，影响进度、预算或范围，即实现项目目标的能力。包括：组织问题（交付延误、估算不准、削减成本）、人员问题（技能不足、冲突、人手短缺）、技术问题（范围蔓延、工具支持差）、供应商问题（第三方交付失败、破产）。`,
    },
    example: {
      vi: `"Môi trường test do đối tác cung cấp có thể trễ 2 tuần" là project risk; biện pháp: chuẩn bị môi trường dự phòng bằng mock service.`,
      en: `"The partner-provided test environment may be two weeks late" is a project risk; response: prepare a fallback environment with mock services.`,
      zh: `“合作方提供的测试环境可能延迟两周”是项目风险；应对：用模拟服务准备备用环境。`,
    },
    confusedWith: [
      {
        id: 'product-risk',
        note: {
          vi: `"Thiếu tester có kinh nghiệm bảo mật" là project risk (con người); "hệ thống có lỗ hổng SQL injection" là product risk (chất lượng).`,
          en: `"Lack of testers with security skills" is a project risk (people); "the system has an SQL injection vulnerability" is a product risk (quality).`,
          zh: `“缺少具备安全技能的测试人员”是项目风险（人员）；“系统存在 SQL 注入漏洞”是产品风险（质量）。`,
        },
      },
    ],
  },

  'quality-characteristic': {
    explanation: {
      vi: `Đặc tính chất lượng (quality characteristic) là một nhóm thuộc tính chất lượng liên quan đến chất lượng sản phẩm công việc, vd. theo ISO/IEC 25010: functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, portability, safety. Trong review, kế hoạch review xác định những đặc tính chất lượng sẽ được đánh giá; trong risk analysis, product risk gắn với các đặc tính này.`,
      en: `A quality characteristic is a category of quality attributes bearing on work product quality, e.g., in ISO/IEC 25010: functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, portability, safety. Review planning defines which characteristics to evaluate; product risks relate to them.`,
      zh: `质量特性 (quality characteristic) 是影响工作产品质量的一类质量属性，例如 ISO/IEC 25010 中的功能适合性、性能效率、兼容性、易用性、可靠性、信息安全性、可维护性、可移植性、安全性。评审计划确定要评估哪些质量特性；产品风险与之相关。`,
    },
    example: {
      vi: `Khi review đặc tả app ngân hàng, team chọn tập trung vào security và usability; khi test hiệu năng, đặc tính là performance efficiency.`,
      en: `When reviewing a banking app spec the team focuses on security and usability; performance testing targets performance efficiency.`,
      zh: `评审银行应用规格时团队聚焦信息安全性和易用性；性能测试针对性能效率。`,
    },
  },

  review: {
    explanation: {
      vi: `Review (rà soát) là một dạng kiểm thử tĩnh (static testing), trong đó con người đánh giá chất lượng của sản phẩm công việc hoặc quy trình mà không chạy phần mềm. Bất kỳ sản phẩm nào đọc và hiểu được đều có thể review: yêu cầu, user story, code, test case, test plan, hợp đồng… Giúp phát hiện lỗi sớm, kể cả lỗi mà dynamic testing không tìm được.`,
      en: `A review is a form of static testing in which individuals evaluate the quality of a work product or process without executing software. Anything that can be read and understood can be reviewed: requirements, user stories, code, test cases, test plans, contracts… It finds defects early, including some dynamic testing cannot find.`,
      zh: `评审 (review) 是一种静态测试，由人员在不执行软件的情况下评估工作产品或过程的质量。任何可阅读理解的工作产品都可评审：需求、用户故事、代码、测试用例、测试计划、合同等。可尽早发现缺陷，包括动态测试发现不了的缺陷。`,
    },
    example: {
      vi: `Tester review user story trước sprint và phát hiện acceptance criteria không nói gì về trường hợp email đã tồn tại.`,
      en: `A tester reviews a user story before the sprint and notices the acceptance criteria say nothing about an already-registered email.`,
      zh: `测试人员在冲刺前评审用户故事，发现验收准则未涉及邮箱已注册的情况。`,
    },
    confusedWith: [
      {
        id: 'static-analysis',
        note: {
          vi: `Review do con người đánh giá thủ công; static analysis dùng công cụ phân tích sản phẩm có cấu trúc (code, model). Cả hai đều là static testing.`,
          en: `A review is a manual evaluation by people; static analysis is tool-based and needs structured work products (code, models). Both are static testing.`,
          zh: `评审由人工进行；静态分析借助工具，要求工作产品有结构（代码、模型）。两者都属于静态测试。`,
        },
      },
    ],
  },

  reviewer: {
    explanation: {
      vi: `Người review (reviewer) là người tham gia thực hiện review, xác định anomaly/defect trong sản phẩm công việc. Theo syllabus, reviewer có thể là thành viên dự án, chuyên gia nghiệp vụ hoặc bất kỳ bên liên quan nào; ở bước individual review, mỗi reviewer tự đánh giá và ghi lại anomaly, khuyến nghị và câu hỏi.`,
      en: `A reviewer is a review participant who identifies anomalies/defects in the work product. Per the syllabus, a reviewer may be a project member, a subject matter expert or any other stakeholder; in individual review each reviewer logs anomalies, recommendations and questions.`,
      zh: `评审员 (reviewer) 是参与评审、识别工作产品中异常/缺陷的人。按大纲，评审员可以是项目成员、领域专家或其他任何干系人；在个人评审中，每位评审员记录异常、建议和问题。`,
    },
    example: {
      vi: `Trong review đặc tả kho hàng, reviewer gồm một tester, một dev và một thủ kho có kinh nghiệm.`,
      en: `For a warehouse specification review, the reviewers are a tester, a developer and an experienced warehouse keeper.`,
      zh: `在仓储规格评审中，评审员包括一名测试人员、一名开发人员和一名有经验的仓管员。`,
    },
    confusedWith: [
      {
        id: 'moderator',
        note: {
          vi: `Moderator (facilitator) điều phối cuộc họp review cho hiệu quả và an toàn; reviewer là người thực hiện việc tìm vấn đề.`,
          en: `The moderator (facilitator) runs review meetings effectively and safely; the reviewer does the finding.`,
          zh: `主持人（协调人）确保评审会议高效、安全地进行；评审员负责发现问题。`,
        },
      },
      {
        id: 'scribe',
        note: {
          vi: `Scribe thu thập và ghi lại anomaly, quyết định; reviewer phát hiện anomaly.`,
          en: `The scribe collates and records anomalies and decisions; the reviewer identifies them.`,
          zh: `记录员汇总并记录异常和决定；评审员负责识别异常。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary nói reviewer "xác định defect"; syllabus nói reviewer xác định anomaly, khuyến nghị và câu hỏi — anomaly chỉ được xác nhận là defect sau bước communication and analysis.`,
      en: `The glossary says a reviewer "identifies defects"; the syllabus says reviewers identify anomalies, recommendations and questions — anomalies are confirmed as defects only after communication and analysis.`,
      zh: `术语表称评审员“识别缺陷”；大纲称评审员识别异常、建议和问题——异常只有经过沟通与分析才被确认为缺陷。`,
    },
  },

  'risk-analysis': {
    explanation: {
      vi: `Phân tích rủi ro (risk analysis) gồm hai bước: nhận diện rủi ro (risk identification) và đánh giá rủi ro (risk assessment). Với product risk, mục tiêu là tập trung nỗ lực test để giảm rủi ro còn lại, lý tưởng là bắt đầu sớm trong SDLC. Kết quả dùng để xác định phạm vi test, test level, test type, kỹ thuật và coverage, ước lượng effort, ưu tiên test.`,
      en: `Risk analysis consists of risk identification and risk assessment. For product risks, it focuses test effort to minimize residual product risk, ideally starting early in the SDLC. Results determine test scope, levels, types, techniques and coverage, effort estimates and test prioritization.`,
      zh: `风险分析 (risk analysis) 包括风险识别和风险评估。对于产品风险，其目的是集中测试投入以最小化剩余风险，理想情况下在 SDLC 早期开始。结果用于确定测试范围、级别、类型、技术与覆盖率、估算工作量和确定测试优先级。`,
    },
    example: {
      vi: `Workshop đầu dự án: liệt kê 25 rủi ro (identification), chấm điểm likelihood × impact và xếp hạng (assessment) → module thanh toán được test kỹ nhất.`,
      en: `A kickoff workshop lists 25 risks (identification), scores likelihood × impact and ranks them (assessment) → the payment module gets the most thorough testing.`,
      zh: `项目启动研讨会列出 25 项风险（识别），按可能性 × 影响打分排序（评估）→ 支付模块获得最充分的测试。`,
    },
    confusedWith: [
      {
        id: 'risk-control',
        note: {
          vi: `Risk analysis = identification + assessment (hiểu rủi ro); risk control = mitigation + monitoring (xử lý và theo dõi rủi ro).`,
          en: `Risk analysis = identification + assessment (understanding risks); risk control = mitigation + monitoring (acting on and tracking them).`,
          zh: `风险分析 = 识别 + 评估（理解风险）；风险控制 = 缓解 + 监控（应对并跟踪风险）。`,
        },
      },
      {
        id: 'risk-assessment',
        note: {
          vi: `Risk assessment chỉ là một phần của risk analysis (phần sau identification).`,
          en: `Risk assessment is only one part of risk analysis (after identification).`,
          zh: `风险评估只是风险分析的一部分（在识别之后）。`,
        },
      },
    ],
  },

  'risk-assessment': {
    explanation: {
      vi: `Đánh giá rủi ro (risk assessment) xem xét các rủi ro đã nhận diện để xác định mức rủi ro (risk level). Theo syllabus gồm: phân loại rủi ro, xác định likelihood, impact và risk level, ưu tiên hóa và đề xuất cách xử lý. Có thể định lượng (likelihood × impact), định tính (risk matrix) hoặc kết hợp.`,
      en: `Risk assessment examines identified risks to determine the risk level. Per the syllabus it includes categorizing risks, determining likelihood, impact and risk level, prioritizing, and proposing ways to handle them. It may be quantitative (likelihood × impact), qualitative (risk matrix) or mixed.`,
      zh: `风险评估 (risk assessment) 审视已识别的风险以确定风险级别。按大纲包括：风险分类，确定可能性、影响和风险级别，排序并提出应对方式。可采用定量（可能性 × 影响）、定性（风险矩阵）或混合方法。`,
    },
    example: {
      vi: `Rủi ro "sai tỷ giá khi thanh toán quốc tế": likelihood 0,3, impact 9 → điểm 2,7, cao nhất danh sách → ưu tiên 1.`,
      en: `Risk "wrong exchange rate in international payments": likelihood 0.3, impact 9 → score 2.7, highest on the list → priority 1.`,
      zh: `风险“跨境支付汇率错误”：可能性 0.3，影响 9 → 得分 2.7，列表最高 → 优先级 1。`,
    },
    confusedWith: [
      {
        id: 'risk-identification',
        note: {
          vi: `Identification là tìm và mô tả rủi ro (lập danh sách); assessment là đánh giá mức độ và ưu tiên các rủi ro đó.`,
          en: `Identification finds and describes risks (the list); assessment rates their level and prioritizes them.`,
          zh: `识别是找出并描述风险（列清单）；评估是确定其级别并排序。`,
        },
      },
    ],
  },

  'risk-control': {
    explanation: {
      vi: `Kiểm soát rủi ro (risk control) gồm giảm thiểu rủi ro (risk mitigation) và giám sát rủi ro (risk monitoring) — mọi biện pháp được thực hiện để ứng phó với các rủi ro đã nhận diện và đánh giá. Các lựa chọn ứng phó: giảm thiểu bằng kiểm thử, chấp nhận rủi ro, chuyển giao rủi ro, hoặc kế hoạch dự phòng.`,
      en: `Risk control consists of risk mitigation and risk monitoring — all measures taken in response to identified and assessed risks. Response options include mitigation by testing, risk acceptance, risk transfer, or a contingency plan.`,
      zh: `风险控制 (risk control) 包括风险缓解和风险监控，即针对已识别和评估的风险所采取的所有措施。应对选项包括通过测试缓解、接受风险、转移风险或应急计划。`,
    },
    example: {
      vi: `Với rủi ro hiệu năng cao: team thêm load test (mitigation) và theo dõi thời gian phản hồi hằng tuần trên dashboard (monitoring).`,
      en: `For a high performance risk the team adds load tests (mitigation) and tracks response times weekly on a dashboard (monitoring).`,
      zh: `针对高性能风险，团队增加负载测试（缓解），并每周在看板上跟踪响应时间（监控）。`,
    },
    confusedWith: [
      {
        id: 'risk-analysis',
        note: {
          vi: `Analysis trả lời "rủi ro nào, mức nào?"; control trả lời "làm gì với nó và nó có hiệu quả không?".`,
          en: `Analysis answers "which risks, how high?"; control answers "what do we do about them, and is it working?".`,
          zh: `分析回答“有哪些风险、级别多高？”；控制回答“如何应对、是否有效？”。`,
        },
      },
    ],
  },

  'risk-identification': {
    explanation: {
      vi: `Nhận diện rủi ro (risk identification) là tìm, nhận biết và mô tả rủi ro nhằm tạo ra danh sách rủi ro đầy đủ. Các bên liên quan có thể dùng brainstorming, workshop, phỏng vấn, sơ đồ nhân quả (cause-effect diagram)…`,
      en: `Risk identification finds, recognizes and describes risks to generate a comprehensive risk list. Stakeholders can use brainstorming, workshops, interviews, cause-effect diagrams, etc.`,
      zh: `风险识别 (risk identification) 是发现、识别和描述风险，生成全面的风险清单。干系人可采用头脑风暴、研讨会、访谈、因果图等方法。`,
    },
    example: {
      vi: `Buổi brainstorming với PO, dev, tester, CSKH cho app giao đồ ăn ghi ra: định vị sai, thanh toán trùng, app chậm giờ cao điểm…`,
      en: `A brainstorming session with PO, devs, testers and customer support for a food delivery app lists: wrong location, double charging, slowness at peak hours…`,
      zh: `与产品负责人、开发、测试和客服为外卖应用开展头脑风暴，列出：定位错误、重复扣款、高峰期卡顿等。`,
    },
    confusedWith: [
      {
        id: 'risk-assessment',
        note: {
          vi: `Identification chỉ liệt kê và mô tả; chưa chấm điểm. Chấm likelihood/impact là assessment.`,
          en: `Identification only lists and describes; rating likelihood/impact is assessment.`,
          zh: `识别只列出并描述风险；评定可能性/影响属于评估。`,
        },
      },
    ],
  },

  'risk-impact': {
    explanation: {
      vi: `Tác động rủi ro (risk impact, harm) là thiệt hại/hậu quả sẽ xảy ra nếu rủi ro thành hiện thực. Cùng với risk likelihood, nó xác định risk level.`,
      en: `Risk impact (harm) is the damage or consequence if the risk becomes an actual outcome. Together with likelihood it determines the risk level.`,
      zh: `风险影响 (risk impact，危害) 是风险一旦发生所造成的损害或后果。与风险可能性一起决定风险级别。`,
    },
    example: {
      vi: `Lỗi tính sai liều thuốc trong app bệnh viện có impact rất cao (nguy hiểm tính mạng), dù khả năng xảy ra thấp.`,
      en: `A dosage miscalculation in a hospital app has very high impact (danger to life), even if its likelihood is low.`,
      zh: `医院应用中剂量计算错误的影响极高（危及生命），即使发生可能性很低。`,
    },
    confusedWith: [
      {
        id: 'risk-likelihood',
        note: {
          vi: `Impact: "nếu xảy ra thì nghiêm trọng đến đâu?"; likelihood: "khả năng xảy ra là bao nhiêu?".`,
          en: `Impact: "how bad if it happens?"; likelihood: "how probable is it?".`,
          zh: `影响：“发生后有多严重？”；可能性：“发生的概率多大？”。`,
        },
      },
    ],
  },

  'risk-level': {
    explanation: {
      vi: `Mức rủi ro (risk level, risk exposure) là thước đo rủi ro, được xác định bởi risk likelihood và risk impact. Risk level càng cao thì càng cần xử lý ưu tiên. Định lượng: likelihood × impact; định tính: tra risk matrix.`,
      en: `Risk level (risk exposure) is the measure of a risk defined by likelihood and impact. The higher the level, the more important its treatment. Quantitative: likelihood × impact; qualitative: a risk matrix.`,
      zh: `风险级别 (risk level，风险暴露) 是由风险可能性和风险影响决定的风险度量。级别越高，处理越重要。定量：可能性 × 影响；定性：风险矩阵。`,
    },
    example: {
      vi: `Ma trận 3×3: likelihood "Cao" và impact "Trung bình" → risk level "Cao" → test sâu với coverage cao hơn.`,
      en: `In a 3×3 matrix, likelihood "High" and impact "Medium" → risk level "High" → test more deeply with higher coverage.`,
      zh: `在 3×3 矩阵中，可能性“高”、影响“中” → 风险级别“高” → 以更高覆盖率深入测试。`,
    },
  },

  'risk-likelihood': {
    explanation: {
      vi: `Khả năng xảy ra rủi ro (risk likelihood) là xác suất rủi ro thành hiện thực; theo syllabus lớn hơn 0 và nhỏ hơn 1 (bằng 0 thì không phải rủi ro, bằng 1 thì đã là sự việc chắc chắn).`,
      en: `Risk likelihood is the probability that the risk occurs; per the syllabus it is greater than zero and less than one (0 means no risk, 1 means a certainty, not a risk).`,
      zh: `风险可能性 (risk likelihood) 是风险发生的概率；按大纲应大于 0 且小于 1（为 0 则无风险，为 1 则是必然事件而非风险）。`,
    },
    example: {
      vi: `Module mới viết bởi team mới, công nghệ chưa quen → likelihood lỗi cao hơn module ổn định đã chạy 3 năm.`,
      en: `A new module written by a new team on unfamiliar technology has a higher defect likelihood than a stable three-year-old module.`,
      zh: `新团队用不熟悉的技术编写的新模块，其出错可能性高于运行三年的稳定模块。`,
    },
    confusedWith: [
      {
        id: 'risk-impact',
        note: {
          vi: `Likelihood là xác suất; impact là mức thiệt hại. Hai yếu tố độc lập cùng tạo nên risk level.`,
          en: `Likelihood is probability; impact is damage. Two independent factors that together give the risk level.`,
          zh: `可能性是概率；影响是损害程度。两个独立因素共同决定风险级别。`,
        },
      },
    ],
  },

  'risk-management': {
    explanation: {
      vi: `Quản lý rủi ro (risk management) là quy trình xử lý rủi ro, giúp tổ chức tăng khả năng đạt mục tiêu, cải thiện chất lượng sản phẩm và tăng sự tin tưởng của các bên liên quan. Hoạt động chính: risk analysis (identification + assessment) và risk control (mitigation + monitoring).`,
      en: `Risk management is the process for handling risks; it helps organizations increase the likelihood of achieving objectives, improve product quality and increase stakeholder confidence. Main activities: risk analysis (identification + assessment) and risk control (mitigation + monitoring).`,
      zh: `风险管理 (risk management) 是处理风险的过程，帮助组织提高实现目标的可能性、改进产品质量并增强干系人信心。主要活动：风险分析（识别 + 评估）和风险控制（缓解 + 监控）。`,
    },
    example: {
      vi: `Mỗi sprint, test lead cập nhật risk register: thêm rủi ro mới, chấm lại điểm, ghi biện pháp và trạng thái.`,
      en: `Each sprint the test lead updates the risk register: adds new risks, re-scores them, records responses and status.`,
      zh: `每个冲刺，测试负责人更新风险登记册：新增风险、重新打分、记录应对措施和状态。`,
    },
    confusedWith: [
      {
        id: 'risk-based-testing',
        note: {
          vi: `Risk management là quy trình chung xử lý rủi ro; risk-based testing là cách tiếp cận kiểm thử dùng kết quả risk analysis/control để chọn và ưu tiên hoạt động test.`,
          en: `Risk management is the general process; risk-based testing is the test approach using its results to select and prioritize test activities.`,
          zh: `风险管理是通用过程；基于风险的测试是利用其结果选择并排序测试活动的测试方法。`,
        },
      },
    ],
  },

  'risk-mitigation': {
    explanation: {
      vi: `Giảm thiểu rủi ro (risk mitigation) là thực hiện các hành động đã đề xuất trong risk assessment để giảm (hoặc giữ) mức rủi ro ở ngưỡng định trước. Biện pháp bằng kiểm thử: chọn tester đủ kinh nghiệm, mức độc lập phù hợp, review và static analysis, kỹ thuật và coverage phù hợp, test type phù hợp với đặc tính chất lượng bị ảnh hưởng, dynamic testing kể cả regression testing.`,
      en: `Risk mitigation implements the actions proposed in risk assessment to reduce (or maintain) the risk level to specified levels. Mitigation by testing: suitably skilled testers, appropriate independence, reviews and static analysis, appropriate techniques and coverage, test types addressing affected quality characteristics, dynamic testing including regression testing.`,
      zh: `风险缓解 (risk mitigation) 是实施风险评估中提出的措施，将风险级别降低（或维持）到规定水平。通过测试缓解：选择技能合适的测试人员、适当的测试独立性、评审与静态分析、合适的技术与覆盖率、针对受影响质量特性的测试类型、包括回归测试在内的动态测试。`,
    },
    example: {
      vi: `Rủi ro bảo mật đăng nhập ở mức cao → thuê chuyên gia pentest độc lập và thêm static analysis vào CI.`,
      en: `High login security risk → hire an independent penetration tester and add static analysis to CI.`,
      zh: `登录安全风险高 → 聘请独立渗透测试专家，并在 CI 中加入静态分析。`,
    },
    confusedWith: [
      {
        id: 'risk-monitoring',
        note: {
          vi: `Mitigation là hành động giảm rủi ro; monitoring kiểm tra hành động đó có hiệu quả không và phát hiện rủi ro mới.`,
          en: `Mitigation acts to reduce risk; monitoring checks whether those actions work and spots emerging risks.`,
          zh: `缓解是降低风险的行动；监控检查这些行动是否有效并发现新风险。`,
        },
      },
    ],
  },

  'risk-monitoring': {
    explanation: {
      vi: `Giám sát rủi ro (risk monitoring) theo dõi và báo cáo trạng thái rủi ro cho các bên liên quan. Theo syllabus, mục đích là bảo đảm các biện pháp giảm thiểu có hiệu quả, thu thêm thông tin để cải thiện risk assessment và phát hiện rủi ro mới nổi (emerging risks).`,
      en: `Risk monitoring checks and reports the status of risks to stakeholders. Per the syllabus it aims to ensure mitigation actions are effective, obtain information to improve risk assessment, and identify emerging risks.`,
      zh: `风险监控 (risk monitoring) 检查并向干系人报告风险状态。按大纲，其目的是确保缓解措施有效、获取信息以改进风险评估，并识别新出现的风险。`,
    },
    example: {
      vi: `Test progress report hằng tuần có mục "Rủi ro mới và thay đổi": rủi ro hiệu năng đã giảm sau load test, nhưng phát sinh rủi ro mới do đổi nhà cung cấp SMS.`,
      en: `The weekly test progress report has "New and changed risks": the performance risk dropped after load testing, but a new risk arose from switching SMS provider.`,
      zh: `每周测试进度报告包含“新增与变更风险”：负载测试后性能风险下降，但更换短信供应商带来新风险。`,
    },
    confusedWith: [
      {
        id: 'risk-mitigation',
        note: {
          vi: `Monitoring không giảm rủi ro trực tiếp, nó theo dõi; mitigation mới là hành động giảm rủi ro.`,
          en: `Monitoring does not reduce risk directly — it tracks; mitigation is the reducing action.`,
          zh: `监控不直接降低风险，只是跟踪；缓解才是降低风险的行动。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary nói risk monitoring kiểm tra và báo cáo trạng thái của "các rủi ro đã biết"; syllabus còn giao cho nó việc phát hiện rủi ro mới nổi và cải thiện risk assessment.`,
      en: `The glossary limits risk monitoring to checking and reporting the status of "known risks"; the syllabus also includes identifying emerging risks and improving risk assessment.`,
      zh: `术语表将风险监控限定为检查并报告“已知风险”的状态；大纲还包括识别新出现的风险和改进风险评估。`,
    },
  },

  'risk-based-testing': {
    explanation: {
      vi: `Kiểm thử dựa trên rủi ro (risk-based testing) là cách tiếp cận trong đó việc chọn, ưu tiên và quản lý hoạt động test (và nguồn lực) dựa trên risk analysis và risk control. Rủi ro cao → test sớm hơn, kỹ hơn, coverage cao hơn, tester giỏi hơn; rủi ro thấp → test ít hơn.`,
      en: `Risk-based testing is the approach in which test activities (and resources) are selected, prioritized and managed based on risk analysis and risk control. Higher risk → earlier, deeper testing, higher coverage, more skilled testers; lower risk → less testing.`,
      zh: `基于风险的测试 (risk-based testing) 是根据风险分析和风险控制来选择、排序和管理测试活动（及资源）的方法。风险越高 → 越早、越深入测试，覆盖率越高，测试人员越资深；风险低 → 测试较少。`,
    },
    example: {
      vi: `Chỉ còn 3 ngày trước release: team chạy toàn bộ test cho thanh toán và đăng nhập (rủi ro cao), còn trang "Giới thiệu" chỉ smoke test.`,
      en: `Three days before release the team runs all tests for payment and login (high risk) and only smoke tests the "About" page.`,
      zh: `发布前仅剩 3 天：团队对支付和登录（高风险）执行全部测试，“关于我们”页面只做冒烟测试。`,
    },
    confusedWith: [
      {
        id: 'test-approach',
        note: {
          vi: `Test approach là cách thực hiện việc test nói chung; risk-based testing là một test approach cụ thể lấy rủi ro làm cơ sở.`,
          en: `A test approach is the manner of testing in general; risk-based testing is one specific approach driven by risk.`,
          zh: `测试方法是一般的测试实施方式；基于风险的测试是以风险为依据的一种具体方法。`,
        },
      },
    ],
  },

  'session-based-testing': {
    explanation: {
      vi: `Kiểm thử theo phiên (session-based testing) tổ chức hoạt động test thành các phiên (session) có time box. Syllabus mô tả nó như cách cấu trúc exploratory testing: tester dùng test charter chứa mục tiêu test, ghi lại bước và phát hiện vào test session sheet, sau phiên có buổi debriefing với các bên liên quan.`,
      en: `Session-based testing plans test activities as time-boxed test sessions. The syllabus describes it as a way to structure exploratory testing: the tester follows a test charter with test objectives, notes steps and discoveries on test session sheets, and a debriefing with stakeholders follows the session.`,
      zh: `基于会话的测试 (session-based testing) 将测试活动安排为有时间盒的测试会话。大纲将其描述为组织探索性测试的方式：测试人员依据含测试目标的测试章程，在会话记录表中记录步骤与发现，会话后与干系人进行汇报。`,
    },
    example: {
      vi: `Mỗi tester nhận 2 session 90 phút/ngày theo charter khác nhau; cuối ngày debrief 15 phút với test lead về bug và vùng chưa khám phá.`,
      en: `Each tester gets two 90-minute sessions a day with different charters; at the end of the day a 15-minute debrief with the test lead covers bugs and unexplored areas.`,
      zh: `每位测试人员每天按不同章程进行两次 90 分钟会话；当天结束时与测试负责人进行 15 分钟汇报，讨论缺陷和未探索区域。`,
    },
    confusedWith: [
      {
        id: 'test-charter',
        note: {
          vi: `Test charter là tài liệu mục tiêu/định hướng cho một session; session-based testing là cả cách tổ chức các session đó.`,
          en: `A test charter is the objective/guide for one session; session-based testing is the overall way of organizing sessions.`,
          zh: `测试章程是单次会话的目标/指引；基于会话的测试是组织这些会话的整体方式。`,
        },
      },
    ],
  },

  'state-transition-testing': {
    explanation: {
      vi: `Kiểm thử chuyển trạng thái (state transition testing) dùng state diagram hoặc state table mô hình hóa trạng thái, sự kiện, guard condition và hành động. Test case là chuỗi sự kiện gây chuỗi chuyển trạng thái. Ba tiêu chí: all states coverage (yếu nhất), valid transitions coverage (0-switch, phổ biến nhất), all transitions coverage (gồm cả thử chuyển không hợp lệ — tối thiểu cho phần mềm an toàn/quan trọng). State table hiển thị rõ chuyển không hợp lệ (ô trống).`,
      en: `State transition testing uses a state diagram or state table modelling states, events, guard conditions and actions. A test case is a sequence of events causing state changes. Criteria: all states coverage (weakest), valid transitions (0-switch) coverage (most widely used), all transitions coverage (also attempts invalid transitions — minimum for mission/safety-critical software). The state table explicitly shows invalid transitions as empty cells.`,
      zh: `状态转换测试 (state transition testing) 使用状态图或状态表对状态、事件、守卫条件和动作建模。测试用例是引起一系列状态变化的事件序列。覆盖准则：全状态覆盖（最弱）、有效转换覆盖（0-切换，最常用）、全转换覆盖（还尝试无效转换，是关键/安全软件的最低要求）。状态表以空单元格显式表示无效转换。`,
    },
    example: {
      vi: `Tài khoản: Hoạt động →(sai mật khẩu 3 lần)→ Bị khóa →(admin mở khóa)→ Hoạt động. Thử "đăng nhập đúng khi Bị khóa" là test chuyển không hợp lệ.`,
      en: `Account: Active →(3 wrong passwords)→ Locked →(admin unlocks)→ Active. Trying "correct login while Locked" tests an invalid transition.`,
      zh: `账户：正常 →（3 次密码错误）→ 锁定 →（管理员解锁）→ 正常。尝试“锁定状态下用正确密码登录”是在测试无效转换。`,
    },
    confusedWith: [
      {
        id: 'decision-table-testing',
        note: {
          vi: `Nếu kết quả phụ thuộc vào "đang ở trạng thái nào/đã xảy ra gì trước đó" → state transition; nếu chỉ phụ thuộc tổ hợp điều kiện hiện tại → decision table.`,
          en: `If the outcome depends on the current state/history → state transition; if only on the current combination of conditions → decision table.`,
          zh: `结果取决于当前状态/历史 → 状态转换；仅取决于当前条件组合 → 决策表。`,
        },
      },
    ],
  },

  'statement-coverage': {
    explanation: {
      vi: `Độ bao phủ câu lệnh (statement coverage) = số câu lệnh thực thi được đã chạy / tổng số câu lệnh thực thi được × 100%. 100% bảo đảm mọi câu lệnh chạy ít nhất một lần, nhưng không phát hiện mọi lỗi (vd. lỗi phụ thuộc dữ liệu như chia cho 0) và không bảo đảm test hết logic quyết định (có thể bỏ sót nhánh).`,
      en: `Statement coverage = executable statements exercised / total executable statements, as a percentage. 100% ensures each statement ran at least once, but it may miss data-dependent defects (e.g., division by zero) and does not ensure all decision logic or branches were tested.`,
      zh: `语句覆盖率 = 已执行的可执行语句数 / 可执行语句总数（百分比）。100% 确保每条语句至少执行一次，但可能遗漏与数据相关的缺陷（如除以零），也不保证测试了所有判定逻辑或分支。`,
    },
    example: {
      vi: `Hàm 10 câu lệnh, bộ test chạy qua 8 → statement coverage 80%.`,
      en: `A function has 10 executable statements and the tests execute 8 → 80% statement coverage.`,
      zh: `函数有 10 条可执行语句，测试执行了 8 条 → 语句覆盖率 80%。`,
    },
    confusedWith: [
      {
        id: 'branch-coverage',
        note: {
          vi: `100% branch coverage ⇒ 100% statement coverage, nhưng 100% statement coverage không ⇒ 100% branch coverage.`,
          en: `100% branch coverage implies 100% statement coverage, but not the other way round.`,
          zh: `100% 分支覆盖意味着 100% 语句覆盖，反之不成立。`,
        },
      },
      {
        id: 'statement-testing',
        note: {
          vi: `Statement testing là kỹ thuật thiết kế test; statement coverage là thước đo kết quả.`,
          en: `Statement testing is the technique; statement coverage is the measure.`,
          zh: `语句测试是技术；语句覆盖是度量。`,
        },
      },
    ],
  },

  'statement-testing': {
    explanation: {
      vi: `Kiểm thử câu lệnh (statement testing) là kỹ thuật hộp trắng, coverage item là các câu lệnh thực thi được; thiết kế test case chạy qua các câu lệnh cho đến khi đạt mức coverage chấp nhận được. Đây là kỹ thuật white-box đơn giản nhất trong CTFL.`,
      en: `Statement testing is a white-box technique whose coverage items are executable statements; test cases are designed to exercise statements until an acceptable coverage level is reached. It is the simplest white-box technique in CTFL.`,
      zh: `语句测试 (statement testing) 是一种白盒技术，覆盖项为可执行语句，设计测试用例执行语句直至达到可接受的覆盖水平。它是 CTFL 中最简单的白盒技术。`,
    },
    example: {
      vi: `Đoạn code có khối "ghi log cảnh báo" chỉ chạy khi tồn kho < 5; tester thêm test tồn kho = 3 để chạy được các câu lệnh trong khối đó.`,
      en: `A "log warning" block runs only when stock < 5; the tester adds a test with stock = 3 so its statements are executed.`,
      zh: `“记录警告日志”代码块仅在库存 < 5 时执行；测试人员增加库存 = 3 的测试以执行其中语句。`,
    },
    confusedWith: [
      {
        id: 'branch-testing',
        note: {
          vi: `Branch testing mạnh hơn: phải chạy cả nhánh không có câu lệnh nào (vd. nhánh false của if không có else).`,
          en: `Branch testing is stronger: it must also exercise branches with no statements (e.g., the false branch of an if without else).`,
          zh: `分支测试更强：还必须执行不含语句的分支（如无 else 的 if 的假分支）。`,
        },
      },
    ],
  },

  'technical-review': {
    explanation: {
      vi: `Review kỹ thuật (technical review) do những người có chuyên môn kỹ thuật thực hiện, được moderator dẫn dắt. Mục tiêu chính: đạt đồng thuận và ra quyết định về một vấn đề kỹ thuật; ngoài ra phát hiện anomaly, đánh giá chất lượng, tạo sự tin tưởng, nảy sinh ý tưởng mới, giúp tác giả cải thiện.`,
      en: `A technical review is performed by technically qualified reviewers and led by a moderator. Main objectives: gain consensus and make decisions on a technical problem; also detect anomalies, evaluate quality, build confidence, generate new ideas and help authors improve.`,
      zh: `技术评审 (technical review) 由具备技术资格的评审员进行，由主持人引导。主要目标是就技术问题达成共识并做出决定；同时发现异常、评估质量、建立信心、产生新想法并帮助作者改进。`,
    },
    example: {
      vi: `Các kiến trúc sư và senior dev review đề xuất chuyển từ REST sang message queue, thống nhất quyết định và ghi lại các rủi ro kỹ thuật.`,
      en: `Architects and senior developers review a proposal to move from REST to a message queue, reach a decision and record technical risks.`,
      zh: `架构师和资深开发评审从 REST 改为消息队列的方案，达成决定并记录技术风险。`,
    },
    confusedWith: [
      {
        id: 'inspection',
        note: {
          vi: `Inspection: chính thức nhất, mục tiêu chính tìm tối đa anomaly, thu thập metrics. Technical review: mục tiêu chính đồng thuận/quyết định kỹ thuật.`,
          en: `Inspection: most formal, mainly finds the maximum number of anomalies, collects metrics. Technical review: mainly consensus and technical decisions.`,
          zh: `审查：最正式，主要发现最多异常并收集度量。技术评审：主要是就技术问题达成共识和决定。`,
        },
      },
      {
        id: 'walkthrough',
        note: {
          vi: `Walkthrough do tác giả dẫn; technical review do moderator dẫn với reviewer có chuyên môn kỹ thuật.`,
          en: `A walkthrough is led by the author; a technical review is led by a moderator with technically qualified reviewers.`,
          zh: `走查由作者主导；技术评审由主持人主导，评审员具备技术资格。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary định nghĩa technical review là review chính thức nhằm xác định sai lệch so với đặc tả và tiêu chuẩn; syllabus không gọi nó là "formal" và nhấn mạnh mục tiêu đồng thuận, ra quyết định về vấn đề kỹ thuật, do moderator dẫn dắt.`,
      en: `The glossary defines a technical review as a formal review that identifies discrepancies from specifications and standards; the syllabus does not label it formal and emphasizes consensus and decision-making on a technical problem, led by a moderator.`,
      zh: `术语表将技术评审定义为识别与规格和标准偏差的正式评审；大纲未称其为“正式”，而强调由主持人引导、就技术问题达成共识并做决定。`,
    },
  },

  'test-approach': {
    explanation: {
      vi: `Cách tiếp cận kiểm thử (test approach) là cách thức thực hiện các công việc kiểm thử. Trong syllabus, test approach là một phần nội dung của test plan, gồm: test level, test type, test technique, test deliverable, entry/exit criteria, mức độc lập, metrics, yêu cầu dữ liệu và môi trường test, và độ lệch so với test policy/test strategy. Risk-based testing là một ví dụ test approach.`,
      en: `A test approach is the manner of implementing test tasks. In the syllabus it is part of the test plan content: test levels, types, techniques, deliverables, entry and exit criteria, independence, metrics, test data and environment requirements, and deviations from the test policy and strategy. Risk-based testing is one example.`,
      zh: `测试方法 (test approach) 是实施测试任务的方式。在大纲中它是测试计划的内容之一：测试级别、类型、技术、交付物、入口/出口准则、独立性、度量、测试数据与环境需求，以及与测试方针和测试策略的偏离。基于风险的测试就是一种测试方法。`,
    },
    example: {
      vi: `Test plan dự án ví điện tử: "Test approach: risk-based; component test tự động trong CI; system test dùng EP/BVA và exploratory; exit criteria: không còn bug Critical, 95% test pass".`,
      en: `E-wallet test plan: "Test approach: risk-based; automated component tests in CI; system tests with EP/BVA and exploratory; exit criteria: no open Critical bugs, 95% tests passed".`,
      zh: `电子钱包测试计划：“测试方法：基于风险；CI 中自动化组件测试；系统测试采用 EP/BVA 和探索性测试；出口准则：无未关闭的致命缺陷，95% 用例通过”。`,
    },
    confusedWith: [
      {
        id: 'test-strategy',
        note: {
          vi: `Test strategy mô tả cách test chung ở mức tổ chức/chương trình; test approach là cách áp dụng cụ thể cho một dự án/test plan (có thể lệch khỏi strategy).`,
          en: `A test strategy describes testing generically at organization/programme level; the test approach is its concrete application for a project in the test plan (may deviate from the strategy).`,
          zh: `测试策略在组织/项目群层面概括描述测试；测试方法是在具体项目测试计划中的落地（可偏离策略）。`,
        },
      },
      {
        id: 'test-plan',
        note: {
          vi: `Test plan là tài liệu (mục tiêu, nguồn lực, lịch, rủi ro…); test approach là một phần nội dung của nó.`,
          en: `The test plan is the document (objectives, resources, schedule, risks…); the test approach is one part of it.`,
          zh: `测试计划是文档（目标、资源、进度、风险等）；测试方法是其中一部分内容。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary định nghĩa rất ngắn ("cách thức thực hiện công việc test"); syllabus dùng thuật ngữ như một mục trong test plan với nội dung cụ thể (test level, type, technique, entry/exit criteria, độc lập, metrics, dữ liệu/môi trường test…).`,
      en: `The glossary is terse ("the manner of implementing test tasks"); the syllabus uses the term as a test plan section with concrete content (levels, types, techniques, entry/exit criteria, independence, metrics, test data/environment…).`,
      zh: `术语表定义很简短（“实施测试任务的方式”）；大纲将其作为测试计划的一个部分，并列出具体内容（级别、类型、技术、入口/出口准则、独立性、度量、测试数据/环境等）。`,
    },
  },

  'test-automation-framework': {
    explanation: {
      vi: `Khung tự động hóa kiểm thử (TAF – test automation framework) là tập hợp các test harness và thư viện test hỗ trợ tự động hóa. Trong syllabus (ATDD), khi test case được viết theo định dạng TAF hỗ trợ, developer có thể tự động hóa chúng trong lúc hiện thực tính năng, biến acceptance test thành yêu cầu có thể thực thi.`,
      en: `A test automation framework (TAF) is a set of test harnesses and test libraries for test automation. In the syllabus (ATDD), when test cases are captured in a format a TAF supports, developers can automate them while implementing the feature, turning acceptance tests into executable requirements.`,
      zh: `测试自动化框架 (TAF) 是用于测试自动化的测试套件 (test harness) 与测试库的集合。在大纲（ATDD）中，若用例采用 TAF 支持的格式，开发人员可在实现功能的同时将其自动化，使验收测试成为可执行需求。`,
    },
    example: {
      vi: `Team dùng Cucumber + Selenium với thư viện page object và báo cáo chung; kịch bản Gherkin của PO chạy được trực tiếp trong CI.`,
      en: `The team uses Cucumber + Selenium with shared page-object libraries and reporting; the PO's Gherkin scenarios run directly in CI.`,
      zh: `团队使用 Cucumber + Selenium 及共享的页面对象库和报告；产品负责人的 Gherkin 场景直接在 CI 中运行。`,
    },
    confusedWith: [
      {
        id: 'test-harness',
        note: {
          vi: `Test harness là môi trường gồm stub/driver để chạy test; TAF là khung lớn hơn gồm nhiều harness và thư viện.`,
          en: `A test harness is an environment of stubs and drivers to run tests; a TAF is the larger framework of harnesses and libraries.`,
          zh: `测试套件（test harness）是运行测试所需的桩和驱动环境；TAF 是包含多个套件和库的更大框架。`,
        },
      },
    ],
  },

  'test-policy': {
    explanation: {
      vi: `Chính sách kiểm thử (test policy) là tài liệu cấp cao mô tả nguyên tắc, cách tiếp cận và mục tiêu chính của tổ chức về kiểm thử. Theo syllabus, test plan phải thể hiện việc tuân theo test policy và test strategy hiện có (hoặc giải thích lý do lệch).`,
      en: `A test policy is high-level documentation of the organization's principles, approach and major objectives regarding testing. Per the syllabus, a test plan demonstrates that testing will adhere to the existing test policy and test strategy (or explains deviations).`,
      zh: `测试方针 (test policy) 是描述组织在测试方面的原则、方法和主要目标的高层文档。按大纲，测试计划应表明测试将遵循现有测试方针和测试策略（或说明偏离原因）。`,
    },
    example: {
      vi: `Test policy công ty: "Mọi tính năng phải có test tự động trước khi merge; tester tham gia từ giai đoạn yêu cầu; lỗi Critical chặn release".`,
      en: `Company test policy: "Every feature needs automated tests before merge; testers join from the requirements phase; Critical bugs block release".`,
      zh: `公司测试方针：“每个功能合并前须有自动化测试；测试人员从需求阶段参与；致命缺陷阻止发布”。`,
    },
    confusedWith: [
      {
        id: 'test-strategy',
        note: {
          vi: `Test policy trả lời "tại sao và nguyên tắc gì" ở mức tổ chức; test strategy mô tả "test như thế nào" chung cho tổ chức/chương trình; test plan cụ thể cho một dự án.`,
          en: `Test policy: the "why" and principles at organization level; test strategy: the generic "how"; test plan: specific to a project.`,
          zh: `测试方针：组织层面的“为什么”和原则；测试策略：通用的“如何测试”；测试计划：针对具体项目。`,
        },
      },
    ],
  },

  'test-pyramid': {
    explanation: {
      vi: `Kim tự tháp kiểm thử (test pyramid) là mô hình cho thấy các test có độ chi tiết (granularity) khác nhau, hỗ trợ team trong tự động hóa và phân bổ effort. Tầng càng cao: granularity càng thấp, độ cô lập càng thấp, thời gian chạy càng lâu. Tầng dưới: nhiều test nhỏ, độc lập, nhanh; tầng trên: ít test end-to-end phức tạp. Số tầng và tên có thể khác nhau (vd. Cohn: unit – service – UI).`,
      en: `The test pyramid shows that tests may have different granularity, supporting the team in test automation and effort allocation. Higher layers: lower granularity, lower isolation, longer execution time. Bottom: many small, isolated, fast tests; top: few complex end-to-end tests. Layer number and names vary (e.g., Cohn: unit – service – UI).`,
      zh: `测试金字塔 (test pyramid) 表明测试可具有不同粒度，支持团队进行测试自动化和工作量分配。层级越高，粒度越低、隔离度越低、执行时间越长。底层是大量小而独立、快速的测试；顶层是少量复杂的端到端测试。层数和命名可不同（如 Cohn：单元 – 服务 – UI）。`,
    },
    example: {
      vi: `Dự án có 2.000 unit test (chạy 2 phút), 300 API test, 30 test UI end-to-end chạy ban đêm.`,
      en: `A project has 2,000 unit tests (2 minutes), 300 API tests, and 30 end-to-end UI tests run nightly.`,
      zh: `某项目有 2000 个单元测试（2 分钟跑完）、300 个 API 测试和 30 个夜间运行的端到端 UI 测试。`,
    },
    confusedWith: [
      {
        id: 'testing-quadrants',
        note: {
          vi: `Test pyramid nói về số lượng/độ chi tiết test theo tầng (phục vụ tự động hóa); testing quadrants phân loại test theo hướng nghiệp vụ/công nghệ và hỗ trợ team/phê bình sản phẩm.`,
          en: `The pyramid is about amount/granularity of tests per layer (for automation); the quadrants classify tests as business/technology facing and supporting the team/critiquing the product.`,
          zh: `测试金字塔关注各层测试的数量/粒度（服务于自动化）；测试象限按面向业务/技术、支持团队/评判产品对测试分类。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary mô tả test pyramid như quan hệ "lượng kiểm thử theo mỗi test level"; syllabus giải thích theo granularity, mức cô lập và thời gian chạy, các tầng là nhóm test (không nhất thiết là test level) và gắn với tự động hóa.`,
      en: `The glossary describes the amount of testing "per level"; the syllabus explains it via granularity, isolation and execution time, with layers as groups of tests (not necessarily test levels) and a focus on automation.`,
      zh: `术语表描述为“每个级别的测试量”关系；大纲则从粒度、隔离度和执行时间解释，层是测试分组（不一定是测试级别），并与自动化相关。`,
    },
  },

  'test-report': {
    explanation: {
      vi: `Báo cáo kiểm thử (test report) là tài liệu tóm tắt hoạt động test và kết quả test. Syllabus phân biệt hai loại: test progress report (định kỳ, trong quá trình test, phục vụ test control) và test completion report (khi hoàn tất một hoạt động test, phục vụ đánh giá và bài học). Nội dung và mức độ chính thức tùy người đọc.`,
      en: `A test report summarizes testing and test results. The syllabus distinguishes test progress reports (regular, during testing, supporting test control) and test completion reports (at the end of a test activity, for evaluation and lessons learned). Content and formality depend on the audience.`,
      zh: `测试报告 (test report) 汇总测试活动和测试结果。大纲区分两类：测试进度报告（测试期间定期出具，支持测试控制）和测试完成报告（测试活动结束时出具，用于评价和经验总结）。内容和正式程度取决于受众。`,
    },
    example: {
      vi: `Báo cáo cuối sprint gửi PO: 120/130 test pass, 3 bug Major còn mở, rủi ro hiệu năng chưa được giảm thiểu, đề xuất release có điều kiện.`,
      en: `End-of-sprint report to the PO: 120/130 tests passed, 3 Major bugs open, performance risk not mitigated, conditional release recommended.`,
      zh: `冲刺末给产品负责人的报告：130 个用例通过 120 个，3 个严重缺陷未关闭，性能风险未缓解，建议有条件发布。`,
    },
    confusedWith: [
      {
        id: 'test-progress-report',
        note: {
          vi: `Test report là khái niệm chung; test progress report là loại định kỳ trong lúc test (tiến độ, cản trở, metrics, rủi ro mới, kế hoạch kỳ tới).`,
          en: `Test report is the umbrella term; a test progress report is the regular one during testing (progress, impediments, metrics, new risks, next period).`,
          zh: `测试报告是统称；测试进度报告是测试期间定期出具的（进度、障碍、度量、新风险、下期计划）。`,
        },
      },
      {
        id: 'test-completion-report',
        note: {
          vi: `Test completion report làm một lần khi xong test level/chu kỳ/dự án: tóm tắt, đánh giá chất lượng so với exit criteria, sai lệch, rủi ro chưa xử lý, bài học.`,
          en: `A test completion report is produced once at the end of a level/cycle/project: summary, quality evaluation against exit criteria, deviations, unmitigated risks, lessons learned.`,
          zh: `测试完成报告在级别/周期/项目结束时出具一次：总结、对照出口准则的质量评价、偏差、未缓解风险、经验教训。`,
        },
      },
    ],
  },

  'test-technique': {
    explanation: {
      vi: `Kỹ thuật kiểm thử (test technique) là thủ tục dùng để xác định điều kiện test, thiết kế test case và chỉ định dữ liệu test. Nó giúp tester trong phân tích (test cái gì) và thiết kế (test thế nào), tạo ra bộ test nhỏ nhưng đủ một cách có hệ thống, và xác định coverage item. Syllabus chia thành: black-box, white-box, experience-based.`,
      en: `A test technique is a procedure to define test conditions, design test cases and specify test data. It supports test analysis (what to test) and test design (how to test), systematically producing a relatively small but sufficient set of test cases, and identifies coverage items. The syllabus classifies them as black-box, white-box and experience-based.`,
      zh: `测试技术 (test technique) 是用于定义测试条件、设计测试用例和指定测试数据的过程。它支持测试分析（测什么）与测试设计（怎么测），系统地产生数量较少但足够的测试用例，并识别覆盖项。大纲分为黑盒、白盒和基于经验三类。`,
    },
    example: {
      vi: `Với form đăng ký, tester dùng EP cho trường email, BVA cho tuổi, decision table cho quy tắc khuyến mãi.`,
      en: `For a sign-up form the tester uses EP for email, BVA for age and a decision table for promotion rules.`,
      zh: `对于注册表单，测试人员对邮箱用等价类划分，对年龄用边界值分析，对促销规则用决策表。`,
    },
    confusedWith: [
      {
        id: 'test-approach',
        note: {
          vi: `Test technique là phương pháp thiết kế test cụ thể (EP, BVA…); test approach là cách tiếp cận tổng thể cho dự án, có thể chọn nhiều technique.`,
          en: `A test technique is a specific design method (EP, BVA…); a test approach is the overall manner of testing for a project, which selects techniques.`,
          zh: `测试技术是具体的设计方法（EP、BVA 等）；测试方法是项目的整体测试方式，会选用多种技术。`,
        },
      },
    ],
  },

  'testing-quadrants': {
    explanation: {
      vi: `Các góc phần tư kiểm thử (testing quadrants, Brian Marick) nhóm test level với test type, hoạt động, kỹ thuật và sản phẩm phù hợp trong phát triển Agile, theo hai trục: hướng nghiệp vụ (business facing) vs hướng công nghệ (technology facing), và hỗ trợ team vs phê bình sản phẩm. Q1: component/component integration test (tự động, CI). Q2: functional test, ví dụ, user story test, prototype UX, API test, mô phỏng. Q3: exploratory, usability, UAT (thường thủ công). Q4: smoke test và test phi chức năng trừ usability (thường tự động).`,
      en: `The testing quadrants (Brian Marick) group test levels with appropriate test types, activities, techniques and work products in agile development, along two dimensions: business vs technology facing, and supporting the team vs critiquing the product. Q1: component and component integration tests (automated, CI). Q2: functional tests, examples, user story tests, UX prototypes, API testing, simulations. Q3: exploratory, usability, UAT (often manual). Q4: smoke tests and non-functional tests except usability (often automated).`,
      zh: `测试象限 (testing quadrants，Brian Marick) 在敏捷开发中把测试级别与相应的测试类型、活动、技术和工作产品分组，依据两个维度：面向业务 vs 面向技术，支持团队 vs 评判产品。Q1：组件及组件集成测试（自动化、纳入 CI）。Q2：功能测试、示例、用户故事测试、用户体验原型、API 测试、仿真。Q3：探索性测试、易用性测试、用户验收测试（多为手工）。Q4：冒烟测试和除易用性外的非功能测试（多为自动化）。`,
    },
    example: {
      vi: `Test lead dùng quadrants để kiểm tra kế hoạch: đã có unit test (Q1), acceptance test (Q2), load test (Q4) nhưng chưa có buổi exploratory/usability nào (Q3) → bổ sung.`,
      en: `The test lead checks the plan against the quadrants: unit tests (Q1), acceptance tests (Q2) and load tests (Q4) exist, but no exploratory/usability sessions (Q3) → add them.`,
      zh: `测试负责人用象限检查计划：已有单元测试（Q1）、验收测试（Q2）、负载测试（Q4），但缺少探索性/易用性测试（Q3）→ 补充。`,
    },
    confusedWith: [
      {
        id: 'test-pyramid',
        note: {
          vi: `Quadrants giúp đảm bảo đủ loại test cần thiết; pyramid giúp cân đối số lượng test giữa các tầng tự động hóa.`,
          en: `Quadrants ensure all needed kinds of tests are included; the pyramid balances the number of tests across automation layers.`,
          zh: `象限确保包含所需的各类测试；金字塔平衡各自动化层的测试数量。`,
        },
      },
    ],
  },

  walkthrough: {
    explanation: {
      vi: `Walkthrough (duyệt qua) là loại review do tác giả dẫn dắt, đưa các thành viên đi qua sản phẩm công việc; họ đặt câu hỏi và góp ý. Có thể phục vụ nhiều mục tiêu: đánh giá chất lượng, tạo sự tin tưởng, đào tạo reviewer, đạt đồng thuận, nảy ý tưởng mới, giúp tác giả cải thiện, phát hiện anomaly. Reviewer có thể review cá nhân trước nhưng không bắt buộc.`,
      en: `A walkthrough is a review led by the author, who takes participants through the work product while they ask questions and comment. It can serve many objectives: evaluating quality, building confidence, educating reviewers, gaining consensus, generating ideas, helping authors improve, detecting anomalies. Individual preparation is possible but not required.`,
      zh: `走查 (walkthrough) 是由作者主导的评审，作者带领参与者逐步浏览工作产品，参与者提问和评论。可服务多种目标：评估质量、建立信心、培训评审员、达成共识、产生新想法、帮助作者改进、发现异常。评审员可事先个人评审，但不是必需的。`,
    },
    example: {
      vi: `BA trình chiếu luồng nghiệp vụ "Hoàn tiền" cho dev và tester mới, giải thích từng bước; mọi người hỏi và góp ý, tester mới hiểu nghiệp vụ nhanh hơn.`,
      en: `A BA presents the "Refund" business flow to developers and new testers step by step; they ask questions and comment, and the new testers learn the domain faster.`,
      zh: `业务分析师向开发和新测试人员逐步讲解“退款”业务流程；大家提问和评论，新测试人员更快理解业务。`,
    },
    confusedWith: [
      {
        id: 'inspection',
        note: {
          vi: `Walkthrough do tác giả dẫn, mục tiêu đa dạng (cả đào tạo); inspection không cho tác giả làm leader/scribe, mục tiêu chính tìm tối đa anomaly.`,
          en: `A walkthrough is led by the author with varied goals (including education); in an inspection the author cannot lead or scribe, and the main goal is maximum anomalies.`,
          zh: `走查由作者主导，目标多样（包括培训）；审查中作者不能担任组长或记录员，主要目标是发现最多异常。`,
        },
      },
    ],
    versionNote: {
      vi: `Glossary xếp walkthrough là một loại review chính thức (formal review); syllabus chỉ liệt kê nó giữa informal review và các loại chính thức hơn, không gọi là "formal", và nói review cá nhân trước đó là không bắt buộc.`,
      en: `The glossary classifies a walkthrough as a type of formal review; the syllabus lists it between the informal review and more formal types without calling it formal, and says individual preparation is not required.`,
      zh: `术语表将走查归为正式评审的一种；大纲把它列在非正式评审与更正式类型之间，没有称其为“正式”，并指出事先个人评审不是必需的。`,
    },
  },

  'white-box-test-technique': {
    explanation: {
      vi: `Kỹ thuật kiểm thử hộp trắng (white-box test technique), còn gọi structure-based, dựa trên phân tích cấu trúc và xử lý bên trong của đối tượng kiểm thử. Test case phụ thuộc vào thiết kế nên chỉ tạo được sau khi có thiết kế/hiện thực. CTFL gồm statement testing và branch testing. Ưu điểm: xét toàn bộ hiện thực, đo coverage khách quan; nhược điểm: không phát hiện lỗi thiếu sót yêu cầu (defects of omission). Có thể dùng cả trong static testing (dry run code).`,
      en: `White-box (structure-based) test techniques analyze the test object's internal structure and processing. Test cases depend on the design, so they can only be created after design or implementation. CTFL covers statement and branch testing. Strength: the whole implementation is considered and coverage is objectively measured; weakness: unimplemented requirements (defects of omission) may be missed. They can also be used in static testing (dry runs).`,
      zh: `白盒测试技术（基于结构的技术）分析测试对象的内部结构和处理逻辑。测试用例依赖于设计，只能在设计或实现之后创建。CTFL 涵盖语句测试和分支测试。优点：考虑整个实现并能客观度量覆盖率；缺点：可能发现不了未实现需求导致的遗漏缺陷。也可用于静态测试（代码走读/干运行）。`,
    },
    example: {
      vi: `Đặc tả tính phí phạt mơ hồ, tester đọc code và thiết kế test để đạt 100% branch coverage cho hàm tinhPhiPhat().`,
      en: `The late-fee specification is vague, so the tester reads the code and designs tests for 100% branch coverage of calculateLateFee().`,
      zh: `滞纳金规格说明含糊，测试人员阅读代码并为 calculateLateFee() 设计达到 100% 分支覆盖的测试。`,
    },
    confusedWith: [
      {
        id: 'black-box-test-technique',
        note: {
          vi: `Black-box: test vẫn dùng được khi code đổi mà hành vi giữ nguyên. White-box: test phụ thuộc cấu trúc code, nhưng cho số đo coverage code thực tế.`,
          en: `Black-box tests survive code changes if behavior stays the same; white-box tests depend on the code structure but give real code coverage measures.`,
          zh: `黑盒测试在代码变化而行为不变时仍有效；白盒测试依赖代码结构，但能提供真实的代码覆盖度量。`,
        },
      },
    ],
  },
};
