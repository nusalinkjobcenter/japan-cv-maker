// Interactive Logic & Real-time Data Binding with Browser-Native PDF Merging

const elements = {
  visaType: document.getElementById("visaType"),
  photoInput: document.getElementById("photoInput"),
  nameRomaji: document.getElementById("nameRomaji"),
  nameKana: document.getElementById("nameKana"),
  dob: document.getElementById("dob"),
  gender: document.getElementById("gender"),
  nationality: document.getElementById("nationality"),
  japaneseLevel: document.getElementById("japaneseLevel"),
  japaneseScore: document.getElementById("japaneseScore"),
  height: document.getElementById("height"),
  weight: document.getElementById("weight"),
  bloodType: document.getElementById("bloodType"),
  religion: document.getElementById("religion"),
  jftPdfInput: document.getElementById("jftPdfInput"),
  sswPdfInput: document.getElementById("sswPdfInput"),
  jftBadge: document.getElementById("jftBadge"),
  sswBadge: document.getElementById("sswBadge"),
  downloadDossierBtn: document.getElementById("downloadDossierBtn"),
  statusBanner: document.getElementById("statusBanner"),
  phoneCode: document.getElementById("phoneCode"),
  phoneNumber: document.getElementById("phoneNumber"),
  email: document.getElementById("email"),
  address: document.getElementById("address"),
  previewPhone: document.getElementById("previewPhone"),
  previewEmail: document.getElementById("previewEmail"),
  previewAddress: document.getElementById("previewAddress"),
  eduContainer: document.getElementById("eduContainer"),
  workContainer: document.getElementById("workContainer"),
  addEduBtn: document.getElementById("addEduBtn"),
  addWorkBtn: document.getElementById("addWorkBtn"),
  historyTableBody: document.getElementById("historyTableBody"),

  // Preview elements
  previewVisaCategory: document.getElementById("previewVisaCategory"),
  previewKana: document.getElementById("previewKana"),
  previewName: document.getElementById("previewName"),
  previewDob: document.getElementById("previewDob"),
  previewAge: document.getElementById("previewAge"),
  previewNationality: document.getElementById("previewNationality"),
  previewGender: document.getElementById("previewGender"),
  previewBodyMetrics: document.getElementById("previewBodyMetrics"),
  previewBlood: document.getElementById("previewBlood"),
  previewReligionCare: document.getElementById("previewReligionCare"),
  previewCert1: document.getElementById("previewCert1"),
  previewPhoto: document.getElementById("previewPhoto"),
  photoText: document.getElementById("photoText"),
  printDate: document.getElementById("printDate")
};

let uploadedFiles = {
  jft: null,
  ssw: null
};

