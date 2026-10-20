import type { LText } from '../../../types';
import type { ChapterContent, QaQuestion, SectionNotes } from '../../types';

// Supplementary teaching content for CTFL v4.0.1 chapter 4 "Test Analysis and Design" (written for this app).
// Source text, LOs and keywords are read from extracted/ctfl-v4.0.1.json; everything below is supplementary.

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

// ---------- sections ----------

const SECTIONS: SectionNotes[] = [
  {
    number: '4.1',
    explain: L(
      `Kỹ thuật kiểm thử (test technique) hỗ trợ tester ở hai hoạt động: phân tích kiểm thử (test analysis — kiểm thử CÁI GÌ) và thiết kế kiểm thử (test design — kiểm thử NHƯ THẾ NÀO). Chúng giúp tạo ra một bộ test case tương đối nhỏ nhưng đủ, một cách có hệ thống, và giúp xác định điều kiện kiểm thử (test condition), mục bao phủ (coverage item) và dữ liệu kiểm thử (test data). Giáo trình chia kỹ thuật thành ba nhóm: (1) hộp đen (black-box, còn gọi specification-based) — dựa trên hành vi được đặc tả, không nhìn vào cấu trúc bên trong, nên test case độc lập với cách cài đặt và vẫn dùng được khi code thay đổi mà hành vi yêu cầu giữ nguyên; (2) hộp trắng (white-box, còn gọi structure-based) — dựa trên cấu trúc và xử lý bên trong, nên chỉ tạo được sau khi đã có thiết kế hoặc cài đặt; (3) dựa trên kinh nghiệm (experience-based) — dùng kiến thức, kinh nghiệm của tester; hiệu quả phụ thuộc nhiều vào kỹ năng tester; có thể tìm lỗi mà hai nhóm kia bỏ sót, nên mang tính bổ sung (complementary).`,
      `Test techniques support the tester in test analysis (what to test) and test design (how to test). They help build a relatively small but sufficient set of test cases systematically, and help define test conditions, identify coverage items and identify test data. The syllabus uses three categories: (1) black-box (specification-based) — based on the specified behavior without reference to internal structure, so test cases are independent of the implementation and stay useful if the code changes but the required behavior does not; (2) white-box (structure-based) — based on internal structure and processing, so test cases can only be created after design or implementation; (3) experience-based — use the testers’ knowledge and experience; effectiveness depends heavily on the tester’s skills; they can find defects missed by the other two, so they are complementary.`,
      `测试技术（test technique）在测试分析（test analysis，测什么）和测试设计（test design，怎么测）中为测试人员提供支持，帮助系统地得到一组相对较小但足够的测试用例，并帮助定义测试条件、识别覆盖项（coverage item）和测试数据。大纲把测试技术分为三类：(1) 黑盒测试技术（black-box，又称基于规格说明的技术）——基于对规定行为的分析，不涉及内部结构，因此测试用例与实现无关，实现改变而要求的行为不变时仍然有用；(2) 白盒测试技术（white-box，又称基于结构的技术）——基于内部结构和处理，只有在设计或实现之后才能创建；(3) 基于经验的测试技术（experience-based）——利用测试人员的知识和经验，效果在很大程度上取决于测试人员的技能，能发现前两类遗漏的缺陷，因此是补充性的。`,
    ),
    example: L(
      `Ví dụ với chức năng đăng nhập: hộp đen — từ đặc tả "mật khẩu 8–16 ký tự" suy ra các phân vùng và giá trị biên; hộp trắng — đọc code hàm checkPassword() để thiết kế test đi qua mọi nhánh if; dựa trên kinh nghiệm — tester nhớ rằng các dự án trước hay lỗi khi người dùng dán mật khẩu có khoảng trắng ở cuối, nên thử ngay trường hợp đó.`,
      `Login feature: black-box — from the spec "password 8–16 characters" derive partitions and boundary values; white-box — read the code of checkPassword() and design tests that exercise every if-branch; experience-based — the tester remembers that earlier projects failed when users pasted a password with a trailing space, so tries that at once.`,
      `以登录功能为例：黑盒——根据规格“密码 8–16 个字符”推导等价类和边界值；白盒——阅读 checkPassword() 的代码，设计覆盖每个 if 分支的测试；基于经验——测试人员记得以往项目中用户粘贴带尾随空格的密码时常出错，于是马上测试这种情况。`,
    ),
    keyPoints: [
      L(`Hộp đen: dựa trên đặc tả → test case không phụ thuộc cài đặt.`, `Black-box: based on the specification → test cases independent of the implementation.`, `黑盒：基于规格 → 测试用例与实现无关。`),
      L(`Hộp trắng: dựa trên cấu trúc bên trong → chỉ tạo được sau thiết kế/cài đặt.`, `White-box: based on internal structure → only after design/implementation.`, `白盒：基于内部结构 → 只能在设计/实现之后创建。`),
      L(`Dựa trên kinh nghiệm: phụ thuộc kỹ năng tester, bổ sung cho hai nhóm kia.`, `Experience-based: depends on tester skill, complements the other two.`, `基于经验：取决于测试人员技能，是前两类的补充。`),
    ],
    termIds: ['test-technique', 'black-box-test-technique', 'white-box-test-technique', 'experience-based-test-technique', 'test-analysis', 'test-design', 'coverage-item', 'test-condition', 'test-data'],
  },
  {
    number: '4.2',
    explain: L(
      `Mục 4.2 giới thiệu bốn kỹ thuật hộp đen thông dụng: phân vùng tương đương (equivalence partitioning), phân tích giá trị biên (boundary value analysis), kiểm thử bảng quyết định (decision table testing) và kiểm thử chuyển trạng thái (state transition testing). Cả bốn đều ở mức K3: bạn phải tự áp dụng được để suy ra test case, xác định mục bao phủ và tính mức bao phủ (coverage) dưới dạng phần trăm.`,
      `Section 4.2 introduces four commonly used black-box techniques: equivalence partitioning, boundary value analysis, decision table testing and state transition testing. All four are K3: you must be able to apply them to derive test cases, identify coverage items and compute coverage as a percentage.`,
      `4.2 节介绍四种常用黑盒测试技术：等价类划分（equivalence partitioning）、边界值分析（boundary value analysis）、决策表测试（decision table testing）和状态转换测试（state transition testing）。四者均为 K3：需要能实际应用它们推导测试用例、识别覆盖项并以百分比计算覆盖率。`,
    ),
    keyPoints: [
      L(`Mỗi kỹ thuật có mục bao phủ riêng: phân vùng, giá trị biên, cột (quy tắc) khả thi, trạng thái/chuyển trạng thái.`, `Each technique has its own coverage items: partitions, boundary values, feasible columns, states/transitions.`, `每种技术有自己的覆盖项：等价类、边界值、可行列（规则）、状态/转换。`),
      L(`Bao phủ = số mục đã thực thi / tổng số mục, tính bằng phần trăm.`, `Coverage = items exercised / total items, expressed as a percentage.`, `覆盖率 = 已执行的覆盖项数 / 覆盖项总数，以百分比表示。`),
    ],
    termIds: ['black-box-test-technique', 'equivalence-partitioning', 'boundary-value-analysis', 'decision-table-testing', 'state-transition-testing', 'coverage'],
  },
  {
    number: '4.2.1',
    explain: L(
      `Phân vùng tương đương (EP) chia dữ liệu thành các phân vùng tương đương (equivalence partition) với kỳ vọng mọi phần tử trong một phân vùng được đối tượng kiểm thử xử lý giống nhau. Nếu một giá trị trong phân vùng phát hiện lỗi thì giá trị khác trong cùng phân vùng cũng phát hiện được → mỗi phân vùng chỉ cần một test. Có thể phân vùng cho mọi phần tử dữ liệu: đầu vào, đầu ra, cấu hình, giá trị nội bộ, giá trị thời gian, tham số giao diện. Phân vùng có thể liên tục/rời rạc, có thứ tự/không thứ tự, hữu hạn/vô hạn; các phân vùng không được chồng lấn và không được rỗng. Phân vùng hợp lệ (valid) chứa giá trị hợp lệ, phân vùng không hợp lệ (invalid) chứa giá trị không hợp lệ — định nghĩa "hợp lệ" có thể khác nhau giữa các nhóm. Mục bao phủ là các phân vùng; 100% bao phủ nghĩa là mỗi phân vùng (KỂ CẢ phân vùng không hợp lệ) được thực thi ít nhất một lần. Khi có nhiều tập phân vùng (nhiều tham số), tiêu chí đơn giản nhất là Each Choice coverage: mỗi phân vùng của mỗi tập được thực thi ít nhất một lần, không xét tổ hợp.`,
      `Equivalence partitioning (EP) divides data into equivalence partitions, expecting all elements of a partition to be processed the same way by the test object. If one value of a partition detects a defect, any other value of that partition should too → one test per partition is sufficient. Partitions can be identified for any data element: inputs, outputs, configuration items, internal values, time-related values, interface parameters. They may be continuous or discrete, ordered or unordered, finite or infinite; they must not overlap and must be non-empty. A valid partition contains valid values, an invalid partition invalid values — what counts as valid may vary between teams. The coverage items are the partitions; 100% coverage means every identified partition (INCLUDING invalid ones) is exercised at least once. With several sets of partitions (several parameters), the simplest criterion is Each Choice coverage: each partition of each set exercised at least once, without considering combinations.`,
      `等价类划分（EP）把数据划分为等价类（equivalence partition），预期同一等价类中的所有元素会被测试对象以相同方式处理。若一个值发现了缺陷，同一等价类中的其他值也应能发现 → 每个等价类测一次即可。等价类可针对任何数据元素：输入、输出、配置项、内部值、时间相关值、接口参数。等价类可以是连续或离散、有序或无序、有限或无限的；不得重叠，且必须非空。有效等价类包含有效值，无效等价类包含无效值——“有效”的定义因团队而异。覆盖项就是等价类；100% 覆盖要求每个已识别等价类（包括无效等价类）至少被执行一次。存在多组等价类（多个参数）时，最简单的准则是 Each Choice 覆盖：每组中的每个等价类至少执行一次，不考虑组合。`,
    ),
    example: L(
      `Ô "Số lượng vé" nhận số nguyên 1–10. Phân vùng: P1 ≤ 0 (không hợp lệ, báo lỗi), P2 1–10 (hợp lệ), P3 ≥ 11 (không hợp lệ, báo "tối đa 10"). Bộ test tối thiểu cho 100% EP: −3, 5, 15 → 3 test. Nếu chỉ chạy 5 và 15 thì bao phủ = 2/3 ≈ 67%.
Each Choice: loại vé {Người lớn, Trẻ em, Người cao tuổi} và thanh toán {Thẻ, Ví điện tử}. 3 test là đủ: (Người lớn, Thẻ), (Trẻ em, Ví), (Người cao tuổi, Thẻ) — mỗi phân vùng của mỗi tập xuất hiện ít nhất một lần. Muốn mọi tổ hợp thì cần 3 × 2 = 6 test, nhưng đó không phải Each Choice.`,
      `Field "Number of tickets" accepts integers 1–10. Partitions: P1 ≤ 0 (invalid, error), P2 1–10 (valid), P3 ≥ 11 (invalid, "max 10"). Minimum set for 100% EP: −3, 5, 15 → 3 tests. Running only 5 and 15 gives 2/3 ≈ 67%.
Each Choice: ticket type {Adult, Child, Senior} and payment {Card, E-wallet}. 3 tests suffice: (Adult, Card), (Child, E-wallet), (Senior, Card) — every partition of every set appears at least once. All combinations would need 3 × 2 = 6 tests, but that is not Each Choice.`,
      `“购票数量”字段接受整数 1–10。等价类：P1 ≤ 0（无效，报错），P2 1–10（有效），P3 ≥ 11（无效，提示“最多 10 张”）。100% EP 覆盖的最少测试：−3、5、15 → 3 个测试。只执行 5 和 15 时覆盖率 = 2/3 ≈ 67%。
Each Choice：票种 {成人, 儿童, 老人} 与支付方式 {银行卡, 电子钱包}。3 个测试即可：(成人, 银行卡)、(儿童, 电子钱包)、(老人, 银行卡)——每组的每个等价类至少出现一次。若要全部组合需 3 × 2 = 6 个测试，但那不是 Each Choice。`,
    ),
    keyPoints: [
      L(`Một test cho mỗi phân vùng; phân vùng không chồng lấn, không rỗng.`, `One test per partition; partitions must not overlap and must be non-empty.`, `每个等价类一个测试；等价类不得重叠且非空。`),
      L(`100% EP phải gồm cả phân vùng không hợp lệ.`, `100% EP coverage includes the invalid partitions.`, `100% EP 覆盖包括无效等价类。`),
      L(`Each Choice: số test tối thiểu = số phân vùng của tập lớn nhất (không xét tổ hợp).`, `Each Choice: minimum tests = number of partitions in the largest set (no combinations).`, `Each Choice：最少测试数 = 最大那组的等价类个数（不考虑组合）。`),
    ],
    uncertain: L(
      `Giáo trình nói rõ định nghĩa giá trị hợp lệ/không hợp lệ có thể khác nhau giữa các nhóm. Mục 4.2.1 cũng không nói có nên gộp nhiều phân vùng không hợp lệ vào cùng một test khi dùng Each Choice hay không; nhiều nhóm tách riêng từng giá trị không hợp lệ để tránh che lấp lỗi (defect masking — khái niệm giáo trình chỉ nêu ở 4.2.4). Đây là thực hành phổ biến, không phải yêu cầu của mục 4.2.1.`,
      `The syllabus states that the definitions of valid and invalid values may vary among teams. Section 4.2.1 also does not say whether several invalid partitions may be combined in one test under Each Choice; many teams test each invalid value separately to avoid defect masking (a concept the syllabus mentions only in 4.2.4). That is common practice, not a requirement of 4.2.1.`,
      `大纲明确指出有效/无效值的定义因团队而异。4.2.1 节也没有说明在 Each Choice 中能否把多个无效等价类合并到同一测试；许多团队会单独测试每个无效值以避免缺陷屏蔽（defect masking，大纲只在 4.2.4 提到）。这是常见做法，不是 4.2.1 的要求。`,
    ),
    termIds: ['equivalence-partitioning', 'equivalence-partition', 'coverage-item', 'coverage', 'each-choice-coverage'],
  },
  {
    number: '4.2.2',
    explain: L(
      `Phân tích giá trị biên (BVA) kiểm thử biên của các phân vùng tương đương, nên chỉ dùng được cho phân vùng có thứ tự. Giá trị nhỏ nhất và lớn nhất của một phân vùng là giá trị biên (boundary value). Lý do: lập trình viên dễ sai ở biên — biên bị dịch lên/xuống hoặc bị bỏ sót. Giáo trình có hai phiên bản: BVA 2 giá trị — mỗi giá trị biên có 2 mục bao phủ: chính nó và láng giềng gần nhất thuộc phân vùng kề bên; BVA 3 giá trị — mỗi giá trị biên có 3 mục: chính nó và CẢ HAI láng giềng (nên một số mục không phải là giá trị biên). BVA 3 giá trị chặt hơn: ví dụ "if (x ≤ 10)" bị cài nhầm thành "if (x = 10)" — test 2 giá trị (x = 10, x = 11) không phát hiện được, còn x = 9 (từ BVA 3 giá trị) nhiều khả năng phát hiện.`,
      `Boundary value analysis (BVA) exercises the boundaries of equivalence partitions, so it can only be used for ordered partitions. The minimum and maximum values of a partition are its boundary values. Rationale: developers are more likely to make errors at boundaries — boundaries misplaced above/below their intended position or omitted. Two versions: 2-value BVA — each boundary value has 2 coverage items: the boundary value and its closest neighbor in the adjacent partition; 3-value BVA — each boundary value has 3 coverage items: the boundary value and BOTH neighbors (so some items are not boundary values). 3-value BVA is more rigorous: if "if (x ≤ 10)" is implemented as "if (x = 10)", 2-value tests (x = 10, x = 11) cannot detect it, while x = 9 from 3-value BVA is likely to.`,
      `边界值分析（BVA）测试等价类的边界，因此只能用于有序等价类。等价类的最小值和最大值就是边界值（boundary value）。原因：开发人员更容易在边界上出错——边界被实现得偏高、偏低或被遗漏。大纲介绍两种版本：二值 BVA——每个边界值有 2 个覆盖项：该边界值及其在相邻等价类中最近的邻值；三值 BVA——每个边界值有 3 个覆盖项：该边界值及其两侧邻值（因此部分覆盖项不是边界值）。三值 BVA 更严格：若“if (x ≤ 10)”被误实现为“if (x = 10)”，二值测试（x = 10、x = 11）无法发现，而三值 BVA 的 x = 9 很可能发现。`,
    ),
    example: L(
      `Máy điều hòa nhận nhiệt độ cài đặt số nguyên 16–30 °C; ngoài khoảng đó bị từ chối. Phân vùng: ≤ 15 | 16–30 | ≥ 31. Xét hai biên giữa các phân vùng (15/16 và 30/31):
• BVA 2 giá trị: mục bao phủ 15, 16, 30, 31 → tối thiểu 4 test.
• BVA 3 giá trị (cho các biên 16 và 30 của phân vùng hợp lệ): 15, 16, 17 và 29, 30, 31 → 6 test.
Nếu chỉ chạy 16 và 31 với BVA 2 giá trị thì bao phủ = 2/4 = 50%.
Với tiền tệ, "láng giềng" phụ thuộc độ chính xác: biên €50.00 có láng giềng €49.99 và €50.01.`,
      `An air conditioner accepts integer set-points 16–30 °C; other values are rejected. Partitions: ≤ 15 | 16–30 | ≥ 31. Considering the two boundaries between partitions (15/16 and 30/31):
• 2-value BVA: coverage items 15, 16, 30, 31 → minimum 4 tests.
• 3-value BVA (for the valid partition’s boundaries 16 and 30): 15, 16, 17 and 29, 30, 31 → 6 tests.
Running only 16 and 31 under 2-value BVA gives 2/4 = 50% coverage.
For money the "neighbor" depends on precision: boundary €50.00 has neighbors €49.99 and €50.01.`,
      `空调接受 16–30 °C 的整数设定温度，其他值被拒绝。等价类：≤ 15 | 16–30 | ≥ 31。考虑两处等价类之间的边界（15/16 和 30/31）：
• 二值 BVA：覆盖项 15、16、30、31 → 至少 4 个测试。
• 三值 BVA（针对有效等价类的边界 16 和 30）：15、16、17 以及 29、30、31 → 6 个测试。
二值 BVA 下只执行 16 和 31，覆盖率 = 2/4 = 50%。
对于金额，“邻值”取决于精度：边界 €50.00 的邻值是 €49.99 和 €50.01。`,
    ),
    keyPoints: [
      L(`BVA chỉ áp dụng cho phân vùng có thứ tự.`, `BVA only applies to ordered partitions.`, `BVA 只适用于有序等价类。`),
      L(`2 giá trị: biên + láng giềng gần nhất ở phân vùng kề; 3 giá trị: biên + cả hai láng giềng.`, `2-value: boundary + closest neighbor in the adjacent partition; 3-value: boundary + both neighbors.`, `二值：边界值 + 相邻等价类中的最近邻值；三值：边界值 + 两侧邻值。`),
      L(`BVA 3 giá trị chặt hơn và có thể bắt lỗi mà BVA 2 giá trị bỏ sót.`, `3-value BVA is more rigorous and may catch defects 2-value BVA misses.`, `三值 BVA 更严格，可能发现二值 BVA 遗漏的缺陷。`),
    ],
    uncertain: L(
      `Giáo trình định nghĩa mục bao phủ "cho mỗi giá trị biên" nhưng không nói rõ khi dùng BVA 3 giá trị, các giá trị biên của phân vùng không hợp lệ (ví dụ 15 và 31 ở trên) có được tính là giá trị biên riêng với láng giềng của chúng (14, 32) hay không. Ví dụ trong ứng dụng này luôn nói rõ đang xét biên nào. Với phân vùng vô hạn (ví dụ ≥ 31) không có giá trị lớn nhất.`,
      `The syllabus defines coverage items "for each boundary value" but does not say explicitly whether, in 3-value BVA, the boundary values of the invalid partitions (15 and 31 above) count as separate boundary values with their own neighbors (14, 32). The examples in this app always state which boundaries are considered. An infinite partition (e.g. ≥ 31) has no maximum.`,
      `大纲按“每个边界值”定义覆盖项，但没有明确说明在三值 BVA 中，无效等价类的边界值（如上例的 15 和 31）是否也作为独立边界值并加上其邻值（14、32）。本应用的例题总是说明所考虑的边界。无限等价类（如 ≥ 31）没有最大值。`,
    ),
    termIds: ['boundary-value-analysis', 'boundary-value', 'equivalence-partition', 'coverage-item'],
  },
  {
    number: '4.2.3',
    explain: L(
      `Bảng quyết định (decision table) dùng để kiểm thử yêu cầu mô tả cách các tổ hợp điều kiện dẫn đến các kết quả khác nhau — cách hiệu quả để ghi lại logic phức tạp như quy tắc nghiệp vụ. Hàng là điều kiện và hành động; mỗi cột là một quy tắc quyết định (decision rule) gồm một tổ hợp điều kiện duy nhất và các hành động tương ứng. Bảng limited-entry: giá trị là T/F; bảng extended-entry: điều kiện/hành động có thể nhận nhiều giá trị (khoảng số, phân vùng, giá trị rời rạc). Ký hiệu: T = thỏa, F = không thỏa, "–" = không ảnh hưởng kết quả, "N/A" = không khả thi; hành động: X = xảy ra, trống = không xảy ra. Bảng đầy đủ có đủ cột cho mọi tổ hợp; có thể đơn giản hóa bằng cách xóa cột không khả thi và tối giản bằng cách gộp cột (thuật toán tối giản ngoài phạm vi). Mục bao phủ = các cột có tổ hợp KHẢ THI. Điểm mạnh: tìm mọi tổ hợp, phát hiện thiếu sót/mâu thuẫn trong yêu cầu. Điểm yếu: số quy tắc tăng theo hàm mũ → dùng bảng tối giản hoặc cách tiếp cận dựa trên rủi ro.`,
      `Decision tables test requirements that specify how combinations of conditions lead to different outcomes — an effective way to record complex logic such as business rules. Rows are conditions and actions; each column is a decision rule: a unique combination of conditions with its actions. Limited-entry tables use Boolean values (T/F); extended-entry tables allow multiple values (ranges, partitions, discrete values). Notation: T = satisfied, F = not satisfied, "–" = irrelevant for the outcome, "N/A" = infeasible; actions: X = occurs, blank = does not occur. A full table has a column for every combination; it can be simplified by deleting infeasible columns and minimized by merging columns (minimization algorithms are out of scope). Coverage items are the columns with FEASIBLE combinations. Strengths: systematically finds all combinations and reveals gaps or contradictions in requirements. Weakness: the number of rules grows exponentially → use a minimized table or a risk-based approach.`,
      `决策表用于测试“不同条件组合产生不同结果”的需求实现，是记录业务规则等复杂逻辑的有效方式。行是条件和动作；每一列是一条决策规则（decision rule），即一个唯一的条件组合及其动作。有限项（limited-entry）决策表用布尔值（T/F）；扩展项（extended-entry）决策表允许多值（数值范围、等价类、离散值）。记号：T = 满足，F = 不满足，“–” = 对结果无关，“N/A” = 不可行；动作：X = 发生，空白 = 不发生。完整决策表为每种组合设一列；删除不可行列可简化，合并列可最小化（最小化算法不在大纲范围内）。覆盖项是包含可行条件组合的列。优点：系统地找出所有组合，发现需求中的遗漏或矛盾。缺点：规则数随条件数呈指数增长 → 可使用最小化决策表或基于风险的方法。`,
    ),
    example: L(
      `Rạp phim (bảng limited-entry). Điều kiện: C1 tuổi < 12; C2 tuổi ≥ 65. Hành động: A1 giảm 50%, A2 giảm 30%, A3 giá đầy đủ.
        R1   R2   R3   R4
C1      T    T    F    F
C2      T    F    T    F
A1           X
A2                X
A3                     X
R1 (T, T) là N/A — không ai vừa < 12 vừa ≥ 65 tuổi → xóa. Còn 3 cột khả thi → 3 test: tuổi 8 (A1), 70 (A2), 30 (A3).
Thêm C3 "ngày trong tuần": bảng đầy đủ 2³ = 8 cột, trong đó 2 cột có C1 = C2 = T không khả thi → 6 cột khả thi. Chạy 3 trong 6 cột → bao phủ 50%.`,
      `Cinema (limited-entry table). Conditions: C1 age < 12; C2 age ≥ 65. Actions: A1 50% off, A2 30% off, A3 full price.
        R1   R2   R3   R4
C1      T    T    F    F
C2      T    F    T    F
A1           X
A2                X
A3                     X
R1 (T, T) is N/A — nobody is both < 12 and ≥ 65 → delete it. 3 feasible columns remain → 3 tests: age 8 (A1), 70 (A2), 30 (A3).
Add C3 "weekday": the full table has 2³ = 8 columns, of which the 2 with C1 = C2 = T are infeasible → 6 feasible columns. Exercising 3 of them gives 50% coverage.`,
      `电影院（有限项决策表）。条件：C1 年龄 < 12；C2 年龄 ≥ 65。动作：A1 五折，A2 七折，A3 全价。
        R1   R2   R3   R4
C1      T    T    F    F
C2      T    F    T    F
A1           X
A2                X
A3                     X
R1（T, T）为 N/A——不可能既 < 12 岁又 ≥ 65 岁 → 删除。剩 3 个可行列 → 3 个测试：8 岁（A1）、70 岁（A2）、30 岁（A3）。
加入 C3“工作日”：完整表 2³ = 8 列，其中 C1 = C2 = T 的 2 列不可行 → 6 个可行列。执行其中 3 列，覆盖率 50%。`,
    ),
    keyPoints: [
      L(`Mục bao phủ = cột khả thi; cột N/A không tính vào mẫu số.`, `Coverage items = feasible columns; N/A columns are not in the denominator.`, `覆盖项 = 可行列；N/A 列不计入分母。`),
      L(`n điều kiện Boolean → bảng đầy đủ 2ⁿ cột; điều kiện nhiều giá trị nhân số giá trị.`, `n Boolean conditions → full table of 2ⁿ columns; multi-valued conditions multiply by their number of values.`, `n 个布尔条件 → 完整表 2ⁿ 列；多值条件按取值个数相乘。`),
      L(`"–" = không liên quan; "N/A" = không khả thi.`, `"–" = irrelevant; "N/A" = infeasible.`, `“–” = 无关；“N/A” = 不可行。`),
    ],
    termIds: ['decision-table-testing', 'coverage-item', 'coverage', 'risk-based-testing'],
  },
  {
    number: '4.2.4',
    explain: L(
      `Sơ đồ trạng thái (state diagram) mô hình hóa hành vi hệ thống bằng các trạng thái và chuyển trạng thái hợp lệ. Chuyển trạng thái được khởi phát bởi sự kiện (event), có thể kèm điều kiện bảo vệ (guard condition), được coi là tức thời và có thể kèm hành động; cú pháp nhãn: "event [guard condition] / action". Bảng trạng thái (state table) tương đương sơ đồ: hàng = trạng thái, cột = sự kiện (kèm guard), ô = trạng thái đích và hành động; khác với sơ đồ, bảng thể hiện rõ chuyển trạng thái KHÔNG hợp lệ bằng ô trống. Một test case thường là chuỗi sự kiện, đi qua nhiều chuyển trạng thái. Ba tiêu chí bao phủ: (1) all states — mục là các trạng thái; (2) valid transitions (0-switch) — mục là từng chuyển trạng thái hợp lệ; tiêu chí phổ biến nhất; (3) all transitions — mục là MỌI chuyển trạng thái trong bảng (hợp lệ + không hợp lệ): thực thi mọi chuyển hợp lệ và thử mọi chuyển không hợp lệ, mỗi test chỉ thử MỘT chuyển không hợp lệ để tránh che lấp lỗi (defect masking). Quan hệ: 100% valid transitions ⇒ 100% all states; 100% all transitions ⇒ cả hai; all transitions nên là yêu cầu tối thiểu cho phần mềm nhiệm vụ/an toàn trọng yếu.`,
      `A state diagram models system behavior through its states and valid state transitions. A transition is initiated by an event, possibly qualified by a guard condition; it is assumed instantaneous and may result in an action; label syntax: "event [guard condition] / action". A state table is equivalent: rows = states, columns = events (with guards), cells = target state and actions; unlike the diagram it explicitly shows invalid transitions as empty cells. A test case is usually a sequence of events covering several transitions. Three coverage criteria: (1) all states — items are states; (2) valid transitions (0-switch) — items are single valid transitions; the most widely used; (3) all transitions — items are ALL transitions in the state table (valid + invalid): exercise all valid ones and attempt all invalid ones, testing only ONE invalid transition per test case to avoid defect masking. Relations: 100% valid transitions ⇒ 100% all states; 100% all transitions ⇒ both; all transitions should be a minimum for mission- and safety-critical software.`,
      `状态图（state diagram）通过状态和有效状态转换来建模系统行为。转换由事件（event）触发，可附加守卫条件（guard condition），被视为瞬时完成，并可能产生动作；标注语法为“event [guard condition] / action”。状态表（state table）与状态图等价：行 = 状态，列 = 事件（含守卫条件），单元格 = 目标状态及动作；与状态图不同，状态表用空单元格明确表示无效转换。测试用例通常是一串事件，覆盖多次转换。三种覆盖准则：(1) 全状态覆盖——覆盖项为状态；(2) 有效转换覆盖（0-switch 覆盖）——覆盖项为单个有效转换，是最常用的准则；(3) 全转换覆盖——覆盖项为状态表中的所有转换（有效 + 无效）：执行所有有效转换并尝试所有无效转换，每个测试用例只测一个无效转换，以避免缺陷屏蔽（defect masking）。关系：100% 有效转换覆盖 ⇒ 100% 全状态覆盖；100% 全转换覆盖 ⇒ 两者皆满足；对任务关键和安全关键软件，全转换覆盖应为最低要求。`,
    ),
    example: L(
      `Đơn hàng online. Trạng thái: Created, Paid, Shipped, Delivered, Cancelled (Delivered, Cancelled là trạng thái kết thúc). Sự kiện: pay, cancel, ship, deliver.
Chuyển hợp lệ: T1 Created –pay→ Paid; T2 Created –cancel→ Cancelled; T3 Paid –ship→ Shipped; T4 Paid –cancel / refund→ Cancelled; T5 Shipped –deliver→ Delivered.
Bảng trạng thái:
             pay    cancel     ship     deliver
Created      Paid   Cancelled  –        –
Paid         –      Cancelled  Shipped  –
Shipped      –      –          –        Delivered
Delivered    –      –          –        –
Cancelled    –      –          –        –
(– = ô trống, chuyển không hợp lệ)
• All states: 2 test — TC1 pay, ship, deliver; TC2 cancel.
• Valid transitions (5 mục): 3 test — TC1 pay, ship, deliver (T1, T3, T5); TC2 cancel (T2); TC3 pay, cancel (T4).
• All transitions: 5 × 4 = 20 mục (5 hợp lệ + 15 không hợp lệ). Ví dụ test không hợp lệ: pay, ship rồi thử cancel ở Shipped → mong đợi bị từ chối, vẫn ở Shipped; chỉ một chuyển không hợp lệ trong test đó.`,
      `Online order. States: Created, Paid, Shipped, Delivered, Cancelled (Delivered and Cancelled are final). Events: pay, cancel, ship, deliver.
Valid transitions: T1 Created –pay→ Paid; T2 Created –cancel→ Cancelled; T3 Paid –ship→ Shipped; T4 Paid –cancel / refund→ Cancelled; T5 Shipped –deliver→ Delivered.
State table:
             pay    cancel     ship     deliver
Created      Paid   Cancelled  –        –
Paid         –      Cancelled  Shipped  –
Shipped      –      –          –        Delivered
Delivered    –      –          –        –
Cancelled    –      –          –        –
(– = empty cell, invalid transition)
• All states: 2 tests — TC1 pay, ship, deliver; TC2 cancel.
• Valid transitions (5 items): 3 tests — TC1 pay, ship, deliver (T1, T3, T5); TC2 cancel (T2); TC3 pay, cancel (T4).
• All transitions: 5 × 4 = 20 items (5 valid + 15 invalid). Example invalid test: pay, ship, then attempt cancel in Shipped → expect rejection, still Shipped; only one invalid transition in that test.`,
      `在线订单。状态：Created、Paid、Shipped、Delivered、Cancelled（Delivered、Cancelled 为终止状态）。事件：pay、cancel、ship、deliver。
有效转换：T1 Created –pay→ Paid；T2 Created –cancel→ Cancelled；T3 Paid –ship→ Shipped；T4 Paid –cancel / refund→ Cancelled；T5 Shipped –deliver→ Delivered。
状态表：
             pay    cancel     ship     deliver
Created      Paid   Cancelled  –        –
Paid         –      Cancelled  Shipped  –
Shipped      –      –          –        Delivered
Delivered    –      –          –        –
Cancelled    –      –          –        –
（– = 空单元格，即无效转换）
• 全状态覆盖：2 个测试——TC1 pay、ship、deliver；TC2 cancel。
• 有效转换覆盖（5 个覆盖项）：3 个测试——TC1 pay、ship、deliver（T1、T3、T5）；TC2 cancel（T2）；TC3 pay、cancel（T4）。
• 全转换覆盖：5 × 4 = 20 个覆盖项（5 个有效 + 15 个无效）。无效转换测试示例：pay、ship 后在 Shipped 状态尝试 cancel → 预期被拒绝，仍为 Shipped；该测试只包含一个无效转换。`,
    ),
    keyPoints: [
      L(`Bảng trạng thái thể hiện chuyển không hợp lệ (ô trống); sơ đồ thì không.`, `The state table shows invalid transitions (empty cells); the diagram does not.`, `状态表显示无效转换（空单元格），状态图不显示。`),
      L(`all states < valid transitions (0-switch) < all transitions (về độ mạnh).`, `all states < valid transitions (0-switch) < all transitions (in strength).`, `强度：全状态 < 有效转换（0-switch）< 全转换。`),
      L(`Mỗi test chỉ thử một chuyển không hợp lệ để tránh defect masking.`, `Test only one invalid transition per test case to avoid defect masking.`, `每个测试用例只测一个无效转换，以避免缺陷屏蔽。`),
    ],
    uncertain: L(
      `Giáo trình không nói test case phải bắt đầu từ trạng thái ban đầu hay kết thúc ở trạng thái cuối. Các câu hỏi tính "số test tối thiểu" trong ứng dụng này luôn nêu rõ giả định (bắt đầu ở trạng thái ban đầu; trạng thái kết thúc không có chuyển đi tiếp).`,
      `The syllabus does not say whether a test case must start in the initial state or end in a final state. Questions in this app that ask for a "minimum number of test cases" always state the assumption (start in the initial state; final states have no outgoing transitions).`,
      `大纲没有规定测试用例必须从初始状态开始或在终止状态结束。本应用中计算“最少测试用例数”的题目都会说明假设（从初始状态开始；终止状态没有后续转换）。`,
    ),
    termIds: ['state-transition-testing', 'n-switch-coverage', 'coverage-item', 'coverage'],
  },
  {
    number: '4.3',
    explain: L(
      `Mục 4.3 tập trung vào hai kỹ thuật hộp trắng liên quan đến code vì phổ biến và đơn giản: kiểm thử câu lệnh (statement testing) và kiểm thử nhánh (branch testing). Có những kỹ thuật chặt chẽ hơn dùng trong môi trường an toàn/nhiệm vụ trọng yếu, kỹ thuật hộp trắng ở mức kiểm thử cao hơn (ví dụ kiểm thử API) hoặc bao phủ không liên quan đến code (ví dụ neuron coverage cho mạng nơ-ron) — những kỹ thuật này không thuộc giáo trình.`,
      `Section 4.3 focuses on two code-related white-box techniques because they are popular and simple: statement testing and branch testing. More rigorous techniques exist for safety-critical, mission-critical or high-integrity environments, as do white-box techniques at higher test levels (e.g. API testing) or coverage not related to code (e.g. neuron coverage in neural network testing) — these are not covered by the syllabus.`,
      `4.3 节因其普及和简单而聚焦两种与代码相关的白盒测试技术：语句测试（statement testing）和分支测试（branch testing）。在安全关键、任务关键或高完整性环境中还有更严格的技术，也有用于更高测试级别（如 API 测试）或与代码无关的覆盖（如神经网络测试中的神经元覆盖）的白盒技术——这些不在大纲范围内。`,
    ),
    termIds: ['white-box-test-technique', 'statement-testing', 'branch-testing', 'api-testing'],
  },
  {
    number: '4.3.1',
    explain: L(
      `Trong kiểm thử câu lệnh, mục bao phủ là các câu lệnh thực thi được (executable statement). Bao phủ câu lệnh (statement coverage) = số câu lệnh được test thực thi / tổng số câu lệnh thực thi được, tính theo %. 100% bao phủ câu lệnh đảm bảo mọi câu lệnh chạy ít nhất một lần — câu lệnh chứa lỗi sẽ được thực thi và có thể gây ra thất bại. Nhưng không phải lúc nào cũng phát hiện lỗi: lỗi phụ thuộc dữ liệu (ví dụ chia cho 0 chỉ xảy ra khi mẫu số bằng 0) có thể bị bỏ qua; và 100% câu lệnh không đảm bảo đã kiểm thử hết logic quyết định — có thể chưa đi qua mọi nhánh.`,
      `In statement testing the coverage items are executable statements. Statement coverage = statements exercised / total executable statements, as a percentage. 100% statement coverage ensures every executable statement ran at least once — a statement with a defect will be executed and may cause a failure. But defects are not always detected: data-dependent defects (e.g. division by zero only when the denominator is zero) may be missed, and 100% statement coverage does not ensure all decision logic was tested — not all branches may have been exercised.`,
      `在语句测试中，覆盖项是可执行语句。语句覆盖率（statement coverage）= 被测试执行的语句数 / 可执行语句总数，以百分比表示。100% 语句覆盖保证每条可执行语句至少执行一次——含缺陷的语句会被执行，可能引发失效。但并非总能发现缺陷：依赖数据的缺陷（如只有分母为 0 时才出现的除零错误）可能被遗漏；而且 100% 语句覆盖不保证所有判定逻辑都被测试——可能没有执行所有分支。`,
    ),
    example: L(
      `1  input total
2  discount = 0
3  if total > 100 then
4      discount = 10
5  end if
6  print total - discount
Câu lệnh thực thi được: 1, 2, 3, 4, 6 (5 câu; "end if" không tính). Test total = 50 chạy 1, 2, 3, 6 → 4/5 = 80%. Test total = 150 chạy cả 5 → 100% câu lệnh — nhưng nhánh "total ≤ 100" (bỏ qua dòng 4) chưa từng được đi qua.`,
      `1  input total
2  discount = 0
3  if total > 100 then
4      discount = 10
5  end if
6  print total - discount
Executable statements: 1, 2, 3, 4, 6 (5; "end if" is not counted). Test total = 50 runs 1, 2, 3, 6 → 4/5 = 80%. Test total = 150 runs all 5 → 100% statement coverage — but the "total ≤ 100" branch (skipping line 4) was never taken.`,
      `1  input total
2  discount = 0
3  if total > 100 then
4      discount = 10
5  end if
6  print total - discount
可执行语句：1、2、3、4、6（共 5 条；“end if”不计）。测试 total = 50 执行 1、2、3、6 → 4/5 = 80%。测试 total = 150 执行全部 5 条 → 100% 语句覆盖——但“total ≤ 100”的分支（跳过第 4 行）从未执行。`,
    ),
    keyPoints: [
      L(`Mục bao phủ: câu lệnh thực thi được.`, `Coverage items: executable statements.`, `覆盖项：可执行语句。`),
      L(`100% câu lệnh ≠ 100% nhánh; có thể bỏ sót lỗi phụ thuộc dữ liệu.`, `100% statement ≠ 100% branch; data-dependent defects may be missed.`, `100% 语句覆盖 ≠ 100% 分支覆盖；可能遗漏依赖数据的缺陷。`),
    ],
    termIds: ['statement-testing', 'statement-coverage', 'coverage-item'],
  },
  {
    number: '4.3.2',
    explain: L(
      `Nhánh (branch) là một lần chuyển điều khiển giữa hai nút trong đồ thị luồng điều khiển (control flow graph). Chuyển điều khiển có thể vô điều kiện (code thẳng) hoặc có điều kiện (kết quả của một quyết định). Trong kiểm thử nhánh, mục bao phủ là các nhánh; bao phủ nhánh = số nhánh đã thực thi / tổng số nhánh. 100% bao phủ nhánh nghĩa là mọi nhánh, cả vô điều kiện và có điều kiện, đều được thực thi. Nhánh có điều kiện thường ứng với kết quả true/false của "if...then", một kết quả của switch/case, hoặc quyết định thoát/tiếp tục vòng lặp. Vẫn có thể bỏ sót lỗi chỉ xuất hiện trên một đường đi (path) cụ thể. Bao phủ nhánh bao hàm (subsumes) bao phủ câu lệnh: 100% nhánh ⇒ 100% câu lệnh, nhưng không ngược lại.`,
      `A branch is a transfer of control between two nodes in the control flow graph. Transfers can be unconditional (straight-line code) or conditional (a decision outcome). In branch testing the coverage items are branches; branch coverage = branches exercised / total branches. 100% branch coverage means all branches, unconditional and conditional, are exercised. Conditional branches typically correspond to the true/false outcome of an "if...then", an outcome of a switch/case, or a decision to exit or continue a loop. Defects that need a specific path may still be missed. Branch coverage subsumes statement coverage: 100% branch ⇒ 100% statement, but not vice versa.`,
      `分支（branch）是控制流图中两个节点之间的控制转移。控制转移可以是无条件的（顺序代码），也可以是有条件的（判定结果）。在分支测试中，覆盖项是分支；分支覆盖率 = 已执行分支数 / 分支总数。100% 分支覆盖意味着所有无条件和有条件分支都被执行。条件分支通常对应“if...then”的真/假结果、switch/case 的某个结果，或循环中退出/继续的判定。仍可能遗漏需要执行特定路径才能发现的缺陷。分支覆盖包含（subsumes）语句覆盖：100% 分支覆盖 ⇒ 100% 语句覆盖，反之不成立。`,
    ),
    example: L(
      `Tiếp ví dụ 4.3.1: chỉ test total = 150 → 100% câu lệnh, nhưng quyết định "total > 100" mới chỉ có kết quả True. Thêm test total = 80 (kết quả False, bỏ qua dòng 4) → cả hai kết quả của quyết định đều được thực thi → 100% bao phủ nhánh. Hai test (150 và 80) đạt 100% nhánh và do đó cũng 100% câu lệnh.`,
      `Continuing the 4.3.1 example: only total = 150 → 100% statement coverage, but the decision "total > 100" has only its True outcome. Add total = 80 (False outcome, skipping line 4) → both outcomes exercised → 100% branch coverage. The two tests (150 and 80) achieve 100% branch and therefore 100% statement coverage.`,
      `接 4.3.1 的例子：只测 total = 150 → 100% 语句覆盖，但判定“total > 100”只执行了 True 结果。再加 total = 80（False 结果，跳过第 4 行）→ 判定的两个结果都被执行 → 100% 分支覆盖。这两个测试（150 和 80）达到 100% 分支覆盖，因此也达到 100% 语句覆盖。`,
    ),
    keyPoints: [
      L(`Nhánh gồm cả vô điều kiện và có điều kiện.`, `Branches include unconditional and conditional ones.`, `分支包括无条件分支和条件分支。`),
      L(`100% nhánh ⇒ 100% câu lệnh (không ngược lại).`, `100% branch ⇒ 100% statement (not vice versa).`, `100% 分支 ⇒ 100% 语句（反之不成立）。`),
    ],
    uncertain: L(
      `Giáo trình định nghĩa nhánh gồm cả chuyển điều khiển vô điều kiện, nên tổng số nhánh phụ thuộc cách vẽ đồ thị luồng điều khiển. Các câu hỏi tính phần trăm trong ứng dụng này chỉ đếm các kết quả quyết định (nhánh có điều kiện) và nói rõ điều đó.`,
      `The syllabus counts unconditional transfers of control as branches too, so the total number of branches depends on how the control flow graph is drawn. Percentage questions in this app count only decision outcomes (conditional branches) and say so explicitly.`,
      `大纲把无条件控制转移也算作分支，因此分支总数取决于控制流图的画法。本应用中的百分比计算题只统计判定结果（条件分支），并在题中明确说明。`,
    ),
    termIds: ['branch', 'branch-testing', 'branch-coverage', 'statement-coverage', 'control-flow'],
  },
  {
    number: '4.3.3',
    explain: L(
      `Giá trị của kiểm thử hộp trắng: điểm mạnh chung là xét toàn bộ phần cài đặt, giúp phát hiện lỗi ngay cả khi đặc tả mơ hồ, lỗi thời hoặc không đầy đủ. Điểm yếu tương ứng: nếu phần mềm không cài đặt một hay nhiều yêu cầu, kiểm thử hộp trắng có thể không phát hiện được lỗi thiếu sót (defects of omission) — không có code thì không có gì để bao phủ. Kỹ thuật hộp trắng còn dùng được trong kiểm thử tĩnh (ví dụ chạy khô — dry run — code), rất hợp để review code chưa chạy được, mã giả và logic cấp cao có thể mô hình hóa bằng đồ thị luồng điều khiển. Chỉ kiểm thử hộp đen thì không đo được bao phủ code thực tế; số đo bao phủ hộp trắng cho phép đo khách quan và chỉ ra cần thêm test nào để tăng bao phủ và tăng độ tin cậy vào code.`,
      `Value of white-box testing: the shared strength is that the entire implementation is taken into account, which facilitates defect detection even when the specification is vague, outdated or incomplete. The corresponding weakness: if the software does not implement one or more requirements, white-box testing may not detect the resulting defects of omission — no code, nothing to cover. White-box techniques can also be used in static testing (e.g. dry runs of code) and suit reviewing code not yet ready for execution, pseudocode and other high-level logic that can be modelled with a control flow graph. Black-box testing alone gives no measure of actual code coverage; white-box coverage measures are objective and show which additional tests are needed to increase coverage and confidence in the code.`,
      `白盒测试的价值：共同优点是测试时考虑了整个软件实现，即使规格说明模糊、过时或不完整也有助于发现缺陷。相应的缺点：如果软件没有实现某些需求，白盒测试可能发现不了由此产生的遗漏型缺陷（defects of omission）——没有代码就没有可覆盖的东西。白盒技术也可用于静态测试（如代码的干运行 dry run），适合评审尚不能执行的代码、伪代码以及可用控制流图建模的高层逻辑。只做黑盒测试无法度量实际代码覆盖率；白盒覆盖度量提供客观的覆盖率测量，并指明需要补充哪些测试来提高覆盖率和对代码的信心。`,
    ),
    example: L(
      `Đặc tả chỉ ghi "làm tròn số tiền hợp lý". Xem code, tester thấy một nhánh riêng cho số tiền âm (hoàn tiền) mà không test hộp đen nào đi qua → báo cáo bao phủ nhánh cho thấy nhánh đó 0% → thêm test. Ngược lại, yêu cầu "gửi email xác nhận" bị quên cài đặt: bao phủ code vẫn có thể đạt 100% mà lỗi thiếu sót này không lộ ra.`,
      `The spec only says "round amounts sensibly". Reading the code, the tester finds a separate branch for negative amounts (refunds) that no black-box test reaches → the branch coverage report shows it at 0% → add a test. Conversely, the requirement "send a confirmation email" was never implemented: code coverage can still reach 100% without revealing this defect of omission.`,
      `规格只写了“合理地对金额取整”。测试人员阅读代码，发现有一个处理负数金额（退款）的单独分支，没有任何黑盒测试执行到 → 分支覆盖报告显示该分支为 0% → 补充测试。反之，“发送确认邮件”的需求被漏实现：代码覆盖率仍可能达到 100%，却暴露不了这个遗漏型缺陷。`,
    ),
    keyPoints: [
      L(`Mạnh: xét toàn bộ cài đặt, hữu ích khi đặc tả kém.`, `Strength: whole implementation considered, useful with poor specs.`, `优点：考虑整个实现，规格不佳时也有用。`),
      L(`Yếu: không phát hiện lỗi thiếu sót (yêu cầu chưa cài đặt).`, `Weakness: may miss defects of omission (unimplemented requirements).`, `缺点：可能发现不了遗漏型缺陷（未实现的需求）。`),
      L(`Dùng được trong kiểm thử tĩnh; cho số đo bao phủ khách quan.`, `Usable in static testing; gives an objective coverage measure.`, `可用于静态测试；提供客观的覆盖度量。`),
    ],
    termIds: ['white-box-testing', 'white-box-test-technique', 'static-testing', 'coverage'],
  },
  {
    number: '4.4',
    explain: L(
      `Mục 4.4 giới thiệu ba kỹ thuật dựa trên kinh nghiệm thông dụng: đoán lỗi (error guessing), kiểm thử khám phá (exploratory testing) và kiểm thử dựa trên danh sách kiểm tra (checklist-based testing). Như mục 4.1 đã nêu, hiệu quả của chúng phụ thuộc nhiều vào kỹ năng tester và chúng bổ sung cho kỹ thuật hộp đen, hộp trắng.`,
      `Section 4.4 introduces three commonly used experience-based techniques: error guessing, exploratory testing and checklist-based testing. As 4.1 says, their effectiveness depends heavily on the tester’s skills and they complement black-box and white-box techniques.`,
      `4.4 节介绍三种常用的基于经验的测试技术：错误推测（error guessing）、探索性测试（exploratory testing）和基于检查表的测试（checklist-based testing）。如 4.1 节所述，其效果很大程度上取决于测试人员的技能，是黑盒和白盒技术的补充。`,
    ),
    termIds: ['experience-based-test-technique', 'error-guessing', 'exploratory-testing', 'checklist-based-testing'],
  },
  {
    number: '4.4.1',
    explain: L(
      `Đoán lỗi (error guessing) là kỹ thuật dự đoán sai sót (error), khiếm khuyết (defect) và thất bại (failure) dựa trên kiến thức của tester: ứng dụng đã hoạt động thế nào trong quá khứ; loại sai sót lập trình viên hay mắc và khiếm khuyết sinh ra từ đó; loại thất bại đã xảy ra ở ứng dụng tương tự. Nhóm lỗi thường gặp: đầu vào (đầu vào đúng bị từ chối, tham số sai/thiếu), đầu ra (sai định dạng, sai kết quả), logic (thiếu trường hợp, sai toán tử), tính toán (sai toán hạng, sai phép tính), giao diện (tham số không khớp, kiểu không tương thích), dữ liệu (khởi tạo sai, sai kiểu). Tấn công lỗi (fault attack) là một cách hiện thực đoán lỗi: tester tạo hoặc thu thập danh sách các sai sót/khiếm khuyết/thất bại có thể có, rồi thiết kế test để làm lộ khiếm khuyết hoặc gây ra thất bại. Danh sách xây dựng từ kinh nghiệm, dữ liệu lỗi, hoặc hiểu biết chung về lý do phần mềm hỏng.`,
      `Error guessing anticipates errors, defects and failures based on the tester’s knowledge: how the application worked in the past; the types of errors developers tend to make and the resulting defects; the types of failures in other, similar applications. Typical areas: input (correct input not accepted, parameters wrong or missing), output (wrong format, wrong result), logic (missing cases, wrong operator), computation (incorrect operand, wrong computation), interfaces (parameter mismatch, incompatible types), data (incorrect initialization, wrong type). Fault attacks are a way to implement error guessing: the tester creates or acquires a list of possible errors, defects and failures and designs tests that identify, expose or cause them. Lists come from experience, defect and failure data, or common knowledge about why software fails.`,
      `错误推测（error guessing）是根据测试人员的知识来预测错误（error）、缺陷（defect）和失效（failure）的技术，知识包括：应用过去的运行情况；开发人员常犯的错误类型及其导致的缺陷；其他类似应用中发生过的失效类型。常见方面：输入（正确输入不被接受、参数错误或缺失）、输出（格式错误、结果错误）、逻辑（遗漏情况、运算符错误）、计算（操作数错误、计算错误）、接口（参数不匹配、类型不兼容）、数据（初始化错误、类型错误）。故障攻击（fault attack）是实施错误推测的一种方式：测试人员创建或获取可能的错误、缺陷和失效清单，并设计测试来识别缺陷、暴露缺陷或引发失效。清单可基于经验、缺陷和失效数据，或关于软件为何失效的常识。`,
    ),
    example: L(
      `Danh sách tấn công cho ô "Số tiền chuyển khoản" trong app ngân hàng Việt Nam: dấu phân cách thập phân "," thay vì "." (1.000,50); dán số có khoảng trắng; số rất lớn (vượt kiểu int); để trống; số âm; ký tự toàn chiều rộng (full-width) từ bộ gõ; số tiền có 3 chữ số thập phân. Mỗi mục là một test nhắm vào một loại sai sót đã biết.`,
      `Fault-attack list for an "Amount" field in a banking app: comma as decimal separator (1.000,50); pasted digits with spaces; very large numbers (int overflow); empty; negative; full-width digits from an input method; three decimal places. Each item becomes a test aimed at a known kind of error.`,
      `银行应用“转账金额”字段的故障攻击清单：用逗号作小数点（1.000,50）；粘贴带空格的数字；极大数值（整型溢出）；空值；负数；输入法输入的全角数字；三位小数。每一项都成为针对某类已知错误的测试。`,
    ),
    keyPoints: [
      L(`Dựa trên: lịch sử ứng dụng, sai sót hay gặp của dev, thất bại ở ứng dụng tương tự.`, `Based on: application history, typical developer errors, failures in similar applications.`, `依据：应用历史、开发人员常见错误、类似应用的失效。`),
      L(`Fault attack = danh sách lỗi có thể có → thiết kế test để làm lộ chúng.`, `Fault attack = list of possible errors/defects/failures → tests designed to expose them.`, `故障攻击 = 可能错误/缺陷/失效清单 → 设计测试去暴露它们。`),
    ],
    termIds: ['error-guessing', 'fault-attack', 'error', 'defect', 'failure'],
  },
  {
    number: '4.4.2',
    explain: L(
      `Trong kiểm thử khám phá (exploratory testing), test được thiết kế, thực thi và đánh giá ĐỒNG THỜI trong khi tester tìm hiểu đối tượng kiểm thử — để học thêm về nó, khám phá sâu hơn bằng test tập trung và tạo test cho vùng chưa được kiểm thử. Có thể tổ chức bằng kiểm thử theo phiên (session-based testing): làm trong một khung thời gian (time box) xác định, dùng bản điều lệ kiểm thử (test charter) chứa mục tiêu kiểm thử; sau phiên thường có buổi debriefing giữa tester và các bên liên quan. Mục tiêu kiểm thử có thể coi là điều kiện kiểm thử mức cao; mục bao phủ được xác định và thực thi ngay trong phiên; có thể dùng test session sheet để ghi bước làm và phát hiện. Hữu ích khi đặc tả ít/không đầy đủ hoặc áp lực thời gian lớn, và để bổ sung cho kỹ thuật chính thức hơn. Hiệu quả hơn khi tester có kinh nghiệm, kiến thức nghiệp vụ, kỹ năng phân tích, tò mò, sáng tạo. Có thể kết hợp kỹ thuật khác (ví dụ EP).`,
      `In exploratory testing, tests are simultaneously designed, executed and evaluated while the tester learns about the test object — to learn more about it, explore it more deeply with focused tests and create tests for untested areas. It may be structured as session-based testing: a defined time box, a test charter containing test objectives, usually followed by a debriefing between the tester and interested stakeholders. Test objectives may be treated as high-level test conditions; coverage items are identified and exercised during the session; test session sheets may document steps and discoveries. Useful when specifications are few or inadequate or under significant time pressure, and to complement more formal techniques. More effective with an experienced tester with domain knowledge, analytical skills, curiosity and creativeness. It can incorporate other techniques (e.g. EP).`,
      `在探索性测试（exploratory testing）中，测试人员在了解测试对象的同时进行测试设计、执行和评估——用于更多地了解测试对象、通过聚焦测试深入探索，并为未测试的区域创建测试。可以采用基于会话的测试（session-based testing）来组织：在规定的时间盒（time box）内进行，使用包含测试目标的测试章程（test charter）指导测试，会话结束后通常与相关干系人进行汇报（debriefing）。测试目标可视为高层测试条件；覆盖项在会话中识别并执行；可用测试会话记录表记录步骤和发现。适用于规格说明很少或不充分、或测试时间压力很大的情况，也可补充更正式的测试技术。测试人员经验丰富、具备领域知识以及分析能力、好奇心和创造力时效果更好。可结合其他技术（如等价类划分）。`,
    ),
    example: L(
      `Test charter (mẫu "Khám phá… / Với… / Để phát hiện…" là cách viết phổ biến, không phải của giáo trình):
Khám phá: chức năng áp mã giảm giá ở trang thanh toán
Với: mã hết hạn, mã viết thường/hoa, giỏ hàng có sản phẩm đang khuyến mãi, đổi số lượng sau khi áp mã
Để phát hiện: tổng tiền sai, thông báo khó hiểu
Time box: 60 phút. Ghi chép vào session sheet; sau đó debriefing 15 phút với PO và dev.`,
      `Test charter (the "Explore… / With… / To discover…" template is a common format, not from the syllabus):
Explore: applying discount codes on the checkout page
With: expired codes, lower/upper case codes, carts with items already on sale, changing quantities after applying a code
To discover: wrong totals, confusing messages
Time box: 60 minutes. Notes in a session sheet; then a 15-minute debriefing with the PO and a developer.`,
      `测试章程（“探索…… / 使用…… / 以发现……”是常见写法，并非出自大纲）：
探索：结账页面使用优惠码
使用：过期优惠码、大小写不同的优惠码、含促销商品的购物车、使用优惠码后修改数量
以发现：总价错误、令人困惑的提示
时间盒：60 分钟。在会话记录表中记录；随后与产品负责人和开发人员进行 15 分钟汇报。`,
    ),
    keyPoints: [
      L(`Thiết kế – thực thi – đánh giá đồng thời, vừa làm vừa học.`, `Design, execution and evaluation happen simultaneously while learning.`, `测试设计、执行和评估同时进行，边测边学。`),
      L(`Kiểm thử theo phiên: time box + test charter + debriefing.`, `Session-based: time box + test charter + debriefing.`, `基于会话：时间盒 + 测试章程 + 汇报。`),
      L(`Hợp khi thiếu đặc tả hoặc áp lực thời gian lớn.`, `Suited to poor specifications or strong time pressure.`, `适用于规格不足或时间压力大时。`),
    ],
    termIds: ['exploratory-testing', 'session-based-testing', 'test-charter', 'test-session'],
  },
  {
    number: '4.4.3',
    explain: L(
      `Trong kiểm thử dựa trên danh sách kiểm tra (checklist-based testing), tester thiết kế, cài đặt và thực thi test để bao phủ các điều kiện kiểm thử trong một checklist. Checklist dựa trên kinh nghiệm, hiểu biết về điều quan trọng với người dùng, hoặc hiểu biết vì sao/như thế nào phần mềm hỏng. Checklist KHÔNG nên chứa: mục kiểm tra được tự động, mục phù hợp hơn làm tiêu chí vào/ra (entry/exit criteria), mục quá chung chung. Mục thường viết dạng câu hỏi, kiểm tra được riêng lẻ và trực tiếp; có thể liên quan yêu cầu, giao diện, đặc tính chất lượng… cho cả kiểm thử chức năng và phi chức năng (ví dụ 10 heuristic usability của Nielsen). Một số mục kém hiệu quả dần vì dev học được cách tránh; cần thêm mục cho lỗi nghiêm trọng mới → cập nhật thường xuyên dựa trên phân tích lỗi, nhưng tránh để quá dài. Khi không có test case chi tiết, checklist cho hướng dẫn và mức độ nhất quán; checklist mức cao dẫn đến biến thiên khi thực hiện → bao phủ có thể lớn hơn nhưng khó lặp lại (less repeatability).`,
      `In checklist-based testing, a tester designs, implements and executes tests to cover test conditions from a checklist. Checklists are built from experience, knowledge of what matters to the user, or understanding of why and how software fails. They should NOT contain items that can be checked automatically, items better suited as entry/exit criteria, or items that are too general. Items are often phrased as questions and should be checkable separately and directly; they may refer to requirements, GUI properties, quality characteristics, etc., for functional and non-functional testing (e.g. Nielsen’s 10 usability heuristics). Some entries lose effectiveness as developers learn to avoid those errors; new entries may be needed for newly found high-severity defects → update regularly based on defect analysis, but avoid letting the list grow too long. Without detailed test cases, checklists give guidelines and some consistency; high-level checklists lead to variability → potentially greater coverage but less repeatability.`,
      `在基于检查表的测试（checklist-based testing）中，测试人员设计、实现并执行测试，以覆盖检查表中的测试条件。检查表可基于经验、对用户重要事项的了解，或对软件为何及如何失效的理解。检查表不应包含：可自动检查的项、更适合作为准入/准出准则的项、过于笼统的项。检查项通常以问题形式表述，应能单独、直接地检查；可涉及需求、图形界面属性、质量特性等，适用于功能和非功能测试（如 Nielsen 的 10 条可用性启发式）。由于开发人员学会避免同类错误，部分检查项会逐渐失效；新发现的高严重性缺陷可能需要新增检查项 → 应根据缺陷分析定期更新，但要避免检查表过长。没有详细测试用例时，检查表能提供指导和一定的一致性；高层检查表会带来执行上的差异 → 覆盖可能更大，但可重复性较低。`,
    ),
    example: L(
      `Checklist cho form đăng ký: "Mỗi ô bắt buộc để trống có hiện thông báo lỗi ngay cạnh ô không?", "Có hoàn thành đăng ký chỉ bằng bàn phím được không?", "Email đã tồn tại có bị từ chối với thông báo rõ ràng không?". Không nên đưa vào: "Code có biên dịch không cảnh báo?" (CI kiểm tra tự động), "Phần mềm có tốt không?" (quá chung chung), "Đã chạy hết smoke test chưa?" (giống tiêu chí vào/ra).`,
      `Checklist for a registration form: "Is an error message shown next to each mandatory field left empty?", "Can registration be completed using only the keyboard?", "Is an existing email rejected with a clear message?". Do not include: "Does the code compile without warnings?" (checked automatically by CI), "Is the software good?" (too general), "Have all smoke tests been run?" (an entry/exit criterion).`,
      `注册表单检查表：“每个必填字段留空时，旁边是否显示错误提示？”“能否只用键盘完成注册？”“已存在的邮箱是否会被拒绝并给出清晰提示？”。不应包含：“代码编译是否无警告？”（由 CI 自动检查）、“软件好不好？”（过于笼统）、“冒烟测试是否全部执行？”（属于准入/准出准则）。`,
    ),
    keyPoints: [
      L(`Mục checklist: dạng câu hỏi, kiểm tra riêng lẻ, trực tiếp.`, `Checklist items: questions, checkable separately and directly.`, `检查项：问题形式，可单独、直接检查。`),
      L(`Loại bỏ: mục tự động hóa được, tiêu chí vào/ra, mục quá chung.`, `Exclude: automatable items, entry/exit criteria, too-general items.`, `排除：可自动检查项、准入/准出准则、过于笼统的项。`),
      L(`Checklist mức cao: bao phủ có thể lớn hơn, khó lặp lại hơn.`, `High-level checklists: potentially greater coverage, less repeatability.`, `高层检查表：覆盖可能更大，可重复性更低。`),
    ],
    termIds: ['checklist-based-testing', 'test-condition', 'heuristic'],
  },
  {
    number: '4.5',
    explain: L(
      `Các kỹ thuật ở 4.2–4.4 đều nhằm phát hiện lỗi (defect detection). Cách tiếp cận dựa trên cộng tác (collaboration-based test approach) thì còn tập trung vào PHÒNG NGỪA lỗi (defect avoidance) nhờ cộng tác và giao tiếp — viết user story cùng nhau, thống nhất tiêu chí chấp nhận, và ATDD.`,
      `The techniques in 4.2–4.4 each aim at defect detection. Collaboration-based test approaches also focus on defect AVOIDANCE through collaboration and communication — writing user stories together, agreeing acceptance criteria, and ATDD.`,
      `4.2–4.4 节的测试技术都以发现缺陷（defect detection）为目标。基于协作的测试方法（collaboration-based test approach）则还通过协作与沟通关注缺陷预防（defect avoidance）——共同编写用户故事、商定验收准则以及 ATDD。`,
    ),
    termIds: ['collaboration-based-test-approach'],
  },
  {
    number: '4.5.1',
    explain: L(
      `User story mô tả một tính năng có giá trị với người dùng hoặc người mua hệ thống. Ba khía cạnh "3 C": Card — phương tiện mô tả story (thẻ giấy, mục trên bảng điện tử); Conversation — giải thích phần mềm sẽ được dùng thế nào (ghi lại hoặc nói miệng); Confirmation — tiêu chí chấp nhận (acceptance criteria). Định dạng phổ biến: "As a [vai trò], I want [mục tiêu], so that I can [giá trị nghiệp vụ]", theo sau là tiêu chí chấp nhận. Viết story cộng tác có thể dùng brainstorming, mind map; giúp cả nhóm có tầm nhìn chung từ ba góc nhìn: nghiệp vụ, phát triển, kiểm thử. Story tốt theo INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable. Nếu bên liên quan không biết test story thế nào, có thể story chưa đủ rõ, không phản ánh điều có giá trị với họ, hoặc họ chỉ cần trợ giúp về kiểm thử.`,
      `A user story represents a feature valuable to a user or purchaser of a system. Its three critical aspects, the "3 C’s": Card — the medium describing the story (index card, entry on an electronic board); Conversation — explains how the software will be used (documented or verbal); Confirmation — the acceptance criteria. Common format: "As a [role], I want [goal], so that I can [business value]", followed by the acceptance criteria. Collaborative authorship can use brainstorming and mind mapping and gives a shared vision from three perspectives: business, development and testing. Good stories are INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable. If a stakeholder does not know how to test a story, the story may be unclear, may not reflect something valuable to them, or they may just need help in testing.`,
      `用户故事（user story）描述对系统用户或购买者有价值的功能。三个关键方面“3C”：Card（卡片）——描述故事的载体（索引卡、电子看板条目）；Conversation（对话）——说明软件将如何被使用（可书面或口头）；Confirmation（确认）——验收准则（acceptance criteria）。常见格式：“As a [角色], I want [目标], so that I can [业务价值]”，后接验收准则。协作编写可采用头脑风暴和思维导图，使团队从业务、开发和测试三个视角形成共同愿景。好的用户故事符合 INVEST：Independent（独立）、Negotiable（可协商）、Valuable（有价值）、Estimable（可估算）、Small（小）、Testable（可测试）。如果干系人不知道如何测试某个故事，可能说明故事不够清晰、不能体现对其有价值的内容，或者干系人只是需要测试方面的帮助。`,
    ),
    example: L(
      `"As a registered customer, I want to apply a discount code at checkout, so that I can pay less for my order." PO, dev và tester cùng ngồi (Conversation) và thống nhất: mã hết hạn thì sao? Một đơn được dùng mấy mã? Kết quả được ghi thành tiêu chí chấp nhận (Confirmation) trên thẻ Jira (Card).`,
      `"As a registered customer, I want to apply a discount code at checkout, so that I can pay less for my order." The PO, developer and tester sit together (Conversation) and agree: what happens with an expired code? How many codes per order? The results are written as acceptance criteria (Confirmation) on the Jira card (Card).`,
      `“As a registered customer, I want to apply a discount code at checkout, so that I can pay less for my order.” 产品负责人、开发和测试一起讨论（Conversation）并达成一致：过期优惠码怎么办？每个订单可用几个码？结果作为验收准则（Confirmation）写在 Jira 卡片（Card）上。`,
    ),
    keyPoints: [
      L(`3C: Card, Conversation, Confirmation (= tiêu chí chấp nhận).`, `3 C’s: Card, Conversation, Confirmation (= acceptance criteria).`, `3C：Card、Conversation、Confirmation（= 验收准则）。`),
      L(`INVEST: độc lập (Independent), thương lượng được (Negotiable), có giá trị (Valuable), ước lượng được (Estimable), nhỏ (Small), kiểm thử được (Testable).`, `INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable.`, `INVEST：独立、可协商、有价值、可估算、小、可测试。`),
      L(`Ba góc nhìn: nghiệp vụ, phát triển, kiểm thử.`, `Three perspectives: business, development, testing.`, `三个视角：业务、开发、测试。`),
    ],
    termIds: ['user-story-testing', 'acceptance-criteria', 'collaboration-based-test-approach'],
  },
  {
    number: '4.5.2',
    explain: L(
      `Tiêu chí chấp nhận (acceptance criteria) của user story là các điều kiện mà phần cài đặt phải đáp ứng để được các bên liên quan chấp nhận — có thể xem như các điều kiện kiểm thử cần được thực thi. Chúng thường là kết quả của Conversation. Công dụng: xác định phạm vi story; đạt đồng thuận giữa các bên; mô tả cả kịch bản tích cực và tiêu cực; làm cơ sở cho kiểm thử chấp nhận story; giúp lập kế hoạch và ước lượng chính xác. Hai định dạng phổ biến: hướng kịch bản (scenario-oriented — ví dụ Given/When/Then trong BDD) và hướng quy tắc (rule-oriented — ví dụ danh sách gạch đầu dòng cần xác minh, hoặc bảng ánh xạ đầu vào–đầu ra). Có thể dùng định dạng riêng, miễn là tiêu chí được định nghĩa rõ và không mơ hồ.`,
      `Acceptance criteria for a user story are the conditions an implementation must meet to be accepted by stakeholders — they can be seen as the test conditions to be exercised by the tests. They usually result from the Conversation. They are used to: define the scope of the story; reach consensus among stakeholders; describe positive and negative scenarios; serve as a basis for user story acceptance testing; allow accurate planning and estimation. The two most common formats: scenario-oriented (e.g. Given/When/Then as used in BDD) and rule-oriented (e.g. a bullet-point verification list or a tabulated input-output mapping). A custom format is fine as long as the criteria are well-defined and unambiguous.`,
      `用户故事的验收准则（acceptance criteria）是实现必须满足、才能被干系人接受的条件——可视为测试应执行的测试条件。它们通常来自 Conversation（对话）。用途：界定用户故事范围；在干系人之间达成共识；描述正向和负向场景；作为用户故事验收测试的基础；支持准确的计划和估算。两种最常见格式：面向场景（scenario-oriented，如 BDD 中的 Given/When/Then）和面向规则（rule-oriented，如项目符号验证清单或输入-输出映射表）。也可使用自定义格式，只要验收准则定义明确且无歧义。`,
    ),
    example: L(
      `Hướng kịch bản: "Given giỏ hàng €100 và mã SAVE10 còn hạn, When khách áp mã SAVE10, Then tổng tiền là €90."
Hướng quy tắc (danh sách): • Mã còn hạn giảm 10% • Mã hết hạn hiện "Code expired", tổng tiền không đổi • Mỗi đơn chỉ một mã.
Hướng quy tắc (bảng): SAVE10 → −10% | EXPIRED5 → "Code expired" | (trống) → nút Áp dụng bị vô hiệu.`,
      `Scenario-oriented: "Given a cart of €100 and a valid code SAVE10, When the customer applies SAVE10, Then the total is €90."
Rule-oriented (list): • A valid code gives 10% off • An expired code shows "Code expired" and the total is unchanged • Only one code per order.
Rule-oriented (table): SAVE10 → −10% | EXPIRED5 → "Code expired" | (empty) → Apply button disabled.`,
      `面向场景：“Given 购物车金额 €100 且优惠码 SAVE10 有效，When 顾客使用 SAVE10，Then 总价为 €90。”
面向规则（清单）：• 有效优惠码减 10% • 过期优惠码提示“Code expired”，总价不变 • 每个订单只能用一个码。
面向规则（表格）：SAVE10 → −10% | EXPIRED5 → “Code expired” | （空）→“应用”按钮不可用。`,
    ),
    keyPoints: [
      L(`Tiêu chí chấp nhận ≈ điều kiện kiểm thử của story.`, `Acceptance criteria ≈ the story’s test conditions.`, `验收准则 ≈ 用户故事的测试条件。`),
      L(`Given/When/Then = hướng kịch bản; danh sách/bảng đầu vào–đầu ra = hướng quy tắc.`, `Given/When/Then = scenario-oriented; list/input-output table = rule-oriented.`, `Given/When/Then = 面向场景；清单/输入-输出表 = 面向规则。`),
    ],
    termIds: ['acceptance-criteria', 'behavior-driven-development', 'test-condition'],
  },
  {
    number: '4.5.3',
    explain: L(
      `ATDD là cách tiếp cận test trước (test-first): test case được tạo TRƯỚC khi cài đặt user story, bởi các thành viên có góc nhìn khác nhau (khách hàng, dev, tester); có thể chạy thủ công hoặc tự động. Bước 1: buổi workshop đặc tả (specification workshop) — phân tích, thảo luận, viết story và tiêu chí chấp nhận, giải quyết chỗ thiếu, mơ hồ, lỗi. Bước 2: tạo test case (cả nhóm hoặc tester), dựa trên tiêu chí chấp nhận, như ví dụ về cách phần mềm hoạt động — "ví dụ" và "test" thường dùng thay nhau; có thể áp dụng kỹ thuật ở 4.2–4.4. Thứ tự điển hình: test tích cực (positive) trước, rồi kiểm thử tiêu cực (negative testing), cuối cùng là đặc tính chất lượng phi chức năng (hiệu năng, khả dụng…). Test viết bằng ngôn ngữ tự nhiên dễ hiểu cho các bên: điều kiện tiên quyết, đầu vào, hậu điều kiện. Test phải bao phủ mọi đặc tính của story và KHÔNG vượt ra ngoài story; không có hai test mô tả cùng một đặc tính. Khi ở định dạng framework tự động hóa hỗ trợ, dev có thể tự động hóa chúng → test chấp nhận trở thành yêu cầu thực thi được (executable requirements).`,
      `ATDD is a test-first approach: test cases are created BEFORE implementing the user story, by team members with different perspectives (customers, developers, testers); they may be executed manually or automated. Step 1: a specification workshop — the story and its acceptance criteria are analyzed, discussed and written; incompleteness, ambiguities and defects are resolved. Step 2: create the test cases (whole team or tester), based on the acceptance criteria, as examples of how the software works — "examples" and "tests" are often used interchangeably; techniques from 4.2–4.4 may be applied. Typical order: positive tests first, then negative testing, finally non-functional quality characteristics (performance efficiency, usability…). Tests are expressed in natural language understandable to stakeholders: preconditions, inputs, postconditions. Tests must cover all characteristics of the story and must not go beyond it; no two test cases should describe the same characteristics. Captured in a format supported by a test automation framework, they can be automated by developers → acceptance tests become executable requirements.`,
      `ATDD 是一种测试先行（test-first）方法：在实现用户故事之前，由具有不同视角的团队成员（客户、开发人员、测试人员）创建测试用例；测试可手工执行或自动化。第一步：规格研讨会（specification workshop）——分析、讨论并编写用户故事及其验收准则，解决不完整、歧义或缺陷。第二步：创建测试用例（整个团队或测试人员单独完成），以验收准则为基础，作为软件如何工作的示例——“示例”和“测试”常可互换；可应用 4.2–4.4 节的技术。典型顺序：先正向测试，再负向测试（negative testing），最后覆盖非功能质量特性（如性能效率、易用性）。测试用例应以干系人能理解的自然语言表达：前置条件、输入和后置条件。测试用例必须覆盖用户故事的所有特性且不应超出故事范围；任何两个测试用例都不应描述相同的特性。若以测试自动化框架支持的格式记录，开发人员可在实现功能时将其自动化 → 验收测试成为可执行的需求。`,
    ),
    example: L(
      `Story mã giảm giá (xem 4.5.1), tiêu chí: mã còn hạn giảm 10%; mã hết hạn báo "Code expired"; mỗi đơn một mã.
TC1 (tích cực): Tiền điều kiện: giỏ €100, SAVE10 còn hạn. Đầu vào: áp SAVE10. Hậu điều kiện: tổng €90.
TC2 (tiêu cực): giỏ €100, áp EXPIRED5 → "Code expired", tổng vẫn €100.
TC3 (tiêu cực): đã áp SAVE10, áp thêm WELCOME5 → bị từ chối, tổng vẫn €90.
TC4 (phi chức năng): áp mã trả kết quả trong ≤ 1 giây.
Không thêm "thanh toán bằng thẻ quà tặng" — vượt ra ngoài story.`,
      `Discount-code story (see 4.5.1), criteria: a valid code gives 10% off; an expired code shows "Code expired"; one code per order.
TC1 (positive): Precondition: cart €100, SAVE10 valid. Input: apply SAVE10. Postcondition: total €90.
TC2 (negative): cart €100, apply EXPIRED5 → "Code expired", total stays €100.
TC3 (negative): SAVE10 already applied, apply WELCOME5 → rejected, total stays €90.
TC4 (non-functional): applying a code responds within 1 second.
Do not add "pay with a gift card" — it goes beyond the story.`,
      `优惠码用户故事（见 4.5.1），验收准则：有效优惠码减 10%；过期优惠码提示“Code expired”；每单一个码。
TC1（正向）：前置条件：购物车 €100，SAVE10 有效。输入：使用 SAVE10。后置条件：总价 €90。
TC2（负向）：购物车 €100，使用 EXPIRED5 → 提示“Code expired”，总价仍为 €100。
TC3（负向）：已使用 SAVE10，再使用 WELCOME5 → 被拒绝，总价仍为 €90。
TC4（非功能）：使用优惠码在 1 秒内响应。
不要加入“用礼品卡支付”——超出了该用户故事。`,
    ),
    keyPoints: [
      L(`Workshop đặc tả → tạo test từ tiêu chí chấp nhận, trước khi code.`, `Specification workshop → derive tests from acceptance criteria, before coding.`, `规格研讨会 → 在编码前根据验收准则创建测试。`),
      L(`Thứ tự: tích cực → tiêu cực → phi chức năng.`, `Order: positive → negative → non-functional.`, `顺序：正向 → 负向 → 非功能。`),
      L(`Bao phủ mọi đặc tính của story, không vượt ra ngoài, không trùng lặp.`, `Cover all story characteristics, nothing beyond, no duplicates.`, `覆盖故事所有特性，不超出范围，不重复。`),
    ],
    termIds: ['acceptance-test-driven-development', 'test-first-approach', 'acceptance-criteria', 'negative-testing', 'test-automation-framework'],
  },
];

