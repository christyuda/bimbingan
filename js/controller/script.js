function fetchData(npm, tipe) {
  const url = `https://hris_backend.ulbi.ac.id/bim/databimbingan/npmtipe/${npm}/${tipe}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(data => {
      if (data.code === 200 && data.success && data.data) {
        displayResults(data.data);
      } else {
        throw new Error('Invalid data format or empty data.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const pembimbingMapping = {
  'NN056L': 'Cahyo Prianto, S.Pd., M.T.,CDSP, SFPC',
  'TI126L': 'M. Yusril Helmi Setyawan, S.Kom., M.Kom.,SFPC',
  'TI122L': 'Mohamad Nurkamal Fauzan, S.T., M.T., SFPC',
  'NN222L': 'Nisa Hanum Harani, S.Kom., M.T.,CDSP, SFPC',
  'NN225L': 'Noviana Riza, S.Si., M.T., SFPC',
  'LB053L': 'Rd. Nuraini Siti Fatonah, S.S., M.Hum., SFPC',
  'NN257L': 'Rolly Maulana Awangga,S.T.,MT.,CAIP, SFPC',
  'NN258L': 'Roni Andarsyah, S.T., M.Kom., SFPC',
  'TI117L': 'Roni Habibi, S.Kom., M.T., SFPC',
  'TI125L': 'Syafrial Fachri Pane,ST. MTI,EBDP.CDSP,SFPC',
  'TI041L': 'Woro Isti Rahayu, S.T., M.T., SFPC',
};

const Tahunajaran = {
  '21': 'Tahun Ajaran Ganjil',
  '22': 'Tahun Ajaran Genap'
};

function getTahunAjaran(tahun) {
  const duaDigitTerakhir = tahun.slice(-2);
  if (parseInt(duaDigitTerakhir) % 2 === 0) {
    return 'Tahun Ajaran Genap';
  } else {
    return 'Tahun Ajaran Ganjil';
  }
}

const tahun = '20222';
const tahunAjaran = getTahunAjaran(tahun);
console.log(tahunAjaran);

function displayResults(data) {
  const resultsBody = document.getElementById("results_body");
  resultsBody.innerHTML = ""; // Clear existing results

  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.MhswID}</td>
        <td>${pembimbingMapping[item.DosenID]}</td>
        <td>${item.TahunID } ${getTahunAjaran(item.TahunID)}</td>
        <td>${item.Tipe}</td>
        <td>${item.Pertemuan_}</td>
        <td>${item.Nilai}</td>
        <td>${item.Topik}</td>
        <td>${item.Tanggal}</td>
        <td>${item.Penilai}</td>
        <td>
          <button class="delete-btn" data-kodepertemuan="${item.kodepertemuan}" onclick="deleteBimbingan('${item.kodepertemuan}')">
            <i class="fas fa-trash"></i>hapus
          </button>

          <button class="edit-btn" data-kodepertemuan="${item.kodepertemuan}">
            <i class="fas fa-pencil"></i>Edit
          </button>
        </td>
      `;
      resultsBody.appendChild(row);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const kodepertemuan = button.dataset.kodepertemuan;
        deleteBimbingan(kodepertemuan);
      });
    });
  } else {
    console.error("Invalid data format or empty data.");
  }
  console.log(data);
}

function applyFilters() {
  const npmInput = document.querySelector("#npm_input");
  const tipeInput = document.querySelector("#tipe_input");
  const npm = npmInput.value.trim();
  const tipe = tipeInput.value.trim();

  fetchData(npm, tipe);
}

document.querySelector("#submit_btn").addEventListener("click", applyFilters);



function hideModal() {
  const modalElement = document.getElementById("modal");

  modalElement.classList.add("hidden");
}

function doSomethingAfterDelete() {

  showModal("Data berhasil dihapus");
  document.getElementById("modal-close").addEventListener("click", function() {
    location.reload();
  });


}


document.getElementById("modal-close").addEventListener("click", hideModal);

function showModal(message) {
  Swal.fire({
    title: 'Selamat!',
    text: message,
    icon: 'success',
    confirmButtonText: 'Tutup'
  }).then(() => {
    location.reload();
  });
}

function deleteBimbingan(kodepertemuan) {
  const urlGet = `https://hris_backend.ulbi.ac.id/bim/databimbingan/bykodepertemuan/${kodepertemuan}`;

  fetch(urlGet)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Gagal mengambil data');
      }
    })
    .then(data => {
      const urlDelete = `https://hris_backend.ulbi.ac.id/bim/databimbingan/delete/${data.data.kodepertemuan}`;
      return fetch(urlDelete, {
        method: 'DELETE'
      });
    })
    .then(response => {
      if (response.ok) {
        console.log('Data berhasil dihapus');
        showModal('Data Berhasil Dihapus');
      } else {
        throw new Error('Terjadi kesalahan saat menghapus data');
      }
    })
    .catch(error => {
      console.log('Terjadi kesalahan:', error);
      console.error('Terjadi kesalahan:', error);
    });
}