// Translations dictionary
const translations = {
  id: {
    visa_title: "1. Kategori Visa Kerja (在留資格区分)",
    visa_label: "Pilihan Visa / Jalur Kerja:",
    personal_title: "2. Data Pribadi Kandidat (基本情報)",
    photo_label: "Pasfoto Formal (3x4 cm / Rasio 30mm x 40mm):",
    name_label: "Nama Lengkap (Huruf Latin sesuai Paspor):",
    kana_label: "Nama Katakana (Furigana):",
    dob_label: "Tanggal Lahir (Date of Birth):",
    gender_label: "Jenis Kelamin:",
    nat_label: "Kewarganegaraan:",
    lang_label: "Sertifikat Bahasa Jepang:",
    score_label: "Skor / Keterangan Ujian:",
    contact_title: "3. Kontak & Alamat Domisili (連絡先・現住所)",
    phone_label: "Nomor Telepon / WhatsApp (電話番号):",
    email_label: "Alamat Email (E-mail):",
    address_label: "Alamat Lengkap Saat Ini (現住所):",
    phys_title: "4. Fisik & Agama (配慮事項)",
    height_label: "Tinggi (cm):",
    weight_label: "Berat (kg):",
    blood_label: "Gol. Darah:",
    religion_label: "Agama:",
    edu_title: "4. Riwayat Pendidikan (学歴)",
    work_title: "5. Pengalaman Kerja (職歴)",
    cert_title: "6. Lampiran Sertifikat Asli (JFT & SSW PDF)",
    add_edu: "+ Tambah Sekolah",
    add_work: "+ Tambah Pekerjaan"
  },
  ja: {
    visa_title: "1. 在留資格区分 (Target Visa Category)",
    visa_label: "申請在留資格:",
    personal_title: "2. 基本情報 (Personal Information)",
    photo_label: "証明写真 (30mm × 40mm):",
    name_label: "氏名 (アルファベット):",
    kana_label: "ふりがな (カタカナ):",
    dob_label: "生年月日 (Date of Birth):",
    gender_label: "性別:",
    nat_label: "国籍:",
    lang_label: "日本語能力:",
    score_label: "得点・試験詳細:",
    phys_title: "3. 身体情報 & 宗教・配慮事項",
    height_label: "身長 (cm):",
    weight_label: "体重 (kg):",
    blood_label: "血液型:",
    religion_label: "宗教:",
    edu_title: "4. 学歴 (Academic History)",
    work_title: "5. 職歴 (Work Experience)",
    cert_title: "6. 合格証明書原本PDFの添付",
    add_edu: "+ 学歴を追加",
    add_work: "+ 職歴を追加"
  },
  en: {
    visa_title: "1. Visa Category",
    visa_label: "Target Visa Track:",
    personal_title: "2. Personal Information",
    photo_label: "Portrait Photo (30mm x 40mm):",
    name_label: "Full Name (Latin Alphabet):",
    kana_label: "Katakana Name (Furigana):",
    dob_label: "Date of Birth:",
    gender_label: "Gender:",
    nat_label: "Nationality:",
    lang_label: "Japanese Proficiency:",
    score_label: "Score / Test Details:",
    phys_title: "3. Physical & Cultural Notes",
    height_label: "Height (cm):",
    weight_label: "Weight (kg):",
    blood_label: "Blood Type:",
    religion_label: "Religion:",
    edu_title: "4. Academic History",
    work_title: "5. Work Experience",
    cert_title: "6. Original Certificate PDFs (JFT & SSW)",
    add_edu: "+ Add School",
    add_work: "+ Add Job"
  }
};

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const lang = btn.getAttribute("data-lang");
    applyLanguage(lang);
  });
});

function applyLanguage(lang) {
  const dict = translations[lang] || translations.id;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  elements.addEduBtn.textContent = dict.add_edu || "+ Tambah Sekolah";
  elements.addWorkBtn.textContent = dict.add_work || "+ Tambah Pekerjaan";
}

// 1. Academic History State
let educationList = [
  { year: "2016", month: "06", school: "SMP Negeri 1 Cikampek (公立中学校)", major: "", isGrad: true },
  { year: "2019", month: "06", school: "SMK Negeri 1 Karawang (公立職業高校)", major: "自動車科 (Teknik Otomotif)", isGrad: true }
];

// 2. Work History State
let workList = [
  {
    startYear: "2019",
    startMonth: "07",
    endYear: "2023",
    endMonth: "12",
    company: "PT Astra Daihatsu Motor",
    role: "自動車部品組立・品質検査担当",
    isCurrent: false
  },
  {
    startYear: "2024",
    startMonth: "01",
    endYear: "",
    endMonth: "",
    company: "送出機関 (LPK) 日本語研修センター",
    role: "特定技能向け日本語・日本就労文化研修 (600時間)",
    isCurrent: true
  }
];

function setJapaneseDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  elements.printDate.textContent = year + "年 " + month + "月 " + day + "日 現在";
}