// ---------- practice questions ----------

const ORDER_MODEL = L(
  `Mô hình trạng thái đơn hàng. Trạng thái: Created (ban đầu), Paid, Shipped, Delivered, Cancelled (Delivered và Cancelled là trạng thái kết thúc, không có chuyển đi tiếp). Sự kiện: pay, cancel, ship, deliver. Chuyển hợp lệ: T1 Created –pay→ Paid; T2 Created –cancel→ Cancelled; T3 Paid –ship→ Shipped; T4 Paid –cancel→ Cancelled; T5 Shipped –deliver→ Delivered. Mọi test case bắt đầu ở Created.`,
  `Order state model. States: Created (initial), Paid, Shipped, Delivered, Cancelled (Delivered and Cancelled are final states with no outgoing transitions). Events: pay, cancel, ship, deliver. Valid transitions: T1 Created –pay→ Paid; T2 Created –cancel→ Cancelled; T3 Paid –ship→ Shipped; T4 Paid –cancel→ Cancelled; T5 Shipped –deliver→ Delivered. Every test case starts in Created.`,
  `订单状态模型。状态：Created（初始）、Paid、Shipped、Delivered、Cancelled（Delivered 和 Cancelled 为终止状态，没有后续转换）。事件：pay、cancel、ship、deliver。有效转换：T1 Created –pay→ Paid；T2 Created –cancel→ Cancelled；T3 Paid –ship→ Shipped；T4 Paid –cancel→ Cancelled；T5 Shipped –deliver→ Delivered。每个测试用例都从 Created 开始。`,
);

