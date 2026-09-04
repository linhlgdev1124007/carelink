const needs = [
  {
    id: "hoa-vang",
    title: "Điểm cứu trợ Hòa Vang",
    location: "Hòa Vang, Đà Nẵng",
    type: "Nước uống, thực phẩm",
    people: "2.000",
    quantity: "500 thùng nước, 300 suất ăn",
    priority: "critical",
    score: 92,
    deadline: "36 giờ",
    status: "Đã xác minh",
    coords: [41, 53],
    reason: "Lượng nước sạch còn lại thấp, địa bàn bị chia cắt cục bộ, có kho hàng gần nhất sẵn sàng."
  },
  {
    id: "le-thuy",
    title: "Hộ dân Lệ Thủy",
    location: "Lệ Thủy, Quảng Bình",
    type: "Thuốc, áo phao, đèn pin",
    people: "1.240",
    quantity: "220 túi y tế, 600 đèn pin",
    priority: "high",
    score: 84,
    deadline: "48 giờ",
    status: "Đã xác minh",
    coords: [34, 43],
    reason: "Nhu cầu y tế tăng nhanh, tuyến vận chuyển có thể tiếp cận trong ngày."
  },
  {
    id: "quan-8",
    title: "Bếp ăn 0 đồng Quận 8",
    location: "TP. Hồ Chí Minh",
    type: "Gạo, rau củ, tình nguyện viên",
    people: "780",
    quantity: "1,2 tấn gạo, 18 tình nguyện viên",
    priority: "medium",
    score: 67,
    deadline: "5 ngày",
    status: "Đã xác minh",
    coords: [36, 86],
    reason: "Nhu cầu ổn định, có đội điều phối tại chỗ và đủ thời gian huy động."
  },
  {
    id: "mu-cang-chai",
    title: "Lớp học Mù Cang Chải",
    location: "Yên Bái",
    type: "Sách vở, thiết bị học tập",
    people: "360",
    quantity: "360 bộ dụng cụ học tập",
    priority: "low",
    score: 42,
    deadline: "14 ngày",
    status: "Chờ xác minh",
    coords: [25, 17],
    reason: "Cần bổ sung tài liệu xác minh và hình ảnh hiện trạng."
  }
];

const donations = [
  ["CL-DN-4821", "Hiện vật", "Cứu trợ mưa lũ miền Trung", "Đang vận chuyển", "100 thùng nước"],
  ["CL-DN-4807", "Tiền", "Bếp ăn 0 đồng Quận 8", "Đã phân bổ", "12.000.000đ"],
  ["CL-DN-4770", "Kỹ năng", "Lớp học Mù Cang Chải", "Chờ lịch", "12 giờ dạy trực tuyến"],
  ["CL-DN-4742", "Phương tiện", "Hộ dân Lệ Thủy", "Đã giao", "1 xe tải nhỏ"]
];

const volunteers = [
  { name: "Minh Anh", initials: "MA", location: "Đà Nẵng", skills: ["Đóng gói", "Sơ cứu", "Xe bán tải"], time: "06:00-11:00", match: "96%" },
  { name: "Quốc Huy", initials: "QH", location: "Quảng Bình", skills: ["Lái xe", "Kho vận", "Giao hàng"], time: "Cả ngày", match: "91%" },
  { name: "Bảo Trâm", initials: "BT", location: "TP.HCM", skills: ["Bếp ăn", "Điều phối", "Truyền thông"], time: "Cuối tuần", match: "87%" },
  { name: "Gia Linh", initials: "GL", location: "Trực tuyến", skills: ["Thiết kế", "Nhập liệu", "Tổng đài"], time: "Tối", match: "82%" },
  { name: "Hoàng Nam", initials: "HN", location: "Huế", skills: ["Y tế", "Kiểm kê", "Xe máy"], time: "13:00-18:00", match: "78%" },
  { name: "Thảo Vy", initials: "TV", location: "Hà Nội", skills: ["Gây quỹ", "Dịch tài liệu", "Quản lý hồ sơ"], time: "Linh hoạt", match: "74%" }
];

const routes = [
  { code: "CL-204", from: "Kho Đà Nẵng", via: "Minh Anh", to: "Hòa Vang", goods: "100 thùng nước", status: "Đang vận chuyển", eta: "42 phút" },
  { code: "CL-198", from: "Kho Huế", via: "Quốc Huy", to: "Lệ Thủy", goods: "80 túi y tế", status: "Đã nhận hàng", eta: "2 giờ 10 phút" },
  { code: "CL-187", from: "Nhà tài trợ Q3", via: "Bảo Trâm", to: "Quận 8", goods: "500kg gạo", status: "Chờ nhận", eta: "Sáng mai" }
];