function calculateAge(birthDateString) {
  if (!birthDateString) return "";
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function formatDob(dateString) {
  if (!dateString) return "―";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;
  return parts[0] + "年 " + parts[1] + "月 " + parts[2] + "日生";
}

function updateLivePreview() {
  elements.previewVisaCategory.textContent = "NUSALINK / " + elements.visaType.value + " 人材調書";
  elements.previewKana.textContent = elements.nameKana.value || "―";
  elements.previewName.textContent = elements.nameRomaji.value ? elements.nameRomaji.value.toUpperCase() : "―";

  elements.previewDob.textContent = formatDob(elements.dob.value);
  const age = calculateAge(elements.dob.value);
  elements.previewAge.textContent = (age !== "") ? ("（満 " + age + " 歳）") : "―";

  elements.previewNationality.textContent = elements.nationality.value || "インドネシア";
  elements.previewGender.textContent = elements.gender.value || "男";

  const h = elements.height.value || "―";
  const w = elements.weight.value || "―";
  elements.previewBodyMetrics.textContent = "身長: " + h + "cm / 体重: " + w + "kg";
  elements.previewBlood.textContent = elements.bloodType.value || "―";

  // Religion Logic (Islam auto-adds dietary/prayer notes, other religions show nothing extra)
  const selectedReligion = elements.religion.value;
  if (selectedReligion === "イスラム教") {
    elements.previewReligionCare.textContent = "イスラム教（豚肉・アルコールNG、礼拝は休憩時間内に実施）";
  } else if (selectedReligion === "その他 / 特になし") {
    elements.previewReligionCare.textContent = "特になし";
  } else {
    elements.previewReligionCare.textContent = selectedReligion;
  }

  // Japanese level
  const level = elements.japaneseLevel.value;
  const score = elements.japaneseScore.value ? (" (" + elements.japaneseScore.value + ")") : "";
  if (level.indexOf("JFT") !== -1) {
    elements.previewCert1.textContent = "国際交流基金 国際日本語基礎テスト (JFT-Basic A2) 合格" + score;
  } else if (level.indexOf("JLPT") !== -1) {
    elements.previewCert1.textContent = level + " 合格" + score;
  } else {
    elements.previewCert1.textContent = "日本語学習中" + score;
  }

  // Phone, Email & Address Binding
  const codeVal = (elements.phoneCode && elements.phoneCode.value) ? (elements.phoneCode.value + " ") : "";
  const numVal = (elements.phoneNumber && elements.phoneNumber.value) ? elements.phoneNumber.value.trim() : "";
  if (elements.previewPhone) {
    elements.previewPhone.textContent = (codeVal || numVal) ? (codeVal + numVal) : "―";
  }

  if (elements.previewEmail) {
    elements.previewEmail.textContent = (elements.email && elements.email.value) ? elements.email.value.trim() : "―";
  }

  if (elements.previewAddress) {
    elements.previewAddress.textContent = (elements.address && elements.address.value) ? elements.address.value.trim() : "―";
  }

  renderHistoryTablePreview();
}

// Render dynamic rows in Editor for Education (with 卒業 button)
function renderEduInputs() {
  elements.eduContainer.innerHTML = "";
  educationList.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "dynamic-card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "dynamic-card-header";
    cardHeader.innerHTML = '<span style="font-weight:700; font-size:0.85rem; color:#2b6cb0;">🏫 Sekolah #' + (index + 1) + '</span>';

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-delete";
    delBtn.textContent = "✕ Hapus";
    delBtn.addEventListener("click", () => {
      educationList.splice(index, 1);
      renderEduInputs();
      renderHistoryTablePreview();
    });
    cardHeader.appendChild(delBtn);
    card.appendChild(cardHeader);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "input-control";
    nameInput.placeholder = "Nama Sekolah (Contoh: SMK Negeri 1 Karawang)";
    nameInput.value = item.school;
    nameInput.addEventListener("input", (e) => {
      educationList[index].school = e.target.value;
      renderHistoryTablePreview();
    });
    card.appendChild(nameInput);

    const majorInput = document.createElement("input");
    majorInput.type = "text";
    majorInput.className = "input-control";
    majorInput.placeholder = "Jurusan / Keahlian (Contoh: Teknik Otomotif / 自動車科)";
    majorInput.value = item.major;
    majorInput.addEventListener("input", (e) => {
      educationList[index].major = e.target.value;
      renderHistoryTablePreview();
    });
    card.appendChild(majorInput);

    const datesRow = document.createElement("div");
    datesRow.className = "dynamic-dates-row";

    const yearInput = document.createElement("input");
    yearInput.type = "number";
    yearInput.className = "input-control dynamic-year";
    yearInput.placeholder = "Tahun";
    yearInput.value = item.year;
    yearInput.addEventListener("input", (e) => {
      educationList[index].year = e.target.value;
      renderHistoryTablePreview();
    });

    const monthInput = document.createElement("input");
    monthInput.type = "number";
    monthInput.className = "input-control dynamic-month";
    monthInput.placeholder = "Bulan";
    monthInput.value = item.month;
    monthInput.addEventListener("input", (e) => {
      educationList[index].month = String(e.target.value).padStart(2, "0");
      renderHistoryTablePreview();
    });

    const gradBtn = document.createElement("button");
    gradBtn.type = "button";
    gradBtn.className = "toggle-btn " + (item.isGrad ? "active-grad" : "");
    gradBtn.innerHTML = item.isGrad ? "🎓 Status: LULUS (卒業)" : "📝 Status: MASUK (入学)";
    gradBtn.addEventListener("click", () => {
      educationList[index].isGrad = !educationList[index].isGrad;
      gradBtn.className = "toggle-btn " + (educationList[index].isGrad ? "active-grad" : "");
      gradBtn.innerHTML = educationList[index].isGrad ? "🎓 Status: LULUS (卒業)" : "📝 Status: MASUK (入学)";
      renderHistoryTablePreview();
    });

    datesRow.appendChild(yearInput);
    datesRow.appendChild(monthInput);
    datesRow.appendChild(gradBtn);
    card.appendChild(datesRow);

    elements.eduContainer.appendChild(card);
  });
}

