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
  const refDokumen = collection(db, "absensi");
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
      notlpnlpn: dok.data().notlpn,
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
    const dokRef = await addDoc(collection(db, 'absensi'), {
      tanggal: tanggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      notlpnn: notlpn,
      kelas: kelas,
      keterangan: keterangan
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "absensi", docId));
}

export async function ubahPembeli(docId, nama, alamat, notlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    notlpn: notlpn
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data(); 
}