const priorityLabels = {
  critical: ["Khẩn cấp", "badge-red"],
  high: ["Cao", "badge-amber"],
  medium: ["Trung bình", "badge-yellow"],
  low: ["Thấp", "badge-green"]
};

const urgentNeeds = document.querySelector("#urgentNeeds");
const mapPins = document.querySelector("#mapPins");
const mapDetail = document.querySelector("#mapDetail");
const priorityFilter = document.querySelector("#priorityFilter");
const toast = document.querySelector("#toast");

function badge(priority) {
  const [label, cls] = priorityLabels[priority];
  return `<span class="badge ${cls}">${label}</span>`;
}

function renderUrgentNeeds() {
  urgentNeeds.innerHTML = needs
    .filter((need) => ["critical", "high", "medium"].includes(need.priority))
    .map((need) => `
      <article class="need-card">
        <div>
          <strong>${need.title}</strong>
          <div class="need-meta">
            <span>${need.location}</span>
            <span>${need.people} người</span>
            <span>${need.deadline}</span>
            <span>${need.status}</span>
          </div>
        </div>
        ${badge(need.priority)}
      </article>
    `)
    .join("");
}

function renderMapPins() {
  const filter = priorityFilter.value;
  const visibleNeeds = needs.filter((need) => filter === "all" || need.priority === filter);

  if (!visibleNeeds.length) {
    mapPins.innerHTML = "";
    mapDetail.innerHTML = `<div class="empty-state">Chưa có nhu cầu nào phù hợp bộ lọc.</div>`;
    return;
  }

  mapPins.innerHTML = visibleNeeds
    .map((need) => `
      <button class="map-pin pin-${need.priority}" style="left:${need.coords[0]}%;top:${need.coords[1]}%" data-need="${need.id}" aria-label="${need.title}"></button>
    `)
    .join("");

  document.querySelectorAll(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => selectNeed(pin.dataset.need));
  });

  selectNeed(visibleNeeds[0].id);
}

function selectNeed(id) {
  const need = needs.find((item) => item.id === id);
  if (!need) return;

  mapDetail.innerHTML = `
    <p class="eyebrow">Chi tiết nhu cầu</p>
    <div class="panel-head">
      <h3>${need.title}</h3>
      ${badge(need.priority)}
    </div>
    <p>${need.reason}</p>
    <div class="detail-stat">
      <div><strong>${need.people}</strong><span>Người cần hỗ trợ</span></div>
      <div><strong>${need.score}/100</strong><span>Điểm AI</span></div>
      <div><strong>${need.deadline}</strong><span>Thời hạn</span></div>
      <div><strong>${need.status}</strong><span>Trạng thái</span></div>
    </div>
    <div class="doc-list">
      <div><strong>Địa điểm</strong><span>${need.location}</span></div>
      <div><strong>Loại nhu cầu</strong><span>${need.type}</span></div>
      <div><strong>Số lượng cần</strong><span>${need.quantity}</span></div>
    </div>
    <button class="btn btn-primary full" type="button" data-open-modal="donateModal">Hỗ trợ điểm này</button>
  `;

  mapDetail.querySelector("[data-open-modal]").addEventListener("click", () => openModal("donateModal"));
}

function renderDonations() {
  document.querySelector("#donationRows").innerHTML = donations
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");
}

function renderVolunteers() {
  document.querySelector("#volunteerCards").innerHTML = volunteers
    .map((person) => `
      <article class="volunteer-card">
        <div class="avatar-row">
          <span class="avatar">${person.initials}</span>
          <div>
            <strong>${person.name}</strong>
            <div class="need-meta"><span>${person.location}</span><span>Phù hợp ${person.match}</span></div>
          </div>
        </div>
        <div class="skill-list">${person.skills.map((skill) => `<span>${skill}</span>`).join("")}</div>
        <div class="need-meta"><span>Thời gian: ${person.time}</span></div>
        <button class="btn btn-secondary full" type="button">Gắn nhiệm vụ</button>
      </article>
    `)
    .join("");
}

function renderRoutes() {
  document.querySelector("#routeCards").innerHTML = routes
    .map((route) => `
      <article class="route-card panel">
        <div class="panel-head">
          <strong>${route.code}</strong>
          <span class="badge badge-blue">${route.status}</span>
        </div>
        <div class="route-path">
          <span>${route.from}</span><b>-></b><span>${route.via}</span><b>-></b><span>${route.to}</span>
        </div>
        <div class="route-meta">
          <span>${route.goods}</span>
          <span>Dự kiến ${route.eta}</span>
        </div>
      </article>
    `)
    .join("");
}