// Render dynamic rows in Editor for Work History (with "Sedang Bekerja" button)
function renderWorkInputs() {
  elements.workContainer.innerHTML = "";
  workList.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "dynamic-card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "dynamic-card-header";
    cardHeader.innerHTML = '<span style="font-weight:700; font-size:0.85rem; color:#2b6cb0;">💼 Pekerjaan #' + (index + 1) + '</span>';

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-delete";
    delBtn.textContent = "✕ Hapus";
    delBtn.addEventListener("click", () => {
      workList.splice(index, 1);
      renderWorkInputs();
      renderHistoryTablePreview();
    });
    cardHeader.appendChild(delBtn);
    card.appendChild(cardHeader);

    const compInput = document.createElement("input");
    compInput.type = "text";
    compInput.className = "input-control";
    compInput.placeholder = "Nama Perusahaan (Contoh: PT Astra Daihatsu Motor)";
    compInput.value = item.company;
    compInput.addEventListener("input", (e) => {
      workList[index].company = e.target.value;
      renderHistoryTablePreview();
    });
    card.appendChild(compInput);

    const roleInput = document.createElement("input");
    roleInput.type = "text";
    roleInput.className = "input-control";
    roleInput.placeholder = "Posisi / Tugas (Contoh: Operator Perakitan / 自動車部品組立)";
    roleInput.value = item.role;
    roleInput.addEventListener("input", (e) => {
      workList[index].role = e.target.value;
      renderHistoryTablePreview();
    });
    card.appendChild(roleInput);

    const datesRow = document.createElement("div");
    datesRow.className = "dynamic-dates-row";

    const startYearInput = document.createElement("input");
    startYearInput.type = "number";
    startYearInput.className = "input-control dynamic-year";
    startYearInput.placeholder = "Thn Msk";
    startYearInput.title = "Tahun Masuk";
    startYearInput.value = item.startYear;
    startYearInput.addEventListener("input", (e) => {
      workList[index].startYear = e.target.value;
      renderHistoryTablePreview();
    });

    const startMonthInput = document.createElement("input");
    startMonthInput.type = "number";
    startMonthInput.className = "input-control dynamic-month";
    startMonthInput.placeholder = "Bln";
    startMonthInput.title = "Bulan Masuk";
    startMonthInput.value = item.startMonth;
    startMonthInput.addEventListener("input", (e) => {
      workList[index].startMonth = String(e.target.value).padStart(2, "0");
      renderHistoryTablePreview();
    });

    const sep = document.createElement("span");
    sep.className = "date-separator";
    sep.textContent = "s/d";

    const endYearInput = document.createElement("input");
    endYearInput.type = "number";
    endYearInput.className = "input-control dynamic-year";
    endYearInput.placeholder = "Thn Klr";
    endYearInput.title = "Tahun Keluar";
    endYearInput.value = item.endYear || "";
    endYearInput.disabled = item.isCurrent;
    endYearInput.style.opacity = item.isCurrent ? "0.4" : "1";
    endYearInput.addEventListener("input", (e) => {
      workList[index].endYear = e.target.value;
      renderHistoryTablePreview();
    });

    const endMonthInput = document.createElement("input");
    endMonthInput.type = "number";
    endMonthInput.className = "input-control dynamic-month";
    endMonthInput.placeholder = "Bln";
    endMonthInput.title = "Bulan Keluar";
    endMonthInput.value = item.endMonth || "";
    endMonthInput.disabled = item.isCurrent;
    endMonthInput.style.opacity = item.isCurrent ? "0.4" : "1";
    endMonthInput.addEventListener("input", (e) => {
      workList[index].endMonth = String(e.target.value).padStart(2, "0");
      renderHistoryTablePreview();
    });

    const currentBtn = document.createElement("button");
    currentBtn.type = "button";
    currentBtn.className = "toggle-btn " + (item.isCurrent ? "active-work" : "");
    currentBtn.innerHTML = item.isCurrent ? "📌 Sedang Bekerja (現在に至る)" : "💼 Sudah Selesai (退社)";
    currentBtn.addEventListener("click", () => {
      workList[index].isCurrent = !workList[index].isCurrent;
      endYearInput.disabled = workList[index].isCurrent;
      endMonthInput.disabled = workList[index].isCurrent;
      endYearInput.style.opacity = workList[index].isCurrent ? "0.4" : "1";
      endMonthInput.style.opacity = workList[index].isCurrent ? "0.4" : "1";
      currentBtn.className = "toggle-btn " + (workList[index].isCurrent ? "active-work" : "");
      currentBtn.innerHTML = workList[index].isCurrent ? "📌 Sedang Bekerja (現在に至る)" : "💼 Sudah Selesai (退社)";
      renderHistoryTablePreview();
    });

    datesRow.appendChild(startYearInput);
    datesRow.appendChild(startMonthInput);
    datesRow.appendChild(sep);
    datesRow.appendChild(endYearInput);
    datesRow.appendChild(endMonthInput);
    datesRow.appendChild(currentBtn);
    card.appendChild(datesRow);

    elements.workContainer.appendChild(card);
  });
}

