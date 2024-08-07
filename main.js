import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdgAITXTldockRB_wgxOrbNUPKzSVBhDs",
  authDomain: "insan-cemerlang-c9554.firebaseapp.com",
  projectId: "insan-cemerlang-c9554",
  storageBucket: "insan-cemerlang-c9554.appspot.com",
  messagingSenderId: "753628555075",
  appId: "1:753628555075:web:7a72b2d1e8ae89716931f6",
  measurementId: "G-KMJZ5V0B8H"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absensi_siswa");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggal: dok.data().tanggal,
      nis: dok.data().nis,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      notlpn: dok.data().notlpn,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,

    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahAbsensi(tanggal, nis, nama, alamat, notlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi_siswa'), {
      tanggal: tanggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      notlpn: notlpn,
      kelas: kelas,
      keterangan: keterangan
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "absensi_siswa", docId));
}

export async function ubahAbsensi(docId, tanggal, nis, nama, alamat, notlpn, kelas, keterangan) {
  await updateDoc(doc(db, "absensi_siswa", docId), {
    tanggal: tanggal,
    nis: nis,
    nama: nama,
    alamat: alamat,
    notlpn: notlpn,
    kelas: kelas,
    keterangan: keterangan,
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "absensi_siswa", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}