function renderVerificationQueue() {
  document.querySelector("#verificationQueue").innerHTML = [
    ["Tổ chức Nhịp Cầu Xanh", "Chờ đối chiếu giấy phép hoạt động"],
    ["Nhu cầu lớp học Mù Cang Chải", "Cần ảnh hiện trạng và xác nhận địa phương"],
    ["Chiến dịch Sửa nhà sau bão", "Đã đủ chứng từ, chờ quản trị viên duyệt"]
  ]
    .map(([title, desc]) => `<div><strong>${title}</strong><span>${desc}</span></div>`)
    .join("");
}

function renderMatches() {
  const radius = document.querySelector("#radiusSlider").value;
  const text = document.querySelector("#resourceText").value.toLowerCase();
  const waterBoost = text.includes("nước") || text.includes("nuoc") ? 10 : 0;

  const matches = needs
    .map((need) => ({ ...need, match: Math.min(99, need.score + waterBoost - (need.priority === "low" ? 12 : 0)) }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  document.querySelector("#matchResults").innerHTML = matches
    .map((need, index) => `
      <article class="match-card">
        <div class="panel-head">
          <strong>${need.title}</strong>
          <span class="badge badge-blue">${need.match}% phù hợp</span>
        </div>
        <div class="match-meta">
          <span>Cách ${Math.max(8, Number(radius) + index * 6)}km</span>
          <span>${need.quantity}</span>
          <span>Ưu tiên ${need.score}/100</span>
        </div>
        <p>${need.reason}</p>
        <button class="btn btn-primary full" type="button" data-open-modal="donateModal">Chọn hỗ trợ</button>
      </article>
    `)
    .join("");

  document.querySelectorAll("#matchResults [data-open-modal]").forEach((button) => {
    button.addEventListener("click", () => openModal("donateModal"));
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function openModal(id) {
  const modal = document.querySelector(`#${id}`);
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModals() {
  document.querySelectorAll(".modal.open").forEach((modal) => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
}

function switchView(id) {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));

  const view = document.querySelector(`#${id}`);
  const nav = document.querySelector(`[data-view="${id}"]`);
  if (view) view.classList.add("active-view");
  if (nav) nav.classList.add("active");
  if (view) history.replaceState(null, "", `#${id}`);
  document.body.classList.remove("nav-open");
}

document.querySelectorAll("[data-view]").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    switchView(item.dataset.view);
  });
});

document.querySelectorAll("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    closeModals();
    switchView(button.dataset.viewJump);
  });
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModals);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModals();
  });
});

document.querySelector(".mobile-menu").addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

priorityFilter.addEventListener("change", renderMapPins);

document.querySelector("#radiusSlider").addEventListener("input", (event) => {
  document.querySelector("#radiusValue").textContent = `${event.target.value}km`;
});

document.querySelector("#matchBtn").addEventListener("click", () => {
  renderMatches();
  showToast("AI đã cập nhật danh sách nơi cần hỗ trợ phù hợp.");
});

document.querySelector("#simulateLoading").addEventListener("click", () => {
  document.body.classList.add("loading");
  window.setTimeout(() => {
    document.body.classList.remove("loading");
    renderMatches();
    showToast("Hoàn tất phân tích nguồn lực và khoảng cách.");
  }, 900);
});

document.querySelector("#refreshBtn").addEventListener("click", () => {
  document.body.classList.add("loading");
  window.setTimeout(() => {
    document.body.classList.remove("loading");
    showToast("Bảng điều khiển đã được cập nhật theo dữ liệu mới nhất.");
  }, 850);
});

document.querySelector("#needForm").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Yêu cầu đã được gửi vào hàng đợi xác minh.");
});

document.querySelector("#donateForm").addEventListener("submit", (event) => {
  event.preventDefault();
  closeModals();
  showToast("Đóng góp đã được ghi nhận với mã theo dõi CL-DN-4920.");
});

document.querySelector("#confirmReport").addEventListener("click", () => {
  closeModals();
  showToast("Đã xác nhận người đóng góp nhận báo cáo hành trình.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModals();
});

renderUrgentNeeds();
renderMapPins();
renderDonations();
renderVolunteers();
renderRoutes();
renderVerificationQueue();
renderMatches();

const initialView = window.location.hash.replace("#", "");
if (initialView && document.querySelector(`#${initialView}`)) {
  switchView(initialView);
}