// Render into official Japanese 履歴書
function renderHistoryTablePreview() {
  elements.historyTableBody.innerHTML = "";

  // 1. Academic History Subheader
  const eduHeader = document.createElement("tr");
  eduHeader.innerHTML = '<td colspan="3" class="history-sub-header">【 学　歴 】</td>';
  elements.historyTableBody.appendChild(eduHeader);

  // 2. Academic History Rows
  educationList.forEach(item => {
    const tr = document.createElement("tr");
    const suffix = item.isGrad ? " 卒業" : " 入学";
    const majorText = item.major ? " " + item.major : "";
    const fullText = (item.school || "学校名未入力") + majorText + suffix;

    tr.innerHTML = '<td class="text-center">' + (item.year || "") + '</td>' +
                   '<td class="text-center">' + (item.month || "") + '</td>' +
                   '<td>' + fullText + '</td>';
    elements.historyTableBody.appendChild(tr);
  });

  // 3. Work History Subheader
  const workHeader = document.createElement("tr");
  workHeader.innerHTML = '<td colspan="3" class="history-sub-header">【 職　歴 】</td>';
  elements.historyTableBody.appendChild(workHeader);

  // 4. Work History Rows
  workList.forEach(item => {
    // Line 1: Entrance (入社)
    const trStart = document.createElement("tr");
    const roleText = item.role ? " (" + item.role + ")" : "";
    const compText = (item.company || "会社名未入力") + " 入社" + roleText;
    trStart.innerHTML = '<td class="text-center">' + (item.startYear || "") + '</td>' +
                        '<td class="text-center">' + (item.startMonth || "") + '</td>' +
                        '<td>' + compText + '</td>';
    elements.historyTableBody.appendChild(trStart);

    // Line 2: In office (現在に至る) OR Resigned (退社)
    const trEnd = document.createElement("tr");
    if (item.isCurrent) {
      trEnd.innerHTML = '<td class="text-center"></td>' +
                        '<td class="text-center"></td>' +
                        '<td style="font-weight:bold; color:#2d3748;">現在に至る (在職中)</td>';
    } else {
      trEnd.innerHTML = '<td class="text-center">' + (item.endYear || "") + '</td>' +
                        '<td class="text-center">' + (item.endMonth || "") + '</td>' +
                        '<td>' + (item.company || "") + ' 退社 (日本就労準備のため)</td>';
    }
    elements.historyTableBody.appendChild(trEnd);
  });

  // 5. Pin 以 上
  const endRow = document.createElement("tr");
  endRow.innerHTML = '<td colspan="2"></td><td class="text-right-end">以　上</td>';
  elements.historyTableBody.appendChild(endRow);
}