const QUESTIONS: QaQuestion[] = [
  // ----- FL-4.1.1 -----
  {
    id: 'ch4-q1', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.1.1', tags: ['test-techniques', 'black-box'],
    stem: L(`Phát biểu nào đúng về kỹ thuật kiểm thử hộp đen (black-box test technique)?`, `Which statement about black-box test techniques is correct?`, `关于黑盒测试技术（black-box test technique），哪项说法正确？`),
    options: [
      L(`Test case chỉ có thể tạo sau khi đã có thiết kế hoặc cài đặt của đối tượng kiểm thử.`, `Test cases can only be created after the design or implementation of the test object.`, `测试用例只能在测试对象设计或实现之后创建。`),
      L(`Nếu cài đặt thay đổi nhưng hành vi yêu cầu giữ nguyên, test case vẫn còn hữu ích.`, `If the implementation changes but the required behavior stays the same, the test cases are still useful.`, `如果实现改变而要求的行为不变，测试用例仍然有用。`),
      L(`Hiệu quả của chúng phụ thuộc chủ yếu vào kỹ năng của tester.`, `Their effectiveness depends mainly on the tester’s skills.`, `其效果主要取决于测试人员的技能。`),
      L(`Chúng dựa trên phân tích cấu trúc và xử lý bên trong của đối tượng kiểm thử.`, `They are based on an analysis of the test object’s internal structure and processing.`, `它们基于对测试对象内部结构和处理的分析。`),
    ],
    answer: 1,
    explanation: L(`Kỹ thuật hộp đen dựa trên hành vi được đặc tả, không tham chiếu cấu trúc bên trong, nên test case độc lập với cách cài đặt và vẫn hữu ích khi code thay đổi mà hành vi yêu cầu không đổi.`, `Black-box techniques are based on the specified behavior without reference to internal structure, so test cases are independent of the implementation and remain useful when it changes but the required behavior does not.`, `黑盒技术基于规定的行为而不涉及内部结构，因此测试用例与实现无关，实现改变而要求的行为不变时仍然有用。`),
    optionNotes: [
      L(`Đó là đặc điểm của kỹ thuật hộp trắng.`, `That describes white-box techniques.`, `这是白盒技术的特点。`),
      null,
      L(`Đó là đặc điểm của kỹ thuật dựa trên kinh nghiệm.`, `That describes experience-based techniques.`, `这是基于经验的技术的特点。`),
      L(`Đó là định nghĩa của kỹ thuật hộp trắng.`, `That is the definition of white-box techniques.`, `这是白盒技术的定义。`),
    ],
    ref: { doc: 'ctfl401', section: '4.1', page: 39 }, termIds: ['black-box-test-technique', 'white-box-test-technique', 'experience-based-test-technique'],
  },
  {
    id: 'ch4-q2', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.1.1', tags: ['test-techniques', 'white-box'],
    scenario: L(`Một tester đọc mã nguồn hàm tính phí và thiết kế test sao cho mọi nhánh của các câu lệnh if đều được thực thi.`, `A tester reads the source code of a fee-calculation function and designs tests so that every branch of its if-statements is exercised.`, `测试人员阅读计费函数的源代码，设计测试使其所有 if 语句的每个分支都被执行。`),
    stem: L(`Tester đang dùng nhóm kỹ thuật nào, và khi nào các test case như vậy có thể được tạo?`, `Which category of technique is the tester using, and when can such test cases be created?`, `该测试人员使用的是哪一类技术？此类测试用例何时可以创建？`),
    options: [
      L(`Hộp đen; ngay khi có đặc tả yêu cầu.`, `Black-box; as soon as the requirements specification exists.`, `黑盒；只要有需求规格说明即可。`),
      L(`Dựa trên kinh nghiệm; chỉ sau khi đã thực thi kiểm thử.`, `Experience-based; only after test execution.`, `基于经验；只有在测试执行之后。`),
      L(`Hộp trắng; chỉ sau khi đã có thiết kế hoặc cài đặt của đối tượng kiểm thử.`, `White-box; only after the design or implementation of the test object.`, `白盒；只有在测试对象设计或实现之后。`),
      L(`Hộp trắng; trước khi viết yêu cầu.`, `White-box; before the requirements are written.`, `白盒；在编写需求之前。`),
    ],
    answer: 2,
    explanation: L(`Thiết kế test từ cấu trúc code là kỹ thuật hộp trắng; vì test case phụ thuộc cách phần mềm được thiết kế nên chỉ tạo được sau thiết kế hoặc cài đặt.`, `Designing tests from code structure is white-box; since such test cases depend on how the software is designed, they can only be created after design or implementation.`, `根据代码结构设计测试属于白盒技术；由于测试用例依赖软件设计，只能在设计或实现之后创建。`),
    optionNotes: [
      L(`Tester dựa trên code, không dựa trên đặc tả.`, `The tester works from the code, not the specification.`, `测试人员依据的是代码而不是规格。`),
      L(`Không dựa trên kinh nghiệm; và thời điểm cũng sai.`, `It is not experience-based, and the timing is wrong.`, `不是基于经验的技术，时间点也不对。`),
      null,
      L(`Chưa có code thì không thể phân tích cấu trúc bên trong.`, `Without code there is no internal structure to analyse.`, `没有代码就无法分析内部结构。`),
    ],
    ref: { doc: 'ctfl401', section: '4.1', page: 39 }, termIds: ['white-box-test-technique'],
  },
  {
    id: 'ch4-q3', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.1.1', tags: ['test-techniques', 'experience-based'],
    stem: L(`Theo giáo trình, mối quan hệ giữa kỹ thuật dựa trên kinh nghiệm và kỹ thuật hộp đen/hộp trắng là gì?`, `According to the syllabus, how do experience-based techniques relate to black-box and white-box techniques?`, `根据大纲，基于经验的测试技术与黑盒/白盒技术是什么关系？`),
    options: [
      L(`Chúng thay thế kỹ thuật hộp đen và hộp trắng khi tester đủ kinh nghiệm.`, `They replace black-box and white-box techniques when testers are experienced enough.`, `当测试人员经验足够时，它们可以取代黑盒和白盒技术。`),
      L(`Hiệu quả của chúng không phụ thuộc vào kỹ năng tester.`, `Their effectiveness does not depend on the tester’s skills.`, `其效果与测试人员技能无关。`),
      L(`Chúng là một loại kỹ thuật hộp đen vì không nhìn vào code.`, `They are a kind of black-box technique because they do not look at code.`, `它们属于黑盒技术，因为不看代码。`),
      L(`Chúng có thể phát hiện lỗi mà kỹ thuật hộp đen và hộp trắng bỏ sót, nên mang tính bổ sung.`, `They can detect defects missed by black-box and white-box techniques, so they are complementary.`, `它们能发现黑盒和白盒技术遗漏的缺陷，因此具有补充性。`),
    ],
    answer: 3,
    explanation: L(`Giáo trình nói kỹ thuật dựa trên kinh nghiệm có thể phát hiện lỗi bị kỹ thuật hộp đen và hộp trắng bỏ sót, vì vậy chúng bổ sung cho hai nhóm đó.`, `The syllabus says experience-based techniques can detect defects missed by black-box and white-box techniques; hence they are complementary to them.`, `大纲指出基于经验的技术能发现黑盒和白盒技术遗漏的缺陷，因此是它们的补充。`),
    optionNotes: [
      L(`Bổ sung, không thay thế.`, `Complement, not replace.`, `是补充而非取代。`),
      L(`Ngược lại: hiệu quả phụ thuộc nhiều vào kỹ năng tester.`, `The opposite: effectiveness depends heavily on tester skill.`, `恰恰相反：效果很大程度上取决于测试人员技能。`),
      L(`Giáo trình xếp chúng thành nhóm riêng.`, `The syllabus treats them as a separate category.`, `大纲把它们列为单独的一类。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.1', page: 39 }, termIds: ['experience-based-test-technique'],
  },
  // ----- FL-4.2.1 EP -----
  {
    id: 'ch4-q4', topicId: 'ch4', difficulty: 1, kLevel: 'K3', objective: 'FL-4.2.1', tags: ['equivalence-partitioning', 'calculation'],
    scenario: L(`Ô "Số lượng vé" chỉ cho nhập số nguyên. Giá trị 1–10 được chấp nhận; giá trị ≤ 0 hiện lỗi "Số lượng không hợp lệ"; giá trị ≥ 11 hiện lỗi "Tối đa 10 vé".`, `The "Number of tickets" field only allows integers. Values 1–10 are accepted; values ≤ 0 show "Invalid quantity"; values ≥ 11 show "Maximum 10 tickets".`, `“购票数量”字段只能输入整数。1–10 被接受；≤ 0 提示“数量无效”；≥ 11 提示“最多 10 张”。`),
    stem: L(`Cần tối thiểu bao nhiêu test case để đạt 100% bao phủ phân vùng tương đương?`, `What is the minimum number of test cases needed to achieve 100% equivalence partitioning coverage?`, `达到 100% 等价类划分覆盖至少需要多少个测试用例？`),
    options: [
      L(`4 ca kiểm thử`, `4 test cases`, `4 个测试用例`),
      L(`2 ca kiểm thử`, `2 test cases`, `2 个测试用例`),
      L(`6 ca kiểm thử`, `6 test cases`, `6 个测试用例`),
      L(`3 ca kiểm thử`, `3 test cases`, `3 个测试用例`),
    ],
    answer: 3,
    explanation: L(`Có 3 phân vùng: ≤ 0 (không hợp lệ), 1–10 (hợp lệ), ≥ 11 (không hợp lệ). 100% EP yêu cầu mỗi phân vùng, kể cả không hợp lệ, được thực thi ít nhất một lần → 3 test, ví dụ −1, 5, 12.`, `There are 3 partitions: ≤ 0 (invalid), 1–10 (valid), ≥ 11 (invalid). 100% EP coverage requires each partition, including invalid ones, to be exercised at least once → 3 tests, e.g. −1, 5, 12.`, `共有 3 个等价类：≤ 0（无效）、1–10（有效）、≥ 11（无效）。100% EP 覆盖要求每个等价类（包括无效的）至少执行一次 → 3 个测试，如 −1、5、12。`),
    optionNotes: [
      L(`Đó là số giá trị biên (BVA 2 giá trị), không phải số phân vùng.`, `That is the number of 2-value BVA items, not partitions.`, `这是二值 BVA 的覆盖项数，不是等价类数。`),
      L(`Bỏ sót một phân vùng không hợp lệ.`, `Misses one invalid partition.`, `遗漏了一个无效等价类。`),
      L(`Đó là số mục của BVA 3 giá trị cho hai biên, không phải EP.`, `That matches 3-value BVA items for two boundaries, not EP.`, `这是两个边界的三值 BVA 覆盖项数，不是 EP。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.2.1', page: 40 }, termIds: ['equivalence-partitioning', 'equivalence-partition', 'coverage'],
  },
  {
    id: 'ch4-q5', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.1', tags: ['equivalence-partitioning', 'each-choice'],
    scenario: L(`Form đặt hàng có hai tham số đã được phân vùng: Hạng thành viên {Standard, Silver, Gold} và Hình thức giao hàng {Tiêu chuẩn, Hỏa tốc}. Tất cả đều là phân vùng hợp lệ.`, `An order form has two partitioned parameters: Membership {Standard, Silver, Gold} and Delivery {Standard, Express}. All are valid partitions.`, `订单表单有两个已划分等价类的参数：会员等级 {Standard, Silver, Gold} 和配送方式 {标准, 加急}。全部为有效等价类。`),
    stem: L(`Số test case tối thiểu để đạt 100% Each Choice coverage là bao nhiêu?`, `What is the minimum number of test cases to achieve 100% Each Choice coverage?`, `达到 100% Each Choice 覆盖最少需要多少个测试用例？`),
    options: [
      L(`3 ca kiểm thử`, `3 test cases`, `3 个测试用例`),
      L(`5 ca kiểm thử`, `5 test cases`, `5 个测试用例`),
      L(`6 ca kiểm thử`, `6 test cases`, `6 个测试用例`),
      L(`2 ca kiểm thử`, `2 test cases`, `2 个测试用例`),
    ],
    answer: 0,
    explanation: L(`Each Choice yêu cầu mỗi phân vùng của mỗi tập được thực thi ít nhất một lần, không xét tổ hợp. Một test bao phủ một phân vùng của mỗi tập, nên cần max(3, 2) = 3 test, ví dụ (Standard, Tiêu chuẩn), (Silver, Hỏa tốc), (Gold, Tiêu chuẩn).`, `Each Choice requires each partition of each set to be exercised at least once, ignoring combinations. One test covers one partition from each set, so max(3, 2) = 3 tests suffice, e.g. (Standard, Standard), (Silver, Express), (Gold, Standard).`, `Each Choice 要求每组的每个等价类至少执行一次，不考虑组合。一个测试可同时覆盖每组中的一个等价类，因此 max(3, 2) = 3 个测试即可，如 (Standard, 标准)、(Silver, 加急)、(Gold, 标准)。`),
    optionNotes: [
      null,
      L(`3 + 2 = 5 là khi mỗi test chỉ bao phủ một phân vùng; một test có thể bao phủ phân vùng của cả hai tập.`, `3 + 2 = 5 assumes one partition per test; one test can cover a partition of both sets.`, `3 + 2 = 5 假设每个测试只覆盖一个等价类；实际上一个测试可覆盖两组各一个。`),
      L(`3 × 2 = 6 là mọi tổ hợp — Each Choice không xét tổ hợp.`, `3 × 2 = 6 is all combinations — Each Choice ignores combinations.`, `3 × 2 = 6 是全部组合——Each Choice 不考虑组合。`),
      L(`2 test không thể bao phủ cả 3 hạng thành viên.`, `2 tests cannot cover all 3 membership levels.`, `2 个测试无法覆盖 3 个会员等级。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.1', page: 40 }, termIds: ['each-choice-coverage', 'equivalence-partitioning'],
  },
  {
    id: 'ch4-q6', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.1', tags: ['equivalence-partitioning', 'coverage', 'calculation'],
    scenario: L(`Phí bảo hiểm theo tuổi (số nguyên): 18–25 → mức A; 26–60 → mức B; 61–80 → mức C; < 18 và > 80 bị từ chối. Các test đã chạy với tuổi: 20, 24, 45, 85.`, `Insurance premium by age (integer): 18–25 → rate A; 26–60 → rate B; 61–80 → rate C; < 18 and > 80 are rejected. Tests were run with ages 20, 24, 45, 85.`, `按年龄（整数）计算保费：18–25 → 费率 A；26–60 → 费率 B；61–80 → 费率 C；< 18 和 > 80 被拒绝。已执行的测试年龄为 20、24、45、85。`),
    stem: L(`Mức bao phủ phân vùng tương đương đạt được là bao nhiêu?`, `What equivalence partitioning coverage has been achieved?`, `已达到的等价类划分覆盖率是多少？`),
    options: [
      L(`40% (2/5 phân vùng)`, `40% (2 of 5 partitions)`, `40%（5 个等价类中的 2 个）`),
      L(`80% (4/5 phân vùng)`, `80% (4 of 5 partitions)`, `80%（5 个等价类中的 4 个）`),
      L(`60% (3/5 phân vùng)`, `60% (3 of 5 partitions)`, `60%（5 个等价类中的 3 个）`),
      L(`100% (mọi phân vùng)`, `100% (all partitions)`, `100%（全部等价类）`),
    ],
    answer: 2,
    explanation: L(`Có 5 phân vùng: < 18, 18–25, 26–60, 61–80, > 80. Tuổi 20 và 24 cùng thuộc 18–25; 45 thuộc 26–60; 85 thuộc > 80. Đã thực thi 3 phân vùng → 3/5 = 60%. Chưa có test cho < 18 và 61–80.`, `There are 5 partitions: < 18, 18–25, 26–60, 61–80, > 80. Ages 20 and 24 are both in 18–25; 45 in 26–60; 85 in > 80. 3 partitions exercised → 3/5 = 60%. < 18 and 61–80 are untested.`, `共 5 个等价类：< 18、18–25、26–60、61–80、> 80。20 和 24 同属 18–25；45 属 26–60；85 属 > 80。已执行 3 个等价类 → 3/5 = 60%。< 18 和 61–80 尚未测试。`),
    optionNotes: [
      L(`Đã bỏ qua phân vùng không hợp lệ > 80 — nó cũng được tính.`, `Ignores the invalid partition > 80, which also counts.`, `忽略了无效等价类 > 80，它也要计入。`),
      L(`Đếm số test (4) thay vì số phân vùng khác nhau; 20 và 24 cùng một phân vùng.`, `Counts tests (4) instead of distinct partitions; 20 and 24 share a partition.`, `数的是测试个数（4）而不是不同的等价类；20 和 24 属同一等价类。`),
      null,
      L(`Thiếu < 18 và 61–80.`, `< 18 and 61–80 are missing.`, `缺少 < 18 和 61–80。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.1', page: 40 }, termIds: ['equivalence-partitioning', 'coverage'],
  },
  {
    id: 'ch4-q7', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.1', tags: ['equivalence-partitioning', 'test-data'],
    scenario: L(`Phí vận chuyển theo khối lượng (kg, một chữ số thập phân): 0.1–5.0 → phí A; 5.1–20.0 → phí B; ≥ 20.1 bị từ chối; ≤ 0.0 bị từ chối.`, `Shipping fee by weight (kg, one decimal place): 0.1–5.0 → fee A; 5.1–20.0 → fee B; ≥ 20.1 rejected; ≤ 0.0 rejected.`, `按重量（千克，一位小数）计算运费：0.1–5.0 → 运费 A；5.1–20.0 → 运费 B；≥ 20.1 拒绝；≤ 0.0 拒绝。`),
    stem: L(`Bộ giá trị nào đạt 100% bao phủ phân vùng tương đương?`, `Which set of test values achieves 100% equivalence partitioning coverage?`, `哪组测试值能达到 100% 等价类划分覆盖？`),
    options: [
      L(`Các giá trị 0.1; 5.0; 5.1; 20.0`, `Values 0.1; 5.0; 5.1; 20.0`, `取值 0.1；5.0；5.1；20.0`),
      L(`Các giá trị 0.0; 3.0; 12.0; 25.0`, `Values 0.0; 3.0; 12.0; 25.0`, `取值 0.0；3.0；12.0；25.0`),
      L(`Các giá trị −1.0; 3.0; 4.5; 30.0`, `Values −1.0; 3.0; 4.5; 30.0`, `取值 −1.0；3.0；4.5；30.0`),
      L(`Các giá trị 3.0; 12.0; 25.0`, `Values 3.0; 12.0; 25.0`, `取值 3.0；12.0；25.0`),
    ],
    answer: 1,
    explanation: L(`4 phân vùng: ≤ 0.0, 0.1–5.0, 5.1–20.0, ≥ 20.1. Bộ 0.0 / 3.0 / 12.0 / 25.0 có đúng một giá trị trong mỗi phân vùng → 4/4 = 100%.`, `4 partitions: ≤ 0.0, 0.1–5.0, 5.1–20.0, ≥ 20.1. The set 0.0 / 3.0 / 12.0 / 25.0 has one value in each → 4/4 = 100%.`, `4 个等价类：≤ 0.0、0.1–5.0、5.1–20.0、≥ 20.1。0.0 / 3.0 / 12.0 / 25.0 在每个等价类中各有一个值 → 4/4 = 100%。`),
    optionNotes: [
      L(`Toàn giá trị biên của hai phân vùng hợp lệ; không có phân vùng không hợp lệ nào → 50%.`, `All boundary values of the two valid partitions; no invalid partition → 50%.`, `全是两个有效等价类的边界值，没有无效等价类 → 50%。`),
      null,
      L(`3.0 và 4.5 cùng phân vùng; thiếu 5.1–20.0 → 75%.`, `3.0 and 4.5 share a partition; 5.1–20.0 missing → 75%.`, `3.0 和 4.5 属同一等价类；缺少 5.1–20.0 → 75%。`),
      L(`Thiếu phân vùng không hợp lệ ≤ 0.0 → 75%.`, `Misses the invalid partition ≤ 0.0 → 75%.`, `缺少无效等价类 ≤ 0.0 → 75%。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.1', page: 40 }, termIds: ['equivalence-partitioning', 'test-data'],
  },
  // ----- FL-4.2.2 BVA -----
  {
    id: 'ch4-q8', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.2', tags: ['boundary-value-analysis', '3-value'],
    scenario: L(`Một ô nhận số nguyên 1–10; giá trị nhỏ hơn 1 hoặc lớn hơn 10 bị từ chối.`, `A field accepts integers 1–10; values below 1 or above 10 are rejected.`, `某字段接受整数 1–10；小于 1 或大于 10 的值被拒绝。`),
    stem: L(`Giá trị nào là mục bao phủ của BVA 3 giá trị nhưng KHÔNG phải mục bao phủ của BVA 2 giá trị?`, `Which value is a coverage item for 3-value BVA but NOT for 2-value BVA?`, `哪个值是三值 BVA 的覆盖项，但不是二值 BVA 的覆盖项？`),
    options: [
      L(`Giá trị 11`, `Value 11`, `取值 11`),
      L(`Giá trị 2`, `Value 2`, `取值 2`),
      L(`Giá trị 0`, `Value 0`, `取值 0`),
      L(`Giá trị 5`, `Value 5`, `取值 5`),
    ],
    answer: 1,
    explanation: L(`BVA 2 giá trị: mỗi biên + láng giềng gần nhất ở phân vùng kề → 0, 1, 10, 11. BVA 3 giá trị thêm láng giềng thứ hai: với biên 1 là 0 và 2, với biên 10 là 9 và 11. Vậy 2 (và 9) chỉ xuất hiện trong BVA 3 giá trị — và 2 không phải giá trị biên.`, `2-value BVA: each boundary plus its closest neighbor in the adjacent partition → 0, 1, 10, 11. 3-value BVA adds the other neighbor: for boundary 1 → 0 and 2; for 10 → 9 and 11. So 2 (and 9) appear only in 3-value BVA — and 2 is not itself a boundary value.`, `二值 BVA：每个边界值加相邻等价类中的最近邻值 → 0、1、10、11。三值 BVA 再加另一侧邻值：边界 1 → 0 和 2；边界 10 → 9 和 11。因此 2（和 9）只出现在三值 BVA 中——而且 2 本身不是边界值。`),
    optionNotes: [
      L(`11 là láng giềng của 10 ở phân vùng kề, nên có trong cả BVA 2 giá trị.`, `11 is 10’s neighbor in the adjacent partition, so it is a 2-value item too.`, `11 是 10 在相邻等价类中的邻值，也是二值 BVA 的覆盖项。`),
      null,
      L(`0 là láng giềng của 1 ở phân vùng kề, nên có trong cả BVA 2 giá trị.`, `0 is 1’s neighbor in the adjacent partition, so it is a 2-value item too.`, `0 是 1 在相邻等价类中的邻值，也是二值 BVA 的覆盖项。`),
      L(`5 nằm giữa phân vùng, không liên quan đến biên.`, `5 is mid-partition, not related to a boundary.`, `5 位于等价类中间，与边界无关。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.2', page: 40 }, termIds: ['boundary-value-analysis', 'boundary-value', 'coverage-item'],
  },
  {
    id: 'ch4-q9', topicId: 'ch4', difficulty: 1, kLevel: 'K3', objective: 'FL-4.2.2', tags: ['boundary-value-analysis', '2-value', 'calculation'],
    scenario: L(`Máy điều hòa nhận nhiệt độ cài đặt là số nguyên từ 16 đến 30 °C; giá trị khác bị từ chối. Xét hai biên giữa các phân vùng (15/16 và 30/31).`, `An air conditioner accepts integer set-points from 16 to 30 °C; other values are rejected. Consider the two boundaries between partitions (15/16 and 30/31).`, `空调接受 16 到 30 °C 的整数设定温度，其他值被拒绝。考虑等价类之间的两处边界（15/16 和 30/31）。`),
    stem: L(`Cần tối thiểu bao nhiêu test case để đạt 100% bao phủ BVA 2 giá trị?`, `What is the minimum number of test cases for 100% 2-value BVA coverage?`, `达到 100% 二值 BVA 覆盖至少需要多少个测试用例？`),
    options: [
      L(`2 ca kiểm thử`, `2 test cases`, `2 个测试用例`),
      L(`6 ca kiểm thử`, `6 test cases`, `6 个测试用例`),
      L(`4 ca kiểm thử`, `4 test cases`, `4 个测试用例`),
      L(`8 ca kiểm thử`, `8 test cases`, `8 个测试用例`),
    ],
    answer: 2,
    explanation: L(`Mục bao phủ BVA 2 giá trị: 15, 16 (biên dưới) và 30, 31 (biên trên) → 4 giá trị, mỗi test chỉ dùng một giá trị cho ô này → 4 test.`, `2-value BVA items: 15, 16 (lower boundary) and 30, 31 (upper boundary) → 4 values; each test uses one value for this field → 4 tests.`, `二值 BVA 覆盖项：15、16（下边界）和 30、31（上边界）→ 4 个值，每个测试只能给该字段一个值 → 4 个测试。`),
    optionNotes: [
      L(`Chỉ thử 16 và 30 là bỏ qua láng giềng ở phân vùng không hợp lệ.`, `Testing only 16 and 30 ignores the neighbors in the invalid partitions.`, `只测 16 和 30 忽略了无效等价类中的邻值。`),
      L(`6 là số mục của BVA 3 giá trị (15, 16, 17, 29, 30, 31).`, `6 is the 3-value BVA count (15, 16, 17, 29, 30, 31).`, `6 是三值 BVA 的覆盖项数（15、16、17、29、30、31）。`),
      null,
      L(`Không có cơ sở cho 8 giá trị trong BVA 2 giá trị.`, `There is no basis for 8 values in 2-value BVA.`, `二值 BVA 没有 8 个值的依据。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.2', page: 40 }, termIds: ['boundary-value-analysis', 'boundary-value'],
  },
  {
    id: 'ch4-q10', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.2', tags: ['boundary-value-analysis', '3-value'],
    scenario: L(`Cùng máy điều hòa: nhận số nguyên 16–30 °C, giá trị khác bị từ chối. Áp dụng BVA 3 giá trị cho các biên 16 và 30 của phân vùng hợp lệ.`, `Same air conditioner: accepts integers 16–30 °C, other values rejected. Apply 3-value BVA to the valid partition’s boundaries 16 and 30.`, `同一台空调：接受整数 16–30 °C，其他值被拒绝。对有效等价类的边界 16 和 30 应用三值 BVA。`),
    stem: L(`Bộ giá trị nào đạt đúng 100% bao phủ BVA 3 giá trị cho hai biên này?`, `Which set of values achieves 100% 3-value BVA coverage for these two boundaries?`, `哪组值能对这两个边界达到 100% 三值 BVA 覆盖？`),
    options: [
      L(`Các giá trị 15, 16, 30, 31`, `Values 15, 16, 30, 31`, `取值 15、16、30、31`),
      L(`Các giá trị 16, 17, 29, 30`, `Values 16, 17, 29, 30`, `取值 16、17、29、30`),
      L(`Các giá trị 14, 15, 16, 30, 31, 32`, `Values 14, 15, 16, 30, 31, 32`, `取值 14、15、16、30、31、32`),
      L(`Các giá trị 15, 16, 17, 29, 30, 31`, `Values 15, 16, 17, 29, 30, 31`, `取值 15、16、17、29、30、31`),
    ],
    answer: 3,
    explanation: L(`BVA 3 giá trị: mỗi giá trị biên cùng CẢ HAI láng giềng. Biên 16 → 15, 16, 17; biên 30 → 29, 30, 31.`, `3-value BVA: each boundary value together with BOTH neighbors. Boundary 16 → 15, 16, 17; boundary 30 → 29, 30, 31.`, `三值 BVA：每个边界值及其两侧邻值。边界 16 → 15、16、17；边界 30 → 29、30、31。`),
    optionNotes: [
      L(`Đó là bộ BVA 2 giá trị; thiếu 17 và 29.`, `That is the 2-value set; 17 and 29 are missing.`, `这是二值 BVA 的取值，缺少 17 和 29。`),
      L(`Thiếu các láng giềng không hợp lệ 15 và 31.`, `Missing the invalid neighbors 15 and 31.`, `缺少无效一侧的邻值 15 和 31。`),
      L(`Lấy hai giá trị phía ngoài thay vì một láng giềng mỗi bên; thiếu 17 và 29.`, `Takes two values outside instead of one neighbor on each side; 17 and 29 missing.`, `取了外侧两个值而不是两侧各一个邻值；缺少 17 和 29。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.2.2', page: 40 }, termIds: ['boundary-value-analysis', 'boundary-value', 'coverage-item'],
  },
  {
    id: 'ch4-q11', topicId: 'ch4', difficulty: 3, kLevel: 'K3', objective: 'FL-4.2.2', tags: ['boundary-value-analysis', 'coverage', 'calculation'],
    scenario: L(`Giảm giá theo tổng đơn (số nguyên €): 0–99 không giảm; 100–499 giảm 5%; từ 500 giảm 10%. Chỉ xét hai biên giữa các phân vùng (99/100 và 499/500). Các test đã chạy với tổng đơn: 100, 250, 499, 600.`, `Discount by order total (integer €): 0–99 no discount; 100–499 5%; 500 and above 10%. Consider only the two boundaries between partitions (99/100 and 499/500). Tests were run with totals 100, 250, 499, 600.`, `按订单总额（整数欧元）打折：0–99 不打折；100–499 打 95 折；500 及以上打 9 折。只考虑等价类之间的两处边界（99/100 和 499/500）。已执行测试的总额为 100、250、499、600。`),
    stem: L(`Mức bao phủ BVA 2 giá trị đạt được là bao nhiêu?`, `What 2-value BVA coverage has been achieved?`, `已达到的二值 BVA 覆盖率是多少？`),
    options: [
      L(`50% (2/4 mục)`, `50% (2 of 4 items)`, `50%（4 个覆盖项中的 2 个）`),
      L(`25% (1/4 mục)`, `25% (1 of 4 items)`, `25%（4 个覆盖项中的 1 个）`),
      L(`75% (3/4 mục)`, `75% (3 of 4 items)`, `75%（4 个覆盖项中的 3 个）`),
      L(`100% (mọi mục)`, `100% (all items)`, `100%（全部覆盖项）`),
    ],
    answer: 0,
    explanation: L(`Mục bao phủ: 99, 100, 499, 500. Test 100 và 499 trúng mục; 250 và 600 không phải giá trị biên. → 2/4 = 50%. Còn thiếu 99 và 500.`, `Coverage items: 99, 100, 499, 500. Tests 100 and 499 hit items; 250 and 600 are not boundary values → 2/4 = 50%. 99 and 500 are still missing.`, `覆盖项：99、100、499、500。测试 100 和 499 命中覆盖项；250 和 600 不是边界值 → 2/4 = 50%。仍缺 99 和 500。`),
    optionNotes: [
      null,
      L(`Cả 100 và 499 đều là mục bao phủ.`, `Both 100 and 499 are coverage items.`, `100 和 499 都是覆盖项。`),
      L(`600 không phải giá trị biên (biên là 500).`, `600 is not a boundary value (the boundary is 500).`, `600 不是边界值（边界是 500）。`),
      L(`Chưa test 99 và 500.`, `99 and 500 were not tested.`, `99 和 500 未被测试。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.2', page: 40 }, termIds: ['boundary-value-analysis', 'coverage'],
  },
  {
    id: 'ch4-q12', topicId: 'ch4', difficulty: 3, kLevel: 'K3', objective: 'FL-4.2.2', tags: ['boundary-value-analysis', 'defect-detection'],
    scenario: L(`Yêu cầu: "Nếu số sản phẩm x ≤ 10 thì miễn phí đóng gói". Lập trình viên cài nhầm thành "if (x = 10)". x là số nguyên dương.`, `Requirement: "If the number of items x ≤ 10, packaging is free". The developer wrongly implemented "if (x = 10)". x is a positive integer.`, `需求：“若商品数量 x ≤ 10，则免包装费”。开发人员误实现为“if (x = 10)”。x 为正整数。`),
    stem: L(`Giá trị test nào sẽ làm lộ khiếm khuyết này?`, `Which test value will reveal this defect?`, `哪个测试值能暴露这个缺陷？`),
    options: [
      L(`Giá trị x = 10`, `Value x = 10`, `取值 x = 10`),
      L(`Giá trị x = 11`, `Value x = 11`, `取值 x = 11`),
      L(`Giá trị x = 9`, `Value x = 9`, `取值 x = 9`),
      L(`Giá trị x = 12`, `Value x = 12`, `取值 x = 12`),
    ],
    answer: 2,
    explanation: L(`Với x = 9: yêu cầu → miễn phí; code (x = 10 sai) → không miễn phí → khác kết quả mong đợi, lộ lỗi. x = 10 và x = 11 (bộ BVA 2 giá trị) cho kết quả giống nhau giữa yêu cầu và code. Đây đúng là ví dụ của giáo trình: x = 9 đến từ BVA 3 giá trị.`, `With x = 9: requirement → free; code (x = 10 is false) → not free → differs from expected, defect revealed. x = 10 and x = 11 (the 2-value BVA set) give the same result for requirement and code. This is the syllabus example: x = 9 comes from 3-value BVA.`, `x = 9 时：按需求应免费；代码（x = 10 为假）→ 不免费 → 与预期不符，暴露缺陷。x = 10 和 x = 11（二值 BVA 取值）在需求和代码下结果相同。这正是大纲中的例子：x = 9 来自三值 BVA。`),
    optionNotes: [
      L(`x = 10: cả yêu cầu và code đều miễn phí.`, `x = 10: both requirement and code give free packaging.`, `x = 10：需求和代码都免费。`),
      L(`x = 11: cả yêu cầu và code đều không miễn phí.`, `x = 11: both requirement and code give no free packaging.`, `x = 11：需求和代码都不免费。`),
      null,
      L(`x = 12: cả yêu cầu và code đều không miễn phí.`, `x = 12: both give no free packaging.`, `x = 12：两者都不免费。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.2', page: 40 }, termIds: ['boundary-value-analysis', 'defect'],
  },
  // ----- FL-4.2.3 decision tables -----
  {
    id: 'ch4-q13', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.3', tags: ['decision-table', 'feasible-columns', 'calculation'],
    scenario: L(`Bảng quyết định giá vé xem phim có ba điều kiện Boolean: C1 "tuổi < 12", C2 "tuổi ≥ 65", C3 "ngày trong tuần (thứ Hai–thứ Sáu)".`, `A cinema ticket decision table has three Boolean conditions: C1 "age < 12", C2 "age ≥ 65", C3 "weekday (Monday–Friday)".`, `电影票价决策表有三个布尔条件：C1“年龄 < 12”，C2“年龄 ≥ 65”，C3“工作日（周一至周五）”。`),
    stem: L(`Sau khi xóa các cột không khả thi, bảng còn bao nhiêu cột (tức số mục bao phủ)?`, `After deleting infeasible columns, how many columns (coverage items) remain?`, `删除不可行列后，还剩多少列（即覆盖项数）？`),
    options: [
      L(`8 cột`, `8 columns`, `8 列`),
      L(`6 cột`, `6 columns`, `6 列`),
      L(`4 cột`, `4 columns`, `4 列`),
      L(`3 cột`, `3 columns`, `3 列`),
    ],
    answer: 1,
    explanation: L(`Bảng đầy đủ có 2³ = 8 cột. C1 = T và C2 = T cùng lúc là không khả thi (không ai vừa < 12 vừa ≥ 65), xảy ra ở 2 cột (C3 = T hoặc F). 8 − 2 = 6 cột khả thi.`, `The full table has 2³ = 8 columns. C1 = T together with C2 = T is infeasible (nobody is both < 12 and ≥ 65); this occurs in 2 columns (C3 = T or F). 8 − 2 = 6 feasible columns.`, `完整表有 2³ = 8 列。C1 = T 且 C2 = T 不可行（不可能既 < 12 岁又 ≥ 65 岁），出现在 2 列中（C3 = T 或 F）。8 − 2 = 6 个可行列。`),
    optionNotes: [
      L(`8 là bảng đầy đủ, chưa loại cột không khả thi.`, `8 is the full table before deleting infeasible columns.`, `8 是删除不可行列之前的完整表。`),
      null,
      L(`Chỉ đúng nếu bỏ hẳn C3.`, `Only true if C3 were dropped.`, `只有去掉 C3 才成立。`),
      L(`3 là số cột khả thi khi chỉ có C1 và C2.`, `3 is the feasible count with only C1 and C2.`, `3 是只有 C1、C2 时的可行列数。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.3', page: 41 }, termIds: ['decision-table-testing', 'coverage-item'],
  },
  {
    id: 'ch4-q14', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.3', tags: ['decision-table', 'test-cases'],
    scenario: L(`Bảng quyết định (đã tối giản). Điều kiện: C1 "khách là thành viên", C2 "tổng đơn ≥ €50". Hành động: A1 miễn phí vận chuyển, A2 tính phí €5.
R1: C1 = T, C2 = T → A1
R2: C1 = T, C2 = F → A2
R3: C1 = F, C2 = – → A2`, `Decision table (minimized). Conditions: C1 "customer is a member", C2 "order total ≥ €50". Actions: A1 free shipping, A2 charge €5.
R1: C1 = T, C2 = T → A1
R2: C1 = T, C2 = F → A2
R3: C1 = F, C2 = – → A2`, `决策表（已最小化）。条件：C1“顾客是会员”，C2“订单总额 ≥ €50”。动作：A1 免运费，A2 收 €5 运费。
R1：C1 = T，C2 = T → A1
R2：C1 = T，C2 = F → A2
R3：C1 = F，C2 = – → A2`),
    stem: L(`Bộ test nào đạt 100% bao phủ bảng quyết định?`, `Which set of test cases achieves 100% decision table coverage?`, `哪组测试用例能达到 100% 决策表覆盖？`),
    options: [
      L(`Thành viên €60; thành viên €30; không phải thành viên €30`, `Member €60; member €30; non-member €30`, `会员 €60；会员 €30；非会员 €30`),
      L(`Thành viên €60; không phải thành viên €60`, `Member €60; non-member €60`, `会员 €60；非会员 €60`),
      L(`Thành viên €30; không phải thành viên €30; không phải thành viên €60`, `Member €30; non-member €30; non-member €60`, `会员 €30；非会员 €30；非会员 €60`),
      L(`Thành viên €50; không phải thành viên €20`, `Member €50; non-member €20`, `会员 €50；非会员 €20`),
    ],
    answer: 0,
    explanation: L(`Cần thực thi cả 3 cột. Thành viên €60 → R1; thành viên €30 → R2; không phải thành viên €30 → R3 (C2 không liên quan). 3/3 = 100%.`, `All 3 columns must be exercised. Member €60 → R1; member €30 → R2; non-member €30 → R3 (C2 irrelevant). 3/3 = 100%.`, `需执行全部 3 列。会员 €60 → R1；会员 €30 → R2；非会员 €30 → R3（C2 无关）。3/3 = 100%。`),
    optionNotes: [
      null,
      L(`Chỉ R1 và R3; thiếu R2 (thành viên, < €50).`, `Only R1 and R3; R2 (member, < €50) missing.`, `只覆盖 R1 和 R3；缺 R2（会员，< €50）。`),
      L(`R2, R3, R3; thiếu R1.`, `R2, R3, R3; R1 missing.`, `R2、R3、R3；缺 R1。`),
      L(`€50 thỏa "≥ €50" nên là R1; cùng R3 — thiếu R2.`, `€50 satisfies "≥ €50" so it is R1; with R3 — R2 missing.`, `€50 满足“≥ €50”，属于 R1；加上 R3——缺 R2。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.3', page: 41 }, termIds: ['decision-table-testing', 'coverage'],
  },
  {
    id: 'ch4-q15', topicId: 'ch4', difficulty: 3, kLevel: 'K3', objective: 'FL-4.2.3', tags: ['decision-table', 'coverage', 'calculation'],
    scenario: L(`Dùng bảng giá vé ở trên (C1 "tuổi < 12", C2 "tuổi ≥ 65", C3 "ngày trong tuần thứ Hai–thứ Sáu"; 2 cột có C1 = C2 = T không khả thi). Các test đã chạy: (8 tuổi, thứ Hai), (70 tuổi, thứ Bảy), (30 tuổi, thứ Ba), (10 tuổi, thứ Tư).`, `Use the cinema table (C1 "age < 12", C2 "age ≥ 65", C3 "weekday Monday–Friday"; the 2 columns with C1 = C2 = T are infeasible). Tests run: (age 8, Monday), (age 70, Saturday), (age 30, Tuesday), (age 10, Wednesday).`, `使用上面的电影票决策表（C1“年龄 < 12”，C2“年龄 ≥ 65”，C3“工作日 周一至周五”；C1 = C2 = T 的 2 列不可行）。已执行测试：(8 岁, 周一)、(70 岁, 周六)、(30 岁, 周二)、(10 岁, 周三)。`),
    stem: L(`Mức bao phủ bảng quyết định đạt được là bao nhiêu?`, `What decision table coverage has been achieved?`, `已达到的决策表覆盖率是多少？`),
    options: [
      L(`37,5% (3/8 cột)`, `37.5% (3 of 8 columns)`, `37.5%（8 列中的 3 列）`),
      L(`67% (4/6 cột)`, `67% (4 of 6 columns)`, `67%（6 列中的 4 列）`),
      L(`75% (3/4 cột)`, `75% (3 of 4 columns)`, `75%（4 列中的 3 列）`),
      L(`50% (3/6 cột)`, `50% (3 of 6 columns)`, `50%（6 列中的 3 列）`),
    ],
    answer: 3,
    explanation: L(`Các cột được thực thi: (8, thứ Hai) = (T, F, T); (70, thứ Bảy) = (F, T, F); (30, thứ Ba) = (F, F, T); (10, thứ Tư) = (T, F, T) — trùng cột đầu. 3 cột khác nhau / 6 cột khả thi = 50%.`, `Columns exercised: (8, Mon) = (T, F, T); (70, Sat) = (F, T, F); (30, Tue) = (F, F, T); (10, Wed) = (T, F, T) — same as the first. 3 distinct columns / 6 feasible = 50%.`, `执行到的列：(8, 周一) = (T, F, T)；(70, 周六) = (F, T, F)；(30, 周二) = (F, F, T)；(10, 周三) = (T, F, T)——与第一列相同。3 个不同列 / 6 个可行列 = 50%。`),
    optionNotes: [
      L(`Mẫu số chỉ gồm cột khả thi (6), không phải 8.`, `The denominator is feasible columns (6), not 8.`, `分母只计可行列（6），不是 8。`),
      L(`Hai test (8 tuổi thứ Hai, 10 tuổi thứ Tư) cùng một cột.`, `Two tests (age 8 Mon, age 10 Wed) hit the same column.`, `两个测试（8 岁周一、10 岁周三）落在同一列。`),
      L(`Bảng có 6 cột khả thi, không phải 4.`, `The table has 6 feasible columns, not 4.`, `该表有 6 个可行列，不是 4 个。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.2.3', page: 41 }, termIds: ['decision-table-testing', 'coverage'],
  },
  {
    id: 'ch4-q16', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.3', tags: ['decision-table', 'extended-entry', 'calculation'],
    scenario: L(`Một bảng quyết định extended-entry có điều kiện "Hạng thành viên" với ba giá trị (Bronze, Silver, Gold) và hai điều kiện Boolean ("Có mã giảm giá", "Đơn quốc tế"). Mọi tổ hợp đều khả thi.`, `An extended-entry decision table has a condition "Membership level" with three values (Bronze, Silver, Gold) and two Boolean conditions ("Has coupon", "International order"). All combinations are feasible.`, `某扩展项决策表有一个三值条件“会员等级”（Bronze、Silver、Gold）和两个布尔条件（“有优惠券”“国际订单”）。所有组合都可行。`),
    stem: L(`Bảng quyết định đầy đủ có bao nhiêu cột?`, `How many columns does the full decision table have?`, `完整决策表有多少列？`),
    options: [
      L(`6 cột`, `6 columns`, `6 列`),
      L(`8 cột`, `8 columns`, `8 列`),
      L(`12 cột`, `12 columns`, `12 列`),
      L(`7 cột`, `7 columns`, `7 列`),
    ],
    answer: 2,
    explanation: L(`Bảng đầy đủ có một cột cho mỗi tổ hợp điều kiện: 3 × 2 × 2 = 12.`, `A full table has one column per combination of conditions: 3 × 2 × 2 = 12.`, `完整表为每种条件组合设一列：3 × 2 × 2 = 12。`),
    optionNotes: [
      L(`3 × 2 = 6 bỏ quên một điều kiện Boolean.`, `3 × 2 = 6 forgets one Boolean condition.`, `3 × 2 = 6 漏掉了一个布尔条件。`),
      L(`2³ = 8 coi cả ba điều kiện là Boolean.`, `2³ = 8 treats all three conditions as Boolean.`, `2³ = 8 把三个条件都当作布尔条件。`),
      null,
      L(`3 + 2 + 2 = 7 cộng thay vì nhân.`, `3 + 2 + 2 = 7 adds instead of multiplying.`, `3 + 2 + 2 = 7 是相加而不是相乘。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.3', page: 41 }, termIds: ['decision-table-testing'],
  },
  // ----- FL-4.2.4 state transitions -----
  {
    id: 'ch4-q17', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.4', tags: ['state-transition', 'valid-transitions', 'calculation'],
    scenario: ORDER_MODEL,
    stem: L(`Cần tối thiểu bao nhiêu test case để đạt 100% bao phủ chuyển trạng thái hợp lệ (valid transitions / 0-switch)?`, `What is the minimum number of test cases to achieve 100% valid transitions (0-switch) coverage?`, `达到 100% 有效转换（0-switch）覆盖至少需要多少个测试用例？`),
    options: [
      L(`2 ca kiểm thử`, `2 test cases`, `2 个测试用例`),
      L(`5 ca kiểm thử`, `5 test cases`, `5 个测试用例`),
      L(`4 ca kiểm thử`, `4 test cases`, `4 个测试用例`),
      L(`3 ca kiểm thử`, `3 test cases`, `3 个测试用例`),
    ],
    answer: 3,
    explanation: L(`T2, T4, T5 đều dẫn vào trạng thái kết thúc nên mỗi cái phải nằm trong một test riêng. TC1: pay, ship, deliver (T1, T3, T5); TC2: cancel (T2); TC3: pay, cancel (T1, T4) → 3 test bao phủ cả 5 chuyển.`, `T2, T4 and T5 each lead into a final state, so each needs its own test. TC1: pay, ship, deliver (T1, T3, T5); TC2: cancel (T2); TC3: pay, cancel (T1, T4) → 3 tests cover all 5 transitions.`, `T2、T4、T5 都进入终止状态，因此各需一个单独的测试。TC1：pay、ship、deliver（T1、T3、T5）；TC2：cancel（T2）；TC3：pay、cancel（T1、T4）→ 3 个测试覆盖全部 5 个转换。`),
    optionNotes: [
      L(`2 test đủ cho all states, nhưng thiếu một trong T2/T4.`, `2 tests suffice for all states, but one of T2/T4 is missed.`, `2 个测试够全状态覆盖，但会漏掉 T2/T4 之一。`),
      L(`Một test có thể bao phủ nhiều chuyển; không cần một test cho mỗi chuyển.`, `One test can cover several transitions; one per transition is not needed.`, `一个测试可覆盖多个转换，无需每个转换一个测试。`),
      L(`Có thể làm với ít hơn 4.`, `It can be done with fewer than 4.`, `少于 4 个即可。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.2.4', page: 42 }, termIds: ['state-transition-testing', 'n-switch-coverage'],
  },
  {
    id: 'ch4-q18', topicId: 'ch4', difficulty: 1, kLevel: 'K3', objective: 'FL-4.2.4', tags: ['state-transition', 'all-states'],
    scenario: ORDER_MODEL,
    stem: L(`Cần tối thiểu bao nhiêu test case để đạt 100% bao phủ mọi trạng thái (all states)?`, `What is the minimum number of test cases to achieve 100% all states coverage?`, `达到 100% 全状态覆盖至少需要多少个测试用例？`),
    options: [
      L(`1 ca kiểm thử`, `1 test case`, `1 个测试用例`),
      L(`2 ca kiểm thử`, `2 test cases`, `2 个测试用例`),
      L(`3 ca kiểm thử`, `3 test cases`, `3 个测试用例`),
      L(`5 ca kiểm thử`, `5 test cases`, `5 个测试用例`),
    ],
    answer: 1,
    explanation: L(`Delivered và Cancelled đều là trạng thái kết thúc nên một test không thể đến cả hai. TC1: pay, ship, deliver (Created, Paid, Shipped, Delivered); TC2: cancel (Cancelled) → 5/5 trạng thái với 2 test.`, `Delivered and Cancelled are both final, so one test cannot reach both. TC1: pay, ship, deliver (Created, Paid, Shipped, Delivered); TC2: cancel (Cancelled) → 5/5 states with 2 tests.`, `Delivered 和 Cancelled 都是终止状态，一个测试无法同时到达。TC1：pay、ship、deliver（Created、Paid、Shipped、Delivered）；TC2：cancel（Cancelled）→ 2 个测试覆盖 5/5 个状态。`),
    optionNotes: [
      L(`Một test không thể kết thúc ở cả Delivered và Cancelled.`, `One test cannot end in both Delivered and Cancelled.`, `一个测试不可能同时结束于 Delivered 和 Cancelled。`),
      null,
      L(`3 là số tối thiểu cho valid transitions, không phải all states.`, `3 is the minimum for valid transitions, not all states.`, `3 是有效转换覆盖的最少数，不是全状态覆盖。`),
      L(`Không cần một test cho mỗi trạng thái.`, `One test per state is not needed.`, `无需每个状态一个测试。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.4', page: 42 }, termIds: ['state-transition-testing', 'coverage'],
  },
  {
    id: 'ch4-q19', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.4', tags: ['state-transition', 'all-transitions', 'state-table'],
    scenario: ORDER_MODEL,
    stem: L(`Lập bảng trạng thái (hàng = 5 trạng thái, cột = 4 sự kiện). Với tiêu chí all transitions, có bao nhiêu mục bao phủ?`, `Build the state table (rows = 5 states, columns = 4 events). How many coverage items are there for all transitions coverage?`, `构建状态表（行 = 5 个状态，列 = 4 个事件）。全转换覆盖有多少个覆盖项？`),
    options: [
      L(`20 mục (5 hợp lệ + 15 không hợp lệ)`, `20 items (5 valid + 15 invalid)`, `20 个（5 个有效 + 15 个无效）`),
      L(`5 mục (chỉ chuyển hợp lệ)`, `5 items (valid transitions only)`, `5 个（仅有效转换）`),
      L(`15 mục (chỉ chuyển không hợp lệ)`, `15 items (invalid transitions only)`, `15 个（仅无效转换）`),
      L(`9 mục (trạng thái + sự kiện)`, `9 items (states + events)`, `9 个（状态 + 事件）`),
    ],
    answer: 0,
    explanation: L(`Với all transitions, mục bao phủ là mọi chuyển trong bảng trạng thái: mỗi ô là một chuyển hợp lệ (có trạng thái đích) hoặc không hợp lệ (ô trống). 5 × 4 = 20 ô: 5 hợp lệ, 15 không hợp lệ.`, `For all transitions coverage, the items are all transitions in the state table: every cell is either a valid transition (has a target state) or an invalid one (empty). 5 × 4 = 20 cells: 5 valid, 15 invalid.`, `全转换覆盖的覆盖项是状态表中的所有转换：每个单元格要么是有效转换（有目标状态），要么是无效转换（空）。5 × 4 = 20 个单元格：5 个有效，15 个无效。`),
    optionNotes: [
      null,
      L(`Đó là mục của valid transitions coverage.`, `That is valid transitions coverage.`, `这是有效转换覆盖的覆盖项。`),
      L(`All transitions gồm cả chuyển hợp lệ.`, `All transitions also includes the valid ones.`, `全转换覆盖也包括有效转换。`),
      L(`Cộng trạng thái và sự kiện không có ý nghĩa.`, `Adding states and events is meaningless.`, `把状态数和事件数相加没有意义。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.4', page: 42 }, termIds: ['state-transition-testing', 'coverage-item'],
  },
  {
    id: 'ch4-q20', topicId: 'ch4', difficulty: 3, kLevel: 'K3', objective: 'FL-4.2.4', tags: ['state-transition', 'coverage', 'calculation'],
    scenario: ORDER_MODEL,
    stem: L(`Đã chạy hai test: TC1 = pay, ship, deliver; TC2 = pay, cancel. Bao phủ valid transitions và all states lần lượt là bao nhiêu?`, `Two tests were run: TC1 = pay, ship, deliver; TC2 = pay, cancel. What are the valid transitions coverage and all states coverage?`, `已执行两个测试：TC1 = pay、ship、deliver；TC2 = pay、cancel。有效转换覆盖率和全状态覆盖率分别是多少？`),
    options: [
      L(`Chuyển hợp lệ 60%, trạng thái 80%`, `Valid transitions 60%, states 80%`, `有效转换 60%，状态 80%`),
      L(`Chuyển hợp lệ 100%, trạng thái 100%`, `Valid transitions 100%, states 100%`, `有效转换 100%，状态 100%`),
      L(`Chuyển hợp lệ 80%, trạng thái 100%`, `Valid transitions 80%, states 100%`, `有效转换 80%，状态 100%`),
      L(`Chuyển hợp lệ 80%, trạng thái 80%`, `Valid transitions 80%, states 80%`, `有效转换 80%，状态 80%`),
    ],
    answer: 2,
    explanation: L(`TC1 bao phủ T1, T3, T5; TC2 bao phủ T1, T4. Thiếu T2 (Created –cancel→) → 4/5 = 80%. Trạng thái đi qua: Created, Paid, Shipped, Delivered, Cancelled → 5/5 = 100%. Ví dụ cho thấy all states yếu hơn valid transitions.`, `TC1 covers T1, T3, T5; TC2 covers T1, T4. T2 (Created –cancel→) is missing → 4/5 = 80%. States visited: Created, Paid, Shipped, Delivered, Cancelled → 5/5 = 100%. This shows all states is weaker than valid transitions.`, `TC1 覆盖 T1、T3、T5；TC2 覆盖 T1、T4。缺 T2（Created –cancel→）→ 4/5 = 80%。经过的状态：Created、Paid、Shipped、Delivered、Cancelled → 5/5 = 100%。可见全状态覆盖弱于有效转换覆盖。`),
    optionNotes: [
      L(`Đếm sai: có 4 chuyển khác nhau và cả 5 trạng thái.`, `Miscounted: 4 distinct transitions and all 5 states.`, `计数错误：有 4 个不同转换，5 个状态全部覆盖。`),
      L(`T2 chưa được thực thi.`, `T2 was not exercised.`, `T2 未被执行。`),
      null,
      L(`Cancelled đã được đến qua T4, nên đủ 5 trạng thái.`, `Cancelled was reached via T4, so all 5 states are covered.`, `通过 T4 到达了 Cancelled，5 个状态都已覆盖。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.4', page: 42 }, termIds: ['state-transition-testing', 'n-switch-coverage', 'coverage'],
  },
  {
    id: 'ch4-q21', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.2.4', tags: ['state-transition', 'invalid-transitions', 'defect-masking'],
    scenario: ORDER_MODEL,
    stem: L(`Tester bổ sung test cho all transitions coverage. Test nào kiểm thử chuyển không hợp lệ ĐÚNG theo khuyến nghị của giáo trình?`, `The tester adds tests for all transitions coverage. Which test checks an invalid transition in line with the syllabus advice?`, `测试人员为全转换覆盖补充测试。哪个测试按大纲建议正确地测试了无效转换？`),
    options: [
      L(`cancel ở Created → mong đợi chuyển sang Cancelled.`, `cancel in Created → expect Cancelled.`, `在 Created 状态 cancel → 预期变为 Cancelled。`),
      L(`pay, ship, rồi thử cancel ở Shipped → mong đợi bị từ chối, vẫn ở Shipped.`, `pay, ship, then attempt cancel in Shipped → expect rejection, still Shipped.`, `pay、ship，然后在 Shipped 状态尝试 cancel → 预期被拒绝，仍为 Shipped。`),
      L(`pay, rồi thử pay lần nữa và thử deliver ở Paid trong cùng test → mong đợi cả hai bị từ chối.`, `pay, then attempt pay again and attempt deliver in Paid in the same test → expect both rejected.`, `pay，然后在同一测试中于 Paid 状态再次尝试 pay 并尝试 deliver → 预期两者均被拒绝。`),
      L(`pay, ship, deliver → mong đợi Delivered.`, `pay, ship, deliver → expect Delivered.`, `pay、ship、deliver → 预期 Delivered。`),
    ],
    answer: 1,
    explanation: L(`Ở Shipped không có chuyển cho sự kiện cancel (ô trống) → đây là chuyển không hợp lệ, và test chỉ thử MỘT chuyển không hợp lệ, giúp tránh che lấp lỗi (defect masking).`, `In Shipped there is no transition for cancel (empty cell) → an invalid transition, and the test attempts only ONE invalid transition, which helps avoid defect masking.`, `在 Shipped 状态下 cancel 没有对应转换（空单元格）→ 这是无效转换，且该测试只尝试一个无效转换，有助于避免缺陷屏蔽。`),
    optionNotes: [
      L(`Created –cancel→ Cancelled là chuyển hợp lệ (T2).`, `Created –cancel→ Cancelled is valid (T2).`, `Created –cancel→ Cancelled 是有效转换（T2）。`),
      null,
      L(`Hai chuyển không hợp lệ trong một test có thể khiến lỗi này che lấp lỗi kia.`, `Two invalid transitions in one test risk one defect masking another.`, `一个测试中有两个无效转换，可能导致一个缺陷屏蔽另一个。`),
      L(`Chỉ gồm các chuyển hợp lệ.`, `Contains only valid transitions.`, `只包含有效转换。`),
    ],
    ref: { doc: 'ctfl401', section: '4.2.4', page: 42 }, termIds: ['state-transition-testing'],
  },
  // ----- FL-4.3.1 statement testing -----
  {
    id: 'ch4-q22', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.3.1', tags: ['statement-coverage', 'calculation'],
    scenario: L(`1  input total
2  discount = 0
3  if total > 100 then
4      discount = 10
5  end if
6  print total - discount
Các câu lệnh thực thi được là dòng 1, 2, 3, 4 và 6.`, `1  input total
2  discount = 0
3  if total > 100 then
4      discount = 10
5  end if
6  print total - discount
The executable statements are lines 1, 2, 3, 4 and 6.`, `1  input total
2  discount = 0
3  if total > 100 then
4      discount = 10
5  end if
6  print total - discount
可执行语句为第 1、2、3、4、6 行。`),
    stem: L(`Chỉ chạy một test với total = 50. Bao phủ câu lệnh đạt bao nhiêu?`, `Only one test is run, with total = 50. What statement coverage is achieved?`, `只执行一个 total = 50 的测试。语句覆盖率是多少？`),
    options: [
      L(`60% (3/5 câu lệnh)`, `60% (3 of 5 statements)`, `60%（5 条语句中的 3 条）`),
      L(`100% (mọi câu lệnh)`, `100% (all statements)`, `100%（全部语句）`),
      L(`50% (3/6 dòng)`, `50% (3 of 6 lines)`, `50%（6 行中的 3 行）`),
      L(`80% (4/5 câu lệnh)`, `80% (4 of 5 statements)`, `80%（5 条语句中的 4 条）`),
    ],
    answer: 3,
    explanation: L(`total = 50 chạy dòng 1, 2, 3 (điều kiện sai) và 6; dòng 4 bị bỏ qua. 4 / 5 câu lệnh thực thi được = 80%.`, `total = 50 executes lines 1, 2, 3 (condition false) and 6; line 4 is skipped. 4 / 5 executable statements = 80%.`, `total = 50 执行第 1、2、3 行（条件为假）和第 6 行，跳过第 4 行。4 / 5 条可执行语句 = 80%。`),
    optionNotes: [
      L(`Câu lệnh if (dòng 3) cũng được thực thi.`, `The if statement (line 3) is executed too.`, `if 语句（第 3 行）也被执行了。`),
      L(`Dòng 4 không chạy khi total ≤ 100.`, `Line 4 does not run when total ≤ 100.`, `total ≤ 100 时第 4 行不执行。`),
      L(`Mẫu số là câu lệnh thực thi được, không phải mọi dòng; "end if" không tính.`, `The denominator is executable statements, not all lines; "end if" does not count.`, `分母是可执行语句而非所有行；“end if”不计。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.3.1', page: 42 }, termIds: ['statement-coverage', 'statement-testing'],
  },
  {
    id: 'ch4-q23', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.3.1', tags: ['statement-coverage', 'limitations'],
    stem: L(`Phát biểu nào đúng về 100% bao phủ câu lệnh?`, `Which statement about 100% statement coverage is correct?`, `关于 100% 语句覆盖，哪项说法正确？`),
    options: [
      L(`Có thể không phát hiện lỗi phụ thuộc dữ liệu, ví dụ phép chia cho 0 chỉ xảy ra khi mẫu số bằng 0.`, `It may not detect data-dependent defects, e.g. a division by zero that only fails when the denominator is zero.`, `它可能发现不了依赖数据的缺陷，例如只有分母为 0 时才失败的除零错误。`),
      L(`Đảm bảo mọi nhánh trong code đã được thực thi.`, `It guarantees all branches in the code have been exercised.`, `它保证代码中的所有分支都已执行。`),
      L(`Đảm bảo mọi khiếm khuyết trong các câu lệnh đã chạy đều gây ra thất bại.`, `It guarantees every defect in the executed statements causes a failure.`, `它保证已执行语句中的每个缺陷都会导致失效。`),
      L(`Được tính bằng số dòng đã chạy chia cho tổng số dòng, kể cả chú thích.`, `It is measured as lines executed divided by all lines, including comments.`, `它以已执行行数除以包括注释在内的总行数来计算。`),
    ],
    answer: 0,
    explanation: L(`Giáo trình: 100% câu lệnh đảm bảo mọi câu lệnh chạy ít nhất một lần, nhưng không phát hiện được lỗi trong mọi trường hợp — ví dụ lỗi phụ thuộc dữ liệu như chia cho 0.`, `Syllabus: 100% statement coverage ensures every executable statement runs at least once but does not detect defects in all cases — e.g. data-dependent defects such as division by zero.`, `大纲：100% 语句覆盖保证每条可执行语句至少执行一次，但并非在所有情况下都能发现缺陷——例如除零这样的依赖数据的缺陷。`),
    optionNotes: [
      null,
      L(`100% câu lệnh không đảm bảo mọi nhánh (ví dụ nhánh false của if không có else).`, `100% statement coverage does not ensure all branches (e.g. the false branch of an if without else).`, `100% 语句覆盖不保证所有分支（如无 else 的 if 的假分支）。`),
      L(`Thực thi câu lệnh có lỗi chỉ "có thể" gây thất bại.`, `Executing a defective statement only "may" cause a failure.`, `执行有缺陷的语句只是“可能”导致失效。`),
      L(`Mẫu số là số câu lệnh thực thi được.`, `The denominator is executable statements.`, `分母是可执行语句数。`),
    ],
    ref: { doc: 'ctfl401', section: '4.3.1', page: 42 }, termIds: ['statement-coverage'],
  },
  // ----- FL-4.3.2 branch testing -----
  {
    id: 'ch4-q24', topicId: 'ch4', difficulty: 3, kLevel: 'K2', objective: 'FL-4.3.2', tags: ['branch-coverage', 'statement-coverage', 'calculation'],
    scenario: L(`1  if age >= 18 then
2      status = "adult"
3  else
4      status = "minor"
5  end if
6  if member then
7      fee = fee - 5
8  end if
Hai test được chạy: Test 1: age = 20, member = true. Test 2: age = 10, member = true.`, `1  if age >= 18 then
2      status = "adult"
3  else
4      status = "minor"
5  end if
6  if member then
7      fee = fee - 5
8  end if
Test 1: age = 20, member = true. Test 2: age = 10, member = true.`, `1  if age >= 18 then
2      status = "adult"
3  else
4      status = "minor"
5  end if
6  if member then
7      fee = fee - 5
8  end if
测试 1：age = 20，member = true。测试 2：age = 10，member = true。`),
    stem: L(`Hai test đạt bao phủ câu lệnh bao nhiêu, và bao phủ các kết quả quyết định (nhánh có điều kiện) bao nhiêu?`, `What statement coverage and what coverage of decision outcomes (conditional branches) do the two tests achieve?`, `这两个测试的语句覆盖率和判定结果（条件分支）覆盖率分别是多少？`),
    options: [
      L(`Câu lệnh 75%, kết quả quyết định 100%`, `Statements 75%, decision outcomes 100%`, `语句 75%，判定结果 100%`),
      L(`Câu lệnh 100%, kết quả quyết định 75%`, `Statements 100%, decision outcomes 75%`, `语句 100%，判定结果 75%`),
      L(`Câu lệnh 100%, kết quả quyết định 100%`, `Statements 100%, decision outcomes 100%`, `语句 100%，判定结果 100%`),
      L(`Câu lệnh 50%, kết quả quyết định 50%`, `Statements 50%, decision outcomes 50%`, `语句 50%，判定结果 50%`),
    ],
    answer: 1,
    explanation: L(`Câu lệnh thực thi được: 1, 2, 4, 6, 7 — test 1 chạy 1, 2, 6, 7; test 2 chạy 1, 4, 6, 7 → 5/5 = 100%. Kết quả quyết định: dòng 1 True và False đều có; dòng 6 chỉ True (member luôn true) → 3/4 = 75%. Đúng như giáo trình: 100% câu lệnh không đảm bảo mọi nhánh.`, `Executable statements: 1, 2, 4, 6, 7 — test 1 runs 1, 2, 6, 7; test 2 runs 1, 4, 6, 7 → 5/5 = 100%. Decision outcomes: line 1 True and False both taken; line 6 only True (member always true) → 3/4 = 75%. As the syllabus says, 100% statement coverage does not ensure all branches.`, `可执行语句：1、2、4、6、7——测试 1 执行 1、2、6、7；测试 2 执行 1、4、6、7 → 5/5 = 100%。判定结果：第 1 行真、假都执行了；第 6 行只有真（member 始终为 true）→ 3/4 = 75%。正如大纲所说，100% 语句覆盖不保证覆盖所有分支。`),
    optionNotes: [
      L(`Đảo ngược: mọi câu lệnh đã chạy, nhưng nhánh member = false thì chưa.`, `Reversed: every statement ran, but the member = false branch did not.`, `说反了：所有语句都执行了，但 member = false 分支没有。`),
      null,
      L(`Chưa có test nào với member = false.`, `No test has member = false.`, `没有 member = false 的测试。`),
      L(`Cả hai đều được tính sai.`, `Both values are miscounted.`, `两个值都算错了。`),
    ],
    ref: { doc: 'ctfl401', section: '4.3.2', page: 43 }, termIds: ['branch-coverage', 'statement-coverage', 'branch'],
  },
  {
    id: 'ch4-q25', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.3.2', tags: ['branch-coverage', 'subsumption'],
    stem: L(`Phát biểu nào đúng về quan hệ giữa bao phủ nhánh và bao phủ câu lệnh?`, `Which statement about the relationship between branch coverage and statement coverage is correct?`, `关于分支覆盖与语句覆盖的关系，哪项说法正确？`),
    options: [
      L(`Mọi bộ test đạt 100% bao phủ câu lệnh cũng đạt 100% bao phủ nhánh.`, `Any test set achieving 100% statement coverage also achieves 100% branch coverage.`, `任何达到 100% 语句覆盖的测试集也达到 100% 分支覆盖。`),
      L(`Bao phủ nhánh chỉ tính các nhánh có điều kiện, không tính nhánh vô điều kiện.`, `Branch coverage counts only conditional branches, not unconditional ones.`, `分支覆盖只计条件分支，不计无条件分支。`),
      L(`100% bao phủ nhánh phát hiện mọi lỗi chỉ xuất hiện trên một đường đi cụ thể.`, `100% branch coverage detects all defects that require a specific path.`, `100% 分支覆盖能发现所有需要特定路径才能暴露的缺陷。`),
      L(`Mọi bộ test đạt 100% bao phủ nhánh cũng đạt 100% bao phủ câu lệnh.`, `Any test set achieving 100% branch coverage also achieves 100% statement coverage.`, `任何达到 100% 分支覆盖的测试集也达到 100% 语句覆盖。`),
    ],
    answer: 3,
    explanation: L(`Bao phủ nhánh bao hàm bao phủ câu lệnh: 100% nhánh ⇒ 100% câu lệnh, nhưng không ngược lại.`, `Branch coverage subsumes statement coverage: 100% branch ⇒ 100% statement, but not vice versa.`, `分支覆盖包含语句覆盖：100% 分支 ⇒ 100% 语句，反之不成立。`),
    optionNotes: [
      L(`Chiều ngược lại không đúng.`, `The reverse direction does not hold.`, `反方向不成立。`),
      L(`Giáo trình nói 100% nhánh gồm cả nhánh vô điều kiện và có điều kiện.`, `The syllabus says 100% branch coverage includes unconditional and conditional branches.`, `大纲指出 100% 分支覆盖包括无条件和条件分支。`),
      L(`Giáo trình nói có thể bỏ sót lỗi cần một đường đi cụ thể.`, `The syllabus says defects needing a specific path may be missed.`, `大纲指出可能遗漏需要特定路径的缺陷。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.3.2', page: 43 }, termIds: ['branch-coverage', 'statement-coverage'],
  },
  // ----- FL-4.3.3 value of white-box -----
  {
    id: 'ch4-q26', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.3.3', tags: ['white-box', 'value'],
    stem: L(`Điểm mạnh cơ bản mà mọi kỹ thuật hộp trắng cùng có là gì?`, `What is a fundamental strength shared by all white-box test techniques?`, `所有白盒测试技术共有的基本优点是什么？`),
    options: [
      L(`Chúng phát hiện được lỗi thiếu sót khi yêu cầu chưa được cài đặt.`, `They detect defects of omission when requirements were not implemented.`, `它们能发现需求未实现导致的遗漏型缺陷。`),
      L(`Toàn bộ phần cài đặt được xét đến, giúp phát hiện lỗi ngay cả khi đặc tả mơ hồ, lỗi thời hoặc không đầy đủ.`, `The entire implementation is taken into account, helping to detect defects even when the specification is vague, outdated or incomplete.`, `考虑了整个软件实现，即使规格说明模糊、过时或不完整也有助于发现缺陷。`),
      L(`Test case độc lập với cách phần mềm được cài đặt.`, `Test cases are independent of how the software is implemented.`, `测试用例与软件的实现方式无关。`),
      L(`Chúng không cần bất kỳ kiến thức nào về code.`, `They require no knowledge of the code.`, `它们不需要任何代码知识。`),
    ],
    answer: 1,
    explanation: L(`Giáo trình: điểm mạnh chung là xét toàn bộ cài đặt, giúp phát hiện lỗi ngay cả khi đặc tả mơ hồ, lỗi thời hoặc không đầy đủ.`, `Syllabus: the shared strength is that the entire implementation is taken into account, which facilitates defect detection even with vague, outdated or incomplete specifications.`, `大纲：共同优点是考虑整个实现，即使规格说明模糊、过时或不完整也便于发现缺陷。`),
    optionNotes: [
      L(`Ngược lại — đó là điểm yếu: có thể bỏ sót lỗi thiếu sót.`, `The opposite — that is the weakness: defects of omission may be missed.`, `恰恰相反——这是缺点：可能遗漏遗漏型缺陷。`),
      null,
      L(`Đó là đặc điểm của hộp đen.`, `That describes black-box techniques.`, `这是黑盒技术的特点。`),
      L(`Hộp trắng dựa trên cấu trúc bên trong.`, `White-box is based on internal structure.`, `白盒基于内部结构。`),
    ],
    ref: { doc: 'ctfl401', section: '4.3.3', page: 43 }, termIds: ['white-box-test-technique'],
  },
  {
    id: 'ch4-q27', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.3.3', tags: ['white-box', 'omission'],
    scenario: L(`Yêu cầu "gửi email xác nhận sau khi đặt hàng" bị quên cài đặt. Bộ test đơn vị của module đặt hàng đạt 100% bao phủ nhánh.`, `The requirement "send a confirmation email after ordering" was never implemented. The unit tests of the ordering module achieve 100% branch coverage.`, `“下单后发送确认邮件”的需求被漏实现。订单模块的单元测试达到了 100% 分支覆盖。`),
    stem: L(`Nhận định nào phù hợp nhất với giáo trình?`, `Which conclusion best matches the syllabus?`, `哪个结论最符合大纲？`),
    options: [
      L(`100% bao phủ nhánh đảm bảo tính năng bị thiếu sẽ được phát hiện.`, `100% branch coverage guarantees the missing feature would be detected.`, `100% 分支覆盖保证能发现缺失的功能。`),
      L(`Nếu đo bao phủ câu lệnh thì đã phát hiện được tính năng bị thiếu.`, `Measuring statement coverage would have revealed the missing feature.`, `如果度量语句覆盖就能发现缺失的功能。`),
      L(`Kiểm thử hộp trắng có thể không phát hiện lỗi thiếu sót này vì không có code nào để bao phủ.`, `White-box testing may not detect this defect of omission, because there is no code to cover.`, `白盒测试可能发现不了这个遗漏型缺陷，因为没有可覆盖的代码。`),
      L(`Kết quả đo bao phủ chắc chắn bị sai.`, `The coverage measurement must be wrong.`, `覆盖率测量结果一定是错的。`),
    ],
    answer: 2,
    explanation: L(`Giáo trình: nếu phần mềm không cài đặt một hay nhiều yêu cầu, kiểm thử hộp trắng có thể không phát hiện được lỗi thiếu sót. Bao phủ chỉ đo phần code đã có.`, `Syllabus: if the software does not implement one or more requirements, white-box testing may not detect the resulting defects of omission. Coverage only measures existing code.`, `大纲：如果软件未实现某些需求，白盒测试可能发现不了由此产生的遗漏型缺陷。覆盖率只度量已有代码。`),
    optionNotes: [
      L(`Bao phủ code không đo được phần chưa viết.`, `Code coverage cannot measure code that was never written.`, `代码覆盖无法度量从未编写的代码。`),
      L(`Bao phủ câu lệnh còn yếu hơn bao phủ nhánh, cũng không thấy code không tồn tại.`, `Statement coverage is weaker than branch coverage and also cannot see non-existent code.`, `语句覆盖比分支覆盖更弱，同样看不到不存在的代码。`),
      null,
      L(`Bao phủ 100% hoàn toàn có thể đúng; vấn đề là thiếu code.`, `100% may well be correct; the problem is missing code.`, `100% 完全可能是正确的；问题在于代码缺失。`),
    ],
    ref: { doc: 'ctfl401', section: '4.3.3', page: 43 }, termIds: ['white-box-testing', 'defect'],
  },
  {
    id: 'ch4-q28', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.3.3', tags: ['white-box', 'static-testing', 'coverage'],
    stem: L(`Phát biểu nào về kỹ thuật hộp trắng là đúng theo giáo trình?`, `Which statement about white-box techniques is correct according to the syllabus?`, `根据大纲，关于白盒测试技术哪项说法正确？`),
    options: [
      L(`Có thể dùng trong kiểm thử tĩnh, ví dụ chạy khô (dry run) code hoặc review mã giả.`, `They can be used in static testing, e.g. dry runs of code or reviewing pseudocode.`, `它们可用于静态测试，例如代码干运行（dry run）或评审伪代码。`),
      L(`Chỉ dùng được khi code đã chạy được.`, `They can only be used once the code is executable.`, `只有在代码可执行后才能使用。`),
      L(`Chỉ kiểm thử hộp đen đã đủ để đo bao phủ code thực tế.`, `Black-box testing alone provides a measure of actual code coverage.`, `仅靠黑盒测试就能度量实际代码覆盖率。`),
      L(`Số đo bao phủ hộp trắng mang tính chủ quan.`, `White-box coverage measures are subjective.`, `白盒覆盖度量是主观的。`),
    ],
    answer: 0,
    explanation: L(`Giáo trình: kỹ thuật hộp trắng dùng được trong kiểm thử tĩnh (dry run), hợp để review code chưa chạy được, mã giả và logic cấp cao mô hình hóa được bằng đồ thị luồng điều khiển.`, `Syllabus: white-box techniques can be used in static testing (dry runs) and suit reviewing code not yet executable, pseudocode and high-level logic modelled with a control flow graph.`, `大纲：白盒技术可用于静态测试（干运行），适合评审尚不能执行的代码、伪代码以及可用控制流图建模的高层逻辑。`),
    optionNotes: [
      null,
      L(`Chúng phù hợp cả với code chưa sẵn sàng để chạy.`, `They also suit code not yet ready for execution.`, `它们也适用于尚不能执行的代码。`),
      L(`Giáo trình: chỉ hộp đen thì không đo được bao phủ code thực tế.`, `Syllabus: black-box testing alone gives no measure of actual code coverage.`, `大纲：仅做黑盒测试无法度量实际代码覆盖率。`),
      L(`Giáo trình gọi đó là phép đo khách quan.`, `The syllabus calls them an objective measurement.`, `大纲称其为客观度量。`),
    ],
    ref: { doc: 'ctfl401', section: '4.3.3', page: 43 }, termIds: ['white-box-test-technique', 'static-testing', 'coverage'],
  },
  // ----- FL-4.4.1 error guessing -----
  {
    id: 'ch4-q29', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.4.1', tags: ['error-guessing', 'fault-attack'],
    scenario: L(`Tester tổng hợp từ dữ liệu lỗi của các release trước một danh sách các sai sót, khiếm khuyết và thất bại có thể có (ví dụ: dấu phân cách thập phân sai, số âm, trường để trống), rồi thiết kế test để làm lộ từng khiếm khuyết hoặc gây ra thất bại đó.`, `From defect data of previous releases, the tester compiles a list of possible errors, defects and failures (e.g. wrong decimal separator, negative numbers, empty fields) and designs tests to expose each defect or cause each failure.`, `测试人员根据以往版本的缺陷数据整理出可能的错误、缺陷和失效清单（如小数分隔符错误、负数、空字段），并设计测试来暴露每个缺陷或引发失效。`),
    stem: L(`Tester đang áp dụng cách làm nào?`, `Which approach is the tester applying?`, `该测试人员采用的是哪种方法？`),
    options: [
      L(`Kiểm thử dựa trên checklist`, `Checklist-based testing`, `基于检查表的测试`),
      L(`Một phiên kiểm thử khám phá`, `An exploratory testing session`, `一次探索性测试会话`),
      L(`Tấn công lỗi (fault attack), một cách hiện thực đoán lỗi`, `A fault attack, a way to implement error guessing`, `故障攻击（fault attack），一种实施错误推测的方式`),
      L(`Kiểm thử bảng quyết định`, `Decision table testing`, `决策表测试`),
    ],
    answer: 2,
    explanation: L(`Giáo trình: fault attack là cách hiện thực đoán lỗi — tạo hoặc thu thập danh sách sai sót/khiếm khuyết/thất bại có thể có và thiết kế test để làm lộ khiếm khuyết hoặc gây thất bại; danh sách có thể dựa trên dữ liệu lỗi.`, `Syllabus: fault attacks implement error guessing — create or acquire a list of possible errors, defects and failures and design tests that expose the defects or cause the failures; lists can be based on defect data.`, `大纲：故障攻击是实施错误推测的一种方式——创建或获取可能的错误、缺陷和失效清单，设计测试来暴露缺陷或引发失效；清单可基于缺陷数据。`),
    optionNotes: [
      L(`Checklist chứa điều kiện kiểm thử (thường là câu hỏi) cần bao phủ, không phải danh sách lỗi để tấn công.`, `A checklist holds test conditions (often questions) to cover, not a list of defects to attack.`, `检查表包含需覆盖的测试条件（常为问题），而不是用来攻击的缺陷清单。`),
      L(`Không có test charter, time box hay việc thiết kế–thực thi đồng thời.`, `There is no charter, time box or simultaneous design and execution.`, `没有测试章程、时间盒，也不是同时设计与执行。`),
      null,
      L(`Không có tổ hợp điều kiện và hành động nào.`, `No combinations of conditions and actions are involved.`, `不涉及条件与动作的组合。`),
    ],
    ref: { doc: 'ctfl401', section: '4.4.1', page: 44 }, termIds: ['error-guessing', 'fault-attack'],
  },
  {
    id: 'ch4-q30', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.4.1', tags: ['error-guessing'],
    stem: L(`Đoán lỗi (error guessing) chủ yếu dựa trên điều gì?`, `What is error guessing mainly based on?`, `错误推测（error guessing）主要依据什么？`),
    options: [
      L(`Kiến thức của tester: ứng dụng từng hoạt động thế nào, loại sai sót dev hay mắc, loại thất bại ở ứng dụng tương tự.`, `The tester’s knowledge: how the application worked in the past, the errors developers tend to make, failures in similar applications.`, `测试人员的知识：应用过去如何运行、开发人员常犯的错误、类似应用中的失效。`),
      L(`Đồ thị luồng điều khiển của code.`, `The control flow graph of the code.`, `代码的控制流图。`),
      L(`Tiêu chí chấp nhận được thống nhất trong workshop đặc tả.`, `Acceptance criteria agreed in a specification workshop.`, `在规格研讨会上商定的验收准则。`),
      L(`Các phân vùng mà mọi giá trị được xử lý giống nhau.`, `Partitions whose values are all processed the same way.`, `所有值都以相同方式处理的等价类。`),
    ],
    answer: 0,
    explanation: L(`Giáo trình liệt kê ba nguồn kiến thức cho đoán lỗi: ứng dụng đã hoạt động thế nào trước đây, loại sai sót dev hay mắc và khiếm khuyết sinh ra, loại thất bại ở ứng dụng tương tự.`, `The syllabus lists three sources for error guessing: how the application worked in the past, the errors developers tend to make and resulting defects, and failures in other similar applications.`, `大纲列出错误推测的三个知识来源：应用过去的运行情况、开发人员常犯的错误及其导致的缺陷、类似应用中的失效。`),
    optionNotes: [
      null,
      L(`Đó là cơ sở của kỹ thuật hộp trắng.`, `That is the basis of white-box techniques.`, `这是白盒技术的依据。`),
      L(`Đó là cơ sở của ATDD.`, `That is the basis of ATDD.`, `这是 ATDD 的依据。`),
      L(`Đó là phân vùng tương đương.`, `That is equivalence partitioning.`, `这是等价类划分。`),
    ],
    ref: { doc: 'ctfl401', section: '4.4.1', page: 43 }, termIds: ['error-guessing', 'error', 'defect', 'failure'],
  },
  // ----- FL-4.4.2 exploratory testing -----
  {
    id: 'ch4-q31', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.4.2', tags: ['exploratory-testing'],
    scenario: L(`Một tính năng mới chỉ có vài dòng mô tả trên Jira, và phải phát hành sau hai ngày.`, `A new feature has only a few lines of description in Jira and must be released in two days.`, `一个新功能在 Jira 上只有几行描述，且两天后必须发布。`),
    stem: L(`Theo giáo trình, cách nào phù hợp nhất trong tình huống này?`, `According to the syllabus, which approach is most suitable here?`, `根据大纲，在这种情况下哪种方法最合适？`),
    options: [
      L(`Đạt 100% bao phủ câu lệnh trước khi làm bất cứ việc gì khác.`, `Reach 100% statement coverage before doing anything else.`, `先达到 100% 语句覆盖再做其他事。`),
      L(`Kiểm thử khám phá, có thể tổ chức theo phiên với test charter.`, `Exploratory testing, possibly session-based with test charters.`, `探索性测试，可采用基于会话的方式并使用测试章程。`),
      L(`Lập bảng quyết định đầy đủ 2ⁿ cột cho mọi điều kiện.`, `Build a full 2ⁿ-column decision table for all conditions.`, `为所有条件建立完整的 2ⁿ 列决策表。`),
      L(`Đạt all transitions coverage cho toàn hệ thống.`, `Achieve all transitions coverage for the whole system.`, `对整个系统达到全转换覆盖。`),
    ],
    answer: 1,
    explanation: L(`Giáo trình: kiểm thử khám phá hữu ích khi đặc tả ít hoặc không đầy đủ, hoặc khi có áp lực thời gian đáng kể — cả hai đều đúng ở đây.`, `Syllabus: exploratory testing is useful when there are few or inadequate specifications or significant time pressure — both apply here.`, `大纲：在规格说明很少或不充分、或时间压力很大时，探索性测试很有用——此处两者兼具。`),
    optionNotes: [
      L(`Mục tiêu bao phủ code không giải quyết việc thiếu đặc tả và tốn thời gian.`, `A code coverage target does not address missing specs and costs time.`, `代码覆盖目标解决不了规格缺失，且耗时。`),
      null,
      L(`Không có đủ quy tắc nghiệp vụ được đặc tả để lập bảng.`, `Not enough specified business rules to build the table.`, `没有足够已规定的业务规则来建表。`),
      L(`Không có mô hình trạng thái và không đủ thời gian.`, `There is no state model and not enough time.`, `没有状态模型，时间也不够。`),
    ],
    ref: { doc: 'ctfl401', section: '4.4.2', page: 44 }, termIds: ['exploratory-testing', 'session-based-testing', 'test-charter'],
  },
  {
    id: 'ch4-q32', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.4.2', tags: ['exploratory-testing', 'session-based'],
    stem: L(`Phát biểu nào mô tả đúng kiểm thử khám phá theo phiên (session-based)?`, `Which statement correctly describes session-based exploratory testing?`, `哪项正确描述了基于会话的探索性测试？`),
    options: [
      L(`Không giới hạn thời gian; tester dừng khi không tìm thấy lỗi nữa.`, `There is no time limit; the tester stops when no more defects are found.`, `没有时间限制；测试人员找不到缺陷时才停止。`),
      L(`Test charter chứa kịch bản từng bước chi tiết được viết sẵn từ trước.`, `The test charter contains detailed step-by-step scripts written in advance.`, `测试章程包含事先编写好的详细分步脚本。`),
      L(`Mục tiêu kiểm thử trong charter có thể coi là điều kiện kiểm thử mức cao, và phiên thường được tiếp nối bằng một buổi debriefing.`, `Test objectives in the charter may be treated as high-level test conditions, and the session is usually followed by a debriefing.`, `章程中的测试目标可视为高层测试条件，会话之后通常有一次汇报（debriefing）。`),
      L(`Kiểm thử khám phá không được kết hợp kỹ thuật khác như phân vùng tương đương.`, `Exploratory testing must not incorporate other techniques such as equivalence partitioning.`, `探索性测试不能结合等价类划分等其他技术。`),
    ],
    answer: 2,
    explanation: L(`Giáo trình: trong cách tiếp cận theo phiên, việc khám phá diễn ra trong một time box, tester dùng test charter chứa mục tiêu kiểm thử (có thể coi là điều kiện kiểm thử mức cao), và phiên thường được tiếp nối bằng debriefing với các bên liên quan.`, `Syllabus: in session-based testing, exploration happens within a time box, guided by a test charter with test objectives (which may be treated as high-level test conditions), and the session is usually followed by a debriefing with stakeholders.`, `大纲：基于会话的方法在时间盒内进行，使用包含测试目标的测试章程（测试目标可视为高层测试条件），会话后通常与干系人进行汇报。`),
    optionNotes: [
      L(`Phiên có time box xác định.`, `Sessions have a defined time box.`, `会话有规定的时间盒。`),
      L(`Charter chứa mục tiêu, không phải kịch bản chi tiết; test được thiết kế trong lúc thực thi.`, `A charter holds objectives, not detailed scripts; tests are designed during execution.`, `章程包含目标而非详细脚本；测试在执行过程中设计。`),
      null,
      L(`Giáo trình nói có thể kết hợp kỹ thuật khác (ví dụ EP).`, `The syllabus says it can incorporate other techniques (e.g. EP).`, `大纲指出可结合其他技术（如 EP）。`),
    ],
    ref: { doc: 'ctfl401', section: '4.4.2', page: 44 }, termIds: ['session-based-testing', 'test-charter', 'test-condition'],
  },
  // ----- FL-4.4.3 checklist-based testing -----
  {
    id: 'ch4-q33', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.4.3', tags: ['checklist-based-testing'],
    stem: L(`Đang soạn checklist kiểm thử cho form đăng ký. Mục nào KHÔNG nên đưa vào checklist?`, `A test checklist for a registration form is being written. Which item should NOT be on the checklist?`, `正在为注册表单编写测试检查表。哪一项不应放入检查表？`),
    options: [
      L(`"Code có biên dịch không cảnh báo trong build CI tự động không?"`, `"Does the code compile without warnings in the automated CI build?"`, `“代码在自动化 CI 构建中编译是否无警告？”`),
      L(`"Mỗi ô bắt buộc để trống có hiện thông báo lỗi ngay cạnh ô không?"`, `"Is an error message shown next to each mandatory field left empty?"`, `“每个必填字段留空时旁边是否显示错误提示？”`),
      L(`"Có hoàn thành đăng ký chỉ bằng bàn phím được không?"`, `"Can registration be completed using only the keyboard?"`, `“能否只用键盘完成注册？”`),
      L(`"Liên kết 'Quên mật khẩu' có dẫn đến trang đặt lại mật khẩu không?"`, `"Does the 'Forgot password' link lead to the reset page?"`, `“‘忘记密码’链接是否跳转到重置页面？”`),
    ],
    answer: 0,
    explanation: L(`Giáo trình: checklist không nên chứa mục kiểm tra được tự động, mục hợp làm tiêu chí vào/ra, hoặc mục quá chung chung. Kiểm tra cảnh báo biên dịch đã được CI làm tự động.`, `Syllabus: checklists should not contain items that can be checked automatically, items better suited as entry/exit criteria, or items that are too general. Compiler warnings are checked automatically by CI.`, `大纲：检查表不应包含可自动检查的项、更适合作为准入/准出准则的项或过于笼统的项。编译警告由 CI 自动检查。`),
    optionNotes: [
      null,
      L(`Mục cụ thể, dạng câu hỏi, kiểm tra trực tiếp được — phù hợp.`, `Specific, phrased as a question, directly checkable — suitable.`, `具体、以问题表述、可直接检查——合适。`),
      L(`Mục phi chức năng (khả dụng) cụ thể — phù hợp.`, `A specific non-functional (usability) item — suitable.`, `具体的非功能（易用性）检查项——合适。`),
      L(`Mục chức năng cụ thể — phù hợp.`, `A specific functional item — suitable.`, `具体的功能检查项——合适。`),
    ],
    ref: { doc: 'ctfl401', section: '4.4.3', page: 44 }, termIds: ['checklist-based-testing'],
  },
  {
    id: 'ch4-q34', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.4.3', tags: ['checklist-based-testing', 'repeatability'],
    scenario: L(`Nhóm không có test case chi tiết và kiểm thử theo một checklist mức cao (ví dụ "Kiểm tra xử lý lỗi của màn hình thanh toán").`, `The team has no detailed test cases and tests from a high-level checklist (e.g. "Check error handling of the payment screen").`, `团队没有详细测试用例，按高层检查表测试（如“检查支付页面的错误处理”）。`),
    stem: L(`Theo giáo trình, hệ quả có khả năng xảy ra là gì?`, `According to the syllabus, what is the likely consequence?`, `根据大纲，可能的结果是什么？`),
    options: [
      L(`Việc kiểm thử hoàn toàn lặp lại được giữa các tester.`, `Testing is fully repeatable across testers.`, `不同测试人员之间的测试完全可重复。`),
      L(`Checklist không mang lại chút nhất quán nào.`, `The checklist provides no consistency at all.`, `检查表完全不提供一致性。`),
      L(`Checklist không cần cập nhật vì các mục luôn giữ hiệu quả.`, `The checklist needs no updates because its items stay effective.`, `检查表无需更新，因为检查项始终有效。`),
      L(`Sẽ có biến thiên khi thực hiện, dẫn đến bao phủ có thể lớn hơn nhưng khó lặp lại hơn.`, `Some variability in actual testing is likely, giving potentially greater coverage but less repeatability.`, `实际测试中可能出现差异，覆盖可能更大但可重复性更低。`),
    ],
    answer: 3,
    explanation: L(`Giáo trình: khi không có test case chi tiết, checklist cho hướng dẫn và một mức nhất quán; nếu checklist mức cao thì sẽ có biến thiên, dẫn đến bao phủ có thể lớn hơn nhưng khả năng lặp lại thấp hơn.`, `Syllabus: without detailed test cases, checklists give guidelines and some consistency; if they are high-level, some variability is likely, resulting in potentially greater coverage but less repeatability.`, `大纲：没有详细测试用例时，检查表提供指导和一定一致性；若检查表是高层的，可能出现差异，覆盖可能更大但可重复性更低。`),
    optionNotes: [
      L(`Checklist mức cao làm giảm khả năng lặp lại.`, `High-level checklists reduce repeatability.`, `高层检查表会降低可重复性。`),
      L(`Giáo trình nói checklist cho "một mức nhất quán".`, `The syllabus says they give "some degree of consistency".`, `大纲说检查表提供“一定程度的一致性”。`),
      L(`Mục kém hiệu quả dần; cần cập nhật dựa trên phân tích lỗi.`, `Items lose effectiveness; update based on defect analysis.`, `检查项会逐渐失效，应根据缺陷分析更新。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.4.3', page: 45 }, termIds: ['checklist-based-testing', 'coverage'],
  },
  // ----- FL-4.5.1 user stories -----
  {
    id: 'ch4-q35', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.5.1', tags: ['user-story', '3c'],
    scenario: L(`PO, dev và tester ngồi lại, trao đổi bằng lời về cách người dùng sẽ dùng tính năng áp mã giảm giá, có ghi chú vài ví dụ.`, `The PO, a developer and a tester sit together and talk through how users will use the discount-code feature, noting a few examples.`, `产品负责人、开发和测试坐在一起，口头讨论用户将如何使用优惠码功能，并记下几个例子。`),
    stem: L(`Hoạt động này ứng với "C" nào trong 3 C của user story?`, `Which of the user story’s 3 C’s does this activity correspond to?`, `这个活动对应用户故事 3C 中的哪一个？`),
    options: [
      L(`Card (thẻ)`, `Card`, `Card（卡片）`),
      L(`Confirmation (xác nhận)`, `Confirmation`, `Confirmation（确认）`),
      L(`Conversation (trao đổi)`, `Conversation`, `Conversation（对话）`),
      L(`Collaboration (cộng tác)`, `Collaboration`, `Collaboration（协作）`),
    ],
    answer: 2,
    explanation: L(`Conversation giải thích phần mềm sẽ được dùng thế nào, có thể ghi lại hoặc nói miệng.`, `Conversation explains how the software will be used; it can be documented or verbal.`, `Conversation（对话）说明软件将如何被使用，可以书面记录也可以口头进行。`),
    optionNotes: [
      L(`Card là phương tiện mô tả story (thẻ, mục trên bảng).`, `Card is the medium describing the story (card, board entry).`, `Card 是描述故事的载体（卡片、看板条目）。`),
      L(`Confirmation là tiêu chí chấp nhận.`, `Confirmation is the acceptance criteria.`, `Confirmation 是验收准则。`),
      null,
      L(`Collaboration không phải một trong 3 C.`, `Collaboration is not one of the 3 C’s.`, `Collaboration 不属于 3C。`),
    ],
    ref: { doc: 'ctfl401', section: '4.5.1', page: 45 }, termIds: ['user-story-testing', 'acceptance-criteria'],
  },
  {
    id: 'ch4-q36', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.5.1', tags: ['user-story', 'invest'],
    stem: L(`Trong buổi refinement, một bên liên quan nói họ không biết sẽ test user story này thế nào. Theo giáo trình, điều đó có thể cho thấy gì?`, `During refinement a stakeholder says they do not know how to test a user story. According to the syllabus, what may this indicate?`, `在需求梳理会上，一位干系人说不知道如何测试某个用户故事。根据大纲，这可能说明什么？`),
    options: [
      L(`Story có thể chưa đủ rõ, không phản ánh điều có giá trị với họ, hoặc họ chỉ cần trợ giúp về kiểm thử.`, `The story may not be clear enough, may not reflect something valuable to them, or they may just need help in testing.`, `故事可能不够清晰、不能体现对其有价值的内容，或干系人只是需要测试方面的帮助。`),
      L(`Story quá nhỏ và phải gộp với story khác.`, `The story is too small and must be merged with another.`, `故事太小，必须与其他故事合并。`),
      L(`Story đáp ứng tiêu chí Independent trong INVEST.`, `The story satisfies the Independent criterion of INVEST.`, `该故事满足 INVEST 中的“独立”。`),
      L(`Việc kiểm thử nên hoãn đến sau khi cài đặt xong.`, `Testing should be postponed until after implementation.`, `应推迟到实现完成后再考虑测试。`),
    ],
    answer: 0,
    explanation: L(`Story tốt phải Testable (INVEST). Giáo trình nêu ba khả năng khi bên liên quan không biết cách test: story chưa đủ rõ, không phản ánh điều có giá trị với họ, hoặc họ chỉ cần trợ giúp về kiểm thử.`, `Good stories are Testable (INVEST). The syllabus gives three possibilities when a stakeholder cannot say how to test: the story is unclear, does not reflect something valuable to them, or they just need help in testing.`, `好的用户故事应可测试（INVEST 中的 Testable）。大纲给出干系人不知道如何测试时的三种可能：故事不清晰、不能体现对其有价值的内容，或只是需要测试帮助。`),
    optionNotes: [
      null,
      L(`Không liên quan đến kích thước story.`, `Not related to story size.`, `与故事大小无关。`),
      L(`Vấn đề nằm ở tính Testable, không phải Independent.`, `The issue is Testable, not Independent.`, `问题在于“可测试”，而非“独立”。`),
      L(`Trái với tinh thần cộng tác và test-first.`, `Contradicts the collaborative, test-first idea.`, `违背协作和测试先行的理念。`),
    ],
    ref: { doc: 'ctfl401', section: '4.5.1', page: 45 }, termIds: ['user-story-testing'],
  },
  {
    id: 'ch4-q37', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.5.1', tags: ['user-story', 'collaboration'],
    stem: L(`Viết user story cộng tác giúp cả nhóm có tầm nhìn chung bằng cách xét những góc nhìn nào?`, `Collaborative user story writing gives the team a shared vision by taking which perspectives into account?`, `协作编写用户故事通过考虑哪些视角，使团队形成共同愿景？`),
    options: [
      L(`Chỉ góc nhìn nghiệp vụ`, `Business only`, `仅业务视角`),
      L(`Nghiệp vụ, phát triển và kiểm thử`, `Business, development and testing`, `业务、开发和测试`),
      L(`Phát triển và vận hành`, `Development and operations`, `开发和运维`),
      L(`Chỉ góc nhìn kiểm thử`, `Testing only`, `仅测试视角`),
    ],
    answer: 1,
    explanation: L(`Giáo trình: cộng tác giúp nhóm có tầm nhìn chung về những gì cần bàn giao, xét ba góc nhìn: nghiệp vụ, phát triển và kiểm thử (có thể dùng brainstorming, mind map).`, `Syllabus: collaboration gives the team a shared vision of what should be delivered by taking three perspectives into account: business, development and testing (using e.g. brainstorming and mind mapping).`, `大纲：协作通过兼顾业务、开发和测试三个视角，使团队对交付内容形成共同愿景（可采用头脑风暴和思维导图）。`),
    optionNotes: [
      L(`Thiếu phát triển và kiểm thử.`, `Development and testing are missing.`, `缺少开发和测试。`),
      null,
      L(`Giáo trình không nêu vận hành ở đây; thiếu nghiệp vụ và kiểm thử.`, `Operations is not mentioned here; business and testing are missing.`, `大纲此处未提运维；缺少业务和测试。`),
      L(`Thiếu nghiệp vụ và phát triển.`, `Business and development are missing.`, `缺少业务和开发。`),
    ],
    ref: { doc: 'ctfl401', section: '4.5.1', page: 45 }, termIds: ['collaboration-based-test-approach', 'user-story-testing'],
  },
  // ----- FL-4.5.2 acceptance criteria -----
  {
    id: 'ch4-q38', topicId: 'ch4', difficulty: 2, kLevel: 'K2', objective: 'FL-4.5.2', tags: ['acceptance-criteria', 'formats'],
    stem: L(`Tiêu chí chấp nhận nào được viết theo định dạng hướng quy tắc (rule-oriented)?`, `Which acceptance criterion is written in a rule-oriented format?`, `哪条验收准则采用面向规则（rule-oriented）的格式？`),
    options: [
      L(`"Given giỏ hàng €80 và mã SAVE10 còn hạn, When khách áp mã, Then tổng tiền là €72."`, `"Given a cart of €80 and a valid code SAVE10, When the customer applies it, Then the total is €72."`, `“Given 购物车 €80 且 SAVE10 有效，When 顾客使用该码，Then 总价为 €72。”`),
      L(`Bảng đầu vào → đầu ra: SAVE10 → giảm 10%; EXPIRED5 → "Code expired"; ô trống → nút Áp dụng bị vô hiệu.`, `Input → output table: SAVE10 → 10% off; EXPIRED5 → "Code expired"; empty → Apply button disabled.`, `输入 → 输出表：SAVE10 → 减 10%；EXPIRED5 → “Code expired”；空 → “应用”按钮不可用。`),
      L(`"Given khách đã áp SAVE10, When áp thêm WELCOME5, Then mã thứ hai bị từ chối."`, `"Given SAVE10 is applied, When the customer applies WELCOME5, Then the second code is rejected."`, `“Given 已使用 SAVE10，When 顾客再使用 WELCOME5，Then 第二个码被拒绝。”`),
      L(`Câu "As a customer, I want to apply a discount code, so that I can pay less."`, `"As a customer, I want to apply a discount code, so that I can pay less."`, `“As a customer, I want to apply a discount code, so that I can pay less.”（作为顾客，我想使用优惠码，以便少付钱。）`),
    ],
    answer: 1,
    explanation: L(`Hướng quy tắc gồm danh sách gạch đầu dòng cần xác minh hoặc bảng ánh xạ đầu vào–đầu ra. Given/When/Then là hướng kịch bản.`, `Rule-oriented means a bullet-point verification list or a tabulated input-output mapping. Given/When/Then is scenario-oriented.`, `面向规则指项目符号验证清单或输入-输出映射表。Given/When/Then 属于面向场景。`),
    optionNotes: [
      L(`Given/When/Then = hướng kịch bản.`, `Given/When/Then = scenario-oriented.`, `Given/When/Then = 面向场景。`),
      null,
      L(`Cũng là Given/When/Then — hướng kịch bản.`, `Also Given/When/Then — scenario-oriented.`, `同样是 Given/When/Then——面向场景。`),
      L(`Đó là định dạng của user story, không phải tiêu chí chấp nhận.`, `That is the user story format, not an acceptance criterion.`, `这是用户故事格式，不是验收准则。`),
    ],
    ref: { doc: 'ctfl401', section: '4.5.2', page: 46 }, termIds: ['acceptance-criteria', 'behavior-driven-development'],
  },
  {
    id: 'ch4-q39', topicId: 'ch4', difficulty: 1, kLevel: 'K2', objective: 'FL-4.5.2', tags: ['acceptance-criteria', 'purpose'],
    stem: L(`Mục nào KHÔNG phải công dụng của tiêu chí chấp nhận theo giáo trình?`, `Which of these is NOT a use of acceptance criteria listed in the syllabus?`, `下列哪项不是大纲列出的验收准则用途？`),
    options: [
      L(`Xác định phạm vi của user story`, `Define the scope of the user story`, `界定用户故事的范围`),
      L(`Đạt được đồng thuận giữa các bên liên quan`, `Reach consensus among the stakeholders`, `在干系人之间达成共识`),
      L(`Cho phép lập kế hoạch và ước lượng chính xác`, `Allow accurate planning and estimation`, `支持准确的计划和估算`),
      L(`Quy định thiết kế nội bộ và cấu trúc code cho lập trình viên`, `Prescribe the internal design and code structure for developers`, `为开发人员规定内部设计和代码结构`),
    ],
    answer: 3,
    explanation: L(`Giáo trình liệt kê: xác định phạm vi, đạt đồng thuận, mô tả kịch bản tích cực và tiêu cực, làm cơ sở kiểm thử chấp nhận story, cho phép lập kế hoạch và ước lượng chính xác. Không có việc quy định thiết kế nội bộ.`, `The syllabus lists: define scope, reach consensus, describe positive and negative scenarios, serve as a basis for acceptance testing, allow accurate planning and estimation. Prescribing internal design is not among them.`, `大纲列出：界定范围、达成共识、描述正向和负向场景、作为验收测试基础、支持准确的计划和估算。规定内部设计不在其中。`),
    optionNotes: [
      L(`Có trong danh sách của giáo trình.`, `Listed in the syllabus.`, `大纲已列出。`),
      L(`Có trong danh sách của giáo trình.`, `Listed in the syllabus.`, `大纲已列出。`),
      L(`Có trong danh sách của giáo trình.`, `Listed in the syllabus.`, `大纲已列出。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.5.2', page: 45 }, termIds: ['acceptance-criteria'],
  },
  // ----- FL-4.5.3 ATDD -----
  {
    id: 'ch4-q40', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.5.3', tags: ['atdd', 'positive-testing'],
    scenario: L(`User story: "As a registered customer, I want to apply a discount code at checkout, so that I can pay less." Tiêu chí: (1) mã SAVE10 còn hạn giảm 10% tổng tiền; (2) mã hết hạn hiện "Code expired" và tổng không đổi; (3) mỗi đơn chỉ một mã.`, `User story: "As a registered customer, I want to apply a discount code at checkout, so that I can pay less." Criteria: (1) a valid code SAVE10 reduces the total by 10%; (2) an expired code shows "Code expired" and the total is unchanged; (3) only one code per order.`, `用户故事：“As a registered customer, I want to apply a discount code at checkout, so that I can pay less.” 验收准则：(1) 有效优惠码 SAVE10 使总价减 10%；(2) 过期优惠码提示“Code expired”，总价不变；(3) 每单只能用一个码。`),
    stem: L(`Theo ATDD, test case nào thường được viết ĐẦU TIÊN?`, `In ATDD, which test case would typically be written FIRST?`, `在 ATDD 中，通常首先编写哪个测试用例？`),
    options: [
      L(`Giỏ €100, áp mã hết hạn EXPIRED5 → hiện "Code expired", tổng vẫn €100.`, `Cart €100, apply expired code EXPIRED5 → "Code expired", total stays €100.`, `购物车 €100，使用过期码 EXPIRED5 → 提示“Code expired”，总价仍为 €100。`),
      L(`Giỏ €100, áp SAVE10 → tổng €90.`, `Cart €100, apply SAVE10 → total €90.`, `购物车 €100，使用 SAVE10 → 总价 €90。`),
      L(`Áp mã khi có 500 người dùng đồng thời → phản hồi trong 1 giây.`, `Apply a code with 500 concurrent users → response within 1 second.`, `500 名用户并发使用优惠码 → 1 秒内响应。`),
      L(`Đã áp SAVE10, áp thêm WELCOME5 → bị từ chối, tổng vẫn €90.`, `SAVE10 applied, apply WELCOME5 → rejected, total stays €90.`, `已使用 SAVE10，再使用 WELCOME5 → 被拒绝，总价仍为 €90。`),
    ],
    answer: 1,
    explanation: L(`Giáo trình: test case đầu tiên thường là tích cực — xác nhận hành vi đúng không có ngoại lệ hay lỗi. Sau đó mới đến kiểm thử tiêu cực, cuối cùng là đặc tính phi chức năng. Giỏ €100 − 10% = €90.`, `Syllabus: the first test cases are typically positive — confirming correct behavior without exceptions or errors. Negative testing follows, then non-functional characteristics. €100 − 10% = €90.`, `大纲：最先编写的通常是正向测试用例——确认无异常或错误时的正确行为。之后是负向测试，最后是非功能特性。€100 − 10% = €90。`),
    optionNotes: [
      L(`Test tiêu cực — làm sau test tích cực.`, `A negative test — written after the positive ones.`, `负向测试——在正向测试之后。`),
      null,
      L(`Phi chức năng — thường làm cuối cùng.`, `Non-functional — typically last.`, `非功能——通常最后。`),
      L(`Test tiêu cực (quy tắc một mã) — làm sau test tích cực.`, `A negative test (one-code rule) — after the positive ones.`, `负向测试（每单一码规则）——在正向测试之后。`),
    ],
    ref: { doc: 'ctfl401', section: '4.5.3', page: 46 }, termIds: ['acceptance-test-driven-development', 'negative-testing'],
  },
  {
    id: 'ch4-q41', topicId: 'ch4', difficulty: 2, kLevel: 'K3', objective: 'FL-4.5.3', tags: ['atdd', 'scope'],
    scenario: L(`Cùng user story mã giảm giá và ba tiêu chí: (1) SAVE10 còn hạn giảm 10%; (2) mã hết hạn hiện "Code expired"; (3) mỗi đơn chỉ một mã.`, `Same discount-code story and three criteria: (1) a valid SAVE10 gives 10% off; (2) an expired code shows "Code expired"; (3) only one code per order.`, `同一优惠码用户故事及三条验收准则：(1) 有效 SAVE10 减 10%；(2) 过期码提示“Code expired”；(3) 每单只能用一个码。`),
    stem: L(`Trong workshop, nhóm đề xuất bốn test case. Test nào KHÔNG nên đưa vào bộ test ATDD của story này?`, `In the workshop the team proposes four test cases. Which one should NOT be included in this story’s ATDD tests?`, `在研讨会上团队提出四个测试用例。哪个不应纳入该故事的 ATDD 测试？`),
    options: [
      L(`Giỏ €100, áp EXPIRED5 → "Code expired", tổng vẫn €100.`, `Cart €100, apply EXPIRED5 → "Code expired", total stays €100.`, `购物车 €100，使用 EXPIRED5 → “Code expired”，总价仍为 €100。`),
      L(`Giỏ €40, áp SAVE10 → tổng €36.`, `Cart €40, apply SAVE10 → total €36.`, `购物车 €40，使用 SAVE10 → 总价 €36。`),
      L(`Đã áp SAVE10, áp thêm WELCOME5 → bị từ chối.`, `SAVE10 applied, apply WELCOME5 → rejected.`, `已使用 SAVE10，再使用 WELCOME5 → 被拒绝。`),
      L(`Thanh toán phần còn lại bằng số dư thẻ quà tặng.`, `Pay the remaining amount with a gift card balance.`, `用礼品卡余额支付剩余金额。`),
    ],
    answer: 3,
    explanation: L(`Giáo trình: test case phải bao phủ mọi đặc tính của story và không vượt ra ngoài story. Thanh toán bằng thẻ quà tặng không thuộc story mã giảm giá. Các test còn lại tương ứng tiêu chí (1)–(3) (€40 − 10% = €36).`, `Syllabus: test cases must cover all characteristics of the story and should not go beyond it. Paying by gift card is outside the discount-code story. The others map to criteria (1)–(3) (€40 − 10% = €36).`, `大纲：测试用例必须覆盖故事的所有特性且不应超出故事范围。礼品卡支付不属于优惠码故事。其余测试对应准则 (1)–(3)（€40 − 10% = €36）。`),
    optionNotes: [
      L(`Thuộc tiêu chí (2).`, `Covers criterion (2).`, `对应准则 (2)。`),
      L(`Thuộc tiêu chí (1), kết quả đúng.`, `Covers criterion (1) with a correct result.`, `对应准则 (1)，结果正确。`),
      L(`Thuộc tiêu chí (3).`, `Covers criterion (3).`, `对应准则 (3)。`),
      null,
    ],
    ref: { doc: 'ctfl401', section: '4.5.3', page: 46 }, termIds: ['acceptance-test-driven-development', 'acceptance-criteria'],
  },
  {
    id: 'ch4-q42', topicId: 'ch4', difficulty: 1, kLevel: 'K3', objective: 'FL-4.5.3', tags: ['atdd', 'order'],
    scenario: L(`Sau workshop đặc tả cho story "Đăng nhập bằng mã OTP", tester chuẩn bị ba nhóm test: (a) OTP hết hạn hoặc sai bị từ chối; (b) OTP đúng trong 60 giây → đăng nhập thành công; (c) OTP được gửi trong vòng 5 giây.`, `After the specification workshop for the story "Log in with an OTP", the tester prepares three groups of tests: (a) expired or wrong OTP is rejected; (b) correct OTP within 60 seconds → login succeeds; (c) the OTP is delivered within 5 seconds.`, `在“使用 OTP 登录”故事的规格研讨会后，测试人员准备三组测试：(a) 过期或错误的 OTP 被拒绝；(b) 60 秒内输入正确 OTP → 登录成功；(c) OTP 在 5 秒内送达。`),
    stem: L(`Thứ tự điển hình theo ATDD là gì?`, `What is the typical order in ATDD?`, `ATDD 中的典型顺序是什么？`),
    options: [
      L(`(b) → (a) → (c): tích cực, tiêu cực, rồi phi chức năng`, `(b) → (a) → (c): positive, negative, then non-functional`, `(b) → (a) → (c)：正向、负向，然后非功能`),
      L(`(a) → (b) → (c): tiêu cực trước`, `(a) → (b) → (c): negative first`, `(a) → (b) → (c)：先负向`),
      L(`(c) → (b) → (a): phi chức năng trước`, `(c) → (b) → (a): non-functional first`, `(c) → (b) → (a)：先非功能`),
      L(`(b) → (c) → (a): tiêu cực sau cùng`, `(b) → (c) → (a): negative last`, `(b) → (c) → (a)：负向最后`),
    ],
    answer: 0,
    explanation: L(`Giáo trình: test đầu tiên thường là tích cực, sau đó nhóm làm kiểm thử tiêu cực, cuối cùng bao phủ đặc tính chất lượng phi chức năng (ví dụ hiệu năng). (b) tích cực, (a) tiêu cực, (c) hiệu năng.`, `Syllabus: first positive tests, then negative testing, finally non-functional quality characteristics (e.g. performance efficiency). (b) positive, (a) negative, (c) performance.`, `大纲：先正向测试，再负向测试，最后覆盖非功能质量特性（如性能效率）。(b) 正向，(a) 负向，(c) 性能。`),
    optionNotes: [
      null,
      L(`Tiêu cực làm sau tích cực.`, `Negative tests come after positive ones.`, `负向测试在正向之后。`),
      L(`Phi chức năng thường làm cuối.`, `Non-functional typically comes last.`, `非功能通常最后。`),
      L(`Tiêu cực đứng trước phi chức năng.`, `Negative comes before non-functional.`, `负向在非功能之前。`),
    ],
    ref: { doc: 'ctfl401', section: '4.5.3', page: 46 }, termIds: ['acceptance-test-driven-development', 'negative-testing', 'performance-efficiency'],
  },
  {
    id: 'ch4-q43', topicId: 'ch4', difficulty: 3, kLevel: 'K3', objective: 'FL-4.5.3', tags: ['atdd', 'boundary-value-analysis', 'test-cases'],
    scenario: L(`Tiêu chí chấp nhận: "Đơn có tổng tiền hàng ≥ €50.00 được miễn phí vận chuyển; dưới mức đó tính phí €4.99." Giá tính đến cent. Trong ATDD, nhóm áp dụng phân tích giá trị biên khi thiết kế ví dụ.`, `Acceptance criterion: "Orders with a goods total ≥ €50.00 ship free; below that, shipping is €4.99." Prices are in cents. In ATDD the team applies boundary value analysis while designing examples.`, `验收准则：“商品总额 ≥ €50.00 的订单免运费；低于该金额收取 €4.99 运费。”价格精确到分。在 ATDD 中团队设计示例时应用边界值分析。`),
    stem: L(`Cặp test case (ví dụ) nào kiểm thử biên này với kết quả mong đợi đúng?`, `Which pair of test cases (examples) tests this boundary with correct expected results?`, `哪一对测试用例（示例）以正确的预期结果测试了该边界？`),
    options: [
      L(`€49.99 → miễn phí; €50.00 → phí €4.99`, `€49.99 → free; €50.00 → €4.99 shipping`, `€49.99 → 免运费；€50.00 → 运费 €4.99`),
      L(`€49.00 → phí €4.99; €51.00 → miễn phí`, `€49.00 → €4.99 shipping; €51.00 → free`, `€49.00 → 运费 €4.99；€51.00 → 免运费`),
      L(`€49.99 → phí €4.99; €50.00 → miễn phí`, `€49.99 → €4.99 shipping; €50.00 → free`, `€49.99 → 运费 €4.99；€50.00 → 免运费`),
      L(`€50.00 → miễn phí; €50.01 → miễn phí`, `€50.00 → free; €50.01 → free`, `€50.00 → 免运费；€50.01 → 免运费`),
    ],
    answer: 2,
    explanation: L(`Biên là €50.00; láng giềng gần nhất ở phân vùng kề (độ chính xác cent) là €49.99. €49.99 < €50.00 → phí €4.99; €50.00 thỏa "≥ €50.00" → miễn phí. Đây là bộ BVA 2 giá trị với kết quả mong đợi đúng — giáo trình cho phép áp dụng kỹ thuật ở 4.2 khi thiết kế test ATDD.`, `The boundary is €50.00; its closest neighbor in the adjacent partition (cent precision) is €49.99. €49.99 < €50.00 → €4.99 shipping; €50.00 satisfies "≥ €50.00" → free. This is the 2-value BVA pair with correct expected results — the syllabus allows techniques from 4.2 in ATDD test design.`, `边界为 €50.00；相邻等价类中最近的邻值（精确到分）是 €49.99。€49.99 < €50.00 → 运费 €4.99；€50.00 满足“≥ €50.00”→ 免运费。这是预期结果正确的二值 BVA 取值——大纲允许在 ATDD 测试设计中应用 4.2 节的技术。`),
    optionNotes: [
      L(`Đúng giá trị nhưng kết quả mong đợi bị đảo ngược.`, `Right values but the expected results are reversed.`, `取值正确但预期结果颠倒了。`),
      L(`Không nằm sát biên (cách €1), có thể bỏ sót lỗi biên.`, `Not at the boundary (€1 away), may miss boundary defects.`, `不在边界上（相差 €1），可能遗漏边界缺陷。`),
      null,
      L(`Chỉ thử phía miễn phí; thiếu €49.99.`, `Tests only the free side; €49.99 is missing.`, `只测了免运费一侧，缺少 €49.99。`),
    ],
    ref: { doc: 'ctfl401', section: '4.5.3', page: 46 }, termIds: ['acceptance-test-driven-development', 'boundary-value-analysis', 'acceptance-criteria'],
  },
];

// ---------- chapter ----------

export const CH4: ChapterContent = {
  id: 'ch4',
  number: '4',
  titleTr: L('Phân tích và thiết kế kiểm thử', 'Test Analysis and Design', '测试分析与设计'),
  summary: L(
    `Chương lớn nhất của giáo trình (390 phút, 5 mục tiêu K3). Chương giới thiệu kỹ thuật kiểm thử theo ba nhóm — hộp đen, hộp trắng, dựa trên kinh nghiệm — và các cách tiếp cận dựa trên cộng tác. Bạn phải TỰ ÁP DỤNG được phân vùng tương đương (kể cả Each Choice), phân tích giá trị biên 2 và 3 giá trị, bảng quyết định, kiểm thử chuyển trạng thái (all states, valid transitions, all transitions) và ATDD để suy ra test case và tính bao phủ; đồng thời hiểu bao phủ câu lệnh/nhánh, giá trị của kiểm thử hộp trắng, đoán lỗi, kiểm thử khám phá, kiểm thử theo checklist, viết user story cộng tác và các định dạng tiêu chí chấp nhận.`,
    `The largest chapter of the syllabus (390 minutes, 5 K3 objectives). It presents test techniques in three categories — black-box, white-box and experience-based — plus collaboration-based approaches. You must be able to APPLY equivalence partitioning (including Each Choice), 2- and 3-value boundary value analysis, decision tables, state transition testing (all states, valid transitions, all transitions) and ATDD to derive test cases and compute coverage, and understand statement/branch coverage, the value of white-box testing, error guessing, exploratory testing, checklist-based testing, collaborative user story writing and acceptance criteria formats.`,
    `大纲中篇幅最大的一章（390 分钟，5 个 K3 学习目标）。本章按黑盒、白盒、基于经验三类介绍测试技术，并介绍基于协作的测试方法。你必须能够实际应用等价类划分（含 Each Choice）、二值和三值边界值分析、决策表、状态转换测试（全状态、有效转换、全转换）以及 ATDD 来推导测试用例并计算覆盖率；同时理解语句/分支覆盖、白盒测试的价值、错误推测、探索性测试、基于检查表的测试、协作编写用户故事以及验收准则的格式。`,
  ),
  keyPoints: [
    L(`Ba nhóm kỹ thuật: hộp đen (từ đặc tả), hộp trắng (từ cấu trúc), dựa trên kinh nghiệm (bổ sung cho hai nhóm kia).`, `Three technique categories: black-box (from the specification), white-box (from structure), experience-based (complementary to both).`, `三类技术：黑盒（基于规格）、白盒（基于结构）、基于经验（作为前两者的补充）。`),
    L(`Bao phủ = số mục bao phủ đã thực thi / tổng số mục × 100%; mỗi kỹ thuật có mục bao phủ riêng.`, `Coverage = coverage items exercised / total items × 100%; each technique defines its own coverage items.`, `覆盖率 = 已执行覆盖项 / 覆盖项总数 × 100%；每种技术有自己的覆盖项。`),
    L(`EP: mỗi phân vùng (kể cả không hợp lệ) một test; Each Choice không xét tổ hợp.`, `EP: one test per partition (including invalid ones); Each Choice ignores combinations.`, `EP：每个等价类（包括无效的）一个测试；Each Choice 不考虑组合。`),
    L(`BVA 2 giá trị: biên + láng giềng ở phân vùng kề; BVA 3 giá trị: biên + hai láng giềng — chặt hơn.`, `2-value BVA: boundary + neighbor in the adjacent partition; 3-value BVA: boundary + both neighbors — more rigorous.`, `二值 BVA：边界值 + 相邻等价类邻值；三值 BVA：边界值 + 两侧邻值——更严格。`),
    L(`Bảng quyết định: mục bao phủ là cột khả thi; số quy tắc tăng theo hàm mũ.`, `Decision tables: coverage items are feasible columns; rules grow exponentially.`, `决策表：覆盖项是可行列；规则数呈指数增长。`),
    L(`Chuyển trạng thái: all states < valid transitions (0-switch, phổ biến nhất) < all transitions (gồm chuyển không hợp lệ, mỗi test một chuyển).`, `State transitions: all states < valid transitions (0-switch, most used) < all transitions (includes invalid ones, one per test).`, `状态转换：全状态 < 有效转换（0-switch，最常用）< 全转换（含无效转换，每个测试一个）。`),
    L(`100% bao phủ nhánh ⇒ 100% bao phủ câu lệnh, không ngược lại; hộp trắng không thấy lỗi thiếu sót.`, `100% branch coverage ⇒ 100% statement coverage, not vice versa; white-box cannot see defects of omission.`, `100% 分支覆盖 ⇒ 100% 语句覆盖，反之不成立；白盒看不到遗漏型缺陷。`),
    L(`Đoán lỗi/fault attack, khám phá (charter, time box, debriefing), checklist (câu hỏi, cập nhật thường xuyên).`, `Error guessing/fault attacks, exploratory (charter, time box, debriefing), checklists (questions, regularly updated).`, `错误推测/故障攻击、探索性测试（章程、时间盒、汇报）、检查表（问题形式、定期更新）。`),
    L(`Cộng tác: 3C, INVEST, tiêu chí chấp nhận hướng kịch bản/hướng quy tắc, ATDD: tích cực → tiêu cực → phi chức năng.`, `Collaboration: 3 C’s, INVEST, scenario- vs rule-oriented acceptance criteria, ATDD: positive → negative → non-functional.`, `协作：3C、INVEST、面向场景/面向规则的验收准则，ATDD：正向 → 负向 → 非功能。`),
  ],
  objectives: {
    'FL-4.1.1': L(
      `Phân biệt ba nhóm kỹ thuật: hộp đen dựa trên hành vi được đặc tả (test độc lập với cài đặt); hộp trắng dựa trên cấu trúc bên trong (chỉ tạo sau thiết kế/cài đặt); dựa trên kinh nghiệm dựa vào kiến thức, kỹ năng tester và bổ sung cho hai nhóm kia.`,
      `Distinguish the three categories: black-box is based on specified behavior (tests independent of the implementation); white-box on internal structure (only after design/implementation); experience-based on the tester’s knowledge and skill, complementing the other two.`,
      `区分三类技术：黑盒基于规定的行为（测试与实现无关）；白盒基于内部结构（只能在设计/实现之后）；基于经验依靠测试人员的知识和技能，是前两者的补充。`,
    ),
    'FL-4.2.1': L(
      `Áp dụng phân vùng tương đương: xác định phân vùng hợp lệ và không hợp lệ (không chồng lấn, không rỗng), chọn một giá trị cho mỗi phân vùng, tính bao phủ, và dùng Each Choice khi có nhiều tham số.`,
      `Apply equivalence partitioning: identify valid and invalid partitions (non-overlapping, non-empty), pick one value per partition, compute coverage, and use Each Choice for several parameters.`,
      `应用等价类划分：识别有效和无效等价类（不重叠、非空），每个等价类取一个值，计算覆盖率，多参数时使用 Each Choice。`,
    ),
    'FL-4.2.2': L(
      `Áp dụng phân tích giá trị biên: tìm giá trị biên của các phân vùng có thứ tự, suy ra mục bao phủ của BVA 2 giá trị và 3 giá trị, chọn giá trị test và tính bao phủ.`,
      `Apply boundary value analysis: find the boundary values of ordered partitions, derive 2-value and 3-value BVA coverage items, choose test values and compute coverage.`,
      `应用边界值分析：找出有序等价类的边界值，推导二值和三值 BVA 覆盖项，选择测试值并计算覆盖率。`,
    ),
    'FL-4.2.3': L(
      `Áp dụng kiểm thử bảng quyết định: lập bảng điều kiện/hành động, xác định cột khả thi (loại N/A, hiểu "–"), suy ra test cho mỗi cột và tính bao phủ.`,
      `Apply decision table testing: build the conditions/actions table, identify feasible columns (remove N/A, understand "–"), derive a test per column and compute coverage.`,
      `应用决策表测试：建立条件/动作表，确定可行列（去掉 N/A，理解“–”），为每列推导测试并计算覆盖率。`,
    ),
    'FL-4.2.4': L(
      `Áp dụng kiểm thử chuyển trạng thái: đọc sơ đồ hoặc bảng trạng thái, thiết kế chuỗi sự kiện đạt all states, valid transitions (0-switch) hoặc all transitions, nhận ra chuyển không hợp lệ và tính bao phủ.`,
      `Apply state transition testing: read a state diagram or table, design event sequences achieving all states, valid transitions (0-switch) or all transitions coverage, recognize invalid transitions and compute coverage.`,
      `应用状态转换测试：读懂状态图或状态表，设计事件序列以达到全状态、有效转换（0-switch）或全转换覆盖，识别无效转换并计算覆盖率。`,
    ),
    'FL-4.3.1': L(
      `Giải thích kiểm thử câu lệnh: mục bao phủ là câu lệnh thực thi được; 100% bảo đảm mỗi câu lệnh chạy ít nhất một lần nhưng không phát hiện mọi lỗi (ví dụ lỗi phụ thuộc dữ liệu) và không bảo đảm mọi nhánh.`,
      `Explain statement testing: coverage items are executable statements; 100% ensures each runs at least once but does not detect all defects (e.g. data-dependent ones) nor ensure all branches.`,
      `解释语句测试：覆盖项是可执行语句；100% 覆盖保证每条语句至少执行一次，但不能发现所有缺陷（如依赖数据的缺陷），也不保证覆盖所有分支。`,
    ),
    'FL-4.3.2': L(
      `Giải thích kiểm thử nhánh: nhánh là chuyển điều khiển trong đồ thị luồng điều khiển (vô điều kiện hoặc có điều kiện); bao phủ nhánh bao hàm bao phủ câu lệnh nhưng vẫn có thể bỏ sót lỗi phụ thuộc đường đi.`,
      `Explain branch testing: a branch is a transfer of control in the control flow graph (unconditional or conditional); branch coverage subsumes statement coverage but can still miss path-specific defects.`,
      `解释分支测试：分支是控制流图中的控制转移（无条件或有条件）；分支覆盖包含语句覆盖，但仍可能遗漏特定路径的缺陷。`,
    ),
    'FL-4.3.3': L(
      `Giải thích giá trị của kiểm thử hộp trắng: xét toàn bộ cài đặt (hữu ích khi đặc tả kém), dùng được trong kiểm thử tĩnh, cho số đo bao phủ khách quan; điểm yếu là có thể bỏ sót lỗi thiếu sót.`,
      `Explain the value of white-box testing: considers the whole implementation (useful with poor specs), usable in static testing, gives an objective coverage measure; weakness: may miss defects of omission.`,
      `解释白盒测试的价值：考虑整个实现（规格不佳时也有用），可用于静态测试，提供客观的覆盖度量；缺点是可能遗漏遗漏型缺陷。`,
    ),
    'FL-4.4.1': L(
      `Giải thích đoán lỗi: dự đoán sai sót, khiếm khuyết, thất bại dựa trên kiến thức của tester; fault attack là cách hiện thực bằng danh sách lỗi có thể có.`,
      `Explain error guessing: anticipating errors, defects and failures from the tester’s knowledge; fault attacks implement it using a list of possible errors, defects and failures.`,
      `解释错误推测：根据测试人员的知识预测错误、缺陷和失效；故障攻击利用可能问题清单来实施它。`,
    ),
    'FL-4.4.2': L(
      `Giải thích kiểm thử khám phá: thiết kế, thực thi, đánh giá đồng thời trong khi học về đối tượng; có thể theo phiên (time box, test charter, debriefing); hữu ích khi thiếu đặc tả hoặc áp lực thời gian.`,
      `Explain exploratory testing: simultaneous design, execution and evaluation while learning the test object; may be session-based (time box, charter, debriefing); useful with poor specs or time pressure.`,
      `解释探索性测试：在了解测试对象的同时进行设计、执行和评估；可基于会话（时间盒、测试章程、汇报）；适用于规格不足或时间压力大时。`,
    ),
    'FL-4.4.3': L(
      `Giải thích kiểm thử theo checklist: bao phủ điều kiện kiểm thử trong checklist; mục là câu hỏi kiểm tra được trực tiếp; loại mục tự động hóa được, tiêu chí vào/ra, mục quá chung; cập nhật dựa trên phân tích lỗi.`,
      `Explain checklist-based testing: cover the test conditions in a checklist; items are directly checkable questions; exclude automatable items, entry/exit criteria and too-general items; update based on defect analysis.`,
      `解释基于检查表的测试：覆盖检查表中的测试条件；检查项是可直接检查的问题；排除可自动检查项、准入/准出准则和过于笼统的项；根据缺陷分析更新。`,
    ),
    'FL-4.5.1': L(
      `Giải thích cách viết user story cộng tác: 3C (Card, Conversation, Confirmation), định dạng "As a… I want… so that…", ba góc nhìn nghiệp vụ–phát triển–kiểm thử, tiêu chí INVEST.`,
      `Explain collaborative user story writing: 3 C’s (Card, Conversation, Confirmation), the "As a… I want… so that…" format, business–development–testing perspectives, INVEST.`,
      `解释协作编写用户故事：3C（Card、Conversation、Confirmation）、“As a… I want… so that…”格式、业务-开发-测试三视角、INVEST。`,
    ),
    'FL-4.5.2': L(
      `Phân loại các cách viết tiêu chí chấp nhận: hướng kịch bản (Given/When/Then) và hướng quy tắc (danh sách xác minh, bảng đầu vào–đầu ra), hoặc định dạng riêng miễn rõ ràng, không mơ hồ.`,
      `Classify acceptance criteria formats: scenario-oriented (Given/When/Then) and rule-oriented (verification list, input-output table), or a custom format if well-defined and unambiguous.`,
      `对验收准则格式进行分类：面向场景（Given/When/Then）和面向规则（验证清单、输入-输出表），或明确无歧义的自定义格式。`,
    ),
    'FL-4.5.3': L(
      `Áp dụng ATDD: từ story và tiêu chí chấp nhận (sau workshop đặc tả) suy ra test case trước khi cài đặt — tích cực trước, rồi tiêu cực, rồi phi chức năng; bao phủ mọi đặc tính, không vượt ra ngoài story, không trùng lặp.`,
      `Apply ATDD: from the story and its acceptance criteria (after a specification workshop) derive test cases before implementation — positive first, then negative, then non-functional; cover all characteristics, nothing beyond the story, no duplicates.`,
      `应用 ATDD：根据用户故事及其验收准则（经规格研讨会后）在实现前推导测试用例——先正向，再负向，再非功能；覆盖所有特性，不超出故事，不重复。`,
    ),
  },
  sections: SECTIONS,
  questions: QUESTIONS,
};
