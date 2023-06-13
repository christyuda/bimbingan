document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault();

  const mhswid = document.getElementById("inputMhswID").value;
  const dosenid = document.getElementById("inputDosenID").value;
  const tahunid = document.getElementById("inputTahunID").value;
  const tipe = document.getElementById("inputTipe").value;
  const pertemuan = parseInt(document.getElementById("inputPertemuan").value);
  const nilai = parseInt(document.getElementById("inputNilai").value);
  const topik = document.getElementById("inputTopik").value;
  const tanggal = document.getElementById("inputTanggal").value;
  const penilai = document.getElementById("inputPenilai").value;
  const log = document.getElementById("inputLog").value;
  


  if (mhswid === '' || dosenid === '' || tahunid === '' || tipe === '' || pertemuan === '' || nilai === '' || topik === '' || tanggal === '' || penilai === '' || log === '') {
      console.log('Mohon lengkapi semua field');
      return;
  }

  addBimbingan(mhswid, dosenid, tahunid, tipe, pertemuan, nilai, topik, tanggal, penilai, log); 

  document.getElementById("bimbinganForm").reset();
});

function addBimbingan(mhswid, dosenid, tahunid, tipe, pertemuan, nilai, topik, tanggal, penilai, log) {
  const url = 'https://hris_backend.ulbi.ac.id/bim/databimbingan/';

  // Generate a random 5-digit number

  const data = {
      MhswID: mhswid,
      DosenID: dosenid,
      TahunID: tahunid,
      Tipe: tipe,
      Pertemuan_: pertemuan,
      Nilai: nilai, 
      Topik: topik,
      Tanggal: tanggal,
      Penilai: penilai,
      Log:log
  };

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (response.ok) {
          console.log('Data berhasil dipost');
          document.getElementById('successMessage').textContent = 'Data berhasil dipost';
      } else {
          console.log('Terjadi kesalahan saat memposting data');
      }
  })
  .catch(error => {
      console.log('Terjadi kesalahan:', error);
      document.getElementById('errorMessage').textContent = 'Terjadi kesalahan: ' + error.message;
  });
}