// Add Button Handlers
elements.addEduBtn.addEventListener("click", () => {
  educationList.push({ year: "2020", month: "06", school: "", major: "", isGrad: true });
  renderEduInputs();
  // Phone, Email & Address Binding
  const codeVal = (elements.phoneCode && elements.phoneCode.value) ? (elements.phoneCode.value + " ") : "";
  const numVal = (elements.phoneNumber && elements.phoneNumber.value) ? elements.phoneNumber.value.trim() : "";
  if (elements.previewPhone) {
    elements.previewPhone.textContent = (codeVal || numVal) ? (codeVal + numVal) : "―";
  }

  if (elements.previewEmail) {
    elements.previewEmail.textContent = (elements.email && elements.email.value) ? elements.email.value.trim() : "―";
  }

  if (elements.previewAddress) {
    elements.previewAddress.textContent = (elements.address && elements.address.value) ? elements.address.value.trim() : "―";
  }

  renderHistoryTablePreview();
});

elements.addWorkBtn.addEventListener("click", () => {
  workList.push({
    startYear: "2021",
    startMonth: "01",
    endYear: "",
    endMonth: "",
    company: "",
    role: "",
    isCurrent: true
  });
  renderWorkInputs();
  // Phone, Email & Address Binding
  const codeVal = (elements.phoneCode && elements.phoneCode.value) ? (elements.phoneCode.value + " ") : "";
  const numVal = (elements.phoneNumber && elements.phoneNumber.value) ? elements.phoneNumber.value.trim() : "";
  if (elements.previewPhone) {
    elements.previewPhone.textContent = (codeVal || numVal) ? (codeVal + numVal) : "―";
  }

  if (elements.previewEmail) {
    elements.previewEmail.textContent = (elements.email && elements.email.value) ? elements.email.value.trim() : "―";
  }

  if (elements.previewAddress) {
    elements.previewAddress.textContent = (elements.address && elements.address.value) ? elements.address.value.trim() : "―";
  }

  renderHistoryTablePreview();
});

