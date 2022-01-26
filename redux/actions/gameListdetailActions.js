export const setPlayed = (condition) => ({
  type: 'Is_Game_Played',
  payload: condition,
});

export const getGames = () => ({
  type: 'Loaded_All_Game',
  payload: [{
    title: 'MONOPOLY',
    id: 1,
    description: 'Monopoli adalah salah satu permainan papan yang paling terkenal di dunia. Tujuan permainan ini adalah untuk menguasai semua petak di atas papan melalui pembelian, penyewaan dan pertukaran properti dalam sistem ekonomi yang disederhanakan. Setiap pemain melemparkan dadu secara bergiliran untuk memindahkan bidaknya, dan apabila ia mendarat di petak yang belum dimiliki oleh pemain lain, ia dapat membeli petak itu sesuai harga yang tertera. Bila petak itu sudah dibeli pemain lain, ia harus membayar pemain itu uang sewa yang jumlahnya juga sudah ditetapkan.',
    gambar: 'https://res.cloudinary.com/dkqxlkrj5/image/upload/v1643105198/monopoly_wfehan.jpg',
  },
  {
    title: 'CATUR',
    id: 2,
    description: 'Catur adalah permainan papan strategi dua orang yang dimainkan pada sebuah papan kotak-kotak yang terdiri dari 64 kotak, yang disusun dalam petak 8×8, yang terbagi sama rata dalam kelompok warna putih dan hitam. Permainan ini dimainkan oleh jutaan orang di seluruh dunia.',
    gambar: 'https://res.cloudinary.com/dkqxlkrj5/image/upload/v1643105532/catur_ltruzb.png',
  },
  {
    title: 'UNO',
    id: 3,
    description: 'Uno adalah salah satu permainan kartu warna warni yang memiliki angka dan simbol. Uno adalah salah satu permainan kartu warna warni yang memiliki angka dan simbol. Mulai dari anak-anak hingga orang dewasa bisa ikut memainkannya.',
    gambar: 'https://res.cloudinary.com/dkqxlkrj5/image/upload/v1643105198/UNO_kkv3ea.webp',
  },
  {
    title: 'LUDO',
    id: 4,
    description: 'Diterjemahkan dari bahasa Inggris-Ludo adalah permainan papan strategi untuk dua hingga empat pemain, di mana para pemain berlomba dengan empat token mereka dari awal hingga akhir sesuai dengan gulungan satu dadu. Seperti permainan silang dan lingkaran lainnya, Ludo berasal dari permainan India Pachisi',
    gambar: 'https://res.cloudinary.com/dkqxlkrj5/image/upload/v1643105197/Ludo_dvp8wp.jpg',
  },
  ],
});

// export function getGames() {
//   return function (dispatch) {
//     return fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(json => {
//       dispatch({
//         type: 'Loaded_All_Game',
//         payload: json
//       });
//     });
//   }
// }

export const setGameDetailPosition = (position) => ({
  type: 'Game_Detail_Position',
  payload: position,
});

export const setPlayedDummy = (condition) => ({
  type: 'Is_Game_Played_Dummy',
  payload: condition,
});
export const resetPlayedDummy = () => ({
  type: 'Reset_Game_Played_Dummy',
});