// Photo upload
elements.photoInput.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      elements.previewPhoto.src = event.target.result;
      elements.previewPhoto.style.display = "block";
      elements.photoText.style.display = "none";
    };
    reader.readAsDataURL(file);
  } else {
    elements.previewPhoto.style.display = "none";
    elements.photoText.style.display = "block";
  }
});

// PDF attachments
elements.jftPdfInput.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    uploadedFiles.jft = file;
    elements.jftBadge.textContent = "🟢 Terlampir: " + file.name + " (" + (file.size / 1024).toFixed(1) + " KB)";
    elements.jftBadge.classList.add("attached");
  } else {
    uploadedFiles.jft = null;
    elements.jftBadge.textContent = "⚪ Belum dilampirkan";
    elements.jftBadge.classList.remove("attached");
  }
});

elements.sswPdfInput.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    uploadedFiles.ssw = file;
    elements.sswBadge.textContent = "🟢 Terlampir: " + file.name + " (" + (file.size / 1024).toFixed(1) + " KB)";
    elements.sswBadge.classList.add("attached");
  } else {
    uploadedFiles.ssw = null;
    elements.sswBadge.textContent = "⚪ Belum dilampirkan";
    elements.sswBadge.classList.remove("attached");
  }
});

function showStatus(message, isError) {
  elements.statusBanner.style.display = "block";
  elements.statusBanner.textContent = message;
  elements.statusBanner.style.background = isError ? "#fed7d7" : "#c6f6d5";
  elements.statusBanner.style.color = isError ? "#9b2c2c" : "#22543d";
}

// -------------------------------------------------------------
// BROWSER-NATIVE PDF GENERATION & MERGING LOGIC (pdf-lib & html2pdf)
// -------------------------------------------------------------
elements.downloadDossierBtn.addEventListener("click", async function() {
  const candidateName = (elements.nameRomaji.value || "CANDIDATE").trim().replace(/\s+/g, "_");
  
  showStatus("⏳ Sedang memproses dan menggabungkan CV dengan sertifikat PDF... Harap tunggu beberapa detik.");

  try {
    const cvElement = document.getElementById("cvSheet");

    if (!window.html2pdf || !window.PDFLib) {
      throw new Error("Library PDF belum selesai dimuat. Pastikan koneksi internet Anda aktif, atau coba refresh halaman.");
    }

    // 1. Render CV Sheet to PDF ArrayBuffer via html2pdf
    const opt = {
      margin: 10,
      filename: candidateName + "_CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    const cvArrayBuffer = await window.html2pdf().set(opt).from(cvElement).output("arraybuffer");

    // 2. Create Consolidated Document using PDFLib
    const mergedPdf = await window.PDFLib.PDFDocument.create();
    let totalPages = 0;

    // A. Add CV Pages
    const cvDoc = await window.PDFLib.PDFDocument.load(cvArrayBuffer);
    const cvPages = await mergedPdf.copyPages(cvDoc, cvDoc.getPageIndices());
    cvPages.forEach(p => mergedPdf.addPage(p));
    totalPages += cvPages.length;

    // B. Add JFT Certificate PDF Pages if uploaded
    if (uploadedFiles.jft) {
      const jftBytes = await uploadedFiles.jft.arrayBuffer();
      const jftDoc = await window.PDFLib.PDFDocument.load(jftBytes);
      const jftPages = await mergedPdf.copyPages(jftDoc, jftDoc.getPageIndices());
      jftPages.forEach(p => mergedPdf.addPage(p));
      totalPages += jftPages.length;
    }

    // C. Add SSW Certificate PDF Pages if uploaded
    if (uploadedFiles.ssw) {
      const sswBytes = await uploadedFiles.ssw.arrayBuffer();
      const sswDoc = await window.PDFLib.PDFDocument.load(sswBytes);
      const sswPages = await mergedPdf.copyPages(sswDoc, sswDoc.getPageIndices());
      sswPages.forEach(p => mergedPdf.addPage(p));
      totalPages += sswPages.length;
    }

    // 3. Save & Trigger Instant Download
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    const finalFilename = candidateName + "_Nusalink_Dossier.pdf";
    a.download = finalFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    let certsList = [];
    if (uploadedFiles.jft) certsList.push("Sertifikat JFT");
    if (uploadedFiles.ssw) certsList.push("Sertifikat SSW");
    const certsText = certsList.length > 0 ? " (" + certsList.join(" + ") + " terintegrasi)" : " (Hanya CV)";

    showStatus("✅ BERHASIL! File '" + finalFilename + "' (Total " + totalPages + " halaman) telah otomatis diunduh ke folder Downloads Anda" + certsText + ".");
  } catch (err) {
    console.error("PDF Merge error:", err);
    showStatus("❌ Terjadi kendala saat menggabungkan PDF: " + err.message + ". Silakan cek apakah file PDF Anda tidak memiliki proteksi kata sandi.", true);
  }
});

[
  elements.visaType,
  elements.nameRomaji,
  elements.nameKana,
  elements.dob,
  elements.gender,
  elements.nationality,
  elements.japaneseLevel,
  elements.japaneseScore,
  elements.height,
  elements.weight,
  elements.bloodType,
  elements.religion,
  elements.phoneCode,
  elements.phoneNumber,
  elements.email,
  elements.address
].filter(Boolean).forEach(input => {
  input.addEventListener("input", updateLivePreview);
  input.addEventListener("change", updateLivePreview);
});

// Boot Initial State
setJapaneseDate();
renderEduInputs();
renderWorkInputs();
updateLivePreview();


// -------------------------------------------------------------

// -------------------------------------------------------------
// PURE MANUAL TAB SWITCHER (Zero Scroll Hijacking, Zero Resize Triggers)
// -------------------------------------------------------------
const tabFormBtn = document.getElementById("tabFormBtn");
const tabPreviewBtn = document.getElementById("tabPreviewBtn");
const editorSection = document.getElementById("editorSection");
const previewSection = document.getElementById("previewSection");
const mobilePreviewToggleBtn = document.getElementById("mobilePreviewToggleBtn");
const mobileDownloadBtn = document.getElementById("mobileDownloadBtn");

function switchTab(target) {
  if (target === "form") {
    editorSection.classList.remove("mobile-hidden");
    previewSection.classList.add("mobile-hidden");
    if (tabFormBtn) tabFormBtn.classList.add("active");
    if (tabPreviewBtn) tabPreviewBtn.classList.remove("active");
    if (mobilePreviewToggleBtn) mobilePreviewToggleBtn.textContent = "👁️ Lihat CV";
  } else {
    editorSection.classList.add("mobile-hidden");
    previewSection.classList.remove("mobile-hidden");
    if (tabFormBtn) tabFormBtn.classList.remove("active");
    if (tabPreviewBtn) tabPreviewBtn.classList.add("active");
    if (mobilePreviewToggleBtn) mobilePreviewToggleBtn.textContent = "📝 Formulir";
  }
}

if (tabFormBtn) {
  tabFormBtn.addEventListener("click", () => switchTab("form"));
}

if (tabPreviewBtn) {
  tabPreviewBtn.addEventListener("click", () => switchTab("preview"));
}

if (mobilePreviewToggleBtn) {
  mobilePreviewToggleBtn.addEventListener("click", () => {
    if (editorSection.classList.contains("mobile-hidden")) {
      switchTab("form");
    } else {
      switchTab("preview");
    }
  });
}

if (mobileDownloadBtn) {
  mobileDownloadBtn.addEventListener("click", () => {
    if (elements.downloadDossierBtn) {
      elements.downloadDossierBtn.click();
    }
  });
}

// Initial state on mobile
if (window.innerWidth <= 900) {
  switchTab("form");
}
